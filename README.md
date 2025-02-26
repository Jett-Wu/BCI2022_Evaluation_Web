<div align="center">
  <img src="./BCI_Logo.png" alt="BCI Logo" width="200"/>

  # BCI2022_Evaluation_Web

  [![Static Badge](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://www.javascript.com/)
  [![Static Badge](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

  一个基于浏览器的 BCI2022 竞赛提交结果评估工具。支持在线评估 .mat 和 .csv 格式的预测结果文件，无需安装任何软件。

  _由海南大学脑机接口技术协会开发维护_
</div>

## 功能特点

- 🌐 纯浏览器端运行，无需后端服务器
- 📊 支持 .mat 和 .csv 格式文件
- ⚡ 实时计算准确率（精确到 0.00001%）
- 📱 响应式设计，支持移动端访问

## 使用方法

1. 访问网页
2. 点击上传按钮选择要验证的文件（.mat 或 .csv 格式）
3. 系统会自动计算并显示准确率结果

### 文件格式要求

#### MAT 文件
- 必须包含 `test_label` 变量
- 数据长度必须为 160
- 值必须为 0 或 1

#### CSV 文件
- 必须包含 `Label` 列
- 数据长度必须为 160
- 值必须为 0 或 1

## 准确率计算方法

```
accuracy = (true positives + true negatives) / total examples
```

其中：
- true positives：预测值和真实值都为 1 的样本数
- true negatives：预测值和真实值都为 0 的样本数
- total examples：总样本数（160）

## 技术实现

- 前端：HTML5, CSS3, JavaScript (ES6+)
- MAT 文件解析：[mat4js](https://github.com/KovacsGG/mat4js)
- CSV 文件解析：[Papa Parse](https://www.papaparse.com/)

## 本地部署

1. 克隆仓库
```bash
git clone https://github.com/Jett-Wu/BCI2022_Evaluation_Web.git
```

2. 进入项目目录
```bash
cd BCI2022_Evaluation_Web
```

3. 使用本地服务器运行项目（例如 VS Code 的 Live Server 插件）

## 项目结构

```
.
├── index.html          # 主页面
├── style.css          # 样式文件
├── script.js          # 核心逻辑
├── mat4js.read.min.js # MAT文件解析库
├── BCI_Logo.png       # 协会Logo
└── README.md          # 说明文档
```

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Edge 80+
- Safari 13+

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目。

1. Fork 本仓库
2. 创建新分支
3. 提交更改
4. 发起 Pull Request

## 致谢

- [mat4js](https://github.com/KovacsGG/mat4js) - MAT 文件解析库
- [Papa Parse](https://www.papaparse.com/) - CSV 文件解析库

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 作者

[Jett-Wu](https://github.com/Jett-Wu)

## 更新日志

### v1.0.0 (2024-03-21)
- 🎉 首次发布
- ✨ 支持 .mat 和 .csv 文件评估
- 🎯 准确率计算精度提升至 0.00001%

## 关于我们

本项目由海南大学脑机接口技术协会开发维护。我们致力于推动脑机接口技术的研究和应用。
