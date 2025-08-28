const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const songCover = document.getElementById('song-cover');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist'); // 新增作者元素
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const sidebarLinks = document.querySelectorAll('.sidebar ul li');
const pages = document.querySelectorAll('.page');
const playlistContainer = document.querySelector('.playlist-container');
const playlistList = document.getElementById('playlist-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const libraryGenres = document.querySelectorAll('#library .genre-list li');
const musicListContainer = document.getElementById('music-list');

const searchResultsPopup = document.getElementById('search-results-popup');
const searchResultsContainer = document.getElementById('search-results');
const closeButton = document.querySelector('#search-results-popup .close-button');
// 取得下載按鈕的參照
const downloadButton = document.getElementById('download-button');

let currentGenre = 'pop'; // 預設類型
let currentSongs = musicData[currentGenre]; // 目前歌曲列表
let songIndex = 0;

let shuffle = false; // 隨機播放狀態
let repeatMode = 'off'; // 循環播放模式 ('off', 'single', 'folder')

// 播放列表資料 (現在與資料夾名稱相同)
const playlists = Object.keys(musicData).map(genre => ({
    name: genre,
    description: `Lifer_Lighdow's ${genre} music genre`,
    cover: `music/cover/${genre}.webp`, // 假設封面的命名規則
    songs: musicData[genre].map((_, index) => index) // 歌曲索引
}));

// 初始化
loadSong(currentSongs[songIndex]);
loadPlaylists();
loadPlaylistItems();
loadMusicList(currentGenre); // 載入預設類型的音樂列表
updateGenreSelection(currentGenre);

const imageViewerPopup = document.getElementById('image-viewer-popup');
const imageViewerImage = document.getElementById('image-viewer-image');
const imageViewerCloseButton = document.querySelector('#image-viewer-popup .close-button');

// 載入歌曲
function loadSong(song) {
    songTitle.innerText = song.title;
    songArtist.innerText = "Lifer_Lighdow"; // 設置作者
    songCover.src = song.cover;
    audio.src = song.src;
	 // 初始載入歌曲後更新動畫狀態
    updateTitleAnimation(); 
	 
	 // 更新下載連結
    updateDownloadLink(song.title);
}

// 更新下載連結
function updateDownloadLink(title) {
    const artist = "Lifer_Lighdow"; // 固定藝術家名稱
    const fileName = `${title} - ${artist}.mp3`; // 自訂檔名
    downloadButton.onclick = () => {
        downloadFile(audio.src, fileName);
    };
}

// 下載檔案函式
function downloadFile(url, fileName) {
    fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(a.href); // 釋放記憶體
            document.body.removeChild(a); // 移除元素
        });
}

songCover.addEventListener('click', () => {
    imageViewerImage.src = songCover.src; // 設定圖片來源
    imageViewerPopup.style.display = 'flex'; // 顯示圖片檢視器
});
// 關閉圖片檢視器
imageViewerCloseButton.addEventListener('click', () => {
    imageViewerPopup.style.display = 'none';
});

// 播放 / 暫停
function playSong() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updatePlayButton();
}

// 下一首
function nextSong() {
    if (shuffle) {
        songIndex = getRandomSongIndex();
    } else {
        songIndex = (songIndex + 1) % currentSongs.length;
    }
    loadSong(currentSongs[songIndex]);
    audio.play();
    updatePlayButton();
}

// 上一首
function prevSong() {
    if (shuffle) {
        songIndex = getRandomSongIndex();
    } else {
        songIndex = (songIndex - 1 + currentSongs.length) % currentSongs.length;
    }
    loadSong(currentSongs[songIndex]);
    audio.play();
    updatePlayButton();
}

// 隨機播放
function toggleShuffle() {
    shuffle = !shuffle;
    shuffleBtn.classList.toggle('active', shuffle); // 使用 active class 來視覺化狀態
}

