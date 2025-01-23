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
    const lineLocation = canvasHeight*(3/4);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, lineLocation, canvasWidth - 10, 3);  //creates number line
    ctx.fillRect(20, 294, 3, 15);  //creates first dash on number line

    ctx.font = '20px Helvetica';
    const textWidth = ctx.measureText(numA).width;
    const centeredText = 20 - textWidth / 2;
    ctx.fillText(numA, centeredText, 328);  //puts numA on the number line
}

function animateAddition(numA, numB) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const lineLocation = canvasHeight*(3/4);

    let frameY = 0;
    let arrowState = 'rightArrow'
    const arrowImage = new Image();
    arrowImage.src = 'arrowSprites.png';
    const spriteWidth = 190;
    const spriteHeight = 130;
    let gameFrame = 0;
    const staggerFrames = 10;  //a lower number gives a higher speed to the animation

    let locationDash = 20;  //starting x px value of the initial dash on number line
    let currentNum = parseFloat(numA); //keeps track of current number on number line

    let hundreds = Math.floor(numB/100) * 100;
    let tens = Math.floor((numB - hundreds)/10) * 10;
    let ones = numB - hundreds - tens
    const units = 740 / ((hundreds*4/100)+(tens*2/10)+ones);
    const hundredsScale = 4;
    const tensScale = 2;

    const arrowScale = 127;     //width of arrow in px, equivalent to one unit on canvas
    const leftMarginPX = 25;    //left margin on sprite
    const topMarginAndArrowPX = 106;   //top margin + height of arrow on sprite
    const leftMargin = (leftMarginPX/arrowScale)*units;     //left margin scaled in terms of units
    const topMarginAndArrow = (topMarginAndArrowPX/arrowScale)*units;  //top margin & arrow scaled in terms of units
    const arrowWidth = (spriteWidth/arrowScale)*units;      //arrowWidth scaled in terms of units
    const arrowHeight = (spriteHeight/arrowScale)*units;        //arrowHeight scaled in terms of units

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

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        createAddLine(numA);

        animationArray.forEach((drawFunction) => drawFunction());

        let totalFrames = spriteAnimations[arrowState].loc.length;
        let position = Math.floor(gameFrame/staggerFrames) % totalFrames;

        if(!(hundreds === 0 && tens === 0 && ones === 0)) {
            frameY = spriteAnimations[arrowState].loc[position].y;
            if(hundreds != 0) {
                ctx.drawImage(arrowImage,  //source file of sprite page
                    0,      // X location to pull from source file
                    frameY,   // Y location to pull from source file & also current frame
                    spriteWidth,    
                    spriteHeight, 
                    locationDash - leftMargin*hundredsScale,        // canvas placement of arrow in X direction
                    lineLocation - topMarginAndArrow*hundredsScale,     // canvas placement of arrow in Y direction
                    arrowWidth*hundredsScale,       // canvas size of arrow width
                    arrowHeight*hundredsScale)      // canvas size of arrow height
                if((staggerFrames*totalFrames-1) === gameFrame%(staggerFrames*totalFrames)) {
                    animationArray.push(((frame, dashX) => () => 
                        ctx.drawImage(arrowImage, 0, frame, spriteWidth, spriteHeight, 
                            dashX - leftMargin*hundredsScale,        
                            lineLocation - topMarginAndArrow*hundredsScale,       
                            arrowWidth*hundredsScale,                             
                            arrowHeight*hundredsScale))                      
                            (frameY, locationDash))                     
                    locationDash += units*hundredsScale;
                    currentNum += 100;
                    animationArray.push(((dashX) => () => ctx.fillRect(dashX, 294, 3, 15))(locationDash));
                    animationArray.push(((current, dashX) => () => {
                        const textWidth = ctx.measureText(current).width;
                        const centeredText = dashX - textWidth / 2;
                        ctx.fillText(current, centeredText, 328)
                    })(currentNum, locationDash));
                    hundreds -= 100;
                }
            } else if(tens != 0) {
                ctx.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, 
                    locationDash - leftMargin*tensScale,      
                    lineLocation - topMarginAndArrow*tensScale,     
                    arrowWidth*tensScale,      
                    arrowHeight*tensScale)      
                if((staggerFrames*totalFrames-1) === gameFrame%(staggerFrames*totalFrames)) {
                    animationArray.push(((frame, dashX) => () => 
                        ctx.drawImage(arrowImage, 0, frame, spriteWidth, spriteHeight, 
                            dashX - leftMargin*tensScale,        
                            lineLocation - topMarginAndArrow*tensScale,       
                            arrowWidth*tensScale,                             
                            arrowHeight*tensScale))                      
                            (frameY, locationDash))  
                    locationDash += units*tensScale;
                    currentNum += 10;
                    animationArray.push(((dashX) => () => ctx.fillRect(dashX, 294, 3, 15))(locationDash));
                    animationArray.push(((current, dashX) => () => {
                        const textWidth = ctx.measureText(current).width;
                        const centeredText = dashX - textWidth / 2;
                        ctx.fillText(current, centeredText, 328)
                    })(currentNum, locationDash));
                    tens -= 10;
                }
            } else if(ones != 0) {
                ctx.drawImage(arrowImage, 0, frameY, spriteWidth, spriteHeight, 
                    locationDash - leftMargin,      
                    lineLocation - topMarginAndArrow,     
                    arrowWidth,      
                    arrowHeight)   
                if((staggerFrames*totalFrames-1) === gameFrame%(staggerFrames*totalFrames)) {
                    animationArray.push(((frame, dashX) => () => 
                        ctx.drawImage(arrowImage, 0, frame, spriteWidth, spriteHeight, 
                            dashX - leftMargin,        
                            lineLocation - topMarginAndArrow,       
                            arrowWidth,                             
                            arrowHeight))                      
                            (frameY, locationDash))                    
                    locationDash += units;
                    currentNum += 1;
                    animationArray.push(((dashX) => () => ctx.fillRect(dashX, 294, 3, 15))(locationDash));
                    animationArray.push(((current, dashX) => () => {
                        const textWidth = ctx.measureText(current).width;
                        const centeredText = dashX - textWidth / 2;
                        ctx.fillText(current, centeredText, 328)
                    })(currentNum, locationDash));
                    ones--;
                }
            };
            gameFrame++;
            requestAnimationFrame(animate);

        }

        
    }
    animate(); 

}


//Attach to global scope
window.createAddLine = createAddLine;
window.animateAddition = animateAddition;