# C Lab · C 语言学习工坊

直接使用：[C Lab 学习站](https://veryblue628.github.io/c-lab/)（无需 ChatGPT 或 GitHub 登录）。

源码仓库：[VeryBlue628/c-lab](https://github.com/VeryBlue628/c-lab)。

一个可独立部署的中文 C11 交互式学习平台。课程顺序按用户提供的 Coddy Fundamentals 目录保留，包含 9 章、63 课。讲解、练习、解析与测试用例为本项目编写。无注册、订阅、排行榜或社交模块。

## 快速启动（Windows）

需要 Node.js 20.19+ 或 22.12+，已在 Node.js 24 与 Edge 上验证。

在本目录打开 PowerShell：

```powershell
npm.cmd ci
npm.cmd run dev
```

打开终端显示的地址，默认 http://127.0.0.1:5173 。也可运行本目录的 Start-Learning.ps1，它会在缺少依赖时安装，再启动。不要直接双击 index.html，Worker 和资源请求需要 HTTP。

## 已实现

- 固定分章课程树、课程搜索、状态图标、上次学习位置恢复。
- 63 节中文课程，每节有目标、两段以上讲解、语法拆解、完整 C 示例、运行过程、易错点、知识检测、独立编程练习。
- CodeMirror 6：语法高亮、行号、缩进、括号匹配、自动闭合、基础补全、复制、清空、撤销、默认代码、字号调整、拖动调整高度、全屏。
- 真实 Clang C11 编译与 wasm-ld 链接；支持 printf、scanf 和多行标准输入。
- 编译错误与行号定位、运行错误、超时、手动停止；输出与测试结果分别展示。
- 80 道编程挑战（63 基础 + 17 Mastery）、186 个测试用例；按程序真实标准输出判题，提供逐个用例的输入、预期、实际结果。
- 384 道课程测验，覆盖单选、多选、判断、填空、输出预测、错误分析；另有 9 道变式巩固题。
- 三级提示、用户主动查看参考解、错题回顾、连续出错后的讲解推荐。
- 章节自测按首次作答评分，80% 可标记已掌握并跳过；自由探索模式允许直接访问任意课程。
- 只有本课全部知识检测和基础编程挑战都通过才标记“已完成”；跳过与完成分开统计。
- localStorage 保存草稿、进度、答题次数、正确率、提示层级及最近位置；支持 JSON 导出、校验后导入。
- 桌面三栏布局；窄屏导航抽屉与上下学习/编辑布局；键盘焦点和减少动效支持。

本轮对照原站后新增：逐题检测与恢复、Mastery 独立草稿/输入、设备中文朗读、学习路径总览、完成反馈、具体错题重练和分类错误诊断。详见 [COMPARISON.md](COMPARISON.md)。旧版已完成记录自动保留；Mastery 单独统计。

## 技术结构

React 19 + TypeScript + Vite 7 + CodeMirror 6 + Lucide。编译器使用 @runno/wasi 和 fflate，无运行代码的后端服务。

```text
src/components/           导航、课程、测验、工作台、学习记录
src/data/lessons/         分章中文讲解与示例
src/data/quizzes/         分章测验与解析
src/data/challenges/      分章题目、测试、模板、参考解和提示
src/data/reinforcement.ts 独立变式题
src/engine/               编译 Worker、调度器、输出判题器
src/services/progress.ts  进度持久化与备份校验
public/toolchain/         同源压缩 Clang、链接器、C 标准库
scripts/                  内容验证、真实编译验证、工具链恢复
```

## 编译器如何工作

1. 首次点击运行才下载本站工具链，合计约 19.2 MB；源码包已包含这些资源，无需请求第三方执行 API。
2. 在独立 Web Worker 中解压并初始化 Clang 8.0.1（WebAssembly）。
3. 用 -std=c11 -x c 编译 /main.c 为目标文件，再由 wasm-ld 与 WASI libc 链接为 WebAssembly。
4. 每个测试建立全新的 WASI 实例及虚拟文件系统，预先提供 stdin，收集 stdout/stderr。
5. 学生程序没有宿主机文件系统或网络接口；链接器限制最大线性内存为 64 MiB，栈为 1 MiB。每次执行限时 2.5 秒、输出 64 KiB；超时或停止会终止 Worker。编译限时 20 秒，首次资源初始化最多等待 120 秒。

当前判题忽略首尾及行末空白，并折叠同一行内连续空格；换行位置必须正确；不使用数值容差，数值格式需符合题目要求。相关逻辑独立于 UI，便于替换为其他编译器或判题规则。

## 测试与构建

```powershell
npm.cmd run check
npm.cmd run test:compiler
npm.cmd run test:progress
npm.cmd run test:expanded
npm.cmd run build
npm.cmd run preview
```

check 校验完整课程结构；test:compiler 在 Node Worker 中使用同一套 WebAssembly 编译器验证全部示例与参考解，不执行原生 C 程序。详细验收结果见 VALIDATION.md。

## GitHub Pages 部署

本仓库同时保留源码和已构建的 docs/，沿用数学题库的分支发布方式。Pages 配置为 main 分支、/docs 目录。访问 https://veryblue628.github.io/c-lab/ ，无需登录任何平台。

修改源码后：

```powershell
npm.cmd ci
npm.cmd run check
npm.cmd run build:github
git add src public scripts package.json package-lock.json docs README.md
git commit -m "Update C Lab"
git push origin main
```

GitHub 会自动重新发布 docs/。不要手工编辑 docs/assets/，它们由源码生成。build:github 使用 /c-lab/ 基路径；运行器将当前页面下的工具链地址传给 Worker，支持项目子路径。

普通静态主机根目录部署仍可使用 npm.cmd run build，再发布 dist/。编译完全在浏览器进行，无 API 密钥、无后端、无 ChatGPT 登录，也不需要 COOP/COEP。工具链已随仓库保存；首次使用约下载 19.2 MB。

注意：学习进度保存在当前浏览器。旧 Sites 地址和新的 GitHub Pages 地址属于不同站点，迁移时请从旧站导出进度，再到新站导入。其他设备也可以通过导入导出迁移记录。

## 当前限制

- 当前是 C Fundamentals：不包含第二阶段的指针、结构体、动态内存等专门课程。数组形参只解释必要的 C 语义。
- WASI 适合教学用标准输入输出程序，不提供真实网络、系统进程、图形界面或本机操作系统 API。仅单源文件。Clang 8.0.1 为较旧工具链，教学统一使用 C11。
- stdin 在运行前完整填写，运行中不提供交互终端输入。
- 64 MiB 限制针对学生程序的 WebAssembly 线性内存；工具链和浏览器自身仍需要额外内存，低内存手机首次编译可能较慢。
- 数据只存在当前浏览器的当前站点域名中，不自动跨设备同步。清理浏览器数据前请导出备份。
- 测试用例和参考答案在客户端，面向个人学习，不作为防作弊考试平台。系统验证输出，不静态检查是否采用题目推荐的某种算法。
- 已在本机 Edge 验证，未覆盖 Safari/iOS 真机；窄屏与横屏通过浏览器视口验证。
- 课程已通过结构、示例编译与参考解测试；没有进行独立教师审校。

## 参考

[Coddy C 目录](https://coddy.tech/landing/c)、[公开路线](https://github.com/coddytech/curriculum)。Journey 页面依赖动态加载，没有绕过访问限制。技术运行器参考 [Runno](https://github.com/taybenlor/runno) 与 [binji/wasm-clang](https://github.com/binji/wasm-clang)，第三方声明见 THIRD_PARTY.md。
