import { EventEmitter } from 'node:events';
export const bus=new EventEmitter();
export function emit(io,type,payload){ bus.emit(type,payload); io.emit('event',{type,payload,at:new Date().toISOString()}); }
