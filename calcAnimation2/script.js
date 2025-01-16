let numA = "";
let onNumA = true;
let numB = "";
let operator = "";
let currentDisplay = document.getElementById("display");
let outerVisual = document.getElementById("outerVisual");
let equationVisual = document.getElementById("equationVisual");
let pictureVisual = document.getElementById("pictureVisual");
let dec = document.getElementById("dec");

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if(b == 0) {
        return "uh, no";
    } else {
        return a / b;
    };
};

function doOperation(firstNum, secondNum, operation) {
    if(operation === "+") {
        return add(firstNum, secondNum);
    } else if(operation === "-") {
        return subtract(firstNum, secondNum);
    } else if(operation === "*") {
        return multiply(firstNum, secondNum);
    } else if(operation === "/") {
        return divide(firstNum, secondNum);
    } else {
        return "huh?";
    }
}

function readNum(sentNum) {
    if(onNumA === true) {
        numA += sentNum;
        currentDisplay.innerHTML = numA;
        equationVisual.innerHTML = numA;
    } else {
        numB += sentNum;
        currentDisplay.innerHTML = numA + operator + numB;
        equationVisual.innerHTML = numA + " " + operator + " " + numB;
    } 
}

function readOper(sentOper) {
    if(operator) {
        currentDisplay.innerHTML = "ERROR";
        equationVisual.innerHTML = "ERROR";
    } else {
        operator = sentOper;
        onNumA = false;
        currentDisplay.innerHTML = numA + operator;
        equationVisual.innerHTML = numA + " " + operator;
        //create circles/dots/numberline
        if(operator === "*") {
            createMultCircles();
        } else if(operator === "/") {
            createStartDivDots();
        } else if(operator === "+") {
            createAddLine(numA);
        }
    }
}

function readEnter() {
    let answer = doOperation(parseFloat(numA), parseFloat(numB), operator);

    if(typeof(answer) === "number") {
        if(operator === "+") {
            animateAddition(numA, numB);
            currentDisplay.innerHTML = Number(Math.round(answer + 'e' + 7) + "e-" + 7)
            equationVisual.innerHTML = numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answer + 'e' + 7) + "e-" + 7)           
        } else if(operator === "-") {
            currentDisplay.innerHTML = Number(Math.round(answer + 'e' + 7) + "e-" + 7)
            equationVisual.innerHTML = numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answer + 'e' + 7) + "e-" + 7)
        } else if(operator === "*") {
            createMultDots(numB);
            setTimeout(() => {currentDisplay.innerHTML = Number(Math.round(answer + 'e' + 7) + "e-" + 7)}, (500*numA));
            setTimeout(() => {equationVisual.innerHTML = numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answer + 'e' + 7) + "e-" + 7)}, (500*numA));
        } else if(operator === "/") {
            let answerRounded = Math.floor(answer);
            let remainder = numA % numB;
            createDivCircles();
            createEndDivDots(answerRounded);
            setTimeout(() => {currentDisplay.innerHTML = Number(Math.round(answer + 'e' + 7) + "e-" + 7)}, (1000*(answer+1)));
            if(!remainder) {
                setTimeout(() => {equationVisual.innerHTML = numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answer + 'e' + 7) + "e-" + 7)}, (1000*(answer+1)));
            } else {
                setTimeout(() => {
                    equationVisual.innerHTML = 
                        numA + " " + operator + " " + numB + " " + "=" + " " + Number(Math.round(answerRounded + 'e' + 7) + "e-" + 7) + " with remainder " + remainder
                }, (1000*(answerRounded+1)));
            };
            
        } 
    
   
    } else {
        currentDisplay.innerHTML = "ERROR";
        equationVisual.innerHTML = "ERROR";
        numA = "";
    }  
    //reset values in function and run with setTimeout so dont mess up display
    setTimeout((resetValues), (500*(numA+1)));
    function resetValues() {
        numA= answer;
        onNumA = true;
        numB = "";
        operator = "";
    }
}

function readClear() {
    numA = "";
    numB = "";
    operator = "";
    currentDisplay.innerHTML = "";
    equationVisual.innerHTML = "";
    pictureVisual.innerHTML = '<canvas id="canvas"></canvas>';
    onNumA = true;
}

