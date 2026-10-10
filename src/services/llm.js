export async function askLLM(messages){
 const base=(process.env.LLM_BASE_URL||'').replace(/\/$/,'');
 if(!base) return null;
 const r=await fetch(`${base}/chat/completions`,{method:'POST',headers:{'content-type':'application/json','authorization':`Bearer ${process.env.LLM_API_KEY||'local'}`},body:JSON.stringify({model:process.env.LLM_MODEL||'qwen2.5:3b',messages,temperature:0.25})});
 if(!r.ok) throw new Error(`LLM ${r.status}: ${await r.text()}`);
 const j=await r.json(); return j.choices?.[0]?.message?.content||null;
}
