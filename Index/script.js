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
});
