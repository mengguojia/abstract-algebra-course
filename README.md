# 结构之旅 · Algebra Atlas

24 课中英双语抽象代数交互网站。原生 HTML、CSS、JavaScript，无第三方运行依赖，无构建步骤。

## 启动

在本目录运行：

```powershell
node server.mjs
```

访问 http://localhost:8000 。按 Ctrl+C 停止。需要 Node.js 18 或更新版本。

## 课程

1. 运算、对称与循环群
2. 子群与陪集、同态、商群、群作用、西罗定理
3. 环、理想、分解与中国剩余定理、多项式
4. 域扩张、有限域、伽罗瓦对应、根式可解性
5. 模、有限生成阿贝尔群、表示、范畴
6. 代数几何、逆伽罗瓦问题、椭圆曲线与 BSD、研究全景

入口为课程大纲（`#outline`）：每部分列出核心问题、内容顺序、学习目标、贯穿案例与下一部分的联系。知识关系页（`#map`）按实际先修依赖连接课程。

每课独立组织叙事。运算从规则比较进入，对称从动作进入，商结构从代表元问题进入，域从添根构造进入，伽罗瓦对应使用两张联动关系图，研究课区分问题、已知实例、未知部分与后续路线。练习嵌在相应概念旁，定义、论证、实验和对照按内容需要安排。长定理的证明范围在相应课程注明，并链接延伸阅读。

语言模式：中文、英文、双语。语言与已答对题目保存在当前浏览器的 localStorage。答对每课两道自测才标记完成。在“阅读室”清空学习进度。

对称实验逐步演示整个正方形的旋转与反射，并显示复合顺序、运动轨迹与顶点去向；表示课同时展示两个基向量。循环群实验支持单步与完整轨道播放，显示首次回到零的步数。动画由用户操作触发，群元素与矩阵在每步完成后更新。

## 文件

- `dist/index.html`：网站入口。
- `dist/course.js`：双语课程与题库。
- `dist/syllabus.js`：六部分课程大纲与教学目标。
- `dist/lesson-plans-1.js`、`dist/lesson-plans-2.js`：逐课叙事、先修、过渡与内容安排。
- `dist/lesson-blocks.js`、`dist/lesson-renderer.js`：正文、比较、构造、论证与练习的基础呈现组件。
- `dist/math.js`：精确有限代数运算。
- `dist/widgets.js`：HTML/SVG 实验。
- `dist/symmetry-lab.js`、`dist/symmetry-motion.js`、`dist/symmetry.css`：对称动作、分步复合与动态几何。
- `dist/cyclic-lab.js`、`dist/cyclic.css`：循环轨道的逐步演示。
- `dist/lab-ui.js`：实验共用的双语文本。
- `dist/app.js`：页面、导航与进度。
- `dist/style.css`：响应式样式。
- `dist/narrative.css`：按内容类型区分的阅读与教学版式。
- `tests/algebra.test.mjs`：代数性质穷举验证与课程完整性检查。
- `tests/curriculum.test.mjs`：大纲覆盖、先修路径、双语叙事与答题记录检查。
- `tests/symmetry-motion.test.mjs`、`tests/cyclic-motion.test.mjs`：动画端点、运动轨迹与精确代数结果的一致性。

```powershell
npm test
```

源于 [logic-course](https://github.com/cbwang2016/logic-course) 的课程组织与交互理念，本站文字和代码独立编写。数学参考资料见网站“阅读室”。
