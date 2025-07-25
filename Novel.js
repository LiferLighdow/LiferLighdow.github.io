const chapterContent = document.getElementById('chapter-content');
const decreaseFontButton = document.getElementById('decrease-font');
const increaseFontButton = document.getElementById('increase-font');
const collapsible = document.querySelector('.collapsible');
const toggleButton = document.querySelector('.toggle-button');
const chapterTitleElement = document.getElementById('chapter-title'); 
const audioElement = document.querySelector('#audio-player audio');
const fontSizeValueDisplay = document.getElementById('font-size-value');
const sidebar = document.getElementById('sidebar');
const sidebarToggleButton = document.getElementById('sidebar-toggle-button');
const footer = document.querySelector('footer');
const container = document.getElementById('container');

// Default font size (using rem for accessibility)
let currentFontSize = 1;
let sidebarVisible = true;
let darkMode = false;
let darkModeButton = null;
let currentSeriesFolder = ''; // 新增變數來儲存當前的小說系列資料夾

// Helper function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    const paramValue = results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    console.log(`[DEBUG] getUrlParameter('${name}') 實際解析值: '${paramValue}'`); // 更明確的除錯訊息
    return paramValue;
}

// Function to load chapter content dynamically
async function loadChapterContent() {
    const chapterFilename = getUrlParameter('chapter'); // 從 URL 取得章節檔案名，例如 'novel1_content'
    console.log(`[DEBUG] loadChapterContent 呼叫，接收 chapterFilename: '${chapterFilename}', currentSeriesFolder: '${currentSeriesFolder}'`); // 除錯訊息

    if (!chapterFilename || !currentSeriesFolder) {
        // 如果沒有 chapterFilename 或 currentSeriesFolder，則不載入內容
        chapterContent.innerHTML = '<p>未指定章節內容或小說系列。請確保 URL 中包含 <code>series</code> 和 <code>chapter</code> 參數。</p>';
        console.error('[ERROR] 載入章節內容失敗：URL 中未指定章節檔案名或小說系列資料夾。');
        return;
    }

    // 調整內容檔案的路徑：從 novel_reader.html (在 繁中網頁/Novels/ 下) 到 影夜/novelX_content.html
    // novel_reader.html 位於 /繁中網頁/Novels/
    // novelX_content.html 位於 /繁中網頁/Novels/影夜/
    // 所以相對路徑是 影夜/novelX_content.html
    const contentPath = `${currentSeriesFolder}/${chapterFilename}.html`; 
    console.log(`[DEBUG] 嘗試載入章節內容的相對路徑：'${contentPath}'`); // 除錯訊息

    try {
        const response = await fetch(contentPath);
        if (!response.ok) {
            throw new Error(`無法載入章節內容: ${response.statusText} (HTTP 狀態碼: ${response.status})`);
        }
        const htmlContent = await response.text();
        chapterContent.innerHTML = htmlContent; // 插入內容
        console.log('[DEBUG] 章節內容載入成功！'); // 除錯訊息

        // 載入內容後，更新字體大小
        updateFontSize();

        // 更新音訊來源和網頁標題
        // 確保這裡傳遞的是正確的 chapterFilename
        updateAudioSource(chapterFilename); 
        setPageTitle(chapterFilename); // 傳遞章節檔案名以更新標題
        
        // 高亮側邊欄中對應的章節連結
        highlightCurrentChapterLink(chapterFilename);

    } catch (error) {
        console.error('[ERROR] 載入章節內容時發生錯誤:', error);
        chapterContent.innerHTML = `<p>載入章節內容失敗：${error.message}</p>`;
    }
}


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

// Function to update the audio source based on the chapter filename and current series folder
function updateAudioSource(chapterFilenameForAudio) { // 重新命名參數以避免混淆
    console.log(`[DEBUG] updateAudioSource 呼叫，接收 chapterFilenameForAudio: '${chapterFilenameForAudio}', currentSeriesFolder: '${currentSeriesFolder}'`); // 除錯訊息

    // 從 'novel1_content' 提取 'novel1'
    const audioBaseName = chapterFilenameForAudio.replace('_content', ''); 
    // 音訊檔位於 currentSeriesFolder/audio/ 下，從 novel_reader.html (繁中網頁/Novels/) 需要進入 currentSeriesFolder/audio/
    const audioFilename = `${currentSeriesFolder}/audio/${audioBaseName}.mp3`; 
    audioElement.src = audioFilename;
    audioElement.load();
    console.log(`[DEBUG] 音訊來源已更新為: '${audioFilename}'`); // 除錯訊息
}

