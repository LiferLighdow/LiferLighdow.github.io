// 載入小說列表
const script = document.createElement('script');
script.src = 'novel_list.js'; // 確保路徑正確
document.head.appendChild(script);

// 等待 novelList.js 載入完成後再執行程式碼
script.onload = () => {
    console.log('novelList.js 載入完成');
    // 在這裡呼叫其他需要用到 novelList.js 程式碼的函式
};

const chapterContent = document.getElementById('chapter-content');
const decreaseFontButton = document.getElementById('decrease-font');
const increaseFontButton = document.getElementById('increase-font');
const collapsible = document.querySelector('.collapsible');
const toggleButton = document.querySelector('.toggle-button');
const chapterTitle = document.getElementById('chapter-title');
const audioElement = document.querySelector('#audio-player audio');
const fontSizeValueDisplay = document.getElementById('font-size-value'); // 取得顯示字體大小的元素
const sidebar = document.getElementById('sidebar'); // 取得側邊欄元素
const sidebarToggleButton = document.getElementById('sidebar-toggle-button'); // 取得側邊欄切換按鈕
const footer = document.querySelector('footer'); // 取得 footer 元素

// Default font size (using rem for accessibility)
let currentFontSize = 1;
let sidebarVisible = true; // 追蹤側邊欄是否可見
let darkMode = false; // 追蹤是否為暗色模式
let darkModeButton = null; // 儲存暗色模式按鈕的參考

decreaseFontButton.addEventListener('click', () => {
    currentFontSize = Math.max(0.8, currentFontSize - 0.1); // Prevent going too small
    updateFontSize();
});

increaseFontButton.addEventListener('click', () => {
    currentFontSize = Math.min(2, currentFontSize + 0.1); // Prevent going too large
    updateFontSize();
});

function updateFontSize() {
    chapterContent.querySelectorAll('p').forEach(p => {
        p.style.fontSize = `${currentFontSize}rem`;
    });
    fontSizeValueDisplay.textContent = currentFontSize.toFixed(1) + 'rem'; // 更新顯示的數值
}

toggleButton.addEventListener('click', () => {
    collapsible.classList.toggle('open');
    if (collapsible.classList.contains('open')) {
        toggleButton.textContent = "點擊收合";
    } else {
        toggleButton.textContent = "點擊展開";
    }
});

// Function to update the audio source based on the HTML filename
function updateAudioSource() {
    const path = window.location.pathname;
    const filenameWithExtension = path.split('/').pop();
    const filename = filenameWithExtension.split('.')[0];
    const audioFilename = 'audio/' + filename + '.mp3';
    audioElement.src = audioFilename;
    audioElement.load();
}

// 根據檔案位置設定網頁標題
function setPageTitle() {
    const path = window.location.pathname;
    const parts = path.split('/');
    let folderName = parts[parts.length - 2]; // 取得上一個資料夾的名稱

    // 解碼 URI 編碼的字串
    try {
        folderName = decodeURIComponent(folderName);
    } catch (e) {
        console.error('無法解碼資料夾名稱:', e);
        // 如果解碼失敗，可以使用原始資料夾名稱
    }

    // 設定網頁標題
    document.title = folderName;
}

// 建立暗色模式按鈕
function createDarkModeButton() {
    darkModeButton = document.createElement('button');
    darkModeButton.innerHTML = '<i class="fas fa-moon"></i>'; // 使用 Font Awesome 月亮圖示
    darkModeButton.id = 'dark-mode-button'; // 設定按鈕的 ID，方便之後調整樣式
    darkModeButton.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 5px; /* 減少內距 */
        border: none;
        background-color: white; /* 白色背景 */
        color: black; /* 黑色圖示 */
        border-radius: 5px;
        cursor: pointer;
        transition: color 0.3s ease, background-color 0.3s ease; /* 加入背景颜色过渡效果 */
        z-index: 1000;
        font-size: 1.2rem; /* 调整图标大小 */
    `; // 設定按鈕的樣式

    // 加入按鈕點擊事件
    darkModeButton.addEventListener('click', () => {
        darkMode = !darkMode; // 切換暗色模式狀態
        toggleDarkMode();
    });

    // 將按鈕加入到 body 中
    document.body.appendChild(darkModeButton);
}

// 切換暗色模式
function toggleDarkMode() {
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const container = document.getElementById('container');

    if (darkMode) {
        darkModeButton.innerHTML = '<i class="fas fa-sun"></i>'; // 變更為太陽圖示
        darkModeButton.style.backgroundColor = 'white'; /*白色背景 */
        darkModeButton.style.color = 'black';  /*黑色圖示*/
        body.style.backgroundColor = '#343a40';
        body.style.color = '#f8f9fa';
        if (sidebar) {
            sidebar.style.backgroundColor = '#495057';
            sidebar.style.borderRightColor = '#6c757d';
        }
        if (container) {
             container.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.1)';
        }
        if (footer) { // 更改 footer 的顏色
            footer.style.backgroundColor = '#495057';
            footer.style.borderTopColor = '#6c757d';
        }

    } else {
        darkModeButton.innerHTML = '<i class="fas fa-moon"></i>'; // 變更為月亮圖示
         darkModeButton.style.backgroundColor = 'white'; /*白色背景 */
         darkModeButton.style.color = 'black';  /*黑色圖示*/
        body.style.backgroundColor = '#f8f9fa';
        body.style.color = '#343a40';
        if (sidebar) {
            sidebar.style.backgroundColor = '#ffffff';
            sidebar.style.borderRightColor = '#dee2e6';
        }
        if (container) {
            container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        }
        if (footer) { // 更改 footer 的顏色
            footer.style.backgroundColor = '#f0f0f0';
            footer.style.borderTopColor = '#ddd';
        }
    }
}

// Call updateAudioSource(), setPageTitle() and createDarkModeButton() on page load
window.addEventListener('load', () => {
    updateAudioSource();
    setPageTitle(); // 設定網頁標題
    createDarkModeButton(); // 建立暗色模式按鈕
});

// 側邊欄隱藏/顯示切換
sidebarToggleButton.addEventListener('click', () => {
    sidebarVisible = !sidebarVisible; // 切換可見狀態
    if (sidebarVisible) {
        sidebar.classList.remove('hidden');
        sidebarToggleButton.classList.remove('sidebar-hidden'); // 移除類別
    } else {
        sidebar.classList.add('hidden');
        sidebarToggleButton.classList.add('sidebar-hidden'); // 加入類別
    }
});
