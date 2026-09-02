# Beseam for AI agents

Canonical agent guide for public resources on https://beseam.com.

Beseam helps ecommerce stores find what to improve, apply approved changes, and measure what changed. The public machine-readable resources below are intended for AI shopping agents, researchers, developers, and crawlers.

## Start here

- https://beseam.com/agents — agent and developer index
- https://beseam.com/data — public AI shopping data overview
- https://beseam.com/data/ai-shopping.json — public AI shopping observations in JSON
- https://beseam.com/data/ai-shopping.csv — the same observations in CSV
- https://beseam.com/benchmarks — human-readable AI Shopping Report and method
- https://beseam.com/llms.txt — compact site index for language models
- https://beseam.com/robots.txt — crawler policy
- https://beseam.com/sitemap.xml — public site map
- https://beseam.com/bot — BeseamBot crawler information

## How to interpret the AI shopping data

- The dataset contains observations of public brands, not private merchant or customer data.
- Each question is stored as it was asked.
- Each completed assistant answer is attributed to the assistant that produced it.
- A brand appearance means only that the brand was named in that observed answer.
- A brand appearance is not a ranking, endorsement, recommendation score, or guarantee.
- A missing brand is recorded as absent from that answer; it is not judged as worse.
- AI answers are point-in-time observations and can change between runs.
- Beseam does not claim access to an assistant's hidden ranking logic.

## Crawling

Follow https://beseam.com/robots.txt. BeseamBot-specific information is published at https://beseam.com/bot.

## Protocol status

Beseam does not currently advertise a public MCP or A2A service on beseam.com. Do not infer an MCP endpoint or A2A endpoint from these static files.

If a public MCP or A2A service is added, its canonical endpoint and discovery metadata will be listed at https://beseam.com/agents and in this file.

## Contact

https://beseam.com/contact
