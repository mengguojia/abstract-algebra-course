import {b,text,lab,concept,argument,example,quiz,comparison,steps,callout} from './lesson-blocks.js';

export const plans1 = {
  1: {
    question:b('钟面上的 8+7 为什么是 3？换一条规则，还能保留哪些算术规律？','Why is 8+7 equal to 3 on a clock, and which laws survive when we change the rule?'),
    prerequisites:[],
    recall:b('从整数加法开始。集合说明允许输入什么；函数为每个输入指定唯一输出。二元运算的输入是一对元素。','Begin with integer addition. A set specifies the allowed inputs; a function assigns one output to each input. A binary operation takes a pair of elements.'),
    destination:b('下一课把“加一个数”换成“做一个动作”，从能复合、能撤销的对称中提取群公理。','Next, replace adding a number with performing a move. Composable, reversible symmetries will lead to the group axioms.'),
    sections:[
      comparison(b('同一组数字，三种运算','The same numbers, three different operations'),[
        {title:b('整数相加','Integer addition'),body:b('两个整数的和仍是整数；运算可以一直进行。集合和规则共同决定了这个对象。','Adding two integers gives another integer, so the operation can be repeated. Both the set and the rule matter.'),formula:'ℤ × ℤ → ℤ, (a,b) ↦ a+b'},
        {title:b('自然数相减','Subtraction on natural numbers'),body:b('若输入只允许非负整数，2−5 的结果就离开了集合。这条计算规则没有给出该集合上的二元运算。','If only nonnegative integers are allowed, 2−5 leaves the set. This rule is therefore not a binary operation on that set.'),formula:'2−5 = −3'},
        {title:b('余数相加','Addition of residues'),body:b('只记录除以 12 的余数。到达 12 时回到 0；每次运算都有且只有一个允许的结果。','Keep only the remainder modulo 12. Reaching 12 returns to 0, and every input pair has exactly one allowed result.'),formula:'8+7 ≡ 3 (mod 12)'}
      ]),
      lab(b('用运算表读一条规则','Read a rule from its operation table'),b('先选模 5 加法，找到第 3 行、第 4 列。再切换减法，比较 (1−2)−3 与 1−(2−3)。把“结果留在集合中”和“括号不影响结果”分开观察。','Choose addition modulo 5 and locate row 3, column 4. Then switch to subtraction and compare (1−2)−3 with 1−(2−3). Track closure and independence of parentheses as separate properties.')),
      quiz(0,b('把表中的一个格子读成计算','Turn one table entry into a calculation')),
      concept(b('把观察写成可检验的条件','Turn observations into precise conditions')),
      text(b('为什么结合律值得单独命名','Why associativity deserves its own name'),b('三个元素有两种加括号的方法，更多元素则有更多方法。结合律让连乘 a⋆b⋆c 的结果不依赖计算分组。它组织的是计算过程；交换律说的则是输入顺序。两种规律解决不同的问题。','There are two ways to parenthesize three elements and many more for longer strings. Associativity makes a repeated operation independent of its grouping. It governs the organization of a calculation; commutativity governs the order of its inputs.')),
      example(b('一张封闭的表也可以不结合','A closed table can fail associativity')),
      quiz(1,b('检验括号是否真的无关','Check whether parentheses really make no difference')),
      argument(b('从整数加法证明余数加法的规律','Transfer the laws of integer addition to residues'),b('实验提供具体计算；下面用任意 a、b、c 说明这些规律为何对所有输入成立。关键是：同余整数有相同的标准余数。','The experiment gives particular calculations. Now use arbitrary a, b, c to prove the laws for every input. The key is that congruent integers have the same standard remainder.')),
      callout(b('下一步要加入“撤销”','The next ingredient is undoing a move'),b('模 5 中加 2 可以用加 3 撤销；加 0 则什么也不改变。单位元与逆元把运算变成一套可逆的动作，这正是群的起点。','Modulo 5, adding 3 undoes adding 2, while adding 0 changes nothing. Identity and inverses turn operations into reversible moves, the starting point for groups.'))
    ]
  },
  2: {
    question:b('旋转再翻转，与翻转再旋转，为什么可能把同一顶点送到不同位置？','Why can rotating then reflecting send a vertex somewhere different from reflecting then rotating?'),
    prerequisites:[1],
    recall:b('上一课区分了结合律与交换律。现在运算的输入不再是数字，而是正方形的对称动作；运算是依次执行两个动作。','The previous lesson separated associativity from commutativity. Now the inputs are symmetries of a square, and the operation is performing two moves in succession.'),
    destination:b('反复做同一个旋转会产生循环群；让这些对称作用在顶点上，又会引向第 7 课的轨道与稳定子。','Repeating one rotation leads to cyclic groups. Acting on the vertices with all these symmetries will lead to orbits and stabilizers in lesson 7.'),
    sections:[
      lab(b('让顶点标记记录动作顺序','Use vertex labels to record the order of moves'),b('从初始位置开始，比较先 r 后 s 与先 s 后 r。盯住同一个顶点，而不是只看正方形的轮廓。随后各做四次旋转、两次反射，寻找回到原位的动作序列。','From the initial position, compare r then s with s then r. Follow one labeled vertex rather than the outline. Then perform four rotations and two reflections to find sequences that return every label to its starting point.')),
      example(b('轮廓相同，动作仍然不同','The same outline can conceal different moves')),
      comparison(b('区分对象、动作与动作的复合','Distinguish the object, its moves, and their composition'),[
        {title:b('对象是正方形','The object is a square'),body:b('四个顶点是动作发生的地方；它们不是群的八个元素。','The four vertices are where the moves act. They are not the eight elements of the group.'),formula:''},
        {title:b('群元素是对称','Group elements are symmetries'),body:b('一个元素说明每个顶点被送到哪里。它是一个双射，也就是顶点集合的置换。','An element specifies where every vertex goes. It is a bijection, hence a permutation of the vertices.'),formula:'r : vertices → vertices'},
        {title:b('群运算是复合','The group operation is composition'),body:b('执行 g 后再执行 f，记作 fg。复合的结果仍是一个完整的对称动作。','Apply g first and f second; write the result as fg. The composite is itself a symmetry.'),formula:'(fg)(v) = f(g(v))'}
      ]),
      quiz(1,b('读懂复合记号','Read the order in a composition')),
      concept(b('可逆动作共享的四条规则','Four rules shared by reversible moves')),
      argument(b('为何这八个动作构成一个群','Why these eight moves form a group'),b('结合律来自函数复合：无论先把哪两个动作合成一组，每个顶点最终都经历同样的三个动作。接着检查恒等、逆元和封闭性。','Associativity comes from function composition: however the moves are grouped, every vertex undergoes the same three moves in the same order. Then check identity, inverses, and closure.')),
      quiz(0,b('数的是动作，不是顶点','Count moves rather than vertices')),
      text(b('群把几何经验变成可迁移的语言','Groups turn geometry into a reusable language'),b('旋转和反射来自几何，但证明群公理只使用动作的复合与撤销。余数加法、可逆矩阵和方程根的置换也能满足同一组公理。以后每发现一个新群，就能直接使用已经证明的群论结论。','Rotations and reflections come from geometry, but the group axioms describe only composition and reversibility. Residue addition, invertible matrices, and permutations of polynomial roots can satisfy the same axioms. Each new example can therefore use the group theorems already proved.'))
    ]
  },
  3: {
    question:b('在十二格钟面上每次走四格，为何只能到达三个位置，而每次走五格却能走遍全部位置？','On a twelve-position clock, why do steps of four visit only three positions, while steps of five visit them all?'),
    prerequisites:[2],
    recall:b('群中可以反复执行同一动作，也可以执行逆动作。把正方形旋转重复四次会回到单位元；本课把这个现象推广到任意群元素。','A group lets us repeat a move and reverse it. Four quarter-turns return the square to the identity. This lesson extends that idea to any group element.'),
    destination:b('生成的元素构成子群。下一课将用这些子群给整个群分块，解释元素的阶为何整除有限群的阶。','The generated elements form a subgroup. Next, its translates will partition the whole group and explain why element orders divide the order of a finite group.'),
    sections:[
      text(b('把可达位置收集起来','Collect all reachable positions'),b('从 0 出发不断加 k，也允许减 k，收集所有能到达的位置。两段行程接起来仍是一段行程，反向行走也仍在同一集合中。因此“由一个动作能到哪里”自然产生一个群内的小群。','Start at 0 and repeatedly add k, allowing subtraction of k as well. Collect every reachable position. Joining two journeys gives another journey, and reversing one stays within the same collection. Reachability by one move naturally produces a smaller group inside the original group.')),
      lab(b('把步长变成轨迹','Turn a step size into a path'),b('设 n=12，分别试 k=4、8、5。每次从 0 出发，在第一次返回 0 时停下，比较访问点数与 gcd(12,k)。','Set n=12 and try k=4, 8, and 5. Start at 0 each time and stop at the first return to 0. Compare the number of visited positions with gcd(12,k).')),
      concept(b('用生成子群与阶记录行程','Describe the journey with a generated subgroup and its order')),
      example(b('同一个群可以有多个生成元','One group can have several generators')),
      quiz(1,b('判断一个步长能否走遍钟面','Decide whether a step reaches the entire clock')),
      argument(b('最大公因数怎样决定返回时间','How the greatest common divisor determines the return time'),b('返回 0 等价于走过的总距离 mk 是 n 的整数倍。因此一个群论问题变成了整除问题。把 n 和 k 的公共因子约去，就能读出最小返回时间。','Returning to 0 means that the total distance mk is a multiple of n. A group question has become a divisibility question. Remove the common factor of n and k to identify the first return time.')),
      quiz(0,b('从轨迹读出元素的阶','Read an element order from its path')),
      comparison(b('两个“阶”测量不同的事','Two kinds of order measure different things'),[
        {title:b('元素的阶','Order of an element'),body:b('测量重复某个动作多久返回。模 12 的 [4] 只需重复三次。','It measures how many repetitions of one move return to the identity. The element [4] modulo 12 needs three repetitions.'),formula:'ord([4]) = 3'},
        {title:b('群的阶','Order of a group'),body:b('测量群中总共有多少个元素。ℤ/12ℤ 有十二个元素，⟨[4]⟩ 有三个。','It counts all elements of a group. The group ℤ/12ℤ has twelve elements, while ⟨[4]⟩ has three.'),formula:'|ℤ/12ℤ| = 12'}
      ]),
      callout(b('有限周期与无限前进','Finite cycles and an infinite path'),b('整数加法群 ℤ 由 1 生成，却不会在正次数重复后回到 0。循环群可以有限，也可以无限；共同之处是一个元素生成了整个群。','The additive group ℤ is generated by 1, yet no positive number of repetitions returns to 0. A cyclic group may be finite or infinite; what matters is that one element generates the whole group.'))
    ]
  },
  4: {
    question:b('知道一个群有十二个元素，为什么就能排除五元素子群？','Why does knowing that a group has twelve elements rule out a subgroup with five?'),
    prerequisites:[3],
    recall:b('模 12 中反复加 4 得到 H={0,4,8}。本课不只研究这三个点，还要研究它们的所有平移。','Repeated addition of 4 modulo 12 gives H={0,4,8}. We will study this set together with all its translates.'),
    destination:b('陪集先是一种分块。下一课会从同态的纤维再次得到这些块，第 6 课再讨论何时能把块当作元素相乘。','Cosets begin as a partition. The next lesson recovers them as fibers of a homomorphism; lesson 6 asks when the blocks themselves can be multiplied.'),
    sections:[
      example(b('用一个三元素子群覆盖十二个位置','Cover twelve positions with translates of a three-element subgroup')),
      text(b('“属于同一块”是一种等价关系','Being in the same block is an equivalence relation'),b('在这个加法例子中，定义 a∼b 当且仅当 a−b∈H。每个元素和自身等价；等价关系可以反向，也可以接续，分别来自 H 含 0、对负号封闭、对加法封闭。满足自反、对称、传递的关系称为等价关系，它把集合划成等价类；这里的等价类就是 a+H。','In this additive example, define a∼b when a−b∈H. Every element is related to itself; the relation can be reversed and chained because H contains 0 and is closed under negatives and addition. A reflexive, symmetric, transitive relation is an equivalence relation. It partitions a set into equivalence classes, here exactly the sets a+H.')),
      lab(b('移动同一块，观察覆盖与重合','Translate one block and inspect overlaps'),b('选择模 12 与 H=⟨4⟩，依次查看不同代表元的陪集。比较 1+H 与 5+H，再比较 1+H 与 2+H：两个块要么完全相同，要么没有交点。','Choose modulus 12 and H=⟨4⟩. Inspect cosets from different representatives. Compare 1+H with 5+H, then 1+H with 2+H: two blocks are either identical or disjoint.')),
      concept(b('把平移推广为左陪集','Generalize translation to left cosets')),
      steps(b('一个计数证明需要两件事','A counting proof needs two ingredients'),[
        {title:b('每个元素恰在一块中','Each element belongs to exactly one block'),body:b('一般群中用 a∼b 当且仅当 b⁻¹a∈H，得到左陪集分块。证明相交的陪集相同，就证明了块之间没有重复计数。','For a general group, use a∼b when b⁻¹a∈H to obtain left cosets. Proving that intersecting cosets are equal prevents double counting.')},
        {title:b('每块都与 H 一样大','Every block has the size of H'),body:b('左乘 g 把 h 送到 gh，左乘 g⁻¹ 可以撤销，所以这是 H 到 gH 的双射。','Left multiplication by g sends h to gh and is undone by g⁻¹, giving a bijection from H to gH.')}
      ]),
      argument(b('拉格朗日公式就是数等大的块','Lagrange’s formula counts equal-sized blocks'),b('分块的两件事建立后，总元素数就是块数乘以每块的元素数。这个证明同时解释了公式中的指数 [G:H]。','Once those two facts hold, the total size is the number of blocks times the size of each block. This also explains the index [G:H] in the formula.')),
      quiz(1,b('区分每块大小与块数','Distinguish the block size from the number of blocks')),
      quiz(0,b('让分块限制子群大小','Use the partition to constrain subgroup sizes')),
      callout(b('素数阶群为什么格外简单','Why groups of prime order are especially simple'),b('若 |G|=p 是素数，取非单位元 g。循环子群 ⟨g⟩ 的阶大于 1，又整除 p，因此只能是 p，故 g 生成整个群。这是第一次从一个数值条件推出完整的结构结论。','If |G|=p is prime, choose a nonidentity element g. The order of ⟨g⟩ is greater than 1 and divides p, so it equals p. Thus g generates the whole group: a numerical constraint has determined the structure.'))
    ]
  },
  5: {
    question:b('把十二格钟面压成四格，丢失了什么？留下的加法规律又是什么？','When a twelve-position clock is compressed to four positions, what information is lost and what addition law remains?'),
    prerequisites:[2,4],
    recall:b('上一课的四个陪集是 {0,4,8}、{1,5,9}、{2,6,10}、{3,7,11}。本课给每块贴上一个模 4 的标签。','The previous lesson produced four cosets: {0,4,8}, {1,5,9}, {2,6,10}, {3,7,11}. Now give each block a label modulo 4.'),
    destination:b('核把“被遗忘的信息”收集成一个子群。下一课将压缩核的陪集，构造与同态的像同构的商群。','The kernel collects the forgotten information in a subgroup. Next, collapsing its cosets produces a quotient isomorphic to the image.'),
    sections:[
      steps(b('同一个计算，两条路线','Two routes through the same calculation'),[
        {title:b('先在原群中相加','Add in the original group first'),body:b('在模 12 中计算 7+8=3，再把结果送到模 4，得到 3。','Compute 7+8=3 modulo 12, then reduce the result modulo 4 to obtain 3.')},
        {title:b('先换成新标签','Relabel first'),body:b('7 的新标签是 3，8 的新标签是 0。在模 4 中计算 3+0，仍得到 3。','The new label of 7 is 3 and that of 8 is 0. Adding 3+0 modulo 4 again gives 3.')},
        {title:b('要求每次都得到同一结果','Require agreement for every input pair'),body:b('若任意两个输入都能沿这两条路线得到相同输出，映射就保持运算。这是同态的核心要求。','If the routes agree for every pair of inputs, the map preserves the operation. This is the defining requirement for a homomorphism.')}
      ]),
      concept(b('保持运算的映射，以及它的核与像','Operation-preserving maps, their kernels, and their images')),
      lab(b('沿着箭头寻找同一纤维','Follow the arrows to find a fiber'),b('查看模 12 到模 4 的映射，先找所有落在 0 的元素，再找所有落在 1 的元素。映到同一个目标元素的输入集合叫作该元素的纤维。','Inspect the map from residues modulo 12 to residues modulo 4. Find all inputs mapping to 0, then those mapping to 1. All inputs with one chosen output form the fiber over that output.')),
      example(b('核是一条特别的纤维','The kernel is one distinguished fiber')),
      quiz(0,b('数清被压到单位元的元素','Count the elements collapsed to the identity')),
      text(b('为什么只看核就能判定单射','Why the kernel detects injectivity'),b('任意映射可能在许多地方发生重合。群同态的结构把所有重合搬到单位元附近：若 φ(a)=φ(b)，就有 φ(b⁻¹a)=e。两个输入的“差异”落在核中，所以核足以记录全部纤维的重合方式。','A general map may merge inputs in many places. A group homomorphism translates every collision to the identity: if φ(a)=φ(b), then φ(b⁻¹a)=e. The difference between the inputs lies in the kernel, so this one fiber controls all collisions.')),
      argument(b('把任意重合转成核中的元素','Translate any collision into a kernel element'),b('下面分别证明两个方向：单射如何迫使核平凡，以及平凡核如何排除任意两个不同输入的重合。','Prove both directions: injectivity forces a trivial kernel, and a trivial kernel prevents two distinct inputs from sharing an image.')),
      comparison(b('相同大小与相同结构','Equal size and equal structure'),[
        {title:b('双射','Bijection'),body:b('只要求元素一一对应。它比较集合大小，不指定对应是否尊重运算。','It pairs the elements one to one, comparing the sizes of sets without requiring compatibility with an operation.'),formula:''},
        {title:b('同构','Isomorphism'),body:b('既一一对应，又保持运算。例如把模 4 的 [k] 送到正方形旋转 rᵏ，完整保留循环群结构。','It pairs elements one to one and preserves the operation. Sending [k] modulo 4 to the square rotation rᵏ preserves the entire cyclic group structure.'),formula:'ℤ/4ℤ ≅ ⟨r⟩'}
      ]),
      quiz(1,b('检查一种对应是否保留结构','Check whether a correspondence preserves structure'))
    ]
  },
  6: {
    question:b('如果每个陪集成为一个新元素，乘法会依赖你从块中选了哪个代表吗？','If each coset becomes a new element, does multiplication depend on which representative you choose?'),
    prerequisites:[4,5],
    recall:b('陪集给群分块；同态的纤维也给群分块。要让这些块组成群，需要一种与代表元选择无关的运算。','Cosets partition a group, as do the fibers of a homomorphism. To make the blocks into a group, their operation must be independent of representatives.'),
    destination:b('商群给出“保留部分信息”的精确定义。环中同时有加法和乘法，第 10 课将用理想来完成相同的构造。','Quotient groups make retaining partial information precise. Lesson 10 repeats the construction for two operations, using ideals in rings.'),
    sections:[
      comparison(b('分块与给块定义运算是两件事','Partitioning and multiplying blocks are separate steps'),[
        {title:b('先得到一组陪集','First obtain a set of cosets'),body:b('任意子群 H 都能给出左陪集分块。这一步只回答哪些元素归在一起。','Any subgroup H gives a partition into left cosets. This determines which elements belong together.'),formula:'aH = {ah : h∈H}'},
        {title:b('再要求乘积不依赖代表','Then require representative-independent multiplication'),body:b('希望用 aH·bH=abH 相乘。如果把 a、b 换成同块的其他元素，输出必须仍属于原来的结果块。','We want aH·bH=abH. Replacing either representative by another element of its block must leave the result in the same output block.'),formula:'a′H=aH, b′H=bH ⇒ a′b′H=abH'}
      ]),
      text(b('正方形中一次具体的代表元检验','A concrete representative check in the square group'),b('在 D₄ 中取 H={e,s}。e 和 s 代表同一个陪集 H；用 e 与 r 相乘得到 rH，用 s 与 r 相乘得到 srH。由 sr=r⁻¹s 可得 srH=r⁻¹H，它与 rH 不同。这个子群给出了分块，却不能用上述公式把分块变成群。','In D₄ take H={e,s}. Both e and s represent the coset H. Multiplying e by r gives rH, while multiplying s by r gives srH=r⁻¹H, using sr=r⁻¹s. This is a different coset from rH. The subgroup partitions the group, but the proposed rule does not define a group operation on its blocks.')),
      concept(b('正规性恰好控制换代表元','Normality controls changes of representative')),
      quiz(0,b('交换性怎样简化正规性','How commutativity simplifies normality')),
      lab(b('让整个陪集成为一个可操作的对象','Treat an entire coset as one object'),b('在模 12 对 {0,4,8} 的商中，观察四个块。用不同代表元计算同一对块的和，例如 1+2 与 5+10，检查它们都落在标签为 3 的块中。','In the quotient of residues modulo 12 by {0,4,8}, inspect the four blocks. Add representatives from the same two blocks in different ways, such as 1+2 and 5+10, and check that both results belong to the block labeled 3.')),
      example(b('四个块恢复四格钟面的加法','Four blocks recover addition on a four-position clock')),
      quiz(1,b('数商群中的新元素','Count the new elements in the quotient')),
      argument(b('压缩每条纤维，恰好得到像','Collapse each fiber to recover the image'),b('同态的核总是正规子群，因此它的陪集可以相乘。第一同构定理进一步说明：把每条纤维视作一个元素后，得到的结构就是同态已经看见的像。','The kernel of a homomorphism is always normal, so its cosets can be multiplied. The first isomorphism theorem says more: regarding each fiber as one element gives exactly the structure already visible in the image.')),
      callout(b('三种表述汇合在同一个分块','Three descriptions meet in one partition'),b('对于同态 φ，以下三件事等价：φ(a)=φ(b)；b⁻¹a∈ker φ；a ker φ=b ker φ。它们分别从映射、核、陪集描述同一关系。','For a homomorphism φ, the following are equivalent: φ(a)=φ(b); b⁻¹a∈ker φ; a ker φ=b ker φ. Maps, kernels, and cosets describe the same relation.'))
    ]
  },
  7: {
    question:b('正方形有八个对称，但一个顶点只能到四个位置；多出的动作去了哪里？','A square has eight symmetries, but a vertex can reach only four positions. Where do the extra moves go?'),
    prerequisites:[2,4,5],
    recall:b('对称可以看作顶点的置换，左陪集可以把群分成等大的块。本课用“把某点送到同一终点”的动作来构造这些块。','Symmetries are permutations of vertices, and left cosets partition groups into equal-sized blocks. Here the blocks consist of moves sending a chosen point to the same destination.'),
    destination:b('群作用把子群计数转化为轨道计数，为西罗理论提供方法；第 19 课将让群作用在线性空间上，得到表示。','Actions turn subgroup questions into orbit counts, a key method in Sylow theory. Lesson 19 lets groups act on vector spaces to obtain representations.'),
    sections:[
      example(b('固定一个顶点，数到达它的动作','Fix one vertex and count the moves that leave it there')),
      lab(b('沿着顶点 1 追踪动作','Follow the moves through vertex 1'),b('盯住顶点 1，依次施加旋转与反射，查看它能到达的位置以及保持它不动的对称。把“最终位置的数量”和“可执行的动作数量”分别记录。','Follow vertex 1 as you apply rotations and reflections. Inspect both its reachable positions and the symmetries fixing it. Record the number of destinations separately from the number of possible moves.')),
      concept(b('轨道记录能到哪里，稳定子记录哪些动作看不见','Orbits record destinations; stabilizers record invisible moves')),
      text(b('同一终点对应稳定子的一个陪集','One destination corresponds to a stabilizer coset'),b('若 g·x=h·x，就先执行 g，再用 h⁻¹ 把终点带回 x，于是 h⁻¹g 固定 x。这说明 g、h 位于同一个 Gₓ 左陪集中。陪集在这里获得了直接含义：它收集把 x 送到同一位置的全部动作。','If g·x=h·x, applying g followed by h⁻¹ returns x to itself, so h⁻¹g fixes x. Thus g and h lie in the same left coset of Gₓ. A coset now has a concrete meaning: it collects every move sending x to one chosen destination.')),
      argument(b('把轨道与陪集一一配对','Pair orbit points with cosets'),b('证明的核心是一条映射：gGₓ↦g·x。每个陪集提供一个终点，每个终点对应一个陪集；计数公式由这个双射直接得到。','The proof centers on the map gGₓ↦g·x. Each coset gives one destination, and each destination determines one coset. The counting formula follows from this bijection.')),
      quiz(0,b('用稳定子大小计算轨道','Compute an orbit from its stabilizer')),
      quiz(1,b('为什么固定点的动作仍构成群','Why the moves fixing a point form a subgroup')),
      steps(b('从抽象群走到置换群','From an abstract group to permutations'),[
        {title:b('每个群元素给出一个双射','Each group element gives a bijection'),body:b('作用中的 g 把 x 送到 g·x，而 g⁻¹ 撤销它。因此每个 g 都给出 X 的一个置换。','The action of g sends x to g·x, and g⁻¹ undoes it. Hence every g defines a permutation of X.')},
        {title:b('作用公理使对应保持复合','The action law preserves composition'),body:b('(gh)·x=g·(h·x) 说明 G 到 X 的置换群的对应是同态。','The law (gh)·x=g·(h·x) says that the resulting map from G to the permutation group of X is a homomorphism.')},
        {title:b('让群作用在自己身上','Let the group act on itself'),body:b('取 X=G，用左乘定义 g·x=gx。不同 g 把 e 送到不同位置，所以得到单射同态：每个群都同构于某个置换群的子群。','Take X=G and use left multiplication g·x=gx. Distinct g send e to distinct positions, so the homomorphism is injective: every group is isomorphic to a subgroup of a permutation group.')}
      ])
    ]
  },
  8: {
    question:b('只知道群有十五个元素，能否必然找到一个非平凡真正规子群？','Does a group of order fifteen necessarily have a nontrivial proper normal subgroup?'),
    prerequisites:[4,6,7],
    recall:b('拉格朗日定理限制子群的阶，正规性描述共轭后的稳定，群作用提供计数工具。西罗理论把这三条线汇合起来。','Lagrange restricts subgroup orders, normality describes stability under conjugation, and actions provide counting tools. Sylow theory brings these ideas together.'),
    destination:b('这是有限群路线的一个专题。继续研究可走向共轭类、单群与表示论；进入环与算术路线可直接从群的基本概念转入第 9 课。','This is a topic on the finite-group route. Continue toward conjugacy classes, simple groups, and representations, or enter the ring and arithmetic route in lesson 9 using the basic group concepts.'),
    sections:[
      text(b('从“允许的大小”走向“保证存在”','From permitted sizes to guaranteed existence'),b('十五阶群的子群阶只能是 1、3、5、15，这是拉格朗日定理给出的限制。要证明三阶或五阶子群一定存在，还需要新的定理。西罗定理保证最大素数幂阶的子群存在，并约束它们的数量。','Lagrange allows only subgroup orders 1, 3, 5, and 15 in a group of order 15. Guaranteeing a subgroup of order 3 or 5 requires another theorem. Sylow’s theorems supply subgroups of maximal prime-power order and constrain their numbers.')),
      concept(b('用两个算术条件筛选子群数量','Filter subgroup counts with two arithmetic conditions')),
      lab(b('求整除条件与同余条件的交集','Intersect divisibility and congruence conditions'),b('设群阶为 15、素数为 5，先列出 3 的正因数，再筛选模 5 余 1 的数。随后换成群阶 12、素数 3，观察剩余候选为何增多。','Set the group order to 15 and the prime to 5. List the positive divisors of 3, then keep those congruent to 1 modulo 5. Repeat with order 12 and prime 3 to see why more candidates remain.')),
      argument(b('唯一性如何变成正规性','How uniqueness becomes normality'),b('算出 n₅=1 后，还要解释这个数量如何给出结构。共轭把西罗子群送到另一个西罗子群，唯一性迫使它留在原地。','After finding n₅=1, connect the count to structure. Conjugation sends a Sylow subgroup to a Sylow subgroup; uniqueness forces it to remain the same subgroup.')),
      quiz(0,b('完成十五阶群的筛选','Complete the order-15 count')),
      quiz(1,b('从唯一性读出结构','Extract structure from uniqueness')),
      example(b('十二阶群留下两个分支','Order 12 leaves two branches')),
      comparison(b('一个候选与多个候选，各说明什么','What one candidate and several candidates tell us'),[
        {title:b('只剩 nₚ=1','Only nₚ=1 remains'),body:b('唯一的西罗 p 子群在所有共轭下不变，因此正规。有限群的内部结构已被确定一部分。','The unique Sylow p-subgroup is invariant under every conjugation, so it is normal. Part of the group structure is now determined.'),formula:'nₚ=1 ⇒ P ◁ G'},
        {title:b('仍有多个数量候选','Several counts remain'),body:b('每个实际群的数量必须出现在候选列表中。要继续区分这些群，可以研究它们对子群集合的共轭作用。','The count for any actual group must occur in the list. To distinguish the possibilities further, study conjugation actions on collections of subgroups.'),formula:'|G|=12 ⇒ n₃∈{1,4}'}
      ]),
      callout(b('本课的证明范围','What is proved here'),b('本课完整证明十五阶群的应用。西罗定理本身的存在性、共轭性与计数结论在 Milne《Group Theory》第 5 章展开；其中群作用是贯穿证明的工具。','This lesson proves the order-15 application in full. Existence, conjugacy, and the counting statements of Sylow’s theorems are developed in chapter 5 of Milne’s Group Theory, using group actions throughout.'))
    ]
  },
  9: {
    question:b('模 6 中两个非零数相乘为什么会得到 0？这会怎样改变除法？','Why can two nonzero residues multiply to 0 modulo 6, and what does this do to division?'),
    prerequisites:[1,5,6],
    recall:b('余数加法已经给出阿贝尔群，同态和商保留部分运算信息。现在在同一集合中加入乘法，研究两种运算如何配合。','Residue addition already gives an abelian group, and maps and quotients preserve selected information. Now add multiplication to the same set and study how the two operations interact.'),
    destination:b('下一课需要同时保留加法和乘法，因此把群中的正规子群替换为环中的理想；随后研究因式分解与域。','The next lesson preserves addition and multiplication together, replacing normal subgroups with ideals. Factorization and fields follow.'),
    sections:[
      lab(b('先看乘法能否撤销','Start by testing which multiplications can be undone'),b('比较模 6 与模 5 的乘法表。寻找乘积为 1 的位置，再寻找两个非零输入乘积为 0 的位置。对每个输入问：乘以它会丢失信息吗？','Compare multiplication tables modulo 6 and modulo 5. Find products equal to 1, then products of two nonzero inputs equal to 0. Ask whether multiplying by a given element loses information.')),
      example(b('同样是余数，乘法行为却不同','Residue systems can have different multiplication behavior')),
      comparison(b('把加法与乘法分别列账','Keep separate accounts for addition and multiplication'),[
        {title:b('加法负责群结构','Addition supplies a group structure'),body:b('每个元素都有加法逆元，0 是加法单位元，加法交换。于是 a−b 总有意义。','Every element has an additive inverse, 0 is the additive identity, and addition commutes. Thus a−b is always defined.'),formula:'a+(−a)=0'},
        {title:b('乘法负责额外的算术','Multiplication supplies further arithmetic'),body:b('乘法结合并有单位元 1，可逆性则取决于元素。乘法通过分配律与加法联系。','Multiplication is associative and has identity 1, while invertibility depends on the element. Distributivity connects it to addition.'),formula:'a(b+c)=ab+ac'}
      ]),
      concept(b('环的规则与两种特殊元素','Ring laws and two important kinds of element')),
      quiz(1,b('环的哪种运算必然交换','Which ring operation must commute?')),
      text(b('消去律的含义是“没有丢失信息”','Cancellation means that no information was lost'),b('模 6 中 2·1=2·4，乘以 2 把不同输入送到同一个结果。两式相减得到 2·(1−4)=0，重合被一个零因子记录。相反，若 u 有逆元，乘以 u 后总能乘 u⁻¹ 回去，所以不会合并不同输入。','Modulo 6, 2·1=2·4: multiplication by 2 merges distinct inputs. Subtracting gives 2·(1−4)=0, recording the collision through a zero divisor. If u has an inverse, multiplication by u can be undone by u⁻¹, so distinct inputs cannot merge.')),
      argument(b('可逆元素为什么不会成为零因子','Why an invertible element cannot be a zero divisor'),b('证明只使用分配律、加法群的消去与乘法逆元。这也展示了环公理怎样共同支撑熟悉的算术推理。','The proof uses distributivity, cancellation in the additive group, and a multiplicative inverse. It shows how the ring axioms work together to support familiar arithmetic.')),
      quiz(0,b('找出能够撤销乘法的元素','Find an element whose multiplication can be undone')),
      callout(b('单位组成环中的另一个群','Units form another group inside a ring'),b('环的全部元素在加法下成群；其中的单位在乘法下也成群，记作 R×。模 6 的单位群是 {1,5}，而模 5 的单位群包含全部四个非零元素。','All elements of a ring form an additive group. Its units also form a group under multiplication, written R×. Modulo 6 this group is {1,5}; modulo 5 it consists of all four nonzero elements.'))
    ]
  },
  10: {
    question:b('若把某些差异当作 0，怎样保证加法和乘法都仍然一致？','If selected differences are declared to be zero, what makes both addition and multiplication consistent?'),
    prerequisites:[6,9],
    recall:b('商群将同一陪集中的元素合并。环还带有乘法，因此只保证加法分块相容还不够；差异还必须能被任意环元素相乘。','Quotient groups identify elements in one coset. A ring also has multiplication, so additive compatibility must be joined by stability of the ignored differences under multiplication by any ring element.'),
    destination:b('整数的理想给出通常的模运算。多项式的理想则能强制 x²+1=0 等关系，第 12 课将用它们构造新数。','Ideals of integers give ordinary modular arithmetic. Polynomial ideals can impose relations such as x²+1=0; lesson 12 uses them to construct new numbers.'),
    sections:[
      text(b('先决定哪些差异不再区分','Choose which differences to identify'),b('模 6 运算把相差 6 的倍数的整数视为相同。若把所有“视作 0”的元素收集成 I，那么 a 与 b 相同就表示 a−b∈I。加法要求这些差异对相加与取负封闭；乘法还要求把差异乘以任意元素后，它仍然被视作 0。','Arithmetic modulo 6 identifies integers differing by a multiple of 6. If I collects everything treated as zero, then a and b are identified when a−b∈I. Addition requires these differences to be closed under addition and negatives; multiplication requires any multiple of an ignored difference to remain ignored.')),
      concept(b('理想把两种相容性写在一起','An ideal packages compatibility with both operations')),
      comparison(b('子环与理想回答不同问题','Subrings and ideals answer different questions'),[
        {title:b('子环：里面能否独立运算','Subring: can arithmetic be done inside it?'),body:b('ℤ 是 ℚ 的子环；整数彼此相加、相减、相乘仍为整数。这个条件只检查子集内部的输入。','The integers form a subring of ℚ: adding, subtracting, or multiplying integers stays in ℤ. The condition tests inputs from inside the subset.'),formula:''},
        {title:b('理想：能否作为被忽略的差异','Ideal: can it describe ignored differences?'),body:b('理想要求吸收来自整个环的乘法。ℤ 不是 ℚ 的理想，因为 1∈ℤ 而 (1/2)·1∉ℤ。','An ideal absorbs multiplication from the entire ring. The subset ℤ is not an ideal of ℚ because 1∈ℤ but (1/2)·1∉ℤ.'),formula:'rI ⊆ I for every r∈R'}
      ]),
      argument(b('为何整数中的每个理想只需一个生成元','Why one generator describes every ideal of integers'),b('从非零理想中取最小正数 n。带余除法把任何元素的余数也放回理想，最小性迫使余数为 0。这条证明把理想与整除联系起来。','Choose the least positive n in a nonzero ideal. Division with remainder places every remainder back in the ideal, and minimality forces it to be zero. This connects ideals with divisibility.')),
      quiz(0,b('把理想成员资格翻译成整除','Translate ideal membership into divisibility')),
      lab(b('把差异压成零，读取商环','Collapse the ideal to zero and read the quotient'),b('在模 6 的环中选理想 (2)={0,2,4}。查看哪些元素与 0 同类、哪些与 1 同类，再各取代表元计算两类之间的加法与乘法。','In the ring modulo 6, choose the ideal (2)={0,2,4}. Find the elements equivalent to 0 and those equivalent to 1. Then choose representatives to calculate sums and products of the two classes.')),
      example(b('将奇偶性保留为一个两元素环','Keep parity as a two-element ring')),
      quiz(1,b('商环记录多少种剩余信息','How many distinct pieces of information remain?')),
      steps(b('乘法为何不依赖代表元','Why multiplication is independent of representatives'),[
        {title:b('把换代表元写成加一个理想元素','Express a change of representative as an ideal element'),body:b('设 a′−a∈I、b′−b∈I。它们表示 a′ 与 a、b′ 与 b 分别属于同一类。','Let a′−a∈I and b′−b∈I. Then a′ and a represent one class, while b′ and b represent another.')},
        {title:b('把乘积之差拆成两个可吸收的项','Split the product difference into two absorbed terms'),body:b('a′b′−ab=(a′−a)b′+a(b′−b)。两个差异都在 I 中，理想的吸收性使两项都在 I 中；加法封闭性再把和留在 I 中。','Write a′b′−ab=(a′−a)b′+a(b′−b). Both differences lie in I. Absorption puts each term in I, and additive closure puts their sum there too.')}
      ])
    ]
  },
  11: {
    question:b('只知道一个整数除以 3 和 4 的余数，能否唯一恢复它除以 12 的余数？','Can the residues of an integer modulo 3 and modulo 4 uniquely recover its residue modulo 12?'),
    prerequisites:[5,9,10],
    recall:b('同态保持运算，核记录被忽略的差异。整数理想把取余与整除联系起来；现在同时读取两个余数。','Homomorphisms preserve operations and kernels record ignored differences. Integer ideals connect residues with divisibility. We now read two residues at once.'),
    destination:b('中国剩余定理把一个环拆成较小环的直积。带余除法与理想的层级还将迁移到多项式环，成为不可约性与添根构造的基础。','The Chinese remainder theorem decomposes a ring into a product of smaller rings. Division and the hierarchy of ideals also extend to polynomial rings, leading to irreducibility and adjoining roots.'),
    sections:[
      lab(b('给一个余数添加两个坐标','Give each residue a pair of coordinates'),b('选择互素的模数 3 和 4，依次查看 0 到 11 的位置。每个整数映到 (模 3 余数, 模 4 余数)；寻找坐标 (2,1)，并观察十二个格子是否恰好各出现一次。','Choose coprime moduli 3 and 4 and inspect positions 0 through 11. Each residue maps to (remainder modulo 3, remainder modulo 4). Find (2,1), then check whether each of the twelve cells appears exactly once.')),
      example(b('从两个坐标恢复同一个数','Recover one residue from two coordinates')),
      quiz(0,b('解一组同时成立的同余','Solve two congruences at once')),
      text(b('双坐标为什么保留全部信息','Why the pair of coordinates retains all information'),b('如果 x 与 y 在两个坐标上都相同，x−y 就同时被 3 和 4 整除。由于二者互素，x−y 被 12 整除，于是它们本来就是同一个模 12 余数。这个思路把“坐标会不会重合”转成了核是否平凡的问题。','If x and y agree in both coordinates, then x−y is divisible by both 3 and 4. Coprimality makes it divisible by 12, so x and y were the same residue modulo 12. Whether coordinates collide has become a question about a trivial kernel.')),
      argument(b('中国剩余定理：一个保持算术的坐标系','The Chinese remainder theorem: coordinates preserving arithmetic'),b('坐标上的加法、乘法分别进行。证明映射保持运算并且是双射，就得到环同构，而不只是一个余数查找表。','Addition and multiplication are performed coordinatewise. Showing that the map preserves both operations and is bijective gives a ring isomorphism, not merely a table for looking up residues.')),
      comparison(b('互素时坐标独立，有公共因子时坐标相关','Coprime coordinates are independent; shared factors impose constraints'),[
        {title:b('模 3 与模 4','Modulo 3 and modulo 4'),body:b('任意一对余数都恰好对应一个模 12 的余数，两坐标可以独立指定。','Every pair of residues determines exactly one residue modulo 12, so the coordinates can be chosen independently.'),formula:'ℤ/12ℤ ≅ ℤ/3ℤ × ℤ/4ℤ'},
        {title:b('模 2 与模 4','Modulo 2 and modulo 4'),body:b('模 4 的余数已经决定奇偶性。例如模 2 余 0、模 4 余 1 无解，因为两个条件要求不同的奇偶性。','The residue modulo 4 already determines parity. For example, residue 0 modulo 2 and residue 1 modulo 4 cannot occur together.'),formula:'x mod 2 = (x mod 4) mod 2'}
      ]),
      concept(b('另一条算术路线：哪些环像整数一样分解','Another arithmetic route: which rings factor like the integers?')),
      steps(b('算术层级中的每一步增加什么','What each level of the arithmetic hierarchy provides'),[
        {title:b('整环让非零因子可以消去','An integral domain permits cancellation of nonzero factors'),body:b('ab=ac 等价于 a(b−c)=0。若 a≠0 且没有零因子，就得到 b=c。','From ab=ac obtain a(b−c)=0. If a≠0 and there are no zero divisors, then b=c.')},
        {title:b('UFD 把元素分解成不可约因子','A UFD factors elements into irreducibles'),body:b('“本质唯一”允许调整因子顺序，并把因子乘以单位。例如整数中的 6=2·3 与 6=(−2)(−3) 视为同一种分解。','“Essentially unique” allows reordering and multiplication of factors by units. For integers, 6=2·3 and 6=(−2)(−3) count as the same factorization.')},
        {title:b('PID 与欧几里得算法提供更强组织','PIDs and Euclidean division add stronger structure'),body:b('PID 中每个理想只需一个生成元；欧几里得整环还提供严格降低度量的带余除法。整数的最小正元素证明展示了后者如何帮助控制理想。','Every ideal in a PID needs one generator. A Euclidean domain additionally provides division with a strictly decreasing measure. The least-positive-element proof for integers shows how division helps control ideals.')}
      ]),
      quiz(1,b('判断层级箭头的方向','Read the direction of the hierarchy')),
      callout(b('两个主题怎样相连','How the two themes connect'),b('中国剩余定理使用互素关系拆分算术；欧几里得算法能计算最大公因数并写出贝祖等式。下一课把整数换成域上的多项式，同一套工具将判断哪些商环允许除法。','The Chinese remainder theorem uses coprimality to split arithmetic. The Euclidean algorithm computes greatest common divisors and Bézout identities. Replacing integers by polynomials over a field will let the same tools determine which quotient rings admit division.'))
    ]
  },
  12: {
    question:b('怎样造出一个含有 x²+x+1 的根、而且只有四个元素的数系？','How can we build a four-element number system containing a root of x²+x+1?'),
    prerequisites:[9,10,11],
    recall:b('商环通过理想强制一组关系成立。整数的带余除法给出标准余数；域上的多项式也有带余除法，可按次数整理代表元。','Quotient rings impose relations through ideals. Integer division gives standard remainders; polynomials over a field also admit division, giving representatives of bounded degree.'),
    destination:b('商多项式环把添根变成精确构造。下一课将研究域扩张的维数，并把“新数需要几个坐标”与多项式次数联系起来。','Polynomial quotients make adjoining a root precise. Next, extension degrees relate the number of coordinates needed for new numbers to polynomial degrees.'),
    sections:[
      text(b('把不存在的根变成一条运算关系','Turn a missing root into an arithmetic relation'),b('域是 1≠0 且每个非零元素都有乘法逆元的交换环。𝔽₂ 只有 0、1，加法和乘法都取模 2。把它们代入 x²+x+1 都得到 1。现在引入符号 α，要求 α²+α+1=0。因为 𝔽₂ 中减法与加法相同，这条要求等价于 α²=α+1，任何更高次幂都能不断降次。','A field is a commutative ring with 1≠0 in which every nonzero element has a multiplicative inverse. The field 𝔽₂ contains 0 and 1, with arithmetic modulo 2. Substituting either into x²+x+1 gives 1. Introduce a symbol α satisfying α²+α+1=0. Since subtraction equals addition in 𝔽₂, this is α²=α+1, a rule that reduces all higher powers.')),
      lab(b('先在四元素数系中试算','Try arithmetic in the four-element system'),b('选择 α，沿高亮行读取它乘以 0、1、α、α+1 的结果，找到乘积为 1 的格子。再切换到加法，确认 α+α=0。接下来解释这套运算为何形成一个域。','Select α and read its products with 0, 1, α, and α+1 along the highlighted row. Find the entry equal to 1. Switch to addition and check α+α=0. The following sections explain why this arithmetic forms a field.')),
      quiz(0,b('检查原来的域中是否已经有根','Check whether the original field already has a root')),
      concept(b('不可约性决定商环是否成为域','Irreducibility determines whether the quotient is a field')),
      comparison(b('可约关系与不可约关系给出两种算术','Reducible and irreducible relations produce different arithmetic'),[
        {title:b('用 x²+x=0 作为关系','Impose x²+x=0'),body:b('它分解为 x(x+1)。取商后 [x]、[x+1] 都非零，乘积却为零；这样的环保留零因子。','It factors as x(x+1). In the quotient, [x] and [x+1] are nonzero but their product is zero, so the ring has zero divisors.'),formula:'𝔽₂[x]/(x²+x)'},
        {title:b('用 x²+x+1=0 作为关系','Impose x²+x+1=0'),body:b('这是无根的二次多项式，因此不可约。取商后每个非零类都能求逆，得到一个域。','This quadratic has no root and is therefore irreducible. Every nonzero class in the quotient has an inverse, giving a field.'),formula:'𝔽₂[x]/(x²+x+1)'}
      ]),
      argument(b('贝祖等式为何给出了乘法逆元','Why Bézout’s identity produces an inverse'),b('不可约的 f 与任何次数更小的非零 g 互素。欧几里得算法将 1 写成 uf+vg；取商后 f 变成 0，剩下的等式就是 [v][g]=1。','An irreducible f is coprime to every nonzero g of smaller degree. The Euclidean algorithm writes 1=uf+vg. In the quotient f becomes zero, leaving precisely the inverse equation [v][g]=1.')),
      example(b('四元素域的四种标准表达','The four standard expressions in a four-element field')),
      steps(b('在新数系中完成一次除法','Carry out a division in the new number system'),[
        {title:b('列出元素','List the elements'),body:b('除以二次多项式后的余数唯一形如 a+bα，其中 a、b∈𝔽₂。因此元素恰好是 0、1、α、α+1。','Remainders modulo a quadratic have the unique form a+bα with a,b∈𝔽₂. The elements are exactly 0, 1, α, and α+1.')},
        {title:b('先乘开，再降次','Multiply first, then reduce the degree'),body:b('α(α+1)=α²+α=(α+1)+α=1，所以 α 的逆是 α+1。运算始终回到同样的四种表达中。','Compute α(α+1)=α²+α=(α+1)+α=1. Thus α+1 is the inverse of α, and every operation returns to one of the four standard expressions.')}
      ]),
      quiz(1,b('把定义关系用于实际计算','Use the defining relation in a calculation')),
      callout(b('不可约性总要说明基域','Irreducibility always depends on the base field'),b('x²+1 在 ℝ 上不可约，在 ℂ 上却等于 (x−i)(x+i)。改变允许使用的系数就会改变分解方式；域扩张研究的正是这种改变如何发生。','The polynomial x²+1 is irreducible over ℝ but factors as (x−i)(x+i) over ℂ. Changing the allowed coefficients changes possible factorizations. Field extensions study exactly this change.'))
    ]
  }
};
