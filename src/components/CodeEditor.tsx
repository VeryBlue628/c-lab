import { useEffect, useRef } from "react";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLineGutter,
} from "@codemirror/view";
import { EditorState, Compartment } from "@codemirror/state";
import { cpp } from "@codemirror/lang-cpp";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import {
  bracketMatching,
  HighlightStyle,
  syntaxHighlighting,
  indentOnInput,
} from "@codemirror/language";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { tags } from "@lezer/highlight";
const lightHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: "#77359a" },
  { tag: tags.typeName, color: "#176744" },
  { tag: tags.string, color: "#8a5319" },
  { tag: tags.number, color: "#913675" },
  { tag: tags.comment, color: "#617168", fontStyle: "italic" },
  { tag: tags.meta, color: "#52675a" },
  { tag: tags.function(tags.variableName), color: "#245c8f" },
  { tag: tags.operator, color: "#405a4c" },
]);
const words = [
  "printf",
  "scanf",
  "puts",
  "int",
  "double",
  "float",
  "char",
  "bool",
  "const",
  "void",
  "return",
  "if",
  "else",
  "switch",
  "case",
  "default",
  "break",
  "continue",
  "for",
  "while",
  "do",
  "sizeof",
  "true",
  "false",
];
export function CodeEditor({
  value,
  onChange,
  fontSize,
  errorLine,
}: {
  value: string;
  onChange: (s: string) => void;
  fontSize: number;
  errorLine?: number;
}) {
  const host = useRef<HTMLDivElement>(null),
    view = useRef<EditorView | null>(null),
    callback = useRef(onChange),
    font = useRef(new Compartment());
  callback.current = onChange;
  useEffect(() => {
    if (!host.current) return;
    view.current = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: value,
        extensions: [
          lineNumbers(),
          highlightSpecialChars(),
          history(),
          drawSelection(),
          indentOnInput(),
          bracketMatching(),
          closeBrackets(),
          highlightActiveLine(),
          highlightActiveLineGutter(),
          cpp(),
          syntaxHighlighting(lightHighlight),
          autocompletion({
            override: [
              (context) => {
                const word = context.matchBefore(/\w*/);
                if (!word || (word.from === word.to && !context.explicit))
                  return null;
                return {
                  from: word.from,
                  options: words.map((label) => ({
                    label,
                    type: ["printf", "scanf", "puts"].includes(label)
                      ? "function"
                      : "keyword",
                  })),
                };
              },
            ],
          }),
          keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...historyKeymap,
            ...completionKeymap,
            indentWithTab,
          ]),
          EditorView.contentAttributes.of({
            "aria-label": "C 语言代码编辑器",
            spellcheck: "false",
          }),
          font.current.of(
            EditorView.theme({ "&": { fontSize: fontSize + "px" } }),
          ),
          EditorView.theme({
            "&": {
              height: "100%",
              background: "var(--panel)",
              color: "var(--text)",
            },
            ".cm-content": {
              fontFamily:
                '"Cascadia Code", "JetBrains Mono", Consolas, monospace',
              padding: "20px 0",
              caretColor: "var(--green)",
            },
            ".cm-line": { padding: "0 16px", lineHeight: "1.9" },
            ".cm-gutters": {
              background: "var(--panel)",
              color: "var(--muted)",
              border: "none",
              paddingRight: "8px",
            },
            ".cm-activeLineGutter": {
              background: "var(--surface-soft)",
              color: "var(--text-secondary)",
            },
            ".cm-activeLine": { background: "var(--surface-soft)" },
            "&.cm-focused": { outline: "none" },
            ".cm-scroller": { overflow: "auto" },
            ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
              background: "#cce5d4",
            },
            ".cm-cursor": { borderLeftColor: "var(--green)" },
            ".cm-matchingBracket": {
              background: "var(--green-dim)",
              color: "var(--green)",
            },
            ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
              background: "var(--green-dim)",
              color: "var(--text)",
            },
            ".cm-tooltip": {
              background: "var(--surface-soft)",
              color: "var(--text)",
              border: "1px solid var(--line)",
            },
          }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged)
              callback.current(update.state.doc.toString());
          }),
        ],
      }),
    });
    return () => view.current?.destroy();
  }, []);
  useEffect(() => {
    const v = view.current;
    if (v && v.state.doc.toString() !== value)
      v.dispatch({
        changes: { from: 0, to: v.state.doc.length, insert: value },
      });
  }, [value]);
  useEffect(() => {
    view.current?.dispatch({
      effects: font.current.reconfigure(
        EditorView.theme({ "&": { fontSize: fontSize + "px" } }),
      ),
    });
  }, [fontSize]);
  useEffect(() => {
    const v = view.current;
    if (v && errorLine && errorLine <= v.state.doc.lines) {
      const l = v.state.doc.line(errorLine);
      v.dispatch({
        selection: { anchor: l.from, head: l.to },
        effects: EditorView.scrollIntoView(l.from, { y: "center" }),
      });
    }
  }, [errorLine]);
  return <div className="code-editor" ref={host} />;
}
