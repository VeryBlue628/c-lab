const i="Introduction",e="C 语言入门",o="从第一行代码开始，认识程序如何运行。",a=[{id:"c1-1",chapter:1,index:0,en:"C Language",title:"认识 C 语言",objective:"理解源代码、编译器和程序之间的关系。",explanation:["把源代码想象成一份用文字写下的菜谱，CPU 需要的是可以直接执行的指令。C 编译器负责检查并翻译这份菜谱；有语法错误时，程序还没有开始运行。","C 常用于操作系统和嵌入式设备。这个工坊使用 C11 标准：右侧的 Clang 把 C 源代码编译为 WebAssembly，再在浏览器沙箱中执行。你写的仍然是真正的 C 程序。"],syntax:"源代码 → 编译 → 链接 → 执行",syntaxNotes:"编译检查语法和类型；链接找到 printf 等函数的实现；运行阶段才产生输出。",example:`#include <stdio.h>

int main(void) {
    printf("Hello, C!\\n");
    return 0;
}
`,exampleOutput:"Hello, C!",walkthrough:`按顺序执行上面的语句。编译检查语法和类型；链接找到 printf 等函数的实现；运行阶段才产生输出。
程序输出：Hello, C!`,mistakes:["把编译错误当成输出错误：编译失败时根本不会执行 main。","把 C 与 C++ 混用：本课程使用 printf，不使用 cout。"],summary:"编译检查语法和类型；链接找到 printf 等函数的实现；运行阶段才产生输出。"},{id:"c1-2",chapter:1,index:1,en:"Hello World!",title:"第一个 C 程序",objective:"使用 printf 输出文本，区分换行与普通字符。",explanation:["printf 是标准库提供的输出函数。你可以把它当作程序的扬声器：括号里的双引号字符串就是它要说的话。#include <stdio.h> 让编译器知道这个函数的声明。","转义序列 \\n 表示换行，而不是字母 n。C 语句通常以分号结束。运行时从 main 开始，执行 printf 后，return 0 表示正常退出。"],syntax:'printf("Hello, World!\\n");',syntaxNotes:"printf 是函数名；圆括号包住参数；双引号包住文本；\\n 换行；分号结束语句。",example:`#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}
`,exampleOutput:"Hello, World!",walkthrough:`按顺序执行上面的语句。printf 是函数名；圆括号包住参数；双引号包住文本；\\n 换行；分号结束语句。
程序输出：Hello, World!`,mistakes:["忘记分号会导致编译失败。","使用中文弯引号代替 ASCII 双引号，编译器无法识别字符串。"],summary:"printf 是函数名；圆括号包住参数；双引号包住文本；\\n 换行；分号结束语句。"},{id:"c1-3",chapter:1,index:2,en:"Comments",title:"注释",objective:"选择单行或多行注释，为代码说明意图。",explanation:["注释像书页旁的铅笔备注，帮助读代码的人理解意图。编译器会忽略注释，不会把它显示到屏幕上。","// 从当前位置一直注释到行末；/* 与 */ 之间可以跨多行。多行注释不能嵌套；字符串内部的 // 是普通字符，不会开始注释。"],syntax:`// 单行注释
/* 多行
   注释 */`,syntaxNotes:"// 适合短说明；/* ... */ 必须成对闭合。",example:`#include <stdio.h>

int main(void) {
    // 这行只给人看
    printf("Visible\\n"); /* 真正的输出 */
    return 0;
}
`,exampleOutput:"Visible",walkthrough:`按顺序执行上面的语句。// 适合短说明；/* ... */ 必须成对闭合。
程序输出：Visible`,mistakes:["以为注释会被输出。","在 /* ... */ 内再嵌套同类注释，可能提前结束外层注释。"],summary:"// 适合短说明；/* ... */ 必须成对闭合。"},{id:"c1-4",chapter:1,index:3,en:"Basic Program Structure",title:"C 程序的基本结构",objective:"辨认头文件、main 函数、代码块和返回值。",explanation:["一个基础程序可以分成三部分：顶部引入需要的声明，main 提供入口，花括号包住要执行的语句。缩进帮助阅读，真正决定代码块范围的是花括号。","int main(void) 表示 main 返回整数且不接收参数。return 0 把成功状态交回运行环境；它并不会向屏幕打印数字 0。"],syntax:`int main(void) {
    return 0;
}`,syntaxNotes:"int 是返回类型；main 是入口名；void 表示无参数；{ } 定义函数体。",example:`#include <stdio.h>

int main(void) {
    printf("Start\\n");
    return 0;
    return 0;
}
`,exampleOutput:"Start",walkthrough:`按顺序执行上面的语句。int 是返回类型；main 是入口名；void 表示无参数；{ } 定义函数体。
程序输出：Start`,mistakes:["把语句写在函数体外。",'把 return 0 当作 printf("0")，混淆退出状态和标准输出。'],summary:"int 是返回类型；main 是入口名；void 表示无参数；{ } 定义函数体。"}],s={id:1,en:i,title:e,description:o,lessons:a},u={"c1-1":{type:"single",question:"哪一步会把 C 源代码翻译为目标代码？",options:["编译","运行","输入","注释"],answer:["编译"],explanation:"编译器将源代码翻译为目标代码；执行程序才会读取输入并产生输出。"},"c1-2":{type:"fill",question:"填空：字符串中用于换行的转义序列是什么？",answer:["\\n"],explanation:"\\n 是一个换行符；/n 中的斜杠方向不对。"},"c1-3":{type:"boolean",question:'判断：printf("//"); 会把整行变成注释。',options:["正确","错误"],answer:["错误"],explanation:"双引号里的 // 属于字符串内容，因此程序会输出两个斜杠。"},"c1-4":{type:"multi",question:"多选：下面哪些说法正确？",options:["main 是入口函数","花括号界定代码块","return 0 会打印 0","缩进决定代码块范围"],answer:["main 是入口函数","花括号界定代码块"],explanation:"C 通过 main 启动程序，代码块由花括号确定。return 返回状态，缩进只是排版。"}},r={"c1-1":{title:"和 C 打个招呼",difficulty:"基础",description:"向屏幕输出 C is powerful!，末尾换行。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"C is powerful!"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 向屏幕输出 C is powerful!，末尾换行
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    printf("C is powerful!\\n");
    return 0;
}
`,hints:["理解源代码、编译器和程序之间的关系。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。",'在 main 中调用 printf("C is powerful!\\n");，字符串放在双引号里。']},"c1-2":{title:"两行问候",difficulty:"基础",description:"分两行输出 Hello 和 C Lab。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:`Hello
C Lab`}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 分两行输出 Hello 和 C Lab
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    printf("Hello\\nC Lab\\n");
    return 0;
}
`,hints:["使用 printf 输出文本，区分换行与普通字符。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","printf 是函数名；圆括号包住参数；双引号包住文本；\\n 换行；分号结束语句。"]},"c1-3":{title:"给代码留下说明",difficulty:"基础",description:"写一条注释解释输出，然后只输出 Keep learning。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"Keep learning"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 写一条注释解释输出，然后只输出 Keep learning
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    // 提醒自己坚持练习
    printf("Keep learning\\n");
    return 0;
}
`,hints:["选择单行或多行注释，为代码说明意图。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","// 适合短说明；/* ... */ 必须成对闭合。"]},"c1-4":{title:"搭好程序骨架",difficulty:"基础",description:"保留正确的 main 结构，先后输出 Start 和 Finish。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:`Start
Finish`}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 保留正确的 main 结构，先后输出 Start 和 Finish
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    printf("Start\\nFinish\\n");
    return 0;
}
`,hints:["辨认头文件、main 函数、代码块和返回值。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","int 是返回类型；main 是入口名；void 表示无参数；{ } 定义函数体。"]}},l=2,d="Variables",p="变量",c="用合适的数据类型，保存并表达信息。",f=[{id:"c2-1",chapter:2,index:0,en:"Data Types",title:"数据类型",objective:"根据数据的性质选择 int、double 或 char。",explanation:["变量就像贴了标签的盒子：名字说明用途，类型决定可以放入什么值，以及编译器怎样解释这些值。整数、带小数的测量值和单个字符应选不同的盒子。","C11 中 int 存整数，double 存浮点数，char 存字符。类型大小依赖实现，不能假设所有计算机上的 int 都一样大；本工坊的 wasm32 环境中 int 为 32 位。"],syntax:`int count = 3;
double price = 2.5;
char grade = 'A';`,syntaxNotes:"类型 + 变量名 + = 初始值。单字符用单引号；小数通常选 double。",example:`#include <stdio.h>

int main(void) {
    int count = 3;
    double price = 2.5;
    printf("%d %.1f\\n", count, price);
    return 0;
}
`,exampleOutput:"3 2.5",walkthrough:`按顺序执行上面的语句。类型 + 变量名 + = 初始值。单字符用单引号；小数通常选 double。
程序输出：3 2.5`,mistakes:["使用 int 存储 2.5，小数部分会丢弃。","以为 char 可以直接存储一个多字节汉字。"],summary:"类型 + 变量名 + = 初始值。单字符用单引号；小数通常选 double。"},{id:"c2-2",chapter:2,index:1,en:"Integer",title:"整数类型",objective:"声明和修改整数变量，理解整数除法。",explanation:["int 适合计数，例如人数、页数和库存。先声明并初始化，再通过赋值修改。右边的表达式先计算，结果再存进左边的变量。","两个整数相除仍得到整数，小数部分向零截断：7 / 2 是 3，-7 / 2 是 -3。有符号整数溢出属于未定义行为，不能依赖绕回结果。"],syntax:`int pages = 7;
pages = pages + 2;`,syntaxNotes:"第二条语句读取旧值 7，加 2 后写回 9；= 表示赋值。",example:`#include <stdio.h>

int main(void) {
    int pages = 7;
    pages = pages + 2;
    printf("%d %d\\n", pages, 7 / 2);
    return 0;
}
`,exampleOutput:"9 3",walkthrough:`按顺序执行上面的语句。第二条语句读取旧值 7，加 2 后写回 9；= 表示赋值。
程序输出：9 3`,mistakes:["未初始化就读取局部变量，结果没有可靠意义。","以为整数除法自动保留小数。"],summary:"第二条语句读取旧值 7，加 2 后写回 9；= 表示赋值。"},{id:"c2-3",chapter:2,index:2,en:"Float - Double",title:"浮点数与双精度",objective:"使用 double 处理小数，并控制输出精度。",explanation:["浮点数用有限的二进制位近似表示实数，像用有限刻度的尺子测量。double 通常比 float 保留更多有效数字；小数常量默认就是 double，float 常量可写成 1.5f。","很多十进制小数无法精确表示，所以不要依赖计算后的浮点数完全相等。printf 的 %.2f 表示显示小数点后两位，它只改变显示，不改变变量存储的值。"],syntax:`double total = 10.0 / 4;
printf("%.2f", total);`,syntaxNotes:"10.0 使除法在浮点数中进行；%.2f 控制显示两位小数。",example:`#include <stdio.h>

int main(void) {
    double average = (8.0 + 9.0) / 2;
    printf("%.2f\\n", average);
    return 0;
}
`,exampleOutput:"8.50",walkthrough:`按顺序执行上面的语句。10.0 使除法在浮点数中进行；%.2f 控制显示两位小数。
程序输出：8.50`,mistakes:["把 5 / 2 的整数结果赋给 double，得到的是 2.0，不是 2.5。","认为 %.2f 会永久修改变量精度。"],summary:"10.0 使除法在浮点数中进行；%.2f 控制显示两位小数。"},{id:"c2-4",chapter:2,index:3,en:"Characters",title:"字符类型",objective:"用 char 保存单个字符，并使用 %c 输出。",explanation:["字符也以数值编码存储。char 可以保存一个基本执行字符集中的字符；单引号表示字符常量，双引号表示字符串，两者不能随意替换。","本工坊使用 ASCII 兼容环境，因此字母 A 的编码为 65。不过在可移植 C 中不要假设所有字符编码都是 ASCII，也不要假设一个 char 能保存一个汉字。"],syntax:`char grade = 'A';
printf("%c", grade);`,syntaxNotes:"%c 按字符输出；%d 会按整数显示经过提升的编码。",example:`#include <stdio.h>

int main(void) {
    char grade = 'B';
    printf("%c\\n", grade);
    return 0;
}
`,exampleOutput:"B",walkthrough:`按顺序执行上面的语句。%c 按字符输出；%d 会按整数显示经过提升的编码。
程序输出：B`,mistakes:['写 char grade = "A"，把字符串地址误当成字符。',"忽略字符编码，直接将中文字符放进单个 char。"],summary:"%c 按字符输出；%d 会按整数显示经过提升的编码。"},{id:"c2-5",chapter:2,index:4,en:"Booleans",title:"布尔类型",objective:"在 C11 中引入 stdbool.h 并使用 bool。",explanation:["布尔值只表达真假，适合描述开关或条件。C11 的原生布尔类型叫 _Bool，标准头文件 stdbool.h 提供更易读的 bool、true、false 宏。","在条件中，0 表示假，任意非零值都表示真；赋给 bool 时会规范化为 0 或 1。输出时用 %d，经过整型提升后会显示 0 或 1。"],syntax:`#include <stdbool.h>
bool ready = true;`,syntaxNotes:"stdbool.h 提供 bool、true 和 false；布尔量用于表达条件。",example:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    bool ready = true;
    bool empty = false;
    printf("%d %d\\n", ready, empty);
    return 0;
}
`,exampleOutput:"1 0",walkthrough:`按顺序执行上面的语句。stdbool.h 提供 bool、true 和 false；布尔量用于表达条件。
程序输出：1 0`,mistakes:["在 C11 中遗漏 stdbool.h 却直接使用 bool。","以为只有整数 1 才代表真，实际任意非零都是真。"],summary:"stdbool.h 提供 bool、true 和 false；布尔量用于表达条件。"},{id:"c2-6",chapter:2,index:5,en:"Constants",title:"常量",objective:"用 const 声明不应修改的值。",explanation:["有些数值在程序运行期间应保持不变，例如税率和数组的设计容量。const 让变量的使用意图更清楚，并阻止通过这个名字直接修改它。","注意，C 中的 const int 不等同于 C++ 的编译期常量表达式。某些要求整型常量表达式的位置应使用枚举或宏；本节先使用 const 保存固定计算参数。"],syntax:"const double RATE = 0.08;",syntaxNotes:"const 限制通过该变量修改值；声明时就提供初值，名字大写只是约定。",example:`#include <stdio.h>

int main(void) {
    const int DAYS = 7;
    printf("%d\\n", DAYS * 2);
    return 0;
}
`,exampleOutput:"14",walkthrough:`按顺序执行上面的语句。const 限制通过该变量修改值；声明时就提供初值，名字大写只是约定。
程序输出：14`,mistakes:["声明后再次给 const 对象赋值。","以为 const 可以防止所有间接修改行为；强行绕过类型修改原 const 对象是未定义行为。"],summary:"const 限制通过该变量修改值；声明时就提供初值，名字大写只是约定。"},{id:"c2-7",chapter:2,index:6,en:"printf Basics",title:"printf 输出基础",objective:"让格式控制符与参数类型和顺序一致。",explanation:["格式字符串像带空位的句子，%d、%f、%c 等标记说明每个空位如何填。后面的参数按顺序进入这些位置。","printf 是可变参数函数，编译器并不总能在运行前拦住所有错误。控制符和类型不匹配可能导致未定义行为。想输出百分号本身，要写 %% 而不是单独一个 %。"],syntax:'printf("%d %.1f %c %%", n, x, ch);',syntaxNotes:"%d 对应 int，%f 对应提升后的 double，%c 对应字符的整型提升，%% 不消费参数。",example:`#include <stdio.h>

int main(void) {
    int n = 3;
    printf("Count: %d, rate: %.1f%%\\n", n, 12.5);
    return 0;
}
`,exampleOutput:"Count: 3, rate: 12.5%",walkthrough:`按顺序执行上面的语句。%d 对应 int，%f 对应提升后的 double，%c 对应字符的整型提升，%% 不消费参数。
程序输出：Count: 3, rate: 12.5%`,mistakes:["控制符数量比参数多，导致读取不存在的参数。","用 %d 输出 double，属于类型不匹配。"],summary:"%d 对应 int，%f 对应提升后的 double，%c 对应字符的整型提升，%% 不消费参数。"},{id:"c2-8",chapter:2,index:7,en:"Variable Naming Rules",title:"变量命名规则",objective:"辨认合法标识符并使用清晰的变量名。",explanation:["变量名是给值起的可读标签。基础规则是使用字母、数字和下划线，不能以数字开头，也不能使用 int、return 等关键字。C 区分大小写，score 与 Score 是不同名字。","尽量选择 total_score、item_count 这类能表达含义的名字。初学时避免以下划线开头的名字，因为许多这种名字保留给标准库或实现使用。"],syntax:"int item_count = 5;",syntaxNotes:"item_count 是完整标识符，中间不能有空格或连字符；连字符会被视为减号。",example:`#include <stdio.h>

int main(void) {
    int item_count = 5;
    int Item_count = 2;
    printf("%d\\n", item_count + Item_count);
    return 0;
}
`,exampleOutput:"7",walkthrough:`按顺序执行上面的语句。item_count 是完整标识符，中间不能有空格或连字符；连字符会被视为减号。
程序输出：7`,mistakes:["以数字开头，如 2count。","使用连字符，如 item-count，它会被解析为两个名字相减。"],summary:"item_count 是完整标识符，中间不能有空格或连字符；连字符会被视为减号。"},{id:"c2-9",chapter:2,index:8,en:"Type Casting Part 1",title:"类型转换（一）",objective:"在运算前显式转换类型，保留小数。",explanation:["转换就像在计算前更换量尺。将整数转换为 double 后参与除法，可以保留小数部分。如果先做整数除法再转换，丢掉的小数不会回来。","写法是 (目标类型)表达式。显式转换并不是纠正所有数据问题的万能工具；它只告诉编译器采用另一种类型解释或转换这个值。"],syntax:"double average = (double)total / count;",syntaxNotes:"先把 total 转为 double；count 也会参与浮点运算；最终结果存入 average。",example:`#include <stdio.h>

int main(void) {
    int total = 7, count = 2;
    printf("%.1f\\n", (double)total / count);
    return 0;
}
`,exampleOutput:"3.5",walkthrough:`按顺序执行上面的语句。先把 total 转为 double；count 也会参与浮点运算；最终结果存入 average。
程序输出：3.5`,mistakes:["写 (double)(total / count)，转换发生得太晚。","把类型转换误认为会修改原变量本身的类型。"],summary:"先把 total 转为 double；count 也会参与浮点运算；最终结果存入 average。"},{id:"c2-10",chapter:2,index:9,en:"Type Casting Part 2",title:"类型转换（二）",objective:"识别浮点转整数的截断和范围风险。",explanation:["把 double 转成 int 会丢弃小数部分，朝零截断，而不是四舍五入。比如 3.9 变成 3，-3.9 变成 -3。","转换前要确保结果可以被目标类型表示。浮点数超过整数范围再转换会产生未定义行为；不能用强制转换来掩盖溢出。混合有符号和无符号整数的比较也需要格外小心。"],syntax:"int whole = (int)3.9;",syntaxNotes:"(int) 只在值处于可表示范围时有定义；它不会进行四舍五入。",example:`#include <stdio.h>

int main(void) {
    double a = 3.9, b = -3.9;
    printf("%d %d\\n", (int)a, (int)b);
    return 0;
}
`,exampleOutput:"3 -3",walkthrough:`按顺序执行上面的语句。(int) 只在值处于可表示范围时有定义；它不会进行四舍五入。
程序输出：3 -3`,mistakes:["以为 (int)3.9 得到 4。","忽略目标类型范围，错误地认为任何转换都是安全的。"],summary:"(int) 只在值处于可表示范围时有定义；它不会进行四舍五入。"},{id:"c2-11",chapter:2,index:10,en:"Recap Challenge",title:"变量综合练习",objective:"组合变量、常量与格式化输出完成计算。",explanation:["综合练习的第一步不是写代码，而是给每个量选择类型。件数用 int，单价用 double；总额在计算完成后用固定小数位显示。","先写清计算公式，再用变量表达它。让公式中的含义一目了然，可以减少把单价与数量写反的错误，也方便稍后接入输入数据。"],syntax:"double total = price * count;",syntaxNotes:"整数 count 在与 double 相乘时转换为浮点数；总额用 %.2f 显示。",example:`#include <stdio.h>

int main(void) {
    const double price = 8.5;
    int count = 4;
    printf("%.2f\\n", price * count);
    return 0;
}
`,exampleOutput:"34.00",walkthrough:`按顺序执行上面的语句。整数 count 在与 double 相乘时转换为浮点数；总额用 %.2f 显示。
程序输出：34.00`,mistakes:["用 int 保存总价导致小数丢失。","打印货币时遗漏两位小数的显示要求。"],summary:"整数 count 在与 double 相乘时转换为浮点数；总额用 %.2f 显示。"}],m={id:l,en:d,title:p,description:c,lessons:f},h={"c2-1":{type:"single",question:"保存 36.5 摄氏度，最合适的类型是？",options:["double","int","char"],answer:["double"],explanation:"double 可以表示小数。int 转换后只留下整数部分；char 不是测量值的合适类型。"},"c2-2":{type:"predict",question:'预测：printf("%d", 9 / 4); 输出什么？',answer:["2"],explanation:"两个操作数都是 int，9 / 4 的小数部分被截断，结果为 2。"},"c2-3":{type:"single",question:"下面哪个表达式得到 2.5？",options:["5.0 / 2","5 / 2","(double)(5 / 2)"],answer:["5.0 / 2"],explanation:"至少一个操作数在除法前是浮点数，才能进行浮点除法。除完再转换已经来不及恢复小数。"},"c2-4":{type:"debug",question:'分析错误：char ch = "B"; 应如何修改？',options:["改成 char ch = 'B';",'改成 int ch = "B";',"无需修改"],answer:["改成 char ch = 'B';"],explanation:'单个字符使用单引号。"B" 是包含 B 和结束零的字符数组，不能用来初始化一个 char。'},"c2-5":{type:"multi",question:"多选：在 C 条件中，哪些值为真？",options:["-3","0","2"],answer:["-3","2"],explanation:"C 的条件判断将 0 当作假；负数和大于 1 的非零值也是真。"},"c2-6":{type:"boolean",question:"判断：const int x = 3; x = 4; 能正常通过标准 C11 编译。",options:["正确","错误"],answer:["错误"],explanation:"x 是只读对象，直接对它赋值违反类型约束，编译器会诊断。"},"c2-7":{type:"fill",question:"填空：printf 中输出一个百分号应写什么？",answer:["%%"],explanation:"%% 表示字面百分号，它不会从参数列表中取值。"},"c2-8":{type:"multi",question:"多选：哪些是合法且非保留的变量名？",options:["total_score","score2","2score","return"],answer:["total_score","score2"],explanation:"标识符可包含数字但不能以数字开头，return 是 C 关键字。"},"c2-9":{type:"predict",question:"预测：(double)(7 / 2) 的值是多少？",answer:["3"],explanation:"7 / 2 先按整数除法得到 3，再变为 3.0；强制转换位置决定运算类型。"},"c2-10":{type:"predict",question:"预测：(int)-2.8 的值是多少？",answer:["-2"],explanation:"浮点到整数转换向零截断，所以 -2.8 得到 -2，不是向下取整的 -3。"},"c2-11":{type:"predict",question:'单价 2.5，数量 3，printf("%.2f", price * count) 输出？',answer:["7.50"],explanation:"乘法得到 7.5，%.2f 用两位小数显示，因此输出 7.50。"}},x={"c2-1":{title:"选对数据盒子",difficulty:"基础",description:"声明整数 books 为 4、小数 price 为 12.5，输出 4 12.5。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"4 12.5"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 声明整数 books 为 4、小数 price 为 12.5，输出 4 12.5
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int books = 4;
    double price = 12.5;
    printf("%d %.1f\\n", books, price);
    return 0;
}
`,hints:["根据数据的性质选择 int、double 或 char。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","类型 + 变量名 + = 初始值。单字符用单引号；小数通常选 double。"]},"c2-2":{title:"库存计数",difficulty:"基础",description:"盒中原有 24 支笔，送出 7 支后输出剩余支数。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"17"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 盒中原有 24 支笔，送出 7 支后输出剩余支数
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int pens = 24;
    pens = pens - 7;
    printf("%d\\n", pens);
    return 0;
}
`,hints:["声明和修改整数变量，理解整数除法。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","第二条语句读取旧值 7，加 2 后写回 9；= 表示赋值。"]},"c2-3":{title:"计算购物总价",difficulty:"基础",description:"计算 19.5 元商品购买 3 件的总价，保留两位小数输出。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"58.50"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 计算 19.5 元商品购买 3 件的总价，保留两位小数输出
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    double price = 19.5;
    printf("%.2f\\n", price * 3);
    return 0;
}
`,hints:["使用 double 处理小数，并控制输出精度。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","10.0 使除法在浮点数中进行；%.2f 控制显示两位小数。"]},"c2-4":{title:"输出字符徽记",difficulty:"基础",description:"声明字符等级 A 和字符标记 !，输出 A!。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"A!"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 声明字符等级 A 和字符标记 !，输出 A!
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    char grade = 'A';
    char mark = '!';
    printf("%c%c\\n", grade, mark);
    return 0;
}
`,hints:["用 char 保存单个字符，并使用 %c 输出。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","%c 按字符输出；%d 会按整数显示经过提升的编码。"]},"c2-5":{title:"描述程序状态",difficulty:"基础",description:"声明布尔量 enabled 为 true，finished 为 false，输出 1 0。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"1 0"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 声明布尔量 enabled 为 true，finished 为 false，输出 1 0
    
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    bool enabled = true;
    bool finished = false;
    printf("%d %d\\n", enabled, finished);
    return 0;
}
`,hints:["在 C11 中引入 stdbool.h 并使用 bool。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","stdbool.h 提供 bool、true 和 false；布尔量用于表达条件。"]},"c2-6":{title:"固定的包装数量",difficulty:"基础",description:"用 const int 保存每包 6 支笔，计算 5 包的数量并输出。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"30"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 用 const int 保存每包 6 支笔，计算 5 包的数量并输出
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    const int PACK = 6;
    printf("%d\\n", PACK * 5);
    return 0;
}
`,hints:["用 const 声明不应修改的值。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","const 限制通过该变量修改值；声明时就提供初值，名字大写只是约定。"]},"c2-7":{title:"格式化个人信息",difficulty:"基础",description:"用变量输出 Age: 21, score: 95.5，分数保留一位小数。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"Age: 21, score: 95.5"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 用变量输出 Age: 21, score: 95.5，分数保留一位小数
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int age = 21;
    double score = 95.5;
    printf("Age: %d, score: %.1f\\n", age, score);
    return 0;
}
`,hints:["让格式控制符与参数类型和顺序一致。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","%d 对应 int，%f 对应提升后的 double，%c 对应字符的整型提升，%% 不消费参数。"]},"c2-8":{title:"清晰的命名",difficulty:"基础",description:"声明 total_score 为 88，bonus 为 7，输出它们的和。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"95"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 声明 total_score 为 88，bonus 为 7，输出它们的和
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int total_score = 88;
    int bonus = 7;
    printf("%d\\n", total_score + bonus);
    return 0;
}
`,hints:["辨认合法标识符并使用清晰的变量名。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","item_count 是完整标识符，中间不能有空格或连字符；连字符会被视为减号。"]},"c2-9":{title:"保留平均数的小数",difficulty:"基础",description:"有 17 个苹果分给 4 人，计算平均每人数量，保留两位小数。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"4.25"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 有 17 个苹果分给 4 人，计算平均每人数量，保留两位小数
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int apples = 17, people = 4;
    printf("%.2f\\n", (double)apples / people);
    return 0;
}
`,hints:["在运算前显式转换类型，保留小数。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","先把 total 转为 double；count 也会参与浮点运算；最终结果存入 average。"]},"c2-10":{title:"观察向零截断",difficulty:"基础",description:"把 12.8 和 -4.6 分别转换为整数，按顺序输出。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"12 -4"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 把 12.8 和 -4.6 分别转换为整数，按顺序输出
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    double x = 12.8, y = -4.6;
    printf("%d %d\\n", (int)x, (int)y);
    return 0;
}
`,hints:["识别浮点转整数的截断和范围风险。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","(int) 只在值处于可表示范围时有定义；它不会进行四舍五入。"]},"c2-11":{title:"完成一次购票计算",difficulty:"基础",description:"一张票价 18.5 元，买 4 张，再减去 5 元优惠，输出总价，保留两位小数。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"69.00"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 一张票价 18.5 元，买 4 张，再减去 5 元优惠，输出总价，保留两位小数
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    const double price = 18.5;
    int count = 4;
    double total = price * count - 5;
    printf("%.2f\\n", total);
    return 0;
}
`,hints:["组合变量、常量与格式化输出完成计算。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","整数 count 在与 double 相乘时转换为浮点数；总额用 %.2f 显示。"]}},b=3,y="Operators",v="运算符",g="把数据组合成表达式，理解运算与逻辑。",w=[{id:"c3-1",chapter:3,index:0,en:"Arithmetic Operators",title:"算术运算符",objective:"使用加减乘除，并根据优先级组织表达式。",explanation:["算术表达式像数学算式：* 和 / 先于 + 和 - 计算，括号可以明确改变顺序。整数除法会截断小数，除数为零则不允许。","即使记住了优先级，也应为复杂表达式加上有意义的括号。不要依赖同一表达式中带副作用的计算顺序；C 不保证所有操作数从左向右求值。"],syntax:"int result = (2 + 3) * 4;",syntaxNotes:"括号先算 2 + 3，再与 4 相乘；没有括号时先算 3 * 4。",example:`#include <stdio.h>

int main(void) {
    printf("%d %d\\n", 2 + 3 * 4, (2 + 3) * 4);
    return 0;
}
`,exampleOutput:"14 20",walkthrough:`按顺序执行上面的语句。括号先算 2 + 3，再与 4 相乘；没有括号时先算 3 * 4。
程序输出：14 20`,mistakes:["将整数除法当成浮点除法。","用 0 作除数，程序行为未定义。"],summary:"括号先算 2 + 3，再与 4 相乘；没有括号时先算 3 * 4。"},{id:"c3-2",chapter:3,index:1,en:"Modulo Operator",title:"取模运算符",objective:"用整数余数判断整除、奇偶和循环位置。",explanation:["% 求整数除法后的余数。把 17 颗糖每 5 颗分一组，可以分 3 组，还剩 2 颗，所以 17 % 5 是 2。","在 C11 中，除法商向零截断，余数与被除数同号或为零。因此 -7 % 3 是 -1。% 仅接受整数操作数，且除数不能为零。"],syntax:"int remainder = 17 % 5;",syntaxNotes:"满足 a == (a / b) * b + a % b（商可表示且 b 非零时）。",example:`#include <stdio.h>

int main(void) {
    printf("%d %d\\n", 17 % 5, -7 % 3);
    return 0;
}
`,exampleOutput:"2 -1",walkthrough:`按顺序执行上面的语句。满足 a == (a / b) * b + a % b（商可表示且 b 非零时）。
程序输出：2 -1`,mistakes:["用 % 处理 double。","判断负奇数时只用 n % 2 == 1，负奇数的余数可能是 -1。"],summary:"满足 a == (a / b) * b + a % b（商可表示且 b 非零时）。"},{id:"c3-3",chapter:3,index:2,en:"Increment/Decrement",title:"自增与自减",objective:"区分前置和后置自增的表达式值。",explanation:["++ 和 -- 分别把变量加一或减一。独立写成 i++; 和 ++i; 时，最终效果一样。放到赋值中时，前置先更新再取值，后置先取旧值再更新。",'一条语句只修改一个变量一次，代码会更容易理解。像 printf("%d %d", i++, i++); 这类未定序的修改有未定义行为，不能拿某次运行结果当规则。'],syntax:`int old = n++;
int now = ++n;`,syntaxNotes:"后置表达式提供旧值；前置表达式提供更新后的值。",example:`#include <stdio.h>

int main(void) {
    int n = 5;
    int old = n++;
    int now = ++n;
    printf("%d %d %d\\n", old, now, n);
    return 0;
}
`,exampleOutput:"5 7 7",walkthrough:`按顺序执行上面的语句。后置表达式提供旧值；前置表达式提供更新后的值。
程序输出：5 7 7`,mistakes:["在一条表达式中无定序地多次修改同一变量。","误把后置自增理解成整个函数结束后才增加。"],summary:"后置表达式提供旧值；前置表达式提供更新后的值。"},{id:"c3-4",chapter:3,index:3,en:"Assignment Operators",title:"赋值运算符",objective:"用复合赋值更新累计值。",explanation:["赋值把右边结果存入左边。total += price 可以读作“把 price 累加到 total”。-=、*=、/=、%= 也有类似含义。","复合赋值对左操作数只求值一次，不应机械地将复杂表达式展开。本节仅对普通变量使用它；当变量是 int 时，/= 仍然是整数除法。"],syntax:`total += 5;
total *= 2;`,syntaxNotes:"先读取 total 的旧值，完成计算，再转换回左侧变量的类型并存储。",example:`#include <stdio.h>

int main(void) {
    int total = 10;
    total += 5;
    total *= 2;
    printf("%d\\n", total);
    return 0;
}
`,exampleOutput:"30",walkthrough:`按顺序执行上面的语句。先读取 total 的旧值，完成计算，再转换回左侧变量的类型并存储。
程序输出：30`,mistakes:["把 = 当作等于比较。","先乘后加与先加后乘不同，语句执行顺序会影响结果。"],summary:"先读取 total 的旧值，完成计算，再转换回左侧变量的类型并存储。"},{id:"c3-5",chapter:3,index:4,en:"Relational Operators",title:"关系运算符",objective:"通过关系比较生成 0 或 1。",explanation:["关系运算符用于回答大小或相等问题，结果类型为 int，值为 0 或 1。== 判断相等，!= 判断不等，和给变量赋值的 = 不同。","数学中的 0 < x < 10 不能原样用于 C：它会先得到 0 或 1，再与 10 比较。检查区间需要把两个比较用逻辑与连接。"],syntax:"int passed = score >= 60;",syntaxNotes:">= 包含等于边界；== 比较两个值；比较表达式返回 0 或 1。",example:`#include <stdio.h>

int main(void) {
    int score = 60;
    printf("%d %d\\n", score >= 60, score == 100);
    return 0;
}
`,exampleOutput:"1 0",walkthrough:`按顺序执行上面的语句。>= 包含等于边界；== 比较两个值；比较表达式返回 0 或 1。
程序输出：1 0`,mistakes:["用 = 代替 ==，意外修改变量。","直接写数学式的连续比较，如 1 < x < 5。"],summary:">= 包含等于边界；== 比较两个值；比较表达式返回 0 或 1。"},{id:"c3-6",chapter:3,index:5,en:"Logical Operators Part 1",title:"逻辑运算符（一）",objective:"用 && 表达必须同时满足的条件。",explanation:["逻辑与 && 类似进门时既要持有门票，又要处于开放时间：两项都成立才为真。只要一项为假，整个结果就是假。","&& 有短路特性：左侧为假时，不再计算右侧。这可以保护除法或数组访问，但必须把安全检查放在左边。它和按位与 & 不是同一种运算。"],syntax:"x >= 0 && x <= 100",syntaxNotes:"两个比较各自形成真假值；&& 合并为 0 或 1。",example:`#include <stdio.h>

int main(void) {
    int score = 85;
    printf("%d\\n", score >= 0 && score <= 100);
    return 0;
}
`,exampleOutput:"1",walkthrough:`按顺序执行上面的语句。两个比较各自形成真假值；&& 合并为 0 或 1。
程序输出：1`,mistakes:["用 & 代替 &&，失去逻辑短路含义。","把危险运算放在范围或零值检查之前。"],summary:"两个比较各自形成真假值；&& 合并为 0 或 1。"},{id:"c3-7",chapter:3,index:6,en:"Logical Operators Part 2",title:"逻辑运算符（二）",objective:"用 || 表达满足任一条件即可。",explanation:["逻辑或 || 类似两张不同种类的通行证：持有任意一种即可通过。只有两项都为假时才为假，结果仍然是 0 或 1。","|| 也会短路：左侧已经为真时，右侧不再执行。&& 的优先级高于 ||，但把条件分组写清楚比依赖记忆更稳妥。"],syntax:"day == 6 || day == 7",syntaxNotes:"每个比较都写完整，不能写 day == 6 || 7，因为字面值 7 永远为真。",example:`#include <stdio.h>

int main(void) {
    int day = 7;
    printf("%d\\n", day == 6 || day == 7);
    return 0;
}
`,exampleOutput:"1",walkthrough:`按顺序执行上面的语句。每个比较都写完整，不能写 day == 6 || 7，因为字面值 7 永远为真。
程序输出：1`,mistakes:["写 x == 1 || 2，第二项是恒真的整数 2。","把 || 和按位或 | 混淆。"],summary:"每个比较都写完整，不能写 day == 6 || 7，因为字面值 7 永远为真。"},{id:"c3-8",chapter:3,index:7,en:"Logical Operators Part 3",title:"逻辑运算符（三）",objective:"用 ! 取反，组合安全且易读的条件。",explanation:["逻辑非 ! 把真变假、假变真。!0 是 1，!任何非零数是 0；双重取反 !!x 可以把任意整数规范化为 0 或 1。","对复合条件取反时，德摩根律能帮助化简：!(A && B) 等价于 !A || !B。先用括号明确条件边界，再考虑是否需要化简。"],syntax:"!(score >= 0 && score <= 100)",syntaxNotes:"! 作用于紧随其后的完整操作数；括号决定取反范围。",example:`#include <stdio.h>

int main(void) {
    int score = 120;
    printf("%d %d\\n", !(score >= 0 && score <= 100), !!score);
    return 0;
}
`,exampleOutput:"1 1",walkthrough:`按顺序执行上面的语句。! 作用于紧随其后的完整操作数；括号决定取反范围。
程序输出：1 1`,mistakes:["写 !x == y，却想表达 !(x == y)。","用 ~ 代替 !，前者是按位取反。"],summary:"! 作用于紧随其后的完整操作数；括号决定取反范围。"},{id:"c3-9",chapter:3,index:8,en:"Recap Challenge",title:"运算符综合练习",objective:"结合取余、关系和逻辑运算表达业务规则。",explanation:["复杂规则先拆成多个布尔问题，再把它们组合。比如判断一个数是否是非负偶数，需要分别检查是否非负、是否能被 2 整除，最后取逻辑与。","写出中间变量可以帮助调试。不要为了缩短代码把所有条件挤成一个难以读懂的表达式；尤其要覆盖 0、负数和边界值。"],syntax:"bool valid = n >= 0 && n % 2 == 0;",syntaxNotes:"% 优先于 ==，比较优先于 &&；添加括号可以进一步强调语义。",example:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int n = 8;
    bool valid = n >= 0 && n % 2 == 0;
    printf("%d\\n", valid);
    return 0;
}
`,exampleOutput:"1",walkthrough:`按顺序执行上面的语句。% 优先于 ==，比较优先于 &&；添加括号可以进一步强调语义。
程序输出：1`,mistakes:["忽略 0 也是偶数。","用 n % 2 == 1 判断所有奇数，漏掉负奇数。"],summary:"% 优先于 ==，比较优先于 &&；添加括号可以进一步强调语义。"}],O={id:b,en:y,title:v,description:g,lessons:w},k={"c3-1":{type:"predict",question:"预测：20 - 12 / 3 的值是多少？",answer:["16"],explanation:"先算 12 / 3 得到 4，再算 20 - 4 得到 16。"},"c3-2":{type:"single",question:'预测：printf("%d", 5 % 2); 的输出是什么？',options:["0","1","2","2.5"],answer:["1"],explanation:"5 = 2 × 2 + 1，因此余数为 1。余数不是除法得到的小数部分。"},"c3-3":{type:"single",question:"int n=3; int x=n++; 执行后 x 和 n 是？",options:["3 和 4","4 和 4","3 和 3"],answer:["3 和 4"],explanation:"n++ 的表达式值是旧值 3，该完整表达式结束前 n 已更新为 4。"},"c3-4":{type:"predict",question:"预测：int x=9; x/=2; 最终 x 为多少？",answer:["4"],explanation:"x 是 int，复合除法保留整数结果，9 / 2 得到 4。"},"c3-5":{type:"debug",question:"分析：判断 x 是否等于 5 应使用哪一项？",options:["x == 5","x = 5","x := 5"],answer:["x == 5"],explanation:"== 是相等运算；= 是赋值，可能改变 x，并把赋值结果作为条件。"},"c3-6":{type:"boolean",question:"判断：0 && (10 / 0) 会对右侧进行求值。",options:["正确","错误"],answer:["错误"],explanation:"&& 在左侧为 0 时短路，因此右侧不执行；这是有定义的短路行为。"},"c3-7":{type:"single",question:"哪种写法正确判断 x 等于 1 或 2？",options:["x == 1 || x == 2","x == 1 || 2","x == (1 || 2)"],answer:["x == 1 || x == 2"],explanation:"每个条件都必须完整比较；单独的 2 在逻辑表达式中始终为真。"},"c3-8":{type:"multi",question:"多选：哪些表达式与 !(a && b) 等价？",options:["!a || !b","!(b && a)","!a && !b"],answer:["!a || !b","!(b && a)"],explanation:"逻辑与可交换，而德摩根律把“并且”的否定变成两个否定的“或者”。"},"c3-9":{type:"boolean",question:"判断：0 是非负偶数。",options:["正确","错误"],answer:["正确"],explanation:"0 >= 0 为真，0 % 2 为 0，所以两个条件同时成立。"}},C={"c3-1":{title:"控制计算顺序",difficulty:"基础",description:"计算 (12 + 8) * 3 - 10 / 2，输出整数结果。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"55"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 计算 (12 + 8) * 3 - 10 / 2，输出整数结果
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int result = (12 + 8) * 3 - 10 / 2;
    printf("%d\\n", result);
    return 0;
}
`,hints:["使用加减乘除，并根据优先级组织表达式。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","括号先算 2 + 3，再与 4 相乘；没有括号时先算 3 * 4。"]},"c3-2":{title:"用余数拆分时间",difficulty:"基础",description:"把 53 分钟拆成小时数和剩余分钟数，用两个整数输出。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"0 53"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 把 53 分钟拆成小时数和剩余分钟数，用两个整数输出
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int minutes = 53;
    printf("%d %d\\n", minutes / 60, minutes % 60);
    return 0;
}
`,hints:["用整数余数判断整除、奇偶和循环位置。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","满足 a == (a / b) * b + a % b（商可表示且 b 非零时）。"]},"c3-3":{title:"旧值与新值",difficulty:"基础",description:"令 n 为 8，分别用后置与前置自增存入 a、b，输出 a b n。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"8 10 10"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 令 n 为 8，分别用后置与前置自增存入 a、b，输出 a b n
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n = 8;
    int a = n++;
    int b = ++n;
    printf("%d %d %d\\n", a, b, n);
    return 0;
}
`,hints:["区分前置和后置自增的表达式值。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","后置表达式提供旧值；前置表达式提供更新后的值。"]},"c3-4":{title:"更新余额",difficulty:"基础",description:"余额为 100，先支出 30，再收入 15，使用复合赋值并输出余额。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"85"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 余额为 100，先支出 30，再收入 15，使用复合赋值并输出余额
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int balance = 100;
    balance -= 30;
    balance += 15;
    printf("%d\\n", balance);
    return 0;
}
`,hints:["用复合赋值更新累计值。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","先读取 total 的旧值，完成计算，再转换回左侧变量的类型并存储。"]},"c3-5":{title:"比较两个数",difficulty:"基础",description:"声明 a=8、b=12，依次输出 a<b、a==b、a!=b 的结果。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"1 0 1"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 声明 a=8、b=12，依次输出 a<b、a==b、a!=b 的结果
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int a = 8, b = 12;
    printf("%d %d %d\\n", a < b, a == b, a != b);
    return 0;
}
`,hints:["通过关系比较生成 0 或 1。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。",">= 包含等于边界；== 比较两个值；比较表达式返回 0 或 1。"]},"c3-6":{title:"检查年龄区间",difficulty:"基础",description:"判断 age=20 是否处于 18 到 30 的闭区间，输出 0 或 1。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"1"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 判断 age=20 是否处于 18 到 30 的闭区间，输出 0 或 1
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int age = 20;
    printf("%d\\n", age >= 18 && age <= 30);
    return 0;
}
`,hints:["用 && 表达必须同时满足的条件。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","两个比较各自形成真假值；&& 合并为 0 或 1。"]},"c3-7":{title:"异常温度提醒",difficulty:"基础",description:"判断温度 temp=-5 是否低于 0 或高于 35，输出 0 或 1。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"1"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 判断温度 temp=-5 是否低于 0 或高于 35，输出 0 或 1
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int temp = -5;
    printf("%d\\n", temp < 0 || temp > 35);
    return 0;
}
`,hints:["用 || 表达满足任一条件即可。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","每个比较都写完整，不能写 day == 6 || 7，因为字面值 7 永远为真。"]},"c3-8":{title:"组合访问条件",difficulty:"基础",description:"声明 logged_in=false、guest=true，判断是否可以访问（登录或访客），再输出 !logged_in。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"1 1"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 声明 logged_in=false、guest=true，判断是否可以访问（登录或访客），再输出 !logged_in
    
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    bool logged_in = false, guest = true;
    printf("%d %d\\n", logged_in || guest, !logged_in);
    return 0;
}
`,hints:["用 ! 取反，组合安全且易读的条件。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","! 作用于紧随其后的完整操作数；括号决定取反范围。"]},"c3-9":{title:"组合数字规则",difficulty:"基础",description:"令 n=27，判断是否为大于 10 且能被 3 整除的数，输出判断结果和 n%10。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"1 7"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 令 n=27，判断是否为大于 10 且能被 3 整除的数，输出判断结果和 n%10
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n = 27;
    printf("%d %d\\n", n > 10 && n % 3 == 0, n % 10);
    return 0;
}
`,hints:["结合取余、关系和逻辑运算表达业务规则。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","% 优先于 ==，比较优先于 &&；添加括号可以进一步强调语义。"]}},q=4,j="Control Flow",D="流程控制",T="让程序根据不同条件，选择不同的路径。",N=[{id:"c4-1",chapter:4,index:0,en:"If Statement",title:"if 语句",objective:"在条件成立时执行一个代码块。",explanation:["顺序执行的程序总是走同一条路；if 像路口的开关，条件非零时才进入花括号中的代码。条件为零就跳过代码块，继续执行后续语句。","即使只有一条语句，也建议保留花括号。if 后误加分号会形成空语句，使后面的代码块变成无条件执行。"],syntax:`if (score >= 60) {
    printf("Pass");
}`,syntaxNotes:"括号中是条件；花括号中是满足条件时执行的语句。",example:`#include <stdio.h>

int main(void) {
    int score = 75;
    if (score >= 60) {
        printf("Pass\\n");
    }
    return 0;
}
`,exampleOutput:"Pass",walkthrough:`按顺序执行上面的语句。括号中是条件；花括号中是满足条件时执行的语句。
程序输出：Pass`,mistakes:["在 if (...) 后误加分号。","条件中用 = 赋值，未表达真正的比较。"],summary:"括号中是条件；花括号中是满足条件时执行的语句。"},{id:"c4-2",chapter:4,index:1,en:"If - Else",title:"if-else 语句",objective:"让两条互斥路径恰好执行一条。",explanation:["if-else 像只有两种出口的分流门。条件为真执行 if 块，否则执行 else 块；两边不会同时执行，也不会都跳过。","把两种情况分开能避免遗漏。写第二个独立 if 与写 else 并不完全等价，尤其当前一个分支会修改后面条件所依赖的数据时。"],syntax:`if (n % 2 == 0) {
    puts("even");
} else {
    puts("odd");
}`,syntaxNotes:"else 不带条件，它表示前面 if 条件不成立的所有情况。",example:`#include <stdio.h>

int main(void) {
    int n = 7;
    if (n % 2 == 0) { puts("even"); }
    else { puts("odd"); }
    return 0;
}
`,exampleOutput:"odd",walkthrough:`按顺序执行上面的语句。else 不带条件，它表示前面 if 条件不成立的所有情况。
程序输出：odd`,mistakes:["只判断正奇数，忽略负数。","在 if 块和 else 之间插入无关语句，破坏语法配对。"],summary:"else 不带条件，它表示前面 if 条件不成立的所有情况。"},{id:"c4-3",chapter:4,index:2,en:"Else-If",title:"多重条件判断",objective:"按顺序检查条件，覆盖边界与剩余情况。",explanation:["else-if 链像依次检查的分诊台，从第一个条件开始，遇到第一项成立就执行对应分支，然后跳过剩下的分支。最后的 else 接住所有未命中的情况。","区间条件通常从大到小或从小到大排列。如果先写 score >= 60，就会把 90 分也提前归入及格分支，后面的优秀判断再也到不了。"],syntax:`if (s >= 90) { /* A */ }
else if (s >= 60) { /* B */ }
else { /* C */ }`,syntaxNotes:"后续条件只在前面的条件都不成立时判断，因此 >=60 分支实际覆盖 60～89。",example:`#include <stdio.h>

int main(void) {
    int s = 82;
    if (s >= 90) { puts("A"); }
    else if (s >= 60) { puts("B"); }
    else { puts("C"); }
    return 0;
}
`,exampleOutput:"B",walkthrough:`按顺序执行上面的语句。后续条件只在前面的条件都不成立时判断，因此 >=60 分支实际覆盖 60～89。
程序输出：B`,mistakes:["将较宽的条件放在前面，遮蔽后续条件。","对 60 和 90 的等号边界处理不一致。"],summary:"后续条件只在前面的条件都不成立时判断，因此 >=60 分支实际覆盖 60～89。"},{id:"c4-4",chapter:4,index:3,en:"Switch Case",title:"switch-case 语句",objective:"用 switch 分派离散整数或字符状态。",explanation:["switch 适合根据一个整数值从多个确定选项中选择，例如菜单编号。case 后必须是整型常量表达式，不能直接写运行时区间或字符串。","匹配到 case 后会继续顺序执行，直到 break 或 switch 结束。这叫贯穿；如果不是有意共享处理逻辑，通常应在每个分支结尾写 break。"],syntax:`switch (choice) {
case 1: puts("Tea"); break;
default: puts("Other"); break;
}`,syntaxNotes:"switch 只计算一次控制表达式；default 处理没有匹配 case 的情况。",example:`#include <stdio.h>

int main(void) {
    int choice = 2;
    switch (choice) {
    case 1: puts("Tea"); break;
    case 2: puts("Coffee"); break;
    default: puts("Water"); break;
    }
    return 0;
}
`,exampleOutput:"Coffee",walkthrough:`按顺序执行上面的语句。switch 只计算一次控制表达式；default 处理没有匹配 case 的情况。
程序输出：Coffee`,mistakes:["遗漏 break 造成意外贯穿。","用浮点数或字符串作为 switch 的控制值。"],summary:"switch 只计算一次控制表达式；default 处理没有匹配 case 的情况。"},{id:"c4-5",chapter:4,index:4,en:"Ternary Conditional Operator",title:"三目运算符",objective:"在两种值之间进行简短选择。",explanation:["条件运算符 ? : 适合“根据条件选一个值”，例如从两个价格中选较低者。它是一个表达式，可以出现在赋值右侧。","只会计算被选中的一侧，因此也具有短路性质。若逻辑包含多条语句或多层嵌套，用 if-else 会更容易阅读。注意两侧值的类型会共同影响结果类型。"],syntax:"int max = a > b ? a : b;",syntaxNotes:"问号前是条件；冒号前是真时的值；冒号后是假时的值。",example:`#include <stdio.h>

int main(void) {
    int a = 7, b = 12;
    int max = a > b ? a : b;
    printf("%d\\n", max);
    return 0;
}
`,exampleOutput:"12",walkthrough:`按顺序执行上面的语句。问号前是条件；冒号前是真时的值；冒号后是假时的值。
程序输出：12`,mistakes:["把 : 漏写成分号。","多层嵌套造成难以判断的分支顺序。"],summary:"问号前是条件；冒号前是真时的值；冒号后是假时的值。"},{id:"c4-6",chapter:4,index:5,en:"Recap Challenge",title:"流程控制综合练习",objective:"把条件顺序和边界检查组合为完整规则。",explanation:["综合条件题要先确认无效数据，再判断有效区间。比如先检查分数是否在 0～100，再决定是否及格，就不会把 120 分当成普通优秀成绩。","测试时应主动选每个分支的代表值，并增加边界值。只验证一个常见输入，无法发现条件方向写反或遗漏等号的问题。"],syntax:`if (s < 0 || s > 100) { /* invalid */ }
else if (s >= 60) { /* pass */ }
else { /* fail */ }`,syntaxNotes:"无效输入优先拦截；合法范围内再作分级。",example:`#include <stdio.h>

int main(void) {
    int s = 120;
    if (s < 0 || s > 100) { puts("Invalid"); }
    else if (s >= 60) { puts("Pass"); }
    else { puts("Fail"); }
    return 0;
}
`,exampleOutput:"Invalid",walkthrough:`按顺序执行上面的语句。无效输入优先拦截；合法范围内再作分级。
程序输出：Invalid`,mistakes:["只检查 s<0，忘记大于 100 也无效。","用 && 连接不可能同时成立的 s<0 与 s>100。"],summary:"无效输入优先拦截；合法范围内再作分级。"},{id:"c4-7",chapter:4,index:6,en:"Nested If - Else",title:"嵌套条件判断",objective:"按依赖关系嵌套判断，并明确 else 的归属。",explanation:["有些条件只有通过外层检查后才有意义。例如先确认门店营业，再判断是否有库存。嵌套 if 可以直接表达这种依赖关系。","没有花括号时，else 会匹配最近的尚未配对的 if，而不是按缩进匹配。始终使用花括号，并避免过深的嵌套，可以让代码更可靠。"],syntax:`if (open) {
    if (stock > 0) { /* buy */ }
    else { /* sold out */ }
}`,syntaxNotes:"外层控制是否营业；内层只在营业时判断库存。",example:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    bool open = true;
    int stock = 0;
    if (open) {
        if (stock > 0) { puts("Buy"); }
        else { puts("Sold out"); }
    } else { puts("Closed"); }
    return 0;
}
`,exampleOutput:"Sold out",walkthrough:`按顺序执行上面的语句。外层控制是否营业；内层只在营业时判断库存。
程序输出：Sold out`,mistakes:["按缩进猜测 else 的归属。","外层失败时仍执行依赖它的内层运算。"],summary:"外层控制是否营业；内层只在营业时判断库存。"}],_={id:q,en:j,title:D,description:T,lessons:N},I={"c4-1":{type:"debug",question:'分析：if (x > 0); { puts("yes"); } 的问题是什么？',options:["分号让 if 控制空语句","缺少头文件 stdbool.h","puts 不能输出"],answer:["分号让 if 控制空语句"],explanation:"分号独立构成空语句，后面的花括号块无条件执行，因此需要删除多余分号。"},"c4-2":{type:"boolean",question:"判断：同一个 if-else 中两个分支可能同时执行。",options:["正确","错误"],answer:["错误"],explanation:"if 与 else 互斥，同一次判断只能选择一条路径。"},"c4-3":{type:"single",question:"s=90 时，示例的分支结果是？",options:["A","B","C"],answer:["A"],explanation:"第一个 >=90 已经成立，后面的 else-if 不再检查。"},"c4-4":{type:"fill",question:"填空：通常用于结束一个 case 分支、防止贯穿的关键字是什么？",answer:["break"],explanation:"break 退出最近一层 switch 或循环；它不等同于退出整个函数。"},"c4-5":{type:"predict",question:"预测：3 > 5 ? 10 : 20 的值是多少？",answer:["20"],explanation:"3 > 5 为假，因此选择冒号后面的 20。"},"c4-6":{type:"single",question:"哪个值应被示例判定为 Invalid？",options:["101","60","0"],answer:["101"],explanation:"合法范围是 0～100 的闭区间，101 超过上界。"},"c4-7":{type:"single",question:"没有花括号时，else 默认与哪个 if 配对？",options:["最近尚未配对的 if","最外层 if","按缩进判断"],answer:["最近尚未配对的 if"],explanation:"C 的语法配对由结构决定，空白缩进不决定 else 归属。"}},A={"c4-1":{title:"条件温度提醒",difficulty:"进阶",description:"令 temperature=38，温度大于等于 37 时输出 High，然后总是输出 Done。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:`High
Done`}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 令 temperature=38，温度大于等于 37 时输出 High，然后总是输出 Done
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int temperature = 38;
    if (temperature >= 37) {
        printf("High\\n");
    }
    printf("Done\\n");
    return 0;
}
`,hints:["在条件成立时执行一个代码块。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","括号中是条件；花括号中是满足条件时执行的语句。"]},"c4-2":{title:"决定是否购买",difficulty:"进阶",description:"令 balance=20、price=25，够钱输出 Buy，否则输出 Save。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"Save"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 令 balance=20、price=25，够钱输出 Buy，否则输出 Save
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int balance = 20, price = 25;
    if (balance >= price) { puts("Buy"); }
    else { puts("Save"); }
    return 0;
}
`,hints:["让两条互斥路径恰好执行一条。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","else 不带条件，它表示前面 if 条件不成立的所有情况。"]},"c4-3":{title:"分级评定",difficulty:"进阶",description:"令 s=59，按 >=90 输出 A、>=60 输出 B、其余输出 C。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"C"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 令 s=59，按 >=90 输出 A、>=60 输出 B、其余输出 C
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int s = 59;
    if (s >= 90) { puts("A"); }
    else if (s >= 60) { puts("B"); }
    else { puts("C"); }
    return 0;
}
`,hints:["按顺序检查条件，覆盖边界与剩余情况。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","后续条件只在前面的条件都不成立时判断，因此 >=60 分支实际覆盖 60～89。"]},"c4-4":{title:"分派播放器命令",difficulty:"进阶",description:"令 command=3，1 输出 Play，2 输出 Pause，其他输出 Stop。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"Stop"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 令 command=3，1 输出 Play，2 输出 Pause，其他输出 Stop
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int command = 3;
    switch (command) {
    case 1: puts("Play"); break;
    case 2: puts("Pause"); break;
    default: puts("Stop"); break;
    }
    return 0;
}
`,hints:["用 switch 分派离散整数或字符状态。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","switch 只计算一次控制表达式；default 处理没有匹配 case 的情况。"]},"c4-5":{title:"选择较小值",difficulty:"进阶",description:"令 a=14、b=9，使用三目运算符输出较小的值。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"9"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 令 a=14、b=9，使用三目运算符输出较小的值
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int a = 14, b = 9;
    int min = a < b ? a : b;
    printf("%d\\n", min);
    return 0;
}
`,hints:["在两种值之间进行简短选择。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","问号前是条件；冒号前是真时的值；冒号后是假时的值。"]},"c4-6":{title:"带边界检查的评定",difficulty:"进阶",description:"令 s=60，先判断有效范围 0～100，再按及格线 60 输出 Invalid、Pass 或 Fail。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"Pass"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 令 s=60，先判断有效范围 0～100，再按及格线 60 输出 Invalid、Pass 或 Fail
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int s = 60;
    if (s < 0 || s > 100) { puts("Invalid"); }
    else if (s >= 60) { puts("Pass"); }
    else { puts("Fail"); }
    return 0;
}
`,hints:["把条件顺序和边界检查组合为完整规则。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","无效输入优先拦截；合法范围内再作分级。"]},"c4-7":{title:"判断能否下单",difficulty:"进阶",description:"令 open=true、stock=5，营业且有货输出 Buy，营业无货输出 Sold out，不营业输出 Closed。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"Buy"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 令 open=true、stock=5，营业且有货输出 Buy，营业无货输出 Sold out，不营业输出 Closed
    
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    bool open = true;
    int stock = 5;
    if (open) {
        if (stock > 0) { puts("Buy"); }
        else { puts("Sold out"); }
    } else { puts("Closed"); }
    return 0;
}
`,hints:["按依赖关系嵌套判断，并明确 else 的归属。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","外层控制是否营业；内层只在营业时判断库存。"]}},$=5,B="Input & Output",S="输入与输出",P="让程序接收数据，并稳妥地处理输入。",H=[{id:"c5-1",chapter:5,index:0,en:"Format Specifiers",title:"格式控制符",objective:"区分 printf 与 scanf 对 double 的格式要求。",explanation:["控制符告诉标准库怎样读写值。输出时，float 会在可变参数调用中提升为 double，所以 printf 用 %f 就能输出 double。输入时，scanf 接收的是对象地址，double 必须配 %lf，float 配 %f。","同一个符号在输入与输出函数中不一定代表同样的参数要求。先确认变量类型和函数用途，再选择格式，避免把数据写到错误大小的内存中。"],syntax:`double x;
scanf("%lf", &x);
printf("%.2f", x);`,syntaxNotes:"%lf 在 scanf 中匹配 double*；printf 的 %.2f 接受 double 并显示两位小数。",example:`#include <stdio.h>

int main(void) {
    double x;
    if (scanf("%lf", &x) != 1) { return 1; }
    printf("%.2f\\n", x);
    return 0;
}
`,exampleOutput:"3.50",walkthrough:"输入 3.5 后，scanf 将它写入 x；printf 按两位小数显示 3.50。",mistakes:["scanf 用 %f 接收 double*，类型不匹配可能破坏数据。","scanf 遗漏 &，没有传入存储位置。"],summary:"%lf 在 scanf 中匹配 double*；printf 的 %.2f 接受 double 并显示两位小数。",exampleInput:"3.5"},{id:"c5-2",chapter:5,index:1,en:"scanf Basics",title:"scanf 输入基础",objective:"读取多个数值，并检查成功转换的数量。",explanation:["scanf 会按格式尝试把输入文本转换成数据。对于 %d 等数值控制符，前导空白会被跳过，所以两个整数既可以写在同一行，也可以分两行输入。",'返回值是成功赋值的项目数，不是输入的数值。只有返回值等于预期数量，才能放心使用变量。输入 %c 时不会自动跳过空白，若需要跳过，应写成 " %c"。'],syntax:`if (scanf("%d %d", &a, &b) != 2) {
    return 1;
}`,syntaxNotes:"&a 与 &b 是目标对象的地址；返回 2 表示两个整数都读取成功。",example:`#include <stdio.h>

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) { return 1; }
    printf("%d\\n", a + b);
    return 0;
}
`,exampleOutput:"8",walkthrough:"输入 3 5：scanf 返回 2，将 3 和 5 写入变量；相加得到 8。",mistakes:["未检查返回值就使用未初始化变量。","在格式串末尾加空白，交互输入时可能意外等待后续字符。"],summary:"&a 与 &b 是目标对象的地址；返回 2 表示两个整数都读取成功。",exampleInput:"3 5"},{id:"c5-3",chapter:5,index:2,en:"Recap Challenge #1",title:"输入输出综合练习一",objective:"把输入、计算、输出连接为完整的数据流程。",explanation:["处理输入题可以画成三段：输入数据 → 按公式计算 → 按格式输出。不要在评测程序里打印额外提示词，除非题目要求，否则会影响答案比较。","每个输入量应有明确的单位。例如长和宽都是厘米时，面积单位是平方厘米。用浮点数计算，并在输出阶段控制小数位，而不是过早转换成整数。"],syntax:"double area = width * height;",syntaxNotes:"先读取两个 double，再计算面积，最后用 %.2f 输出。",example:`#include <stdio.h>

int main(void) {
    double w, h;
    if (scanf("%lf %lf", &w, &h) != 2) { return 1; }
    printf("%.2f\\n", w * h);
    return 0;
}
`,exampleOutput:"7.50",walkthrough:"输入 2.5 和 3，先计算乘积 7.5，再以 7.50 输出。",mistakes:["输出额外的 Enter width 等提示，导致判题不通过。","使用整数变量截断输入的小数。"],summary:"先读取两个 double，再计算面积，最后用 %.2f 输出。",exampleInput:"2.5 3"},{id:"c5-4",chapter:5,index:3,en:"Input Validation",title:"输入验证",objective:"检查读取结果与取值范围，避免使用无效输入。",explanation:["读到了数据不代表数据符合业务规则。一个年龄应先确认能够转成整数，再确认是否在允许范围内。这是类型检查与范围检查的两个层次。","scanf 遇到 abc 时，%d 会转换失败。返回 0 后不能继续使用目标变量。对于任意长度、可能超出 int 范围的外部输入，更稳妥的方法是 fgets 搭配 strtol；本节的数值输入保证在 int 范围内。"],syntax:`if (scanf("%d", &age) != 1) { /* invalid */ }
else if (age < 0 || age > 120) { /* invalid */ }`,syntaxNotes:"先检查是否成功读取，成功后才访问 age 进行范围判断。",example:`#include <stdio.h>

int main(void) {
    int age;
    if (scanf("%d", &age) != 1) { puts("Invalid"); }
    else if (age < 0 || age > 120) { puts("Invalid"); }
    else { puts("Valid"); }
    return 0;
}
`,exampleOutput:"Valid",walkthrough:"输入 20，scanf 成功返回 1，20 也在 0～120 内，因此输出 Valid。",mistakes:["把 scanf 返回值当作用户输入的值。","转换失败后仍读取未初始化变量。"],summary:"先检查是否成功读取，成功后才访问 age 进行范围判断。",exampleInput:"20"},{id:"c5-5",chapter:5,index:4,en:"Recap Challenge #2",title:"输入输出综合练习二",objective:"在完成读取后检查业务边界，再执行计算。",explanation:["输入验证的意义在于让后续计算具有可靠前提。除法之前先确认分母非零，计算范围之前先确认数值有效。把这些步骤按顺序写，能避免危险操作先被执行。","测试应包含正常输入、边界输入和非法输入。对本题而言，分母为零是一条独立分支，不应让程序尝试计算后再补救。"],syntax:`if (b == 0) { puts("Invalid"); }
else { printf("%.2f", a / b); }`,syntaxNotes:"把除法放在 else 里，确保只在分母非零时执行。",example:`#include <stdio.h>

int main(void) {
    double a, b;
    if (scanf("%lf %lf", &a, &b) != 2 || b == 0) { puts("Invalid"); }
    else { printf("%.2f\\n", a / b); }
    return 0;
}
`,exampleOutput:"2.50",walkthrough:"输入 5 2：读取两项成功，分母非零，所以输出 2.50。",mistakes:["先算除法再检查分母。","用 b != 0 与读取检查的逻辑关系写反。"],summary:"把除法放在 else 里，确保只在分母非零时执行。",exampleInput:"5 2"}],F={id:$,en:B,title:S,description:P,lessons:H},R={"c5-1":{type:"single",question:"读取 double x，哪种写法正确？",options:['scanf("%lf", &x)','scanf("%f", &x)','scanf("%d", x)'],answer:['scanf("%lf", &x)'],explanation:"scanf 需要 double 对象的地址以及 %lf。printf 中 double 的常用格式则是 %f。"},"c5-2":{type:"fill",question:'scanf("%d %d", &a, &b) 成功读取两个整数时返回多少？',answer:["2"],explanation:"返回值统计成功转换并赋值的个数；遇到不匹配或输入结束时可能小于 2。"},"c5-3":{type:"predict",question:"输入 2.5 3，示例输出是什么？",answer:["7.50"],explanation:"两数相乘为 7.5，输出格式要求两位小数，因此为 7.50。"},"c5-4":{type:"single",question:'输入 abc 给 scanf("%d", &n)，通常返回什么？',options:["0","1","abc"],answer:["0"],explanation:"没有成功的整数转换，所以返回 0；若输入结束且尚未转换，则可能返回 EOF。"},"c5-5":{type:"multi",question:"多选：哪些输入应输出 Invalid？",options:["5 0","abc","5 2"],answer:["5 0","abc"],explanation:"分母为 0 不应进行除法；读取失败同样无法得到可靠计算结果。"}},L={"c5-1":{title:"小数的输入与输出",difficulty:"进阶",description:"读入一个 double，输出它的两倍，保留两位小数。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3.5",output:"7.00"},{input:"0",output:"0.00"},{input:"-2.25",output:"-4.50"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 读入一个 double，输出它的两倍，保留两位小数
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    double x;
    if (scanf("%lf", &x) != 1) { return 1; }
    printf("%.2f\\n", x * 2);
    return 0;
}
`,hints:["区分 printf 与 scanf 对 double 的格式要求。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","%lf 在 scanf 中匹配 double*；printf 的 %.2f 接受 double 并显示两位小数。"]},"c5-2":{title:"两个整数的和",difficulty:"进阶",description:"读入两个整数，输出它们的和。输入值范围为 -1000 到 1000。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3 5",output:"8"},{input:`-7
2`,output:"-5"},{input:"0 0",output:"0"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 读入两个整数，输出它们的和
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) { return 1; }
    printf("%d\\n", a + b);
    return 0;
}
`,hints:["读取多个数值，并检查成功转换的数量。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","&a 与 &b 是目标对象的地址；返回 2 表示两个整数都读取成功。"]},"c5-3":{title:"计算矩形周长",difficulty:"进阶",description:"读入矩形长和宽（正数，均不超过 100），输出周长，保留两位小数。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"2.5 3",output:"11.00"},{input:"1 1",output:"4.00"},{input:"10 4.25",output:"28.50"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 读入矩形长和宽（正数，均不超过 100），输出周长，保留两位小数
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    double w, h;
    if (scanf("%lf %lf", &w, &h) != 2) { return 1; }
    printf("%.2f\\n", 2 * (w + h));
    return 0;
}
`,hints:["把输入、计算、输出连接为完整的数据流程。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","先读取两个 double，再计算面积，最后用 %.2f 输出。"]},"c5-4":{title:"检查成绩输入",difficulty:"进阶",description:"读入一个整数分数，合法范围为 0～100。读入失败或越界输出 Invalid，否则输出 Valid。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"60",output:"Valid"},{input:"101",output:"Invalid"},{input:"abc",output:"Invalid"},{input:"0",output:"Valid"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 读入一个整数分数，合法范围为 0～100
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int score;
    if (scanf("%d", &score) != 1) { puts("Invalid"); }
    else if (score < 0 || score > 100) { puts("Invalid"); }
    else { puts("Valid"); }
    return 0;
}
`,hints:["检查读取结果与取值范围，避免使用无效输入。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","先检查是否成功读取，成功后才访问 age 进行范围判断。"]},"c5-5":{title:"安全的除法计算",difficulty:"进阶",description:"读入两个 double。若读取失败或分母为 0，输出 Invalid；否则输出商，保留两位小数。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"5 2",output:"2.50"},{input:"5 0",output:"Invalid"},{input:"-9 4",output:"-2.25"},{input:"abc",output:"Invalid"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 读入两个 double
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    double a, b;
    if (scanf("%lf %lf", &a, &b) != 2 || b == 0) { puts("Invalid"); }
    else { printf("%.2f\\n", a / b); }
    return 0;
}
`,hints:["在完成读取后检查业务边界，再执行计算。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","把除法放在 else 里，确保只在分母非零时执行。"]}},V=6,W="Loops",E="循环",z="重复执行，逐步建立解决问题的思路。",K=[{id:"c6-1",chapter:6,index:0,en:"For Loop",title:"for 循环",objective:"使用初始化、继续条件和更新控制重复次数。",explanation:["for 像一个自动计数器，把循环需要的三件事集中写在一处：从哪里开始、什么时候继续、每次怎样更新。条件在每次执行循环体之前判断。","跟踪 i 的值比背语法更有帮助。for (int i=0; i<3; i++) 依次执行 i 为 0、1、2 的循环体，共三次。i 变为 3 后，条件为假而退出。"],syntax:`for (int i = 0; i < n; i++) {
    /* 重复 n 次 */
}`,syntaxNotes:"初始化执行一次；条件每轮先检查；更新在每轮循环体后执行。",example:`#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 3; i++) {
        printf("%d\\n", i);
    }
    return 0;
}
`,exampleOutput:`1
2
3`,walkthrough:`按顺序执行上面的语句。初始化执行一次；条件每轮先检查；更新在每轮循环体后执行。
程序输出：1
2
3`,mistakes:["把 < 写成 <=，比预期多执行一次。","在 for 头部后误加分号，循环体变成空语句。"],summary:"初始化执行一次；条件每轮先检查；更新在每轮循环体后执行。"},{id:"c6-2",chapter:6,index:1,en:"While Loop",title:"while 循环",objective:"在重复次数不确定时先检查条件再循环。",explanation:["while 适合重复次数由状态决定的任务，例如不断读入直到结束标记。它先检查条件，因此可能一次也不执行。","写循环前确认状态如何变化。若控制条件依赖 n，循环体内就要以某种方式更新 n，否则条件可能永远为真。可以写出“每轮后剩余工作减少多少”来检查终止性。"],syntax:`while (n > 0) {
    n--;
}`,syntaxNotes:"每轮先判断 n>0；进入循环后更新 n；最终 n 降到 0。",example:`#include <stdio.h>

