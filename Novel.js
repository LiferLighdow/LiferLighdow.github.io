const chapterContent = document.getElementById('chapter-content');
const decreaseFontButton = document.getElementById('decrease-font');
const increaseFontButton = document.getElementById('increase-font');
const collapsible = document.querySelector('.collapsible');
const toggleButton = document.querySelector('.toggle-button');
const chapterLinks = document.querySelectorAll('#chapter-list a');
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
    if(collapsible.classList.contains('open')) {
        toggleButton.textContent = "點擊收合";
    } else {
        toggleButton.textContent = "點擊展開";
    }
});

// Highlight the active link based on the current page URL
chapterLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Set audio source based on chapter title
function updateAudioSource() {
    const audioFilename = chapterTitle.textContent.replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase() + '.mp3';
    audioElement.src = 'audio/' + audioFilename;
    audioElement.load(); // Important: Load the new source
}

// Call updateAudioSource() on page load and when content changes.
updateAudioSource();

// Initial display of font size
fontSizeValueDisplay.textContent = currentFontSize.toFixed(1) + 'rem'; // 網頁載入時顯示初始字體大小

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