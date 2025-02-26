<div align="center">
  <img src="./BCI_Logo.png" alt="BCI Logo" width="200"/>

  # BCI2022 提交结果验证器
  # BCI2022_Evaluation_Web

  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://www.javascript.com/)
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
  [![GitHub stars](https://img.shields.io/github/stars/Jett-Wu/BCI2022_Evaluation_Web)](https://github.com/Jett-Wu/BCI2022_Evaluation_Web/stargazers)

  一个基于浏览器的 BCI2022 竞赛提交结果评估工具。支持在线评估 .mat 和 .csv 格式的预测结果文件，无需安装任何软件。

  [English](./README_EN.md) | 简体中文

  _由海南大学脑机接口技术协会开发维护_
</div>

## 📚 目录

- [功能特点](#-功能特点)
- [在线使用](#-在线使用)
- [本地部署](#-本地部署)
- [使用说明](#-使用说明)
- [技术实现](#-技术实现)
- [项目结构](#-项目结构)
- [浏览器兼容性](#-浏览器兼容性)
- [贡献指南](#-贡献指南)
- [更新日志](#-更新日志)
- [许可证](#-许可证)
- [致谢](#-致谢)

## ✨ 功能特点

- 🌐 纯浏览器端运行，无需后端服务器
- 📊 支持 .mat 和 .csv 格式文件
- ⚡ 实时计算准确率（精确到 0.00001%）
- 📱 响应式设计，支持移动端访问
- 🎨 动态 DNA 螺旋背景动画
- 🔄 支持拖拽上传文件

## 🚀 在线使用

访问 [BCI2022 评估工具](https://jett-wu.github.io/BCI2022_Evaluation_Web/) 即可开始使用。

## 💻 本地部署

1. 克隆仓库
```bash
git clone https://github.com/Jett-Wu/BCI2022_Evaluation_Web.git
```

2. 进入项目目录
```bash
cd BCI2022_Evaluation_Web
```

3. 使用本地服务器运行项目
   - 使用 VS Code Live Server 插件
   - 或使用 Python 简单服务器
```bash
python -m http.server 8000
```

## 📖 使用说明

### 文件格式要求

#### MAT 文件
- 必须包含 `test_label` 变量
- 数据长度必须为 160
- 值必须为 0 或 1

#### CSV 文件
- 必须包含 `Label` 列
- 数据长度必须为 160
- 值必须为 0 或 1

### 准确率计算方法

```python
accuracy = (true_positives + true_negatives) / total_examples
```

## 🛠 技术实现

- **前端框架**：原生 HTML5, CSS3, JavaScript (ES6+)
- **文件解析**：
  - MAT 文件：[mat4js](https://github.com/KovacsGG/mat4js)
  - CSV 文件：[Papa Parse](https://www.papaparse.com/)
- **动画效果**：Canvas API

## 📁 项目结构

```
.
├── index.html          # 主页面
├── style.css          # 样式文件
├── script.js          # 核心逻辑
├── dna-background.js  # DNA背景动画
├── mat4js.read.min.js # MAT文件解析库
├── BCI_Logo.png       # 协会Logo
├── upload-icon.svg    # 上传图标
└── README.md          # 说明文档
```

## 🌐 浏览器兼容性

- Chrome >= 80
- Firefox >= 75
- Edge >= 80
- Safari >= 13

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 📋 更新日志

### v1.1.0 (2024-03-26)
- ✨ 添加动态 DNA 螺旋背景
- 🎨 优化界面设计
- ✅ 支持任意文件名上传

### v1.0.0 (2024-03-21)
- 🎉 首次发布
- ✨ 支持 .mat 和 .csv 文件评估
- 🎯 准确率计算精度提升至 0.00001%

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 致谢

- [mat4js](https://github.com/KovacsGG/mat4js) - MAT 文件解析库
- [Papa Parse](https://www.papaparse.com/) - CSV 文件解析库

## 👥 关于我们

本项目由海南大学脑机接口技术协会开发维护。我们致力于推动脑机接口技术的研究和应用。

## 📮 联系方式

- 项目负责人：[Jett-Wu](https://github.com/Jett-Wu)
