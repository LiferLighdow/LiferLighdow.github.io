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

// Default font size (using rem for accessibility)
let currentFontSize = 1;
let sidebarVisible = true; // 追蹤側邊欄是否可見

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

// Highlight the active link based on the current page URL
/*const chapterLinks = document.querySelectorAll('#chapter-list a'); //取得小說列表的連結(不能寫在這裡)
chapterLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});*/

// Function to update the audio source based on the HTML filename
function updateAudioSource() {
    const path = window.location.pathname;
    const filenameWithExtension = path.split('/').pop();
    const filename = filenameWithExtension.split('.')[0];
    const audioFilename = 'audio/' + filename + '.mp3';
    audioElement.src = audioFilename;
    audioElement.load();
}

// Call updateAudioSource() on page load
window.addEventListener('load', () => {
    updateAudioSource();
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