// 循環播放
function nextRepeatMode() {
    if (repeatMode === 'off') {
        repeatMode = 'single';
        repeatBtn.innerHTML = '<i class="fas fa-redo-alt"></i>'; // Font Awesome 圖示
    } else {
        repeatMode = 'off';
        repeatBtn.innerHTML = '<i class="fas fa-redo"></i>'; // Font Awesome 圖示
    }
    // 更新 active class
    repeatBtn.classList.toggle('active', repeatMode !== 'off');
}

// 音訊播放結束時的處理
audio.addEventListener('ended', () => {
    if (repeatMode === 'single') {
        audio.currentTime = 0;
        audio.play();
    } else {
        // 停止播放，或者可以設定為播放下一首
        nextSong()
    }
});

// 隨機歌曲索引
function getRandomSongIndex() {
    let randomIndex = Math.floor(Math.random() * currentSongs.length);
    // 確保不重複播放同一首歌
    while (randomIndex === songIndex) {
        randomIndex = Math.floor(Math.random() * currentSongs.length);
    }
    return randomIndex;
}

// 更新進度條
function updateProgress(e) {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;
    progress.style.setProperty('--progress-percent', `${progressPercent}%`); // 設定 CSS 變數
    currentTimeDisplay.innerText = formatTime(currentTime);
    durationDisplay.innerText = formatTime(duration);
}

// 設定進度條
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// 格式化時間
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// 載入播放列表項目
function loadPlaylistItems() {
    playlistContainer.innerHTML = ''; // 清空之前的內容
    playlists.forEach(playlist => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-item');
        playlistItem.innerHTML = `
            <img src="${playlist.cover}" alt="${playlist.name}">
            <h3>${playlist.name}</h3>
            <p>${playlist.description}</p>
        `;
        playlistContainer.appendChild(playlistItem);

        playlistItem.addEventListener('click', () => {
            // 播放列表點擊事件
            const genre = playlist.name.toLowerCase();
            currentGenre = genre;
            loadMusicList(genre);
            updateGenreSelection(genre);
            switchPage('library'); // 切換到 Your Library 頁面
        });
    });
}

// 載入推薦歌曲
function loadFeaturedSongs() {
    const featuredSongsContainer = document.querySelector('.featured-songs-container');
    featuredSongsContainer.innerHTML = ''; // 清空之前的內容

    const featuredCount = 6; // 推薦歌曲數量
    const featuredSongs = [];
    const allSongs = [];

    // 將所有歌曲放到一個陣列中
    for (const genre in musicData) {
        musicData[genre].forEach(song => {
            allSongs.push({ ...song, genre });
        });
    }

    // 如果歌曲總數少於推薦數量，則只顯示所有歌曲
    const availableCount = Math.min(featuredCount, allSongs.length);

    // 隨機選擇歌曲
    while (featuredSongs.length < availableCount) {
        const randomIndex = Math.floor(Math.random() * allSongs.length);
        const song = allSongs[randomIndex];

        if (!featuredSongs.includes(song)) {
            featuredSongs.push(song);
        }
    }

    // 建立推薦歌曲元素
    featuredSongs.forEach(song => {
        const featuredSong = document.createElement('div');
        featuredSong.classList.add('featured-song');
        featuredSong.innerHTML = `
            <img src="${song.cover}" alt="${song.title}">
            <div class="song-info">
                <h3>${song.title}</h3>
                <p>Lifer_Lighdow (${song.genre})</p>
            </div>
        `;
        featuredSongsContainer.appendChild(featuredSong);

        featuredSong.addEventListener('click', () => {
            // 播放推薦歌曲
            currentGenre = song.genre;
            const genreSongs = musicData[song.genre]; // 取得該類型的歌曲列表
            songIndex = genreSongs.indexOf(song); // 在正確的列表中尋找歌曲索引
            loadSong(song);
            audio.play();
            updatePlayButton();
            switchPage('library'); // 切換到 Your Library 頁面
            loadMusicList(song.genre); // 載入歌曲列表
            updateGenreSelection(song.genre); //更新樣式
        });
    });
}

