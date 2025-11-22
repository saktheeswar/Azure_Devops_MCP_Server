# 🚀 Azure DevOps MCP Server

A custom **Model Context Protocol (MCP)** server built with **NestJS**, enabling AI agents (like Claude Desktop) to securely query **Azure DevOps** data such as work items, projects, and ticket statistics.

---

## 📌 Overview

This project exposes Azure DevOps data through a standards-based **MCP server**, allowing any MCP-compatible AI agent to perform real-time queries such as:

* 🔍 List all projects in the organization
* 📝 Get count of created / active / closed work items
* 🧩 Fetch ticket details
* 📊 Query backlog items or sprints
* 🏗️ Extend Azure DevOps automation through AI

It supports **two modes**:

### 1️⃣ STDIO MCP Server

Used by Claude Desktop and MCP Inspector locally.

### 2️⃣ HTTP MCP Server

Allows remote access using MCP-over-HTTP.

---

## 🏗️ Architecture

```
NestJS Application
│
├── MCP Module
│   ├── Tool Definitions
│   ├── STDIO Transport
│   └── HTTP Transport
│
├── Azure DevOps Service
│   └── Work Item API
│   └── Project API
│
└── Utilities
    ├── MCP Message Handlers
    └── Logger
```

---

## ✨ Features

### ✔️ Custom Tools for Azure DevOps

Tools exposed to MCP clients:

| Tool Name          | Description                                        |
| ------------------ | -------------------------------------------------- |
| `list_projects`    | Returns all Azure DevOps projects                  |
| `count_tickets`    | Returns summary of created/active/resolved tickets |
| `get_workitem`     | Fetch details of a single work item                |
| `search_workitems` | Query work items based on filters                  |

---

### ✔️ Full STDIO Transport Support

This allows running the server locally through Claude Desktop.

```bash
node dist/main.js
```

Claude Desktop config uses:

```json
{
  "mcpServers": {
    "azure-devops-mcp": {
      "command": "node",
      "args": ["C://path//to//dist/main.js"]
    }
  }
}
```

---

### ✔️ HTTP MCP Support

Start server:

```bash
npm run start:prod
```

You can POST MCP-style requests:

```http
POST http://localhost:3000/mcp
```

---

## 🔧 Installation

```bash
git clone <your-repo-url>
cd azure-devops-mcp
npm install
npm run build
```

---

## 🔑 Environment Variables

Create `.env`:

```
AZURE_DEVOPS_ORG=your-org
AZURE_DEVOPS_PAT=your-personal-access-token
AZURE_DEVOPS_PROJECT=your-default-project
```

---

## ▶️ Running the Server

### Run in STDIO mode (Claude Desktop)

```bash
node dist/main.js
```

### Run in HTTP mode

```bash
npm run start:prod
```

---

## 🧪 Testing with MCP Inspector

(You will explain this with screenshots in your blog.)

```bash
npx @modelcontextprotocol/inspector
```

Then connect using STDIO:

```
node dist/main.js
```

---

## 💻 Code Walkthrough

### 📁 MCP Server Setup

```ts
const server = new Server({
  name: "azure-devops-mcp",
  version: "1.0.0",
  tools: {
    list_projects: { ... },
    count_tickets: { ... }
  }
});
```

---

### 📁 Azure DevOps API Integration

```ts
async getProjects() {
  const url = `${this.baseUrl}/projects?api-version=7.0`;
  return this.http.get(url, this.headers);
}
```

---

### 📁 STDIO Bootstrap

```ts
bootstrapStdio(server);
```

---

### 📁 HTTP Controller

```ts
@Post('/mcp')
handleMcp(@Body() body) {
  return this.mcpHttpService.process(body);
}
```

---

## 📚 Example MCP Tool Call

```json
{
  "method": "tools/list_projects",
  "params": {}
}
```

Response:

```json
{
  "projects": [
    { "name": "Frontend" },
    { "name": "Backend" },
    { "name": "Infrastructure" }
  ]
}
```

---

## 🧩 Use Cases

### For Developers

* Query Azure DevOps without opening the UI
* Get ticket summaries instantly
* Automate repetitive DevOps activities

### For AI Assistants

* Smart sprint planning
* Ticket prioritization
* Automated status reporting

### For Teams

* Faster decision making
* AI-powered insights

---

## 🔥 Future Enhancements

* Create/Update work items using AI
* Integration with Release Pipelines
* Sprint burndown insights
* PR and Repository analytics

---

## 📎 Screenshots (Add your own)

* Claude Desktop working
* MCP Inspector connected
* Tool response logs

---

## 🧑‍💻 Author

**Saktheeswaran M**
Software Engineer
AI Engineer & Full-Stack Developer 
---

## 🔗 Source Code

👉 **GitHub Repository:**
***Add your repo link here***

---

If you want, I can also generate:

✅ Blog article
✅ Screenshots captions
✅ Architecture diagram (ASCII / Mermaid)
✅ Video script

Just tell me!
