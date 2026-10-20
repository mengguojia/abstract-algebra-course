import test from 'node:test';
import assert from 'node:assert/strict';
import {d4apply,d4mul} from '../dist/math.js';
import {actionSteps,afterMove,verticesFor,movePoint} from '../dist/symmetry-motion.js';

const group = Array.from({length:8},(_,i)=>[i%4,Math.floor(i/4)]);
const pointAt = index => [[1,0],[0,1],[-1,0],[0,-1]][index];
const near = (a,b) => assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);

test('animated endpoints match the D4 permutations from every starting symmetry',()=>{
  for (const g of group) for (const move of ['r','s']) {
    const next = afterMove(g,move);
    verticesFor(g).forEach((point,i)=>{
      const result = movePoint(point,move,1);
      pointAt(d4apply(next,i)).forEach((coordinate,j)=>near(result[j],coordinate));
    });
  }
});

test('rotation follows a rigid circular path and reflection keeps its axis fixed',()=>{
  for (const t of [.1,.25,.5,.75,.9]) {
    const points = verticesFor([0,0]).map(point=>movePoint(point,'r',t));
    points.forEach(([x,y])=>near(x*x+y*y,1));
    points.forEach(([x,y],i)=>{
      const [u,v] = points[(i+1)%4];
      near((x-u)**2+(y-v)**2,2);
    });
    near(movePoint([1,0],'s',t)[0],1);
    near(movePoint([1,0],'s',t)[1],0);
  }
  near(movePoint([0,1],'s',.5)[1],0);
  assert.ok(movePoint([1,0],'r',.25)[1]>0,'positive mathematical y means counterclockwise');
});

test('two-step playback composes right to left and acts on the existing state',()=>{
  const expected = {r:[1,0],s:[0,1],rs:[1,1],sr:[3,1]};
  for (const g of group) for (const [action,moves] of Object.entries(actionSteps)) {
    const result = moves.reduce(afterMove,g);
    assert.deepEqual(result,d4mul(expected[action],g));
  }
  assert.notDeepEqual(actionSteps.rs.reduce(afterMove,[0,0]),actionSteps.sr.reduce(afterMove,[0,0]));
});
