import {v4 as uuid} from 'uuid';
import {agents,byId} from './agents/registry.js';
import {db,now} from './db.js';
import {askLLM} from './services/llm.js';
import {emit} from './services/bus.js';
function route(prompt){
 const p=prompt.toLowerCase(); let found=agents.filter(a=>a.id!=='director'&&a.id!=='qa'&&a.keywords.some(k=>p.includes(k))).map(a=>a.id);
 if(!found.length) found=['research','planner'];
 if(!found.includes('critic')) found.push('critic');
 return [...new Set(found)].slice(0,5);
}
async function runAgent(agent,prompt,context){
 const result=await askLLM([{role:'system',content:`Kamu adalah ${agent.name}. ${agent.instruction} Jawab dalam bahasa Indonesia. Jangan mengaku melakukan tindakan eksternal yang tidak dilakukan.`},{role:'user',content:`Misi: ${prompt}\nKonteks tim:\n${context||'-'}`}]);
 return result||`[Mode tanpa LLM] ${agent.name} menerima tugas: ${prompt}. Konfigurasikan LLM_BASE_URL dan LLM_MODEL agar agent menghasilkan analisis.`;
}
export async function executeMission(io,prompt,title=prompt.slice(0,80)){
 const id=uuid(), ts=now(); db.prepare('INSERT INTO missions VALUES(?,?,?,?,?,?)').run(id,title,prompt,'running',ts,ts); emit(io,'mission.created',{id,title});
 const selected=route(prompt); let context=''; const outputs=[];
 for(const agentId of selected){
   const taskId=uuid(), agent=byId(agentId); db.prepare('INSERT INTO tasks VALUES(?,?,?,?,?,?,?,?)').run(taskId,id,agentId,`${agent.name}: ${title}`,'running','',now(),now()); emit(io,'task.started',{taskId,missionId:id,agentId});
   try{ const result=await runAgent(agent,prompt,context); outputs.push({agent:agent.name,result}); context+=`\n\n${agent.name}:\n${result}`; db.prepare('UPDATE tasks SET status=?,result=?,updated_at=? WHERE id=?').run('done',result,now(),taskId); db.prepare('INSERT INTO messages(mission_id,source,target,content,created_at) VALUES(?,?,?,?,?)').run(id,agentId,'director',result,now()); emit(io,'task.completed',{taskId,missionId:id,agentId,result}); }
   catch(e){ db.prepare('UPDATE tasks SET status=?,result=?,updated_at=? WHERE id=?').run('failed',e.message,now(),taskId); emit(io,'task.failed',{taskId,error:e.message}); }
 }
 const synthesis=await runAgent(byId('director'),prompt,context);
 const qa=await runAgent(byId('qa'),prompt,`${context}\n\nSintesis:\n${synthesis}`);
 const final=`${synthesis}\n\n---\nQA Review:\n${qa}`;
 db.prepare('UPDATE missions SET status=?,updated_at=? WHERE id=?').run('done',now(),id); db.prepare('INSERT INTO messages(mission_id,source,target,content,created_at) VALUES(?,?,?,?,?)').run(id,'director','user',final,now()); emit(io,'mission.completed',{id,final});
 return {id,agents:selected,final,outputs};
}
