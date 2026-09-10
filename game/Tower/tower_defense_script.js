// Language configuration for localization
const languageConfig = {
    'zh-TW': {
        title: 'Lifer_Lighdow塔防',
        money: '金錢',
        lives: '生命',
        wave: '波次',
        score: '分數',
        startButton: '開始遊戲',
        pauseButton: '暫停',
        resumeButton: '繼續',
        resetButton: '重置遊戲',
        speed1x: '1x 速度',
        speed2x: '2x 速度',
        speed4x: '4x 速度',
        buildBasicTower: '建造基礎塔',
        buildSlowTower: '建造緩速塔',
        buildHeavyTower: '建造重砲塔',
        buildSplashTower: '建造範圍攻擊塔',
        cost: '費用',
        gameOver: '遊戲結束！',
        gameWin: '恭喜過關！',
        yourScore: '您的分數：',
        restart: '重新開始',
        soldierSelfDestruct: '士兵在起點自爆。',
        pathEmpty: '路徑為空，無法放置主塔。',
        unknownTowerType: '未知的塔類型！',
        notEnoughMoney: '金錢不足！',
        cannotPlaceTower: '無法在此放置塔 (該位置已有塔或為主塔位置)。',
        mustBeOnGrass: '無法在此放置塔 (必須在草地上)。',
        gameSpeedSet: '遊戲速度設定為:',
    },
    'en': {
        title: 'Lifer_Lighdow Tower Defense',
        money: 'Money',
        lives: 'Lives',
        wave: 'Wave',
        score: 'Score',
        startButton: 'Start Game',
        pauseButton: 'Pause',
        resumeButton: 'Resume',
        resetButton: 'Reset Game',
        speed1x: '1x Speed',
        speed2x: '2x Speed',
        speed4x: '4x Speed',
        buildBasicTower: 'Build Basic Tower',
        buildSlowTower: 'Build Slow Tower',
        buildHeavyTower: 'Build Heavy Tower',
        buildSplashTower: 'Build Splash Tower',
        cost: 'Cost',
        gameOver: 'Game Over!',
        gameWin: 'Congratulations!',
        yourScore: 'Your Score:',
        restart: 'Restart',
        soldierSelfDestruct: 'Soldier self-destructed at start point.',
        pathEmpty: 'Path is empty, cannot place main tower.',
        unknownTowerType: 'Unknown tower type!',
        notEnoughMoney: 'Not enough money!',
        cannotPlaceTower: 'Cannot place tower here (position already occupied or main tower spot).',
        mustBeOnGrass: 'Cannot place tower here (must be on grass).',
        gameSpeedSet: 'Game speed set to:',
    }
};

// Get canvas and its 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Get game info display elements
const moneyDisplay = document.getElementById('money');
const livesDisplay = document.getElementById('lives');
const waveDisplay = document.getElementById('wave');
const totalWavesDisplay = document.getElementById('totalWaves');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const speed1xButton = document.getElementById('speed1xButton');
const speed2xButton = document.getElementById('speed2xButton');
const speed4xButton = document.getElementById('speed4xButton');
const speedButtons = [speed1xButton, speed2xButton, speed4xButton];
const buildBasicTowerButton = document.getElementById('buildBasicTowerButton');
const buildSlowTowerButton = document.getElementById('buildSlowTowerButton');
const buildHeavyTowerButton = document.getElementById('buildHeavyTowerButton');
const buildSplashTowerButton = document.getElementById('buildSplashTowerButton');
const towerButtons = [buildBasicTowerButton, buildSlowTowerButton, buildHeavyTowerButton, buildSplashTowerButton];
const gameOverMessage = document.getElementById('gameOverMessage');
const finalScoreDisplay = document.getElementById('finalScore');
const gameWinMessage = document.getElementById('gameWinMessage');
const finalWinScoreDisplay = document.getElementById('finalWinScore');
const restartGameOverButton = document.getElementById('restartGameOverButton');
const restartGameWinButton = document.getElementById('restartGameWinButton');

// Game settings
const TILE_SIZE = 50;
const MAP_WIDTH_TILES = 25;
const MAP_HEIGHT_TILES = 15;
const PATH_COLOR = '#4a2c0f'; // Darker, sci-fi path color
const GRASS_COLOR = '#2c5a3d'; // Darker, sci-fi grass color
const WAVE_INTERVAL = 5000;
let TOTAL_WAVES;
const BOSS_WAVE_INTERVAL = 5;
const BOSS_LIFE_DEDUCTION = 5;
const MIN_PATH_LENGTH = 100;

// Game state variables
let money = 300;
let lives = 10;
let score = 0;
let wave = 0;
let enemies = [];
let soldiers = [];
let towers = [];
let bullets = [];
let gameRunning = false;
let isPaused = false;
let lastWaveTime = 0;
let selectedTowerType = 'basic';
let mainTower = null;
let gameSpeedMultiplier = 1;

// Adjust canvas size to match new map tile count
canvas.width = MAP_WIDTH_TILES * TILE_SIZE;
canvas.height = MAP_HEIGHT_TILES * TILE_SIZE;

