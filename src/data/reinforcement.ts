import type { Quiz } from "./types";
export const reinforcement: Record<number, Quiz> = {
  1: {
    type: "debug",
    question: "下面的程序为什么没有输出数字 0？\nint main(void) { return 0; }",
    options: [
      "return 传递退出状态，不负责输出",
      "main 没有执行",
      "0 不能被输出",
    ],
    answer: ["return 传递退出状态，不负责输出"],
    explanation:
      'return 0 向运行环境报告正常退出。若要输出 0，需要包含 stdio.h 并调用 printf("0");。',
  },
  2: {
    type: "predict",
    question: '预测输出：\ndouble x = 11 / 4;\nprintf("%.2f", x);',
    answer: ["2.00"],
    explanation:
      "11 和 4 都是整数，先得到整数 2，再存入 double。要得到 2.75，应写 11.0/4 或 (double)11/4。",
  },
  3: {
    type: "predict",
    question: '预测输出：\nprintf("%d", -9 % 4);',
    answer: ["-1"],
    explanation:
      "C99 的整数商向零截断：-9/4 为 -2，因此 -9=(-2)*4+(-1)，余数为 -1。",
  },
  4: {
    type: "single",
    question: "判断 0<=x<=10 的正确 C 表达式是？",
    options: ["x >= 0 && x <= 10", "0 <= x <= 10", "x >= 0 || x <= 10"],
    answer: ["x >= 0 && x <= 10"],
    explanation:
      "两个边界必须同时满足，所以用逻辑与。连续关系比较会把前一次比较产生的 0 或 1 再与 10 比较。",
  },
  5: {
    type: "multi",
    question: "读入 double x 时，哪些处理正确？",
    options: ["使用 %lf 和 &x", "检查 scanf 返回值是否为 1", "使用 %f 和 x"],
    answer: ["使用 %lf 和 &x", "检查 scanf 返回值是否为 1"],
    explanation:
      "scanf 需要 double* 与 %lf，返回值为 1 才代表转换成功。未读取成功时不能使用未初始化的 x。",
  },
  6: {
    type: "debug",
    question: "分析：int i=0; while(i<3) { if(i==0) continue; i++; }",
    options: [
      "i 一直为 0，产生无限循环",
      "恰好运行 3 次",
      "continue 等同于 break",
    ],
    answer: ["i 一直为 0，产生无限循环"],
    explanation:
      "i==0 时 continue 跳过 i++，于是条件永远不改变。可在 continue 前更新，或改用更新不会被跳过的 for。",
  },
  7: {
    type: "boolean",
    question: "C99 中，修改函数的 int 形参会直接修改调用者的 int 实参。",
    options: ["正确", "错误"],
    answer: ["错误"],
    explanation:
      "普通整数参数按值传递，形参是副本。可以返回新值并在调用处赋值。数组形参的行为另有不同。",
  },
  8: {
    type: "single",
    question: "求全负数组最大值，初始 max 应设为？",
    options: ["第一个元素 a[0]", "0", "数组长度 n"],
    answer: ["第一个元素 a[0]"],
    explanation:
      "候选最大值应来自真实元素（前提 n>=1）。0 可能比所有元素都大却根本不在数组中。",
  },
  9: {
    type: "fill",
    question: "数组 2 5 1 6 3 3 中有几个严格内部峰值？",
    answer: ["2"],
    explanation:
      "5 比 2 和 1 都大，6 比 1 和 3 都大。相邻两个 3 不构成严格峰值，端点也不计。",
  },
};
