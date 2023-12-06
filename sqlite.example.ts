import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
 
const sqlite = new Database(':memory:');
const db = drizzle(sqlite);
const query = sql`select "hello ming2" as text`;
const result = db.get<{ text: string }>(query);
console.log(result);
