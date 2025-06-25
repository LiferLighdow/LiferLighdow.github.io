// 小說列表資料
const novelListData = [
    {
        title: '《微光破曉》',
        chapters: [
            { href: 'novel1.html', title: '1.命運的裂縫' },
            { href: 'novel2.html', title: '2.黃金牢籠裡的影子' },
            { href: 'novel3.html', title: '3.靜水深流' },
            { href: 'novel4.html', title: '4.光，悄然靠近' },
            { href: 'novel5.html', title: '5.拳頭與心意' },
            { href: 'novel6.html', title: '6.碎影的試煉' },
            { href: 'novel7.html', title: '7.碎裂的兄弟，沈睡的兵器' },
            { href: 'novel8.html', title: '8.局中局，笑中刃' },
            { href: 'novel9.html', title: '9.晶核重啟' },
        ]
    },
    {
        title: '《初劫之曉》',
        chapters: [
            { href: 'novel10.html', title: '10.血與靜寂' },
            { href: 'novel11.html', title: '11.兄影交錯' },
            { href: 'novel12.html', title: '12.裂與合的序章' },
            { href: 'novel13.html', title: '13.命運的第一劫' },
            { href: 'novel14.html', title: '14.三日裂界' },
            { href: 'novel15.html', title: '15.藏於陰影的名字' },
            { href: 'novel16.html', title: '16.48時限' },
            { href: 'novel17.html', title: '17.劫之紋' },
        ]
    },
    {
        title: '《寧靜之夏》',
        chapters: [
            { href: 'novel18.html', title: '18.校園餘暉' },
            { href: 'novel19.html', title: '19.新生與遠行' },
            { href: 'novel20.html', title: '20.希望的種子' },
            { href: 'novel21.html', title: '21.時空的兒子' },
            { href: 'novel22.html', title: '22.夜深思緒' },
            { href: 'novel23.html', title: '23.穿越未來的門' },
            { href: 'novel24.html', title: '24.未來初體驗' },
            { href: 'novel25.html', title: '25.一年的試煉' },
            { href: 'novel26.html', title: '26.命運與選擇' },
            { href: 'novel27.html', title: '27.變化的序章' },
        ]
    },
    {
        title: '《夏曉之謎》',
        chapters: [
            { href: 'novel28.html', title: '28.熟悉的敵人' },
            { href: 'novel29.html', title: '29.背叛與裂縫' },
            { href: 'novel30.html', title: '30.紙醉金迷的墮落' },
            { href: 'novel31.html', title: '31.宇宙之外的自己' },
            { href: 'novel32.html', title: '32.來自夢的告知' },
            { href: 'novel33.html', title: '33.測不出的存在' },
            { href: 'novel34.html', title: '34.火中夢影' },
            { href: 'novel35.html', title: '35.編碼之外的存在' },
            { href: 'novel36.html', title: '36.玄語之名' },
            { href: 'novel37.html', title: '37.死亡奏鳴' },
        ]
    },
    {
        title: '《寒夜滅明》',
        chapters: [
            { href: 'novel38.html', title: '38.被竊的節奏' },
            { href: 'novel39.html', title: '39.紅眼之咒' },
            { href: 'novel40.html', title: '40.閣樓之夜，星火之謎' },
            { href: 'novel41.html', title: '41.奏前之靜' },
            { href: 'novel42.html', title: '42.永恆的邀請' },
            { href: 'novel43.html', title: '43.靜音之戰' },
            { href: 'novel44.html', title: '44.靜夜如常，夢未已' },
            { href: 'novel45.html', title: '45.來訪之聲' },
        ]
    },
	 {
        title: '《影滅與否》',
        chapters: [
            { href: 'novel46.html', title: '46.不存在之子' },
            { href: 'novel47.html', title: '47.聲之宿主' },
            { href: 'novel48.html', title: '48.錯誤之責，守護之音' },
            { href: 'novel49.html', title: '49.譜之錯誤' },
            { href: 'novel50.html', title: '50.會議前的暗影' },
            { href: 'novel51.html', title: '51.守護者的低語' },
            { href: 'novel52.html', title: '52.旋律的回響' },
            { href: 'novel53.html', title: '53.兩個錯誤的和聲' },
            { href: 'novel54.html', title: '54.最後一毫秒的奏鳴' },
            { href: 'novel55.html', title: '55.錯誤的選擇' },
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
