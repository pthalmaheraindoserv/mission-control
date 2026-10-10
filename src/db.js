import Database from 'better-sqlite3';
import fs from 'node:fs';
fs.mkdirSync('data', { recursive: true });
export const db = new Database('data/mission-control.db');
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS missions(id TEXT PRIMARY KEY,title TEXT,prompt TEXT,status TEXT,created_at TEXT,updated_at TEXT);
CREATE TABLE IF NOT EXISTS tasks(id TEXT PRIMARY KEY,mission_id TEXT,agent_id TEXT,title TEXT,status TEXT,result TEXT,created_at TEXT,updated_at TEXT);
CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY AUTOINCREMENT,mission_id TEXT,source TEXT,target TEXT,content TEXT,created_at TEXT);
CREATE TABLE IF NOT EXISTS memories(id INTEGER PRIMARY KEY AUTOINCREMENT,scope TEXT,key TEXT,value TEXT,created_at TEXT,updated_at TEXT);
CREATE TABLE IF NOT EXISTS schedules(id TEXT PRIMARY KEY,name TEXT,cron_expr TEXT,prompt TEXT,enabled INTEGER DEFAULT 1,created_at TEXT);
CREATE TABLE IF NOT EXISTS documents(id TEXT PRIMARY KEY,title TEXT,path TEXT,content TEXT,created_at TEXT,updated_at TEXT);
CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY AUTOINCREMENT,type TEXT,payload TEXT,created_at TEXT);
`);
export const now=()=>new Date().toISOString();
