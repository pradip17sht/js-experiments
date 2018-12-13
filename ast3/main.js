const BACKGROUND_IMAGE = 'images/background.png';
const BIRD_IMAGE = 'images/bird.png';
const GRAVITY = 0.05;
let count = 0;
let currentIndex = 0;


let generateRandomNO = (max = 1, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Background {
  constructor (canvasHeight, canvasWidth) {
    this.image = BACKGROUND_IMAGE;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
  }

  showBackgroundImage(ctx) {
    drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight, ctx);
  }

  showGround(ctx) {
    drawImage('images/ground.png', 0, this.canvasHeight - 12, this.canvasWidth, 12, ctx);
  }
}


class Bird {
  constructor (canvasHeight, canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = 50;
    this.y = canvasHeight / 2 - 30;
    this.score = 0;
    this.velocity = 0;
    this.width = 28;
    this.height = 10;
  }

  show(ctx) {
    this.degrees = this.velocity * 2.5;
    ctx.save();
    ctx.rotate(this.degrees * Math.PI / 180);
    drawImage(BIRD_IMAGE, this.x, this.y, this.width, this.height, ctx);
    ctx.restore();
  }

  updatePerGravity() {
    this.velocity += GRAVITY;
    this.y += this.velocity;
  }

  jumpBird() {
    this.velocity = -0.9;
  }

  checkTopCollision() {
    if (this.y + 11 < 0) {
      this.velocity = 0;
      isGameOver = true;
    }
  }
  
  checkBottomCollision() {
    if (this.y + 11 > this.canvasHeight - 14) {
      this.velocity = 0;
      isGameOver = true;
    }
  }
  
  updateScore() {
    this.score++;
  }
  
  showScore(ctx) {
    ctx.fillText('Score:' + this.score, this.canvasWidth - 50, 10);
  }
}


let drawImage = (src, x, y, width, heigth, ctx) => {
  let img = new Image();
  img.src = src;
  ctx.drawImage(img, x, y, width, heigth);
}


let isGameOver = true;
class Game {
  constructor (canvasName) {
    this.canvas = document.getElementById(canvasName);
    this.ctx = this.canvas.getContext('2d');

    this.frameCount = 0;
    this.pipesCollection = [];
    this.background;
    this.bird;

    this.gameSetup = this.gameSetup.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.showElements = this.showElements.bind(this);
    this.updateElements = this.updateElements.bind(this);
    this.generatePipe = this.generatePipe.bind(this);
    this.checkBottomTopCollision = this.checkBottomTopCollision.bind(this);
    this.checkForCollisionWithTopPipe = this.checkForCollisionWithTopPipe.bind(this);
    this.checkForCollisionWithBottomPipe = this.checkForCollisionWithBottomPipe.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.spaceHandler = this.spaceHandler.bind(this);
    this.enterHandler = this.enterHandler.bind(this);
  }

  showElements () {
    this.background.showBackgroundImage(this.ctx);

    this.pipesCollection.map((pipe, index) => {
      pipe.show(this.ctx);
      pipe.update();

      if (pipe.x + pipe.width < 0) {
          this.pipesCollection.splice(index, 1);
      }
    });
    
    this.background.showGround(this.ctx);
    this.bird.show(this.ctx);
    this.bird.showScore(this.ctx);
  }
  
  updateElements() {
    this.bird.updatePerGravity();
  }
  
  generatePipe() {
    this.pipesCollection.push(new Pipes(this.canvas.height, this.canvas.width));
  }
  
  checkBottomTopCollision() {
    this.bird.checkTopCollision();
    this.bird.checkBottomCollision();
  }

  checkForCollisionWithTopPipe(pipe) {
    let bird = this.bird;
    return (bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      bird.y < 0 + pipe.top &&
      bird.height + bird.y > 0);
  }

  checkForCollisionWithBottomPipe(pipe) {
    let bird = this.bird;
    return (bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      bird.y < pipe.bottom + (this.canvas.height - pipe.bottom) &&
      bird.height + bird.y > pipe.bottom);
  }
  
  checkCollision() {
    this.checkBottomTopCollision();
    
    this.pipesCollection.map(pipe => {
      if (this.checkForCollisionWithBottomPipe(pipe) || this.checkForCollisionWithTopPipe(pipe)) {
        isGameOver = true;
      }
    });
  }
  
  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (isGameOver) {

      drawImage('images/message.png ', 0, 0, this.canvas.width, this.canvas.height, this.ctx);
      this.ctx.fillStyle = 'black';

      if (this.bird.score !== 0) {

        this.ctx.fillText('Score:' + this.bird.score, this.canvas.width / 2 - 30, this.canvas.height / 2 - 30);
    }
        
        this.ctx.fillText('PRESS ENTER TO PLAY', this.canvas.width / 2 - 60, this.canvas.height / 2 + 15);
        //this.ctx.fillText('Score:' + this.bird.score, this.canvas.width / 2 - 30, this.canvas.height / 2 - 30);
      } else{
        this.frameCount++;
        this.showElements();
        this.updateElements();
        this.checkCollision();
        
        if (this.frameCount % 100 === 0) {
          this.generatePipe();
        }
      }
      // this.ctx.fillText("Score : "+score,10,canvas.height-20);
      requestAnimationFrame(this.gameLoop);
    }
    
  spaceHandler(e) {
    if (e.keyCode == 32) {
      this.bird.jumpBird();
    }
  }
  
  enterHandler(e) {
    if (e.keyCode == 13) {
      isGameOver = false;
      this.bird = new Bird(this.canvas.height, this.canvas.width);
      this.background = new Background(this.canvas.height, this.canvas.width);
      this.frameCount = 0;
      this.pipesCollection = [];
    }
  }

  gameSetup() {
    document.addEventListener('keydown', this.spaceHandler, false);
    document.addEventListener('keydown', this.enterHandler, false);
    this.bird = new Bird(this.canvas.height, this.canvas.width);
    this.background = new Background(this.canvas.heigth, this.canvas.width);
    this.gameLoop(); 
  }
}


class Pipes {
  constructor(canvasHeight, canvasWidth) {
    this.spacing = 26;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.top = generateRandomNO(25, (canvasHeight / 2) + 30);
    this.bottom = this.top + this.spacing;
    this.speed = 1.8;
    this.isPassed = false;
    this.x = this.canvasWidth + 35;
    this.width = 35;
  }

  show(ctx) {
    drawImage('images/pipe-top.png', this.x, 0, this.width, this.top, ctx);
    drawImage('images/pipe-bottom.png', this.x, this.bottom, this.width, this.canvasHeight, ctx);
  }

  update() {
    this.x -= this.speed;
  }
}

let game = new Game('game-canvas');
game.gameSetup();
