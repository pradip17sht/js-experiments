var mainLoop;
var direction = -1;

var sliderDiv = document.getElementById('slider-ul');
var dots = document.getElementsByTagName('span');

var buttonPrevious = document.getElementsByClassName('previous')[0];
var buttonNext = document.getElementsByClassName('next')[0];

var IMG_WIDTH = 640;
var IMAGES_MAX_COUNT = imageCounter();
var maxMargin = IMAGES_MAX_COUNT * IMG_WIDTH - IMG_WIDTH;
var currentMargin = 0;
var index = 0;
var newCurrentMargin = 0;

function imageCounter(){
  var images = document.getElementsByTagName('li');
  return images.length;
}


function previousImage(){
  index--;
  if(index<0) {index = IMAGES_MAX_COUNT-1;}
  else if(index>IMAGES_MAX_COUNT-1) {index = 0;}
  gotoSlide(index);
}

function nextImage(){
  index++;
  if(index<0) {index = IMAGES_MAX_COUNT-1;}
  else if(index>IMAGES_MAX_COUNT-1) {index = 0;}
  gotoSlide(index);
}

buttonPrevious.onclick = function(){
  previousImage();
}

buttonNext.onclick = function(){
  nextImage();
}

dots[0].onclick = function(){gotoSlide(0);}
dots[1].onclick = function(){gotoSlide(1);}
dots[2].onclick = function(){gotoSlide(2);}
dots[3].onclick = function(){gotoSlide(3);}


function gotoSlide(i){
  sliderDiv.style.marginLeft = -(i * IMG_WIDTH) + 'px';
}


function transition(){
  newCurrentMargin += direction * 10;
  sliderDiv.style.marginLeft = newCurrentMargin + 'px';

  if(newCurrentMargin > 0){
    direction = -1;
  }
  else if(newCurrentMargin < -maxMargin)
  {
    direction = 1;
  }

  if(newCurrentMargin % IMG_WIDTH == 0){
    index++;
    if(index<0) {index = IMAGES_MAX_COUNT-1;}
    else if(index>IMAGES_MAX_COUNT-1) {index = 0;}
    clearInterval(mainLoop);
    setTimeout(runMainInterval, 2000);
  }

}


function runMainInterval(){
  mainLoop = setInterval(transition, 10);
}


runMainInterval();
