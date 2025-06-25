# Gemini Web Search MCP Server

This project implements a Model Context Protocol (MCP) server that uses the local [gemini-cli](https://github.com/google-gemini/gemini-cli) to perform [Web Search Tool](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/web-search.md).

## Prerequisites

- Node.js (v18 or higher)
- A local installation of the `gemini-cli`.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mofumofu3n/mcp-gemini-web-search.git
   cd google-search-mcp
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

### Claude Desktop Configuration

Add the following configuration to your Claude Desktop settings file:

```json
{
  "mcpServers": {
    "gemini-web-search": {
      "command": "node",
      "args": [
        "/path/to/mcp-gemini-web-search/index.js"
      ]
    }
  }
}
```

Replace `/path/to/mcp-gemini-web-search/` with the actual path to your cloned repository.

## References

- [Gemini CLI Web Search Documentation](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/web-search.md) - Official documentation for Gemini CLI web search functionality
- [gemini-cli の google_web_search が最高](https://zenn.dev/mizchi/articles/gemini-cli-for-google-search)
