let arrowState = 'leftArrow';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    arrowState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 410.5;

const arrowImage = new Image();
arrowImage.src = 'arrowSprites.png';
const spriteWidth = 190;
const spriteHeight = 130;

let gameFrame = 0;
const staggerFrames = 15;  //the bigger the number, the slower the animation
const spriteAnimations = [];
const animationStates = [
    {
        name: 'leftArrow',
        frames: 6,
    },
    {
        name: 'rightArrow',
        frames: 6,
    },
]

let accumulator = 0;
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionSpriteFrame = j * spriteHeight;
        let positionSpriteNum = accumulator * spriteHeight;
        frames.loc.push({x: 0, y: positionSpriteNum + positionSpriteFrame});        
    }
    accumulator += state.frames;
    spriteAnimations[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[arrowState].loc.length;
    frameY = spriteAnimations[arrowState].loc[position].y;

    ctx.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameFrame++;
    requestAnimationFrame(animate);
};
animate();

/////////////////////////////////////////////////////////////////////////////////////

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
const CANVAS_WIDTH2 = canvas2.width = 800;
const CANVAS_HEIGHT2 = canvas2.height = 600;
let gameFrame2 = 0;

function displayNumberText(context) {
    context.font = '20px Helvetica';
    context.fillStyle = 'black';
    context.fillText('0', 11, 378);
    context.fillText('100', 293, 378);
    context.fillText('110', 434, 378);
    context.fillText('120', 575, 378);
    context.fillText('121', 622, 378);
    context.fillText('122', 669, 378);
    context.fillText('123', 716, 378);
}

function animate2() {
    ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_HEIGHT2);
    ctx2.fillRect(0, 350, CANVAS_WIDTH2, 3);
    ctx2.fillRect(15, 344, 3, 15);
    ctx2.fillRect(309, 344, 3, 15);
    ctx2.fillRect(450, 344, 3, 15);
    ctx2.fillRect(591, 344, 3, 15);
    ctx2.fillRect(638, 344, 3, 15);
    ctx2.fillRect(685, 344, 3, 15);
    ctx2.fillRect(732, 344, 3, 15);

    let totalFrames = spriteAnimations['rightArrow'].loc.length;
    let position = Math.floor(gameFrame2/staggerFrames);

    if(position < totalFrames) {
        frameY = spriteAnimations['rightArrow'].loc[position].y;
        ctx2.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, -43, 238 - spriteHeight, 440, 301);
        gameFrame2++;
        requestAnimationFrame(animate2);
    } else {
        frameY = spriteAnimations['rightArrow'].loc[5].y;
        ctx2.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, -43, 238 - spriteHeight, 440, 301);
    }
    console.log(position)
    displayNumberText(ctx2);
};
animate2();