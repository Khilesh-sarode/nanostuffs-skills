# PostgreSQL Reusable Patterns

Generic snippets. Replace placeholder names (`<table>`, `<col>`) with verified names only.

## Contents
- Period boundaries
- Calendar spine (no missing months)
- Month-wise columns
- Running total, rank, percentage
- Avoiding join fan-out
- Latest row per group
- Keyset pagination
- Recursive hierarchy

## Period boundaries

```sql
-- Month: half-open range on a TIMESTAMPTZ column, India local time
WHERE t.<ts_col> >= ('2025-04-01'::timestamp AT TIME ZONE 'Asia/Kolkata')
  AND t.<ts_col> <  ('2025-05-01'::timestamp AT TIME ZONE 'Asia/Kolkata')
```

```sql
-- Financial year (Apr-Mar) containing a date
SELECT make_date(extract(year FROM d)::int - (extract(month FROM d) < 4)::int, 4, 1) AS fy_start;

-- Quarter / half-year start
date_trunc('quarter', d)
make_date(extract(year FROM d)::int, CASE WHEN extract(month FROM d) <= 6 THEN 1 ELSE 7 END, 1)
```

## Calendar spine (show zero months)

```sql
WITH months AS (
    SELECT generate_series(date '2025-04-01', date '2026-03-01', interval '1 month')::date AS month_start
)
SELECT m.month_start, COALESCE(SUM(f.<amount>), 0) AS total
FROM months m
LEFT JOIN <fact_table> f
       ON f.<date_col> >= m.month_start
      AND f.<date_col> <  m.month_start + interval '1 month'
GROUP BY m.month_start
ORDER BY m.month_start;
```

## Month-wise columns

```sql
SELECT <group_col>,
       SUM(<amount>) FILTER (WHERE <date_col> >= '2025-04-01' AND <date_col> < '2025-05-01') AS apr,
       SUM(<amount>) FILTER (WHERE <date_col> >= '2025-05-01' AND <date_col> < '2025-06-01') AS may
FROM <table>
GROUP BY <group_col>;
```

## Running total, rank, percentage

```sql
SELECT <group_col>, <date_col>, <amount>,
       SUM(<amount>) OVER (PARTITION BY <group_col> ORDER BY <date_col>
                           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total,
       DENSE_RANK() OVER (PARTITION BY <group_col> ORDER BY <amount> DESC)   AS rnk,
       100.0 * <amount> / NULLIF(SUM(<amount>) OVER (PARTITION BY <group_col>), 0) AS pct_of_group
FROM <table>;
```

## Avoiding join fan-out

Aggregate each many-side separately, then join on the shared key:

```sql
WITH a AS (SELECT <key>, SUM(<x>) AS x_total FROM <t1> GROUP BY <key>),
     b AS (SELECT <key>, SUM(<y>) AS y_total FROM <t2> GROUP BY <key>)
SELECT p.<key>, COALESCE(a.x_total, 0) AS x_total, COALESCE(b.y_total, 0) AS y_total
FROM <parent> p
LEFT JOIN a USING (<key>)
LEFT JOIN b USING (<key>);
```

## Latest row per group

```sql
-- Option 1: DISTINCT ON (concise, uses index on (group_col, ts_col DESC))
SELECT DISTINCT ON (<group_col>) *
FROM <table>
ORDER BY <group_col>, <ts_col> DESC;

-- Option 2: window function (when ties or extra ranking logic matter)
SELECT * FROM (
    SELECT t.*, ROW_NUMBER() OVER (PARTITION BY <group_col> ORDER BY <ts_col> DESC, <id_col> DESC) AS rn
    FROM <table> t
) s WHERE rn = 1;
```

## Keyset pagination

```sql
SELECT <cols> FROM <table>
WHERE (<sort_col>, <id_col>) < ($1, $2)   -- last row of previous page
ORDER BY <sort_col> DESC, <id_col> DESC
LIMIT 50;
```

Supports an index on `(<sort_col> DESC, <id_col> DESC)`. Sort key plus a unique tiebreaker is required.

## Recursive hierarchy

```sql
WITH RECURSIVE tree AS (
    SELECT <id>, <parent_id>, 1 AS depth, ARRAY[<id>] AS path
    FROM <table> WHERE <id> = $1
    UNION ALL
    SELECT c.<id>, c.<parent_id>, t.depth + 1, t.path || c.<id>
    FROM <table> c
    JOIN tree t ON c.<parent_id> = t.<id>
    WHERE c.<id> <> ALL (t.path)      -- cycle guard
      AND t.depth < 20                -- depth limit
)
SELECT * FROM tree;
```
