console.log('story.js 腳本開始執行'); // 確認 story.js 是否載入

const storyData = {
     "gameIntro": {
        text: "歡迎來到《鬼影幢幢》！\n\n你將扮演一位古宅探險家，受匿名信的邀請，前來解開這座廢棄古宅的謎團，並獲得豐厚的獎金。\n\n請注意，這座古宅充滿了危險和恐怖。你的每一個選擇都將影響你的命運，總共有11個結局。\n\n祝你好運！",
        buttons: [
            { text: "確認開始", nextSection: "introduction" }
        ]
    },
    
    "introduction": {
        text: "你收到了一封匿名信，邀請你到一座廢棄已久的古宅探險。傳說這座古宅鬧鬼，曾發生過許多恐怖事件，而且曾有人在此失蹤。\n\n信中提到，如果你能解開古宅的謎團，就能獲得豐厚的獎金。儘管心中忐忑不安，但你還是決定前往，因為你對超自然現象充滿好奇，並且需要這筆錢。\n\n但你也可以選擇忽略這封信...",
        buttons: [
            { text: "進入古宅", nextSection: "entrance" },
            { text: "忽略這封信", nextSection: "refuseInvitation" }
        ]
    },

    "refuseInvitation": {
        text: "你決定忽略這封匿名信，並將其丟進垃圾桶。你覺得這一切太過詭異，不值得冒險。\n\n當晚，你睡得很香甜，什麼也沒有發生。或許，有些謎團永遠不該被解開...\n\n(遊戲結束)",
        buttons: [
            { text: "重新開始", nextSection: "introduction" }
        ]
    },

    "entrance": {
        text: "你推開了古宅沉重的大門，一股冰冷的霉味撲面而來，讓你打了個寒顫。屋內一片漆黑，只有微弱的月光從高處的窗戶射入，照亮了佈滿灰塵的地板。\n\n你聽到遠處傳來像是水滴落下的聲音，但這裡明明已經廢棄多年，不應該有水管漏水才對。一個黑影閃過你的眼角...你是否要檢查周圍？",
        buttons: [
            { text: "檢查周圍", nextSection: "checkAroundEntrance" },
            { text: "探索迴廊", nextSection: "hallway" }
        ]
    },

    "checkAroundEntrance": {
        text: "你決定先檢查入口周圍。在門邊，你發現了一張老舊的地圖，似乎是古宅的平面圖。地圖上標記著一些隱藏的房間和通道。你會仔細研究地圖嗎？",
        buttons: [
            { text: "仔細研究地圖", nextSection: "studyMap" },
            { text: "探索迴廊", nextSection: "hallway" }
        ]
    },

    "studyMap": {
        text: "你仔細研究了地圖，記住了幾個關鍵的位置。地圖上標記著一間位於地下室的密室、一間位於閣樓的『秘密基地』，以及一條通往花園的隱藏路線。你知道了更多信息，但探索也變得更加危險。\n\n你現在會選擇探索迴廊、前往地下室、前往秘密基地，還是試著尋找前往花園的隱藏路線？",
        buttons: [
            { text: "探索迴廊", nextSection: "hallway" },
            { text: "前往地下室", nextSection: "basement" },
            { text: "前往秘密基地", nextSection: "secretBase" },
            { text: "尋找前往花園的路線", nextSection: "gardenRoute" }
        ]
    },

    "gardenRoute": {
        text: "你試圖根據地圖上的標記，尋找前往花園的隱藏路線。你發現入口隱藏在餐廳的壁爐後面，需要轉動一個特定的機關才能打開。\n\n你找到了機關，並成功打開了入口。你會進入這個秘密通道嗎？",
        buttons: [
            { text: "進入秘密通道", nextSection: "secretPassageToGarden" },
            { text: "回到古宅探索", nextSection: "studyMap" }
        ]
    },

    "secretPassageToGarden": {
        text: "你進入了通往花園的秘密通道。通道彎彎曲曲，非常狹窄，而且充滿了蜘蛛網。你感到越來越冷，空氣中也瀰漫著一種奇怪的氣味。\n\n通道的盡頭似乎有光亮，你會繼續前進嗎？",
        buttons: [
            { text: "繼續前進", nextSection: "endOfPassage" },
            { text: "回到餐廳", nextSection: "woodDoor" }
        ]
    },

    "secretBase": {
        text: "你決定前往閣樓的『秘密基地』。你爬上搖搖欲墜的樓梯，來到了閣樓。閣樓裡堆滿了灰塵和廢棄的物品。\n\n在地圖上標記的位置，你發現了一扇隱藏的門。你打開門，發現自己進入了一個裝飾精美的房間，和古宅的其他地方格格不入。\n\n房間中央坐著一位漂亮可愛的年輕女鬼，她看起來有些寂寞。她對你說：「你...你是第一個來到我這裡的人呢...」。",
        buttons: [
            { text: "和女鬼聊天", nextSection: "talkToGhostGirl" },
            { text: "嚇得逃跑", nextSection: "fleeFromGhostGirl" }
        ]
    },

    "talkToGhostGirl": {
        text: "你鼓起勇氣，和女鬼聊了起來。她告訴你，她是這座古宅過去的主人，因為一場意外而去世，一直被困在這裡。\n\n她很寂寞，渴望有人陪伴。她問你是否願意留下來陪她，你...\n\n你會怎麼選擇？",
        buttons: [
            { text: "留下來陪她", nextSection: "happyEndingWithGhostGirl" },
            { text: "拒絕她", nextSection: "angryGhostGirl" }
        ]
    },

    "fleeFromGhostGirl": {
        text: "你被女鬼嚇了一跳，立刻逃離了房間。你跑回迴廊，發誓再也不靠近閣樓了。\n\n但你知道，那位寂寞的女鬼仍然在那裡，等待著下一個訪客...",
        buttons: [
            { text: "回到迴廊", nextSection: "hallway" }
        ]
    },

    "happyEndingWithGhostGirl": {
        text: "你決定留下來陪女鬼。你和她一起打掃房間，聊天，分享彼此的故事。你發現她其實很善良，只是需要有人陪伴。\n\n隨著時間的推移，你和女鬼產生了感情。你決定永遠留在這座古宅裡，和她一起度過餘生。\n\n你找到了一個意想不到的歸宿，和一位可愛的女鬼一起幸福地生活在一起...",
        buttons: [
            { text: "結束", nextSection: "introduction" }
        ]
    },

    "angryGhostGirl": {
        text: "你拒絕了女鬼的請求，她非常傷心和憤怒。她開始尖叫，房間裡的溫度驟然下降。你感到一股強大的力量將你推了出去。\n\n你被女鬼趕出了房間，並被警告永遠不要再回來。你感到非常後悔，或許你不該拒絕一位如此寂寞的靈魂...",
        buttons: [
            { text: "回到迴廊", nextSection: "hallway" }
        ]
    },

    "hallway": {
        text: "你小心翼翼地走進一條長長的迴廊，兩側掛滿了佈滿灰塵的肖像畫。畫中人物的眼睛似乎隨著你的移動而轉動，讓你感到毛骨悚然。\n\n迴廊深處隱約傳來低語聲，似乎有人在呼喚你的名字。在迴廊的盡頭，有兩扇門，一扇是老舊的木門，另一扇則是覆蓋著鐵鏽的鐵門。你會選擇哪一扇？",
        buttons: [
            { text: "打開木門", nextSection: "woodDoor" },
            { text: "打開鐵門", nextSection: "ironDoor" }
        ]
    },

    "woodDoor": {
        text: "你選擇了木門。推開門，你發現自己進入了一間古老的餐廳。長長的餐桌上佈滿了灰塵，但餐具卻擺放得整整齊齊，彷彿隨時準備用餐。\n\n餐桌中央放著一個打開的音樂盒，正播放著令人不安的旋律。你會靠近音樂盒嗎？",
        buttons: [
            { text: "靠近音樂盒", nextSection: "musicBox" },
            { text: "回到迴廊", nextSection: "backToHallway" }
        ]
    },

    "ironDoor": {
        text: "你選擇了鐵門。你費力地推開沉重的鐵門，鏽蝕的金屬發出刺耳的聲音。門後是一個黑暗的地下室，散發著一股腐臭味。\n\n你會下去探索地下室嗎？",
        buttons: [
            { text: "進入地下室", nextSection: "basement" },
            { text: "回到迴廊", nextSection: "backToHallway" }
        ]
    },

    "backToHallway": {
        text: "你決定回到迴廊。但當你轉身時，發現迴廊變得更加陰暗，肖像畫中的人物似乎更加靠近了。他們的眼神充滿了惡意，彷彿想要把你撕成碎片。\n\n 突然，你感到背後一陣寒意。你慢慢地轉過身，看到一個模糊的身影站在你面前。這個身影伸出手，想要抓住你。\n\n你會...\n\n(你有 ${storyData.backToHallway.combatWinChance}% 的機會戰勝這個身影。)", // 顯示戰鬥機率
        combatWinChance: 60, // 設定戰鬥勝利機率
        buttons: [
            { text: "逃跑", nextSection: "escapeHallway" },
            { text: "戰鬥", nextSection: "performCombat" } // 導向新的戰鬥處理區塊
        ]
    },

    // 新增的戰鬥處理區塊，用於判斷戰鬥結果並導向
    "performCombat": {
        text: "戰鬥結果判定中...", // 這個文本不會被實際顯示，因為會立即跳轉
        buttons: [] // 這個按鈕也不會被實際顯示
    },

    "escapeHallway": {
        text: "你瘋狂地逃離迴廊，但那個身影緊追不捨. 你跑到迴廊的盡頭，發現前面又多出了兩扇門，分別是新木門和新鐵門。你會選擇哪一扇？",
        buttons: [
		      { text: "再次打開木門", nextSection: "woodDoor" },
            { text: "再次打開鐵門", nextSection: "ironDoor" },
            { text: "打開新木門", nextSection: "newWoodDoor" },
            { text: "打開新鐵門", nextSection: "newIronDoor" }
        ]
    },

    // 原始的 fightHallway 區塊，勝利時導向
    "fightHallway": {
        text: "你鼓起勇氣，決定和那個身影戰鬥。你撿起地上的一塊碎石，朝那個身影砸去。那個身影發出痛苦的嚎叫，然後消失在黑暗中。你鬆了一口氣，但你知道它隨時可能回來。\n\n在身影消失的地方，你發現了一個隱藏的通道。你會進入通道嗎？",
        buttons: [
            { text: "進入通道", nextSection: "secretPassage" },
            { text: "小心前進", nextSection: "hallway" }
        ]
    },

    "musicBox": {
        text: "你小心翼翼地靠近音樂盒。當你靠近時，音樂聲變得更加清晰，你似乎聽到了有人在低聲吟唱。音樂盒的蓋子上刻著一句話：「死亡是唯一的解脫」。\n\n突然，音樂盒停止了播放，房間裡陷入一片寂靜。你感到背後一陣冰涼…\n\n你死了。音樂盒的詛咒應驗了…",
        buttons: [
            { text: "重新開始", nextSection: "introduction" }
        ]
    },

    "basement": {
        text: "你戰戰兢兢地走下地下室的階梯。階梯非常濕滑，你差點滑倒。地下室非常黑暗，你只能聽到老鼠吱吱叫的聲音。\n\n在地下室的深處，你看到一個發光的物體。你會走過去查看嗎？",
        buttons: [
            { text: "查看發光物體", nextSection: "glowingObject" },
            { text: "探索其他地方", nextSection: "exploreBasement" },
            { text: "逃回迴廊", nextSection: "backToHallway" }
        ]
    },

    "exploreBasement": {
        text: "你決定先探索地下室的其他地方。在一個角落裡，你發現了一扇隱藏的門，門後傳來微弱的光芒和低語聲。\n\n你會打開這扇門嗎？",
        buttons: [
            { text: "打開隱藏的門", nextSection: "secretBasementRoom" },
            { text: "查看發光物體", nextSection: "glowingObject" },
            { text: "逃回迴廊", nextSection: "backToHallway" }
        ]
    },

    "secretBasementRoom": {
        text: "你打開隱藏的門，發現自己進入一間佈滿儀式用品的房間。房間中央擺放著一個祭壇，上面放著一本打開的古書。\n\n空氣中瀰漫著一股令人作嘔的氣味，你感到非常不舒服。你會閱讀古書嗎？",
        buttons: [
            { text: "閱讀古書", nextSection: "readSpell" },
            { text: "離開房間", nextSection: "basement" }
        ]
    },

    "readSpell": {
        text: "你開始閱讀古書上的咒語。咒語的內容非常邪惡，讓你感到一陣恐懼。但你無法停止閱讀，彷彿有一種神秘的力量在驅使你。\n\n當你讀完咒語的最後一個字時，房間裡突然颳起一陣強風，祭壇上的蠟燭熄滅了。你感到身體裡有什麼東西正在改變...\n\n你變成了一個惡魔。你永遠地被困在了這座古宅裡…",
        buttons: [
            { text: "重新開始", nextSection: "introduction" }
        ]
    },

    "glowingObject": {
        text: "你走到發光物體旁邊，發現那是一個古老的鏡子。鏡子表面佈滿了裂痕，但依然能反射出你的身影。\n\n當你注視著鏡子時，你發現鏡子裡的你露出了詭異的笑容，並緩緩地伸出手，想要抓住你！\n\n你會...",
        buttons: [
            { text: "抓住鏡子裡的手", nextSection: "mirrorWorld" },
            { text: "逃離鏡子", nextSection: "basement" }
        ]
    },

    "mirrorWorld": {
        text: "你伸出手，抓住了鏡子裡的手。突然，你感到一陣天旋地轉，然後失去了意識。\n\n當你醒來時，發現自己身處一個顛倒的世界。周圍的一切都和現實世界一模一樣，但卻又充滿了詭異和恐怖。\n\n你被困在了鏡子世界裡。你永遠也無法回到現實世界了…",
        buttons: [
            { text: "重新開始", nextSection: "introduction" }
        ]
    },

    "newWoodDoor": {
        text: "你打開新木門，發現自己進入一間佈滿蜘蛛網的臥室。房間中央擺放著一張老舊的床，上面躺著一個破舊的洋娃娃。\n\n突然，洋娃娃的眼睛睜開了，直勾勾地盯著你！\n\n你嚇得魂飛魄散，轉身想逃，卻發現門已經被鎖上了…",
        buttons: [
          { text: "檢查洋娃娃", nextSection: "checkDoll" },
            { text: "重新開始", nextSection: "introduction" }
        ]
    },

    "checkDoll": {
      text: "你顫抖地走向洋娃娃。當你靠近時，洋娃娃的頭突然轉了過來，對著你露出一個令人毛骨悚然的笑容。\n\n洋娃娃開口說話了：「你逃不掉的...」。你會...",
      buttons: [
        { text: "攻擊洋娃娃", nextSection: "attackDoll" },
        { text: "嘗試溝通", nextSection: "talkToDoll"}
      ]
    },

     "attackDoll": {
      text: "你拿起旁邊的檯燈，狠狠地朝洋娃娃砸去。洋娃娃的頭被打碎了，但它卻發出了更加尖銳的笑聲。\n\n突然，房間裡的燈全部熄滅了。你感到無數隻冰冷的手抓住了你的身體...\n\n你死了。洋娃娃的詛咒應驗了…",
      buttons: [
        { text: "重新開始", nextSection: "introduction" }
        ]
    },

    "talkToDoll": {
      text: "你鼓起勇氣，試圖和洋娃娃溝通。「你想要什麼？我能幫你做什麼？」。\n\n洋娃娃停止了笑聲，它的眼神似乎變得柔和了一些。「我只是想要一個朋友...你能留下來陪我嗎？」。你會...",
      buttons: [
        { text: "留下來陪洋娃娃", nextSection: "dollFriend" },
        { text: "拒絕洋娃娃", nextSection: "attackDoll" },
		  { text: "逃離洋娃娃", nextSection: "backToHallway" }
      ]
    },

    "dollFriend": {
      text: "你決定留下來陪洋娃娃。時間慢慢流逝，你和洋娃娃成為了朋友。雖然這個地方依然恐怖，但你不再感到孤單。\n\n你永遠地留在了這間古宅裡，和洋娃娃一起度過餘生。這或許不是最好的結局，但至少你找到了屬於自己的歸宿...",
      buttons: [
        { text: "結束", nextSection: "introduction" }
      ]
    },

    "newIronDoor": {
        text: "你打開新鐵門，發現自己進入一間書房。書架上堆滿了古老的書籍，散發著一股奇特的香味。\n\n在書桌上，你發現一本日記，上面記錄著古宅過去發生的恐怖事件。你會閱讀日記嗎？",
        buttons: [
            { text: "閱讀日記", nextSection: "diary" },
            { text: "離開書房", nextSection: "backToHallway" },
            { text: "檢查書桌上的其他物品", nextSection: "mysteriousPaperIntro" } // 新增的選項
        ]
    },

    // 新增的神秘紙張介紹區塊
    "mysteriousPaperIntro": {
        text: "你在書桌上除了日記，還發現了一張看起來很古老的空白紙張。紙張邊緣泛黃，似乎曾被仔細摺疊過。你感覺這張紙不尋常，或許它隱藏著什麼秘密。\n\n你會嘗試解讀這張紙上的內容嗎？",
        buttons: [
            { text: "嘗試解讀紙張上的內容 ✨", nextSection: "interpretMysteriousPaper" }, // 觸發 LLM 呼叫
            { text: "將紙張放回原處", nextSection: "newIronDoor" } // 返回書房
        ]
    },

    // 這個區塊的內容將由 LLM 動態更新
    "mysteriousPaperResult": {
        text: "...", // 佔位符，將被替換
        buttons: [
            { text: "繼續探索", nextSection: "newIronDoor" } // 讀取生成內容後，返回書房
        ]
    },

    "diary": {
        text: "你翻開日記，讀到了一段關於古宅主人虐待和殺害僕人的故事。字裡行間充滿了瘋狂和絕望。\n\n讀完日記，你感到一陣寒意。突然，你聽到身後傳來一個冰冷的聲音：「你逃不掉的…」。\n\n你會...",
        buttons: [
            { text: "轉身面對", nextSection: "faceTheGhost" },
            { text: "立刻逃跑", nextSection: "fleeTheGhost" }
        ]
    },

    "faceTheGhost": {
        text: "你鼓起勇氣，轉身面對聲音的來源。你看到一個模糊的身影站在你面前，那是一個面容扭曲的鬼魂，散發著強烈的怨恨。\n\n鬼魂朝你撲來，你會...",
        buttons: [
            { text: "嘗試和鬼魂溝通", nextSection: "talkToGhost" },
            { text: "使用暴力驅趕", nextSection: "fightGhost" }
        ]
    },

    "talkToGhost": {
        text: "你試圖和鬼魂溝通：「我不是有意打擾你的，我只是想了解這座古宅的過去...」。\n\n鬼魂停止了攻擊，它的眼神似乎變得柔和了一些。「你想知道過去嗎？我可以告訴你...但你要付出代價…」。你會...",
        buttons: [
            { text: "付出代價", nextSection: "ghostDeal" },
            { text: "拒絕交易", nextSection: "fightGhost" }
        ]
    },

    "ghostDeal": {
        text: "你決定付出代價，聽取鬼魂的故事。鬼魂告訴你古宅過去發生的所有恐怖事件，以及它被困在這裡的原因。\n\n聽完故事，你感到非常悲傷。你決定幫助鬼魂解脫。你按照鬼魂的指示，完成了一個古老的儀式。\n\n鬼魂終於得到了結脫，你也離開了古宅。你雖然沒有得到獎金，但你幫助了一個可憐的靈魂，這比任何金錢都更有價值...",
        buttons: [
            { text: "結束", nextSection: "introduction" }
        ]
    },

    "fightGhost": {
        text: "你決定使用暴力驅趕鬼魂。你拿起書桌上的檯燈，朝鬼魂砸去。鬼魂發出尖銳的嚎叫，但它並沒有消失。\n\n鬼魂變得更加憤怒，它朝你發動了猛烈的攻擊。你無法抵擋鬼魂的力量，最終倒在了地上。\n\n你死了。你永遠地被困在了這座古宅裡…",
        buttons: [
            { text: "重新開始", nextSection: "introduction" }
        ]
    },

    "fleeTheGhost": {
        text: "你嚇得魂飛魄散，立刻逃離了書房。你跑回了迴廊，但鬼魂卻緊追不捨。你會怎麼做？",
        buttons: [
            { text: "回到書房(面對鬼魂)", nextSection: "faceTheGhost" },
            { text: "繼續逃跑", nextSection: "escapeHallway" }
        ]
    },

    "secretPassage": {
        text: "你小心翼翼地進入隱藏的通道。通道非常狹窄，你只能彎著腰前進。空氣中瀰漫著一股腐臭味，讓你感到噁心。\n\n在通道的盡頭，你看到一個微弱的光芒。你會走向光芒嗎？",
        buttons: [
            { text: "走向光芒", nextSection: "endOfPassage" },
            { text: "回到迴廊", nextSection: "hallway" }
        ]
    },

    "endOfPassage": {
        text: "你走到光芒旁邊，發現那是一個出口。你爬出出口，發現自己身處古宅的花園中。花園裡雜草叢生，一片荒涼。\n\n在花園中央，有一座古老的石像。石像的眼睛閃爍著紅色的光芒。你會靠近石像嗎？",
        buttons: [
            { text: "靠近石像", nextSection: "statue" },
            { text: "逃離花園", nextSection: "ending" }
        ]
    },

    "statue": {
        text: "你走到石像旁邊，石像的眼睛突然變得更加明亮。石像張開嘴巴，發出尖銳的聲音。你的腦海中浮現出古宅過去發生的恐怖事件。\n\n石像的眼睛射出一道紅光，擊中你的身體。你感到一陣劇痛，然後失去了意識。\n\n你死了。古宅的詛咒永遠地束縛了你…",
        buttons: [
            { text: "重新開始", nextSection: "introduction" }
        ]
    },

    "ending": {
        text: "你瘋狂地逃離花園，頭也不回地跑出了古宅。你再也不想回到這個恐怖的地方。你決定將古宅的秘密永遠地埋藏在心底。\n\n你活下來了，但古宅的陰影將永遠伴隨著你…",
        buttons: [
            { text: "結束", nextSection: "introduction" }
        ]
    }
};

