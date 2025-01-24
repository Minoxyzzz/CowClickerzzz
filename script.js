class ClickerGame {
    constructor(playerName) {
        this.playerName = playerName;
        this.milk = 0;
        this.clickValue = 1;
        this.multiplierLevel = 0;
        this.autoClickerLevel = 0;
        this.newCowLevel = 0;
        this.startTime = Date.now();
        this.init();
        this.loadGame();
    }

    init() {
        this.loadGame();
        this.updateMilkCounter();
        this.updateTimeElapsed();
        this.setupEventListeners();
        setInterval(() => this.autoClick(), 100);
        setInterval(() => this.updateTimeElapsed(), 1000);

        setInterval(() => {
            this.saveGame();
        }, 1000);
    }


    setupEventListeners() {
        document.getElementById('clickable-cow').addEventListener('click', () => this.clickCow());
        document.getElementById('multiplier-upgrade').addEventListener('click', () => this.buyMultiplier());
        document.getElementById('auto-clicker-upgrade').addEventListener('click', () => this.buyAutoClicker());
        document.getElementById('new-cow-upgrade').addEventListener('click', () => this.buyNewCow());
    }

    clickCow() {
        this.milk += this.clickValue;
        this.updateMilkCounter();
    }

    buyMultiplier() {
        const cost = Math.ceil(100 * Math.pow(1.15, this.multiplierLevel));
        if (this.milk >= cost) {
            this.milk -= cost;
            this.multiplierLevel++;
            this.clickValue += 0.2;
            this.updateMilkCounter();
            this.updateUpgradeButtons();
        } else {
            alert("Nemáte dostatek mléka!")
        }
    }

    buyAutoClicker() {
        const cost = 1000 * Math.pow(4, this.autoClickerLevel);
        if (this.milk >= cost) {
            this.milk -= cost;
            this.autoClickerLevel++;
            this.updateMilkCounter();
            this.updateUpgradeButtons();
        } else {
            alert("Nemáte dostatek mléka!")
        }
    }

    buyNewCow() {
        const cost = 1000000000 * Math.pow(10, this.newCowLevel);
        if (this.milk >= cost && this.newCowLevel < 5) {
            this.milk -= cost;
            this.newCowLevel++;
            this.clickValue *= this.newCowLevel + 1;
            this.addPurchasedCow(this.newCowLevel);
            this.updateMilkCounter();
            this.updateUpgradeButtons();
        } else {
            alert("Nemáte dostatek mléka!")
        }
    }

    addPurchasedCow(count = 0) {
        const container = document.getElementById('purchased-cows');
        const existingCows = container.childElementCount;

        if(existingCows < count) {
            for (let i = 0; i < count - existingCows; i++) {
                const cow = document.createElement('img');
                cow.src = 'cow.png';
                cow.style.width = '20px';
                cow.style.justifyContent = "center";
                cow.style.animation = 'bounce 1s infinite';
                container.appendChild(cow);
            }
        } else if(existingCows > count) {
            for (let i = 0; i < existingCows - count; i++) {
                container.removeChild(container.lastChild);
            }
        }
    }

    autoClick() {
        this.milk += this.clickValue * this.autoClickerLevel;
        this.updateMilkCounter();
    }

    updateMilkCounter() {
        document.getElementById('milk-counter').textContent = `Mléko: ${this.milk.toFixed(1)} L`;
    }

    updateTimeElapsed() {
        const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    
        const days = Math.floor(elapsedSeconds / (24 * 60 * 60));
        const hours = Math.floor((elapsedSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((elapsedSeconds % (60 * 60)) / 60);
        const seconds = elapsedSeconds % 60;
    
        document.getElementById('time-elapsed').textContent = 
            `Stáří: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateUpgradeButtons() {
        document.getElementById('multiplier-upgrade').textContent = `Násobič (x${this.multiplierLevel}): ${Math.ceil(100 * Math.pow(1.15, this.multiplierLevel))} L`;
        document.getElementById('auto-clicker-upgrade').textContent = `Auto Dojička (x${this.autoClickerLevel}): ${1000 * Math.pow(10, this.autoClickerLevel)} L`;
        document.getElementById('new-cow-upgrade').textContent = `Nová Kráva (x${this.newCowLevel}): ${1000000000 * Math.pow(10, this.newCowLevel)} L`;
    }

    saveGame() {
        const saveData = {
            milk: this.milk,
            clickValue: this.clickValue,
            multiplierLevel: this.multiplierLevel,
            autoClickerLevel: this.autoClickerLevel,
            newCowLevel: this.newCowLevel,
            startTime: this.startTime,
        };
        localStorage.setItem(this.playerName, JSON.stringify(saveData));
        console.log(`Data saved for player: ${this.playerName}`);
    }

    loadGame() {
        const saveData = JSON.parse(localStorage.getItem(this.playerName));
        if (saveData) {
            this.milk = saveData.milk;
            this.clickValue = saveData.clickValue;
            this.multiplierLevel = saveData.multiplierLevel;
            this.autoClickerLevel = saveData.autoClickerLevel;
            this.newCowLevel = saveData.newCowLevel;
            this.startTime = saveData.startTime;

            if(this.newCowLevel > 0){
                this.addPurchasedCow(this.newCowLevel);
            }

            console.log(`Data loaded for player: ${this.playerName}`);
        } else {
            console.log(`No Existing data for player: ${this.playerName}. Starting fresh.`);
        }

        this.updateUpgradeButtons();
    }

}

class AnimatedBackground {
    constructor(container) {
        this.container = container;
        this.createBackgroundLayer();
        this.startFallingCows();
    }

    createBackgroundLayer() {
        this.backgroundLayer = document.createElement("div");
        this.backgroundLayer.style.position = "fixed";
        this.backgroundLayer.style.top = "0";
        this.backgroundLayer.style.left = "0";
        this.backgroundLayer.style.width = "100%";
        this.backgroundLayer.style.height = "100%";
        this.backgroundLayer.style.zIndex = "-1";
        this.backgroundLayer.style.pointerEvents = "none";
        this.container.appendChild(this.backgroundLayer);
    }

    startFallingCows() {
        setInterval(() => {
            const cow = document.createElement("img");
            cow.src = "cow.png";
            cow.style.position = "absolute";
            cow.style.width = "30px";
            cow.style.top = "-50px";
            cow.style.left = `${Math.random() * window.innerWidth}px`;
            cow.style.transform = `rotate(${Math.random() * 360}deg)`;
            cow.style.transition = `transform 5s linear, top 5s linear`;

            this.backgroundLayer.appendChild(cow);

            setTimeout(() => {
                cow.style.top = `${window.innerHeight + 50}px`;
                cow.style.transform = `rotate(${Math.random() * 360}deg)`;

                setTimeout(() => {
                    this.backgroundLayer.removeChild(cow);
                }, 5000);
            }, 100);
        }, 100);
    }
}

function animateBackground() {
    let r = 0, g = 0, b = 0;
    let directionR = 1, directionG = 1, directionB = 1;

    setInterval(() => {
        r += directionR * 0.5;
        g += directionG * 0.3;
        b += directionB * 0.4;

        if (r >= 255 || r <= 0) directionR *= -1;
        if (g >= 255 || g <= 0) directionG *= -1;
        if (b >= 255 || b <= 0) directionB *= -1;

        document.body.style.backgroundColor = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
    }, 30);
}

class CheatManager {
    constructor(game) {
        this.game = game;
        this.initCheats();
    }

    initCheats() {
        let cheatCode = [];
        const cheatCombination = ['Alt', 'm'];
        window.addEventListener('keydown', (event) => {
            cheatCode.push(event.key);
            if (cheatCode.slice(-cheatCombination.length).join('') === cheatCombination.join('')) {
                this.activateMilkCheat();
                cheatCode = [];
            }
        });
    }

    activateMilkCheat() {
        this.game.milk += 1000000000000;
        this.game.updateMilkCounter();
        console.log('Přidáno: 1000000000000L mléka ');
        console.log('Skóre:', this.game.milk);
    }
}


animateBackground();
const animatedBackground = new AnimatedBackground(document.body);

window.onload = () => {
    const playerName = prompt('Zadej své jméno:');
    document.getElementById('player-name').textContent = `Hráč: ${playerName}`;
    const game = new ClickerGame(playerName);
    const cheatManager = new CheatManager(game);
    window.addEventListener('beforeunload', () => game.saveGame());
};

const znelka = new Audio('znelka.mp3');
znelka.loop = true;

const toggleSoundButton = document.getElementById('toggle-sound');
let isPlaying = false;

toggleSoundButton.addEventListener('click', () => {
    if (isPlaying) {
        znelka.pause();
        toggleSoundButton.innerHTML = '<img src="muted.png">';
    } else {
        znelka.play();
        toggleSoundButton.innerHTML = '<img src="unmuted.png">';
    }
    isPlaying = !isPlaying;
});

