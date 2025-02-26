class DNABackground {
    constructor() {
        this.canvas = document.getElementById('dnaBackground');
        this.ctx = this.canvas.getContext('2d');
        this.dnaStrands = [];
        this.initialize();
    }

    initialize() {
        // 设置canvas尺寸
        this.resize();
        // 监听窗口大小变化
        window.addEventListener('resize', () => this.resize());
        // 创建DNA链
        this.createStrands();
        // 开始动画
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStrands() {
        const numStrands = Math.floor(window.innerWidth / 200);
        this.dnaStrands = [];

        for (let i = 0; i < numStrands; i++) {
            this.dnaStrands.push({
                x: (this.canvas.width / (numStrands + 1)) * (i + 1),
                y: Math.random() * this.canvas.height,
                amplitude: 40 + Math.random() * 20,
                wavelength: 150 + Math.random() * 50,
                speed: 0.3 + Math.random() * 0.3,
                offset: Math.random() * Math.PI * 2
            });
        }
    }

    drawStrand(strand, time) {
        const ctx = this.ctx;
        const points = [];
        
        for (let y = -100; y < this.canvas.height + 100; y += 8) {
            const x = strand.x + Math.sin((y * 0.01) + (time * strand.speed) + strand.offset) * strand.amplitude;
            points.push({ x, y });
        }

        // 绘制DNA双螺旋
        ctx.beginPath();
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 1;
        
        // 绘制第一条螺旋
        for (let i = 0; i < points.length - 1; i++) {
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + 1].x, points[i + 1].y);
        }
        
        // 绘制第二条螺旋（错开半个周期）
        for (let i = 0; i < points.length - 1; i++) {
            const offsetX = Math.sin((points[i].y * 0.01) + (time * strand.speed) + strand.offset + Math.PI) * strand.amplitude;
            const nextOffsetX = Math.sin((points[i + 1].y * 0.01) + (time * strand.speed) + strand.offset + Math.PI) * strand.amplitude;
            
            ctx.moveTo(strand.x + offsetX, points[i].y);
            ctx.lineTo(strand.x + nextOffsetX, points[i + 1].y);
        }

        // 绘制连接线
        for (let i = 0; i < points.length; i += 6) {
            const offsetX = Math.sin((points[i].y * 0.01) + (time * strand.speed) + strand.offset + Math.PI) * strand.amplitude;
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(strand.x + offsetX, points[i].y);
        }

        ctx.stroke();
    }

    animate() {
        const time = Date.now() * 0.001;
        
        // 清除画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制所有DNA链
        this.dnaStrands.forEach(strand => {
            this.drawStrand(strand, time);
        });
        
        // 继续动画循环
        requestAnimationFrame(() => this.animate());
    }
}

// 页面加载完成后初始化DNA背景
document.addEventListener('DOMContentLoaded', () => {
    new DNABackground();
}); 