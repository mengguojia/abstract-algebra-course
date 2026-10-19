# 结构之旅 · Algebra Atlas

24 课中英双语抽象代数交互网站。原生 HTML、CSS、JavaScript，无第三方运行依赖，无构建步骤。

## 启动

在本目录运行：

```powershell
node server.mjs
```

访问 http://localhost:8000 。按 Ctrl+C 停止。需要 Node.js 18 或更新版本。

## 课程

1. 运算、对称、循环群、子群与陪集
2. 同态、商群、群作用、西罗定理
3. 环、理想、分解与中国剩余定理、多项式
4. 域扩张、有限域、伽罗瓦对应、根式可解性
5. 模、有限生成阿贝尔群、表示、范畴
6. 代数几何、逆伽罗瓦问题、椭圆曲线与 BSD、研究全景

每课包含一个交互实验、定义、核心结论、分步论证、具体例子、两道自测与拓展练习。完整长定理的证明范围在相应课程注明，并链接延伸阅读。

语言模式：中文、英文、双语。语言与已答对题目保存在当前浏览器的 localStorage。答对每课两道自测才标记完成。在“阅读室”清空学习进度。

## 文件

- `dist/index.html`：网站入口。
- `dist/course.js`：双语课程与题库。
- `dist/math.js`：精确有限代数运算。
- `dist/widgets.js`：HTML/SVG 实验。
- `dist/app.js`：页面、导航与进度。
- `dist/style.css`：响应式样式。
- `tests/algebra.test.mjs`：代数性质穷举验证与课程完整性检查。

```powershell
npm test
```

源于 [logic-course](https://github.com/cbwang2016/logic-course) 的课程组织与交互理念，本站文字和代码独立编写。数学参考资料见网站“阅读室”。
