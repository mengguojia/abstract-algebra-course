import {b} from './lesson-blocks.js';
export const chapters = [
 {
  title:b('从操作中认出群','Recognizing groups in operations'), lessons:[1,2,3],
  question:b('加法与旋转，究竟共享什么？','What do addition and rotation have in common?'),
  purpose:b('先区分运算及其规律，再从正方形对称提炼群。循环群把“重复一个动作”变成第一个完整可计算的模型。','Separate an operation from its laws, then extract the group concept from square symmetries. Cyclic groups turn repetition into a fully computable model.'),
  outcomes:[b('能用反例区分结合律与交换律。','Distinguish associativity and commutativity using counterexamples.'),b('能把几何动作写成群元素并计算元素的阶。','Write geometric actions as group elements and compute their orders.')],
  bridge:b('一个动作能生成子群。下一问：子群怎样把整个群分块？','An action generates a subgroup. Next: how does a subgroup partition the entire group?'),
  anchor:b('反复出现的例子：正方形、模 n 加法。','Recurring examples: a square and addition modulo n.')
 },
 {
  title:b('分块、压缩与作用','Partitioning, quotienting, and acting'), lessons:[4,5,6,7,8],
  question:b('怎样从局部结构读懂整个群？','How can local structure reveal an entire group?'),
  purpose:b('陪集给出分块，同态说明哪些元素被合并，正规性允许对块运算。群作用把结构问题转成计数，西罗理论将这些计数用于有限群。','Cosets partition a group; homomorphisms identify elements; normality lets cosets be multiplied. Actions translate structure into counting, which Sylow theory applies to finite groups.'),
  outcomes:[b('能解释拉格朗日定理的计数理由。','Explain the counting argument behind Lagrange’s theorem.'),b('能连接同态的核、纤维、商群与像。','Connect kernels, fibers, quotients, and images.'),b('能用轨道–稳定子公式和西罗约束分析具体群。','Use orbit–stabilizer and Sylow constraints in concrete groups.')],
  bridge:b('群的商需要正规子群。加入乘法之后，什么条件才能让商上的两种运算都成立？','Group quotients need normal subgroups. With a second operation, what makes both quotient operations well-defined?'),
  anchor:b('贯穿案例：ℤ/12ℤ → ℤ/4ℤ；D₄ 对顶点的作用。','Continuing examples: ℤ/12ℤ → ℤ/4ℤ and the vertex action of D₄.')
 },
 {
  title:b('算术为什么需要环','Why arithmetic needs rings'), lessons:[9,10,11,12],
  question:b('哪些熟悉的整数规律可以推广？','Which familiar arithmetic laws survive abstraction?'),
  purpose:b('从零因子造成的消去失效进入环。理想解决商的乘法问题，中国剩余定理拆分算术，多项式商环则创造新元素。','Failed cancellation through zero divisors motivates rings. Ideals make quotient multiplication possible; CRT decomposes arithmetic; polynomial quotients create new elements.'),
  outcomes:[b('能区分单位、零因子、整环与域。','Distinguish units, zero divisors, domains, and fields.'),b('能解释理想的吸收条件与商环的关系。','Explain how ideal absorption makes quotient multiplication work.'),b('能用不可约多项式构造域。','Construct a field using an irreducible polynomial.')],
  bridge:b('一旦能构造新数，就可以研究“加入这些数之后，多出了什么结构”。','Once new numbers can be constructed, ask what structure their adjunction adds.'),
  anchor:b('贯穿案例：ℤ/6ℤ、CRT、𝔽₂[x]/(x²+x+1)。','Continuing examples: ℤ/6ℤ, CRT, and 𝔽₂[x]/(x²+x+1).')
 },
 {
  title:b('新数、对称与求根','New numbers, symmetries, and roots'), lessons:[13,14,15,16],
  question:b('为什么对称性可以决定方程能否根式求解？','Why can symmetry decide whether an equation is solvable by radicals?'),
  purpose:b('先用向量空间测量扩张，再在有限域中看见自同构。伽罗瓦对应把域塔转成子群结构，最终将根式问题转成可解群问题。','Measure extensions as vector spaces, then meet automorphisms in finite fields. Galois correspondence translates field towers into subgroup structure and radical solvability into group solvability.'),
  outcomes:[b('能解释次数与元素个数的区别，使用塔式定理。','Distinguish extension degree from cardinality and use the tower law.'),b('能在双二次扩张中逐项识别固定域。','Identify fixed fields in a biquadratic extension.'),b('能准确说明一般五次方程的根式障碍。','State the radical obstruction for the general quintic precisely.')],
  bridge:b('域上的线性结构帮助测量扩张。接下来，把标量换成环，或让群作用在线性空间上。','Linear structure measures field extensions. Next, replace scalar fields by rings, or let groups act on vector spaces.'),
  anchor:b('贯穿案例：√2、四元素域、ℚ(√2,√3)、S₃ 与 S₅。','Continuing examples: √2, the four-element field, ℚ(√2,√3), S₃ and S₅.')
 },
 {
  title:b('线性方法与共同构造','Linear methods and shared constructions'), lessons:[17,18,19,20],
  question:b('怎样在不同代数结构之间迁移方法？','How do methods transfer between algebraic structures?'),
  purpose:b('模扩展线性代数，阿贝尔群结构定理展示其分类能力；表示把群动作变成矩阵。最后用泛性质说明构造由哪些映射决定。','Modules extend linear algebra, and the structure theorem for abelian groups displays their classification power. Representations turn actions into matrices. Universal properties characterize constructions through maps.'),
  outcomes:[b('能说明非零挠元为何妨碍 ℤ 模具有自由基。','Explain why nonzero torsion prevents a ℤ-module from having a free basis.'),b('能用元素阶区分直积分解。','Distinguish direct products using element orders.'),b('能在一个具体例子中验证积的泛性质。','Verify a product’s universal property in a concrete example.')],
  bridge:b('现在已有三种工具：商、作用和线性结构。最后看它们如何共同产生几何与算术的问题。','We now have quotients, actions, and linear structure. Finally, see how they combine into geometric and arithmetic questions.'),
  anchor:b('交叉联系：ℤ 模就是阿贝尔群；D₄ 的动作就是二维表示。','Cross-connections: ℤ-modules are abelian groups; the D₄ action becomes a two-dimensional representation.')
 },
 {
  title:b('从基础工具走向研究问题','From foundational tools to research questions'), lessons:[21,22,23,24],
  question:b('这些理论把我们带到哪些仍在生长的问题？','Which growing questions do these theories lead us to?'),
  purpose:b('用零点集进入代数几何，以逆伽罗瓦问题反转“方程到群”的方向，再以椭圆曲线连接群、几何与数论。最后根据兴趣选择下一段学习路线。','Enter algebraic geometry through zero loci, reverse the equation-to-group direction with inverse Galois, and connect groups, geometry, and number theory through elliptic curves. Then choose a further study route.'),
  outcomes:[b('能区分例子、已知定理与开放问题。','Distinguish examples, established theorems, and open problems.'),b('能把一个研究问题追溯到本课程中的基础概念。','Trace a research question back to foundational concepts in this course.')],
  bridge:b('继续学习时，以具体问题选择工具：特征标、局部化、正合列或数域。','For further study, let a concrete question guide your choice of tools: characters, localization, exact sequences, or number fields.'),
  anchor:b('研究入口：逆伽罗瓦、BSD；延伸：几何群论与同调代数。','Research entry points: inverse Galois and BSD; further routes: geometric group theory and homological algebra.')
 }
];
export const chapterFor = id => chapters.find(chapter=>chapter.lessons.includes(id));
