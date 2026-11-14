const e=JSON.parse(`[{"id":10,"en":"Algorithms & C99","title":"算法与 C99 补充","description":"教材第 1—5 章补充：算法表达、标准、类型和典型求解过程。","lessons":[{"id":"c10-1","chapter":10,"index":0,"title":"把算法画出来","en":"Representing Algorithms","textbook":"2.1—2.6","objective":"比较两个整数并输出较大值","explanation":["算法描述的是解决一类问题的有限步骤；程序还要选择数据的表示方式。一个算法允许零个或多个输入，必须产生输出；每一步应明确、可执行，并在有限步骤后结束。先写步骤再写代码，能把思路错误和语法错误分开。","同一个判断可用自然语言、流程图、N-S 图、伪代码和 C 表达。流程图用菱形表示条件，用箭头连接路径；N-S 图把选择和循环放进嵌套矩形，不依赖随意跳转。顺序、选择、循环组合出结构化程序，再把复杂任务逐层分解。"],"syntax":"伪代码：读入 a,b → 若 a>b 则输出 a，否则输出 b\\n流程图：开始 → 输入 → [a>b?] ┬是→输出 a→结束\\n                                  └否→输出 b→结束\\nN-S 图：┌ 读入 a,b ──────────┐\\n         ├ a>b：是 │ 否      ┤\\n         │ 输出 a  │ 输出 b  │\\n         └─────────┴─────────┘","syntaxNotes":"先定义输入与输出，再让两个分支各产生一个结果；相等时输出任意一个即可。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int a,b;\\n    if (scanf(\\"%d%d\\",&a,&b)!=2) return 1;\\n    printf(\\"%d\\\\n\\", a>b?a:b);\\n    return 0;\\n}\\n","exampleInput":"4 9","exampleOutput":"9\\n","walkthrough":"先定义输入与输出，再让两个分支各产生一个结果；相等时输出任意一个即可。","mistakes":["循环没有终止条件时不满足有穷性，不能只看某一步能执行。","有穷性要求算法结束，循环可以存在，但必须有终止依据。"],"summary":"比较两个整数并输出较大值","quizzes":[{"id":"c10-1-q1","type":"single","question":"哪个描述符合算法的有穷性？","options":["对允许的输入，有限步骤后结束","必须包含 for 语句","必须只有一个输入"],"answer":["对允许的输入，有限步骤后结束"],"explanation":"有穷性要求算法结束，循环可以存在，但必须有终止依据。"},{"id":"c10-1-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["9"],"explanation":"先定义输入与输出，再让两个分支各产生一个结果；相等时输出任意一个即可。"},{"id":"c10-1-q3","type":"boolean","question":"无限打印数字且没有终止条件，也满足算法的有穷性。","options":["正确","错误"],"answer":["错误"],"explanation":"循环没有终止条件时不满足有穷性，不能只看某一步能执行。"}],"quiz":{"id":"c10-1-q1","type":"single","question":"哪个描述符合算法的有穷性？","options":["对允许的输入，有限步骤后结束","必须包含 for 语句","必须只有一个输入"],"answer":["对允许的输入，有限步骤后结束"],"explanation":"有穷性要求算法结束，循环可以存在，但必须有终止依据。"},"challenge":{"id":"c10-1-practice","title":"比较两个整数并输出较大值","difficulty":"Easy","description":"比较两个整数并输出较大值。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"两个 int 范围内的整数 a、b。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"4 9","output":"9\\n"},{"input":"-2 -5","output":"-2\\n"},{"input":"7 7","output":"7\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 比较两个整数并输出较大值 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    int a,b;\\n    if (scanf(\\"%d%d\\",&a,&b)!=2) return 1;\\n    printf(\\"%d\\\\n\\", a>b?a:b);\\n    return 0;\\n}\\n","hints":["伪代码：读入 a,b → 若 a>b 则输出 a，否则输出 b","先定义输入与输出，再让两个分支各产生一个结果；相等时输出任意一个即可。","循环没有终止条件时不满足有穷性，不能只看某一步能执行。"]}},{"id":"c10-2","chapter":10,"index":1,"title":"用结构化步骤求最大公约数","en":"Euclidean Algorithm","textbook":"2.3、2.6、5.8","objective":"用辗转相除求两个正整数的最大公约数","explanation":["问题可以分解为读入、计算、输出三个部分。求最大公约数时，用 gcd(a,b)=gcd(b,a%b) 把规模缩小；当余数为零时，最后的非零除数就是答案。不要用没有依据的重复试算代替可说明的步骤。","跟踪 a、b、r 的表格，可以观察每次循环是否保持公约数不变。循环中先保存余数，再更新两个变量，避免前一次赋值覆盖后一步需要的数据。正整数条件也保证每次取模的除数非零。"],"syntax":"while (b != 0) { int r=a%b; a=b; b=r; }","syntaxNotes":"输入均为 1..1000000；b 递减到零后 a 为所求结果。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int a,b;\\n    if(scanf(\\"%d%d\\",&a,&b)!=2 || a<=0 || b<=0) return 1;\\n    while(b){int r=a%b; a=b; b=r;}\\n    printf(\\"%d\\\\n\\",a);\\n    return 0;\\n}\\n","exampleInput":"48 18","exampleOutput":"6\\n","walkthrough":"输入均为 1..1000000；b 递减到零后 a 为所求结果。","mistakes":["取余才保持公约数关系，整除的商不能替代余数。","赋值会改变变量当前值，后续表达式看到的是新值。临时变量明确保存旧值。"],"summary":"用辗转相除求两个正整数的最大公约数","quizzes":[{"id":"c10-2-q1","type":"single","question":"为什么先用 r 保存 a%b？","options":["为了把 int 变成浮点数","因为每个循环必须有三个变量","防止更新 a 后丢失原始数据"],"answer":["防止更新 a 后丢失原始数据"],"explanation":"赋值会改变变量当前值，后续表达式看到的是新值。临时变量明确保存旧值。"},{"id":"c10-2-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["6"],"explanation":"输入均为 1..1000000；b 递减到零后 a 为所求结果。"},{"id":"c10-2-q3","type":"boolean","question":"只要把 % 换成 /，算法仍然求最大公约数。","options":["正确","错误"],"answer":["错误"],"explanation":"取余才保持公约数关系，整除的商不能替代余数。"}],"quiz":{"id":"c10-2-q1","type":"single","question":"为什么先用 r 保存 a%b？","options":["为了把 int 变成浮点数","因为每个循环必须有三个变量","防止更新 a 后丢失原始数据"],"answer":["防止更新 a 后丢失原始数据"],"explanation":"赋值会改变变量当前值，后续表达式看到的是新值。临时变量明确保存旧值。"},"challenge":{"id":"c10-2-practice","title":"用辗转相除求两个正整数的最大公约数","difficulty":"Easy","description":"用辗转相除求两个正整数的最大公约数。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"两个 1..1000000 的正整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"48 18","output":"6\\n"},{"input":"17 13","output":"1\\n"},{"input":"25 25","output":"25\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 用辗转相除求两个正整数的最大公约数 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    int a,b;\\n    if(scanf(\\"%d%d\\",&a,&b)!=2 || a<=0 || b<=0) return 1;\\n    while(b){int r=a%b; a=b; b=r;}\\n    printf(\\"%d\\\\n\\",a);\\n    return 0;\\n}\\n","hints":["while (b != 0) { int r=a%b; a=b; b=r; }","输入均为 1..1000000；b 递减到零后 a 为所求结果。","取余才保持公约数关系，整除的商不能替代余数。"]}},{"id":"c10-3","chapter":10,"index":2,"title":"认识 C99 与编译过程","en":"C99 and the Build Pipeline","textbook":"1.1—1.6","objective":"输出当前 C 标准版本宏","explanation":["C 语言把源代码交给编译系统处理。通常先预处理头文件与宏，再编译、汇编得到目标文件，最后链接库和其他目标文件成为可执行程序。编译通过只说明语言和链接检查通过，算法是否正确还要用测试验证。","本网站使用 C99 模式。C99 支持 // 注释、块内混合声明、for 初始化声明、long long、_Bool 和标准头文件 stdbool.h；_Generic 和 _Static_assert 是后来的 C99 特性。本机的 ABI、终端和系统库可能与浏览器 WASI 环境不同。"],"syntax":"printf(\\"%ld\\\\n\\", (long)__STDC_VERSION__);","syntaxNotes":"C99 的 __STDC_VERSION__ 是 199901L；用 long 和 %ld 正确输出该宏。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    printf(\\"%ld\\\\n\\",(long)__STDC_VERSION__);\\n    return 0;\\n}\\n","exampleInput":"","exampleOutput":"199901\\n","walkthrough":"C99 的 __STDC_VERSION__ 是 199901L；用 long 和 %ld 正确输出该宏。","mistakes":["for(int i=0;...) 是 C99 支持的语法；C90 中不能这样写。","声明让编译器知道接口，链接时还需要找到函数定义或库实现。"],"summary":"输出当前 C 标准版本宏","quizzes":[{"id":"c10-3-q1","type":"single","question":"源文件使用已声明但未定义的外部函数，通常在哪一步失败？","options":["预处理删除注释时","链接阶段","运行第一条 printf 时"],"answer":["链接阶段"],"explanation":"声明让编译器知道接口，链接时还需要找到函数定义或库实现。"},{"id":"c10-3-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["199901"],"explanation":"C99 的 __STDC_VERSION__ 是 199901L；用 long 和 %ld 正确输出该宏。"},{"id":"c10-3-q3","type":"boolean","question":"C99 允许在 for 的初始化部分声明变量。","options":["正确","错误"],"answer":["正确"],"explanation":"for(int i=0;...) 是 C99 支持的语法；C90 中不能这样写。"}],"quiz":{"id":"c10-3-q1","type":"single","question":"源文件使用已声明但未定义的外部函数，通常在哪一步失败？","options":["预处理删除注释时","链接阶段","运行第一条 printf 时"],"answer":["链接阶段"],"explanation":"声明让编译器知道接口，链接时还需要找到函数定义或库实现。"},"challenge":{"id":"c10-3-practice","title":"输出当前 C 标准版本宏","difficulty":"Easy","description":"不硬编码版本号，用标准预定义宏输出正在使用的语言标准版本。","input":"无输入。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"","output":"199901\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 输出当前 C 标准版本宏 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    printf(\\"%ld\\\\n\\",(long)__STDC_VERSION__);\\n    return 0;\\n}\\n","hints":["printf(\\"%ld\\\\n\\", (long)__STDC_VERSION__);","C99 的 __STDC_VERSION__ 是 199901L；用 long 和 %ld 正确输出该宏。","for(int i=0;...) 是 C99 支持的语法；C90 中不能这样写。"]}},{"id":"c10-4","chapter":10,"index":3,"title":"常量类型、整数范围与 sizeof","en":"Integer Types and Literals","textbook":"3.2、3.3、附录 B","objective":"计算非负 long long 整数的加法","explanation":["整数常量的进制和后缀共同决定候选类型。10 是十进制，010 是八进制，0x10 是十六进制；U 表示无符号，LL 表示 long long。浮点常量默认 double，1.0f 才是 float。字符常量如 'A' 的类型在 C 中是 int。","C99 规定整数类型的最小表示范围，不要求所有机器的 int 都是 4 字节。sizeof 的结果是 size_t，printf 用 %zu；limits.h 可查询范围。无符号运算按模回绕，有符号溢出是未定义行为，因此先约束输入范围。"],"syntax":"long long n=10000000000LL;\\nprintf(\\"%lld %zu\\", n, sizeof n);","syntaxNotes":"本题每个加数为 0..1000000000000，和远小于 long long 的最小保证上界。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    long long a,b;\\n    if(scanf(\\"%lld%lld\\",&a,&b)!=2) return 1;\\n    printf(\\"%lld\\\\n\\",a+b);\\n    return 0;\\n}\\n","exampleInput":"10000000000 20","exampleOutput":"10000000020\\n","walkthrough":"本题每个加数为 0..1000000000000，和远小于 long long 的最小保证上界。","mistakes":["有符号整数溢出是未定义行为；先保证结果在可表示范围内。","sizeof 返回 size_t，%zu 是对应的 C99 输出格式，不能假定它等同于 int。"],"summary":"计算非负 long long 整数的加法","quizzes":[{"id":"c10-4-q1","type":"single","question":"C99 中 sizeof 表达式的结果应该用哪个格式输出？","options":["%zu","%d 总是正确","%f"],"answer":["%zu"],"explanation":"sizeof 返回 size_t，%zu 是对应的 C99 输出格式，不能假定它等同于 int。"},{"id":"c10-4-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["10000000020"],"explanation":"本题每个加数为 0..1000000000000，和远小于 long long 的最小保证上界。"},{"id":"c10-4-q3","type":"boolean","question":"有符号整数溢出一定会自动回到负数，并且可移植。","options":["正确","错误"],"answer":["错误"],"explanation":"有符号整数溢出是未定义行为；先保证结果在可表示范围内。"}],"quiz":{"id":"c10-4-q1","type":"single","question":"C99 中 sizeof 表达式的结果应该用哪个格式输出？","options":["%zu","%d 总是正确","%f"],"answer":["%zu"],"explanation":"sizeof 返回 size_t，%zu 是对应的 C99 输出格式，不能假定它等同于 int。"},"challenge":{"id":"c10-4-practice","title":"计算非负 long long 整数的加法","difficulty":"Easy","description":"计算非负 long long 整数的加法。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"两个 0..1000000000000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"10000000000 20","output":"10000000020\\n"},{"input":"0 0","output":"0\\n"},{"input":"999999999999 1","output":"1000000000000\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 计算非负 long long 整数的加法 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    long long a,b;\\n    if(scanf(\\"%lld%lld\\",&a,&b)!=2) return 1;\\n    printf(\\"%lld\\\\n\\",a+b);\\n    return 0;\\n}\\n","hints":["long long n=10000000000LL;","本题每个加数为 0..1000000000000，和远小于 long long 的最小保证上界。","有符号整数溢出是未定义行为；先保证结果在可表示范围内。"]}},{"id":"c10-5","chapter":10,"index":4,"title":"字符流与 EOF","en":"Character Streams","textbook":"3.5.5","objective":"用 getchar 统计一行或多行中的小写英文字母","explanation":["getchar 从标准输入读取一个字节，并以 int 返回字符值，读到末尾返回 EOF。用 char 保存结果可能把合法字节与 EOF 混淆，所以读取变量应为 int。这里按 ASCII 英文字母统计；一个 UTF-8 汉字通常占多个字节。","putchar 输出一个字符。字符、整数和字符编码相关但不同：'7' 是字符常量，7 是数值。先判断是否 EOF，再使用字符值；ctype.h 的分类函数只接受 EOF 或能表示为 unsigned char 的值。"],"syntax":"int ch;\\nwhile ((ch=getchar()) != EOF) { /* 处理一个字节 */ }","syntaxNotes":"用赋值外层的括号保证先保存返回值，再与 EOF 比较；输入结束后循环自然退出。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int ch,n=0;\\n    while((ch=getchar())!=EOF) if(ch>='a' && ch<='z') n++;\\n    printf(\\"%d\\\\n\\",n);\\n    return 0;\\n}\\n","exampleInput":"Abc 9!\\nxyz","exampleOutput":"5\\n","walkthrough":"用赋值外层的括号保证先保存返回值，再与 EOF 比较；输入结束后循环自然退出。","mistakes":["读取操作先报告失败，EOF 标志才置位；应使用读取函数的返回值控制循环。","int 可以区分返回的字节值和 EOF；char 的符号性和范围因实现而异。"],"summary":"用 getchar 统计一行或多行中的小写英文字母","quizzes":[{"id":"c10-5-q1","type":"single","question":"getchar 的返回值应先存入什么类型？","options":["char，因为输入是字符","float，可以保存 EOF","int"],"answer":["int"],"explanation":"int 可以区分返回的字节值和 EOF；char 的符号性和范围因实现而异。"},{"id":"c10-5-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["5"],"explanation":"用赋值外层的括号保证先保存返回值，再与 EOF 比较；输入结束后循环自然退出。"},{"id":"c10-5-q3","type":"boolean","question":"while(!feof(stdin)) 能避免最后一个字符被重复处理。","options":["正确","错误"],"answer":["错误"],"explanation":"读取操作先报告失败，EOF 标志才置位；应使用读取函数的返回值控制循环。"}],"quiz":{"id":"c10-5-q1","type":"single","question":"getchar 的返回值应先存入什么类型？","options":["char，因为输入是字符","float，可以保存 EOF","int"],"answer":["int"],"explanation":"int 可以区分返回的字节值和 EOF；char 的符号性和范围因实现而异。"},"challenge":{"id":"c10-5-practice","title":"用 getchar 统计一行或多行中的小写英文字母","difficulty":"Easy","description":"用 getchar 统计一行或多行中的小写英文字母。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"最多 10000 字节文本，读取到输入末尾。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"Abc 9!\\nxyz","output":"5\\n"},{"input":"ABC","output":"0\\n"},{"input":"","output":"0\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 用 getchar 统计一行或多行中的小写英文字母 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    int ch,n=0;\\n    while((ch=getchar())!=EOF) if(ch>='a' && ch<='z') n++;\\n    printf(\\"%d\\\\n\\",n);\\n    return 0;\\n}\\n","hints":["int ch;","用赋值外层的括号保证先保存返回值，再与 EOF 比较；输入结束后循环自然退出。","读取操作先报告失败，EOF 标志才置位；应使用读取函数的返回值控制循环。"]}},{"id":"c10-6","chapter":10,"index":5,"title":"格式控制与有效输入","en":"Formatted Input and Output","textbook":"3.5.3—3.5.4","objective":"把两个实数的平均值保留两位小数输出","explanation":["格式字符串是函数与实参之间的约定。printf 中 %f 接收经过提升的 double，scanf 中 %f 需要 float*、%lf 需要 double*；混用会以错误的方式访问内存。输入成功与否要看 scanf 返回的成功转换项数。","输出宽度是最小字段宽度，精度控制小数位或有效数字；%8.2f 表示至少八列、保留两位小数，%e 是科学计数法，%g 选择紧凑形式。计算中使用浮点值，最后输出时再做显示舍入。"],"syntax":"double x;\\nif(scanf(\\"%lf\\",&x)==1) printf(\\"%.2f\\\\n\\",x);","syntaxNotes":"输入两个 double，scanf 返回 2 后才计算；用 %.2f 控制最终显示的小数位数。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    double a,b;\\n    if(scanf(\\"%lf%lf\\",&a,&b)!=2) return 1;\\n    printf(\\"%.2f\\\\n\\",(a+b)/2.0);\\n    return 0;\\n}\\n","exampleInput":"1 2","exampleOutput":"1.50\\n","walkthrough":"输入两个 double，scanf 返回 2 后才计算；用 %.2f 控制最终显示的小数位数。","mistakes":["输出精度只改变显示方式，变量保存的值不会被 printf 修改。","%lf 与 double* 匹配；还应检查返回值是否为 1。"],"summary":"把两个实数的平均值保留两位小数输出","quizzes":[{"id":"c10-6-q1","type":"single","question":"scanf 读取 double 变量 x 应写什么？","options":["scanf(\\"%lf\\", x)","scanf(\\"%lf\\", &x)","scanf(\\"%f\\", &x)"],"answer":["scanf(\\"%lf\\", &x)"],"explanation":"%lf 与 double* 匹配；还应检查返回值是否为 1。"},{"id":"c10-6-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["1.50"],"explanation":"输入两个 double，scanf 返回 2 后才计算；用 %.2f 控制最终显示的小数位数。"},{"id":"c10-6-q3","type":"boolean","question":"printf 的 %.2f 会把变量本身永久修改成两位小数。","options":["正确","错误"],"answer":["错误"],"explanation":"输出精度只改变显示方式，变量保存的值不会被 printf 修改。"}],"quiz":{"id":"c10-6-q1","type":"single","question":"scanf 读取 double 变量 x 应写什么？","options":["scanf(\\"%lf\\", x)","scanf(\\"%lf\\", &x)","scanf(\\"%f\\", &x)"],"answer":["scanf(\\"%lf\\", &x)"],"explanation":"%lf 与 double* 匹配；还应检查返回值是否为 1。"},"challenge":{"id":"c10-6-practice","title":"把两个实数的平均值保留两位小数输出","difficulty":"Easy","description":"把两个实数的平均值保留两位小数输出。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"两个绝对值不超过 100000 的有限实数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"1 2","output":"1.50\\n"},{"input":"-3 5","output":"1.00\\n"},{"input":"0 0","output":"0.00\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 把两个实数的平均值保留两位小数输出 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    double a,b;\\n    if(scanf(\\"%lf%lf\\",&a,&b)!=2) return 1;\\n    printf(\\"%.2f\\\\n\\",(a+b)/2.0);\\n    return 0;\\n}\\n","hints":["double x;","输入两个 double，scanf 返回 2 后才计算；用 %.2f 控制最终显示的小数位数。","输出精度只改变显示方式，变量保存的值不会被 printf 修改。"]}},{"id":"c10-7","chapter":10,"index":6,"title":"提升、逗号与表达式求值","en":"Expression Evaluation","textbook":"3.3—3.4","objective":"使用逗号表达式更新后输出两个整数","explanation":["小整数参与算术运算前会发生整数提升，不同算术类型通常还要做通常算术转换。转换后再计算，最终赋值才转换为目标类型；把除法结果转成 double 不能补回整数除法已经丢失的小数。","逗号运算符先求左表达式，再求右表达式，整个表达式的值为右侧结果。函数实参之间的逗号只是分隔符，不提供同样的先后保证。C99 中同一变量在没有适当顺序保证的表达式里多次修改，可能导致未定义行为。"],"syntax":"a+=1, b+=a; /* 此处逗号是运算符 */","syntaxNotes":"a 先加一，再把更新后的 a 加到 b；输入绝对值均不超过 1000，不会溢出。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int a,b;\\n    if(scanf(\\"%d%d\\",&a,&b)!=2) return 1;\\n    a+=1,b+=a;\\n    printf(\\"%d %d\\\\n\\",a,b);\\n    return 0;\\n}\\n","exampleInput":"2 3","exampleOutput":"3 6\\n","walkthrough":"a 先加一，再把更新后的 a 加到 b；输入绝对值均不超过 1000，不会溢出。","mistakes":["函数实参没有这种顺序保证；不要在同一调用的实参中多次修改同一变量。","逗号运算符按顺序求值，以最后的表达式值作为整个表达式值。"],"summary":"使用逗号表达式更新后输出两个整数","quizzes":[{"id":"c10-7-q1","type":"single","question":"表达式 (1, 2, 3) 的值是什么？","options":["3","1","6"],"answer":["3"],"explanation":"逗号运算符按顺序求值，以最后的表达式值作为整个表达式值。"},{"id":"c10-7-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["3 6"],"explanation":"a 先加一，再把更新后的 a 加到 b；输入绝对值均不超过 1000，不会溢出。"},{"id":"c10-7-q3","type":"boolean","question":"printf(\\"%d %d\\", i++, i++) 在 C99 中保证从左到右更新 i。","options":["正确","错误"],"answer":["错误"],"explanation":"函数实参没有这种顺序保证；不要在同一调用的实参中多次修改同一变量。"}],"quiz":{"id":"c10-7-q1","type":"single","question":"表达式 (1, 2, 3) 的值是什么？","options":["3","1","6"],"answer":["3"],"explanation":"逗号运算符按顺序求值，以最后的表达式值作为整个表达式值。"},"challenge":{"id":"c10-7-practice","title":"使用逗号表达式更新后输出两个整数","difficulty":"Easy","description":"使用逗号表达式更新后输出两个整数。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"两个 -1000..1000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"2 3","output":"3 6\\n"},{"input":"0 0","output":"1 1\\n"},{"input":"-2 5","output":"-1 4\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 使用逗号表达式更新后输出两个整数 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    int a,b;\\n    if(scanf(\\"%d%d\\",&a,&b)!=2) return 1;\\n    a+=1,b+=a;\\n    printf(\\"%d %d\\\\n\\",a,b);\\n    return 0;\\n}\\n","hints":["a+=1, b+=a; /* 此处逗号是运算符 */","a 先加一，再把更新后的 a 加到 b；输入绝对值均不超过 1000，不会溢出。","函数实参没有这种顺序保证；不要在同一调用的实参中多次修改同一变量。"]}},{"id":"c10-8","chapter":10,"index":7,"title":"试除法判断素数","en":"Prime Testing","textbook":"5.8","objective":"判断 2..1000000 的整数是不是素数","explanation":["素数只有 1 和自身两个正因数。如果 n 有因数 a、b 且 a*b=n，那么至少一个因数不超过平方根，因此不必尝试到 n-1。程序可以遇到因数就结束计算，用明确的标志表示当前结论。","写 d*d<=n 看起来直接，但对较大 int 可能溢出。使用 d<=n/d 表达同一边界，前提是 n 和 d 都为正。循环边界必须包含平方根，否则完全平方数可能被错判。"],"syntax":"for(int d=2; d<=n/d; ++d)\\n    if(n%d==0) { prime=0; break; }","syntaxNotes":"初始化 prime 为 n>=2；一旦找到因数就将标志清零。输出 1 表示素数，0 表示合数或小于 2。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int n;\\n    if(scanf(\\"%d\\",&n)!=1) return 1;\\n    int prime=n>=2;\\n    for(int d=2;d<=n/d;++d) if(n%d==0){prime=0;break;}\\n    printf(\\"%d\\\\n\\",prime);\\n    return 0;\\n}\\n","exampleInput":"29","exampleOutput":"1\\n","walkthrough":"初始化 prime 为 n>=2；一旦找到因数就将标志清零。输出 1 表示素数，0 表示合数或小于 2。","mistakes":["素数定义要求大于 1，应先处理小于 2 的数。","例如 49 的非平凡小因数是 7；使用严格小于边界会漏掉它。"],"summary":"判断 2..1000000 的整数是不是素数","quizzes":[{"id":"c10-8-q1","type":"single","question":"试除法为什么必须检查平方根这个边界？","options":["因为素数都是奇数","因为除法不能使用 int","完全平方数可能只有平方根处才找到因数"],"answer":["完全平方数可能只有平方根处才找到因数"],"explanation":"例如 49 的非平凡小因数是 7；使用严格小于边界会漏掉它。"},{"id":"c10-8-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["1"],"explanation":"初始化 prime 为 n>=2；一旦找到因数就将标志清零。输出 1 表示素数，0 表示合数或小于 2。"},{"id":"c10-8-q3","type":"boolean","question":"1 是素数，因此 prime 应始终初始化为 1。","options":["正确","错误"],"answer":["错误"],"explanation":"素数定义要求大于 1，应先处理小于 2 的数。"}],"quiz":{"id":"c10-8-q1","type":"single","question":"试除法为什么必须检查平方根这个边界？","options":["因为素数都是奇数","因为除法不能使用 int","完全平方数可能只有平方根处才找到因数"],"answer":["完全平方数可能只有平方根处才找到因数"],"explanation":"例如 49 的非平凡小因数是 7；使用严格小于边界会漏掉它。"},"challenge":{"id":"c10-8-practice","title":"判断 2..1000000 的整数是不是素数","difficulty":"Easy","description":"判断 2..1000000 的整数是不是素数。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 1..1000000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"29","output":"1\\n"},{"input":"49","output":"0\\n"},{"input":"1","output":"0\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 判断 2..1000000 的整数是不是素数 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    int n;\\n    if(scanf(\\"%d\\",&n)!=1) return 1;\\n    int prime=n>=2;\\n    for(int d=2;d<=n/d;++d) if(n%d==0){prime=0;break;}\\n    printf(\\"%d\\\\n\\",prime);\\n    return 0;\\n}\\n","hints":["for(int d=2; d<=n/d; ++d)","初始化 prime 为 n>=2；一旦找到因数就将标志清零。输出 1 表示素数，0 表示合数或小于 2。","素数定义要求大于 1，应先处理小于 2 的数。"]}},{"id":"c10-9","chapter":10,"index":8,"title":"用迭代逼近平方根","en":"Numerical Iteration","textbook":"5.8","objective":"用牛顿迭代求正实数的平方根","explanation":["某些数值问题可以从一个初始近似值出发，反复修正。求 x 的平方根时令 t 的下一值为 (t+x/t)/2；两次近似足够接近时结束。浮点计算一般用误差阈值判断收敛，直接要求相等可能失去对误差的控制。","程序还要限制迭代次数，以免数值异常时一直循环。本题限定 x>0，初始值也为正，避免除零。将算法、停止条件、输入范围与输出精度一起设计，才能得到稳定的数值程序。"],"syntax":"next=(t+x/t)/2.0;\\nif(fabs(next-t)<1e-10) break;","syntaxNotes":"从 x>1?x:1 开始，最多迭代 100 次；输出保留四位小数。","example":"#include <stdio.h>\\n#include <math.h>\\n\\nint main(void) {\\n    double x; if(scanf(\\"%lf\\",&x)!=1 || x<=0) return 1;\\n    double t=x>1?x:1;\\n    for(int i=0;i<100;i++){double next=(t+x/t)/2; if(fabs(next-t)<1e-10){t=next;break;} t=next;}\\n    printf(\\"%.4f\\\\n\\",t);\\n    return 0;\\n}\\n","exampleInput":"2","exampleOutput":"1.4142\\n","walkthrough":"从 x>1?x:1 开始，最多迭代 100 次；输出保留四位小数。","mistakes":["t 为零会导致除零，必须先设计零输入分支或限定输入为正。","容差对应精度要求，还应加上最大迭代次数作为保护。"],"summary":"用牛顿迭代求正实数的平方根","quizzes":[{"id":"c10-9-q1","type":"single","question":"数值迭代通常用什么判断相邻近似足够接近？","options":["固定只做一次迭代","差的绝对值小于指定误差","一定要浮点值逐位相等"],"answer":["差的绝对值小于指定误差"],"explanation":"容差对应精度要求，还应加上最大迭代次数作为保护。"},{"id":"c10-9-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["1.4142"],"explanation":"从 x>1?x:1 开始，最多迭代 100 次；输出保留四位小数。"},{"id":"c10-9-q3","type":"boolean","question":"输入为零也可以直接套用任何初始值为零的 x/t 计算。","options":["正确","错误"],"answer":["错误"],"explanation":"t 为零会导致除零，必须先设计零输入分支或限定输入为正。"}],"quiz":{"id":"c10-9-q1","type":"single","question":"数值迭代通常用什么判断相邻近似足够接近？","options":["固定只做一次迭代","差的绝对值小于指定误差","一定要浮点值逐位相等"],"answer":["差的绝对值小于指定误差"],"explanation":"容差对应精度要求，还应加上最大迭代次数作为保护。"},"challenge":{"id":"c10-9-practice","title":"用牛顿迭代求正实数的平方根","difficulty":"Easy","description":"用牛顿迭代求正实数的平方根。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 0.0001..10000 的正实数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"2","output":"1.4142\\n"},{"input":"9","output":"3.0000\\n"},{"input":"0.25","output":"0.5000\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 用牛顿迭代求正实数的平方根 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <math.h>\\n\\nint main(void) {\\n    double x; if(scanf(\\"%lf\\",&x)!=1 || x<=0) return 1;\\n    double t=x>1?x:1;\\n    for(int i=0;i<100;i++){double next=(t+x/t)/2; if(fabs(next-t)<1e-10){t=next;break;} t=next;}\\n    printf(\\"%.4f\\\\n\\",t);\\n    return 0;\\n}\\n","hints":["next=(t+x/t)/2.0;","从 x>1?x:1 开始，最多迭代 100 次；输出保留四位小数。","t 为零会导致除零，必须先设计零输入分支或限定输入为正。"]}}]},{"id":11,"en":"Character Arrays & Strings","title":"字符数组与字符串","description":"教材第 6 章补充：终止符、安全输入与字符串处理。","lessons":[{"id":"c11-1","chapter":11,"index":0,"title":"字符数组不是普通文本盒子","en":"Null-Terminated Strings","textbook":"6.3.1—6.3.4","objective":"计算一个单词的长度","explanation":["C 字符串是以值为零的字符结束的 char 序列，终止符写作 \\\\0。char s[]=\\"cat\\" 实际分配四个元素，最后一个是终止符；字符数组如果没有终止符，就不能直接交给 strlen 或 %s。","数组容量和文本长度是不同的量：sizeof s 给出整个数组占用的字节数，strlen(s) 从起点读到终止符之前。读取单词时必须为最后的终止符留下一个位置，scanf 的字段宽度不包含自动追加的终止符。"],"syntax":"char s[81];\\nscanf(\\"%80s\\",s);\\nprintf(\\"%zu\\",strlen(s));","syntaxNotes":"容量为 81，最多读取 80 个非空白字节；长度不包含终止符。","example":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char s[81];\\n    if(scanf(\\"%80s\\",s)!=1) return 1;\\n    printf(\\"%zu\\\\n\\",strlen(s));\\n    return 0;\\n}\\n","exampleInput":"hello","exampleOutput":"5\\n","walkthrough":"容量为 81，最多读取 80 个非空白字节；长度不包含终止符。","mistakes":["strlen 只统计终止符之前的字节，不包含终止符本身。","三个可见字符后还有一个零终止符；数组容量必须容纳它。"],"summary":"计算一个单词的长度","quizzes":[{"id":"c11-1-q1","type":"single","question":"char s[]=\\"cat\\"; 的数组容量是多少个 char？","options":["4","3","取决于 strlen 的实现"],"answer":["4"],"explanation":"三个可见字符后还有一个零终止符；数组容量必须容纳它。"},{"id":"c11-1-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["5"],"explanation":"容量为 81，最多读取 80 个非空白字节；长度不包含终止符。"},{"id":"c11-1-q3","type":"boolean","question":"strlen 会统计字符串结束的 \\\\0。","options":["正确","错误"],"answer":["错误"],"explanation":"strlen 只统计终止符之前的字节，不包含终止符本身。"}],"quiz":{"id":"c11-1-q1","type":"single","question":"char s[]=\\"cat\\"; 的数组容量是多少个 char？","options":["4","3","取决于 strlen 的实现"],"answer":["4"],"explanation":"三个可见字符后还有一个零终止符；数组容量必须容纳它。"},"challenge":{"id":"c11-1-practice","title":"计算一个单词的长度","difficulty":"Easy","description":"计算一个单词的长度。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个不含空白、长度 1..80 的 ASCII 单词。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"hello","output":"5\\n"},{"input":"C","output":"1\\n"},{"input":"abc123","output":"6\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 计算一个单词的长度 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char s[81];\\n    if(scanf(\\"%80s\\",s)!=1) return 1;\\n    printf(\\"%zu\\\\n\\",strlen(s));\\n    return 0;\\n}\\n","hints":["char s[81];","容量为 81，最多读取 80 个非空白字节；长度不包含终止符。","strlen 只统计终止符之前的字节，不包含终止符本身。"]}},{"id":"c11-2","chapter":11,"index":1,"title":"读取含空格的一整行","en":"Safe Line Input","textbook":"6.3.5","objective":"读入一行并去掉行末换行后输出长度","explanation":["%s 遇到空白就停止，所以不能读取姓名或句子中的空格。fgets 指定缓冲区容量，最多存入容量减一的字符，再补上终止符；如果读到了换行，这个换行会保留在数组中。返回 NULL 时不能把缓冲区当成新读到的字符串使用。","可以用 strcspn 找到第一个换行并替换成终止符。puts 输出字符串后另加一个换行。gets 无法知道目标容量，不能用于安全程序；不要把它作为 fgets 的替代方法。长于缓冲区的行需要分段读取或明确拒绝。"],"syntax":"if(fgets(s,sizeof s,stdin))\\n    s[strcspn(s,\\"\\\\n\\")]='\\\\0';","syntaxNotes":"本题一行最多 80 字节，用容量 82 读取整行，然后删除末尾换行。","example":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char s[82];\\n    if(!fgets(s,sizeof s,stdin)) return 1;\\n    s[strcspn(s,\\"\\\\n\\")]='\\\\0';\\n    printf(\\"%zu\\\\n\\",strlen(s));\\n    return 0;\\n}\\n","exampleInput":"hello C\\n","exampleOutput":"7\\n","walkthrough":"本题一行最多 80 字节，用容量 82 读取整行，然后删除末尾换行。","mistakes":["gets 没有容量参数，会造成越界风险；课程使用 fgets 和有宽度的 scanf。","fgets 在容量允许时保留读到的换行，必要时由程序删除。"],"summary":"读入一行并去掉行末换行后输出长度","quizzes":[{"id":"c11-2-q1","type":"single","question":"fgets 成功读到换行时通常如何处理它？","options":["自动丢弃换行","把它替换成空格","保留在目标数组中"],"answer":["保留在目标数组中"],"explanation":"fgets 在容量允许时保留读到的换行，必要时由程序删除。"},{"id":"c11-2-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["7"],"explanation":"本题一行最多 80 字节，用容量 82 读取整行，然后删除末尾换行。"},{"id":"c11-2-q3","type":"boolean","question":"gets 和 fgets 一样能够根据缓冲区容量限制输入。","options":["正确","错误"],"answer":["错误"],"explanation":"gets 没有容量参数，会造成越界风险；课程使用 fgets 和有宽度的 scanf。"}],"quiz":{"id":"c11-2-q1","type":"single","question":"fgets 成功读到换行时通常如何处理它？","options":["自动丢弃换行","把它替换成空格","保留在目标数组中"],"answer":["保留在目标数组中"],"explanation":"fgets 在容量允许时保留读到的换行，必要时由程序删除。"},"challenge":{"id":"c11-2-practice","title":"读入一行并去掉行末换行后输出长度","difficulty":"Easy","description":"读入一行并去掉行末换行后输出长度。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一行 0..80 个 ASCII 字节，可含空格。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"hello C\\n","output":"7\\n"},{"input":"\\n","output":"0\\n"},{"input":"a b c","output":"5\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 读入一行并去掉行末换行后输出长度 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char s[82];\\n    if(!fgets(s,sizeof s,stdin)) return 1;\\n    s[strcspn(s,\\"\\\\n\\")]='\\\\0';\\n    printf(\\"%zu\\\\n\\",strlen(s));\\n    return 0;\\n}\\n","hints":["if(fgets(s,sizeof s,stdin))","本题一行最多 80 字节，用容量 82 读取整行，然后删除末尾换行。","gets 没有容量参数，会造成越界风险；课程使用 fgets 和有宽度的 scanf。"]}},{"id":"c11-3","chapter":11,"index":2,"title":"复制与连接字符串","en":"Copy and Concatenate","textbook":"6.3.6","objective":"用连字符连接两个短单词","explanation":["数组不能像普通变量一样用 = 在定义后整体复制。strcpy 把源字符串连同终止符复制到目标，strcat 找到目标末尾再追加源字符串。目标容量必须事先足够，两块参与复制的区域也不能重叠。","strncpy 不保证源长度达到限制时补上终止符，不能盲目把它当作安全版 strcpy。本题每个单词最多 30 字节，连接一个连字符再加终止符，容量 62 足够；实际项目应先根据长度验证目标容量。"],"syntax":"strcpy(out,a);\\nstrcat(out,\\"-\\");\\nstrcat(out,b);","syntaxNotes":"两段文本最长各 30 字节，最大结果长度 61，再留 1 字节给终止符。","example":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char a[31],b[31],out[62];\\n    if(scanf(\\"%30s%30s\\",a,b)!=2) return 1;\\n    strcpy(out,a);strcat(out,\\"-\\");strcat(out,b);\\n    puts(out);\\n    return 0;\\n}\\n","exampleInput":"red blue","exampleOutput":"red-blue\\n","walkthrough":"两段文本最长各 30 字节，最大结果长度 61，再留 1 字节给终止符。","mistakes":["strcpy 连同末尾的零字符一起复制，目标需要额外一个字符位置。","strcat 从目标原终止符处继续写入，目标必须已经是有效字符串且可写。"],"summary":"用连字符连接两个短单词","quizzes":[{"id":"c11-3-q1","type":"single","question":"strcat 的目标数组在调用前必须满足什么条件？","options":["只要指针非 NULL 就能连接","已有终止符且剩余容量足够","可以没有终止符"],"answer":["已有终止符且剩余容量足够"],"explanation":"strcat 从目标原终止符处继续写入，目标必须已经是有效字符串且可写。"},{"id":"c11-3-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["red-blue"],"explanation":"两段文本最长各 30 字节，最大结果长度 61，再留 1 字节给终止符。"},{"id":"c11-3-q3","type":"boolean","question":"strcpy 只复制可见字符，不复制终止符。","options":["正确","错误"],"answer":["错误"],"explanation":"strcpy 连同末尾的零字符一起复制，目标需要额外一个字符位置。"}],"quiz":{"id":"c11-3-q1","type":"single","question":"strcat 的目标数组在调用前必须满足什么条件？","options":["只要指针非 NULL 就能连接","已有终止符且剩余容量足够","可以没有终止符"],"answer":["已有终止符且剩余容量足够"],"explanation":"strcat 从目标原终止符处继续写入，目标必须已经是有效字符串且可写。"},"challenge":{"id":"c11-3-practice","title":"用连字符连接两个短单词","difficulty":"Easy","description":"用连字符连接两个短单词。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"两个 1..30 字节、无空白的 ASCII 单词。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"red blue","output":"red-blue\\n"},{"input":"a z","output":"a-z\\n"},{"input":"C 99","output":"C-99\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 用连字符连接两个短单词 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char a[31],b[31],out[62];\\n    if(scanf(\\"%30s%30s\\",a,b)!=2) return 1;\\n    strcpy(out,a);strcat(out,\\"-\\");strcat(out,b);\\n    puts(out);\\n    return 0;\\n}\\n","hints":["strcpy(out,a);","两段文本最长各 30 字节，最大结果长度 61，再留 1 字节给终止符。","strcpy 连同末尾的零字符一起复制，目标需要额外一个字符位置。"]}},{"id":"c11-4","chapter":11,"index":3,"title":"按内容比较字符串","en":"Lexicographic Comparison","textbook":"6.3.6","objective":"比较两个单词并输出 -1、0 或 1","explanation":["字符串变量在表达式中通常转换成首元素指针，直接写 a==b 比较的是地址，不能判断内容。strcmp 逐字节比较两个以零结尾的字符串，遇到第一个不同字节或末尾时得出结果。","strcmp 返回负数、零或正数，不保证只返回 -1、0、1。要按指定格式输出时先判断结果的符号。比较大小按字符编码顺序进行，不等于自然语言中的拼音或词典排序；本题限制为小写英文字母。"],"syntax":"int r=strcmp(a,b);\\nprintf(\\"%d\\", (r>0)-(r<0));","syntaxNotes":"相同输出 0，前者较小输出 -1，前者较大输出 1；只依赖返回值符号。","example":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char a[41],b[41];\\n    if(scanf(\\"%40s%40s\\",a,b)!=2) return 1;\\n    int r=strcmp(a,b);\\n    printf(\\"%d\\\\n\\",(r>0)-(r<0));\\n    return 0;\\n}\\n","exampleInput":"apple banana","exampleOutput":"-1\\n","walkthrough":"相同输出 0，前者较小输出 -1，前者较大输出 1；只依赖返回值符号。","mistakes":["数组转换成指针后，== 比较地址，比较内容应使用 strcmp。","标准只规定返回值的正负与相等关系，不规定差值大小。"],"summary":"比较两个单词并输出 -1、0 或 1","quizzes":[{"id":"c11-4-q1","type":"single","question":"strcmp(a,b) 返回 -12 时说明什么？","options":["a 按字节序小于 b","a 的长度恰好少 12","调用失败"],"answer":["a 按字节序小于 b"],"explanation":"标准只规定返回值的正负与相等关系，不规定差值大小。"},{"id":"c11-4-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["-1"],"explanation":"相同输出 0，前者较小输出 -1，前者较大输出 1；只依赖返回值符号。"},{"id":"c11-4-q3","type":"boolean","question":"两个不同数组保存相同文本时，a==b 一定为真。","options":["正确","错误"],"answer":["错误"],"explanation":"数组转换成指针后，== 比较地址，比较内容应使用 strcmp。"}],"quiz":{"id":"c11-4-q1","type":"single","question":"strcmp(a,b) 返回 -12 时说明什么？","options":["a 按字节序小于 b","a 的长度恰好少 12","调用失败"],"answer":["a 按字节序小于 b"],"explanation":"标准只规定返回值的正负与相等关系，不规定差值大小。"},"challenge":{"id":"c11-4-practice","title":"比较两个单词并输出 -1、0 或 1","difficulty":"Easy","description":"比较两个单词并输出 -1、0 或 1。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"两个 1..40 个小写英文字母组成的单词。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"apple banana","output":"-1\\n"},{"input":"cat cat","output":"0\\n"},{"input":"zoo a","output":"1\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 比较两个单词并输出 -1、0 或 1 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char a[41],b[41];\\n    if(scanf(\\"%40s%40s\\",a,b)!=2) return 1;\\n    int r=strcmp(a,b);\\n    printf(\\"%d\\\\n\\",(r>0)-(r<0));\\n    return 0;\\n}\\n","hints":["int r=strcmp(a,b);","相同输出 0，前者较小输出 -1，前者较大输出 1；只依赖返回值符号。","数组转换成指针后，== 比较地址，比较内容应使用 strcmp。"]}},{"id":"c11-5","chapter":11,"index":4,"title":"亲手遍历字符串","en":"String Processing","textbook":"6.3.7","objective":"反转一个不含空格的字符串","explanation":["熟悉库函数之后，也要能写出对字符数组的遍历。字符串终止符提供长度边界；修改字符时不能把终止符覆盖成普通字符，也不能访问容量之外的位置。反转只需交换两端，逐步向中间推进。","空字符串会让 length-1 在无符号类型中下溢，所以循环条件应明确处理长度。这里先取长度，循环 i<n/2，再访问 n-1-i，只有长度至少为 2 才会进入交换。数组仍保留原来的末尾终止符。"],"syntax":"for(size_t i=0;i<n/2;i++){\\n    char t=s[i];s[i]=s[n-1-i];s[n-1-i]=t;\\n}","syntaxNotes":"每次交换一对对称位置，最多处理一半字符；最后由 puts 输出一个换行。","example":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char s[81];if(scanf(\\"%80s\\",s)!=1)return 1;\\n    size_t n=strlen(s);\\n    for(size_t i=0;i<n/2;i++){char t=s[i];s[i]=s[n-1-i];s[n-1-i]=t;}\\n    puts(s);\\n    return 0;\\n}\\n","exampleInput":"abcd","exampleOutput":"dcba\\n","walkthrough":"每次交换一对对称位置，最多处理一半字符；最后由 puts 输出一个换行。","mistakes":["终止符标记结束位置，不参与可见字符的反转。","若处理全部位置，后半轮会把之前的交换再换回来。"],"summary":"反转一个不含空格的字符串","quizzes":[{"id":"c11-5-q1","type":"single","question":"为什么反转时只循环到 n/2？","options":["因为后半部分不可写","因为终止符算作一个字符","每次交换已经同时处理两端"],"answer":["每次交换已经同时处理两端"],"explanation":"若处理全部位置，后半轮会把之前的交换再换回来。"},{"id":"c11-5-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["dcba"],"explanation":"每次交换一对对称位置，最多处理一半字符；最后由 puts 输出一个换行。"},{"id":"c11-5-q3","type":"boolean","question":"反转时应该把末尾终止符和第一个字符交换。","options":["正确","错误"],"answer":["错误"],"explanation":"终止符标记结束位置，不参与可见字符的反转。"}],"quiz":{"id":"c11-5-q1","type":"single","question":"为什么反转时只循环到 n/2？","options":["因为后半部分不可写","因为终止符算作一个字符","每次交换已经同时处理两端"],"answer":["每次交换已经同时处理两端"],"explanation":"若处理全部位置，后半轮会把之前的交换再换回来。"},"challenge":{"id":"c11-5-practice","title":"反转一个不含空格的字符串","difficulty":"Easy","description":"反转一个不含空格的字符串。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 1..80 字节的 ASCII 单词。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"abcd","output":"dcba\\n"},{"input":"x","output":"x\\n"},{"input":"level","output":"level\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 反转一个不含空格的字符串 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char s[81];if(scanf(\\"%80s\\",s)!=1)return 1;\\n    size_t n=strlen(s);\\n    for(size_t i=0;i<n/2;i++){char t=s[i];s[i]=s[n-1-i];s[n-1-i]=t;}\\n    puts(s);\\n    return 0;\\n}\\n","hints":["for(size_t i=0;i<n/2;i++){","每次交换一对对称位置，最多处理一半字符；最后由 puts 输出一个换行。","终止符标记结束位置，不参与可见字符的反转。"]}}]},{"id":12,"en":"Scope & Modular Programs","title":"函数、作用域与模块","description":"教材第 7 章补充：生存期、链接属性、多文件和二维数组形参。","lessons":[{"id":"c12-1","chapter":12,"index":0,"title":"局部、全局与遮蔽","en":"Scope and Shadowing","textbook":"7.8","objective":"观察局部变量和全局变量的独立变化","explanation":["作用域决定标识符在源代码哪些位置可见。函数体内定义的变量是局部变量，文件作用域的变量通常称为全局变量；内层同名声明会遮蔽外层名称，但不会删除外层对象。优先使用清楚的名称和显式参数，减少意外共享状态。","函数参数也属于局部变量。把数据作为参数传递比隐式读写全局变量更容易测试。本例特意使用同名变量观察遮蔽：main 中的 value 与 show 中访问的文件作用域 value 是两个对象，修改前者不会改变后者。"],"syntax":"int value=10;\\nvoid show(void){ printf(\\"%d\\",value); }","syntaxNotes":"先打印 main 中读入的局部 value，再调用 show 打印全局的固定值 10。","example":"#include <stdio.h>\\nint value=10;\\nstatic void show(void){printf(\\"%d\\\\n\\",value); }\\nint main(void) {\\n    int value; if(scanf(\\"%d\\",&value)!=1)return 1;\\n    printf(\\"%d \\",value);show();\\n    return 0;\\n}\\n","exampleInput":"7","exampleOutput":"7 10\\n","walkthrough":"先打印 main 中读入的局部 value，再调用 show 打印全局的固定值 10。","mistakes":["局部名称只在相应作用域可见，跨函数传递应使用参数或合适的接口。","名称查找选择内层可见声明，不改变外层对象的生存期。"],"summary":"观察局部变量和全局变量的独立变化","quizzes":[{"id":"c12-1-q1","type":"single","question":"内层定义同名变量后，外层对象会怎样？","options":["仍然存在，但同名引用暂时被遮蔽","被自动销毁","与内层变量自动合并"],"answer":["仍然存在，但同名引用暂时被遮蔽"],"explanation":"名称查找选择内层可见声明，不改变外层对象的生存期。"},{"id":"c12-1-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["7 10"],"explanation":"先打印 main 中读入的局部 value，再调用 show 打印全局的固定值 10。"},{"id":"c12-1-q3","type":"boolean","question":"一个函数的局部变量可以直接被另一个无关函数按名称访问。","options":["正确","错误"],"answer":["错误"],"explanation":"局部名称只在相应作用域可见，跨函数传递应使用参数或合适的接口。"}],"quiz":{"id":"c12-1-q1","type":"single","question":"内层定义同名变量后，外层对象会怎样？","options":["仍然存在，但同名引用暂时被遮蔽","被自动销毁","与内层变量自动合并"],"answer":["仍然存在，但同名引用暂时被遮蔽"],"explanation":"名称查找选择内层可见声明，不改变外层对象的生存期。"},"challenge":{"id":"c12-1-practice","title":"观察局部变量和全局变量的独立变化","difficulty":"Easy","description":"观察局部变量和全局变量的独立变化。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 -1000..1000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"7","output":"7 10\\n"},{"input":"-2","output":"-2 10\\n"},{"input":"10","output":"10 10\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 观察局部变量和全局变量的独立变化 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nint value=10;\\nstatic void show(void){printf(\\"%d\\\\n\\",value); }\\nint main(void) {\\n    int value; if(scanf(\\"%d\\",&value)!=1)return 1;\\n    printf(\\"%d \\",value);show();\\n    return 0;\\n}\\n","hints":["int value=10;","先打印 main 中读入的局部 value，再调用 show 打印全局的固定值 10。","局部名称只在相应作用域可见，跨函数传递应使用参数或合适的接口。"]}},{"id":"c12-2","chapter":12,"index":1,"title":"存储类别和生存期","en":"Storage Duration","textbook":"7.9","objective":"调用带 static 计数器的函数 n 次","explanation":["生存期决定对象在运行时存在多久。通常的块内变量具有自动存储期，每次进入块建立；static 局部变量具有静态存储期，整个程序运行期间存在，只初始化一次。没有显式初始化的静态存储期对象会被零初始化。","auto 显式说明自动存储类别，但平时一般省略；register 是优化建议，不保证放进寄存器，而且不能对 register 对象取地址。作用域和生存期要分开：static 局部变量仍只在块内可见，保存值并不使它成为全局名称。"],"syntax":"int tick(void){static int n=0;return ++n;}","syntaxNotes":"调用次数 n 为 1..20，函数内计数器保留上一次的值，每次返回加一后的值。","example":"#include <stdio.h>\\nstatic int tick(void){static int n=0;return ++n;}\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1 || n<1 || n>20)return 1;\\n    for(int i=0;i<n;i++)printf(\\"%s%d\\",i?\\" \\":\\"\\",tick());\\n    putchar('\\\\n');\\n    return 0;\\n}\\n","exampleInput":"3","exampleOutput":"1 2 3\\n","walkthrough":"调用次数 n 为 1..20，函数内计数器保留上一次的值，每次返回加一后的值。","mistakes":["register 只是允许编译器考虑的建议，不能据此推断实际硬件位置。","静态存储期贯穿整个程序，但名称作用域仍是所在块。"],"summary":"调用带 static 计数器的函数 n 次","quizzes":[{"id":"c12-2-q1","type":"single","question":"static 局部变量在函数返回后会怎样？","options":["每次返回都销毁","变成所有函数可见的名称","对象继续存在并保留值"],"answer":["对象继续存在并保留值"],"explanation":"静态存储期贯穿整个程序，但名称作用域仍是所在块。"},{"id":"c12-2-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["1 2 3"],"explanation":"调用次数 n 为 1..20，函数内计数器保留上一次的值，每次返回加一后的值。"},{"id":"c12-2-q3","type":"boolean","question":"C99 的 register 声明保证对象必定位于 CPU 寄存器。","options":["正确","错误"],"answer":["错误"],"explanation":"register 只是允许编译器考虑的建议，不能据此推断实际硬件位置。"}],"quiz":{"id":"c12-2-q1","type":"single","question":"static 局部变量在函数返回后会怎样？","options":["每次返回都销毁","变成所有函数可见的名称","对象继续存在并保留值"],"answer":["对象继续存在并保留值"],"explanation":"静态存储期贯穿整个程序，但名称作用域仍是所在块。"},"challenge":{"id":"c12-2-practice","title":"调用带 static 计数器的函数 n 次","difficulty":"Easy","description":"调用带 static 计数器的函数 n 次。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 1..20 的整数 n。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"3","output":"1 2 3\\n"},{"input":"1","output":"1\\n"},{"input":"5","output":"1 2 3 4 5\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 调用带 static 计数器的函数 n 次 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nstatic int tick(void){static int n=0;return ++n;}\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1 || n<1 || n>20)return 1;\\n    for(int i=0;i<n;i++)printf(\\"%s%d\\",i?\\" \\":\\"\\",tick());\\n    putchar('\\\\n');\\n    return 0;\\n}\\n","hints":["int tick(void){static int n=0;return ++n;}","调用次数 n 为 1..20，函数内计数器保留上一次的值，每次返回加一后的值。","register 只是允许编译器考虑的建议，不能据此推断实际硬件位置。"]}},{"id":"c12-3","chapter":12,"index":2,"title":"声明、定义与跨文件链接","en":"Multiple Translation Units","textbook":"7.10—7.11","objective":"通过头文件调用另一个源文件中的函数","explanation":["声明说明名称及其类型，定义还负责建立对象或给出函数体。头文件通常放函数原型和 extern 变量声明，每个需要使用接口的源文件包含它；变量定义通常只放在一个源文件，避免重复定义。头文件保护宏防止同一翻译单元重复展开。","文件作用域 static 函数或变量具有内部链接，只能被当前翻译单元按该链接名称引用；普通函数定义通常具有外部链接。网站会分别编译 main.c 和附加的 .c 文件，再链接。编辑下方 calc.h、calc.c，能实际观察接口不匹配和链接错误。"],"syntax":"/* calc.h */\\n#ifndef CALC_H\\n#define CALC_H\\nint twice(int n);\\nextern int bias;\\n#endif","syntaxNotes":"main.c 包含 calc.h；calc.c 定义 bias 和 twice，内部 helper 用 static 隐藏；计算 2*n+1。","example":"#include <stdio.h>\\n #include \\"calc.h\\"\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1)return 1;\\n    printf(\\"%d\\\\n\\",twice(n)+bias);\\n    return 0;\\n}\\n","exampleInput":"3","exampleOutput":"7\\n","walkthrough":"main.c 包含 calc.h；calc.c 定义 bias 和 twice，内部 helper 用 static 隐藏；计算 2*n+1。","mistakes":["static 函数具有内部链接，跨文件共享接口应使用外部函数。","无初始化器的 extern 声明不在此建立新的对象定义；链接时仍需一个定义。"],"summary":"通过头文件调用另一个源文件中的函数","quizzes":[{"id":"c12-3-q1","type":"single","question":"头文件中 extern int bias; 通常是什么？","options":["只能出现在 main 函数中","声明由其他位置定义的 int 对象","给 bias 分配新空间的唯一写法"],"answer":["声明由其他位置定义的 int 对象"],"explanation":"无初始化器的 extern 声明不在此建立新的对象定义；链接时仍需一个定义。"},{"id":"c12-3-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["7"],"explanation":"main.c 包含 calc.h；calc.c 定义 bias 和 twice，内部 helper 用 static 隐藏；计算 2*n+1。"},{"id":"c12-3-q3","type":"boolean","question":"文件作用域 static 函数可由另一个 .c 文件直接按名称链接调用。","options":["正确","错误"],"answer":["错误"],"explanation":"static 函数具有内部链接，跨文件共享接口应使用外部函数。"}],"quiz":{"id":"c12-3-q1","type":"single","question":"头文件中 extern int bias; 通常是什么？","options":["只能出现在 main 函数中","声明由其他位置定义的 int 对象","给 bias 分配新空间的唯一写法"],"answer":["声明由其他位置定义的 int 对象"],"explanation":"无初始化器的 extern 声明不在此建立新的对象定义；链接时仍需一个定义。"},"challenge":{"id":"c12-3-practice","title":"通过头文件调用另一个源文件中的函数","difficulty":"Easy","description":"通过头文件调用另一个源文件中的函数。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 -1000..1000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"3","output":"7\\n"},{"input":"0","output":"1\\n"},{"input":"-4","output":"-7\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 通过头文件调用另一个源文件中的函数 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n #include \\"calc.h\\"\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1)return 1;\\n    printf(\\"%d\\\\n\\",twice(n)+bias);\\n    return 0;\\n}\\n","hints":["/* calc.h */","main.c 包含 calc.h；calc.c 定义 bias 和 twice，内部 helper 用 static 隐藏；计算 2*n+1。","static 函数具有内部链接，跨文件共享接口应使用外部函数。"],"files":{"calc.h":"#ifndef CALC_H\\n#define CALC_H\\nint twice(int n);\\nextern int bias;\\n#endif\\n","calc.c":"#include \\"calc.h\\"\\nint bias=1;\\nstatic int helper(int n){return n*2;}\\nint twice(int n){return helper(n);}\\n"}},"exampleFiles":{"calc.h":"#ifndef CALC_H\\n#define CALC_H\\nint twice(int n);\\nextern int bias;\\n#endif\\n","calc.c":"#include \\"calc.h\\"\\nint bias=1;\\nstatic int helper(int n){return n*2;}\\nint twice(int n){return helper(n);}\\n"}},{"id":"c12-4","chapter":12,"index":3,"title":"二维数组作为函数参数","en":"Two-Dimensional Parameters","textbook":"7.7.3","objective":"用函数计算 2×3 矩阵的元素总和","explanation":["二维数组按行连续存放。传给函数时，参数 int a[][3] 会调整为指向三个 int 组成的数组的指针；编译器需要列数来计算下一行地址，不能把列宽随意省去，也不能用 int** 代替连续二维数组的类型。","C99 还允许使用可变长度数组形参，如 int sum(int r,int c,int a[r][c])，前面的尺寸参数必须先可见。本节使用固定列数建立清楚的步长模型：a[i][j] 的位置相当于从起点跨过 i*3+j 个 int。"],"syntax":"int sum(int rows, int a[][3]);","syntaxNotes":"函数收到行数和固定列宽；双重循环分别遍历行、列，元素值限制在 -100..100。","example":"#include <stdio.h>\\nstatic int sum(int rows,int a[][3]){int s=0;for(int i=0;i<rows;i++)for(int j=0;j<3;j++)s+=a[i][j];return s;}\\nint main(void) {\\n    int a[2][3];for(int i=0;i<2;i++)for(int j=0;j<3;j++)if(scanf(\\"%d\\",&a[i][j])!=1)return 1;\\n    printf(\\"%d\\\\n\\",sum(2,a));\\n    return 0;\\n}\\n","exampleInput":"1 2 3 4 5 6","exampleOutput":"21\\n","walkthrough":"函数收到行数和固定列宽；双重循环分别遍历行、列，元素值限制在 -100..100。","mistakes":["访问下一行需要列宽信息；可以用固定列宽或 C99 可变长度数组形参显式传入尺寸。","数组表达式转换为首元素指针，而二维数组的首元素是一整行。"],"summary":"用函数计算 2×3 矩阵的元素总和","quizzes":[{"id":"c12-4-q1","type":"single","question":"int a[2][3] 作为实参传给函数后通常对应什么指针？","options":["指向含 3 个 int 的数组的指针","int**","char*"],"answer":["指向含 3 个 int 的数组的指针"],"explanation":"数组表达式转换为首元素指针，而二维数组的首元素是一整行。"},{"id":"c12-4-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["21"],"explanation":"函数收到行数和固定列宽；双重循环分别遍历行、列，元素值限制在 -100..100。"},{"id":"c12-4-q3","type":"boolean","question":"二维数组形参可以总是不指定列数，编译器会运行时自动猜出。","options":["正确","错误"],"answer":["错误"],"explanation":"访问下一行需要列宽信息；可以用固定列宽或 C99 可变长度数组形参显式传入尺寸。"}],"quiz":{"id":"c12-4-q1","type":"single","question":"int a[2][3] 作为实参传给函数后通常对应什么指针？","options":["指向含 3 个 int 的数组的指针","int**","char*"],"answer":["指向含 3 个 int 的数组的指针"],"explanation":"数组表达式转换为首元素指针，而二维数组的首元素是一整行。"},"challenge":{"id":"c12-4-practice","title":"用函数计算 2×3 矩阵的元素总和","difficulty":"Easy","description":"用函数计算 2×3 矩阵的元素总和。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"按行输入六个 -100..100 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"1 2 3 4 5 6","output":"21\\n"},{"input":"0 0 0 0 0 0","output":"0\\n"},{"input":"-1 2 -3 4 -5 6","output":"3\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 用函数计算 2×3 矩阵的元素总和 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nstatic int sum(int rows,int a[][3]){int s=0;for(int i=0;i<rows;i++)for(int j=0;j<3;j++)s+=a[i][j];return s;}\\nint main(void) {\\n    int a[2][3];for(int i=0;i<2;i++)for(int j=0;j<3;j++)if(scanf(\\"%d\\",&a[i][j])!=1)return 1;\\n    printf(\\"%d\\\\n\\",sum(2,a));\\n    return 0;\\n}\\n","hints":["int sum(int rows, int a[][3]);","函数收到行数和固定列宽；双重循环分别遍历行、列，元素值限制在 -100..100。","访问下一行需要列宽信息；可以用固定列宽或 C99 可变长度数组形参显式传入尺寸。"]}},{"id":"c12-5","chapter":12,"index":4,"title":"嵌套调用与递归状态","en":"Calls and Recursion","textbook":"7.3—7.6","objective":"通过递归计算一个非负整数的十进制各位之和","explanation":["嵌套调用是一个函数调用另一个函数；递归是函数直接或间接再次调用自身。C99 不允许在一个函数体内定义另一个普通函数。调用之前需要可见且匹配的声明，函数原型能让编译器检查参数和返回类型。","递归必须定义终止情况，并确保每次调用向它靠近。本题 sum(n)=n%10+sum(n/10)，当 n<10 时直接返回 n；每一层的参数 n 是各自独立的对象，不能把不同层的局部变量当成同一个变量。"],"syntax":"int digits(int n){\\n    return n<10?n:n%10+digits(n/10);\\n}","syntaxNotes":"输入 0..1000000000，整数除以 10 逐步缩短位数；零也满足终止情况。","example":"#include <stdio.h>\\nstatic int digits(int n){return n<10?n:n%10+digits(n/10); }\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1 || n<0)return 1;\\n    printf(\\"%d\\\\n\\",digits(n));\\n    return 0;\\n}\\n","exampleInput":"1203","exampleOutput":"6\\n","walkthrough":"输入 0..1000000000，整数除以 10 逐步缩短位数；零也满足终止情况。","mistakes":["标准 C99 不支持嵌套函数定义；函数可以相互调用，但定义放在文件作用域。","只写出口而递归参数不变，仍会无限调用并耗尽栈空间。"],"summary":"通过递归计算一个非负整数的十进制各位之和","quizzes":[{"id":"c12-5-q1","type":"single","question":"递归正确终止需要哪两项？","options":["只能用全局变量且没有参数","只能调用一次且不能返回值","终止情况，以及让问题规模向它减小的步骤"],"answer":["终止情况，以及让问题规模向它减小的步骤"],"explanation":"只写出口而递归参数不变，仍会无限调用并耗尽栈空间。"},{"id":"c12-5-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["6"],"explanation":"输入 0..1000000000，整数除以 10 逐步缩短位数；零也满足终止情况。"},{"id":"c12-5-q3","type":"boolean","question":"C99 允许把一个完整函数定义放在另一个函数体内部。","options":["正确","错误"],"answer":["错误"],"explanation":"标准 C99 不支持嵌套函数定义；函数可以相互调用，但定义放在文件作用域。"}],"quiz":{"id":"c12-5-q1","type":"single","question":"递归正确终止需要哪两项？","options":["只能用全局变量且没有参数","只能调用一次且不能返回值","终止情况，以及让问题规模向它减小的步骤"],"answer":["终止情况，以及让问题规模向它减小的步骤"],"explanation":"只写出口而递归参数不变，仍会无限调用并耗尽栈空间。"},"challenge":{"id":"c12-5-practice","title":"通过递归计算一个非负整数的十进制各位之和","difficulty":"Easy","description":"通过递归计算一个非负整数的十进制各位之和。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 0..1000000000 的非负整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"1203","output":"6\\n"},{"input":"0","output":"0\\n"},{"input":"99999","output":"45\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 通过递归计算一个非负整数的十进制各位之和 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nstatic int digits(int n){return n<10?n:n%10+digits(n/10); }\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1 || n<0)return 1;\\n    printf(\\"%d\\\\n\\",digits(n));\\n    return 0;\\n}\\n","hints":["int digits(int n){","输入 0..1000000000，整数除以 10 逐步缩短位数；零也满足终止情况。","标准 C99 不支持嵌套函数定义；函数可以相互调用，但定义放在文件作用域。"]}}]},{"id":13,"en":"Pointers & Memory","title":"指针与动态内存","description":"教材第 8 章：地址、数组、函数指针、多重指针和动态分配。","lessons":[{"id":"c13-1","chapter":13,"index":0,"title":"地址、间接访问与空指针","en":"Addresses and Indirection","textbook":"8.1—8.2.3","objective":"通过指针把一个整数增加 5","explanation":["变量对象占据存储空间，取地址运算符 & 得到它的地址。int* 保存指向 int 的指针值，*p 则访问所指对象。声明中的 * 表示指针类型，表达式中的 * 表示间接访问，要根据上下文区分。","指针只能在指向有效且类型合适的对象时解引用。NULL 表示空指针，初始化为空能够表达尚未指向对象，但不能因此访问 *p。指针不是普通整数；输出地址应使用 %p 并转换为 void*，不依赖某个固定地址值。"],"syntax":"int *p=&n;\\n*p+=5;","syntaxNotes":"p 保存 n 的地址，对 *p 赋值会修改 n 本身；n 取 -1000..1000。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1)return 1;\\n    int *p=&n;*p+=5;printf(\\"%d\\\\n\\",n);\\n    return 0;\\n}\\n","exampleInput":"3","exampleOutput":"8\\n","walkthrough":"p 保存 n 的地址，对 *p 赋值会修改 n 本身；n 取 -1000..1000。","mistakes":["空指针并不指向有效对象，必须先让它指向对象才能解引用。","解引用表达式指称所指对象，赋值写入该对象。"],"summary":"通过指针把一个整数增加 5","quizzes":[{"id":"c13-1-q1","type":"single","question":"int *p=&n; 后执行 *p=9; 会修改什么？","options":["p 所指向的 n 对象","只修改 p 的地址","新建一个名为 n 的变量"],"answer":["p 所指向的 n 对象"],"explanation":"解引用表达式指称所指对象，赋值写入该对象。"},{"id":"c13-1-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["8"],"explanation":"p 保存 n 的地址，对 *p 赋值会修改 n 本身；n 取 -1000..1000。"},{"id":"c13-1-q3","type":"boolean","question":"将指针初始化为 NULL 后就可以安全地读取 *p。","options":["正确","错误"],"answer":["错误"],"explanation":"空指针并不指向有效对象，必须先让它指向对象才能解引用。"}],"quiz":{"id":"c13-1-q1","type":"single","question":"int *p=&n; 后执行 *p=9; 会修改什么？","options":["p 所指向的 n 对象","只修改 p 的地址","新建一个名为 n 的变量"],"answer":["p 所指向的 n 对象"],"explanation":"解引用表达式指称所指对象，赋值写入该对象。"},"challenge":{"id":"c13-1-practice","title":"通过指针把一个整数增加 5","difficulty":"Medium","description":"通过指针把一个整数增加 5。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 -1000..1000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"3","output":"8\\n"},{"input":"-5","output":"0\\n"},{"input":"0","output":"5\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 通过指针把一个整数增加 5 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1)return 1;\\n    int *p=&n;*p+=5;printf(\\"%d\\\\n\\",n);\\n    return 0;\\n}\\n","hints":["int *p=&n;","p 保存 n 的地址，对 *p 赋值会修改 n 本身；n 取 -1000..1000。","空指针并不指向有效对象，必须先让它指向对象才能解引用。"]}},{"id":"c13-2","chapter":13,"index":1,"title":"指针形参与交换","en":"Swapping Through Pointers","textbook":"8.2.4","objective":"用函数交换两个整数","explanation":["C 的函数调用按值传递。把普通整数传入函数，只会复制数值；把地址传入函数，也是在复制指针值，但复制后的地址仍指向原来的对象，因此函数可以通过它修改调用者的数据。","交换函数用两个 int* 形参接收地址，使用临时变量保存原值。swap(&a,&b) 与 swap(a,b) 的类型和含义完全不同；不要把“传入地址能修改对象”误称为 C 自动采用了引用传递。"],"syntax":"void swap(int *a,int *b){int t=*a;*a=*b;*b=t;}","syntaxNotes":"先保存 *a，再复制 *b，最后回写临时值；调用处必须传入变量地址。","example":"#include <stdio.h>\\nstatic void swap(int*a,int*b){int t=*a;*a=*b;*b=t;}\\nint main(void) {\\n    int a,b;if(scanf(\\"%d%d\\",&a,&b)!=2)return 1;\\n    swap(&a,&b);printf(\\"%d %d\\\\n\\",a,b);\\n    return 0;\\n}\\n","exampleInput":"2 9","exampleOutput":"9 2\\n","walkthrough":"先保存 *a，再复制 *b，最后回写临时值；调用处必须传入变量地址。","mistakes":["普通形参是局部副本，要修改调用者对象，需要传入地址并解引用。","指针参数本身是局部副本，但副本仍可保存原对象地址。"],"summary":"用函数交换两个整数","quizzes":[{"id":"c13-2-q1","type":"single","question":"C 将指针传给函数时采用什么传递方式？","options":["自动改成引用传递","直接移动调用者的变量","按值复制指针，随后可访问同一对象"],"answer":["按值复制指针，随后可访问同一对象"],"explanation":"指针参数本身是局部副本，但副本仍可保存原对象地址。"},{"id":"c13-2-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["9 2"],"explanation":"先保存 *a，再复制 *b，最后回写临时值；调用处必须传入变量地址。"},{"id":"c13-2-q3","type":"boolean","question":"swap(int a,int b) 内交换 a、b 就能交换调用者的两个 int。","options":["正确","错误"],"answer":["错误"],"explanation":"普通形参是局部副本，要修改调用者对象，需要传入地址并解引用。"}],"quiz":{"id":"c13-2-q1","type":"single","question":"C 将指针传给函数时采用什么传递方式？","options":["自动改成引用传递","直接移动调用者的变量","按值复制指针，随后可访问同一对象"],"answer":["按值复制指针，随后可访问同一对象"],"explanation":"指针参数本身是局部副本，但副本仍可保存原对象地址。"},"challenge":{"id":"c13-2-practice","title":"用函数交换两个整数","difficulty":"Medium","description":"用函数交换两个整数。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"两个 -1000000..1000000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"2 9","output":"9 2\\n"},{"input":"0 -1","output":"-1 0\\n"},{"input":"7 7","output":"7 7\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 用函数交换两个整数 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nstatic void swap(int*a,int*b){int t=*a;*a=*b;*b=t;}\\nint main(void) {\\n    int a,b;if(scanf(\\"%d%d\\",&a,&b)!=2)return 1;\\n    swap(&a,&b);printf(\\"%d %d\\\\n\\",a,b);\\n    return 0;\\n}\\n","hints":["void swap(int *a,int *b){int t=*a;*a=*b;*b=t;}","先保存 *a，再复制 *b，最后回写临时值；调用处必须传入变量地址。","普通形参是局部副本，要修改调用者对象，需要传入地址并解引用。"]}},{"id":"c13-3","chapter":13,"index":2,"title":"指针算术与数组边界","en":"Pointer Arithmetic","textbook":"8.3.1—8.3.4","objective":"使用指针遍历并累加数组","explanation":["数组表达式通常转换为首元素地址，p+1 移动到下一个同类型元素，而不是简单移动一个字节。a[i] 等价于 *(a+i)。数组名并非可以任意赋值的指针变量，sizeof 数组与 sizeof 指针也有不同含义。","合法的指针算术限定在同一个数组内部及其尾后位置。尾后指针可以构造和比较，不能解引用；两个指针相减也应来自同一个数组。函数接收数组时通常还需另传长度，不能从指针的 sizeof 推断元素个数。"],"syntax":"for(int *p=a;p<a+n;++p) sum+=*p;","syntaxNotes":"n 为 1..20，数组元素为 -100..100；p 逐元素移动，到尾后位置立即停止。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int n,a[20],sum=0;if(scanf(\\"%d\\",&n)!=1||n<1||n>20)return 1;\\n    for(int i=0;i<n;i++)if(scanf(\\"%d\\",&a[i])!=1)return 1;\\n    for(int*p=a;p<a+n;p++)sum+=*p;\\n    printf(\\"%d\\\\n\\",sum);\\n    return 0;\\n}\\n","exampleInput":"3 2 4 6","exampleOutput":"12\\n","walkthrough":"n 为 1..20，数组元素为 -100..100；p 逐元素移动，到尾后位置立即停止。","mistakes":["尾后位置只可用于合法的比较和运算，不能解引用。","步长由所指类型大小决定，访问前仍须检查是否到达尾后位置。"],"summary":"使用指针遍历并累加数组","quizzes":[{"id":"c13-3-q1","type":"single","question":"int* p 指向数组元素时，p+1 指向哪里？","options":["必然指向数组外部","同一数组的下一个 int 位置","地址固定增加一个字节"],"answer":["同一数组的下一个 int 位置"],"explanation":"步长由所指类型大小决定，访问前仍须检查是否到达尾后位置。"},{"id":"c13-3-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["12"],"explanation":"n 为 1..20，数组元素为 -100..100；p 逐元素移动，到尾后位置立即停止。"},{"id":"c13-3-q3","type":"boolean","question":"数组尾后指针 a+n 可以作为结束标记，也可以读取 *(a+n)。","options":["正确","错误"],"answer":["错误"],"explanation":"尾后位置只可用于合法的比较和运算，不能解引用。"}],"quiz":{"id":"c13-3-q1","type":"single","question":"int* p 指向数组元素时，p+1 指向哪里？","options":["必然指向数组外部","同一数组的下一个 int 位置","地址固定增加一个字节"],"answer":["同一数组的下一个 int 位置"],"explanation":"步长由所指类型大小决定，访问前仍须检查是否到达尾后位置。"},"challenge":{"id":"c13-3-practice","title":"使用指针遍历并累加数组","difficulty":"Medium","description":"使用指针遍历并累加数组。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"n（1..20），随后 n 个 -100..100 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"3 2 4 6","output":"12\\n"},{"input":"1 -7","output":"-7\\n"},{"input":"4 0 1 -1 0","output":"0\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 使用指针遍历并累加数组 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    int n,a[20],sum=0;if(scanf(\\"%d\\",&n)!=1||n<1||n>20)return 1;\\n    for(int i=0;i<n;i++)if(scanf(\\"%d\\",&a[i])!=1)return 1;\\n    for(int*p=a;p<a+n;p++)sum+=*p;\\n    printf(\\"%d\\\\n\\",sum);\\n    return 0;\\n}\\n","hints":["for(int *p=a;p<a+n;++p) sum+=*p;","n 为 1..20，数组元素为 -100..100；p 逐元素移动，到尾后位置立即停止。","尾后位置只可用于合法的比较和运算，不能解引用。"]}},{"id":"c13-4","chapter":13,"index":3,"title":"行指针与二维数组","en":"Pointers to Rows","textbook":"8.3.5","objective":"用行指针输出 2×3 矩阵的第 k 列之和","explanation":["int (*p)[3] 声明的是指向含三个 int 的数组的指针，括号确保 *p 先结合。int *p[3] 则是三个 int 指针组成的数组。两种写法只差括号，但存储对象和指针运算的步长都不同。","二维数组 a[2][3] 转换为指向第一行的指针，所以 p=a 合法，p+1 跨过一整行。通过 (*p)[j] 或 p[i][j] 访问元素。连续二维数组不应强制转换为 int**，后者要求指向指针对象的结构。"],"syntax":"int (*p)[3]=a;\\nint value=p[1][2];","syntaxNotes":"输入 k 为 0..2，随后按行输入六个元素，计算 p[0][k]+p[1][k]。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int k,a[2][3];if(scanf(\\"%d\\",&k)!=1||k<0||k>2)return 1;\\n    for(int i=0;i<2;i++)for(int j=0;j<3;j++)if(scanf(\\"%d\\",&a[i][j])!=1)return 1;\\n    int(*p)[3]=a;printf(\\"%d\\\\n\\",p[0][k]+p[1][k]);\\n    return 0;\\n}\\n","exampleInput":"1 1 2 3 4 5 6","exampleOutput":"7\\n","walkthrough":"输入 k 为 0..2，随后按行输入六个元素，计算 p[0][k]+p[1][k]。","mistakes":["前者是指针数组，后者是数组指针；括号改变声明的结合方式。","p 指向一整行，下一位置跨过该行的三个元素。"],"summary":"用行指针输出 2×3 矩阵的第 k 列之和","quizzes":[{"id":"c13-4-q1","type":"single","question":"int (*p)[3] 中 p+1 跨过多少个 int？","options":["3","1","取决于数组的行数"],"answer":["3"],"explanation":"p 指向一整行，下一位置跨过该行的三个元素。"},{"id":"c13-4-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["7"],"explanation":"输入 k 为 0..2，随后按行输入六个元素，计算 p[0][k]+p[1][k]。"},{"id":"c13-4-q3","type":"boolean","question":"int *p[3] 与 int (*p)[3] 是完全相同的类型。","options":["正确","错误"],"answer":["错误"],"explanation":"前者是指针数组，后者是数组指针；括号改变声明的结合方式。"}],"quiz":{"id":"c13-4-q1","type":"single","question":"int (*p)[3] 中 p+1 跨过多少个 int？","options":["3","1","取决于数组的行数"],"answer":["3"],"explanation":"p 指向一整行，下一位置跨过该行的三个元素。"},"challenge":{"id":"c13-4-practice","title":"用行指针输出 2×3 矩阵的第 k 列之和","difficulty":"Medium","description":"用行指针输出 2×3 矩阵的第 k 列之和。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"列索引 k（0..2），然后六个 -100..100 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"1 1 2 3 4 5 6","output":"7\\n"},{"input":"0 -1 0 0 1 0 0","output":"0\\n"},{"input":"2 1 2 8 4 5 9","output":"17\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 用行指针输出 2×3 矩阵的第 k 列之和 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    int k,a[2][3];if(scanf(\\"%d\\",&k)!=1||k<0||k>2)return 1;\\n    for(int i=0;i<2;i++)for(int j=0;j<3;j++)if(scanf(\\"%d\\",&a[i][j])!=1)return 1;\\n    int(*p)[3]=a;printf(\\"%d\\\\n\\",p[0][k]+p[1][k]);\\n    return 0;\\n}\\n","hints":["int (*p)[3]=a;","输入 k 为 0..2，随后按行输入六个元素，计算 p[0][k]+p[1][k]。","前者是指针数组，后者是数组指针；括号改变声明的结合方式。"]}},{"id":"c13-5","chapter":13,"index":4,"title":"可写数组与字符串指针","en":"Pointers to Strings","textbook":"8.4","objective":"通过字符指针把小写英文变成大写","explanation":["char a[]=\\"cat\\" 建立可写的字符数组；const char* p=\\"cat\\" 让指针指向字符串字面量。字面量的内容不能修改，即使把它赋给 char*，尝试写入仍是未定义行为；const 让接口更清楚地表达只读用途。","字符指针传参仍需明确容量、终止符和是否可修改。本题先把输入读进可写数组，再用指针逐字节遍历。不要仅凭指针非空就断定整段字符串可访问；必须保证最终遇到终止符且没有越界。"],"syntax":"for(char*p=s;*p;p++)\\n    if(*p>='a'&&*p<='z') *p=(char)(*p-'a'+'A');","syntaxNotes":"只转换 ASCII 小写字母，其余字节保持不变；容量为 81，输入最多 80 字节。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    char s[81];if(scanf(\\"%80s\\",s)!=1)return 1;\\n    for(char*p=s;*p;p++)if(*p>='a'&&*p<='z')*p=(char)(*p-'a'+'A');\\n    puts(s);\\n    return 0;\\n}\\n","exampleInput":"aBc9","exampleOutput":"ABC9\\n","walkthrough":"只转换 ASCII 小写字母，其余字节保持不变；容量为 81，输入最多 80 字节。","mistakes":["修改字符串字面量是未定义行为，应使用字符数组存放需要修改的文本。","数组初始化得到独立且可写的元素，字符串字面量本身不能修改。"],"summary":"通过字符指针把小写英文变成大写","quizzes":[{"id":"c13-5-q1","type":"single","question":"哪一种对象可以按字符修改？","options":["字符串字面量本身","NULL 指向的文本","char s[]=\\"cat\\" 所建立的数组"],"answer":["char s[]=\\"cat\\" 所建立的数组"],"explanation":"数组初始化得到独立且可写的元素，字符串字面量本身不能修改。"},{"id":"c13-5-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["ABC9"],"explanation":"只转换 ASCII 小写字母，其余字节保持不变；容量为 81，输入最多 80 字节。"},{"id":"c13-5-q3","type":"boolean","question":"char *p=\\"cat\\"; p[0]='C'; 在标准 C99 中是可靠写法。","options":["正确","错误"],"answer":["错误"],"explanation":"修改字符串字面量是未定义行为，应使用字符数组存放需要修改的文本。"}],"quiz":{"id":"c13-5-q1","type":"single","question":"哪一种对象可以按字符修改？","options":["字符串字面量本身","NULL 指向的文本","char s[]=\\"cat\\" 所建立的数组"],"answer":["char s[]=\\"cat\\" 所建立的数组"],"explanation":"数组初始化得到独立且可写的元素，字符串字面量本身不能修改。"},"challenge":{"id":"c13-5-practice","title":"通过字符指针把小写英文变成大写","difficulty":"Medium","description":"通过字符指针把小写英文变成大写。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个长度 1..80、无空白的 ASCII 单词。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"aBc9","output":"ABC9\\n"},{"input":"hello","output":"HELLO\\n"},{"input":"99","output":"99\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 通过字符指针把小写英文变成大写 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    char s[81];if(scanf(\\"%80s\\",s)!=1)return 1;\\n    for(char*p=s;*p;p++)if(*p>='a'&&*p<='z')*p=(char)(*p-'a'+'A');\\n    puts(s);\\n    return 0;\\n}\\n","hints":["for(char*p=s;*p;p++)","只转换 ASCII 小写字母，其余字节保持不变；容量为 81，输入最多 80 字节。","修改字符串字面量是未定义行为，应使用字符数组存放需要修改的文本。"]}},{"id":"c13-6","chapter":13,"index":5,"title":"函数指针与回调","en":"Function Pointers","textbook":"8.5","objective":"通过函数指针选择加法或乘法","explanation":["函数指针保存可调用函数的地址。int (*op)(int,int) 表示指向接收两个 int 并返回 int 的函数的指针；调用可写 op(a,b)。函数指针的参数和返回类型必须与实际函数兼容，不能通过强制转换掩盖不匹配。","把函数指针作为参数可以把“怎样处理”交给调用者。例如同一个 apply 函数可以使用加法或乘法策略。函数指针与对象指针并不保证能互相转换，不能一律转成 void* 保存；先看清声明再使用。"],"syntax":"int apply(int a,int b,int(*op)(int,int)){return op(a,b);}","syntaxNotes":"输入模式 0 表示相加、1 表示相乘；a、b 的绝对值不超过 100。","example":"#include <stdio.h>\\nstatic int add(int a,int b){return a+b;}\\nstatic int mul(int a,int b){return a*b;}\\nstatic int apply(int a,int b,int(*op)(int,int)){return op(a,b); }\\nint main(void) {\\n    int mode,a,b;if(scanf(\\"%d%d%d\\",&mode,&a,&b)!=3)return 1;\\n    int(*op)(int,int)=mode?mul:add;\\n    printf(\\"%d\\\\n\\",apply(a,b,op));\\n    return 0;\\n}\\n","exampleInput":"0 3 4","exampleOutput":"7\\n","walkthrough":"输入模式 0 表示相加、1 表示相乘；a、b 的绝对值不超过 100。","mistakes":["调用必须使用兼容的函数类型，不匹配可能产生未定义行为。","(*op) 的括号让 op 先成为指针，后面的括号描述函数参数。"],"summary":"通过函数指针选择加法或乘法","quizzes":[{"id":"c13-6-q1","type":"single","question":"int (*op)(int,int) 声明的是什么？","options":["两个 int 指针的数组","指向接收两个 int 并返回 int 的函数的指针","返回 int* 的普通函数"],"answer":["指向接收两个 int 并返回 int 的函数的指针"],"explanation":"(*op) 的括号让 op 先成为指针，后面的括号描述函数参数。"},{"id":"c13-6-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["7"],"explanation":"输入模式 0 表示相加、1 表示相乘；a、b 的绝对值不超过 100。"},{"id":"c13-6-q3","type":"boolean","question":"所有函数地址都能通过任意类型函数指针调用而没有风险。","options":["正确","错误"],"answer":["错误"],"explanation":"调用必须使用兼容的函数类型，不匹配可能产生未定义行为。"}],"quiz":{"id":"c13-6-q1","type":"single","question":"int (*op)(int,int) 声明的是什么？","options":["两个 int 指针的数组","指向接收两个 int 并返回 int 的函数的指针","返回 int* 的普通函数"],"answer":["指向接收两个 int 并返回 int 的函数的指针"],"explanation":"(*op) 的括号让 op 先成为指针，后面的括号描述函数参数。"},"challenge":{"id":"c13-6-practice","title":"通过函数指针选择加法或乘法","difficulty":"Medium","description":"通过函数指针选择加法或乘法。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"mode（0 或 1），再输入两个 -100..100 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"0 3 4","output":"7\\n"},{"input":"1 3 4","output":"12\\n"},{"input":"1 -2 5","output":"-10\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 通过函数指针选择加法或乘法 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nstatic int add(int a,int b){return a+b;}\\nstatic int mul(int a,int b){return a*b;}\\nstatic int apply(int a,int b,int(*op)(int,int)){return op(a,b); }\\nint main(void) {\\n    int mode,a,b;if(scanf(\\"%d%d%d\\",&mode,&a,&b)!=3)return 1;\\n    int(*op)(int,int)=mode?mul:add;\\n    printf(\\"%d\\\\n\\",apply(a,b,op));\\n    return 0;\\n}\\n","hints":["int apply(int a,int b,int(*op)(int,int)){return op(a,b);}","输入模式 0 表示相加、1 表示相乘；a、b 的绝对值不超过 100。","调用必须使用兼容的函数类型，不匹配可能产生未定义行为。"]}},{"id":"c13-7","chapter":13,"index":6,"title":"返回指针与对象生存期","en":"Returning Pointers","textbook":"8.6","objective":"返回数组最大元素的地址并将该元素加一","explanation":["函数可以返回对象的地址，但对象必须在函数返回后仍然存在。自动局部变量在离开函数后结束生存期，返回它的地址会产生悬空指针；返回参数所指数组内元素的地址则取决于调用者数组的生存期。","接口应说明空输入如何处理，以及返回值是否允许修改。这里数组由 main 保存，查找函数只返回第一个最大元素的地址；main 通过这个指针加一并输出原数组，因此能直接观察别名指向同一对象。"],"syntax":"int *findmax(int*a,int n){\\n    int*p=a;for(int i=1;i<n;i++)if(a[i]>*p)p=a+i;return p;\\n}","syntaxNotes":"n 为 1..10，元素为 -100..100；相同最大值只修改第一次出现的那个。","example":"#include <stdio.h>\\nstatic int*findmax(int*a,int n){int*p=a;for(int i=1;i<n;i++)if(a[i]>*p)p=a+i;return p;}\\nint main(void) {\\n    int n,a[10];if(scanf(\\"%d\\",&n)!=1||n<1||n>10)return 1;\\n    for(int i=0;i<n;i++)if(scanf(\\"%d\\",&a[i])!=1)return 1;\\n    ++*findmax(a,n);\\n    for(int i=0;i<n;i++)printf(\\"%s%d\\",i?\\" \\":\\"\\",a[i]);putchar('\\\\n');\\n    return 0;\\n}\\n","exampleInput":"3 2 7 1","exampleOutput":"2 8 1\\n","walkthrough":"n 为 1..10，元素为 -100..100；相同最大值只修改第一次出现的那个。","mistakes":["复制地址不会延长对象生存期，函数返回后仍然悬空。","所指对象的生存期由调用者的数组决定，不能返回已经结束生存期的对象。"],"summary":"返回数组最大元素的地址并将该元素加一","quizzes":[{"id":"c13-7-q1","type":"single","question":"哪个返回地址的方式在调用者数组仍存在时有效？","options":["返回传入数组中某个元素的地址","返回自动局部 int 的地址","返回已经 free 的内存地址"],"answer":["返回传入数组中某个元素的地址"],"explanation":"所指对象的生存期由调用者的数组决定，不能返回已经结束生存期的对象。"},{"id":"c13-7-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["2 8 1"],"explanation":"n 为 1..10，元素为 -100..100；相同最大值只修改第一次出现的那个。"},{"id":"c13-7-q3","type":"boolean","question":"把局部变量地址先存入另一个指针再返回，就能延长局部变量生存期。","options":["正确","错误"],"answer":["错误"],"explanation":"复制地址不会延长对象生存期，函数返回后仍然悬空。"}],"quiz":{"id":"c13-7-q1","type":"single","question":"哪个返回地址的方式在调用者数组仍存在时有效？","options":["返回传入数组中某个元素的地址","返回自动局部 int 的地址","返回已经 free 的内存地址"],"answer":["返回传入数组中某个元素的地址"],"explanation":"所指对象的生存期由调用者的数组决定，不能返回已经结束生存期的对象。"},"challenge":{"id":"c13-7-practice","title":"返回数组最大元素的地址并将该元素加一","difficulty":"Medium","description":"返回数组最大元素的地址并将该元素加一。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"n（1..10），随后 n 个 -100..100 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"3 2 7 1","output":"2 8 1\\n"},{"input":"1 -3","output":"-2\\n"},{"input":"3 5 5 1","output":"6 5 1\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 返回数组最大元素的地址并将该元素加一 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nstatic int*findmax(int*a,int n){int*p=a;for(int i=1;i<n;i++)if(a[i]>*p)p=a+i;return p;}\\nint main(void) {\\n    int n,a[10];if(scanf(\\"%d\\",&n)!=1||n<1||n>10)return 1;\\n    for(int i=0;i<n;i++)if(scanf(\\"%d\\",&a[i])!=1)return 1;\\n    ++*findmax(a,n);\\n    for(int i=0;i<n;i++)printf(\\"%s%d\\",i?\\" \\":\\"\\",a[i]);putchar('\\\\n');\\n    return 0;\\n}\\n","hints":["int *findmax(int*a,int n){","n 为 1..10，元素为 -100..100；相同最大值只修改第一次出现的那个。","复制地址不会延长对象生存期，函数返回后仍然悬空。"]}},{"id":"c13-8","chapter":13,"index":7,"title":"指针数组与二级指针","en":"Arrays of Pointers","textbook":"8.7.1—8.7.2","objective":"用二级指针让一个指针改为指向第二个整数","explanation":["int* items[2] 是两个指针组成的数组，每个元素可指向独立对象。int** pp 指向一个 int* 对象，解引用一次得到指针，再解引用一次才得到 int。二级指针常用于让函数修改调用者保存的指针值。","二维 int 数组与 int* 数组的内存形状不同，不能随意互换。本例把两个独立变量地址放进 items，再把 p 的地址交给 select_second；函数修改 *out，使 main 的 p 改为保存 items[1]。"],"syntax":"void select_second(int **out,int *items[2]){*out=items[1];}","syntaxNotes":"输入两个整数，输出重新指向的第二个整数；没有复制整数内容，只改变了指针指向。","example":"#include <stdio.h>\\nstatic void select_second(int**out,int*items[2]){*out=items[1]; }\\nint main(void) {\\n    int a,b;if(scanf(\\"%d%d\\",&a,&b)!=2)return 1;\\n    int*items[2]={&a,&b},*p=&a;\\n    select_second(&p,items);printf(\\"%d\\\\n\\",*p);\\n    return 0;\\n}\\n","exampleInput":"3 9","exampleOutput":"9\\n","walkthrough":"输入两个整数，输出重新指向的第二个整数；没有复制整数内容，只改变了指针指向。","mistakes":["int** 指向指针对象，而二维数组转换成指向一行数组的指针。","要修改指针对象本身，需要传它的地址，解引用一次后对该对象赋值。"],"summary":"用二级指针让一个指针改为指向第二个整数","quizzes":[{"id":"c13-8-q1","type":"single","question":"为了让函数修改调用者的 int* 变量 p，应传入什么？","options":["p 指向整数的副本","sizeof p","&p，函数以 int** 接收"],"answer":["&p，函数以 int** 接收"],"explanation":"要修改指针对象本身，需要传它的地址，解引用一次后对该对象赋值。"},{"id":"c13-8-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["9"],"explanation":"输入两个整数，输出重新指向的第二个整数；没有复制整数内容，只改变了指针指向。"},{"id":"c13-8-q3","type":"boolean","question":"int** 可以总是直接接收 int a[2][3] 转换出的指针。","options":["正确","错误"],"answer":["错误"],"explanation":"int** 指向指针对象，而二维数组转换成指向一行数组的指针。"}],"quiz":{"id":"c13-8-q1","type":"single","question":"为了让函数修改调用者的 int* 变量 p，应传入什么？","options":["p 指向整数的副本","sizeof p","&p，函数以 int** 接收"],"answer":["&p，函数以 int** 接收"],"explanation":"要修改指针对象本身，需要传它的地址，解引用一次后对该对象赋值。"},"challenge":{"id":"c13-8-practice","title":"用二级指针让一个指针改为指向第二个整数","difficulty":"Medium","description":"用二级指针让一个指针改为指向第二个整数。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"两个 -1000..1000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"3 9","output":"9\\n"},{"input":"1 -7","output":"-7\\n"},{"input":"0 0","output":"0\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 用二级指针让一个指针改为指向第二个整数 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nstatic void select_second(int**out,int*items[2]){*out=items[1]; }\\nint main(void) {\\n    int a,b;if(scanf(\\"%d%d\\",&a,&b)!=2)return 1;\\n    int*items[2]={&a,&b},*p=&a;\\n    select_second(&p,items);printf(\\"%d\\\\n\\",*p);\\n    return 0;\\n}\\n","hints":["void select_second(int **out,int *items[2]){*out=items[1];}","输入两个整数，输出重新指向的第二个整数；没有复制整数内容，只改变了指针指向。","int** 指向指针对象，而二维数组转换成指向一行数组的指针。"]}},{"id":"c13-9","chapter":13,"index":8,"title":"main 的命令行参数","en":"Command-Line Arguments","textbook":"8.7.3","objective":"输出用户命令行参数个数及第一个参数","explanation":["int main(int argc,char*argv[]) 是带参数的标准入口形式。argc 是参数个数，argv 是指针数组，argv[0] 通常表示程序名，用户参数从 argv[1] 开始；argv[argc] 是空指针。必须先检查 argc 才能访问可选参数。","命令行参数不是标准输入。网站在编辑器的“程序参数”中逐行指定一个参数，再把它们交给 WASI 的入口；例如一个带空格的参数应写在同一行。实参是字符串，解析为数字时应检查完整转换和范围。"],"syntax":"int main(int argc,char *argv[]) {\\n    /* argv[1] 仅在 argc>1 时可访问 */\\n}","syntaxNotes":"程序名由运行器提供；输出用户参数个数，然后输出首个参数，没有时输出 NONE。","example":"#include <stdio.h>\\nint main(int argc,char*argv[]){printf(\\"%d %s\\\\n\\",argc-1,argc>1?argv[1]:\\"NONE\\");return 0;}\\n","exampleInput":"","exampleOutput":"2 apple\\n","walkthrough":"程序名由运行器提供；输出用户参数个数，然后输出首个参数，没有时输出 NONE。","mistakes":["命令行参数和标准输入是两个不同的输入通道。","运行器提供 argv[0] 作为程序名，用户参数数量为 argc-1。"],"summary":"输出用户命令行参数个数及第一个参数","quizzes":[{"id":"c13-9-q1","type":"single","question":"没有用户参数时，argc 通常是多少？","options":["-1","1","0"],"answer":["1"],"explanation":"运行器提供 argv[0] 作为程序名，用户参数数量为 argc-1。"},{"id":"c13-9-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["2 apple"],"explanation":"程序名由运行器提供；输出用户参数个数，然后输出首个参数，没有时输出 NONE。"},{"id":"c13-9-q3","type":"boolean","question":"在 stdin 中写入 apple 就等于提供 argv[1]。","options":["正确","错误"],"answer":["错误"],"explanation":"命令行参数和标准输入是两个不同的输入通道。"}],"quiz":{"id":"c13-9-q1","type":"single","question":"没有用户参数时，argc 通常是多少？","options":["-1","1","0"],"answer":["1"],"explanation":"运行器提供 argv[0] 作为程序名，用户参数数量为 argc-1。"},"challenge":{"id":"c13-9-practice","title":"输出用户命令行参数个数及第一个参数","difficulty":"Medium","description":"输出用户命令行参数个数及第一个参数。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"标准输入不用填写；在程序参数区域逐行填写 0..10 个参数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"","output":"2 apple\\n","args":["apple","blue"]},{"input":"","output":"0 NONE\\n","args":[]},{"input":"","output":"1 hello world\\n","args":["hello world"]}],"starter":"#include <stdio.h>\\nint main(int argc,char *argv[]) {\\n    /* TODO: 输出参数个数与首个参数 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nint main(int argc,char*argv[]){printf(\\"%d %s\\\\n\\",argc-1,argc>1?argv[1]:\\"NONE\\");return 0;}\\n","hints":["int main(int argc,char *argv[]) {","程序名由运行器提供；输出用户参数个数，然后输出首个参数，没有时输出 NONE。","命令行参数和标准输入是两个不同的输入通道。"],"args":["apple","blue"]},"exampleArgs":["apple","blue"]},{"id":"c13-10","chapter":13,"index":9,"title":"malloc、calloc、void* 与 free","en":"Dynamic Allocation","textbook":"8.8.1—8.8.3","objective":"动态分配 n 个整数并计算总和","explanation":["动态分配在运行时申请存储空间。malloc 返回 void*，在 C 中可以隐式转换为对象指针；使用 sizeof *p 按元素类型计算容量，可以降低类型修改后遗漏尺寸的风险。分配可能失败，必须先检查 NULL 再访问。","malloc 不初始化空间，calloc 把分配区域的所有字节置零；对整数数组可得到零值。内存不再使用时用 free 释放一次，之后原指针及别名不可继续访问。void* 本身没有可解引用的对象类型，需转换为合适的对象指针；不能对它做标准 C 的元素运算。"],"syntax":"int *p=calloc((size_t)n,sizeof *p);\\nif(!p) return 1;\\n/* 使用 */ free(p);","syntaxNotes":"输入 n 为 1..100，元素为 -1000..1000；读入失败和正常结束两条路径都释放内存。","example":"#include <stdio.h>\\n#include <stdlib.h>\\n\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1||n<1||n>100)return 1;\\n    int*p=calloc((size_t)n,sizeof*p);if(!p)return 1;\\n    int sum=0;for(int i=0;i<n;i++){if(scanf(\\"%d\\",&p[i])!=1){free(p);return 1;}sum+=p[i];}\\n    printf(\\"%d\\\\n\\",sum);free(p);\\n    return 0;\\n}\\n","exampleInput":"3 1 2 3","exampleOutput":"6\\n","walkthrough":"输入 n 为 1..100，元素为 -1000..1000；读入失败和正常结束两条路径都释放内存。","mistakes":["释放结束对象生存期，所有指向它的别名都不能继续用来访问对象。","分配失败没有获得对象空间；强制转换不能创造有效存储。"],"summary":"动态分配 n 个整数并计算总和","quizzes":[{"id":"c13-10-q1","type":"single","question":"malloc 返回 NULL 时应怎样处理？","options":["按分配失败处理，不能解引用","立即写入 p[0] 看看是否可用","把 NULL 转成 int* 就能访问"],"answer":["按分配失败处理，不能解引用"],"explanation":"分配失败没有获得对象空间；强制转换不能创造有效存储。"},{"id":"c13-10-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["6"],"explanation":"输入 n 为 1..100，元素为 -1000..1000；读入失败和正常结束两条路径都释放内存。"},{"id":"c13-10-q3","type":"boolean","question":"free(p) 后，另一个仍保存同一地址的指针也可以继续访问原对象。","options":["正确","错误"],"answer":["错误"],"explanation":"释放结束对象生存期，所有指向它的别名都不能继续用来访问对象。"}],"quiz":{"id":"c13-10-q1","type":"single","question":"malloc 返回 NULL 时应怎样处理？","options":["按分配失败处理，不能解引用","立即写入 p[0] 看看是否可用","把 NULL 转成 int* 就能访问"],"answer":["按分配失败处理，不能解引用"],"explanation":"分配失败没有获得对象空间；强制转换不能创造有效存储。"},"challenge":{"id":"c13-10-practice","title":"动态分配 n 个整数并计算总和","difficulty":"Medium","description":"动态分配 n 个整数并计算总和。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"n（1..100），随后 n 个 -1000..1000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"3 1 2 3","output":"6\\n"},{"input":"1 -9","output":"-9\\n"},{"input":"4 0 0 0 0","output":"0\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 动态分配 n 个整数并计算总和 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <stdlib.h>\\n\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1||n<1||n>100)return 1;\\n    int*p=calloc((size_t)n,sizeof*p);if(!p)return 1;\\n    int sum=0;for(int i=0;i<n;i++){if(scanf(\\"%d\\",&p[i])!=1){free(p);return 1;}sum+=p[i];}\\n    printf(\\"%d\\\\n\\",sum);free(p);\\n    return 0;\\n}\\n","hints":["int *p=calloc((size_t)n,sizeof *p);","输入 n 为 1..100，元素为 -1000..1000；读入失败和正常结束两条路径都释放内存。","释放结束对象生存期，所有指向它的别名都不能继续用来访问对象。"]}},{"id":"c13-11","chapter":13,"index":10,"title":"安全扩容与 realloc","en":"Resizing Allocations","textbook":"8.8","objective":"给动态整数数组追加一个元素","explanation":["realloc 可能移动分配区域，也可能在原位置调整大小。成功时原指针不再用于访问旧区域，应使用返回的新指针；原内容在新旧长度较小的范围内保留。扩出的部分没有自动初始化，必须自己写入。","直接写 p=realloc(p,newsize) 可能在失败时丢失原来的地址。先把结果存入临时指针，成功后再替换 p；失败时仍由 p 持有旧分配并负责释放。本题将长度限制为 1..20，因此容量乘法不会溢出。"],"syntax":"int *next=realloc(p,(n+1)*sizeof *p);\\nif(!next){free(p);return 1;}\\np=next;","syntaxNotes":"分配初始 n 个元素，读入新元素 x 后扩为 n+1，把 x 写到 p[n]，再输出整个数组。","example":"#include <stdio.h>\\n#include <stdlib.h>\\n\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1||n<1||n>20)return 1;\\n    int*p=malloc((size_t)n*sizeof*p);if(!p)return 1;\\n    for(int i=0;i<n;i++)if(scanf(\\"%d\\",&p[i])!=1){free(p);return 1;}\\n    int x;if(scanf(\\"%d\\",&x)!=1){free(p);return 1;}\\n    int*next=realloc(p,(size_t)(n+1)*sizeof*p);if(!next){free(p);return 1;}p=next;p[n]=x;\\n    for(int i=0;i<=n;i++)printf(\\"%s%d\\",i?\\" \\":\\"\\",p[i]);putchar('\\\\n');free(p);\\n    return 0;\\n}\\n","exampleInput":"2 1 2 9","exampleOutput":"1 2 9\\n","walkthrough":"分配初始 n 个元素，读入新元素 x 后扩为 n+1，把 x 写到 p[n]，再输出整个数组。","mistakes":["成功的 realloc 可能移动对象，旧指针值不能再用于访问，需更新相关指针。","realloc 失败返回 NULL，但原区域仍有效；直接覆盖 p 可能造成内存泄漏。"],"summary":"给动态整数数组追加一个元素","quizzes":[{"id":"c13-11-q1","type":"single","question":"为什么用临时指针接收 realloc 返回值？","options":["避免 sizeof 返回 size_t","保证地址一定不改变","失败时仍保留原分配地址以便释放"],"answer":["失败时仍保留原分配地址以便释放"],"explanation":"realloc 失败返回 NULL，但原区域仍有效；直接覆盖 p 可能造成内存泄漏。"},{"id":"c13-11-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["1 2 9"],"explanation":"分配初始 n 个元素，读入新元素 x 后扩为 n+1，把 x 写到 p[n]，再输出整个数组。"},{"id":"c13-11-q3","type":"boolean","question":"realloc 成功后可以继续使用扩容前保存的所有旧别名。","options":["正确","错误"],"answer":["错误"],"explanation":"成功的 realloc 可能移动对象，旧指针值不能再用于访问，需更新相关指针。"}],"quiz":{"id":"c13-11-q1","type":"single","question":"为什么用临时指针接收 realloc 返回值？","options":["避免 sizeof 返回 size_t","保证地址一定不改变","失败时仍保留原分配地址以便释放"],"answer":["失败时仍保留原分配地址以便释放"],"explanation":"realloc 失败返回 NULL，但原区域仍有效；直接覆盖 p 可能造成内存泄漏。"},"challenge":{"id":"c13-11-practice","title":"给动态整数数组追加一个元素","difficulty":"Medium","description":"给动态整数数组追加一个元素。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"n（1..20），n 个 -1000..1000 的整数，再输入一个待追加整数 x。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"2 1 2 9","output":"1 2 9\\n"},{"input":"1 -3 0","output":"-3 0\\n"},{"input":"3 5 6 7 8","output":"5 6 7 8\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 给动态整数数组追加一个元素 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <stdlib.h>\\n\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1||n<1||n>20)return 1;\\n    int*p=malloc((size_t)n*sizeof*p);if(!p)return 1;\\n    for(int i=0;i<n;i++)if(scanf(\\"%d\\",&p[i])!=1){free(p);return 1;}\\n    int x;if(scanf(\\"%d\\",&x)!=1){free(p);return 1;}\\n    int*next=realloc(p,(size_t)(n+1)*sizeof*p);if(!next){free(p);return 1;}p=next;p[n]=x;\\n    for(int i=0;i<=n;i++)printf(\\"%s%d\\",i?\\" \\":\\"\\",p[i]);putchar('\\\\n');free(p);\\n    return 0;\\n}\\n","hints":["int *next=realloc(p,(n+1)*sizeof *p);","分配初始 n 个元素，读入新元素 x 后扩为 n+1，把 x 写到 p[n]，再输出整个数组。","成功的 realloc 可能移动对象，旧指针值不能再用于访问，需更新相关指针。"]}}]},{"id":14,"en":"User-Defined Types","title":"结构体、链表与自定义类型","description":"教材第 9 章：聚合数据、结构体指针、链表、共用体、枚举和类型别名。","lessons":[{"id":"c14-1","chapter":14,"index":0,"title":"定义与初始化结构体","en":"Struct Basics","textbook":"9.1","objective":"用结构体保存坐标并输出坐标和","explanation":["结构体把不同成员组成一个新的对象类型，每个成员有自己的存储。struct Point {int x,y;}; 定义类型，struct Point p={1,2}; 定义对象；类型定义和变量定义并不相同。使用点运算符访问对象成员。","C99 支持指定成员初始化，例如 {.y=2,.x=1}。结构体对象可以整体赋值，但一般不能使用 == 比较整个结构体；成员间还可能有填充字节，所以不要把内存布局等同于成员大小的简单相加。"],"syntax":"struct Point { int x,y; };\\nstruct Point p={.x=1,.y=2};","syntaxNotes":"把输入存入 p.x、p.y，再输出两者之和；每个坐标绝对值不超过 1000。","example":"#include <stdio.h>\\nstruct Point {int x,y;};\\nint main(void) {\\n    struct Point p;\\n    if(scanf(\\"%d%d\\",&p.x,&p.y)!=2)return 1;\\n    printf(\\"%d\\\\n\\",p.x+p.y);\\n    return 0;\\n}\\n","exampleInput":"2 5","exampleOutput":"7\\n","walkthrough":"把输入存入 p.x、p.y，再输出两者之和；每个坐标绝对值不超过 1000。","mistakes":["实现可能插入填充字节以满足对齐要求，不能假定没有填充。","点运算符用于结构体或共用体对象；箭头用于指向它们的指针。"],"summary":"用结构体保存坐标并输出坐标和","quizzes":[{"id":"c14-1-q1","type":"single","question":"访问结构体变量 p 的成员 x 应使用什么？","options":["p.x","p->x，任何时候都如此","p[x]"],"answer":["p.x"],"explanation":"点运算符用于结构体或共用体对象；箭头用于指向它们的指针。"},{"id":"c14-1-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["7"],"explanation":"把输入存入 p.x、p.y，再输出两者之和；每个坐标绝对值不超过 1000。"},{"id":"c14-1-q3","type":"boolean","question":"所有结构体的 sizeof 都严格等于各成员 sizeof 之和。","options":["正确","错误"],"answer":["错误"],"explanation":"实现可能插入填充字节以满足对齐要求，不能假定没有填充。"}],"quiz":{"id":"c14-1-q1","type":"single","question":"访问结构体变量 p 的成员 x 应使用什么？","options":["p.x","p->x，任何时候都如此","p[x]"],"answer":["p.x"],"explanation":"点运算符用于结构体或共用体对象；箭头用于指向它们的指针。"},"challenge":{"id":"c14-1-practice","title":"用结构体保存坐标并输出坐标和","difficulty":"Medium","description":"用结构体保存坐标并输出坐标和。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"两个 -1000..1000 的整数坐标。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"2 5","output":"7\\n"},{"input":"-2 2","output":"0\\n"},{"input":"0 0","output":"0\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 用结构体保存坐标并输出坐标和 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nstruct Point {int x,y;};\\nint main(void) {\\n    struct Point p;\\n    if(scanf(\\"%d%d\\",&p.x,&p.y)!=2)return 1;\\n    printf(\\"%d\\\\n\\",p.x+p.y);\\n    return 0;\\n}\\n","hints":["struct Point { int x,y; };","把输入存入 p.x、p.y，再输出两者之和；每个坐标绝对值不超过 1000。","实现可能插入填充字节以满足对齐要求，不能假定没有填充。"]}},{"id":"c14-2","chapter":14,"index":1,"title":"结构体数组与记录查找","en":"Arrays of Records","textbook":"9.2","objective":"从记录数组中找出最高分记录的编号","explanation":["数组可以保存多个结构体，a[i].score 先选择第 i 条记录，再访问它的成员。比起维护互不关联的编号数组和成绩数组，结构体数组更容易让一条记录的数据保持一致，也便于整体复制和交换。","查找最高分需要先用第一条有效记录初始化候选，再逐项比较。若规则要求并列时保留最先出现的记录，只在严格大于时更新。输入数量与数组容量分开保存，遍历只使用有效记录范围。"],"syntax":"struct Record {int id,score;};\\nif(a[i].score>a[best].score) best=i;","syntaxNotes":"n 为 1..10，成绩为 0..100；并列保留第一条，输出它的 id。","example":"#include <stdio.h>\\nstruct Record{int id,score;};\\nint main(void) {\\n    int n;struct Record a[10];if(scanf(\\"%d\\",&n)!=1||n<1||n>10)return 1;\\n    for(int i=0;i<n;i++)if(scanf(\\"%d%d\\",&a[i].id,&a[i].score)!=2)return 1;\\n    int best=0;for(int i=1;i<n;i++)if(a[i].score>a[best].score)best=i;\\n    printf(\\"%d\\\\n\\",a[best].id);\\n    return 0;\\n}\\n","exampleInput":"3 11 80 12 95 13 90","exampleOutput":"12\\n","walkthrough":"n 为 1..10，成绩为 0..100；并列保留第一条，输出它的 id。","mistakes":[">= 会用后来的并列记录替换候选，保留第一条应使用 >。","先通过下标取得结构体对象，再用点运算符选择成员。"],"summary":"从记录数组中找出最高分记录的编号","quizzes":[{"id":"c14-2-q1","type":"single","question":"结构体数组 a 中第 i 条记录的 score 成员怎么访问？","options":["a.score[i]","a[i][score]","a[i].score"],"answer":["a[i].score"],"explanation":"先通过下标取得结构体对象，再用点运算符选择成员。"},{"id":"c14-2-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["12"],"explanation":"n 为 1..10，成绩为 0..100；并列保留第一条，输出它的 id。"},{"id":"c14-2-q3","type":"boolean","question":"为了在并列时保留最先出现的记录，更新条件应写 >=。","options":["正确","错误"],"answer":["错误"],"explanation":">= 会用后来的并列记录替换候选，保留第一条应使用 >。"}],"quiz":{"id":"c14-2-q1","type":"single","question":"结构体数组 a 中第 i 条记录的 score 成员怎么访问？","options":["a.score[i]","a[i][score]","a[i].score"],"answer":["a[i].score"],"explanation":"先通过下标取得结构体对象，再用点运算符选择成员。"},"challenge":{"id":"c14-2-practice","title":"从记录数组中找出最高分记录的编号","difficulty":"Medium","description":"从记录数组中找出最高分记录的编号。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"n（1..10），随后 n 对编号 id（1..1000）与成绩 score（0..100）。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"3 11 80 12 95 13 90","output":"12\\n"},{"input":"2 4 90 5 90","output":"4\\n"},{"input":"1 7 0","output":"7\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 从记录数组中找出最高分记录的编号 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nstruct Record{int id,score;};\\nint main(void) {\\n    int n;struct Record a[10];if(scanf(\\"%d\\",&n)!=1||n<1||n>10)return 1;\\n    for(int i=0;i<n;i++)if(scanf(\\"%d%d\\",&a[i].id,&a[i].score)!=2)return 1;\\n    int best=0;for(int i=1;i<n;i++)if(a[i].score>a[best].score)best=i;\\n    printf(\\"%d\\\\n\\",a[best].id);\\n    return 0;\\n}\\n","hints":["struct Record {int id,score;};","n 为 1..10，成绩为 0..100；并列保留第一条，输出它的 id。",">= 会用后来的并列记录替换候选，保留第一条应使用 >。"]}},{"id":"c14-3","chapter":14,"index":2,"title":"结构体指针与函数传参","en":"Struct Pointers","textbook":"9.3","objective":"通过结构体指针给坐标的两个成员加上偏移","explanation":["指向结构体的指针使用 -> 访问成员，p->x 等价于 (*p).x。括号不能省略为 *p.x，因为点运算符结合更紧。传结构体值会复制对象；传指针让函数可以访问调用者的原对象。","只读取结构体时，可以使用 const struct Point* 明确禁止通过此指针修改成员。要修改原对象则接收普通结构体指针，并保证调用者传入有效地址。本节把位移操作封装成函数，调用处能看出修改目标。"],"syntax":"void move(struct Point*p,int d){p->x+=d;p->y+=d;}","syntaxNotes":"输入 x、y、d 均为 -100..100，函数更新原对象并输出新的两个成员。","example":"#include <stdio.h>\\nstruct Point{int x,y;};\\nstatic void move(struct Point*p,int d){p->x+=d;p->y+=d;}\\nint main(void) {\\n    struct Point p;int d;if(scanf(\\"%d%d%d\\",&p.x,&p.y,&d)!=3)return 1;\\n    move(&p,d);printf(\\"%d %d\\\\n\\",p.x,p.y);\\n    return 0;\\n}\\n","exampleInput":"1 2 3","exampleOutput":"4 5\\n","walkthrough":"输入 x、y、d 均为 -100..100，函数更新原对象并输出新的两个成员。","mistakes":["按值传参复制结构体；要修改调用者对象，需要传入其地址。","先对指针解引用得到结构体对象，再选择成员；括号决定运算顺序。"],"summary":"通过结构体指针给坐标的两个成员加上偏移","quizzes":[{"id":"c14-3-q1","type":"single","question":"p 为结构体指针时，p->x 等价于哪项？","options":["&p.x","(*p).x","*p.x"],"answer":["(*p).x"],"explanation":"先对指针解引用得到结构体对象，再选择成员；括号决定运算顺序。"},{"id":"c14-3-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["4 5"],"explanation":"输入 x、y、d 均为 -100..100，函数更新原对象并输出新的两个成员。"},{"id":"c14-3-q3","type":"boolean","question":"把结构体按值传入函数后，修改形参成员就能修改调用者对象。","options":["正确","错误"],"answer":["错误"],"explanation":"按值传参复制结构体；要修改调用者对象，需要传入其地址。"}],"quiz":{"id":"c14-3-q1","type":"single","question":"p 为结构体指针时，p->x 等价于哪项？","options":["&p.x","(*p).x","*p.x"],"answer":["(*p).x"],"explanation":"先对指针解引用得到结构体对象，再选择成员；括号决定运算顺序。"},"challenge":{"id":"c14-3-practice","title":"通过结构体指针给坐标的两个成员加上偏移","difficulty":"Medium","description":"通过结构体指针给坐标的两个成员加上偏移。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"三个 -100..100 的整数 x、y、d。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"1 2 3","output":"4 5\\n"},{"input":"0 0 -1","output":"-1 -1\\n"},{"input":"-3 5 0","output":"-3 5\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 通过结构体指针给坐标的两个成员加上偏移 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nstruct Point{int x,y;};\\nstatic void move(struct Point*p,int d){p->x+=d;p->y+=d;}\\nint main(void) {\\n    struct Point p;int d;if(scanf(\\"%d%d%d\\",&p.x,&p.y,&d)!=3)return 1;\\n    move(&p,d);printf(\\"%d %d\\\\n\\",p.x,p.y);\\n    return 0;\\n}\\n","hints":["void move(struct Point*p,int d){p->x+=d;p->y+=d;}","输入 x、y、d 均为 -100..100，函数更新原对象并输出新的两个成员。","按值传参复制结构体；要修改调用者对象，需要传入其地址。"]}},{"id":"c14-4","chapter":14,"index":3,"title":"静态链表与遍历","en":"Static Linked Lists","textbook":"9.4.1—9.4.2","objective":"把三个节点连成链表并按链顺序输出","explanation":["链表节点除数据外还保存后继节点的地址。节点在内存中不必相邻，next 决定逻辑顺序。结构体内部可以声明指向自身类型的指针，因为指针大小不依赖完整节点大小；不能直接把同类型完整对象无限嵌入自身。","静态链表使用已经存在的节点对象，通过指针串联，不需要动态分配。遍历从头指针开始，每次处理当前节点后移动到 next，到 NULL 结束。节点的生存期必须覆盖整个遍历，不能保存已经失效的局部节点地址。"],"syntax":"struct Node{int value;struct Node*next;};\\nfor(struct Node*p=head;p;p=p->next) /* 访问 p */","syntaxNotes":"输入三个数，节点按第一个、第三个、第二个的顺序连接，输出该逻辑顺序。","example":"#include <stdio.h>\\nstruct Node{int value;struct Node*next;};\\nint main(void) {\\n    struct Node a,b,c;if(scanf(\\"%d%d%d\\",&a.value,&b.value,&c.value)!=3)return 1;\\n    a.next=&c;c.next=&b;b.next=NULL;\\n    int first=1;for(struct Node*p=&a;p;p=p->next){printf(\\"%s%d\\",first?\\"\\":\\" \\",p->value);first=0;}putchar('\\\\n');\\n    return 0;\\n}\\n","exampleInput":"1 2 3","exampleOutput":"1 3 2\\n","walkthrough":"输入三个数，节点按第一个、第三个、第二个的顺序连接，输出该逻辑顺序。","mistakes":["完整对象不能无限包含自身，但可以包含指向自身类型的指针。","链表按链接关系遍历，节点在物理存储中不需要连续。"],"summary":"把三个节点连成链表并按链顺序输出","quizzes":[{"id":"c14-4-q1","type":"single","question":"链表的逻辑访问顺序由什么决定？","options":["每个节点的 next 指针","节点实际内存地址从小到大","变量在文件中的字母顺序"],"answer":["每个节点的 next 指针"],"explanation":"链表按链接关系遍历，节点在物理存储中不需要连续。"},{"id":"c14-4-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["1 3 2"],"explanation":"输入三个数，节点按第一个、第三个、第二个的顺序连接，输出该逻辑顺序。"},{"id":"c14-4-q3","type":"boolean","question":"结构体 Node 可以直接含一个完整的 struct Node 成员而没有终止层。","options":["正确","错误"],"answer":["错误"],"explanation":"完整对象不能无限包含自身，但可以包含指向自身类型的指针。"}],"quiz":{"id":"c14-4-q1","type":"single","question":"链表的逻辑访问顺序由什么决定？","options":["每个节点的 next 指针","节点实际内存地址从小到大","变量在文件中的字母顺序"],"answer":["每个节点的 next 指针"],"explanation":"链表按链接关系遍历，节点在物理存储中不需要连续。"},"challenge":{"id":"c14-4-practice","title":"把三个节点连成链表并按链顺序输出","difficulty":"Medium","description":"把三个节点连成链表并按链顺序输出。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"三个 -1000..1000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"1 2 3","output":"1 3 2\\n"},{"input":"0 -1 5","output":"0 5 -1\\n"},{"input":"7 7 7","output":"7 7 7\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 把三个节点连成链表并按链顺序输出 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nstruct Node{int value;struct Node*next;};\\nint main(void) {\\n    struct Node a,b,c;if(scanf(\\"%d%d%d\\",&a.value,&b.value,&c.value)!=3)return 1;\\n    a.next=&c;c.next=&b;b.next=NULL;\\n    int first=1;for(struct Node*p=&a;p;p=p->next){printf(\\"%s%d\\",first?\\"\\":\\" \\",p->value);first=0;}putchar('\\\\n');\\n    return 0;\\n}\\n","hints":["struct Node{int value;struct Node*next;};","输入三个数，节点按第一个、第三个、第二个的顺序连接，输出该逻辑顺序。","完整对象不能无限包含自身，但可以包含指向自身类型的指针。"]}},{"id":"c14-5","chapter":14,"index":4,"title":"建立、释放动态链表","en":"Dynamic Linked Lists","textbook":"9.4.3—9.4.4","objective":"动态建立链表并输出各节点数值之和","explanation":["动态链表为每个新节点申请空间，设置数据和 next，再接入链中。头插法让新节点成为 head，因此顺序与输入相反；如果需要保持输入顺序，可以维护尾指针，或使用指向下一链接位置的二级指针。","每次 malloc 都可能失败，失败路径也要释放之前建立的节点。销毁时先保存 next，再释放当前节点，随后移动到保存的地址；free 后不能再读取当前节点的 next。空链表用 NULL 表示，遍历和释放都应能处理它。"],"syntax":"node->next=head; head=node;\\n/* 释放 */ next=head->next; free(head); head=next;","syntaxNotes":"输入 n 为 0..20，使用头插法建立，累加后逐一释放；空链表的总和为 0。","example":"#include <stdio.h>\\n#include <stdlib.h>\\nstruct Node{int value;struct Node*next;};\\nstatic void destroy(struct Node*p){while(p){struct Node*next=p->next;free(p);p=next;}}\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1||n<0||n>20)return 1;\\n    struct Node*head=NULL;\\n    for(int i=0;i<n;i++){int x;if(scanf(\\"%d\\",&x)!=1){destroy(head);return 1;}struct Node*p=malloc(sizeof*p);if(!p){destroy(head);return 1;}p->value=x;p->next=head;head=p;}\\n    int sum=0;for(struct Node*p=head;p;p=p->next)sum+=p->value;\\n    printf(\\"%d\\\\n\\",sum);destroy(head);\\n    return 0;\\n}\\n","exampleInput":"3 2 3 4","exampleOutput":"9\\n","walkthrough":"输入 n 为 0..20，使用头插法建立，累加后逐一释放；空链表的总和为 0。","mistakes":["每次独立分配的节点需要单独释放，C 不会自动沿 next 销毁链。","free 结束节点对象生存期，之后通过它读取 next 也属于无效访问。"],"summary":"动态建立链表并输出各节点数值之和","quizzes":[{"id":"c14-5-q1","type":"single","question":"释放一个链表节点之前为什么保存 next？","options":["为了让 free 释放所有后继","因为 NULL 不能赋值","释放后不能再读取该节点的成员"],"answer":["释放后不能再读取该节点的成员"],"explanation":"free 结束节点对象生存期，之后通过它读取 next 也属于无效访问。"},{"id":"c14-5-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["9"],"explanation":"输入 n 为 0..20，使用头插法建立，累加后逐一释放；空链表的总和为 0。"},{"id":"c14-5-q3","type":"boolean","question":"只要 free(head)，整条 malloc 建立的链表就会自动全部释放。","options":["正确","错误"],"answer":["错误"],"explanation":"每次独立分配的节点需要单独释放，C 不会自动沿 next 销毁链。"}],"quiz":{"id":"c14-5-q1","type":"single","question":"释放一个链表节点之前为什么保存 next？","options":["为了让 free 释放所有后继","因为 NULL 不能赋值","释放后不能再读取该节点的成员"],"answer":["释放后不能再读取该节点的成员"],"explanation":"free 结束节点对象生存期，之后通过它读取 next 也属于无效访问。"},"challenge":{"id":"c14-5-practice","title":"动态建立链表并输出各节点数值之和","difficulty":"Medium","description":"动态建立链表并输出各节点数值之和。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"n（0..20），随后 n 个 -1000..1000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"3 2 3 4","output":"9\\n"},{"input":"0","output":"0\\n"},{"input":"2 -5 5","output":"0\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 动态建立链表并输出各节点数值之和 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <stdlib.h>\\nstruct Node{int value;struct Node*next;};\\nstatic void destroy(struct Node*p){while(p){struct Node*next=p->next;free(p);p=next;}}\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1||n<0||n>20)return 1;\\n    struct Node*head=NULL;\\n    for(int i=0;i<n;i++){int x;if(scanf(\\"%d\\",&x)!=1){destroy(head);return 1;}struct Node*p=malloc(sizeof*p);if(!p){destroy(head);return 1;}p->value=x;p->next=head;head=p;}\\n    int sum=0;for(struct Node*p=head;p;p=p->next)sum+=p->value;\\n    printf(\\"%d\\\\n\\",sum);destroy(head);\\n    return 0;\\n}\\n","hints":["node->next=head; head=node;","输入 n 为 0..20，使用头插法建立，累加后逐一释放；空链表的总和为 0。","每次独立分配的节点需要单独释放，C 不会自动沿 next 销毁链。"]}},{"id":"c14-6","chapter":14,"index":5,"title":"链表插入与删除","en":"Inserting and Removing Nodes","textbook":"9.4 扩展练习","objective":"在三节点链表中删除首个等于目标的节点","explanation":["插入和删除都需要重新连接相邻节点。头节点没有前驱，容易造成额外分支；用指向链接位置的二级指针，可以统一处理 head 和某个节点的 next。修改 *link 就是在修改真正保存当前节点地址的那个位置。","删除节点前先把链接指向其后继，再释放被删节点。只删除第一次匹配要及时停止；没有匹配时保留原链。此练习使用三条动态记录，先按输入顺序构建，再输出删除后的序列，并释放所有剩余节点。"],"syntax":"struct Node **link=&head;\\nwhile(*link && (*link)->value!=target) link=&(*link)->next;\\nif(*link){old=*link;*link=old->next;free(old);}","syntaxNotes":"读取三个值和一个目标，只删除首个匹配。剩余节点按原顺序输出，以空格分隔。","example":"#include <stdio.h>\\n#include <stdlib.h>\\nstruct Node{int value;struct Node*next;};\\nstatic void destroy(struct Node*p){while(p){struct Node*n=p->next;free(p);p=n;}}\\nint main(void) {\\n    struct Node*head=NULL,**tail=&head;int target;\\n    for(int i=0;i<3;i++){int x;if(scanf(\\"%d\\",&x)!=1){destroy(head);return 1;}struct Node*p=malloc(sizeof*p);if(!p){destroy(head);return 1;}p->value=x;p->next=NULL;*tail=p;tail=&p->next;}\\n    if(scanf(\\"%d\\",&target)!=1){destroy(head);return 1;}\\n    struct Node**link=&head;while(*link&&(*link)->value!=target)link=&(*link)->next;\\n    if(*link){struct Node*old=*link;*link=old->next;free(old);}\\n    int first=1;for(struct Node*p=head;p;p=p->next){printf(\\"%s%d\\",first?\\"\\":\\" \\",p->value);first=0;}putchar('\\\\n');destroy(head);\\n    return 0;\\n}\\n","exampleInput":"1 2 3 1","exampleOutput":"2 3\\n","walkthrough":"读取三个值和一个目标，只删除首个匹配。剩余节点按原顺序输出，以空格分隔。","mistakes":["先读取并保存后继或直接重接链接，再 free，不能访问已释放对象。","删除后 head 应指向原头的后继；二级指针可以统一修改头链接和 next 链接。"],"summary":"在三节点链表中删除首个等于目标的节点","quizzes":[{"id":"c14-6-q1","type":"single","question":"删除头节点时，必须更新哪个链接？","options":["必须移动所有节点的实际内存","head 保存的首节点地址","只更新一个局部整数"],"answer":["head 保存的首节点地址"],"explanation":"删除后 head 应指向原头的后继；二级指针可以统一修改头链接和 next 链接。"},{"id":"c14-6-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["2 3"],"explanation":"读取三个值和一个目标，只删除首个匹配。剩余节点按原顺序输出，以空格分隔。"},{"id":"c14-6-q3","type":"boolean","question":"先 free(old)，随后再访问 old->next 更新链接，是安全的删除顺序。","options":["正确","错误"],"answer":["错误"],"explanation":"先读取并保存后继或直接重接链接，再 free，不能访问已释放对象。"}],"quiz":{"id":"c14-6-q1","type":"single","question":"删除头节点时，必须更新哪个链接？","options":["必须移动所有节点的实际内存","head 保存的首节点地址","只更新一个局部整数"],"answer":["head 保存的首节点地址"],"explanation":"删除后 head 应指向原头的后继；二级指针可以统一修改头链接和 next 链接。"},"challenge":{"id":"c14-6-practice","title":"在三节点链表中删除首个等于目标的节点","difficulty":"Medium","description":"在三节点链表中删除首个等于目标的节点。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"三个 -100..100 的节点值，再输入一个 -100..100 的目标值。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"1 2 3 1","output":"2 3\\n"},{"input":"1 2 3 2","output":"1 3\\n"},{"input":"1 2 3 9","output":"1 2 3\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 在三节点链表中删除首个等于目标的节点 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <stdlib.h>\\nstruct Node{int value;struct Node*next;};\\nstatic void destroy(struct Node*p){while(p){struct Node*n=p->next;free(p);p=n;}}\\nint main(void) {\\n    struct Node*head=NULL,**tail=&head;int target;\\n    for(int i=0;i<3;i++){int x;if(scanf(\\"%d\\",&x)!=1){destroy(head);return 1;}struct Node*p=malloc(sizeof*p);if(!p){destroy(head);return 1;}p->value=x;p->next=NULL;*tail=p;tail=&p->next;}\\n    if(scanf(\\"%d\\",&target)!=1){destroy(head);return 1;}\\n    struct Node**link=&head;while(*link&&(*link)->value!=target)link=&(*link)->next;\\n    if(*link){struct Node*old=*link;*link=old->next;free(old);}\\n    int first=1;for(struct Node*p=head;p;p=p->next){printf(\\"%s%d\\",first?\\"\\":\\" \\",p->value);first=0;}putchar('\\\\n');destroy(head);\\n    return 0;\\n}\\n","hints":["struct Node **link=&head;","读取三个值和一个目标，只删除首个匹配。剩余节点按原顺序输出，以空格分隔。","先读取并保存后继或直接重接链接，再 free，不能访问已释放对象。"]}},{"id":"c14-7","chapter":14,"index":6,"title":"共用体与有效成员","en":"Unions and Tagged Values","textbook":"9.5","objective":"用标签区分整数值与实数值并输出","explanation":["共用体的成员共享存储，同一时刻通常用其中一个成员表达当前值。它与结构体不同，不能把成员当成彼此独立的数据。给一个成员赋值会影响同一区域内其他成员的表示，因此接口必须知道当前有效的成员。","实践中把共用体与标签配对：标签表示当前保存的是整数还是浮点数，读取时只选择对应成员。读取非当前成员涉及对象表示、实现差异及潜在陷阱，初学阶段不应把它当作可靠的数值转换方式。"],"syntax":"union Value{int i;double d;};\\n/* tag=0 使用 i，tag=1 使用 d */","syntaxNotes":"模式为 0 时输入 int 并原样输出；模式为 1 时输入 double 并保留两位小数输出。","example":"#include <stdio.h>\\nunion Value{int i;double d;};\\nint main(void) {\\n    int tag;union Value v;if(scanf(\\"%d\\",&tag)!=1)return 1;\\n    if(tag==0){if(scanf(\\"%d\\",&v.i)!=1)return 1;printf(\\"%d\\\\n\\",v.i);}\\n    else{if(scanf(\\"%lf\\",&v.d)!=1)return 1;printf(\\"%.2f\\\\n\\",v.d);}\\n    return 0;\\n}\\n","exampleInput":"0 42","exampleOutput":"42\\n","walkthrough":"模式为 0 时输入 int 并原样输出；模式为 1 时输入 double 并保留两位小数输出。","mistakes":["共享对象表示不等于算术转换；需要数值转换时显式使用合适的转换表达式。","成员共享存储，标签提供当前数值的解释方式，避免读错成员。"],"summary":"用标签区分整数值与实数值并输出","quizzes":[{"id":"c14-7-q1","type":"single","question":"为什么常给 union 配套一个标签字段？","options":["说明当前应读取哪个成员","让所有成员同时拥有独立空间","把共用体转换成数组"],"answer":["说明当前应读取哪个成员"],"explanation":"成员共享存储，标签提供当前数值的解释方式，避免读错成员。"},{"id":"c14-7-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["42"],"explanation":"模式为 0 时输入 int 并原样输出；模式为 1 时输入 double 并保留两位小数输出。"},{"id":"c14-7-q3","type":"boolean","question":"给 union 的 double 成员赋值后，int 成员自动得到正确的强制类型转换结果。","options":["正确","错误"],"answer":["错误"],"explanation":"共享对象表示不等于算术转换；需要数值转换时显式使用合适的转换表达式。"}],"quiz":{"id":"c14-7-q1","type":"single","question":"为什么常给 union 配套一个标签字段？","options":["说明当前应读取哪个成员","让所有成员同时拥有独立空间","把共用体转换成数组"],"answer":["说明当前应读取哪个成员"],"explanation":"成员共享存储，标签提供当前数值的解释方式，避免读错成员。"},"challenge":{"id":"c14-7-practice","title":"用标签区分整数值与实数值并输出","difficulty":"Medium","description":"用标签区分整数值与实数值并输出。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"tag（0 或 1），然后输入对应整数或有限实数，绝对值不超过 1000。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"0 42","output":"42\\n"},{"input":"1 2.5","output":"2.50\\n"},{"input":"0 -3","output":"-3\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 用标签区分整数值与实数值并输出 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\nunion Value{int i;double d;};\\nint main(void) {\\n    int tag;union Value v;if(scanf(\\"%d\\",&tag)!=1)return 1;\\n    if(tag==0){if(scanf(\\"%d\\",&v.i)!=1)return 1;printf(\\"%d\\\\n\\",v.i);}\\n    else{if(scanf(\\"%lf\\",&v.d)!=1)return 1;printf(\\"%.2f\\\\n\\",v.d);}\\n    return 0;\\n}\\n","hints":["union Value{int i;double d;};","模式为 0 时输入 int 并原样输出；模式为 1 时输入 double 并保留两位小数输出。","共享对象表示不等于算术转换；需要数值转换时显式使用合适的转换表达式。"]}},{"id":"c14-8","chapter":14,"index":7,"title":"枚举、typedef 与类型名称","en":"Enums and Type Aliases","textbook":"9.6—9.7","objective":"使用枚举状态输出对应名称","explanation":["enum 为一组整数常量命名，未指定的首项默认为零，后续项在前项值上加一。枚举让状态判断比直接写魔法数字更清楚，但 C 不会自动把外部输入限制为列举的那些值，仍需验证范围。","typedef 为已有类型建立别名，不建立新的存储对象，也不会自动创建与原类型不兼容的新类型。可以用 typedef struct {...} Record 简化类型名称；给指针取别名时尤其要留意 const 修饰的是别名代表的整体类型。"],"syntax":"typedef enum { READY=0,RUNNING=1,DONE=2 } State;","syntaxNotes":"输入 0..2，通过 switch 输出 READY、RUNNING 或 DONE；超出范围报告输入失败。","example":"#include <stdio.h>\\ntypedef enum{READY=0,RUNNING=1,DONE=2}State;\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1||n<0||n>2)return 1;\\n    State s=(State)n;switch(s){case READY:puts(\\"READY\\");break;case RUNNING:puts(\\"RUNNING\\");break;case DONE:puts(\\"DONE\\");break;}\\n    return 0;\\n}\\n","exampleInput":"0","exampleOutput":"READY\\n","walkthrough":"输入 0..2，通过 switch 输出 READY、RUNNING 或 DONE；超出范围报告输入失败。","mistakes":["没有显式赋值的枚举常量在前一个枚举值基础上加一。","typedef 建立名称，声明变量时才创建相应对象。"],"summary":"使用枚举状态输出对应名称","quizzes":[{"id":"c14-8-q1","type":"single","question":"typedef int Score; 的含义是什么？","options":["分配一个名叫 Score 的 int 变量","创建与 int 完全不兼容的独立类型","给 int 建立类型别名 Score"],"answer":["给 int 建立类型别名 Score"],"explanation":"typedef 建立名称，声明变量时才创建相应对象。"},{"id":"c14-8-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["READY"],"explanation":"输入 0..2，通过 switch 输出 READY、RUNNING 或 DONE；超出范围报告输入失败。"},{"id":"c14-8-q3","type":"boolean","question":"enum A { X=3,Y,Z }; 中 Y 的值是 4。","options":["正确","错误"],"answer":["正确"],"explanation":"没有显式赋值的枚举常量在前一个枚举值基础上加一。"}],"quiz":{"id":"c14-8-q1","type":"single","question":"typedef int Score; 的含义是什么？","options":["分配一个名叫 Score 的 int 变量","创建与 int 完全不兼容的独立类型","给 int 建立类型别名 Score"],"answer":["给 int 建立类型别名 Score"],"explanation":"typedef 建立名称，声明变量时才创建相应对象。"},"challenge":{"id":"c14-8-practice","title":"使用枚举状态输出对应名称","difficulty":"Medium","description":"使用枚举状态输出对应名称。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 0、1 或 2。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"0","output":"READY\\n"},{"input":"1","output":"RUNNING\\n"},{"input":"2","output":"DONE\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 使用枚举状态输出对应名称 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\ntypedef enum{READY=0,RUNNING=1,DONE=2}State;\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1||n<0||n>2)return 1;\\n    State s=(State)n;switch(s){case READY:puts(\\"READY\\");break;case RUNNING:puts(\\"RUNNING\\");break;case DONE:puts(\\"DONE\\");break;}\\n    return 0;\\n}\\n","hints":["typedef enum { READY=0,RUNNING=1,DONE=2 } State;","输入 0..2，通过 switch 输出 READY、RUNNING 或 DONE；超出范围报告输入失败。","没有显式赋值的枚举常量在前一个枚举值基础上加一。"]}}]},{"id":15,"en":"File Input & Output","title":"文件输入输出","description":"教材第 10 章：流、文本与二进制、定位和错误检查。","lessons":[{"id":"c15-1","chapter":15,"index":0,"title":"文件流、打开模式与关闭","en":"Opening and Closing Files","textbook":"10.1—10.2","objective":"把输入单词写入 note.txt 并输出写入长度","explanation":["C 使用 FILE* 管理流状态，包括缓冲区、文件位置和错误标志。文件可用于保存文本或二进制数据；文件名和目录规则由运行环境决定。本网站的文件位于每次运行独立的虚拟文件系统，运行后可查看和下载，不会写入电脑磁盘。","fopen 的 r 要求文件已存在，w 创建或截断，a 创建或追加；带 + 可读写，b 表示二进制模式。打开失败返回 NULL，不能继续读写。fclose 刷新并关闭流，也应检查结果；更新流切换读写方向还需要按规则刷新或定位。"],"syntax":"FILE*f=fopen(\\"note.txt\\",\\"w\\");\\nif(!f) return 1;\\n/* 写入 */ if(fclose(f)!=0) return 1;","syntaxNotes":"读取最多 40 字节的单词，写入文件并加换行；输出单词字节数，文件内容也会参加判题。","example":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char s[41];if(scanf(\\"%40s\\",s)!=1)return 1;\\n    FILE*f=fopen(\\"note.txt\\",\\"w\\");if(!f)return 1;\\n    if(fprintf(f,\\"%s\\\\n\\",s)<0){fclose(f);return 1;}\\n    if(fclose(f)!=0)return 1;printf(\\"%zu\\\\n\\",strlen(s));\\n    return 0;\\n}\\n","exampleInput":"hello","exampleOutput":"5\\n","walkthrough":"读取最多 40 字节的单词，写入文件并加换行；输出单词字节数，文件内容也会参加判题。","mistakes":["返回值可能是 NULL，打开失败后必须停止使用该流指针。","追加应使用 a；w 会创建新文件或截断已有文件。"],"summary":"把输入单词写入 note.txt 并输出写入长度","quizzes":[{"id":"c15-1-q1","type":"single","question":"用 w 模式打开已经存在的文本文件会发生什么？","options":["原内容被截断，准备从头写入","一定在原文件末尾追加","保持旧内容并从随机位置开始"],"answer":["原内容被截断，准备从头写入"],"explanation":"追加应使用 a；w 会创建新文件或截断已有文件。"},{"id":"c15-1-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["5"],"explanation":"读取最多 40 字节的单词，写入文件并加换行；输出单词字节数，文件内容也会参加判题。"},{"id":"c15-1-q3","type":"boolean","question":"只要 fopen 返回了一个 FILE* 变量，就不必检查 NULL。","options":["正确","错误"],"answer":["错误"],"explanation":"返回值可能是 NULL，打开失败后必须停止使用该流指针。"}],"quiz":{"id":"c15-1-q1","type":"single","question":"用 w 模式打开已经存在的文本文件会发生什么？","options":["原内容被截断，准备从头写入","一定在原文件末尾追加","保持旧内容并从随机位置开始"],"answer":["原内容被截断，准备从头写入"],"explanation":"追加应使用 a；w 会创建新文件或截断已有文件。"},"challenge":{"id":"c15-1-practice","title":"把输入单词写入 note.txt 并输出写入长度","difficulty":"Medium","description":"创建 note.txt，把输入单词和一个换行写入文件；终端输出单词长度。判题同时检查终端和文件内容。","input":"一个 1..40 字节、不含空白的 ASCII 单词。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"hello","output":"5\\n","expectedFiles":{"note.txt":"hello\\n"}},{"input":"C99","output":"3\\n","expectedFiles":{"note.txt":"C99\\n"}},{"input":"a","output":"1\\n","expectedFiles":{"note.txt":"a\\n"}}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 把输入单词写入 note.txt 并输出写入长度 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <string.h>\\n\\nint main(void) {\\n    char s[41];if(scanf(\\"%40s\\",s)!=1)return 1;\\n    FILE*f=fopen(\\"note.txt\\",\\"w\\");if(!f)return 1;\\n    if(fprintf(f,\\"%s\\\\n\\",s)<0){fclose(f);return 1;}\\n    if(fclose(f)!=0)return 1;printf(\\"%zu\\\\n\\",strlen(s));\\n    return 0;\\n}\\n","hints":["FILE*f=fopen(\\"note.txt\\",\\"w\\");","读取最多 40 字节的单词，写入文件并加换行；输出单词字节数，文件内容也会参加判题。","返回值可能是 NULL，打开失败后必须停止使用该流指针。"]}},{"id":"c15-2","chapter":15,"index":1,"title":"逐字符复制文件","en":"Character File I/O","textbook":"10.3.1","objective":"把 source.txt 的内容复制到 copy.txt","explanation":["fgetc 与 getchar 相似，返回一个字节值或 EOF；fputc 把一个字符写到指定流。复制文件应以读取函数的返回值为循环条件，不能在读取前只依赖 feof，因为 EOF 标志要在读取失败后才会设置。","两个流都要检查打开结果。写入失败、读取错误或关闭失败都可能使复制不完整，成功路径与错误路径都要关闭已经打开的流。练习的 source.txt 由虚拟文件区域提供，每次测试使用新的文件系统，互不影响。"],"syntax":"int ch;\\nwhile((ch=fgetc(in))!=EOF)\\n    if(fputc(ch,out)==EOF) /* 写失败 */;","syntaxNotes":"复制后输出字节数；读取到 EOF 后检查 ferror，避免把读取错误当作正常结束。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    FILE*in=fopen(\\"source.txt\\",\\"r\\");if(!in)return 1;\\n    FILE*out=fopen(\\"copy.txt\\",\\"w\\");if(!out){fclose(in);return 1;}\\n    int ch,n=0,ok=1;while((ch=fgetc(in))!=EOF){if(fputc(ch,out)==EOF){ok=0;break;}n++;}\\n    if(ferror(in))ok=0;if(fclose(in)!=0)ok=0;if(fclose(out)!=0)ok=0;\\n    if(!ok)return 1;printf(\\"%d\\\\n\\",n);\\n    return 0;\\n}\\n","exampleInput":"","exampleOutput":"4\\n","walkthrough":"复制后输出字节数；读取到 EOF 后检查 ferror，避免把读取错误当作正常结束。","mistakes":["EOF 是读取函数报告结束或错误的返回值，不是每个文件末尾存储的一个字节。","EOF 也可能表示读取失败，ferror 用来区分流错误。"],"summary":"把 source.txt 的内容复制到 copy.txt","quizzes":[{"id":"c15-2-q1","type":"single","question":"fgetc 的结果应该如何判断文件正常结束？","options":["先用 feof 再决定是否读取","用 char 保存后与零比较","用 int 保存并与 EOF 比较，结束后检查 ferror"],"answer":["用 int 保存并与 EOF 比较，结束后检查 ferror"],"explanation":"EOF 也可能表示读取失败，ferror 用来区分流错误。"},{"id":"c15-2-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["4"],"explanation":"复制后输出字节数；读取到 EOF 后检查 ferror，避免把读取错误当作正常结束。"},{"id":"c15-2-q3","type":"boolean","question":"文件末尾一定保存一个名为 EOF 的特殊字符。","options":["正确","错误"],"answer":["错误"],"explanation":"EOF 是读取函数报告结束或错误的返回值，不是每个文件末尾存储的一个字节。"}],"quiz":{"id":"c15-2-q1","type":"single","question":"fgetc 的结果应该如何判断文件正常结束？","options":["先用 feof 再决定是否读取","用 char 保存后与零比较","用 int 保存并与 EOF 比较，结束后检查 ferror"],"answer":["用 int 保存并与 EOF 比较，结束后检查 ferror"],"explanation":"EOF 也可能表示读取失败，ferror 用来区分流错误。"},"challenge":{"id":"c15-2-practice","title":"把 source.txt 的内容复制到 copy.txt","difficulty":"Medium","description":"把 source.txt 的内容复制到 copy.txt。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"无标准输入；source.txt 由虚拟文件区域提供，内容不超过 10000 字节。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"","output":"4\\n","files":{"source.txt":"abc\\n"},"expectedFiles":{"copy.txt":"abc\\n"}},{"input":"","output":"0\\n","files":{"source.txt":""},"expectedFiles":{"copy.txt":""}},{"input":"","output":"5\\n","files":{"source.txt":"A B!\\n"},"expectedFiles":{"copy.txt":"A B!\\n"}}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 把 source.txt 的内容复制到 copy.txt */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    FILE*in=fopen(\\"source.txt\\",\\"r\\");if(!in)return 1;\\n    FILE*out=fopen(\\"copy.txt\\",\\"w\\");if(!out){fclose(in);return 1;}\\n    int ch,n=0,ok=1;while((ch=fgetc(in))!=EOF){if(fputc(ch,out)==EOF){ok=0;break;}n++;}\\n    if(ferror(in))ok=0;if(fclose(in)!=0)ok=0;if(fclose(out)!=0)ok=0;\\n    if(!ok)return 1;printf(\\"%d\\\\n\\",n);\\n    return 0;\\n}\\n","hints":["int ch;","复制后输出字节数；读取到 EOF 后检查 ferror，避免把读取错误当作正常结束。","EOF 是读取函数报告结束或错误的返回值，不是每个文件末尾存储的一个字节。"],"files":{"source.txt":"abc\\n"}},"exampleFiles":{"source.txt":"abc\\n"}},{"id":"c15-3","chapter":15,"index":2,"title":"按行读写文件","en":"Line File I/O","textbook":"10.3.2","objective":"统计 lines.txt 读到的行数","explanation":["fgets 可以从任意 FILE* 读取文本，fputs 把字符串写到流中且不自动添加换行。与 puts 不同，fputs 是否输出换行取决于字符串本身。按行处理时必须考虑缓冲区大小和文件最后一行是否带换行。","一条长行可能被 fgets 拆成多次返回，因此“调用成功次数”等于行数只在行长有界且缓冲区足够时成立。本题明确每行最多 80 个字节，用 82 字节缓冲区读取；末尾没有换行的非空行也算一行。"],"syntax":"while(fgets(line,sizeof line,f)) ++count;","syntaxNotes":"文件每行最多 80 字节；空文件为 0 行，只有换行的文件包含一条空行。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    FILE*f=fopen(\\"lines.txt\\",\\"r\\");if(!f)return 1;\\n    char line[82];int n=0;while(fgets(line,sizeof line,f))n++;\\n    int ok=!ferror(f);if(fclose(f)!=0)ok=0;if(!ok)return 1;\\n    printf(\\"%d\\\\n\\",n);\\n    return 0;\\n}\\n","exampleInput":"","exampleOutput":"2\\n","walkthrough":"文件每行最多 80 字节；空文件为 0 行，只有换行的文件包含一条空行。","mistakes":["容量不够时一行会分成多次返回，必须处理分段或限制输入行长。","puts 向 stdout 写入并附加换行；fputs 不自动补换行。"],"summary":"统计 lines.txt 读到的行数","quizzes":[{"id":"c15-3-q1","type":"single","question":"fputs(\\"abc\\",f) 会自动附加换行吗？","options":["会附加两个换行","不会，按字符串本身写入","总会附加一个换行"],"answer":["不会，按字符串本身写入"],"explanation":"puts 向 stdout 写入并附加换行；fputs 不自动补换行。"},{"id":"c15-3-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["2"],"explanation":"文件每行最多 80 字节；空文件为 0 行，只有换行的文件包含一条空行。"},{"id":"c15-3-q3","type":"boolean","question":"无论一行多长，每次 fgets 成功都一定得到完整的一行。","options":["正确","错误"],"answer":["错误"],"explanation":"容量不够时一行会分成多次返回，必须处理分段或限制输入行长。"}],"quiz":{"id":"c15-3-q1","type":"single","question":"fputs(\\"abc\\",f) 会自动附加换行吗？","options":["会附加两个换行","不会，按字符串本身写入","总会附加一个换行"],"answer":["不会，按字符串本身写入"],"explanation":"puts 向 stdout 写入并附加换行；fputs 不自动补换行。"},"challenge":{"id":"c15-3-practice","title":"统计 lines.txt 读到的行数","difficulty":"Medium","description":"统计 lines.txt 读到的行数。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"无标准输入；编辑 lines.txt，每行不超过 80 字节，文件不超过 10000 字节。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"","output":"2\\n","files":{"lines.txt":"first\\nsecond"}},{"input":"","output":"0\\n","files":{"lines.txt":""}},{"input":"","output":"1\\n","files":{"lines.txt":"\\n"}}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 统计 lines.txt 读到的行数 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    FILE*f=fopen(\\"lines.txt\\",\\"r\\");if(!f)return 1;\\n    char line[82];int n=0;while(fgets(line,sizeof line,f))n++;\\n    int ok=!ferror(f);if(fclose(f)!=0)ok=0;if(!ok)return 1;\\n    printf(\\"%d\\\\n\\",n);\\n    return 0;\\n}\\n","hints":["while(fgets(line,sizeof line,f)) ++count;","文件每行最多 80 字节；空文件为 0 行，只有换行的文件包含一条空行。","容量不够时一行会分成多次返回，必须处理分段或限制输入行长。"],"files":{"lines.txt":"first\\nsecond"}},"exampleFiles":{"lines.txt":"first\\nsecond"}},{"id":"c15-4","chapter":15,"index":3,"title":"格式化读写记录文件","en":"Formatted File I/O","textbook":"10.3.3","objective":"从 scores.txt 读取编号与成绩并写总分文件","explanation":["fprintf 和 fscanf 分别把 printf、scanf 的格式转换用于指定的流。格式化文件便于人阅读，但仍需处理不完整记录和错误数据。读取一条含两个字段的记录时，只有返回 2 才能把它作为完整记录使用。","文件格式是程序之间的约定。练习限定每条记录为编号和整数成绩，中间可有空白；输入结束时允许最后没有换行。若只读到一项或遇到不能转换的内容，程序应报告失败，而不是继续使用未初始化的字段。"],"syntax":"while((r=fscanf(f,\\"%d%d\\",&id,&score))==2) sum+=score;\\nif(r!=EOF || ferror(f)) /* 输入错误 */;","syntaxNotes":"统计每条记录成绩，写入 total.txt，以 sum=数字 的格式保存，并在终端输出总分。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    FILE*f=fopen(\\"scores.txt\\",\\"r\\");if(!f)return 1;\\n    int id,s,r,sum=0;while((r=fscanf(f,\\"%d%d\\",&id,&s))==2)sum+=s;\\n    int ok=r==EOF&&!ferror(f);if(fclose(f)!=0)ok=0;if(!ok)return 1;\\n    FILE*out=fopen(\\"total.txt\\",\\"w\\");if(!out)return 1;\\n    ok=fprintf(out,\\"sum=%d\\\\n\\",sum)>=0;if(fclose(out)!=0)ok=0;if(!ok)return 1;printf(\\"%d\\\\n\\",sum);\\n    return 0;\\n}\\n","exampleInput":"","exampleOutput":"170\\n","walkthrough":"统计每条记录成绩，写入 total.txt，以 sum=数字 的格式保存，并在终端输出总分。","mistakes":["换行需要在格式字符串中显式写出，否则记录可能直接连在一起。","返回值是成功转换并赋值的字段数，少于 2 就不是完整记录。"],"summary":"从 scores.txt 读取编号与成绩并写总分文件","quizzes":[{"id":"c15-4-q1","type":"single","question":"fscanf 读取含两个字段的完整记录时，应要求返回多少？","options":["2","0","只要不是 EOF 就行"],"answer":["2"],"explanation":"返回值是成功转换并赋值的字段数，少于 2 就不是完整记录。"},{"id":"c15-4-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["170"],"explanation":"统计每条记录成绩，写入 total.txt，以 sum=数字 的格式保存，并在终端输出总分。"},{"id":"c15-4-q3","type":"boolean","question":"fprintf 会自动把每次调用都写成一个带换行的新记录。","options":["正确","错误"],"answer":["错误"],"explanation":"换行需要在格式字符串中显式写出，否则记录可能直接连在一起。"}],"quiz":{"id":"c15-4-q1","type":"single","question":"fscanf 读取含两个字段的完整记录时，应要求返回多少？","options":["2","0","只要不是 EOF 就行"],"answer":["2"],"explanation":"返回值是成功转换并赋值的字段数，少于 2 就不是完整记录。"},"challenge":{"id":"c15-4-practice","title":"从 scores.txt 读取编号与成绩并写总分文件","difficulty":"Medium","description":"从 scores.txt 读取编号与成绩并写总分文件。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"无标准输入；scores.txt 含 0..20 对编号与成绩，成绩为 0..100。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"","output":"170\\n","files":{"scores.txt":"1 80\\n2 90\\n"},"expectedFiles":{"total.txt":"sum=170\\n"}},{"input":"","output":"0\\n","files":{"scores.txt":""},"expectedFiles":{"total.txt":"sum=0\\n"}},{"input":"","output":"45\\n","files":{"scores.txt":"7 45"},"expectedFiles":{"total.txt":"sum=45\\n"}}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 从 scores.txt 读取编号与成绩并写总分文件 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    FILE*f=fopen(\\"scores.txt\\",\\"r\\");if(!f)return 1;\\n    int id,s,r,sum=0;while((r=fscanf(f,\\"%d%d\\",&id,&s))==2)sum+=s;\\n    int ok=r==EOF&&!ferror(f);if(fclose(f)!=0)ok=0;if(!ok)return 1;\\n    FILE*out=fopen(\\"total.txt\\",\\"w\\");if(!out)return 1;\\n    ok=fprintf(out,\\"sum=%d\\\\n\\",sum)>=0;if(fclose(out)!=0)ok=0;if(!ok)return 1;printf(\\"%d\\\\n\\",sum);\\n    return 0;\\n}\\n","hints":["while((r=fscanf(f,\\"%d%d\\",&id,&score))==2) sum+=score;","统计每条记录成绩，写入 total.txt，以 sum=数字 的格式保存，并在终端输出总分。","换行需要在格式字符串中显式写出，否则记录可能直接连在一起。"],"files":{"scores.txt":"1 80\\n2 90\\n"}},"exampleFiles":{"scores.txt":"1 80\\n2 90\\n"}},{"id":"c15-5","chapter":15,"index":4,"title":"二进制块读写","en":"Binary File I/O","textbook":"10.3.4","objective":"把三个整数写入二进制文件再读回求和","explanation":["fwrite 和 fread 按对象大小与数量搬运字节，返回成功处理的完整对象个数，而不是总字节数。二进制模式用 wb、rb 表达意图；文本与二进制在某些系统存在换行转换差异，浏览器环境中不应据此推断所有系统都相同。","直接保存 int 或结构体的原始表示，只适合相同实现之间的实验。字节序、类型宽度和结构体填充都可能不同，不能把本例的二进制文件当成可移植交换格式。跨平台文件应自行约定字节格式，再逐字段编码。"],"syntax":"fwrite(a,sizeof a[0],3,f);\\nfread(b,sizeof b[0],3,f);","syntaxNotes":"先用 wb 保存，关闭后再用 rb 打开读取；必须确认写入、读取都完成三个对象。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int a[3],b[3];for(int i=0;i<3;i++)if(scanf(\\"%d\\",&a[i])!=1)return 1;\\n    FILE*f=fopen(\\"numbers.bin\\",\\"wb\\");if(!f)return 1;\\n    int ok=fwrite(a,sizeof a[0],3,f)==3;if(fclose(f)!=0)ok=0;if(!ok)return 1;\\n    f=fopen(\\"numbers.bin\\",\\"rb\\");if(!f)return 1;ok=fread(b,sizeof b[0],3,f)==3;\\n    if(fclose(f)!=0)ok=0;if(!ok)return 1;printf(\\"%d\\\\n\\",b[0]+b[1]+b[2]);\\n    return 0;\\n}\\n","exampleInput":"1 2 3","exampleOutput":"6\\n","walkthrough":"先用 wb 保存，关闭后再用 rb 打开读取；必须确认写入、读取都完成三个对象。","mistakes":["填充、字节序和类型表示可能不同；可移植格式需要显式定义编码。","返回成功写入的对象个数，size 参数已经给出了每个对象的字节数。"],"summary":"把三个整数写入二进制文件再读回求和","quizzes":[{"id":"c15-5-q1","type":"single","question":"fwrite(a,sizeof(int),3,f) 成功写完时通常返回什么？","options":["3*sizeof(int)","0","3"],"answer":["3"],"explanation":"返回成功写入的对象个数，size 参数已经给出了每个对象的字节数。"},{"id":"c15-5-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["6"],"explanation":"先用 wb 保存，关闭后再用 rb 打开读取；必须确认写入、读取都完成三个对象。"},{"id":"c15-5-q3","type":"boolean","question":"直接 fwrite 一个结构体产生的文件总能跨任意机器按同样结构读回。","options":["正确","错误"],"answer":["错误"],"explanation":"填充、字节序和类型表示可能不同；可移植格式需要显式定义编码。"}],"quiz":{"id":"c15-5-q1","type":"single","question":"fwrite(a,sizeof(int),3,f) 成功写完时通常返回什么？","options":["3*sizeof(int)","0","3"],"answer":["3"],"explanation":"返回成功写入的对象个数，size 参数已经给出了每个对象的字节数。"},"challenge":{"id":"c15-5-practice","title":"把三个整数写入二进制文件再读回求和","difficulty":"Medium","description":"把三个整数写入二进制文件再读回求和。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"三个 -1000..1000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"1 2 3","output":"6\\n"},{"input":"-2 0 2","output":"0\\n"},{"input":"10 20 30","output":"60\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 把三个整数写入二进制文件再读回求和 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    int a[3],b[3];for(int i=0;i<3;i++)if(scanf(\\"%d\\",&a[i])!=1)return 1;\\n    FILE*f=fopen(\\"numbers.bin\\",\\"wb\\");if(!f)return 1;\\n    int ok=fwrite(a,sizeof a[0],3,f)==3;if(fclose(f)!=0)ok=0;if(!ok)return 1;\\n    f=fopen(\\"numbers.bin\\",\\"rb\\");if(!f)return 1;ok=fread(b,sizeof b[0],3,f)==3;\\n    if(fclose(f)!=0)ok=0;if(!ok)return 1;printf(\\"%d\\\\n\\",b[0]+b[1]+b[2]);\\n    return 0;\\n}\\n","hints":["fwrite(a,sizeof a[0],3,f);","先用 wb 保存，关闭后再用 rb 打开读取；必须确认写入、读取都完成三个对象。","填充、字节序和类型表示可能不同；可移植格式需要显式定义编码。"]}},{"id":"c15-6","chapter":15,"index":5,"title":"文件位置、定位与回退","en":"Random File Access","textbook":"10.4","objective":"定位到 data.txt 的第 k 个字节并读取","explanation":["每个流维护当前位置。ftell 查询位置，fseek 按起点和偏移调整位置，rewind 回到起点并清除错误标志。读取某条固定宽度二进制记录时可以根据记录序号计算偏移，但必须检查乘法范围和定位操作是否成功。","文本流的位置值不一定等于简单字节计数，标准对文本流的 fseek 用法有额外限制。本节使用 rb 二进制模式和 ASCII 测试数据，从 SEEK_SET 定位到给定字节；如果位置到达文件末尾，读取将返回 EOF。"],"syntax":"if(fseek(f,k,SEEK_SET)!=0) return 1;\\nint ch=fgetc(f);","syntaxNotes":"输入 k 为 0..4，在五字节文件 ABCDE 中读取一个字符，rewind 后再读取首字符。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    long k;if(scanf(\\"%ld\\",&k)!=1||k<0||k>4)return 1;\\n    FILE*f=fopen(\\"data.txt\\",\\"rb\\");if(!f)return 1;\\n    if(fseek(f,k,SEEK_SET)!=0){fclose(f);return 1;}int ch=fgetc(f);\\n    rewind(f);int first=fgetc(f);int ok=!ferror(f)&&ch!=EOF&&first!=EOF;\\n    if(fclose(f)!=0)ok=0;if(!ok)return 1;printf(\\"%c %c\\\\n\\",ch,first);\\n    return 0;\\n}\\n","exampleInput":"2","exampleOutput":"C A\\n","walkthrough":"输入 k 为 0..4，在五字节文件 ABCDE 中读取一个字符，rewind 后再读取首字符。","mistakes":["文本流的位置值有实现相关含义，不应当作一般字节数；本题用二进制模式定位。","SEEK_CUR 相对当前位置，SEEK_END 相对末尾；每次定位都应检查返回值。"],"summary":"定位到 data.txt 的第 k 个字节并读取","quizzes":[{"id":"c15-6-q1","type":"single","question":"SEEK_SET 作为 fseek 第三个参数表示什么？","options":["相对文件末尾","相对文件开头","相对当前位置"],"answer":["相对文件开头"],"explanation":"SEEK_CUR 相对当前位置，SEEK_END 相对末尾；每次定位都应检查返回值。"},{"id":"c15-6-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["C A"],"explanation":"输入 k 为 0..4，在五字节文件 ABCDE 中读取一个字符，rewind 后再读取首字符。"},{"id":"c15-6-q3","type":"boolean","question":"在所有标准 C 文本流中，ftell 的返回值一定等于已读取字节数。","options":["正确","错误"],"answer":["错误"],"explanation":"文本流的位置值有实现相关含义，不应当作一般字节数；本题用二进制模式定位。"}],"quiz":{"id":"c15-6-q1","type":"single","question":"SEEK_SET 作为 fseek 第三个参数表示什么？","options":["相对文件末尾","相对文件开头","相对当前位置"],"answer":["相对文件开头"],"explanation":"SEEK_CUR 相对当前位置，SEEK_END 相对末尾；每次定位都应检查返回值。"},"challenge":{"id":"c15-6-practice","title":"定位到 data.txt 的第 k 个字节并读取","difficulty":"Medium","description":"定位到 data.txt 的第 k 个字节并读取。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 0..4 的位置索引 k；data.txt 初始为 ABCDE。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"2","output":"C A\\n"},{"input":"0","output":"A A\\n"},{"input":"4","output":"E A\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 定位到 data.txt 的第 k 个字节并读取 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    long k;if(scanf(\\"%ld\\",&k)!=1||k<0||k>4)return 1;\\n    FILE*f=fopen(\\"data.txt\\",\\"rb\\");if(!f)return 1;\\n    if(fseek(f,k,SEEK_SET)!=0){fclose(f);return 1;}int ch=fgetc(f);\\n    rewind(f);int first=fgetc(f);int ok=!ferror(f)&&ch!=EOF&&first!=EOF;\\n    if(fclose(f)!=0)ok=0;if(!ok)return 1;printf(\\"%c %c\\\\n\\",ch,first);\\n    return 0;\\n}\\n","hints":["if(fseek(f,k,SEEK_SET)!=0) return 1;","输入 k 为 0..4，在五字节文件 ABCDE 中读取一个字符，rewind 后再读取首字符。","文本流的位置值有实现相关含义，不应当作一般字节数；本题用二进制模式定位。"],"files":{"data.txt":"ABCDE"}},"exampleFiles":{"data.txt":"ABCDE"}},{"id":"c15-7","chapter":15,"index":6,"title":"EOF、错误标志与 clearerr","en":"Stream Error Detection","textbook":"10.5","objective":"读到文件末尾后观察并清除 EOF 标志","explanation":["feof 查询流的结束标志，ferror 查询错误标志，它们不会主动读取文件。一次读取返回 EOF 时，必须查看相应状态，才能区分正常末尾和错误。clearerr 清除两个标志，但不会移动文件位置，也不会修复导致错误的外部原因。","rewind 既回到起点，也清除流错误标志；fseek 成功会清除 EOF 标志。关闭错误同样可能表示缓冲数据没有完整写出。可靠的文件程序要检查打开、读取、写入、定位和关闭这些步骤，而不只检查 fopen 一次。"],"syntax":"while(fgetc(f)!=EOF){}\\nint before=feof(f)!=0;clearerr(f);int after=feof(f)!=0;","syntaxNotes":"把文件读取到正常末尾，输出清除前和清除后的 EOF 标志；本例应为 1 0。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    FILE*f=fopen(\\"end.txt\\",\\"r\\");if(!f)return 1;\\n    while(fgetc(f)!=EOF){}\\n    if(ferror(f)){fclose(f);return 1;}\\n    int before=feof(f)!=0;clearerr(f);int after=feof(f)!=0;\\n    if(fclose(f)!=0)return 1;printf(\\"%d %d\\\\n\\",before,after);\\n    return 0;\\n}\\n","exampleInput":"","exampleOutput":"1 0\\n","walkthrough":"把文件读取到正常末尾，输出清除前和清除后的 EOF 标志；本例应为 1 0。","mistakes":["clearerr 不改变位置，rewind 才回到起点并清除流错误标志。","状态标志与当前位置是两个不同概念；清除标志不等于重新定位。"],"summary":"读到文件末尾后观察并清除 EOF 标志","quizzes":[{"id":"c15-7-q1","type":"single","question":"clearerr(f) 会做什么？","options":["清除 EOF 和错误标志，不移动位置","自动回到文件开头","保证后续写入一定成功"],"answer":["清除 EOF 和错误标志，不移动位置"],"explanation":"状态标志与当前位置是两个不同概念；清除标志不等于重新定位。"},{"id":"c15-7-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["1 0"],"explanation":"把文件读取到正常末尾，输出清除前和清除后的 EOF 标志；本例应为 1 0。"},{"id":"c15-7-q3","type":"boolean","question":"读取到 EOF 后调用 clearerr 就等于调用 rewind。","options":["正确","错误"],"answer":["错误"],"explanation":"clearerr 不改变位置，rewind 才回到起点并清除流错误标志。"}],"quiz":{"id":"c15-7-q1","type":"single","question":"clearerr(f) 会做什么？","options":["清除 EOF 和错误标志，不移动位置","自动回到文件开头","保证后续写入一定成功"],"answer":["清除 EOF 和错误标志，不移动位置"],"explanation":"状态标志与当前位置是两个不同概念；清除标志不等于重新定位。"},"challenge":{"id":"c15-7-practice","title":"读到文件末尾后观察并清除 EOF 标志","difficulty":"Medium","description":"读到文件末尾后观察并清除 EOF 标志。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"无标准输入；编辑 end.txt，长度不超过 10000 字节。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"","output":"1 0\\n","files":{"end.txt":"abc"}},{"input":"","output":"1 0\\n","files":{"end.txt":""}},{"input":"","output":"1 0\\n","files":{"end.txt":"\\n"}}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 读到文件末尾后观察并清除 EOF 标志 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    FILE*f=fopen(\\"end.txt\\",\\"r\\");if(!f)return 1;\\n    while(fgetc(f)!=EOF){}\\n    if(ferror(f)){fclose(f);return 1;}\\n    int before=feof(f)!=0;clearerr(f);int after=feof(f)!=0;\\n    if(fclose(f)!=0)return 1;printf(\\"%d %d\\\\n\\",before,after);\\n    return 0;\\n}\\n","hints":["while(fgetc(f)!=EOF){}","把文件读取到正常末尾，输出清除前和清除后的 EOF 标志；本例应为 1 0。","clearerr 不改变位置，rewind 才回到起点并清除流错误标志。"],"files":{"end.txt":"abc"}},"exampleFiles":{"end.txt":"abc"}}]},{"id":16,"en":"Preprocessing & Reference","title":"预处理与常用速查","description":"教材附录配套与扩展：头文件、宏、位运算及库函数。","lessons":[{"id":"c16-1","chapter":16,"index":0,"title":"宏、头文件与条件编译","en":"Preprocessor Basics","textbook":"附录 D 配套扩展","objective":"使用宏计算一个整数的平方","explanation":["预处理先于 C 语法编译，#include 展开头文件，#define 做记号替换，#if、#ifdef 控制保留哪些内容。头文件保护宏用于避免同一头文件在一次编译中被重复处理；它不会替代多源文件正确组织定义的责任。","函数式宏不是普通函数，不会先把每个实参求值一次。表达式参数和整个展开体都应加括号，仍然不要把 n++ 等有副作用的表达式传给重复使用参数的宏。能用普通函数清晰表达时，优先使用函数获得类型检查。"],"syntax":"#define SQUARE(x) ((x)*(x))\\n/* 不要写 SQUARE(n++) */","syntaxNotes":"宏将无副作用的输入变量代入平方表达式；输入为 -1000..1000。","example":"#include <stdio.h>\\n#define SQUARE(x) ((x)*(x))\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1)return 1;\\n    printf(\\"%d\\\\n\\",SQUARE(n));\\n    return 0;\\n}\\n","exampleInput":"3","exampleOutput":"9\\n","walkthrough":"宏将无副作用的输入变量代入平方表达式；输入为 -1000..1000。","mistakes":["宏可能重复展开实参，重复副作用可导致未定义行为；不要这样调用。","宏是记号替换，缺少括号时如 SQUARE(a+b) 可能产生错误表达式。"],"summary":"使用宏计算一个整数的平方","quizzes":[{"id":"c16-1-q1","type":"single","question":"为什么 SQUARE(x) 的参数和整体都要加括号？","options":["避免替换后运算符优先级改变含义","为了把宏变成递归函数","为了自动验证参数范围"],"answer":["避免替换后运算符优先级改变含义"],"explanation":"宏是记号替换，缺少括号时如 SQUARE(a+b) 可能产生错误表达式。"},{"id":"c16-1-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["9"],"explanation":"宏将无副作用的输入变量代入平方表达式；输入为 -1000..1000。"},{"id":"c16-1-q3","type":"boolean","question":"即使宏参数出现两次，SQUARE(n++) 也只会递增一次。","options":["正确","错误"],"answer":["错误"],"explanation":"宏可能重复展开实参，重复副作用可导致未定义行为；不要这样调用。"}],"quiz":{"id":"c16-1-q1","type":"single","question":"为什么 SQUARE(x) 的参数和整体都要加括号？","options":["避免替换后运算符优先级改变含义","为了把宏变成递归函数","为了自动验证参数范围"],"answer":["避免替换后运算符优先级改变含义"],"explanation":"宏是记号替换，缺少括号时如 SQUARE(a+b) 可能产生错误表达式。"},"challenge":{"id":"c16-1-practice","title":"使用宏计算一个整数的平方","difficulty":"Medium","description":"使用宏计算一个整数的平方。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 -1000..1000 的整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"3","output":"9\\n"},{"input":"-4","output":"16\\n"},{"input":"0","output":"0\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 使用宏计算一个整数的平方 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#define SQUARE(x) ((x)*(x))\\nint main(void) {\\n    int n;if(scanf(\\"%d\\",&n)!=1)return 1;\\n    printf(\\"%d\\\\n\\",SQUARE(n));\\n    return 0;\\n}\\n","hints":["#define SQUARE(x) ((x)*(x))","宏将无副作用的输入变量代入平方表达式；输入为 -1000..1000。","宏可能重复展开实参，重复副作用可导致未定义行为；不要这样调用。"]}},{"id":"c16-2","chapter":16,"index":1,"title":"无符号位运算","en":"Unsigned Bit Operations","textbook":"附录 C 配套扩展","objective":"统计一个 0..65535 无符号整数中值为 1 的二进制位数","explanation":["位运算按整数的二进制位工作：& 与、| 或、^ 异或、~ 取反，<< 和 >> 移位。它们与逻辑运算符 &&、|| 的含义和优先级不同。处理位模式时优先选用无符号整数，减少符号位和负数右移带来的实现差异。","移位次数必须小于提升后左操作数的位宽，不能为负。对于无符号数，右移补零，左移按该类型范围取模；有符号负数和溢出的移位不能照搬这种规律。表达式加上括号能清楚区分位判断与关系比较。"],"syntax":"while(n){count+=(int)(n&1u);n>>=1;}","syntaxNotes":"每次取最低位再右移一位；输入范围 0..65535，零的计数为 0。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    unsigned n;if(scanf(\\"%u\\",&n)!=1||n>65535u)return 1;\\n    int count=0;while(n){count+=(int)(n&1u);n>>=1;}\\n    printf(\\"%d\\\\n\\",count);\\n    return 0;\\n}\\n","exampleInput":"13","exampleOutput":"3\\n","walkthrough":"每次取最低位再右移一位；输入范围 0..65535，零的计数为 0。","mistakes":["移位次数必须小于类型位宽，等于位宽也是未定义行为。","与掩码 1 做按位与，只保留最低位。"],"summary":"统计一个 0..65535 无符号整数中值为 1 的二进制位数","quizzes":[{"id":"c16-2-q1","type":"single","question":"无符号 n 的 n&1u 用来得到什么？","options":["n 的最高位","n 的十进制个位","n 的最低二进制位"],"answer":["n 的最低二进制位"],"explanation":"与掩码 1 做按位与，只保留最低位。"},{"id":"c16-2-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["3"],"explanation":"每次取最低位再右移一位；输入范围 0..65535，零的计数为 0。"},{"id":"c16-2-q3","type":"boolean","question":"把一个 32 位无符号整数右移 32 位在 C99 中保证得到零。","options":["正确","错误"],"answer":["错误"],"explanation":"移位次数必须小于类型位宽，等于位宽也是未定义行为。"}],"quiz":{"id":"c16-2-q1","type":"single","question":"无符号 n 的 n&1u 用来得到什么？","options":["n 的最高位","n 的十进制个位","n 的最低二进制位"],"answer":["n 的最低二进制位"],"explanation":"与掩码 1 做按位与，只保留最低位。"},"challenge":{"id":"c16-2-practice","title":"统计一个 0..65535 无符号整数中值为 1 的二进制位数","difficulty":"Medium","description":"统计一个 0..65535 无符号整数中值为 1 的二进制位数。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"一个 0..65535 的无符号整数。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"13","output":"3\\n"},{"input":"0","output":"0\\n"},{"input":"65535","output":"16\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 统计一个 0..65535 无符号整数中值为 1 的二进制位数 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n\\nint main(void) {\\n    unsigned n;if(scanf(\\"%u\\",&n)!=1||n>65535u)return 1;\\n    int count=0;while(n){count+=(int)(n&1u);n>>=1;}\\n    printf(\\"%d\\\\n\\",count);\\n    return 0;\\n}\\n","hints":["while(n){count+=(int)(n&1u);n>>=1;}","每次取最低位再右移一位；输入范围 0..65535，零的计数为 0。","移位次数必须小于类型位宽，等于位宽也是未定义行为。"]}},{"id":"c16-3","chapter":16,"index":2,"title":"字符分类与库函数接口","en":"Standard Library Practice","textbook":"附录 A—E","objective":"用 ctype.h 统计输入中的英文字母和数字","explanation":["查库函数时先确定头文件、原型、参数约束、返回值和失败条件，再决定如何使用。stdio.h 管理流，stdlib.h 管理分配与转换，string.h 处理字节和字符串，math.h 提供数学运算，ctype.h 提供字符分类；标准库不是 C 关键字的一部分。","isalpha、isdigit 等函数的参数必须是 EOF 或可表示为 unsigned char 的值。getchar 直接返回的有效字符值满足要求；若从可能带符号的 char 数组读取，应先转为 unsigned char。本题限定 ASCII 文本，不把 UTF-8 字节分类当成汉字分类。"],"syntax":"int ch;\\nwhile((ch=getchar())!=EOF){\\n    if(isalpha(ch))letters++;\\n    if(isdigit(ch))digits++;\\n}","syntaxNotes":"遍历标准输入到 EOF，输出字母数和数字数；两个独立计数均从零开始。","example":"#include <stdio.h>\\n#include <ctype.h>\\n\\nint main(void) {\\n    int ch,letters=0,digits=0;\\n    while((ch=getchar())!=EOF){if(isalpha(ch))letters++;if(isdigit(ch))digits++;}\\n    printf(\\"%d %d\\\\n\\",letters,digits);\\n    return 0;\\n}\\n","exampleInput":"Ab 123!","exampleOutput":"2 3\\n","walkthrough":"遍历标准输入到 EOF，输出字母数和数字数；两个独立计数均从零开始。","mistakes":["它们是标准库函数名称，原型来自相应头文件；关键字如 int、return 属于语言语法。","ctype 函数只接受 EOF 或 unsigned char 可表示的值，负的 char 值必须先转换。"],"summary":"用 ctype.h 统计输入中的英文字母和数字","quizzes":[{"id":"c16-3-q1","type":"single","question":"把 char 数组中的字节传给 isalpha 时，稳妥的写法是什么？","options":["isalpha(&c)","isalpha((unsigned char)c)","isalpha((signed char)c)"],"answer":["isalpha((unsigned char)c)"],"explanation":"ctype 函数只接受 EOF 或 unsigned char 可表示的值，负的 char 值必须先转换。"},{"id":"c16-3-q2","type":"predict","question":"按示例输入运行本节完整例子，终端输出是什么？（保留输出中的换行）","answer":["2 3"],"explanation":"遍历标准输入到 EOF，输出字母数和数字数；两个独立计数均从零开始。"},{"id":"c16-3-q3","type":"boolean","question":"strlen、malloc、printf 都是 C99 关键字。","options":["正确","错误"],"answer":["错误"],"explanation":"它们是标准库函数名称，原型来自相应头文件；关键字如 int、return 属于语言语法。"}],"quiz":{"id":"c16-3-q1","type":"single","question":"把 char 数组中的字节传给 isalpha 时，稳妥的写法是什么？","options":["isalpha(&c)","isalpha((unsigned char)c)","isalpha((signed char)c)"],"answer":["isalpha((unsigned char)c)"],"explanation":"ctype 函数只接受 EOF 或 unsigned char 可表示的值，负的 char 值必须先转换。"},"challenge":{"id":"c16-3-practice","title":"用 ctype.h 统计输入中的英文字母和数字","difficulty":"Medium","description":"用 ctype.h 统计输入中的英文字母和数字。请实现对所有规定输入都适用的程序，输出格式以样例为准。","input":"最多 10000 字节的 ASCII 文本，读到输入结束。","output":"按样例输出结果，不添加提示文字。","tests":[{"input":"Ab 123!","output":"2 3\\n"},{"input":"","output":"0 0\\n"},{"input":"C99\\nlab","output":"4 2\\n"}],"starter":"#include <stdio.h>\\n\\nint main(void) {\\n    /* TODO: 用 ctype.h 统计输入中的英文字母和数字 */\\n    return 0;\\n}\\n","solution":"#include <stdio.h>\\n#include <ctype.h>\\n\\nint main(void) {\\n    int ch,letters=0,digits=0;\\n    while((ch=getchar())!=EOF){if(isalpha(ch))letters++;if(isdigit(ch))digits++;}\\n    printf(\\"%d %d\\\\n\\",letters,digits);\\n    return 0;\\n}\\n","hints":["int ch;","遍历标准输入到 EOF，输出字母数和数字数；两个独立计数均从零开始。","它们是标准库函数名称，原型来自相应头文件；关键字如 int、return 属于语言语法。"]}}]}]`),o={"c1-1":[{type:"single",question:"哪一步会把 C 源代码翻译为目标代码？",options:["编译","运行","输入","注释"],answer:["编译"],explanation:"编译器将源代码翻译为目标代码；执行程序才会读取输入并产生输出。",id:"c1-1-q1"},{type:"boolean",question:"编译成功就一定意味着程序的计算结果正确。",answer:["错误"],explanation:"编译只检查语法和部分类型约束，业务规则仍需测试验证。",options:["正确","错误"],id:"c1-1-q2"},{type:"single",question:"C 程序通常从哪个函数开始执行？",answer:["main"],explanation:"宿主环境调用 main，其他函数需由程序调用。",options:["main","printf","start"],id:"c1-1-q3"},{type:"boolean",question:"本工坊使用 cout 输出 C99 文本。",answer:["错误"],explanation:"cout 属于 C++；C99 使用 printf 或 puts 等标准库函数。",options:["正确","错误"],id:"c1-1-q5"},{type:"single",question:"编译报错后，正确的下一步是？",answer:["先修复诊断再运行"],explanation:"编译失败没有可执行程序，应从第一条诊断开始修复。",options:["先修复诊断再运行","把报错当作程序输出","只刷新页面"],id:"c1-1-q6"},{type:"boolean",question:"链接和运行是同一个步骤。",answer:["错误"],explanation:"链接组合目标文件和库；运行才执行指令。",options:["正确","错误"],id:"c1-1-q7"}],"c1-2":[{type:"fill",question:"填空：字符串中用于换行的转义序列是什么？",answer:["\\n"],explanation:"\\n 是一个换行符；/n 中的斜杠方向不对。",id:"c1-2-q1"},{type:"predict",question:'printf("A\\nB"); 会依次输出哪两个字母？用空格分隔作答。',answer:["A B"],explanation:"\\n 产生换行，字母 A 和 B 分别显示在两行。",id:"c1-2-q2"},{type:"fill",question:'printf("100??"); 中用什么替换 ?? 才能输出 100%？',answer:["%%"],explanation:"格式字符串里 %% 表示字面百分号。",id:"c1-2-q3"},{type:"boolean",question:'printf("Hi"); 后面的分号可以随意省略。',answer:["错误"],explanation:"调用构成表达式语句，需要分号终止。",options:["正确","错误"],id:"c1-2-q4"},{type:"debug",question:"printf(“Hi”); 的引号有什么问题？",answer:["应改为英文直双引号"],explanation:"C 的字符串分隔符是 ASCII 双引号，中文弯引号不是合法分隔符。",options:["应改为英文直双引号","应删掉圆括号","应使用 cout"],id:"c1-2-q5"},{type:"boolean",question:"return 0; 会自动向终端打印数字 0。",answer:["错误"],explanation:"return 向调用环境传回退出状态，不产生标准输出。",options:["正确","错误"],id:"c1-2-q6"},{type:"fill",question:"声明 printf 的标准头文件名称是什么？",answer:["stdio.h"],explanation:"标准输入输出函数的声明位于 stdio.h。",id:"c1-2-q7"}],"c1-3":[{type:"boolean",question:'判断：printf("//"); 会把整行变成注释。',options:["正确","错误"],answer:["错误"],explanation:"双引号里的 // 属于字符串内容，因此程序会输出两个斜杠。",id:"c1-3-q1"},{type:"boolean",question:"// 注释会一直持续到文件结束。",answer:["错误"],explanation:"// 只到当前行结尾，下行正常解析。",options:["正确","错误"],id:"c1-3-q2"},{type:"boolean",question:"标准 C99 允许 /* 外层 /* 内层 */ 外层 */ 这种嵌套注释。",answer:["错误"],explanation:"块注释遇到第一个 */ 就结束，不能嵌套。",options:["正确","错误"],id:"c1-3-q3"},{type:"predict",question:'printf("/*x*/"); 输出什么？',answer:["/*x*/"],explanation:"字符串里的注释符号只是普通文本。",id:"c1-3-q4"},{type:"fill",question:"块注释以 /* 开始，以什么结束？",answer:["*/"],explanation:"成对的 /* 与 */ 包围块注释。",id:"c1-3-q5"},{type:"multi",question:"哪些注释习惯有助于维护代码？",answer:["解释意图","说明特殊边界"],explanation:"注释适合补充原因和约束，过时的注释会误导。",options:["解释意图","说明特殊边界","保留与实际代码矛盾的说明"],id:"c1-3-q6"}],"c1-4":[{type:"multi",question:"多选：下面哪些说法正确？",options:["main 是入口函数","花括号界定代码块","return 0 会打印 0","缩进决定代码块范围"],answer:["main 是入口函数","花括号界定代码块"],explanation:"C 通过 main 启动程序，代码块由花括号确定。return 返回状态，缩进只是排版。",id:"c1-4-q1"},{type:"fill",question:"int main(void) 中第一个 int 指定什么？",answer:["返回类型"],explanation:"函数名前的类型规定返回值的类型。",id:"c1-4-q2"},{type:"boolean",question:"标准 C99 可以在 main 内定义另一个普通函数。",answer:["错误"],explanation:"标准 C 不允许嵌套函数定义，应把函数放到文件作用域。",options:["正确","错误"],id:"c1-4-q3"},{type:"fill",question:"代码块使用哪一对括号？按左右顺序作答。",answer:["{}"],explanation:"花括号决定块范围，缩进只帮助阅读。",id:"c1-4-q4"},{type:"boolean",question:"main 中 return 后面的普通语句仍会继续执行。",answer:["错误"],explanation:"return 立即结束当前函数。",options:["正确","错误"],id:"c1-4-q5"},{type:"single",question:"哪个原型明确表示不接收参数？",answer:["int main(void)"],explanation:"void 参数列表明确声明无参数。",options:["int main(void)","int main(int n)","void main(int n)"],id:"c1-4-q6"},{type:"debug",question:"把 printf 调用直接写在所有函数之外，会怎样？",answer:["不符合普通语句的位置要求"],explanation:"文件作用域放声明和定义，普通执行语句应位于函数体内。",options:["不符合普通语句的位置要求","会在 main 之前自动执行","会自动进入循环"],id:"c1-4-q7"}],"c2-1":[{type:"single",question:"保存 36.5 摄氏度，最合适的类型是？",options:["double","int","char"],answer:["double"],explanation:"double 可以表示小数。int 转换后只留下整数部分；char 不是测量值的合适类型。",id:"c2-1-q1"},{type:"single",question:"保存单个英文字母最合适的类型是？",answer:["char"],explanation:"char 保存单个基本字符。",options:["char","double","void"],id:"c2-1-q2"},{type:"boolean",question:"int 在所有 C99 实现中都固定为 32 位。",answer:["错误"],explanation:"标准规定最小范围，实际宽度由实现决定。",options:["正确","错误"],id:"c2-1-q3"},{type:"predict",question:'int x=2.9; printf("%d",x); 输出什么？',answer:["2"],explanation:"可表示范围内浮点转整数向零截断。",id:"c2-1-q4"},{type:"fill",question:"printf 中输出 int 的常用格式控制符是什么？",answer:["%d"],explanation:"%d 接受经过提升的 int。",id:"c2-1-q5"},{type:"multi",question:"哪些声明与数据用途匹配？",answer:["int count=3;","double price=1.25;"],explanation:"计数用整数，小数用浮点类型。",options:["int count=3;","double price=1.25;",'char word="Hello";'],id:"c2-1-q6"},{type:"boolean",question:"C 的类型影响可表示范围和运算规则。",answer:["正确"],explanation:"类型既决定存储解释，也参与运算转换。",options:["正确","错误"],id:"c2-1-q7"},{id:"c2-1-audit-1",type:"boolean",question:"C99 保证 sizeof(char) 为 1，也保证所有实现的 CHAR_BIT 都恰好是 8。",answer:["错误"],explanation:"sizeof(char) 恒为 1，但 CHAR_BIT 只保证至少为 8；本网站为 8。",options:["正确","错误"]},{id:"c2-1-audit-2",type:"single",question:"查询一个 C 字节的位数应使用什么？",answer:["limits.h 的 CHAR_BIT"],explanation:"CHAR_BIT 给出每字节位数；不能把硬件环境的数值写成普遍规则。",options:["sizeof(char)*8，所有系统都适用","limits.h 的 CHAR_BIT","strlen 的返回值"]},{id:"c2-1-audit-3",type:"single",question:"下面哪一组都是 C99 的聚合类型？",answer:["数组与结构体"],explanation:"数组和结构体是聚合类型；共用体成员共享空间，分类不同。",options:["共用体与函数","数组与结构体","指针与 int"]}],"c2-2":[{type:"predict",question:'预测：printf("%d", 9 / 4); 输出什么？',answer:["2"],explanation:"两个操作数都是 int，9 / 4 的小数部分被截断，结果为 2。",id:"c2-2-q1"},{type:"predict",question:'printf("%d", -11/4); 输出什么？',answer:["-2"],explanation:"C99 整数除法朝零截断。",id:"c2-2-q2"},{type:"predict",question:'int x=6; x=x+4; printf("%d",x);',answer:["10"],explanation:"先读取旧值，再计算并赋回。",id:"c2-2-q3"},{type:"boolean",question:"读取未初始化的局部 int 总能得到 0。",answer:["错误"],explanation:"自动存储期的未初始化对象值不确定，不应读取。",options:["正确","错误"],id:"c2-2-q4"},{type:"boolean",question:"有符号整数溢出必然按二进制绕回。",answer:["错误"],explanation:"有符号溢出是未定义行为。",options:["正确","错误"],id:"c2-2-q5"},{type:"predict",question:'int a=8,b=3; printf("%d",a-b*2);',answer:["2"],explanation:"先计算乘法 3*2=6，再减去。",id:"c2-2-q6"},{type:"predict",question:'printf("%d", 14/5);',answer:["2"],explanation:"14/5 的整数商为 2。",id:"c2-2-q7"},{type:"single",question:"哪种写法在声明时就提供初值？",answer:["int n=0;"],explanation:"初始化让首次读取有确定值。",options:["int n=0;","int n;","n == 0;"],id:"c2-2-q8"},{id:"c2-2-audit-1",type:"predict",question:'本网站的 unsigned short 为 16 位。unsigned short u=(unsigned short)-1; printf("%hu",u); 输出什么？',answer:["65535"],explanation:"转换到无符号类型按最大值加一取模，-1 得到 USHRT_MAX。"},{id:"c2-2-audit-2",type:"boolean",question:"所有 C99 实现的 signed int 都必须采用补码表示。",answer:["错误"],explanation:"C99 允许不同有符号表示，补码是本网站所用实现的选择。",options:["正确","错误"]},{id:"c2-2-audit-3",type:"single",question:"可移植地查询 unsigned short 的最大值，应选什么？",answer:["USHRT_MAX"],explanation:"USHRT_MAX 来自 limits.h，表示实际实现的 unsigned short 上界。",options:["固定写 65535 就能适配所有实现","USHRT_MAX","INT_MAX"]}],"c2-3":[{type:"single",question:"下面哪个表达式得到 2.5？",options:["5.0 / 2","5 / 2","(double)(5 / 2)"],answer:["5.0 / 2"],explanation:"至少一个操作数在除法前是浮点数，才能进行浮点除法。除完再转换已经来不及恢复小数。",id:"c2-3-q1"},{type:"predict",question:'printf("%.2f", 7.0/2);',answer:["3.50"],explanation:"浮点除法得到 3.5，再显示两位小数。",id:"c2-3-q2"},{type:"boolean",question:"%.2f 会改变变量在内存中保存的值。",answer:["错误"],explanation:"格式控制只影响显示。",options:["正确","错误"],id:"c2-3-q3"},{type:"fill",question:"float 字面量 2.5 后常加哪个字母表示 float 类型？",answer:["f"],explanation:"2.5f 的类型是 float，不带后缀默认 double。",id:"c2-3-q4"},{type:"boolean",question:"0.1 这样的十进制小数总能被二进制浮点数精确表示。",answer:["错误"],explanation:"许多十进制小数只有近似表示。",options:["正确","错误"],id:"c2-3-q5"},{type:"single",question:"double 相比 float 通常有怎样的精度？",answer:["更多有效数字"],explanation:"double 通常使用更多二进制有效位。",options:["更多有效数字","完全没有误差","只能保存整数"],id:"c2-3-q6"},{type:"predict",question:'double x=9/2; printf("%.1f",x);',answer:["4.0"],explanation:"除法先按整数执行得到 4，再转 double。",id:"c2-3-q7"},{type:"predict",question:'printf("%.1f", 1.25*4);',answer:["5.0"],explanation:"乘积为 5，保留一位小数显示为 5.0。",id:"c2-3-q8"},{id:"c2-3-audit-1",type:"boolean",question:"两个 float 值相加的结果类型在 C99 中必然是 double。",answer:["错误"],explanation:"通常算术转换下结果类型仍为 float；printf 的默认实参提升是另一条规则。",options:["正确","错误"]},{id:"c2-3-audit-2",type:"single",question:'printf("%f",f) 中，float 变量 f 作为可变参数会怎样？',answer:["提升为 double"],explanation:"可变参数默认实参提升把 float 转换为 double；不改变 f 本身的类型。",options:["保持 float 直接传入","提升为 double","转换成 int"]},{id:"c2-3-audit-3",type:"boolean",question:"FLT_MIN 在支持非正规格化数的平台上仍一定是最小非零正 float。",answer:["错误"],explanation:"FLT_MIN 表示最小正规格化正数，更小的非正规格化非零值可能存在。",options:["正确","错误"]}],"c2-4":[{type:"debug",question:'分析错误：char ch = "B"; 应如何修改？',options:["改成 char ch = 'B';",'改成 int ch = "B";',"无需修改"],answer:["改成 char ch = 'B';"],explanation:'单个字符使用单引号。"B" 是包含 B 和结束零的字符数组，不能用来初始化一个 char。',id:"c2-4-q1"},{type:"predict",question:`char c='Z'; printf("%c",c);`,answer:["Z"],explanation:"%c 将整型提升后的字符按字符输出。",id:"c2-4-q2"},{type:"boolean",question:`"A" 与 'A' 在 C 中类型完全相同。`,answer:["错误"],explanation:"前者是包含结束零的字符数组，后者是字符常量。",options:["正确","错误"],id:"c2-4-q3"},{type:"fill",question:"输出单个字符使用哪个格式控制符？",answer:["%c"],explanation:"%c 以字符形式解释对应参数。",id:"c2-4-q4"},{type:"boolean",question:"一个 char 足以可移植地保存任意一个汉字。",answer:["错误"],explanation:"汉字通常需要多字节编码，不能假设单个 char 足够。",options:["正确","错误"],id:"c2-4-q5"},{type:"single",question:"合法的单字符初始化是？",answer:["char ch='k';"],explanation:"字符常量采用单引号。",options:["char ch='k';",'char ch="k";',"char ch=k;"],id:"c2-4-q6"},{type:"predict",question:`char a='A',b='!'; printf("%c%c",a,b);`,answer:["A!"],explanation:"两个 %c 按参数顺序输出。",id:"c2-4-q7"},{id:"c2-4-audit-1",type:"predict",question:`在本站 ASCII 环境中：printf("%d %d", '\\0', '0'); 输出什么？`,answer:["0 48"],explanation:"零字符为 0，数字字符 0 的 ASCII 编码为 48，字符常量在 C 中类型为 int。"},{id:"c2-4-audit-2",type:"predict",question:`在本站 ASCII 环境中：printf("%d", '\\101'); 输出什么？`,answer:["65"],explanation:"八进制 101 等于十进制 65，对应 ASCII 字母 A。"},{id:"c2-4-audit-3",type:"single",question:"字符串中要输出一个反斜杠，应在源码里使用哪种转义？",answer:["两个连续反斜杠"],explanation:"反斜杠自身需要用反斜杠转义，源码写两个，输出一个。",options:["一个反斜杠后面直接换行","两个连续反斜杠","斜杠 /"]}],"c2-5":[{type:"multi",question:"多选：在 C 条件中，哪些值为真？",options:["-3","0","2"],answer:["-3","2"],explanation:"C 的条件判断将 0 当作假；负数和大于 1 的非零值也是真。",id:"c2-5-q1"},{type:"predict",question:'bool x=42; printf("%d",x);',answer:["1"],explanation:"转换为 _Bool 时所有非零值变为 1。",id:"c2-5-q2"},{type:"predict",question:'printf("%d", !0);',answer:["1"],explanation:"0 为假，逻辑非得到真。",id:"c2-5-q3"},{type:"boolean",question:"负整数在 if 条件中为假。",answer:["错误"],explanation:"只有 0 为假，负数也是非零。",options:["正确","错误"],id:"c2-5-q4"},{type:"fill",question:"C99 中提供 bool 宏的头文件是什么？",answer:["stdbool.h"],explanation:"stdbool.h 定义 bool、true 和 false 宏。",id:"c2-5-q5"},{type:"predict",question:'bool x=false; printf("%d",x);',answer:["0"],explanation:"false 对应 0。",id:"c2-5-q6"},{type:"boolean",question:"C99 的原生布尔类型名称是 _Bool。",answer:["正确"],explanation:"bool 是头文件提供的易读别名宏。",options:["正确","错误"],id:"c2-5-q7"},{type:"predict",question:'printf("%d", !!-8);',answer:["1"],explanation:"第一次逻辑非得到 0，再取非得到 1。",id:"c2-5-q8"}],"c2-6":[{type:"boolean",question:"判断：const int x = 3; x = 4; 能正常通过标准 C99 编译。",options:["正确","错误"],answer:["错误"],explanation:"x 是只读对象，直接对它赋值违反类型约束，编译器会诊断。",id:"c2-6-q1"},{type:"boolean",question:"const 对象可以先正常定义，再通过强制转换安全修改。",answer:["错误"],explanation:"强行修改原本定义为 const 的对象是未定义行为。",options:["正确","错误"],id:"c2-6-q2"},{type:"fill",question:"声明只读变量时使用哪个关键字？",answer:["const"],explanation:"const 限定通过该名字修改对象的操作。",id:"c2-6-q3"},{type:"predict",question:'const int N=4; printf("%d",N*3);',answer:["12"],explanation:"只读值仍然可以参与表达式计算。",id:"c2-6-q4"},{type:"boolean",question:"变量名全部大写是 const 语法的强制要求。",answer:["错误"],explanation:"大写只是命名惯例。",options:["正确","错误"],id:"c2-6-q5"},{type:"single",question:"哪条声明最直接表达固定税率？",answer:["const double rate=0.05;"],explanation:"const 表达运行期间不应修改的意图。",options:["const double rate=0.05;","double const=0.05;","rate const 0.05;"],id:"c2-6-q6"},{type:"boolean",question:"C99 中的 const int 总是整型常量表达式。",answer:["错误"],explanation:"不能把 C++ 的常量规则直接套到 C99。",options:["正确","错误"],id:"c2-6-q7"},{id:"c2-6-audit-1",type:"boolean",question:"#define LIMIT 10; 通常可无条件代替 #define LIMIT 10。",answer:["错误"],explanation:"宏会把分号也纳入替换文本，放进表达式时可能改变语法。",options:["正确","错误"]},{id:"c2-6-audit-2",type:"single",question:"哪句话区分了宏和 const 对象？",answer:["宏做记号替换，const 对象具有类型"],explanation:"#define 在预处理阶段替换记号，const 修饰对象的类型限定。",options:["宏和 const 对象都是同一种变量","宏做记号替换，const 对象具有类型","const 名字必须全部大写"]},{id:"c2-6-audit-3",type:"boolean",question:"文件作用域的 const int N=4; 在 C99 中总能充当所有需要整数常量表达式的位置。",answer:["错误"],explanation:"C99 中 const int 对象一般不是整数常量表达式，不能照搬 C++ 规则。",options:["正确","错误"]}],"c2-7":[{type:"fill",question:"填空：printf 中输出一个百分号应写什么？",answer:["%%"],explanation:"%% 表示字面百分号，它不会从参数列表中取值。",id:"c2-7-q1"},{type:"predict",question:'printf("%d-%d",3,8);',answer:["3-8"],explanation:"占位符按参数从前到后对应。",id:"c2-7-q2"},{type:"fill",question:"输出两位小数的 double，常用什么格式？",answer:["%.2f"],explanation:"%.2f 在 printf 中控制小数点后两位。",id:"c2-7-q3"},{type:"boolean",question:"printf 的 %f 可以接收经过提升的 float。",answer:["正确"],explanation:"可变参数调用把 float 默认提升为 double。",options:["正确","错误"],id:"c2-7-q4"},{type:"predict",question:'printf("%d%%",75);',answer:["75%"],explanation:"%d 消费整数参数，%% 输出百分号。",id:"c2-7-q5"},{type:"debug",question:'printf("%d",2.5); 有什么问题？',answer:["格式与参数类型不匹配"],explanation:"%d 需要 int，实际传入 double，行为不可靠。",options:["格式与参数类型不匹配","只能输出偶数","缺少 scanf"],id:"c2-7-q6"},{type:"predict",question:'printf("%.1f", 8.0);',answer:["8.0"],explanation:"即使小数为零也显示指定的一位。",id:"c2-7-q7"},{type:"multi",question:"哪些格式与参数匹配？",answer:["%d 对应 int","%c 对应提升后的字符"],explanation:"printf 的格式必须与实际传参匹配。",options:["%d 对应 int","%c 对应提升后的字符","%d 对应任意 double"],id:"c2-7-q8"}],"c2-8":[{type:"multi",question:"多选：哪些是合法且非保留的变量名？",options:["total_score","score2","2score","return"],answer:["total_score","score2"],explanation:"标识符可包含数字但不能以数字开头，return 是 C 关键字。",id:"c2-8-q1"},{type:"boolean",question:"score 和 Score 在 C 中是同一个标识符。",answer:["错误"],explanation:"C 区分大小写，所以 score 和 Score 是两个不同标识符，不能互换使用。",options:["正确","错误"],id:"c2-8-q2"},{type:"boolean",question:"变量名可以以数字开头。",answer:["错误"],explanation:"普通标识符不能以数字开头。",options:["正确","错误"],id:"c2-8-q3"},{type:"single",question:"哪个名字清晰且符合基本命名规则？",answer:["item_count"],explanation:"下划线可以连接单词。",options:["item_count","item-count","int"],id:"c2-8-q4"},{type:"fill",question:"变量名 total_score 中连接单词的字符是什么？",answer:["_"],explanation:"下划线允许出现在标识符中。",id:"c2-8-q5"},{type:"multi",question:"哪些名字不应作为普通变量名？",answer:["return","2books"],explanation:"关键字不能作变量名，数字不能放在开头。",options:["return","2books","books2"],id:"c2-8-q6"},{type:"boolean",question:"以下划线开头的名字有些保留给实现使用。",answer:["正确"],explanation:"为可移植性，普通程序建议避免这类命名。",options:["正确","错误"],id:"c2-8-q7"}],"c2-9":[{type:"predict",question:"预测：(double)(7 / 2) 的值是多少？",answer:["3"],explanation:"7 / 2 先按整数除法得到 3，再变为 3.0；强制转换位置决定运算类型。",id:"c2-9-q1"},{type:"predict",question:'printf("%.1f", (double)9/2);',answer:["4.5"],explanation:"转换在除法前生效。",id:"c2-9-q2"},{type:"predict",question:'printf("%.1f", (double)(9/2));',answer:["4.0"],explanation:"先做整数除法，丢失的小数不能恢复。",id:"c2-9-q3"},{type:"boolean",question:"(double)x 会永久改变原来 int x 的类型。",answer:["错误"],explanation:"转换只形成一个表达式值。",options:["正确","错误"],id:"c2-9-q4"},{type:"fill",question:"把 total 转为 double 的 C 写法是什么？",answer:["(double)total"],explanation:"目标类型放在括号中，再接要转换的表达式。",id:"c2-9-q5"},{type:"single",question:"求 5 和 2 的小数商，应选？",answer:["5.0/2"],explanation:"至少一个操作数先是浮点数。",options:["5.0/2","5/2","(double)(5/2)"],id:"c2-9-q6"},{type:"predict",question:'printf("%.2f", (double)3/4);',answer:["0.75"],explanation:"浮点除法保留小数。",id:"c2-9-q7"},{type:"predict",question:'int n=5; double y=(double)n; printf("%d %.1f",n,y);',answer:["5 5.0"],explanation:"n 仍是 int，y 接收转换后的 double 值。",id:"c2-9-q8"},{id:"c2-9-audit-1",type:"predict",question:'float a=1.0f,b=2.0f; printf("%d",sizeof(a+b)==sizeof(float)); 输出什么？',answer:["1"],explanation:"a+b 的结果类型为 float，sizeof 比较的是类型大小，不受 printf 参数提升影响。"},{id:"c2-9-audit-2",type:"boolean",question:"执行 (double)n 以后，原先 int n 的声明类型自动改成 double。",answer:["错误"],explanation:"转换产生一个转换后的值，不改变原对象的声明类型。",options:["正确","错误"]},{id:"c2-9-audit-3",type:"predict",question:'int i=7; (void)sizeof(i++); printf("%d",i); 输出什么？',answer:["7"],explanation:"普通 int 表达式作为 sizeof 操作数时不求值，i 没有递增。"}],"c2-10":[{type:"predict",question:"预测：(int)-2.8 的值是多少？",answer:["-2"],explanation:"浮点到整数转换向零截断，所以 -2.8 得到 -2，不是向下取整的 -3。",id:"c2-10-q1"},{type:"predict",question:'printf("%d", (int)6.99);',answer:["6"],explanation:"浮点转整数在可表示范围内向零截断。",id:"c2-10-q2"},{type:"predict",question:'printf("%d", (int)-6.99);',answer:["-6"],explanation:"向零截断与向负无穷取整不同。",id:"c2-10-q3"},{type:"boolean",question:"强制类型转换可以自动修复任何溢出。",answer:["错误"],explanation:"转换后的值仍须满足目标类型的表示范围要求。",options:["正确","错误"],id:"c2-10-q4"},{type:"predict",question:'printf("%d", (int)0.8);',answer:["0"],explanation:"小于 1 的正小数截断为 0。",id:"c2-10-q5"},{type:"single",question:"哪句话正确描述 (int)3.8？",answer:["结果为 3"],explanation:"显式转换不执行四舍五入。",options:["结果为 3","结果为 4","仍然是 double"],id:"c2-10-q6"},{type:"predict",question:'printf("%d", (int)-0.8);',answer:["0"],explanation:"向零截断得到 0。",id:"c2-10-q7"},{type:"boolean",question:"先转换再运算与先运算再转换总是等价。",answer:["错误"],explanation:"转换位置会影响运算类型及精度。",options:["正确","错误"],id:"c2-10-q8"},{id:"c2-10-audit-1",type:"predict",question:'double x=-7.9; int n=(int)x; printf("%d %.1f",n,x); 输出什么？',answer:["-7 -7.9"],explanation:"转换结果向零截断，源变量 x 的值不被改变。"},{id:"c2-10-audit-2",type:"boolean",question:"浮点数转整数越界时，C99 保证按目标整数范围取模。",answer:["错误"],explanation:"浮点到整数的截断后结果若不可表示，行为未定义，不能套用无符号整数转换规则。",options:["正确","错误"]},{id:"c2-10-audit-3",type:"single",question:"(int)(x+y) 与 (int)x+y 的区别是什么？",answer:["前者转换和，后者只先转换 x"],explanation:"转换只作用于紧邻的操作数；括号决定转换覆盖的范围。",options:["没有区别","前者转换和，后者只先转换 x","两者都永久改变 x 的类型"]}],"c2-11":[{type:"predict",question:'单价 2.5，数量 3，printf("%.2f", price * count) 输出？',answer:["7.50"],explanation:"乘法得到 7.5，%.2f 用两位小数显示，因此输出 7.50。",id:"c2-11-q1"},{type:"predict",question:'double price=2.5; int count=4; printf("%.2f",price*count);',answer:["10.00"],explanation:"整数参与 double 乘法时转换到浮点类型。",id:"c2-11-q2"},{type:"boolean",question:"计算平均分时先用整数相除再转 double 不会丢失信息。",answer:["错误"],explanation:"小数在整数除法阶段已经丢失。",options:["正确","错误"],id:"c2-11-q3"},{type:"fill",question:"求和累加器通常初始化为多少？",answer:["0"],explanation:"0 是加法单位元。",id:"c2-11-q4"},{type:"single",question:"商品数量与单价分别应优先采用什么类型？",answer:["int 和 double"],explanation:"离散计数适合 int，价格的小数计算适合 double。",options:["int 和 double","char 和 int","void 和 char"],id:"c2-11-q5"},{type:"predict",question:'int count=3; const double price=8.0; printf("%.1f",count*price-2);',answer:["22.0"],explanation:"总价 24 再减 2，显示一位小数。",id:"c2-11-q6"},{type:"boolean",question:"输出格式也属于编程题要求的一部分。",answer:["正确"],explanation:"除结果值外，标签、小数位和换行也可能影响正确性。",options:["正确","错误"],id:"c2-11-q7"},{type:"predict",question:'printf("%.2f", (double)13/4);',answer:["3.25"],explanation:"除法前转换为 double，结果显示两位。",id:"c2-11-q8"},{type:"multi",question:"哪些步骤有助于检查金额计算？",answer:["核对数量和单价类型","先手算示例再运行"],explanation:"类型与手算能发现整数截断和公式错误。",options:["核对数量和单价类型","先手算示例再运行","只检查代码能否编译"],id:"c2-11-q9"}],"c3-1":[{type:"predict",question:"预测：20 - 12 / 3 的值是多少？",answer:["16"],explanation:"先算 12 / 3 得到 4，再算 20 - 4 得到 16。",id:"c3-1-q1"},{type:"predict",question:'printf("%d", 3+4*2);',answer:["11"],explanation:"先算乘法 4*2=8，再加 3，结果为 11。",id:"c3-1-q2"},{type:"predict",question:'printf("%d", (3+4)*2);',answer:["14"],explanation:"括号先计算 3+4。",id:"c3-1-q3"},{type:"boolean",question:"整数除数为 0 是合法的普通算术运算。",answer:["错误"],explanation:"整数除以零是未定义行为。",options:["正确","错误"],id:"c3-1-q4"},{type:"predict",question:'printf("%d", 15/4);',answer:["3"],explanation:"两个 int 相除得到整数商。",id:"c3-1-q5"},{type:"fill",question:"表示乘法的运算符是什么？",answer:["*"],explanation:"C 以星号表示乘法。",id:"c3-1-q6"},{type:"predict",question:'printf("%d", 18-6/2);',answer:["15"],explanation:"先算 6/2=3，再从 18 中减去。",id:"c3-1-q7"},{id:"c3-1-audit-1",type:"predict",question:'printf("%d %d",20-7-2,20-(7-2)); 输出什么？',answer:["11 15"],explanation:"减法左结合，第一项按 (20-7)-2 分组；第二项的括号改变分组。"},{id:"c3-1-audit-2",type:"boolean",question:"因为加法左结合，所以 f()+g() 必定先调用 f 再调用 g。",answer:["错误"],explanation:"结合性控制分组，不能给普通加法的两侧函数调用提供先后保证。",options:["正确","错误"]},{id:"c3-1-audit-3",type:"predict",question:'printf("%d %d",-10/3,-10%3); 在 C99 中输出什么？',answer:["-3 -1"],explanation:"C99 整数除法向零截断，余数与被除数同号，满足商余关系。"}],"c3-2":[{type:"single",question:'预测：printf("%d", 5 % 2); 的输出是什么？',options:["0","1","2","2.5"],answer:["1"],explanation:"5 = 2 × 2 + 1，因此余数为 1。余数不是除法得到的小数部分。",id:"c3-2-q1"},{type:"predict",question:'printf("%d", 23%6);',answer:["5"],explanation:"23=3*6+5。",id:"c3-2-q2"},{type:"predict",question:'printf("%d", -8%3);',answer:["-2"],explanation:"商向零截断为 -2，余数与被除数同号。",id:"c3-2-q3"},{type:"boolean",question:"可以用 % 求两个 double 的余数。",answer:["错误"],explanation:"% 的操作数必须是整数；浮点余数可使用数学库函数。",options:["正确","错误"],id:"c3-2-q4"},{type:"single",question:"可同时识别正负奇数的条件是？",answer:["n%2!=0"],explanation:"负奇数的余数可能为 -1，所以不能只判断等于 1。",options:["n%2!=0","n%2==1","n/2==0"],id:"c3-2-q5"},{type:"fill",question:"71 分钟除以 60 后的余数是多少？",answer:["11"],explanation:"71%60=11，是剩余分钟数。",id:"c3-2-q6"},{type:"boolean",question:"a%b 的除数 b 可以为 0。",answer:["错误"],explanation:"取余与整数除法一样，不允许零除数。",options:["正确","错误"],id:"c3-2-q7"}],"c3-3":[{type:"single",question:"int n=3; int x=n++; 执行后 x 和 n 是？",options:["3 和 4","4 和 4","3 和 3"],answer:["3 和 4"],explanation:"n++ 的表达式值是旧值 3，该完整表达式结束前 n 已更新为 4。",id:"c3-3-q1"},{type:"predict",question:'int n=4; int a=++n; printf("%d %d",a,n);',answer:["5 5"],explanation:"前置先增加再提供新值。",id:"c3-3-q2"},{type:"predict",question:'int n=4; int a=n++; printf("%d %d",a,n);',answer:["4 5"],explanation:"后置提供旧值，完整表达式结束时 n 已增加。",id:"c3-3-q3"},{type:"boolean",question:"单独作为语句使用时，++n 与 n++ 都会使 n 增加 1。",answer:["正确"],explanation:"在不使用表达式结果时，两者对普通变量的最终效果相同。",options:["正确","错误"],id:"c3-3-q4"},{type:"predict",question:'int n=3; n--; printf("%d",n);',answer:["2"],explanation:"自减把原值减去 1。",id:"c3-3-q5"},{type:"debug",question:'为什么不应预测 printf("%d %d",i++,i++); 的固定结果？',answer:["存在未定序的重复修改"],explanation:"C 没有为这两次修改规定安全顺序，属于未定义行为。",options:["存在未定序的重复修改","printf 不支持两个数","i 必须是 double"],id:"c3-3-q6"},{id:"c3-3-audit-1",type:"boolean",question:"后缀 i++ 的“先用旧值”保证递增副作用总在外层整个表达式结束之后才发生。",answer:["错误"],explanation:"后缀表达式提供旧值，但副作用何时发生受标准的顺序约束，不能擅自固定到外层表达式之后。",options:["正确","错误"]},{id:"c3-3-audit-2",type:"predict",question:'int i=2; int a=i++; int b=++i; printf("%d %d %d",a,b,i); 输出什么？',answer:["2 4 4"],explanation:"两次递增在独立完整表达式中，第一步保存旧值 2，第二步先递增再取得 4。"},{id:"c3-3-audit-3",type:"single",question:"避免自增副作用顺序问题的清楚写法是什么？",answer:["把需要先后执行的修改拆成独立语句"],explanation:"独立完整表达式之间有顺序保证，代码也更容易逐步跟踪。",options:["把所有 ++ 塞进一个 printf","把需要先后执行的修改拆成独立语句","依赖某一次编译的结果"]}],"c3-4":[{type:"predict",question:"预测：int x=9; x/=2; 最终 x 为多少？",answer:["4"],explanation:"x 是 int，复合除法保留整数结果，9 / 2 得到 4。",id:"c3-4-q1"},{type:"predict",question:'int x=5; x+=7; printf("%d",x);',answer:["12"],explanation:"+= 将右侧值累加到变量。",id:"c3-4-q2"},{type:"predict",question:'int x=5; x*=3; printf("%d",x);',answer:["15"],explanation:"*= 计算乘积并赋回。",id:"c3-4-q3"},{type:"predict",question:'int x=11; x%=4; printf("%d",x);',answer:["3"],explanation:"11 除以 4 的余数是 3。",id:"c3-4-q4"},{type:"boolean",question:"x/=2 对 int x 自动保留小数。",answer:["错误"],explanation:"左侧是 int，整数除法仍产生整数。",options:["正确","错误"],id:"c3-4-q5"},{type:"fill",question:"把变量 x 减去 3 的复合赋值运算符是什么？",answer:["-="],explanation:"使用 x-=3 表达减去后写回。",id:"c3-4-q6"},{type:"predict",question:'int x=2; x+=3; x*=4; printf("%d",x);',answer:["20"],explanation:"按语句顺序先加至 5，再乘 4。",id:"c3-4-q7"}],"c3-5":[{type:"debug",question:"分析：判断 x 是否等于 5 应使用哪一项？",options:["x == 5","x = 5","x := 5"],answer:["x == 5"],explanation:"== 是相等运算；= 是赋值，可能改变 x，并把赋值结果作为条件。",id:"c3-5-q1"},{type:"predict",question:'printf("%d", 7>=7);',answer:["1"],explanation:">= 包含等于；7 与 7 相等，所以比较为真，输出 1。",id:"c3-5-q2"},{type:"predict",question:'printf("%d", 4!=4);',answer:["0"],explanation:"两个值相等，不等比较为假。",id:"c3-5-q3"},{type:"boolean",question:"关系表达式的真值总是整数 1。",answer:["正确"],explanation:"C 关系与相等运算返回 int 的 0 或 1。",options:["正确","错误"],id:"c3-5-q4"},{type:"debug",question:"if(x=5) 与 if(x==5) 有什么区别？",answer:["前者赋值，后者比较"],explanation:"赋值会修改 x；比较判断当前值而不修改它。",options:["前者赋值，后者比较","两者完全相同","前者比较，后者赋值"],id:"c3-5-q5"},{type:"single",question:"检查 x 在 2 到 9 的闭区间内，应使用？",answer:["x>=2 && x<=9"],explanation:"C 不能直接使用数学中的连续比较。",options:["x>=2 && x<=9","2<=x<=9","x>=2 || x<=9"],id:"c3-5-q6"},{type:"predict",question:'printf("%d %d",3<5,3>5);',answer:["1 0"],explanation:"3<5 为真得到 1，3>5 为假得到 0，按顺序输出两个结果。",id:"c3-5-q7"}],"c3-6":[{type:"boolean",question:"判断：0 && (10 / 0) 会对右侧进行求值。",options:["正确","错误"],answer:["错误"],explanation:"&& 在左侧为 0 时短路，因此右侧不执行；这是有定义的短路行为。",id:"c3-6-q1"},{type:"predict",question:'printf("%d", 1&&0);',answer:["0"],explanation:"逻辑与要求两边都真。",id:"c3-6-q2"},{type:"predict",question:'printf("%d", -2&&7);',answer:["1"],explanation:"两个非零操作数都为真。",id:"c3-6-q3"},{type:"boolean",question:"&& 左侧为假时不会求值右侧。",answer:["正确"],explanation:"逻辑与的短路规则可以保护后续危险运算。",options:["正确","错误"],id:"c3-6-q4"},{type:"single",question:"避免零除数的安全条件是？",answer:["b!=0 && a/b>2"],explanation:"先检查 b，只有非零才执行除法。",options:["b!=0 && a/b>2","a/b>2 && b!=0","b==0 && a/b>2"],id:"c3-6-q5"},{type:"fill",question:"C 的逻辑与运算符是什么？",answer:["&&"],explanation:"单个 & 是按位与，不具备相同的短路含义。",id:"c3-6-q6"},{type:"boolean",question:"&& 的结果可能为 7。",answer:["错误"],explanation:"逻辑运算返回规范化的 0 或 1。",options:["正确","错误"],id:"c3-6-q7"}],"c3-7":[{type:"single",question:"哪种写法正确判断 x 等于 1 或 2？",options:["x == 1 || x == 2","x == 1 || 2","x == (1 || 2)"],answer:["x == 1 || x == 2"],explanation:"每个条件都必须完整比较；单独的 2 在逻辑表达式中始终为真。",id:"c3-7-q1"},{type:"predict",question:'printf("%d", 0||5);',answer:["1"],explanation:"任一非零即为真，结果规范化为 1。",id:"c3-7-q2"},{type:"predict",question:'printf("%d", 0||0);',answer:["0"],explanation:"只有两边都假，逻辑或才是假。",id:"c3-7-q3"},{type:"boolean",question:"|| 左侧为真时会跳过右侧。",answer:["正确"],explanation:"逻辑或具有短路求值。",options:["正确","错误"],id:"c3-7-q4"},{type:"debug",question:"x==1 || 2 为什么总为真？",answer:["单独的整数 2 是真"],explanation:"右侧没有比较 x；应写成 x==1 || x==2。",options:["单独的整数 2 是真","|| 表示除法","x 被赋值为 2"],id:"c3-7-q5"},{type:"fill",question:"C 的逻辑或运算符是什么？",answer:["||"],explanation:"两个竖线构成逻辑或，单个竖线是按位或。",id:"c3-7-q6"},{type:"boolean",question:"&& 的优先级高于 ||。",answer:["正确"],explanation:"即便如此，复杂条件仍建议用括号明确分组。",options:["正确","错误"],id:"c3-7-q7"}],"c3-8":[{type:"multi",question:"多选：哪些表达式与 !(a && b) 等价？",options:["!a || !b","!(b && a)","!a && !b"],answer:["!a || !b","!(b && a)"],explanation:"逻辑与可交换，而德摩根律把“并且”的否定变成两个否定的“或者”。",id:"c3-8-q1"},{type:"predict",question:'printf("%d", !9);',answer:["0"],explanation:"非零是真，逻辑非得到假。",id:"c3-8-q2"},{type:"predict",question:'printf("%d", !!0);',answer:["0"],explanation:"两次逻辑非把值规范化，0 仍为 0。",id:"c3-8-q3"},{type:"single",question:"!(a||b) 的等价表达式是？",answer:["!a && !b"],explanation:"德摩根律将或的否定变成两个否定的与。",options:["!a && !b","!a || !b","a && b"],id:"c3-8-q4"},{type:"boolean",question:"! 与 ~ 在 C 中做相同的事。",answer:["错误"],explanation:"! 是逻辑非，~ 是逐位取反。",options:["正确","错误"],id:"c3-8-q5"},{type:"predict",question:'printf("%d", !(3<2));',answer:["1"],explanation:"内部比较为假，取非后为真。",id:"c3-8-q6"},{type:"multi",question:"哪些表达式结果为 1？",answer:["!0","!!5"],explanation:"!0 为 1，!!5 将非零规范化为 1，!5 为 0。",options:["!0","!!5","!5"],id:"c3-8-q7"}],"c3-9":[{type:"boolean",question:"判断：0 是非负偶数。",options:["正确","错误"],answer:["正确"],explanation:"0 >= 0 为真，0 % 2 为 0，所以两个条件同时成立。",id:"c3-9-q1"},{type:"predict",question:'int n=12; printf("%d",n>10 && n%3==0);',answer:["1"],explanation:"12 同时大于 10 且是 3 的倍数。",id:"c3-9-q2"},{type:"boolean",question:"0 % 2 为 0。",answer:["正确"],explanation:"0 能被 2 整除，因此是偶数。",options:["正确","错误"],id:"c3-9-q3"},{type:"single",question:"判断 n 是非负偶数，正确条件是？",answer:["n>=0 && n%2==0"],explanation:"需要同时满足非负和偶数。",options:["n>=0 && n%2==0","n>=0 || n%2==0","n%2==1"],id:"c3-9-q4"},{type:"predict",question:'printf("%d", 2+3>4 && 7%2!=0);',answer:["1"],explanation:"左侧 5>4，右侧 7 余 1，两个条件都真。",id:"c3-9-q5"},{type:"boolean",question:"只要表达式能编译，就无需检查边界数据。",answer:["错误"],explanation:"编译不能验证业务规则，0、负数和临界值仍需覆盖。",options:["正确","错误"],id:"c3-9-q6"}],"c4-1":[{type:"debug",question:'分析：if (x > 0); { puts("yes"); } 的问题是什么？',options:["分号让 if 控制空语句","缺少头文件 stdbool.h","puts 不能输出"],answer:["分号让 if 控制空语句"],explanation:"分号独立构成空语句，后面的花括号块无条件执行，因此需要删除多余分号。",id:"c4-1-q1"},{type:"predict",question:'int x=0; if(x){puts("Yes");} puts("End"); 输出什么？',answer:["End"],explanation:"条件 0 为假，只执行 if 后的输出。",id:"c4-1-q2"},{type:"boolean",question:"if 后面的一条空分号可能使后续代码块无条件执行。",answer:["正确"],explanation:"分号本身构成空语句，if 控制的是它。",options:["正确","错误"],id:"c4-1-q3"},{type:"fill",question:"if 条件中，整数 0 代表真还是假？",answer:["假"],explanation:"C 把 0 解释为假，非零解释为真。",id:"c4-1-q4"},{type:"boolean",question:"花括号可以防止后来添加的语句意外落在 if 控制范围外。",answer:["正确"],explanation:"明确代码块范围能减少维护错误。",options:["正确","错误"],id:"c4-1-q5"},{type:"predict",question:'int x=-1; if(x){printf("A");} printf("B");',answer:["AB"],explanation:"-1 非零为真，先输出 A 再输出 B。",id:"c4-1-q6"}],"c4-2":[{type:"boolean",question:"判断：同一个 if-else 中两个分支可能同时执行。",options:["正确","错误"],answer:["错误"],explanation:"if 与 else 互斥，同一次判断只能选择一条路径。",id:"c4-2-q1"},{type:"predict",question:'int n=8; if(n%2==0)printf("E");else printf("O");',answer:["E"],explanation:"8 的余数为 0，选择偶数分支。",id:"c4-2-q2"},{type:"boolean",question:"else 自身不需要再写一个条件。",answer:["正确"],explanation:"else 覆盖关联 if 不成立的情况。",options:["正确","错误"],id:"c4-2-q3"},{type:"fill",question:"if-else 一次判断会执行几个分支？",answer:["1"],explanation:"两个分支互斥且覆盖真假情况。",id:"c4-2-q4"},{type:"predict",question:'int x=-2; if(x>0)puts("P");else puts("N");',answer:["N"],explanation:"-2 不大于 0，执行 else。",id:"c4-2-q5"},{type:"debug",question:"if 与 else 之间插入无关语句会怎样？",answer:["破坏语法配对"],explanation:"else 必须直接接在对应的 if 语句结构之后。",options:["破坏语法配对","自动生成第二个 if","总是没问题"],id:"c4-2-q6"}],"c4-3":[{type:"single",question:"s=90 时，示例的分支结果是？",options:["A","B","C"],answer:["A"],explanation:"第一个 >=90 已经成立，后面的 else-if 不再检查。",id:"c4-3-q1"},{type:"predict",question:'int s=90; if(s>=90)puts("A");else if(s>=60)puts("B");else puts("C");',answer:["A"],explanation:"第一个条件成立，后续分支不再执行。",id:"c4-3-q2"},{type:"boolean",question:"else-if 链可能在同一次判断中执行两个分支。",answer:["错误"],explanation:"它只执行第一项成立的分支。",options:["正确","错误"],id:"c4-3-q3"},{type:"single",question:"成绩分级中，为避免 95 分先落入及格，应如何排列？",answer:["先判断 >=90，再判断 >=60"],explanation:"较严格的高分条件放在前面。",options:["先判断 >=90，再判断 >=60","先判断 >=60，再判断 >=90","只判断 ==60"],id:"c4-3-q4"},{type:"predict",question:'int s=60; if(s>=90)puts("A");else if(s>=60)puts("B");else puts("C");',answer:["B"],explanation:"60 在第二个分支的边界内。",id:"c4-3-q5"},{type:"fill",question:"在 else-if 链中承接所有未命中情况的关键字是什么？",answer:["else"],explanation:"末尾 else 是默认分支。",id:"c4-3-q6"},{type:"boolean",question:"测试 59、60、89、90 有助于检查分级边界。",answer:["正确"],explanation:"边界两侧的值能揭示遗漏等号或区间重叠。",options:["正确","错误"],id:"c4-3-q7"}],"c4-4":[{type:"fill",question:"填空：通常用于结束一个 case 分支、防止贯穿的关键字是什么？",answer:["break"],explanation:"break 退出最近一层 switch 或循环；它不等同于退出整个函数。",id:"c4-4-q1"},{type:"boolean",question:"switch 可以直接用 double 作为控制表达式。",answer:["错误"],explanation:"switch 的控制表达式应为整数类型。",options:["正确","错误"],id:"c4-4-q2"},{type:"fill",question:"没有匹配 case 时，哪个标签提供默认处理？",answer:["default"],explanation:"default 覆盖没有匹配任何 case 的情况。",id:"c4-4-q3"},{type:"predict",question:'int x=1;switch(x){case 1:printf("A");case 2:printf("B");break;}',answer:["AB"],explanation:"case 1 缺少 break，会贯穿到 case 2。",id:"c4-4-q4"},{type:"boolean",question:"多个 case 可以有意共享一段处理代码。",answer:["正确"],explanation:"可以连续写多个标签，但应明确贯穿意图。",options:["正确","错误"],id:"c4-4-q5"},{type:"debug",question:"case n 中 n 是运行时变量，问题是什么？",answer:["case 需要整型常量表达式"],explanation:"case 标签值须在编译期满足常量表达式要求。",options:["case 需要整型常量表达式","n 只能是字符串","case 必须有输入"],id:"c4-4-q6"},{type:"single",question:"switch 内 break 会退出什么？",answer:["最近一层 switch"],explanation:"它不会直接结束整个函数。",options:["最近一层 switch","整个程序","所有外层循环"],id:"c4-4-q7"}],"c4-5":[{type:"predict",question:"预测：3 > 5 ? 10 : 20 的值是多少？",answer:["20"],explanation:"3 > 5 为假，因此选择冒号后面的 20。",id:"c4-5-q1"},{type:"predict",question:'printf("%d", 5<3 ? 8 : 9);',answer:["9"],explanation:"条件为假，选择冒号后一侧。",id:"c4-5-q2"},{type:"boolean",question:"条件运算符会同时求值两个候选表达式。",answer:["错误"],explanation:"只计算条件选中的一侧。",options:["正确","错误"],id:"c4-5-q3"},{type:"fill",question:"条件运算符由问号和哪个符号配合构成？",answer:[":"],explanation:"完整结构为 条件 ? 真值 : 假值。",id:"c4-5-q4"},{type:"single",question:"选择较大值的正确写法是？",answer:["a>b ? a : b"],explanation:"条件成立选 a，否则选 b。",options:["a>b ? a : b","a>b : a ? b","a>b ? b : a"],id:"c4-5-q5"},{type:"boolean",question:"多层复杂条件通常更适合写成 if-else。",answer:["正确"],explanation:"可读性比压缩字符数更重要。",options:["正确","错误"],id:"c4-5-q6"}],"c4-6":[{type:"single",question:"哪个值应被示例判定为 Invalid？",options:["101","60","0"],answer:["101"],explanation:"合法范围是 0～100 的闭区间，101 超过上界。",id:"c4-6-q1"},{type:"single",question:"先检查成绩范围再评定的主要原因是？",answer:["阻止无效值进入正常分级"],explanation:"120 分不应被当成正常优秀成绩。",options:["阻止无效值进入正常分级","让程序变慢","避免使用变量"],id:"c4-6-q2"},{type:"predict",question:'int s=101; printf("%d",s<0 || s>100);',answer:["1"],explanation:"101 超过上界，判为无效。",id:"c4-6-q3"},{type:"boolean",question:"s<0 && s>100 能识别所有越界成绩。",answer:["错误"],explanation:"两项不可能同时成立，应使用逻辑或。",options:["正确","错误"],id:"c4-6-q4"},{type:"fill",question:"及格分数包含 60 时，比较符应写什么？",answer:[">="],explanation:">= 包含边界等号。",id:"c4-6-q5"},{type:"multi",question:"分数范围验证应覆盖哪些测试？",answer:["0 与 100","-1 与 101"],explanation:"合法边界和边界外的值都要测试。",options:["0 与 100","-1 与 101","只测 80"],id:"c4-6-q6"}],"c4-7":[{type:"single",question:"没有花括号时，else 默认与哪个 if 配对？",options:["最近尚未配对的 if","最外层 if","按缩进判断"],answer:["最近尚未配对的 if"],explanation:"C 的语法配对由结构决定，空白缩进不决定 else 归属。",id:"c4-7-q1"},{type:"boolean",question:"else 的归属由缩进决定。",answer:["错误"],explanation:"语法上匹配最近的尚未配对 if。",options:["正确","错误"],id:"c4-7-q2"},{type:"single",question:"先判断营业再判断库存，内层条件何时执行？",answer:["营业条件为真时"],explanation:"内层语句位于外层 if 的块中。",options:["营业条件为真时","不论营业与否","编译时执行"],id:"c4-7-q3"},{type:"fill",question:"减少悬空 else 歧义，建议始终使用哪种括号？",answer:["花括号"],explanation:"花括号明确块结构。",id:"c4-7-q4"},{type:"predict",question:'int a=1,b=0;if(a){if(b)printf("X");else printf("Y");}else printf("Z");',answer:["Y"],explanation:"外层为真，内层为假，所以执行内层 else。",id:"c4-7-q5"},{type:"boolean",question:"深层嵌套可以考虑提前返回或拆为函数来改善阅读。",answer:["正确"],explanation:"保持控制流程清晰能降低维护错误。",options:["正确","错误"],id:"c4-7-q6"}],"c5-1":[{type:"single",question:"读取 double x，哪种写法正确？",options:['scanf("%lf", &x)','scanf("%f", &x)','scanf("%d", x)'],answer:['scanf("%lf", &x)'],explanation:"scanf 需要 double 对象的地址以及 %lf。printf 中 double 的常用格式则是 %f。",id:"c5-1-q1"},{type:"fill",question:"scanf 读取 float 变量应使用什么格式？",answer:["%f"],explanation:"输入 float* 用 %f，double* 用 %lf。",id:"c5-1-q2"},{type:"boolean",question:"printf 输出 double 必须使用 %lf，%f 不行。",answer:["错误"],explanation:"printf 的 %f 接受 double；scanf 才需要区分 %lf。",options:["正确","错误"],id:"c5-1-q3"},{type:"fill",question:"scanf 读取 int 应使用哪个控制符？",answer:["%d"],explanation:"%d 对应 int 对象的地址。",id:"c5-1-q4"},{type:"boolean",question:"scanf 的控制符类型错误可能导致内存被错误写入。",answer:["正确"],explanation:"输入函数写入目标对象，类型和大小必须匹配。",options:["正确","错误"],id:"c5-1-q5"}],"c5-2":[{type:"fill",question:'scanf("%d %d", &a, &b) 成功读取两个整数时返回多少？',answer:["2"],explanation:"返回值统计成功转换并赋值的个数；遇到不匹配或输入结束时可能小于 2。",id:"c5-2-q1"},{type:"fill",question:"scanf 将数据写入变量 n，通常需要在 n 前面写哪个运算符？",answer:["&"],explanation:"&n 提供对象的地址。",id:"c5-2-q2"},{type:"boolean",question:"scanf 的 %d 会跳过前导空白。",answer:["正确"],explanation:"数值转换会跳过空格、制表和换行。",options:["正确","错误"],id:"c5-2-q3"},{type:"single",question:"读取两个整数后，正常使用变量前应检查什么？",answer:["返回值是否为 2"],explanation:"返回值统计成功赋值的数量。",options:["返回值是否为 2","返回值是否为输入的和","无需检查"],id:"c5-2-q4"},{type:"boolean",question:"scanf 的 %c 总会自动跳过换行。",answer:["错误"],explanation:"%c 不跳过空白，需要时可在格式中加前导空格。",options:["正确","错误"],id:"c5-2-q5"},{type:"fill",question:"scanf 只成功读取两个目标中的第一个时，返回多少？",answer:["1"],explanation:"一个成功赋值就返回 1。",id:"c5-2-q6"}],"c5-3":[{type:"predict",question:"输入 2.5 3，示例输出是什么？",answer:["7.50"],explanation:"两数相乘为 7.5，输出格式要求两位小数，因此为 7.50。",id:"c5-3-q1"},{type:"predict",question:"输入长宽 1.5 和 4，周长 2*(w+h) 用 %.2f 输出什么？",answer:["11.00"],explanation:"先加得 5.5，再乘 2。",id:"c5-3-q2"},{type:"boolean",question:"评测程序应无条件打印 Enter number 这样的额外提示。",answer:["错误"],explanation:"题目没有要求的提示会改变输出。",options:["正确","错误"],id:"c5-3-q3"},{type:"single",question:"处理带小数的矩形长宽，应采用？",answer:["double"],explanation:"使用浮点类型避免读取时丢掉小数。",options:["double","char","int"],id:"c5-3-q4"},{type:"fill",question:"程序数据流程依次为：输入、计算、什么？",answer:["输出"],explanation:"输出应符合题目指定格式。",id:"c5-3-q5"}],"c5-4":[{type:"single",question:'输入 abc 给 scanf("%d", &n)，通常返回什么？',options:["0","1","abc"],answer:["0"],explanation:"没有成功的整数转换，所以返回 0；若输入结束且尚未转换，则可能返回 EOF。",id:"c5-4-q1"},{type:"boolean",question:"成功读取一个整数后，可以不检查业务范围。",answer:["错误"],explanation:"能转换成整数不代表符合年龄或成绩等约束。",options:["正确","错误"],id:"c5-4-q2"},{type:"single",question:"输入结束且没有成功转换时 scanf 可能返回？",answer:["EOF"],explanation:"EOF 区别于普通的匹配失败 0。",options:["EOF","任意用户输入值","总为 1"],id:"c5-4-q3"},{type:"predict",question:'int s=100;printf("%d",s>=0 && s<=100);',answer:["1"],explanation:"100 位于合法闭区间内。",id:"c5-4-q4"},{type:"debug",question:"scanf 失败后使用未初始化 n，会有什么风险？",answer:["读取不确定值"],explanation:"必须先检查成功转换数，再访问目标变量。",options:["读取不确定值","自动获得 0","程序自动重新输入"],id:"c5-4-q5"}],"c5-5":[{type:"multi",question:"多选：哪些输入应输出 Invalid？",options:["5 0","abc","5 2"],answer:["5 0","abc"],explanation:"分母为 0 不应进行除法；读取失败同样无法得到可靠计算结果。",id:"c5-5-q1"},{type:"boolean",question:"应在除法执行之前检查分母是否为零。",answer:["正确"],explanation:"先保证计算前提，避免危险运算。",options:["正确","错误"],id:"c5-5-q2"},{type:"predict",question:'输入 a=-9,b=4，printf("%.2f",a/b) 在 a,b 为 double 时输出？',answer:["-2.25"],explanation:"浮点除法保留小数。",id:"c5-5-q3"},{type:"single",question:"读取失败或分母为零都应拒绝，应使用哪个逻辑关系？",answer:["或"],explanation:"任意一种错误都足以使输入无效。",options:["或","且","相等"],id:"c5-5-q4"},{type:"fill",question:"判断 double b 是否为零，本节可使用的相等运算符是什么？",answer:["=="],explanation:"检测实际输入的精确零适用 b==0。",id:"c5-5-q5"}],"c6-1":[{type:"fill",question:"for (int i=0; i<4; i++) 的循环体执行几次？",answer:["4"],explanation:"i 依次为 0、1、2、3，一共四个有效值。",id:"c6-1-q1"},{type:"predict",question:'for(int i=2;i<5;i++) printf("%d ",i);',answer:["2 3 4"],explanation:"条件是严格小于 5，不包括 5。",id:"c6-1-q2"},{type:"fill",question:"for 循环的初始化部分通常执行几次？",answer:["1"],explanation:"初始化只在进入循环时执行一次。",id:"c6-1-q3"},{type:"boolean",question:"for 的更新表达式在每轮循环体之前首次执行。",answer:["错误"],explanation:"正常顺序为初始化、判断、循环体、更新。",options:["正确","错误"],id:"c6-1-q4"},{type:"predict",question:'int count=0;for(int i=0;i<=3;i++)count++;printf("%d",count);',answer:["4"],explanation:"有效值为 0、1、2、3。",id:"c6-1-q5"},{type:"boolean",question:"i<0 初始为假时，for 循环体可以一次也不执行。",answer:["正确"],explanation:"for 在循环体之前检查条件。",options:["正确","错误"],id:"c6-1-q6"}],"c6-2":[{type:"boolean",question:"判断：while 条件一开始为假，循环体不会执行。",options:["正确","错误"],answer:["正确"],explanation:"while 属于先判断循环；只有条件非零才进入循环体。",id:"c6-2-q1"},{type:"predict",question:'int n=3;while(n>0){printf("%d ",n);n--;}',answer:["3 2 1"],explanation:"每轮输出后递减，0 时退出。",id:"c6-2-q2"},{type:"boolean",question:"while 适合次数由运行状态决定的重复任务。",answer:["正确"],explanation:"其条件可以反映剩余工作或输入状态。",options:["正确","错误"],id:"c6-2-q3"},{type:"fill",question:"int i=0;while(i<0){i++;} 中循环体执行几次？",answer:["0"],explanation:"i 初始为 0，0<0 为假，while 在进入前判断，所以循环体执行 0 次。",id:"c6-2-q4"},{type:"debug",question:'while(n>0){puts("x");} 在 n 初始为 1 时有什么风险？',answer:["n 不变化，无法终止"],explanation:"条件依赖的状态从未更新。",options:["n 不变化，无法终止","只会输出一次","puts 会自动令 n 递减"],id:"c6-2-q5"},{type:"boolean",question:"跟踪前几轮变量值有助于检查循环终止性。",answer:["正确"],explanation:"可以发现状态停滞或更新方向错误。",options:["正确","错误"],id:"c6-2-q6"}],"c6-3":[{type:"fill",question:"do-while 的循环体最少执行几次？",answer:["1"],explanation:"条件判断位于循环体之后，因此至少执行一次。",id:"c6-3-q1"},{type:"fill",question:"do-while 尾部 while(...) 后必须写哪个终止符？",answer:[";"],explanation:"尾部的分号是该语法的一部分。",id:"c6-3-q2"},{type:"predict",question:'int n=5;do{printf("%d",n);n++;}while(n<0);',answer:["5"],explanation:"先执行一次，再发现条件为假。",id:"c6-3-q3"},{type:"boolean",question:"do-while 在首次执行循环体之前检查条件。",answer:["错误"],explanation:"do-while 先执行循环体，再检查条件，因此即使初始条件为假也执行一次。",options:["正确","错误"],id:"c6-3-q4"},{type:"single",question:"必须先显示一次再决定重复的菜单适合哪种结构？",answer:["do-while"],explanation:"do-while 保证至少一次。",options:["do-while","仅声明变量","只写 return"],id:"c6-3-q5"},{type:"predict",question:'int n=2;do{n--;}while(n>0);printf("%d",n);',answer:["0"],explanation:"n 从 2 递减到 1 再到 0 后退出。",id:"c6-3-q6"}],"c6-4":[{type:"single",question:"示例遇到 i==3 后，下一个位置在哪里？",options:["循环之后","下一轮 i=4","main 外面"],answer:["循环之后"],explanation:"break 直接退出当前 for，循环更新表达式和下一轮都不会发生。",id:"c6-4-q1"},{type:"boolean",question:"break 会退出所有外层嵌套循环。",answer:["错误"],explanation:"只退出最近一层循环或 switch。",options:["正确","错误"],id:"c6-4-q2"},{type:"predict",question:'for(int i=1;i<=5;i++){if(i==4)break;printf("%d ",i);}',answer:["1 2 3"],explanation:"i 等于 4 时在输出前退出。",id:"c6-4-q3"},{type:"fill",question:"从整个函数立即返回应使用哪个关键字？",answer:["return"],explanation:"break 只退出局部控制结构。",id:"c6-4-q4"},{type:"boolean",question:"查找目标后立刻 break 可以减少无用遍历。",answer:["正确"],explanation:"任务已完成即可结束当前循环。",options:["正确","错误"],id:"c6-4-q5"},{type:"single",question:"执行 break 后，控制流转到哪里？",answer:["当前循环或 switch 后面"],explanation:"它结束最近一层结构。",options:["当前循环或 switch 后面","当前循环体开头","必然退出进程"],id:"c6-4-q6"}],"c6-5":[{type:"single",question:"for 中执行 continue 后还会执行更新表达式吗？",options:["会","不会"],answer:["会"],explanation:"continue 转到 for 的更新步骤，然后才检查下一轮条件。",id:"c6-5-q1"},{type:"predict",question:'for(int i=1;i<=4;i++){if(i==2)continue;printf("%d ",i);}',answer:["1 3 4"],explanation:"只跳过 i=2 这一轮的输出。",id:"c6-5-q2"},{type:"boolean",question:"continue 与 break 都直接结束循环。",answer:["错误"],explanation:"continue 进入下一轮，break 结束循环。",options:["正确","错误"],id:"c6-5-q3"},{type:"debug",question:"while 中 continue 跳过唯一的 i++，可能发生什么？",answer:["无限循环"],explanation:"条件变量无法更新可能使条件永远为真。",options:["无限循环","自动跳出函数","自动把 i 归零"],id:"c6-5-q4"},{type:"fill",question:"for 中 continue 后，会先执行更新表达式还是再次执行本轮剩余语句？",answer:["更新表达式"],explanation:"continue 转向 for 的更新步骤。",id:"c6-5-q5"},{type:"boolean",question:"使用 continue 筛选数据时，仍要确保输入次数正确推进。",answer:["正确"],explanation:"筛选条件不应该让读取控制停滞。",options:["正确","错误"],id:"c6-5-q6"}],"c6-6":[{type:"single",question:"累加 1 到 n，sum 应在哪里初始化为 0？",options:["循环开始前","每轮循环体中","不需要初始化"],answer:["循环开始前"],explanation:"初值只能在累计之前设置一次；每轮归零会抹掉先前的累计结果。",id:"c6-6-q1"},{type:"predict",question:'int sum=0;for(int i=1;i<=3;i++)sum+=i*i;printf("%d",sum);',answer:["14"],explanation:"1+4+9=14。",id:"c6-6-q2"},{type:"fill",question:"求乘积时，累乘器通常初始化为多少？",answer:["1"],explanation:"1 是乘法单位元，若从 0 开始乘积一直为 0。",id:"c6-6-q3"},{type:"boolean",question:"每轮在循环体内将 sum 初始化为 0 适合累计总和。",answer:["错误"],explanation:"会丢失前面各轮结果。",options:["正确","错误"],id:"c6-6-q4"},{type:"single",question:"检查累加循环正确性，可维护什么结论？",answer:["sum 等于已处理元素之和"],explanation:"这个循环不变式有助于推理初值和每次更新。",options:["sum 等于已处理元素之和","sum 总是最后一项","sum 与循环次数无关"],id:"c6-6-q5"}],"c6-7":[{type:"fill",question:"外层 3 次、每次内层 4 次，内层循环体共执行几次？",answer:["12"],explanation:"每行 4 个单元格，共 3 行，所以是 3 × 4 = 12。",id:"c6-7-q1"},{type:"fill",question:"外层 2 次、内层每次 5 次，内层循环体共执行几次？",answer:["10"],explanation:"乘法原理：2*5。",id:"c6-7-q2"},{type:"boolean",question:"每次进入新一行时，内层计数应从起点重新开始。",answer:["正确"],explanation:"内层完整遍历当前行。",options:["正确","错误"],id:"c6-7-q3"},{type:"single",question:"打印矩形时，行末换行应放在哪里？",answer:["内层循环结束后"],explanation:"内层输出一整行，之后再换行。",options:["内层循环结束后","每个字符前","所有外层循环之前"],id:"c6-7-q4"},{type:"predict",question:'int n=0;for(int r=0;r<3;r++)for(int c=0;c<2;c++)n++;printf("%d",n);',answer:["6"],explanation:"每行 2 次，共 3 行。",id:"c6-7-q5"},{type:"boolean",question:"内层 break 默认会同时退出外层。",answer:["错误"],explanation:"break 只退出最近一层。",options:["正确","错误"],id:"c6-7-q6"}],"c6-8":[{type:"multi",question:"多选：哪些可以结束 while(1) 所在的循环执行？",options:["执行该循环中的 break","从函数 return","普通的 continue"],answer:["执行该循环中的 break","从函数 return"],explanation:"break 退出循环，return 退出函数；continue 只进入下一轮，不能结束循环。",id:"c6-8-q1"},{type:"boolean",question:"while(1) 一定是程序错误。",answer:["错误"],explanation:"可以通过内部 break 有意设计退出路径。",options:["正确","错误"],id:"c6-8-q2"},{type:"fill",question:"for(;;) 省略继续条件时，条件被视为真还是假？",answer:["真"],explanation:"这是常见的无条件循环写法。",id:"c6-8-q3"},{type:"debug",question:"i 从 0 递增，但循环等待 i<0 才退出，问题是什么？",answer:["退出条件可能永远到不了"],explanation:"需要确认状态更新确实趋近出口。",options:["退出条件可能永远到不了","递增不能出现在循环内","i 会立刻变成负数"],id:"c6-8-q4"},{type:"single",question:"运行超时时最优先检查什么？",answer:["循环条件与状态更新"],explanation:"先证明程序会终止，而不是盲目延长等待。",options:["循环条件与状态更新","页面背景色","变量名字长度"],id:"c6-8-q5"},{type:"predict",question:'int i=0;while(1){i++;if(i==4)break;}printf("%d",i);',answer:["4"],explanation:"i 增至 4 时触发可达的出口。",id:"c6-8-q6"}],"c6-9":[{type:"fill",question:"数据 -2 0 4 5 中，严格大于零的数有几个？",answer:["2"],explanation:"只有 4 和 5 严格大于 0，零不属于正数。",id:"c6-9-q1"},{type:"predict",question:"数据 -3 0 2 7 的正数和与个数分别为多少？用空格分隔。",answer:["9 2"],explanation:"严格大于零的只有 2 和 7。",id:"c6-9-q2"},{type:"boolean",question:"统计正数时，零应该计入正数个数。",answer:["错误"],explanation:"正数要求严格大于 0。",options:["正确","错误"],id:"c6-9-q3"},{type:"fill",question:"固定读取 n 个值，常用 i 从 0 开始且满足 i 与 n 的哪种关系？",answer:["i<n"],explanation:"合法迭代值为 0 到 n-1，共 n 次。",id:"c6-9-q4"},{type:"debug",question:"只在 x>0 时增加读取次数计数器，会有什么问题？",answer:["读取次数被筛选条件错误影响"],explanation:"输入总数与是否计入统计是两件事。",options:["读取次数被筛选条件错误影响","自动变成排序","所有负数都会变成零"],id:"c6-9-q5"},{type:"boolean",question:"每轮应先成功读入当前值，再判断是否累计。",answer:["正确"],explanation:"先获得可靠数据，再执行条件统计。",options:["正确","错误"],id:"c6-9-q6"}],"c7-1":[{type:"single",question:"函数定义后会自动执行吗？",options:["不会，需要调用","会，编译时执行"],answer:["不会，需要调用"],explanation:"函数体在被调用时才运行；定义提供实现，调用启动实现。",id:"c7-1-q1"},{type:"fill",question:"void greet(void) 中函数名前的 void 表示什么？",answer:["不返回值"],explanation:"返回类型与参数列表中的 void 含义不同。",id:"c7-1-q2"},{type:"boolean",question:"函数定义可以放在 main 之前，供 main 直接调用。",answer:["正确"],explanation:"调用点已经能看到完整声明。",options:["正确","错误"],id:"c7-1-q3"},{type:"debug",question:"只写 greet; 为什么没有执行问候？",answer:["缺少调用圆括号"],explanation:"greet 是函数标识符，greet() 才是调用。",options:["缺少调用圆括号","void 函数不能调用","必须命名为 main"],id:"c7-1-q4"},{type:"predict",question:'void f(void){printf("A");} 调用 f();f(); 的输出？',answer:["AA"],explanation:"两次调用各执行一次输出。",id:"c7-1-q5"}],"c7-2":[{type:"single",question:"int f(void) { return 7; } 调用 f() 会自动输出 7 吗？",options:["不会","会"],answer:["不会"],explanation:"return 传递值，打印需要额外调用 printf 或其他输出函数。",id:"c7-2-q1"},{type:"fill",question:"结束当前函数并向调用者交回结果的关键字是什么？",answer:["return"],explanation:"return 后的表达式提供返回值。",id:"c7-2-q2"},{type:"boolean",question:"void 函数不能使用不带值的 return;。",answer:["错误"],explanation:"void 函数可用 return; 提前退出。",options:["正确","错误"],id:"c7-2-q3"},{type:"predict",question:'int twice(int n){return n*2;} printf("%d",twice(7));',answer:["14"],explanation:"实参 7 进入函数，结果为 14。",id:"c7-2-q4"},{type:"debug",question:"普通非 void 函数某条路径没有提供返回值，调用者又使用结果，有何风险？",answer:["结果没有可靠定义"],explanation:"应保证需要返回的所有路径都返回正确类型的值。",options:["结果没有可靠定义","自动返回 0","自动返回最近的变量"],id:"c7-2-q5"},{type:"boolean",question:"返回值可以继续参与其他表达式。",answer:["正确"],explanation:"例如 int total=f()+3，不需要先打印。",options:["正确","错误"],id:"c7-2-q6"}],"c7-3":[{type:"single",question:"int x=3; change(x); 中 change 将形参改为 99，x 会变吗？",options:["不会，仍为 3","会变为 99"],answer:["不会，仍为 3"],explanation:"C 采用值传递，修改形参只改变函数内的副本。",id:"c7-3-q1"},{type:"boolean",question:"C 的普通整数参数按值传递。",answer:["正确"],explanation:"形参接收实参值的副本。",options:["正确","错误"],id:"c7-3-q2"},{type:"predict",question:'int add(int a,int b){return a+b;} printf("%d",add(2,9));',answer:["11"],explanation:"位置对应传入 a=2、b=9。",id:"c7-3-q3"},{type:"single",question:"调用 sub(8,3)，参数按什么关系对应？",answer:["按位置顺序"],explanation:"形参名字与调用者变量名字不决定对应关系。",options:["按位置顺序","按变量名字相同","自动按数值大小"],id:"c7-3-q4"},{type:"debug",question:"void set(int x){x=9;} 无法修改调用者 n，如何明确获得新值？",answer:["返回新值并在调用处赋值"],explanation:"普通形参只是副本。",options:["返回新值并在调用处赋值","把 x 名字改为 n 就行","删除函数括号"],id:"c7-3-q5"},{type:"boolean",question:"形参通常具有函数内部的局部作用范围。",answer:["正确"],explanation:"函数外不能直接通过其局部名字访问它。",options:["正确","错误"],id:"c7-3-q6"}],"c7-4":[{type:"predict",question:"预测：is_even(-4) 返回多少？",answer:["1"],explanation:"-4 除以 2 的余数为 0，因此比较结果为真，也就是 1。",id:"c7-4-q1"},{type:"predict",question:'int even(int n){return n%2==0;} printf("%d",even(0));',answer:["1"],explanation:"0 除以 2 的余数为 0。",id:"c7-4-q2"},{type:"boolean",question:"将计算函数与输入输出分开有助于复用和测试。",answer:["正确"],explanation:"计算接口清晰，不被特定输出格式绑定。",options:["正确","错误"],id:"c7-4-q3"},{type:"fill",question:"判断闭区间时，两个边界条件应通过什么逻辑运算符连接？",answer:["&&"],explanation:"需要同时满足下界与上界。",id:"c7-4-q4"},{type:"single",question:"区间判断函数的边界测试应包括？",answer:["恰好等于上下界"],explanation:"闭区间必须包含两个端点。",options:["恰好等于上下界","只选区间中间值","只测正数"],id:"c7-4-q5"}],"c7-5":[{type:"fill",question:"fact(0) 应该返回多少？",answer:["1"],explanation:"0! 定义为 1，它也构成阶乘递归的终止条件。",id:"c7-5-q1"},{type:"fill",question:"使递归直接返回而不再调用自己的情况称为什么？",answer:["基本情况"],explanation:"基本情况给递归提供出口。",id:"c7-5-q2"},{type:"boolean",question:"有基本情况就一定能终止，不必检查递归参数。",answer:["错误"],explanation:"递归步骤还必须最终达到基本情况。",options:["正确","错误"],id:"c7-5-q3"},{type:"predict",question:'int sum(int n){if(n==0)return 0;return n+sum(n-1);} printf("%d",sum(3));',answer:["6"],explanation:"3+2+1+0=6。",id:"c7-5-q4"},{type:"single",question:"递归层数过多可能耗尽哪种空间？",answer:["调用栈"],explanation:"每层调用通常占用栈帧。",options:["调用栈","浏览器书签","代码注释"],id:"c7-5-q5"},{type:"boolean",question:"对大输入，等价循环有时比递归更节省栈。",answer:["正确"],explanation:"循环通常不需要不断增加调用层数。",options:["正确","错误"],id:"c7-5-q6"}],"c7-6":[{type:"single",question:"哪个是声明“无参数且返回 int”的规范 C99 原型？",options:["int f(void);","int f();","void f(int);"],answer:["int f(void);"],explanation:"void 参数列表明确说明没有参数；空括号在 C99 的声明中不提供这种类型约束。",id:"c7-6-q1"},{type:"boolean",question:"函数原型末尾应带分号。",answer:["正确"],explanation:"原型是声明，没有函数体。",options:["正确","错误"],id:"c7-6-q2"},{type:"fill",question:"int f(void); 中 void 明确表示有几个参数？",answer:["0"],explanation:"明确的 void 列表表示无参数。",id:"c7-6-q3"},{type:"boolean",question:"C99 的 int f(); 声明与 int f(void); 提供相同的参数信息。",answer:["错误"],explanation:"空括号声明不提供参数类型信息。",options:["正确","错误"],id:"c7-6-q4"},{type:"debug",question:"原型返回 int，但定义返回 double，有什么问题？",answer:["函数类型声明不一致"],explanation:"原型和定义的返回与参数类型应一致。",options:["函数类型声明不一致","编译器自动择优","必须删除全部原型"],id:"c7-6-q5"}],"c7-7":[{type:"fill",question:"数字 507 的各位和是多少？",answer:["12"],explanation:"5 + 0 + 7 = 12；中间的 0 不增加和值，但仍然占一位。",id:"c7-7-q1"},{type:"predict",question:"对数字 304 执行一次 n%10，结果是多少？",answer:["4"],explanation:"用整数对 10 取余可以得到十进制末位。304=30*10+4，结果为 4。",id:"c7-7-q2"},{type:"predict",question:"对非负整数 n=304 执行 n/=10 后是多少？",answer:["30"],explanation:"整数除法去掉末位。",id:"c7-7-q3"},{type:"boolean",question:"各位和算法忘记 n/=10 可能无法终止。",answer:["正确"],explanation:"剩余问题必须不断缩短。",options:["正确","错误"],id:"c7-7-q4"},{type:"fill",question:"数字 9006 的各位和是多少？",answer:["15"],explanation:"9+0+0+6=15。",id:"c7-7-q5"},{type:"single",question:"digit_sum(0) 的合理结果是？",answer:["0"],explanation:"数字 0 的数位和为 0。",options:["0","1","未定义"],id:"c7-7-q6"}],"c8-1":[{type:"fill",question:"int a[4]={7}; 中 a[2] 的值是多少？",answer:["0"],explanation:"有初始化列表时，没有显式提供的剩余元素会被零初始化。",id:"c8-1-q1"},{type:"fill",question:"int a[3] 声明了几个元素？",answer:["3"],explanation:"方括号内的长度是元素数量。",id:"c8-1-q2"},{type:"boolean",question:"普通局部 int a[3]; 的元素自动全为零。",answer:["错误"],explanation:"没有初始化的自动数组元素值不确定。",options:["正确","错误"],id:"c8-1-q3"},{type:"predict",question:'int a[4]={2,3};printf("%d",a[3]);',answer:["0"],explanation:"显式初始化列表中未提供的剩余项为 0。",id:"c8-1-q4"},{type:"single",question:"数组中元素的类型通常怎样？",answer:["全部相同"],explanation:"数组是一组相同元素类型的连续对象。",options:["全部相同","每项任意不同","只有第一项有类型"],id:"c8-1-q5"},{type:"boolean",question:"标准 C 支持直接用 a=b 把一个数组整体赋值给另一个数组。",answer:["错误"],explanation:"数组对象不可作这种整体赋值，应逐项复制或使用合适库操作。",options:["正确","错误"],id:"c8-1-q6"}],"c8-2":[{type:"fill",question:"长度为 5 的数组，最大合法下标是多少？",answer:["4"],explanation:"下标从 0 开始，因此最后一个元素的下标为长度减一。",id:"c8-2-q1"},{type:"predict",question:'int a[3]={8,5,2};printf("%d",a[0]);',answer:["8"],explanation:"下标从 0 开始。",id:"c8-2-q2"},{type:"boolean",question:"C 会为所有数组访问自动进行边界检查。",answer:["错误"],explanation:"越界是未定义行为，不应依赖运行时自动报错。",options:["正确","错误"],id:"c8-2-q3"},{type:"fill",question:"长度为 n 的非空数组，最后合法下标是什么？",answer:["n-1"],explanation:"有效范围是 0 到 n-1。",id:"c8-2-q4"},{type:"debug",question:'for(i=0;i<=n;i++) printf("%d",a[i]); 的主要错误？',answer:["最后一次访问 a[n] 越界"],explanation:"条件通常应写 i<n。",options:["最后一次访问 a[n] 越界","下标不能是变量","数组必须从 1 开始"],id:"c8-2-q5"},{type:"boolean",question:"输入提供的下标应先验证范围，再用于访问。",answer:["正确"],explanation:"外部输入不能直接当成安全的数组位置。",options:["正确","错误"],id:"c8-2-q6"}],"c8-3":[{type:"debug",question:"分析：a[0]=a[1]; a[1]=a[0]; 为什么不能交换？",options:["第一步覆盖了原来的 a[0]","数组不能修改","下标必须从 1 开始"],answer:["第一步覆盖了原来的 a[0]"],explanation:"第二步读取的是已经被覆盖的新 a[0]，需要临时变量保存旧值。",id:"c8-3-q1"},{type:"predict",question:'int a[2]={3,7};a[0]+=2;printf("%d %d",a[0],a[1]);',answer:["5 7"],explanation:"只修改下标 0 的元素。",id:"c8-3-q2"},{type:"boolean",question:"a[i]++ 与 i++ 修改的是同一个对象。",answer:["错误"],explanation:"前者修改数组元素，后者修改下标变量。",options:["正确","错误"],id:"c8-3-q3"},{type:"fill",question:"交换两个元素前，常用什么变量保存旧值？",answer:["临时变量"],explanation:"先保存可避免覆盖后丢失原值。",id:"c8-3-q4"},{type:"predict",question:'int a[2]={1,9};a[0]=a[1];a[1]=a[0];printf("%d %d",a[0],a[1]);',answer:["9 9"],explanation:"第二次读取的是已覆盖的 a[0]。",id:"c8-3-q5"},{type:"boolean",question:"修改数组元素仍需保证下标合法。",answer:["正确"],explanation:"写越界与读越界都不安全。",options:["正确","错误"],id:"c8-3-q6"}],"c8-4":[{type:"single",question:"grid[1][0] 指的是哪一个位置？",options:["第二行第一列","第一行第二列","第二行第二列"],answer:["第二行第一列"],explanation:"两个下标都从 0 开始，第一个表示行，第二个表示列。",id:"c8-4-q1"},{type:"fill",question:"int a[2][4] 总共有多少个 int 元素？",answer:["8"],explanation:"2 行乘 4 列。",id:"c8-4-q2"},{type:"boolean",question:"C 二维数组采用按行优先的存储顺序。",answer:["正确"],explanation:"先排列第一行，再排列下一行。",options:["正确","错误"],id:"c8-4-q3"},{type:"predict",question:'int a[2][2]={{1,2},{3,4}};printf("%d",a[1][0]);',answer:["3"],explanation:"第二行第一列是 3。",id:"c8-4-q4"},{type:"single",question:"访问 a[r][c] 需要检查哪些边界？",answer:["行和列都检查"],explanation:"任一维越界都不合法。",options:["行和列都检查","只检查 r","只检查 c"],id:"c8-4-q5"},{type:"boolean",question:"二维数组的第一个下标通常对应行。",answer:["正确"],explanation:"a[r][c] 先选择第 r 行，再选该行第 c 项。",options:["正确","错误"],id:"c8-4-q6"}],"c8-5":[{type:"fill",question:"数组 {-8,-2,-5} 的最大值是多少？",answer:["-2"],explanation:"最大值必须来自元素本身；-2 大于 -5 和 -8，不能返回不存在的 0。",id:"c8-5-q1"},{type:"boolean",question:"求全负数组最大值时，max=0 是安全初值。",answer:["错误"],explanation:"0 可能不在数组中且大于所有真实元素。",options:["正确","错误"],id:"c8-5-q2"},{type:"fill",question:"非空数组求最大值时，候选初值通常选哪个元素？",answer:["a[0]"],explanation:"候选应来自实际数据。",id:"c8-5-q3"},{type:"predict",question:"数组 {-9,-7,-11} 的最小值是多少？",answer:["-11"],explanation:"-11 比另外两项更小。",id:"c8-5-q4"},{type:"single",question:"同时求最大最小值至少需要保存什么状态？",answer:["当前最大值和当前最小值"],explanation:"每个元素分别与两个候选比较。",options:["当前最大值和当前最小值","只保存长度","只保存最后一项"],id:"c8-5-q5"}],"c8-6":[{type:"multi",question:"多选：正确的数组函数接口通常需要什么？",options:["元素的访问入口","有效元素个数","依赖 sizeof(a) 自动获得原长度"],answer:["元素的访问入口","有效元素个数"],explanation:"数组形参调整为指针，不携带原数组长度；长度需要通过参数或明确约定提供。",id:"c8-6-q1"},{type:"boolean",question:"数组作为函数参数时，会自动复制整个数组。",answer:["错误"],explanation:"形参数组会调整为指针类型，并非数组副本。",options:["正确","错误"],id:"c8-6-q2"},{type:"fill",question:"数组访问入口之外，通常还需传入什么信息？",answer:["有效长度"],explanation:"函数参数不会自动携带调用者数组长度。",id:"c8-6-q3"},{type:"boolean",question:"在数组形参上用 sizeof(a)/sizeof(a[0]) 可可靠求原数组长度。",answer:["错误"],explanation:"此处 a 已是调整后的指针参数。",options:["正确","错误"],id:"c8-6-q4"},{type:"single",question:"const int a[] 在函数接口中表达什么意图？",answer:["不通过 a 修改元素"],explanation:"const 限制经该参数写入元素。",options:["不通过 a 修改元素","数组长度自动变化","复制数组到常量区"],id:"c8-6-q5"},{type:"boolean",question:"在函数中通过普通数组形参修改元素，调用者能观察到变化。",answer:["正确"],explanation:"它访问的是调用者提供的原元素。",options:["正确","错误"],id:"c8-6-q6"}],"c8-7":[{type:"single",question:"线性查找中返回 -1 通常表示什么？",options:["没有找到","第一个元素","最后一个元素"],answer:["没有找到"],explanation:"合法下标从 0 到 n-1，-1 作为明确的未命中标记。",id:"c8-7-q1"},{type:"fill",question:"线性查找未找到时，本课程约定返回多少？",answer:["-1"],explanation:"-1 不属于合法非负下标范围，便于表示未找到。",id:"c8-7-q2"},{type:"boolean",question:"从左向右查找，遇到目标立即返回，可找到首次出现下标。",answer:["正确"],explanation:"之前的位置都已排除。",options:["正确","错误"],id:"c8-7-q3"},{type:"fill",question:"冒泡排序每次主要比较什么位置的元素？",answer:["相邻位置"],explanation:"比较相邻元素并在必要时交换。",id:"c8-7-q4"},{type:"single",question:"基础冒泡排序的典型时间复杂度是？",answer:["O(n²)"],explanation:"多轮相邻比较需要二次量级操作。",options:["O(n²)","O(1)","O(log n)"],id:"c8-7-q5"},{type:"boolean",question:"一次冒泡遍历就保证任意数组完全有序。",answer:["错误"],explanation:"通常一轮只能确保一个端部元素就位。",options:["正确","错误"],id:"c8-7-q6"}],"c8-8":[{type:"fill",question:"长度为 5 的数组原地反转，需要交换几对元素？",answer:["2"],explanation:"交换下标 0 与 4、1 与 3，中间下标 2 保持不变。",id:"c8-8-q1"},{type:"fill",question:"长度 n 的数组反转，右端下标初值应是多少？",answer:["n-1"],explanation:"n 本身不属于数组有效范围。",id:"c8-8-q2"},{type:"boolean",question:"反转时 left 和 right 相遇后还必须继续交换。",answer:["错误"],explanation:"继续交换可能重复撤销先前的结果。",options:["正确","错误"],id:"c8-8-q3"},{type:"predict",question:"数组 {2,4,6,8} 反转后是什么？用空格分隔。",answer:["8 6 4 2"],explanation:"交换首尾 2 与 8，再交换中间 4 与 6，最终顺序为 8 6 4 2。",id:"c8-8-q4"},{type:"fill",question:"长度为 6 的数组原地反转，需要交换几对？",answer:["3"],explanation:"0与5、1与4、2与3，共三对。",id:"c8-8-q5"},{type:"boolean",question:"奇数长度数组的正中间元素反转后位置不变。",answer:["正确"],explanation:"它自身关于中心对称，无需交换。",options:["正确","错误"],id:"c8-8-q6"}],"c9-1":[{type:"single",question:"成绩 60、61 的平均分与及格人数是？",options:["60.50 和 2","60.00 和 1","60.50 和 1"],answer:["60.50 和 2"],explanation:"平均分为 121/2=60.5；两项都满足 >=60。",id:"c9-1-q1"}],"c9-2":[{type:"fill",question:"数组 1 3 3 1 有几个严格内部峰值？",answer:["0"],explanation:"两个 3 相等，任何一个都没有严格大于左右两邻居，因此不构成严格峰值。",id:"c9-2-q1"}],"c9-3":[{type:"fill",question:"频道 1 执行 -1 切换指令后是几号频道？",answer:["10"],explanation:"频道向下切换时从 1 回绕到 10；向上则从 10 回绕到 1。",id:"c9-3-q1"}]},a={"c2-3":{id:"c2-3-mastery",title:"温度换算",difficulty:"Mastery",description:"读入摄氏温度 c（-100～100），按 c*1.8+32 转换成华氏温度，输出一位小数。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"0",output:"32.0"},{input:"25",output:"77.0"},{input:"-40",output:"-40.0"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    double c;
    if(scanf("%lf",&c)!=1)return 1;
    // TODO: 浮点换算并输出一位小数
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    double c;
    if(scanf("%lf",&c)!=1)return 1;
    printf("%.1f\\n",c*1.8+32);
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","读入摄氏温度 c（-100～100），按 c*1.8+32 转换成华氏温度，输出一位小数。"]},"c2-5":{id:"c2-5-mastery",title:"同时满足两个状态",difficulty:"Mastery",description:"输入整数 ready 和 online（各为 0 或 1），将它们保存为布尔状态，只有两者同时为真才输出 1，否则输出 0。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"1 1",output:"1"},{input:"1 0",output:"0"},{input:"0 1",output:"0"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int r,o;
    if(scanf("%d%d",&r,&o)!=2)return 1;
    // TODO: 转成布尔状态并组合
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int r,o;
    if(scanf("%d%d",&r,&o)!=2)return 1;
    bool ready=r,online=o;
    printf("%d\\n",ready&&online);
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","输入整数 ready 和 online（各为 0 或 1），将它们保存为布尔状态，只有两者同时为真才输出 1，否则输出 0。"]},"c2-9":{id:"c2-9-mastery",title:"避免平均数截断",difficulty:"Mastery",description:"输入两个整数 a,b（-100～100），输出它们的平均数，保留两位小数。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"2 3",output:"2.50"},{input:"-5 2",output:"-1.50"},{input:"0 0",output:"0.00"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int a,b;
    if(scanf("%d%d",&a,&b)!=2)return 1;
    // TODO: 在除法前转换类型
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int a,b;
    if(scanf("%d%d",&a,&b)!=2)return 1;
    printf("%.2f\\n",(double)(a+b)/2);
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","输入两个整数 a,b（-100～100），输出它们的平均数，保留两位小数。"]},"c3-2":{id:"c3-2-mastery",title:"环形时钟",difficulty:"Mastery",description:"输入小时 h（0～23）和前进小时数 step（0～100），输出 24 小时制的新小时数。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"23 2",output:"1"},{input:"0 24",output:"0"},{input:"5 50",output:"7"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int h,step;
    if(scanf("%d%d",&h,&step)!=2)return 1;
    // TODO: 用取余完成回绕
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int h,step;
    if(scanf("%d%d",&h,&step)!=2)return 1;
    printf("%d\\n",(h+step)%24);
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","输入小时 h（0～23）和前进小时数 step（0～100），输出 24 小时制的新小时数。"]},"c3-8":{id:"c3-8-mastery",title:"区间外判断",difficulty:"Mastery",description:"输入整数 x（-100～100），若它不在闭区间 10～20 内输出 1，否则输出 0。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"10",output:"0"},{input:"21",output:"1"},{input:"-1",output:"1"},{input:"20",output:"0"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int x;
    if(scanf("%d",&x)!=1)return 1;
    // TODO: 给完整区间条件取反
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int x;
    if(scanf("%d",&x)!=1)return 1;
    printf("%d\\n",!(x>=10&&x<=20));
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","输入整数 x（-100～100），若它不在闭区间 10～20 内输出 1，否则输出 0。"]},"c4-3":{id:"c4-3-mastery",title:"包裹计费",difficulty:"Mastery",description:"输入重量 w（1～20 的整数千克）：不超过 2 千克收费 8；3～5 千克收费 15；其余收费 25。输出费用。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"2",output:"8"},{input:"3",output:"15"},{input:"5",output:"15"},{input:"6",output:"25"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int w;
    if(scanf("%d",&w)!=1)return 1;
    // TODO: 按范围依次判断
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int w;
    if(scanf("%d",&w)!=1)return 1;
    if(w<=2)puts("8");else if(w<=5)puts("15");else puts("25");
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","输入重量 w（1～20 的整数千克）：不超过 2 千克收费 8；3～5 千克收费 15；其余收费 25。输出费用。"]},"c4-4":{id:"c4-4-mastery",title:"菜单命令分派",difficulty:"Mastery",description:"输入命令 1、2、3 或其他整数。分别输出 New、Open、Save；其余输出 Invalid。用 switch 实现。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"1",output:"New"},{input:"2",output:"Open"},{input:"3",output:"Save"},{input:"9",output:"Invalid"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int n;
    if(scanf("%d",&n)!=1)return 1;
    // TODO: switch 与 break
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int n;
    if(scanf("%d",&n)!=1)return 1;
    switch(n){case 1:puts("New");break;case 2:puts("Open");break;case 3:puts("Save");break;default:puts("Invalid");break;}
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","输入命令 1、2、3 或其他整数。分别输出 New、Open、Save；其余输出 Invalid。用 switch 实现。"]},"c5-2":{id:"c5-2-mastery",title:"读取三项数据",difficulty:"Mastery",description:"读入两个整数 a,b（-100～100）和一个 double x（-100～100），输出 a+b，下一行输出 x 的两倍，保留两位小数。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"3 4 1.25",output:`7
2.50`},{input:`-3
2
-0.5`,output:`-1
-1.00`},{input:"0 0 0",output:`0
0.00`}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 读取三项数据
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int a,b;double x;
    if(scanf("%d%d%lf",&a,&b,&x)!=3)return 1;
    printf("%d\\n%.2f\\n",a+b,x*2);
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","读入两个整数 a,b（-100～100）和一个 double x（-100～100），输出 a+b，下一行输出 x 的两倍，保留两位小数。"]},"c6-1":{id:"c6-1-mastery",title:"奇数累加",difficulty:"Mastery",description:"输入 n（0～100），用 for 累加 1 到 n 之间的所有奇数，输出和。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"5",output:"9"},{input:"0",output:"0"},{input:"6",output:"9"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 奇数累加
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int n,sum=0;
    if(scanf("%d",&n)!=1)return 1;
    for(int i=1;i<=n;i+=2)sum+=i;
    printf("%d\\n",sum);
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","输入 n（0～100），用 for 累加 1 到 n 之间的所有奇数，输出和。"]},"c6-7":{id:"c6-7-mastery",title:"绘制三角形",difficulty:"Mastery",description:"输入 n（1～6），输出 n 行：第 r 行输出 r 个 *（r 从 1 开始），每行后换行。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"1",output:"*"},{input:"3",output:`*
**
***`},{input:"4",output:`*
**
***
****`}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 绘制三角形
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int n;
    if(scanf("%d",&n)!=1)return 1;
    for(int r=1;r<=n;r++){for(int c=0;c<r;c++)printf("*");printf("\\n");}
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","输入 n（1～6），输出 n 行：第 r 行输出 r 个 *（r 从 1 开始），每行后换行。"]},"c7-2":{id:"c7-2-mastery",title:"返回较大数",difficulty:"Mastery",description:"定义 int larger(int a,int b) 返回较大值；输入 a,b（-100～100），调用并输出结果。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"3 7",output:"7"},{input:"-4 -9",output:"-4"},{input:"5 5",output:"5"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 在 main 上方定义 larger
    int a,b;
    if(scanf("%d%d",&a,&b)!=2)return 1;
    // TODO: 调用函数并输出
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int larger(int a,int b){return a>b?a:b;}

int main(void) {
    int a,b;
    if(scanf("%d%d",&a,&b)!=2)return 1;
    printf("%d\\n",larger(a,b));
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","定义 int larger(int a,int b) 返回较大值；输入 a,b（-100～100），调用并输出结果。"]},"c7-3":{id:"c7-3-mastery",title:"计算差值的副本",difficulty:"Mastery",description:"定义 int add_bonus(int score,int bonus) 返回两项之和；输入 score,bonus（各 0～100），先输出返回值，再输出原 score（同一行）。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"10 3",output:"13 10"},{input:"0 7",output:"7 0"},{input:"100 0",output:"100 100"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 在 main 上方定义 add_bonus
    int score,bonus;
    if(scanf("%d%d",&score,&bonus)!=2)return 1;
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int add_bonus(int score,int bonus){score+=bonus;return score;}

int main(void) {
    int score,bonus;
    if(scanf("%d%d",&score,&bonus)!=2)return 1;
    printf("%d %d\\n",add_bonus(score,bonus),score);
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","定义 int add_bonus(int score,int bonus) 返回两项之和；输入 score,bonus（各 0～100），先输出返回值，再输出原 score（同一行）。"]},"c7-5":{id:"c7-5-mastery",title:"递归计算幂",difficulty:"Mastery",description:"定义递归函数 power2(n) 返回 2 的 n 次幂。输入 n（0～15），输出函数结果。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"0",output:"1"},{input:"3",output:"8"},{input:"10",output:"1024"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 在 main 上方定义带 n==0 出口的递归函数
    int n;
    if(scanf("%d",&n)!=1)return 1;
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int power2(int n){if(n==0)return 1;return 2*power2(n-1);}

int main(void) {
    int n;
    if(scanf("%d",&n)!=1)return 1;
    printf("%d\\n",power2(n));
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","定义递归函数 power2(n) 返回 2 的 n 次幂。输入 n（0～15），输出函数结果。"]},"c8-3":{id:"c8-3-mastery",title:"循环左移一位",difficulty:"Mastery",description:"输入 n（1～20）及 n 个整数。将数组循环左移一位，首元素移到末尾，输出结果。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"3 1 2 3",output:"2 3 1"},{input:"1 9",output:"9"},{input:"4 4 -1 0 7",output:"-1 0 7 4"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 循环左移一位
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int n,a[20];
    if(scanf("%d",&n)!=1)return 1;
    for(int i=0;i<n;i++)if(scanf("%d",&a[i])!=1)return 1;
    int first=a[0];
    for(int i=0;i<n-1;i++)a[i]=a[i+1];
    a[n-1]=first;
    for(int i=0;i<n;i++)printf("%d ",a[i]);
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","输入 n（1～20）及 n 个整数。将数组循环左移一位，首元素移到末尾，输出结果。"]},"c8-4":{id:"c8-4-mastery",title:"矩阵对角线和",difficulty:"Mastery",description:"按行输入 3×3 整数矩阵，元素 -100～100，输出主对角线上三项的和。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"1 2 3 4 5 6 7 8 9",output:"15"},{input:"0 1 1 1 0 1 1 1 0",output:"0"},{input:"-2 0 0 0 4 0 0 0 -1",output:"1"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 矩阵对角线和
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int a[3][3],sum=0;
    for(int r=0;r<3;r++)for(int c=0;c<3;c++)if(scanf("%d",&a[r][c])!=1)return 1;
    for(int i=0;i<3;i++)sum+=a[i][i];
    printf("%d\\n",sum);
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","按行输入 3×3 整数矩阵，元素 -100～100，输出主对角线上三项的和。"]},"c8-6":{id:"c8-6-mastery",title:"数组求和函数",difficulty:"Mastery",description:"定义 int array_sum(const int a[],int n)，输入 n（1～20）及 n 个整数（-100～100），调用函数求和并输出。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"3 2 4 6",output:"12"},{input:"1 -5",output:"-5"},{input:"4 -2 0 2 3",output:"3"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 在 main 上方定义 array_sum
    int n,a[20];
    if(scanf("%d",&n)!=1)return 1;
    for(int i=0;i<n;i++)if(scanf("%d",&a[i])!=1)return 1;
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int array_sum(const int a[],int n){int sum=0;for(int i=0;i<n;i++)sum+=a[i];return sum;}

int main(void) {
    int n,a[20];
    if(scanf("%d",&n)!=1)return 1;
    for(int i=0;i<n;i++)if(scanf("%d",&a[i])!=1)return 1;
    printf("%d\\n",array_sum(a,n));
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","定义 int array_sum(const int a[],int n)，输入 n（1～20）及 n 个整数（-100～100），调用函数求和并输出。"]},"c8-7":{id:"c8-7-mastery",title:"定位首次出现",difficulty:"Mastery",description:"输入 n（1～20）、n 个整数和 target。输出 target 首次出现的下标；没有找到输出 -1。 输入语句可参考模板；重点练习本节概念。",input:"按示例输入，数值以空白分隔；全部输入保证符合题目给定范围。",output:"按题目要求输出，保留换行和小数位；行末空白不影响判定。",tests:[{input:"4 7 2 7 9 7",output:"0"},{input:"3 1 2 3 8",output:"-1"},{input:"1 -5 -5",output:"0"}],starter:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // TODO: 定位首次出现
    return 0;
}
`,solution:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int n,a[20],target,pos=-1;
    if(scanf("%d",&n)!=1)return 1;
    for(int i=0;i<n;i++)if(scanf("%d",&a[i])!=1)return 1;
    if(scanf("%d",&target)!=1)return 1;
    for(int i=0;i<n;i++)if(a[i]==target){pos=i;break;}
    printf("%d\\n",pos);
    return 0;
}
`,hints:["把题目拆成输入、当前知识点的计算或判断、输出。","手算示例并检查边界；分支、循环和索引的范围都要逐项确认。","输入 n（1～20）、n 个整数和 target。输出 target 首次出现的下标；没有找到输出 -1。"]},"c2-2":{id:"c2-2-mastery",title:"无符号整数转换实验",difficulty:"Medium",description:"将输入 int 显式转换为 unsigned short，并输出结果。本站 unsigned short 为 16 位；理解模转换，不执行有符号溢出。",input:"一个 -1000..65535 的整数。",output:"严格按样例格式输出，不添加提示。",starter:`#include <stdio.h>

int main(void) {
    /* TODO: 无符号整数转换实验 */
    return 0;
}
`,solution:`#include <stdio.h>
int main(void){int n;if(scanf("%d",&n)!=1)return 1;unsigned short u=(unsigned short)n;printf("%hu\\n",u);return 0;}
`,tests:[{input:"-1",output:`65535
`},{input:"-2",output:`65534
`},{input:"0",output:`0
`},{input:"65535",output:`65535
`}],hints:["先读取到能容纳输入范围的 int 变量。","用 (unsigned short)n 转换，输出使用 %hu。","无符号转换按 USHRT_MAX+1 取模；不要用有符号溢出来模拟它。"]},"c2-4":{id:"c2-4-mastery",title:"输出带转义的实验标签",difficulty:"Medium",description:'读入编号，第一行输出 ID、一个水平制表符和编号；第二行输出 C:\\lab；第三行输出带双引号的 "done"。',input:"一个 1..100 的编号。",output:"严格按样例格式输出，不添加提示。",starter:`#include <stdio.h>

int main(void) {
    /* TODO: 输出带转义的实验标签 */
    return 0;
}
`,solution:`#include <stdio.h>
int main(void){int n;if(scanf("%d",&n)!=1)return 1;printf("ID\\t%d\\nC:\\\\lab\\n\\"done\\"\\n",n);return 0;}
`,tests:[{input:"1",output:`ID	1
C:\\lab
"done"
`},{input:"7",output:`ID	7
C:\\lab
"done"
`},{input:"100",output:`ID	100
C:\\lab
"done"
`}],hints:["换行用 \\n，水平制表符用 \\t。","字符串中的反斜杠和双引号分别需要转义。","输出应包含三个独立的行；不要把源码里的转义拼写原样打印出来。"]},"c2-6":{id:"c2-6-mastery",title:"符号常量与常变量配合",difficulty:"Medium",description:"用 #define UNIT_PRICE 4 表示每件四元，用 const int fee=2 表示固定两元费用。输入件数 n，输出 n 件商品的总金额。",input:"一个 0..1000 的整数件数。",output:"严格按样例格式输出，不添加提示。",starter:`#include <stdio.h>

int main(void) {
    /* TODO: 符号常量与常变量配合 */
    return 0;
}
`,solution:`#include <stdio.h>
#define UNIT_PRICE 4
int main(void){const int fee=2;int n;if(scanf("%d",&n)!=1)return 1;printf("%d\\n",n*UNIT_PRICE+fee);return 0;}
`,tests:[{input:"0",output:`2
`},{input:"5",output:`22
`},{input:"1000",output:`4002
`}],hints:["宏定义末尾不要把分号写进替换文本。","const int fee=2 是对象声明；UNIT_PRICE 在预处理时替换。","先算 n*UNIT_PRICE，再加 fee；件数为零也仍有固定费用。"]},"c3-1":{id:"c3-1-mastery",title:"分清结合性与括号",difficulty:"Medium",description:"读入 a、b、c，分别计算 a-b-c 和 a-(b-c)，依次输出两个结果。每个数的绝对值不超过 1000。",input:"三个 -1000..1000 的整数。",output:"严格按样例格式输出，不添加提示。",starter:`#include <stdio.h>

int main(void) {
    /* TODO: 分清结合性与括号 */
    return 0;
}
`,solution:`#include <stdio.h>
int main(void){int a,b,c;if(scanf("%d%d%d",&a,&b,&c)!=3)return 1;printf("%d %d\\n",a-b-c,a-(b-c));return 0;}
`,tests:[{input:"20 7 2",output:`11 15
`},{input:"0 1 1",output:`-2 0
`},{input:"5 -2 3",output:`4 10
`}],hints:["减法左结合，所以 a-b-c 按 (a-b)-c 分组。","第二个表达式有显式括号，先计算 b-c。","本题表达式没有副作用；结合性与一般求值顺序是不同概念。"]}},s=1,u="Introduction",r="C 语言入门",p="从第一行代码开始，认识程序如何运行。",l=[{id:"c1-1",chapter:1,index:0,en:"C Language",title:"认识 C 语言",objective:"理解源代码、编译器和程序之间的关系。",explanation:["把源代码想象成一份用文字写下的菜谱，CPU 需要的是可以直接执行的指令。C 编译器负责检查并翻译这份菜谱；有语法错误时，程序还没有开始运行。","C 常用于操作系统和嵌入式设备。这个工坊使用 C99 标准：右侧的 Clang 把 C 源代码编译为 WebAssembly，再在浏览器沙箱中执行。你写的仍然是真正的 C 程序。","本课程按学校教材《C程序设计（第五版）》使用 C99。语言标准规定语法与库接口，不规定统一的 int 字节数，也不意味着所有操作系统提供相同功能。浏览器实验使用 wasm32/WASI，首次运行会加载本地沙箱编译器。"],syntax:"源代码 → 编译 → 链接 → 执行",syntaxNotes:"编译检查语法和类型；链接找到 printf 等函数的实现；运行阶段才产生输出。",example:`#include <stdio.h>

int main(void) {
    printf("Hello, C!\\n");
    return 0;
}
`,exampleOutput:"Hello, C!",walkthrough:`按顺序执行上面的语句。编译检查语法和类型；链接找到 printf 等函数的实现；运行阶段才产生输出。
程序输出：Hello, C!`,mistakes:["把编译错误当成输出错误：编译失败时根本不会执行 main。","把 C 与 C++ 混用：本课程使用 printf，不使用 cout。"],summary:"编译检查语法和类型；链接找到 printf 等函数的实现；运行阶段才产生输出。",textbook:"第1章（1.1—1.6）"},{id:"c1-2",chapter:1,index:1,en:"Hello World!",title:"第一个 C 程序",objective:"使用 printf 输出文本，区分换行与普通字符。",explanation:["printf 是标准库提供的输出函数。你可以把它当作程序的扬声器：括号里的双引号字符串就是它要说的话。#include <stdio.h> 让编译器知道这个函数的声明。","转义序列 \\n 表示换行，而不是字母 n。C 语句通常以分号结束。运行时从 main 开始，执行 printf 后，return 0 表示正常退出。"],syntax:'printf("Hello, World!\\n");',syntaxNotes:"printf 是函数名；圆括号包住参数；双引号包住文本；\\n 换行；分号结束语句。",example:`#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}
`,exampleOutput:"Hello, World!",walkthrough:`按顺序执行上面的语句。printf 是函数名；圆括号包住参数；双引号包住文本；\\n 换行；分号结束语句。
程序输出：Hello, World!`,mistakes:["忘记分号会导致编译失败。","使用中文弯引号代替 ASCII 双引号，编译器无法识别字符串。"],summary:"printf 是函数名；圆括号包住参数；双引号包住文本；\\n 换行；分号结束语句。",textbook:"第1章（1.1—1.6）"},{id:"c1-3",chapter:1,index:2,en:"Comments",title:"注释",objective:"选择单行或多行注释，为代码说明意图。",explanation:["注释像书页旁的铅笔备注，帮助读代码的人理解意图。编译器会忽略注释，不会把它显示到屏幕上。","// 从当前位置一直注释到行末；/* 与 */ 之间可以跨多行。多行注释不能嵌套；字符串内部的 // 是普通字符，不会开始注释。"],syntax:`// 单行注释
/* 多行
   注释 */`,syntaxNotes:"// 适合短说明；/* ... */ 必须成对闭合。",example:`#include <stdio.h>

int main(void) {
    // 这行只给人看
    printf("Visible\\n"); /* 真正的输出 */
    return 0;
}
`,exampleOutput:"Visible",walkthrough:`按顺序执行上面的语句。// 适合短说明；/* ... */ 必须成对闭合。
程序输出：Visible`,mistakes:["以为注释会被输出。","在 /* ... */ 内再嵌套同类注释，可能提前结束外层注释。"],summary:"// 适合短说明；/* ... */ 必须成对闭合。",textbook:"第1章（1.1—1.6）"},{id:"c1-4",chapter:1,index:3,en:"Basic Program Structure",title:"C 程序的基本结构",objective:"辨认头文件、main 函数、代码块和返回值。",explanation:["一个基础程序可以分成三部分：顶部引入需要的声明，main 提供入口，花括号包住要执行的语句。缩进帮助阅读，真正决定代码块范围的是花括号。","int main(void) 表示 main 返回整数且不接收参数。return 0 把成功状态交回运行环境；它并不会向屏幕打印数字 0。","从源代码到运行，通常经过预处理、编译、汇编和链接。程序设计还包括分析需求、表示数据、设计算法、测试、修正与维护；通过编译以后，仍要用边界和不同路径验证结果。"],syntax:`int main(void) {
    return 0;
}`,syntaxNotes:"int 是返回类型；main 是入口名；void 表示无参数；{ } 定义函数体。",example:`#include <stdio.h>

int main(void) {
    printf("Start\\n");
    return 0;
    return 0;
}
`,exampleOutput:"Start",walkthrough:`按顺序执行上面的语句。int 是返回类型；main 是入口名；void 表示无参数；{ } 定义函数体。
程序输出：Start`,mistakes:["把语句写在函数体外。",'把 return 0 当作 printf("0")，混淆退出状态和标准输出。'],summary:"int 是返回类型；main 是入口名；void 表示无参数；{ } 定义函数体。",textbook:"第1章（1.1—1.6）"}],d={id:s,en:u,title:r,description:p,lessons:l},c={"c1-1":{type:"single",question:"哪一步会把 C 源代码翻译为目标代码？",options:["编译","运行","输入","注释"],answer:["编译"],explanation:"编译器将源代码翻译为目标代码；执行程序才会读取输入并产生输出。"},"c1-2":{type:"fill",question:"填空：字符串中用于换行的转义序列是什么？",answer:["\\n"],explanation:"\\n 是一个换行符；/n 中的斜杠方向不对。"},"c1-3":{type:"boolean",question:'判断：printf("//"); 会把整行变成注释。',options:["正确","错误"],answer:["错误"],explanation:"双引号里的 // 属于字符串内容，因此程序会输出两个斜杠。"},"c1-4":{type:"multi",question:"多选：下面哪些说法正确？",options:["main 是入口函数","花括号界定代码块","return 0 会打印 0","缩进决定代码块范围"],answer:["main 是入口函数","花括号界定代码块"],explanation:"C 通过 main 启动程序，代码块由花括号确定。return 返回状态，缩进只是排版。"}},f={"c1-1":{title:"和 C 打个招呼",difficulty:"基础",description:"向屏幕输出 C is powerful!，末尾换行。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"C is powerful!"}],starter:`#include <stdio.h>

int main(void) {
    printf("C is powerful!\\n");
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
`,hints:["辨认头文件、main 函数、代码块和返回值。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","int 是返回类型；main 是入口名；void 表示无参数；{ } 定义函数体。"]}},x=2,h="Variables",m="变量",y="用合适的数据类型，保存并表达信息。",b=JSON.parse(`[{"id":"c2-1","chapter":2,"index":0,"en":"Data Types","title":"数据类型","objective":"根据数据的性质选择 int、double 或 char。","explanation":["变量就像贴了标签的盒子：名字说明用途，类型决定可以放入什么值，以及编译器怎样解释这些值。整数、带小数的测量值和单个字符应选不同的盒子。","C99 中 int 存整数，double 存浮点数，char 存字符。类型大小依赖实现，不能假设所有计算机上的 int 都一样大；本工坊的 wasm32 环境中 int 为 32 位。","类型不只包含 int、double、char：本课程还会学习枚举、指针、数组、结构体、共用体和函数类型。数组与结构体是聚合类型；共用体的成员共享存储，不能把它视为同时保存全部成员的结构体。","sizeof(char) 在 C 中恒为 1，单位是 C 的字节。一个字节的位数由 limits.h 的 CHAR_BIT 表示，C99 保证至少为 8，本网站为 8；不能把所有 C 实现的一个字节都固定说成 8 位。"],"syntax":"int count = 3;\\ndouble price = 2.5;\\nchar grade = 'A';","syntaxNotes":"类型 + 变量名 + = 初始值。单字符用单引号；小数通常选 double。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int count = 3;\\n    double price = 2.5;\\n    printf(\\"%d %.1f\\\\n\\", count, price);\\n    return 0;\\n}\\n","exampleOutput":"3 2.5","walkthrough":"按顺序执行上面的语句。类型 + 变量名 + = 初始值。单字符用单引号；小数通常选 double。\\n程序输出：3 2.5","mistakes":["使用 int 存储 2.5，小数部分会丢弃。","以为 char 可以直接存储一个多字节汉字。"],"summary":"类型 + 变量名 + = 初始值。单字符用单引号；小数通常选 double。","textbook":"第3章（3.1—3.5）；正文已核对第 42—43 页"},{"id":"c2-2","chapter":2,"index":1,"en":"Integer","title":"整数类型","objective":"声明和修改整数变量，理解整数除法。","explanation":["int 适合计数，例如人数、页数和库存。先声明并初始化，再通过赋值修改。右边的表达式先计算，结果再存进左边的变量。","两个整数相除仍得到整数，小数部分向零截断：7 / 2 是 3，-7 / 2 是 -3。有符号整数溢出属于未定义行为，不能依赖绕回结果。","short、int、long、long long 的实际大小和范围要查看 sizeof 与 limits.h，不能把教材中某台编译器的表格当成所有平台规则。C99 也不要求所有有符号整数都采用补码；本网站的 wasm32 使用补码，标准层面仍须避免有符号溢出。","转换到无符号整数类型按该类型最大值加一取模。例如本网站 16 位 unsigned short 中，(unsigned short)-1 得到 65535，这是已定义的数值转换，不是有符号溢出。输出 unsigned short 可用 %hu；输出 unsigned int 用 %u。"],"syntax":"int pages = 7;\\npages = pages + 2;","syntaxNotes":"第二条语句读取旧值 7，加 2 后写回 9；= 表示赋值。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int pages = 7;\\n    pages = pages + 2;\\n    printf(\\"%d %d\\\\n\\", pages, 7 / 2);\\n    return 0;\\n}\\n","exampleOutput":"9 3","walkthrough":"按顺序执行上面的语句。第二条语句读取旧值 7，加 2 后写回 9；= 表示赋值。\\n程序输出：9 3","mistakes":["未初始化就读取局部变量，结果没有可靠意义。","以为整数除法自动保留小数。"],"summary":"第二条语句读取旧值 7，加 2 后写回 9；= 表示赋值。","textbook":"第3章（3.1—3.5）；正文已核对第 44—47 页"},{"id":"c2-3","chapter":2,"index":2,"en":"Float - Double","title":"浮点数与双精度","objective":"使用 double 处理小数，并控制输出精度。","explanation":["浮点数用有限的二进制位近似表示实数，像用有限刻度的尺子测量。double 通常比 float 保留更多有效数字；小数常量默认就是 double，float 常量可写成 1.5f。","很多十进制小数无法精确表示，所以不要依赖计算后的浮点数完全相等。printf 的 %.2f 表示显示小数点后两位，它只改变显示，不改变变量存储的值。","浮点数的范围和精度是不同概念。float.h 的 FLT_DIG、DBL_DIG 给出十进制精度指标，FLT_MIN 表示最小正规格化正 float，不一定是最小非零值；本网站的 IEEE 754 实现还支持更小的非正规格化数。","通常算术转换并不会把所有 float 运算都变成 double：float 与 float 相加的结果类型仍是 float，int 与 float 运算通常得到 float。printf 的可变参数会把 float 提升为 double，这是函数调用规则；提高计算时的中间精度也不会改变表达式的语义类型。","科学计数法如 1.25e3 表示 1250.0，e 或 E 后面的指数必须为整数；1e2 合法，1e2.5 不合法。无后缀浮点常量默认 double，f/F 后缀表示 float，L 后缀表示 long double；后缀改变字面量类型，格式控制符决定输出形式。"],"syntax":"double total = 10.0 / 4;\\nprintf(\\"%.2f\\", total);","syntaxNotes":"10.0 使除法在浮点数中进行；%.2f 控制显示两位小数。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    double average = (8.0 + 9.0) / 2;\\n    printf(\\"%.2f\\\\n\\", average);\\n    return 0;\\n}\\n","exampleOutput":"8.50","walkthrough":"按顺序执行上面的语句。10.0 使除法在浮点数中进行；%.2f 控制显示两位小数。\\n程序输出：8.50","mistakes":["把 5 / 2 的整数结果赋给 double，得到的是 2.0，不是 2.5。","认为 %.2f 会永久修改变量精度。"],"summary":"10.0 使除法在浮点数中进行；%.2f 控制显示两位小数。","textbook":"第3章（3.1—3.5）；正文已核对第 49—51、54 页"},{"id":"c2-4","chapter":2,"index":3,"en":"Characters","title":"字符类型","objective":"用 char 保存单个字符，并使用 %c 输出。","explanation":["字符也以数值编码存储。char 可以保存一个基本执行字符集中的字符；单引号表示字符常量，双引号表示字符串，两者不能随意替换。","本工坊使用 ASCII 兼容环境，因此字母 A 的编码为 65。不过在可移植 C 中不要假设所有字符编码都是 ASCII，也不要假设一个 char 能保存一个汉字。","常用转义写法包括换行 \\\\n、制表 \\\\t、反斜杠 \\\\\\\\、双引号 \\\\\\" 和零字符 \\\\0。八进制转义最多读取三个八进制数字；十六进制转义 \\\\x 会继续读取后续十六进制数字，必要时通过相邻字符串分开，避免意外拼成同一个数值。","ASCII 有 128 个编码位置，范围为 0..127。零字符 \\\\0 的值为 0，字符 '0' 在本网站 ASCII 环境中的编码是 48，两者不同。char、signed char、unsigned char 是不同类型；普通 char 的符号性取决于实现。"],"syntax":"char grade = 'A';\\nprintf(\\"%c\\", grade);","syntaxNotes":"%c 按字符输出；%d 会按整数显示经过提升的编码。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    char grade = 'B';\\n    printf(\\"%c\\\\n\\", grade);\\n    return 0;\\n}\\n","exampleOutput":"B","walkthrough":"按顺序执行上面的语句。%c 按字符输出；%d 会按整数显示经过提升的编码。\\n程序输出：B","mistakes":["写 char grade = \\"A\\"，把字符串地址误当成字符。","忽略字符编码，直接将中文字符放进单个 char。"],"summary":"%c 按字符输出；%d 会按整数显示经过提升的编码。","textbook":"第3章（3.1—3.5）；正文已核对第 39—40、47—48、55 页"},{"id":"c2-5","chapter":2,"index":4,"en":"Booleans","title":"布尔类型","objective":"在 C99 中引入 stdbool.h 并使用 bool。","explanation":["布尔值只表达真假，适合描述开关或条件。C99 的原生布尔类型叫 _Bool，标准头文件 stdbool.h 提供更易读的 bool、true、false 宏。","在条件中，0 表示假，任意非零值都表示真；赋给 bool 时会规范化为 0 或 1。输出时用 %d，经过整型提升后会显示 0 或 1。"],"syntax":"#include <stdbool.h>\\nbool ready = true;","syntaxNotes":"stdbool.h 提供 bool、true 和 false；布尔量用于表达条件。","example":"#include <stdio.h>\\n#include <stdbool.h>\\n\\nint main(void) {\\n    bool ready = true;\\n    bool empty = false;\\n    printf(\\"%d %d\\\\n\\", ready, empty);\\n    return 0;\\n}\\n","exampleOutput":"1 0","walkthrough":"按顺序执行上面的语句。stdbool.h 提供 bool、true 和 false；布尔量用于表达条件。\\n程序输出：1 0","mistakes":["在 C99 中遗漏 stdbool.h 却直接使用 bool。","以为只有整数 1 才代表真，实际任意非零都是真。"],"summary":"stdbool.h 提供 bool、true 和 false；布尔量用于表达条件。","textbook":"第3章（3.1—3.5）"},{"id":"c2-6","chapter":2,"index":5,"en":"Constants","title":"常量","objective":"用 const 声明不应修改的值。","explanation":["有些数值在程序运行期间应保持不变，例如税率和数组的设计容量。const 让变量的使用意图更清楚，并阻止通过这个名字直接修改它。","注意，C 中的 const int 不等同于 C++ 的编译期常量表达式。某些要求整型常量表达式的位置应使用枚举或宏；本节先使用 const 保存固定计算参数。","C99 的 const 对象与预处理宏不同：const 提供类型和对象语义，#define 是编译前的记号替换。块作用域 const int n=3; 一般不是 C 所说的整数常量表达式，数组是否为可变长度数组需要按作用域和表达式规则判断。","教材中的“符号常量”通常用 #define 命名，例如 #define PACK_SIZE 12；指令末尾不应把分号作为替换文本带进去。宏没有变量的对象类型，const 声明则定义具有类型的只读对象；两者不可混同。"],"syntax":"const double RATE = 0.08;","syntaxNotes":"const 限制通过该变量修改值；声明时就提供初值，名字大写只是约定。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    const int DAYS = 7;\\n    printf(\\"%d\\\\n\\", DAYS * 2);\\n    return 0;\\n}\\n","exampleOutput":"14","walkthrough":"按顺序执行上面的语句。const 限制通过该变量修改值；声明时就提供初值，名字大写只是约定。\\n程序输出：14","mistakes":["声明后再次给 const 对象赋值。","以为 const 可以防止所有间接修改行为；强行绕过类型修改原 const 对象是未定义行为。"],"summary":"const 限制通过该变量修改值；声明时就提供初值，名字大写只是约定。","textbook":"第3章（3.1—3.5）；正文已核对第 41—42 页"},{"id":"c2-7","chapter":2,"index":6,"en":"printf Basics","title":"printf 输出基础","objective":"让格式控制符与参数类型和顺序一致。","explanation":["格式字符串像带空位的句子，%d、%f、%c 等标记说明每个空位如何填。后面的参数按顺序进入这些位置。","printf 是可变参数函数，编译器并不总能在运行前拦住所有错误。控制符和类型不匹配可能导致未定义行为。想输出百分号本身，要写 %% 而不是单独一个 %。"],"syntax":"printf(\\"%d %.1f %c %%\\", n, x, ch);","syntaxNotes":"%d 对应 int，%f 对应提升后的 double，%c 对应字符的整型提升，%% 不消费参数。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int n = 3;\\n    printf(\\"Count: %d, rate: %.1f%%\\\\n\\", n, 12.5);\\n    return 0;\\n}\\n","exampleOutput":"Count: 3, rate: 12.5%","walkthrough":"按顺序执行上面的语句。%d 对应 int，%f 对应提升后的 double，%c 对应字符的整型提升，%% 不消费参数。\\n程序输出：Count: 3, rate: 12.5%","mistakes":["控制符数量比参数多，导致读取不存在的参数。","用 %d 输出 double，属于类型不匹配。"],"summary":"%d 对应 int，%f 对应提升后的 double，%c 对应字符的整型提升，%% 不消费参数。","textbook":"第3章（3.1—3.5）"},{"id":"c2-8","chapter":2,"index":7,"en":"Variable Naming Rules","title":"变量命名规则","objective":"辨认合法标识符并使用清晰的变量名。","explanation":["变量名是给值起的可读标签。基础规则是使用字母、数字和下划线，不能以数字开头，也不能使用 int、return 等关键字。C 区分大小写，score 与 Score 是不同名字。","尽量选择 total_score、item_count 这类能表达含义的名字。初学时避免以下划线开头的名字，因为许多这种名字保留给标准库或实现使用。"],"syntax":"int item_count = 5;","syntaxNotes":"item_count 是完整标识符，中间不能有空格或连字符；连字符会被视为减号。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int item_count = 5;\\n    int Item_count = 2;\\n    printf(\\"%d\\\\n\\", item_count + Item_count);\\n    return 0;\\n}\\n","exampleOutput":"7","walkthrough":"按顺序执行上面的语句。item_count 是完整标识符，中间不能有空格或连字符；连字符会被视为减号。\\n程序输出：7","mistakes":["以数字开头，如 2count。","使用连字符，如 item-count，它会被解析为两个名字相减。"],"summary":"item_count 是完整标识符，中间不能有空格或连字符；连字符会被视为减号。","textbook":"第3章（3.1—3.5）"},{"id":"c2-9","chapter":2,"index":8,"en":"Type Casting Part 1","title":"类型转换（一）","objective":"在运算前显式转换类型，保留小数。","explanation":["转换就像在计算前更换量尺。将整数转换为 double 后参与除法，可以保留小数部分。如果先做整数除法再转换，丢掉的小数不会回来。","写法是 (目标类型)表达式。显式转换并不是纠正所有数据问题的万能工具；它只告诉编译器采用另一种类型解释或转换这个值。","对 +、-、*、/ 等运算，要先区分通常算术转换与 printf 的默认实参提升。两个 float 操作数仍可产生 float 结果；一侧为 double 时才按对应规则转换另一侧。不要用 printf 显示格式倒推原表达式的类型。","sizeof 通常只检查操作数类型而不求值，例如 sizeof(i++) 对普通 int i 不会递增；可变长度数组相关情况有另外规则。可以用 sizeof(a+b)==sizeof(float) 在本网站观察 float 表达式的类型大小。"],"syntax":"double average = (double)total / count;","syntaxNotes":"先把 total 转为 double；count 也会参与浮点运算；最终结果存入 average。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    int total = 7, count = 2;\\n    printf(\\"%.1f\\\\n\\", (double)total / count);\\n    return 0;\\n}\\n","exampleOutput":"3.5","walkthrough":"按顺序执行上面的语句。先把 total 转为 double；count 也会参与浮点运算；最终结果存入 average。\\n程序输出：3.5","mistakes":["写 (double)(total / count)，转换发生得太晚。","把类型转换误认为会修改原变量本身的类型。"],"summary":"先把 total 转为 double；count 也会参与浮点运算；最终结果存入 average。","textbook":"第3章（3.1—3.5）；正文已核对第 54—56 页"},{"id":"c2-10","chapter":2,"index":9,"en":"Type Casting Part 2","title":"类型转换（二）","objective":"识别浮点转整数的截断和范围风险。","explanation":["把 double 转成 int 会丢弃小数部分，朝零截断，而不是四舍五入。比如 3.9 变成 3，-3.9 变成 -3。","转换前要确保结果可以被目标类型表示。浮点数超过整数范围再转换会产生未定义行为；不能用强制转换来掩盖溢出。混合有符号和无符号整数的比较也需要格外小心。","浮点数转整数先向零截断，但截断后的整数部分必须落在目标类型可表示范围内。越界浮点转换不是有符号整数转无符号类型的取模规则，不能依赖强制转换自动修复范围错误。"],"syntax":"int whole = (int)3.9;","syntaxNotes":"(int) 只在值处于可表示范围时有定义；它不会进行四舍五入。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    double a = 3.9, b = -3.9;\\n    printf(\\"%d %d\\\\n\\", (int)a, (int)b);\\n    return 0;\\n}\\n","exampleOutput":"3 -3","walkthrough":"按顺序执行上面的语句。(int) 只在值处于可表示范围时有定义；它不会进行四舍五入。\\n程序输出：3 -3","mistakes":["以为 (int)3.9 得到 4。","忽略目标类型范围，错误地认为任何转换都是安全的。"],"summary":"(int) 只在值处于可表示范围时有定义；它不会进行四舍五入。","textbook":"第3章（3.1—3.5）；正文已核对第 55—56 页"},{"id":"c2-11","chapter":2,"index":10,"en":"Recap Challenge","title":"变量综合练习","objective":"组合变量、常量与格式化输出完成计算。","explanation":["综合练习的第一步不是写代码，而是给每个量选择类型。件数用 int，单价用 double；总额在计算完成后用固定小数位显示。","先写清计算公式，再用变量表达它。让公式中的含义一目了然，可以减少把单价与数量写反的错误，也方便稍后接入输入数据。"],"syntax":"double total = price * count;","syntaxNotes":"整数 count 在与 double 相乘时转换为浮点数；总额用 %.2f 显示。","example":"#include <stdio.h>\\n\\nint main(void) {\\n    const double price = 8.5;\\n    int count = 4;\\n    printf(\\"%.2f\\\\n\\", price * count);\\n    return 0;\\n}\\n","exampleOutput":"34.00","walkthrough":"按顺序执行上面的语句。整数 count 在与 double 相乘时转换为浮点数；总额用 %.2f 显示。\\n程序输出：34.00","mistakes":["用 int 保存总价导致小数丢失。","打印货币时遗漏两位小数的显示要求。"],"summary":"整数 count 在与 double 相乘时转换为浮点数；总额用 %.2f 显示。","textbook":"第3章（3.1—3.5）"}]`),q={id:x,en:h,title:m,description:y,lessons:b},w={"c2-1":{type:"single",question:"保存 36.5 摄氏度，最合适的类型是？",options:["double","int","char"],answer:["double"],explanation:"double 可以表示小数。int 转换后只留下整数部分；char 不是测量值的合适类型。"},"c2-2":{type:"predict",question:'预测：printf("%d", 9 / 4); 输出什么？',answer:["2"],explanation:"两个操作数都是 int，9 / 4 的小数部分被截断，结果为 2。"},"c2-3":{type:"single",question:"下面哪个表达式得到 2.5？",options:["5.0 / 2","5 / 2","(double)(5 / 2)"],answer:["5.0 / 2"],explanation:"至少一个操作数在除法前是浮点数，才能进行浮点除法。除完再转换已经来不及恢复小数。"},"c2-4":{type:"debug",question:'分析错误：char ch = "B"; 应如何修改？',options:["改成 char ch = 'B';",'改成 int ch = "B";',"无需修改"],answer:["改成 char ch = 'B';"],explanation:'单个字符使用单引号。"B" 是包含 B 和结束零的字符数组，不能用来初始化一个 char。'},"c2-5":{type:"multi",question:"多选：在 C 条件中，哪些值为真？",options:["-3","0","2"],answer:["-3","2"],explanation:"C 的条件判断将 0 当作假；负数和大于 1 的非零值也是真。"},"c2-6":{type:"boolean",question:"判断：const int x = 3; x = 4; 能正常通过标准 C99 编译。",options:["正确","错误"],answer:["错误"],explanation:"x 是只读对象，直接对它赋值违反类型约束，编译器会诊断。"},"c2-7":{type:"fill",question:"填空：printf 中输出一个百分号应写什么？",answer:["%%"],explanation:"%% 表示字面百分号，它不会从参数列表中取值。"},"c2-8":{type:"multi",question:"多选：哪些是合法且非保留的变量名？",options:["total_score","score2","2score","return"],answer:["total_score","score2"],explanation:"标识符可包含数字但不能以数字开头，return 是 C 关键字。"},"c2-9":{type:"predict",question:"预测：(double)(7 / 2) 的值是多少？",answer:["3"],explanation:"7 / 2 先按整数除法得到 3，再变为 3.0；强制转换位置决定运算类型。"},"c2-10":{type:"predict",question:"预测：(int)-2.8 的值是多少？",answer:["-2"],explanation:"浮点到整数转换向零截断，所以 -2.8 得到 -2，不是向下取整的 -3。"},"c2-11":{type:"predict",question:'单价 2.5，数量 3，printf("%.2f", price * count) 输出？',answer:["7.50"],explanation:"乘法得到 7.5，%.2f 用两位小数显示，因此输出 7.50。"}},g={"c2-1":{title:"选对数据盒子",difficulty:"基础",description:"声明整数 books 为 4、小数 price 为 12.5，输出 4 12.5。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"4 12.5"}],starter:`#include <stdio.h>

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
`,hints:["在 C99 中引入 stdbool.h 并使用 bool。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","stdbool.h 提供 bool、true 和 false；布尔量用于表达条件。"]},"c2-6":{title:"固定的包装数量",difficulty:"基础",description:"用 const int 保存每包 6 支笔，计算 5 包的数量并输出。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"30"}],starter:`#include <stdio.h>

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
`,hints:["组合变量、常量与格式化输出完成计算。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","整数 count 在与 double 相乘时转换为浮点数；总额用 %.2f 显示。"]}},v=3,k="Operators",O="运算符",C="把数据组合成表达式，理解运算与逻辑。",N=[{id:"c3-1",chapter:3,index:0,en:"Arithmetic Operators",title:"算术运算符",objective:"使用加减乘除，并根据优先级组织表达式。",explanation:["算术表达式像数学算式：* 和 / 先于 + 和 - 计算，括号可以明确改变顺序。整数除法会截断小数，除数为零则不允许。","即使记住了优先级，也应为复杂表达式加上有意义的括号。不要依赖同一表达式中带副作用的计算顺序；C 不保证所有操作数从左向右求值。","优先级和结合性决定表达式如何分组，不承诺一般子表达式或函数实参按某个方向执行。a-b-c 按 (a-b)-c 分组；f()+g() 中哪个函数先被调用则不能仅凭加法左结合确定。","C99 的整数除法向零截断，负数也如此；a%b 的非零余数与被除数 a 同号。教材中关于旧编译系统的差异应与 C99 区分。除数为零，以及有符号最小值除以 -1 等结果不可表示的情形，不能执行。"],syntax:"int result = (2 + 3) * 4;",syntaxNotes:"括号先算 2 + 3，再与 4 相乘；没有括号时先算 3 * 4。",example:`#include <stdio.h>

int main(void) {
    printf("%d %d\\n", 2 + 3 * 4, (2 + 3) * 4);
    return 0;
}
`,exampleOutput:"14 20",walkthrough:`按顺序执行上面的语句。括号先算 2 + 3，再与 4 相乘；没有括号时先算 3 * 4。
程序输出：14 20`,mistakes:["将整数除法当成浮点除法。","用 0 作除数，程序行为未定义。"],summary:"括号先算 2 + 3，再与 4 相乘；没有括号时先算 3 * 4。",textbook:"第3章（3.1—3.5）；正文已核对第 52—54 页"},{id:"c3-2",chapter:3,index:1,en:"Modulo Operator",title:"取模运算符",objective:"用整数余数判断整除、奇偶和循环位置。",explanation:["% 求整数除法后的余数。把 17 颗糖每 5 颗分一组，可以分 3 组，还剩 2 颗，所以 17 % 5 是 2。","在 C99 中，除法商向零截断，余数与被除数同号或为零。因此 -7 % 3 是 -1。% 仅接受整数操作数，且除数不能为零。"],syntax:"int remainder = 17 % 5;",syntaxNotes:"满足 a == (a / b) * b + a % b（商可表示且 b 非零时）。",example:`#include <stdio.h>

int main(void) {
    printf("%d %d\\n", 17 % 5, -7 % 3);
    return 0;
}
`,exampleOutput:"2 -1",walkthrough:`按顺序执行上面的语句。满足 a == (a / b) * b + a % b（商可表示且 b 非零时）。
程序输出：2 -1`,mistakes:["用 % 处理 double。","判断负奇数时只用 n % 2 == 1，负奇数的余数可能是 -1。"],summary:"满足 a == (a / b) * b + a % b（商可表示且 b 非零时）。",textbook:"第3章（3.1—3.5）"},{id:"c3-3",chapter:3,index:2,en:"Increment/Decrement",title:"自增与自减",objective:"区分前置和后置自增的表达式值。",explanation:["++ 和 -- 分别把变量加一或减一。独立写成 i++; 和 ++i; 时，最终效果一样。放到赋值中时，前置先更新再取值，后置先取旧值再更新。",'一条语句只修改一个变量一次，代码会更容易理解。像 printf("%d %d", i++, i++); 这类未定序的修改有未定义行为，不能拿某次运行结果当规则。',"后缀自增表达式产生旧值，并产生更新变量的副作用；不应据此认为副作用一定要等到整个外层表达式结束才发生。在一个完整表达式中不受适当顺序约束地重复修改同一对象，会出现未定义行为；拆成独立语句最清楚。"],syntax:`int old = n++;
int now = ++n;`,syntaxNotes:"后置表达式提供旧值；前置表达式提供更新后的值。",example:`#include <stdio.h>

int main(void) {
    int n = 5;
    int old = n++;
    int now = ++n;
    printf("%d %d %d\\n", old, now, n);
    return 0;
}
`,exampleOutput:"5 7 7",walkthrough:`按顺序执行上面的语句。后置表达式提供旧值；前置表达式提供更新后的值。
程序输出：5 7 7`,mistakes:["在一条表达式中无定序地多次修改同一变量。","误把后置自增理解成整个函数结束后才增加。"],summary:"后置表达式提供旧值；前置表达式提供更新后的值。",textbook:"第3章（3.1—3.5）；正文已核对第 53 页"},{id:"c3-4",chapter:3,index:3,en:"Assignment Operators",title:"赋值运算符",objective:"用复合赋值更新累计值。",explanation:["赋值把右边结果存入左边。total += price 可以读作“把 price 累加到 total”。-=、*=、/=、%= 也有类似含义。","复合赋值对左操作数只求值一次，不应机械地将复杂表达式展开。本节仅对普通变量使用它；当变量是 int 时，/= 仍然是整数除法。"],syntax:`total += 5;
total *= 2;`,syntaxNotes:"先读取 total 的旧值，完成计算，再转换回左侧变量的类型并存储。",example:`#include <stdio.h>

int main(void) {
    int total = 10;
    total += 5;
    total *= 2;
    printf("%d\\n", total);
    return 0;
}
`,exampleOutput:"30",walkthrough:`按顺序执行上面的语句。先读取 total 的旧值，完成计算，再转换回左侧变量的类型并存储。
程序输出：30`,mistakes:["把 = 当作等于比较。","先乘后加与先加后乘不同，语句执行顺序会影响结果。"],summary:"先读取 total 的旧值，完成计算，再转换回左侧变量的类型并存储。",textbook:"第3章（3.1—3.5）"},{id:"c3-5",chapter:3,index:4,en:"Relational Operators",title:"关系运算符",objective:"通过关系比较生成 0 或 1。",explanation:["关系运算符用于回答大小或相等问题，结果类型为 int，值为 0 或 1。== 判断相等，!= 判断不等，和给变量赋值的 = 不同。","数学中的 0 < x < 10 不能原样用于 C：它会先得到 0 或 1，再与 10 比较。检查区间需要把两个比较用逻辑与连接。"],syntax:"int passed = score >= 60;",syntaxNotes:">= 包含等于边界；== 比较两个值；比较表达式返回 0 或 1。",example:`#include <stdio.h>

int main(void) {
    int score = 60;
    printf("%d %d\\n", score >= 60, score == 100);
    return 0;
}
`,exampleOutput:"1 0",walkthrough:`按顺序执行上面的语句。>= 包含等于边界；== 比较两个值；比较表达式返回 0 或 1。
程序输出：1 0`,mistakes:["用 = 代替 ==，意外修改变量。","直接写数学式的连续比较，如 1 < x < 5。"],summary:">= 包含等于边界；== 比较两个值；比较表达式返回 0 或 1。",textbook:"第4章（4.1—4.8）"},{id:"c3-6",chapter:3,index:5,en:"Logical Operators Part 1",title:"逻辑运算符（一）",objective:"用 && 表达必须同时满足的条件。",explanation:["逻辑与 && 类似进门时既要持有门票，又要处于开放时间：两项都成立才为真。只要一项为假，整个结果就是假。","&& 有短路特性：左侧为假时，不再计算右侧。这可以保护除法或数组访问，但必须把安全检查放在左边。它和按位与 & 不是同一种运算。"],syntax:"x >= 0 && x <= 100",syntaxNotes:"两个比较各自形成真假值；&& 合并为 0 或 1。",example:`#include <stdio.h>

int main(void) {
    int score = 85;
    printf("%d\\n", score >= 0 && score <= 100);
    return 0;
}
`,exampleOutput:"1",walkthrough:`按顺序执行上面的语句。两个比较各自形成真假值；&& 合并为 0 或 1。
程序输出：1`,mistakes:["用 & 代替 &&，失去逻辑短路含义。","把危险运算放在范围或零值检查之前。"],summary:"两个比较各自形成真假值；&& 合并为 0 或 1。",textbook:"第4章（4.1—4.8）"},{id:"c3-7",chapter:3,index:6,en:"Logical Operators Part 2",title:"逻辑运算符（二）",objective:"用 || 表达满足任一条件即可。",explanation:["逻辑或 || 类似两张不同种类的通行证：持有任意一种即可通过。只有两项都为假时才为假，结果仍然是 0 或 1。","|| 也会短路：左侧已经为真时，右侧不再执行。&& 的优先级高于 ||，但把条件分组写清楚比依赖记忆更稳妥。"],syntax:"day == 6 || day == 7",syntaxNotes:"每个比较都写完整，不能写 day == 6 || 7，因为字面值 7 永远为真。",example:`#include <stdio.h>

int main(void) {
    int day = 7;
    printf("%d\\n", day == 6 || day == 7);
    return 0;
}
`,exampleOutput:"1",walkthrough:`按顺序执行上面的语句。每个比较都写完整，不能写 day == 6 || 7，因为字面值 7 永远为真。
程序输出：1`,mistakes:["写 x == 1 || 2，第二项是恒真的整数 2。","把 || 和按位或 | 混淆。"],summary:"每个比较都写完整，不能写 day == 6 || 7，因为字面值 7 永远为真。",textbook:"第4章（4.1—4.8）"},{id:"c3-8",chapter:3,index:7,en:"Logical Operators Part 3",title:"逻辑运算符（三）",objective:"用 ! 取反，组合安全且易读的条件。",explanation:["逻辑非 ! 把真变假、假变真。!0 是 1，!任何非零数是 0；双重取反 !!x 可以把任意整数规范化为 0 或 1。","对复合条件取反时，德摩根律能帮助化简：!(A && B) 等价于 !A || !B。先用括号明确条件边界，再考虑是否需要化简。"],syntax:"!(score >= 0 && score <= 100)",syntaxNotes:"! 作用于紧随其后的完整操作数；括号决定取反范围。",example:`#include <stdio.h>

int main(void) {
    int score = 120;
    printf("%d %d\\n", !(score >= 0 && score <= 100), !!score);
    return 0;
}
`,exampleOutput:"1 1",walkthrough:`按顺序执行上面的语句。! 作用于紧随其后的完整操作数；括号决定取反范围。
程序输出：1 1`,mistakes:["写 !x == y，却想表达 !(x == y)。","用 ~ 代替 !，前者是按位取反。"],summary:"! 作用于紧随其后的完整操作数；括号决定取反范围。",textbook:"第4章（4.1—4.8）"},{id:"c3-9",chapter:3,index:8,en:"Recap Challenge",title:"运算符综合练习",objective:"结合取余、关系和逻辑运算表达业务规则。",explanation:["复杂规则先拆成多个布尔问题，再把它们组合。比如判断一个数是否是非负偶数，需要分别检查是否非负、是否能被 2 整除，最后取逻辑与。","写出中间变量可以帮助调试。不要为了缩短代码把所有条件挤成一个难以读懂的表达式；尤其要覆盖 0、负数和边界值。"],syntax:"bool valid = n >= 0 && n % 2 == 0;",syntaxNotes:"% 优先于 ==，比较优先于 &&；添加括号可以进一步强调语义。",example:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int n = 8;
    bool valid = n >= 0 && n % 2 == 0;
    printf("%d\\n", valid);
    return 0;
}
`,exampleOutput:"1",walkthrough:`按顺序执行上面的语句。% 优先于 ==，比较优先于 &&；添加括号可以进一步强调语义。
程序输出：1`,mistakes:["忽略 0 也是偶数。","用 n % 2 == 1 判断所有奇数，漏掉负奇数。"],summary:"% 优先于 ==，比较优先于 &&；添加括号可以进一步强调语义。",textbook:"第3章（3.3—3.4）"}],z={id:v,en:k,title:O,description:C,lessons:N},E={"c3-1":{type:"predict",question:"预测：20 - 12 / 3 的值是多少？",answer:["16"],explanation:"先算 12 / 3 得到 4，再算 20 - 4 得到 16。"},"c3-2":{type:"single",question:'预测：printf("%d", 5 % 2); 的输出是什么？',options:["0","1","2","2.5"],answer:["1"],explanation:"5 = 2 × 2 + 1，因此余数为 1。余数不是除法得到的小数部分。"},"c3-3":{type:"single",question:"int n=3; int x=n++; 执行后 x 和 n 是？",options:["3 和 4","4 和 4","3 和 3"],answer:["3 和 4"],explanation:"n++ 的表达式值是旧值 3，该完整表达式结束前 n 已更新为 4。"},"c3-4":{type:"predict",question:"预测：int x=9; x/=2; 最终 x 为多少？",answer:["4"],explanation:"x 是 int，复合除法保留整数结果，9 / 2 得到 4。"},"c3-5":{type:"debug",question:"分析：判断 x 是否等于 5 应使用哪一项？",options:["x == 5","x = 5","x := 5"],answer:["x == 5"],explanation:"== 是相等运算；= 是赋值，可能改变 x，并把赋值结果作为条件。"},"c3-6":{type:"boolean",question:"判断：0 && (10 / 0) 会对右侧进行求值。",options:["正确","错误"],answer:["错误"],explanation:"&& 在左侧为 0 时短路，因此右侧不执行；这是有定义的短路行为。"},"c3-7":{type:"single",question:"哪种写法正确判断 x 等于 1 或 2？",options:["x == 1 || x == 2","x == 1 || 2","x == (1 || 2)"],answer:["x == 1 || x == 2"],explanation:"每个条件都必须完整比较；单独的 2 在逻辑表达式中始终为真。"},"c3-8":{type:"multi",question:"多选：哪些表达式与 !(a && b) 等价？",options:["!a || !b","!(b && a)","!a && !b"],answer:["!a || !b","!(b && a)"],explanation:"逻辑与可交换，而德摩根律把“并且”的否定变成两个否定的“或者”。"},"c3-9":{type:"boolean",question:"判断：0 是非负偶数。",options:["正确","错误"],answer:["正确"],explanation:"0 >= 0 为真，0 % 2 为 0，所以两个条件同时成立。"}},I={"c3-1":{title:"控制计算顺序",difficulty:"基础",description:"计算 (12 + 8) * 3 - 10 / 2，输出整数结果。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"55"}],starter:`#include <stdio.h>

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
`,hints:["结合取余、关系和逻辑运算表达业务规则。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","% 优先于 ==，比较优先于 &&；添加括号可以进一步强调语义。"]}},D=4,_="Control Flow",T="流程控制",A="让程序根据不同条件，选择不同的路径。",F=[{id:"c4-1",chapter:4,index:0,en:"If Statement",title:"if 语句",objective:"在条件成立时执行一个代码块。",explanation:["顺序执行的程序总是走同一条路；if 像路口的开关，条件非零时才进入花括号中的代码。条件为零就跳过代码块，继续执行后续语句。","即使只有一条语句，也建议保留花括号。if 后误加分号会形成空语句，使后面的代码块变成无条件执行。"],syntax:`if (score >= 60) {
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
程序输出：Pass`,mistakes:["在 if (...) 后误加分号。","条件中用 = 赋值，未表达真正的比较。"],summary:"括号中是条件；花括号中是满足条件时执行的语句。",textbook:"第4章（4.1—4.8）"},{id:"c4-2",chapter:4,index:1,en:"If - Else",title:"if-else 语句",objective:"让两条互斥路径恰好执行一条。",explanation:["if-else 像只有两种出口的分流门。条件为真执行 if 块，否则执行 else 块；两边不会同时执行，也不会都跳过。","把两种情况分开能避免遗漏。写第二个独立 if 与写 else 并不完全等价，尤其当前一个分支会修改后面条件所依赖的数据时。"],syntax:`if (n % 2 == 0) {
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
程序输出：odd`,mistakes:["只判断正奇数，忽略负数。","在 if 块和 else 之间插入无关语句，破坏语法配对。"],summary:"else 不带条件，它表示前面 if 条件不成立的所有情况。",textbook:"第4章（4.1—4.8）"},{id:"c4-3",chapter:4,index:2,en:"Else-If",title:"多重条件判断",objective:"按顺序检查条件，覆盖边界与剩余情况。",explanation:["else-if 链像依次检查的分诊台，从第一个条件开始，遇到第一项成立就执行对应分支，然后跳过剩下的分支。最后的 else 接住所有未命中的情况。","区间条件通常从大到小或从小到大排列。如果先写 score >= 60，就会把 90 分也提前归入及格分支，后面的优秀判断再也到不了。"],syntax:`if (s >= 90) { /* A */ }
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
程序输出：B`,mistakes:["将较宽的条件放在前面，遮蔽后续条件。","对 60 和 90 的等号边界处理不一致。"],summary:"后续条件只在前面的条件都不成立时判断，因此 >=60 分支实际覆盖 60～89。",textbook:"第4章（4.1—4.8）"},{id:"c4-4",chapter:4,index:3,en:"Switch Case",title:"switch-case 语句",objective:"用 switch 分派离散整数或字符状态。",explanation:["switch 适合根据一个整数值从多个确定选项中选择，例如菜单编号。case 后必须是整型常量表达式，不能直接写运行时区间或字符串。","匹配到 case 后会继续顺序执行，直到 break 或 switch 结束。这叫贯穿；如果不是有意共享处理逻辑，通常应在每个分支结尾写 break。"],syntax:`switch (choice) {
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
程序输出：Coffee`,mistakes:["遗漏 break 造成意外贯穿。","用浮点数或字符串作为 switch 的控制值。"],summary:"switch 只计算一次控制表达式；default 处理没有匹配 case 的情况。",textbook:"第4章（4.1—4.8）"},{id:"c4-5",chapter:4,index:4,en:"Ternary Conditional Operator",title:"三目运算符",objective:"在两种值之间进行简短选择。",explanation:["条件运算符 ? : 适合“根据条件选一个值”，例如从两个价格中选较低者。它是一个表达式，可以出现在赋值右侧。","只会计算被选中的一侧，因此也具有短路性质。若逻辑包含多条语句或多层嵌套，用 if-else 会更容易阅读。注意两侧值的类型会共同影响结果类型。"],syntax:"int max = a > b ? a : b;",syntaxNotes:"问号前是条件；冒号前是真时的值；冒号后是假时的值。",example:`#include <stdio.h>

int main(void) {
    int a = 7, b = 12;
    int max = a > b ? a : b;
    printf("%d\\n", max);
    return 0;
}
`,exampleOutput:"12",walkthrough:`按顺序执行上面的语句。问号前是条件；冒号前是真时的值；冒号后是假时的值。
程序输出：12`,mistakes:["把 : 漏写成分号。","多层嵌套造成难以判断的分支顺序。"],summary:"问号前是条件；冒号前是真时的值；冒号后是假时的值。",textbook:"第4章（4.1—4.8）"},{id:"c4-6",chapter:4,index:5,en:"Recap Challenge",title:"流程控制综合练习",objective:"把条件顺序和边界检查组合为完整规则。",explanation:["综合条件题要先确认无效数据，再判断有效区间。比如先检查分数是否在 0～100，再决定是否及格，就不会把 120 分当成普通优秀成绩。","测试时应主动选每个分支的代表值，并增加边界值。只验证一个常见输入，无法发现条件方向写反或遗漏等号的问题。"],syntax:`if (s < 0 || s > 100) { /* invalid */ }
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
程序输出：Invalid`,mistakes:["只检查 s<0，忘记大于 100 也无效。","用 && 连接不可能同时成立的 s<0 与 s>100。"],summary:"无效输入优先拦截；合法范围内再作分级。",textbook:"第4章（4.1—4.8）"},{id:"c4-7",chapter:4,index:6,en:"Nested If - Else",title:"嵌套条件判断",objective:"按依赖关系嵌套判断，并明确 else 的归属。",explanation:["有些条件只有通过外层检查后才有意义。例如先确认门店营业，再判断是否有库存。嵌套 if 可以直接表达这种依赖关系。","没有花括号时，else 会匹配最近的尚未配对的 if，而不是按缩进匹配。始终使用花括号，并避免过深的嵌套，可以让代码更可靠。"],syntax:`if (open) {
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
程序输出：Sold out`,mistakes:["按缩进猜测 else 的归属。","外层失败时仍执行依赖它的内层运算。"],summary:"外层控制是否营业；内层只在营业时判断库存。",textbook:"第4章（4.1—4.8）"}],S={id:D,en:_,title:T,description:A,lessons:F},j={"c4-1":{type:"debug",question:'分析：if (x > 0); { puts("yes"); } 的问题是什么？',options:["分号让 if 控制空语句","缺少头文件 stdbool.h","puts 不能输出"],answer:["分号让 if 控制空语句"],explanation:"分号独立构成空语句，后面的花括号块无条件执行，因此需要删除多余分号。"},"c4-2":{type:"boolean",question:"判断：同一个 if-else 中两个分支可能同时执行。",options:["正确","错误"],answer:["错误"],explanation:"if 与 else 互斥，同一次判断只能选择一条路径。"},"c4-3":{type:"single",question:"s=90 时，示例的分支结果是？",options:["A","B","C"],answer:["A"],explanation:"第一个 >=90 已经成立，后面的 else-if 不再检查。"},"c4-4":{type:"fill",question:"填空：通常用于结束一个 case 分支、防止贯穿的关键字是什么？",answer:["break"],explanation:"break 退出最近一层 switch 或循环；它不等同于退出整个函数。"},"c4-5":{type:"predict",question:"预测：3 > 5 ? 10 : 20 的值是多少？",answer:["20"],explanation:"3 > 5 为假，因此选择冒号后面的 20。"},"c4-6":{type:"single",question:"哪个值应被示例判定为 Invalid？",options:["101","60","0"],answer:["101"],explanation:"合法范围是 0～100 的闭区间，101 超过上界。"},"c4-7":{type:"single",question:"没有花括号时，else 默认与哪个 if 配对？",options:["最近尚未配对的 if","最外层 if","按缩进判断"],answer:["最近尚未配对的 if"],explanation:"C 的语法配对由结构决定，空白缩进不决定 else 归属。"}},L={"c4-1":{title:"条件温度提醒",difficulty:"进阶",description:"令 temperature=38，温度大于等于 37 时输出 High，然后总是输出 Done。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:`High
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
`,hints:["按依赖关系嵌套判断，并明确 else 的归属。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","外层控制是否营业；内层只在营业时判断库存。"]}},R=5,B="Input & Output",U="输入与输出",M="让程序接收数据，并稳妥地处理输入。",P=[{id:"c5-1",chapter:5,index:0,en:"Format Specifiers",title:"格式控制符",objective:"区分 printf 与 scanf 对 double 的格式要求。",explanation:["控制符告诉标准库怎样读写值。输出时，float 会在可变参数调用中提升为 double，所以 printf 用 %f 就能输出 double。输入时，scanf 接收的是对象地址，double 必须配 %lf，float 配 %f。","同一个符号在输入与输出函数中不一定代表同样的参数要求。先确认变量类型和函数用途，再选择格式，避免把数据写到错误大小的内存中。"],syntax:`double x;
scanf("%lf", &x);
printf("%.2f", x);`,syntaxNotes:"%lf 在 scanf 中匹配 double*；printf 的 %.2f 接受 double 并显示两位小数。",example:`#include <stdio.h>

int main(void) {
    double x;
    if (scanf("%lf", &x) != 1) { return 1; }
    printf("%.2f\\n", x);
    return 0;
}
`,exampleOutput:"3.50",walkthrough:"输入 3.5 后，scanf 将它写入 x；printf 按两位小数显示 3.50。",mistakes:["scanf 用 %f 接收 double*，类型不匹配可能破坏数据。","scanf 遗漏 &，没有传入存储位置。"],summary:"%lf 在 scanf 中匹配 double*；printf 的 %.2f 接受 double 并显示两位小数。",exampleInput:"3.5",textbook:"第3章（3.1—3.5）"},{id:"c5-2",chapter:5,index:1,en:"scanf Basics",title:"scanf 输入基础",objective:"读取多个数值，并检查成功转换的数量。",explanation:["scanf 会按格式尝试把输入文本转换成数据。对于 %d 等数值控制符，前导空白会被跳过，所以两个整数既可以写在同一行，也可以分两行输入。",'返回值是成功赋值的项目数，不是输入的数值。只有返回值等于预期数量，才能放心使用变量。输入 %c 时不会自动跳过空白，若需要跳过，应写成 " %c"。'],syntax:`if (scanf("%d %d", &a, &b) != 2) {
    return 1;
}`,syntaxNotes:"&a 与 &b 是目标对象的地址；返回 2 表示两个整数都读取成功。",example:`#include <stdio.h>

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) { return 1; }
    printf("%d\\n", a + b);
    return 0;
}
`,exampleOutput:"8",walkthrough:"输入 3 5：scanf 返回 2，将 3 和 5 写入变量；相加得到 8。",mistakes:["未检查返回值就使用未初始化变量。","在格式串末尾加空白，交互输入时可能意外等待后续字符。"],summary:"&a 与 &b 是目标对象的地址；返回 2 表示两个整数都读取成功。",exampleInput:"3 5",textbook:"第3章（3.1—3.5）"},{id:"c5-3",chapter:5,index:2,en:"Recap Challenge #1",title:"输入输出综合练习一",objective:"把输入、计算、输出连接为完整的数据流程。",explanation:["处理输入题可以画成三段：输入数据 → 按公式计算 → 按格式输出。不要在评测程序里打印额外提示词，除非题目要求，否则会影响答案比较。","每个输入量应有明确的单位。例如长和宽都是厘米时，面积单位是平方厘米。用浮点数计算，并在输出阶段控制小数位，而不是过早转换成整数。"],syntax:"double area = width * height;",syntaxNotes:"先读取两个 double，再计算面积，最后用 %.2f 输出。",example:`#include <stdio.h>

int main(void) {
    double w, h;
    if (scanf("%lf %lf", &w, &h) != 2) { return 1; }
    printf("%.2f\\n", w * h);
    return 0;
}
`,exampleOutput:"7.50",walkthrough:"输入 2.5 和 3，先计算乘积 7.5，再以 7.50 输出。",mistakes:["输出额外的 Enter width 等提示，导致判题不通过。","使用整数变量截断输入的小数。"],summary:"先读取两个 double，再计算面积，最后用 %.2f 输出。",exampleInput:"2.5 3",textbook:"第3章（3.1—3.5）"},{id:"c5-4",chapter:5,index:3,en:"Input Validation",title:"输入验证",objective:"检查读取结果与取值范围，避免使用无效输入。",explanation:["读到了数据不代表数据符合业务规则。一个年龄应先确认能够转成整数，再确认是否在允许范围内。这是类型检查与范围检查的两个层次。","scanf 遇到 abc 时，%d 会转换失败。返回 0 后不能继续使用目标变量。对于任意长度、可能超出 int 范围的外部输入，更稳妥的方法是 fgets 搭配 strtol；本节的数值输入保证在 int 范围内。"],syntax:`if (scanf("%d", &age) != 1) { /* invalid */ }
else if (age < 0 || age > 120) { /* invalid */ }`,syntaxNotes:"先检查是否成功读取，成功后才访问 age 进行范围判断。",example:`#include <stdio.h>

int main(void) {
    int age;
    if (scanf("%d", &age) != 1) { puts("Invalid"); }
    else if (age < 0 || age > 120) { puts("Invalid"); }
    else { puts("Valid"); }
    return 0;
}
`,exampleOutput:"Valid",walkthrough:"输入 20，scanf 成功返回 1，20 也在 0～120 内，因此输出 Valid。",mistakes:["把 scanf 返回值当作用户输入的值。","转换失败后仍读取未初始化变量。"],summary:"先检查是否成功读取，成功后才访问 age 进行范围判断。",exampleInput:"20",textbook:"第3章（3.1—3.5）"},{id:"c5-5",chapter:5,index:4,en:"Recap Challenge #2",title:"输入输出综合练习二",objective:"在完成读取后检查业务边界，再执行计算。",explanation:["输入验证的意义在于让后续计算具有可靠前提。除法之前先确认分母非零，计算范围之前先确认数值有效。把这些步骤按顺序写，能避免危险操作先被执行。","测试应包含正常输入、边界输入和非法输入。对本题而言，分母为零是一条独立分支，不应让程序尝试计算后再补救。"],syntax:`if (b == 0) { puts("Invalid"); }
else { printf("%.2f", a / b); }`,syntaxNotes:"把除法放在 else 里，确保只在分母非零时执行。",example:`#include <stdio.h>

int main(void) {
    double a, b;
    if (scanf("%lf %lf", &a, &b) != 2 || b == 0) { puts("Invalid"); }
    else { printf("%.2f\\n", a / b); }
    return 0;
}
`,exampleOutput:"2.50",walkthrough:"输入 5 2：读取两项成功，分母非零，所以输出 2.50。",mistakes:["先算除法再检查分母。","用 b != 0 与读取检查的逻辑关系写反。"],summary:"把除法放在 else 里，确保只在分母非零时执行。",exampleInput:"5 2",textbook:"第3章（3.1—3.5）"}],H={id:R,en:B,title:U,description:M,lessons:P},$={"c5-1":{type:"single",question:"读取 double x，哪种写法正确？",options:['scanf("%lf", &x)','scanf("%f", &x)','scanf("%d", x)'],answer:['scanf("%lf", &x)'],explanation:"scanf 需要 double 对象的地址以及 %lf。printf 中 double 的常用格式则是 %f。"},"c5-2":{type:"fill",question:'scanf("%d %d", &a, &b) 成功读取两个整数时返回多少？',answer:["2"],explanation:"返回值统计成功转换并赋值的个数；遇到不匹配或输入结束时可能小于 2。"},"c5-3":{type:"predict",question:"输入 2.5 3，示例输出是什么？",answer:["7.50"],explanation:"两数相乘为 7.5，输出格式要求两位小数，因此为 7.50。"},"c5-4":{type:"single",question:'输入 abc 给 scanf("%d", &n)，通常返回什么？',options:["0","1","abc"],answer:["0"],explanation:"没有成功的整数转换，所以返回 0；若输入结束且尚未转换，则可能返回 EOF。"},"c5-5":{type:"multi",question:"多选：哪些输入应输出 Invalid？",options:["5 0","abc","5 2"],answer:["5 0","abc"],explanation:"分母为 0 不应进行除法；读取失败同样无法得到可靠计算结果。"}},V={"c5-1":{title:"小数的输入与输出",difficulty:"进阶",description:"读入一个 double，输出它的两倍，保留两位小数。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3.5",output:"7.00"},{input:"0",output:"0.00"},{input:"-2.25",output:"-4.50"}],starter:`#include <stdio.h>

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
`,hints:["在完成读取后检查业务边界，再执行计算。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","把除法放在 else 里，确保只在分母非零时执行。"]}},Y=6,K="Loops",G="循环",W="重复执行，逐步建立解决问题的思路。",Q=[{id:"c6-1",chapter:6,index:0,en:"For Loop",title:"for 循环",objective:"使用初始化、继续条件和更新控制重复次数。",explanation:["for 像一个自动计数器，把循环需要的三件事集中写在一处：从哪里开始、什么时候继续、每次怎样更新。条件在每次执行循环体之前判断。","跟踪 i 的值比背语法更有帮助。for (int i=0; i<3; i++) 依次执行 i 为 0、1、2 的循环体，共三次。i 变为 3 后，条件为假而退出。"],syntax:`for (int i = 0; i < n; i++) {
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
3`,mistakes:["把 < 写成 <=，比预期多执行一次。","在 for 头部后误加分号，循环体变成空语句。"],summary:"初始化执行一次；条件每轮先检查；更新在每轮循环体后执行。",textbook:"第5章（5.1—5.8）"},{id:"c6-2",chapter:6,index:1,en:"While Loop",title:"while 循环",objective:"在重复次数不确定时先检查条件再循环。",explanation:["while 适合重复次数由状态决定的任务，例如不断读入直到结束标记。它先检查条件，因此可能一次也不执行。","写循环前确认状态如何变化。若控制条件依赖 n，循环体内就要以某种方式更新 n，否则条件可能永远为真。可以写出“每轮后剩余工作减少多少”来检查终止性。"],syntax:`while (n > 0) {
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
程序输出：3 2 1`,mistakes:["忘记更新条件相关变量，造成无限循环。","以为 while 至少运行一次。"],summary:"每轮先判断 n>0；进入循环后更新 n；最终 n 降到 0。",textbook:"第5章（5.1—5.8）"},{id:"c6-3",chapter:6,index:2,en:"Do While Loop",title:"do-while 循环",objective:"理解先执行后判断的循环方式。",explanation:["do-while 像先展示一次菜单，再决定要不要重试。无论初始条件真假，循环体至少执行一遍。它适合必须先发生一次的交互或处理步骤。","与 while 的差别不只是代码位置：当初值不满足条件时，行为会不同。末尾 while (...) 后的分号属于语法的一部分，不能遗漏。"],syntax:`do {
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
程序输出：0`,mistakes:["忘记尾部的分号。","把先执行一次误写成普通 while，导致初始条件为假时完全跳过。"],summary:"先执行花括号里的语句，再检查 condition；末尾必须有分号。",textbook:"第5章（5.1—5.8）"},{id:"c6-4",chapter:6,index:3,en:"Break",title:"break 语句",objective:"满足停止条件时退出最近一层循环。",explanation:["break 表示“当前重复任务已经可以结束”。例如搜索目标时，一旦找到，就没有必要继续扫描。它只跳出最近一层循环或 switch，不会退出整个函数。","使用 break 后，控制流转到循环后的第一条语句。嵌套循环中若要退出外层，需要额外状态或函数返回，不能误以为一个 break 会结束全部层级。"],syntax:`if (value == 0) {
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
程序输出：1 2`,mistakes:["把 break 当作 return，误判函数是否结束。","嵌套循环中期待一个 break 同时退出两层。"],summary:"break 结束所在的最近一层循环；后续循环体语句不会执行。",textbook:"第5章（5.1—5.8）"},{id:"c6-5",chapter:6,index:4,en:"Continue",title:"continue 语句",objective:"跳过本轮剩余工作，继续下一轮。",explanation:["continue 像分拣时把不需要的物品放到一边：本轮的后续处理不做，但分拣流程继续。for 中会执行更新表达式，然后再次检查条件。","while 中没有独立的更新区。如果 continue 之前没有更新控制变量，就可能反复停在同一个值。先确定更新必然发生，再使用 continue。"],syntax:`if (n % 2 != 0) {
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
程序输出：2 4 6`,mistakes:["把 continue 写成 break，提前结束整个循环。","while 中在更新之前 continue，导致变量不再变化。"],summary:"跳过当前循环体剩余语句；for 仍会执行 i++ 等更新操作。",textbook:"第5章（5.1—5.8）"},{id:"c6-6",chapter:6,index:5,en:"Recap Challenge #1",title:"循环综合练习一",objective:"建立累加器，逐轮维护一个结果。",explanation:["累加器像账本，每收到一项就更新当前总额。写循环前先确定初值：求和通常从 0 开始，求乘积通常从 1 开始，不能随意交换。","可以用循环不变式检查代码：执行完前 i 次后，sum 等于已经处理的所有数之和。这样能发现漏加第一项或多加最后一项等边界问题。"],syntax:`int sum = 0;
for (int i = 1; i <= n; i++) { sum += i; }`,syntaxNotes:"sum 在循环外初始化一次；每轮把当前 i 累加进去。",example:`#include <stdio.h>

int main(void) {
    int sum = 0;
    for (int i = 1; i <= 4; i++) { sum += i; }
    printf("%d\\n", sum);
    return 0;
}
`,exampleOutput:"10",walkthrough:`按顺序执行上面的语句。sum 在循环外初始化一次；每轮把当前 i 累加进去。
程序输出：10`,mistakes:["在循环体内重新声明 sum=0，导致每轮丢失之前结果。","用未初始化变量累加，读取不确定值。"],summary:"sum 在循环外初始化一次；每轮把当前 i 累加进去。",textbook:"第5章（5.1—5.8）"},{id:"c6-7",chapter:6,index:6,en:"Nested Loops",title:"嵌套循环",objective:"按行列组织重复任务，计算总执行次数。",explanation:["嵌套循环像整理一张表：外层选择行，内层遍历这一行的列。每进入新的一行，内层计数器都需要重新开始。","如果外层执行 m 次、每轮内层都执行 n 次，总循环体次数为 m×n。输出图案时，行末换行应放在内层循环结束后，否则每个字符都会单独成行。"],syntax:`for (int r = 0; r < rows; r++) {
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
***`,mistakes:["内层变量没有按每行重置。","把换行放进内层，破坏行列布局。"],summary:"r 表示行，c 表示列；内层完整结束一次，外层才更新一次。",textbook:"第5章（5.1—5.8）"},{id:"c6-8",chapter:6,index:7,en:"Infinite Loops",title:"无限循环",objective:"识别非终止循环，并设计明确退出路径。",explanation:["while (1) 和 for (;;) 可以有意表达“不断重复，直到内部触发退出”。这种写法并不一定是错误，关键是是否存在可达的 break 或 return。","无意的无限循环通常来自条件无法改变、更新方向写反或边界判断错误。本工坊会终止超时的学生程序；看到超时时，先跟踪前几轮变量值，而不是继续加大等待时间。"],syntax:`while (1) {
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
程序输出：3`,mistakes:["计数器递增却等待它变小，条件永远不会达成。","在到达 break 前被 continue 跳过。"],summary:"常量 1 始终为真，退出依靠循环体中的 break。",textbook:"第5章（5.1—5.8）"},{id:"c6-9",chapter:6,index:8,en:"Recap Challenge #2",title:"循环综合练习二",objective:"组合输入、筛选和累计，完成统计任务。",explanation:["统计类题目通常同时维护几个状态，例如 sum 保存总和、count 保存符合条件的个数。先写清“什么情况下更新哪一个状态”，再写循环会更有条理。","读入 n 个值时循环应准确执行 n 次，每轮都检查读取成功。筛选只影响统计，不应改变读入次数，否则可能把后续数据读错位。"],syntax:`for (int i = 0; i < n; i++) {
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
`,exampleOutput:"2",walkthrough:"输入 4 -2 0 4 5：读取四个数，只有 4 和 5 增加 count，最终输出 2。",mistakes:["只在值为正时推进输入计数，可能无法读完固定数量的数据。","把 >0 写成 >=0，将零错误计入正数。"],summary:"循环处理固定数量的输入，条件分支决定当前值是否被累计。",exampleInput:"4 -2 0 4 5",textbook:"第5章（5.1—5.8）"}],X={id:Y,en:K,title:G,description:W,lessons:Q},Z={"c6-1":{type:"fill",question:"for (int i=0; i<4; i++) 的循环体执行几次？",answer:["4"],explanation:"i 依次为 0、1、2、3，一共四个有效值。"},"c6-2":{type:"boolean",question:"判断：while 条件一开始为假，循环体不会执行。",options:["正确","错误"],answer:["正确"],explanation:"while 属于先判断循环；只有条件非零才进入循环体。"},"c6-3":{type:"fill",question:"do-while 的循环体最少执行几次？",answer:["1"],explanation:"条件判断位于循环体之后，因此至少执行一次。"},"c6-4":{type:"single",question:"示例遇到 i==3 后，下一个位置在哪里？",options:["循环之后","下一轮 i=4","main 外面"],answer:["循环之后"],explanation:"break 直接退出当前 for，循环更新表达式和下一轮都不会发生。"},"c6-5":{type:"single",question:"for 中执行 continue 后还会执行更新表达式吗？",options:["会","不会"],answer:["会"],explanation:"continue 转到 for 的更新步骤，然后才检查下一轮条件。"},"c6-6":{type:"single",question:"累加 1 到 n，sum 应在哪里初始化为 0？",options:["循环开始前","每轮循环体中","不需要初始化"],answer:["循环开始前"],explanation:"初值只能在累计之前设置一次；每轮归零会抹掉先前的累计结果。"},"c6-7":{type:"fill",question:"外层 3 次、每次内层 4 次，内层循环体共执行几次？",answer:["12"],explanation:"每行 4 个单元格，共 3 行，所以是 3 × 4 = 12。"},"c6-8":{type:"multi",question:"多选：哪些可以结束 while(1) 所在的循环执行？",options:["执行该循环中的 break","从函数 return","普通的 continue"],answer:["执行该循环中的 break","从函数 return"],explanation:"break 退出循环，return 退出函数；continue 只进入下一轮，不能结束循环。"},"c6-9":{type:"fill",question:"数据 -2 0 4 5 中，严格大于零的数有几个？",answer:["2"],explanation:"只有 4 和 5 严格大于 0，零不属于正数。"}},J={"c6-1":{title:"输出连续整数",difficulty:"进阶",description:"输入 n（1～100），输出 1 到 n 的整数，用空白分隔。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"3",output:"1 2 3"},{input:"1",output:"1"},{input:"5",output:"1 2 3 4 5"}],starter:`#include <stdio.h>

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
`,hints:["组合输入、筛选和累计，完成统计任务。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","循环处理固定数量的输入，条件分支决定当前值是否被累计。"]}},nn=7,tn="Functions",en="函数",on="把问题拆开，让每一段代码职责清晰。",an=[{id:"c7-1",chapter:7,index:0,en:"Declare a Function",title:"函数声明与定义",objective:"定义一个无参数函数，并从 main 调用。",explanation:["函数像一台专门完成某个步骤的小机器。定义告诉编译器它的名字、参数、返回类型和内部做法；调用才会让这台机器实际执行。只写定义不会自动运行。","本节先把完整定义放在 main 前面，这样调用点已经知道函数的类型。void hello(void) 中，第一个 void 表示不返回值，括号里的 void 表示不接收参数。"],syntax:`void hello(void) {
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
Hello`,mistakes:["在 main 内定义另一个普通函数，不符合标准 C99。","写 hello 而不是 hello()，没有真正调用。"],summary:"函数定义不能嵌套在 main 内部；调用需要圆括号。",textbook:"第7章（7.1—7.11）"},{id:"c7-2",chapter:7,index:1,en:"Return Types",title:"函数返回值类型",objective:"用 return 把计算结果交回调用处。",explanation:["返回值像机器加工后的产品。一个 int 函数应返回整数，void 函数则不返回数据。return 表达式结束当前函数，并把结果交给调用者，而不是自动打印出来。","非 void 函数的所有正常返回路径都应提供正确类型的值。调用者可以把返回值保存到变量、放进表达式或传给 printf。main 在结尾的特殊返回规则不应套用到普通函数。"],syntax:`int square(int n) {
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
程序输出：16`,mistakes:["只计算表达式却忘记 return。","误以为 return 会直接在屏幕上显示结果。"],summary:"int 指定结果类型；return 把乘积交给调用者并立即结束函数。",textbook:"第7章（7.1—7.11）"},{id:"c7-3",chapter:7,index:2,en:"Parameters",title:"函数参数",objective:"通过参数传入数据，理解 C 的值传递。",explanation:["参数是函数的输入接口。调用时，实参的值会复制给形参；在函数内修改一个普通整数形参，不会修改调用者的整数变量。","像把数字写在另一张纸上再交给函数，函数改的是副本。要让调用者获得新结果，可以返回一个值，并在调用处明确赋值，而不是依赖“自动同步”。"],syntax:"int add(int a, int b) { return a + b; }",syntaxNotes:"a、b 是独立的局部形参；调用 add(3,5) 时获得 3、5 的副本。",example:`#include <stdio.h>

void change(int x) { x = 99; }
int add(int a, int b) { return a + b; }

int main(void) {
    int x = 3;
    change(x);
    printf("%d %d\\n", x, add(x, 4));
    return 0;
}
`,exampleOutput:"3 7",walkthrough:`按顺序执行上面的语句。a、b 是独立的局部形参；调用 add(3,5) 时获得 3、5 的副本。
程序输出：3 7`,mistakes:["以为修改 int 形参会自动更新调用者。","形参与实参顺序对应错误。"],summary:"a、b 是独立的局部形参；调用 add(3,5) 时获得 3、5 的副本。",textbook:"第7章（7.1—7.11）"},{id:"c7-4",chapter:7,index:3,en:"Recap Challenge #1",title:"函数综合练习一",objective:"把可重复的判断封装成有返回值的函数。",explanation:["设计函数时先问：输入是什么、输出是什么、是否有副作用。一个只返回判断结果的函数很容易测试，因为同样的输入应得到同样的结果。","主函数负责读写，辅助函数负责计算，可以减少混杂。这样以后更改输入方式时，判断规则仍能复用，不需要复制同一段条件。"],syntax:"int is_even(int n) { return n % 2 == 0; }",syntaxNotes:"返回比较结果 0 或 1，调用者决定如何使用或显示它。",example:`#include <stdio.h>

int is_even(int n) { return n % 2 == 0; }

int main(void) {
    printf("%d %d\\n", is_even(4), is_even(-3));
    return 0;
}
`,exampleOutput:"1 0",walkthrough:`按顺序执行上面的语句。返回比较结果 0 或 1，调用者决定如何使用或显示它。
程序输出：1 0`,mistakes:["将 printf 写进每个计算函数，使结果难以复用。","判断负奇数时错误依赖余数为 1。"],summary:"返回比较结果 0 或 1，调用者决定如何使用或显示它。",textbook:"第7章（7.1—7.11）"},{id:"c7-5",chapter:7,index:4,en:"Recursion Basics",title:"递归基础",objective:"为递归设计终止条件和逐步缩小的问题。",explanation:["递归就是函数调用自己。它像把大任务拆成“一个当前步骤 + 一个更小的同类任务”。例如 n! 可以写成 n × (n-1)!，但必须定义 0! 等于 1，才能让调用链停下来。","递归每深入一层通常都会占用栈空间。终止条件不仅要写出来，还必须能被递归步骤最终到达；对于大输入，循环往往更节省栈。"],syntax:`int fact(int n) {
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
程序输出：24`,mistakes:["没有基本情况或递归参数没有缩小，导致栈耗尽。","计算阶乘时忽略整数范围，本题限制 n<=10。"],summary:"n==0 是基本情况；n-1 缩小问题；结果在递归返回时逐层相乘。",textbook:"第7章（7.1—7.11）"},{id:"c7-6",chapter:7,index:5,en:"Function Prototypes",title:"函数原型",objective:"在调用前声明函数接口，分离接口与定义。",explanation:["原型像设备说明书：先告诉编译器函数接受什么参数、返回什么类型，完整内部实现可以放在后面。这让 main 可以先展示程序的整体流程。","原型必须和定义保持类型一致。C99 中 int f(void) 明确表示无参数，而 int f() 的声明并不提供参数类型信息。不要依赖旧式隐式函数声明。"],syntax:`int twice(int n);
/* 稍后提供完整定义 */`,syntaxNotes:"原型末尾是分号，没有函数体；参数名可省略，但类型必须正确。",example:`#include <stdio.h>

int twice(int n);
int twice(int n) { return 2 * n; }

int main(void) {
    printf("%d\\n", twice(6));
    return 0;
}
`,exampleOutput:"12",walkthrough:`按顺序执行上面的语句。原型末尾是分号，没有函数体；参数名可省略，但类型必须正确。
程序输出：12`,mistakes:["原型和定义的返回类型或参数类型不一致。","在函数尚未声明前调用，依赖旧式隐式声明。"],summary:"原型末尾是分号，没有函数体；参数名可省略，但类型必须正确。",textbook:"第7章（7.1—7.11）"},{id:"c7-7",chapter:7,index:6,en:"Recap Challenge #2",title:"函数综合练习二",objective:"组合辅助函数、循环和输入，解决数字问题。",explanation:["复合题可以拆成稳定的小步骤。处理数字时，经常用 %10 取出末位，再用 /10 去掉末位，把重复过程封装成一个函数。","先单独验证函数对 0、一位数、多位数的表现，再接入输入输出。明确输入范围能避免不必要的边界风险，例如本题只处理非负整数，不涉及 INT_MIN 的绝对值问题。"],syntax:`int digit = n % 10;
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
程序输出：6`,mistakes:["用 n%10 后忘记 n/=10，循环不会结束。","没有考虑输入 0 时是否需要处理一位数字。"],summary:"每轮取末位，再把剩余数字缩短一位；n 降到 0 时结束。",textbook:"第7章（7.1—7.11）"}],sn={id:nn,en:tn,title:en,description:on,lessons:an},un={"c7-1":{type:"single",question:"函数定义后会自动执行吗？",options:["不会，需要调用","会，编译时执行"],answer:["不会，需要调用"],explanation:"函数体在被调用时才运行；定义提供实现，调用启动实现。"},"c7-2":{type:"single",question:"int f(void) { return 7; } 调用 f() 会自动输出 7 吗？",options:["不会","会"],answer:["不会"],explanation:"return 传递值，打印需要额外调用 printf 或其他输出函数。"},"c7-3":{type:"single",question:"int x=3; change(x); 中 change 将形参改为 99，x 会变吗？",options:["不会，仍为 3","会变为 99"],answer:["不会，仍为 3"],explanation:"C 采用值传递，修改形参只改变函数内的副本。"},"c7-4":{type:"predict",question:"预测：is_even(-4) 返回多少？",answer:["1"],explanation:"-4 除以 2 的余数为 0，因此比较结果为真，也就是 1。"},"c7-5":{type:"fill",question:"fact(0) 应该返回多少？",answer:["1"],explanation:"0! 定义为 1，它也构成阶乘递归的终止条件。"},"c7-6":{type:"single",question:"哪个是声明“无参数且返回 int”的规范 C99 原型？",options:["int f(void);","int f();","void f(int);"],answer:["int f(void);"],explanation:"void 参数列表明确说明没有参数；空括号在 C99 的声明中不提供这种类型约束。"},"c7-7":{type:"fill",question:"数字 507 的各位和是多少？",answer:["12"],explanation:"5 + 0 + 7 = 12；中间的 0 不增加和值，但仍然占一位。"}},rn={"c7-1":{title:"封装问候动作",difficulty:"进阶",description:"定义 void greet(void)，每次输出 Welcome，并在 main 中调用两次。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:`Welcome
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
`,hints:["组合辅助函数、循环和输入，解决数字问题。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","每轮取末位，再把剩余数字缩短一位；n 降到 0 时结束。"]}},pn=8,ln="Arrays",dn="数组",cn="组织一组数据，练习遍历与基础算法。",fn=[{id:"c8-1",chapter:8,index:0,en:"Declaring Arrays",title:"数组声明",objective:"声明同类型的连续元素，并正确初始化。",explanation:["数组像一排同样大小且连续编号的储物格，每一格保存相同类型的数据。int scores[3] 声明三个整数元素，编号从 0 开始。","初始化列表可以显式给值。int a[5]={1,2}; 会把剩余元素初始化为 0；而函数内没有初始化的普通数组，元素并不会自动归零。数组长度声明后不能通过赋值改变。"],syntax:"int scores[3] = {80, 90, 100};",syntaxNotes:"[3] 是元素个数；有效下标为 0、1、2；花括号列表依次初始化元素。",example:`#include <stdio.h>

int main(void) {
    int scores[3] = {80, 90, 100};
    printf("%d %d %d\\n", scores[0], scores[1], scores[2]);
    return 0;
}
`,exampleOutput:"80 90 100",walkthrough:`按顺序执行上面的语句。[3] 是元素个数；有效下标为 0、1、2；花括号列表依次初始化元素。
程序输出：80 90 100`,mistakes:["以为函数内 int a[3]; 默认全部为 0。","用 a=b 给整个数组赋值，标准 C 不支持这种数组赋值。"],summary:"[3] 是元素个数；有效下标为 0、1、2；花括号列表依次初始化元素。",textbook:"第6章（6.1—6.3）"},{id:"c8-2",chapter:8,index:1,en:"Accessing Elements",title:"访问数组元素",objective:"使用零起始下标，在有效范围内访问元素。",explanation:["数组的下标是从首元素开始的偏移：a[0] 是第一项，a[n-1] 是第 n 项。用循环访问时，继续条件通常写 i<n。","C 不会自动做数组越界检查。读取 a[n] 不会可靠地得到某个“额外值”，而是产生未定义行为。访问来自输入的下标前，应先检查范围。"],syntax:`for (int i = 0; i < n; i++) {
    printf("%d ", a[i]);
}`,syntaxNotes:"下标从 0 开始，严格小于元素个数；不能访问 a[n]。",example:`#include <stdio.h>

int main(void) {
    int a[3] = {10, 20, 30};
    printf("%d\\n", a[1]);
    return 0;
}
`,exampleOutput:"20",walkthrough:`按顺序执行上面的语句。下标从 0 开始，严格小于元素个数；不能访问 a[n]。
程序输出：20`,mistakes:["把 a[1] 当成第一项。","使用 i<=n，最后一轮越界访问 a[n]。"],summary:"下标从 0 开始，严格小于元素个数；不能访问 a[n]。",textbook:"第6章（6.1—6.3）"},{id:"c8-3",chapter:8,index:2,en:"Modifying Elements",title:"修改数组元素",objective:"通过下标读写同一元素，区分下标与元素值。",explanation:["a[i] 可以像普通变量一样被赋值。它选中的是下标 i 对应的那一个格子，修改不会自动影响其他格子。a[i]++ 增加元素，i++ 增加的是下标。","批量修改通常用循环。若操作依赖旧值，要先确认更新顺序不会覆盖后面仍然需要的数据；例如交换元素要借助临时变量。"],syntax:`int temp = a[0];
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
程序输出：8 3`,mistakes:["交换时直接 a[0]=a[1]; a[1]=a[0];，旧值已经丢失。","修改 i 却以为修改了 a[i]。"],summary:"temp 保存旧 a[0]，避免第一条赋值后丢失它。",textbook:"第6章（6.1—6.3）"},{id:"c8-4",chapter:8,index:3,en:"Multidimensional Arrays",title:"多维数组",objective:"按行列访问二维数组，理解连续的行优先存储。",explanation:["二维数组像一张表格。int a[2][3] 有 2 行，每行 3 个 int。访问 a[r][c] 时，先选第 r 行，再选这一行的第 c 列。","C 按行优先顺序存储：第一行的元素连续排列后，再排列第二行。行和列都要独立检查范围；一维下标不越界并不能保证另一个也安全。"],syntax:"int grid[2][3] = {{1,2,3}, {4,5,6}};",syntaxNotes:"第一维是行数，第二维是列数；grid[1][2] 是第二行第三列。",example:`#include <stdio.h>

int main(void) {
    int grid[2][3] = {{1,2,3}, {4,5,6}};
    printf("%d\\n", grid[1][2]);
    return 0;
}
`,exampleOutput:"6",walkthrough:`按顺序执行上面的语句。第一维是行数，第二维是列数；grid[1][2] 是第二行第三列。
程序输出：6`,mistakes:["把行列下标写反。","用 <= 行数或 <= 列数作为边界，越界访问。"],summary:"第一维是行数，第二维是列数；grid[1][2] 是第二行第三列。",textbook:"第6章（6.1—6.3）"},{id:"c8-5",chapter:8,index:4,en:"Recap Challenge #1",title:"数组综合练习一",objective:"正确初始化最大值，并遍历所有元素。",explanation:["寻找最大值时，候选值应初始化为第一个真实元素。若默认设为 0，面对全是负数的数组，就会错误地返回数组里根本不存在的 0。","之后从第二项开始逐一比较：如果当前元素更大，就替换候选。每轮结束时，候选都是已经处理的前缀中的最大值，这个不变式能证明算法正确。"],syntax:`int max = a[0];
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
程序输出：-2`,mistakes:["用 0 初始化最大值，无法处理全负数组。","在没有元素的数组上读取 a[0]。"],summary:"n 至少为 1；第一项作为初值，后续元素依次竞争最大值。",textbook:"第6章（6.1—6.3）"},{id:"c8-6",chapter:8,index:5,en:"Arrays as Function Arguments",title:"数组作为函数参数",objective:"把数组和长度一起传给函数。",explanation:["在函数形参中，int a[] 调整为 int*，不会复制整个数组。调用仍是按值传递指针，但函数通过该副本可访问调用者元素，因此修改 a[i] 会影响原数组。完成基础后，可到“指针与动态内存”练习地址、边界和生命周期。","数组长度不会自动跟着传入，必须单独提供 n。函数内不能用 sizeof(a)/sizeof(a[0]) 推算原数组长度；参数 a 已经不是原来的数组对象。"],syntax:"int sum(const int a[], int n);",syntaxNotes:"const 表示函数不通过 a 修改元素；n 明确告诉函数有效元素个数。",example:`#include <stdio.h>

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
程序输出：12`,mistakes:["以为数组形参会复制全部元素。","在函数内对形参使用 sizeof 来推算调用者数组的长度。"],summary:"const 表示函数不通过 a 修改元素；n 明确告诉函数有效元素个数。",textbook:"第7章（7.1—7.11）"},{id:"c8-7",chapter:8,index:6,en:"Array Algorithms",title:"数组算法",objective:"理解线性查找与冒泡排序的基本过程。",explanation:["线性查找按顺序检查每个元素，最坏要看 n 次，适合小数组或未排序数据。若找到目标就返回下标，否则返回 -1，用一个数组范围外的值表示没有找到。","冒泡排序通过反复比较相邻元素，把较大值逐轮推向右端。它简单但时间复杂度为 O(n²)，本课程的小输入可以使用，面对大数据应选择更高效的算法。"],syntax:`for (int i = 0; i < n; i++) {
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
程序输出：0`,mistakes:["查找循环结束后返回 n，却把 n 当成有效下标。","排序交换时没有保存临时值，丢掉一个元素。"],summary:"按下标递增顺序查找，首次匹配就返回，因此能定位第一次出现的位置。",textbook:"第6章（6.1—6.3）"},{id:"c8-8",chapter:8,index:7,en:"Recap Challenge #2",title:"数组综合练习二",objective:"用双向下标原地反转数组。",explanation:["反转不需要另建一个同样大小的数组。用 left 指向开头、right 指向结尾，交换两个位置，再同时向中间移动，直到两者相遇或交错。","每轮有两个元素就位，所以只需约 n/2 次交换。若一直交换到 n 次，后半段会把前面的工作再次反转，最终回到原样。奇数长度的中间项无需移动。"],syntax:`for (int left = 0, right = n - 1; left < right; left++, right--) {
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
程序输出：4 3 2 1`,mistakes:["把右端初值设为 n，导致越界。","交换全部 n 对元素，把数组又反转回原样。"],summary:"left<right 防止重复交换；右端下标应为 n-1，不能写 n。",textbook:"第6章（6.1—6.3）"}],xn={id:pn,en:ln,title:dn,description:cn,lessons:fn},hn={"c8-1":{type:"fill",question:"int a[4]={7}; 中 a[2] 的值是多少？",answer:["0"],explanation:"有初始化列表时，没有显式提供的剩余元素会被零初始化。"},"c8-2":{type:"fill",question:"长度为 5 的数组，最大合法下标是多少？",answer:["4"],explanation:"下标从 0 开始，因此最后一个元素的下标为长度减一。"},"c8-3":{type:"debug",question:"分析：a[0]=a[1]; a[1]=a[0]; 为什么不能交换？",options:["第一步覆盖了原来的 a[0]","数组不能修改","下标必须从 1 开始"],answer:["第一步覆盖了原来的 a[0]"],explanation:"第二步读取的是已经被覆盖的新 a[0]，需要临时变量保存旧值。"},"c8-4":{type:"single",question:"grid[1][0] 指的是哪一个位置？",options:["第二行第一列","第一行第二列","第二行第二列"],answer:["第二行第一列"],explanation:"两个下标都从 0 开始，第一个表示行，第二个表示列。"},"c8-5":{type:"fill",question:"数组 {-8,-2,-5} 的最大值是多少？",answer:["-2"],explanation:"最大值必须来自元素本身；-2 大于 -5 和 -8，不能返回不存在的 0。"},"c8-6":{type:"multi",question:"多选：正确的数组函数接口通常需要什么？",options:["元素的访问入口","有效元素个数","依赖 sizeof(a) 自动获得原长度"],answer:["元素的访问入口","有效元素个数"],explanation:"数组形参调整为指针，不携带原数组长度；长度需要通过参数或明确约定提供。"},"c8-7":{type:"single",question:"线性查找中返回 -1 通常表示什么？",options:["没有找到","第一个元素","最后一个元素"],answer:["没有找到"],explanation:"合法下标从 0 到 n-1，-1 作为明确的未命中标记。"},"c8-8":{type:"fill",question:"长度为 5 的数组原地反转，需要交换几对元素？",answer:["2"],explanation:"交换下标 0 与 4、1 与 3，中间下标 2 保持不变。"}},mn={"c8-1":{title:"创建并遍历数组",difficulty:"进阶",description:"声明长度为 4 的整数数组，初值为 2、4、6、8，输出四项总和。",input:"本题不需要输入。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"",output:"20"}],starter:`#include <stdio.h>

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
`,hints:["用双向下标原地反转数组。","先确认数据类型、运算顺序和输出格式，再对照示例手算一次。","left<right 防止重复交换；右端下标应为 n-1，不能写 n。"]}},yn=9,bn="Final Challenges",qn="最终综合挑战",wn="把基础知识连起来，独立解决完整问题。",gn=[{id:"c9-1",chapter:9,index:0,en:"Grades",title:"成绩管理挑战",objective:"组合数组、统计和函数，完成成绩报告。",explanation:["成绩统计需要同时维护总分、最大值和及格人数。把输入存进数组后，可以多次遍历做不同分析，也可以在读入时一次完成统计。两种方式都要保证初值正确。","平均分需要在除法前转换为 double；最大值应从首个成绩初始化；及格条件使用 >=60。编程前先列出这些边界，比写完后反复猜测错误更高效。"],syntax:"double average = (double)sum / n;",syntaxNotes:"n 保证至少为 1；求和使用整数，在最后除法前转为 double。",example:`#include <stdio.h>

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
程序输出：75.00 100 3`,mistakes:["先做整数除法再转换，平均分丢失小数。","把 60 分排除在及格人数之外。"],summary:"n 保证至少为 1；求和使用整数，在最后除法前转为 double。",textbook:"课后综合训练"},{id:"c9-2",chapter:9,index:1,en:"Peaks",title:"数组峰值挑战",objective:"根据相邻元素关系识别局部峰值。",explanation:["局部峰值比左右两个相邻元素都大，不一定是整个数组最大值。本题只考虑内部元素，因此第一项和最后一项都不算峰值。平台上相等的相邻元素也不能构成严格峰值。","遍历需要同时访问 a[i-1] 与 a[i+1]，所以 i 的范围应从 1 到 n-2。先根据访问范围推导循环边界，是避免越界的可靠方法。"],syntax:"a[i] > a[i - 1] && a[i] > a[i + 1]",syntaxNotes:"使用严格大于；有效 i 满足 1<=i<n-1；n<3 时没有内部元素。",example:`#include <stdio.h>

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
程序输出：2`,mistakes:["把两端点当成内部峰值，或访问不存在的邻居。","用 >= 把平台也算成严格峰值。"],summary:"使用严格大于；有效 i 满足 1<=i<n-1；n<3 时没有内部元素。",textbook:"课后综合训练"},{id:"c9-3",chapter:9,index:2,en:"TV",title:"综合编程挑战",objective:"用状态模拟、函数和数组完成频道操作统计。",explanation:["模拟题的核心是每条指令只更新规定的状态。把频道切换规则封装为函数，主循环负责读取指令，数组负责记录各频道的观看次数，职责就清楚了。","本题频道为 1～10，数组可以开 11 项并暂时不用第 0 项，让业务编号与下标一致。求最高观看次数时从小到大扫描，只有严格更大才更新，就自然保留最小频道的平局答案。"],syntax:`channel = next_channel(channel, direction);
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
程序输出：10`,mistakes:["切换频道时也增加观看次数，但题目要求只在 0 指令时记录。","用 >= 更新最高次数，平局时错误保留较大频道。"],summary:"+1 和 -1 切换频道并循环回绕；只有指令 0 增加当前频道观看次数。",textbook:"课后综合训练"}],vn={id:yn,en:bn,title:qn,description:wn,lessons:gn},kn={"c9-1":{type:"single",question:"成绩 60、61 的平均分与及格人数是？",options:["60.50 和 2","60.00 和 1","60.50 和 1"],answer:["60.50 和 2"],explanation:"平均分为 121/2=60.5；两项都满足 >=60。"},"c9-2":{type:"fill",question:"数组 1 3 3 1 有几个严格内部峰值？",answer:["0"],explanation:"两个 3 相等，任何一个都没有严格大于左右两邻居，因此不构成严格峰值。"},"c9-3":{type:"fill",question:"频道 1 执行 -1 切换指令后是几号频道？",answer:["10"],explanation:"频道向下切换时从 1 回绕到 10；向上则从 10 回绕到 1。"}},On={"c9-1":{title:"生成成绩报告",difficulty:"综合",description:"输入 n（1～50）以及 n 个成绩（0～100）。输出平均分（两位小数）、最高分和及格人数（>=60），用空白分隔。",input:"按示例输入，以空白分隔数值。",output:"严格按要求输出；判题忽略首尾空白和空白字符数量。",tests:[{input:"4 50 60 90 100",output:"75.00 100 3"},{input:"1 0",output:"0.00 0 0"},{input:"2 60 61",output:"60.50 61 2"},{input:"3 59 59 59",output:"59.00 59 0"}],starter:`#include <stdio.h>

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
`,hints:["分别维护当前频道和 views[11] 观看计数。","注意频道回绕，切换不计观看，平局要选最小编号。","遍历指令更新状态；最后从频道 1 起扫描，只在 views[c]>views[best] 时更新 best。"]}},Cn=Object.assign({},c,w,E,j,$,Z,un,hn,kn),Nn=Object.assign({},f,g,I,L,V,J,rn,mn,On),zn=[d,q,z,S,H,X,sn,xn,vn].map(n=>({...n,lessons:n.lessons.map(t=>({...t,quiz:Cn[t.id],quizzes:o[t.id],mastery:a[t.id],challenge:Nn[t.id]}))})),En=[...zn,...e],i=En.flatMap(n=>n.lessons),_n=Object.assign(Object.create(null),Object.fromEntries(i.map(n=>[n.id,n]))),Tn={lessons:i.length,mastery:i.filter(n=>n.mastery).length,challenges:i.length+i.filter(n=>n.mastery).length,questions:i.reduce((n,t)=>n+t.quizzes.length,0)},In="https://www.tup.tsinghua.edu.cn/upload/books/yz/076450-04.pdf",Dn=[{page:37,topic:"顺序结构与公式求值",lessons:["c1-4","c2-9","c3-1"],result:"已有基础与转换练习；明确先用浮点操作数参与计算。"},{page:38,topic:"连续计算与数值输出",lessons:["c2-3","c3-1"],result:"已有顺序计算练习；补充存储精度与显示精度的区别。"},{page:39,topic:"常量、科学计数法与字符常量",lessons:["c2-3","c2-4","c10-4"],result:"补充科学计数法写法，区分字面量类型与输出形式。"},{page:40,topic:"转义字符与字符串",lessons:["c2-4","c11-1"],result:"补充转义规则及八/十六进制转义，增加标签输出挑战。"},{page:41,topic:"符号常量与变量",lessons:["c2-6","c2-8"],result:"增加宏与 const 配合练习，说明宏替换不是对象赋值。"},{page:42,topic:"const、标识符与数据类型",lessons:["c2-1","c2-6","c2-8"],result:"保留命名规则，补充宏、const 和整数常量表达式的区别。"},{page:43,topic:"类型分类与存储范围",lessons:["c2-1","c2-3"],result:"补充聚合类型分类与有限精度说明。"},{page:44,topic:"整型表示、补码和范围",lessons:["c2-2","c10-4"],result:"区分 wasm32 补码实现与 C99 允许的表示，强调有符号溢出。"},{page:45,topic:"整型大小与有符号性",lessons:["c2-2","c10-4"],result:"使用 limits.h 和 sizeof 查询实现，避免写死整型宽度。"},{page:46,topic:"signed 与 unsigned",lessons:["c2-2"],result:"补充无符号取模转换与 %hu 格式，增加负数转换实验。"},{page:47,topic:"无符号转换与字符编码",lessons:["c2-2","c2-4"],result:"说明转换规则；ASCII 编码位置为 0..127 共 128 个。"},{page:48,topic:"字符类型与字节",lessons:["c2-1","c2-4"],result:"区分 C 字节、CHAR_BIT 以及普通 char 的实现相关符号性。"},{page:49,topic:"浮点表示、范围与精度",lessons:["c2-3"],result:"区分有效数字、显示小数位和二进制近似。"},{page:50,topic:"浮点下界与常量类型",lessons:["c2-3","c10-4"],result:"说明 FLT_MIN 是正规格化正数下界，平台可存在更小的非正规格化值。"},{page:51,topic:"字面量后缀与类型名称",lessons:["c2-3","c10-4"],result:"补充 f/F、L 后缀语境，保留类型与对象区别。"},{page:52,topic:"算术运算与负数除法",lessons:["c3-1","c3-2"],result:"明确 C99 除法向零截断，避免混用旧实现差异。"},{page:53,topic:"自增自减、优先级",lessons:["c3-3","c3-1"],result:"补充后缀副作用约束，增加独立语句跟踪检测。"},{page:54,topic:"结合性与混合算术",lessons:["c2-9","c3-1"],result:"分清结合性与求值顺序；float 算术与默认实参提升分别说明。"},{page:55,topic:"字符算术与显式转换",lessons:["c2-4","c2-9","c2-10"],result:"保留 ASCII 环境范围说明，补充转换不改变源对象。"},{page:56,topic:"转换范围与程序构成",lessons:["c2-10","c1-4","c12-3"],result:"补充浮点转整数越界约束，已有多源文件组织课程。"}],An={source:In,pages:Dn},Fn=[{number:1,title:"程序与 C 语言",sections:"1.1—1.6",topics:"语言特点、基本程序结构、运行步骤与程序设计任务",lessons:["c1-1","c1-2","c1-3","c1-4","c10-3"]},{number:2,title:"算法与结构化设计",sections:"2.1—2.6",topics:"算法特性、自然语言、流程图、N-S 图、伪代码与逐层分解",lessons:["c10-1","c10-2"]},{number:3,title:"顺序程序、数据与运算",sections:"3.1—3.5",topics:"常量与变量、类型、表达式、赋值与格式及字符输入输出",lessons:["c2-1","c2-2","c2-3","c2-4","c2-5","c2-6","c2-7","c2-8","c2-9","c2-10","c2-11","c3-1","c3-2","c3-3","c3-4","c10-4","c10-7","c5-1","c5-2","c5-3","c5-4","c5-5","c10-5","c10-6","c3-9"]},{number:4,title:"选择结构",sections:"4.1—4.8",topics:"关系与逻辑表达式、if、嵌套选择、条件运算与 switch",lessons:["c3-5","c3-6","c3-7","c3-8","c4-1","c4-2","c4-3","c4-4","c4-5","c4-6","c4-7"]},{number:5,title:"循环结构",sections:"5.1—5.8",topics:"while、do-while、for、嵌套、break、continue 与迭代算法",lessons:["c6-1","c6-2","c6-3","c6-4","c6-5","c6-6","c6-7","c6-8","c6-9","c10-2","c10-8","c10-9"]},{number:6,title:"数组与字符串",sections:"6.1—6.3",topics:"一维与二维数组、初始化、数组算法、字符数组和字符串函数",lessons:["c8-1","c8-2","c8-3","c8-4","c8-5","c8-7","c8-8","c11-1","c11-2","c11-3","c11-4","c11-5"]},{number:7,title:"函数与模块化",sections:"7.1—7.11",topics:"函数原型、调用、参数、递归、数组形参、作用域、存储期和内外部函数",lessons:["c7-1","c7-2","c7-3","c7-4","c7-5","c7-6","c7-7","c8-6","c12-1","c12-2","c12-3","c12-4","c12-5"]},{number:8,title:"指针与动态内存",sections:"8.1—8.9",topics:"地址、数组与字符串指针、回调、指针返回值、多重指针和分配释放",lessons:["c13-1","c13-2","c13-3","c13-4","c13-5","c13-6","c13-7","c13-8","c13-9","c13-10","c13-11"]},{number:9,title:"用户自定义类型",sections:"9.1—9.7",topics:"结构体、结构体数组与指针、静态及动态链表、共用体、枚举和 typedef",lessons:["c14-1","c14-2","c14-3","c14-4","c14-5","c14-6","c14-7","c14-8"]},{number:10,title:"文件输入输出",sections:"10.1—10.5",topics:"FILE 流、打开关闭、字符与字符串、格式化和二进制读写、定位与错误检测",lessons:["c15-1","c15-2","c15-3","c15-4","c15-5","c15-6","c15-7"]},{number:11,title:"附录配套与扩展",sections:"附录 A—E",topics:"ASCII、关键字、优先级、常用语法、标准库；另配预处理与位运算练习",lessons:["c16-1","c16-2","c16-3"]}],Sn={1:{type:"debug",question:`下面的程序为什么没有输出数字 0？
int main(void) { return 0; }`,options:["return 传递退出状态，不负责输出","main 没有执行","0 不能被输出"],answer:["return 传递退出状态，不负责输出"],explanation:'return 0 向运行环境报告正常退出。若要输出 0，需要包含 stdio.h 并调用 printf("0");。'},2:{type:"predict",question:`预测输出：
double x = 11 / 4;
printf("%.2f", x);`,answer:["2.00"],explanation:"11 和 4 都是整数，先得到整数 2，再存入 double。要得到 2.75，应写 11.0/4 或 (double)11/4。"},3:{type:"predict",question:`预测输出：
printf("%d", -9 % 4);`,answer:["-1"],explanation:"C99 的整数商向零截断：-9/4 为 -2，因此 -9=(-2)*4+(-1)，余数为 -1。"},4:{type:"single",question:"判断 0<=x<=10 的正确 C 表达式是？",options:["x >= 0 && x <= 10","0 <= x <= 10","x >= 0 || x <= 10"],answer:["x >= 0 && x <= 10"],explanation:"两个边界必须同时满足，所以用逻辑与。连续关系比较会把前一次比较产生的 0 或 1 再与 10 比较。"},5:{type:"multi",question:"读入 double x 时，哪些处理正确？",options:["使用 %lf 和 &x","检查 scanf 返回值是否为 1","使用 %f 和 x"],answer:["使用 %lf 和 &x","检查 scanf 返回值是否为 1"],explanation:"scanf 需要 double* 与 %lf，返回值为 1 才代表转换成功。未读取成功时不能使用未初始化的 x。"},6:{type:"debug",question:"分析：int i=0; while(i<3) { if(i==0) continue; i++; }",options:["i 一直为 0，产生无限循环","恰好运行 3 次","continue 等同于 break"],answer:["i 一直为 0，产生无限循环"],explanation:"i==0 时 continue 跳过 i++，于是条件永远不改变。可在 continue 前更新，或改用更新不会被跳过的 for。"},7:{type:"boolean",question:"C99 中，修改函数的 int 形参会直接修改调用者的 int 实参。",options:["正确","错误"],answer:["错误"],explanation:"普通整数参数按值传递，形参是副本。可以返回新值并在调用处赋值。数组形参的行为另有不同。"},8:{type:"single",question:"求全负数组最大值，初始 max 应设为？",options:["第一个元素 a[0]","0","数组长度 n"],answer:["第一个元素 a[0]"],explanation:"候选最大值应来自真实元素（前提 n>=1）。0 可能比所有元素都大却根本不在数组中。"},9:{type:"fill",question:"数组 2 5 1 6 3 3 中有几个严格内部峰值？",answer:["2"],explanation:"5 比 2 和 1 都大，6 比 1 和 3 都大。相邻两个 3 不构成严格峰值，端点也不计。"}};export{_n as a,An as b,En as c,Tn as d,Fn as g,i as l,Sn as r};
