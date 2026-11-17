export const stages = [
  { title: "01 · 从输入到流程", chapters: [1, 2, 3, 5, 4, 6], goal: "先掌握输入输出，再用分支和循环处理数据。" },
  { title: "02 · 组织程序与数据", chapters: [7, 8, 9], goal: "用函数和数组完成基础综合挑战。" },
  { title: "03 · 字符串与算法", chapters: [10, 11, 12, 17, 18], goal: "补齐 C99、字符串和作用域，练习数值与数组算法。" },
  { title: "04 · 内存与数据结构", chapters: [13, 14], goal: "理解指针和对象生存期，再实现动态数组与链表。" },
  { title: "05 · 文件与综合应用", chapters: [16, 15, 19, 20], goal: "掌握预处理和文件流，综合运用递归、回调与标准库。" },
];
export const chapterOrder = stages.flatMap(s => s.chapters);
export const stageFor = (id: number) => stages.find(s => s.chapters.includes(id))!;
