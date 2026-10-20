import {bi} from './lab-ui.js';
import {orbit,mod,gcd} from './math.js';

export function cyclicJourney(n,k){
 const residues=orbit(n,k);
 return {
  n,k,order:n/gcd(n,k),residues,
  steps:residues.map((from,index)=>({
   number:index+1,from,to:mod(from+k,n),sum:from+k
  }))
 };
}

const choices=(values,current)=>values.map(value=>`<option value="${value}"${value===current?' selected':''}>${value}</option>`).join('');
const position=(value,n)=>({
 x:230+142*Math.sin(2*Math.PI*value/n),
 y:195-142*Math.cos(2*Math.PI*value/n)
});
const edgePath=(step,n)=>{
 const a=position(step.from,n),b=position(step.to,n);
 return step.from===step.to
  ?`M ${a.x} ${a.y} C ${a.x+65} ${a.y-55} ${a.x+65} ${a.y+55} ${a.x} ${a.y}`
  :`M ${a.x} ${a.y} L ${b.x} ${b.y}`;
};
const edgePosition=(step,n,t)=>{
 const a=position(step.from,n),b=position(step.to,n);
 if(step.from!==step.to)return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};
 const u=1-t;
 return {
  x:u*u*u*a.x+3*u*u*t*(a.x+65)+3*u*t*t*(a.x+65)+t*t*t*a.x,
  y:u*u*u*a.y+3*u*u*t*(a.y-55)+3*u*t*t*(a.y+55)+t*t*t*a.y
 };
};