let gameMap = [];
let path = [];

// Function to update UI text based on current language
function updateUIText() {
    const lang = languageConfig[gameLanguage];
    if (!lang) {
        console.error("Language configuration not found for:", gameLanguage);
        return;
    }

    // Update game info labels
    document.querySelector('.game-info div:nth-child(1)').childNodes[0].nodeValue = lang.money + ': ';
    document.querySelector('.game-info div:nth-child(2)').childNodes[0].nodeValue = lang.lives + ': ';
    document.querySelector('.game-info div:nth-child(3)').childNodes[0].nodeValue = lang.wave + ': ';
    document.querySelector('.game-info div:nth-child(4)').childNodes[0].nodeValue = lang.score + ': ';

    // Update buttons
    startButton.textContent = lang.startButton;
    pauseButton.textContent = isPaused ? lang.resumeButton : lang.pauseButton;
    resetButton.textContent = lang.resetButton;
    speed1xButton.textContent = lang.speed1x;
    speed2xButton.textContent = lang.speed2x;
    speed4xButton.textContent = lang.speed4x;

    // Update tower build buttons with costs
    buildBasicTowerButton.childNodes[0].nodeValue = lang.buildBasicTower + ' (';
    buildBasicTowerButton.querySelector('.cost').textContent = BasicTower.prototype.cost;
    buildBasicTowerButton.childNodes[2].nodeValue = ')';

    buildSlowTowerButton.childNodes[0].nodeValue = lang.buildSlowTower + ' (';
    buildSlowTowerButton.querySelector('.cost').textContent = SlowTower.prototype.cost;
    buildSlowTowerButton.childNodes[2].nodeValue = ')';

    buildHeavyTowerButton.childNodes[0].nodeValue = lang.buildHeavyTower + ' (';
    buildHeavyTowerButton.querySelector('.cost').textContent = HeavyTower.prototype.cost;
    buildHeavyTowerButton.childNodes[2].nodeValue = ')';

    buildSplashTowerButton.childNodes[0].nodeValue = lang.buildSplashTower + ' (';
    buildSplashTowerButton.querySelector('.cost').textContent = SplashTower.prototype.cost;
    buildSplashTowerButton.childNodes[2].nodeValue = ')';

    // Update game over/win messages
    gameOverMessage.querySelector('.message-text').textContent = lang.gameOver;
    gameOverMessage.querySelector('.score-text').textContent = lang.yourScore;
    gameWinMessage.querySelector('.message-text').textContent = lang.gameWin;
    gameWinMessage.querySelector('.score-text').textContent = lang.yourScore;
    restartGameOverButton.textContent = lang.restart;
    restartGameWinButton.textContent = lang.restart;
}

/**
 * Generates a random map path from top-left to bottom-right.
 * The function creates a path starting at (0,0) and ending at (MAP_WIDTH_TILES - 1, MAP_HEIGHT_TILES - 1).
 * The path primarily moves right or down, avoiding immediate U-turns and ensuring a minimum length.
 */
function generateRandomMap() {
    let attempts = 0;
    const maxAttemptsMapGen = 5000;

    while (attempts < maxAttemptsMapGen) {
        gameMap = Array(MAP_HEIGHT_TILES).fill(0).map(() => Array(MAP_WIDTH_TILES).fill(0));
        path = [];
        let currentX = 0;
        let currentY = 0;
        let pathGenerationSuccess = true;

        gameMap[currentY][currentX] = 1;
        path.push({ x: currentX * TILE_SIZE + TILE_SIZE / 2, y: currentY * TILE_SIZE + TILE_SIZE / 2 });

        while (currentX !== MAP_WIDTH_TILES - 1 || currentY !== MAP_HEIGHT_TILES - 1) {
            let validMoves = [];

            const moves = [
                { dx: 1, dy: 0, dir: 'right', weight: 3 },
                { dx: 0, dy: 1, dir: 'down', weight: 3 },
                { dx: 0, dy: -1, dir: 'up', weight: 1 },
                { dx: -1, dy: 0, dir: 'left', weight: 1 }
            ];

            for (const move of moves) {
                const nextX = currentX + move.dx;
                const nextY = currentY + move.dy;

                if (nextX >= 0 && nextX < MAP_WIDTH_TILES && nextY >= 0 && nextY < MAP_HEIGHT_TILES && gameMap[nextY][nextX] === 0) {
                    if (path.length > 1) {
                        const prevGridX = Math.floor(path[path.length - 2].x / TILE_SIZE);
                        const prevGridY = Math.floor(path[path.length - 2].y / TILE_SIZE);
                        if (nextX === prevGridX && nextY === prevGridY) {
                            continue;
                        }
                    }
                    validMoves.push(move);
                }
            }

            if (validMoves.length > 0) {
                let totalWeight = validMoves.reduce((sum, move) => sum + move.weight, 0);
                let randomWeight = Math.random() * totalWeight;
                let chosenMove = null;

                for (const move of validMoves) {
                    randomWeight -= move.weight;
                    if (randomWeight <= 0) {
                        chosenMove = move;
                        break;
                    }
                }

                currentX += chosenMove.dx;
                currentY += chosenMove.dy;
                gameMap[currentY][currentX] = 1;
                path.push({ x: currentX * TILE_SIZE + TILE_SIZE / 2, y: currentY * TILE_SIZE + TILE_SIZE / 2 });
            } else {
                pathGenerationSuccess = false;
                break;
            }
        }

        if (currentX === MAP_WIDTH_TILES - 1 && currentY === MAP_HEIGHT_TILES - 1 && path.length >= MIN_PATH_LENGTH) {
            console.log("Map successfully generated, path length:", path.length);
            return;
        }
        attempts++;
    }
    console.error("Failed to generate a valid map after", maxAttemptsMapGen, "attempts. Using fallback straight path.");
    generateFallbackPath();
}

