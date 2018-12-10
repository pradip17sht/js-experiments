var currentWidth = 0;

var ballDiv = document.createElement('div');
ballDiv.style.background = "blue";
ballDiv.style.width = "100px";
ballDiv.style.height = "100px";
ballDiv.style.position = "absolute";
ballDiv.style.left = "250px";
ballDiv.style.borderRadius = '50%';
ballDiv.style.top = "0px";
document.body.appendChild(ballDiv);

var mainDiv = document.getElementsByClassName('main-div');
var containerHeight = mainDiv[0].clientHeight;

let isFalling = true;
setInterval(function () {
    if (isFalling) {
        currentWidth += 5;
        if (containerHeight < (currentWidth + 105)) isFalling = false;

    } else {
        currentWidth -= 5;
        if (currentWidth <= 5) isFalling = true;

    }
    ballDiv.style.top = currentWidth + "px";
    document.body.appendChild(ballDiv);
}, 100)