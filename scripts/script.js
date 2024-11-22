function slotMachine() {
	//All element in HTML
	const coinStats = document.querySelector("#coin");
	const scoreStats = document.querySelector("#score");
	let inputCoinInSlotMachine = parseInt(
		document.querySelector("#userCoinInSlotMachine").value
	);
	const startBtn = document.querySelector("#startBtn");
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
		spinCount: 0,
		doubleWin: false,

		updateScore: function () {
			userStats.score += inputCoinInSlotMachine;
			scoreStats.innerText = userStats.score;
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
				slotMachineStats.win();
				displayWin();
			} else {
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
				slotMachineStats.win();
				displayWin();
			} else {
				slotMachineStats.lose();
				displayLose();
			}
		},
		scoreCheckEvent: function () {
			userStats.doubleWin = false;
			userStats.spinCount++;

			if (userStats.score % 50 === 0 || userStats.spinCount % 5 === 0) {
				const chance = Math.random();
				if (chance <= 0.475) {
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
				{ type: "free Money", chance: 0.3, action: slotMachineStats.freeCoin },
				{
					type: "Free Win with double the win",
					chance: 0.2,
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
			userStats.coin += inputCoinInSlotMachine;
			coinStats.innerText = userStats.coin;
			alert("Score Event: Free Spin this round!");
		},
		freeCoin: function () {
			let scoreEventaddCoin = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
			userStats.coin += scoreEventaddCoin;
			coinStats.innerText = userStats.coin;
			alert("Score Event: EXTRA COIN! +" + scoreEventaddCoin);
		},
		freeWinDouble: function () {
			userStats.doubleWin = true;
			alert("Score Event: WIN GUARANTEED AND DOUBLE THE WIN!");
		},
		JackPot: function () {
			userStats.coin += Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
			console.log(
				"%cJACKPOT!!!",
				"color: lightgreen; font-weight: bold, font-size: 25px"
			);
			coinStats.innerText = userStats.coin;
			alert("Score Event: JACKPOT!!!");
		},
	};

	frameSpecialEvent = {
		speicalEvent: [
			//Overwiev of the event on wich number
			{ name: "WinCoin", number: 0},
			{ name: "nothing", number: 1},
			{ name: "freeSpin", number: 2},
			{ name: "nothing", number: 3},
			{ name: "freeSpin", number: 4},
			{ name: "nothing", number: 5},
			{ name: "winScore", number: 6},
		],
		nothing: function () {
			return;
		},
		winCoin: function () {
			let addCoin = Math.floor(Math.random() * 10) + 1;
			userStats.coin += addCoin;
			coinStats.innerText = userStats.coin;
		},
		winScore: function () {
			let addScore = Math.floor(Math.random() * 10) + 1;
			userStats.score += addScore;
			scoreStats.innerText = userStats.score;
		},
		freeSpinEvent: function () {
			userStats.coin += inputCoinInSlotMachine;
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
					console.winScore("SameFrameEvent: winScore");
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

			coinStats.innerText = userStats.coin;
			scoreStats.innerText = userStats.score;
		}
	}

	startBtn.addEventListener("click", () => {
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
		if (betValue > 20 || betValue < 1) {
			alert(
				"The bet amount is in the wrong ranche! Pleas set your bet Value between 1-20."
			);
			return;
		} else if (userStats.coin - betValue < 0) {
			alert("You are broke.");
			return;
		}

		userStats.updateScore();
		slotMachineStats.scoreCheckEvent();

		if (userStats.pityFive.length >= 5) {
			slotMachineStats.pitySpin();
		} else if (userStats.pityThree.length >= 3) {
			slotMachineStats.pitySpin();
		} else {
			slotMachineStats.spin();
		}
	});

	refreshBtn.addEventListener("click", refresh);
}

slotMachine();
