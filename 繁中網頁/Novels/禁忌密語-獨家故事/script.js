/**
 * 根據點擊事件顯示隱藏內容並控制按鈕的顯示/隱藏。
 * @param {string} contentClass - 要顯示的內容區塊的CSS類別名稱 (例如 'hidden-content', 'hidden-content1', 'hidden-content2')。
 * @param {string} [buttonSelectorToHide] - 點擊後要隱藏的按鈕的CSS選擇器 (例如 'a[onclick*=\'showContent();\']')。
 * @param {string} [buttonSelectorToShow] - 點擊後要顯示的按鈕的CSS選擇器 (例如 'a[onclick*=\'showContent2();\']')。
 */
function showContent(contentClass, buttonSelectorToHide, buttonSelectorToShow) {
    // 取得要顯示的內容區塊
    var hiddenContent = document.querySelector('.' + contentClass);
    if (hiddenContent) {
        // 為內容區塊添加 'show-content' 類別使其可見
        hiddenContent.classList.add('show-content');
    }

    // 如果提供了要隱藏的按鈕選擇器
    if (buttonSelectorToHide) {
        var buttonToHide = document.querySelector(buttonSelectorToHide);
        if (buttonToHide) {
            // 隱藏該按鈕
            buttonToHide.style.display = 'none';
        }
    }

    // 如果提供了要顯示的按鈕選擇器
    if (buttonSelectorToShow) {
        var buttonToShow = document.querySelector(buttonSelectorToShow);
        if (buttonToShow) {
            // 移除 'hidden-button' 類別使其可見
            buttonToShow.classList.remove('hidden-button');
        }
    }
}
