let submissionData = null;

// 将答案数据存储为常量
const TRUE_DATA = [[1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0]];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submissionFile').addEventListener('change', handleSubmissionFile);
});

/**
 * 处理提交文件的上传
 */
async function handleSubmissionFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        // 清除之前的结果显示
        const resultsDiv = document.getElementById('results');
        resultsDiv.style.display = 'none';
        
        // 验证文件名
        if (file.name !== 'submission.mat' && file.name !== 'submission.csv') {
            throw new Error('文件名错误：请确保文件名为 submission.mat 或 submission.csv');
        }
        
        if (file.name === 'submission.mat') {
            await readMatFile(file);
        } else if (file.name === 'submission.csv') {
            await readCsvFile(file);
        }
        
        // 直接进行比较
        await compareFiles();
    } catch (error) {
        console.error('文件处理错误:', error);
        alert(`文件处理错误: ${error.message}`);
        
        // 清空文件输入框，允许重新选择文件
        const fileInput = document.getElementById('submissionFile');
        fileInput.value = '';
    }
}

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
                console.log('读取到的文件大小:', buffer.byteLength, '字节');
                
                // 使用mat4js读取MAT文件
                const matResult = mat4js.read(buffer);
                console.log('MAT文件解析结果:', matResult);
                
                // 检查header
                console.log('MAT文件头部:', matResult.header);
                
                // 提取test_label数据
                if (!matResult.data || !matResult.data.test_label) {
                    throw new Error('未找到test_label变量');
                }

                // 获取test_label数据
                let testLabel = matResult.data.test_label;
                console.log('原始test_label数据:', testLabel);

                // 确保数据是一维数组
                if (Array.isArray(testLabel) && Array.isArray(testLabel[0])) {
                    testLabel = testLabel.flat();
                }
                
                submissionData = testLabel;

                // 验证数据长度
                if (submissionData.length !== 160) {
                    throw new Error(`数据长度不正确: 期望160，实际${submissionData.length}`);
                }

                console.log('MAT文件读取成功:', submissionData);
                console.log('数据长度:', submissionData.length);
                console.log('数据样例（前5个）:', submissionData.slice(0, 5));
                resolve();
            } catch (error) {
                console.error('MAT文件处理详细错误:', error);
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
            header: true, // CSV有表头
            complete: (results) => {
                try {
                    // 从CSV数据中提取Label列的值
                    submissionData = results.data
                        .map(row => row.Label) // 获取Label列
                        .filter(cell => cell !== undefined && cell !== '') // 移除空值
                        .map(cell => {
                            // 转换为数字
                            const num = parseInt(cell, 10);
                            if (isNaN(num)) {
                                console.error('无法转换的值:', cell);
                                throw new Error(`无法将 "${cell}" 转换为数字`);
                            }
                            return num;
                        });
                    
                    // 验证数据长度
                    if (submissionData.length !== 160) {
                        throw new Error(`数据长度不正确: 期望160，实际${submissionData.length}`);
                    }

                    console.log('CSV文件读取成功:', submissionData);
                    console.log('数据长度:', submissionData.length);
                    console.log('数据样例（前5个）:', submissionData.slice(0, 5));
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
    
    resultsDiv.style.display = 'block';
    
    // 根据准确率设置不同的颜色
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
    
    // 显示准确率，保留6位小数
    accuracyP.textContent = `准确率: ${(accuracy * 100).toFixed(6)}%`;
} 