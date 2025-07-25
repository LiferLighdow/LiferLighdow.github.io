// 小說列表資料
const novelListData = [
    {
        title: '《背上鬼女兒的戀》', // 這個將作為 series 參數的值
        chapters: [
            // 將 href 指向 novel_reader，並傳遞 series 和 chapter 參數（無副檔名）
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel1_content', title: '1.命運的捉弄' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel2_content', title: '2.月光下的幽影' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel3_content', title: '3.屋簷下的兩個世界' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel4_content', title: '4.兩個人的甜蜜時光' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel5_content', title: '5.尋找前世的答案' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel6_content', title: '6.血脈的羈絆與佔有的慾望' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel7_content', title: '7.前世鏡花水月' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel8_content', title: '8.天使的降臨與宿命的重逢' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel9_content', title: '9.跨越輪迴的親情與愛戀' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel10_content', title: '10.陽光下的新起點' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel11_content', title: '11.渴望的溫度' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel12_content', title: '12.天使的試煉（私戀）' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel13_content', title: '13.初嚐人間煙火' },
            { href: '../novel_reader?series=背上鬼女兒的戀&chapter=novel14_content', title: '14.夢魘的託夢' },
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
//     insertNovelList();
// });

// Helper function to get URL parameters (從 Novel.js 複製過來，確保 novel_list.js 也能使用)
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
