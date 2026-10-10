import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
const clients=new Map();
export async function connectMcp(name,command,args=[]){const client=new Client({name:'mission-control',version:'1.0.0'});const transport=new StdioClientTransport({command,args});await client.connect(transport);clients.set(name,client);return await client.listTools();}
export async function listMcp(){const out=[];for(const [name,client] of clients)out.push({name,tools:(await client.listTools()).tools});return out;}
export async function callMcp(name,tool,args){const c=clients.get(name);if(!c)throw new Error('MCP server belum terhubung');return c.callTool({name:tool,arguments:args});}
