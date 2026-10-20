import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons} from '../dist/course.js';
import {chapters,chapterFor} from '../dist/syllabus.js';
import {plans1} from '../dist/lesson-plans-1.js';
import {plans2} from '../dist/lesson-plans-2.js';
import {renderLessonStory,renderQuiz} from '../dist/lesson-renderer.js';

const plans = {...plans1,...plans2};
const ids = lessons.map(lesson=>lesson.id);

test('the outline covers every lesson once and all prerequisite routes are reachable',()=>{
  assert.deepEqual(chapters.flatMap(chapter=>chapter.lessons),ids);
  assert.deepEqual(Object.keys(plans).map(Number),ids);
  const visited = new Set();
  for (const id of ids) {
    assert.ok(chapterFor(id).lessons.includes(id));
    const prerequisites = plans[id].prerequisites;
    assert.equal(new Set(prerequisites).size,prerequisites.length);
    for (const prerequisite of prerequisites) assert.ok(visited.has(prerequisite),`Lesson ${id} needs an earlier lesson ${prerequisite}`);
    visited.add(id);
  }
  const ancestors = id => plans[id].prerequisites.flatMap(parent=>[parent,...ancestors(parent)]);
  assert.ok(!ancestors(9).includes(8),'Sylow theory is not required to begin rings');
});

test('every learning route has bilingual narrative and renders its lab and original questions',()=>{
  const checkBilingual = value => {
    if (Array.isArray(value)) return value.forEach(checkBilingual);
    if (typeof value !== 'object' || value === null) return;
    if ('zh' in value || 'en' in value) {
      assert.ok(typeof value.zh === 'string' && value.zh.trim().length);
      assert.ok(typeof value.en === 'string' && value.en.trim().length);
    }
    Object.values(value).forEach(checkBilingual);
  };
  chapters.forEach(checkBilingual);
  for (const lesson of lessons) {
    const plan = plans[lesson.id];
    checkBilingual(plan);
    const html = renderLessonStory(lesson,plan,{});
    assert.equal([...html.matchAll(/id="lesson-lab"/g)].length,1);
    assert.deepEqual([...html.matchAll(/data-quiz="(\d+)"/g)].map(match=>Number(match[1])).sort(),lesson.questions.map((_,i)=>i));
    assert.ok(!html.includes('undefined'));
    for (const section of plan.sections) assert.ok(html.includes(section.title.zh));
  }
});

test('question records stay attached to their original IDs when sections are reordered',()=>{
  for (const lesson of lessons) {
    for (const i of [0,1]) {
      const progress = {[`${lesson.id}.${i}`]:true};
      assert.match(renderQuiz(lesson,i,progress),/<span data-solved>✓<\/span>/);
      assert.match(renderQuiz(lesson,1-i,progress),/<span data-solved><\/span>/);
    }
  }
});

test('mathematical inequalities remain literal text in rendered lessons',()=>{
  const html = renderLessonStory(lessons[17],plans[18],{});
  assert.ok(html.includes('1&lt;d₁'));
  assert.ok(!html.includes('1<d₁'));
});