int main(void) {
    int n = 3;
    while (n > 0) {
        printf("%d ", n);
        n--;
    }
    printf("\\n");
    return 0;
}
`,exampleOutput:"3 2 1",walkthrough:`按顺序执行上面的语句。每轮先判断 n>0；进入循环后更新 n；最终 n 降到 0。
程序输出：3 2 1`,mistakes:["忘记更新条件相关变量，造成无限循环。","以为 while 至少运行一次。"],summary:"每轮先判断 n>0；进入循环后更新 n；最终 n 降到 0。"},{id:"c6-3",chapter:6,index:2,en:"Do While Loop",title:"do-while 循环",objective:"理解先执行后判断的循环方式。",explanation:["do-while 像先展示一次菜单，再决定要不要重试。无论初始条件真假，循环体至少执行一遍。它适合必须先发生一次的交互或处理步骤。","与 while 的差别不只是代码位置：当初值不满足条件时，行为会不同。末尾 while (...) 后的分号属于语法的一部分，不能遗漏。"],syntax:`do {
    /* 至少执行一次 */
} while (condition);`,syntaxNotes:"先执行花括号里的语句，再检查 condition；末尾必须有分号。",example:`#include <stdio.h>

int main(void) {
    int n = 0;
    do {
        printf("%d\\n", n);
        n++;
    } while (n < 0);
    return 0;
}
`,exampleOutput:"0",walkthrough:`按顺序执行上面的语句。先执行花括号里的语句，再检查 condition；末尾必须有分号。
程序输出：0`,mistakes:["忘记尾部的分号。","把先执行一次误写成普通 while，导致初始条件为假时完全跳过。"],summary:"先执行花括号里的语句，再检查 condition；末尾必须有分号。"},{id:"c6-4",chapter:6,index:3,en:"Break",title:"break 语句",objective:"满足停止条件时退出最近一层循环。",explanation:["break 表示“当前重复任务已经可以结束”。例如搜索目标时，一旦找到，就没有必要继续扫描。它只跳出最近一层循环或 switch，不会退出整个函数。","使用 break 后，控制流转到循环后的第一条语句。嵌套循环中若要退出外层，需要额外状态或函数返回，不能误以为一个 break 会结束全部层级。"],syntax:`if (value == 0) {
    break;
}`,syntaxNotes:"break 结束所在的最近一层循环；后续循环体语句不会执行。",example:`#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) { break; }
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}
`,exampleOutput:"1 2",walkthrough:`按顺序执行上面的语句。break 结束所在的最近一层循环；后续循环体语句不会执行。
程序输出：1 2`,mistakes:["把 break 当作 return，误判函数是否结束。","嵌套循环中期待一个 break 同时退出两层。"],summary:"break 结束所在的最近一层循环；后续循环体语句不会执行。"},{id:"c6-5",chapter:6,index:4,en:"Continue",title:"continue 语句",objective:"跳过本轮剩余工作，继续下一轮。",explanation:["continue 像分拣时把不需要的物品放到一边：本轮的后续处理不做，但分拣流程继续。for 中会执行更新表达式，然后再次检查条件。","while 中没有独立的更新区。如果 continue 之前没有更新控制变量，就可能反复停在同一个值。先确定更新必然发生，再使用 continue。"],syntax:`if (n % 2 != 0) {
    continue;
}`,syntaxNotes:"跳过当前循环体剩余语句；for 仍会执行 i++ 等更新操作。",example:`#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 6; i++) {
        if (i % 2 != 0) { continue; }
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}
`,exampleOutput:"2 4 6",walkthrough:`按顺序执行上面的语句。跳过当前循环体剩余语句；for 仍会执行 i++ 等更新操作。
程序输出：2 4 6`,mistakes:["把 continue 写成 break，提前结束整个循环。","while 中在更新之前 continue，导致变量不再变化。"],summary:"跳过当前循环体剩余语句；for 仍会执行 i++ 等更新操作。"},{id:"c6-6",chapter:6,index:5,en:"Recap Challenge #1",title:"循环综合练习一",objective:"建立累加器，逐轮维护一个结果。",explanation:["累加器像账本，每收到一项就更新当前总额。写循环前先确定初值：求和通常从 0 开始，求乘积通常从 1 开始，不能随意交换。","可以用循环不变式检查代码：执行完前 i 次后，sum 等于已经处理的所有数之和。这样能发现漏加第一项或多加最后一项等边界问题。"],syntax:`int sum = 0;
for (int i = 1; i <= n; i++) { sum += i; }`,syntaxNotes:"sum 在循环外初始化一次；每轮把当前 i 累加进去。",example:`#include <stdio.h>

