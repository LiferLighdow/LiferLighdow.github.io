// 小說列表資料
const novelList = `
    <ul id="chapter-list">
        <li><a href="novel1.html" data-title="1.命運的交錯">1.命運的交錯</a></li>
        <li><a href="novel2.html" data-title="2.錯誤的誕生">2.錯誤的誕生</a></li>
        <li><a href="novel3.html" data-title="3.為什麼">3.為什麼</a></li>
        <li><a href="novel4.html" data-title="4.轉生後的新生與新方向">4.轉生後的新生與新方向</a></li>
        <li><a href="novel5.html" data-title="5.隕石墜落與初遇小女孩">5.隕石墜落與初遇小女孩</a></li>
        <li><a href="novel6.html" data-title="6.心靈與旋律">6.心靈與旋律</a></li>
        <li><a href="novel7.html" data-title="7.月影重現">7.月影重現</a></li>
        <li><a href="novel8.html" data-title="8.艾利亞的來訪">8.艾利亞的來訪</a></li>
        <li><a href="novel9.html" data-title="9.凡影與夢魘">9.凡影與夢魘</a></li>
        <li><a href="novel10.html" data-title="10.命運的邂逅">10.命運的邂逅</a></li>
        <li><a href="novel11.html" data-title="11.旅途的夥伴">11.旅途的夥伴</a></li>
        <li><a href="novel12.html" data-title="12.艱險的旅程與命運的安排">12.艱險的旅程與命運的安排</a></li>
        <li><a href="novel13.html" data-title="13.音樂的真諦">13.音樂的真諦</a></li>
        <li><a href="novel14.html" data-title="14.星空之門的相遇">14.星空之門的相遇</a></li>
        <li><a href="novel15.html" data-title="15.此影非彼影">15.此影非彼影</a></li>
        <li><a href="novel16.html" data-title="16.凡影的想法1">16.凡影的想法1</a></li>
        <li><a href="novel17.html" data-title="17.小女孩之名">17.小女孩之名</a></li>
        <li><a href="novel18.html" data-title="18.多面女孩">18.多面女孩</a></li>
        <li><a href="novel19.html" data-title="19.前世的迷霧">19.前世的迷霧</a></li>
        <li><a href="novel20.html" data-title="20.詛咒的起源">20.詛咒的起源</a></li>
        <li><a href="novel21.html" data-title="21.深夜傾訴與承諾">21.深夜傾訴與承諾</a></li>
        <li><a href="novel22.html" data-title="22.羽夜的異變">22.羽夜的異變</a></li>
        <li><a href="novel23.html" data-title="23.羽夜的秘密">23.羽夜的秘密</a></li>
        <li><a href="novel24.html" data-title="24.凡影的困惑">24.凡影的困惑</a></li>
        <li><a href="novel25.html" data-title="25.驚喜的相遇">25.驚喜的相遇</a></li>
        <li><a href="novel26.html" data-title="26.不期而遇的相識">26.不期而遇的相識</a></li>
        <li><a href="novel27.html" data-title="27.未知的音樂女神">27.未知的音樂女神</a></li>
        <li><a href="novel28.html" data-title="28.羽夜的身影">28.羽夜的身影</a></li>
        <li><a href="novel29.html" data-title="29.揭露與迴避">29.揭露與迴避</a></li>
        <li><a href="novel30.html" data-title="30.孤獨的守望">30.孤獨的守望</a></li>
        <li><a href="novel31.html" data-title="31.過去的牽連">31.過去的牽連</a></li>
        <li><a href="novel32.html" data-title="32.歌聲交織的謎團">32.歌聲交織的謎團</a></li>
        <li><a href="novel33.html" data-title="33.羽夜的秘密行動">33.羽夜的秘密行動</a></li>
        <li><a href="novel34.html" data-title="34.錯亂的夢境">34.錯亂的夢境</a></li>
        <li><a href="novel35.html" data-title="35.回憶與失落的身影">35.回憶與失落的身影</a></li>
        <li><a href="novel36.html" data-title="36.時空的舞者">36.時空的舞者</a></li>
        <li><a href="novel37.html" data-title="37.心之舞台">37.心之舞台</a></li>
        <li><a href="novel38.html" data-title="38.夢中的影">38.夢中的影</a></li>
        <li><a href="novel39.html" data-title="39.不見的身影">39.不見的身影</a></li>
        <li><a href="novel40.html" data-title="40.咒與呪">40.咒與呪</a></li>
        <li><a href="novel41.html" data-title="41.呪的過去">41.呪的過去</a></li>
        <li><a href="novel42.html" data-title="42.罪與守護">42.罪與守護</a></li>
        <li><a href="novel43.html" data-title="43.不眠之夜">43.不眠之夜</a></li>
        <li><a href="novel44.html" data-title="44.夢中迷霧">44.夢中迷霧</a></li>
        <li><a href="novel45.html" data-title="45.揭開帷幕之時">45.揭開帷幕之時</a></li>
        <li><a href="novel46.html" data-title="46.羽夜的內心對話">46.羽夜的內心對話</a></li>
        <li><a href="novel47.html" data-title="47.夢魘的缺席">47.夢魘的缺席</a></li>
        <li><a href="novel48.html" data-title="48.黑帽之謎">48.黑帽之謎</a></li>
        <li><a href="novel49.html" data-title="49.被發現的秘密">49.被發現的秘密</a></li>
        <li><a href="novel50.html" data-title="50.對峙的瞬間，交錯的內心">50.對峙的瞬間，交錯的內心</a></li>
        <li><a href="novel51.html" data-title="51.測試與真心">51.測試與真心</a></li>
        <li><a href="novel52.html" data-title="52.避重就輕">52.避重就輕</a></li>
        <li><a href="novel53.html" data-title="53.小時候的真相">53.小時候的真相</a></li>
        <li><a href="novel54.html" data-title="54.探索生命的意義">54.探索生命的意義</a></li>
        <li><a href="novel55.html" data-title="55.光明正大的旅程">55.光明正大的旅程</a></li>
        <li><a href="novel56.html" data-title="56.在夢中禁錮著你">56.在夢中禁錮著你</a></li>
        <li><a href="novel57.html" data-title="57.我愛你">57.我愛你</a></li>
        <li><a href="novel58.html" data-title="58.罪惡感">58.罪惡感</a></li>
        <li><a href="novel59.html" data-title="59.轉瞬即逝的永恆">59.轉瞬即逝的永恆</a></li>
        <li><a href="novel60.html" data-title="60.初音未來的自由">60.初音未來的自由</a></li>
        <li><a href="novel61.html" data-title="61.永不分離">61.永不分離</a></li>
        <li><a href="novel62.html" data-title="62.時空的預言">62.時空的預言</a></li>
        <li><a href="novel63.html" data-title="63.藍色的歸屬">63.藍色的歸屬</a></li>
        <li><a href="novel64.html" data-title="64.錯誤與錯誤的交疊">64.錯誤與錯誤的交疊</a></li>
        <li><a href="novel65.html" data-title="65.新生的對話">65.新生的對話</a></li>
        <li><a href="novel66.html" data-title="66.真正的覺醒">66.真正的覺醒</a></li>
        <li><a href="novel67.html" data-title="67.音樂的秘密">67.音樂的秘密</a></li>
        <li><a href="novel68.html" data-title="68.欺騙感情的專家">68.欺騙感情的專家</a></li>
        <li><a href="novel69.html" data-title="69.早餐與誤會">69.早餐與誤會</a></li>
        <li><a href="novel70.html" data-title="70.無止盡的誤會與夢魘的低語">70.無止盡的誤會與夢魘的低語</a></li>
        <li><a href="novel71.html" data-title="71.告別過去，迎向未來">71.告別過去，迎向未來</a></li>
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