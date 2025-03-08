const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const songCover = document.getElementById('song-cover');
const songTitle = document.getElementById('song-title');
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
const searchResultsContainer = document.getElementById('search-results');

// 模擬從資料夾 "掃描" 音樂
const musicData = {
    pop: [
        { title: '世界幻想曲', src: 'music/pop/sekai_gensoukyoku.mp3', cover: 'music/cover/sekai_gensoukyoku.jpg' },
        { title: '空の幻想', src: 'music/pop/sora_no_gensou.mp3', cover: 'music/cover/sora_no_gensou.jpg' },
        { title: 'Too Late Wishes', src: 'music/pop/too_late_wishes.mp3', cover: 'music/cover/too_late_wishes.jpg' },
        { title: '悲劇の光', src: 'music/pop/higeki_no_hikari.mp3', cover: 'music/cover/higeki_no_hikari.jpg' },
        { title: '祈りの灯火', src: 'music/pop/inori_no_tomoshibi.mp3', cover: 'music/cover/inori_no_tomoshibi.jpg' },
        { title: 'Infinite_Labyrinth（Female ver.）', src: 'music/pop/infinite_labyrinth_female.mp3', cover: 'music/cover/infinite_labyrinth_female.jpg' },
        { title: 'Infinite_Labyrinth（Male ver.）', src: 'music/pop/infinite_labyrinth_male.mp3', cover: 'music/cover/infinite_labyrinth.jpg' },
        { title: '永遠の光（Male ver.）', src: 'music/pop/eien_no_hikari_male.mp3', cover: 'music/cover/eien_no_hikari_male.jpg' },
        { title: '永遠の光（Female ver.）', src: 'music/pop/eien_no_hikari_female.mp3', cover: 'music/cover/eien_no_hikari_female.jpg' },
        { title: 'あなたの影', src: 'music/pop/anata_no_kage.mp3', cover: 'music/cover/anata_no_kage.jpg' },
        { title: '戦火の中の永遠（Female ver.）', src: 'music/pop/senka_no_naka_no_eien_female.mp3', cover: 'music/cover/senka_no_naka_no_eien_female.jpg' },
        { title: '戦火の中の永遠（Male ver.）', src: 'music/pop/senka_no_naka_no_eien_male.mp3', cover: 'music/cover/senka_no_naka_no_eien_male.jpg' },
        { title: '無垠之心Infiniteこころ의경계', src: 'music/pop/mugin_no_kokoro.mp3', cover: 'music/cover/mugin_no_kokoro.jpg' },
        { title: '捨てられた子供', src: 'music/pop/suterareta_kodomo.mp3', cover: 'music/cover/suterareta_kodomo.jpg' }
    ],
    rock: [
        { title: '卒業おめでとう', src: 'music/rock/sotsugyou_omedetou.mp3', cover: 'music/cover/sotsugyou_omedetou.jpg' },
        { title: '時空を超えて', src: 'music/rock/jikuu_wo_koete.mp3', cover: 'music/cover/jikuu_wo_koete.jpg' },
        { title: '夢の風に乗って', src: 'music/rock/yume_no_kaze_ni_notte.mp3', cover: 'music/cover/yume_no_kaze_ni_notte.jpg' },
        { title: 'The Kings Revival', src: 'music/rock/the_kings_revival.mp3', cover: 'music/cover/the_kings_revival.jpg' },
        { title: '偽りの者たち', src: 'music/rock/itsuwari_no_monotachi.mp3', cover: 'music/cover/itsuwari_no_monotachi.jpg' }
    ],
    electronic: [
        { title: '冊丹し日ヨ几回   日丹亡片', src: 'music/electronic/malbeno_back.mp3', cover: 'music/cover/malbeno_back.jpg' },
        { title: 'まごまごハッピー', src: 'music/electronic/magomago_happy.mp3', cover: 'music/cover/magomago_happy.jpg' }
    ],
    vocaloid: [
        { title: '人生何のために', src: 'music/vocaloid/jinsei_nan_no_tame_ni.mp3', cover: 'music/cover/jinsei_nan_no_tame_ni.jpg' },
        { title: '永遠の旅路', src: 'music/vocaloid/eien_no_tabiji.mp3', cover: 'music/cover/eien_no_tabiji.jpg' },
        { title: '夢に縛られたあなた', src: 'music/vocaloid/yume_ni_shibarareta_anata.mp3', cover: 'music/cover/yume_ni_shibarareta_anata.jpg' },
        { title: '❤꒐ ꒒ꄲ꒦ꏂ ꌦꄲ꒤❤', src: 'music/vocaloid/i_love_you.mp3', cover: 'music/cover/i_love_you.jpg' },
        { title: '罪悪感', src: 'music/vocaloid/zaiakukan.mp3', cover: 'music/cover/zaiakukan.jpg' },
        { title: 'Eternal Moment', src: 'music/vocaloid/eternal_moment.mp3', cover: 'music/cover/eternal_moment.jpg' },
        { title: '01011001__ɅƧȼℏřØπ', src: 'music/vocaloid/ascron.mp3', cover: 'music/cover/ascron.jpg' },
        { title: '和平の交響曲', src: 'music/vocaloid/wahei_no_koukyoukyoku.mp3', cover: 'music/cover/wahei_no_koukyoukyoku.jpg' },
        { title: '儚い幻', src: 'music/vocaloid/hakanai_maboroshi.mp3', cover: 'music/cover/hakanai_maboroshi.jpg' }
    ],
    piano: [
	    { title: '心の祈り', src: 'music/piano/kokoro_no_inori.mp3', cover: 'music/cover/kokoro_no_inori.jpg' },
        { title: '静かな時間', src: 'music/piano/shizukana_jikan.mp3', cover: 'music/cover/shizukana_jikan.jpg' },
        { title: '時間の流れ', src: 'music/piano/jikan_no_nagare.mp3', cover: 'music/cover/jikan_no_nagare.jpg' },
        { title: '生命の息吹', src: 'music/piano/seimei_no_ibuki.mp3', cover: 'music/cover/seimei_no_ibuki.jpg' },
        { title: '小さな星', src: 'music/piano/chiisana_hoshi.mp3', cover: 'music/cover/chiisana_hoshi.jpg' },
        { title: '月夜の微光', src: 'music/piano/tsukiyo_no_bikou.mp3', cover: 'music/cover/tsukiyo_no_bikou.jpg' },
        { title: '思い出の並木道', src: 'music/piano/omoideno_namikimichi.mp3', cover: 'music/cover/omoideno_namikimichi.jpg' },
        { title: '星空の囁き', src: 'music/piano/hoshizora_no_sasayaki.mp3', cover: 'music/cover/hoshizora_no_sasayaki.jpg' },
        { title: '砂漠の星屑', src: 'music/piano/sabaku_no_hoshikuzu.mp3', cover: 'music/cover/sabaku_no_hoshikuzu.jpg' },
        { title: '風花の夢', src: 'music/piano/kazahana_no_yume.mp3', cover: 'music/cover/kazahana_no_yume.jpg' },
        { title: '風に踊る花たち', src: 'music/piano/kaze_ni_odoru_hanatachi.mp3', cover: 'music/cover/kaze_ni_odoru_hanatachi.jpg' },
        { title: '悠久の山河に響く音', src: 'music/piano/yuukyuu_no_sanga_ni_hibiku_oto.mp3', cover: 'music/cover/yuukyuu_no_sanga_ni_hibiku_oto.jpg' }
    ],
    game: [
        { title: 'Game Song 1', src: 'music/game/game1.mp3', cover: 'music/cover/game1.jpg' },
        { title: 'Game Song 2', src: 'music/game/game2.mp3', cover: 'music/cover/game2.jpg' }
    ],
    original: [
        { title: 'Original Song 1', src: 'music/original/original1.mp3', cover: 'music/cover/original1.jpg' },
        { title: 'Original Song 2', src: 'music/original/original2.mp3', cover: 'music/cover/original2.jpg' }
    ]
};