// Array to store achieved ending IDs
let achievedEndings = [];

// Object mapping ending IDs to their summaries
const endingSummaries = {
  "refuseInvitation": "結局一：拒絕邀請",
  "happyEndingWithGhostGirl": "好結局一：人鬼同居",
  "dollFriend": "好結局二：摯友娃娃",
  "ghostDeal": "好結局三：靈魂救贖",
  "ending": "真結局：逃離古宅",
  "statue": "壞結局一：石像詛咒",
  "mirrorWorld": "壞結局二：鏡像世界",
  "attackDoll": "壞結局三：玩偶詛咒",
  "musicBox": "壞結局四：音樂盒",
  "fightGhost": "壞結局五：怨魂",
  "readSpell": "壞結局六：成為惡魔"
};

// 定義死亡結局的 ID，這些結局的觸發按鈕不應被禁用
const deathEndings = {
  "musicBox": true,
  "mirrorWorld": true,
  "attackDoll": true,
  "fightGhost": true,
  "readSpell": true,
  "statue": true
};

/**
 * Loads achieved endings from local storage.
 */
function loadAchievedEndings() {
  const storedEndings = localStorage.getItem('achievedEndings');
  if (storedEndings) {
    achievedEndings = JSON.parse(storedEndings);
    console.log('已從本地儲存載入結局:', achievedEndings);
  } else {
    console.log('本地儲存中沒有找到結局記錄。');
  }
}

