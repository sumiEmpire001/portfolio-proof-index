#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { validate, select, summary } from './catalog.mjs';

try {
  const args=process.argv.slice(2), command=args.shift()??'summary';
  if (!['validate','summary','search'].includes(command)) throw new Error('Usage: node src/cli.mjs [validate|summary|search QUERY]');
  const manifest=JSON.parse(readFileSync(new URL('../projects.json',import.meta.url),'utf8'));
  const errors=validate(manifest);
  if(errors.length) throw new Error(errors.join('\n'));
  console.log(JSON.stringify(command==='validate'?{valid:true,projects:manifest.projects.length}:command==='summary'?summary(manifest.projects):select(manifest.projects,{query:args.join(' ')}),null,2));
} catch(error) {console.error(error.message);process.exitCode=1;}
