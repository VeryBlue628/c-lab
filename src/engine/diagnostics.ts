import type { Execution } from "./types";
export function diagnose(run: Execution | undefined) {
  if (!run) return "";
  const text = run.stderr;
  if (run.status === "timeout")
    return "检查循环变量是否更新、continue 是否跳过更新、递归是否逼近出口。";
  if (/expected ';'|expected.*semicolon/i.test(text))
    return "编译器在等待分号。也检查上一行是否遗漏语句结束符。";
  if (/undeclared|not declared/i.test(text))
    return "名称没有声明。核对拼写和大小写，并保证声明在使用之前可见。";
  if (/expected.*[)}]|unterminated/i.test(text))
    return "检查括号、引号或注释是否成对闭合，错误也可能来自上一行。";
  if (/format|incompatible/i.test(text))
    return "核对类型与格式：printf 的 %d 对应 int；scanf 的 double 要用 %lf 和地址。";
  if (run.status === "runtime-error")
    return "检查数组边界、零除数、递归深度以及输入读取是否成功。";
  if (run.status === "compile-error")
    return "从第一条编译诊断开始修复，然后重新编译；后续错误可能由第一处引起。";
  return "";
}
