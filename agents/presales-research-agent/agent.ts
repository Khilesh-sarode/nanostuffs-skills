// Pre-sales research agent
// Researches a company on the web and writes an AI opportunity brief
// using the ai-opportunity-assessment skill from this repo.
//
// Run:  npx tsx agents/presales-research-agent/agent.ts "Company Name"
// Needs: ANTHROPIC_API_KEY in the environment.

import { query } from "@anthropic-ai/claude-agent-sdk";

const company = process.argv.slice(2).join(" ").trim();
if (!company) {
  console.error('Usage: npx tsx agents/presales-research-agent/agent.ts "Company Name"');
  process.exit(1);
}

const slug = company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const prompt = `
Research ${company} for a pre-sales AI discovery call.

1. Use web search to find the company's website, what it sells, size, key
   departments, technology systems it uses, and recent news (last 12 months).
2. Then use the ai-opportunity-assessment skill to produce the brief.
3. Save the brief to briefs/${slug}.md and list your sources at the end.
`;

for await (const message of query({
  prompt,
  options: {
    cwd: process.cwd(),                    // repo root that holds .claude/skills/
    settingSources: ["project"],           // load skills from .claude/skills/
    skills: ["ai-opportunity-assessment"], // only this skill is allowed
    allowedTools: ["WebSearch", "WebFetch", "Read", "Write"],
    maxTurns: 30,
  },
})) {
  if (message.type === "assistant") {
    for (const block of message.message.content) {
      if (block.type === "tool_use") console.log(`→ ${block.name}`);
    }
  }
  if (message.type === "result") {
    if (message.subtype === "success") {
      console.log(`\nDone: briefs/${slug}.md`);
      console.log(`Cost: $${message.total_cost_usd.toFixed(3)}`);
    } else {
      console.error(`Agent stopped: ${message.subtype}`);
    }
  }
}
