// 小說列表資料 (巢狀結構)
const novelListData = [
    {
        title: '《暗夜之影》',
        chapters: [
            // novel_list.js 在 影夜/ 下，novel_reader 在 Novels/ 下，所以路徑是 novel_reader
            // 務必確保 series 參數的值與該 novel_list.js 所在的資料夾名稱一致 (例如 '影夜')
            { href: 'novel_reader?series=影夜&chapter=novel1_content', title: '1.命運的交錯' },
            { href: 'novel_reader?series=影夜&chapter=novel2_content', title: '2.錯誤的誕生' },
            { href: 'novel_reader?series=影夜&chapter=novel3_content', title: '3.為什麼' },
            { href: 'novel_reader?series=影夜&chapter=novel4_content', title: '4.轉生後的新生與新方向' },
            { href: 'novel_reader?series=影夜&chapter=novel5_content', title: '5.隕石墜落與初遇小女孩' },
            { href: 'novel_reader?series=影夜&chapter=novel6_content', title: '6.心靈與旋律' },
            { href: 'novel_reader?series=影夜&chapter=novel7_content', title: '7.月影重現' },
            { href: 'novel_reader?series=影夜&chapter=novel8_content', title: '8.艾利亞的來訪' },
            { href: 'novel_reader?series=影夜&chapter=novel9_content', title: '9.凡影與夢魘' },
        ]
    },
    {
        title: '《影樂傳奇》',
        chapters: [
            // **修正：新增  和 series 參數**
            { href: 'novel_reader?series=影夜&chapter=novel10_content', title: '10.命運的邂逅' },
            { href: 'novel_reader?series=影夜&chapter=novel11_content', title: '11.旅途的夥伴' },
            { href: 'novel_reader?series=影夜&chapter=novel12_content', title: '12.艱險的旅程與命運的安排' },
            { href: 'novel_reader?series=影夜&chapter=novel13_content', title: '13.音樂的真諦' },
            { href: 'novel_reader?series=影夜&chapter=novel14_content', title: '14.星空之門的相遇' },
            { href: 'novel_reader?series=影夜&chapter=novel15_content', title: '15.此影非彼影' },
            { href: 'novel_reader?series=影夜&chapter=novel16_content', title: '16.凡影的想法1' },
        ]
    },
    {
        title: '《夜下浮影》',
        chapters: [
            // **修正：新增  和 series 參數**
            { href: 'novel_reader?series=影夜&chapter=novel17_content', title: '17.小女孩之名' },
            { href: 'novel_reader?series=影夜&chapter=novel18_content', title: '18.多面女孩' },
            { href: 'novel_reader?series=影夜&chapter=novel19_content', title: '19.前世的迷霧' },
            { href: 'novel_reader?series=影夜&chapter=novel20_content', title: '20.詛咒的起源' },
            { href: 'novel_reader?series=影夜&chapter=novel21_content', title: '21.深夜傾訴與承諾' },
            { href: 'novel_reader?series=影夜&chapter=novel22_content', title: '22.羽夜的異變' },
            { href: 'novel_reader?series=影夜&chapter=novel23_content', title: '23.羽夜的秘密' },
            { href: 'novel_reader?series=影夜&chapter=novel24_content', title: '24.凡影的困惑' },
            { href: 'novel_reader?series=影夜&chapter=novel25_content', title: '25.驚喜的相遇' },
        ]
    },
    {
        title: '《無影之夜》',
        chapters: [
            // **修正：新增  和 series 參數**
            { href: 'novel_reader?series=影夜&chapter=novel26_content', title: '26.不期而遇的相識' },
            { href: 'novel_reader?series=影夜&chapter=novel27_content', title: '27.未知的音樂女神' },
            { href: 'novel_reader?series=影夜&chapter=novel28_content', title: '28.羽夜的身影' },
            { href: 'novel_reader?series=影夜&chapter=novel29_content', title: '29.揭露與迴避' },
            { href: 'novel_reader?series=影夜&chapter=novel30_content', title: '30.孤獨的守望' },
            { href: 'novel_reader?series=影夜&chapter=novel31_content', title: '31.過去的牽連' },
            { href: 'novel_reader?series=影夜&chapter=novel32_content', title: '32.歌聲交織的謎團' },
            { href: 'novel_reader?series=影夜&chapter=novel33_content', title: '33.羽夜的秘密行動' },
            { href: 'novel_reader?series=影夜&chapter=novel34_content', title: '34.錯亂的夢境' },
            { href: 'novel_reader?series=影夜&chapter=novel35_content', 'title': '35.回憶與失落的身影' },
        ]
    },
    {
        title: '《夜影漫舞》',
        chapters: [
            // **修正：新增  和 series 參數**
            { href: 'novel_reader?series=影夜&chapter=novel36_content', title: '36.時空的舞者' },
            { href: 'novel_reader?series=影夜&chapter=novel37_content', title: '37.心之舞台' },
            { href: 'novel_reader?series=影夜&chapter=novel38_content', title: '38.夢中的影' },
            { href: 'novel_reader?series=影夜&chapter=novel39_content', title: '39.不見的身影' },
            { href: 'novel_reader?series=影夜&chapter=novel40_content', title: '40.咒與呪' },
            { href: 'novel_reader?series=影夜&chapter=novel41_content', title: '41.呪的過去' },
            { href: 'novel_reader?series=影夜&chapter=novel42_content', title: '42.罪與守護' },
            { href: 'novel_reader?series=影夜&chapter=novel43_content', title: '43.不眠之夜' },
            { href: 'novel_reader?series=影夜&chapter=novel44_content', title: '44.夢中迷霧' },
        ]
    },
    {
        title: '《影夜之謎》',
        chapters: [
            // **修正：新增  和 series 參數**
            { href: 'novel_reader?series=影夜&chapter=novel45_content', title: '45.揭開帷幕之時' },
            { href: 'novel_reader?series=影夜&chapter=novel46_content', title: '46.羽夜的內心對話' },
            { href: 'novel_reader?series=影夜&chapter=novel47_content', title: '47.夢魘的缺席' },
            { href: 'novel_reader?series=影夜&chapter=novel48_content', title: '48.黑帽之謎' },
            { href: 'novel_reader?series=影夜&chapter=novel49_content', title: '49.被發現的秘密' },
            { href: 'novel_reader?series=影夜&chapter=novel50_content', title: '50.對峙的瞬間，交錯的內心' },
            { href: 'novel_reader?series=影夜&chapter=novel51_content', title: '51.測試與真心' },
            { href: 'novel_reader?series=影夜&chapter=novel52_content', title: '52.避重就輕' },
            { href: 'novel_reader?series=影夜&chapter=novel53_content', title: '53.小時候的真相' },
        ]
    },
    {
        title: '《初音之影》',
        chapters: [
            // **修正：新增  和 series 參數**
            { href: 'novel_reader?series=影夜&chapter=novel54_content', title: '54.探索生命的意義' },
            { href: 'novel_reader?series=影夜&chapter=novel55_content', title: '55.光明正大的旅程' },
            { href: 'novel_reader?series=影夜&chapter=novel56_content', title: '56.在夢中禁錮著你' },
            { href: 'novel_reader?series=影夜&chapter=novel57_content', title: '57.我愛你' },
            { href: 'novel_reader?series=影夜&chapter=novel58_content', title: '58.罪惡感' },
            { href: 'novel_reader?series=影夜&chapter=novel59_content', title: '59.轉瞬即逝的永恆' },
            { href: 'novel_reader?series=影夜&chapter=novel60_content', title: '60.初音未來的自由' },
            { href: 'novel_reader?series=影夜&chapter=novel61_content', title: '61.永不分離' },
        ]
    },
    {
        title: '《影夜》',
        chapters: [
            // **修正：新增  和 series 參數**
            { href: 'novel_reader?series=影夜&chapter=novel62_content', title: '62.時空的預言' },
            { href: 'novel_reader?series=影夜&chapter=novel63_content', title: '63.藍色的歸屬' },
            { href: 'novel_reader?series=影夜&chapter=novel64_content', title: '64.錯誤與錯誤的交疊' },
            { href: 'novel_reader?series=影夜&chapter=novel65_content', title: '65.新生的對話' },
            { href: 'novel_reader?series=影夜&chapter=novel66_content', title: '66.真正的覺醒' },
            { href: 'novel_reader?series=影夜&chapter=novel67_content', title: '67.音樂的秘密' },
            { href: 'novel_reader?series=影夜&chapter=novel68_content', title: '68.欺騙感情的專家' },
            { href: 'novel_reader?series=影夜&chapter=novel69_content', title: '69.早餐與誤會' },
            { href: 'novel_reader?series=影夜&chapter=novel70_content', title: '70.無止盡的誤會與夢魘的低語' },
            { href: 'novel_reader?series=影夜&chapter=novel71_content', title: '71.告別過去，迎向未來' },
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

        // 這部分現在由 Novel.js 中的 highlightCurrentChapterLink 處理
    } else {
        console.error('找不到 #novel-list-container 元素');
    }
}

// 這裡的 window.addEventListener('load') 不再需要，因為 Novel.js 會在載入 novel_list.js 後統一處理
// window.addEventListener('load', () => {
//     insertNovelList();
// });
