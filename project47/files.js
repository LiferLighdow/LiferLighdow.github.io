document.addEventListener("DOMContentLoaded", function() {
            // --- 阻止查看原始碼的嘗試 (非絕對安全，僅為阻礙) ---
            document.addEventListener('contextmenu', event => event.preventDefault()); // 禁用右鍵
            document.addEventListener('keydown', event => {
                // 禁用 F12
                if (event.keyCode == 123) {
                    event.preventDefault();
                }
                // 禁用 Ctrl+Shift+I (開發者工具)
                if (event.ctrlKey && event.shiftKey && event.keyCode == 'I'.charCodeAt(0)) {
                    event.preventDefault();
                }
                // 禁用 Ctrl+Shift+J (開發者工具)
                if (event.ctrlKey && event.shiftKey && event.keyCode == 'J'.charCodeAt(0)) {
                    event.preventDefault();
                }
                // 禁用 Ctrl+U (查看原始碼)
                if (event.ctrlKey && event.keyCode == 'U'.charCodeAt(0)) {
                    event.preventDefault();
                }

                // 新增：禁用 Ctrl 或 Alt 鍵的常見瀏覽器行為
                if (event.ctrlKey || event.altKey) {
                    // 阻止 Ctrl/Alt + 箭頭鍵 (瀏覽器歷史)
                    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                        event.preventDefault();
                    }
                    // 阻止 Ctrl/Alt + S (儲存頁面)
                    if (event.key === 's' || event.key === 'S') {
                        event.preventDefault();
                    }
                    // 阻止 Ctrl/Alt + P (列印)
                    if (event.key === 'p' || event.key === 'P') {
                        event.preventDefault();
                    }
                    // 阻止 Ctrl/Alt + N (新視窗)
                    if (event.key === 'n' || event.key === 'N') {
                        event.preventDefault();
                    }
                    // 阻止 Ctrl/Alt + T (新分頁)
                    if (event.key === 't' || event.key === 'T') {
                        event.preventDefault();
                    }
                    // 阻止 Ctrl/Alt + W (關閉分頁/視窗)
                    if (event.key === 'w' || event.key === 'W') {
                        event.preventDefault();
                    }
                    // 阻止 Ctrl/Alt + A (全選)
                    if (event.key === 'a' || event.key === 'A') {
                        event.preventDefault();
                    }
                    // 阻止 Alt + D (焦點到網址列)
                    if (event.altKey && (event.key === 'd' || event.key === 'D')) {
                        event.preventDefault();
                    }
                }
            });
            // --------------------------------------------------

            // 獲取音訊元素
            const staticSound = document.getElementById("staticSound");
            const whispersSound = document.getElementById("whispersSound");
            const heartbeatSound = document.getElementById("heartbeatSound");
            const droneSound = document.getElementById("droneSound");
            const jumpscareSound = document.getElementById("jumpscareSound");

            // 獲取其他 DOM 元素
            const logTextarea = document.getElementById("logTextarea");
            const originalLog = logTextarea.value;
            const paragraphs = document.querySelectorAll("p");
            const decryptKeyInput = document.getElementById("decryptKeyInput");
            const decryptButton = document.getElementById("decryptButton");
            const decryptionResult = document.getElementById("decryptionResult");
            const overlayMessage = document.getElementById("overlayMessage");
            const footerMessage = document.getElementById("footerMessage");
            const intrusiveWarningContainer = document.getElementById("intrusiveWarningContainer");

            const correctKey = "47-PROTOCOL"; // 機密密鑰
            const secretTruthKey = "TRUTH-47"; // 新增的秘密密鑰

            // --- 音訊控制 ---
            setTimeout(() => {
                staticSound.volume = 0.1;
                staticSound.play();
            }, Math.random() * 3000);

            droneSound.volume = 0.05;
            droneSound.play();

            document.addEventListener("mousemove", () => {
                whispersSound.volume = Math.min(0.01 + (Math.random() * 0.02), 0.05);
                whispersSound.play();
            });

            const anomaliesSection = document.getElementById("anomalies");
            anomaliesSection.addEventListener("mouseover", () => {
                heartbeatSound.volume = 0.2;
                heartbeatSound.play();
            });
            anomaliesSection.addEventListener("mouseout", () => {
                heartbeatSound.pause();
                heartbeatSound.currentTime = 0;
            });

            // --- 自訂模態框功能 (不可模糊化) ---
            function showAlertModal(message) {
                const modal = document.getElementById("customWarningModal");
                const modalMessage = document.getElementById("modalMessage");
                const modalCloseButton = document.getElementById("modalCloseButton");

                modalMessage.textContent = message;
                modal.style.display = "flex";
                modal.classList.add("glitch");
                // 確保模態框內容本身不被模糊化
                modal.style.filter = "none";
                modal.style.webkitFilter = "none";

                modalCloseButton.onclick = () => {
                    modal.style.display = "none";
                    modal.classList.remove("glitch");
                };
            }

            // --- 頁面初始化警告 ---
            showAlertModal("警告：本網站包含可能令人不安的內容。繼續瀏覽表示您已閱讀並理解此警告。\n\n[他們已經警告過你了。]");

            // --- 隱藏訊息 (主控台) ---
            const hiddenMessage = "他們已經死了。你將是下一個。";
            console.log("%c" + hiddenMessage, "color: red; font-size: 24px; text-shadow: 0 0 10px red;");

            // --- 背景顏色緩慢變化與偶爾閃爍 ---
            let hue = 220;
            let saturation = 10;
            let lightness = 13;

            setInterval(() => {
                hue = (hue + 0.05) % 360;
                document.body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

                if (Math.random() < 0.005) {
                    document.body.style.backgroundColor = `hsl(0, 100%, 20%)`;
                    setTimeout(() => {
                        document.body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                    }, 100);
                }
            }, 100);

            // --- 隨機模糊段落 ---
            paragraphs.forEach(paragraph => {
                // 確保某些段落不會被模糊化，例如標題、按鈕、輸入框周圍的文字
                // 這裡我們只對沒有特定ID或不是交互元素的P標籤進行模糊化
                if (!paragraph.closest('header, nav, footer, #data-encryption, #ecg-monitor') && Math.random() < 0.3) {
                    paragraph.classList.add("blurred");
                }
            });

            // --- 預計死亡日期生成 (永遠大於現實時間) ---
            function getFutureRandomDate() {
                const now = new Date();
                // 確保日期在未來 1 到 5 年之間
                const futureYear = now.getFullYear() + Math.floor(Math.random() * 5) + 1;
                const randomMonth = Math.floor(Math.random() * 12); // 0-11
                const randomDay = Math.floor(Math.random() * 28) + 1; // 1-28，避免月份天數問題
                return new Date(futureYear, randomMonth, randomDay);
            }

            document.getElementById("deathDateA").textContent = getFutureRandomDate().toLocaleDateString();
            document.getElementById("deathDateB").textContent = getFutureRandomDate().toLocaleDateString();

            // --- 刷新圖片並添加故障效果 (錯開載入時間) ---
            function refreshImage(imgId) {
                const img = document.getElementById(imgId);
                img.src = 'https://thispersondoesnotexist.com/?' + new Date().getTime(); // 添加時間戳
                img.classList.add("glitch");

                img.onload = () => {
                    img.classList.remove("glitch");
                };
            }

            refreshImage("subjectAImage");
            setTimeout(() => {
                refreshImage("subjectBImage");
            }, 500); // 延遲 500 毫秒載入第二張圖片，確保不同

            // --- 定時顯示警告對話框 (使用自訂模態框) ---
            setInterval(() => {
                showAlertModal("警告：你正在被監視。他們無處不在。");
            }, 45000);

            // --- 隨機修改日誌文本並插入更恐怖的訊息 ---
            const terrifyingLogMessages = [
                "\n[系統入侵：檢測到未知實體。]",
                "\n[警告：他們知道你在這裡。]",
                "\n[雜訊：耳語聲變大。]",
                "\n[錯誤：現實扭曲。]",
                "\n[數據損壞：你的記憶被修改。]",
                "\n[緊急：逃離。現在。]",
                "\n[警告：不要相信你的眼睛。]",
                "\n[訊息：他們正在等你。]",
                "\n[雜訊：心跳聲加速。]",
                "\n[錯誤：你被困住了。]"
            ];

            setInterval(() => {
                let modifiedLog = originalLog;
                const corruptionAmount = Math.floor(Math.random() * 20) + 5;
                for (let i = 0; i < corruptionAmount; i++) {
                    const randomIndex = Math.floor(Math.random() * modifiedLog.length);
                    modifiedLog = modifiedLog.substring(0, randomIndex) + "█" + modifiedLog.substring(randomIndex + 1);
                }
                logTextarea.value = modifiedLog;

                if (Math.random() < 0.1) { // 10% 機率插入恐怖訊息
                    logTextarea.value += terrifyingLogMessages[Math.floor(Math.random() * terrifyingLogMessages.length)];
                    logTextarea.scrollTop = logTextarea.scrollHeight;
                }
            }, 3000);

            // --- 圖片懸停效果 (增強) ---
            const images = document.querySelectorAll("img");
            images.forEach(img => {
                img.addEventListener("mouseover", () => {
                    img.style.opacity = Math.random() * 0.5 + 0.3;
                    img.style.transform = `scale(${1 + Math.random() * 0.1}) rotate(${Math.random() * 5 - 2.5}deg)`;
                });
                img.addEventListener("mouseout", () => {
                    img.style.opacity = 1;
                    img.style.transform = "scale(1) rotate(0deg)";
                });
            });

            // --- 隨機段落點擊觸發跳嚇 (增強與音效) ---
            const secretParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
            secretParagraph.addEventListener("click", () => {
                document.body.style.backgroundColor = "black";
                const screamImage = document.createElement("img");
                screamImage.src = "https://placehold.co/1920x1080/000000/FF0000?text=WATCHED";
                screamImage.style.position = "fixed";
                screamImage.style.top = "0";
                screamImage.style.left = "0";
                screamImage.style.width = "100%";
                screamImage.style.height = "100%";
                screamImage.style.objectFit = "cover";
                screamImage.style.zIndex = "9999";
                screamImage.classList.add("glitch");
                document.body.appendChild(screamImage);

                jumpscareSound.play(); // 播放跳嚇音效

                setTimeout(() => {
                    document.body.removeChild(screamImage);
                    document.body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                    jumpscareSound.pause(); // 暫停音效
                    jumpscareSound.currentTime = 0; // 重置音效
                }, 3000);
            });

            // --- 隨機更改文件標題 ---
            const unsettlingTitles = [
                "他們在看你",
                "錯誤：連線中斷",
                "你不是一個人",
                "項目 47：已感染",
                "停止抵抗",
                "████████",
                "你已暴露",
                "系統崩潰中",
                "逃不掉的",
                "你聽到了嗎？",
                "你被追蹤了。",
                "清醒過來。"
            ];

            setInterval(() => {
                document.title = unsettlingTitles[Math.floor(Math.random() * unsettlingTitles.length)];
            }, 10000);

            // --- 數據加密區塊邏輯 ---
            decryptButton.addEventListener("click", () => {
                const enteredKey = decryptKeyInput.value;

                if (enteredKey === secretTruthKey) {
                    // 修改跳轉邏輯，帶上 access_granted 參數
                    window.location.href = 'truth_@a.html?access_granted=true';
                } else if (enteredKey === correctKey) {
                    decryptionResult.innerHTML = `
                        <p style="color: #0f0;">[存取許可] 機密檔案已解密。</p>
                        <p><strong>機密訊息：</strong> 他們知道你正在看。門已經打開了。不要回頭。你已成為實驗的一部分。</p>
                        <p>檔案：<a href="#" style="color: #0ff;">project_omega_final.log</a> (損壞，但包含關鍵數據)</p>
                    `;
                    decryptionResult.classList.remove("blurred");
                    staticSound.volume = 0.5;
                    whispersSound.volume = 0.1;
                    showAlertModal("警告：你已深入。沒有回頭路了。");
                    document.body.style.backgroundColor = `hsl(0, 100%, 15%)`;
                    setTimeout(() => {
                        document.body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                    }, 500);
                } else {
                    decryptionResult.innerHTML = `
                        <p style="color: #f00;">[存取拒絕] 密鑰無效。系統鎖定。警告：未經授權的存取。</p>
                        <p style="color: #f88;">嘗試次數：${Math.floor(Math.random() * 5) + 1}/3</p>
                    `;
                    decryptionResult.classList.remove("blurred");
                    document.body.style.backgroundColor = "#440000";
                    setTimeout(() => {
                        document.body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                    }, 300);
                    staticSound.volume = 0.3;
                    showAlertModal("錯誤：密鑰錯誤。系統正在追蹤你的位置。");
                }
            });

            // --- 更多元、更複雜的恐怖訊息 ---
            const diverseHorrorMessages = [
                "他們正在觀察你的每一個動作。",
                "你以為你安全嗎？",
                "牆壁在移動。",
                "不要相信你所看到的。",
                "你的時間不多了。",
                "他們已經進來了。",
                "你聽到了嗎？腳步聲。",
                "你不是唯一一個在這裡的人。",
                "這個地方會吞噬你。",
                "他們在你的腦海裡。",
                "你無法逃脫他們的視線。",
                "他們在呼吸，就在你身邊。",
                "你感覺到了嗎？那冰冷的觸碰。",
                "真相會讓你瘋狂。",
                "你被困住了，永遠。",
                "你已經被標記了。",
                "他們正在等待。",
                "你所知道的一切都是謊言。",
                "你的尖叫聲無人能聽見。",
                "你被選中了。"
            ];

            // 隨機替換頁面上的普通段落
            setInterval(() => {
                const nonLogParagraphs = Array.from(document.querySelectorAll('p:not(#logTextarea):not(#decryptionResult p):not(#footerMessage)'));
                if (nonLogParagraphs.length > 0) {
                    const randomPara = nonLogParagraphs[Math.floor(Math.random() * nonLogParagraphs.length)];
                    const originalText = randomPara.textContent;
                    const newMessage = diverseHorrorMessages[Math.floor(Math.random() * diverseHorrorMessages.length)];

                    randomPara.textContent = newMessage;
                    randomPara.classList.add('glitch'); // 讓替換的文字有故障效果

                    setTimeout(() => {
                        randomPara.textContent = originalText; // 恢復原文本
                        randomPara.classList.remove('glitch');
                    }, 2000 + Math.random() * 1000); // 顯示 2-3 秒
                }
            }, 7000); // 每 7 秒檢查並替換一次

            // 隨機在頁面中央顯示疊加訊息
            setInterval(() => {
                if (Math.random() < 0.2) { // 20% 機率顯示
                    const message = diverseHorrorMessages[Math.floor(Math.random() * diverseHorrorMessages.length)];
                    overlayMessage.querySelector('span:first-child').textContent = message;
                    overlayMessage.querySelector('span:last-child').textContent = message; // 為了故障效果
                    overlayMessage.style.opacity = 1;
                    // 播放一個短促的靜電音效或低語音效
                    staticSound.volume = 0.3;
                    staticSound.play();
                    setTimeout(() => {
                        overlayMessage.style.opacity = 0;
                        staticSound.volume = 0.1; // 恢復正常音量
                    }, 1500 + Math.random() * 500); // 顯示 1.5-2 秒
                }
            }, 10000); // 每 10 秒檢查一次

            // 頁腳訊息隨機更換
            const footerMessages = [
                "你已進入。沒有回頭路了。",
                "他們正在觀察你。",
                "你被困住了。",
                "不要相信你的眼睛。",
                "真相就在這裡。",
                "你聽到了嗎？"
            ];
            let currentFooterMessageIndex = 0;
            setInterval(() => {
                currentFooterMessageIndex = (currentFooterMessageIndex + 1) % footerMessages.length;
                footerMessage.textContent = footerMessages[currentFooterMessageIndex];
                footerMessage.classList.add('glitch'); // 加上故障效果
                setTimeout(() => {
                    footerMessage.classList.remove('glitch');
                }, 500);
            }, 15000); // 每 15 秒更換一次頁腳訊息

            // --- 心電圖監測功能 ---
            const ecgCanvas = document.getElementById('ecgCanvas');
            const ecgCtx = ecgCanvas.getContext('2d');
            let ecgData = []; // 儲存心電圖點的陣列
            let ecgX = 0; // 當前繪製的 X 座標
            const ecgSpeed = 2; // 心電圖滾動速度
            const ecgAmplitude = 30; // 基礎波形振幅
            let ecgBaseline = ecgCanvas.height / 2; // 基準線 Y 座標 (會隨 resize 更新)

            // 調整 Canvas 尺寸以適應容器
            function resizeEcgCanvas() {
                // 確保 canvas 元素存在且可見，以便獲取正確的 offsetWidth/offsetHeight
                if (ecgCanvas.offsetWidth > 0 && ecgCanvas.offsetHeight > 0) {
                    ecgCanvas.width = ecgCanvas.offsetWidth;
                    ecgCanvas.height = ecgCanvas.offsetHeight;
                    ecgBaseline = ecgCanvas.height / 2; // 重置基準線 Y 座標
                    ecgData = []; // 清空數據並重新開始繪製，避免縮放導致的繪圖問題
                    ecgX = 0;
                }
            }

            // 初始化 Canvas 尺寸
            resizeEcgCanvas();
            window.addEventListener('resize', resizeEcgCanvas);

            // 生成一個心跳波形 (QRS 複合波)
            function generateHeartbeat(xPos, baseline, amplitude) {
                const points = [];
                const spikeHeight = amplitude * 1.5; // R 波高點
                const smallWave = amplitude * 0.3; // P, T 波

                // P 波
                points.push({x: xPos - 30, y: baseline});
                points.push({x: xPos - 25, y: baseline - smallWave});
                points.push({x: xPos - 20, y: baseline});

                // QRS 複合波
                points.push({x: xPos - 10, y: baseline});
                points.push({x: xPos - 8, y: baseline + spikeHeight * 0.3}); // Q 波
                points.push({x: xPos, y: baseline - spikeHeight}); // R 波
                points.push({x: xPos + 8, y: baseline + spikeHeight * 0.2}); // S 波
                points.push({x: xPos + 10, y: baseline});

                // T 波
                points.push({x: xPos + 20, y: baseline});
                points.push({x: xPos + 25, y: baseline - smallWave * 0.8});
                points.push({x: xPos + 30, y: baseline});

                return points;
            }

            // 心電圖繪製動畫循環
            function animateEcg() {
                ecgCtx.clearRect(0, 0, ecgCanvas.width, ecgCanvas.height); // 清除畫布

                // 滾動現有數據
                for (let i = 0; i < ecgData.length; i++) {
                    ecgData[i].x -= ecgSpeed;
                }

                // 移除超出左側的數據點
                ecgData = ecgData.filter(point => point.x > -100);

                // 生成新的數據點
                if (ecgX < ecgCanvas.width) {
                    let yValue = ecgBaseline + Math.sin(ecgX * 0.05) * (ecgAmplitude / 4) + (Math.random() - 0.5) * 5; // 基礎波形帶隨機雜訊
                    ecgData.push({x: ecgX, y: yValue});
                    ecgX += ecgSpeed;
                } else {
                    // 當波形滾動到一定程度時，隨機生成心跳或故障
                    if (Math.random() < 0.02) { // 2% 機率生成心跳
                        const heartbeatPoints = generateHeartbeat(ecgCanvas.width, ecgBaseline, ecgAmplitude);
                        ecgData = ecgData.concat(heartbeatPoints);
                    } else if (Math.random() < 0.005) { // 0.5% 機率生成故障
                        // 模擬心電圖直線或大幅度跳動
                        const glitchType = Math.random();
                        if (glitchType < 0.5) { // 直線
                            for (let i = 0; i < 50; i++) {
                                ecgData.push({x: ecgCanvas.width + i * ecgSpeed, y: ecgBaseline + (Math.random() - 0.5) * 2});
                            }
                        } else { // 大幅度跳動
                            for (let i = 0; i < 50; i++) {
                                ecgData.push({x: ecgCanvas.width + i * ecgSpeed, y: ecgBaseline + Math.sin(i * 0.5) * (ecgAmplitude * 2) + (Math.random() - 0.5) * 20});
                            }
                        }
                    }
                }

                // 繪製心電圖
                ecgCtx.beginPath();
                ecgCtx.strokeStyle = '#00ff00'; // 綠色線條
                ecgCtx.lineWidth = 2;
                ecgCtx.lineJoin = 'round'; // 平滑線條
                ecgCtx.shadowBlur = 5; // 發光效果
                ecgCtx.shadowColor = '#00ff00';

                if (ecgData.length > 0) {
                    ecgCtx.moveTo(ecgData[0].x, ecgData[0].y);
                    for (let i = 1; i < ecgData.length; i++) {
                        ecgCtx.lineTo(ecgData[i].x, ecgData[i].y);
                    }
                }
                ecgCtx.stroke();

                // 繪製網格 (可選，增加真實感)
                ecgCtx.strokeStyle = 'rgba(0, 255, 0, 0.1)'; // 淺綠色網格
                ecgCtx.lineWidth = 0.5;
                const gridSize = 20;
                for (let x = 0; x < ecgCanvas.width; x += gridSize) {
                    ecgCtx.beginPath();
                    ecgCtx.moveTo(x, 0);
                    ecgCtx.lineTo(x, ecgCanvas.height);
                    ecgCtx.stroke();
                }
                for (let y = 0; y < ecgCanvas.height; y += gridSize) {
                    ecgCtx.beginPath();
                    ecgCtx.moveTo(0, y);
                    ecgCtx.lineTo(ecgCanvas.width, y);
                    ecgCtx.stroke();
                }

                requestAnimationFrame(animateEcg); // 繼續動畫
            }

            // 啟動心電圖動畫
            animateEcg();

            // --- 浮動式大紅字警告功能 ---
            const intrusiveMessages = [
                "看著我",
                "你被追蹤了",
                "無處可逃",
                "清醒過來",
                "他們來了",
                "你聽到了嗎？",
                "不要相信",
                "你被困住了",
                "真相",
                "跑！"
            ];

            setInterval(() => {
                if (Math.random() < 0.3) { // 30% 機率顯示
                    const message = intrusiveMessages[Math.floor(Math.random() * intrusiveMessages.length)];
                    const warningDiv = document.createElement('div');
                    warningDiv.className = 'intrusive-warning';
                    warningDiv.textContent = message;

                    // 隨機定位
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    const randomX = Math.random() * (viewportWidth - 200) + 50; // 避免太靠近邊緣
                    const randomY = Math.random() * (viewportHeight - 100) + 50; // 避免太靠近邊緣

                    warningDiv.style.left = `${randomX}px`;
                    warningDiv.style.top = `${randomY}px`;
                    warningDiv.style.opacity = 1; // 顯示

                    intrusiveWarningContainer.appendChild(warningDiv);

                    // 隨機時間後移除
                    setTimeout(() => {
                        warningDiv.style.opacity = 0; // 淡出
                        setTimeout(() => {
                            intrusiveWarningContainer.removeChild(warningDiv);
                        }, 500); // 等待淡出動畫完成再移除
                    }, 1000 + Math.random() * 1000); // 顯示 1-2 秒
                }
            }, 2000); // 每 2 秒檢查一次是否顯示浮動警告
        });