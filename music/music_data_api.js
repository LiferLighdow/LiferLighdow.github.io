// music_data_api.js (請將此文件保存為 .js 檔案，而非 .html)

// 這個 JavaScript 文件將直接輸出純文字內容 (CSV 或提示訊息)
// 當瀏覽器或 Kodular 的 Web 元件請求此 .js 文件時，它將直接收到此腳本的輸出。

// 輔助函式：從 URL 獲取查詢參數
window.getQueryParam = function(name) {
    // 在純 JavaScript 環境中，我們需要從 window.location.search 獲取參數
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

// 輔助函式：將字串處理為 CSV 安全格式
window.escapeCsv = function(value) {
    if (value === null || value === undefined) {
        return '';
    }
    let stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n') || stringValue.includes('\r')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
};

// 將所有類別的音樂資料扁平化
window.flattenMusicData = function(musicDataObject) {
    const flatData = [];
    for (const category in musicDataObject) {
        if (musicDataObject.hasOwnProperty(category)) {
            musicDataObject[category].forEach(song => {
                flatData.push({
                    category: category,
                    title: song.title,
                    src: song.src,
                    cover: song.cover
                });
            });
        }
    }
    return flatData;
};

// 輔助函式：根據類別篩選扁平化後的音樂資料
window.filterFlattenedMusicDataByCategory = function(data, categoryName) {
    if (!categoryName) {
        return data; // 如果沒有提供類別名稱，則返回所有數據
    }
    return data.filter(item => item.category === categoryName);
};

// 轉換為標題 CSV (單一列)
window.convertToTitlesCsv = function(data) {
    const values = [];
    data.forEach(item => {
        values.push(window.escapeCsv(item.title));
    });
    return values.join(',');
};

// 轉換為封面網址 CSV (單一列，只留檔案名)
window.convertToCoversCsv = function(data) {
    const values = [];
    data.forEach(item => {
        const filename = item.cover.split('/').pop();
        values.push(window.escapeCsv(filename));
    });
    return values.join(',');
};

// 轉換為音樂網址 CSV (單一列，只留檔案名)
window.convertToSrcsCsv = function(data) {
    const values = [];
    data.forEach(item => {
        const filename = item.src.split('/').pop();
        values.push(window.escapeCsv(filename));
    });
    return values.join(',');
};

// 轉換為音樂類別 CSV (單一列) - 此函式輸出的是唯一的類別名稱
window.convertToCategoriesCsv = function(data) {
    const categories = new Set();
    data.forEach(item => categories.add(item.category));
    
    const values = [];
    Array.from(categories).sort().forEach(category => {
        values.push(window.escapeCsv(category));
    });
    return values.join(',');
};


// --- 核心邏輯：檢查參數並輸出 CSV 或提示訊息 (純文字) ---
// 注意：在純 .js 文件中，我們不能直接引用外部的 <script> 標籤載入的變數 (musicData)
// 因為這個 .js 文件是獨立執行的。
// 我們需要模擬 musicData 的來源。
// 為了這個範例，我們假設 musicData 是一個可用的全域變數，
// 但在實際部署時，您需要確保 musicData 是在這個 .js 文件中定義的，
// 或者通過某種機制（例如 fetch API 載入 JSON）來獲取。

// 為了讓這個範例能運行，我會在此處直接引入一個模擬的 musicData 結構。
// 在您的實際 GitHub Pages 環境中，您需要確保 liferlighdow.github.io/music/music-data.js
// 是一個 *純粹的 JavaScript 文件*，它直接定義了 window.musicData = { ... }
// 這樣這個腳本才能找到 musicData。

// 由於 Canvas 的限制，我無法在這裡直接 fetch 外部 JS 檔案。
// 我會假設 `musicData` 在此執行時已作為全域變數存在。
// 如果您在 Kodular 中遇到的問題仍然存在，請考慮將 `music-data.js` 的內容
// 直接複製到此腳本的頂部，或者確保 `music-data.js` 在被請求之前就已經被載入到執行環境中。

// 在這裡假設 musicData 已經存在，就像它在 HTML 中被 <script> 標籤載入一樣。
// 如果它確實沒有被載入，下面的 typeof musicData !== 'undefined' 會捕獲到。

const getParam = window.getQueryParam('get');
const categoryParam = window.getQueryParam('category');

let outputContent = '';

if (getParam) {
    if (typeof musicData !== 'undefined' && musicData !== null) {
        try {
            let allMusicData = window.flattenMusicData(musicData);
            let filteredMusicData = allMusicData;

            if (categoryParam) {
                filteredMusicData = window.filterFlattenedMusicDataByCategory(allMusicData, categoryParam);
                if (filteredMusicData.length === 0 && getParam !== 'categories') {
                    const existingCategories = Array.from(new Set(allMusicData.map(item => item.category))).join(', ');
                    outputContent = `錯誤：無效的類別 '${categoryParam}' 或該類別下沒有歌曲。現有類別：${existingCategories || '無'}`;
                }
            }

            if (outputContent === '') {
                switch (getParam) {
                    case 'titles':
                        outputContent = window.convertToTitlesCsv(filteredMusicData);
                        break;
                    case 'covers':
                        outputContent = window.convertToCoversCsv(filteredMusicData);
                        break;
                    case 'srcs':
                        outputContent = window.convertToSrcsCsv(filteredMusicData);
                        break;
                    case 'categories':
                        outputContent = window.convertToCategoriesCsv(allMusicData);
                        break;
                    default:
                        outputContent = '錯誤：無效的 CSV 類型參數。請使用 titles, covers, srcs, 或 categories。';
                }
            }
        } catch (e) {
            outputContent = `處理資料時發生錯誤：${e.message}`;
            console.error("CSV 輸出模式錯誤:", e);
        }
    } else {
        outputContent = '錯誤：無法載入音樂資料。請確保 window.musicData 已定義。';
    }
} else {
    outputContent = "此頁面為音樂資料 API 端點，請使用 URL 參數 (例如 ?get=titles 或 ?get=titles&category=pop) 獲取資料。";
}

// 在純 JavaScript 文件中直接將內容寫入輸出流
// 這是在 Web Worker 或 Service Worker 中常見的輸出方式。
// 對於瀏覽器或 Kodular 的 Web 元件，這會是其 HTTP 響應的內容。
// 注意：這假設運行環境會將此腳本的 console.log 或直接輸出視為響應內容。
// 最可靠的方式仍然是通過服務器設定 Content-Type。
// 但在純前端靜態托管下，這是盡力而為的方案。

// 為了確保輸出，我們使用一個常見的模式，但它仍然依賴於客戶端的行為。
// 最直接的，如果客戶端只是獲取文本，那麼下面的 console.log(outputContent) 是最有可能被捕獲的。
// 在 Kodular 的 Web.GotText 事件中，responseContent 應該會是這個 outputContent。

console.log(outputContent);

// 如果是瀏覽器直接打開這個 .js 檔案，它通常不會顯示 console.log 的內容。
// 為了瀏覽器可視化（但 Kodular 不會執行），可以再加一個 document.write
// 但為了純 Kodular 使用，可以省略。
// document.write(outputContent); // 如果需要瀏覽器直接打開也顯示

