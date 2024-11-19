function slotMachine() {
    //All element in HTML
    const coinStats = document.querySelector('#coin').textContent;
    const inputCoinInSlotMachine = document.querySelector('#userCoinInSlotMachine').value;
    const startBtn = document.querySelector('#startBtn');
    const refreshBtn = document.querySelector('#refreshBtn');
    const firstFrame = document.querySelector('#firstFrame');
    const secondFrame = document.querySelector('#secondFrame');
    const thirdFrame = document.querySelector('#thirdFrame');
    const DisplayWinLose =document.querySelector('#WinLose');

    //User Object to save Coin and Pity
    let userStats = {
        coin: coinStats,
        pityFive: [],
        pityThree: [],
        winStreak: [],
    }

    //SlotMachine
    let slotMachineStats = {
        win: function () {
            let addCoin = 0;
            if (inputCoinInSlotMachine => 10) {
                addCoin = Math.floor(Math.random() * 10) + 1;
                if (userStats.winStreak.length > 2) {
                    addCoin *= 2;
                }
            } else {
                addCoin = Math.floor(Math.random() * 20) + 1;
                if (userStats.winStreak.length > 2) {
                    addCoin *= 2;
                }
            }
            userStats.coin += addCoin;
            pity(true);
        },
        lose: function () {
            userStats.coin -= inputCoinInSlotMachine;
            pity(false);
        },
        spin: function () {
            
        },
        pitySpin: function (loseStreak) {

        }
    }

    function pity(winLose) {
        if (winLose) {
            userStats.pityFive = [];
            userStats.pityThree = [];
            if (userStats.winStreak.length > 2) {
                userStats.winStreak.push('win')
            } else {
                userStats.winStreak = [];
            }
        } else {
            if (inputCoinInSlotMachine => 10) {
                userStats.pityFive.push('lose');
                userStats.pityThree = [];
            } else {
                userStats.pityThree.push('lose');
                userStats.pityFive = [];
            }
            userStats.winStreak = [];
        }
    }
    startBtn.addEventListener('click', () => {
        if (userStats.pityFive.length >= 4) {
            slotMachineStats.pitySpin('pityFive');
        } else if (userStats.pityThree.length >= 2) {
            slotMachineStats.pitySpin('pityThree');
        } else {
            slotMachineStats.spin();
        }
    });
}

slotMachine();