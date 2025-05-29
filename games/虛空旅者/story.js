const storyData = {
    "gameIntro": {
        text: "歡迎來到《虛空旅者》！\n\n你是一名時空旅行者，代號「紅翼」。你的任務是駕駛克羅諾斯號，探索位於已知宇宙邊緣的神秘虛空。\n\n虛空並非空無一物，而是充滿了扭曲的時空斷層和未知的危險。你的每一個決定都至關重要。\n\n總共有25個結局，祝你旅途順利！",
        buttons: [
            { text: "開始探索", nextSection: "prologue" }
        ]
    },

    "prologue": {
        text: "你坐在克羅諾斯號的艦橋上，虛空在你眼前展開。無數星辰的光芒被扭曲成詭異的色彩，時空的漣漪清晰可見。\n\n艦上的探測器發出警告：前方發現一個不穩定的時空斷層，你必須做出決定。",
        buttons: [
            { text: "直接穿越斷層", nextSection: "jumpThroughRift" },
            { text: "嘗試繞過斷層", nextSection: "avoidRift" },
            { text: "派出無人探測機偵察", nextSection: "sendProbe" }
        ]
    },

    "jumpThroughRift": {
        text: "你選擇直接穿越時空斷層。克羅諾斯號劇烈震動，警報聲響徹艦橋。你感覺時間和空間都失去了意義。\n\n穿梭機成功通過了斷層，但導航系統嚴重受損，且能量核心不穩定。你發現自己身處一個完全陌生的星系。",
        buttons: [
            { text: "掃描周圍星系", nextSection: "scanNewGalaxy" },
            { text: "嘗試修復導航系統", nextSection: "repairNavigation" },
            { text: "緊急關閉次要系統以穩定能量核心", nextSection: "stabilizeCore" }
        ]
    },

	"stabilizeCore": {
		text: "你決定優先穩定能量核心。你緊急關閉了次要的環境維持系統和推進器增幅器，能量核心恢復了穩定，但是你失去了很多推進功率和應急維生功能。",
		buttons: [
			{ text: "掃描周圍星系", nextSection: "scanNewGalaxy" },
            { text: "嘗試修復導航系統", nextSection: "repairNavigation" }
		]
	},

    "avoidRift": {
        text: "你決定繞過時空斷層。克羅諾斯號緩慢地調整航向，但前方卻出現了一片漂浮的殘骸，似乎是某個失落文明的遺物。\n\n你會...",
        buttons: [
            { text: "仔細檢查殘骸", nextSection: "examineWreckage" },
            { text: "繼續前進", nextSection: "continueJourney" }
        ]
    },

    "sendProbe": {
        text: "你派出一架無人探測機前往偵察時空斷層。探測機傳回了令人不安的影像：斷層內部充滿了未知能量，似乎還存在著某種生命形式。\n\n探測機突然失去信號，你會...",
        buttons: [
            { text: "進入斷層尋找探測機", nextSection: "searchForProbe" },
            { text: "放棄探測機，繼續探索", nextSection: "continueJourney" }
        ]
    },

    "scanNewGalaxy": {
        text: "你啟動了掃描儀，分析周圍的星系。數據顯示，這裡的物理法則與已知宇宙存在差異，甚至連時間的流逝速度都不同。\n\n你發現一顆行星，上面存在著某種形式的能量反應，你會...",
        buttons: [
            { text: "前往行星探查", nextSection: "visitPlanet" },
            { text: "繼續探索星系", nextSection: "exploreGalaxy" }
        ]
    },

    "repairNavigation": {
        text: "你開始嘗試修復損壞的導航系統。經過數小時的努力，你終於成功地恢復了部分功能。\n\n現在，你可以嘗試定位返回已知宇宙的路線，或者繼續探索這個陌生的星系。",
        buttons: [
            { text: "定位返回路線", nextSection: "locateReturnRoute" },
            { text: "繼續探索星系", nextSection: "exploreGalaxy" }
        ]
    },

    "examineWreckage": {
        text: "你仔細檢查漂浮的殘骸，發現了一些古代文字和科技裝置。通過分析這些資訊，你得知這是一個曾經高度發達的文明，但最終被虛空的力量所吞噬。\n\n你會...",
        buttons: [
            { text: "嘗試修復一個科技裝置", nextSection: "repairDevice" },
            { text: "記錄發現，繼續前進", nextSection: "continueJourney" }
        ]
    },

    "searchForProbe": {
        text: "你冒險進入時空斷層，尋找失去信號的探測機。斷層內部充滿了扭曲的能量，你的船體不斷受到損害。\n\n你終於找到了探測機的殘骸，但同時也發現了一個巨大的、未知的生命體正在靠近...",
        buttons: [
            { text: "與生命體戰鬥", nextSection: "fightEntity" },
            { text: "立刻逃離斷層", nextSection: "fleeRift" }
        ]
    },

	"fightEntity": {
		text: "你決定與虛空生命體戰鬥。你啟動了克羅諾斯號的武器系統，向生命體發動攻擊。然而，你的武器對它似乎毫無作用，生命體輕鬆地擊穿了你的護盾。\n\n你會...",
		buttons: [
			{ text: "發動引擎進行規避", nextSection: "avoidAttack" },
			{ text: "啟動克羅諾斯號自毀程式", nextSection: "selfDestruct" }
		]
	},

	"avoidAttack": {
		text: "你嘗試發動引擎進行規避。克羅諾斯號靈活地閃避了生命體的攻擊，但你也耗盡了大量的能量。\n\n你會...",
		buttons: [
			{ text: "再次發動攻擊", nextSection: "fightEntity" },
			{ text: "立刻逃離斷層", nextSection: "fleeRiftFromAvoid" } // 新增一個逃離分支
		]
	},

	"fleeRiftFromAvoid": {
		text: "你耗盡了能量，勉強脫離了虛空生物的攻擊範圍。克羅諾斯號損壞嚴重，你只能艱難地維持航行。\n\n克羅諾斯號最終解體，你葬身於虛空之中。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"selfDestruct": {
		text: "你啟動了克羅諾斯號自毀程式。你希望阻止生命體離開時空斷層，保護其他時空的安全。隨著一陣耀眼的光芒，克羅諾斯號與生命體一同消失在虛空之中。\n\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

    "visitPlanet": {
        text: "你駕駛克羅諾斯號前往行星。行星表面佈滿了奇異的植物和建築，空氣中瀰漫著一種淡淡的能量。\n\n你會...",
        buttons: [
            { text: "登陸行星，進行探索", nextSection: "explorePlanet" },
            { text: "遠程掃描行星，繼續探索星系", nextSection: "scanPlanetRemotely" } // 修改為更明確的選項
        ]
    },

	"scanPlanetRemotely": {
		text: "你決定遠程掃描行星，而不登陸。掃描結果顯示，這顆行星蘊含著豐富的資源，但同時也存在著一些未知的危險。\n\n你缺乏足夠的資源來安全地開採這些資源，因此你選擇繼續前進。",
		buttons: [
			{ text: "繼續探索星系", nextSection: "exploreGalaxy" }
		]
	},

	"explorePlanet": {
		text: "你登陸行星，開始探索。你發現了一些古代遺跡，上面刻著奇怪的符號。你會...",
		buttons: [
			{ text: "翻譯這些符號", nextSection: "translateSymbols" },
			{ text: "收集樣本，離開行星", nextSection: "collectSamples" }
		]
	},

	"translateSymbols": {
		text: "你嘗試翻譯這些符號，發現它們記載著關於虛空的古老知識。你得知虛空並非完全隨機，而是由一些隱藏的法則所支配。\n\n你會...",
		buttons: [
			{ text: "深入研究這些法則", nextSection: "studyLaws" },
			{ text: "記錄發現，離開行星", nextSection: "collectSamples" }
		]
	},

	"studyLaws": {
		text: "你深入研究這些法則，發現它們可以幫助你更好地控制時空穿梭。你學會了如何更有效地利用克羅諾斯號的能量，並避免一些危險的時空陷阱。\n\n(你獲得了新的技能：時空掌握)",
		buttons: [
			{ text: "離開行星", nextSection: "exploreGalaxy" }
		]
	},

	"collectSamples": {
		text: "你收集了一些植物、礦物和空氣樣本，準備帶回研究。在離開行星之前，你發現了一個隱藏的洞穴。",
		buttons: [
			{ text: "進入洞穴", nextSection: "enterCave" },
			{ text: "離開行星", nextSection: "exploreGalaxy" } // 修改為直接跳轉
		]
	},

	"enterCave": {
		text: "你進入了洞穴，發現裡面充滿了發光的晶體。這些晶體散發著強烈的能量，讓你感到非常舒服。\n\n你會...",
		buttons: [
			{ text: "觸摸晶體", nextSection: "touchCrystals" },
			{ text: "收集一些晶體", nextSection: "collectCrystals" },
			{ text: "無視晶體，離開洞穴", nextSection: "leaveCave"}
		]
	},

	"touchCrystals": {
		text: "你觸摸了晶體，一股強大的能量湧入你的身體。你感覺自己與虛空融為一體，可以隨意操縱時空。\n\n(你獲得了新的能力：虛空之力)\n\n你會...",
		buttons: [
			{ text: "離開洞穴", nextSection: "leaveCaveAfterTouch" }, // 修改為跳轉到新區塊
			{ text: "將身體完全浸入晶體之中", nextSection: "immerseCrystals"}
		]
	},

	"leaveCaveAfterTouch": {
		text: "你離開洞穴，身上帶著新獲得的虛空之力。你感受到自己與克羅諾斯號的連接更加緊密，你準備好面對任何挑戰。",
		buttons: [
			{ text: "繼續探索", nextSection: "exploreGalaxy" } // 繼續探索
		]
	},

	"immerseCrystals": {
		text: "你將身體完全浸入晶體之中，你感受到無盡的能量湧入你的身體。\n最終，你的身體無法承受如此巨大的能量，你灰飛煙滅。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"collectCrystals": {
		text: "你收集了一些晶體，準備帶回研究。當你離開洞穴時，發現一個巨大的陰影籠罩了你。",
		buttons: [
			{ text: "轉身面對陰影", nextSection: "faceShadow" },
			{ text: "立刻逃離", nextSection: "fleeFromCave" } // 修改為逃離洞穴
		]
	},

	"fleeFromCave": {
		text: "你立刻逃離洞穴，但虛空生物追了上來。你跑回克羅諾斯號，並迅速啟動引擎。\n\n你成功逃脫，但克羅諾斯號的引擎受到損壞，你必須在下一次時空穿梭前進行維修。",
		buttons: [
			{ text: "繼續探索", nextSection: "exploreGalaxy" } // 繼續探索
		]
	},

	"leaveCave": {
		text: "你無視晶體，離開洞穴。你沒有從晶體中獲得任何力量，你的旅程將更加艱難。",
		buttons: [
			{ text: "離開行星", nextSection: "exploreGalaxy" } // 繼續探索
		]
	},

	"faceShadow": {
		text: "你轉身面對陰影，發現那是一個巨大的虛空生物，正用飢渴的眼神看著你。\n你會...",
		buttons: [
			{ text: "嘗試與虛空生物溝通", nextSection: "talkToShadow" },
			{ text: "使用武器攻擊", nextSection: "attackShadow" }
		]
	},

	"talkToShadow": {
		text: "你嘗試與虛空生物溝通，但牠似乎無法理解你的語言。牠只是發出低沉的咆哮，向你逼近。\n你會...",
		buttons: [
			{ text: "逃跑", nextSection: "fleeFromShadow" },
			{ text: "戰鬥", nextSection: "attackShadow" }
		]
	},

	"fleeFromShadow": {
		text: "你轉身逃跑，但虛空生物的速度更快，牠輕鬆地抓住了你。\n牠把你撕成碎片。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"attackShadow": {
		text: "你使用武器攻擊虛空生物，但牠的身體似乎不受物理攻擊影響。牠輕鬆地將你吞噬。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

    "continueJourney": {
        text: "你決定繼續前進，探索虛空的其他地方。克羅諾斯號在星空中航行，你不知道前方等待著你的是什麼。",
        buttons: [
            { text: "掃描附近區域", nextSection: "scanArea" },
            { text: "調整航向，前往未知區域", nextSection: "setCourse" }
        ]
    },

	"scanArea": {
		text: "你啟動了掃描儀，分析附近區域。你發現了一些異常的能量波動，似乎來自一個古老的結構。",
		buttons: [
			{ text: "前往古老結構", nextSection: "goToStructure" },
			{ text: "忽略異常波動，繼續前進", nextSection: "exploreGalaxy" }
		]
	},

	"goToStructure": {
		text: "你駕駛克羅諾斯號前往古老結構。這個結構看起來像是一個巨大的傳送門，散發著強烈的能量。\n\n你會...",
		buttons: [
			{ text: "進入傳送門", nextSection: "enterPortal" },
			{ text: "分析傳送門的能量", nextSection: "analyzePortal" }
		]
	},

	"analyzePortal": {
		text: "你嘗試分析傳送門的能量，但數據顯示它超出了你的理解範圍。傳送門似乎通往一個完全不同的維度。\n\n你會...",
		buttons: [
			{ text: "進入傳送門", nextSection: "enterPortal" },
			{ text: "放棄分析，繼續前進", nextSection: "exploreGalaxy" }
		]
	},

	"enterPortal": {
		text: "你決定進入傳送門。克羅諾斯號被傳送到一個完全不同的維度。這裡的時空法則與已知宇宙完全不同，你感到非常迷茫。\n\n你會...",
		buttons: [
			{ text: "探索這個維度", nextSection: "exploreDimension" },
			{ text: "嘗試返回", nextSection: "tryToReturn" }
		]
	},

    "exploreGalaxy": {
        text: "你繼續探索星系，尋找新的行星、資源和秘密。你的旅程充滿了未知和危險。",
        buttons: [
            { text: "遇到時空風暴", nextSection: "timeStorm" },
            { text: "發現未知信號", nextSection: "unknownSignal" }
        ]
    },

	"timeStorm": {
		text: "你在星系中航行時，突然遇到一場強烈的時空風暴。克羅諾斯號被風暴捲入，你無法控制它的方向。\n你會...",
		buttons: [
			{ text: "嘗試控制克羅諾斯號", nextSection: "controlCronos" },
			{ text: "啟動緊急逃生系統", nextSection: "escapePod" }
		]
	},

	"controlCronos": {
		text: "你奮力嘗試控制克羅諾斯號，但時空風暴的力量太過強大。你最終失去了控制，克羅諾斯號被撕成碎片。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"escapePod": {
		text: "你啟動了緊急逃生系統，乘坐逃生艙離開克羅諾斯號。你漂浮在虛空中，等待救援。\n然而，救援永遠不會到來。你最終在逃生艙中耗盡了氧氣。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"unknownSignal": {
		text: "你在星系中航行時，收到一個未知的信號。信號來源未知，內容也無法破譯。\n你會...",
		buttons: [
			{ text: "追蹤信號來源", nextSection: "trackSignal" },
			{ text: "忽略信號，繼續探索", nextSection: "exploreGalaxy" }
		]
	},

	"trackSignal": {
		text: "你決定追蹤信號來源。經過數小時的航行，你來到一個黑暗的星雲。\n在星雲深處，你發現一個巨大的、廢棄的太空站。\n你會...",
		buttons: [
			{ text: "進入太空站", nextSection: "enterStation" },
			{ text: "遠程掃描太空站", nextSection: "scanStationRemotely" }
		]
	},

	"scanStationRemotely": {
		text: "你決定遠程掃描太空站。掃描結果顯示，太空站內部充滿了危險的生物和陷阱。\n你判斷進入太空站風險過高，決定離開。",
		buttons: [
			{ text: "離開星雲", nextSection: "exploreGalaxy" }
		]
	},

	"enterStation": {
		text: "你決定進入太空站。內部一片黑暗和寂靜，只有微弱的紅光閃爍。\n你會...",
		buttons: [
			{ text: "探索太空站", nextSection: "exploreStation" },
			{ text: "尋找信號來源", nextSection: "findSignalSource" }
		]
	},

	"exploreStation": {
		text: "你開始探索太空站。在一個房間裡，你發現了一些古代的記錄，記載著太空站過去發生的恐怖事件。\n你會...",
		buttons: [
			{ text: "閱讀記錄", nextSection: "readRecords" },
			{ text: "離開房間", nextSection: "enterStation" }
		]
	},

	"readRecords": {
		text: "你閱讀記錄，得知太空站曾經是一個科學實驗基地，但實驗最終失控，導致所有人都死亡。\n你感到一陣寒意，決定立刻離開太空站。\n但在離開之前，你突然聽到一聲尖叫...\n你會...",
		buttons: [
			{ text: "調查尖叫聲", nextSection: "investigateScream" },
			{ text: "立刻逃離太空站", nextSection: "fleeStation" }
		]
	},

	"investigateScream": {
		text: "你決定調查尖叫聲。你跟著聲音來到一個封閉的房間，裡面傳出陣陣惡臭。\n你打開房間，發現一個怪物正在啃食屍體。\n怪物轉身看向你，發出恐怖的咆哮...\n你會...",
		buttons: [
			{ text: "與怪物戰鬥", nextSection: "fightMonster" },
			{ text: "逃跑", nextSection: "fleeStation" }
		]
	},

	"fightMonster": {
		text: "你決定與怪物戰鬥。你使用武器攻擊怪物，但牠的身體堅硬無比，你的攻擊毫無作用。\n怪物輕鬆地將你撕成碎片。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"fleeStation": {
		text: "你轉身逃離太空站，但怪物緊追不捨。你跑到克羅諾斯號，啟動引擎，準備逃離。\n但在起飛之前，怪物跳上了克羅諾斯號，並摧毀了引擎。\n克羅諾斯號墜毀在太空站上，你與怪物一同死亡。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"findSignalSource": {
		text: "你決定尋找信號來源。你一路跟著信號來到太空站的中央控制室。在控制室裡，你發現一台古老的電腦。\n電腦螢幕上顯示著一段文字：『歡迎來到虛空。你永遠無法逃脫。』\n電腦突然發射出一道能量束，擊中你的身體。你感到一陣劇痛，然後失去了意識。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

    "exploreDimension": {
        text: "你開始探索這個陌生的維度。這裡的景色奇異而美麗，但同時也充滿了危險。\n你會...",
        buttons: [
            { text: "遇到維度生物", nextSection: "meetDimensionCreature" },
            { text: "發現維度裂縫", nextSection: "findDimensionRift" }
        ]
    },

	"meetDimensionCreature": {
		text: "你在探索維度時，遇到一個奇特的生物。牠看起來像是能量和物質的混合體，散發著柔和的光芒。\n你會...",
		buttons: [
			{ text: "嘗試與生物溝通", nextSection: "talkToCreature" },
			{ text: "攻擊生物", nextSection: "attackCreature" }
		]
	},

	"talkToCreature": {
		text: "你嘗試與生物溝通。牠似乎可以理解你的意圖，並向你展示了一些關於這個維度的景象。\n你得知這個維度曾經是一個繁榮的文明，但最終被一場災難所摧毀。\n生物告訴你，有一種方法可以離開這個維度，但需要付出巨大的代價。\n你會...",
		buttons: [
			{ text: "接受代價，離開維度", nextSection: "payThePrice" },
			{ text: "拒絕代價，繼續探索", nextSection: "exploreDimension" }
		]
	},

	"payThePrice": {
		text: "你決定接受代價，離開維度。生物告訴你，你必須放棄你最珍視的東西。\n你思考了很久，最終決定放棄你的記憶。你願意忘記你過去的一切，只為了回到原本的時空。\n你成功離開了維度，但你卻忘記了你是誰，你從哪裡來，你要去哪裡。\n你成為了一個迷失在虛空的靈魂。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"attackCreature": {
		text: "你決定攻擊這個維度生物。你認為牠對你懷有敵意，你必須先下手為強。\n然而，你的攻擊對牠毫無作用。牠只是發出悲鳴，然後消失在空氣中。\n你突然感到一陣強烈的罪惡感。你毀滅了一個無辜的生命，你也失去了離開這個維度的機會。\n你永遠被困在這個維度之中。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"findDimensionRift": {
		text: "你在探索維度時，發現一個維度裂縫。裂縫看起來像是時空的一個漏洞，通往一個未知的世界。\n你會...",
		buttons: [
			{ text: "進入維度裂縫", nextSection: "enterDimensionRift" },
			{ text: "分析維度裂縫", nextSection: "analyzeDimensionRift" }
		]
	},

	"analyzeDimensionRift": {
		text: "你嘗試分析維度裂縫，但數據顯示它極其不穩定，隨時可能崩潰。\n你會...",
		buttons: [
			{ text: "進入維度裂縫", nextSection: "enterDimensionRift" },
			{ text: "離開裂縫區域", nextSection: "exploreDimension" }
		]
	},

	"enterDimensionRift": {
		text: "你決定進入維度裂縫。克羅諾斯號被傳送到一個完全陌生的世界。這裡的一切都顛倒了，重力消失了，時空也失去了意義。\n你感到非常不適，你開始失去理智。\n最終，你被這個世界的瘋狂所吞噬。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

    "tryToReturn": {
        text: "你決定嘗試返回。你啟動了克羅諾斯號的引擎，準備穿越傳送門。\n然而，傳送門已經關閉了，你無法回到原本的時空。\n你被困在這個陌生的維度之中，永遠也無法回家。\n(遊戲結束)",
        buttons: [
            { text: "重新開始", nextSection: "gameIntro" }
        ]
    },

    "endingLostInVoid": {
        text: "克羅諾斯號的能量耗盡，導航系統完全癱瘓。你迷失在虛空中，永遠也無法回到原本的時空。\n\n(遊戲結束)",
        buttons: [
            { text: "重新開始", nextSection: "gameIntro" }
        ]
    },

    "endingReturnHome": {
        text: "你成功修復了導航系統，並找到了返回原本時空的通道。你帶著虛空的秘密，回到了你的時代。\n\n(遊戲結束)",
        buttons: [
            { text: "重新開始", nextSection: "gameIntro" }
        ]
    },

    "endingAncientKnowledge": {
      text: "你掌握了失落文明的知識，成為了時空旅行的宗師，可以自由穿梭於各個時代。\n\n(遊戲結束)",
      buttons: [
          { text: "重新開始", nextSection: "gameIntro" }
      ]
  },

  "endingVoidCorrupted": {
      text: "你受到了虛空力量的侵蝕，失去了自我意識，成為了虛空的一部分。\n\n(遊戲結束)",
      buttons: [
          { text: "重新開始", nextSection: "gameIntro" }
      ]
  },

  "endingSelfDestruct": {
      text: "你犧牲了自己，阻止了虛空生命體入侵其他時空。你的英勇事蹟將被永遠銘記。\n\n(遊戲結束)",
      buttons: [
          { text: "重新開始", nextSection: "gameIntro" }
      ]
  },

  "endingVoidMaster": {
    text: "你完全掌握了虛空的力量，成為了虛空的主宰者。你可以隨意創造和摧毀時空，成為了宇宙中最強大的存在。\n\n(遊戲結束)",
    buttons: [
        { text: "重新開始", nextSection: "gameIntro" }
    ]
},

	"immerseCrystals": {
		text: "你將身體完全浸入晶體之中，你感受到無盡的能量湧入你的身體。\n最終，你的身體無法承受如此巨大的能量，你灰飛煙滅。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"endingPlanetDestroyed": {
		text: "由於過於專注於探索洞穴，你沒有注意到越來越不穩定的能量讀數。當你回到克羅諾斯號時，行星開始瓦解。\n克羅諾斯號被行星爆炸摧毀。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"endingEatenByShadow": {
		text: "你轉身逃跑，但虛空生物的速度更快，牠輕鬆地抓住了你。\n牠把你撕成碎片。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"endingConsumedByShadow": {
		text: "你使用武器攻擊虛空生物，但牠的身體似乎不受物理攻擊影響。牠輕鬆地將你吞噬。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"controlCronos": {
		text: "你奮力嘗試控制克羅諾斯號，但時空風暴的力量太過強大。你最終失去了控制，克羅諾斯號被撕成碎片。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"escapePod": {
		text: "你啟動了緊急逃生系統，乘坐逃生艙離開克羅諾斯號。你漂浮在虛空中，等待救援。\n然而，救援永遠不會到來。你最終在逃生艙中耗盡了氧氣。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"fightMonster": {
		text: "你決定與怪物戰鬥。你使用武器攻擊怪物，但牠的身體堅硬無比，你的攻擊毫無作用。\n怪物輕鬆地將你撕成碎片。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"fleeStation": {
		text: "你轉身逃離太空站，但怪物緊追不捨。你跑到克羅諾斯號，啟動引擎，準備逃離。\n但在起飛之前，怪物跳上了克羅諾斯號，並摧毀了引擎。\n克羅諾斯號墜毀在太空站上，你與怪物一同死亡。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"findSignalSource": {
		text: "你決定尋找信號來源。你一路跟著信號來到太空站的中央控制室。在控制室裡，你發現一台古老的電腦。\n電腦螢幕上顯示著一段文字：『歡迎來到虛空。你永遠無法逃脫。』\n電腦突然發射出一道能量束，擊中你的身體。你感到一陣劇痛，然後失去了意識。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"enterDimensionRift": {
		text: "你決定進入維度裂縫。克羅諾斯號被傳送到一個完全陌生的世界。這裡的一切都顛倒了，重力消失了，時空也失去了意義。\n你感到非常不適，你開始失去理智。\n最終，你被這個世界的瘋狂所吞噬。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"tryToReturn": {
		text: "你決定嘗試返回。你啟動了克羅諾斯號的引擎，準備穿越傳送門。\n然而，傳送門已經關閉了，你無法回到原本的時空。\n你被困在這個陌生的維度之中，永遠也無法回家。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"payThePrice": {
		text: "你決定接受代價，離開維度。生物告訴你，你必須放棄你最珍視的東西。\n你思考了很久，最終決定放棄你的記憶。你願意忘記你過去的一切，只為了回到原本的時空。\n你成功離開了維度，但你卻忘記了你是誰，你從哪裡來，你要去哪裡。\n你成為了一個迷失在虛空的靈魂。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"attackCreature": {
		text: "你決定攻擊這個維度生物。你認為牠對你懷有敵意，你必須先下手為強。\n然而，你的攻擊對牠毫無作用。牠只是發出悲鳴，然後消失在空氣中。\n你突然感到一陣強烈的罪惡感。你毀滅了一個無辜的生命，你也失去了離開這個維度的機會。\n你永遠被困在這個維度之中。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"fleeRiftFromAvoid": {
		text: "你耗盡了能量，勉強脫離了虛空生物的攻擊範圍。克羅諾斯號損壞嚴重，你只能艱難地維持航行。\n\n克羅諾斯號最終解體，你葬身於虛空之中。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"locateReturnRoute": {
		text: "你嘗試定位返回已知宇宙的路線。經過計算，你發現了一個不穩定的時空通道，但穿越它需要冒很大的風險。\n\n你會...",
		buttons: [
			{ text: "穿越時空通道", nextSection: "crossReturnChannel" },
			{ text: "放棄返回，繼續探索", nextSection: "exploreGalaxy" }
		]
	},

	"crossReturnChannel": {
		text: "你決定穿越時空通道。克羅諾斯號在通道中劇烈震動，你感到時間和空間都在扭曲。你不知道會被傳送到哪裡。\n\n克羅諾斯號最終成功穿越通道，但你發現自己被傳送到了過去，回到了地球的古代。\n你會...",
		buttons: [
			{ text: "探索古代地球", nextSection: "exploreAncientEarth" },
			{ text: "嘗試回到現代", nextSection: "tryToReturnToPresent" }
		]
	},

	"exploreAncientEarth": {
		text: "你駕駛克羅諾斯號降落在古代地球上。你發現這裡充滿了原始的風景和未知的危險。\n\n你會...",
		buttons: [
			{ text: "遇到原始部落", nextSection: "meetTribes" },
			{ text: "搜尋古代遺跡", nextSection: "searchForRelics" }
		]
	},

	"meetTribes": {
		text: "你遇到一個原始部落。他們對你的飛船感到恐懼和敬畏。你會...",
		buttons: [
			{ text: "與部落建立聯繫", nextSection: "befriendTribes" },
			{ text: "避開部落，繼續探索", nextSection: "avoidTribes" }
		]
	},

	"befriendTribes": {
		text: "你嘗試與部落建立聯繫。你用你的知識和科技幫助他們改善生活，並贏得了他們的信任。\n\n隨著時間的流逝，你成為了部落的領袖。你決定放棄回到現代的機會，永遠留在古代地球。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"avoidTribes": {
		text: "你決定避開部落，繼續探索。你不想改變古代地球的歷史，你只想找到回到現代的方法。\n\n你在古代地球上流浪了很久，但你始終找不到回到現代的方法。最終，你死在了這片陌生的土地上。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"searchForRelics": {
		text: "你開始搜尋古代遺跡，希望能找到一些可以幫助你回到現代的線索。\n\n你在一個古代神廟中發現了一個神秘的裝置。你嘗試啟動它，但裝置卻爆炸了，你被炸成了碎片。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"tryToReturnToPresent": {
		text: "你嘗試回到現代，但你沒有足夠的能量來穿越時空。克羅諾斯號被困在古代地球，你永遠也無法回到你的時代。\n\n你最終死在了古代地球上，你的名字和你的故事也將被時間所遺忘。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"repairDevice": {
		text: "你決定嘗試修復一個科技裝置。經過一番努力，你成功地啟動了它。裝置發射出一道能量束，擊中你的身體。\n\n你感到一陣劇痛，然後失去了意識。當你醒來時，你發現自己變成了一個機器人。你失去了你的人性，你只是一個冰冷的機器。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	},

	"setCourse": {
		text: "你調整航向，前往未知區域。你渴望探索虛空深處的秘密，你不想錯過任何機會。\n\n你在虛空中航行了很久，但你始終沒有發現任何新的東西。虛空是無盡的空虛，你開始感到絕望。\n\n最終，你因為精神崩潰而自殺。\n(遊戲結束)",
		buttons: [
			{ text: "重新開始", nextSection: "gameIntro" }
		]
	}
};

const endingLog = [];

const endingSummaries = {
    "endingLostInVoid": "壞結局一：迷失虛空",
    "endingReturnHome": "真結局：重返家園",
    "endingAncientKnowledge": "好結局：掌握古老知識",
    "endingVoidCorrupted": "壞結局二：虛空腐化",
    "endingSelfDestruct": "結局一：自我犧牲", // 可以被認為是好結局，因為阻止了更大的災難
    "endingVoidMaster": "結局二：虛空主宰", // 可能是好結局，也可能是壞結局，取決於主宰者如何使用力量
	"immerseCrystals": "壞結局三：能量超載",
	"endingPlanetDestroyed": "壞結局四：星球崩毀",
	"endingEatenByShadow": "壞結局五：遭影吞噬",
	"endingConsumedByShadow": "壞結局六：被影吞食",
	"controlCronos": "壞結局七：風暴粉碎",
	"escapePod": "壞結局八：逃生艙窒息",
	"fightMonster": "壞結局九：怪物撕裂",
	"fleeStation": "壞結局十：太空站墜毀",
	"findSignalSource": "壞結局十一：電腦洗腦",
	"enterDimensionRift": "壞結局十二：維度瘋狂",
	"tryToReturn": "壞結局十三：維度囚禁",
	"payThePrice": "壞結局十四：失憶",
	"attackCreature": "壞結局十五：維度永困",
	"fleeRiftFromAvoid": "壞結局十六：迫降",
	"befriendTribes": "好結局五：原始統治",
	"avoidTribes": "壞結局十七：異鄉孤魂",
	"searchForRelics": "壞結局十八：神廟爆炸",
	"tryToReturnToPresent": "壞結局十九：時間旅行失敗",
	"repairDevice": "壞結局二十：機械奴役",
	"setCourse": "壞結局二十一：精神崩潰"
};

function showSection(sectionId) {
    const section = storyData[sectionId];
    if (!section) {
        console.error(`Section with id "${sectionId}" not found.`);
        return;
    }

    const main = document.querySelector('main');
    let sectionHTML = `
      <section id="${sectionId}">
        <p>${section.text.replace(/\n/g, '<br>')}</p>
        ${section.buttons.map(button => `<button class="button" onclick="showSection('${button.nextSection}')">${button.text}</button>`).join('')}
      </section>
    `;

    main.innerHTML = sectionHTML;

    if (endingSummaries.hasOwnProperty(sectionId)) {
      const endingSummary = endingSummaries[sectionId] || "未知結局";
      recordEnding(endingSummary);
    }
}

function recordEnding(endingSummary) {
  if (!endingLog.includes(endingSummary)) {
    endingLog.push(endingSummary);
    updateEndingLogDisplay();
  }
}

function updateEndingLogDisplay() {
  const endingList = document.getElementById('ending-list');
  endingList.innerHTML = endingLog.map(ending => `<li>${ending}</li>`).join('');
}


showSection('gameIntro');