int main(void) {
    int sum = 0;
    for (int i = 1; i <= 4; i++) { sum += i; }
    printf("%d\\n", sum);
    return 0;
}
`,exampleOutput:"10",walkthrough:`按顺序执行上面的语句。sum 在循环外初始化一次；每轮把当前 i 累加进去。
程序输出：10`,mistakes:["在循环体内重新声明 sum=0，导致每轮丢失之前结果。","用未初始化变量累加，读取不确定值。"],summary:"sum 在循环外初始化一次；每轮把当前 i 累加进去。"},{id:"c6-7",chapter:6,index:6,en:"Nested Loops",title:"嵌套循环",objective:"按行列组织重复任务，计算总执行次数。",explanation:["嵌套循环像整理一张表：外层选择行，内层遍历这一行的列。每进入新的一行，内层计数器都需要重新开始。","如果外层执行 m 次、每轮内层都执行 n 次，总循环体次数为 m×n。输出图案时，行末换行应放在内层循环结束后，否则每个字符都会单独成行。"],syntax:`for (int r = 0; r < rows; r++) {
    for (int c = 0; c < cols; c++) { /* 单元格 */ }
}`,syntaxNotes:"r 表示行，c 表示列；内层完整结束一次，外层才更新一次。",example:`#include <stdio.h>

