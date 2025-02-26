<div align="center">
  <img src="./BCI_Logo.png" alt="BCI Logo" width="200"/>

  # BCI2022 Submission Validator
  # BCI2022_Evaluation_Web

  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://www.javascript.com/)
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
  [![GitHub stars](https://img.shields.io/github/stars/Jett-Wu/BCI2022_Evaluation_Web)](https://github.com/Jett-Wu/BCI2022_Evaluation_Web/stargazers)

  A browser-based evaluation tool for BCI2022 competition submissions. Supports online validation of .mat and .csv prediction files without any software installation.

  [简体中文](./README.md) | English

  _Developed and maintained by Hainan University Brain-Computer Interface Association_
</div>

## 📚 Table of Contents

- [Features](#-features)
- [Online Usage](#-online-usage)
- [Local Deployment](#-local-deployment)
- [Usage Guide](#-usage-guide)
- [Technical Implementation](#-technical-implementation)
- [Project Structure](#-project-structure)
- [Browser Compatibility](#-browser-compatibility)
- [Contributing](#-contributing)
- [Changelog](#-changelog)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## ✨ Features

- 🌐 Pure browser-side operation, no backend server required
- 📊 Support for .mat and .csv file formats
- ⚡ Real-time accuracy calculation (precise to 0.00001%)
- 📱 Responsive design, mobile-friendly
- 🎨 Dynamic DNA helix background animation
- 🔄 Drag and drop file upload support

## 🚀 Online Usage

Visit [BCI2022 Evaluation Tool](https://jett-wu.github.io/BCI2022_Evaluation_Web/) to start using.

## 💻 Local Deployment

1. Clone the repository
```bash
git clone https://github.com/Jett-Wu/BCI2022_Evaluation_Web.git
```

2. Enter project directory
```bash
cd BCI2022_Evaluation_Web
```

3. Run with a local server
   - Use VS Code Live Server plugin
   - Or use Python simple server
```bash
python -m http.server 8000
```

## 📖 Usage Guide

### File Format Requirements

#### MAT Files
- Must contain `test_label` variable
- Data length must be 160
- Values must be 0 or 1

#### CSV Files
- Must contain `Label` column
- Data length must be 160
- Values must be 0 or 1

### Accuracy Calculation Method

```python
accuracy = (true_positives + true_negatives) / total_examples
```

## 🛠 Technical Implementation

- **Frontend**: Native HTML5, CSS3, JavaScript (ES6+)
- **File Parsing**:
  - MAT files: [mat4js](https://github.com/KovacsGG/mat4js)
  - CSV files: [Papa Parse](https://www.papaparse.com/)
- **Animation**: Canvas API

## 📁 Project Structure

```
.
├── index.html          # Main page
├── style.css          # Style sheet
├── script.js          # Core logic
├── dna-background.js  # DNA background animation
├── mat4js.read.min.js # MAT file parser
├── BCI_Logo.png       # Association logo
├── upload-icon.svg    # Upload icon
└── README.md          # Documentation
```

## 🌐 Browser Compatibility

- Chrome >= 80
- Firefox >= 75
- Edge >= 80
- Safari >= 13

## 🤝 Contributing

Contributions via Issues and Pull Requests are welcome!

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push branch: `git push origin feature/AmazingFeature`
5. Submit a Pull Request

## 📋 Changelog

### v1.1.0 (2024-03-26)
- ✨ Added dynamic DNA helix background
- 🎨 Optimized interface design
- ✅ Added support for arbitrary file names

### v1.0.0 (2024-03-21)
- 🎉 Initial release
- ✨ Support for .mat and .csv file evaluation
- 🎯 Improved accuracy calculation precision to 0.00001%

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [mat4js](https://github.com/KovacsGG/mat4js) - MAT file parsing library
- [Papa Parse](https://www.papaparse.com/) - CSV parsing library

## 👥 About Us

This project is developed and maintained by the Hainan University Brain-Computer Interface Association. We are dedicated to advancing research and applications in brain-computer interface technology.

## 📮 Contact

- Project Maintainer: [Jett-Wu](https://github.com/Jett-Wu) 