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

    // 升級價格 (預設值)
    let clickerUpgradeCostValue = 10;
    let autoClickerUpgradeCostValue = 50;
    let farmUpgradeCostValue = 250;
    let mineUpgradeCostValue = 1000;
    let bankUpgradeCostValue = 5000;
    let stockExchangeUpgradeCostValue = 25000;

     // 建築價格 (預設值)
    let autoClickerCostValue = 10;
    let farmCostValue = 50;
    let mineCostValue = 200;
    let bankCostValue = 1000;
    let stockExchangeCostValue = 5000;

      let nextResetLevelValue = 10; // "重置遊戲" 的需求等級

      //升級量 (預設值)
    let clickerUpgradeAmountValue = 1;
    let autoClickerUpgradeAmountValue = 0.5;
    let farmUpgradeAmountValue = 0.5;
    let mineUpgradeAmountValue = 0.5;
    let bankUpgradeAmountValue = 0.5;
    let stockExchangeUpgradeAmountValue = 0.5;

    let prestigeCost = 10000; // 初始 Prestige 價格

    const moneyDisplay = document.getElementById('money');
    const clickButton = document.getElementById('clickButton');
    const autoClickerButton = document.getElementById('autoClickerButton');
    const farmButton = document.getElementById('farmButton');
    const mineButton = document.getElementById('mineButton');
    const bankButton = document.getElementById('bankButton');
    const stockExchangeButton = document.getElementById('stockExchangeButton');
    const prestigeButton = document.getElementById('prestigeButton');
    const message = document.getElementById('message');
    const clickValueDisplay = document.getElementById('clickValueDisplay');
    const resetGameButton = document.getElementById('resetGameButton');
    const megaBonusButton = document.getElementById('megaBonusButton');
      const nextResetLevel = document.getElementById('nextResetLevel');  //重置按鈕等級需求顯示

    const myLevelDisplay = document.getElementById('myLevelDisplay'); // 我的等級顯示

    const clickerLevelDisplay = document.getElementById('clickerLevel');
    const autoClickerCountDisplay = document.getElementById('autoClickerCount');
    const farmCountDisplay = document.getElementById('farmCount');
    const mineCountDisplay = document.getElementById('mineCount');
    const bankCountDisplay = document.getElementById('bankCount');
    const stockExchangeCountDisplay = document.getElementById('stockExchangeCount');

    const autoClickerLevelDisplay = document.getElementById('autoClickerLevelDisplay');
    const farmLevelDisplay = document.getElementById('farmLevelDisplay');
    const mineLevelDisplay = document.getElementById('mineLevelDisplay');
    const bankLevelDisplay = document.getElementById('bankLevelDisplay');
    const stockExchangeLevelDisplay = document.getElementById('stockExchangeLevelDisplay');

    const clickerUpgradeButton = document.getElementById('clickerUpgradeButton');

    const autoClickerUpgradeButton = document.getElementById('autoClickerUpgradeButton');
    const farmUpgradeButton = document.getElementById('farmUpgradeButton');
    const mineUpgradeButton = document.getElementById('mineUpgradeButton');
    const bankUpgradeButton = document.getElementById('bankUpgradeButton');
    const stockExchangeUpgradeButton = document.getElementById('stockExchangeUpgradeButton');

    const clickerUpgradeCost = document.getElementById('clickerUpgradeCost');
     const clickerUpgradeAmount = document.getElementById('clickerUpgradeAmount');

    const autoClickerUpgradeCost = document.getElementById('autoClickerUpgradeCost');
    const autoClickerUpgradeAmount = document.getElementById('autoClickerUpgradeAmount');

    const farmUpgradeCost = document.getElementById('farmUpgradeCost');
    const farmUpgradeAmount = document.getElementById('farmUpgradeAmount');

    const mineUpgradeCost = document.getElementById('mineUpgradeCost');
    const mineUpgradeAmount = document.getElementById('mineUpgradeAmount');

    const bankUpgradeCost = document.getElementById('bankUpgradeCost');
    const bankUpgradeAmount = document.getElementById('bankUpgradeAmount');

    const stockExchangeUpgradeCost = document.getElementById('stockExchangeUpgradeCost');
    const stockExchangeUpgradeAmount = document.getElementById('stockExchangeUpgradeAmount');

    const autoClickerCost = document.getElementById('autoClickerCost');
    const farmCost = document.getElementById('farmCost');
    const mineCost = document.getElementById('mineCost');
    const bankCost = document.getElementById('bankCost');
    const stockExchangeCost = document.getElementById('stockExchangeCost');

    const collectBonusButton = document.getElementById('collectBonusButton');
    let bonusReady = true; // 預設獎勵已就緒
    let megaBonusReady = true;

        //輔助函數，用於格式化時間為 HH:MM:SS
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    // 函數：顯示訊息
    function showMessage(msg) {
        message.textContent = msg;
        message.style.animation = 'none'; // 重新啟動動畫
        setTimeout(() => {
            message.style.animation = null;
        }, 10);  // 觸發重新渲染，播放動畫
    }

    // 函數：更新顯示金錢
    function updateMoneyDisplay() {
        moneyDisplay.textContent = `金錢: ${money.toFixed(2)}`;
    }

    // 函數：更新按鈕的可用性
    function updateButtonAvailability() {
        bankButton.disabled = farms < 10;
        stockExchangeButton.disabled = mines < 5;
         resetGameButton.disabled = myLevel < nextResetLevelValue;  //等級需求會根據目前等級調整
    }

    // 函數：更新庫存顯示
    function updateInventoryDisplay() {
        myLevelDisplay.textContent = myLevel; // 更新我的等級
        clickerLevelDisplay.textContent = clickerLevel.toFixed(1);
        clickValueDisplay.textContent = clickerLevel;
        autoClickerCountDisplay.textContent = autoClickers;
        farmCountDisplay.textContent = farms;
        mineCountDisplay.textContent = mines;
        bankCountDisplay.textContent = banks;
        stockExchangeCountDisplay.textContent = stockExchanges;

        autoClickerLevelDisplay.textContent = autoClickerLevel.toFixed(1);
        farmLevelDisplay.textContent = farmLevel.toFixed(1);
        mineLevelDisplay.textContent = mineLevel.toFixed(1);
        bankLevelDisplay.textContent = bankLevel.toFixed(1);
        stockExchangeLevelDisplay.textContent = stockExchangeLevel.toFixed(1);

        nextResetLevel.textContent = nextResetLevelValue;
    }

     // 函數: 顯示彈出文字
    function showFloatingText(x, y, text) {
        const floatingText = document.createElement('div');
        floatingText.className = 'floating-text';
        floatingText.textContent = text;
        floatingText.style.left = x + 'px';
        floatingText.style.top = y + 'px';
        document.body.appendChild(floatingText);

        // 在動畫結束後移除元素
        floatingText.addEventListener('animationend', () => {
            floatingText.remove();
        });
    }

        // 函數：更新升級按鈕的文字
    function updateUpgradeButtonText() {
        clickerUpgradeCost.textContent = clickerUpgradeCostValue.toFixed(0);
        autoClickerUpgradeCost.textContent = autoClickerUpgradeCostValue.toFixed(0);
        farmUpgradeCost.textContent = farmUpgradeCostValue.toFixed(0);
        mineUpgradeCost.textContent = mineUpgradeCostValue.toFixed(0);
        bankUpgradeCost.textContent = bankUpgradeCostValue.toFixed(0);
        stockExchangeUpgradeCost.textContent = stockExchangeUpgradeCostValue.toFixed(0);

        clickerUpgradeAmount.textContent = clickerUpgradeAmountValue.toFixed(0);
        autoClickerUpgradeAmount.textContent = autoClickerUpgradeAmountValue.toFixed(1);
        farmUpgradeAmount.textContent = farmUpgradeAmountValue.toFixed(1);
        mineUpgradeAmount.textContent = mineUpgradeAmountValue.toFixed(1);
        bankUpgradeAmount.textContent = bankUpgradeAmountValue.toFixed(1);
        stockExchangeUpgradeAmount.textContent = stockExchangeUpgradeAmountValue.toFixed(1);

         updatePrestigeButtonText();  //確保每次更新升級數值，Prestige按鈕也會更新
    }

       // 函數：更新聲望按鈕的文字
    function updatePrestigeButtonText() {
        prestigeButton.textContent = `Prestige (需要 ${prestigeCost.toFixed(0)} 金錢，升級我的等級 +1)`;
    }

    // 函數: 更新建築按鈕的價格顯示
    function updateBuildingCostText() {
        autoClickerCost.textContent = autoClickerCostValue.toFixed(0);
        farmCost.textContent = farmCostValue.toFixed(0);
        mineCost.textContent = mineCostValue.toFixed(0);
        bankCost.textContent = bankCostValue.toFixed(0);
        stockExchangeCost.textContent = stockExchangeCostValue.toFixed(0);
    }


    // 點擊賺錢
   clickButton.addEventListener('click', (event) => {
        const clickValue = 1 * myLevel * clickerLevel;
        money += clickValue;
        updateMoneyDisplay();

        // 獲取點擊位置
        const x = event.clientX;
        const y = event.clientY;

        // 顯示浮動文字
        showFloatingText(x, y, `+${clickValue.toFixed(2)} 金錢!`);
    });

    // 升級點擊器
    clickerUpgradeButton.addEventListener('click', () => {
        if (money >= clickerUpgradeCostValue) {
            money -= clickerUpgradeCostValue;
            clickerLevel += clickerUpgradeAmountValue;  //從0.5改為1
            clickerUpgradeCostValue *= 1.5; // 價格乘以 1.5
            clickerUpgradeAmountValue++  //每次升級後，下次的升級量+1
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateUpgradeButtonText();
            clickValueDisplay.textContent = clickerLevel;  //從toFixed(1)改為直接顯示
            showMessage("點擊器已升級！");
        } else {
            showMessage("金錢不足！");
        }
    });

    // 購買自動點擊器
    autoClickerButton.addEventListener('click', () => {
         if (money >= autoClickerCostValue) {
            money -= autoClickerCostValue;
            autoClickers++;
            autoClickerCostValue *= 1.2; // 價格乘以 1.2
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateBuildingCostText();
            showMessage("已購買自動點擊器！");
        } else {
            showMessage("金錢不足！");
        }
    });

    // 升級自動點擊器
    autoClickerUpgradeButton.addEventListener('click', () => {
        if (money >= autoClickerUpgradeCostValue) {
            money -= autoClickerUpgradeCostValue;
            autoClickerLevel += autoClickerUpgradeAmountValue;
            autoClickerUpgradeCostValue *= 1.5; // 價格乘以 1.5
              autoClickerUpgradeAmountValue++ //每次升級後，下次的升級量+1
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateUpgradeButtonText();
            showMessage("自動點擊器已升級!");
        } else {
            showMessage("金錢不足!");
        }
    });

    // 購買農場
    farmButton.addEventListener('click', () => {
       if (money >= farmCostValue) {
            money -= farmCostValue;
            farms++;
            farmCostValue *= 1.2; // 價格乘以 1.2
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateButtonAvailability();
            updateBuildingCostText();
            showMessage("已購買農場！");
        } else {
            showMessage("金錢不足！");
        }
    });

    // 升級農場
    farmUpgradeButton.addEventListener('click', () => {
        if (money >= farmUpgradeCostValue) {
            money -= farmUpgradeCostValue;
            farmLevel += farmUpgradeAmountValue;
             farmUpgradeAmountValue++ //每次升級後，下次的升級量+1
            updateMoneyDisplay();
            updateInventoryDisplay();
             updateUpgradeButtonText()
            showMessage("農場已升級!");
        } else {
            showMessage("金錢不足!");
        }
    });

    // 購買礦場
    mineButton.addEventListener('click', () => {
        if (money >= mineCostValue) {
            money -= mineCostValue;
            mines++;
             mineCostValue *= 1.2; // 價格乘以 1.2
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateButtonAvailability();
            updateBuildingCostText();
            showMessage("已購買礦場！");
        } else {
            showMessage("金錢不足！");
        }
    });

    // 升級礦場
    mineUpgradeButton.addEventListener('click', () => {
       if (money >= mineUpgradeCostValue) {
            money -= mineUpgradeCostValue;
            mineLevel += mineUpgradeAmountValue;
              mineUpgradeAmountValue++ //每次升級後，下次的升級量+1
            updateMoneyDisplay();
            updateInventoryDisplay();
             updateUpgradeButtonText()
            showMessage("礦場已升級!");
        } else {
            showMessage("金錢不足!");
        }
    });

    // 購買銀行
    bankButton.addEventListener('click', () => {
      if (money >= bankCostValue) {
            money -= bankCostValue;
            banks++;
             bankCostValue *= 1.2; // 價格乘以 1.2
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateBuildingCostText();
            showMessage("已購買銀行！");
        } else {
            showMessage("金錢不足！");
        }
    });

     // 升級銀行
    bankUpgradeButton.addEventListener('click', () => {
         if (money >= bankUpgradeCostValue) {
            money -= bankUpgradeCostValue;
            bankLevel += bankUpgradeAmountValue;
             bankUpgradeAmountValue++ //每次升級後，下次的升級量+1
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateUpgradeButtonText()
            showMessage("銀行已升級!");
        } else {
            showMessage("金錢不足!");
        }
    });


    // 購買股票交易所
    stockExchangeButton.addEventListener('click', () => {
       if (money >= stockExchangeCostValue) {
            money -= stockExchangeCostValue;
            stockExchanges++;
             stockExchangeCostValue *= 1.2; // 價格乘以 1.2
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateBuildingCostText();
            showMessage("已購買股票交易所！");
        } else {
            showMessage("金錢不足！");
        }
    });

     // 升級股票交易所
    stockExchangeUpgradeButton.addEventListener('click', () => {
        if (money >= stockExchangeUpgradeCostValue) {
            money -= stockExchangeUpgradeCostValue;
            stockExchangeLevel += stockExchangeUpgradeAmountValue;
              stockExchangeUpgradeAmountValue++ //每次升級後，下次的升級量+1
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateUpgradeButtonText()
            showMessage("股票交易所已升級!");
        } else {
            showMessage("金錢不足!");
        }
    });


    // Prestige
    prestigeButton.addEventListener('click', () => {
        if (money >= prestigeCost) {
            money = 0;
            autoClickers = 0;
            farms = 0;
            mines = 0;
            banks = 0;
            stockExchanges = 0;
            myLevel++; // 提升我的等級
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateButtonAvailability();
            showMessage("已進行 Prestige！我的等級 +1");
            prestigeCost *= 1.2; // 價格提升至原價格的 1.2 倍
             updateUpgradeButtonText();
        } else {
            showMessage("金錢不足！");
        }
    });

    // 收集獎勵功能
    collectBonusButton.addEventListener('click', () => {
      if (bonusReady) {
        // 隨機獎勵金額（例如，當前金錢的 5% 到 15%）
        const bonusAmount = money * (0.05 + Math.random() * 0.1); //0.05 ~ 0.15
        money += bonusAmount;
        updateMoneyDisplay();

        showMessage(`收集到獎勵 +${bonusAmount.toFixed(2)} 金錢!`);
        bonusReady = false; // 設定為冷卻中

        // 禁用按鈕並變更文字
        collectBonusButton.disabled = true;
        collectBonusButton.textContent = "獎勵冷卻中 (05:00)";

        // 開始冷卻計時器
        let timeLeft = 300; // 5 分鐘，單位秒
        const timerInterval = setInterval(() => {
          timeLeft--;
          collectBonusButton.textContent = `獎勵冷卻中 (${formatTime(timeLeft)})`;

          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            bonusReady = true; // 冷卻完成
            collectBonusButton.disabled = false; // 啟用按鈕
            collectBonusButton.textContent = "收集獎勵 (5:00)"; // 重設按鈕文字
          }
        }, 1000); // 每秒更新一次
      } else {
        showMessage("獎勵冷卻中，請稍後再來！");
      }
    });

    // 超級獎勵功能
        megaBonusButton.addEventListener('click', () => {
            if (megaBonusReady) {
                const bonusAmount = myLevel * 10000; // 我的等級 * 10000
                money += bonusAmount;
                updateMoneyDisplay();

                showMessage(`獲得超級獎勵 +${bonusAmount.toFixed(2)} 金錢!`);
                megaBonusReady = false;

                megaBonusButton.disabled = true;
                megaBonusButton.textContent = "超級獎勵冷卻中 (30:00)";

                let timeLeft = 30 * 60; // 30分鐘，單位秒
                const timerInterval = setInterval(() => {
                    timeLeft--;
                    megaBonusButton.textContent = `超級獎勵冷卻中 (${formatTime(timeLeft)})`;
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        megaBonusReady = true;
                        megaBonusButton.disabled = false;
                        megaBonusButton.textContent = "超級獎勵 (我的等級 * 10000，30:00)";
                    }
                }, 1000);
            } else {
                showMessage("超級獎勵冷卻中，請稍後再來！");
            }
        });

    //重置遊戲功能（保留我的等級）
    resetGameButton.addEventListener('click', () => {
          if (myLevel >= nextResetLevelValue) {

            // 重置除了我的等級之外的所有變數
            money = 0;
            autoClickers = 0;
            farms = 0;
            mines = 0;
            banks = 0;
            stockExchanges = 0;

            // 重置等級
            clickerLevel = 1;
            autoClickerLevel = 1;
            farmLevel = 1;
            mineLevel = 1;
            bankLevel = 1;
            stockExchangeLevel = 1;

            // 重置價格
            clickerUpgradeCostValue = 10;
            autoClickerUpgradeCostValue = 50;
            farmUpgradeCostValue = 250;
            mineUpgradeCostValue = 1000;
            bankUpgradeCostValue = 5000;
            stockExchangeUpgradeCostValue = 25000;

            autoClickerCostValue = 10;
            farmCostValue = 50;
            mineCostValue = 200;
            bankCostValue = 1000;
            stockExchangeCostValue = 5000;

              nextResetLevelValue = myLevel+10
               //升級量 (預設值)
              clickerUpgradeAmountValue = 1;
              autoClickerUpgradeAmountValue = 0.5;
              farmUpgradeAmountValue = 0.5;
              mineUpgradeAmountValue = 0.5;
              bankUpgradeAmountValue = 0.5;
              stockExchangeUpgradeAmountValue = 0.5;

            // 更新顯示
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateButtonAvailability();
            updateUpgradeButtonText();
            updateBuildingCostText();


            showMessage("遊戲已重置！");
        } else {
            showMessage(`需要達到我的等級 ${nextResetLevelValue} 才能重置遊戲！`);
        }
    });

    // 自動產生金錢
    setInterval(() => {
        let passiveIncome = (
            (autoClickers * autoClickerLevel) +
            (farms * 5 * farmLevel) +
            (mines * 20 * mineLevel) +
            (banks * 100 * bankLevel) + // 銀行升級會影響收入
            (stockExchanges * 500 * stockExchangeLevel) // 股票交易所升級會影響收入
        );

        money += passiveIncome / 10;

         // "我的等級"的加成：每秒增加等級*5%的金錢
        money += money * (myLevel * 0.05) / 10;

        updateMoneyDisplay();
    }, 100);

    // 初始設定
    updateMoneyDisplay();
    updateButtonAvailability();
    updateInventoryDisplay();
    updateUpgradeButtonText();
     updateBuildingCostText()