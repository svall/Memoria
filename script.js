console.log("Connected!");

// Variables list:
var selectedCardA = [];
var selectedCardB = [];
var counter = 0;
var comparer = 0;
var selectedDivA;
var selectedDivB;

var masterImageArray = [
  "images/molu1.jpg",
  "images/lu2.jpg",
  "images/mo1.jpg",
  "images/su2.jpg",
  "images/su.jpg",
  "images/la2.jpg",
  "images/la3.jpg",
  "images/se1.jpg",
  "images/sesu1.jpg",
  "images/la1.jpg",
  "images/lasu1.jpg",
  "images/lu1.jpg",
  "images/mo2.jpg",
  "images/mo3.jpg",
  "images/mosu1.jpg",
  "images/se2.jpg",
  "images/se3.jpg"
];

var imageArray = [];

// add 8 random images and duplicate the array with spread ...
function random8Imgs () {
  var masterImageArrayCopy = [...masterImageArray];
  var masterImageArrayScramb = masterImageArrayCopy.sort(sortFunc);
  var masterArr8 = [];
  for(var i = 0; i < 8; i++) {
    masterArr8.push(masterImageArrayScramb[i]);
  };
  imageArray = [...masterArr8, ...masterArr8];
  return imageArray;
};

random8Imgs();

// var imageArray = ["images/molu1.jpg", "images/molu1.jpg","images/lu2.jpg", "images/lu2.jpg","images/mo1.jpg", "images/mo1.jpg","images/su2.jpg", "images/su2.jpg","images/su.jpg", "images/su.jpg", "images/la2.jpg", "images/la2.jpg", "images/la3.jpg", "images/la3.jpg", "images/se1.jpg", "images/se1.jpg"];
var arrayCopy = [...imageArray];
var numArray=arrayCopy.sort(sortFunc);
var newGameArray = []

// sortFunc() scrambles the array
function sortFunc(a, b) {
  return 0.5 - Math.random();
};

// resetCards() sets the timer to turn back cards if there's no match
function resetCards() {
  document.getElementById(selectedDivA).style.opacity = "0.0";
  document.getElementById(selectedDivB).style.opacity = "0.0";
};

// newGame() reshuffles the image array and displays them again
function newGame() {
  console.log("GANASTEEEE");
  // reshuffle array
  random8Imgs();
  var arrayCopy = [...imageArray];
  newGameArray = arrayCopy.sort(sortFunc);
  // select divs to append new images with opacity 0
  for(var i = 0; i < newGameArray.length; i++) {
    var selectedNewCard = document.getElementsByClassName("cartas")[i];
    selectedNewCard.src = newGameArray[i];
    selectedNewCard.style.cssText = 'height:97%;width:97%;display:inline-block;padding:3px;opacity:0.0';
    // document.getElementById("buttonDiv").style.opacity = 0.1;
  };
};

// newImg() creates the image divs and appends them to the container div
function newImg () {
  for(var i = 0; i < numArray.length; i++) {
    var newImgDiv = document.createElement("Img");
    var contImgDiv = document.createElement("div");
    newImgDiv.setAttribute("class","cartas");
    contImgDiv.setAttribute("class","cartasCont");
    // newImgDiv.setAttribute("id","img"+i);
    newImgDiv.id = "carta"+i;
    newImgDiv.src = numArray[i];
    newImgDiv.style.cssText = 'height:97%;width:97%;display:inline-block;padding:3px;opacity:0.0';
    // contImgDiv.style.backgroundColor = "red";
    newImgDiv.addEventListener("click", selectCard);
    var containerDiv = document.getElementById("smallContainer");
    contImgDiv.appendChild(newImgDiv);
    containerDiv.appendChild(contImgDiv);
  }
  var startButton = document.createElement("button");
  startButton.innerText = "VOLVER A EMPEZAR!"
  startButton.id = "buttonId";
  startButton.addEventListener("click", newGame);
  var buttonDiv = document.getElementById("buttonDiv");
  buttonDiv.appendChild(startButton);
};

// hideWinDiv() toggles the win message after a few seconds
function hideWinDiv () {
  var popup = document.getElementById("winPopupCont");
  popup.style.display = "none";
};

// alertWin() displays the replay button
function alertWin() {
  var popup = document.getElementById("winPopupCont");
  popup.style.display = "inline-block";
  setTimeout(hideWinDiv,3000);
};

// popMatchInArray() deletes the matched numbers from the sorted array
function popMatchInArray() {
  console.log("Full Array " + numArray)
  var toDeleteA = numArray.indexOf(parseInt(selectedCardA[0]));
  numArray.splice(toDeleteA,1);
  console.log("Full Array " + numArray)
  var toDeleteB = numArray.indexOf(parseInt(selectedCardB[0]));
  numArray.splice(toDeleteB,1);
  console.log("Full Array " + numArray)
  document.getElementById(selectedDivA).style.backgroundColor = "orange";
  document.getElementById(selectedDivB).style.backgroundColor = "orange";
  if (numArray.length === 0) {
    setTimeout(alertWin, 200);
    // alert("GANASTE!!!");
  }
};

// compareCards() compares if the two selections are a match or not
function compareCards() {
  comparer = 0;
  if (selectedCardA[0] === selectedCardB[0]) {
    console.log("Match " + selectedCardA[0]);
    popMatchInArray()
    selectedCardA.pop();
    selectedCardB.pop();
  } else {
    console.log("NO match...");
    setTimeout(resetCards, 700);
    selectedCardA.pop();
    selectedCardB.pop();
  }
};

// selectCard() stores the click selection for two cards
function selectCard() {
  this.style.opacity = "0.9";
  if (comparer === 0 && selectedCardA.length === 0) {
    selectedCardA.push(this.src);
    console.log("A is at " + selectedCardA[0] + " && B is at " + selectedCardB[0]);
    selectedDivA = (this.id);
    comparer += 1;
  } else if (selectedCardB.length === 0 && selectedCardA.length === 1) {
    selectedCardB.push(this.src);
    console.log("A is at " + selectedCardA[0] + " && B is at " + selectedCardB[0]);
    selectedDivB = (this.id);
    comparer += 1;
      if (comparer === 2) {
        compareCards();
      }
  }
  counter += 1;
  console.log("comparer is at " + comparer);
  console.log("counter is at " + counter);
};

newImg();
