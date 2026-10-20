import {lessons,sources} from './course.js';
import {chapters,chapterFor} from './syllabus.js';
import {plans1} from './lesson-plans-1.js';
import {plans2} from './lesson-plans-2.js';
import {renderLessonStory} from './lesson-renderer.js';
import {bi,mountLab} from './widgets.js';

const plans = {...plans1,...plans2};
const app = document.querySelector('#app');
const t = value => bi(value.zh,value.en);
const saved = localStorage.getItem('algebra-progress-v1');
const progress = saved === null ? {} : JSON.parse(saved);
const totalQuestions = lessons.reduce((sum,lesson)=>sum+lesson.questions.length,0);
const completed = id => lessons[id-1].questions.every((_,i)=>progress[`${id}.${i}`]);
const solvedCount = () => lessons.reduce((sum,l)=>sum+l.questions.filter((_,i)=>progress[`${l.id}.${i}`]).length,0);
const lessonLink = id => `<a href="#lesson/${id}">${t(lessons[id-1].title)}</a>`;
const dependents = id => lessons.filter(l=>plans[l.id].prerequisites.includes(id));

function setLanguage(lang) {
  document.body.dataset.lang = lang;
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
  localStorage.setItem('algebra-language',lang);
  document.querySelectorAll('[data-language]').forEach(button=>{
    const selected = button.dataset.language === lang;
    button.classList.toggle('active',selected);
    button.setAttribute('aria-pressed',selected);
  });
}
document.querySelectorAll('[data-language]').forEach(button=>{
  button.onclick = () => setLanguage(button.dataset.language);
});
setLanguage(localStorage.getItem('algebra-language') || 'zh');

function lessonCard(lesson) {
  return `<a class="lesson-card" href="#lesson/${lesson.id}">
    <span class="number">${String(lesson.id).padStart(2,'0')} <span>${completed(lesson.id) ? '✓' : ''}</span></span>
    <h4>${t(lesson.title)}</h4><p>${t(plans[lesson.id].question)}</p>
    <span class="card-bottom">${bi('进入这个问题','Explore this question')} <span>↗</span></span>
  </a>`;
}

