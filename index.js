import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { spawn } from 'child_process';

const spawnAsync = (cmd, args) => {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      shell: false,
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    proc.on('error', reject);
  });
};

// This server will be run directly with node, not through the test runner.
async function main() {
  const server = new McpServer({
    name: 'gemini-search-server',
    version: '1.0.0',
  });

  server.registerTool(
    'google_web_search',
    {
      title: 'Google Web Search',
      description: 'Performs a web search using Google Search via the Gemini API.',
      inputSchema: { query: z.string().describe('The search query') },
    },
    async ({ query }) => {
      const cmd = 'gemini';
      const args = ['-p', `WebSearch:${query}`];

      try {
        console.error(`Executing command: ${cmd} ${args.join(' ')}`);
        const { stdout, stderr } = await spawnAsync(cmd, args);
        console.error(`Command stdout: ${stdout}`);
        if (stderr) {
          console.error(`Command stderr: ${stderr}`);
        }
        return {
          content: [{ type: 'text', text: stdout }],
        };
      } catch (error) {
        console.error(`Execution error: ${error}`);
        return {
          content: [{ type: 'text', text: `Error executing search: ${error.message}` }],
        };
      }
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Gemini MCP server for google_web_search is running...');
}

main();