/**
 * Saves achieved endings to local storage.
 */
function saveAchievedEndings() {
  localStorage.setItem('achievedEndings', JSON.stringify(achievedEndings));
  console.log('結局已儲存到本地儲存:', achievedEndings);
}

/**
 * Clears all achieved endings from local storage and resets the game state.
 * This function is made globally accessible for the "Clear Achievements" button.
 */
window.clearAllEndings = function() {
  localStorage.removeItem('achievedEndings');
  achievedEndings = []; // Reset the in-memory array
  updateEndingLogDisplay(); // Update the display to show empty log
  console.log('所有探險成就已清除。');
};

/**
 * Calls the Gemini API to interpret the mysterious paper.
 */
async function interpretMysteriousPaper() {
    const main = document.querySelector('main');
    // 顯示載入訊息和動畫
    main.innerHTML = `
        <section id="loadingSection">
            <p>紙張正在顫動，似乎有什麼文字正在顯現...請稍候片刻...</p>
            <div style="text-align: center; margin-top: 20px;">
                <div style="border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid #ff3333; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; display: inline-block;"></div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        </section>
    `;

    try {
        let chatHistory = [];
        const prompt = "Generate a short, cryptic, and unsettling message found on an old piece of paper in a haunted house. The message should hint at a hidden truth or a past tragedy, but remain vague. Keep it under 50 words. Focus on a sense of dread and mystery. Write it in Traditional Chinese.";
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        console.log('正在呼叫 Gemini API...');
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log('API 響應狀態:', response.status, response.statusText);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API 響應錯誤:', errorText);
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log('Gemini API 原始結果:', result);

        let generatedText = "紙張上沒有任何文字顯現。或許它只是一張普通的廢紙...";
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            generatedText = result.candidates[0].content.parts[0].text;
            console.log('成功從 Gemini API 獲取文本:', generatedText);
        } else {
            console.warn("Gemini API 返回的結構不包含預期的內容。可能是空的或格式不符。");
            // 如果 API 返回的結構不符合預期，也顯示預設訊息
        }

        // 更新 mysteriousPaperResult 區塊的文本
        storyData.mysteriousPaperResult.text = `你仔細觀察，紙張上緩緩浮現出一些扭曲的文字：\n\n「${generatedText}」\n\n這段文字讓你感到一陣寒意，似乎揭示了古宅深處不為人知的秘密...`;
        showSection('mysteriousPaperResult'); // 顯示結果
    } catch (error) {
        console.error("呼叫 Gemini API 時發生錯誤:", error);
        // 如果 API 呼叫失敗，顯示一個替代的錯誤訊息
        storyData.mysteriousPaperResult.text = "嘗試解讀紙張時，一股莫名的力量阻礙了你。紙張瞬間化為灰燼，什麼也沒有留下。你感到一陣不安...";
        showSection('mysteriousPaperResult'); // 顯示錯誤訊息
    }
}

