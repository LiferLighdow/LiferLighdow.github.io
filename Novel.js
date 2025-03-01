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
    if (collapsible.classList.contains('open')) {
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


// Function to load content from a HTML file
async function loadChapterContent() {
    // Get the filename from the current HTML file's name
    const path = window.location.pathname;
    const filenameWithExtension = path.split('/').pop(); // Get filename with extension
    const filename = filenameWithExtension.split('.')[0]; // Get filename without extension
    const filepath = 'html/' + filename + '.html'; // 修改檔案路徑

	 console.log("Attempting to load from:", filepath); // 顯示檔案路徑

    let timeoutId;

    try {
        // Set a "Loading..." message
        chapterContent.innerHTML = '<p>章節內容載入中...</p>'; // 顯示載入中訊息

        // Set a timeout
        timeoutId = setTimeout(() => {
            throw new Error(`Loading chapter from ${filepath} timed out after 3 seconds`);
        }, 5000); //Increase timeout to 5 seconds

        const response = await fetch(filepath);
        if (!response.ok) {
            throw new Error(`Could not load chapter from ${filepath}`);
        }
        const html = await response.text();

        // Clear the timeout, as the fetch was successful
        clearTimeout(timeoutId);

        // Set HTML content
        chapterContent.innerHTML = html; // 直接設定 HTML 內容

    } catch (error) {
        // Clear the timeout, in case it's still running
        clearTimeout(timeoutId);
        console.error(error);
        chapterContent.innerHTML = '<p>章節內容載入失敗，請稍後再試。</p>'; // 顯示載入失敗訊息
    }
}

// Function to update the audio source based on the HTML filename
function updateAudioSource() {
    const path = window.location.pathname;
    const filenameWithExtension = path.split('/').pop();
    const filename = filenameWithExtension.split('.')[0];
    const audioFilename = 'audio/' + filename + '.mp3';
    audioElement.src = audioFilename;
    audioElement.load();
}

// Call loadChapterContent() and updateAudioSource() on page load
window.addEventListener('load', () => {
    loadChapterContent();
    updateAudioSource(); // 确保在加载内容后更新音频源
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
