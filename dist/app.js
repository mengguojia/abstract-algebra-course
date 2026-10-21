import {lessons} from './course.js';
import {chapters,chapterFor} from './syllabus.js';
import {plans1} from './lesson-plans-1.js';
import {plans2} from './lesson-plans-2.js';
import {renderLessonStory} from './lesson-renderer.js';
import {mountLearningMap} from './learning-map.js';
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
          <a class="button primary" id="continue" href="#lesson/${next ? next.id : 1}">${bi(solvedCount() ? '继续学习' : '进入第一课',solvedCount() ? 'Continue learning' : 'Open the first lesson')} →</a>
          <a class="button" href="#map">${bi('查看学习地图','Explore the learning map')} ↗</a>
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
        <div><div class="eyebrow">FOLLOW THE IDEAS</div><h2>${bi('从一个问题，找到下一步。','Let one question lead to the next.')}</h2>
          <p>${bi('共同主干建立语言，专题拓展方法，前沿导览提出下一步问题。','The core builds a language, specialist topics extend its methods, and frontiers reveal the next questions.')}</p>
        </div>
        <div><span class="small">${solvedCount()} / ${totalQuestions} ${bi('题已掌握','solved')}</span><div class="progress"><i style="width:${solvedCount()/totalQuestions*100}%"></i></div></div>
      </div>
      <div class="filter"><input id="search" type="search" aria-label="搜索课程 / Search lessons" placeholder="搜索问题或概念 / Search questions or concepts…"><span class="small" id="search-count"></span></div>
      <div id="course-list"></div>
      <details class="learning-record"><summary>${bi('学习记录','Learning record')}</summary>
        <p>${bi('答对的题目自动保存在当前浏览器；每课两题全部答对后显示完成标记。','Correct answers are saved in this browser. A lesson is marked complete when both checks are solved.')}</p>
        <button id="reset-progress">${bi('清空学习进度','Clear learning progress')}</button><span id="reset-message" role="status"></span>
      </details>
    </section>
    <section class="banner"><div><span class="eyebrow" style="color:#c2d9a3">CHOOSE YOUR NEXT QUESTION</span>
      <h2>${bi('对称、方程，还是几何？','Symmetry, equations, or geometry?')}</h2>
      <p>${bi('在学习地图中选择一个问题，查看它所在章节的目的、所需基础，以及它将打开的下一条路线。','Choose a question on the learning map to see its chapter’s purpose, the foundations it needs, and the routes it opens.')}</p>
    </div><a class="button" href="#map">${bi('探索学习地图','Explore the learning map')} ↗</a></section>
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
  document.querySelector('#reset-progress').onclick = () => {
    Object.keys(progress).forEach(key=>delete progress[key]);
    localStorage.removeItem('algebra-progress-v1');
    home();
    document.querySelector('.learning-record').open = true;
    document.querySelector('#reset-message').innerHTML = bi(' 已清空。',' Progress cleared.');
  };
}

function lesson(id) {
  const l = lessons[id-1], plan = plans[id], chapter = chapterFor(id);
  const after = dependents(id);
  app.innerHTML = `<div class="layout">
    <aside class="sidebar" aria-label="课程目录 / Course navigation">
      <a href="#map/${id}">← ${bi('学习地图','Learning map')}</a>
      ${chapters.map((c,i)=>`<h3>0${i+1} · ${t(c.title)}</h3>${c.lessons.map(n=>`<a href="#lesson/${n}" class="${n===id ? 'active' : ''}" ${n===id ? 'aria-current="page"' : ''}>
        ${String(n).padStart(2,'0')} ${t(lessons[n-1].title)} <span data-status="${n}">${completed(n) ? '✓' : ''}</span>
      </a>`).join('')}`).join('')}
    </aside>
    <main id="main" class="lesson-main narrative-page">
      <div class="breadcrumbs"><a href="#map/${id}">${bi('学习地图','Learning map')}</a> / ${t(chapter.title)}</div>
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
      <div class="next-lesson">
        ${id>1 ? `<a class="button" href="#lesson/${id-1}">← ${bi('上一篇','Previous')}</a>` : '<span></span>'}
        ${id<lessons.length ? `<a class="button primary" href="#lesson/${id+1}">${bi('继续课程','Continue the course')} →</a>` : `<a class="button primary" href="#map">${bi('学习地图','Learning map')} →</a>`}
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

function map(initialId = 1) {
  app.innerHTML = '<main id="main" class="learning-map-page"></main>';
  mountLearningMap(document.querySelector('#main'),{lessons,chapters,plans,completed,initialId});
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
  let route = location.hash.slice(1) || 'home';
  if (route === 'outline') {
    route = 'map';
    history.replaceState(null,'','#map');
  }
  let page = route;
  if (/^lesson\/(?:[1-9]|1\d|2[0-4])$/.test(route)) {
    const id = Number(route.split('/')[1]);
    lesson(id);
    document.title = `${lessons[id-1].title.zh} · Algebra Atlas`;
    page = 'lesson';
  } else if (/^map(?:\/(?:[1-9]|1\d|2[0-4]))?$/.test(route)) {
    map(route === 'map' ? 1 : Number(route.split('/')[1]));
    document.title = '学习地图 · Algebra Atlas';
    page = 'map';
  } else {
    if (route === 'home') home();
    else app.innerHTML = `<main id="main"><h1>${bi('课程地址不存在','Lesson not found')}</h1><a class="button" href="#map">${bi('查看学习地图','Explore the learning map')}</a></main>`;
    document.title = '结构之旅 · Algebra Atlas';
  }
  document.querySelector('#topnav').innerHTML = [
    ['home','课程','Course'],['map','学习地图','Learning map']
  ].map(([key,zh,en])=>{
    const active = key===page || (key==='home'&&page==='lesson');
    return `<a href="#${key}" class="${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}>${bi(zh,en)}</a>`;
  }).join('');
  document.getElementById('main').setAttribute('tabindex','-1');
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',render);
render();