int main(void) {
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) { printf("*"); }
        printf("\\n");
    }
    return 0;
}
`,exampleOutput:`***
***`,walkthrough:`按顺序执行上面的语句。r 表示行，c 表示列；内层完整结束一次，外层才更新一次。
程序输出：***
***`,mistakes:["内层变量没有按每行重置。","把换行放进内层，破坏行列布局。"],summary:"r 表示行，c 表示列；内层完整结束一次，外层才更新一次。"},{id:"c6-8",chapter:6,index:7,en:"Infinite Loops",title:"无限循环",objective:"识别非终止循环，并设计明确退出路径。",explanation:["while (1) 和 for (;;) 可以有意表达“不断重复，直到内部触发退出”。这种写法并不一定是错误，关键是是否存在可达的 break 或 return。","无意的无限循环通常来自条件无法改变、更新方向写反或边界判断错误。本工坊会终止超时的学生程序；看到超时时，先跟踪前几轮变量值，而不是继续加大等待时间。"],syntax:`while (1) {
    if (done) { break; }
}`,syntaxNotes:"常量 1 始终为真，退出依靠循环体中的 break。",example:`#include <stdio.h>

int main(void) {
    int count = 0;
    while (1) {
        if (count == 3) { break; }
        count++;
    }
    printf("%d\\n", count);
    return 0;
}
`,exampleOutput:"3",walkthrough:`按顺序执行上面的语句。常量 1 始终为真，退出依靠循环体中的 break。
程序输出：3`,mistakes:["计数器递增却等待它变小，条件永远不会达成。","在到达 break 前被 continue 跳过。"],summary:"常量 1 始终为真，退出依靠循环体中的 break。"},{id:"c6-9",chapter:6,index:8,en:"Recap Challenge #2",title:"循环综合练习二",objective:"组合输入、筛选和累计，完成统计任务。",explanation:["统计类题目通常同时维护几个状态，例如 sum 保存总和、count 保存符合条件的个数。先写清“什么情况下更新哪一个状态”，再写循环会更有条理。","读入 n 个值时循环应准确执行 n 次，每轮都检查读取成功。筛选只影响统计，不应改变读入次数，否则可能把后续数据读错位。"],syntax:`for (int i = 0; i < n; i++) {
    if (x > 0) { sum += x; }
}`,syntaxNotes:"循环处理固定数量的输入，条件分支决定当前值是否被累计。",example:`#include <stdio.h>

