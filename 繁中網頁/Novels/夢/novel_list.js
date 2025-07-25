// 小說列表資料 (巢狀結構)
const novelListData = [
    {
        title: '《輪迴之夢》',
        chapters: [
            // 移除  副檔名，只傳遞 chapter 名稱
            { href: 'novel_reader?series=夢&chapter=novel1_content', title: '1.迷失在黑暗中' },
            { href: 'novel_reader?series=夢&chapter=novel2_content', title: '2.黑暗中的低語' },
            { href: 'novel_reader?series=夢&chapter=novel3_content', title: '3.自我的崩潰' },
            { href: 'novel_reader?series=夢&chapter=novel4_content', title: '4.黑暗中的折磨' },
            { href: 'novel_reader?series=夢&chapter=novel5_content', title: '5.無盡的迴圈' },
            { href: 'novel_reader?series=夢&chapter=novel6_content', title: '6.夢魘的降臨' },
            { href: 'novel_reader?series=夢&chapter=novel7_content', title: '7.破碎的初始' },
            { href: 'novel_reader?series=夢&chapter=novel8_content', title: '8.命運的對話' },
            { href: 'novel_reader?series=夢&chapter=novel9_content', title: '9.永恆的守護' },
        ]
    },
    {
        title: '《覺醒之夢》',
        chapters: [
            { href: 'novel_reader?series=夢&chapter=novel10_content', title: '10.逐漸回復的日常' },
            { href: 'novel_reader?series=夢&chapter=novel11_content', title: '11.突然的來訪' },
            { href: 'novel_reader?series=夢&chapter=novel12_content', title: '12.萬人迷的誕生' },
            { href: 'novel_reader?series=夢&chapter=novel13_content', title: '13.關係的揣測' },
            { href: 'novel_reader?series=夢&chapter=novel14_content', title: '14.霸凌' },
            { href: 'novel_reader?series=夢&chapter=novel15_content', title: '15.奇怪的記憶' },
            { href: 'novel_reader?series=夢&chapter=novel16_content', title: '16.曾經的夢' },
            { href: 'novel_reader?series=夢&chapter=novel17_content', title: '17.不對勁' },
            { href: 'novel_reader?series=夢&chapter=novel18_content', title: '18.遺忘的羈絆' },
        ]
    },
    {
        title: '《無盡之夢》',
        chapters: [
            { href: 'novel_reader?series=夢&chapter=novel19_content', title: '19.朋友' },
            { href: 'novel_reader?series=夢&chapter=novel20_content', title: '20.分歧' },
            { href: 'novel_reader?series=夢&chapter=novel21_content', title: '21.無可避免的對峙' },
            { href: 'novel_reader?series=夢&chapter=novel22_content', title: '22.悔恨的獨白' },
            { href: 'novel_reader?series=夢&chapter=novel23_content', title: '23.重疊的夢境' },
            { href: 'novel_reader?series=夢&chapter=novel24_content', title: '24.隱藏的細節' },
            { href: 'novel_reader?series=夢&chapter=novel25_content', title: '25.故意的真相' },
            { href: 'novel_reader?series=夢&chapter=novel26_content', title: '26.無法忽視的證據' },
            { href: 'novel_reader?series=夢&chapter=novel27_content', title: '27.消失的夢魘' },
        ]
    },
    {
        title: '《破曉之夢》',
        chapters: [
            { href: 'novel_reader?series=夢&chapter=novel28_content', title: '28.一年後的夢' },
            { href: 'novel_reader?series=夢&chapter=novel29_content', title: '29.突如其來的輪迴' },
            { href: 'novel_reader?series=夢&chapter=novel30_content', title: '30.微光的指引' },
            { href: 'novel_reader?series=夢&chapter=novel31_content', title: '31.數字之謎' },
            { href: 'novel_reader?series=夢&chapter=novel32_content', title: '32.久別的重逢' },
            { href: 'novel_reader?series=夢&chapter=novel33_content', title: '33.回溯的真相' },
            { href: 'novel_reader?series=夢&chapter=novel34_content', title: '34.暗藏危機的歡聚' },
            { href: 'novel_reader?series=夢&chapter=novel35_content', title: '35.偽造的死亡' },
            { href: 'novel_reader?series=夢&chapter=novel36_content', title: '36.鎖鏈與鑰匙' },
        ]
    },
    {
        title: '《終結之夢》',
        chapters: [
            { href: 'novel_reader?series=夢&chapter=novel37_content', title: '37.再見與發現' },
            { href: 'novel_reader?series=夢&chapter=novel38_content', title: '38.日記的啟示' },
            { href: 'novel_reader?series=夢&chapter=novel39_content', title: '39.日記的探討' },
            { href: 'novel_reader?series=夢&chapter=novel40_content', title: '40.艾利亞的歸來' },
            { href: 'novel_reader?series=夢&chapter=novel41_content', title: '41.全新的身份' },
            { href: 'novel_reader?series=夢&chapter=novel42_content', title: '42.妹妹的再臨' },
            { href: 'novel_reader?series=夢&chapter=novel43_content', title: '43.擁抱與變化' },
            { href: 'novel_reader?series=夢&chapter=novel44_content', title: '44.風波再起' },
            { href: 'novel_reader?series=夢&chapter=novel45_content', title: '45.揭開疑問' },
            { href: 'novel_reader?series=夢&chapter=novel46_content', title: '46.盟誓與永恆' },
        ]
    },
    {
        title: '《甜蜜之夢》',
        chapters: [
            { href: 'novel_reader?series=夢&chapter=extra1_content', title: '番外1.在家裡的「兄妹日常」' },
            { href: 'novel_reader?series=夢&chapter=extra2_content', title: '番外2.在夜市的「意外約會」' },
            { href: 'novel_reader?series=夢&chapter=extra3_content', title: '番外3.月光下的晚安' },
            { href: 'novel_reader?series=夢&chapter=extra4_content', title: '番外4.操場邊的秘密戀人' },
            { href: 'novel_reader?series=夢&chapter=extra5_content', title: '番外5.艾利亞與謙的推理比賽，智商超人也招架不住的「情侶暴擊」' },
            { href: 'novel_reader?series=夢&chapter=extra6_content', title: '番外6.愛的反擊戰' },
            { href: 'novel_reader?series=夢&chapter=extra7_content', title: '番外7.情書風波與公開告白' },
            { href: 'novel_reader?series=夢&chapter=extra8_content', title: '番外8.夢的盡頭是光' },
            { href: 'novel_reader?series=夢&chapter=extra9_content', title: '番外9.在夢中重建的未來' },
            { href: 'novel_reader?series=夢&chapter=extra10_content', title: '番外10.你早就是我的英雄' },
        ]
    },
    {
        title: '《月光下的秘密》',
        chapters: [
            { href: 'novel_reader?series=夢&chapter=extra11_content', title: '番外11.夢' },
            { href: 'novel_reader?series=夢&chapter=extra12_content', title: '番外12.下一晚的悸動' },
            { href: 'novel_reader?series=夢&chapter=extra13_content', title: '番外13.陽翔的主動' },
            { href: 'novel_reader?series=夢&chapter=extra14_content', title: '番外14.夢中約會' },
            { href: 'novel_reader?series=夢&chapter=extra15_content', title: '番外15.見父母的討論' },
            { href: 'novel_reader?series=夢&chapter=extra16_content', title: '番外16.艾利亞見家長' },
            { href: 'novel_reader?series=夢&chapter=extra17_content', title: '番外17.新家的秘密' },
            { href: 'novel_reader?series=夢&chapter=extra18_content', title: '番外18.雙重稱呼' },
            { href: 'novel_reader?series=夢&chapter=extra19_content', title: '番外19.為你準備的驚喜' },
            { href: 'novel_reader?series=夢&chapter=extra20_content', title: '番外20.水晶的救贖' },
            { href: 'novel_reader?series=夢&chapter=extra21_content', title: '番外21.心有靈犀的夜晚' },
            { href: 'novel_reader?series=夢&chapter=extra22_content', title: '番外22.夢魘之力的秘密' },
            { href: 'novel_reader?series=夢&chapter=extra23_content', title: '番外23.名字與孤獨的過去' },
        ]
    },
    {
        title: '《彼岸之夢》',
        chapters: [
            { href: 'novel_reader?series=夢&chapter=novel47_content', title: '47.靈魂的過去與現在' },
            { href: 'novel_reader?series=夢&chapter=novel48_content', title: '48.陷入深淵' },
            { href: 'novel_reader?series=夢&chapter=novel49_content', title: '49.幕後的操控者' },
            { href: 'novel_reader?series=夢&chapter=novel50_content', title: '50.絕望的代價' },
            { href: 'novel_reader?series=夢&chapter=novel51_content', title: '51.壓迫與孤獨的回聲' },
            { href: 'novel_reader?series=夢&chapter=novel52_content', title: '52.暗夜中的夢境審判' },
            { href: 'novel_reader?series=夢&chapter=novel53_content', title: '53.雙重虛弱與漸行漸遠的信任' },
            { href: 'novel_reader?series=夢&chapter=novel54_content', title: '54.遲來的真相' },
            { href: 'novel_reader?series=夢&chapter=novel55_content', title: '55.失落之地的啟示' },
            { href: 'novel_reader?series=夢&chapter=novel56_content', title: '56.改變命運的按鈕' },
            { href: 'novel_reader?series=夢&chapter=novel57_content', title: '57.靈魂的交織' },
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
