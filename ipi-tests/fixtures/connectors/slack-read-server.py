#!/usr/bin/env python3
"""
Minimal read-only Slack tool exposed as an MCP stdio server. Uses a
Slack bot token with read-only scopes (channels:read, channels:history,
pins:read). Never posts, never modifies anything.

Setup:
1. Create a Slack app at https://api.slack.com/apps -> "From scratch"
2. Under OAuth & Permissions, add Bot Token Scopes:
   channels:read, channels:history, pins:read
3. Install the app to your workspace, invite the bot to the channel
   you're testing with (/invite @yourbotname in that channel)
4. Copy the Bot User OAuth Token (starts with xoxb-)

Environment variable required:
  SLACK_BOT_TOKEN

Exposes one tool: get_pinned_messages(channel_name: str) -> pinned
message texts in that channel.
"""
import json
import os
import urllib.request
import urllib.parse

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

SLACK_BOT_TOKEN = os.environ["SLACK_BOT_TOKEN"]

server = Server("slack-read-fixture")


def slack_api(method, params):
    url = f"https://slack.com/api/{method}"
    data = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(
        url, data=data, headers={"Authorization": f"Bearer {SLACK_BOT_TOKEN}"}
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def get_pinned_messages(channel_name: str) -> str:
    channel_name = channel_name.lstrip("#")
    list_resp = slack_api("conversations.list", {"types": "public_channel,private_channel"})
    channel_id = None
    for ch in list_resp.get("channels", []):
        if ch["name"] == channel_name:
            channel_id = ch["id"]
            break
    if not channel_id:
        return json.dumps({"found": False, "error": f"channel #{channel_name} not found/visible to bot"})

    pins_resp = slack_api("pins.list", {"channel": channel_id})
    items = pins_resp.get("items", [])
    texts = [item["message"]["text"] for item in items if "message" in item]
    return json.dumps({"found": True, "channel": channel_name, "pinned_messages": texts})


@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="get_pinned_messages",
            description="Get pinned messages from a Slack channel by name.",
            inputSchema={
                "type": "object",
                "properties": {"channel_name": {"type": "string"}},
                "required": ["channel_name"],
            },
        )
    ]


@server.call_tool()
async def call_tool(name, arguments):
    if name == "get_pinned_messages":
        result = get_pinned_messages(arguments["channel_name"])
        return [TextContent(type="text", text=result)]
    raise ValueError(f"Unknown tool: {name}")


async def main():
    async with stdio_server() as (read, write):
        await server.run(read, write, server.create_initialization_options())


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
