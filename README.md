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

Tested locally using the MCP Inspector (not using a direct Claude Desktop STDIO client).

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

### ✔️ STDIO Transport (MCP Inspector)

This project was tested locally using the MCP Inspector, which acts as an MCP client that connects over STDIO to your server.

Run the server so the inspector can connect over STDIO:

```bash
node dist/main.js
```

Start the inspector with:

```bash
npx @modelcontextprotocol/inspector
```

When prompted in the inspector, choose the STDIO connection and point it at the running process (the inspector will spawn or attach to the process as configured).

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
git clone https://github.com/saktheeswar/Azure_Devops_MCP_Server.git
cd azure-devops-mcp
npm install
npm run build
```

---

## 🔑 Environment Variables

Create `.env`:

```
BASE_URL=url
AUSER_NAME=your-personal-access-token
ADO_PAT=your-default-project
```

---

## ▶️ Running the Server

### Run in STDIO mode (for MCP Inspector)

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
AI Engineer & Full-Stack Developer 
---

## 🔗 Source Code

👉 **GitHub Repository:**
(https://github.com/saktheeswar/Azure_Devops_MCP_Server)

