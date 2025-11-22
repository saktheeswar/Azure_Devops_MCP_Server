import { Controller, Post, Req, Res } from '@nestjs/common';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { AzureDevOpsService } from './azure-devops.service';
import { z } from 'zod';

@Controller()
export class MCPController {
  private server: McpServer;

  constructor(private ado: AzureDevOpsService) {
    // Initialize MCP Server
    this.server = new McpServer({
      name: 'azure-devops-mcp',
      version: '1.0.0',
    });
    this.server.registerTool(
      'get_projects',
      {
        title: 'List ADO Projects',
        description: 'Fetch all Azure DevOps projects in the organization',
        inputSchema: {}, // no input needed
        outputSchema: {
          projects: z.array(z.string()),
        },
      },
      async () => {
        const projects = await this.ado.getProjects();
        const output = { projects };

        return {
          content: [{ type: 'text', text: JSON.stringify(output) }],
          structuredContent: output
        };
      }
    );

    // ==================================================================================
    // TOOL 2: Count work items by state
    // ==================================================================================
    this.server.registerTool(
      'get_ticket_count',
      {
        title: 'Count Work Items',
        description: 'Counts Azure DevOps tickets by state (New, Active, Resolved, Closed)',
        inputSchema: {
          state: z.string(),
        },
        outputSchema: {
          state: z.string(),
          count: z.number(),
        },
      },
      async ({ state }) => {
        const result = await this.ado.getTicketCount(state);

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
          structuredContent: result,
        };
      }
    );

    // ==================================================================================
    // TOOL 3: Run WIQL Query
    // ==================================================================================
    this.server.registerTool(
      'query_work_items',
      {
        title: 'Run WIQL Query',
        description: 'Execute a WIQL query against Azure DevOps work items',
        inputSchema: {
          wiql: z.string(),
        },
        outputSchema: {
          items: z.array(z.any()),
        },
      },
      async ({ wiql }) => {
        const items = await this.ado.runWIQL(wiql);
        const output = { items };

        return {
          content: [{ type: 'text', text: JSON.stringify(output) }],
          structuredContent: output,
        };
      }
    );

    // ==================================================================================
    // EXAMPLE RESOURCE (optional)
    // ==================================================================================

    this.server.registerResource(
      'greeting',
      new ResourceTemplate('greeting://{name}', { list: undefined }),
      {
        title: 'Greeting Resource',
        description: 'Dynamic greeting example resource',
      },
      async (uri, { name }) => ({
        contents: [
          {
            uri: uri.href,
            text: `Hello, ${name}!`,
          },
        ],
      })
    );
  }

  // ============================================================
  // HTTP Endpoint: /mcp
  // ============================================================
  @Post('/mcp')
  async handle(@Req() req, @Res() res) {
    const transport = new StreamableHTTPServerTransport({
      enableJsonResponse: true,
      sessionIdGenerator: undefined,
    });

    res.on('close', () => transport.close());

    await this.server.connect(transport);

    await transport.handleRequest(req, res, req.body);
  }
}
