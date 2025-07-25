// 小說列表資料
const novelListData = [
    {
        title: '《微光破曉》',
        chapters: [
            // 將 href 指向 novel_reader，並傳遞 series 和 chapter 參數（無副檔名）
            // 假設這個 novel_list.js 位於 my_project_root/繁中網頁/Novels/夏曉/
            // 而 novel_reader.html 位於 my_project_root/繁中網頁/Novels/
            // 所以相對路徑是 ../novel_reader
            { href: '../novel_reader?series=夏曉&chapter=novel1_content', title: '1.命運的裂縫' },
            { href: '../novel_reader?series=夏曉&chapter=novel2_content', title: '2.黃金牢籠裡的影子' },
            { href: '../novel_reader?series=夏曉&chapter=novel3_content', title: '3.靜水深流' },
            { href: '../novel_reader?series=夏曉&chapter=novel4_content', title: '4.光，悄然靠近' },
            { href: '../novel_reader?series=夏曉&chapter=novel5_content', title: '5.拳頭與心意' },
            { href: '../novel_reader?series=夏曉&chapter=novel6_content', title: '6.碎影的試煉' },
            { href: '../novel_reader?series=夏曉&chapter=novel7_content', title: '7.碎裂的兄弟，沈睡的兵器' },
            { href: '../novel_reader?series=夏曉&chapter=novel8_content', title: '8.局中局，笑中刃' },
            { href: '../novel_reader?series=夏曉&chapter=novel9_content', title: '9.晶核重啟' },
        ]
    },
    {
        title: '《初劫之曉》',
        chapters: [
            { href: '../novel_reader?series=夏曉&chapter=novel10_content', title: '10.血與靜寂' },
            { href: '../novel_reader?series=夏曉&chapter=novel11_content', title: '11.兄影交錯' },
            { href: '../novel_reader?series=夏曉&chapter=novel12_content', title: '12.裂與合的序章' },
            { href: '../novel_reader?series=夏曉&chapter=novel13_content', title: '13.命運的第一劫' },
            { href: '../novel_reader?series=夏曉&chapter=novel14_content', title: '14.三日裂界' },
            { href: '../novel_reader?series=夏曉&chapter=novel15_content', title: '15.藏於陰影的名字' },
            { href: '../novel_reader?series=夏曉&chapter=novel16_content', title: '16.48時限' },
            { href: '../novel_reader?series=夏曉&chapter=novel17_content', title: '17.劫之紋' },
        ]
    },
    {
        title: '《寧靜之夏》',
        chapters: [
            { href: '../novel_reader?series=夏曉&chapter=novel18_content', title: '18.校園餘暉' },
            { href: '../novel_reader?series=夏曉&chapter=novel19_content', title: '19.新生與遠行' },
            { href: '../novel_reader?series=夏曉&chapter=novel20_content', title: '20.希望的種子' },
            { href: '../novel_reader?series=夏曉&chapter=novel21_content', title: '21.時空的兒子' },
            { href: '../novel_reader?series=夏曉&chapter=novel22_content', title: '22.夜深思緒' },
            { href: '../novel_reader?series=夏曉&chapter=novel23_content', title: '23.穿越未來的門' },
            { href: '../novel_reader?series=夏曉&chapter=novel24_content', title: '24.未來初體驗' },
            { href: '../novel_reader?series=夏曉&chapter=novel25_content', title: '25.一年的試煉' },
            { href: '../novel_reader?series=夏曉&chapter=novel26_content', title: '26.命運與選擇' },
            { href: '../novel_reader?series=夏曉&chapter=novel27_content', title: '27.變化的序章' },
        ]
    },
    {
        title: '《夏曉之謎》',
        chapters: [
            { href: '../novel_reader?series=夏曉&chapter=novel28_content', title: '28.熟悉的敵人' },
            { href: '../novel_reader?series=夏曉&chapter=novel29_content', title: '29.背叛與裂縫' },
            { href: '../novel_reader?series=夏曉&chapter=novel30_content', title: '30.紙醉金迷的墮落' },
            { href: '../novel_reader?series=夏曉&chapter=novel31_content', title: '31.宇宙之外的自己' },
            { href: '../novel_reader?series=夏曉&chapter=novel32_content', title: '32.來自夢的告知' },
            { href: '../novel_reader?series=夏曉&chapter=novel33_content', title: '33.測不出的存在' },
            { href: '../novel_reader?series=夏曉&chapter=novel34_content', title: '34.火中夢影' },
            { href: '../novel_reader?series=夏曉&chapter=novel35_content', title: '35.編碼之外的存在' },
            { href: '../novel_reader?series=夏曉&chapter=novel36_content', title: '36.玄語之名' },
            { href: '../novel_reader?series=夏曉&chapter=novel37_content', title: '37.死亡奏鳴' },
        ]
    },
    {
        title: '《寒夜滅明》',
        chapters: [
            { href: '../novel_reader?series=夏曉&chapter=novel38_content', title: '38.被竊的節奏' },
            { href: '../novel_reader?series=夏曉&chapter=novel39_content', title: '39.紅眼之咒' },
            { href: '../novel_reader?series=夏曉&chapter=novel40_content', title: '40.閣樓之夜，星火之謎' },
            { href: '../novel_reader?series=夏曉&chapter=novel41_content', title: '41.奏前之靜' },
            { href: '../novel_reader?series=夏曉&chapter=novel42_content', title: '42.永恆的邀請' },
            { href: '../novel_reader?series=夏曉&chapter=novel43_content', title: '43.靜音之戰' },
            { href: '../novel_reader?series=夏曉&chapter=novel44_content', title: '44.靜夜如常，夢未已' },
            { href: '../novel_reader?series=夏曉&chapter=novel45_content', title: '45.來訪之聲' },
        ]
    },
	 {
        title: '《影滅與否》',
        chapters: [
            { href: '../novel_reader?series=夏曉&chapter=novel46_content', title: '46.不存在之子' },
            { href: '../novel_reader?series=夏曉&chapter=novel47_content', title: '47.聲之宿主' },
            { href: '../novel_reader?series=夏曉&chapter=novel48_content', title: '48.錯誤之責，守護之音' },
            { href: '../novel_reader?series=夏曉&chapter=novel49_content', title: '49.譜之錯誤' },
            { href: '../novel_reader?series=夏曉&chapter=novel50_content', title: '50.會議前的暗影' },
            { href: '../novel_reader?series=夏曉&chapter=novel51_content', title: '51.守護者的低語' },
            { href: '../novel_reader?series=夏曉&chapter=novel52_content', title: '52.旋律的回響' },
            { href: '../novel_reader?series=夏曉&chapter=novel53_content', title: '53.兩個錯誤的和聲' },
            { href: '../novel_reader?series=夏曉&chapter=novel54_content', title: '54.最後一毫秒的奏鳴' },
            { href: '../novel_reader?series=夏曉&chapter=novel55_content', title: '55.錯誤的選擇' },
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