int main(void) {
    int n, x, count = 0;
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &x) != 1) { return 1; }
        if (x > 0) { count++; }
    }
    printf("%d\\n", count);
    return 0;
}
`,exampleOutput:"2",walkthrough:"输入 4 -2 0 4 5：读取四个数，只有 4 和 5 增加 count，最终输出 2。",mistakes:["只在值为正时推进输入计数，可能无法读完固定数量的数据。","把 >0 写成 >=0，将零错误计入正数。"],summary:"循环处理固定数量的输入，条件分支决定当前值是否被累计。",exampleInput:"4 -2 0 4 5"}],M={id:V,en:W,title:E,description:z,lessons:K},Y={"c6-1":{type:"fill",question:"for (int i=0; i<4; i++) 的循环体执行几次？",answer:["4"],explanation:"i 依次为 0、1、2、3，一共四个有效值。"},"c6-2":{type:"boolean",question:"判断：while 条件一开始为假，循环体不会执行。",options:["正确","错误"],answer:["正确"],explanation:"while 属于先判断循环；只有条件非零才进入循环体。"},"c6-3":{type:"fill",question:"do-while 的循环体最少执行几次？",answer:["1"],explanation:"条件判断位于循环体之后，因此至少执行一次。"},"c6-4":{type:"single",question:"示例遇到 i==3 后，下一个位置在哪里？",options:["循环之后","下一轮 i=4","main 外面"],answer:["循环之后"],explanation:"break 直接退出当前 for，循环更新表达式和下一轮都不会发生。"},"c6-5":{type:"single",question:"for 中执行 continue 后还会执行更新表达式吗？",options:["会","不会"],answer:["会"],explanation:"continue 转到 for 的更新步骤，然后才检查下一轮条件。"},"c6-6":{type:"single",question:"累加 1 到 n，sum 应在哪里初始化为 0？",options:["循环开始前","每轮循环体中","不需要初始化"],answer:["循环开始前"],explanation:"初值只能在累计之前设置一次；每轮归零会抹掉先前的累计结果。"},"c6-7":{type:"fill",question:"外层 3 次、每次内层 4 次，内层循环体共执行几次？",answer:["12"],explanation:"每行 4 个单元格，共 3 行，所以是 3 × 4 = 12。"},"c6-8":{type:"multi",question:"多选：哪些可以结束 while(1) 所在的循环执行？",options:["执行该循环中的 break","从函数 return","普通的 continue"],answer:["执行该循环中的 break","从函数 return"],explanation:"break 退出循环，return 退出函数；continue 只进入下一轮，不能结束循环。"},"c6-9":{type:"fill",question:"数据 -2 0 4 5 中，严格大于零的数有几个？",answer:["2"],explanation:"只有 4 和 5 严格大于 0，零不属于正数。"}},G={"c6-1":{title:"输出连续整数",difficulty:"进阶",description:"输入 n（1～100），输出 1 到 n 的整数，用空白分隔。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3",output:"1 2 3"},{input:"1",output:"1"},{input:"5",output:"1 2 3 4 5"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（1～100），输出 1 到 n 的整数，用空白分隔
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 1; i <= n; i++) { printf("%d ", i); }
    printf("\\n");
    return 0;
}
`,hints:["使用初始化、继续条件和更新控制重复次数。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","从 i=1 开始，以 i<=n 为继续条件，每轮 i++。"]},"c6-2":{title:"倒计时",difficulty:"进阶",description:"输入 n（0～100），用 while 倒序输出 n 到 1；n=0 时不输出数字。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3",output:"3 2 1"},{input:"1",output:"1"},{input:"0",output:""}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（0～100），用 while 倒序输出 n 到 1；n=0 时不输出数字
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) { return 1; }
    while (n > 0) { printf("%d ", n); n--; }
    printf("\\n");
    return 0;
}
`,hints:["在重复次数不确定时先检查条件再循环。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","每轮先判断 n>0；进入循环后更新 n；最终 n 降到 0。"]},"c6-3":{title:"至少执行一次的倒数",difficulty:"进阶",description:"输入 n（0～5），用 do-while 从 n 开始输出并递减，直到输出 0；n=0 时也输出 0。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"2",output:"2 1 0"},{input:"0",output:"0"},{input:"4",output:"4 3 2 1 0"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（0～5），用 do-while 从 n 开始输出并递减，直到输出 0；n=0 时也输出 0
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) { return 1; }
    do { printf("%d ", n); n--; } while (n >= 0);
    printf("\\n");
    return 0;
}
`,hints:["理解先执行后判断的循环方式。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","先执行花括号里的语句，再检查 condition；末尾必须有分号。"]},"c6-4":{title:"遇到零就停止",difficulty:"进阶",description:"持续读入整数直到读到 0 或输入结束，输出 0 之前所有数的和。各数及总和在 int 范围内。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3 4 0 9",output:"7"},{input:"0",output:"0"},{input:"-2 8 0",output:"6"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 持续读入整数直到读到 0 或输入结束，输出 0 之前所有数的和
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int x, sum = 0;
    while (scanf("%d", &x) == 1) {
        if (x == 0) { break; }
        sum += x;
    }
    printf("%d\\n", sum);
    return 0;
}
`,hints:["满足停止条件时退出最近一层循环。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","break 结束所在的最近一层循环；后续循环体语句不会执行。"]},"c6-5":{title:"跳过不需要的数",difficulty:"进阶",description:"输入 n（1～20），用 continue 跳过 3 的倍数，输出 1 到 n 中剩余的整数。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"5",output:"1 2 4 5"},{input:"3",output:"1 2"},{input:"1",output:"1"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（1～20），用 continue 跳过 3 的倍数，输出 1 到 n 中剩余的整数
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 1; i <= n; i++) {
        if (i % 3 == 0) { continue; }
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}
`,hints:["跳过本轮剩余工作，继续下一轮。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","跳过当前循环体剩余语句；for 仍会执行 i++ 等更新操作。"]},"c6-6":{title:"累加平方和",difficulty:"进阶",description:"输入 n（0～1000），输出 1 到 n 的平方和。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3",output:"14"},{input:"0",output:"0"},{input:"5",output:"55"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（0～1000），输出 1 到 n 的平方和
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n, sum = 0;
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 1; i <= n; i++) { sum += i * i; }
    printf("%d\\n", sum);
    return 0;
}
`,hints:["建立累加器，逐轮维护一个结果。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","sum 在循环外初始化一次；每轮把当前 i 累加进去。"]},"c6-7":{title:"绘制星号矩形",difficulty:"进阶",description:"输入 rows cols（各 1～8），输出对应大小的星号矩形，每行 cols 个 *。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"2 3",output:`***
***`},{input:"1 1",output:"*"},{input:"3 2",output:`**
**
**`}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 rows cols（各 1～8），输出对应大小的星号矩形，每行 cols 个 *
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int rows, cols;
    if (scanf("%d %d", &rows, &cols) != 2) { return 1; }
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) { printf("*"); }
        printf("\\n");
    }
    return 0;
}
`,hints:["按行列组织重复任务，计算总执行次数。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","r 表示行，c 表示列；内层完整结束一次，外层才更新一次。"]},"c6-8":{title:"给重复任务设置出口",difficulty:"进阶",description:"输入正整数 limit（1～100），使用 while(1) 和 break，输出最小的满足 2*k >= limit 的非负整数 k。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"5",output:"3"},{input:"2",output:"1"},{input:"9",output:"5"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入正整数 limit（1～100），使用 while(1) 和 break，输出最小的满足 2*k >= limit 的非负整数 k
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int limit, k = 0;
    if (scanf("%d", &limit) != 1) { return 1; }
    while (1) {
        if (2 * k >= limit) { break; }
        k++;
    }
    printf("%d\\n", k);
    return 0;
}
`,hints:["识别非终止循环，并设计明确退出路径。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","常量 1 始终为真，退出依靠循环体中的 break。"]},"c6-9":{title:"统计正数",difficulty:"进阶",description:"先输入 n（1～20），再输入 n 个整数（-100～100）。输出所有正数的和，以及正数个数。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"4 -2 0 4 5",output:"9 2"},{input:"3 -1 -2 0",output:"0 0"},{input:"1 7",output:"7 1"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 先输入 n（1～20），再输入 n 个整数（-100～100）
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n, x, sum = 0, count = 0;
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &x) != 1) { return 1; }
        if (x > 0) { sum += x; count++; }
    }
    printf("%d %d\\n", sum, count);
    return 0;
}
`,hints:["组合输入、筛选和累计，完成统计任务。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","循环处理固定数量的输入，条件分支决定当前值是否被累计。"]}},U=7,J="Functions",Q="函数",X="把问题拆开，让每一段代码职责清晰。",Z=[{id:"c7-1",chapter:7,index:0,en:"Declare a Function",title:"函数声明与定义",objective:"定义一个无参数函数，并从 main 调用。",explanation:["函数像一台专门完成某个步骤的小机器。定义告诉编译器它的名字、参数、返回类型和内部做法；调用才会让这台机器实际执行。只写定义不会自动运行。","本节先把完整定义放在 main 前面，这样调用点已经知道函数的类型。void hello(void) 中，第一个 void 表示不返回值，括号里的 void 表示不接收参数。"],syntax:`void hello(void) {
    puts("Hello");
}
/* 调用：hello(); */`,syntaxNotes:"函数定义不能嵌套在 main 内部；调用需要圆括号。",example:`#include <stdio.h>

void hello(void) {
    puts("Hello");
}

int main(void) {
    hello();
    hello();
    return 0;
}
`,exampleOutput:`Hello
Hello`,walkthrough:`按顺序执行上面的语句。函数定义不能嵌套在 main 内部；调用需要圆括号。
程序输出：Hello
Hello`,mistakes:["在 main 内定义另一个普通函数，不符合标准 C11。","写 hello 而不是 hello()，没有真正调用。"],summary:"函数定义不能嵌套在 main 内部；调用需要圆括号。"},{id:"c7-2",chapter:7,index:1,en:"Return Types",title:"函数返回值类型",objective:"用 return 把计算结果交回调用处。",explanation:["返回值像机器加工后的产品。一个 int 函数应返回整数，void 函数则不返回数据。return 表达式结束当前函数，并把结果交给调用者，而不是自动打印出来。","非 void 函数的所有正常返回路径都应提供正确类型的值。调用者可以把返回值保存到变量、放进表达式或传给 printf。main 在结尾的特殊返回规则不应套用到普通函数。"],syntax:`int square(int n) {
    return n * n;
}`,syntaxNotes:"int 指定结果类型；return 把乘积交给调用者并立即结束函数。",example:`#include <stdio.h>

int square(int n) {
    return n * n;
}

int main(void) {
    int result = square(4);
    printf("%d\\n", result);
    return 0;
}
`,exampleOutput:"16",walkthrough:`按顺序执行上面的语句。int 指定结果类型；return 把乘积交给调用者并立即结束函数。
程序输出：16`,mistakes:["只计算表达式却忘记 return。","误以为 return 会直接在屏幕上显示结果。"],summary:"int 指定结果类型；return 把乘积交给调用者并立即结束函数。"},{id:"c7-3",chapter:7,index:2,en:"Parameters",title:"函数参数",objective:"通过参数传入数据，理解 C 的值传递。",explanation:["参数是函数的输入接口。调用时，实参的值会复制给形参；在函数内修改一个普通整数形参，不会修改调用者的整数变量。","像把数字写在另一张纸上再交给函数，函数改的是副本。要让调用者获得新结果，可以返回一个值，并在调用处明确赋值，而不是依赖“自动同步”。"],syntax:"int add(int a, int b) { return a + b; }",syntaxNotes:"a、b 是独立的局部形参；调用 add(3,5) 时获得 3、5 的副本。",example:`#include <stdio.h>

void change(int x) { x = 99; }
int add(int a, int b) { return a + b; }

int main(void) {
    int x = 3;
    change(x);
    printf("%d %d\\n", x, add(x, 4));
    return 0;
}
`,exampleOutput:"3 7",walkthrough:`按顺序执行上面的语句。a、b 是独立的局部形参；调用 add(3,5) 时获得 3、5 的副本。
程序输出：3 7`,mistakes:["以为修改 int 形参会自动更新调用者。","形参与实参顺序对应错误。"],summary:"a、b 是独立的局部形参；调用 add(3,5) 时获得 3、5 的副本。"},{id:"c7-4",chapter:7,index:3,en:"Recap Challenge #1",title:"函数综合练习一",objective:"把可重复的判断封装成有返回值的函数。",explanation:["设计函数时先问：输入是什么、输出是什么、是否有副作用。一个只返回判断结果的函数很容易测试，因为同样的输入应得到同样的结果。","主函数负责读写，辅助函数负责计算，可以减少混杂。这样以后更改输入方式时，判断规则仍能复用，不需要复制同一段条件。"],syntax:"int is_even(int n) { return n % 2 == 0; }",syntaxNotes:"返回比较结果 0 或 1，调用者决定如何使用或显示它。",example:`#include <stdio.h>

int is_even(int n) { return n % 2 == 0; }

int main(void) {
    printf("%d %d\\n", is_even(4), is_even(-3));
    return 0;
}
`,exampleOutput:"1 0",walkthrough:`按顺序执行上面的语句。返回比较结果 0 或 1，调用者决定如何使用或显示它。
程序输出：1 0`,mistakes:["将 printf 写进每个计算函数，使结果难以复用。","判断负奇数时错误依赖余数为 1。"],summary:"返回比较结果 0 或 1，调用者决定如何使用或显示它。"},{id:"c7-5",chapter:7,index:4,en:"Recursion Basics",title:"递归基础",objective:"为递归设计终止条件和逐步缩小的问题。",explanation:["递归就是函数调用自己。它像把大任务拆成“一个当前步骤 + 一个更小的同类任务”。例如 n! 可以写成 n × (n-1)!，但必须定义 0! 等于 1，才能让调用链停下来。","递归每深入一层通常都会占用栈空间。终止条件不仅要写出来，还必须能被递归步骤最终到达；对于大输入，循环往往更节省栈。"],syntax:`int fact(int n) {
    if (n == 0) { return 1; }
    return n * fact(n - 1);
}`,syntaxNotes:"n==0 是基本情况；n-1 缩小问题；结果在递归返回时逐层相乘。",example:`#include <stdio.h>

int fact(int n) {
    if (n == 0) { return 1; }
    return n * fact(n - 1);
}

int main(void) {
    printf("%d\\n", fact(4));
    return 0;
}
`,exampleOutput:"24",walkthrough:`按顺序执行上面的语句。n==0 是基本情况；n-1 缩小问题；结果在递归返回时逐层相乘。
程序输出：24`,mistakes:["没有基本情况或递归参数没有缩小，导致栈耗尽。","计算阶乘时忽略整数范围，本题限制 n<=10。"],summary:"n==0 是基本情况；n-1 缩小问题；结果在递归返回时逐层相乘。"},{id:"c7-6",chapter:7,index:5,en:"Function Prototypes",title:"函数原型",objective:"在调用前声明函数接口，分离接口与定义。",explanation:["原型像设备说明书：先告诉编译器函数接受什么参数、返回什么类型，完整内部实现可以放在后面。这让 main 可以先展示程序的整体流程。","原型必须和定义保持类型一致。C11 中 int f(void) 明确表示无参数，而 int f() 的声明并不提供参数类型信息。不要依赖旧式隐式函数声明。"],syntax:`int twice(int n);
/* 稍后提供完整定义 */`,syntaxNotes:"原型末尾是分号，没有函数体；参数名可省略，但类型必须正确。",example:`#include <stdio.h>

int twice(int n);
int twice(int n) { return 2 * n; }

int main(void) {
    printf("%d\\n", twice(6));
    return 0;
}
`,exampleOutput:"12",walkthrough:`按顺序执行上面的语句。原型末尾是分号，没有函数体；参数名可省略，但类型必须正确。
程序输出：12`,mistakes:["原型和定义的返回类型或参数类型不一致。","在函数尚未声明前调用，依赖旧式隐式声明。"],summary:"原型末尾是分号，没有函数体；参数名可省略，但类型必须正确。"},{id:"c7-7",chapter:7,index:6,en:"Recap Challenge #2",title:"函数综合练习二",objective:"组合辅助函数、循环和输入，解决数字问题。",explanation:["复合题可以拆成稳定的小步骤。处理数字时，经常用 %10 取出末位，再用 /10 去掉末位，把重复过程封装成一个函数。","先单独验证函数对 0、一位数、多位数的表现，再接入输入输出。明确输入范围能避免不必要的边界风险，例如本题只处理非负整数，不涉及 INT_MIN 的绝对值问题。"],syntax:`int digit = n % 10;
n /= 10;`,syntaxNotes:"每轮取末位，再把剩余数字缩短一位；n 降到 0 时结束。",example:`#include <stdio.h>

int digit_sum(int n) {
    int sum = 0;
    while (n > 0) { sum += n % 10; n /= 10; }
    return sum;
}

int main(void) {
    printf("%d\\n", digit_sum(204));
    return 0;
}
`,exampleOutput:"6",walkthrough:`按顺序执行上面的语句。每轮取末位，再把剩余数字缩短一位；n 降到 0 时结束。
程序输出：6`,mistakes:["用 n%10 后忘记 n/=10，循环不会结束。","没有考虑输入 0 时是否需要处理一位数字。"],summary:"每轮取末位，再把剩余数字缩短一位；n 降到 0 时结束。"}],nn={id:U,en:J,title:Q,description:X,lessons:Z},tn={"c7-1":{type:"single",question:"函数定义后会自动执行吗？",options:["不会，需要调用","会，编译时执行"],answer:["不会，需要调用"],explanation:"函数体在被调用时才运行；定义提供实现，调用启动实现。"},"c7-2":{type:"single",question:"int f(void) { return 7; } 调用 f() 会自动输出 7 吗？",options:["不会","会"],answer:["不会"],explanation:"return 传递值，打印需要额外调用 printf 或其他输出函数。"},"c7-3":{type:"single",question:"int x=3; change(x); 中 change 将形参改为 99，x 会变吗？",options:["不会，仍为 3","会变为 99"],answer:["不会，仍为 3"],explanation:"C 采用值传递，修改形参只改变函数内的副本。"},"c7-4":{type:"predict",question:"预测：is_even(-4) 返回多少？",answer:["1"],explanation:"-4 除以 2 的余数为 0，因此比较结果为真，也就是 1。"},"c7-5":{type:"fill",question:"fact(0) 应该返回多少？",answer:["1"],explanation:"0! 定义为 1，它也构成阶乘递归的终止条件。"},"c7-6":{type:"single",question:"哪个是声明“无参数且返回 int”的规范 C11 原型？",options:["int f(void);","int f();","void f(int);"],answer:["int f(void);"],explanation:"void 参数列表明确说明没有参数；空括号在 C11 的声明中不提供这种类型约束。"},"c7-7":{type:"fill",question:"数字 507 的各位和是多少？",answer:["12"],explanation:"5 + 0 + 7 = 12；中间的 0 不增加和值，但仍然占一位。"}},en={"c7-1":{title:"封装问候动作",difficulty:"进阶",description:"定义 void greet(void)，每次输出 Welcome，并在 main 中调用两次。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:`Welcome
Welcome`}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 定义 void greet(void)，每次输出 Welcome，并在 main 中调用两次
    
    return 0;
}
`,solution:`#include <stdio.h>

void greet(void) {
    puts("Welcome");
}

int main(void) {
    greet();
    greet();
    return 0;
}
`,hints:["定义一个无参数函数，并从 main 调用。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","将 greet 定义放在 main 前面，在 main 中连续写两次 greet();。"]},"c7-2":{title:"返回一个立方值",difficulty:"进阶",description:"定义 int cube(int n) 返回立方。输入 x（-20～20），输出 cube(x)。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3",output:"27"},{input:"0",output:"0"},{input:"-2",output:"-8"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 定义 int cube(int n) 返回立方
    
    return 0;
}
`,solution:`#include <stdio.h>

int cube(int n) {
    return n * n * n;
}

int main(void) {
    int x;
    if (scanf("%d", &x) != 1) { return 1; }
    printf("%d\\n", cube(x));
    return 0;
}
`,hints:["用 return 把计算结果交回调用处。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","int 指定结果类型；return 把乘积交给调用者并立即结束函数。"]},"c7-3":{title:"通过参数传入数据",difficulty:"进阶",description:"定义 int difference(int a,int b) 返回 a-b。读入 a、b（-1000～1000），输出函数结果。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"8 3",output:"5"},{input:"3 8",output:"-5"},{input:"0 0",output:"0"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 定义 int difference(int a,int b) 返回 a-b
    
    return 0;
}
`,solution:`#include <stdio.h>

int difference(int a, int b) { return a - b; }

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) { return 1; }
    printf("%d\\n", difference(a, b));
    return 0;
}
`,hints:["通过参数传入数据，理解 C 的值传递。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","a、b 是独立的局部形参；调用 add(3,5) 时获得 3、5 的副本。"]},"c7-4":{title:"封装区间判断",difficulty:"进阶",description:"定义 int in_range(int x,int low,int high)，判断 x 是否在闭区间内。输入 x low high，保证 low<=high，输出 0 或 1。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"5 1 10",output:"1"},{input:"1 1 10",output:"1"},{input:"11 1 10",output:"0"},{input:"-3 -5 -1",output:"1"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 定义 int in_range(int x,int low,int high)，判断 x 是否在闭区间内
    
    return 0;
}
`,solution:`#include <stdio.h>

