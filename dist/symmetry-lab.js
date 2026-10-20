import {bi} from './lab-ui.js';
import {d4apply} from './math.js';
import {actionSteps,verticesFor,afterMove,groupName,movePoint} from './symmetry-motion.js';

const colors = ['#b76838','#28634c','#52768d','#7c6594'];
const center = [220,160], radius = 100;
const screenPoint = ([x,y]) => [center[0]+radius*x,center[1]-radius*y];
const polygonPoints = points => points.map(point=>screenPoint(point).join(',')).join(' ');
const moveLabel = move => move === 'r' ? bi('逆时针旋转 90°','Rotate 90° counterclockwise') : bi('沿水平轴反射','Reflect across the horizontal axis');
const ease = t => t < .5 ? 4*t*t*t : 1-(-2*t+2)**3/2;
const introductions = {
  symmetry: [
    ['看清每一步，发现顺序的差别。','Follow each move. See why order matters.'],
    ['选择一个动作，跟随彩色顶点。组合操作会分两步播放。','Choose a move and follow the colored vertices. Combinations play one step at a time.']
  ],
  action: [
    ['八个动作，四个位置。','Eight symmetries. Four positions.'],
    ['从初始位置追踪顶点 1。哪些动作移动它，哪些让它留在原位？','Track vertex 1 from its starting position. Which moves displace it, and which leave it fixed?']
  ],
  representation: [
    ['让矩阵的两列一起动起来。','Watch the two columns of a matrix move.'],
    ['橙色 e₁ 与绿色 e₂ 是两个基向量。它们的去向决定变换矩阵。','The orange e₁ and green e₂ are basis vectors. Their images determine the transformation matrix.']
  ]
};

