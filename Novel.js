// 載入小說列表
const script = document.createElement('script');
script.src = 'novel_list.js'; // 確保路徑正確
document.head.appendChild(script);

// 等待 novelList.js 載入完成後再執行程式碼
script.onload = () => {
    console.log('novelList.js 載入完成');
    // 在這裡呼叫其他需要用到 novelList.js 程式碼的函式
    updateNavigationLinks(); // 在 novelList.js 載入後更新導覽連結
};

const chapterContent = document.getElementById('chapter-content');
const decreaseFontButton = document.getElementById('decrease-font');
const increaseFontButton = document.getElementById('increase-font');
const collapsible = document.querySelector('.collapsible');
const toggleButton = document.querySelector('.toggle-button');
const chapterTitle = document.getElementById('chapter-title'); // 確保取得章節標題元素
const audioElement = document.querySelector('#audio-player audio');
const fontSizeValueDisplay = document.getElementById('font-size-value'); // 取得顯示字體大小的元素
const sidebar = document.getElementById('sidebar'); // 取得側邊欄元素
const sidebarToggleButton = document.getElementById('sidebar-toggle-button'); // 取得側邊欄切換按鈕
const footer = document.querySelector('footer'); // 取得 footer 元素
const container = document.getElementById('container'); // 取得主容器元素

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

    // 加入按鈕點擊事件
    darkModeButton.addEventListener('click', () => {
        darkMode = !darkMode; // 切換暗色模式狀態
        toggleDarkMode();
    });

    // 將按鈕加入到 container 中，使其相對於整個容器定位
    if (container) { // 確保 container 元素存在
        container.appendChild(darkModeButton);
    } else {
        console.warn("未找到 container 元素，暗色模式按鈕將不會被加入。");
        // 作為備用方案，可以考慮加入到 body
        document.body.appendChild(darkModeButton);
    }
}

// 切換暗色模式
function toggleDarkMode() {
    const body = document.body;
    // 根據 darkMode 狀態，切換 body 元素的 'dark-mode' 類別
    body.classList.toggle('dark-mode', darkMode);

    // 僅更新暗色模式按鈕的圖示，其顏色和背景由 CSS 控制
    if (darkMode) {
        darkModeButton.innerHTML = '<i class="fas fa-sun"></i>'; // 變更為太陽圖示
    } else {
        darkModeButton.innerHTML = '<i class="fas fa-moon"></i>'; // 變更為月亮圖示
    }
}

/**
 * 更新導覽列的連結。
 * 此函數會找到 .bar-nav 內的所有 <a> 標籤，並根據預設的文字內容更新其 href 屬性。
 */
function updateNavigationLinks() {
    const navLinks = document.querySelectorAll('.bar-nav ul li a');
    navLinks.forEach(link => {
        const linkText = link.textContent.trim(); // 取得連結文字並移除前後空白

        switch (linkText) {
            case '首頁':
                link.href = '../../../'; // 更新為首頁的路徑
                break;
            case '關於':
                link.href = '../../About'; // 更新為關於頁面的路徑
                break;
            case '服務':
                link.href = '../../'; // 更新為服務頁面的路徑 (繁中網頁)
                break;
            case '聯絡':
                link.href = '../../../Contact'; // 更新為聯絡頁面的路徑
                break;
            default:
                // 如果有其他連結，可以選擇不處理或記錄警告
                console.warn(`未知的導覽連結文字: ${linkText}`);
                break;
        }
    });
    console.log('導覽連結已更新。');
}


// Call updateAudioSource(), setPageTitle() and createDarkModeButton() on page load
window.addEventListener('load', () => {
    updateAudioSource();
    setPageTitle(); // 設定網頁標題
    createDarkModeButton(); // 建立暗色模式按鈕
    updateNavigationLinks(); // 確保在頁面載入後也更新導覽連結
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