function generateFallbackPath() {
    console.warn("Generating fallback straight path.");
    gameMap = Array(MAP_HEIGHT_TILES).fill(0).map(() => Array(MAP_WIDTH_TILES).fill(0));
    path = [];
    let currentX = 0;
    let currentY = 0;

    while (currentX < MAP_WIDTH_TILES - 1) {
        gameMap[currentY][currentX] = 1;
        path.push({ x: currentX * TILE_SIZE + TILE_SIZE / 2, y: currentY * TILE_SIZE + TILE_SIZE / 2 });
        currentX++;
    }
    while (currentY < MAP_HEIGHT_TILES) {
        gameMap[currentY][currentX] = 1;
        path.push({ x: currentX * TILE_SIZE + TILE_SIZE / 2, y: currentY * TILE_SIZE + TILE_SIZE / 2 });
        currentY++;
    }
    if (path[path.length - 1].x !== (MAP_WIDTH_TILES - 1) * TILE_SIZE + TILE_SIZE / 2 ||
        path[path.length - 1].y !== (MAP_HEIGHT_TILES - 1) * TILE_SIZE + TILE_SIZE / 2) {
        path[path.length - 1] = { x: (MAP_WIDTH_TILES - 1) * TILE_SIZE + TILE_SIZE / 2, y: (MAP_HEIGHT_TILES - 1) * TILE_SIZE + TILE_SIZE / 2 };
    }
    console.log("Fallback path length:", path.length);
}


// Enemy base class
class Enemy {
    constructor(waveNum, healthFactor, speedFactor, color, radius = 15) {
        this.x = path[0].x;
        this.y = path[0].y;
        this.initialHealth = Math.floor((100 + waveNum * 10) * healthFactor * 2);
        this.health = this.initialHealth;
        this.baseSpeed = (1 + waveNum * 0.05) * speedFactor;
        this.currentSpeed = this.baseSpeed;
        this.radius = radius;
        this.color = color;
        this.pathIndex = 0;
        this.reward = 0;
        this.isSlowed = false;
        this.slowFactor = 0;
        this.slowTimer = 0;
        this.targetSoldier = null;
        this.damage = 10 + Math.floor(waveNum * 0.5);
        this.attackRate = 1000;
        this.lastAttackTime = 0;
    }

    update(currentTime) {
        if (this.isSlowed && currentTime > this.slowTimer) {
            this.isSlowed = false;
            this.slowFactor = 0;
        }

        this.targetSoldier = null;
        let minDistanceToSoldier = Infinity;
        for (const soldier of soldiers) {
            if (soldier.health > 0) {
                const dx = soldier.x - this.x;
                const dy = soldier.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance <= this.radius + soldier.radius + 5 && distance < minDistanceToSoldier) {
                    minDistanceToSoldier = distance;
                    this.targetSoldier = soldier;
                }
            }
        }

        if (this.targetSoldier) {
            this.currentSpeed = 0;
            if (currentTime - this.lastAttackTime > this.attackRate / gameSpeedMultiplier) {
                this.targetSoldier.health -= this.damage;
                this.lastAttackTime = currentTime;
            }
        } else {
            this.currentSpeed = this.baseSpeed;
        }

        const actualSpeed = (this.isSlowed ? this.baseSpeed * (1 - this.slowFactor) : this.baseSpeed);
        const speedToUse = this.currentSpeed === 0 ? 0 : actualSpeed * gameSpeedMultiplier;

