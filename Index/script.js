// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 點擊效果：生成一個發光的圓形並消失
    document.addEventListener('click', (event) => {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        // 圓形大小隨機化，增加動態感
        const size = Math.random() * 80 + 60; // 60px 到 140px
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        // 確保圓形中心在點擊位置
        circle.style.left = `${event.clientX - size / 2}px`;
        circle.style.top = `${event.clientY - size / 2}px`;
        document.body.appendChild(circle);

        // 觸發動畫，使用 requestAnimationFrame 確保在下一幀繪製
        requestAnimationFrame(() => {
            circle.classList.add('animate');
        });

        // 動畫結束後移除元素
        circle.addEventListener('transitionend', () => {
            circle.remove();
        }, { once: true }); // 確保事件只觸發一次
    });

    // 設定 body 最小高度，確保頁尾始終在視窗底部或內容結束後
    function setBodyMinHeight() {
        const body = document.body;
        const html = document.documentElement;

        // 獲取文檔的實際高度
        const documentHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );

        // 如果文檔高度小於視窗高度，將 body 的最小高度設定為視窗高度
        // 否則，將 body 的最小高度設定為 100vh，讓內容決定高度
        if (documentHeight < window.innerHeight) {
            body.style.minHeight = window.innerHeight + "px";
        } else {
            body.style.minHeight = "100vh";
        }
    }

    // 在頁面載入和視窗大小改變時呼叫函數
    window.addEventListener('load', setBodyMinHeight);
    window.addEventListener('resize', setBodyMinHeight);


    // Canvas 背景動畫邏輯 (從 About.html 移過來)
    const canvas = document.getElementById('background-canvas');
    let context, width, height, stars;

    // 檢查 canvas 是否存在，因為並非所有頁面都有 canvas
    if (canvas) {
        context = canvas.getContext('2d');

        function initCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            stars = Array(800).fill().map(() => ({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * width // 初始 z 值
            }));
        }

        function animateCanvas() {
            // 清除上一幀，並添加拖尾效果
            context.fillStyle = 'rgba(0, 0, 0, 0.1)'; // 調整為更暗的拖尾效果
            context.fillRect(0, 0, width, height);

            context.fillStyle = '#88ccff'; // 亮藍色星星，更具科技感

            stars.forEach(star => {
                star.z -= 2; // 星星移動速度
                if (star.z <= 0) {
                    // 如果星星超出螢幕，重新放置到遠處
                    star.x = Math.random() * width;
                    star.y = Math.random() * height;
                    star.z = width;
                }

                // 計算透視投影
                const k = 128.0 / star.z;
                const px = (star.x - width / 2) * k + width / 2;
                const py = (star.y - height / 2) * k + height / 2;

                // 繪製星星
                if (px >= 0 && px <= width && py >= 0 && py <= height) {
                    const size = (1 - star.z / width) * 4; // 根據距離調整大小
                    context.beginPath();
                    context.arc(px, py, size, 0, 2 * Math.PI);
                    context.fill();
                }
            });

            requestAnimationFrame(animateCanvas);
        }

        // 監聽視窗大小改變，重新初始化 canvas
        window.addEventListener('resize', initCanvas);

        // 在頁面載入時初始化並啟動 canvas 動畫
        window.addEventListener('load', () => {
            initCanvas();
            animateCanvas();
        });
    }
});