function home() {
  const next = lessons.find(l=>!completed(l.id));
  app.innerHTML = `<main id="main">
    <section class="hero">
      <div>
        <div class="eyebrow">ALGEBRA THROUGH QUESTIONS</div>
        <h1>${bi('从具体的问题，','From concrete questions')}<br><em>${bi('走进抽象代数。','into abstract algebra.')}</em></h1>
        <p>${bi('加法与旋转共享什么？为什么可以把一组元素当作一个数？方程的对称性又如何决定求根？沿着问题之间的联系，建立代数的全景。','What do addition and rotation share? When can a whole class of elements act as one number? How does symmetry constrain roots? Follow the connections between questions to see algebra as a whole.')}</p>
        <div class="actions">
          <a class="button primary" href="#outline">${bi('先看课程大纲','Start with the course outline')} →</a>
          <a class="button" id="continue" href="#lesson/${next ? next.id : 1}">${bi(solvedCount() ? '继续学习' : '进入第一课',solvedCount() ? 'Continue learning' : 'Open the first lesson')} ↗</a>
        </div>
        <div class="stats">
          <div><strong>6</strong><span>${bi('相互衔接的部分','Connected chapters')}</span></div>
          <div><strong>${lessons.length}</strong><span>${bi('具体问题','Concrete questions')}</span></div>
          <div><strong>中 / EN</strong><span>${bi('双语学习','Bilingual learning')}</span></div>
        </div>
      </div>
      <div class="hero-art"><span class="eyebrow">A FIRST QUESTION · D₄</span><div id="hero-lab"></div></div>
    </section>
    <section id="curriculum">
      <div class="section-head">
        <div><div class="eyebrow">FOLLOW THE IDEAS</div><h2>${bi('问题之间，有一条线。','There is a thread between the questions.')}</h2>
          <p>${bi('共同主干建立语言，专题拓展方法，前沿导览提出下一步问题。','The core builds a language, specialist topics extend its methods, and frontiers reveal the next questions.')}</p>
        </div>
        <div><span class="small">${solvedCount()} / ${totalQuestions} ${bi('题已掌握','solved')}</span><div class="progress"><i style="width:${solvedCount()/totalQuestions*100}%"></i></div></div>
      </div>
      <div class="filter"><input id="search" type="search" aria-label="搜索课程 / Search lessons" placeholder="搜索问题或概念 / Search questions or concepts…"><span class="small" id="search-count"></span></div>
      <div id="course-list"></div>
    </section>
    <section class="banner"><div><span class="eyebrow" style="color:#c2d9a3">CHOOSE YOUR NEXT QUESTION</span>
      <h2>${bi('对称、方程，还是几何？','Symmetry, equations, or geometry?')}</h2>
      <p>${bi('知识关系图标明每课的先修与后续去向。你可以沿主线学习，也可以从一个问题回溯所需工具。','The dependency map identifies prerequisites and destinations. Follow the core or work backward from a question to the tools it needs.')}</p>
    </div><a class="button" href="#map">${bi('查看知识关系','See the connections')} ↗</a></section>
  </main>`;
  mountLab(document.querySelector('#hero-lab'),'symmetry');
  const renderList = () => {
    const query = document.querySelector('#search').value.trim().toLowerCase();
    const found = lessons.filter(l=>[l.title.zh,l.title.en,plans[l.id].question.zh,plans[l.id].question.en,String(l.id)].some(value=>value.toLowerCase().includes(query)));
    document.querySelector('#course-list').innerHTML = found.length
      ? chapters.map((chapter,i)=>{
        const items = found.filter(l=>chapter.lessons.includes(l.id));
        return items.length ? `<section class="unit" id="unit-${i}">
          <div class="unit-heading"><span class="unit-num">0${i+1}</span><div><h3>${t(chapter.title)}</h3><p class="chapter-question-preview">${t(chapter.question)}</p></div></div>
          <div class="cards">${items.map(lessonCard).join('')}</div>
        </section>` : '';
      }).join('')
      : `<p class="empty">${bi('没有匹配的课程。试试“群”“Galois”或“模”。','No matching lessons. Try “group”, “Galois”, or “module”.')}</p>`;
    document.querySelector('#search-count').textContent = `${found.length} / ${lessons.length}`;
  };
  document.querySelector('#search').oninput = renderList;
  renderList();
}

function outline() {
  app.innerHTML = `<main id="main" class="outline-page">
    <div class="eyebrow">COURSE OUTLINE</div><h1 class="lesson-title">${bi('先看问题如何连在一起。','First, see how the questions connect.')}</h1>
    <p class="lead">${bi('课程从集合、函数与整数算术出发。六部分沿着“运算 → 结构 → 构造 → 对称 → 统一 → 研究”的线索展开；每课的内容顺序由它要回答的问题决定。','Begin with sets, functions, and integer arithmetic. Six chapters follow operations → structures → constructions → symmetries → unifying methods → research. Each lesson follows the argument needed to answer its question.')}</p>
    <div class="course-spine">${chapters.map((c,i)=>`<a href="#outline" data-scroll="chapter-${i}">0${i+1} · ${t(c.title)}</a>`).join('')}</div>
    <p class="note">${bi('先修是依赖关系，不是进度锁。西罗理论属于有限群专题；学习环可以直接从运算、同态与商结构继续。前沿课程各自链接所需基础。','Prerequisites express dependencies, not locks. Sylow theory is a finite-group topic; rings continue directly from operations, homomorphisms, and quotients. Each frontier topic links to the foundations it uses.')}</p>
    ${chapters.map((chapter,i)=>`<section class="chapter-outline" id="chapter-${i}">
      <div class="chapter-heading"><span class="chapter-index">0${i+1}</span><h2>${t(chapter.title)}</h2></div>
      <h3 class="chapter-question">${t(chapter.question)}</h3>
      <p class="chapter-purpose">${t(chapter.purpose)}</p>
      <ul class="chapter-outcomes">${chapter.outcomes.map(goal=>`<li>${t(goal)}</li>`).join('')}</ul>
      <p class="chapter-anchor">${t(chapter.anchor)}</p>
      <div class="chapter-lessons">${chapter.lessons.map(id=>`<a href="#lesson/${id}"><span>${String(id).padStart(2,'0')}</span><strong>${t(lessons[id-1].title)}</strong><small>${t(plans[id].question)}</small> →</a>`).join('')}</div>
      <p class="chapter-bridge">↳ ${t(chapter.bridge)}</p>
    </section>`).join('')}
    <a class="button primary" href="#lesson/1">${bi('从第一个问题开始','Begin with the first question')} →</a>
  </main>`;
}

