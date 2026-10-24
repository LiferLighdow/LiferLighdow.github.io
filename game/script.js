/*
 * _(:з」∠)_
 * Created by Shuqiao Zhang in 2019.
 * https://zhangshuqiao.org
 */

/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
window.addEventListener("load", () => {
    "use strict";

    const apiPath = "https://live2d.fghrsh.net/api";
    const modelStatus = document.getElementById("model-status");
    const companionMessage = document.getElementById("companion-message");
    const companionMood = document.getElementById("companion-mood");
    let state = 0, loading = false,
        modelId = localStorage.getItem("modelId"),
        modelTexturesId = localStorage.getItem("modelTexturesId");
    if (modelId === null) {
        modelId = 1;
        modelTexturesId = 53;
    }
    if (typeof loadlive2d === 'undefined') {
        console.error("Error: loadlive2d function is not defined. live2d.js might not have loaded correctly or is missing.");
        modelStatus.textContent = "MODEL UNAVAILABLE";
        companionMessage.textContent = "Live2D 角色暫時無法連線，稍後再試試看吧。";
    } else {
        loadModel(modelId, modelTexturesId);
    }

    function loadModel(modelId, modelTexturesId) {
        localStorage.setItem("modelId", modelId);
        if (modelTexturesId === undefined) modelTexturesId = 0;
        localStorage.setItem("modelTexturesId", modelTexturesId);
        loadlive2d("live2d", `${apiPath}/get/?id=${modelId}-${modelTexturesId}`, null);
        modelStatus.textContent = "ARRIVING...";
        setTimeout(() => {
        coverPosition("80%");
        state = 2;
        modelStatus.textContent = "COMPANION READY";
        }, 2000);
    }

    function loadRandModel() {
        const modelId = localStorage.getItem("modelId"),
            modelTexturesId = localStorage.getItem("modelTexturesId");
        fetch(`${apiPath}/rand_textures/?id=${modelId}-${modelTexturesId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Live2D API returned ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                if (!result.textures || result.textures.id === undefined) {
                    throw new Error("Live2D API response did not include a texture ID");
                }
                loadModel(modelId, result.textures.id);
                setTimeout(() => {
                    state = 2;
                    coverPosition("80%");
                    loading = false;
                }, 1000);
            }).catch(error => {
                console.error("Error loading random model:", error);
                modelStatus.textContent = "STILL HERE";
                companionMessage.textContent = "這次沒有換裝成功，我們先繼續待在這裡吧。";
                loading = false;
                state = 2;
                coverPosition("80%");
            });
    }

    function coverPosition(pos) {
        document.getElementById("cover").style.bottom = pos;
    }

    // Friendly companion messages
    const cuteQuotes = [
        "歡迎回來！今天也一起享受遊戲時光吧。",
        "累了就休息一下，我會在這裡陪著你。",
        "準備好出發了嗎？我會替你加油的！",
        "不管選哪個冒險，玩得開心最重要。",
        "今天也辛苦了，接下來就交給遊戲世界吧。"
    ];

    document.getElementById("info").addEventListener("click", () => {
        const encouragement = cuteQuotes[Math.floor(Math.random() * cuteQuotes.length)];
        companionMessage.textContent = encouragement;
        companionMood.textContent = "Happy";
    });

    document.getElementById("refresh").addEventListener("click", () => {
        if (typeof loadlive2d === 'undefined') {
            companionMessage.textContent = "Live2D 角色目前無法連線，請稍後再試。";
            return;
        }
        if (loading) return;
        state = 0;
        coverPosition("10%");
        loading = true;
        modelStatus.textContent = "CHANGING LOOK...";
        companionMessage.textContent = "等我一下，我來換個新造型！";
        setTimeout(loadRandModel, 1000);
    });

    document.getElementById("handle").addEventListener("click", () => {
        if (state === 1) {
            state = 2;
            coverPosition("80%");
        }
        else if (state === 2) {
            state = 1;
            coverPosition("20%");
        }
    });

    // 時鐘 (Simplified to English only)
    function updateDateTime() {
        let now = new Date();
        let dateText = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        let timeText = now.toLocaleTimeString('en-US');
        let yearText = now.getFullYear();

        document.getElementById('current-date').textContent = dateText;
        document.getElementById('current-year').textContent = `Year: ${yearText}`;
        document.getElementById('current-time').textContent = `Time: ${timeText}`;
    }

    // Update every second
    setInterval(updateDateTime, 1000);

    // Initial call to set date/time immediately
    updateDateTime();

    // 動態生成遊戲鏈接
    const gameLinksContainer = document.getElementById("game-links-container");
    const games = [
        { path: "2048", name: "2048", icon: "fa-border-all" },
        {
            name: "科技放置遊戲 / Clicker",
            icon: "fa-coins",
            languages: { zhTW: "Clicker/zh_TW", en: "Clicker" }
        },
        {
            name: "塔防 / Tower Defense",
            icon: "fa-chess-rook",
            languages: { zhTW: "Tower/zh_TW", en: "Tower" }
        },
        {
            name: "夜幕降臨 / Nightfall",
            icon: "fa-moon",
            languages: { zhTW: "Nightfall/zh_TW", en: "Nightfall" }
        },
        { path: "Simulation/鬼影幢幢", name: "鬼影幢幢", icon: "fa-ghost" },
        { path: "Simulation/虛空旅者", name: "虛空旅者", icon: "fa-star" },
        { path: "Others/Gravity.html", name: "引力", icon: "fa-bullseye" },
        { path: "Others/Ink.html", name: "墨影乾坤", icon: "fa-paintbrush" },
        { path: "Others/Plane.html", name: "星際避險", icon: "fa-rocket" },
        { path: "Others/Quantum.html", name: "量子裂變", icon: "fa-atom" },
        { path: "Others/Shake.html", name: "無限荒野", icon: "fa-gamepad" }
    ];
    const languageDialog = document.getElementById("game-language-dialog");
    const languageDialogTitle = document.getElementById("language-dialog-title");
    const traditionalChineseLink = document.getElementById("traditional-chinese-link");
    const englishLink = document.getElementById("english-link");
    const libraryCount = document.getElementById("library-count");

    function updateGameLinks() {
        games.forEach(game => {
            const link = document.createElement(game.languages ? "button" : "a");
            if (game.languages) {
                link.type = "button";
                link.setAttribute("aria-haspopup", "dialog");
                link.addEventListener("click", () => {
                    languageDialogTitle.textContent = game.name;
                    traditionalChineseLink.href = game.languages.zhTW;
                    englishLink.href = game.languages.en;
                    languageDialog.showModal();
                });
            } else {
                link.href = game.path;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
            link.className = "game-link";
            const icon = document.createElement("i");
            icon.className = `game-icon fa-solid ${game.icon}`;
            icon.setAttribute("aria-hidden", "true");
            const label = document.createElement("span");
            label.textContent = game.name;
            link.append(icon, label);
            gameLinksContainer.appendChild(link);
        });
        libraryCount.textContent = `${games.length} GAMES AVAILABLE`;
    }

    document.getElementById("close-language-dialog").addEventListener("click", () => {
        languageDialog.close();
    });
    languageDialog.addEventListener("click", event => {
        if (event.target === languageDialog) languageDialog.close();
    });
    languageDialog.querySelectorAll(".language-option").forEach(link => {
        link.addEventListener("click", () => languageDialog.close());
    });

    // 音樂控制
    let audio = document.getElementById("bg-music");
    let musicToggleButton = document.getElementById("music-toggle");
    let musicIcon = document.getElementById("music-icon"); // Get the icon element
    let isPlaying = false;

    // Set initial icon based on music state
    if (localStorage.getItem('musicPlaying') === 'true') {
        audio.play().then(() => {
            isPlaying = true;
            musicIcon.className = "fa-solid fa-pause";
            musicToggleButton.setAttribute("aria-label", "Pause background music");
        }).catch(error => {
            console.error("Unable to resume background music:", error);
            localStorage.setItem('musicPlaying', 'false');
        });
    } else {
        musicIcon.className = "fa-solid fa-play";
    }

    musicToggleButton.addEventListener("click", function() {
        if (isPlaying) {
            audio.pause();
            musicIcon.className = "fa-solid fa-play";
            localStorage.setItem('musicPlaying', 'false');
            musicToggleButton.setAttribute("aria-label", "Play background music");
            isPlaying = false;
        } else {
            audio.play().then(() => {
                musicIcon.className = "fa-solid fa-pause";
                localStorage.setItem('musicPlaying', 'true');
                musicToggleButton.setAttribute("aria-label", "Pause background music");
                isPlaying = true;
            }).catch(error => {
                console.error("Unable to play background music:", error);
                companionMessage.textContent = "背景音樂暫時無法播放，請再試一次。";
            });
        }
    });

    // Ensure game links are generated on load
    updateGameLinks();
});
