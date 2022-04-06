// Game Variables & Constants  
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 9;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// Game function

// lastPaintTime is the time when screen opened earlier
// ctime is currentTime
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine(){

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game over");
        snakeArr = [{x: 13, y: 15}];
        // musicSound.play();
        
    }

    function isCollide(sarr){
        for(let i = 1; i< snakeArr.length; i++){
               // when collide itself
            if(snakeArr[i].x == snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
                return true;
            }
             // When collide with boundary
            if(snakeArr[0].x >= 20 || snakeArr[0].x <= 0 || snakeArr[0].y >= 20 || snakeArr[0].y <=0){
                return true;
            }

        }

    }
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score : " +score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 18;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

 // Main logic starts here
// musicSound.play();

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    // moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
