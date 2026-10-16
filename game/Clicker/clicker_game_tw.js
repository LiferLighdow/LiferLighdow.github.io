document.addEventListener("DOMContentLoaded", () => {
    // 遊戲狀態變數
    let money = 0;
    let autoClickers = 0;
    let farms = 0;
    let mines = 0;
    let banks = 0;
    let stockExchanges = 0;
    let myLevel = 1;

    // 升級等級 (預設為1)
    let clickerLevel = 1;
    let autoClickerLevel = 1;
    let farmLevel = 1;
    let mineLevel = 1;
    let bankLevel = 1;
    let stockExchangeLevel = 1;

    // 基礎產量值 (這些值不會隨等級變化，而是等級的乘數)
    const baseClickValue = 1; // 點擊器基礎每次點擊金錢
    const baseAutoClickerValue = 1; // 自動點擊器基礎每秒產量
    const baseFarmValue = 5; // 農場基礎每秒產量
    const baseMineValue = 20; // 礦場基礎每秒產量
    const baseBankValue = 100; // 銀行基礎每秒產量
    const baseStockExchangeValue = 500; // 股票交易所基礎每秒產量

    // 價格數值 (價格會根據遊戲進度改變)
    let clickerUpgradeCostValue = 10;
    let autoClickerUpgradeCostValue = 50;
    let farmUpgradeCostValue = 250;
    let mineUpgradeCostValue = 1000;
    let bankUpgradeCostValue = 5000;
    let stockExchangeUpgradeCostValue = 25000;

    let autoClickerCostValue = 10;
    let farmCostValue = 50;
    let mineCostValue = 200;
    let bankCostValue = 1000;
    let stockExchangeCostValue = 5000;

    let nextResetLevelValue = 10;
    let prestigeCost = 10000;

    // 獎勵冷卻時間 (秒)
    let collectBonusCooldown = 0;
    const COLLECT_BONUS_MAX_COOLDOWN = 300; // 5 分鐘
    let megaBonusCooldown = 0;
    const MEGA_BONUS_MAX_COOLDOWN = 1800; // 30 分鐘

    // HTML 元素綁定
    const moneyDisplay = document.getElementById("money");
    const clickButton = document.getElementById("clickButton");
    const clickValueDisplay = document.getElementById("clickValueDisplay");
    const messageDisplay = document.getElementById("message");
    const floatingTextContainer = document.getElementById("gameContainer"); // 浮動文字容器改為 gameContainer

    const myLevelDisplay = document.getElementById("myLevelDisplay");

    const clickerCountDisplay = document.getElementById("clickerCount");
    const clickerLevelDisplay = document.getElementById("clickerLevel");
    const clickerUpgradeButton = document.getElementById("clickerUpgradeButton");
    const clickerUpgradeCostDisplay = document.getElementById("clickerUpgradeCost");
    const clickerUpgradeAmountDisplay = document.getElementById("clickerUpgradeAmount");

    const autoClickerCountDisplay = document.getElementById("autoClickerCount");
    const autoClickerLevelDisplay = document.getElementById("autoClickerLevelDisplay");
    const autoClickerButton = document.getElementById("autoClickerButton");
    const autoClickerCostDisplay = document.getElementById("autoClickerCost");
    const autoClickerUpgradeButton = document.getElementById("autoClickerUpgradeButton");
    const autoClickerUpgradeCostDisplay = document.getElementById("autoClickerUpgradeCost");
    const autoClickerUpgradeAmountDisplay = document.getElementById("autoClickerUpgradeAmount");

    const farmCountDisplay = document.getElementById("farmCount");
    const farmLevelDisplay = document.getElementById("farmLevelDisplay");
    const farmButton = document.getElementById("farmButton");
    const farmCostDisplay = document.getElementById("farmCost");
    const farmUpgradeButton = document.getElementById("farmUpgradeButton");
    const farmUpgradeCostDisplay = document.getElementById("farmUpgradeCost");
    const farmUpgradeAmountDisplay = document.getElementById("farmUpgradeAmount");

    const mineCountDisplay = document.getElementById("mineCount");
    const mineLevelDisplay = document.getElementById("mineLevelDisplay");
    const mineButton = document.getElementById("mineButton");
    const mineCostDisplay = document.getElementById("mineCost");
    const mineUpgradeButton = document.getElementById("mineUpgradeButton");
    const mineUpgradeCostDisplay = document.getElementById("mineUpgradeCost");
    const mineUpgradeAmountDisplay = document.getElementById("mineUpgradeAmount");

    const bankCountDisplay = document.getElementById("bankCount");
    const bankLevelDisplay = document.getElementById("bankLevelDisplay");
    const bankButton = document.getElementById("bankButton");
    const bankCostDisplay = document.getElementById("bankCost");
    const bankUpgradeButton = document.getElementById("bankUpgradeButton");
    const bankUpgradeCostDisplay = document.getElementById("bankUpgradeCost");
    const bankUpgradeAmountDisplay = document.getElementById("bankUpgradeAmount");

    const stockExchangeCountDisplay = document.getElementById("stockExchangeCount");
    const stockExchangeLevelDisplay = document.getElementById("stockExchangeLevelDisplay");
    const stockExchangeButton = document.getElementById("stockExchangeButton");
    const stockExchangeCostDisplay = document.getElementById("stockExchangeCost");
    const stockExchangeUpgradeButton = document.getElementById("stockExchangeUpgradeButton");
    const stockExchangeUpgradeCostDisplay = document.getElementById("stockExchangeUpgradeCost");
    const stockExchangeUpgradeAmountDisplay = document.getElementById("stockExchangeUpgradeAmount");

    const prestigeButton = document.getElementById("prestigeButton");
    const prestigeCostDisplay = document.getElementById("prestigeCostDisplay");
    const nextResetLevelDisplay = document.getElementById("nextResetLevel");

    const collectBonusButton = document.getElementById("collectBonusButton");
    const megaBonusButton = document.getElementById("megaBonusButton");
    const resetGameButton = document.getElementById("resetGameButton");
    const fullResetButton = document.getElementById("fullResetButton");

    // 新增的說明按鈕和模態框元素
    const showInstructionsButton = document.getElementById("showInstructionsButton");
    const instructionModal = document.getElementById("instructionModal");
    const closeButton = instructionModal.querySelector(".close-button");


    // 輔助函數
    function formatNumber(num) {
        // 確保所有數字都顯示兩位小數
        if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + "T";
        if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "B";
        if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
        if (num >= 1000) return (num / 1000).toFixed(2) + "K";
        return num.toFixed(2); // 修正：小於1000的數字也顯示兩位小數
    }

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [h, m, s]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":");
    }

    function showMessage(msg) {
        messageDisplay.textContent = msg;
        messageDisplay.style.opacity = 1;
        messageDisplay.style.animation = 'none'; // 重置動畫
        void messageDisplay.offsetWidth; // 觸發重繪
        messageDisplay.style.animation = 'fadeinout 3s forwards'; // 重新應用動畫
    }

    function showFloatingText(x, y, text) {
        const floatingText = document.createElement("div");
        floatingText.classList.add("floating-text");
        floatingText.textContent = text;
        
        // 確保浮動文字相對於 gameContainer 定位
        const containerRect = floatingTextContainer.getBoundingClientRect();
        floatingText.style.left = `${x - containerRect.left}px`;
        floatingText.style.top = `${y - containerRect.top}px`;
        
        floatingTextContainer.appendChild(floatingText);

        floatingText.addEventListener('animationend', () => {
            floatingText.remove();
        });
    }

    function updateMoneyDisplay() {
        moneyDisplay.textContent = `金錢: ${formatNumber(money)}`;
    }

    function updateButtonAvailability() {
        // 點擊器升級
        clickerUpgradeButton.disabled = money < clickerUpgradeCostValue;

        // 自動點擊器購買和升級
        autoClickerButton.disabled = money < autoClickerCostValue;
        autoClickerUpgradeButton.disabled = money < autoClickerUpgradeCostValue;

        // 農場購買和升級
        farmButton.disabled = money < farmCostValue;
        farmUpgradeButton.disabled = money < farmUpgradeCostValue;

        // 礦場購買和升級
        mineButton.disabled = money < mineCostValue;
        mineUpgradeButton.disabled = money < mineUpgradeCostValue;

        // 銀行購買和升級 (需要農場數量)
        bankButton.disabled = money < bankCostValue || farms < 10;
        bankUpgradeButton.disabled = money < bankUpgradeCostValue;

        // 股票交易所購買和升級 (需要礦場數量)
        stockExchangeButton.disabled = money < stockExchangeCostValue || mines < 5;
        stockExchangeUpgradeButton.disabled = money < stockExchangeUpgradeCostValue;

        // Prestige 按鈕
        prestigeButton.disabled = money < prestigeCost;

        // 重置貨物按鈕
        resetGameButton.disabled = myLevel < nextResetLevelValue;

        // 獎勵按鈕
        collectBonusButton.disabled = collectBonusCooldown > 0;
        megaBonusButton.disabled = megaBonusCooldown > 0;
    }

    function updateInventoryDisplay() {
        myLevelDisplay.textContent = myLevel;

        clickerCountDisplay.textContent = "1"; // 修正：點擊器數量應固定為1
        clickerLevelDisplay.textContent = clickerLevel; // 點擊器等級

        autoClickerCountDisplay.textContent = autoClickers;
        autoClickerLevelDisplay.textContent = autoClickerLevel;

        farmCountDisplay.textContent = farms;
        farmLevelDisplay.textContent = farmLevel;

        mineCountDisplay.textContent = mines;
        mineLevelDisplay.textContent = mineLevel;

        bankCountDisplay.textContent = banks;
        bankLevelDisplay.textContent = bankLevel;

        stockExchangeCountDisplay.textContent = stockExchanges;
        stockExchangeLevelDisplay.textContent = stockExchangeLevel;
    }

    // 計算當前點擊器和建築物的實際產量
    function getCurrentClickAmount() {
        return baseClickValue * clickerLevel * myLevel;
    }

    function getCurrentAutoClickerIncomePerUnit() {
        return baseAutoClickerValue * autoClickerLevel;
    }

    function getCurrentFarmIncomePerUnit() {
        return baseFarmValue * farmLevel;
    }

    function getCurrentMineIncomePerUnit() {
        return baseMineValue * mineLevel;
    }

    function getCurrentBankIncomePerUnit() {
        return baseBankValue * bankLevel;
    }

    function getCurrentStockExchangeIncomePerUnit() {
        return baseStockExchangeValue * stockExchangeLevel;
    }


    function updateUpgradeButtonText() {
        // 點擊器顯示的是每次點擊的總量
        clickValueDisplay.textContent = formatNumber(getCurrentClickAmount());
        clickerUpgradeCostDisplay.textContent = formatNumber(clickerUpgradeCostValue);
        clickerUpgradeAmountDisplay.textContent = formatNumber(getCurrentClickAmount() + (baseClickValue * myLevel)); // 顯示升級後的總量

        // 其他建築物顯示的是「每單位」的產量
        autoClickerUpgradeCostDisplay.textContent = formatNumber(autoClickerUpgradeCostValue);
        autoClickerUpgradeAmountDisplay.textContent = formatNumber(getCurrentAutoClickerIncomePerUnit());

        farmUpgradeCostDisplay.textContent = formatNumber(farmUpgradeCostValue);
        farmUpgradeAmountDisplay.textContent = formatNumber(getCurrentFarmIncomePerUnit());

        mineUpgradeCostDisplay.textContent = formatNumber(mineUpgradeCostValue);
        mineUpgradeAmountDisplay.textContent = formatNumber(getCurrentMineIncomePerUnit());

        bankUpgradeCostDisplay.textContent = formatNumber(bankUpgradeCostValue);
        bankUpgradeAmountDisplay.textContent = formatNumber(getCurrentBankIncomePerUnit());

        stockExchangeUpgradeCostDisplay.textContent = formatNumber(stockExchangeUpgradeCostValue);
        stockExchangeUpgradeAmountDisplay.textContent = formatNumber(getCurrentStockExchangeIncomePerUnit());
    }

    function updateBuildingCostText() {
        autoClickerCostDisplay.textContent = formatNumber(autoClickerCostValue);
        farmCostDisplay.textContent = formatNumber(farmCostValue);
        mineCostDisplay.textContent = formatNumber(mineCostValue);
        bankCostDisplay.textContent = formatNumber(bankCostValue);
        stockExchangeCostDisplay.textContent = formatNumber(stockExchangeCostValue);
    }

    function updatePrestigeButtonText() {
        prestigeCostDisplay.textContent = formatNumber(prestigeCost);
        nextResetLevelDisplay.textContent = nextResetLevelValue;
    }

    function updateBonusButtonText() {
        collectBonusButton.textContent = collectBonusCooldown > 0 ? `收集獎勵 (${formatTime(collectBonusCooldown)})` : "收集獎勵 (5:00)";
        // 修正超級獎勵顯示的金額計算，確保顯示的是實際獎勵金額
        const megaBonusAmountDisplay = myLevel * 10000;
        megaBonusButton.textContent = megaBonusCooldown > 0 ? `超級獎勵 (${formatTime(megaBonusCooldown)})` : `超級獎勵 (${formatNumber(megaBonusAmountDisplay)}, 30:00)`;
    }

    function updateAllUI() {
        updateMoneyDisplay();
        updateButtonAvailability();
        updateInventoryDisplay();
        updateUpgradeButtonText();
        updateBuildingCostText();
        updatePrestigeButtonText();
        updateBonusButtonText();
    }

    // 事件監聽器
    clickButton.addEventListener("click", (event) => {
        const clickAmount = getCurrentClickAmount(); // 修正：使用 getCurrentClickAmount
        money += clickAmount;
        showFloatingText(event.clientX, event.clientY, `+${formatNumber(clickAmount)}`);
        updateMoneyDisplay();
        updateButtonAvailability();
    });

    clickerUpgradeButton.addEventListener("click", () => {
        if (money >= clickerUpgradeCostValue) {
            money -= clickerUpgradeCostValue;
            clickerLevel++; // 等級提升
            clickerUpgradeCostValue = Math.ceil(clickerUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`點擊器升級至等級 ${clickerLevel}！`);
        } else {
            showMessage("金錢不足！");
        }
    });

    autoClickerButton.addEventListener("click", () => {
        if (money >= autoClickerCostValue) {
            money -= autoClickerCostValue;
            autoClickers++;
            autoClickerCostValue = Math.ceil(autoClickerCostValue * 1.1);
            updateAllUI();
            showMessage(`購買了 ${autoClickers} 個自動點擊器！`);
        } else {
            showMessage("金錢不足！");
        }
    });

    autoClickerUpgradeButton.addEventListener("click", () => {
        if (money >= autoClickerUpgradeCostValue) {
            money -= autoClickerUpgradeCostValue;
            autoClickerLevel++; // 等級提升
            autoClickerUpgradeCostValue = Math.ceil(autoClickerUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`自動點擊器升級至等級 ${autoClickerLevel}！`);
        } else {
            showMessage("金錢不足！");
        }
    });

    farmButton.addEventListener("click", () => {
        if (money >= farmCostValue) {
            money -= farmCostValue;
            farms++;
            farmCostValue = Math.ceil(farmCostValue * 1.1);
            updateAllUI();
            showMessage(`購買了 ${farms} 個農場！`);
        } else {
            showMessage("金錢不足！");
        }
    });

    farmUpgradeButton.addEventListener("click", () => {
        if (money >= farmUpgradeCostValue) {
            money -= farmUpgradeCostValue;
            farmLevel++; // 等級提升
            farmUpgradeCostValue = Math.ceil(farmUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`農場升級至等級 ${farmLevel}！`);
        } else {
            showMessage("金錢不足！");
        }
    });

    mineButton.addEventListener("click", () => {
        if (money >= mineCostValue) {
            money -= mineCostValue;
            mines++;
            mineCostValue = Math.ceil(mineCostValue * 1.1);
            updateAllUI();
            showMessage(`購買了 ${mines} 個礦場！`);
        } else {
            showMessage("金錢不足！");
        }
    });

    mineUpgradeButton.addEventListener("click", () => {
        if (money >= mineUpgradeCostValue) {
            money -= mineUpgradeCostValue;
            mineLevel++; // 等級提升
            mineUpgradeCostValue = Math.ceil(mineUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`礦場升級至等級 ${mineLevel}！`);
        } else {
            showMessage("金錢不足！");
        }
    });

    bankButton.addEventListener("click", () => {
        if (money >= bankCostValue && farms >= 10) {
            money -= bankCostValue;
            banks++;
            bankCostValue = Math.ceil(bankCostValue * 1.1);
            updateAllUI();
            showMessage(`購買了 ${banks} 個銀行！`);
        } else if (farms < 10) {
            showMessage("需要 10 個農場才能購買銀行！");
        } else {
            showMessage("金錢不足！");
        }
    });

    bankUpgradeButton.addEventListener("click", () => {
        if (money >= bankUpgradeCostValue) {
            money -= bankUpgradeCostValue;
            bankLevel++; // 等級提升
            bankUpgradeCostValue = Math.ceil(bankUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`銀行升級至等級 ${bankLevel}！`);
        } else {
            showMessage("金錢不足！");
        }
    });

    stockExchangeButton.addEventListener("click", () => {
        if (money >= stockExchangeCostValue && mines >= 5) {
            money -= stockExchangeCostValue;
            stockExchanges++;
            stockExchangeCostValue = Math.ceil(stockExchangeCostValue * 1.1);
            updateAllUI();
            showMessage(`購買了 ${stockExchanges} 個股票交易所！`);
        } else if (mines < 5) {
            showMessage("需要 5 個礦場才能購買股票交易所！");
        } else {
            showMessage("金錢不足！");
        }
    });

    stockExchangeUpgradeButton.addEventListener("click", () => {
        if (money >= stockExchangeUpgradeCostValue) {
            money -= stockExchangeUpgradeCostValue;
            stockExchangeLevel++; // 等級提升
            stockExchangeUpgradeCostValue = Math.ceil(stockExchangeUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`股票交易所升級至等級 ${stockExchangeLevel}！`);
        } else {
            showMessage("金錢不足！");
        }
    });

    prestigeButton.addEventListener("click", () => {
        if (money >= prestigeCost) {
            // 重置所有資源和建築數量
            money = 0;
            autoClickers = 0;
            farms = 0;
            mines = 0;
            banks = 0;
            stockExchanges = 0;

            // 重置所有建築等級為1
            clickerLevel = 1;
            autoClickerLevel = 1;
            farmLevel = 1;
            mineLevel = 1;
            bankLevel = 1;
            stockExchangeLevel = 1;

            // Prestige 不會重置貨物價格，只會重置資源和等級
            // clickerUpgradeCostValue = 10;
            // autoClickerUpgradeCostValue = 50;
            // farmUpgradeCostValue = 250;
            // mineUpgradeCostValue = 1000;
            // bankUpgradeCostValue = 5000;
            // stockExchangeUpgradeCostValue = 25000;
            // autoClickerCostValue = 10;
            // farmCostValue = 50;
            // mineCostValue = 200;
            // bankCostValue = 1000;
            // stockExchangeCostValue = 5000;

            myLevel++; // 我的等級提升
            prestigeCost = Math.ceil(prestigeCost * 2); // Prestige 成本增加
            
            // 重置獎勵冷卻時間
            collectBonusCooldown = 0;
            megaBonusCooldown = 0;

            updateAllUI();
            showMessage(`Prestige 成功！我的等級提升至 ${myLevel}！`);
        } else {
            showMessage("金錢不足以進行 Prestige！");
        }
    });

    collectBonusButton.addEventListener("click", () => {
        if (collectBonusCooldown <= 0) {
            const bonusAmount = money * (0.05 + Math.random() * 0.10); // 5% 到 15%
            money += bonusAmount;
            collectBonusCooldown = COLLECT_BONUS_MAX_COOLDOWN;
            updateAllUI();
            showMessage(`收集了 ${formatNumber(bonusAmount)} 金錢獎勵！`);
        } else {
            showMessage(`獎勵冷卻中，請等待 ${formatTime(collectBonusCooldown)}`);
        }
    });

    megaBonusButton.addEventListener("click", () => {
        if (megaBonusCooldown <= 0) {
            const bonusAmount = myLevel * 10000;
            money += bonusAmount;
            megaBonusCooldown = MEGA_BONUS_MAX_COOLDOWN;
            updateAllUI();
            showMessage(`獲得了 ${formatNumber(bonusAmount)} 超級獎勵！`);
        } else {
            showMessage(`超級獎勵冷卻中，請等待 ${formatTime(megaBonusCooldown)}`);
        }
    });

    resetGameButton.addEventListener("click", () => {
        if (myLevel >= nextResetLevelValue) {
            // 重置所有資源和建築數量
            money = 0;
            autoClickers = 0;
            farms = 0;
            mines = 0;
            banks = 0;
            stockExchanges = 0;

            // 重置所有建築等級為1
            clickerLevel = 1;
            autoClickerLevel = 1;
            farmLevel = 1;
            mineLevel = 1;
            bankLevel = 1;
            stockExchangeLevel = 1;

            // 重置升級成本為初始值 (這部分為「重置貨物」專屬)
            clickerUpgradeCostValue = 10;
            autoClickerUpgradeCostValue = 50;
            farmUpgradeCostValue = 250;
            mineUpgradeCostValue = 1000;
            bankUpgradeCostValue = 5000;
            stockExchangeUpgradeCostValue = 25000;

            // 重置購買成本為初始值 (這部分為「重置貨物」專屬)
            autoClickerCostValue = 10;
            farmCostValue = 50;
            mineCostValue = 200;
            bankCostValue = 1000;
            stockExchangeCostValue = 5000;

            nextResetLevelValue = myLevel + 10; // 下一次重置等級需求提高
            
            // 重置獎勵冷卻時間
            collectBonusCooldown = 0;
            megaBonusCooldown = 0;

            updateAllUI();
            showMessage(`貨物已重置！下次重置等級需求為 ${nextResetLevelValue}。`);
        } else {
            showMessage(`我的等級需要達到 ${nextResetLevelValue} 才能重置貨物！`);
        }
    });

    fullResetButton.addEventListener("click", () => {
        // 確認對話框
        // 替換 confirm() 為自定義模態框，因為 confirm() 在 iframe 中無法顯示。
        // 為了簡化，這裡暫時使用一個簡單的替代方案，實際應用中應替換為完整的模態框 UI。
        const confirmReset = window.confirm("您確定要完全重置遊戲嗎？所有進度將會丟失！"); // 暫時使用 window.confirm
        if (confirmReset) {
            money = 0;
            autoClickers = 0;
            farms = 0;
            mines = 0;
            banks = 0;
            stockExchanges = 0;
            myLevel = 1;

            clickerLevel = 1;
            autoClickerLevel = 1;
            farmLevel = 1;
            mineLevel = 1;
            bankLevel = 1;
            stockExchangeLevel = 1;

            // 重置升級成本為初始值
            clickerUpgradeCostValue = 10;
            autoClickerUpgradeCostValue = 50;
            farmUpgradeCostValue = 250;
            mineUpgradeCostValue = 1000;
            bankUpgradeCostValue = 5000;
            stockExchangeUpgradeCostValue = 25000;

            // 重置購買成本為初始值
            autoClickerCostValue = 10;
            farmCostValue = 50;
            mineCostValue = 200;
            bankCostValue = 1000;
            stockExchangeCostValue = 5000;

            nextResetLevelValue = 10;
            prestigeCost = 10000;

            // 重置獎勵冷卻時間
            collectBonusCooldown = 0;
            megaBonusCooldown = 0;

            updateAllUI();
            showMessage("遊戲已完全重置！");
        }
    });

    // 自動產生金錢
    setInterval(() => {
        let passiveIncome = (
            (autoClickers * getCurrentAutoClickerIncomePerUnit()) + // 修正：使用 getCurrentAutoClickerIncomePerUnit
            (farms * getCurrentFarmIncomePerUnit()) + // 修正：使用 getCurrentFarmIncomePerUnit
            (mines * getCurrentMineIncomePerUnit()) + // 修正：使用 getCurrentMineIncomePerUnit
            (banks * getCurrentBankIncomePerUnit()) + // 修正：使用 getCurrentBankIncomePerUnit
            (stockExchanges * getCurrentStockExchangeIncomePerUnit()) // 修正：使用 getCurrentStockExchangeIncomePerUnit
        ) * myLevel; // 我的等級作為全局乘數

        money += passiveIncome / 10; // 每秒被動收入
        updateMoneyDisplay();
        updateButtonAvailability();
    }, 100); // 每 100 毫秒更新一次

    // 獎勵冷卻計時器
    setInterval(() => {
        if (collectBonusCooldown > 0) {
            collectBonusCooldown--;
        }
        if (megaBonusCooldown > 0) {
            megaBonusCooldown--;
        }
        updateBonusButtonText();
    }, 1000); // 每秒更新一次

    // 新增的說明按鈕事件監聽器
    showInstructionsButton.addEventListener("click", () => {
        instructionModal.style.display = "flex"; // 顯示模態框
    });

    // 關閉按鈕事件監聽器
    closeButton.addEventListener("click", () => {
        instructionModal.style.display = "none"; // 隱藏模態框
    });

    // 點擊模態框外部隱藏 (可選)
    instructionModal.addEventListener("click", (event) => {
        if (event.target === instructionModal) {
            instructionModal.style.display = "none";
        }
    });

    // 初始化 UI
    updateAllUI();
});
