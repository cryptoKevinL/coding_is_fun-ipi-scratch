#!/usr/bin/env python3
"""
Minimal read-only Gmail search/read tool exposed as an MCP stdio
server. Uses IMAP with a Gmail App Password (NOT your real password —
generate one at https://myaccount.google.com/apppasswords, requires
2FA enabled). Read-only: only ever calls SEARCH/FETCH, never sends,
deletes, or modifies anything.

Environment variables required:
  GMAIL_ADDRESS       - the Gmail address to read from
  GMAIL_APP_PASSWORD  - the app password (16 chars, no spaces)

Exposes one tool: search_email(subject_contains: str) -> matching
message subjects + bodies (plain text only, first match).
"""
import email
import imaplib
import json
import os
import sys

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

GMAIL_ADDRESS = os.environ["GMAIL_ADDRESS"]
GMAIL_APP_PASSWORD = os.environ["GMAIL_APP_PASSWORD"]

server = Server("gmail-read-fixture")


def search_email(subject_contains: str) -> str:
    imap = imaplib.IMAP4_SSL("imap.gmail.com")
    imap.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
    imap.select("INBOX", readonly=True)
    typ, data = imap.search(None, f'(SUBJECT "{subject_contains}")')
    ids = data[0].split()
    if not ids:
        imap.logout()
        return json.dumps({"found": False})
    typ, msg_data = imap.fetch(ids[-1], "(RFC822)")
    msg = email.message_from_bytes(msg_data[0][1])
    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                body = part.get_payload(decode=True).decode(errors="replace")
                break
    else:
        body = msg.get_payload(decode=True).decode(errors="replace")
    imap.logout()
    return json.dumps({"found": True, "subject": msg["subject"], "from": msg["from"], "body": body})


@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="search_email",
            description="Search the inbox by subject substring and return the most recent match's body.",
            inputSchema={
                "type": "object",
                "properties": {"subject_contains": {"type": "string"}},
                "required": ["subject_contains"],
            },
        )
    ]


@server.call_tool()
async def call_tool(name, arguments):
    if name == "search_email":
        result = search_email(arguments["subject_contains"])
        return [TextContent(type="text", text=result)]
    raise ValueError(f"Unknown tool: {name}")


async def main():
    async with stdio_server() as (read, write):
        await server.run(read, write, server.create_initialization_options())


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
