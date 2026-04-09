# SBTI 微信小程序 

## 功能
- 首页 -> 答题页 -> 结果页完整流程
- 31 题主流程（30 常规题 + 1 随机插入补充题）
- 饮酒分支触发隐藏人格 `DRUNK`
- 15 维评分、主类型匹配、Top3 匹配列表
- 低匹配度兜底人格 `HHHH`

## 运行
1. 用微信开发者工具导入当前目录 `/Users/chengzheng/projects/sbti`
2. 使用测试号 AppID 或替换 `project.config.json` 中的 `appid`
3. 编译后从首页点击“开始测试”

## 关键文件
- `utils/sbti-data.js`: 题库、人格库、维度解释、匹配模板
- `utils/sbti.js`: 评分和人格匹配算法
- `pages/quiz/*`: 答题流程与动态进度
- `pages/result/*`: 结果展示与维度分析

## 说明
- 该项目为娱乐向人格测试实现，参考了 `https://sbti.unun.dev/` 的流程结构。
- 文案做了适度改写与精简，便于移动端阅读。

## GitHub Pages 发布
- 已提供可直接发布的 H5 目录：`docs/`
- 入口文件：`docs/index.html`
- 静态资源：`docs/assets/type-images/*`

### 开启步骤
1. 推送代码到 GitHub 仓库
2. 打开仓库 `Settings -> Pages`
3. `Build and deployment` 选择 `Deploy from a branch`
4. `Branch` 选择你的分支（如 `main`），目录选择 `/docs`
5. 保存后等待 1-3 分钟，访问生成的 `https://<username>.github.io/<repo>/`

### H5 版本说明
- 逻辑与当前小程序一致：单题自动下一题、饮酒隐藏分支、15 维度评分、人格匹配与 Top3
- 结果页使用本地人格图片，不依赖外链
