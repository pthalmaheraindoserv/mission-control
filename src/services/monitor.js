import si from 'systeminformation';
export async function metrics(){const [load,mem,fs,os]=await Promise.all([si.currentLoad(),si.mem(),si.fsSize(),si.osInfo()]);return {cpu:+load.currentLoad.toFixed(1),memory:+((mem.active/mem.total)*100).toFixed(1),disk:fs[0]?+fs[0].use.toFixed(1):0,platform:`${os.platform} ${os.release}`,uptime:si.time().uptime};}