// 在初始化時呼叫 loadFeaturedSongs()
loadFeaturedSongs();

// 載入播放列表
function loadPlaylists() {
    playlistList.innerHTML = ''; // 清空之前的內容
    playlists.forEach((playlist, index) => {
        const li = document.createElement('li');
        li.innerText = playlist.name;
        playlistList.appendChild(li);

        li.addEventListener('click', () => {
            // 播放列表項目點擊事件
            const genre = playlist.name.toLowerCase();
            currentGenre = genre;
            loadMusicList(genre);
            updateGenreSelection(genre);
            switchPage('library');
            //  切換到 Your Library 頁面
        });
    });
}

// 切換頁面
function switchPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    sidebarLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`.sidebar ul li[data-page="${pageId}"]`).classList.add('active');
}

// 載入音樂列表 (根據類型)
function loadMusicList(genre) {
    musicListContainer.innerHTML = '';
    currentSongs = musicData[genre]; // 更新目前的歌曲列表
    currentSongs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <div class="song-details">
        ${song.title}
      </div>
      <div class="song-actions">
        <button class="play-song" data-genre="${genre}" data-index="${index}"><i class="fas fa-play"></i></button>
      </div>
    `;
        musicListContainer.appendChild(li);
    });
}

// 搜尋功能 (包含任何字)
function searchSongs() {
    const searchTerm = searchInput.value.toLowerCase();
    const results = [];

    // 檢查搜尋詞是否為空
    if (searchTerm.trim() === "") {
        displaySearchResults(results); // 顯示空結果
        return; // 停止搜尋
    }

    // 搜尋所有類型
    for (const genre in musicData) {
        musicData[genre].forEach((song, index) => {
            if (song.title.toLowerCase().includes(searchTerm)) {
                results.push({
                    ...song,
                    genre,
                    index
                }); // 加入類型資訊
            }
        });
    }

    // 顯示搜尋結果
    displaySearchResults(results);
}

// 顯示搜尋結果
function displaySearchResults(results) {
    searchResultsContainer.innerHTML = ''; // 清空之前的內容

    if (results.length === 0) {
        searchResultsContainer.innerHTML = '<p>No results found.</p>';
        searchResultsPopup.style.display = 'block'; // 顯示彈出視窗
    } else {
        const ul = document.createElement('ul');
        results.forEach(song => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="song-details">
                    ${song.title} (${song.genre})
                </div>
                <div class="song-actions">
                    <button class="play-song" data-genre="${song.genre}" data-index="${song.index}"><i class="fas fa-play"></i></button>
                </div>
            `;
            li.dataset.genre = song.genre; // 儲存類型資訊
            li.dataset.index = song.index; // 儲存索引資訊
            ul.appendChild(li);
        });

        searchResultsContainer.appendChild(ul);
        searchResultsPopup.style.display = 'block'; // 顯示彈出視窗
    }
}

// 事件委託：將事件監聽器添加到父元素

 searchResultsContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('play-song') || e.target.parentNode.classList.contains('play-song')) {
        const genre = e.target.dataset.genre || e.target.parentNode.dataset.genre;
        const index = parseInt(e.target.dataset.index || e.target.parentNode.dataset.index);

        currentGenre = genre; // 載入歌曲時，將 currentGenre 更新為所選歌曲的類型
        songIndex = index; // 載入歌曲時，將 songIndex 更新為所選歌曲的索引
		  const song = musicData[genre][index];
        loadSong(song);
        audio.play();
        updatePlayButton();
        searchResultsPopup.style.display = 'none';// 關閉彈出視窗
		  loadMusicList(genre); // 載入歌曲列表
        updateGenreSelection(genre); //更新樣式

    }
});

musicListContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('play-song') || e.target.parentNode.classList.contains('play-song')) {
        const genre = currentGenre;
        const index = parseInt(e.target.dataset.index || e.target.parentNode.dataset.index);

        songIndex = index;
		  const song = musicData[genre][index];
        loadSong(song);
        audio.play();
        updatePlayButton();
    }
});