function lesson(id) {
  const l = lessons[id-1], plan = plans[id], chapter = chapterFor(id);
  const after = dependents(id);
  app.innerHTML = `<div class="layout">
    <aside class="sidebar" aria-label="课程目录 / Course navigation">
      <a href="#outline">← ${bi('课程大纲','Course outline')}</a>
      ${chapters.map((c,i)=>`<h3>0${i+1} · ${t(c.title)}</h3>${c.lessons.map(n=>`<a href="#lesson/${n}" class="${n===id ? 'active' : ''}" ${n===id ? 'aria-current="page"' : ''}>
        ${String(n).padStart(2,'0')} ${t(lessons[n-1].title)} <span data-status="${n}">${completed(n) ? '✓' : ''}</span>
      </a>`).join('')}`).join('')}
    </aside>
    <main id="main" class="lesson-main narrative-page">
      <div class="breadcrumbs"><a href="#outline">${bi('课程大纲','Outline')}</a> / ${t(chapter.title)}</div>
      <p class="eyebrow">LESSON ${String(id).padStart(2,'0')} OF ${lessons.length}</p>
      <h1 class="lesson-title">${t(l.title)}</h1>
      <p class="lesson-question">${t(plan.question)}</p>
      <div class="lesson-context"><p class="recall">${t(plan.recall)}</p>
        <div class="prerequisite-links"><span>${bi('从这里来','Builds on')}:</span> ${plan.prerequisites.length ? plan.prerequisites.map(lessonLink).join(' · ') : bi('集合、函数与整数算术','Sets, functions, and integer arithmetic')}</div>
      </div>
      <nav class="story-nav" aria-label="本课内容 / In this lesson">${plan.sections.map((section,i)=>`<a href="#lesson/${id}" data-scroll="section-${i}">${t(section.title)}</a>`).join('')}</nav>
      ${renderLessonStory(l,plan,progress)}
      <aside class="lesson-boundary"><p class="note">${t(l.caution)}</p></aside>
      <details class="extension-exercise"><summary>${bi('进一步推敲','Take the idea further')} →</summary><p>${t(l.challenge)}</p></details>
      <section class="lesson-connections">
        <h2>${bi('这个问题把我们带向哪里？','Where does this question lead?')}</h2>
        <p class="lesson-destination">${t(plan.destination)}</p>
        ${after.length ? `<div class="downstream"><span>${bi('接着用到它的课程','Lessons that use this idea')}:</span> ${after.map(item=>lessonLink(item.id)).join('')}</div>` : `<a href="#map">${bi('选择下一条学习路线','Choose your next study route')} →</a>`}
      </section>
      <p class="small"><a href="#sources">${bi('参考资料与定理证明范围','References and proof scope')} ↗</a></p>
      <div class="next-lesson">
        ${id>1 ? `<a class="button" href="#lesson/${id-1}">← ${bi('上一篇','Previous')}</a>` : '<span></span>'}
        ${id<lessons.length ? `<a class="button primary" href="#lesson/${id+1}">${bi('继续课程','Continue the course')} →</a>` : `<a class="button primary" href="#map">${bi('知识关系图','Knowledge map')} →</a>`}
      </div>
    </main>
  </div>`;
  mountLab(document.querySelector('#lesson-lab'),l.lab);
  document.querySelectorAll('[data-quiz]').forEach(box=>{
    const i = Number(box.dataset.quiz), q = l.questions[i];
    box.querySelectorAll('button').forEach(button=>{
      button.onclick = () => {
        const correct = Number(button.dataset.answer) === q.answer;
        box.querySelectorAll('button').forEach(option=>option.classList.toggle('selected',option===button));
        const feedback = box.querySelector('.feedback');
        feedback.className = `feedback ${correct ? 'correct' : 'incorrect'}`;
        feedback.innerHTML = (correct ? bi('✓ 正确。','✓ Correct.') : bi('再想一想。','Think it through.')) + ' ' + t(q.why);
        if (correct) {
          progress[`${id}.${i}`] = true;
          localStorage.setItem('algebra-progress-v1',JSON.stringify(progress));
          box.querySelector('[data-solved]').textContent = '✓';
          document.querySelector(`[data-status="${id}"]`).textContent = completed(id) ? '✓' : '';
        }
      };
    });
  });
}

