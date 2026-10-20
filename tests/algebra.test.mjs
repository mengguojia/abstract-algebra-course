import test from 'node:test';
import assert from 'node:assert/strict';
import {mod,gcd,orbit,cosets,d4mul,d4apply,units,inverse,gf4mul,sylowCandidates} from '../dist/math.js';
import {lessons} from '../dist/course.js';
test('D4 multiplication agrees with actual vertex permutations and group laws',()=>{
 const group=Array.from({length:8},(_,i)=>[i%4,Math.floor(i/4)]);
 const key=g=>g.join(',');
 assert.equal(new Set(group.map(g=>[0,1,2,3].map(v=>d4apply(g,v)).join(','))).size,8);
 for(const a of group){assert.deepEqual(d4mul(a,[0,0]),a);assert.ok(group.some(b=>key(d4mul(a,b))==='0,0'&&key(d4mul(b,a))==='0,0'));
  for(const b of group){for(let v=0;v<4;v++)assert.equal(d4apply(d4mul(a,b),v),d4apply(a,d4apply(b,v)));
   for(const c of group)assert.deepEqual(d4mul(d4mul(a,b),c),d4mul(a,d4mul(b,c)));
  }
 }
 assert.notDeepEqual(d4mul([1,0],[0,1]),d4mul([0,1],[1,0]));
});
test('cyclic orders, coset partitions and Lagrange for all displayed moduli',()=>{
 for(let n=2;n<=12;n++)for(let k=0;k<=12;k++){
  const h=orbit(n,k),cs=cosets(n,k);assert.equal(h.length,n/gcd(n,k));
  assert.deepEqual(cs.flat().sort((a,b)=>a-b),Array.from({length:n},(_,i)=>i));
  cs.forEach(c=>assert.equal(c.length,h.length));assert.equal(cs.length*h.length,n);
  for(const a of h)for(const b of h)assert.ok(h.includes(mod(a-b,n)));
 }
});
test('GF4 is a field: exhaustive associativity, distributivity and inverses',()=>{
 for(let a=0;a<4;a++){
  assert.equal(gf4mul(a,1),a);assert.equal(gf4mul(a,0),0);
  if(a)assert.ok([1,2,3].some(b=>gf4mul(a,b)===1));
  for(let b=0;b<4;b++){assert.equal(gf4mul(a,b),gf4mul(b,a));for(let c=0;c<4;c++){
   assert.equal(gf4mul(a,gf4mul(b,c)),gf4mul(gf4mul(a,b),c));
   assert.equal(gf4mul(a,b^c),gf4mul(a,b)^gf4mul(a,c));
  }}
 }
 assert.equal(gf4mul(2,2),3);assert.equal(gf4mul(2,3),1);
});
test('unit groups and CRT correspondences',()=>{
 for(let n=2;n<=12;n++)for(let a=1;a<n;a++){
  const inv=inverse(a,n);assert.equal(inv!==undefined,gcd(a,n)===1);if(inv!==undefined)assert.equal(mod(a*inv,n),1);
 }
 assert.deepEqual(units(6),[1,5]);
 for(let m=2;m<=5;m++)for(let n=2;n<=5;n++){
  const image=new Set(Array.from({length:m*n},(_,x)=>`${x%m},${x%n}`));
  assert.equal(image.size,m*n/gcd(m,n));assert.equal(image.size===m*n,gcd(m,n)===1);
 }
});
test('Sylow candidates and exact examples',()=>{
 assert.deepEqual(sylowCandidates(15,5),[1]);assert.deepEqual(sylowCandidates(12,3),[1,4]);assert.deepEqual(sylowCandidates(21,7),[1]);
 assert.equal((-1)**2,(-1)**3-(-1)+1);assert.equal(((-7)/8)**2,(1/4)**3-1/4+1);
});
test('complete bilingual course and answer schemas',()=>{
 assert.equal(lessons.length,24);
 const bilingual=x=>{assert.equal(typeof x.zh,'string');assert.ok(x.zh.length);assert.equal(typeof x.en,'string');assert.ok(x.en.length);};
 lessons.forEach((l,i)=>{assert.equal(l.id,i+1);[l.title,l.goal,l.definition,l.theorem,l.example,l.caution,l.challenge,...l.proof].forEach(bilingual);assert.ok(l.proof.length);assert.equal(l.questions.length,2);l.questions.forEach(q=>{bilingual(q.prompt);bilingual(q.why);q.options.forEach(bilingual);assert.ok(q.answer>=0&&q.answer<q.options.length);});});
});
