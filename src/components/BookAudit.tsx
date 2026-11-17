import { useMemo, useState } from "react";
import audit from "../data/page-review.json";
import { lessonById } from "../data/runtime-curriculum";

export function BookAudit({ onSelect }: { onSelect: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [chapter, setChapter] = useState("all");
  const [offset, setOffset] = useState(0);
  const matches = useMemo(
    () =>
      audit.pages.filter((p) => {
        const text = query.trim();
        return (
          (chapter === "all" || p.chapter === Number(chapter)) &&
          (!text ||
            (/^\d+$/.test(text)
              ? p.page === Number(text)
              : `${p.topic} ${p.result}`
                  .toLowerCase()
                  .includes(text.toLowerCase())))
        );
      }),
    [query, chapter],
  );
  const visible = matches.slice(offset, offset + 12);
  return (
    <details className="textbook-chapter">
      <summary>全文逐页核对：已审 {audit.sourcePages} 个 PDF 页面</summary>
      <p>
        书内第 {audit.reviewedFrom}—{audit.reviewedTo}{" "}
        页（含正文、习题、附录及参考文献），另含前置页与封底。审阅日期：
        {audit.reviewedOn}。
      </p>
      <p>{audit.method}</p>
      <p>{audit.scope}</p>
      <div className="book-audit-controls">
        <label>
          查找页码或主题
          <input
            type="search"
            value={query}
            placeholder="例如：285、变长数组、EOF"
            onChange={(e) => {
              setQuery(e.target.value);
              setOffset(0);
            }}
          />
        </label>
        <label>
          教材章节
          <select
            value={chapter}
            onChange={(e) => {
              setChapter(e.target.value);
              setOffset(0);
            }}
          >
            <option value="all">全部章节</option>
            {audit.chapters.map((c) => (
              <option key={c.number} value={c.number}>
                {c.number === 11
                  ? "附录与参考文献"
                  : `第 ${c.number} 章 · ${c.title}`}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p role="status">
        找到 {matches.length} 页
        {matches.length > 0 &&
          `，显示第 ${offset + 1}—${Math.min(offset + 12, matches.length)} 条`}
        。
      </p>
      {visible.map((p) => (
        <div className="page-review-row" key={p.page}>
          <strong>
            书内第 {p.page} 页 · {p.topic}
          </strong>
          <small>PDF 第 {p.pdfPage} 页</small>
          <p>{p.result}</p>
          <div>
            {p.lessons.map((id) => (
              <button
                className="text-button"
                key={id}
                onClick={() => onSelect(id)}
              >
                {lessonById[id].title} →
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="book-audit-pager">
        <button
          className="text-button"
          disabled={offset === 0}
          onClick={() => setOffset((n) => Math.max(0, n - 12))}
        >
          上一组
        </button>
        <button
          className="text-button"
          disabled={offset + 12 >= matches.length}
          onClick={() => setOffset((n) => n + 12)}
        >
          下一组
        </button>
      </div>
      <details className="book-audit-front">
        <summary>前置页与封底（24 页）</summary>
        {[...audit.frontMatter, ...audit.backMatter].map((p) => (
          <p key={p.pdfPage}>
            PDF 第 {p.pdfPage} 页 · {p.topic}
          </p>
        ))}
      </details>
    </details>
  );
}

const reference = [
  [
    "C99 关键字",
    "auto break case char const continue default do double else enum extern float for goto if inline int long register restrict return short signed sizeof static struct switch typedef union unsigned void volatile while _Bool _Complex _Imaginary。",
    "c10-3",
  ],
  [
    "ASCII 与字节",
    "ASCII 标准为0..127，共128个编码。数字48..57，大写65..90，小写97..122；换行10，字符串末尾零0。UTF-8 中文通常由多个字节表示。",
    "c2-4",
  ],
  [
    "运算符优先级",
    "高→低：后缀调用/下标/成员/++/--；一元/sizeof；乘除余；加减；移位；关系；相等；位与；位异或；位或；逻辑与；逻辑或；条件；赋值；逗号。结合性决定分组，不决定实参求值顺序。",
    "c10-7",
  ],
  [
    "变长数组 VLA",
    "C99 支持块作用域 int a[n]；先验证正长度和合理容量，不可带初始化列表。sizeof 数组与 sizeof 指针有区别。",
    "c18-1",
  ],
  [
    "printf / scanf",
    "stdio.h。printf %f 接收 double，%Lf 接收 long double，%zu 对应 size_t，%td 对应 ptrdiff_t，%p 对应 void*。scanf %f→float*，%lf→double*；返回成功赋值项数。",
    "c20-2",
  ],
  [
    "snprintf",
    "stdio.h：int snprintf(char *restrict dst,size_t n,const char *restrict format,...); 返回完整输出原需字符数（不含零），负数表示编码错误。返回值≥n意味着截断。",
    "c20-3",
  ],
  [
    "strncpy / strcpy / strcat",
    "string.h。目标必须有容量并避免重叠。strncpy(dst,src,n) 源短时补零到n，源长时不保证零终止；不是自动安全的 strcpy。",
    "c20-3",
  ],
  [
    "strlen / strcmp",
    "string.h。size_t strlen(const char *s) 不含末尾零；strcmp 比较 unsigned char 的字符序，只保证结果为负、零或正。",
    "c11-4",
  ],
  [
    "strchr / strstr",
    "string.h：char *strchr(const char *s,int c); char *strstr(const char *s,const char *sub); 返回源串内部指针，未找到为NULL，使用前先检查。",
    "c20-5",
  ],
  [
    "strtol / errno",
    "stdlib.h：long strtol(const char *restrict s,char **restrict end,int base); 清 errno 后调用，检查无数字、未消费字符及 ERANGE，再检查业务范围。",
    "c20-4",
  ],
  [
    "ctype 字符分类",
    "ctype.h 的 isalpha/isdigit/isspace 等接受 EOF 或 unsigned char 可表示值；返回真只保证非零。char 数组字节先转 unsigned char。toupper/tolower 用于标准大小写转换。",
    "c16-3",
  ],
  [
    "数学库",
    "math.h：sqrt(x≥0)、log(x>0)、sin/cos（弧度）、atan2(y,x)、fabs(double)、floor、fmod、pow。abs(int) 在 stdlib.h，INT_MIN 的绝对值可能不可表示。",
    "c20-6",
  ],
  [
    "rand / srand",
    "stdlib.h：int rand(void); void srand(unsigned seed); 范围0..RAND_MAX。不同实现不保证相同序列，取模可能有偏差，不用于安全令牌。",
    "c20-6",
  ],
  [
    "数学函数完整索引",
    "math.h：acos、asin（输入−1..1）、atan、atan2(y,x)、cos、sin、tan（弧度）、cosh、sinh、tanh、exp、log/log10（输入>0）、fabs、floor、fmod(x,y)（y非零）、frexp、modf、pow、sqrt。负底数配非整数指数、零作负次幂等需要单独检查定义域。abs/rand 位于 stdlib.h。",
    "c20-6",
  ],
  [
    "frexp / modf / fmod",
    "double frexp(double x,int *exp) 把 x 分解为 fraction×2^exp，非零有限数的 |fraction| 在[0.5,1)，零的两个结果均为0。double modf(double x,double *integer) 把向零截断的整数部分写入指针并返回同号小数部分。fmod 返回按向零商计算的浮点余数；% 运算符只适合整数。",
    "c20-6",
  ],
  [
    "ctype 函数完整索引",
    "isalnum（字母或数字）、isalpha、iscntrl、isdigit、isgraph（可打印且非空格）、islower、isprint、ispunct、isspace、isupper、isxdigit；tolower/toupper 转换大小写。分类受相应字符集与 locale 规则约束；不要从某个ASCII例子推断所有执行环境。",
    "c16-3",
  ],
  [
    "malloc / calloc / free",
    "stdlib.h：void *malloc(size_t size); void *calloc(size_t count,size_t size); void free(void *p); 检查失败和尺寸乘法，free(NULL)可用，释放后不可访问别名。",
    "c13-10",
  ],
  [
    "realloc",
    "stdlib.h：void *realloc(void *p,size_t size); 可搬迁，失败时原块保留。使用临时指针接收，不直接覆盖唯一原指针；避免依赖零大小的实现差异。",
    "c13-11",
  ],
  [
    "指针边界 / NULL",
    "指针算术限制在同一数组及一过尾；一过尾不可解引用。NULL不是可访问的地址零对象，void*不是NULL的同义词。二维数组保留行边界，不能当int**。",
    "c13-4",
  ],
  [
    "fopen / fclose",
    "stdio.h。r要求存在，w创建或截断，a创建或追加，+允许更新，b为二进制模式。fopen失败NULL；fclose成功0、失败EOF。更新流切换方向需刷新或定位。",
    "c20-9",
  ],
  [
    "fgets / fputs / puts",
    "fgets(dst,n,stream) 至多读n−1字符，保留遇到的换行并补零，返回dst或NULL。fputs不自动换行；puts自动加换行；成功返回非负，失败EOF。",
    "c15-3",
  ],
  [
    "fread / fwrite",
    "stdio.h：size_t fread(void *restrict p,size_t size,size_t count,FILE *restrict f); fwrite 源参数为 const void*。返回完成项数，短读需检查 EOF/错误。结构体原样文件依赖布局。",
    "c15-5",
  ],
  [
    "fseek / ftell / rewind",
    "fseek(FILE*,long,int) 成功0；ftell(FILE*) 返回 long 位置标记，失败−1L。使用 SEEK_SET/CUR/END 名称，不假定数值。文本位置有额外限制。rewind回头并清错误/EOF。",
    "c15-6",
  ],
  [
    "feof / ferror / clearerr",
    "读取返回值驱动循环；EOF为负int常量。feof/ferror 查询粘滞状态，真只保证非零。clearerr清两标志但不定位；成功fseek清EOF不清错误。",
    "c15-7",
  ],
  [
    "头文件 / 非标准接口",
    "limits.h/float.h查范围；stddef.h查size_t/ptrdiff_t；stdbool.h提供bool；stdint.h/inttypes.h提供整数接口。gets不适合有界输入；strlwr/strupr/getw/putw/open/read/write非ISO C99接口。本沙箱不宣称支持全部可选能力。",
    "c16-3",
  ],
];
export function LibraryReference({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const rows = reference.filter((r) =>
    r.join(" ").toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <details className="textbook-reference">
      <summary>随手查：C99 关键字、运算符与标准库</summary>
      <label className="reference-search">
        查找接口或规则
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例如：strncpy、size_t、EOF"
        />
      </label>
      <p role="status">{rows.length} 条匹配</p>
      {rows.map(([name, note, id]) => (
        <div className="library-reference-row" key={name}>
          <strong>{name}</strong>
          <p>{note}</p>
          <button className="text-button" onClick={() => onSelect(id)}>
            进入配套练习 →
          </button>
        </div>
      ))}
    </details>
  );
}
