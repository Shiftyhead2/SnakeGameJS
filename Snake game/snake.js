import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;
const SNAKE_BODY = [{x:11,y:11}];
let newSegments = 0;

export function update(){
  addSegments();
  const inputDirection = getInputDirection();
  for(let i = SNAKE_BODY.length - 2; i >= 0; i--)
  {
    SNAKE_BODY[i + 1] = { ...SNAKE_BODY[i] };
  }

  SNAKE_BODY[0].x += inputDirection.x;
  SNAKE_BODY[0].y += inputDirection.y;
  
}

export function draw(gameBoard){
  SNAKE_BODY.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  })
}

export function expandSnake(amount){
  newSegments += amount;
}


export function onSnake(position , {ignoreHead = false} = {}){
  return SNAKE_BODY.some((segment,index) => {
    if(ignoreHead && index === 0) return false;
    return equalPositon(segment,position);
  });
}

export function getSnakeHead(){
  return SNAKE_BODY[0];
}

export function snakeIntersection(){
  return onSnake(SNAKE_BODY[0] , {ignoreHead : true});
}

function equalPositon(pos1,pos2){
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments(){
  for(let i = 0; i < newSegments; i++){
    SNAKE_BODY.push({...SNAKE_BODY[SNAKE_BODY.length - 1]});
  }

  newSegments = 0;
}