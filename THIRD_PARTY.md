# Third-party components

C Lab includes React, CodeMirror and Lezer packages, Lucide, @runno/wasi, fflate, and their dependencies. Copies of installed package license notices are in public/licenses/ and are included in the static build.

The C toolchain is distributed by Runno from binji/wasm-clang:

- https://runno.dev/langs/clang.wasm
- https://runno.dev/langs/wasm-ld.wasm
- https://runno.dev/langs/clang-fs.tar.gz
- https://github.com/taybenlor/runno
- https://github.com/binji/wasm-clang (Apache-2.0)
- https://github.com/llvm/llvm-project/tree/llvmorg-8.0.1 (LLVM 8.0.1 notices)
- https://github.com/WebAssembly/wasi-libc (multiple component licenses)

The compiler and linker binaries are unmodified apart from lossless gzip compression for transport. Original-file SHA-256 values are recorded in public/toolchain/manifest.json. Upstream toolchain license texts and component notices are included in public/licenses/.

Coddy course titles and sequence were used as a curriculum reference; this application does not bundle Coddy logos or proprietary course text. Chinese explanations, exercises and test cases were authored for this project.
