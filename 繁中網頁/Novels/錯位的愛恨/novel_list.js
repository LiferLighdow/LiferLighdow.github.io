// 小說列表資料
const novelListData = [
    {
        title: '主線',
        chapters: [
            { href: 'novel1.html', title: '1.明與暗的獨白' },
            { href: 'novel2.html', title: '2.幻色的誓言' },
            { href: 'novel3.html', title: '3.留言牆之誤' },
            { href: 'novel4.html', title: '4.雨中狹路相逢' },
            { href: 'novel5.html', title: '5.裂縫中的教室' },
            { href: 'novel6.html', title: '6.真相的輪廓' },
            { href: 'novel7.html', title: '7.裂痕的兩端' },
            { href: 'novel8.html', title: '8.相遇的距離' },
            { href: 'novel9.html', title: '9.雨中之間' },
				{ href: 'novel10.html', title: '10.消失的光' },
            { href: 'novel11.html', title: '11.聲音的距離' },
            { href: 'novel12.html', title: '12.空氣中的聲音' },
            { href: 'novel13.html', title: '13.再見與遲疑' },
            { href: 'novel14.html', title: '14.跨越光線' },
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
