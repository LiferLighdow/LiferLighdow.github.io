 let money = 0;
    let autoClickers = 0;
    let farms = 0;
    let mines = 0;
    let banks = 0;
    let stockExchanges = 0;
    let myLevel = 1;

    // Upgrade Levels (Default 1)
    let clickerLevel = 1;
    let autoClickerLevel = 1;
    let farmLevel = 1;
    let mineLevel = 1;
    let bankLevel = 1;
    let stockExchangeLevel = 1;

    // Upgrade Amount Values (Default)
    const initialClickerUpgradeAmountValue = 1;
    const initialAutoClickerUpgradeAmountValue = 1;
    const initialFarmUpgradeAmountValue = 1;
    const initialMineUpgradeAmountValue = 1;
    const initialBankUpgradeAmountValue = 1;
    const initialStockExchangeUpgradeAmountValue = 1;

    // Current Upgrade Amount Values (Changes during gameplay)
    let clickerUpgradeAmountValue = initialClickerUpgradeAmountValue;
    let autoClickerUpgradeAmountValue = initialAutoClickerUpgradeAmountValue;
    let farmUpgradeAmountValue = initialFarmUpgradeAmountValue;
    let mineUpgradeAmountValue = initialMineUpgradeAmountValue;
    let bankUpgradeAmountValue = initialBankUpgradeAmountValue;
    let stockExchangeUpgradeAmountValue = initialStockExchangeUpgradeAmountValue;

    // Cost Values (Changes during gameplay)
    let clickerUpgradeCostValue = 10;
    let autoClickerUpgradeCostValue = 50;
    let farmUpgradeCostValue = 250;
    let mineUpgradeCostValue = 1000;
    let bankUpgradeCostValue = 5000;
    let stockExchangeUpgradeCostValue = 25000;

    // Building Costs (Default)
    let autoClickerCostValue = 10;
    let farmCostValue = 50;
    let mineCostValue = 200;
    let bankCostValue = 1000;
    let stockExchangeCostValue = 5000;

    let nextResetLevelValue = 10; // Level required to "Reset Game"

    let prestigeCost = 10000; // Initial Prestige Cost

    // HTML Elements
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
    const nextResetLevel = document.getElementById('nextResetLevel'); // Reset button level requirement display
    const fullResetButton = document.getElementById('fullResetButton'); // Full Reset button

    const myLevelDisplay = document.getElementById('myLevelDisplay'); // My Level Display

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
    let bonusReady = true; // Default bonus is ready
    let megaBonusReady = true;

    // Helper function to format time as HH:MM:SS
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    // Function: Show Message
    function showMessage(msg) {
        message.textContent = msg;
        message.style.animation = 'none'; // Restart animation
        setTimeout(() => {
            message.style.animation = null;
        }, 10);  // Trigger re-render to play animation
    }

    // Function: Update Money Display
    function updateMoneyDisplay() {
        moneyDisplay.textContent = `Money: ${money.toFixed(2)}`;
    }

    // Function: Update Button Availability
    function updateButtonAvailability() {
        bankButton.disabled = farms < 10;
        stockExchangeButton.disabled = mines < 5;
        resetGameButton.disabled = myLevel < nextResetLevelValue; // Level requirement adjusts based on current level
    }

    // Function: Update Inventory Display
    function updateInventoryDisplay() {
        myLevelDisplay.textContent = myLevel; // Update My Level
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

    // Function: Show Floating Text
    function showFloatingText(x, y, text) {
        const floatingText = document.createElement('div');
        floatingText.className = 'floating-text';
        floatingText.textContent = text;
        floatingText.style.left = x + 'px';
        floatingText.style.top = y + 'px';
        document.body.appendChild(floatingText);

        // Remove element after animation ends
        floatingText.addEventListener('animationend', () => {
            floatingText.remove();
        });
    }

    // Function: Update Upgrade Button Text
    function updateUpgradeButtonText() {
        clickerUpgradeCost.textContent = clickerUpgradeCostValue.toFixed(0);
        clickerUpgradeAmount.textContent = clickerUpgradeAmountValue.toFixed(0);

        autoClickerUpgradeCost.textContent = autoClickerUpgradeCostValue.toFixed(0);
        autoClickerUpgradeAmount.textContent = autoClickerUpgradeAmountValue.toFixed(1);

        farmUpgradeCost.textContent = farmUpgradeCostValue.toFixed(0);
        farmUpgradeAmount.textContent = farmUpgradeAmountValue.toFixed(1);

        mineUpgradeCost.textContent = mineUpgradeCostValue.toFixed(0);
        mineUpgradeAmount.textContent = mineUpgradeAmountValue.toFixed(1);

        bankUpgradeCost.textContent = bankUpgradeCostValue.toFixed(0);
        bankUpgradeAmount.textContent = bankUpgradeAmountValue.toFixed(1);

        stockExchangeUpgradeCost.textContent = stockExchangeUpgradeCostValue.toFixed(0);
        stockExchangeUpgradeAmount.textContent = stockExchangeUpgradeAmountValue.toFixed(1);

        updatePrestigeButtonText(); // Ensure Prestige button updates with upgrade values
    }

    // Function: Update Prestige Button Text
    function updatePrestigeButtonText() {
        prestigeButton.textContent = `Prestige (Requires ${prestigeCost.toFixed(0)} Money, Upgrade My Level +1)`;
    }

    // Function: Update Building Cost Text
    function updateBuildingCostText() {
        autoClickerCost.textContent = autoClickerCostValue.toFixed(0);
        farmCost.textContent = farmCostValue.toFixed(0);
        mineCost.textContent = mineCostValue.toFixed(0);
        bankCost.textContent = bankCostValue.toFixed(0);
        stockExchangeCost.textContent = stockExchangeCostValue.toFixed(0);
    }

    // Function: Update All UI
    function updateAllUI() {
        updateMoneyDisplay();
        updateInventoryDisplay();
        updateButtonAvailability();
        updateUpgradeButtonText();
        updateBuildingCostText();
    }


    // Click to Earn Money
    clickButton.addEventListener('click', (event) => {
        const clickValue = 1 * myLevel * clickerLevel;
        money += clickValue;
        updateMoneyDisplay();

        // Get click position
        const x = event.clientX;
        const y = event.clientY;

        // Show floating text
        showFloatingText(x, y, `+${clickValue.toFixed(2)} Money!`);
    });

    // Upgrade Clicker
    clickerUpgradeButton.addEventListener('click', () => {
        if (money >= clickerUpgradeCostValue) {
            money -= clickerUpgradeCostValue;
            clickerLevel += clickerUpgradeAmountValue;
            clickerUpgradeCostValue *= 1.1; // Price multiplies by 1.1
            clickerUpgradeAmountValue = myLevel;  //set to current level for next upgrade
            updateAllUI(); // Using AllUI
            clickValueDisplay.textContent = clickerLevel;
            showMessage("Clicker Upgraded!");
        } else {
            showMessage("Not Enough Money!");
        }
    });

    // Buy Auto Clicker
    autoClickerButton.addEventListener('click', () => {
        if (money >= autoClickerCostValue) {
            money -= autoClickerCostValue;
            autoClickers++;
            autoClickerCostValue *= 1.1; // Price multiplies by 1.1
            updateAllUI(); // Using AllUI
            showMessage("Auto Clicker Purchased!");
        } else {
            showMessage("Not Enough Money!");
        }
    });

    // Upgrade Auto Clicker
    autoClickerUpgradeButton.addEventListener('click', () => {
        if (money >= autoClickerUpgradeCostValue) {
            money -= autoClickerUpgradeCostValue;
            autoClickerLevel += autoClickerUpgradeAmountValue;
            autoClickerUpgradeCostValue *= 1.1; // Price multiplies by 1.1
            autoClickerUpgradeAmountValue = myLevel;  //set to current level for next upgrade
            updateAllUI();  // Using AllUI
            showMessage("Auto Clicker Upgraded!");
        } else {
            showMessage("Not Enough Money!");
        }
    });

    // Buy Farm
    farmButton.addEventListener('click', () => {
        if (money >= farmCostValue) {
            money -= farmCostValue;
            farms++;
            farmCostValue *= 1.1; // Price multiplies by 1.1
            updateAllUI();  // Using AllUI
            showMessage("Farm Purchased!");
        } else {
            showMessage("Not Enough Money!");
        }
    });

    // Upgrade Farm
    farmUpgradeButton.addEventListener('click', () => {
        if (money >= farmUpgradeCostValue) {
            money -= farmUpgradeCostValue;
            farmLevel += farmUpgradeAmountValue;
            farmUpgradeCostValue *= 1.1; // Price multiplies by 1.1
            farmUpgradeAmountValue = myLevel;  //set to current level for next upgrade
            updateAllUI(); // Using AllUI
            showMessage("Farm Upgraded!");
        } else {
            showMessage("Not Enough Money!");
        }
    });

    // Buy Mine
    mineButton.addEventListener('click', () => {
        if (money >= mineCostValue) {
            money -= mineCostValue;
            mines++;
            mineCostValue *= 1.1; // Price multiplies by 1.1
            updateAllUI(); // Using AllUI
            showMessage("Mine Purchased!");
        } else {
            showMessage("Not Enough Money!");
        }
    });

    // Upgrade Mine
    mineUpgradeButton.addEventListener('click', () => {
        if (money >= mineUpgradeCostValue) {
            money -= mineUpgradeCostValue;
            mineLevel += mineUpgradeAmountValue;
            mineUpgradeCostValue *= 1.1; // Price multiplies by 1.1
            mineUpgradeAmountValue = myLevel;  //set to current level for next upgrade
            updateAllUI(); // Using AllUI
            showMessage("Mine Upgraded!");
        } else {
            showMessage("Not Enough Money!");
        }
    });

    // Buy Bank
    bankButton.addEventListener('click', () => {
        if (money >= bankCostValue) {
            money -= bankCostValue;
            banks++;
            bankCostValue *= 1.1; // Price multiplies by 1.1
            updateAllUI(); // Using AllUI
            showMessage("Bank Purchased!");
        } else {
            showMessage("Not Enough Money!");
        }
    });

    // Upgrade Bank
    bankUpgradeButton.addEventListener('click', () => {
        if (money >= bankUpgradeCostValue) {
            money -= bankUpgradeCostValue;
            bankLevel += bankUpgradeAmountValue;
            bankUpgradeCostValue *= 1.1; // Price multiplies by 1.1
            bankUpgradeAmountValue = myLevel;  //set to current level for next upgrade
            updateAllUI(); // Using AllUI
            showMessage("Bank Upgraded!");
        } else {
            showMessage("Not Enough Money!");
        }
    });


    // Buy Stock Exchange
    stockExchangeButton.addEventListener('click', () => {
        if (money >= stockExchangeCostValue) {
            money -= stockExchangeCostValue;
            stockExchanges++;
            stockExchangeCostValue *= 1.1; // Price multiplies by 1.1
            updateAllUI(); // Using AllUI
            showMessage("Stock Exchange Purchased!");
        } else {
            showMessage("Not Enough Money!");
        }
    });

    // Upgrade Stock Exchange
    stockExchangeUpgradeButton.addEventListener('click', () => {
        if (money >= stockExchangeUpgradeCostValue) {
            money -= stockExchangeUpgradeCostValue;
            stockExchangeLevel += stockExchangeUpgradeAmountValue;
            stockExchangeUpgradeCostValue *= 1.1; // Price multiplies by 1.1
            stockExchangeUpgradeAmountValue = myLevel;  //set to current level for next upgrade
            updateAllUI(); // Using AllUI
            showMessage("Stock Exchange Upgraded!");
        } else {
            showMessage("Not Enough Money!");
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
            myLevel++; // Increase My Level
            updateMoneyDisplay();
            updateInventoryDisplay();
            updateButtonAvailability();
            showMessage("Prestige Performed! My Level +1");
            prestigeCost *= 1.1; // Price increases to 1.1 times the original price
            updateAllUI(); // Make sure to update all data
        } else {
            showMessage("Not Enough Money!");
        }
    });

    // Collect Bonus Function
    collectBonusButton.addEventListener('click', () => {
        if (bonusReady) {
            // Random bonus amount (e.g., 5% to 15% of current money)
            const bonusAmount = money * (0.05 + Math.random() * 0.1); // 0.05 ~ 0.15
            money += bonusAmount;
            updateMoneyDisplay();

            showMessage(`Collected Bonus +${bonusAmount.toFixed(2)} Money!`);
            bonusReady = false; // Set to cooldown

            // Disable button and change text
            collectBonusButton.disabled = true;
            collectBonusButton.textContent = "Bonus Cooldown (05:00)";

            // Start cooldown timer
            let timeLeft = 300; // 5 minutes in seconds
            const timerInterval = setInterval(() => {
                timeLeft--;
                collectBonusButton.textContent = `Bonus Cooldown (${formatTime(timeLeft)})`;

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    bonusReady = true; // Cooldown complete
                    collectBonusButton.disabled = false; // Enable button
                    collectBonusButton.textContent = "Collect Bonus (5:00)"; // Reset button text
                }
            }, 1000);
        } else {
            showMessage("Bonus on Cooldown, Please come back later!");
        }
    });

    // Mega Bonus Function
    megaBonusButton.addEventListener('click', () => {
        if (megaBonusReady) {
            const bonusAmount = myLevel * 10000; // My Level * 10000
            money += bonusAmount;
            updateMoneyDisplay();

            showMessage(`Received Mega Bonus +${bonusAmount.toFixed(2)} Money!`);
            megaBonusReady = false;

            megaBonusButton.disabled = true;
            megaBonusButton.textContent = "Mega Bonus Cooldown (30:00)";

            let timeLeft = 30 * 60; // 30 minutes in seconds
            const timerInterval = setInterval(() => {
                timeLeft--;
                megaBonusButton.textContent = `Mega Bonus Cooldown (${formatTime(timeLeft)})`;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    megaBonusReady = true;
                    megaBonusButton.disabled = false;
                    megaBonusButton.textContent = "Mega Bonus (My Level * 10000, 30:00)";
                }
            }, 1000);
        } else {
            showMessage("Mega Bonus on Cooldown, Please come back later!");
        }
    });

    // Reset Game Function (Keep My Level)
    resetGameButton.addEventListener('click', () => {
        if (myLevel >= nextResetLevelValue) {

            // Reset all variables except My Level
            money = 0;
            autoClickers = 0;
            farms = 0;
            mines = 0;
            banks = 0;
            stockExchanges = 0;

            // Reset levels
            clickerLevel = 1;
            autoClickerLevel = 1;
            farmLevel = 1;
            mineLevel = 1;
            bankLevel = 1;
            stockExchangeLevel = 1;

            // Reset prices
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

            nextResetLevelValue = myLevel + 10

            // Reset Upgrade Values
            clickerUpgradeAmountValue = initialClickerUpgradeAmountValue;
            autoClickerUpgradeAmountValue = initialAutoClickerUpgradeAmountValue;
            farmUpgradeAmountValue = initialFarmUpgradeAmountValue;
            mineUpgradeAmountValue = initialMineUpgradeAmountValue;
            bankUpgradeAmountValue = initialBankUpgradeAmountValue;
            stockExchangeUpgradeAmountValue = initialStockExchangeUpgradeAmountValue;

            updateAllUI(); // Make sure to update all data

            showMessage("Game Reset!");
        } else {
            showMessage(`Need to Reach My Level ${nextResetLevelValue} to Reset Game!`);
        }
    });

    // Full Reset Game Function
    fullResetButton.addEventListener('click', () => {
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

        clickerUpgradeAmountValue = initialClickerUpgradeAmountValue;
        autoClickerUpgradeAmountValue = initialAutoClickerUpgradeAmountValue;
        farmUpgradeAmountValue = initialFarmUpgradeAmountValue;
        mineUpgradeAmountValue = initialMineUpgradeAmountValue;
        bankUpgradeAmountValue = initialBankUpgradeAmountValue;
        stockExchangeUpgradeAmountValue = initialStockExchangeUpgradeAmountValue;

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

        nextResetLevelValue = 10;
        prestigeCost = 10000;

        updateAllUI();
        showMessage("Game Fully Reset!");
    });

    // Automatically Generate Money
    setInterval(() => {
        let passiveIncome = (
            (autoClickers * autoClickerLevel) +
            (farms * 5 * farmLevel) +
            (mines * 20 * mineLevel) +
            (banks * 100 * bankLevel) + // Bank upgrades affect income
            (stockExchanges * 500 * stockExchangeLevel) // Stock Exchange upgrades affect income
        );

        money += passiveIncome / 10;
        updateMoneyDisplay();
    }, 100);

    // Initial Setup
    updateAllUI();