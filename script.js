console.log("Connected!");

// Variables list:
var selectedCardA = [];
var selectedCardB = [];
var counter = 0;
var comparer = 0;
var selectedDivA;
var selectedDivB;
var imageArray = ["images/molu1.jpg", "images/molu1.jpg","images/lu2.jpg", "images/lu2.jpg","images/mo1.jpg", "images/mo1.jpg","images/su2.jpg", "images/su2.jpg","images/su.jpg", "images/su.jpg", "images/la2.jpg", "images/la2.jpg", "images/la3.jpg", "images/la3.jpg", "images/se1.jpg", "images/se1.jpg"];

// randomize img array but with double the images
var numArray=imageArray.sort(sortFunc);
// console.log(numArray);

// sortFunc() scrambles the array
function sortFunc(a, b) {
  return 0.5 - Math.random();
};

function alertWin() {
  alert("GANASTE!!!");
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
    setTimeout(alertWin, 900);
    // alert("GANASTE!!!");
  }
};

// resetCards() sets the timer to turn back cards if there's no match
function resetCards() {
  document.getElementById(selectedDivA).style.opacity = "0.0";
  document.getElementById(selectedDivB).style.opacity = "0.0";
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
    newImgDiv.style.cssText = 'height:95%;width:95%;display:inline-block;padding:3px;opacity:0.0';
    // contImgDiv.style.backgroundColor = "red";
    newImgDiv.addEventListener("click", selectCard);
    var containerDiv = document.getElementById("smallContainer");
    contImgDiv.appendChild(newImgDiv);
    containerDiv.appendChild(contImgDiv);
  }
};

newImg();
