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

    // Check if live2d.js has loaded and defined loadlive2d
    if (typeof loadlive2d === 'undefined') {
        console.error("Error: loadlive2d function is not defined. live2d.js might not have loaded correctly or is missing.");
        document.getElementById("stage").innerHTML = '<img src="./screenshots/screenshot-1.png" alt="Live2D Screenshot" style="max-width: 100%; height: auto; display: block; margin: auto;">'; // Fallback image with styling
        return; // Stop further execution if Live2D is critical
    }

    const apiPath = "https://live2d.fghrsh.net/api";
    let state = 0, loading = false,
        modelId = localStorage.getItem("modelId"),
        modelTexturesId = localStorage.getItem("modelTexturesId");
    if (modelId === null) {
        modelId = 1;
        modelTexturesId = 53;
    }
    loadModel(modelId, modelTexturesId);

    function loadModel(modelId, modelTexturesId) {
        localStorage.setItem("modelId", modelId);
        if (modelTexturesId === undefined) modelTexturesId = 0;
        localStorage.setItem("modelTexturesId", modelTexturesId);
        // Ensure loadlive2d is available before calling it
        if (typeof loadlive2d !== 'undefined') {
            loadlive2d("live2d", `${apiPath}/get/?id=${modelId}-${modelTexturesId}`, null);
            console.log("live2d", `Model ${modelId}-${modelTexturesId} loaded`);
        } else {
            console.error("Attempted to call loadlive2d, but it's still not defined.");
        }
        setTimeout(() => {
            coverPosition("80%");
            state = 2;
        }, 2000);
    }

    function loadRandModel() {
        const modelId = localStorage.getItem("modelId"),
            modelTexturesId = localStorage.getItem("modelTexturesId");
        fetch(`${apiPath}/rand_textures/?id=${modelId}-${modelTexturesId}`)
            .then(response => response.json())
            .then(result => {
                loadModel(modelId, result.textures.id);
                setTimeout(() => {
                    state = 2;
                    coverPosition("80%");
                    loading = false;
                }, 1000);
            }).catch(error => {
                console.error("Error loading random model:", error);
                showAlert("Failed to load new model. Please try again later.");
                loading = false;
            });
    }

    function coverPosition(pos) {
        document.getElementById("cover").style.bottom = pos;
    }

    // Simplified encouragement quotes (English only)
    const cuteQuotes = [
        "You can do it! I believe in you~",
        "Fighting! You're amazing!",
        "Don't give up! You're so close!",
        "You're the best! Keep going!",
        "I'm cheering for you! Ganbatte!"
    ];

    // Custom alert function to replace window.alert
    function showAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #333;
            color: #fff;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            font-family: 'Montserrat', sans-serif;
            font-size: 1.1rem;
            text-align: center;
            animation: fadeIn 0.3s ease-out;
        `;
        alertBox.textContent = message;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.style.animation = 'fadeOut 0.3s ease-in forwards';
            alertBox.addEventListener('animationend', () => alertBox.remove());
        }, 2000); // Display for 2 seconds

        // CSS for fade in/out animations
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -60%); }
                to { opacity: 1; transform: translate(-50%, -50%); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translate(-50%, -50%); }
                to { opacity: 0; transform: translate(-50%, -60%); }
            }
        `;
        document.head.appendChild(style);
    }

    // Get encouragement (now directly uses cuteQuotes array)
    document.getElementById("info").addEventListener("click", () => {
        const encouragement = cuteQuotes[Math.floor(Math.random() * cuteQuotes.length)];
        showAlert(encouragement); // Use custom alert
    });

    document.getElementById("refresh").addEventListener("click", () => {
        if (loading) return;
        state = 0;
        coverPosition("10%");
        loading = true;
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
    const gameURLs = [
        "games/2048", "games/clicker_game_tw", "games/clicker_game",
        "games/cute/touch_girls", "https://example.com/game5",
        "https://example.com/game6", "https://example.com/game7",
        "https://example.com/game8", "https://example.com/game9",
        "https://example.com/game10"
    ];

    // Define game names (English only)
    const gameNames = [
        "2048", "Clicker Game TW", "Clicker Game",
        "Touch Girls", "Game 5", "Game 6", "Game 7", "Game 8", "Game 9", "Game 10"
    ];

    function updateGameLinks() {
        gameLinksContainer.innerHTML = ''; // Clear existing links
        gameURLs.forEach((url, index) => {
            const link = document.createElement("a");
            link.href = url;
            link.className = "game-link";
            link.target = "_blank";
            link.textContent = gameNames[index] || `Game ${index + 1}`; // Fallback if name is missing
            link.style.backgroundColor = getRandomColor();
            link.style.scrollSnapAlign = 'start'; /* Ensure scroll-snap-align is set for each item */
            gameLinksContainer.appendChild(link);
        });
    }

    // Helper function to generate random colors
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to update background color based on the current time
    function updateBackgroundColor() {
        const now = new Date();
        const hours = now.getHours();
        let startColor, endColor;
        let bodyElement = document.body;

        // Define background colors for different time periods
        if (hours >= 6 && hours < 18) { // Morning to Afternoon
            startColor = "#1a1a2e"; // Dark blue
            endColor = "#16213e"; // Slightly lighter dark blue
        } else { // Evening to Night
            startColor = "#16213e";
            endColor = "#0f3460"; // Midnight blue
        }

       bodyElement.style.background = `linear-gradient(135deg, ${startColor}, ${endColor})`; // Use 135deg for consistency
    }
    // Update every 30 seconds
    setInterval(updateBackgroundColor, 30000);

    // Initial call to set background color immediately
    updateBackgroundColor();

    // 音樂控制
    let audio = document.getElementById("bg-music");
    let musicToggleButton = document.getElementById("music-toggle");
    let musicIcon = document.getElementById("music-icon"); // Get the icon element
    let isPlaying = false;

    // Set initial icon based on music state
    if (localStorage.getItem('musicPlaying') === 'true') {
        audio.play();
        isPlaying = true;
        musicIcon.textContent = "pause"; // Material Icon for pause
    } else {
        musicIcon.textContent = "play_arrow"; // Material Icon for play
    }

    musicToggleButton.addEventListener("click", function() {
        if (isPlaying) {
            audio.pause();
            musicIcon.textContent = "play_arrow"; // Change icon to play
            localStorage.setItem('musicPlaying', 'false');
        } else {
            audio.play();
            musicIcon.textContent = "pause"; // Change icon to pause
            localStorage.setItem('musicPlaying', 'true');
        }
        isPlaying = !isPlaying;
    });

    // Optional: Add ripple effect to this page if desired
    document.addEventListener('click', function(e) {
        const x = e.clientX;
        const y = e.clientY;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Ensure game links are generated on load
    updateGameLinks();
});
