// 小說列表資料 (巢狀結構)
const novelListData = [
    {
        title: '《暗夜之影》',
        chapters: [
            { href: 'novel1.html', title: '1.命運的交錯' },
            { href: 'novel2.html', title: '2.錯誤的誕生' },
            { href: 'novel3.html', title: '3.為什麼' },
            { href: 'novel4.html', title: '4.轉生後的新生與新方向' },
            { href: 'novel5.html', title: '5.隕石墜落與初遇小女孩' },
            { href: 'novel6.html', title: '6.心靈與旋律' },
            { href: 'novel7.html', title: '7.月影重現' },
            { href: 'novel8.html', title: '8.艾利亞的來訪' },
            { href: 'novel9.html', title: '9.凡影與夢魘' },
        ]
    },
    {
        title: '《影樂傳奇》',
        chapters: [
            { href: 'novel10.html', title: '10.命運的邂逅' },
            { href: 'novel11.html', title: '11.旅途的夥伴' },
            { href: 'novel12.html', title: '12.艱險的旅程與命運的安排' },
            { href: 'novel13.html', title: '13.音樂的真諦' },
            { href: 'novel14.html', title: '14.星空之門的相遇' },
            { href: 'novel15.html', title: '15.此影非彼影' },
            { href: 'novel16.html', title: '16.凡影的想法1' },
        ]
    },
    {
        title: '《夜下浮影》',
        chapters: [
            { href: 'novel17.html', title: '17.小女孩之名' },
            { href: 'novel18.html', title: '18.多面女孩' },
            { href: 'novel19.html', title: '19.前世的迷霧' },
            { href: 'novel20.html', title: '20.詛咒的起源' },
            { href: 'novel21.html', title: '21.深夜傾訴與承諾' },
            { href: 'novel22.html', title: '22.羽夜的異變' },
            { href: 'novel23.html', title: '23.羽夜的秘密' },
            { href: 'novel24.html', title: '24.凡影的困惑' },
            { href: 'novel25.html', title: '25.驚喜的相遇' },
        ]
    },
    {
        title: '《無影之夜》',
        chapters: [
            { href: 'novel26.html', title: '26.不期而遇的相識' },
            { href: 'novel27.html', title: '27.未知的音樂女神' },
            { href: 'novel28.html', title: '28.羽夜的身影' },
            { href: 'novel29.html', title: '29.揭露與迴避' },
            { href: 'novel30.html', title: '30.孤獨的守望' },
            { href: 'novel31.html', title: '31.過去的牽連' },
            { href: 'novel32.html', title: '32.歌聲交織的謎團' },
            { href: 'novel33.html', title: '33.羽夜的秘密行動' },
            { href: 'novel34.html', title: '34.錯亂的夢境' },
            { href: 'novel35.html', title: '35.回憶與失落的身影' },
        ]
    },
    {
        title: '《夜影漫舞》',
        chapters: [
            { href: 'novel36.html', title: '36.時空的舞者' },
            { href: 'novel37.html', title: '37.心之舞台' },
            { href: 'novel38.html', title: '38.夢中的影' },
            { href: 'novel39.html', title: '39.不見的身影' },
            { href: 'novel40.html', title: '40.咒與呪' },
            { href: 'novel41.html', title: '41.呪的過去' },
            { href: 'novel42.html', title: '42.罪與守護' },
            { href: 'novel43.html', title: '43.不眠之夜' },
            { href: 'novel44.html', title: '44.夢中迷霧' },
        ]
    },
    {
        title: '《影夜之謎》',
        chapters: [
            { href: 'novel45.html', title: '45.揭開帷幕之時' },
            { href: 'novel46.html', title: '46.羽夜的內心對話' },
            { href: 'novel47.html', title: '47.夢魘的缺席' },
            { href: 'novel48.html', title: '48.黑帽之謎' },
            { href: 'novel49.html', title: '49.被發現的秘密' },
            { href: 'novel50.html', title: '50.對峙的瞬間，交錯的內心' },
            { href: 'novel51.html', title: '51.測試與真心' },
            { href: 'novel52.html', title: '52.避重就輕' },
            { href: 'novel53.html', title: '53.小時候的真相' },
        ]
    },
    {
        title: '《初音之影》',
        chapters: [
            { href: 'novel54.html', title: '54.探索生命的意義' },
            { href: 'novel55.html', title: '55.光明正大的旅程' },
            { href: 'novel56.html', title: '56.在夢中禁錮著你' },
            { href: 'novel57.html', title: '57.我愛你' },
            { href: 'novel58.html', title: '58.罪惡感' },
            { href: 'novel59.html', title: '59.轉瞬即逝的永恆' },
            { href: 'novel60.html', title: '60.初音未來的自由' },
            { href: 'novel61.html', title: '61.永不分離' },
        ]
    },
    {
        title: '《影夜聚一》',
        chapters: [
            { href: 'novel62.html', title: '62.時空的預言' },
            { href: 'novel63.html', title: '63.藍色的歸屬' },
            { href: 'novel64.html', title: '64.錯誤與錯誤的交疊' },
            { href: 'novel65.html', title: '65.新生的對話' },
            { href: 'novel66.html', title: '66.真正的覺醒' },
            { href: 'novel67.html', title: '67.音樂的秘密' },
            { href: 'novel68.html', title: '68.欺騙感情的專家' },
            { href: 'novel69.html', title: '69.早餐與誤會' },
            { href: 'novel70.html', title: '70.無止盡的誤會與夢魘的低語' },
            { href: 'novel71.html', title: '71.告別過去，迎向未來' },
        ]
    }
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
