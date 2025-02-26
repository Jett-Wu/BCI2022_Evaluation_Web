let submissionData = null;

// 将答案数据存储为常量
const TRUE_DATA = [[1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0]];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('submissionFile');

    // 处理拖拽事件
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // 添加视觉反馈
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragover');
        });
    });

    // 处理文件拖放
    uploadArea.addEventListener('drop', handleDrop);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        fileInput.files = dt.files;
        
        // 触发change事件以处理文件
        const event = new Event('change');
        fileInput.dispatchEvent(event);
    }

    // 保持原有的文件选择处理逻辑
    fileInput.addEventListener('change', async function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // 清除之前的错误提示和结果显示
        clearErrorMessage();
        const resultsDiv = document.getElementById('results');
        resultsDiv.style.display = 'none';
        
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        try {
            if (fileExtension === 'csv') {
                await readCsvFile(file);
            } else if (fileExtension === 'mat') {
                await readMatFile(file);
            } else {
                throw new Error('不支持的文件格式：请上传.mat或.csv文件');
            }
            
            // 文件读取成功后进行比较
            await compareFiles();
            
        } catch (error) {
            showErrorMessage(error.message);
            // 清除文件选择
            e.target.value = '';
        }
    });
});

/**
 * 读取MAT文件
 * @param {File} file - MAT文件对象
 */
async function readMatFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async function(event) {
            try {
                const buffer = event.target.result;
                const matResult = mat4js.read(buffer);
                
                // 检查MAT文件的数据格式
                if (!matResult.data || !matResult.data.test_label) {
                    throw new Error('MAT文件格式错误：未找到test_label变量');
                }

                // 获取test_label数据
                let testLabel = matResult.data.test_label;

                // 确保数据是一维数组
                if (Array.isArray(testLabel) && Array.isArray(testLabel[0])) {
                    testLabel = testLabel.flat();
                }
                
                submissionData = testLabel;

                // 验证数据长度
                if (submissionData.length !== 160) {
                    throw new Error(`数据长度不正确: 期望160，实际${submissionData.length}`);
                }

                resolve();
            } catch (error) {
                reject(new Error(`MAT文件处理失败: ${error.message}`));
            }
        };
        reader.onerror = () => reject(new Error('文件读取失败'));
        reader.readAsArrayBuffer(file);
    });
}

/**
 * 读取CSV文件
 * @param {File} file - CSV文件对象
 */
function readCsvFile(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                try {
                    if (!results.data || results.data.length < 2) {
                        throw new Error('CSV文件格式错误：数据不能为空');
                    }

                    // 从CSV数据中提取Label列的值
                    submissionData = results.data
                        .map(row => row.Label)
                        .filter(cell => cell !== undefined && cell !== '')
                        .map(cell => {
                            const num = parseInt(cell, 10);
                            if (isNaN(num)) {
                                throw new Error(`CSV格式错误：无法将 "${cell}" 转换为数字`);
                            }
                            return num;
                        });
                    
                    // 验证数据长度
                    if (submissionData.length !== 160) {
                        throw new Error(`数据长度不正确: 期望160，实际${submissionData.length}`);
                    }

                    resolve();
                } catch (error) {
                    reject(new Error(`CSV数据处理失败: ${error.message}`));
                }
            },
            error: (error) => {
                reject(new Error(`CSV文件解析失败: ${error.message}`));
            }
        });
    });
}

/**
 * 比较文件内容
 */
async function compareFiles() {
    try {
        console.log('答案数据:', TRUE_DATA);
        console.log('提交数据:', submissionData);
        
        const accuracy = calculateAccuracy(TRUE_DATA, submissionData);
        displayResults(accuracy);
    } catch (error) {
        console.error('比较过程错误:', error);
        alert(`比较过程错误: ${error.message}`);
    }
}

/**
 * 计算准确率
 * @param {Array} truth - 真实数据
 * @param {Array} submission - 提交数据
 * @returns {number} - 准确率（0-1之间）
 */
function calculateAccuracy(truth, submission) {
    try {
        if (!truth || !submission) {
            throw new Error('数据不完整');
        }

        // 将二维数组转换为一维数组
        const truthArray = truth.flat();

        // 验证数据长度
        if (truthArray.length !== 160 || submission.length !== 160) {
            throw new Error(`数据长度不正确: 答案长度=${truthArray.length}, 提交长度=${submission.length}`);
        }

        console.log('答案数据（前5个）:', truthArray.slice(0, 5));
        console.log('提交数据（前5个）:', submission.slice(0, 5));

        // 计算true positives和true negatives
        let truePositives = 0;
        let trueNegatives = 0;
        
        for (let i = 0; i < truthArray.length; i++) {
            if (truthArray[i] === 1 && submission[i] === 1) {
                truePositives++;
            } else if (truthArray[i] === 0 && submission[i] === 0) {
                trueNegatives++;
            }
        }

        // 计算准确率
        const accuracy = (truePositives + trueNegatives) / truthArray.length;
        
        // 保留6位小数
        return Math.round(accuracy * 1000000) / 1000000;
    } catch (error) {
        throw new Error(`计算准确率失败: ${error.message}`);
    }
}

/**
 * 显示比较结果
 * @param {number} accuracy - 准确率
 */
function displayResults(accuracy) {
    const resultsDiv = document.getElementById('results');
    const accuracyP = document.getElementById('accuracy');
    const submitTimeP = document.getElementById('submit-time');
    
    resultsDiv.style.display = 'block';
    
    // 设置准确率颜色
    let colorClass = '';
    if (accuracy >= 0.7) {
        colorClass = 'accuracy-high';
    } else if (accuracy >= 0.4) {
        colorClass = 'accuracy-medium';
    } else {
        colorClass = 'accuracy-low';
    }
    
    // 移除旧的颜色类
    accuracyP.classList.remove('accuracy-high', 'accuracy-medium', 'accuracy-low');
    // 添加新的颜色类
    accuracyP.classList.add(colorClass);
    
    // 显示准确率
    accuracyP.textContent = `准确率: ${(accuracy * 100).toFixed(6)}%`;

    // 显示提交时间
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    submitTimeP.textContent = `提交时间: ${timeString}`;
}

function showErrorMessage(message) {
    let errorDiv = document.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        document.querySelector('.upload-box').appendChild(errorDiv);
    }
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;
}

function clearErrorMessage() {
    const errorDiv = document.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

async function validateCSVFormat(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete: function(results) {
                // 检查CSV数据格式是否正确
                if (!results.data || results.data.length < 2) {
                    reject(new Error('CSV文件格式错误：数据不能为空'));
                    return;
                }
                
                // 这里添加更多的CSV格式验证逻辑
                // 例如检查列数、数据类型等
                
                resolve(results);
            },
            error: function(error) {
                reject(new Error('CSV文件解析错误：' + error.message));
            }
        });
    });
}

async function validateMATFormat(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                const data = await mat4js.read(e.target.result);
                
                // 检查MAT文件的数据格式是否正确
                if (!data || typeof data !== 'object') {
                    reject(new Error('MAT文件格式错误：无法读取数据'));
                    return;
                }
                
                // 这里添加更多的MAT格式验证逻辑
                // 例如检查必要的变量是否存在、数据维度是否正确等
                
                resolve(data);
            } catch (error) {
                reject(new Error('MAT文件解析错误：' + error.message));
            }
        };
        reader.onerror = function() {
            reject(new Error('文件读取错误'));
        };
        reader.readAsArrayBuffer(file);
    });
} 