        const target = path[this.pathIndex];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= speedToUse) {
            this.x = target.x;
            this.y = target.y;
            this.pathIndex++;

            if (this.pathIndex >= path.length) {
                if (this instanceof BossEnemy) {
                    lives -= BOSS_LIFE_DEDUCTION;
                } else {
                    lives--;
                }
                updateGameInfo();
                return false;
            }
        } else {
            this.x += (dx / distance) * speedToUse;
            this.y += (dy / distance) * speedToUse;
        }
        return true;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.beginPath();
        if (this instanceof BasicEnemy) {
            ctx.rect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
        } else if (this instanceof FastEnemy) {
            ctx.moveTo(0, -this.radius * 1.2);
            ctx.lineTo(this.radius, this.radius * 0.8);
            ctx.lineTo(-this.radius, this.radius * 0.8);
            ctx.closePath();
        } else if (this instanceof TankEnemy) {
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                ctx.lineTo(this.radius * Math.cos(angle), this.radius * Math.sin(angle));
            }
            ctx.closePath();
        } else if (this instanceof ArmoredEnemy) {
            for (let i = 0; i < 8; i++) {
                const angle = (Math.PI / 4) * i;
                ctx.lineTo(this.radius * Math.cos(angle), this.radius * Math.sin(angle));
            }
            ctx.closePath();
        } else if (this instanceof BossEnemy) {
            ctx.rect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
            ctx.moveTo(0, -this.radius * 1.5);
            ctx.lineTo(this.radius * 0.5, -this.radius);
            ctx.lineTo(-this.radius * 0.5, -this.radius);
            ctx.closePath();
        }
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();

        ctx.restore();

        const healthBarWidth = this.radius * 2;
        const healthBarHeight = 5;
        const currentHealthWidth = (this.health / this.initialHealth) * healthBarWidth;
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - this.radius, this.y - this.radius - 10, healthBarWidth, healthBarHeight);
        ctx.fillStyle = 'lime';
        ctx.fillRect(this.x - this.radius, this.y - this.radius - 10, currentHealthWidth, healthBarHeight);

        if (this.isSlowed) {
            ctx.fillStyle = 'cyan';
            ctx.beginPath();
            ctx.arc(this.x + this.radius - 5, this.y - this.radius - 15, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

class BasicEnemy extends Enemy {
    constructor(waveNum) {
        super(waveNum, 1.0, 1.0, '#e74c3c');
        this.reward = 15;
    }
}

class FastEnemy extends Enemy {
    constructor(waveNum) {
        super(waveNum, 0.7, 1.5, '#9b59b6', 12);
        this.reward = 20;
    }
}

class TankEnemy extends Enemy {
    constructor(waveNum) {
        super(waveNum, 2.0, 0.7, '#27ae60', 20);
        this.reward = 50;
    }
}

class ArmoredEnemy extends Enemy {
    constructor(waveNum) {
        super(waveNum, 2.5, 0.8, '#7f8c8d', 18);
        this.reward = 100;
    }
}

class BossEnemy extends Enemy {
    constructor(waveNum) {
        super(waveNum, 15.0, 0.5, '#34495e', 30);
        this.initialHealth = Math.floor((500 + waveNum * 50) * 15 * 2);
        this.health = this.initialHealth;
        this.color = '#34495e';
        this.radius = 30;
        this.reward = Math.floor(500 + waveNum * 50);
        this.attackRate = 500;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.beginPath();
        const numPoints = 8;
        for (let i = 0; i < numPoints * 2; i++) {
            const outerRadius = this.radius * (i % 2 === 0 ? 1.2 : 0.8);
            const angle = (Math.PI / numPoints) * i;
            ctx.lineTo(outerRadius * Math.cos(angle), outerRadius * Math.sin(angle));
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.shadowBlur = 25;
        ctx.shadowColor = '#e74c3c';
        ctx.fill();

        ctx.restore();

        const healthBarWidth = this.radius * 2;
        const healthBarHeight = 5;
        const currentHealthWidth = (this.health / this.initialHealth) * healthBarWidth;
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - this.radius, this.y - this.radius - 10, healthBarWidth, healthBarHeight);
        ctx.fillStyle = 'lime';
        ctx.fillRect(this.x - this.radius, this.y - this.radius - 10, currentHealthWidth, healthBarHeight);

        ctx.fillStyle = 'gold';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👑', this.x, this.y - this.radius - 25);
    }
}

// Tower base class
class Tower {
    constructor(x, y, cost, color, range, fireRate, damage, bulletColor, slowAmount = 0, slowDuration = 0, splashRadius = 0) {
        this.x = x;
        this.y = y;
        this.size = TILE_SIZE * 0.8;
        this.cost = cost;
        this.color = color;
        this.range = range;
        this.fireRate = fireRate;
        this.damage = damage;
        this.bulletColor = bulletColor;
        this.slowAmount = slowAmount;
        this.slowDuration = slowDuration;
        this.splashRadius = splashRadius;
        this.lastShotTime = 0;
    }

    update(currentTime) {
        let targetEnemy = null;
        let minDistance = Infinity;

        for (const enemy of enemies) {
            if (enemy.health > 0 && enemy.pathIndex < path.length) {
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance <= this.range && distance < minDistance) {
                    minDistance = distance;
                    targetEnemy = enemy;
                }
            }
        }

        if (targetEnemy && currentTime - this.lastShotTime > this.fireRate / gameSpeedMultiplier) {
            bullets.push(new Bullet(this.x, this.y, targetEnemy, this.damage, this.bulletColor, this.slowAmount, this.slowDuration, this.splashRadius));
            this.lastShotTime = currentTime;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.beginPath();
        ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.fill();

        this.drawTurret();

        ctx.restore();
    }

    drawTurret() {
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = '#3498db';
        ctx.fill();
        ctx.strokeStyle = '#2980b9';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowBlur = 15;
        ctx.shadowColor = '#3498db';
        ctx.fill();
    }
}

class BasicTower extends Tower {
    constructor(x, y) {
        super(x, y, 50, '#34495e', 150, 500, 20, '#f1c40f');
    }
    drawTurret() {
        ctx.beginPath();
        ctx.rect(-this.size * 0.15, -this.size * 0.4, this.size * 0.3, this.size * 0.8);
        ctx.fillStyle = '#7f8c8d';
        ctx.fill();
        ctx.strokeStyle = '#556270';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -this.size * 0.4, this.size * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = '#f1c40f';
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#f1c40f';
        ctx.fill();
    }
}

class SlowTower extends Tower {
    constructor(x, y) {
        super(x, y, 75, '#1abc9c', 120, 700, 10, '#3498db', 0.4, 2000);
    }
    drawTurret() {
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 0.4);
        ctx.lineTo(this.size * 0.3, 0);
        ctx.lineTo(0, this.size * 0.4);
        ctx.lineTo(-this.size * 0.3, 0);
        ctx.closePath();
        ctx.fillStyle = '#3498db';
        ctx.fill();
        ctx.strokeStyle = '#2980b9';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowBlur = 20;
        ctx.shadowColor = '#3498db';
        ctx.fill();
    }
}

class HeavyTower extends Tower {
    constructor(x, y) {
        super(x, y, 100, '#c0392b', 200, 1200, 80, '#e74c3c');
    }
    drawTurret() {
        ctx.beginPath();
        ctx.rect(-this.size * 0.25, -this.size * 0.5, this.size * 0.5, this.size);
        ctx.fillStyle = '#556270';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -this.size * 0.5, this.size * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#e74c3c';
        ctx.fill();
    }
}

class SplashTower extends Tower {
    constructor(x, y) {
        super(x, y, 120, '#d35400', 100, 800, 25, '#f39c12', 0, 0, 40);
    }
    drawTurret() {
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#f39c12';
        ctx.fill();
        ctx.strokeStyle = '#e67e22';
        ctx.lineWidth = 2;
        ctx.stroke();

        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(this.size * 0.4 * Math.cos(angle), this.size * 0.4 * Math.sin(angle));
            ctx.strokeStyle = '#f39c12';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#f39c12';
        ctx.fill();
    }
}

class MainTower extends Tower {
    constructor(x, y) {
        super(x, y, 0, '#2c3e50', Infinity, 10000, 0, '');
        this.size = TILE_SIZE * 1.5;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.beginPath();
        ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.fillStyle = '#34495e';
        ctx.fill();
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 152, 219, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ecf0f1';
        ctx.fill();
        ctx.strokeStyle = '#bdc3c7';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowBlur = 30;
        ctx.shadowColor = '#f1c40f';
        ctx.fill();

        ctx.restore();
    }

    update(currentTime) {
        if (currentTime - this.lastShotTime > this.fireRate / gameSpeedMultiplier) {
            soldiers.push(new Soldier(this.x, this.y, wave));
            this.lastShotTime = currentTime;
        }
    }
}

class Soldier {
    constructor(spawnX, spawnY, currentWave) {
        const basicEnemyTemplate = new BasicEnemy(currentWave);
        this.x = spawnX;
        this.y = spawnY;
        this.radius = 15;
        this.color = '#3498db';
        this.initialHealth = basicEnemyTemplate.initialHealth / 2;
        this.health = this.initialHealth;
        this.baseSpeed = basicEnemyTemplate.baseSpeed;
        this.currentSpeed = this.baseSpeed;
        this.damage = BasicTower.prototype.damage;
        this.attackRate = BasicTower.prototype.fireRate;
        this.lastAttackTime = 0;
        this.pathIndex = path.length - 1;
        this.targetEnemy = null;
    }

    update(currentTime) {
        this.targetEnemy = null;
        let minDistanceToEnemy = Infinity;
        for (const enemy of enemies) {
            if (enemy.health > 0) {
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance <= this.radius + enemy.radius + 5 && distance < minDistanceToEnemy) {
                    minDistanceToEnemy = distance;
                    this.targetEnemy = enemy;
                }
            }
        }

        if (this.targetEnemy) {
            this.currentSpeed = 0;
            if (currentTime - this.lastAttackTime > this.attackRate / gameSpeedMultiplier) {
                this.targetEnemy.health -= this.damage;
                this.lastAttackTime = currentTime;
                if (this.targetEnemy.health <= 0) {
                    score += this.targetEnemy.reward;
                    money += this.targetEnemy.reward;
                    updateGameInfo();
                    this.targetEnemy = null;
                }
            }
        } else {
            this.currentSpeed = this.baseSpeed;
        }

        const effectiveSpeed = this.currentSpeed * gameSpeedMultiplier;

        if (this.pathIndex > 0) {
            const target = path[this.pathIndex - 1];
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= effectiveSpeed) {
                this.x = target.x;
                this.y = target.y;
                this.pathIndex--;
            } else {
                this.x += (dx / distance) * effectiveSpeed;
                this.y += (dy / distance) * effectiveSpeed;
            }
        } else {
            if (this.targetEnemy === null) {
                console.log(languageConfig[gameLanguage].soldierSelfDestruct);
                return false;
            }
        }
        return true;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.beginPath();
        ctx.rect(-this.radius * 0.8, -this.radius, this.radius * 1.6, this.radius * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#2980b9';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-this.radius * 0.4, -this.radius * 0.5, 3, 0, Math.PI * 2);
        ctx.arc(this.radius * 0.4, -this.radius * 0.5, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#f1c40f';
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#f1c40f';
        ctx.fill();

        ctx.restore();

        const healthBarWidth = this.radius * 2;
        const healthBarHeight = 5;
        const currentHealthWidth = (this.health / this.initialHealth) * healthBarWidth;
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - this.radius, this.y - this.radius - 10, healthBarWidth, healthBarHeight);
        ctx.fillStyle = 'lime';
        ctx.fillRect(this.x - this.radius, this.y - this.radius - 10, currentHealthWidth, healthBarHeight);
    }
}


