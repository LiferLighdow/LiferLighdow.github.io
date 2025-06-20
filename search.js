    // 全域變數 (請保留之前的全域變數)
    let allResults = [];
    let currentPage = 1;
    const resultsPerPage = 5;
    const suggestions = { /* 搜尋建議，請保留之前 */ };
    let searchHistory = [];  // 儲存搜尋歷史
    const maxHistorySize = 5; // 最大搜尋歷史數量

    // 初始化載入搜尋歷史
    loadSearchHistory();

    // 搜尋建議 (請保留之前的 suggest 函數)
    function suggest() { /* 搜尋建議，請保留之前 */ }

    // 搜尋
    function search() {
      const searchTerm = document.querySelector('.search-input').value.toLowerCase();
      const searchResultsContainer = document.getElementById('searchResults');
      const loadingIndicator = document.getElementById('loadingIndicator');
      const paginationContainer = document.getElementById('pagination');
      const noResultsContainer = document.getElementById('noResults');
      const recommendedLinks = document.getElementById("recommendedLinks"); // 取得推薦連結區塊

      // 檢查搜尋詞是否為空
      if (!searchTerm) {
        alert("請輸入搜尋詞"); // 顯示提示訊息，你可以修改成更美觀的提示
        return; // 停止搜尋
      }

      searchResultsContainer.innerHTML = ''; // 清空之前的結果
      paginationContainer.innerHTML = ''; // 清空之前的分頁
      noResultsContainer.style.display = 'none'; // 隱藏沒有結果的提示
      loadingIndicator.style.display = 'block'; // 顯示載入指示器
      document.getElementById("autocompleteList").style.display = "none";  //隱藏自動完成建議
      document.getElementById("searchHistoryList").style.display = "none"; //隱藏搜尋歷史
      recommendedLinks.classList.add("hidden"); // 隱藏推薦連結

      // 保存搜尋歷史
      saveSearchHistory(searchTerm);

      // 模擬搜尋時間 (1秒)
      setTimeout(() => {
        loadingIndicator.style.display = 'none'; // 隱藏載入指示器

        // 模擬搜尋結果 (你可以根據關鍵字和搜尋選項返回不同的結果)
        allResults = generateSearchResults(searchTerm);

        // 重置為第一頁
        currentPage = 1;

        if (allResults.length === 0) {
          // 顯示沒有結果的提示
          noResultsContainer.style.display = 'block';
        } else {
          // 顯示第一頁的結果
          displayResults(currentPage);

          // 產生分頁按鈕
          generatePaginationButtons();
        }

      }, 1000);
    }

    // 產生模擬搜尋結果 (請修改此函數以根據時間範圍和來源過濾結果)
    function generateSearchResults(searchTerm) {
      let results = [];

      // 載入網頁列表
      // 注意: 這裡需要確保 pageList.js 已經載入
      if (typeof pageList !== 'undefined') {
          pageList.forEach(page => {
              // 檢查標題、描述或關鍵字是否包含搜尋詞
              if (
                  page.title.toLowerCase().includes(searchTerm) ||
                  page.description.toLowerCase().includes(searchTerm) ||
                  (page.keywords && page.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)))
              ) {
                  results.push({
                      title: page.title,
                      link: "https://liferlighdow.github.io/" + page.url,
                      description: page.description,
                      snippet: `${page.description.substring(0, 150)}...`,
                      date: new Date().toLocaleDateString(),
                      source: page.title // 將來源改為網頁的標題
                  });
              }
          });
      } else {
          console.error("pageList.js 未載入!");
          // 如果 pageList.js 沒有載入，提供一個預設結果
          results.push({
              title: "錯誤：頁面列表未載入",
              link: "#",
              description: "無法載入網站頁面列表。 請檢查 pageList.js 是否正確連結。",
              snippet: "無法顯示任何搜尋結果",
              date: new Date().toLocaleDateString(),
              source: "系統"
          });
      }
      return results;
    }

    // 顯示指定頁面的搜尋結果 (請修改此函數以顯示網頁預覽)
    function displayResults(page) {
      const searchResultsContainer = document.getElementById('searchResults');
      searchResultsContainer.innerHTML = ''; // 清空之前的結果

      const startIndex = (page - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      const pageResults = allResults.slice(startIndex, endIndex);

      pageResults.forEach(result => {
        const listItem = document.createElement('li');
        listItem.classList.add('search-result');
        const highlightedTitle = highlightSearchTerm(result.title, document.querySelector('.search-input').value);

        listItem.innerHTML = `
          <h2 class="result-title">${highlightedTitle}</h2>
          <a href="${result.link}" class="result-link">${result.link}</a>
          <p class="result-description">${result.description}</p>
          <p>來源: ${result.source} - 日期: ${result.date}</p>
        `;

        searchResultsContainer.appendChild(listItem);
      });
    }

    // 高亮顯示搜尋詞
    function highlightSearchTerm(text, searchTerm) {
        if (!searchTerm) {
            return text; // 如果搜尋詞為空，則不進行高亮顯示
        }

        const regex = new RegExp(searchTerm, 'gi'); // 創建一個正則表達式，用於全局和忽略大小寫的匹配
        const highlightedText = text.replace(regex, match => `<span class="highlight">${match}</span>`);
        return highlightedText;
    }

    // 產生分頁按鈕 (請保留之前的 generatePaginationButtons 函數)
    function generatePaginationButtons() { /* 產生分頁按鈕，請保留之前 */ }

    // 更新目前頁數按鈕的樣式 (請保留之前的 updateActivePageButton 函數)
    function updateActivePageButton() { /* 更新目前頁數按鈕的樣式，請保留之前 */ }

    // 儲存搜尋歷史
    function saveSearchHistory(searchTerm) {
      if (searchTerm && !searchHistory.includes(searchTerm)) {
        searchHistory.unshift(searchTerm); // 將新的搜尋詞加到陣列的開頭
        if (searchHistory.length > maxHistorySize) {
          searchHistory.pop(); // 如果超過最大值，移除最後一個搜尋詞
        }
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); //儲存到 localStorage
      }
    }

    // 載入搜尋歷史
    function loadSearchHistory() {
      const storedHistory = localStorage.getItem('searchHistory');
      if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
      }
    }

    // 顯示搜尋歷史
    function showSearchHistory() {
      const searchHistoryList = document.getElementById('searchHistoryList');
      searchHistoryList.innerHTML = ''; // 清空之前的搜尋歷史
      searchHistoryList.style.display = 'block';

      if (searchHistory.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = '沒有搜尋歷史';
        searchHistoryList.appendChild(listItem);
      } else {
        searchHistory.forEach(term => {
          const listItem = document.createElement('li');
          listItem.textContent = term;
          listItem.onclick = function() {
            document.querySelector('.search-input').value = term; // 點擊搜尋歷史時填入搜尋框
            search(); // 觸發搜尋
            searchHistoryList.style.display = 'none'; // 隱藏搜尋歷史
          };
          searchHistoryList.appendChild(listItem);
        });
      }
    }

    // 當點擊搜尋框外面的地方時，隱藏搜尋歷史
    document.addEventListener('click', function(event) {
      const searchHistoryList = document.getElementById('searchHistoryList');
      const searchBox = document.querySelector('.search-box');
      if (!searchBox.contains(event.target)) {
        searchHistoryList.style.display = 'none';
      }
    });

    // 按下 Enter 鍵觸發搜尋
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        search();
      }
    });