// 小說列表資料
const novelListData = [
    {
        title: '《微光破曉》',
        chapters: [
            { href: 'novel1.html', title: '1.命運的捉弄' },
            { href: 'novel2.html', title: '2.月光下的幽影' },
            { href: 'novel3.html', title: '3.屋簷下的兩個世界' },
            { href: 'novel4.html', title: '4.兩個人的甜蜜時光' },
            { href: 'novel5.html', title: '5.尋找前世的答案' },
            { href: 'novel6.html', title: '6.血脈的羈絆與佔有的慾望' },
            { href: 'novel7.html', title: '7.前世鏡花水月' },
            { href: 'novel8.html', title: '8.天使的降臨與宿命的重逢' },
            { href: 'novel9.html', title: '9.跨越輪迴的親情與愛戀' },
				{ href: 'novel10.html', title: '10.陽光下的新起點' },
            { href: 'novel11.html', title: '11.渴望的溫度' },
            { href: 'novel12.html', title: '12.天使的試煉（私戀）' },
            { href: 'novel13.html', title: '13.初嚐人間煙火' },
            { href: 'novel14.html', title: '14.夢魘的託夢' },
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
            if (link.href === window.location.href) {
                link.classList.add('active');
                // 更新標題
                const currentTitle = document.querySelector('h1.chapter-title');
                if (currentTitle) {
                    currentTitle.textContent = link.dataset.title; // 更新網頁標題
                }
            }
        });
    } else {
        console.error('找不到 #novel-list-container 元素');
    }
}

// 在網頁載入完成後呼叫 insertNovelList()
window.addEventListener('load', () => {
    insertNovelList(); // 插入小說列表
});
