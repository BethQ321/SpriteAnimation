function initializeCanvas() {
    const canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 400;
}

// Initialize canvas
initializeCanvas();

function createAddLine(numA) {
    const canvasanvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 300, canvasWidth - 10, 3);  //creates number line
    ctx.fillRect(15, 294, 3, 15);  //creates first dash on number line

    ctx.font = '20px Helvetica';
    ctx.fillText(numA, 11, 328);  //puts numA on the number line
}

function animateAddition(numA, numB) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const numberA = numA;
    const numberB = numB;

    let frameY = 0;
    let arrowState = 'rightArrow'
    const arrowImage = new Image();
    arrowImage.src = 'arrowSprites.png';
    const spriteWidth = 190;
    const spriteHeight = 130;
    let gameFrame = 0;
    const staggerFrames = 10;  //a lower number gives a higher speed to the animation

    let locationDash = 15;  //starting x px value of the initial dash on number line
    let locationNum = 11; //starting x px value of the initial number on number line
    let remainingB = numB; //keeps track of remaining amount of numB that needs to be graphed
    let currentNum = parseFloat(numA); //keeps track of current number on number line

    let hundreds = Math.floor(numB/100) * 100;
    let tens = Math.floor((numB - hundreds)/10) * 10;
    let ones = numB - hundreds - tens
    let units = 750 / ((hundreds*4/100)+(tens*2/10)+ones);

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
    console.log(spriteAnimations)

    // Created an array to store all pieces of image to be drawn each time animate is called
    const animationArray = [];

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        createAddLine(numA);

        animationArray.forEach((drawFunction) => drawFunction());

        let totalFrames = spriteAnimations[arrowState].loc.length;
        let position = Math.floor(gameFrame/staggerFrames) % totalFrames;

        if(!(hundreds === 0 && tens === 0 && ones === 0)) {
            frameY = spriteAnimations[arrowState].loc[position].y;
            ctx.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, -50 + locationDash, 300 - units*3.75 + spriteHeight*.25, units*5.6, units*4.2)
            if(hundreds != 0) {
                if((gameFrame/staggerFrames) % totalFrames === totalFrames - 1) {
                    animationArray.push(((frame, dashX, unit) => () => ctx.drawImage(arrowImage, 0, frame, spriteWidth, spriteHeight, -50 + dashX, 300 - units*3.75 + spriteHeight*.25, unit*5.6, unit*4.2))(frameY, locationDash, units));
                    locationDash += units*4;
                    locationNum += units*4;
                    currentNum += 100;
                    animationArray.push(((dashX) => () => ctx.fillRect(dashX, 294, 3, 15))(locationDash));
                    animationArray.push(((current, numX) => () => ctx.fillText(current, numX, 328))(currentNum, locationNum));
                    hundreds -= 100;
                }
            } else if(tens != 0) {
                if((gameFrame/staggerFrames) % totalFrames === totalFrames - 1) {
                    locationDash += units*2;
                    locationNum += units*2;
                    currentNum += 10;
                    animationArray.push(((dashX) => () => ctx.fillRect(dashX, 294, 3, 15))(locationDash));
                    animationArray.push(((current, numX) => () => ctx.fillText(current, numX, 328))(currentNum, locationNum));
                    tens -= 10;
                }
            } else if(ones != 0) {
                if((gameFrame/staggerFrames) % totalFrames === totalFrames - 1) {
                    locationDash += units;
                    locationNum += units;
                    currentNum += 1;
                    animationArray.push(((dashX) => () => ctx.fillRect(dashX, 294, 3, 15))(locationDash));
                    animationArray.push(((current, numX) => () => ctx.fillText(current, numX, 328))(currentNum, locationNum));
                    ones--;
                }
            };
            gameFrame++;
            console.log(animationArray);
            requestAnimationFrame(animate);

        }

        
    }
    animate(); 

}


//Attach to global scope
window.createAddLine = createAddLine;
window.animateAddition = animateAddition;