// Bullet constructor (for player-built towers)
class Bullet {
    constructor(x, y, target, damage, color, slowAmount = 0, slowDuration = 0, splashRadius = 0, radius = 5) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.target = target;
        this.damage = damage;
        this.slowAmount = slowAmount;
        this.slowDuration = slowDuration;
        this.splashRadius = splashRadius;
        this.baseSpeed = 12;
    }

    update(currentTime) {
        if (!this.target || this.target.health <= 0 || this.target.pathIndex >= path.length) {
            return false;
        }

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const actualBulletSpeed = this.baseSpeed * gameSpeedMultiplier;

        if (distance <= actualBulletSpeed) {
            this.target.health -= this.damage;

            if (this.slowAmount > 0 && !this.target.isSlowed) {
                this.target.isSlowed = true;
                this.target.slowFactor = this.slowAmount;
                this.target.slowTimer = currentTime + this.slowDuration;
                this.target.currentSpeed = this.target.baseSpeed * (1 - this.target.slowFactor);
            }

            if (this.splashRadius > 0) {
                for (const otherEnemy of enemies) {
                    if (otherEnemy !== this.target && otherEnemy.health > 0) {
                        const dxSplash = otherEnemy.x - this.target.x;
                        const dySplash = otherEnemy.y - this.target.y;
                        const distToOther = Math.sqrt(dxSplash * dxSplash + dySplash * dySplash);

                        if (distToOther <= this.splashRadius) {
                            otherEnemy.health -= this.damage;
                            if (otherEnemy.health <= 0) {
                                score += otherEnemy.reward;
                                money += otherEnemy.reward;
                                updateGameInfo();
                            }
                        }
                    }
                }
            }

            if (this.target.health <= 0) {
                score += this.target.reward;
                money += this.target.reward;
                updateGameInfo();
            }
            return false;
        } else {
            this.x += (dx / distance) * actualBulletSpeed;
            this.y += (dy / distance) * actualBulletSpeed;
        }
        return true;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
    }
}


