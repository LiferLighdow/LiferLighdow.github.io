document.addEventListener("DOMContentLoaded", () => {
    // Game state variables
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

    // Base production values (these do not change with level, but are multipliers for levels)
    const baseClickValue = 1; // Base money per click for Clicker
    const baseAutoClickerValue = 1; // Base money per second for Auto Clicker
    const baseFarmValue = 5; // Base money per second for Farm
    const baseMineValue = 20; // Base money per second for Mine
    const baseBankValue = 100; // Base money per second for Bank
    const baseStockExchangeValue = 500; // Base money per second for Stock Exchange

    // Cost values (prices change during gameplay)
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

    // Store initial costs for "Reset Assets"
    const initialClickerUpgradeCost = 10;
    const initialAutoClickerUpgradeCost = 50;
    const initialFarmUpgradeCost = 250;
    const initialMineUpgradeCost = 1000;
    const initialBankUpgradeCost = 5000;
    const initialStockExchangeUpgradeCost = 25000;

    const initialAutoClickerCost = 10;
    const initialFarmCost = 50;
    const initialMineCost = 200;
    const initialBankCost = 1000;
    const initialStockExchangeCost = 5000;

    let nextResetLevelValue = 10;
    let prestigeCost = 10000;

    // Bonus cooldowns (seconds)
    let collectBonusCooldown = 0;
    const COLLECT_BONUS_MAX_COOLDOWN = 300; // 5 minutes
    let megaBonusCooldown = 0;
    const MEGA_BONUS_MAX_COOLDOWN = 1800; // 30 minutes

    // HTML element bindings
    const moneyDisplay = document.getElementById("money");
    const clickButton = document.getElementById("clickButton");
    const clickValueDisplay = document.getElementById("clickValueDisplay");
    const messageDisplay = document.getElementById("message");
    const floatingTextContainer = document.getElementById("gameContainer"); // Floating text container is gameContainer

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

    // Instruction button and modal elements
    const showInstructionsButton = document.getElementById("showInstructionsButton");
    const instructionModal = document.getElementById("instructionModal");
    const closeButton = instructionModal.querySelector(".close-button");


    // Helper functions
    function formatNumber(num) {
        // Ensure all numbers display two decimal places
        if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + "T";
        if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "B";
        if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
        if (num >= 1000) return (num / 1000).toFixed(2) + "K";
        return num.toFixed(2); // Fix: numbers less than 1000 also show two decimal places
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
        messageDisplay.style.animation = 'none'; // Reset animation
        void messageDisplay.offsetWidth; // Trigger reflow
        messageDisplay.style.animation = 'fadeinout 3s forwards'; // Reapply animation
    }

    function showFloatingText(x, y, text) {
        const floatingText = document.createElement("div");
        floatingText.classList.add("floating-text");
        floatingText.textContent = text;
        
        // Ensure floating text is positioned relative to gameContainer
        const containerRect = floatingTextContainer.getBoundingClientRect();
        floatingText.style.left = `${x - containerRect.left}px`;
        floatingText.style.top = `${y - containerRect.top}px`;
        
        floatingTextContainer.appendChild(floatingText);

        floatingText.addEventListener('animationend', () => {
            floatingText.remove();
        });
    }

    function updateMoneyDisplay() {
        moneyDisplay.textContent = `Money: ${formatNumber(money)}`;
    }

    function updateButtonAvailability() {
        // Clicker upgrade
        clickerUpgradeButton.disabled = money < clickerUpgradeCostValue;

        // Auto Clicker buy and upgrade
        autoClickerButton.disabled = money < autoClickerCostValue;
        autoClickerUpgradeButton.disabled = money < autoClickerUpgradeCostValue;

        // Farm buy and upgrade
        farmButton.disabled = money < farmCostValue;
        farmUpgradeButton.disabled = money < farmUpgradeCostValue;

        // Mine buy and upgrade
        mineButton.disabled = money < mineCostValue;
        mineUpgradeButton.disabled = money < mineUpgradeCostValue;

        // Bank buy and upgrade (requires farms)
        bankButton.disabled = money < bankCostValue || farms < 10;
        bankUpgradeButton.disabled = money < bankUpgradeCostValue;

        // Stock Exchange buy and upgrade (requires mines)
        stockExchangeButton.disabled = money < stockExchangeCostValue || mines < 5;
        stockExchangeUpgradeButton.disabled = money < stockExchangeUpgradeCostValue;

        // Prestige button
        prestigeButton.disabled = money < prestigeCost;

        // Reset Assets button
        resetGameButton.disabled = myLevel < nextResetLevelValue;

        // Bonus buttons
        collectBonusButton.disabled = collectBonusCooldown > 0;
        megaBonusButton.disabled = megaBonusCooldown > 0;
    }

    function updateInventoryDisplay() {
        myLevelDisplay.textContent = myLevel;

        clickerCountDisplay.textContent = "1"; // Fix: Clicker quantity should be fixed at 1
        clickerLevelDisplay.textContent = clickerLevel; // Clicker level

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

    // Calculate actual production for current clicker and buildings
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
        // Clicker displays total money per click
        clickValueDisplay.textContent = formatNumber(getCurrentClickAmount());
        clickerUpgradeCostDisplay.textContent = formatNumber(clickerUpgradeCostValue);
        clickerUpgradeAmountDisplay.textContent = formatNumber(getCurrentClickAmount() + (baseClickValue * myLevel)); // Show total after upgrade

        // Other buildings display "per unit" production
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
        collectBonusButton.textContent = collectBonusCooldown > 0 ? `Collect Bonus (${formatTime(collectBonusCooldown)})` : "Collect Bonus (5:00)";
        // Fix Mega Bonus display amount calculation to show actual bonus
        const megaBonusAmountDisplay = myLevel * 10000;
        megaBonusButton.textContent = megaBonusCooldown > 0 ? `Mega Bonus (${formatTime(megaBonusCooldown)})` : `Mega Bonus (${formatNumber(megaBonusAmountDisplay)}, 30:00)`;
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

    // Event Listeners
    clickButton.addEventListener("click", (event) => {
        const clickAmount = getCurrentClickAmount(); // Fix: Use getCurrentClickAmount
        money += clickAmount;
        showFloatingText(event.clientX, event.clientY, `+${formatNumber(clickAmount)}`);
        updateMoneyDisplay();
        updateButtonAvailability();
    });

    clickerUpgradeButton.addEventListener("click", () => {
        if (money >= clickerUpgradeCostValue) {
            money -= clickerUpgradeCostValue;
            clickerLevel++; // Level up
            clickerUpgradeCostValue = Math.ceil(clickerUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`Clicker upgraded to Level ${clickerLevel}!`);
        } else {
            showMessage("Insufficient funds!");
        }
    });

    autoClickerButton.addEventListener("click", () => {
        if (money >= autoClickerCostValue) {
            money -= autoClickerCostValue;
            autoClickers++;
            autoClickerCostValue = Math.ceil(autoClickerCostValue * 1.1);
            updateAllUI();
            showMessage(`Bought ${autoClickers} Auto Clicker(s)!`);
        } else {
            showMessage("Insufficient funds!");
        }
    });

    autoClickerUpgradeButton.addEventListener("click", () => {
        if (money >= autoClickerUpgradeCostValue) {
            money -= autoClickerUpgradeCostValue;
            autoClickerLevel++; // Level up
            autoClickerUpgradeCostValue = Math.ceil(autoClickerUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`Auto Clicker upgraded to Level ${autoClickerLevel}!`);
        } else {
            showMessage("Insufficient funds!");
        }
    });

    farmButton.addEventListener("click", () => {
        if (money >= farmCostValue) {
            money -= farmCostValue;
            farms++;
            farmCostValue = Math.ceil(farmCostValue * 1.1);
            updateAllUI();
            showMessage(`Bought ${farms} Farm(s)!`);
        } else {
            showMessage("Insufficient funds!");
        }
    });

    farmUpgradeButton.addEventListener("click", () => {
        if (money >= farmUpgradeCostValue) {
            money -= farmUpgradeCostValue;
            farmLevel++; // Level up
            farmUpgradeCostValue = Math.ceil(farmUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`Farm upgraded to Level ${farmLevel}!`);
        } else {
            showMessage("Insufficient funds!");
        }
    });

    mineButton.addEventListener("click", () => {
        if (money >= mineCostValue) {
            money -= mineCostValue;
            mines++;
            mineCostValue = Math.ceil(mineCostValue * 1.1);
            updateAllUI();
            showMessage(`Bought ${mines} Mine(s)!`);
        } else {
            showMessage("Insufficient funds!");
        }
    });

    mineUpgradeButton.addEventListener("click", () => {
        if (money >= mineUpgradeCostValue) {
            money -= mineUpgradeCostValue;
            mineLevel++; // Level up
            mineUpgradeCostValue = Math.ceil(mineUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`Mine upgraded to Level ${mineLevel}!`);
        } else {
            showMessage("Insufficient funds!");
        }
    });

    bankButton.addEventListener("click", () => {
        if (money >= bankCostValue && farms >= 10) {
            money -= bankCostValue;
            banks++;
            bankCostValue = Math.ceil(bankCostValue * 1.1);
            updateAllUI();
            showMessage(`Bought ${banks} Bank(s)!`);
        } else if (farms < 10) {
            showMessage("Requires 10 Farms to buy a Bank!");
        } else {
            showMessage("Insufficient funds!");
        }
    });

    bankUpgradeButton.addEventListener("click", () => {
        if (money >= bankUpgradeCostValue) {
            money -= bankUpgradeCostValue;
            bankLevel++; // Level up
            bankUpgradeCostValue = Math.ceil(bankUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`Bank upgraded to Level ${bankLevel}!`);
        } else {
            showMessage("Insufficient funds!");
        }
    });

    stockExchangeButton.addEventListener("click", () => {
        if (money >= stockExchangeCostValue && mines >= 5) {
            money -= stockExchangeCostValue;
            stockExchanges++;
            stockExchangeCostValue = Math.ceil(stockExchangeCostValue * 1.1);
            updateAllUI();
            showMessage(`Bought ${stockExchanges} Stock Exchange(s)!`);
        } else if (mines < 5) {
            showMessage("Requires 5 Mines to buy a Stock Exchange!");
        } else {
            showMessage("Insufficient funds!");
        }
    });

    stockExchangeUpgradeButton.addEventListener("click", () => {
        if (money >= stockExchangeUpgradeCostValue) {
            money -= stockExchangeUpgradeCostValue;
            stockExchangeLevel++; // Level up
            stockExchangeUpgradeCostValue = Math.ceil(stockExchangeUpgradeCostValue * 1.1);
            updateAllUI();
            showMessage(`Stock Exchange upgraded to Level ${stockExchangeLevel}!`);
        } else {
            showMessage("Insufficient funds!");
        }
    });

    prestigeButton.addEventListener("click", () => {
        if (money >= prestigeCost) {
            // Reset all resources and building quantities
            money = 0;
            autoClickers = 0;
            farms = 0;
            mines = 0;
            banks = 0;
            stockExchanges = 0;

            // Reset all building levels to 1
            clickerLevel = 1;
            autoClickerLevel = 1;
            farmLevel = 1;
            mineLevel = 1;
            bankLevel = 1;
            stockExchangeLevel = 1;

            // Prestige DOES NOT reset upgrade/buy costs.
            // Costs remain as they were before Prestige.

            myLevel++; // My Level increases
            prestigeCost = Math.ceil(prestigeCost * 2); // Prestige cost increases
            
            // Reset bonus cooldowns
            collectBonusCooldown = 0;
            megaBonusCooldown = 0;

            updateAllUI();
            showMessage(`Prestige successful! My Level increased to ${myLevel}!`);
        } else {
            showMessage("Insufficient funds for Prestige!");
        }
    });

    collectBonusButton.addEventListener("click", () => {
        if (collectBonusCooldown <= 0) {
            const bonusAmount = money * (0.05 + Math.random() * 0.10); // 5% to 15%
            money += bonusAmount;
            collectBonusCooldown = COLLECT_BONUS_MAX_COOLDOWN;
            updateAllUI();
            showMessage(`Collected ${formatNumber(bonusAmount)} money bonus!`);
        } else {
            showMessage(`Bonus on cooldown, please wait ${formatTime(collectBonusCooldown)}`);
        }
    });

    megaBonusButton.addEventListener("click", () => {
        if (megaBonusCooldown <= 0) {
            const bonusAmount = myLevel * 10000;
            money += bonusAmount;
            megaBonusCooldown = MEGA_BONUS_MAX_COOLDOWN;
            updateAllUI();
            showMessage(`Received ${formatNumber(bonusAmount)} Mega Bonus!`);
        } else {
            showMessage(`Mega Bonus on cooldown, please wait ${formatTime(megaBonusCooldown)}`);
        }
    });

    resetGameButton.addEventListener("click", () => {
        if (myLevel >= nextResetLevelValue) {
            // Reset all resources and building quantities
            money = 0;
            autoClickers = 0;
            farms = 0;
            mines = 0;
            banks = 0;
            stockExchanges = 0;

            // Reset all building levels to 1
            clickerLevel = 1;
            autoClickerLevel = 1;
            farmLevel = 1;
            mineLevel = 1;
            bankLevel = 1;
            stockExchangeLevel = 1;

            // Reset upgrade costs to initial values (This is specific to "Reset Assets")
            clickerUpgradeCostValue = initialClickerUpgradeCost;
            autoClickerUpgradeCostValue = initialAutoClickerUpgradeCost;
            farmUpgradeCostValue = initialFarmUpgradeCost;
            mineUpgradeCostValue = initialMineUpgradeCost;
            bankUpgradeCostValue = initialBankUpgradeCost;
            stockExchangeUpgradeCostValue = initialStockExchangeUpgradeCost;

            // Reset buy costs to initial values (This is specific to "Reset Assets")
            autoClickerCostValue = initialAutoClickerCost;
            farmCostValue = initialFarmCost;
            mineCostValue = initialMineCost;
            bankCostValue = initialBankCost;
            stockExchangeCostValue = initialStockExchangeCost;

            nextResetLevelValue = myLevel + 10; // Next reset level requirement increases
            
            // Reset bonus cooldowns
            collectBonusCooldown = 0;
            megaBonusCooldown = 0;

            updateAllUI();
            showMessage(`Assets reset! Next reset level requirement: ${nextResetLevelValue}.`);
        } else {
            showMessage(`My Level needs to be ${nextResetLevelValue} to reset assets!`);
        }
    });

    fullResetButton.addEventListener("click", () => {
        // Replace confirm() with a custom modal in a real application, as confirm() might not display in an iframe.
        // For simplicity, using window.confirm() as a temporary fallback here.
        const confirmReset = window.confirm("Are you sure you want to fully reset the game? All progress will be lost!");
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

            // Reset upgrade costs to initial values
            clickerUpgradeCostValue = initialClickerUpgradeCost;
            autoClickerUpgradeCostValue = initialAutoClickerUpgradeCost;
            farmUpgradeCostValue = initialFarmUpgradeCost;
            mineUpgradeCostValue = initialMineUpgradeCost;
            bankUpgradeCostValue = initialBankUpgradeCost;
            stockExchangeUpgradeCostValue = initialStockExchangeUpgradeCost;

            // Reset buy costs to initial values
            autoClickerCostValue = initialAutoClickerCost;
            farmCostValue = initialFarmCost;
            mineCostValue = initialMineCost;
            bankCostValue = initialBankCost;
            stockExchangeCostValue = initialStockExchangeCost;

            nextResetLevelValue = 10;
            prestigeCost = 10000;

            // Reset bonus cooldowns
            collectBonusCooldown = 0;
            megaBonusCooldown = 0;

            updateAllUI();
            showMessage("Game Fully Reset!");
        }
    });

    // Automatically Generate Money
    setInterval(() => {
        let passiveIncome = (
            (autoClickers * getCurrentAutoClickerIncomePerUnit()) +
            (farms * getCurrentFarmIncomePerUnit()) +
            (mines * getCurrentMineIncomePerUnit()) +
            (banks * getCurrentBankIncomePerUnit()) +
            (stockExchanges * getCurrentStockExchangeIncomePerUnit())
        ) * myLevel; // My Level as a global multiplier

        money += passiveIncome / 10; // Passive income per second (divided by 10 for 100ms interval)
        updateMoneyDisplay();
        updateButtonAvailability();
    }, 100); // Update every 100 milliseconds

    // Bonus cooldown timer
    setInterval(() => {
        if (collectBonusCooldown > 0) {
            collectBonusCooldown--;
        }
        if (megaBonusCooldown > 0) {
            megaBonusCooldown--;
        }
        updateBonusButtonText();
    }, 1000); // Update every second

    // Instruction button event listener
    showInstructionsButton.addEventListener("click", () => {
        instructionModal.style.display = "flex"; // Show modal
    });

    // Close button event listener
    closeButton.addEventListener("click", () => {
        instructionModal.style.display = "none"; // Hide modal
    });

    // Click outside modal to hide (optional)
    instructionModal.addEventListener("click", (event) => {
        if (event.target === instructionModal) {
            instructionModal.style.display = "none";
        }
    });

    // Initialize UI
    updateAllUI();
});
