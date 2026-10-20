import {bi,htmlText} from './widgets.js';

const t = value => bi(value.zh, value.en);

export function renderQuiz(lesson, index, progress) {
  const q = lesson.questions[index];
  return `<div class="quiz" data-quiz="${index}">
    <span class="tag">${bi('想一想','CHECK YOUR REASONING')} <span data-solved>${progress[`${lesson.id}.${index}`] ? '✓' : ''}</span></span>
    <h3>${t(q.prompt)}</h3>
    <div class="quiz-options">${q.options.map((option,i)=>`<button data-answer="${i}">${String.fromCharCode(65+i)}. ${t(option)}</button>`).join('')}</div>
    <div class="feedback" role="status" aria-live="polite"></div>
  </div>`;
}

const blockRenderers = {
  text: section => `<div class="story-prose"><p>${t(section.body)}</p></div>`,
  lab: section => `<p class="lab-question">${t(section.prompt)}</p><div class="experiment" id="lesson-lab"></div>`,
  concept: (section,lesson) => `<div class="concept-layout"><div class="concept-text"><p>${t(lesson.definition)}</p></div><div class="formula">${htmlText(lesson.formula)}</div></div>`,
  argument: (section,lesson) => `<p class="argument-intro">${t(section.intro)}</p>
    <div class="result-statement">${t(lesson.theorem)}</div>
    <details class="proof-disclosure"><summary>${bi('跟随论证','Follow the argument')} →</summary>
      <ol class="proof-list">${lesson.proof.map(step=>`<li>${t(step)}</li>`).join('')}</ol>
    </details>`,
  example: (section,lesson) => `<div class="worked-example"><p>${t(lesson.example)}</p></div>`,
  quiz: (section,lesson,progress) => renderQuiz(lesson,section.index,progress),
  comparison: section => `<div class="comparison-grid">${section.items.map(item=>`<article class="comparison-item">
    <h3>${t(item.title)}</h3>${item.formula ? `<div class="formula">${htmlText(item.formula)}</div>` : ''}<p>${t(item.body)}</p>
  </article>`).join('')}</div>`,
  steps: section => `<ol class="construction-steps">${section.items.map(item=>`<li><h3>${t(item.title)}</h3><p>${t(item.body)}</p></li>`).join('')}</ol>`,
  callout: section => `<div class="insight"><p>${t(section.body)}</p></div>`
};

export function renderLessonStory(lesson,plan,progress) {
  return plan.sections.map((section,i)=>`<section class="story-block ${section.kind}" id="section-${i}">
    <h2 class="story-heading">${t(section.title)}</h2>
    ${blockRenderers[section.kind](section,lesson,progress)}
  </section>`).join('');
}