// Draw map
function drawMap() {
    for (let row = 0; row < gameMap.length; row++) {
        for (let col = 0; col < gameMap[row].length; col++) {
            const x = col * TILE_SIZE;
            const y = row * TILE_SIZE;
            ctx.fillStyle = gameMap[row][col] === 1 ? PATH_COLOR : GRASS_COLOR;
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
        }
    }
}

// Update game info display
function updateGameInfo() {
    moneyDisplay.textContent = money;
    livesDisplay.textContent = lives;
    waveDisplay.textContent = wave;
    totalWavesDisplay.textContent = TOTAL_WAVES;
    scoreDisplay.textContent = score;

    buildBasicTowerButton.disabled = money < BasicTower.prototype.cost;
    buildSlowTowerButton.disabled = money < SlowTower.prototype.cost;
    buildHeavyTowerButton.disabled = money < HeavyTower.prototype.cost;
    buildSplashTowerButton.disabled = money < SplashTower.prototype.cost;
}

// Spawn enemy wave
function spawnWave() {
    wave++;
    waveDisplay.textContent = wave;

    const isBossWave = (wave % BOSS_WAVE_INTERVAL === 0 || wave === TOTAL_WAVES);
    const numEnemiesInNormalWave = 5 + wave * 2;

    if (isBossWave) {
        setTimeout(() => {
            enemies.push(new BossEnemy(wave));
        }, 500 / gameSpeedMultiplier);

        const numRegularEnemies = Math.floor(numEnemiesInNormalWave * 0.5);
        for (let i = 0; i < numRegularEnemies; i++) {
            let EnemyType;
            const rand = Math.random();
            if (wave < 3) {
                EnemyType = BasicEnemy;
            } else if (wave < 6) {
                EnemyType = rand < 0.6 ? BasicEnemy : FastEnemy;
            } else if (wave < 9) {
                EnemyType = rand < 0.4 ? BasicEnemy : (rand < 0.7 ? FastEnemy : TankEnemy);
            } else if (wave < 12) {
                EnemyType = rand < 0.3 ? BasicEnemy : (rand < 0.6 ? FastEnemy : (rand < 0.85 ? TankEnemy : ArmoredEnemy));
            } else {
                EnemyType = rand < 0.25 ? BasicEnemy : (rand < 0.5 ? FastEnemy : (rand < 0.75 ? TankEnemy : ArmoredEnemy));
            }
            setTimeout(() => {
                enemies.push(new EnemyType(wave));
            }, (1000 + i * 500) / gameSpeedMultiplier);
        }
    } else {
        for (let i = 0; i < numEnemiesInNormalWave; i++) {
            let EnemyType;
            const rand = Math.random();
            if (wave < 3) {
                EnemyType = BasicEnemy;
            } else if (wave < 6) {
                EnemyType = rand < 0.6 ? BasicEnemy : FastEnemy;
            } else if (wave < 9) {
                EnemyType = rand < 0.4 ? BasicEnemy : (rand < 0.7 ? FastEnemy : TankEnemy);
            } else if (wave < 12) {
                EnemyType = rand < 0.3 ? BasicEnemy : (rand < 0.6 ? FastEnemy : (rand < 0.85 ? TankEnemy : ArmoredEnemy));
            } else {
                EnemyType = rand < 0.25 ? BasicEnemy : (rand < 0.5 ? FastEnemy : (rand < 0.75 ? TankEnemy : ArmoredEnemy));
            }

            setTimeout(() => {
                enemies.push(new EnemyType(wave));
            }, (i * 500) / gameSpeedMultiplier);
        }
    }
}

