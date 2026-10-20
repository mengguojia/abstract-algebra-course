import test from 'node:test';
import assert from 'node:assert/strict';
import {cyclicJourney} from '../dist/cyclic-lab.js';
import {gcd,mod} from '../dist/math.js';

test('every supported cyclic journey reaches 0 for the first time at its element order',()=>{
 for(const n of [4,5,6,8,10,12]){
  for(let k=0;k<12;k++){
   const journey=cyclicJourney(n,k);
   const expected=n/gcd(n,k);
   assert.equal(journey.order,expected);
   assert.equal(journey.steps.length,expected);
   assert.equal(new Set(journey.residues).size,expected);
   for(let index=0;index<expected;index++){
    const step=journey.steps[index];
    assert.equal(step.number,index+1);
    assert.equal(step.from,mod(index*k,n));
    assert.equal(step.sum,step.from+k);
    assert.equal(step.to,mod((index+1)*k,n));
    if(index<expected-1)assert.notEqual(step.to,0);
   }
   assert.equal(journey.steps.at(-1).to,0);
  }
 }
});

test('zero steps and unreduced step sizes retain their exact arithmetic',()=>{
 assert.deepEqual(cyclicJourney(12,0).steps,[{number:1,from:0,to:0,sum:0}]);
 assert.deepEqual(cyclicJourney(4,11).steps,[
  {number:1,from:0,to:3,sum:11},
  {number:2,from:3,to:2,sum:14},
  {number:3,from:2,to:1,sum:13},
  {number:4,from:1,to:0,sum:12}
 ]);
});