function readBackspace() {
    if(onNumA === true) {
        numA = numA.slice(0, -1);
        currentDisplay.innerHTML = numA;
        equationVisual.innerHTML = numA;
    } else {
        numB = numB.slice(0, -1);
        currentDisplay.innerHTML = numA + operator + numB;
        equationVisual.innerHTML = numA + " " + operator + " " + numB;
    }
}
    
//function to create circles/dots/numberline
function createMultCircles() {

    const circleGroup = document.createElement("div");
    circleGroup.id = "circleGroup";

    for (let i = 1; i <= numA; i++ ) {
        const circleAndCount = document.createElement("div");
        circleAndCount.classList.add("circleAndCount");
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.id = "circle" + i;
        const countDisplay = document.createElement("div");
        countDisplay.classList.add("countDisplay");

        circleAndCount.appendChild(circle);
        circleAndCount.appendChild(countDisplay);
        circleGroup.appendChild(circleAndCount);
    }

    pictureVisual.appendChild(circleGroup);
}

function createMultDots(numB) {
    const circles = document.querySelectorAll(".circle");
    const countDisplays = document.querySelectorAll(".countDisplay");

    function appendDotGroup(index) {
        if (index >= circles.length) return; // Stop if we've processed all circles

        const cir = circles[index];
        const dotGroup = document.createElement("div");
        dotGroup.classList.add("dotGroup");

        //creates numB dots in each group
        for (let i = 1; i <= numB; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dotGroup.appendChild(dot);
        }
        //puts group of numB dots into circle
        cir.appendChild(dotGroup);

        //display skip counting
        const countDisplay = countDisplays[index];
        countDisplay.innerHTML= numB * (index + 1);


        // Call the next group after a delay
        setTimeout(() => appendDotGroup(index + 1), 500);
    }

    // Start the recursive function with the first circle
    appendDotGroup(0);
}

function createStartDivDots() {
    const startDotGroup = document.createElement("div");
    startDotGroup.classList.add("startDotGroup");
    for (let i = 1; i <= numA; i++ ) {
        const startDot = document.createElement("div");
        startDot.classList.add("startDot", "fade-out");
        startDot.id = "startDot" + i;
        startDotGroup.appendChild(startDot);
    }
    pictureVisual.appendChild(startDotGroup);
};

function createDivCircles() {
    const circleGroup = document.createElement("div");
    circleGroup.id = "circleGroup";

    for (let i = 1; i <= numB; i++ ) {
        const circleAndCount = document.createElement("div");
        circleAndCount.classList.add("circleAndCount");
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.id = "circle" + i;
        const dotGroup = document.createElement("div");
        dotGroup.classList.add("dotGroup");
        const countDisplay = document.createElement("div");
        countDisplay.classList.add("countDisplay");

        circleAndCount.appendChild(circle);
        circle.appendChild(dotGroup);
        circleAndCount.appendChild(countDisplay);
        circleGroup.appendChild(circleAndCount);
    }

    pictureVisual.appendChild(circleGroup);
}

function createEndDivDots(answer) {
    const dotGroups = document.querySelectorAll(".dotGroup");
    // const countDisplays = document.querySelectorAll(".countDisplays");

    // uses the "answer" variable to add hidden dots to the circles
    for (let i = 1; i <= answer; i++) {
        dotGroups.forEach((dotGroup) => {
            const dot = document.createElement("div");
            dot.classList.add("dot", "fade-target");
            dot.dataset.id = i;
            dotGroup.appendChild(dot);
        });
    };

    // fades in the hidden dots making them visible in the circles one at a time
    for (let i = 1; i <= answer; i++) {
        setTimeout(() => {
            const dotsToFadeIn = document.querySelectorAll(`.dot[data-id="${i}"]`);
            dotsToFadeIn.forEach((dot) => {
                // dot.classList.remove("fade-out");
                dot.classList.add("fade-in");
            });
        }, i * 1000);
    }

    // fades out the startDots in groups of numB
    for (let j = 0; j < answer; j++) {
        setTimeout(() => {
            for (let k = 1; k <= numB; k++) {
                const startDot = document.querySelector(`#startDot${j * numB + k}`);
                if (startDot) {
                    startDot.classList.add("hidden"); 
                }
            }
        }, j * 1000 + 500);
    }

}