let currentGenre = 'pop'; // 預設類型
let currentSongs = musicData[currentGenre]; // 目前歌曲列表
let songIndex = 0;

let shuffle = false; // 隨機播放狀態
let repeatMode = 'off'; // 循環播放模式 ('off', 'single', 'folder')

// 播放列表資料 (現在與資料夾名稱相同)
const playlists = Object.keys(musicData).map(genre => ({
    name: genre,
    description: `Lifer_Lighdow's ${genre} music genre`,
    cover: `music/cover/${genre}.png`, // 假設封面的命名規則
    songs: musicData[genre].map((_, index) => index) // 歌曲索引
}));

// 初始化
loadSong(currentSongs[songIndex]);
loadPlaylists();
loadPlaylistItems();
loadMusicList(currentGenre); // 載入預設類型的音樂列表
updateGenreSelection(currentGenre);

// 載入歌曲
function loadSong(song) {
    songTitle.innerText = song.title;
    songCover.src = song.cover;
    audio.src = song.src;
}

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
    if (repeatMode === 'off') {
        audio.pause();
        audio.currentTime = 0;
        updatePlayButton();
        return;
    } else if (shuffle) {
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
    } else if (repeatMode === 'single') {
        repeatMode = 'folder';
        repeatBtn.innerHTML = '<i class="fas fa-sync-alt"></i>'; // Font Awesome 圖示
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
  } else if (repeatMode === 'folder') {
    nextSong(); // 播放資料夾中的下一首
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
            switchPage('library'); //  切換到 Your Library 頁面
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
                results.push({ ...song, genre, index }); // 加入類型資訊
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
        return;
    }

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
        ul.appendChild(li);
    });

    searchResultsContainer.appendChild(ul);
}

// 事件委託：將事件監聽器添加到父元素

searchResultsContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('play-song') || e.target.parentNode.classList.contains('play-song')) {
        const genre = e.target.dataset.genre || e.target.parentNode.dataset.genre;
        const index = parseInt(e.target.dataset.index || e.target.parentNode.dataset.index);

        currentGenre = genre; // 載入歌曲時，將 currentGenre 更新為所選歌曲的類型
        songIndex = index; // 載入歌曲時，將 songIndex 更新為所選歌曲的索引

        loadSong(musicData[genre][index]);
        audio.play();
        updatePlayButton();

    }
});

musicListContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('play-song') || e.target.parentNode.classList.contains('play-song')) {
        const genre = currentGenre;
        const index = parseInt(e.target.dataset.index || e.target.parentNode.dataset.index);

        songIndex = index;
        loadSong(musicData[genre][index]);
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

// 音訊播放結束時的處理
audio.addEventListener('ended', () => {
  if (repeatMode === 'single') {
    audio.currentTime = 0;
    audio.play();
  } else if (repeatMode === 'folder') {
    nextSong(); // 播放資料夾中的下一首
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
        switchPage('library'); // 跳轉到 Library 頁面
    }
});

// 初始化時顯示 Home 頁面
switchPage('home');
