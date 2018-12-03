var boxDiv;
var boxArray = [];

var BOX_COUNT = 20,
    BOX_BOUNCE_WIDTH = 750,
    BOX_BOUNCE_HEIGHT = 750,
    MAXIMUM_BOX_WIDTH = 45,
    MINIMUM_BOX_WIDTH = 31,
    MINIMUM_MOVE = 5,
    MAXIMUM_MOVE = 8;

var generateRandomNO = function (max = 1 , min = 0){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Box(x1, y1, rect, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.rect = rect;
  this.x2 = x2;
  this.y2 = y2;

  //function to generate random colors for each box
  var getRandomColor = function () {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
          color += letters[generateRandomNO(16)];
          // color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  this.draw = function () {
      var boxDiv = document.createElement('div');
      boxDiv.style.background = getRandomColor();
      boxDiv.style.width = this.rect + 'px';
      boxDiv.style.height = this.rect + 'px';
      boxDiv.style.position = 'absolute';
      boxDiv.style.borderRadius = '50%';
      boxDiv.style.left = this.x1 + 'px';
      boxDiv.style.top = this.y1 + 'px';

      boxDiv.setAttribute('class', 'box');
      document.body.appendChild(boxDiv);
  }

  this.movePosition = function () {
      this.x1 += this.x2;
      this.y1 += this.y2;
  }

  this.reverseMoveX = function () {
      this.x2 = -this.x2;
  }

  this.reverseMoveY = function () {
      this.y2 = -this.y2;
  }

  this.handleLeftRight = function (value) {
      this.x1 = value;
  }

  this.handleTopBottom = function (value) {
      this.y1 = value;
  }

  this.handleBoxsOverLap = function (changedBoxYPosition) {
      this.y1 -= (changedBoxYPosition - this.y1);
  }
}





var handlePlayersCollision = function (currentBoxIndex) {

    for (var i = 0; i < boxArray.length; i++) {
        var changedBox = boxArray[i];
        var currentBox = boxArray[currentBoxIndex];

        if (i !== currentBoxIndex) {

            if (currentBox.x1 < changedBox.x1 + changedBox.rect &&
                currentBox.x1 + currentBox.rect > changedBox.x1 &&
                currentBox.y1 < changedBox.y1 + changedBox.rect &&
                currentBox.rect + currentBox.y1 > changedBox.y1) {

                //reverses x2 and y2
                currentBox.reverseMoveX();
                currentBox.reverseMoveY();

                changedBox.reverseMoveX();
                changedBox.reverseMoveY();

                if (currentBox.y1 < changedBox.y1 || currentBox.y1 > changedBox.y1) currentBox.handleBoxsOverLap(changedBox.y1);

            }
        }
    }
}

var handleBoxBorderCollision = function (box) {

    if (box.x1 < 0) {
        box.reverseMoveX();
        box.handleLeftRight(4);

    } else if (box.x1> BOX_BOUNCE_WIDTH - 4) {

        box.reverseMoveX();
        box.handleLeftRight(BOX_BOUNCE_WIDTH - 4);

    } else if (box.y1 < 0) {

        box.reverseMoveY();
        box.handleTopBottom(4);

    } else if (box.y1 > BOX_BOUNCE_HEIGHT - 4) {

        box.reverseMoveY();
        box.handleTopBottom(BOX_BOUNCE_HEIGHT - 4);

    }
}

var handleCollision = function (box, index) {

    handleBoxBorderCollision(box);
    handlePlayersCollision(index);
}

var movePositionOfBoxInDOM = function (box, leftMargin, topMargin) {
    box.style.left = leftMargin + 'px';
    box.style.top = topMargin + 'px';
}

var gameLoop = function () {

    for (var i = 0; i < boxArray.length; i++) {
        var box = boxArray[i]
        box.movePosition(boxDiv[i]);

        movePositionOfBoxInDOM(boxDiv[i], box.x1, box.y1);

        handleCollision(boxArray[i], i);
    }
}

var generateAndDrawBox = function (x1, y1, rect, x2, y2) {
    var box = new Box(x1, y1, rect, x2, y2);

    boxArray.push(box);
    box.draw();
}

var generateAndDrawBoxs = function () {
    for (var i = 0; i < BOX_COUNT; i++) {

        //generating random coordinates for the boxs
        generateAndDrawBox(
            generateRandomNO(BOX_BOUNCE_WIDTH),
            generateRandomNO(BOX_BOUNCE_HEIGHT),
            generateRandomNO(MAXIMUM_BOX_WIDTH, MINIMUM_BOX_WIDTH),
            generateRandomNO(MINIMUM_MOVE, MAXIMUM_MOVE),
            generateRandomNO(MINIMUM_MOVE, MAXIMUM_MOVE)
        );
    }
}

var gameLoopReference;
var startGame = function () {

   generateAndDrawBoxs();
    boxDiv = document.getElementsByClassName('box');
    gameLoopReference = setInterval(gameLoop, 20);
}

startGame();


