import {bi} from './lab-ui.js';

const t = value => bi(value.zh,value.en);
const number = id => String(id).padStart(2,'0');

export function mountLearningMap(root,{lessons,chapters,plans,completed,initialId=1}) {
  root.classList.add('learning-map');
  root.innerHTML = `
    <div class="eyebrow">QUESTIONS AND CONNECTIONS</div>
    <h1 class="lesson-title">${bi('把问题连成学习路线。','Connect questions into a learning route.')}</h1>
    <p class="lead learning-map-intro">${bi('六部分展示课程全景，先修联系帮助你选择路线。从第一课建立基础，也可以从感兴趣的问题回溯需要的工具。','Six chapters show the whole course; prerequisites help you choose a route. Build foundations from lesson one, or work backward from a question that interests you.')}</p>
    <div class="learning-map-toolbar">
      <div>
        <p class="learning-map-instruction">${bi('选择任意一课，看它从哪些概念出发，又通向哪些问题。','Select a lesson to see the concepts it builds on and the questions it leads to.')}</p>
        <p class="learning-map-selection" role="status" aria-live="polite"></p>
      </div>
      <button type="button" data-map-detail>${bi('查看所选课程的联系','Explore the selected lesson')} ↓</button>
    </div>
    <div class="learning-map-key" aria-label="关系标记 / Relationship key">
      <span class="map-key-selected">${bi('正在查看','Selected')}</span>
      <span class="map-key-prerequisite">${bi('需要先学','Builds on')}</span>
      <span class="map-key-following">${bi('接着用到','Used by')}</span>
    </div>
    <div class="learning-map-overview">
      ${chapters.map((chapter,i)=>`<section class="learning-map-chapter" aria-labelledby="map-chapter-${i}">
        <div class="learning-map-chapter-heading"><span>${number(i+1)}</span><h2 id="map-chapter-${i}">${t(chapter.title)}</h2></div>
        <p class="learning-map-chapter-question">${t(chapter.question)}</p>
        <div class="learning-map-nodes">${chapter.lessons.map(id=>`<button type="button" class="learning-map-node" data-map-lesson="${id}" aria-pressed="false">
          <span class="map-node-number">${number(id)}</span>
          <span class="map-node-title">${t(lessons[id-1].title)}${completed(id) ? `<span class="map-node-complete">✓ ${bi('已完成','Complete')}</span>` : ''}</span>
          <span class="map-node-relation"></span>
        </button>`).join('')}</div>
        <button type="button" class="map-chapter-detail-link" data-map-detail data-map-chapter="${i}" hidden></button>
      </section>`).join('')}
    </div>
    <section class="learning-map-detail" aria-labelledby="map-detail-title"></section>`;

  const detail = root.querySelector('.learning-map-detail');
  const selection = root.querySelector('.learning-map-selection');
  const overviewButtons = [...root.querySelectorAll('.learning-map-node')];
  const chapterDetailButtons = [...root.querySelectorAll('.map-chapter-detail-link')];
  const relatedButton = id => `<button type="button" data-map-lesson="${id}" class="map-related-lesson"><span>${number(id)}</span>${t(lessons[id-1].title)} <span aria-hidden="true">↗</span></button>`;

  function select(id) {
    const lesson = lessons[id-1], plan = plans[id];
    const chapterIndex = chapters.findIndex(chapter=>chapter.lessons.includes(id));
    const chapter = chapters[chapterIndex];
    const following = lessons.filter(item=>plans[item.id].prerequisites.includes(id)).map(item=>item.id);
    selection.innerHTML = `${bi('正在查看','Selected')}: <strong>${number(id)} · ${t(lesson.title)}</strong>`;
    for (const button of chapterDetailButtons) {
      const selectedChapter = Number(button.dataset.mapChapter) === chapterIndex;
      button.hidden = !selectedChapter;
      button.innerHTML = selectedChapter ? `${bi(`查看第 ${id} 课的联系`,`Explore lesson ${id} connections`)} <span aria-hidden="true">↓</span>` : '';
    }
    for (const button of overviewButtons) {
      const buttonId = Number(button.dataset.mapLesson);
      const relation = buttonId === id ? 'selected' : plan.prerequisites.includes(buttonId) ? 'prerequisite' : following.includes(buttonId) ? 'following' : 'none';
      button.dataset.relation = relation;
      button.setAttribute('aria-pressed',buttonId === id);
      button.querySelector('.map-node-relation').innerHTML = relation === 'selected' ? bi('当前','Selected') : relation === 'prerequisite' ? bi('先修','Needed') : relation === 'following' ? bi('后续','Uses this') : '';
    }
    detail.innerHTML = `
      <div class="learning-map-detail-heading">
        <div><div class="eyebrow">${bi('追踪一个问题','Follow a question')}</div><h2 id="map-detail-title" tabindex="-1">${number(id)} · ${t(lesson.title)}</h2></div>
        <a class="button primary" href="#lesson/${id}">${bi('进入这一课','Enter this lesson')} →</a>
      </div>
      <div class="learning-map-connections">
        <section class="map-connection map-connection-before">
          <h3>${bi('从这里出发','Builds on')} <span aria-hidden="true">→</span></h3>
          <div class="map-related-list">${plan.prerequisites.length ? plan.prerequisites.map(relatedButton).join('') : `<p class="map-foundations">${bi('集合、函数与整数算术','Sets, functions, and integer arithmetic')}</p>`}</div>
          <p>${t(plan.recall)}</p>
        </section>
        <section class="map-connection map-connection-current">
          <h3>${bi('本课要回答','The question here')}</h3>
          <p class="map-current-question">${t(plan.question)}</p>
          <p class="map-current-progress">${completed(id) ? bi('✓ 本课自测已完成','✓ All checks completed') : bi('通过本课两道自测后，地图会显示完成标记。','Complete both lesson checks to mark this lesson on the map.')}</p>
        </section>
        <section class="map-connection map-connection-after">
          <h3><span aria-hidden="true">→</span> ${bi('接着用在哪里','Used next in')}</h3>
          <div class="map-related-list">${following.length ? following.map(relatedButton).join('') : `<p class="map-foundations">${bi('带着这个问题继续探索','Continue exploring this question')}</p>`}</div>
          <p>${t(plan.destination)}</p>
        </section>
      </div>
      <section class="learning-map-chapter-context">
        <div class="map-chapter-purpose">
          <p class="eyebrow">${bi('所在章节','In this chapter')} · ${number(chapterIndex+1)}</p>
          <h3>${t(chapter.title)}</h3>
          <p>${t(chapter.purpose)}</p>
        </div>
        <div class="map-chapter-outcomes">
          <h4>${bi('学完这一部分，你能','By the end of this chapter')}</h4>
          <ul>${chapter.outcomes.map(outcome=>`<li>${t(outcome)}</li>`).join('')}</ul>
          <p class="map-chapter-anchor">${t(chapter.anchor)}</p>
        </div>
      </section>
      <p class="map-chapter-bridge">${t(chapter.bridge)}</p>`;
  }

  root.addEventListener('click',event=>{
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-map-detail')) {
      detail.scrollIntoView({block:'start'});
      detail.querySelector('#map-detail-title').focus({preventScroll:true});
    }
    if (button.hasAttribute('data-map-lesson')) {
      const id = Number(button.dataset.mapLesson);
      select(id);
      history.replaceState(null,'',`#map/${id}`);
      if (!button.isConnected) detail.querySelector('#map-detail-title').focus({preventScroll:true});
    }
  });
  select(initialId);
}