function map() {
  app.innerHTML = `<main id="main">
    <div class="eyebrow">CONCEPTS AND CONNECTIONS</div><h1 class="lesson-title">${bi('每个概念，都有来路与去处。','Every idea has roots and destinations.')}</h1>
    <p class="lead">${bi('下图从左向右读：先修概念 → 当前问题 → 使用它的后续课程。箭头表示知识依赖。课程编号方便定位，各条路线可以交叉。','Read each row from left to right: prerequisites → the current question → lessons that use it. Arrows indicate conceptual dependencies. Lesson numbers locate topics; study routes can intersect.')}</p>
    <div class="dependency-map">${chapters.map((chapter,i)=>`<h2>0${i+1} · ${t(chapter.title)}</h2>${chapter.lessons.map(id=>`
      <div class="dependency-row">
        <div class="dependency-from"><div class="dependency-label">${bi('先修概念','Prerequisites')} <span class="dependency-arrow" aria-hidden="true">→</span></div>${plans[id].prerequisites.length ? plans[id].prerequisites.map(lessonLink).join('') : bi('集合 · 函数 · 整数','Sets · functions · integers')}</div>
        <div class="dependency-topic"><div class="dependency-label">${String(id).padStart(2,'0')} · ${bi('当前问题','Current question')}</div>${lessonLink(id)}<small>${t(plans[id].question)}</small></div>
        <div class="dependency-to"><div class="dependency-label"><span class="dependency-arrow" aria-hidden="true">→</span> ${bi('后续课程','Following lessons')}</div>${dependents(id).length ? dependents(id).map(l=>lessonLink(l.id)).join('') : bi('继续专题阅读','Continue with specialist reading')}</div>
      </div>`).join('')}`).join('')}</div>
    <div class="panel"><h2>${bi('同一种构造，在不同章节再次出现','The same construction returns in different chapters')}</h2>
      <div class="linkrow">${lessonLink(4)} → ${lessonLink(5)} → ${lessonLink(6)} → ${lessonLink(10)}</div>
      <p>${bi('陪集是分块，纤维解释被合并的元素，商群赋予这些块运算，理想则让商上的乘法也成立。回到同一个例子时，观察新增了哪一个条件。','Cosets give a partition, fibers explain which elements merge, quotients put an operation on the blocks, and ideals make quotient multiplication work. Each return to an example adds a specific condition.')}</p>
    </div>
  </main>`;
}

