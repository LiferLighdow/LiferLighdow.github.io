// 小說列表資料
const novelList = `
    <ul id="chapter-list">
        <li><a href="novel1.html" data-title="1.迷失在黑暗中">1.迷失在黑暗中</a></li>
        <li><a href="novel2.html" data-title="2.黑暗中的低語">2.黑暗中的低語</a></li>
        <li><a href="novel3.html" data-title="3.自我的崩潰">3.自我的崩潰</a></li>
        <li><a href="novel4.html" data-title="4.黑暗中的折磨">4.黑暗中的折磨</a></li>
        <li><a href="novel5.html" data-title="5.無盡的迴圈">5.無盡的迴圈</a></li>
        <li><a href="novel6.html" data-title="6.夢魘的降臨">6.夢魘的降臨</a></li>
        <li><a href="novel7.html" data-title="7.破碎的初始">7.破碎的初始</a></li>
        <li><a href="novel8.html" data-title="8.命運的對話">8.命運的對話</a></li>
        <li><a href="novel9.html" data-title="9.永恆的守護">9.永恆的守護</a></li>
        <li><a href="novel10.html" data-title="10.逐漸回復的日常">10.逐漸回復的日常</a></li>
        <li><a href="novel11.html" data-title="11.突然的來訪">11.突然的來訪</a></li>
        <li><a href="novel12.html" data-title="12.萬人迷的誕生">12.萬人迷的誕生</a></li>
        <li><a href="novel13.html" data-title="13.關係的揣測">13.關係的揣測</a></li>
        <li><a href="novel14.html" data-title="14.霸凌">14.霸凌</a></li>
        <li><a href="novel15.html" data-title="15.奇怪的記憶">15.奇怪的記憶</a></li>
        <li><a href="novel16.html" data-title="16.曾經的夢">16.曾經的夢</a></li>
        <li><a href="novel17.html" data-title="17.不對勁">17.不對勁</a></li>
        <li><a href="novel18.html" data-title="18.遺忘的羈絆">18.遺忘的羈絆</a></li>
        <li><a href="novel19.html" data-title="19.朋友">19.朋友</a></li>
        <li><a href="novel20.html" data-title="20.分歧">20.分歧</a></li>
        <li><a href="novel21.html" data-title="21.無可避免的對峙">21.無可避免的對峙</a></li>
        <li><a href="novel22.html" data-title="22.悔恨的獨白">22.悔恨的獨白</a></li>
        <li><a href="novel23.html" data-title="23.重疊的夢境">23.重疊的夢境</a></li>
        <li><a href="novel24.html" data-title="24.隱藏的細節">24.隱藏的細節</a></li>
        <li><a href="novel25.html" data-title="25.故意的真相">25.故意的真相</a></li>
        <li><a href="novel26.html" data-title="26.無法忽視的證據">26.無法忽視的證據</a></li>
        <li><a href="novel27.html" data-title="27.消失的夢魘">27.消失的夢魘</a></li>
        <li><a href="novel28.html" data-title="28.一年後的夢">28.一年後的夢</a></li>
        <li><a href="novel29.html" data-title="29.突如其來的輪迴">29.突如其來的輪迴</a></li>
        <li><a href="novel30.html" data-title="30.微光的指引">30.微光的指引</a></li>
        <li><a href="novel31.html" data-title="31.數字之謎">31.數字之謎</a></li>
        <li><a href="novel32.html" data-title="32.久別的重逢">32.久別的重逢</a></li>
        <li><a href="novel33.html" data-title="33.回溯的真相">33.回溯的真相</a></li>
        <li><a href="novel34.html" data-title="34.暗藏危機的歡聚">34.暗藏危機的歡聚</a></li>
        <li><a href="novel35.html" data-title="35.偽造的死亡">35.偽造的死亡</a></li>
        <li><a href="novel36.html" data-title="36.鎖鏈與鑰匙">36.鎖鏈與鑰匙</a></li>
        <li><a href="novel37.html" data-title="37.再見與發現">37.再見與發現</a></li>
        <li><a href="novel38.html" data-title="38.日記的啟示">38.日記的啟示</a></li>
        <li><a href="novel39.html" data-title="39.日記的探討">39.日記的探討</a></li>
        <li><a href="novel40.html" data-title="40.艾利亞的歸來">40.艾利亞的歸來</a></li>
        <li><a href="novel41.html" data-title="41.全新的身份">41.全新的身份</a></li>
        <li><a href="novel42.html" data-title="42.妹妹的再臨">42.妹妹的再臨</a></li>
        <li><a href="novel43.html" data-title="43.擁抱與變化">43.擁抱與變化</a></li>
        <li><a href="novel44.html" data-title="44.風波再起">44.風波再起</a></li>
        <li><a href="novel45.html" data-title="45.揭開疑問">45.揭開疑問</a></li>
        <li><a href="novel46.html" data-title="46.盟誓與永恆">46.盟誓與永恆</a></li>
        <li><a href="extra1.html" data-title="番外1.在家裡的「兄妹日常」">番外1.在家裡的「兄妹日常」</a></li>
        <li><a href="extra2.html" data-title="番外2.在夜市的「意外約會」">番外2.在夜市的「意外約會」</a></li>
        <li><a href="extra3.html" data-title="番外3.月光下的晚安">番外3.月光下的晚安</a></li>
        <li><a href="extra4.html" data-title="番外4.操場邊的秘密戀人">番外4.操場邊的秘密戀人</a></li>
        <li><a href="extra5.html" data-title="番外5.艾利亞與謙的推理比賽，智商超人也招架不住的「情侶暴擊」">番外5.艾利亞與謙的推理比賽，智商超人也招架不住的「情侶暴擊」</a></li>
        <li><a href="extra6.html" data-title="番外6.愛的反擊戰">番外6.愛的反擊戰</a></li>
        <li><a href="extra7.html" data-title="番外7.情書風波與公開告白">番外7.情書風波與公開告白</a></li>
        <li><a href="extra8.html" data-title="番外8.夢的盡頭是光">番外8.夢的盡頭是光</a></li>
        <li><a href="extra9.html" data-title="番外9.在夢中重建的未來">番外9.在夢中重建的未來</a></li>
        <li><a href="extra10.html" data-title="番外10.你早就是我的英雄">番外10.你早就是我的英雄</a></li>
        <li><a href="extra11.html" data-title="番外11.月光下的秘密">番外11.月光下的秘密</a></li>
        <li><a href="extra12.html" data-title="番外12.下一晚的悸動">番外12.下一晚的悸動</a></li>
        <li><a href="extra13.html" data-title="番外13.陽翔的主動">番外13.陽翔的主動</a></li>
        <li><a href="extra14.html" data-title="番外14.夢中約會">番外14.夢中約會</a></li>
        <li><a href="extra15.html" data-title="番外15.見父母的討論">番外15.見父母的討論</a></li>
        <li><a href="extra16.html" data-title="番外16.艾利亞見家長">番外16.艾利亞見家長</a></li>
        <li><a href="extra17.html" data-title="番外17.新家的秘密">番外17.新家的秘密</a></li>
        <li><a href="extra18.html" data-title="番外18.雙重稱呼">番外18.雙重稱呼</a></li>
        <li><a href="extra19.html" data-title="番外19.為你準備的驚喜">番外19.為你準備的驚喜</a></li>
        <li><a href="extra20.html" data-title="番外20.水晶的救贖">番外20.水晶的救贖</a></li>
        <li><a href="extra21.html" data-title="番外21.心有靈犀的夜晚">番外21.心有靈犀的夜晚</a></li>
        <li><a href="extra22.html" data-title="番外22.夢魘之力的秘密">番外22.夢魘之力的秘密</a></li>
        <li><a href="extra23.html" data-title="番外23.名字與孤獨的過去">番外23.名字與孤獨的過去</a></li>
        <li><a href="novel47.html" data-title="47.靈魂的過去與現在">47.靈魂的過去與現在</a></li>
        <li><a href="novel48.html" data-title="48.陷入深淵">48.陷入深淵</a></li>
        <li><a href="novel49.html" data-title="49.幕後的操控者">49.幕後的操控者</a></li>
        <li><a href="novel50.html" data-title="50.絕望的代價">50.絕望的代價</a></li>
        <li><a href="novel51.html" data-title="51.壓迫與孤獨的回聲">51.壓迫與孤獨的回聲</a></li>
        <li><a href="novel52.html" data-title="52.暗夜中的夢境審判">52.暗夜中的夢境審判</a></li>
        <li><a href="novel53.html" data-title="53.雙重虛弱與漸行漸遠的信任">53.雙重虛弱與漸行漸遠的信任</a></li>
        <li><a href="novel54.html" data-title="54.遲來的真相">54.遲來的真相</a></li>
        <li><a href="novel55.html" data-title="55.失落之地的啟示">55.失落之地的啟示</a></li>
        <li><a href="novel56.html" data-title="56.改變命運的按鈕">56.改變命運的按鈕</a></li>
        <li><a href="novel57.html" data-title="57.靈魂的交織">57.靈魂的交織</a></li>
    </ul>
`;

// 將小說列表插入到 #novel-list-container 元素中
function insertNovelList() {
    const novelListContainer = document.getElementById('novel-list-container');
    if (novelListContainer) {
        novelListContainer.innerHTML = novelList;

        // 在插入列表後，高亮顯示目前讀取的篇章
        const chapterLinks = novelListContainer.querySelectorAll('#chapter-list a');
        chapterLinks.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add('active');
            }
        });

        // 更新標題
        const currentTitle = document.querySelector('h1.chapter-title');
        if (currentTitle) {
            chapterLinks.forEach(link => {
                if (link.href === window.location.href) {
                    currentTitle.textContent = link.dataset.title;
                }
            });
        }
    } else {
        console.error('找不到 #novel-list-container 元素');
    }
}

// 在網頁載入完成後呼叫 insertNovelList()
window.addEventListener('load', () => {
    insertNovelList(); // 插入小說列表
});