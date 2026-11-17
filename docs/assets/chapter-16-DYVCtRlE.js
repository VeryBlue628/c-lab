const s=16,n="Preprocessing & Reference",t="预处理与常用速查",i="教材附录配套与扩展：头文件、宏、位运算及库函数。",e=[{id:"c16-1",chapter:16,index:0,title:"宏、头文件与条件编译",en:"Preprocessor Basics",textbook:"附录 D 配套扩展",objective:"使用宏计算一个整数的平方",explanation:["预处理先于 C 语法编译，#include 展开头文件，#define 做记号替换，#if、#ifdef 控制保留哪些内容。头文件保护宏用于避免同一头文件在一次编译中被重复处理；它不会替代多源文件正确组织定义的责任。","函数式宏不是普通函数，不会先把每个实参求值一次。表达式参数和整个展开体都应加括号，仍然不要把 n++ 等有副作用的表达式传给重复使用参数的宏。能用普通函数清晰表达时，优先使用函数获得类型检查。"],syntax:`#define SQUARE(x) ((x)*(x))
/* 不要写 SQUARE(n++) */`,syntaxNotes:"宏将无副作用的输入变量代入平方表达式；输入为 -1000..1000。",example:`#include <stdio.h>
#define SQUARE(x) ((x)*(x))
int main(void) {
    int n;if(scanf("%d",&n)!=1)return 1;
    printf("%d\\n",SQUARE(n));
    return 0;
}
`,exampleInput:"3",exampleOutput:`9
`,walkthrough:"宏将无副作用的输入变量代入平方表达式；输入为 -1000..1000。",mistakes:["宏可能重复展开实参，重复副作用可导致未定义行为；不要这样调用。","宏是记号替换，缺少括号时如 SQUARE(a+b) 可能产生错误表达式。"],summary:"使用宏计算一个整数的平方",quizzes:[{id:"c16-1-q1",type:"single",question:"为什么 SQUARE(x) 的参数和整体都要加括号？",options:["避免替换后运算符优先级改变含义","为了把宏变成递归函数","为了自动验证参数范围"],answer:["避免替换后运算符优先级改变含义"],explanation:"宏是记号替换，缺少括号时如 SQUARE(a+b) 可能产生错误表达式。"},{id:"c16-1-q2",type:"predict",question:`使用新的输入预测以下程序输出（可用空格分隔各行）。输入："-4"

#include <stdio.h>
#define SQUARE(x) ((x)*(x))
int main(void) {
    int n;if(scanf("%d",&n)!=1)return 1;
    printf("%d\\n",SQUARE(n));
    return 0;
}
`,answer:["16"],explanation:"请按照代码逐步跟踪新输入对应的分支与变量变化。该输入的输出为：16"},{id:"c16-1-q3",type:"boolean",question:"即使宏参数出现两次，SQUARE(n++) 也只会递增一次。",options:["正确","错误"],answer:["错误"],explanation:"宏可能重复展开实参，重复副作用可导致未定义行为；不要这样调用。"}],quiz:{id:"c16-1-q1",type:"single",question:"为什么 SQUARE(x) 的参数和整体都要加括号？",options:["避免替换后运算符优先级改变含义","为了把宏变成递归函数","为了自动验证参数范围"],answer:["避免替换后运算符优先级改变含义"],explanation:"宏是记号替换，缺少括号时如 SQUARE(a+b) 可能产生错误表达式。"},challenge:{id:"c16-1-practice",title:"宏参数的优先级",difficulty:"Medium",description:"定义 SQUARE(x) 宏，读入 n，计算并输出 SQUARE(n+1)。宏参数和整个替换体都要加括号。",input:"n 为 −1000..1000 的整数。",output:"按题目要求输出；每行以换行结束。空白、精度及文件要求见测试样例。",tests:[{input:"3",output:`16
`},{input:"-4",output:`9
`},{input:"0",output:`1
`},{input:"-1",output:`0
`}],starter:`#include <stdio.h>

/* 宏参数的优先级：请根据题意自行实现。 */
int main(void) {
    /* TODO */
    return 0;
}
`,solution:`#include <stdio.h>
#define SQUARE(x) ((x)*(x))
int main(void) {
    int n;if(scanf("%d",&n)!=1)return 1;
    printf("%d\\n",SQUARE(n+1));
    return 0;
}
`,hints:["替换后应当等价于 (n+1)*(n+1)。","先手算普通输入，再检查零值、边界或重复数据。示例展示的是原理，输出任务与本题不同。","将任务拆成输入、核心处理、输出三个步骤；检查题目列出的格式和方法要求。"],revision:2,structure:[{kind:"directive",name:"#define",label:"使用 #define 定义宏"},{kind:"call",name:"SQUARE",min:1,label:"调用 SQUARE（检查源码调用点）"}]}},{id:"c16-2",chapter:16,index:1,title:"无符号位运算",en:"Unsigned Bit Operations",textbook:"附录 C 配套扩展",objective:"统计一个 0..65535 无符号整数中值为 1 的二进制位数",explanation:["位运算按整数的二进制位工作：& 与、| 或、^ 异或、~ 取反，<< 和 >> 移位。它们与逻辑运算符 &&、|| 的含义和优先级不同。处理位模式时优先选用无符号整数，减少符号位和负数右移带来的实现差异。","移位次数必须小于提升后左操作数的位宽，不能为负。对于无符号数，右移补零，左移按该类型范围取模；有符号负数和溢出的移位不能照搬这种规律。表达式加上括号能清楚区分位判断与关系比较。"],syntax:"while(n){count+=(int)(n&1u);n>>=1;}",syntaxNotes:"每次取最低位再右移一位；输入范围 0..65535，零的计数为 0。",example:`#include <stdio.h>

int main(void) {
    unsigned n;if(scanf("%u",&n)!=1||n>65535u)return 1;
    int count=0;while(n){count+=(int)(n&1u);n>>=1;}
    printf("%d\\n",count);
    return 0;
}
`,exampleInput:"13",exampleOutput:`3
`,walkthrough:"每次取最低位再右移一位；输入范围 0..65535，零的计数为 0。",mistakes:["移位次数必须小于类型位宽，等于位宽也是未定义行为。","与掩码 1 做按位与，只保留最低位。"],summary:"统计一个 0..65535 无符号整数中值为 1 的二进制位数",quizzes:[{id:"c16-2-q1",type:"single",question:"无符号 n 的 n&1u 用来得到什么？",options:["n 的最高位","n 的十进制个位","n 的最低二进制位"],answer:["n 的最低二进制位"],explanation:"与掩码 1 做按位与，只保留最低位。"},{id:"c16-2-q2",type:"predict",question:`使用新的输入预测以下程序输出（可用空格分隔各行）。输入："0"

#include <stdio.h>

int main(void) {
    unsigned n;if(scanf("%u",&n)!=1||n>65535u)return 1;
    int count=0;while(n){count+=(int)(n&1u);n>>=1;}
    printf("%d\\n",count);
    return 0;
}
`,answer:["0"],explanation:"请按照代码逐步跟踪新输入对应的分支与变量变化。该输入的输出为：0"},{id:"c16-2-q3",type:"boolean",question:"把一个 32 位无符号整数右移 32 位在 C99 中保证得到零。",options:["正确","错误"],answer:["错误"],explanation:"移位次数必须小于类型位宽，等于位宽也是未定义行为。"}],quiz:{id:"c16-2-q1",type:"single",question:"无符号 n 的 n&1u 用来得到什么？",options:["n 的最高位","n 的十进制个位","n 的最低二进制位"],answer:["n 的最低二进制位"],explanation:"与掩码 1 做按位与，只保留最低位。"},challenge:{id:"c16-2-practice",title:"低十六位中的零",difficulty:"Medium",description:"使用无符号位运算统计整数低 16 位中值为 0 的位数。",input:"一个 0..65535 的无符号整数。",output:"按题目要求输出；每行以换行结束。空白、精度及文件要求见测试样例。",tests:[{input:"13",output:`13
`},{input:"0",output:`16
`},{input:"65535",output:`0
`},{input:"32768",output:`15
`},{input:"255",output:`8
`}],starter:`#include <stdio.h>

/* 低十六位中的零：请根据题意自行实现。 */
int main(void) {
    /* TODO */
    return 0;
}
`,solution:`#include <stdio.h>

int main(void) {
    unsigned n;if(scanf("%u",&n)!=1||n>65535u)return 1;
    int count=0;while(n){count+=(int)(n&1u);n>>=1;}
    printf("%d\\n",16-count);
    return 0;
}
`,hints:["固定考察 16 位，前导零也要计数。","先手算普通输入，再检查零值、边界或重复数据。示例展示的是原理，输出任务与本题不同。","将任务拆成输入、核心处理、输出三个步骤；检查题目列出的格式和方法要求。"],revision:2,structure:[{kind:"operator",name:"&",label:"使用按位与运算"}]}},{id:"c16-3",chapter:16,index:2,title:"字符分类与库函数接口",en:"Standard Library Practice",textbook:"附录 A—E",objective:"用 ctype.h 统计输入中的英文字母和数字",explanation:["查库函数时先确定头文件、原型、参数约束、返回值和失败条件，再决定如何使用。stdio.h 管理流，stdlib.h 管理分配与转换，string.h 处理字节和字符串，math.h 提供数学运算，ctype.h 提供字符分类；标准库不是 C 关键字的一部分。","isalpha、isdigit 等函数的参数必须是 EOF 或可表示为 unsigned char 的值。getchar 直接返回的有效字符值满足要求；若从可能带符号的 char 数组读取，应先转为 unsigned char。本题限定 ASCII 文本，不把 UTF-8 字节分类当成汉字分类。","C99 标准库属于标准规定的库接口，和语言关键字是两个层次；有宿主与独立环境支持要求不同。ctype 的真值只保证非零，不能拿 isalpha(ch)==1 判断字母。strlwr/strupr、getw/putw、open/read/write 不属于 ISO C99，大小写转换用 toupper/tolower 配合有效字节遍历。"],syntax:`int ch;
while((ch=getchar())!=EOF){
    if(isalpha(ch))letters++;
    if(isdigit(ch))digits++;
}`,syntaxNotes:"遍历标准输入到 EOF，输出字母数和数字数；两个独立计数均从零开始。",example:`#include <stdio.h>
#include <ctype.h>

int main(void) {
    int ch,letters=0,digits=0;
    while((ch=getchar())!=EOF){if(isalpha(ch))letters++;if(isdigit(ch))digits++;}
    printf("%d %d\\n",letters,digits);
    return 0;
}
`,exampleInput:"Ab 123!",exampleOutput:`2 3
`,walkthrough:"遍历标准输入到 EOF，输出字母数和数字数；两个独立计数均从零开始。",mistakes:["它们是标准库函数名称，原型来自相应头文件；关键字如 int、return 属于语言语法。","ctype 函数只接受 EOF 或 unsigned char 可表示的值，负的 char 值必须先转换。"],summary:"用 ctype.h 统计输入中的英文字母和数字",quizzes:[{id:"c16-3-q1",type:"single",question:"把 char 数组中的字节传给 isalpha 时，稳妥的写法是什么？",options:["isalpha(&c)","isalpha((unsigned char)c)","isalpha((signed char)c)"],answer:["isalpha((unsigned char)c)"],explanation:"ctype 函数只接受 EOF 或 unsigned char 可表示的值，负的 char 值必须先转换。"},{id:"c16-3-q2",type:"predict",question:`使用新的输入预测以下程序输出（可用空格分隔各行）。输入：""

#include <stdio.h>
#include <ctype.h>

int main(void) {
    int ch,letters=0,digits=0;
    while((ch=getchar())!=EOF){if(isalpha(ch))letters++;if(isdigit(ch))digits++;}
    printf("%d %d\\n",letters,digits);
    return 0;
}
`,answer:["0 0"],explanation:"请按照代码逐步跟踪新输入对应的分支与变量变化。该输入的输出为：0 0"},{id:"c16-3-q3",type:"boolean",question:"strlen、malloc、printf 都是 C99 关键字。",options:["正确","错误"],answer:["错误"],explanation:"它们是标准库函数名称，原型来自相应头文件；关键字如 int、return 属于语言语法。"}],quiz:{id:"c16-3-q1",type:"single",question:"把 char 数组中的字节传给 isalpha 时，稳妥的写法是什么？",options:["isalpha(&c)","isalpha((unsigned char)c)","isalpha((signed char)c)"],answer:["isalpha((unsigned char)c)"],explanation:"ctype 函数只接受 EOF 或 unsigned char 可表示的值，负的 char 值必须先转换。"},challenge:{id:"c16-3-practice",title:"空白与标点分类",difficulty:"Medium",description:"使用 ctype.h 统计输入中空白字符数和标点字符数，依次输出。",input:"最多 10000 个 ASCII 字符，可含多行或为空。",output:"按题目要求输出；每行以换行结束。空白、精度及文件要求见测试样例。",tests:[{input:"Ab 123!",output:`1 1
`},{input:"",output:`0 0
`},{input:`C99
lab`,output:`1 0
`},{input:` 	\r
.!_a9`,output:`4 3
`}],starter:`#include <stdio.h>

/* 空白与标点分类：请根据题意自行实现。 */
int main(void) {
    /* TODO */
    return 0;
}
`,solution:`#include <stdio.h>
#include <ctype.h>

int main(void) {
    int ch,letters=0,digits=0;
    while((ch=getchar())!=EOF){if(isspace(ch))letters++;if(ispunct(ch))digits++;}
    printf("%d %d\\n",letters,digits);
    return 0;
}
`,hints:["getchar 的结果可直接传入 ctype 函数；不要把 EOF 送入统计。","先手算普通输入，再检查零值、边界或重复数据。示例展示的是原理，输出任务与本题不同。","将任务拆成输入、核心处理、输出三个步骤；检查题目列出的格式和方法要求。"],revision:2,structure:[{kind:"call",name:"isspace",min:1,label:"调用 isspace（检查源码调用点）"},{kind:"call",name:"ispunct",min:1,label:"调用 ispunct（检查源码调用点）"}]}}],a={id:16,en:n,title:t,description:i,lessons:e};export{a as default,i as description,n as en,s as id,e as lessons,t as title};
