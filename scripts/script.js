function slotMachine() {
	//All element in HTML
	const coinStats = document.querySelector("#coin");
	const scoreStats = document.querySelector("#score");
	let inputCoinInSlotMachine = parseInt(
		document.querySelector("#userCoinInSlotMachine").value
	);
	const displayEvent = document.querySelector("#displayEventText");
	const displayEventBackground = document.querySelector("#displayEvent");
	const displayWinLose = document.querySelector("#displayWinLose");
	const displayWinBox = document.querySelector("#displayWin");
	let freeSpinCounter = document.querySelector("#freeSpinCounter");
	const startBtn = document.querySelector("#startBtn");
	const freeSpinBtn = document.querySelector("#freeSpinBtn");
	const refreshBtn = document.querySelector("#refreshBtn");
	const firstFrame = document.querySelector("#firstFrame");
	const secondFrame = document.querySelector("#secondFrame");
	const thirdFrame = document.querySelector("#thirdFrame");

	//User Object to save Coin and Pity
	let userStats = {
		coin: parseInt(coinStats.textContent),
		score: 0,
		pityFive: [],
		pityThree: [],
		winStreak: [],
		winLose: "",
		freeSpinCount: 5,
		spinCount: 0,
		doubleWin: false,
		displayEvent: "",

		updateScore: function () {
			userStats.score += inputCoinInSlotMachine;
			scoreStats.innerText = userStats.score;
		},
		displayAllEvent: function (amount) {
			switch (userStats.displayEvent) {
				case "ScoreFreeSpin":
					displayEvent.innerText = "";
					displayEvent.innerText = "From Score Event: +1 Free Spin";
					displayEventBackground.style.background = "#00CF00";
					break;
				case "ScoreFreeMoney":
					displayEvent.innerText = "";
					displayEvent.innerText = "From Score Event: " + amount + " Coins";
					displayEventBackground.style.background = "#00CF00";
					break;
				case "ScoreFreeScore":
					displayEvent.innerText = "";
					displayEvent.innerText = "From Score Event: " + amount + " Score";
					displayEventBackground.style.background = "#00CF00";
					break;
				case "ScoreDoubleWin":
					displayEvent.innerText = "";
					displayEvent.innerText =
						"From Score Event: Win guaranteed and double the win";
					displayEventBackground.style.background = "#00CF00";
					break;
				case "ScoreJackPot":
					displayEvent.innerText = "";
					displayEvent.innerText =
						"From Score Event: JACKPOT! You got +" + amount + " Coins";
					displayEventBackground.style.background = "#00CF00";
					break;
				case "FrameWinCoin":
					displayEvent.innerText = "";
					displayEvent.innerText = "Same Picture: +" + amount + " Coins";
					displayEventBackground.style.background = "#00CF00";
					break;
				case "FrameFreeSpin":
					displayEvent.innerText = "";
					displayEvent.innerText = "Same Picture: +1 Free Spin";
					displayEventBackground.style.background = "#00CF00";
					break;
				case "FrameWinScore":
					displayEvent.innerText = "";
					displayEvent.innerText = "Same Picture: +" + amount + " Score";
					displayEventBackground.style.background = "#00CF00";
					break;
				default:
					displayEvent.innerText = "";
					displayEvent.innerText = "No event";
					displayEventBackground.style.background = "#f0f8ff";
					break;
			}
		},
	};

	//SlotMachine
	let slotMachineStats = {
		win: function () {
			let addCoin = 0;
			let betAmount = inputCoinInSlotMachine;
			if (betAmount <= 10) {
				addCoin = Math.floor(Math.random() * 10) + 1;
				if (userStats.winStreak.length >= 3) {
					console.log("without winStreak: " + addCoin);
					addCoin *= 2;
				}
				if (userStats.doubleWin) {
					addCoin *= 2;
				}
			} else {
				addCoin = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
				if (userStats.winStreak.length >= 3) {
					addCoin *= 2;
				}
				if (userStats.doubleWin) {
					addCoin *= 2;
				}
			}
			console.log(
				"YOUR WIN (with streak): %c" + addCoin,
				"color: orange; font-weight: bold"
			);
			winSound();
			userStats.coin -= betAmount;
			userStats.coin += addCoin;
			console.log("New Coin: " + userStats.coin);
			pity(true);
		},
		lose: function () {
			console.log(
				"lose Money amount: %c" + inputCoinInSlotMachine,
				"color: orange; font-weight: bold"
			);
			userStats.coin -= inputCoinInSlotMachine;
			console.log("New user money stats: " + userStats.coin);
			pity(false);
		},
		spin: function () {
			console.log("noPity");
			let randomFirstFrame = Math.floor(Math.random() * 7);
			let randomSecondFrame = Math.floor(Math.random() * 7);
			let randomThirdFrame = Math.floor(Math.random() * 7);

			if (userStats.doubleWin) {
				randomSecondFrame = randomFirstFrame;
				randomThirdFrame = randomFirstFrame;
			}

			createFrameIcon(randomFirstFrame, randomSecondFrame, randomThirdFrame);

			frameSpecialEvent.checkFrameSameNumber(
				randomFirstFrame,
				randomSecondFrame,
				randomThirdFrame
			);

			if (
				randomFirstFrame === randomSecondFrame &&
				randomSecondFrame === randomThirdFrame &&
				randomFirstFrame === randomThirdFrame
			) {
				displayWinLose.innerText = "";
				displayWinLose.innerText = "WIN!";
				displayWinBox.style.background = "#00CF00";
				slotMachineStats.win();
				displayWin();
			} else {
				displayWinLose.innerText = "";
				displayWinLose.innerText = "LOSE!";
				displayWinBox.style.background = "#CF0000";
				slotMachineStats.lose();
				displayLose();
			}
		},
		pitySpin: function () {
			console.log("pity");
			let randomFirstFrame = Math.floor(Math.random() * 7);
			let randomSecondFrame = randomFirstFrame;
			let randomThirdFrame = Math.floor(Math.random() * 7);

			if (userStats.doubleWin) {
				randomSecondFrame = randomFirstFrame;
				randomThirdFrame = randomFirstFrame;
			}

			createFrameIcon(randomFirstFrame, randomSecondFrame, randomThirdFrame);

			frameSpecialEvent.checkFrameSameNumber(
				randomFirstFrame,
				randomSecondFrame,
				randomThirdFrame
			);

			if (
				randomFirstFrame === randomSecondFrame &&
				randomSecondFrame === randomThirdFrame &&
				randomFirstFrame === randomThirdFrame
			) {
				displayWinLose.innerText = "";
				displayWinLose.innerText = "WIN!";
				displayWinBox.style.background = "#00CF00";
				slotMachineStats.win();
				displayWin();
			} else {
				displayWinLose.innerText = "";
				displayWinLose.innerText = "LOSE!";
				displayWinBox.style.background = "#CF0000";
				slotMachineStats.lose();
				displayLose();
			}
		},
		scoreCheckEvent: function () {
			userStats.doubleWin = false;
			userStats.spinCount++;

			if (
				userStats.score % 50 === 0 ||
				userStats.score % 33 === 0 ||
				userStats.spinCount % 5 === 0
			) {
				const chance = Math.random();
				if (chance <= 0.45) {
					slotMachineStats.scoreTriggerEvent();
				} else {
					console.log("No Score-Event: ", userStats.score);
				}
			} else {
				console.log("No score-event triggerd: ", userStats.score);
			}
		},
		scoreTriggerEvent: function () {
			const rewards = [
				{
					type: "Free Spin this round",
					chance: 0.4,
					action: slotMachineStats.freeSpin,
				},
				{ type: "free Money", chance: 0.25, action: slotMachineStats.freeCoin },
				{
					type: "free Score",
					chance: 0.245,
					action: slotMachineStats.freeScore,
				},
				{
					type: "Free Win with double the win",
					chance: 0.1,
					action: slotMachineStats.freeWinDouble,
				},
				{ type: "JackPot", chance: 0.005, action: slotMachineStats.JackPot },
			];

			let cumuluativeChance = 0;
			let chance = Math.random();

			for (let reward of rewards) {
				cumuluativeChance += reward.chance;
				if (chance <= cumuluativeChance) {
					console.log(`Reward: ${reward.type}`);
					reward.action();
					break;
				}
			}
		},
		freeSpin: function () {
			userStats.freeSpinCount += 1;
			freeSpinCounter.innerText = "";
			freeSpinCounter.innerText = userStats.freeSpinCount;
			userStats.displayEvent = "ScoreFreeSpin";
			userStats.displayAllEvent();
			eventSound();
		},
		freeCoin: function () {
			let scoreEventAddCoin = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
			userStats.coin += scoreEventAddCoin;
			coinStats.innerText = userStats.coin;
			userStats.displayEvent = "ScoreFreeMoney";
			userStats.displayAllEvent(scoreEventAddCoin);
			eventSound();
		},
		freeScore: function () {
			let scoreEventAddScore = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
			userStats.score += scoreEventAddScore;
			scoreStats.innerText = userStats.score;
			userStats.displayEvent = "ScoreFreeScore";
			userStats.displayAllEvent(scoreEventAddScore);
			eventSound();
		},
		freeWinDouble: function () {
			userStats.doubleWin = true;
			userStats.displayEvent = "ScoreDoubleWin";
			userStats.displayAllEvent();
			eventSound();
		},
		JackPot: function () {
			let jackpotCoin = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
			userStats.coin += jackpotCoin;
			console.log(
				"%cJACKPOT!!!",
				"color: lightgreen; font-weight: bold, font-size: 25px"
			);
			coinStats.innerText = userStats.coin;
			userStats.displayEvent = "ScoreJackPot";
			userStats.displayAllEvent(jackpotCoin);
			eventSound();
		},
	};

	frameSpecialEvent = {
		speicalEvent: [
			//Overwiev of the event on wich number
			{ name: "WinCoin", number: 0 },
			{ name: "nothing", number: 1 },
			{ name: "freeSpin", number: 2 },
			{ name: "nothing", number: 3 },
			{ name: "freeSpin", number: 4 },
			{ name: "nothing", number: 5 },
			{ name: "winScore", number: 6 },
		],
		nothing: function () {
			return;
		},
		winCoin: function () {
			let addCoin = Math.floor(Math.random() * 10) + 1;
			userStats.coin += addCoin;
			coinStats.innerText = userStats.coin;
			userStats.displayEvent = "FrameWinCoin";
			userStats.displayAllEvent(addCoin);
			eventSound();
		},
		winScore: function () {
			let addScore = Math.floor(Math.random() * 10) + 1;
			userStats.score += addScore;
			scoreStats.innerText = userStats.score;
			userStats.displayEvent = "FrameWinScore";
			userStats.displayAllEvent(addScore);
			eventSound();
		},
		freeSpinEvent: function () {
			userStats.freeSpinCount += 1;
			freeSpinCounter.innerText = "";
			freeSpinCounter.innerText = userStats.freeSpinCount;
			userStats.displayEvent = "FrameFreeSpin";
			userStats.displayAllEvent();
			eventSound();
		},
		checkFrameSameNumber: function (first, second, third) {
			if (first === second && first === third && second === third) {
				frameSpecialEvent.checkFrameWhichEvent(first);
			}
		},
		checkFrameWhichEvent: function (first) {
			switch (first) {
				case 0:
					console.log("SmaeFrameEvent: WinScore");
					frameSpecialEvent.winCoin();
					break;
				case 1:
				case 3:
				case 5:
					console.log("SmaeFrameEvent: nothing");
					frameSpecialEvent.nothing();
					break;
				case 2:
				case 4:
					console.log("SmaeFrameEvent: freeSpin");
					frameSpecialEvent.freeSpinEvent();
					break;
				case 6:
					console.log("SameFrameEvent: winScore");
					frameSpecialEvent.winScore();
					break;
				default:
					console.log(
						"ERROR: In specialEvent Object; Methode checkFrameWhichEvent. Line 223-241"
					);
			}
		},
	};

	function pity(winLose) {
		if (winLose) {
			userStats.pityFive = [];
			userStats.pityThree = [];
			userStats.winStreak.push("win");
			console.log("YOUR WIN-STREAK: " + userStats.winStreak);
		} else {
			if (inputCoinInSlotMachine < 10) {
				userStats.pityThree = [];
				if (userStats.pityThree.length === 0) {
					userStats.pityFive.push("lose");
				}
			} else if (inputCoinInSlotMachine > 10) {
				userStats.pityFive = [];
				if (userStats.pityFive.length === 0) {
					userStats.pityThree.push("lose");
				}
			}
			userStats.winStreak = [];
		}
	}

	function createFrameIcon(first, second, third) {
		firstFrame.innerHTML = "";
		secondFrame.innerHTML = "";
		thirdFrame.innerHTML = "";

		console.log("Value from SlotMachine " + first, second, third);
		console.log(userStats);

		const iconArray = [first, second, third];
		const frames = [firstFrame, secondFrame, thirdFrame];

		iconArray.forEach((element, index) => {
			const newDiv = document.createElement("div");

			switch (element) {
				case 0:
					newDiv.id = "apple";
					break;
				case 1:
					newDiv.id = "cherries";
					break;
				case 2:
					newDiv.id = "grapes";
					break;
				case 3:
					newDiv.id = "lemon";
					break;
				case 4:
					newDiv.id = "orange";
					break;
				case 5:
					newDiv.id = "plum";
					break;
				case 6:
					newDiv.id = "watermelon";
					break;
				default:
					console.log("In createFrameIcon; Switch: 'ERROR' ");
			}

			if (frames[index]) {
				frames[index].appendChild(newDiv);
			} else {
				console.log(`Error: Frame not found for index ${index}`);
			}
			animation(iconArray);
		});
	}

	function animation(iconArray) {
		console.log(iconArray);
		const frames = [firstFrame, secondFrame, thirdFrame];
		iconArray.forEach((element, index) => {
			const symbol = frames[index].firstChild;
			if (symbol) {
				symbol.classList.add("symbol");
			}
		});
	}

	function displayWin() {
		console.log("%cWin", "color: green; font-weight: bold");
		coinStats.innerHTML = "";
		coinStats.innerText = userStats.coin;
	}

	function displayLose() {
		console.log("%cLose", "color: red; font-weight: bold");
		coinStats.innerHTML = "";
		coinStats.innerText = userStats.coin;
	}
	function refresh() {
		if (
			window.confirm(
				"Are you sure you want to refresh? You will lose all your money and Score."
			)
		) {
			userStats.coin = 50;
			userStats.pityFive = [];
			userStats.pityThree = [];
			userStats.winStreak = [];
			userStats.score = 0;
			userStats.freeSpinCount = 0;

			userStats.displayEvent = "";
			userStats.displayAllEvent();

			coinStats.innerText = userStats.coin;
			scoreStats.innerText = userStats.score;
			freeSpinCounter.innerText = "No free Spins";
		}
	}

	function soundStart() {
		const clickSound = new Audio("../sounds/slotmachine-sound.wav");
		clickSound.currentTime = 0;
		clickSound.volume = 0.1;
		clickSound.play();
	}

	function winSound() {
		const clickSound = new Audio("../sounds/slotmachine-win.wav");
		clickSound.currentTime = 0;
		clickSound.volume = 0.2;
		setTimeout(() => {
			clickSound.play();
		}, 1500);
	}

	function eventSound() {
		const clickSound = new Audio("../sounds/slotmachine-event.wav");
		clickSound.currentTime = 0;
		clickSound.volume = 0.4;
		clickSound.play();
	}

	function checkBetValue(betValue) {
		if (isNaN(betValue)) {
			alert("BetValue can't be nothing!");
			coinStats.innerText = userStats.coin;
			scoreStats.innerText = userStats.score;
			return false;
		}
		if (betValue > 20 || betValue < 1) {
			alert(
				"The bet amount is in the wrong ranche! Pleas set your bet Value between 1-20."
			);
			return false;
		} else if (userStats.coin - betValue < 0) {
			alert("You are broke.");
			return false;
		}
		return true;
	}
	function checkPittyAndStartSpin() {
		if (userStats.pityFive.length >= 5) {
			slotMachineStats.pitySpin();
		} else if (userStats.pityThree.length >= 3) {
			slotMachineStats.pitySpin();
		} else {
			slotMachineStats.spin();
		}
	}

	function deactivate() {
		startBtn.classList.add("off");
		freeSpinBtn.classList.add("off");
		startBtn.removeEventListener("click", handleButton);
		freeSpinBtn.removeEventListener("click", handleButtonFreeSpin);
		setTimeout(() => {
			startBtn.addEventListener("click", handleButton);
			startBtn.classList.remove("off");
			freeSpinBtn.addEventListener("click", handleButtonFreeSpin);
			freeSpinBtn.classList.remove("off");
		}, 2000);
	}

	startBtn.addEventListener("click", handleButton);

	function handleButton() {
		deactivate();
		soundStart();
		console.log("%cStart!", "color: lightblue; font-weight: bold");
		console.log(
			"%cYou money: " + userStats.coin,
			"color: lightblue; font-weight: bold"
		);
		const betValue = parseInt(
			document.querySelector("#userCoinInSlotMachine").value
		);
		inputCoinInSlotMachine = parseInt(
			document.querySelector("#userCoinInSlotMachine").value
		);

		console.log(
			"%cMoney Spend: " + inputCoinInSlotMachine,
			"color: lightblue; font-weight: bold"
		);
		userStats.displayEvent = "";
		userStats.displayAllEvent();
		if (!checkBetValue(betValue)) {
			return;
		}
		userStats.updateScore();
		slotMachineStats.scoreCheckEvent();
		checkPittyAndStartSpin();
	}
	freeSpinBtn.addEventListener("click", handleButtonFreeSpin);

	function handleButtonFreeSpin() {
		let spinCountText = document.querySelector("#freeSpinCounter");
		if (userStats.freeSpinCount <= 0 || typeof spinCountText === "string") {
			console.log("NO FREE SPINS");
			spinCountText.innerText = "";
			spinCountText.innerText = "You don't have any free Spins left!";
			return;
		}
		console.log("FREE SPIN IN USE");
		deactivate();
		soundStart();

		let betValue = parseInt(
			document.querySelector("#userCoinInSlotMachine").value
		);
		inputCoinInSlotMachine = parseInt(
			document.querySelector("#userCoinInSlotMachine").value
		);
		userStats.displayEvent = "";
		userStats.displayAllEvent();
		if (!checkBetValue(betValue)) {
			return;
		}
		userStats.coin += inputCoinInSlotMachine;
		userStats.freeSpinCount -= 1;
		spinCountText.innerText = "";
		spinCountText.innerText = userStats.freeSpinCount;

		userStats.updateScore();
		slotMachineStats.scoreCheckEvent();
		checkPittyAndStartSpin();
	}

	refreshBtn.addEventListener("click", refresh);
}

slotMachine();