export function mountSymmetryLab(root,type) {
  let g = [0,0];
  root.classList.add('symmetry-lab');
  root.dataset.animation = 'idle';
  root.innerHTML = `
    <div class="symmetry-intro">
      <h3>${bi(...introductions[type][0])}</h3>
      <p>${bi(...introductions[type][1])}</p>
    </div>
    <div class="symmetry-controls">
      <button data-do="r"><span class="move-symbol">r ↶</span><span class="move-caption">${bi('逆时针 90°','Rotate 90°')}</span></button>
      <button data-do="s"><span class="move-symbol">s ↕</span><span class="move-caption">${bi('水平轴反射','Reflect')}</span></button>
      <button data-do="rs"><span class="move-symbol">rs</span><span class="move-caption">${bi('先 s，再 r','s then r')}</span></button>
      <button data-do="sr"><span class="move-symbol">sr</span><span class="move-caption">${bi('先 r，再 s','r then s')}</span></button>
    </div>
    <div class="symmetry-stage stage">
      <svg class="symmetry-diagram" viewBox="0 0 440 320" role="img" aria-label="Animated square symmetries / 正方形的对称动作">
        <path d="M70 160H370 M220 25V295" stroke="#e1e5db" stroke-width="1"/>
        <circle cx="220" cy="160" r="100" stroke="#e1e5db" stroke-dasharray="3 6" fill="none"/>
        <g class="fixed-positions" text-anchor="middle">
          <text x="357" y="165">P₁</text><text x="220" y="25">P₂</text>
          <text x="83" y="165">P₃</text><text x="220" y="304">P₄</text>
        </g>
        <polygon data-ghost points="" fill="none" stroke="#9eaa9b" stroke-width="1.5" stroke-dasharray="5 5"/>
        <g data-trails>${colors.map(color=>`<path fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="4 5" opacity=".55"/>`).join('')}</g>
        <polygon data-shape points="" fill="#dce8cf" stroke="#28634c" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon data-wedge points="" fill="#b76838" fill-opacity=".16"/>
        <g data-axis opacity="0">
          <path d="M55 160H385" stroke="#b76838" stroke-width="1.5" stroke-dasharray="6 5"/>
          <text x="350" y="146" text-anchor="middle" style="fill:#9a562d;font-size:12px"><tspan class="zh">反射轴</tspan><tspan class="en">mirror axis</tspan></text>
        </g>
        ${type==='representation' ? [0,1].map(i=>`<path data-vector="${i}" stroke="${colors[i]}" stroke-width="3" fill="none"/><text data-basis="${i}" style="fill:${colors[i]};font-size:14px;font-weight:600">e${i===0?'₁':'₂'}</text>`).join('') : ''}
        <circle cx="220" cy="160" r="3" fill="#28634c"/>
        ${colors.map((color,i)=>`<g data-vertex="${i}"><circle r="17" fill="${color}" stroke="#fffef9" stroke-width="2"/><text y="6" text-anchor="middle" style="fill:#fff;font-size:19px;font-weight:600">${i+1}</text></g>`).join('')}
      </svg>
    </div>
    <div class="symmetry-playback">
      <div class="move-status" role="status">${bi('从一个动作开始。','Start with one move.')}</div>
      <button data-do="reset">↺ ${bi('复位','Reset')}</button>
    </div>
    <ol class="symmetry-sequence"><li><span class="step-number">·</span>${bi('选择 r、s 或一个组合','Choose r, s, or a combination')}</li></ol>
    <output class="symmetry-result" aria-live="polite"></output>
    <p class="symmetry-note">${bi('P₁–P₄ 标记固定位置。比较 rs 与 sr 前，请先复位。','P₁–P₄ mark fixed positions. Reset before comparing rs with sr.')}</p>`;

  const diagram = root.querySelector('svg');
  const vertices = [...root.querySelectorAll('[data-vertex]')];
  const ghost = root.querySelector('[data-ghost]');
  const axis = root.querySelector('[data-axis]');
  const trails = [...root.querySelectorAll('[data-trails] path')];
  const status = root.querySelector('.move-status');
  const sequence = root.querySelector('.symmetry-sequence');
  const buttons = [...root.querySelectorAll('button')];
  const output = root.querySelector('output');

  function draw(points) {
    root.querySelector('[data-shape]').setAttribute('points',polygonPoints(points));
    root.querySelector('[data-wedge]').setAttribute('points',`${center.join(',')} ${polygonPoints(points.slice(0,2))}`);
    vertices.forEach((vertex,i)=>{
      const [x,y] = screenPoint(points[i]);
      vertex.setAttribute('transform',`translate(${x} ${y})`);
    });
    if (type === 'representation') {
      for (const i of [0,1]) {
        const [x,y] = screenPoint(points[i]);
        root.querySelector(`[data-vector="${i}"]`).setAttribute('d',`M220 160L${x} ${y}`);
        const label = root.querySelector(`[data-basis="${i}"]`);
        label.setAttribute('x',220+(x-220)*.65+8);
        label.setAttribute('y',160+(y-160)*.65-8);
      }
    }
  }

  function showResult() {
    const name = groupName(g), [a,b] = g;
    const c = [1,0,-1,0][a], sn = [0,1,0,-1][a];
    output.innerHTML = `<div class="symmetry-state"><small>${bi('当前变换','Current transformation')}</small><strong>${name}</strong></div>
      <div><small>${bi('顶点 → 固定位置','Vertex → fixed position')}</small><div class="vertex-mapping">${colors.map((color,i)=>`<span ${i===0?'class="tracked"':''} style="--vertex-color:${color}">${i+1} → P${['₁','₂','₃','₄'][d4apply(g,i)]}</span>`).join('')}</div></div>
      ${type==='action' ? `<p class="representation-readout">${bi('初始位置 P₁ 的轨道有 4 个位置；稳定子为 {e,s}。8 = 4 × 2。','The initial position P₁ has an orbit of size 4 and stabilizer {e,s}. 8 = 4 × 2.')}</p>` : ''}
      ${type==='representation' ? `<div class="representation-readout"><div>ρ(${name}) = [ ${c}, ${b?sn:-sn} ; ${sn}, ${b?-c:c} ]</div><div>e₁ ↦ (${c}, ${sn}) · e₂ ↦ (${b?sn:-sn}, ${b?-c:c})</div><div>χ = ${c+(b?-c:c)}</div><small>${bi('矩阵在每一步完成后更新。','The matrix updates after each completed step.')}</small></div>` : ''}`;
    diagram.setAttribute('aria-label',`D₄: ${name}; ${colors.map((_,i)=>`${i+1} → P${d4apply(g,i)+1}`).join(', ')}`);
  }

  function animate(move,points) {
    ghost.setAttribute('points',polygonPoints(points));
    axis.setAttribute('opacity',move==='s' ? '1' : '0');
    const duration = move==='r' ? 950 : 1100;
    return new Promise(resolve=>{
      let started;
      function frame(time) {
        if (!root.isConnected) { resolve(false); return; }
        started ??= time;
        const progress = Math.min((time-started)/duration,1);
        const t = ease(progress);
        draw(points.map(point=>movePoint(point,move,t)));
        trails.forEach((trail,i)=>{
          const path = Array.from({length:33},(_,n)=>screenPoint(movePoint(points[i],move,t*n/32)));
          trail.setAttribute('d',path.map(([x,y],n)=>`${n?'L':'M'}${x} ${y}`).join(' '));
        });
        root.dataset.frame = String(Math.round(progress*100));
        if (progress<1) requestAnimationFrame(frame);
        else resolve(true);
      }
      requestAnimationFrame(frame);
    });
  }

  async function play(action) {
    const moves = actionSteps[action];
    buttons.forEach(button=>button.disabled=true);
    root.querySelector(`[data-do="${action}"]`).classList.add('playing');
    root.dataset.animation = 'playing';
    sequence.innerHTML = moves.map((move,i)=>`<li data-step="${i}"><span class="step-number">${i+1}</span><strong>${move}</strong> ${moveLabel(move)}</li>`).join('');
    for (const [i,move] of moves.entries()) {
      const step = sequence.querySelector(`[data-step="${i}"]`);
      step.classList.add('current');
      status.innerHTML = `${i+1} / ${moves.length} · ${moveLabel(move)}`;
      const connected = await animate(move,verticesFor(g));
      if (!connected) return;
      g = afterMove(g,move);
      draw(verticesFor(g));
      showResult();
      step.classList.replace('current','done');
    }
    status.innerHTML = bi(`已完成 ${action} · 当前为 ${groupName(g)}`,`${action} complete · current: ${groupName(g)}`);
    root.dataset.animation = 'idle';
    root.querySelector('.playing').classList.remove('playing');
    buttons.forEach(button=>button.disabled=false);
  }

  root.querySelectorAll('[data-do]:not([data-do="reset"])').forEach(button=>{
    button.onclick = () => play(button.dataset.do);
  });
  root.querySelector('[data-do="reset"]').onclick = () => {
    g = [0,0];
    draw(verticesFor(g));
    showResult();
    ghost.setAttribute('points','');
    trails.forEach(trail=>trail.setAttribute('d',''));
    axis.setAttribute('opacity','0');
    status.innerHTML = bi('已回到初始位置。','Back at the starting position.');
    sequence.innerHTML = `<li><span class="step-number">·</span>${bi('选择下一个动作','Choose the next move')}</li>`;
  };
  draw(verticesFor(g));
  showResult();
}
