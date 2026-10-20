import {b,text,lab,concept,argument,example,quiz,comparison,steps,callout} from './lesson-blocks.js';

export const plans2={
  13:{
    question:b('给有理数加入 √2，究竟增加了什么？','What changes when we adjoin √2 to the rationals?'),
    prerequisites:[9,12],
    recall:b('多项式可以给新元素规定关系。本课把 α²=2 变成一种可计算的数系，并数清描述一个元素需要几个坐标。','A polynomial can prescribe a relation for a new element. We turn α²=2 into a number system and count the coordinates needed to describe an element.'),
    destination:b('第14课把这种构造搬到有限域；第15课研究保持这些代数关系的对称。','Lesson 14 carries this construction into finite fields; lesson 15 studies symmetries that preserve the algebraic relations.'),
    sections:[
      steps(b('先学会用两个坐标写一个数','First write a number using two coordinates'),[
        {title:b('线性组合：只让系数变化','Linear combinations: vary the coefficients'),body:b('a+b√2 是 1 与 √2 的有理线性组合；允许 a,b 取任意有理数。相加时分别相加两个系数，乘以有理数时同时缩放它们。','The expression a+b√2 is a rational linear combination of 1 and √2, with arbitrary rational a,b. Add such expressions coordinatewise and scale both coordinates by a rational number.')},
        {title:b('基：能表示，而且只能表示一次','A basis: every expression exists and is unique'),body:b('若 a+b√2=c+d√2，则 (b−d)√2=c−a。√2 的无理性迫使 b=d、a=c。因此 {1,√2} 是一组基，维数是 2。','If a+b√2=c+d√2, then (b−d)√2=c−a. Irrationality forces b=d and a=c. Thus {1,√2} is a basis, of dimension 2.')}
      ]),
      lab(b('平方会不会逃出这两个坐标？','Does squaring leave these two coordinates?'),b('选择整数系数 a,b，观察 (a+b√2)² 的结果，再用 (√2)²=2 解释常数项。这里用整数系数展示有理系数的一类例子；说明平方为什么仍具有同样的两个坐标。','Choose integer coefficients a,b and inspect (a+b√2)². Use (√2)²=2 to explain the constant term. Integer coefficients illustrate a class of rational-coefficient examples; explain why squaring still uses the same two coordinates.')),
      concept(b('把坐标数命名为扩张次数','Name the coordinate count: extension degree')),
      quiz(0,b('次数在数什么？','What does the degree count?')),
      argument(b('两层坐标如何合成一层','Combine two levels of coordinates'),b('塔式定理的乘法来自“每个上层坐标还需要一组下层坐标”。证明要同时检查能够展开和展开唯一。','Multiplication in the tower law comes from expanding each upper-level coordinate in lower-level coordinates. The proof checks both existence and uniqueness of expansion.')),
      text(b('加入一个根之后，哪些幂还独立？','After adjoining a root, which powers remain independent?'),b('若 α 的最小多项式次数为 d，则 1,α,…,αᵈ⁻¹ 构成 F(α) 在 F 上的一组基。多项式除法把更高次幂化到这些幂；最小性保证它们之间没有非零的 F 线性关系。这把第12课的“不可约多项式”连到本课的“坐标数”。','If α has a minimal polynomial of degree d, then 1,α,…,αᵈ⁻¹ form an F-basis of F(α). Polynomial division reduces higher powers to these powers, and minimality rules out a nonzero F-linear relation among them. This connects irreducible polynomials in lesson 12 to the coordinate count here.')),
      quiz(1,b('把两个有限扩张接起来','Join two finite extensions'))
    ]
  },
  14:{
    question:b('有四个元素的数系，为什么不一定是模 4？','Why is a four-element field different from arithmetic modulo 4?'),
    prerequisites:[10,12,13],
    recall:b('商环通过一个多项式关系压缩表达式；不可约多项式使域上的多项式商环成为域。现在用这一方法构造四元素域。','A polynomial quotient reduces expressions using a relation. An irreducible polynomial over a field gives a quotient that is itself a field. We use this to build a field with four elements.'),
    destination:b('平方映射展示了一个非平凡的域自同构，它是第15课伽罗瓦群的具体入口。','The squaring map supplies a nontrivial field automorphism, a concrete entry to Galois groups in lesson 15.'),
    sections:[
      comparison(b('同样四个元素，两套乘法','Four elements, two different multiplications'),[
        {title:b('ℤ/4ℤ：余数构成的环','ℤ/4ℤ: a ring of residues'),body:b('非零元素 2 满足 2·2=0，所以它没有乘法逆元。这套模运算不能成为域。','The nonzero element 2 satisfies 2·2=0, so it has no multiplicative inverse. This modular arithmetic is not a field.'),formula:'2² = 0 in ℤ/4ℤ'},
        {title:b('𝔽₂ 上加入一个二次根','Adjoin a quadratic root over 𝔽₂'),body:b('x²+x+1 在 𝔽₂ 中没有根，作为二次多项式便不可约。取商后每个元素唯一写成 a+bα，其中 a,b∈𝔽₂，故一共四个。','The quadratic x²+x+1 has no root in 𝔽₂ and is therefore irreducible. In its quotient every element is uniquely a+bα with a,b∈𝔽₂, giving four elements.'),formula:'𝔽₄ = 𝔽₂[x]/(x²+x+1),  α = [x]'}
      ]),
      concept(b('特征决定底层算术，维数决定元素数','Characteristic sets the arithmetic; dimension sets the size')),
      quiz(0,b('四元素域的 1 加几次得到 0？','How many copies of 1 add to 0?')),
      lab(b('追踪平方映射的两个固定点与一次交换','Track squaring: two fixed points and one swap'),b('先计算 α²，再计算 (α+1)²。观察平方映射如何作用于四个元素，并验证它保持加法和乘法。','Compute α² and then (α+1)². Track the four elements under squaring and check that addition and multiplication are preserved.')),
      argument(b('为什么取 p 次幂会成为自同构？','Why does raising to the pth power give an automorphism?'),b('特征 p 消去二项式展开的中间项；域的性质给出单射；有限性最后给出满射。三个条件各有自己的作用。','Characteristic p removes the intermediate binomial terms; the field property gives injectivity; finiteness then gives surjectivity. Each hypothesis has a distinct job.')),
      text(b('幂次与周期开始成为对称','Powers and periods become symmetries'),b('在 𝔽₄ 中，平方两次让每个元素回到原位。因此这个自同构的阶是 2，它逐点固定 𝔽₂。我们已经遇见一个由域内运算产生的 C₂；接下来将系统研究固定某个基域的全部自同构。','In 𝔽₄, squaring twice returns every element to itself. This automorphism has order 2 and fixes 𝔽₂ pointwise. We have found a C₂ arising from field arithmetic; next we study all automorphisms fixing a chosen base field.')),
      quiz(1,b('哪些元素数量首先就被排除了？','Which sizes are ruled out immediately?'))
    ]
  },
  15:{
    question:b('能否从根的对称，读出所有中间域？','Can symmetries of roots reveal every intermediate field?'),
    prerequisites:[4,5,6,13],
    recall:b('第5课的同态要求保持运算，第13课的扩张把新根加入域。现在要求一个双射同时保持加法、乘法和基域中的每个元素。','Homomorphisms preserve operations, and field extensions adjoin roots. We now require a bijection to preserve addition, multiplication, and every element of the base field.'),
    destination:b('第16课用伽罗瓦群判断根式可解性；第22课反问给定的群能否来自有理数上的方程。','Lesson 16 uses Galois groups to study radical formulas; lesson 22 asks which groups arise from equations over the rationals.'),
    sections:[
      text(b('先把方程的根放在同一个域里','First put all the roots in one field'),b('域称为代数闭的，是指其中每个非常数一元多项式都有根。F 的代数闭包是包含 F 的代数闭域，且每个元素在 F 上代数。非零多项式 f∈F[x] 的分裂域，是在选定的代数闭包中包含 F 和 f 的全部根的最小域。固定 F 的自同构 σ 把根 α 送到另一个根，因为 f(σ(α))=σ(f(α))=0。根生成整个分裂域，因此自同构由根的去向决定；只有保持根之间全部代数关系的置换才能成立。','A field is algebraically closed if every nonconstant polynomial over it has a root in it. An algebraic closure of F is an algebraically closed extension whose elements are all algebraic over F. A splitting field of a nonzero polynomial f∈F[x] is the smallest subfield of a chosen algebraic closure containing F and all roots of f. An automorphism σ fixing F sends a root α to another root, since f(σ(α))=σ(f(α))=0. The roots generate the field, so their images determine the automorphism. Only permutations preserving all algebraic relations among the roots are allowed.')),
      concept(b('对应定理的适用范围：有限、正规、可分','The setting: finite, normal, and separable')),
      comparison(b('固定更多元素，与施加更多对称条件','Fix more elements, or impose more symmetries'),[
        {title:b('从中间域到子群','From an intermediate field to a subgroup'),body:b('要求固定 ℚ(√2)，就排除了把 √2 变成 −√2 的自同构。要求固定的域越大，允许的自同构越少。','Fixing ℚ(√2) rules out automorphisms that send √2 to −√2. A larger field to fix leaves fewer allowed automorphisms.'),formula:'K₁ ⊆ K₂ ⇒ Gal(E/K₂) ⊆ Gal(E/K₁)'},
        {title:b('从子群到固定域','From a subgroup to its fixed field'),body:b('一个元素要属于 Eᴴ，就必须被 H 中每个自同构固定。增大 H 会增加需要同时满足的条件。','An element belongs to Eᴴ only if every automorphism in H fixes it. Enlarging H adds simultaneous conditions.'),formula:'H₁ ⊆ H₂ ⇒ Fix(H₂) ⊆ Fix(H₁)'}
      ]),
      lab(b('两座格中的同一次选择','One selection in two reversed lattices'),b('在 ℚ(√2,√3) 的子群格中选择“同时翻转两个根”。先预测哪个二次中间域不变，再观察两座格的反向包含关系。','Select the subgroup that flips both square roots in ℚ(√2,√3). Predict its fixed quadratic field, then follow the reversed inclusions in the two lattices.')),
      quiz(1,b('两个负号能保留什么？','What survives two sign changes?')),
      argument(b('把双二次例子的对应完整算出来','Work out the full biquadratic correspondence'),b('这里用一个扩张算清所有子群与中间域。一般的基本定理另有完整证明；这个例子说明其每个对象和箭头的含义。','We calculate every subgroup and intermediate field of one extension. The general fundamental theorem has a separate full proof; this example explains its objects and arrows.')),
      quiz(0,b('把全部对称条件同时施加','Impose all the symmetry conditions'))
    ]
  },
  16:{
    question:b('五次方程缺少通用根式公式，障碍藏在哪里？','Where does the obstruction to a general quintic formula live?'),
    prerequisites:[6,15],
    recall:b('伽罗瓦群记录根之间允许的置换。现在关注群能否通过阿贝尔商逐层分解，这对应于求根过程能否由根式搭建。','A Galois group records allowed permutations of roots. We now ask whether the group decomposes through abelian quotients, the structure behind solving by radicals.'),
    destination:b('第22课进一步研究哪些有限群能成为有理数上方程的伽罗瓦群。','Lesson 22 asks which finite groups occur as Galois groups over the rationals.'),
    sections:[
      comparison(b('先认清置换群与“逐层变交换”的意思','Meet permutation groups and abelian layers'),[
        {title:b('Sₙ 与 Aₙ','Sₙ and Aₙ'),body:b('Sₙ 是 n 个标签的全部置换在复合下组成的群。换位交换两个标签；能写成偶数个换位的置换构成 Aₙ，称为交错群。换位个数的奇偶性与分解选择无关。','Sₙ is the group of all permutations of n labels under composition. A transposition swaps two labels. Permutations expressible as an even number of transpositions form the alternating group Aₙ; this parity is independent of the chosen decomposition.'),formula:'Aₙ ◁ Sₙ'},
        {title:b('让商群变得交换','Make the quotient abelian'),body:b('换位子测量 ab 与 ba 的差异。把所有换位子压成单位元，G/G′ 就成为阿贝尔群；再对 G′ 重复，便得到导出列。','Commutators measure the difference between ab and ba. Collapsing all commutators to the identity makes G/G′ abelian. Repeating the construction inside G′ gives the derived series.'),formula:'G/G′ is abelian'}
      ]),
      concept(b('可解群：导出列最终到达单位元','Solvable groups: the derived series reaches the identity')),
      lab(b('比较 S₃ 的下降与 A₅ 的停留','Compare descent in S₃ with persistence in A₅'),b('逐层查看导出列。对 S₃ 记录每一步得到的导出子群；对 S₅ 找出第一次停止变小的位置。','Trace the derived series. Record the derived subgroup obtained at each step for S₃, then identify where the series for S₅ stops shrinking.')),
      quiz(0,b('三次方程的群通过结构检验了吗？','Does the cubic symmetry group pass the test?')),
      argument(b('从群的障碍到根式公式的障碍','From a group obstruction to a formula obstruction'),b('S₃ 的两层商为 S₃/A₃≅C₂ 与 A₃/{e}≅C₃，都是阿贝尔群。下面使用的特征 0 指域中任意正整数 n 都满足 n·1≠0，例如 ℚ；简单群指非平凡群，且正规子群只有 {e} 与自身。根式可解性与群可解性的等价是这里引用的深层定理。结合 A₅ 的非交换简单性，它解释一般五次方程的结论。','The two quotients for S₃ are S₃/A₃≅C₂ and A₃/{e}≅C₃, both abelian. Characteristic 0 means n·1≠0 for every positive integer n, as in ℚ. A simple group is nontrivial and has no normal subgroups other than {e} and itself. The equivalence between radical solvability and group solvability is a deeper theorem used here. Together with the nonabelian simplicity of A₅, it explains the conclusion for the generic quintic.')),
      text(b('“一般五次”究竟是哪一个命题？','What does “the general quintic” mean?'),b('一般五次多项式把五个系数视为独立变量，在这些变量生成的有理函数域上讨论，伽罗瓦群为 S₅。于是不存在对所有五次方程都适用的根式公式。一个具体五次多项式可以有更小的可解群，必须单独判断。','For the generic quintic, the five coefficients are independent variables and the base field is their rational function field. Its Galois group is S₅, ruling out a radical formula valid for every quintic. A particular quintic may have a smaller solvable group and must be considered on its own.')),
      example(b('一个五次方程仍然可以根式可解','A quintic can still be solvable by radicals')),
      quiz(1,b('把结论精确应用到具体方程','Apply the conclusion to a particular equation'))
    ]
  },
  17:{
    question:b('整数能够当标量，为什么有些“向量”会被乘成零？','If integers are scalars, why can a nonzero “vector” be killed?'),
    prerequisites:[3,9,13],
    recall:b('向量空间使用域作为标量；阿贝尔群允许重复加法。让整数通过重复加法作用，便把两条线索接到一起。','Vector spaces use field scalars, while abelian groups support repeated addition. Letting integers act by repeated addition joins these two ideas.'),
    destination:b('第18课用这种语言分类有限生成阿贝尔群；第24课指出从模与映射走向同调代数的路线。','Lesson 18 uses this language to classify finitely generated abelian groups; lesson 24 points from modules and maps toward homological algebra.'),
    sections:[
      lab(b('先观察一个元素被 6 消去','Watch multiplication by 6 kill an element'),b('在 ℤ/6ℤ 上改变整数标量。找出把 [1] 送到 [0] 的最小正整数，再比较 [2] 和 [3] 所需的标量。','Vary the integer scalar on ℤ/6ℤ. Find the least positive scalar sending [1] to [0], then compare the corresponding scalars for [2] and [3].')),
      text(b('标量不可逆时，消去法改变了','Cancellation changes when scalars are not invertible'),b('在域上的向量空间中，c≠0 且 cv=0 就能乘 c⁻¹ 得到 v=0。在 ℤ 模中，6 没有整数逆元，6m=0 便可能伴随 m≠0。挠元正是这种现象：在这里它指被某个非零整数消去的元素。','In a vector space over a field, c≠0 and cv=0 imply v=0 by multiplication by c⁻¹. In a ℤ-module, 6 has no integer inverse, so 6m=0 can hold with m≠0. Such an element is torsion: here this means annihilated by a nonzero integer.')),
      concept(b('保留线性运算，允许环作标量','Keep linear operations and allow ring scalars')),
      quiz(1,b('域上的模回到哪个熟悉对象？','Which familiar object is a module over a field?')),
      argument(b('为什么 ℤ/6ℤ 没有整数基？','Why does ℤ/6ℤ have no integer basis?'),b('一个生成元只保证能表示所有元素；一组基还要求表示唯一。[1] 生成 ℤ/6ℤ，但系数 0 与 6 给出同一个元素。','A generator guarantees that every element can be expressed; a basis also requires uniqueness. The element [1] generates ℤ/6ℤ, but coefficients 0 and 6 give the same element.')),
      comparison(b('把“生成”与“自由”分开','Separate generation from freeness'),[
        {title:b('ℤ：一个生成元，也有一组基','ℤ: one generator and a basis'),body:b('每个整数都唯一写成 n·1。没有非零整数把 1 消去，所以 {1} 是一个 ℤ 基。','Every integer is uniquely n·1. No nonzero integer kills 1, and {1} is a ℤ-basis.'),formula:'ℤ ≅ ℤ·1'},
        {title:b('ℤ/6ℤ：一个生成元，却没有基','ℤ/6ℤ: one generator but no basis'),body:b('每个元素都由 [1] 生成，但 6[1]=0 是一个非平凡关系。生成元加上关系，成为描述模的一种自然方式。','Every element is generated by [1], but 6[1]=0 is a nontrivial relation. Generators together with relations become a natural way to describe a module.'),formula:'6[1] = [0]'}
      ]),
      quiz(0,b('用挠元判断自由性','Use torsion to test freeness'))
    ]
  },
  18:{
    question:b('同样由循环块组成，什么时候其实是同一个群？','When do different collections of cyclic blocks give the same group?'),
    prerequisites:[3,11,17],
    recall:b('元素的阶记录周期，中国剩余定理能拆开互素模数，ℤ 模把阿贝尔群写成生成元与关系。现在把这些工具用于分类。','Element orders record periods, the Chinese remainder theorem separates coprime moduli, and ℤ-modules describe abelian groups by generators and relations. We now use these tools for classification.'),
    destination:b('第20课用泛性质解释直积；第23课的有理点群将分成自由部分和有限挠部分。','Lesson 20 explains products by their universal property; lesson 23 splits a group of rational points into a free part and finite torsion.'),
    sections:[
      example(b('六个元素可以合成一圈，四个却未必','Six elements may make one cycle; four may not')),
      comparison(b('先用元素的阶识别不同结构','Use element orders to distinguish structures'),[
        {title:b('两个互素的周期','Two coprime periods'),body:b('在 C₂×C₃ 中同步走一步，两个坐标要到第六步才同时回到零。因此一个元素走遍六个位置。','In C₂×C₃, taking one step in both coordinates returns both to zero for the first time after six steps. One element visits all six positions.'),formula:'ord((1,1)) = lcm(2,3) = 6'},
        {title:b('重复的素数周期','Repeated prime periods'),body:b('在 C₂×C₂ 中，任意元素走两步就回到零。虽然有四个元素，却找不到走遍四个位置的生成元。','In C₂×C₂, every element returns to zero after two steps. There are four elements but no generator that visits all four.'),formula:'2(a,b) = (0,0)'}
      ]),
      lab(b('在直积中寻找最长周期','Find the longest period in a product'),b('改变两个循环块的大小，查看反复加 (1,1) 所生成的高亮点。将周期长度与群的总大小比较，再判断直积是否循环。','Change the sizes of two cyclic factors and inspect the highlighted points generated by repeatedly adding (1,1). Compare its period with the total group size and decide whether the product is cyclic.')),
      argument(b('互素性为什么恰好是判据？','Why is coprimality exactly the criterion?'),b('两个坐标同时归零需要同时满足两个整除条件，最小公倍数因此出现。','Returning both coordinates to zero imposes two divisibility conditions, bringing in the least common multiple.')),
      quiz(0,b('检验一对互素循环块','Test a pair of coprime cyclic factors')),
      concept(b('分类答案：自由方向与有限循环块','The classification: free directions and finite cyclic blocks')),
      steps(b('怎样读取结构定理给出的答案？','How do we read the structure theorem?'),[
        {title:b('先看自由秩 r','First read the free rank r'),body:b('ℤʳ 给出 r 个可以独立无限前进的方向。r>0 时群无限，即使只需要有限个生成元。','The factor ℤʳ gives r independent directions of unlimited travel. If r>0, the group is infinite even though finitely many generators suffice.')},
        {title:b('再看按整除排列的不变量','Then read the divisibility-ordered invariants'),body:b('有限循环块的大小满足 d₁∣d₂∣⋯∣dₖ。这个顺序把不同写法整理成唯一的不变量；定理适用于有限生成阿贝尔群，完整证明通过整数矩阵的 Smith 标准形完成。','The finite cyclic sizes satisfy d₁∣d₂∣⋯∣dₖ. This convention turns different presentations into unique invariants. The theorem applies to finitely generated abelian groups; its full proof uses Smith normal form for integer matrices.')}
      ]),
      quiz(1,b('四个元素就能构成一个四周期吗？','Do four elements guarantee a four-cycle?'))
    ]
  },
  19:{
    question:b('把正方形的动作写成矩阵，能多看见什么？','What do matrices reveal about the motions of a square?'),
    prerequisites:[2,5,7,13],
    recall:b('群作用把元素变成变换；向量空间提供可相加、可缩放的对象。表示就是要求这些变换同时保持线性结构。','Group actions turn elements into transformations. Vector spaces supply objects that can be added and scaled. A representation requires the transformations to preserve this linear structure.'),
    destination:b('第24课的表示论路线从不变子空间、直和分解与特征标继续深入。','The representation-theory route in lesson 24 continues through invariant subspaces, direct sums, and characters.'),
    sections:[
      lab(b('让一个向量经历旋转与反射','Rotate and reflect a vector'),b('选择正方形的旋转或反射，追踪向量及其矩阵。比较先反射再旋转与先旋转再反射，观察矩阵乘法如何记录顺序。','Choose a rotation or reflection and track a vector and its matrix. Compare the two orders of composition to see how matrix multiplication records order.')),
      text(b('从动作到线性变换，只增加一个要求','From an action to a linear action'),b('线性变换 T 满足 T(av+bw)=aT(v)+bT(w)。给定一组基，只需记录各基向量的像；这些坐标排成矩阵的列，复合就对应矩阵乘法。群元素有逆元，所以表示中的线性变换也必须可逆。','A linear map T satisfies T(av+bw)=aT(v)+bT(w). After choosing a basis, record the images of the basis vectors as matrix columns; composition becomes matrix multiplication. Group elements have inverses, so the representing linear maps must be invertible.')),
      concept(b('表示、不变子空间与特征标','Representations, invariant subspaces, and characters')),
      example(b('把 D₄ 的关系写进两个矩阵','Encode the relations of D₄ in two matrices')),
      quiz(0,b('从矩阵读取一个特征标值','Read a character value from a matrix')),
      argument(b('是否存在所有动作都保持的一条直线？','Does every motion preserve a common line?'),b('不可约性要求同时检查整个群。在实平面的这个例子中，只需找到一个不可能保持任何实直线的群元素。','Irreducibility concerns subspaces invariant under the whole group. In this real-plane example, one group element that preserves no real line is enough to rule them all out.')),
      comparison(b('两个不同的问题：是否忠实，是否不可约','Two questions: faithful or irreducible?'),[
        {title:b('忠实性检查群元素','Faithfulness checks group elements'),body:b('忠实表示的核只有单位元，所以不同群元素产生不同矩阵。这回答“动作遗失了多少群的信息”。','A faithful representation has trivial kernel, so distinct group elements give distinct matrices. It asks how much information about the group is retained.'),formula:'ker ρ = {e}'},
        {title:b('不可约性检查子空间','Irreducibility checks subspaces'),body:b('不可约表示没有非零真不变子空间。这回答“向量空间还能否分出一个由全群保持的部分”，与单射性是不同条件。','An irreducible representation has no nonzero proper invariant subspace. It asks whether the space contains a smaller nontrivial part preserved by every group element, a different condition from injectivity.'),formula:'0 ≠ W ≠ V ⇒ W is not invariant'}
      ]),
      quiz(1,b('一个表示必须保留全部群信息吗？','Must a representation retain all group information?'))
    ]
  },
  20:{
    question:b('不用元素坐标，怎样说明一个对象就是直积？','How can we identify a product without starting from coordinates?'),
    prerequisites:[5,11,18],
    recall:b('我们已经用直积组合群，也用中国剩余定理把一个群映入两个坐标。现在把“坐标共同决定一个映射”提升为构造原则。','We have combined groups by products and used the Chinese remainder theorem to map into two coordinates. We now turn “coordinates determine a map” into a construction principle.'),
    destination:b('第24课把泛性质连到商对象、张量积与同调代数的后续学习。','Lesson 24 connects universal properties to quotients, tensor products, and later homological algebra.'),
    sections:[
      steps(b('从两个输出要求，反推出一个映射','Recover one map from two output requirements'),[
        {title:b('给出两个兼容的观察窗口','Specify two observation maps'),body:b('给定群同态 f:X→A 与 g:X→B。我们要把它们合成一个从 X 到新对象的同态，并能用两个投影分别恢复 f 与 g。','Given homomorphisms f:X→A and g:X→B, seek a single homomorphism from X to a new object whose two projections recover f and g.')},
        {title:b('要求恰好有一种合成方式','Require exactly one combined map'),body:b('只要求存在还不够：若同一对输出对应多个合成映射，新对象就携带了这些输出无法决定的信息。唯一性使直积精确表达这一对输出。','Existence alone is not enough: multiple combined maps for the same outputs would leave information undetermined. Uniqueness makes the product express exactly this pair of outputs.')}
      ]),
      example(b('熟悉的 CRT 映射也是一对输出','The CRT map is a familiar pair of outputs')),
      concept(b('把对象与映射放进一个范畴','Put objects and maps in a category')),
      quiz(1,b('先确定允许哪一种箭头','First specify which arrows are allowed')),
      lab(b('从两个余数读取同一个映射','Read one map from its two residues'),b('选择 m=2、n=3 并移动 x。高亮格子的行给出 x mod 2，列给出 x mod 3，两者合起来就是 h(x)。说明两个投影如何分别恢复 f 与 g；再选择非互素模数，区分“映入直积”与“同构到直积”。','Choose m=2 and n=3, then move x. The highlighted row gives x mod 2 and the column gives x mod 3; together they give h(x). Explain how the two projections recover f and g. Then choose noncoprime moduli to distinguish a map into a product from an isomorphism onto it.')),
      argument(b('构造一次，再证明唯一','Construct the map and prove uniqueness'),b('泛性质必须对每个群 X 和每对同态 f,g 都成立。逐坐标构造给出存在性，投影条件给出唯一性。','The universal property must hold for every group X and every pair of homomorphisms f,g. Coordinatewise construction gives existence; the projection equations give uniqueness.')),
      text(b('为什么这比记住一种构造更有用？','Why is this more useful than memorizing a construction?'),b('若 P 与 Q 都满足同一积的泛性质，可分别得到 P→Q 和 Q→P 的唯一映射。它们的复合具有恒等映射的投影，由唯一性就等于恒等，因此 P 与 Q 同构。泛性质允许我们更换具体实现，同时保留同一个数学对象的结构。','If P and Q both satisfy the product property, each property gives a unique map to the other. The composites have the same projections as the identity maps, so uniqueness makes them identities. Thus P and Q are isomorphic. A universal property lets us change the concrete realization while retaining the mathematical structure.')),
      quiz(0,b('唯一性承担了什么工作？','What does uniqueness contribute?'))
    ]
  },
  21:{
    question:b('多项式方程画出的图形，能保留多少代数信息？','How much algebra does a polynomial’s zero set remember?'),
    prerequisites:[10,12],
    recall:b('理想把一组方程及其代数后果放在一起。现在把每个理想送到同时满足这些方程的点集，观察代数与几何之间的翻译。','An ideal gathers equations together with their algebraic consequences. We now send an ideal to their common solutions and study the translation between algebra and geometry.'),
    destination:b('继续学习根理想、坐标环与局部化；它们分别处理零点信息、图形上的函数和局部观察。','Continue with radical ideals, coordinate rings, and localization: tools for zero sets, functions on a shape, and local information.'),
    sections:[
      lab(b('从两条轴到一条轴：添加一个方程','From two axes to one: add an equation'),b('先看 xy=0，再加入 x=0。逐点判断哪些点仍同时满足全部方程，解释为什么“增加方程”产生“减少点”。','Begin with xy=0, then add x=0. Determine which points still satisfy every equation and explain why adding equations removes points.')),
      text(b('为什么方程要组成理想？','Why gather equations into an ideal?'),b('若 f 与 g 都在某个点为零，则 f+g 在该点为零，任意多项式 h 的乘积 hf 也为零。因此把方程换成它们生成的理想不会改变公共零点集。理想记录所有可由这些方程直接组合得到的约束。','If f and g vanish at a point, so do f+g and hf for every polynomial h. Replacing equations by the ideal they generate leaves their common zero set unchanged. The ideal records constraints obtained by polynomial combinations.')),
      concept(b('V 与 I：从方程到点，再从点回到方程','V and I: equations to points and back')),
      quiz(0,b('预测再加一个方程的效果','Predict the effect of one more equation')),
      argument(b('包含关系为何反向？','Why do inclusions reverse?'),b('反向包含只依赖“同时满足所有方程”的含义，对任意域成立。零点定理进一步描述往返之后得到哪个理想，它需要代数闭域。','Reversed inclusion follows from satisfying every equation and works over any field. The Nullstellensatz says which ideal remains after a round trip; that statement requires an algebraically closed field.')),
      comparison(b('同一个点集，可能来自不同代数','The same points can hide different algebra'),[
        {title:b('仿射直线上的 x=0 与 x²=0','x=0 and x²=0 on the affine line'),body:b('现在取一元多项式环 k[x]，在仿射直线上比较这两个方程。它们的零点集都是 {0}，但 (x)≠(x²)。根理想 √I={f:存在 n≥1 使 fⁿ∈I} 正好表达“某个幂已被方程消去”。','Now work in the one-variable polynomial ring k[x] and compare the equations on the affine line. Both zero sets are {0}, but (x)≠(x²). The radical √I={f: fⁿ∈I for some n≥1} records polynomials whose powers are forced to vanish.'),formula:'√(x²) = (x)'},
        {title:b('换域也会改变答案','Changing the field changes the answer'),body:b('x²+1 在实数中没有根，在复数中有两个根。零点定理中的“代数闭”指每个非常数一元多项式都有根；ℂ 满足这一条件，ℝ 不满足。','The polynomial x²+1 has no real roots but has two complex roots. “Algebraically closed” means every nonconstant one-variable polynomial has a root; ℂ has this property, whereas ℝ does not.'),formula:'Vℝ(x²+1) = ∅'}
      ]),
      quiz(1,b('使用零点定理前，先确定基域','Check the base field before using the Nullstellensatz')),
      steps(b('从本课走向代数几何','A route into algebraic geometry'),[
        {title:b('坐标环：研究图形上的函数','Coordinate rings: functions on a shape'),body:b('点集 X 上的两个多项式给出同一个函数，当且仅当它们的差属于消失理想 I(X)。因此坐标环是 k[x₁,…,xₙ]/I(X)。若 k 代数闭且 X=V(I)，零点定理把它写成 k[x₁,…,xₙ]/√I。','Two polynomials define the same function on X exactly when their difference lies in the vanishing ideal I(X). Thus the coordinate ring is k[x₁,…,xₙ]/I(X). If k is algebraically closed and X=V(I), the Nullstellensatz identifies it with k[x₁,…,xₙ]/√I.')},
        {title:b('概形：继续保留环中的信息','Schemes: retain more of the ring'),body:b('下一阶段先学素理想和局部化，再学如何把环的局部信息组织成几何空间。概形能够记录普通零点集没有表达出的信息，例如 k[x]/(x²) 中非零但平方为零的 [x]。','The next stage begins with prime ideals and localization, then organizes local ring information into geometric spaces. Schemes retain information that ordinary zero sets miss, such as the nonzero element [x] with square zero in k[x]/(x²).')}
      ])
    ]
  },
  22:{
    question:b('先指定一个有限群，能在有理数上造出对应的方程吗？','Given a finite group, can we realize it over the rationals?'),
    prerequisites:[13,15,16],
    recall:b('此前从分裂域计算伽罗瓦群。本课交换输入与输出：以有限群为目标，寻找实现它的有限伽罗瓦扩张。','Earlier we computed a Galois group from a splitting field. Here we reverse input and output: start with a finite group and seek a finite Galois extension realizing it.'),
    destination:b('进一步学习分裂域计算与单位根扩张，再进入有理函数域上的覆盖及其特殊化方法。','Continue with splitting-field computations and cyclotomic extensions, then study covers over rational function fields and specialization methods.'),
    sections:[
      concept(b('研究问题：每个有限群都能在 ℚ 上实现吗？','The research question: does every finite group occur over ℚ?')),
      comparison(b('已知实现与尚未解决的全称命题','Known realizations and the unresolved universal claim'),[
        {title:b('已经能构造的例子','Examples we can construct'),body:b('ℚ(√2)/ℚ 有两个自同构，对应 C₂；ℚ(√2,√3)/ℚ 的独立符号变化对应 C₂×C₂。它们既包含所需多项式的全部根，又在特征 0 下可分。','The extension ℚ(√2)/ℚ has two automorphisms, giving C₂. Independent sign changes in ℚ(√2,√3)/ℚ give C₂×C₂. Both contain all roots of the relevant polynomials and are separable in characteristic 0.'),formula:'Gal(ℚ(√2,√3)/ℚ) ≅ C₂×C₂'},
        {title:b('一般问题仍开放','The general problem remains open'),body:b('目标是覆盖每一个有限群，并且基域固定为 ℚ。若允许更换基域，或只计算一个非伽罗瓦扩张的自同构群，就改变了问题。','The target is every finite group with the base field fixed as ℚ. Allowing a different base field, or merely computing automorphisms of a non-Galois extension, changes the problem.'),formula:'For every finite G, find finite Galois E/ℚ with Gal(E/ℚ) ≅ G'}
      ]),
      quiz(0,b('问题中的基域不能省略','The base field is part of the question')),
      lab(b('比较三个可计算的实现','Compare three explicit realizations'),b('选择三个多项式，记录展示的分裂域、扩张次数与群 C₂、C₂×C₂、S₃。根据前面的根与自同构知识，说明每个群如何作用在根上，并比较群阶与扩张次数。','Select the three polynomials and record the displayed splitting fields, degrees, and groups C₂, C₂×C₂, and S₃. Use what you know about roots and automorphisms to explain each action on the roots, and compare group order with extension degree.')),
      text(b('S₃ 的例子为什么要加入一个复数？','Why does the S₃ example need a complex number?'),b('若 x³−2 有有理根 a/b，其中 a,b 互素且 b>0，则 a³=2b³ 迫使 b=1、a 整除 2。候选只有 ±1、±2，逐一代入都不是根。三次多项式若可约必有一次因子，因而 x³−2 在 ℚ 上不可约，实根 α=∛2 给出三次扩张 ℚ(α)。另外两根为 αω 与 αω²，其中 ω²+ω+1=0。实域 ℚ(α) 不含 ω；加入它使次数再乘 2。分裂域于是有次数 6，其群忠实置换三个根，因此是 S₃。','If a/b is a rational root of x³−2, with coprime integers a,b and b>0, then a³=2b³ forces b=1 and a to divide 2. The only candidates are ±1 and ±2, and none is a root. A reducible cubic has a linear factor, so x³−2 is irreducible over ℚ and its real root α=∛2 gives a cubic extension ℚ(α). The other roots are αω and αω², where ω²+ω+1=0. The real field ℚ(α) does not contain ω, so adjoining it multiplies the degree by 2. The splitting field has degree 6; its group acts faithfully on the three roots and is therefore S₃.')),
      quiz(1,b('有一个根，与包含全部根有什么差别？','How does one root differ from all the roots?')),
      steps(b('研究路线：构造，而不仅是识别','The research route: construct as well as recognize'),[
        {title:b('练习把候选扩张核实完整','Verify candidate extensions completely'),body:b('对一个明确多项式，依次求分裂域、次数和根的允许置换。仅有一个满足多项式的元素，尚未给出所需的伽罗瓦扩张。','For an explicit polynomial, determine its splitting field, degree, and allowed root permutations. One element satisfying a polynomial does not yet supply the required Galois extension.')},
        {title:b('引入参数，再研究特殊化','Introduce parameters and study specialization'),body:b('进阶方法先在带参数的函数域上构造扩张，再研究何时把参数取为有理数仍保留目标群。理解这一方向需要代数曲线与 Hilbert 不可约性定理。','Advanced methods first construct extensions over function fields with parameters, then study when rational parameter values preserve the target group. This route uses algebraic curves and Hilbert irreducibility.')}
      ]),
      callout(b('这一页的完成标准','What completing this page means'),b('能够准确陈述开放问题，独立核实 C₂ 与 S₃ 的实现，并说明有限群的分类为什么没有自动提供有理数上的扩张构造。','State the open problem precisely, verify the C₂ and S₃ realizations, and explain why classifying finite groups does not automatically construct extensions over the rationals.'))
    ]
  },
  23:{
    question:b('有理点的独立方向，为什么会与一个函数的零点相遇？','Why should independent rational points meet a zero of a function?'),
    prerequisites:[2,18],
    recall:b('有限生成阿贝尔群由自由部分与有限挠部分组成。椭圆曲线给出一个几何来源的群；BSD 将它的自由秩与分析数据相连。','A finitely generated abelian group splits into a free part and finite torsion. An elliptic curve supplies such a group geometrically; BSD relates its free rank to analytic data.'),
    destination:b('后续先学习射影曲线和有理点高度，再学习有限域点计数、复分析与 L 函数。','Next study projective curves and heights of rational points, followed by finite-field point counts, complex analysis, and L-functions.'),
    sections:[
      concept(b('研究对象：有理点加上无穷远点','The object: rational points and the point at infinity')),
      lab(b('用一条割线构造两个点的和','Construct a sum with a chord'),b('在 y²=x³−x+1 上连接 (0,1) 与 (1,1)，找到第三交点，再关于横轴反射。把几何过程与结果的有理坐标联系起来。','On y²=x³−x+1, join (0,1) and (1,1), find the third intersection, and reflect it across the x-axis. Connect the construction to the rational coordinates of the result.')),
      quiz(1,b('第三交点之后还需要哪一步？','What comes after the third intersection?')),
      text(b('从割线公式看有理点为何保持有理','Why the chord construction preserves rationality'),b('当 P=(x₁,y₁)、Q=(x₂,y₂) 的横坐标不同时，λ=(y₂−y₁)/(x₂−x₁)，相加得到 x₃=λ²−x₁−x₂、y₃=λ(x₁−x₃)−y₁。输入为有理数时这些结果仍为有理数。竖直割线对应 Q=−P，和为无穷远点 O；切线处理 P=Q。完整群律还需要证明结合性。','For P=(x₁,y₁) and Q=(x₂,y₂) with distinct x-coordinates, set λ=(y₂−y₁)/(x₂−x₁). Their sum has x₃=λ²−x₁−x₂ and y₃=λ(x₁−x₃)−y₁, which remain rational for rational inputs. A vertical chord has Q=−P and gives the point at infinity O; tangents handle P=Q. A complete proof of the group law also establishes associativity.')),
      quiz(0,b('为群律补上单位元','Complete the group law with an identity')),
      comparison(b('已知的群结构，与开放的秩预测','The known group structure and the open rank prediction'),[
        {title:b('已知：有限生成的有理点群','Known: the rational-point group is finitely generated'),body:b('Mordell–Weil 定理给出 E(ℚ)≅ℤʳ⊕T，T 有限。r 统计独立的无穷阶生成方向，不是有理点总数。r=0 时只有有限挠点，r>0 时有无穷多个有理点。','Mordell–Weil gives E(ℚ)≅ℤʳ⊕T with T finite. The rank r counts independent infinite-order directions, not the number of rational points. Rank 0 gives finitely many torsion points; positive rank gives infinitely many rational points.'),formula:'E(ℚ) ≅ ℤʳ ⊕ T'},
        {title:b('未知：一般情形的 BSD 猜想','Open: BSD in general'),body:b('L(E,s) 把各素数处的算术信息组织成一个分析函数。BSD 的秩部分预测：它在 s=1 的零点阶数等于 r。零点阶数是函数展开中首个非零项的次数。完整猜想还指定首项系数，一般情形尚未解决。','The function L(E,s) organizes arithmetic information at the primes into an analytic function. The rank part of BSD predicts that its order of vanishing at s=1 equals r. This order is the degree of the first nonzero term of its local expansion. The full conjecture also specifies the leading coefficient and remains open in general.'),formula:'rank E(ℚ) = ordₛ₌₁ L(E,s)'}
      ]),
      steps(b('连接两端需要哪些新工具？','Which tools connect the two sides?'),[
        {title:b('代数端：寻找与比较有理点','The algebraic side: find and compare rational points'),body:b('继续学习射影坐标如何容纳 O，以及高度函数如何度量有理点的算术复杂度，再研究秩的计算方法。','Study how projective coordinates include O and how height functions measure the arithmetic complexity of rational points, then learn methods for computing rank.')},
        {title:b('分析端：从有限域点数到 L 函数','The analytic side: finite-field counts to an L-function'),body:b('在好的素数处把方程模 p 化简，并数出有限域上的点。再学习如何把这些局部数据组成 L 函数，以及怎样研究它在 s=1 附近的行为。','At primes of good reduction, reduce the equation modulo p and count points over the finite field. Then learn how these local data form an L-function and how to study its behavior near s=1.')}
      ]),
      callout(b('把直观实验与研究命题区分清楚','Distinguish the experiment from the research claim'),b('割线实验解释群加法的构造；有限生成性是已知定理；秩与 L 函数零点阶数的普遍等式是 BSD 猜想的内容。每一层有不同的证明任务。','The chord experiment explains the construction of addition. Finite generation is a theorem. The general equality between rank and the order of vanishing is the BSD conjecture. Each level has its own mathematical task.'))
    ]
  },
  24:{
    question:b('面对一个新问题，怎样选择合适的代数语言？','How do we choose the right algebraic language for a new problem?'),
    prerequisites:[6,10,17,19,20],
    recall:b('群、环、域与模并非一列互相替代的概念。它们分别保留不同运算，也允许我们从不同角度研究同一个对象。','Groups, rings, fields, and modules do not replace one another in a single sequence. They retain different operations and offer different views of the same object.'),
    destination:b('按自己关心的问题选择一条路线；每条路线先补具体工具，再进入其研究问题。','Choose a route by the questions that interest you, learn its concrete tools, and then approach its research problems.'),
    sections:[
      comparison(b('先问自己究竟想保留什么','First ask which structure matters'),[
        {title:b('动作与对称','Actions and symmetry'),body:b('若研究可逆动作怎样组合，先找群；若这些动作作用在线性空间上，转向表示。轨道、稳定子、核与不变子空间回答不同问题。','For composition of reversible actions, start with groups. For actions on linear spaces, use representations. Orbits, stabilizers, kernels, and invariant subspaces answer different questions.'),formula:'G → GL(V)'},
        {title:b('方程与算术','Equations and arithmetic'),body:b('若研究多项式约束，先找环与理想；若要加入根并比较根的对称，使用域扩张与伽罗瓦群。基域始终是问题的一部分。','For polynomial constraints, use rings and ideals. To adjoin roots and compare their symmetries, use field extensions and Galois groups. The base field remains part of the question.'),formula:'F ⊆ E,  Gal(E/F)'}
      ]),
      lab(b('按问题浏览学习地图','Navigate the map by questions'),b('选择一个方向，指出它从哪种对象出发、保留哪些运算、使用哪些映射。把自己已学过的节点与下一阶段的节点连接起来。','Choose a direction and identify its objects, operations, and maps. Connect the topics you have studied to the next topics on that route.')),
      concept(b('反复出现的三种方法','Three recurring methods')),
      text(b('一张商映射，同时有三个视角','One quotient map, three perspectives'),b('映射 ℤ→ℤ/6ℤ 的核是 6ℤ，纤维是 a+6ℤ，像是整个 ℤ/6ℤ。作为群同态，它保留加法；作为环同态，它还保留乘法；作为 ℤ 模同态，它保留整数数乘。三个第一同构定理使用同一分块，却分别说明不同运算在商中成立。','The map ℤ→ℤ/6ℤ has kernel 6ℤ, fibers a+6ℤ, and image all of ℤ/6ℤ. As a group homomorphism it preserves addition; as a ring homomorphism it also preserves multiplication; as a ℤ-module map it preserves integer scaling. The three first isomorphism theorems use the same partition while asserting compatibility with their respective operations.')),
      quiz(0,b('在环的视角下识别核','Identify the kernel in the ring perspective')),
      steps(b('下一阶段：每条路线先补哪座桥？','Next stage: build the bridge for each route'),[
        {title:b('表示论：从一个表示到所有表示','Representation theory: from one representation to all'),body:b('先学习线性代数中的直和与投影，再证明有限群的 Maschke 定理，学习特征标正交关系。核心问题是怎样分类不可约表示，并从它们恢复群的信息。','Learn direct sums and projections in linear algebra, then prove Maschke’s theorem for finite groups and study character orthogonality. Ask how irreducible representations are classified and what they reveal about a group.')},
        {title:b('交换代数与几何：从方程到局部结构','Commutative algebra and geometry: equations to local structure'),body:b('先学习素理想、局部化和 Noether 环。素理想使商环成为整环，局部化允许把选定元素当作可逆元，Noether 条件要求每个理想有限生成。这些工具通向代数簇与概形。','Learn prime ideals, localization, and Noetherian rings. A prime ideal gives a domain quotient; localization makes selected elements invertible; the Noetherian condition says every ideal is finitely generated. These tools lead to varieties and schemes.')},
        {title:b('同调代数：记录映射如何衔接','Homological algebra: track how maps fit together'),body:b('从模同态开始。序列 M→N→P 在 N 处正合，指前一映射的像等于后一映射的核。先掌握正合列与张量积；张量积把双线性映射改写成线性映射，再学习射影分解与导出函子。','Begin with module maps. A sequence M→N→P is exact at N when the image of the first map equals the kernel of the second. Learn exact sequences and tensor products, which turn bilinear maps into linear maps, then study projective resolutions and derived functors.')},
        {title:b('算术：在特定基域上构造和计数','Arithmetic: construct and count over a specified field'),body:b('从分裂域与有限域进入代数数论，再研究逆伽罗瓦问题；从有理点群进入椭圆曲线，再研究 BSD。第22、23课分别给出了问题、已知起点和下一阶段工具。','Move from splitting fields and finite fields into algebraic number theory and the inverse Galois problem, or from rational-point groups into elliptic curves and BSD. Lessons 22 and 23 separate each problem, its known starting points, and the tools needed next.')}
      ]),
      quiz(1,b('为同调代数选择直接先修','Choose the direct preparation for homological algebra')),
      callout(b('毕业任务：为一个问题选择结构与证据','Final task: choose the structure and evidence for a problem'),b('解释 ℤ→ℤ/6ℤ 的核、像、纤维与商，并分别写出它保留的加法、乘法和数乘。然后从地图选一个方向，用三句话写出：我想解决什么问题、当前能证明什么、还需要学习什么工具。','Explain the kernel, image, fibers, and quotient of ℤ→ℤ/6ℤ, writing separately the addition, multiplication, and scalar multiplication it preserves. Then choose a route and state: the question you want to answer, what you can prove now, and the tools you need next.'))
    ]
  }
};
