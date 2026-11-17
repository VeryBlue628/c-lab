import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Worker} from 'node:worker_threads';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
await build({entryPoints:['src/engine/structure.ts','src/data/runtime-curriculum.ts','src/data/pathway.ts','src/services/progress.ts','src/engine/judge.ts'],bundle:true,platform:'node',format:'esm',outdir:'.qa/upgrade',outExtension:{'.js':'.mjs'}});
const get=async p=>import(pathToFileURL(path.resolve('.qa/upgrade/'+p+'.mjs')));
const {checkStructure}=await get('engine/structure');
const {outputMatches}=await get('engine/judge');
const {chapterOrder}=await get('data/pathway');
assert.equal(new Set(chapterOrder).size,20);
assert(chapterOrder.indexOf(5)<chapterOrder.indexOf(4));
assert(chapterOrder.indexOf(13)<chapterOrder.indexOf(14));
const {loadChapter,lessonById,lessons}=await get('data/runtime-curriculum');
assert.equal(lessonById['c20-9'].example,undefined);
await loadChapter(12);
assert(lessonById['c12-5'].example);
assert.equal(lessonById['c20-9'].example,undefined,'unvisited chapter stays unloaded');
assert.equal(lessons.length,147);
const {validate,completed,unlocked}=await get('services/progress');
const old={version:1,current:'c12-5',records:{'c12-5':{quizPassed:true,practicePassed:true,draft:'old code',tasks:{practice:{passed:true,draft:'old task'}}}},freeMode:false};
const migrated=validate(old);
assert(completed(migrated.records['c12-5']),'keep old course completion');
assert.equal(migrated.records['c12-5'].practicePassed,false,'new challenge requires resubmission');
assert.equal(migrated.records['c12-5'].tasks.practice.passed,false);
assert.equal(migrated.records['c12-5'].draft,'old code');
assert(unlocked('c12-5',migrated),'current lesson remains accessible after reorder');
const revised=validate({...old,records:{'c12-5':{practicePassed:true,practiceRevision:2}}});
assert(revised.records['c12-5'].practicePassed);
const recursive=[{kind:'recursive',label:'recursion'}];
assert(checkStructure('int f(int n){return n?f(n-1):0;} int main(void){return f(3);}',recursive)[0].passed);
for(const code of [
 '/* f(n-1) */ int main(void){return 0;}',
 'int f(int n){return n;} int main(void){return f(3);}',
 'int f(int n){return n?f(n-1):0;} int main(void){return 0;}',
 'int main(void){char *s="f(n-1)";return 0;}',
])assert.equal(checkStructure(code,recursive)[0].passed,false,code);
const all=JSON.parse(await fs.readFile('src/data/textbook-lessons.json','utf8')).flatMap(c=>c.lessons);
assert.equal(all.length,84);
let checked=0;
for(const l of all){
 assert.notEqual(l.example,l.challenge.solution,l.id);
 assert.equal(l.challenge.revision,2);
 const checks=checkStructure(l.challenge.solution,l.challenge.structure,l.challenge.files);
 assert(checks.every(c=>c.passed),l.id+': '+JSON.stringify(checks.filter(c=>!c.passed)));
 if(checks.length){checked++;assert(checkStructure('int main(void){return 0;}',l.challenge.structure).some(c=>!c.passed),l.id);}
}
// Run the old examples against the new tasks, including virtual-file effects.
// verify-compiler.mjs creates this wrapper and separately validates all answers.
const worker=new Worker(path.resolve('.qa/worker.mjs'));
const job=(l)=>new Promise((resolve,reject)=>{
 const timer=setTimeout(()=>reject(Error(l.id+' timeout')),20000);
 const handler=m=>{if(m.type==='result'){clearTimeout(timer);worker.off('message',handler);resolve(m.runs);}};
 worker.on('message',handler);
 worker.postMessage({code:l.example,inputs:l.challenge.tests.map(t=>t.input),options:l.challenge.tests.map(t=>({files:{...l.challenge.files,...t.files},args:t.args??l.challenge.args}))});
});
try {
 for(const l of all){
  const runs=await job(l);
  const passes=l.challenge.tests.every((t,i)=>runs[i]?.status==='success'&&outputMatches(t.output,runs[i].stdout,t.exact)&&Object.entries(t.expectedFiles||{}).every(([n,s])=>new TextDecoder().decode(new Uint8Array(runs[i].files?.[n]||[]))===s));
  assert.equal(passes,false,l.id+': copying the example must not pass');
 }
}finally{await worker.terminate();}
console.log(`Learning upgrade: 84 independent tasks reject old examples; ${checked} method checks accept reference answers; recursion negative controls, chapter loading, pathway and progress migration pass.`);
