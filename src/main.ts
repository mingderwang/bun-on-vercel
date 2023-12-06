import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export default {
  async fetch(request: Request, server: Server) {
    let text = "Hello from Bun on Vercel!\n"

const sqlite = new Database(':memory:');
const db = drizzle(sqlite);
const query = sql`select "hello ming2" as text`;
const result = db.get<{ text: string }>(query);
    text += JSON.stringify(result);
    text += `\nurl: ${request.url}\n`

    for (const [key, value] of request.headers.entries()) {
      if (!key.startsWith("x-vercel")) continue
      text += `\n${key}: ${value}`
    }

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
  },
}