/**
 * Displays a specific section of the story.
 * @param {string} sectionId The ID of the section to display.
 */
function showSection(sectionId) {
    // 特殊處理戰鬥邏輯
    if (sectionId === "performCombat") {
        const winChance = storyData.backToHallway.combatWinChance;
        const randomNumber = Math.random() * 100; // 0-99.99...
        console.log(`戰鬥機率: ${winChance}%, 隨機數: ${randomNumber}`);

        if (randomNumber < winChance) {
            // 勝利
            console.log('戰鬥勝利！');
            showSection('fightHallway'); // 導向勝利後的區塊
        } else {
            // 失敗
            console.log('戰鬥失敗！');
            showSection('fightGhost'); // 導向死亡結局
        }
        return; // 處理完畢，不繼續渲染 performCombat 區塊
    }

    // 特殊處理神秘紙張解讀邏輯 (LLM 呼叫)
    if (sectionId === "interpretMysteriousPaper") {
        interpretMysteriousPaper(); // 呼叫非同步的 LLM 函數
        return; // 由非同步函數處理，此處不再繼續渲染
    }

    const section = storyData[sectionId];
    if (!section) {
        console.error(`Section with id "${sectionId}" not found.`);
        return;
    }

    const main = document.querySelector('main');
    let sectionText = section.text;

    // 如果是 backToHallway 區塊，動態插入戰鬥機率
    if (sectionId === "backToHallway" && section.combatWinChance !== undefined) {
        sectionText = section.text.replace('${storyData.backToHallway.combatWinChance}', section.combatWinChance);
    }

    let sectionHTML = `
      <section id="${sectionId}">
        <p>${sectionText.replace(/\n/g, '<br>')}</p>
        ${section.buttons.map(button => {
            const isEnding = endingSummaries.hasOwnProperty(button.nextSection);
            const isAchieved = achievedEndings.includes(button.nextSection);
            // 檢查目標區塊是否為死亡結局，如果是，則其觸發按鈕不應被禁用
            const isDeathEndingTrigger = deathEndings.hasOwnProperty(button.nextSection); 

            let buttonClass = "button";
            let onClickHandler = `showSection('${button.nextSection}')`;

            // 如果按鈕導向 LLM 解讀功能，設定特定的點擊處理器
            if (button.nextSection === "interpretMysteriousPaper") {
                onClickHandler = `showSection('interpretMysteriousPaper')`; // 直接呼叫 showSection 來觸發 LLM 邏輯
            } else if (isEnding && isAchieved && !isDeathEndingTrigger) { 
                buttonClass += " disabled";
                // 如果已達成且不是死亡結局的觸發按鈕，則點擊後顯示模態視窗
                // 注意：這裡需要對單引號進行轉義，以避免 JavaScript 語法錯誤
                onClickHandler = `showModal('${endingSummaries[button.nextSection]}', '${storyData[button.nextSection].text.replace(/'/g, "\\'").replace(/\n/g, "\\n")}')`; 
            }
            return `<button class="${buttonClass}" onclick="${onClickHandler}">${button.text}</button>`;
        }).join('')}
      </section>
    `;

    main.innerHTML = sectionHTML;

    // Check if the current section is an ending, and if so, record it
    if (endingSummaries.hasOwnProperty(sectionId)) {
      recordEnding(sectionId); // Record the ending ID
    }
}

/**
 * Records an achieved ending.
 * @param {string} endingId The ID of the achieved ending.
 */
function recordEnding(endingId) {
  if (!achievedEndings.includes(endingId)) {
    achievedEndings.push(endingId);
    saveAchievedEndings(); // Save to local storage
    updateEndingLogDisplay(); // Update the display
    
    // Show the modal for the newly achieved ending
    const endingTitle = endingSummaries[endingId] || "未知結局";
    const endingText = storyData[endingId].text; // Get the full text of the ending
    // 確保 showModal 函數在鬼影幢幢.html 中已定義
    if (typeof showModal === 'function') {
        showModal(endingTitle, endingText);
    } else {
        console.warn('showModal 函數未定義。請確保鬼影幢幢.html 已正確載入。');
    }
  }
}

/**
 * Updates the display of the ending log.
 */
function updateEndingLogDisplay() {
  const endingList = document.getElementById('ending-list');
  if (endingList) {
    endingList.innerHTML = achievedEndings.map(endingId => {
      const summary = endingSummaries[endingId] || "未知結局";
      return `<li>${summary}</li>`;
    }).join('');
  } else {
    console.warn('找不到 ending-list 元素。');
  }
}

// showModal 和 closeModal 函數在鬼影幢幢.html 中定義，因為它們直接操作 DOM 元素。
// 這裡不再重複定義，確保它們是全域可用的。
// 如果您將此文件獨立運行，則需要在此處定義它們：
/*
const endingModal = document.getElementById('endingModal');
const achievedEndingTitle = document.getElementById('achievedEndingTitle');
const achievedEndingText = document.getElementById('achievedEndingText');

function showModal(title, text) {
  if (achievedEndingTitle && achievedEndingText && endingModal) {
    achievedEndingTitle.innerText = title;
    achievedEndingText.innerHTML = text.replace(/\n/g, '<br>');
    endingModal.style.display = 'flex';
  } else {
    console.error('Modal 元素未找到，無法顯示模態視窗。');
  }
}

function closeModal() {
  if (endingModal) {
    endingModal.style.display = 'none';
  }
}
*/
