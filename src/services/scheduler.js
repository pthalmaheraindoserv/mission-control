import cron from 'node-cron';
import {db} from '../db.js';
const jobs=new Map();
export function loadSchedules(io,execute){for(const r of db.prepare('SELECT * FROM schedules WHERE enabled=1').all()) register(r,io,execute);}
export function register(row,io,execute){jobs.get(row.id)?.stop(); if(!cron.validate(row.cron_expr)) throw new Error('Cron tidak valid'); jobs.set(row.id,cron.schedule(row.cron_expr,()=>execute(io,row.prompt,row.name)));}
