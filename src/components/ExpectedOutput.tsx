import { useId, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Lesson } from "../data/types";

export function ExpectedOutput({
  challenge,
}: {
  challenge: Lesson["challenge"];
}) {
  const [selected, setSelected] = useState(0);
  const heading = useId();
  const test = challenge.tests[selected] ?? challenge.tests[0];
  if (!test) return null;
  const files = { ...challenge.files, ...test.files };
  const args = test.args ?? challenge.args ?? [];
  return (
    <section className="expected-output-panel" aria-labelledby={heading}>
      <div className="expected-output-heading">
        <h2 id={heading}>
          <CheckCircle2 size={16} />
          预计输出结果
        </h2>
        {challenge.tests.length > 1 ? (
          <select
            aria-label="预计输出测试用例"
            value={selected}
            onChange={(e) => setSelected(Number(e.target.value))}
          >
            {challenge.tests.map((_, i) => (
              <option key={i} value={i}>
                测试用例 {i + 1}
              </option>
            ))}
          </select>
        ) : (
          <span>测试用例 1</span>
        )}
      </div>
      <p className="expected-output-note">
        运行前即可对照；以下结果仅对应所选测试用例。
      </p>
      <div className="expected-output-input">
        <h3>对应输入</h3>
        <pre tabIndex={0}>{test.input || "（无标准输入）"}</pre>
      </div>
      {(Object.keys(files).length > 0 || args.length > 0) && (
        <details className="expected-output-context">
          <summary>查看本用例的预置文件与程序参数</summary>
          {args.length > 0 && (
            <>
              <h3>程序参数</h3>
              <pre tabIndex={0}>{JSON.stringify(args, null, 2)}</pre>
            </>
          )}
          {Object.entries(files).map(([name, content]) => (
            <div key={name}>
              <h3>输入文件：{name}</h3>
              <pre tabIndex={0}>{content || "（空文件）"}</pre>
            </div>
          ))}
        </details>
      )}
      <div className="expected-output-value">
        <h3>标准输出 stdout</h3>
        <pre tabIndex={0} aria-label="预计标准输出">
          {test.output || "（无标准输出）"}
        </pre>
      </div>
      {Object.entries(test.expectedFiles || {}).map(([name, content]) => (
        <div className="expected-output-file" key={name}>
          <h3>输出文件：{name}</h3>
          <pre tabIndex={0}>{content || "（空文件）"}</pre>
        </div>
      ))}
      {test.exact && (
        <p className="expected-output-note">
          本用例精确校验空格、换行及末尾换行。
        </p>
      )}
    </section>
  );
}