int in_range(int x, int low, int high) {
    return x >= low && x <= high;
}

int main(void) {
    int x, low, high;
    if (scanf("%d %d %d", &x, &low, &high) != 3) { return 1; }
    printf("%d\\n", in_range(x, low, high));
    return 0;
}
`,hints:["把可重复的判断封装成有返回值的函数。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","返回比较结果 0 或 1，调用者决定如何使用或显示它。"]},"c7-5":{title:"递归累加",difficulty:"进阶",description:"用递归函数 sum_to 计算 1 到 n 的和。输入 n（0～100），n=0 时返回 0。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"4",output:"10"},{input:"0",output:"0"},{input:"10",output:"55"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 用递归函数 sum_to 计算 1 到 n 的和
    
    return 0;
}
`,solution:`#include <stdio.h>

int sum_to(int n) {
    if (n == 0) { return 0; }
    return n + sum_to(n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) { return 1; }
    printf("%d\\n", sum_to(n));
    return 0;
}
`,hints:["为递归设计终止条件和逐步缩小的问题。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","基本情况 n==0 返回 0；其他情况返回 n + sum_to(n-1)。"]},"c7-6":{title:"先声明再使用",difficulty:"进阶",description:"声明 int max_of(int a,int b)，定义该函数并返回较大值。读入两个整数，输出结果。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3 8",output:"8"},{input:"-2 -5",output:"-2"},{input:"7 7",output:"7"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 声明 int max_of(int a,int b)，定义该函数并返回较大值
    
    return 0;
}
`,solution:`#include <stdio.h>