/**
 * Initializes or resets the game state.
 * This function is called at the start of the game and when resetting.
 */
function startGameInitialization() {
    money = 300;
    lives = 10;
    score = 0;
    wave = 0;
    enemies = [];
    soldiers = [];
    towers = [];
    bullets = [];
    isPaused = false;
    lastWaveTime = performance.now();
    gameSpeedMultiplier = 1;

    const minWaves = 20;
    const maxWaves = 50;
    const range = (maxWaves - minWaves) / 5 + 1;
    const randomMultiple = Math.floor(Math.random() * range);
    TOTAL_WAVES = minWaves + randomMultiple * 5;

    generateRandomMap();

    if (path.length > 0) {
        const lastPathPoint = path[path.length - 1];
        mainTower = new MainTower(lastPathPoint.x, lastPathPoint.y);
    } else {
        console.error(languageConfig[gameLanguage].pathEmpty);
        mainTower = null;
    }

    updateGameInfo();
    gameOverMessage.style.display = 'none';
    gameWinMessage.style.display = 'none';

    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    towerButtons.forEach(btn => btn.disabled = false);
    speedButtons.forEach(btn => btn.disabled = false);
    speedButtons.forEach(btn => btn.classList.remove('selected-speed'));
    speed1xButton.classList.add('selected-speed');
    buildBasicTowerButton.classList.add('selected-tower');
    selectedTowerType = 'basic';
    pauseButton.textContent = languageConfig[gameLanguage].pauseButton;
}


// Main game loop
function gameLoop(currentTime) {
    if (!gameRunning || isPaused) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();

    if (mainTower) {
        mainTower.update(currentTime);
        mainTower.draw();
    }

    soldiers.forEach(soldier => soldier.update(currentTime));
    enemies.forEach(enemy => enemy.update(currentTime));

    enemies = enemies.filter(enemy => enemy.health > 0);
    soldiers = soldiers.filter(soldier => soldier.health > 0);

    enemies.forEach(enemy => enemy.draw());
    soldiers.forEach(soldier => soldier.draw());
    
    towers.forEach(tower => tower.update(currentTime));
    towers.forEach(tower => tower.draw());

    bullets = bullets.filter(bullet => bullet.update(currentTime));
    bullets.forEach(bullet => bullet.draw());

    if (enemies.length === 0) {
        if (wave < TOTAL_WAVES && currentTime - lastWaveTime > WAVE_INTERVAL / gameSpeedMultiplier) {
            spawnWave();
            lastWaveTime = currentTime;
        } else if (wave === TOTAL_WAVES) {
            winGame();
            return;
        }
    }

    if (lives <= 0) {
        endGame();
        return;
    }

    requestAnimationFrame(gameLoop);
}

// Game over (lose)
function endGame() {
    gameRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = false;
    towerButtons.forEach(btn => btn.disabled = true);
    speedButtons.forEach(btn => btn.disabled = true);
    gameOverMessage.style.display = 'block';
    finalScoreDisplay.textContent = score;
}

// Game win
function winGame() {
    gameRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = false;
    towerButtons.forEach(btn => btn.disabled = true);
    speedButtons.forEach(btn => btn.disabled = true);
    gameWinMessage.style.display = 'block';
    finalWinScoreDisplay.textContent = score;
}

