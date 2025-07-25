// 小說列表資料
const novelListData = [
    {
        title: '主線', // 這個將作為 series 參數的值
        chapters: [
            // 將 href 指向 novel_reader，並傳遞 series 和 chapter 參數（無副檔名）
            // 假設這個 novel_list.js 位於 my_project_root/繁中網頁/Novels/主線/
            // 而 novel_reader 位於 my_project_root/繁中網頁/Novels/
            // 所以相對路徑是 ../novel_reader
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel1_content', title: '1.明與暗的獨白' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel2_content', title: '2.幻色的誓言' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel3_content', title: '3.留言牆之誤' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel4_content', title: '4.雨中狹路相逢' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel5_content', title: '5.裂縫中的教室' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel6_content', title: '6.真相的輪廓' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel7_content', title: '7.裂痕的兩端' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel8_content', title: '8.相遇的距離' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel9_content', title: '9.雨中之間' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel10_content', title: '10.消失的光' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel11_content', title: '11.聲音的距離' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel12_content', title: '12.空氣中的聲音' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel13_content', title: '13.再見與遲疑' },
            { href: '../novel_reader?series=錯位的愛恨&chapter=novel14_content', title: '14.跨越光線' },
        ]
    },
];

// 將小說列表插入到 #novel-list-container 元素中
function insertNovelList() {
    const novelListContainer = document.getElementById('novel-list-container');
    if (novelListContainer) {
        let html = '<ul id="chapter-list">';
        novelListData.forEach(category => {
            html += `<li><strong>${category.title}</strong></li>`; // 類別標題
            category.chapters.forEach(chapter => {
                html += `<li><a href="${chapter.href}" data-title="${chapter.title}">${chapter.title}</a></li>`;
            });
        });
        html += '</ul>';
        novelListContainer.innerHTML = html;

        // 在插入列表後，高亮顯示目前讀取的篇章
        const chapterLinks = novelListContainer.querySelectorAll('#chapter-list a');
        chapterLinks.forEach(link => {
            // 由於 URL 現在沒有副檔名，需要調整判斷邏輯
            const currentChapterParam = getUrlParameter('chapter'); // 獲取當前 URL 的 chapter 參數
            const linkUrl = new URL(link.href);
            const linkChapterParam = linkUrl.searchParams.get('chapter'); // 獲取連結的 chapter 參數

            if (linkChapterParam === currentChapterParam) {
                link.classList.add('active');
                // 更新標題
                const currentTitle = document.querySelector('h1.chapter-title');
                if (currentTitle) {
                    currentTitle.textContent = link.dataset.title; // 更新網頁標題
                }
            } else {
                link.classList.remove('active');
            }
        });
    } else {
        console.error('找不到 #novel-list-container 元素');
    }
}

// 這裡的 window.addEventListener('load') 不再需要，因為 Novel.js 會在載入 novel_list.js 後統一處理
// window.addEventListener('load', () => {
//     insertNovelList(); // 插入小說列表
// });

// Helper function to get URL parameters (從 Novel.js 複製過來，確保 novel_list.js 也能使用)
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
