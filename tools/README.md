# 验证脚本

这些脚本用于在真实浏览器中对系统做端到端回归(Playwright + 本机 Chrome)。

```bash
npm run dev                     # 先启动开发服务器(默认 127.0.0.1:5173)

node tools/measureTest.ts       # 无需浏览器:瓣环重建精度回归(比对解析解)
node tools/releasecheck.ts      # 无需浏览器:虚拟释放 / 冠脉净距的物理量核对
node tools/genseed.ts           # 重新生成 src/data/seedCases.ts(修改体模或算法后运行)

node tools/final.mjs            # 完整流程:导入体模→勾画→释放→提交→审核→统计→讨论单
node tools/dicomcheck.mjs       # DICOM 导入(先生成序列:node tools/make_dicom.mjs)
node tools/responsive.mjs       # 四种宽度的横向溢出检查
node tools/anglecheck.ts        # 钙化钟点与真实解剖角度的对齐检查
```

TS 脚本用 `npx esbuild <file>.ts --bundle --platform=node --format=esm --outfile=<file>.mjs` 打包后运行。
修改体模或测量算法后,务必重新运行 `genseed.ts` 并检查 `measureTest.ts` 的误差输出。