int max_of(int a, int b);
int max_of(int a, int b) { return a > b ? a : b; }

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) { return 1; }
    printf("%d\\n", max_of(a, b));
    return 0;
}
`,hints:["在调用前声明函数接口，分离接口与定义。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","原型末尾是分号，没有函数体；参数名可省略，但类型必须正确。"]},"c7-7":{title:"把数字问题封装成函数",difficulty:"进阶",description:"定义 int digit_sum(int n)，输入 n（0～1000000），输出十进制各位数字之和。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"507",output:"12"},{input:"0",output:"0"},{input:"9999",output:"36"},{input:"1000000",output:"1"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 定义 int digit_sum(int n)，输入 n（0～1000000），输出十进制各位数字之和
    
    return 0;
}
`,solution:`#include <stdio.h>

int digit_sum(int n) {
    int sum = 0;
    while (n > 0) { sum += n % 10; n /= 10; }
    return sum;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) { return 1; }
    printf("%d\\n", digit_sum(n));
    return 0;
}
`,hints:["组合辅助函数、循环和输入，解决数字问题。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","每轮取末位，再把剩余数字缩短一位；n 降到 0 时结束。"]}},on=8,an="Arrays",sn="数组",un="组织一组数据，练习遍历与基础算法。",rn=[{id:"c8-1",chapter:8,index:0,en:"Declaring Arrays",title:"数组声明",objective:"声明同类型的连续元素，并正确初始化。",explanation:["数组像一排同样大小且连续编号的储物格，每一格保存相同类型的数据。int scores[3] 声明三个整数元素，编号从 0 开始。","初始化列表可以显式给值。int a[5]={1,2}; 会把剩余元素初始化为 0；而函数内没有初始化的普通数组，元素并不会自动归零。数组长度声明后不能通过赋值改变。"],syntax:"int scores[3] = {80, 90, 100};",syntaxNotes:"[3] 是元素个数；有效下标为 0、1、2；花括号列表依次初始化元素。",example:`#include <stdio.h>

int main(void) {
    int scores[3] = {80, 90, 100};
    printf("%d %d %d\\n", scores[0], scores[1], scores[2]);
    return 0;
}
`,exampleOutput:"80 90 100",walkthrough:`按顺序执行上面的语句。[3] 是元素个数；有效下标为 0、1、2；花括号列表依次初始化元素。
程序输出：80 90 100`,mistakes:["以为函数内 int a[3]; 默认全部为 0。","用 a=b 给整个数组赋值，标准 C 不支持这种数组赋值。"],summary:"[3] 是元素个数；有效下标为 0、1、2；花括号列表依次初始化元素。"},{id:"c8-2",chapter:8,index:1,en:"Accessing Elements",title:"访问数组元素",objective:"使用零起始下标，在有效范围内访问元素。",explanation:["数组的下标是从首元素开始的偏移：a[0] 是第一项，a[n-1] 是第 n 项。用循环访问时，继续条件通常写 i<n。","C 不会自动做数组越界检查。读取 a[n] 不会可靠地得到某个“额外值”，而是产生未定义行为。访问来自输入的下标前，应先检查范围。"],syntax:`for (int i = 0; i < n; i++) {
    printf("%d ", a[i]);
}`,syntaxNotes:"下标从 0 开始，严格小于元素个数；不能访问 a[n]。",example:`#include <stdio.h>

int main(void) {
    int a[3] = {10, 20, 30};
    printf("%d\\n", a[1]);
    return 0;
}
`,exampleOutput:"20",walkthrough:`按顺序执行上面的语句。下标从 0 开始，严格小于元素个数；不能访问 a[n]。
程序输出：20`,mistakes:["把 a[1] 当成第一项。","使用 i<=n，最后一轮越界访问 a[n]。"],summary:"下标从 0 开始，严格小于元素个数；不能访问 a[n]。"},{id:"c8-3",chapter:8,index:2,en:"Modifying Elements",title:"修改数组元素",objective:"通过下标读写同一元素，区分下标与元素值。",explanation:["a[i] 可以像普通变量一样被赋值。它选中的是下标 i 对应的那一个格子，修改不会自动影响其他格子。a[i]++ 增加元素，i++ 增加的是下标。","批量修改通常用循环。若操作依赖旧值，要先确认更新顺序不会覆盖后面仍然需要的数据；例如交换元素要借助临时变量。"],syntax:`int temp = a[0];
a[0] = a[1];
a[1] = temp;`,syntaxNotes:"temp 保存旧 a[0]，避免第一条赋值后丢失它。",example:`#include <stdio.h>

int main(void) {
    int a[2] = {3, 8};
    int temp = a[0];
    a[0] = a[1];
    a[1] = temp;
    printf("%d %d\\n", a[0], a[1]);
    return 0;
}
`,exampleOutput:"8 3",walkthrough:`按顺序执行上面的语句。temp 保存旧 a[0]，避免第一条赋值后丢失它。
程序输出：8 3`,mistakes:["交换时直接 a[0]=a[1]; a[1]=a[0];，旧值已经丢失。","修改 i 却以为修改了 a[i]。"],summary:"temp 保存旧 a[0]，避免第一条赋值后丢失它。"},{id:"c8-4",chapter:8,index:3,en:"Multidimensional Arrays",title:"多维数组",objective:"按行列访问二维数组，理解连续的行优先存储。",explanation:["二维数组像一张表格。int a[2][3] 有 2 行，每行 3 个 int。访问 a[r][c] 时，先选第 r 行，再选这一行的第 c 列。","C 按行优先顺序存储：第一行的元素连续排列后，再排列第二行。行和列都要独立检查范围；一维下标不越界并不能保证另一个也安全。"],syntax:"int grid[2][3] = {{1,2,3}, {4,5,6}};",syntaxNotes:"第一维是行数，第二维是列数；grid[1][2] 是第二行第三列。",example:`#include <stdio.h>

int main(void) {
    int grid[2][3] = {{1,2,3}, {4,5,6}};
    printf("%d\\n", grid[1][2]);
    return 0;
}
`,exampleOutput:"6",walkthrough:`按顺序执行上面的语句。第一维是行数，第二维是列数；grid[1][2] 是第二行第三列。
程序输出：6`,mistakes:["把行列下标写反。","用 <= 行数或 <= 列数作为边界，越界访问。"],summary:"第一维是行数，第二维是列数；grid[1][2] 是第二行第三列。"},{id:"c8-5",chapter:8,index:4,en:"Recap Challenge #1",title:"数组综合练习一",objective:"正确初始化最大值，并遍历所有元素。",explanation:["寻找最大值时，候选值应初始化为第一个真实元素。若默认设为 0，面对全是负数的数组，就会错误地返回数组里根本不存在的 0。","之后从第二项开始逐一比较：如果当前元素更大，就替换候选。每轮结束时，候选都是已经处理的前缀中的最大值，这个不变式能证明算法正确。"],syntax:`int max = a[0];
for (int i = 1; i < n; i++) {
    if (a[i] > max) { max = a[i]; }
}`,syntaxNotes:"n 至少为 1；第一项作为初值，后续元素依次竞争最大值。",example:`#include <stdio.h>

int main(void) {
    int a[3] = {-8, -2, -5};
    int max = a[0];
    for (int i = 1; i < 3; i++) { if (a[i] > max) { max = a[i]; } }
    printf("%d\\n", max);
    return 0;
}
`,exampleOutput:"-2",walkthrough:`按顺序执行上面的语句。n 至少为 1；第一项作为初值，后续元素依次竞争最大值。
程序输出：-2`,mistakes:["用 0 初始化最大值，无法处理全负数组。","在没有元素的数组上读取 a[0]。"],summary:"n 至少为 1；第一项作为初值，后续元素依次竞争最大值。"},{id:"c8-6",chapter:8,index:5,en:"Arrays as Function Arguments",title:"数组作为函数参数",objective:"把数组和长度一起传给函数。",explanation:["在函数形参中，int a[] 会调整为指向首元素的指针类型，并不会复制整个数组。因此在函数里修改 a[i] 会影响调用者的对应元素。这里只学习数组接口，不展开指针运算。","数组长度不会自动跟着传入，必须单独提供 n。函数内不能用 sizeof(a)/sizeof(a[0]) 推算原数组长度；参数 a 已经不是原来的数组对象。"],syntax:"int sum(const int a[], int n);",syntaxNotes:"const 表示函数不通过 a 修改元素；n 明确告诉函数有效元素个数。",example:`#include <stdio.h>

int sum(const int a[], int n) {
    int total = 0;
    for (int i = 0; i < n; i++) { total += a[i]; }
    return total;
}

int main(void) {
    int a[3] = {2, 4, 6};
    printf("%d\\n", sum(a, 3));
    return 0;
}
`,exampleOutput:"12",walkthrough:`按顺序执行上面的语句。const 表示函数不通过 a 修改元素；n 明确告诉函数有效元素个数。
程序输出：12`,mistakes:["以为数组形参会复制全部元素。","在函数内对形参使用 sizeof 来推算调用者数组的长度。"],summary:"const 表示函数不通过 a 修改元素；n 明确告诉函数有效元素个数。"},{id:"c8-7",chapter:8,index:6,en:"Array Algorithms",title:"数组算法",objective:"理解线性查找与冒泡排序的基本过程。",explanation:["线性查找按顺序检查每个元素，最坏要看 n 次，适合小数组或未排序数据。若找到目标就返回下标，否则返回 -1，用一个数组范围外的值表示没有找到。","冒泡排序通过反复比较相邻元素，把较大值逐轮推向右端。它简单但时间复杂度为 O(n²)，本课程的小输入可以使用，面对大数据应选择更高效的算法。"],syntax:`for (int i = 0; i < n; i++) {
    if (a[i] == target) { return i; }
}
return -1;`,syntaxNotes:"按下标递增顺序查找，首次匹配就返回，因此能定位第一次出现的位置。",example:`#include <stdio.h>

int find(const int a[], int n, int target) {
    for (int i = 0; i < n; i++) { if (a[i] == target) { return i; } }
    return -1;
}

int main(void) {
    int a[4] = {4, 7, 4, 9};
    printf("%d\\n", find(a, 4, 4));
    return 0;
}
`,exampleOutput:"0",walkthrough:`按顺序执行上面的语句。按下标递增顺序查找，首次匹配就返回，因此能定位第一次出现的位置。
程序输出：0`,mistakes:["查找循环结束后返回 n，却把 n 当成有效下标。","排序交换时没有保存临时值，丢掉一个元素。"],summary:"按下标递增顺序查找，首次匹配就返回，因此能定位第一次出现的位置。"},{id:"c8-8",chapter:8,index:7,en:"Recap Challenge #2",title:"数组综合练习二",objective:"用双向下标原地反转数组。",explanation:["反转不需要另建一个同样大小的数组。用 left 指向开头、right 指向结尾，交换两个位置，再同时向中间移动，直到两者相遇或交错。","每轮有两个元素就位，所以只需约 n/2 次交换。若一直交换到 n 次，后半段会把前面的工作再次反转，最终回到原样。奇数长度的中间项无需移动。"],syntax:`for (int left = 0, right = n - 1; left < right; left++, right--) {
    int t = a[left]; a[left] = a[right]; a[right] = t;
}`,syntaxNotes:"left<right 防止重复交换；右端下标应为 n-1，不能写 n。",example:`#include <stdio.h>

int main(void) {
    int a[4] = {1, 2, 3, 4};
    for (int l = 0, r = 3; l < r; l++, r--) { int t = a[l]; a[l] = a[r]; a[r] = t; }
    for (int i = 0; i < 4; i++) { printf("%d ", a[i]); }
    printf("\\n");
    return 0;
}
`,exampleOutput:"4 3 2 1",walkthrough:`按顺序执行上面的语句。left<right 防止重复交换；右端下标应为 n-1，不能写 n。
程序输出：4 3 2 1`,mistakes:["把右端初值设为 n，导致越界。","交换全部 n 对元素，把数组又反转回原样。"],summary:"left<right 防止重复交换；右端下标应为 n-1，不能写 n。"}],ln={id:on,en:an,title:sn,description:un,lessons:rn},dn={"c8-1":{type:"fill",question:"int a[4]={7}; 中 a[2] 的值是多少？",answer:["0"],explanation:"有初始化列表时，没有显式提供的剩余元素会被零初始化。"},"c8-2":{type:"fill",question:"长度为 5 的数组，最大合法下标是多少？",answer:["4"],explanation:"下标从 0 开始，因此最后一个元素的下标为长度减一。"},"c8-3":{type:"debug",question:"分析：a[0]=a[1]; a[1]=a[0]; 为什么不能交换？",options:["第一步覆盖了原来的 a[0]","数组不能修改","下标必须从 1 开始"],answer:["第一步覆盖了原来的 a[0]"],explanation:"第二步读取的是已经被覆盖的新 a[0]，需要临时变量保存旧值。"},"c8-4":{type:"single",question:"grid[1][0] 指的是哪一个位置？",options:["第二行第一列","第一行第二列","第二行第二列"],answer:["第二行第一列"],explanation:"两个下标都从 0 开始，第一个表示行，第二个表示列。"},"c8-5":{type:"fill",question:"数组 {-8,-2,-5} 的最大值是多少？",answer:["-2"],explanation:"最大值必须来自元素本身；-2 大于 -5 和 -8，不能返回不存在的 0。"},"c8-6":{type:"multi",question:"多选：正确的数组函数接口通常需要什么？",options:["元素的访问入口","有效元素个数","依赖 sizeof(a) 自动获得原长度"],answer:["元素的访问入口","有效元素个数"],explanation:"数组形参调整为指针，不携带原数组长度；长度需要通过参数或明确约定提供。"},"c8-7":{type:"single",question:"线性查找中返回 -1 通常表示什么？",options:["没有找到","第一个元素","最后一个元素"],answer:["没有找到"],explanation:"合法下标从 0 到 n-1，-1 作为明确的未命中标记。"},"c8-8":{type:"fill",question:"长度为 5 的数组原地反转，需要交换几对元素？",answer:["2"],explanation:"交换下标 0 与 4、1 与 3，中间下标 2 保持不变。"}},pn={"c8-1":{title:"创建并遍历数组",difficulty:"进阶",description:"声明长度为 4 的整数数组，初值为 2、4、6、8，输出四项总和。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"20"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 声明长度为 4 的整数数组，初值为 2、4、6、8，输出四项总和
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int a[4] = {2, 4, 6, 8};
    int sum = 0;
    for (int i = 0; i < 4; i++) { sum += a[i]; }
    printf("%d\\n", sum);
    return 0;
}
`,hints:["声明同类型的连续元素，并正确初始化。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","[3] 是元素个数；有效下标为 0、1、2；花括号列表依次初始化元素。"]},"c8-2":{title:"按下标查找",difficulty:"进阶",description:"输入 n（1～20）和 n 个整数，最后输入 k（0<=k<n），输出下标为 k 的元素。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3 10 20 30 1",output:"20"},{input:"1 -5 0",output:"-5"},{input:"4 2 4 6 8 3",output:"8"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（1～20）和 n 个整数，最后输入 k（0<=k<n），输出下标为 k 的元素
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n, a[20], k;
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 0; i < n; i++) { if (scanf("%d", &a[i]) != 1) { return 1; } }
    if (scanf("%d", &k) != 1) { return 1; }
    printf("%d\\n", a[k]);
    return 0;
}
`,hints:["使用零起始下标，在有效范围内访问元素。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","下标从 0 开始，严格小于元素个数；不能访问 a[n]。"]},"c8-3":{title:"批量修改元素",difficulty:"进阶",description:"输入 n（1～20）和 n 个整数，将每项乘以 2 后输出，值范围为 -100～100。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3 1 -2 4",output:"2 -4 8"},{input:"1 0",output:"0"},{input:"2 5 6",output:"10 12"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（1～20）和 n 个整数，将每项乘以 2 后输出，值范围为 -100～100
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n, a[20];
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 0; i < n; i++) { if (scanf("%d", &a[i]) != 1) { return 1; } }
    for (int i = 0; i < n; i++) { a[i] *= 2; printf("%d ", a[i]); }
    printf("\\n");
    return 0;
}
`,hints:["通过下标读写同一元素，区分下标与元素值。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","temp 保存旧 a[0]，避免第一条赋值后丢失它。"]},"c8-4":{title:"按行统计矩阵",difficulty:"进阶",description:"读入一个 2×3 的整数矩阵，按行输入，输出两行各自的总和。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"1 2 3 4 5 6",output:"6 15"},{input:"0 0 0 -1 -2 -3",output:"0 -6"},{input:"2 2 2 3 3 3",output:"6 9"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 读入一个 2×3 的整数矩阵，按行输入，输出两行各自的总和
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int a[2][3];
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) { if (scanf("%d", &a[r][c]) != 1) { return 1; } }
    }
    for (int r = 0; r < 2; r++) {
        int sum = 0;
        for (int c = 0; c < 3; c++) { sum += a[r][c]; }
        printf("%d ", sum);
    }
    printf("\\n");
    return 0;
}
`,hints:["按行列访问二维数组，理解连续的行优先存储。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","第一维是行数，第二维是列数；grid[1][2] 是第二行第三列。"]},"c8-5":{title:"同时找出最大值与最小值",difficulty:"进阶",description:"输入 n（1～20）和 n 个整数（-1000～1000），输出最大值和最小值。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3 -8 -2 -5",output:"-2 -8"},{input:"1 7",output:"7 7"},{input:"4 0 12 -3 12",output:"12 -3"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（1～20）和 n 个整数（-1000～1000），输出最大值和最小值
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n, a[20];
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 0; i < n; i++) { if (scanf("%d", &a[i]) != 1) { return 1; } }
    int max = a[0], min = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] > max) { max = a[i]; }
        if (a[i] < min) { min = a[i]; }
    }
    printf("%d %d\\n", max, min);
    return 0;
}
`,hints:["正确初始化最大值，并遍历所有元素。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","n 至少为 1；第一项作为初值，后续元素依次竞争最大值。"]},"c8-6":{title:"用函数处理数组",difficulty:"进阶",description:"定义 int count_positive(const int a[],int n)。读入 n（1～20）和 n 个整数，输出其中正数个数。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"4 -1 0 2 3",output:"2"},{input:"1 -4",output:"0"},{input:"3 1 1 1",output:"3"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 定义 int count_positive(const int a[],int n)
    
    return 0;
}
`,solution:`#include <stdio.h>

int count_positive(const int a[], int n) {
    int count = 0;
    for (int i = 0; i < n; i++) { if (a[i] > 0) { count++; } }
    return count;
}

int main(void) {
    int n, a[20];
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 0; i < n; i++) { if (scanf("%d", &a[i]) != 1) { return 1; } }
    printf("%d\\n", count_positive(a, n));
    return 0;
}
`,hints:["把数组和长度一起传给函数。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","const 表示函数不通过 a 修改元素；n 明确告诉函数有效元素个数。"]},"c8-7":{title:"实现升序排序",difficulty:"进阶",description:"输入 n（1～20）和 n 个整数，把它们从小到大排序后输出。可使用冒泡排序。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"4 4 1 3 2",output:"1 2 3 4"},{input:"1 -3",output:"-3"},{input:"5 2 -1 2 0 -1",output:"-1 -1 0 2 2"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（1～20）和 n 个整数，把它们从小到大排序后输出
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n, a[20];
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 0; i < n; i++) { if (scanf("%d", &a[i]) != 1) { return 1; } }
    for (int pass = 0; pass < n - 1; pass++) {
        for (int j = 0; j < n - 1 - pass; j++) {
            if (a[j] > a[j + 1]) { int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; }
        }
    }
    for (int i = 0; i < n; i++) { printf("%d ", a[i]); }
    printf("\\n");
    return 0;
}
`,hints:["理解线性查找与冒泡排序的基本过程。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","按下标递增顺序查找，首次匹配就返回，因此能定位第一次出现的位置。"]},"c8-8":{title:"原地反转数组",difficulty:"进阶",description:"输入 n（1～20）和 n 个整数，原地反转后按顺序输出。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"5 1 2 3 4 5",output:"5 4 3 2 1"},{input:"1 9",output:"9"},{input:"4 2 2 -1 0",output:"0 -1 2 2"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（1～20）和 n 个整数，原地反转后按顺序输出
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n, a[20];
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 0; i < n; i++) { if (scanf("%d", &a[i]) != 1) { return 1; } }
    for (int l = 0, r = n - 1; l < r; l++, r--) { int t = a[l]; a[l] = a[r]; a[r] = t; }
    for (int i = 0; i < n; i++) { printf("%d ", a[i]); }
    printf("\\n");
    return 0;
}
`,hints:["用双向下标原地反转数组。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","left<right 防止重复交换；右端下标应为 n-1，不能写 n。"]}},cn=9,fn="Final Challenges",mn="最终综合挑战",hn="把基础知识连起来，独立解决完整问题。",xn=[{id:"c9-1",chapter:9,index:0,en:"Grades",title:"成绩管理挑战",objective:"组合数组、统计和函数，完成成绩报告。",explanation:["成绩统计需要同时维护总分、最大值和及格人数。把输入存进数组后，可以多次遍历做不同分析，也可以在读入时一次完成统计。两种方式都要保证初值正确。","平均分需要在除法前转换为 double；最大值应从首个成绩初始化；及格条件使用 >=60。编程前先列出这些边界，比写完后反复猜测错误更高效。"],syntax:"double average = (double)sum / n;",syntaxNotes:"n 保证至少为 1；求和使用整数，在最后除法前转为 double。",example:`#include <stdio.h>

int main(void) {
    int a[4] = {50, 60, 90, 100};
    int sum = 0, max = a[0], passed = 0;
    for (int i = 0; i < 4; i++) {
        sum += a[i];
        if (a[i] > max) { max = a[i]; }
        if (a[i] >= 60) { passed++; }
    }
    printf("%.2f %d %d\\n", (double)sum / 4, max, passed);
    return 0;
}
`,exampleOutput:"75.00 100 3",walkthrough:`按顺序执行上面的语句。n 保证至少为 1；求和使用整数，在最后除法前转为 double。
程序输出：75.00 100 3`,mistakes:["先做整数除法再转换，平均分丢失小数。","把 60 分排除在及格人数之外。"],summary:"n 保证至少为 1；求和使用整数，在最后除法前转为 double。"},{id:"c9-2",chapter:9,index:1,en:"Peaks",title:"数组峰值挑战",objective:"根据相邻元素关系识别局部峰值。",explanation:["局部峰值比左右两个相邻元素都大，不一定是整个数组最大值。本题只考虑内部元素，因此第一项和最后一项都不算峰值。平台上相等的相邻元素也不能构成严格峰值。","遍历需要同时访问 a[i-1] 与 a[i+1]，所以 i 的范围应从 1 到 n-2。先根据访问范围推导循环边界，是避免越界的可靠方法。"],syntax:"a[i] > a[i - 1] && a[i] > a[i + 1]",syntaxNotes:"使用严格大于；有效 i 满足 1<=i<n-1；n<3 时没有内部元素。",example:`#include <stdio.h>

int main(void) {
    int a[5] = {1, 4, 2, 5, 3};
    int peaks = 0;
    for (int i = 1; i < 4; i++) {
        if (a[i] > a[i - 1] && a[i] > a[i + 1]) { peaks++; }
    }
    printf("%d\\n", peaks);
    return 0;
}
`,exampleOutput:"2",walkthrough:`按顺序执行上面的语句。使用严格大于；有效 i 满足 1<=i<n-1；n<3 时没有内部元素。
程序输出：2`,mistakes:["把两端点当成内部峰值，或访问不存在的邻居。","用 >= 把平台也算成严格峰值。"],summary:"使用严格大于；有效 i 满足 1<=i<n-1；n<3 时没有内部元素。"},{id:"c9-3",chapter:9,index:2,en:"TV",title:"综合编程挑战",objective:"用状态模拟、函数和数组完成频道操作统计。",explanation:["模拟题的核心是每条指令只更新规定的状态。把频道切换规则封装为函数，主循环负责读取指令，数组负责记录各频道的观看次数，职责就清楚了。","本题频道为 1～10，数组可以开 11 项并暂时不用第 0 项，让业务编号与下标一致。求最高观看次数时从小到大扫描，只有严格更大才更新，就自然保留最小频道的平局答案。"],syntax:`channel = next_channel(channel, direction);
views[channel]++;`,syntaxNotes:"+1 和 -1 切换频道并循环回绕；只有指令 0 增加当前频道观看次数。",example:`#include <stdio.h>

int next_channel(int channel, int direction) {
    if (direction == 1) { return channel == 10 ? 1 : channel + 1; }
    return channel == 1 ? 10 : channel - 1;
}

int main(void) {
    int channel = 1;
    channel = next_channel(channel, -1);
    printf("%d\\n", channel);
    return 0;
}
`,exampleOutput:"10",walkthrough:`按顺序执行上面的语句。+1 和 -1 切换频道并循环回绕；只有指令 0 增加当前频道观看次数。
程序输出：10`,mistakes:["切换频道时也增加观看次数，但题目要求只在 0 指令时记录。","用 >= 更新最高次数，平局时错误保留较大频道。"],summary:"+1 和 -1 切换频道并循环回绕；只有指令 0 增加当前频道观看次数。"}],bn={id:cn,en:fn,title:mn,description:hn,lessons:xn},yn={"c9-1":{type:"single",question:"成绩 60、61 的平均分与及格人数是？",options:["60.50 和 2","60.00 和 1","60.50 和 1"],answer:["60.50 和 2"],explanation:"平均分为 121/2=60.5；两项都满足 >=60。"},"c9-2":{type:"fill",question:"数组 1 3 3 1 有几个严格内部峰值？",answer:["0"],explanation:"两个 3 相等，任何一个都没有严格大于左右两邻居，因此不构成严格峰值。"},"c9-3":{type:"fill",question:"频道 1 执行 -1 切换指令后是几号频道？",answer:["10"],explanation:"频道向下切换时从 1 回绕到 10；向上则从 10 回绕到 1。"}},vn={"c9-1":{title:"生成成绩报告",difficulty:"综合",description:"输入 n（1～50）以及 n 个成绩（0～100）。输出平均分（两位小数）、最高分和及格人数（>=60），用空白分隔。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"4 50 60 90 100",output:"75.00 100 3"},{input:"1 0",output:"0.00 0 0"},{input:"2 60 61",output:"60.50 61 2"},{input:"3 59 59 59",output:"59.00 59 0"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（1～50）以及 n 个成绩（0～100）
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n, a[50], sum = 0, passed = 0;
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 0; i < n; i++) { if (scanf("%d", &a[i]) != 1) { return 1; } }
    int max = a[0];
    for (int i = 0; i < n; i++) {
        sum += a[i];
        if (a[i] > max) { max = a[i]; }
        if (a[i] >= 60) { passed++; }
    }
    printf("%.2f %d %d\\n", (double)sum / n, max, passed);
    return 0;
}
`,hints:["使用累加、最大值和条件计数三个基本模式。","先检查平均分是否在除法前转换了类型；再检查 >=60 的边界。","sum 从 0 开始、max 从 a[0] 开始、passed 从 0 开始，遍历一次后输出。"]},"c9-2":{title:"寻找严格局部峰值",difficulty:"综合",description:"输入 n（1～50）和 n 个整数。输出严格大于左右相邻值的内部元素个数。端点不计，相等不计。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"5 1 4 2 5 3",output:"2"},{input:"4 1 3 3 1",output:"0"},{input:"1 9",output:"0"},{input:"3 -5 -1 -4",output:"1"},{input:"5 5 4 3 2 1",output:"0"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入 n（1～50）和 n 个整数
    
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    int n, a[50], count = 0;
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 0; i < n; i++) { if (scanf("%d", &a[i]) != 1) { return 1; } }
    for (int i = 1; i < n - 1; i++) {
        if (a[i] > a[i - 1] && a[i] > a[i + 1]) { count++; }
    }
    printf("%d\\n", count);
    return 0;
}
`,hints:["需要比较相邻三个元素，只检查内部位置。","检查循环是否从 i=1 开始，并保证 i+1<n。","循环条件为 i<n-1；只有 a[i]>a[i-1] 且 a[i]>a[i+1] 时计数。"]},"c9-3":{title:"模拟频道遥控器",difficulty:"综合",description:"输入指令数 n（0～50），再输入 n 个指令。起始频道为 1，共 10 个频道。1 上一档（10 后回到 1），-1 下一档（1 前回到 10），0 记录观看当前频道一次。输出最终频道和观看次数最多的频道；并列选编号最小的，无观看记录时选 1。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"6 0 1 0 0 -1 0",output:"1 1"},{input:"3 -1 0 1",output:"1 10"},{input:"0",output:"1 1"},{input:"5 1 1 0 0 0",output:"3 3"},{input:"4 0 1 0 1",output:"3 1"}],starter:`#include <stdio.h>

int main(void) {
    // TODO: 输入指令数 n（0～50），再输入 n 个指令
    
    return 0;
}
`,solution:`#include <stdio.h>

int next_channel(int channel, int direction) {
    if (direction == 1) { return channel == 10 ? 1 : channel + 1; }
    return channel == 1 ? 10 : channel - 1;
}

int main(void) {
    int n, command, channel = 1, views[11] = {0};
    if (scanf("%d", &n) != 1) { return 1; }
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &command) != 1) { return 1; }
        if (command == 0) { views[channel]++; }
        else { channel = next_channel(channel, command); }
    }
    int best = 1;
    for (int c = 2; c <= 10; c++) { if (views[c] > views[best]) { best = c; } }
    printf("%d %d\\n", channel, best);
    return 0;
}
`,hints:["分别维护当前频道和 views[11] 观看计数。","注意频道回绕，切换不计观看，平局要选最小编号。","遍历指令更新状态；最后从频道 1 起扫描，只在 views[c]>views[best] 时更新 best。"]}},gn=Object.assign({},u,h,k,I,R,Y,tn,dn,yn),wn=Object.assign({},r,x,C,A,L,G,en,pn,vn),On=[s,m,O,_,F,M,nn,ln,bn].map(n=>({...n,lessons:n.lessons.map(t=>({...t,quiz:gn[t.id],challenge:wn[t.id]}))})),kn=On.flatMap(n=>n.lessons),Cn=Object.assign(Object.create(null),Object.fromEntries(kn.map(n=>[n.id,n]))),qn={1:{type:"debug",question:`下面的程序为什么没有输出数字 0？
int main(void) { return 0; }`,options:["return 传递退出状态，不负责输出","main 没有执行","0 不能被输出"],answer:["return 传递退出状态，不负责输出"],explanation:'return 0 向运行环境报告正常退出。若要输出 0，需要包含 stdio.h 并调用 printf("0");。'},2:{type:"predict",question:`预测输出：
double x = 11 / 4;
printf("%.2f", x);`,answer:["2.00"],explanation:"11 和 4 都是整数，先得到整数 2，再存入 double。要得到 2.75，应写 11.0/4 或 (double)11/4。"},3:{type:"predict",question:`预测输出：
printf("%d", -9 % 4);`,answer:["-1"],explanation:"C11 的整数商向零截断：-9/4 为 -2，因此 -9=(-2)*4+(-1)，余数为 -1。"},4:{type:"single",question:"判断 0<=x<=10 的正确 C 表达式是？",options:["x >= 0 && x <= 10","0 <= x <= 10","x >= 0 || x <= 10"],answer:["x >= 0 && x <= 10"],explanation:"两个边界必须同时满足，所以用逻辑与。连续关系比较会把前一次比较产生的 0 或 1 再与 10 比较。"},5:{type:"multi",question:"读入 double x 时，哪些处理正确？",options:["使用 %lf 和 &x","检查 scanf 返回值是否为 1","使用 %f 和 x"],answer:["使用 %lf 和 &x","检查 scanf 返回值是否为 1"],explanation:"scanf 需要 double* 与 %lf，返回值为 1 才代表转换成功。未读取成功时不能使用未初始化的 x。"},6:{type:"debug",question:"分析：int i=0; while(i<3) { if(i==0) continue; i++; }",options:["i 一直为 0，产生无限循环","恰好运行 3 次","continue 等同于 break"],answer:["i 一直为 0，产生无限循环"],explanation:"i==0 时 continue 跳过 i++，于是条件永远不改变。可在 continue 前更新，或改用更新不会被跳过的 for。"},7:{type:"boolean",question:"C11 中，修改函数的 int 形参会直接修改调用者的 int 实参。",options:["正确","错误"],answer:["错误"],explanation:"普通整数参数按值传递，形参是副本。可以返回新值并在调用处赋值。数组形参的行为另有不同。"},8:{type:"single",question:"求全负数组最大值，初始 max 应设为？",options:["第一个元素 a[0]","0","数组长度 n"],answer:["第一个元素 a[0]"],explanation:"候选最大值应来自真实元素（前提 n>=1）。0 可能比所有元素都大却根本不在数组中。"},9:{type:"fill",question:"数组 2 5 1 6 3 3 中有几个严格内部峰值？",answer:["2"],explanation:"5 比 2 和 1 都大，6 比 1 和 3 都大。相邻两个 3 不构成严格峰值，端点也不计。"}};export{Cn as a,On as c,kn as l,qn as r};