function sourcePage() {
  app.innerHTML = `<main id="main">
    <div class="eyebrow">READING ROOM</div><h1 class="lesson-title">${bi('参考资料与数学约定','References and mathematical conventions')}</h1>
    <div class="panel"><h2>${bi('如何沿着课程学习','Following the course')}</h2>
      <p>${bi('从课程大纲了解六部分的目的，再进入具体问题。各页根据内容使用对照、构造、推理、操作或研究导览。练习出现在所检验的概念附近；“从这里来”与“带向哪里”连接课与课。','Start with the outline to understand the purpose of each chapter, then enter a concrete question. Lessons use comparisons, constructions, arguments, experiments, or research guides as the topic requires. Checks appear near the ideas they test; prerequisites and destinations connect the lessons.')}</p>
      <p>${bi('西罗、伽罗瓦基本定理、根式可解判据和模结构定理等长定理，在相应课程中标明引用的结论与本课展示的应用论证。前沿课程分别说明问题陈述、已知实例和仍未解决的部分。','For longer results such as Sylow, the fundamental theorem of Galois theory, the radical-solvability criterion, and module structure theorems, the lesson identifies the quoted theorem and its worked application. Frontier lessons distinguish the question, established examples, and what remains unresolved.')}</p>
      <p>${bi('环默认含 1，环同态保持 1。域满足 1≠0。D₄ 表示 8 阶正方形对称群。函数复合 fg 从右向左作用。有限代数实验使用精确整数运算；实曲线图展示几何构造。','Rings have 1 and ring homomorphisms preserve 1. Fields have 1≠0. D₄ is the order-8 square symmetry group. Composition fg acts right to left. Finite algebra experiments use exact integer arithmetic; real curves illustrate geometric constructions.')}</p>
    </div>
    <ol class="source-list">${sources.map(([name,url])=>`<li><a href="${url}" target="_blank" rel="noreferrer">${name} ↗</a></li>`).join('')}</ol>
    <div class="panel"><h2>${bi('来源与学习记录','Sources and learning records')}</h2>
      <p>${bi('交互课程的总体理念参考 cbwang2016/logic-course，本站文字与代码独立编写。开放问题来源核对日期：2026-10-20。','The interactive-course idea is inspired by cbwang2016/logic-course. This site’s prose and code are independently authored. Open-problem references checked on 2026-10-20.')}</p>
      <p>${bi('答对后自动保存。记录属于当前浏览器和站点地址；每课题目全部答对后显示完成标记。阅读拓展练习不计入答题进度。','Correct answers are saved automatically in this browser for this site address. A lesson is marked complete when all its checks are solved. Reading extension exercises does not count as solving a question.')}</p>
      <p>${solvedCount()} / ${totalQuestions} ${bi('题已掌握','questions solved')}</p>
      <button id="reset-progress">${bi('清空学习进度','Clear learning progress')}</button><span id="reset-message" role="status"></span>
    </div>
  </main>`;
  document.querySelector('#reset-progress').onclick = () => {
    Object.keys(progress).forEach(key=>delete progress[key]);
    localStorage.removeItem('algebra-progress-v1');
    sourcePage();
    document.querySelector('#reset-message').innerHTML = bi(' 已清空。',' Progress cleared.');
  };
}

document.addEventListener('click',event=>{
  const link = event.target.closest('a');
  if (link?.dataset.scroll) {
    event.preventDefault();
    document.getElementById(link.dataset.scroll).scrollIntoView();
  }
  if (link?.classList.contains('skip')) {
    event.preventDefault();
    document.getElementById('main').focus();
  }
});

function render() {
  const route = location.hash.slice(1) || 'home';
  let page = route;
  if (/^lesson\/(?:[1-9]|1\d|2[0-4])$/.test(route)) {
    const id = Number(route.split('/')[1]);
    lesson(id);
    document.title = `${lessons[id-1].title.zh} · Algebra Atlas`;
    page = 'lesson';
  } else {
    const pages = {home,outline,map,sources:sourcePage};
    if (Object.hasOwn(pages,route)) pages[route]();
    else app.innerHTML = `<main id="main"><h1>${bi('课程地址不存在','Lesson not found')}</h1><a class="button" href="#outline">${bi('查看课程大纲','View the course outline')}</a></main>`;
    document.title = '结构之旅 · Algebra Atlas';
  }
  document.querySelector('#topnav').innerHTML = [
    ['home','课程','Course'],['outline','课程大纲','Outline'],['map','知识关系','Connections'],['sources','阅读室','Readings']
  ].map(([key,zh,en])=>`<a href="#${key}" class="${key===page || (key==='home'&&page==='lesson') ? 'active' : ''}">${bi(zh,en)}</a>`).join('');
  document.getElementById('main').setAttribute('tabindex','-1');
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',render);
render();