export function mountCyclicLab(root){
 root.classList.add('cyclic-lab');
 root.innerHTML=`
  <div class="cyclic-controls">
   <label>${bi('模数','Modulus')} <span>n</span>
    <select data-control="n">${choices([4,5,6,8,10,12],12)}</select>
   </label>
   <label>${bi('步长','Step size')} <span>k</span>
    <select data-control="k">${choices(Array.from({length:12},(_,i)=>i),4)}</select>
   </label>
   <div class="cyclic-actions">
    <button data-next class="cyclic-primary">${bi('走一步','Take a step')}</button>
    <button data-all>${bi('播放完整轨道','Play full orbit')}</button>
    <button data-reset>${bi('重新开始','Restart')}</button>
   </div>
  </div>
  <div class="cyclic-workspace">
   <div class="cyclic-diagram">
    <svg viewBox="45 15 370 365" role="img" aria-label="Repeated addition around a cyclic group / 循环群中的重复加法">
     <circle class="cyclic-ring" cx="230" cy="195" r="142"/>
     <g data-trail></g>
     <path data-active-edge pathLength="1" class="cyclic-active-edge"/>
     <g data-nodes></g>
     <g data-cursor>
      <circle class="cyclic-cursor-ring" r="24"/>
      <circle data-moving-dot class="cyclic-moving-dot" r="5" hidden/>
     </g>
    </svg>
    <div class="cyclic-legend">
     <span class="cyclic-current-key">${bi('当前位置','Current position')}</span>
     <span class="cyclic-visited-key">${bi('已访问','Visited')}</span>
    </div>
   </div>
   <div class="cyclic-reading">
    <div class="cyclic-step-count">${bi('已完成步数','Steps completed')} <strong data-step-count>0</strong></div>
    <output class="cyclic-status" aria-live="polite"></output>
    <div class="cyclic-route-label">${bi('已经走过的轨迹','The route so far')}</div>
    <ol class="cyclic-route" aria-label="Orbit / 轨道"></ol>
    <div class="cyclic-conclusion"></div>
   </div>
  </div>`;
 const nInput=root.querySelector('[data-control="n"]');
 const kInput=root.querySelector('[data-control="k"]');
 const next=root.querySelector('[data-next]');
 const controls=[...root.querySelectorAll('button,select')];
 const nodes=root.querySelector('[data-nodes]');
 const trail=root.querySelector('[data-trail]');
 const activeEdge=root.querySelector('[data-active-edge]');
 const cursor=root.querySelector('[data-cursor]');
 const movingDot=root.querySelector('[data-moving-dot]');
 const status=root.querySelector('.cyclic-status');
 const route=root.querySelector('.cyclic-route');
 const conclusion=root.querySelector('.cyclic-conclusion');
 const stepCount=root.querySelector('[data-step-count]');
 let journey=cyclicJourney(12,4);
 let completed=0;
 const setCursor=point=>cursor.setAttribute('transform',`translate(${point.x} ${point.y})`);
 const equation=step=>`<span class="cyclic-equation">${step.from} + ${journey.k} = ${step.sum}<br>≡ ${step.to} <small>(mod ${journey.n})</small></span>`;
 const setBusy=busy=>{
  controls.forEach(control=>{control.disabled=busy;});
  next.disabled=busy||completed===journey.order;
  root.setAttribute('aria-busy',String(busy));
 };
 const updateVisited=()=>{
  const visited=new Set([0,...journey.steps.slice(0,completed).map(step=>step.to)]);
  nodes.querySelectorAll('[data-residue]').forEach(node=>{
   node.classList.toggle('is-visited',visited.has(Number(node.dataset.residue)));
   node.classList.remove('is-target');
  });
  const values=[0,...journey.steps.slice(0,completed).map(step=>step.to)];
  route.innerHTML=values.map((value,index)=>`<li${index===completed?' class="is-current"':''}>${value}</li>`).join('');
  stepCount.textContent=completed;
 };
 const showConclusion=()=>{
  const closed=completed===journey.order;
  conclusion.innerHTML=closed
   ?`<p class="cyclic-closed">${bi(`第 ${completed} 步首次回到 0。`,`Step ${completed} returns to 0 for the first time.`)}</p>
     <p class="cyclic-set">⟨${journey.k}⟩ = {${journey.residues.join(', ')}}</p>
     <p>${bi('生成子群的阶','Order of the generated subgroup')}<br><strong>${journey.order} = ${journey.n} / gcd(${journey.n}, ${journey.k})</strong></p>`
   :`<p>${bi(`从 0 出发，每次加 ${journey.k}，再取模 ${journey.n}。第几步会回到起点？`,`Start at 0. Add ${journey.k} each time, modulo ${journey.n}. How many steps return you to the start?`)}</p>`;
 };
 const reset=()=>{
  journey=cyclicJourney(Number(nInput.value),Number(kInput.value));
  completed=0;
  trail.innerHTML='';
  activeEdge.removeAttribute('d');
  movingDot.setAttribute('hidden','');
  nodes.innerHTML=Array.from({length:journey.n},(_,value)=>{
   const p=position(value,journey.n);
   return `<g data-residue="${value}" transform="translate(${p.x} ${p.y})"><circle r="17"/><text dy=".35em">${value}</text></g>`;
  }).join('');
  setCursor(position(0,journey.n));
  status.innerHTML=`<span class="cyclic-step-label">${bi('从单位元开始','Begin at the identity')}</span><span class="cyclic-equation">0</span>`;
  updateVisited();
  showConclusion();
  setBusy(false);
 };
 const beginStep=()=>{
  const step=journey.steps[completed];
  nodes.querySelector(`[data-residue="${step.to}"]`).classList.add('is-target');
  activeEdge.setAttribute('d',edgePath(step,journey.n));
  activeEdge.setAttribute('stroke-dasharray','1');
  activeEdge.setAttribute('stroke-dashoffset','1');
  movingDot.removeAttribute('hidden');
  status.innerHTML=`<span class="cyclic-step-label">${bi(`第 ${step.number} 步：加 ${journey.k}`,`Step ${step.number}: add ${journey.k}`)}</span>${equation(step)}`;
 };
 const finishStep=()=>{
  const step=journey.steps[completed];
  trail.insertAdjacentHTML('beforeend',`<path d="${edgePath(step,journey.n)}"/>`);
  completed++;
  setCursor(position(step.to,journey.n));
  activeEdge.removeAttribute('d');
  movingDot.setAttribute('hidden','');
  updateVisited();
  showConclusion();
 };
 const run=full=>{
  if(full)reset();
  setBusy(true);
  const target=full?journey.order:completed+1;
  const duration=full?330:550;
  const pause=full?110:0;
  let start;
  let resting=false;
  beginStep();
  const frame=now=>{
   if(!root.isConnected)return;
   if(start===undefined)start=now;
   if(resting){
    if(now-start<pause){requestAnimationFrame(frame);return;}
    resting=false;
    start=now;
    beginStep();
   }
   const fraction=Math.min((now-start)/duration,1);
   const eased=fraction*fraction*(3-2*fraction);
   setCursor(edgePosition(journey.steps[completed],journey.n,eased));
   activeEdge.setAttribute('stroke-dashoffset',String(1-eased));
   if(fraction===1){
    finishStep();
    if(completed===target){setBusy(false);return;}
    resting=true;
    start=now;
   }
   requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
 };
 nInput.onchange=reset;
 kInput.onchange=reset;
 next.onclick=()=>run(false);
 root.querySelector('[data-all]').onclick=()=>run(true);
 root.querySelector('[data-reset]').onclick=reset;
 reset();
}
