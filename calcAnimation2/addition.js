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
    const arrowImage = new Image();
    arrowImage.src = 'arrowSprites.png';
    const spriteWidth = 190;
    const spriteHeight = 130;
    let gameframe = 0;
    const staggerFrames = 5;  //a lower number gives a higher speed to the animation

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

    // Created an array to store all pieces of image to be drawn each time animate is called
    const animationArray = [];
    let currentAnimationIndex = 0;

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        createAddLine(numA);

        animationArray.forEach(element => {
            element;
            console.log(element);
        })

        let totalFrames = spriteAnimations['rightArrow'].loc.length;
        let position = Math.floor(gameframe/staggerFrames) % totalFrames;
        // frameY = spriteAnimations['rightArrow'].loc[5].y;
        // ctx.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, -352 + locationDash, 238 - spriteHeight, 440, 301);
        gameframe++;
        if(gameframe < currentAnimationIndex) {
            requestAnimationFrame(animate);
        };
    
    }
    
    if(hundreds != 0) {
        for( ; remainingB >= 100; remainingB -= 100) {
            locationDash += units*4;
            locationNum += units*4;
            currentNum += 100;
            animationArray.push("ctx.fillRect(20, 294, 3, 15);");
            animationArray.push("ctx.fillText(70, 80, 328);");
            currentAnimationIndex += 2;
            animate();
        }
    };

    if(tens != 0) {
        for( ; remainingB >= 10; remainingB -= 10) {
            locationDash += units*2;
            locationNum += units*2;
            currentNum += 10;
            scheduleArrow(delay, locationDash, currentNum, locationNum);
            delay++;
        }
    };

    if(ones != 0) {
        for( ; remainingB >= 1; remainingB -= 1) {
            locationDash += units;
            locationNum += units;
            currentNum += 1;
            scheduleArrow(delay, locationDash, currentNum, locationNum);
            delay++;
        }
    };
}


//Attach to global scope
window.createAddLine = createAddLine;
window.animateAddition = animateAddition;