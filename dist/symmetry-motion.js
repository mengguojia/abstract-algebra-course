import {d4apply,d4mul} from './math.js';

export const actionSteps = {r:['r'],s:['s'],rs:['s','r'],sr:['r','s']};
const generators = {r:[1,0],s:[0,1]};
const positions = [[1,0],[0,1],[-1,0],[0,-1]];

export const verticesFor = g => positions.map((_,i)=>positions[d4apply(g,i)]);
export const afterMove = (g,move) => d4mul(generators[move],g);
export const groupName = ([a,b]) => (['','r','r²','r³'][a] + (b ? 's' : '')) || 'e';

export function movePoint([x,y],move,t) {
  switch (move) {
    case 'r': {
      if (t === 1) return [-y,x];
      const angle = Math.PI*t/2;
      return [x*Math.cos(angle)-y*Math.sin(angle),x*Math.sin(angle)+y*Math.cos(angle)];
    }
    case 's':
      return [x,t === 1 ? -y : y*Math.cos(Math.PI*t)];
    default:
      throw new Error(`Unknown square move: ${move}`);
  }
}
