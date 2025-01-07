let arrowState = 'leftArrow';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    arrowState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 410.5;
let frameY;

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
let numB = 200;

function drawArrow(dashX) {
    let totalFrames = spriteAnimations['rightArrow'].loc.length;
    let position = Math.floor(gameFrame2/staggerFrames);

    if(position < totalFrames) {
        frameY = spriteAnimations['rightArrow'].loc[position].y;
        ctx2.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, -352 + dashX , 238 - spriteHeight, 440, 301);
        gameFrame2++;
        requestAnimationFrame(animate2);
    } else {
        frameY = spriteAnimations['rightArrow'].loc[5].y;
        ctx2.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, -352 + dashX, 238 - spriteHeight, 440, 301);
    }
}

function fillInNumberLine(context) {
    let dashX = 15;
    let numberX = 11;
    let remainingB = numB;
    let accumulator = 0;  //keeps a count of the next number for number line
    let counter = 0;   //keeps a count of the delay for the animation

    context.fillRect(0, 350, CANVAS_WIDTH2, 3);  //creates number line
    context.fillRect(15, 344, 3, 15);  //creates first dash on number line

    context.font = '20px Helvetica';
    context.fillStyle = 'black';
    context.fillText('0', 11, 378);  //creates 0 on number line

    // let totalFrames = spriteAnimations['rightArrow'].loc.length;
    // let position = Math.floor(gameFrame2/staggerFrames);

    if(remainingB >= 100) {
        for( ; remainingB >= 100; remainingB -= 100) {
            dashX += 294;
            numberX += 282;
            accumulator += 100;
            context.fillRect(dashX, 344, 3, 15);
            context.fillText(accumulator, numberX, 378);

            setTimeout(() => drawArrow(dashX), counter * 500);
            counter++;
        }
    };

    if(remainingB >= 10) {
        for( ; remainingB >= 10; remainingB -= 10) {
            dashX += 141;
            numberX += 141;
            accumulator += 10;
            context.fillRect(dashX, 344, 3, 15);
            context.fillText(accumulator, numberX, 378);
        }
    };

    if(remainingB >= 1) {
        for( ; remainingB >= 1; remainingB -= 1) {
            dashX += 47;
            numberX += 47;
            accumulator += 1;
            context.fillRect(dashX, 344, 3, 15);
            context.fillText(accumulator, numberX, 378);
        }
    };

}


function animate2() {
    ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_HEIGHT2);

    fillInNumberLine(ctx2);

    
};

animate2();

// function fillInNumberLine(context) {
//     let dashX = 15;
//     let numberX = 11;
//     let remainingB = numB;
//     let accumulator = 0;

//     context.fillRect(0, 350, CANVAS_WIDTH2, 3);  //creates number line
//     context.fillRect(15, 344, 3, 15);  //creates first dash on number line

//     context.font = '20px Helvetica';
//     context.fillStyle = 'black';
//     context.fillText('0', 11, 378);  //creates 0 on number line

//     if(remainingB >= 100) {
//         for( ; remainingB >= 100; remainingB -= 100) {
//             dashX += 294;
//             numberX += 282;
//             accumulator += 100;
//             context.fillRect(dashX, 344, 3, 15);
//             context.fillText(accumulator, numberX, 378);
//         }
//     };

//     if(remainingB >= 10) {
//         for( ; remainingB >= 10; remainingB -= 10) {
//             dashX += 141;
//             numberX += 141;
//             accumulator += 10;
//             context.fillRect(dashX, 344, 3, 15);
//             context.fillText(accumulator, numberX, 378);
//         }
//     };

//     if(remainingB >= 1) {
//         for( ; remainingB >= 1; remainingB -= 1) {
//             dashX += 47;
//             numberX += 47;
//             accumulator += 1;
//             context.fillRect(dashX, 344, 3, 15);
//             context.fillText(accumulator, numberX, 378);
//         }
//     };

// }




// function animate2() {
//     ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_HEIGHT2);

//     fillInNumberLine(ctx2);

//     let totalFrames = spriteAnimations['rightArrow'].loc.length;
//     let position = Math.floor(gameFrame2/staggerFrames);

//     if(position < totalFrames) {
//         frameY = spriteAnimations['rightArrow'].loc[position].y;
//         ctx2.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, -43, 238 - spriteHeight, 440, 301);
//         gameFrame2++;
//         requestAnimationFrame(animate2);
//     } else {
//         frameY = spriteAnimations['rightArrow'].loc[5].y;
//         ctx2.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, -43, 238 - spriteHeight, 440, 301);
//     }
    
// };

// animate2();