// Click canvas to place tower
canvas.addEventListener('click', (event) => {
    if (!gameRunning || isPaused || !selectedTowerType) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const gridX = Math.floor(clickX / TILE_SIZE);
    const gridY = Math.floor(clickY / TILE_SIZE);

    if (gridY >= 0 && gridY < gameMap.length &&
        gridX >= 0 && gridX < gameMap[0].length &&
        gameMap[gridY][gridX] === 0) {
        const existingTower = towers.find(tower =>
            Math.abs(tower.x - (gridX * TILE_SIZE + TILE_SIZE / 2)) < TILE_SIZE / 2 &&
            Math.abs(tower.y - (gridY * TILE_SIZE + TILE_SIZE / 2)) < TILE_SIZE / 2
        );
        const isMainTowerSpot = mainTower &&
                                Math.abs(mainTower.x - (gridX * TILE_SIZE + TILE_SIZE / 2)) < TILE_SIZE / 2 &&
                                Math.abs(mainTower.y - (gridY * TILE_SIZE + TILE_SIZE / 2)) < TILE_SIZE / 2;


        if (!existingTower && !isMainTowerSpot) {
            let newTower = null;
            let towerCost = 0;

            switch (selectedTowerType) {
                case 'basic':
                    newTower = new BasicTower(gridX * TILE_SIZE + TILE_SIZE / 2, gridY * TILE_SIZE + TILE_SIZE / 2);
                    towerCost = newTower.cost;
                    break;
                case 'slow':
                    newTower = new SlowTower(gridX * TILE_SIZE + TILE_SIZE / 2, gridY * TILE_SIZE + TILE_SIZE / 2);
                    towerCost = newTower.cost;
                    break;
                case 'heavy':
                    newTower = new HeavyTower(gridX * TILE_SIZE + TILE_SIZE / 2, gridY * TILE_SIZE + TILE_SIZE / 2);
                    towerCost = newTower.cost;
                    break;
                case 'splash':
                    newTower = new SplashTower(gridX * TILE_SIZE + TILE_SIZE / 2, gridY * TILE_SIZE + TILE_SIZE / 2);
                    towerCost = newTower.cost;
                    break;
                default:
                    console.log(languageConfig[gameLanguage].unknownTowerType);
                    return;
            }

            if (money >= towerCost) {
                towers.push(newTower);
                money -= towerCost;
                updateGameInfo();
            } else {
                console.log(languageConfig[gameLanguage].notEnoughMoney);
            }
        } else {
            console.log(languageConfig[gameLanguage].cannotPlaceTower);
        }
    } else {
        console.log(languageConfig[gameLanguage].mustBeOnGrass);
    }
});

// Tower build button events
towerButtons.forEach(button => {
    button.addEventListener('click', () => {
        towerButtons.forEach(btn => btn.classList.remove('selected-tower'));
        button.classList.add('selected-tower');
        selectedTowerType = button.dataset.towerType;
        console.log(`Selected to build: ${selectedTowerType} Tower`);
    });
});

// Speed button events
speedButtons.forEach(button => {
    button.addEventListener('click', () => {
        speedButtons.forEach(btn => btn.classList.remove('selected-speed'));
        button.classList.add('selected-speed');
        gameSpeedMultiplier = parseFloat(button.dataset.speed);
        console.log(`${languageConfig[gameLanguage].gameSpeedSet} ${gameSpeedMultiplier}x`);
    });
});

// Start game button event
startButton.addEventListener('click', () => {
    if (!gameRunning) {
        startGameInitialization();
        gameRunning = true;
        requestAnimationFrame(gameLoop);
    }
});

// Reset button event
resetButton.addEventListener('click', () => {
    startGameInitialization();
    gameRunning = true;
    requestAnimationFrame(gameLoop);
});

// Pause button event
pauseButton.addEventListener('click', () => {
    if (gameRunning) {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? languageConfig[gameLanguage].resumeButton : languageConfig[gameLanguage].pauseButton;
        if (!isPaused) {
            requestAnimationFrame(gameLoop);
            speedButtons.forEach(btn => btn.disabled = false);
        } else {
            speedButtons.forEach(btn => btn.disabled = true);
        }
    }
});

// Restart buttons
restartGameOverButton.addEventListener('click', () => location.reload());
restartGameWinButton.addEventListener('click', () => location.reload());


// Initial setup on page load
// Set a default TOTAL_WAVES to display in UI
TOTAL_WAVES = 20;
generateRandomMap();

// Place the Main Tower at the end of the generated path on initial load
if (path.length > 0) {
    const lastPathPoint = path[path.length - 1];
    mainTower = new MainTower(lastPathPoint.x, lastPathPoint.y);
} else {
    console.error(languageConfig[gameLanguage].pathEmpty);
    mainTower = null;
}

// Initialize UI text based on the global gameLanguage variable set in the HTML
updateUIText();
updateGameInfo();
pauseButton.disabled = true;
resetButton.disabled = true;
speedButtons.forEach(btn => btn.disabled = true);
speed1xButton.classList.add('selected-speed'); // Default select 1x speed