// 根據章節檔案名設定網頁標題
function setPageTitle(chapterFilename) {
    // 嘗試從 novelListData 中找到對應的章節標題
    let title = '小說閱讀'; // 預設標題
    const chapterBaseName = chapterFilename.replace('_content', ''); // 例如 'novel1'

    // 遍歷 novelListData 尋找匹配的章節標題
    // novelListData 必須在 Novel.js 之前載入
    if (typeof novelListData !== 'undefined') {
        for (const category of novelListData) {
            const foundChapter = category.chapters.find(chapter => 
                // 檢查 href 是否包含 chapter 參數，或者是否包含基礎檔名
                chapter.href.includes(`chapter=${chapterFilename}`) || chapter.href.includes(`${chapterBaseName}_content.html`)
            );
            if (foundChapter) {
                title = foundChapter.title;
                break;
            }
        }
    } else {
        console.warn('[WARN] novelListData 未定義，無法設定精確的章節標題。');
    }
    
    document.title = title;
    chapterTitleElement.textContent = title; // 更新章節標題元素
    console.log(`[DEBUG] 網頁標題已設定為: '${title}'`); // 除錯訊息
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
        console.warn("[WARN] 未找到 container 元素，暗色模式按鈕將不會被加入。");
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
                // 從 novel_reader.html (繁中網頁/Novels/) 到 my_project_root/index.html
                link.href = '../../../index.html'; 
                break;
            case '關於':
                // 從 novel_reader.html (繁中網頁/Novels/) 到 my_project_root/About.html
                link.href = '../../../About.html'; 
                break;
            case '服務':
                // 從 novel_reader.html (繁中網頁/Novels/) 到 my_project_root/Index/繁中網頁.html
                link.href = '../../Index/繁中網頁.html'; 
                break;
            case '聯絡':
                // 從 novel_reader.html (繁中網頁/Novels/) 到 my_project_root/Contact.html
                link.href = '../../../Contact.html'; 
                break;
            default:
                // 如果有其他連結，可以選擇不處理或記錄警告
                console.warn(`[WARN] 未知的導覽連結文字: ${linkText}`);
                break;
        }
    });
    console.log('[DEBUG] 導覽連結已更新。');
}

// 高亮顯示目前讀取的篇章
function highlightCurrentChapterLink(currentChapterFilename) {
    const chapterLinks = document.querySelectorAll('#chapter-list a');
    chapterLinks.forEach(link => {
        // 從連結的 href 中提取 chapter 參數
        const linkUrl = new URL(link.href, window.location.origin + window.location.pathname); // 確保基於當前頁面 URL 解析
        const linkChapterParam = linkUrl.searchParams.get('chapter');

        if (linkChapterParam === currentChapterFilename) {
            link.classList.add('active');
            // 滾動到活動連結，確保它在側邊欄中可見
            link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            link.classList.remove('active');
        }
    });
}


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

// 頁面載入時的初始化邏輯
window.addEventListener('load', () => {
    console.log("[DEBUG] 頁面載入事件觸發。開始初始化..."); // 新增除錯訊息

    // 1. 取得小說系列資料夾名稱 (例如 '影夜')
    currentSeriesFolder = getUrlParameter('series'); 
    const chapterFilenameFromURL = getUrlParameter('chapter'); // 取得 chapter 參數，用於後續調用

    console.log(`[DEBUG] 頁面載入時，從 URL 取得的小說系列資料夾 (series 參數): '${currentSeriesFolder}'`); // 除錯訊息
    console.log(`[DEBUG] 頁面載入時，從 URL 取得的章節內容檔名 (chapter 參數): '${chapterFilenameFromURL}'`); // 除錯訊息

    // 即使沒有 series 參數，也初始化導覽和暗色模式按鈕
    createDarkModeButton(); 
    updateNavigationLinks(); 

    if (!currentSeriesFolder) {
        console.error('[ERROR] URL 中未指定小說系列資料夾 (series 參數)。請確保 URL 中包含 <code>series</code> 參數，例如：<code>novel_reader.html?series=影夜&chapter=novel1_content</code>');
        chapterContent.innerHTML = '<p>錯誤：URL 中未指定要閱讀的小說系列。請確保 URL 中包含 <code>series</code> 參數，例如：<code>novel_reader.html?series=影夜&chapter=novel1_content</code></p>';
        return; // 如果沒有 series 參數，則停止載入列表和內容
    }

    // 2. 動態載入該系列資料夾下的 novel_list.js
    const script = document.createElement('script');
    // novel_list.js 位於 seriesFolder/novel_list.js，相對於 novel_reader.html
    // novel_reader.html 在 /繁中網頁/Novels/
    // novel_list.js 在 /繁中網頁/Novels/影夜/
    // 所以相對路徑是 影夜/novel_list.js
    script.src = `${currentSeriesFolder}/novel_list.js`; 
    console.log(`[DEBUG] 嘗試動態載入 novel_list.js 的相對路徑：'${script.src}'`); // 除錯訊息

    script.onload = () => {
        console.log(`[DEBUG] ${currentSeriesFolder}/novel_list.js 載入成功！`);
        // 確保 novelListData 已經載入後才執行這些函數
        if (typeof novelListData !== 'undefined') {
            insertNovelList(); // 插入小說列表
            // 只有當 chapterFilenameFromURL 存在時才載入章節內容和音訊
            if (chapterFilenameFromURL) {
                loadChapterContent(); 
            } else {
                chapterContent.innerHTML = '<p>請從左側列表選擇一個章節開始閱讀。</p>';
                console.warn('[WARN] URL 中未指定章節內容 (chapter 參數)。請從列表選擇。');
            }
        } else {
            console.error('[ERROR] novelListData 未定義，即使 novel_list.js 載入，變數也未被識別。這可能是因為 novel_list.js 檔案內容有問題或載入時機不對。');
            chapterContent.innerHTML = `<p>載入小說列表失敗：<code>novelListData</code> 變數未被識別。</p><p>請檢查 <code>${currentSeriesFolder}/novel_list.js</code> 檔案內容是否正確。</p>`;
        }
    };
    script.onerror = (e) => {
        console.error(`[ERROR] 無法載入 ${currentSeriesFolder}/novel_list.js。請檢查檔案路徑和名稱。錯誤事件:`, e);
        chapterContent.innerHTML = `<p>載入小說系列列表失敗：無法找到 <code>${currentSeriesFolder}/novel_list.js</code></p><p>請檢查 URL 中的 <code>series</code> 參數是否正確，以及檔案路徑。</p>`;
    };
    document.head.appendChild(script);
});
