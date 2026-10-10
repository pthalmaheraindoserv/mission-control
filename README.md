# Mission Control

Self-hosted, lightweight multi-agent operations dashboard using Node.js, Express, Socket.IO and SQLite. No React required.

## Included

- Web dashboard
- Multi-agent orchestration and task routing
- Telegram and Discord bots
- Cron scheduler
- SQLite memory
- Host monitoring
- Agent-to-agent message log
- Realtime WebSocket events
- Docker deployment
- Browser voice input (Web Speech API)
- MCP stdio client integration
- Document library
- OpenAI-compatible LLM support, including Ollama or LM Studio

## Quick start with Docker

```bash
cp .env.example .env
docker compose up -d --build
```

Open `http://localhost:3000`.

For local Ollama, ensure the model exists and API is reachable, then set:

```env
LLM_BASE_URL=http://host.docker.internal:11434/v1
LLM_API_KEY=ollama
LLM_MODEL=qwen2.5:3b
```

## Without Docker

Requires Node.js 22+ and build tools for `better-sqlite3`.

```bash
cp .env.example .env
npm install
npm start
```

## Telegram and Discord

Add bot tokens only to `.env`. Never commit `.env`.

## MCP example

From the MCP screen connect:

- Name: `filesystem`
- Command: `npx`
- Args: `["-y","@modelcontextprotocol/server-filesystem","/app/documents"]`

## GitHub upload

Extract this project into the cloned repository, then:

```bash
git add .
git commit -m "feat: initialize mission control platform"
git push origin main
```