// 更新 Genre 選取狀態
function updateGenreSelection(genre) {
    libraryGenres.forEach(g => g.classList.remove('active'));
    document.querySelector(`#library .genre-list li[data-genre="${genre}"]`).classList.add('active');
}

// 更新播放按鈕的圖片
function updatePlayButton() {
    if (audio.paused) {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function isFullwidth(char) {
    // 全形字元的 Unicode 範圍 (大致)
    const fullwidthRanges = [
        [0x1100, 0x115f], // Hangul Jamo
        [0x2e80, 0x303e], // CJK Radicals Supplement, Kangxi Radicals, Ideographic Description Characters, CJK Symbols and Punctuation
        [0x3041, 0x30ff], // Hiragana, Katakana
        [0x3130, 0x318e], // Hangul Compatibility Jamo, Hangul Syllables
        [0x3200, 0x32fe], // Enclosed CJK Letters and Months, CJK Compatibility
        [0x4e00, 0xa4cf], // CJK Unified Ideographs
        [0xac00, 0xd7a3], // Hangul Syllables
        [0xf900, 0xfaff], // CJK Compatibility Ideographs
        [0xfe10, 0xfe19], // Vertical Forms
        [0xfe30, 0xfe6b], // CJK Compatibility Forms, Small Form Variants
        [0xff01, 0xff60], // Halfwidth and Fullwidth Forms
        [0xffe0, 0xffe6]  // CJK Compatibility Forms
    ];

    const charCode = char.charCodeAt(0);

    for (const range of fullwidthRanges) {
        if (charCode >= range[0] && charCode <= range[1]) {
            return true; // 是全形字元
        }
    }

    return false; // 不是全形字元
}

function updateTitleAnimation() {
    const titleText = songTitle.innerText;
    let fullwidthCount = 0;
    let halfwidthCount = 0;

    for (let i = 0; i < titleText.length; i++) {
        if (isFullwidth(titleText[i])) {
            fullwidthCount++;
        } else {
            halfwidthCount++;
        }
    }

    const equivalentFullwidthLength = fullwidthCount + (halfwidthCount / 2);
    const shouldAnimate = equivalentFullwidthLength > 12;// 判斷全形字是否超過12個

    if (shouldAnimate) {
        songTitle.classList.add('animate-title');
    } else {
        songTitle.classList.remove('animate-title');
    }
}

// 音訊播放結束時的處理
audio.addEventListener('ended', () => {
    if (repeatMode === 'single') {
        audio.currentTime = 0;
        audio.play();
    } else {
        // 停止播放，或者可以設定為播放下一首
        nextSong()
    }
});

// 事件監聽器
playBtn.addEventListener('click', playSong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', nextRepeatMode);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setProgress);
searchButton.addEventListener('click', searchSongs);

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        switchPage(link.dataset.page);
    });
});

libraryGenres.forEach(genre => {
    genre.addEventListener('click', () => {
        libraryGenres.forEach(g => g.classList.remove('active'));
        genre.classList.add('active');
        currentGenre = genre.dataset.genre;
        loadMusicList(currentGenre);
    });
});

// 音訊播放狀態改變時更新按鈕
audio.addEventListener('play', updatePlayButton);
audio.addEventListener('pause', updatePlayButton);

// 搜尋欄按下 Enter 鍵
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // 防止表單提交
        searchSongs();
        searchResultsPopup.style.display = 'block'; // 顯示彈出視窗
        switchPage('library'); // 跳轉到 Library 頁面
    }
});

// 初始化時顯示 Home 頁面
switchPage('home');

// 關閉彈出視窗
closeButton.addEventListener('click', () => {
    searchResultsPopup.style.display = 'none';
});

searchResultsPopup.style.display = 'none'; //  搜尋結果彈出視窗
imageViewerPopup.style.display = 'none'; // 圖片檢視器
