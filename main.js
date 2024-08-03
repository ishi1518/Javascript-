let suffleimgs = shuffleArr([...data]);
let suffleimgsindex = -3;
let rightimgfunCounter = 0;
let isMute = false;

BgMusic.loop = true;
let strtclick = document.getElementById("strtbtn");
strtclick.addEventListener("click", MainCaller);

function MainCaller() {
  document.getElementById("StartDiv").classList.add("hide");
  document.getElementById("kidplayground").classList.remove("hide");

  init();

  Rightimgfun();
}
function disableClickEvents() {
  document.getElementById("Actforeignobj").style.pointerEvents = "none";
}

// Function to enable click events
function enableClickEvents() {
  document.getElementById("Actforeignobj").style.pointerEvents = "auto";
}
function init() {
  document.getElementById("kidplayground").innerHTML = Mainfun();
  Instruction.play();

  Instruction.onended = function () {
    BgMusic.play();
    BgMusic.volume = 0.1;
    enableClickEvents();
  };

  disableClickEvents();
  anime({
    targets: "#ducfisswandiv",
    translateY: [-1200, 0],
    duration: 2000,
    easing: "easeInOutQuad",
  });

  clicker();
}

function Mainfun() {
  return (svg = `<svg id="MainSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
    <svg>
        <image href="${Bgimg}" width="1920" height="1080" />
        <rect width="1880" x="20" height="1040" y="20" fill="transparent" stroke="black" rx="20" ry="20" />
        <svg id="lineContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
        </svg>
        <foreignObject y="0" id="Actforeignobj" width="1920" height="1080">
         <div class="bgdiv" id="bgdiv">
              <div class="perentmaindiv" id="perentmaindiv">
                  <div class="mainmatchDiv" id="mainmatchDiv"></div>
            </div>
            </div>
        </foreignObject>
        ${Btnhome()}
       
             <div class="container-fluid blue-bg">${InstructionMaker()}</div>

    </svg>
</svg>
    
    `);
}

function Btnhome() {
  return (btn = `<foreignObject class="IcoHome hide" id="IcoHome" x="1450" y="30" width="450" height="120">
    <div class="icon">
        <i id="HomeIco"><img src="${homeimg}"></i>
        <i id="introIco"><img src="${introimg}"></i>
        <i class="fa-volume-high volume" id="volumeUnmute"><img src="${unmuteimg}"></i>
        <i class="fa-expand Expand " id="maxmin"><img isMute="false" src="${minimg}"></i>

      </div>

      
</foreignObject>`);
}

function Rightimgfun() {
  suffleimgsindex += 3;
  console.log(suffleimgsindex);

  if (suffleimgsindex == 6) {
    document.getElementById("StartDiv").classList.remove("hide");
    document.getElementById("kidplayground").classList.add("hide");
  }

  document.getElementById("IcoHome").classList.remove("hide");

  document.getElementById("Actforeignobj").innerHTML = `
    <div class="perentmaindiv">
      <div class="mainmatchDiv" id="mainmatchDiv">${Questionanswer()}</div>
    </div>`;

  function Questionanswer() {
    let output = "";
    output += '<div class="fristdiv prntdukfiswan" id="fristdiv">';
    let wordSet = [];
    let nameSet = [];

    // Collect words and sentences
    for (let i = 0; i < 3; i++) { // Adjusted to loop 3 words
      let index = (suffleimgsindex + i) % suffleimgs.length;
      let word = suffleimgs[index].word[0];
      let sentence = suffleimgs[index].sentences[0];
      wordSet.push({ word: word, sentence: sentence });
      nameSet.push(word);

      output += `
      <div class="imgdiv" id="imgdiv${i}">
       
        <div class="g${word}" id="ducfisswandiv" checkmathpair="${word}">
          <span>${sentence}</span>
        </div>
        <div class="matchround ducfisswandiv" checkmathpair="${word}"></div>
      </div>`;
    }
    output += "</div>";

    // Shuffle the word set ensuring no word is in the same position as its corresponding sentence
    let shuffledWords = shuffleArr(wordSet.slice());

    // Check and adjust positions if necessary
    for (let i = 0; i < shuffledWords.length; i++) {
      if (shuffledWords[i] === wordSet[i]) {
        // Swap with the next element or the previous one if it's the last element
        if (i === shuffledWords.length - 1) {
          [shuffledWords[i], shuffledWords[i - 1]] = [
            shuffledWords[i - 1],
            shuffledWords[i],
          ];
        } else {
          [shuffledWords[i], shuffledWords[i + 1]] = [
            shuffledWords[i + 1],
            shuffledWords[i],
          ];
        }
      }
    }

    output += '<div class="secdiv prntdukfiswan" id="secdiv">';
    shuffledWords.forEach((wordObj) => {
      output += `
      <div class="imgdiv" id="imgdiv1">
        <div class="matchround ducfisswandiv" checkmathpair="${wordObj.word}"></div>
        <div class="g${wordObj.word}" id="ducfisswandiv1" checkmathpair="${wordObj.word}">
          <span>${wordObj.word}</span>
        </div>
      </div>`;
    });
    output += "</div>";

    return output;
  }

  anime({
    targets: ".imgdiv",
    scale: [0.5, 1],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeInOutQuad",
    complete: function () {
      let matchclick = document.querySelectorAll(".ducfisswandiv");
      matchclick.forEach(function (element) {
        element.addEventListener("click", MainMatchfun);
      });

      // Add click event listeners for the image divs
      let imageDivs = document.querySelectorAll(".image-div");
      imageDivs.forEach(function (element) {
        element.addEventListener("click", function () {
          let audioSrc = element.getAttribute("data-audio");
          let audio = playAudio(audioSrc); // Use the updated playAudio function

          // Disable click events on mainmatchDiv
          document.getElementById("mainmatchDiv").style.pointerEvents = "none";
          
          audio.onended = function () {
            // Re-enable click events on mainmatchDiv
            document.getElementById("mainmatchDiv").style.pointerEvents = "auto";
          };
        });
      });
    },
  });
}

let firstClickId = null;
let secondClickId = null;

function MainMatchfun(e) {
  BgMusic.volume = 0.1;

  setTimeout(() => {
    BgMusic.volume = 0.1;
  }, 1000);

  let elm = findParentBySelector(e.target, ".ducfisswandiv");
  let clickedId = elm.getAttribute("checkmathpair");

  if (!firstClickId) {
    firstClickId = clickedId;
    elm.removeEventListener("click", MainMatchfun);
    elm.classList.add("green-color"); // Add green color to the first clicked element
  } else {
    secondClickId = clickedId;
    elm.removeEventListener("click", MainMatchfun);
    elm.classList.add("green-color"); // Add green color to the second clicked element

    if (firstClickId === secondClickId) {
      let elms = document.querySelectorAll(`.g${firstClickId}`);
      let elms2 = document.querySelectorAll(`.g${secondClickId}`);
      drawLine(elms[0].nextElementSibling, elms2[1].previousElementSibling);
      BgMusic.volume = 0.1;
      
      let matchclick = document.querySelectorAll(".ducfisswandiv");
      matchclick.forEach(function (element) {
        element.removeEventListener("click", MainMatchfun);
      });
      
      // Use the Base64 audio from the audioFiles object
      Right.play();
      Right.onended = function () {
        const base64AudioData = audioFiles[firstClickId];
        let Answervo = new Audio(base64AudioData);
        AllVoArr.push(Answervo);
        Answervo.play();
        Answervo.muted = isMute;
        Answervo.onended = function () {
          matchclick.forEach(function (element) {
            element.addEventListener("click", MainMatchfun);
          });

          
        if (matchcls.length === 3) { 
          confetti({
            particleCount: 200,
            spread: 200,
            origin: { y: 0.6, x: 0.48 },
          });
          setTimeout(() => {
            document.getElementById("lineContainer").innerHTML = ''; // Clear the lines
            // document.getElementById("Actforeignobj").innerHTML = '';
            Rightimgfun(); // Call the function to load the next set of 3 words
          }, 2000);
        }
        };
        BgMusic.volume = 0.1;

        firstClickId = null;
        secondClickId = null;
        elms[0].classList.add("matched");
        let matchcls = document.querySelectorAll(".matched");

      };
    } else {
      let matchclick = document.querySelectorAll(".ducfisswandiv");
      matchclick.forEach(function (element) {
        element.removeEventListener("click", MainMatchfun);
      });

      Wrong.play();
      BgMusic.volume = 0.1;

      Wrong.addEventListener("ended", () => {
        matchclick.forEach(function (element) {
          element.addEventListener("click", MainMatchfun);
        });

        BgMusic.volume = 0.1;
        firstClickId = null;
        secondClickId = null;
        // Remove green color if the match is incorrect
        document.querySelectorAll('.green-color').forEach(element => {
          element.classList.remove('green-color');
        });
      });

      setTimeout(() => {
        BgMusic.volume = 0.1;
      }, 2000);
    }
  }
}

function drawLine(dot1, dot2) {
  const svgContainer = document.getElementById('lineContainer');
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

  const point1 = createSVGPoint(getElementCenterX(dot1), getElementCenterY(dot1));
  const point2 = createSVGPoint(getElementCenterX(dot2), getElementCenterY(dot2));

  const svgPoint1 = point1.matrixTransform(svgContainer.getScreenCTM().inverse());
  const svgPoint2 = point2.matrixTransform(svgContainer.getScreenCTM().inverse());

  // Add the offset to the coordinates
  const offsetX = 0;
  const offsetY = 0;

  line.setAttribute('x1', svgPoint1.x + offsetX);
  line.setAttribute('y1', svgPoint1.y + offsetY);
  line.setAttribute('x2', svgPoint2.x + offsetX);
  line.setAttribute('y2', svgPoint2.y + offsetY);
  line.setAttribute('stroke', 'green');
  line.setAttribute('stroke-width', '5');

  svgContainer.appendChild(line);
}


function createSVGPoint(x, y) {
  const point = MainSvg.createSVGPoint();

  point.x = x;
  point.y = y;
  return point;
}


function getElementCenterX(dot) {
  const rect = dot.getBoundingClientRect();
  return rect.left + rect.width / 2;
}

function getElementCenterY(dot) {
  const rect = dot.getBoundingClientRect();
  return rect.top + rect.height / 2;
}

function Loading() {
 
  setTimeout(() => {
    document.getElementById("StartDiv").classList.remove("hide");
    document.getElementById("kidplayground").classList.add("hide");
  }, 2000);
}

// Utility function to find the parent element with a specific selector
function findParentBySelector(element, selector) {
  while (element) {
    if (element.matches(selector)) {
      return element;
    }
    element = element.parentElement;
  }
  return null;
}
window.addEventListener('load', () => {
  setTimeout(() => {
    // Hide the loading screen
    document.getElementById('loading-screen').style.display = 'none';
  }, 2000);
 });
 
function clicker() {
  $("#HomeIco").off().on("click", HistroyMinus);
  $("#introIco").off().on("click", ShowIntro);
  $("#volumeUnmute").off().on("click", MuteUnmute);
  $("#maxmin").off().on("click", ScreenMaxMin);
  $("#introOk").off().on("click", HideIntro);
}

function InstructionMaker() {
  return (str = `<div id="IntroBoardDiv">
      <div id="IntroBoardDivimg">
        <ol id="IntroText">
        <li><img src="${unmuteimg}" style="width:40px; height:40px;"> This icon will help you to turn the sound on or off.</li>
        <br><li><img src="${homeimg}" style="width:40px; height:40px;"> This icon will help you to go to the previous page.</li>
        <br><li><img isMute="false" src="${minimg}" style="width:40px; height:40px;"> This icon will help you zoom in or out of the page.</li>
        <br><li><img isMute="false" src="${dotimg}" style="width:45px; height:40px;">Click on the given dot for match opposite words.</li>
        </ol>
        <div id="introOk" style="background:url(${okbtn});background-position: center;background-size: contain;">
          Okay
        </div>
      </div>
    </div>
   `);
}

var full = !0,
  elem = document.documentElement;
function isFullScreen() {
  return (
    window.innerWidth === screen.width && window.innerHeight === screen.height
  );
}

function ScreenMaxMin() {
  (isFullScreen() ? closeFullscreen : openFullscreen)();
}

function MuteUnmute() {
  isMute = !isMute;
  let muteIcon = $("#volumeUnmute img");
  muteIcon.attr("isMute", isMute.toString());
  muteIcon.attr("src", isMute ? muteimg : unmuteimg);
  
  AllVoArr.forEach((element) => {
      element.muted = isMute;
  });
}

function HideIntro() {
  anime({
    targets: "#IntroBoardDiv",
    top: ["0", "-100%"],
    duration: 700,
    easing: "easeInOutQuad",
  });
}
function ShowIntro() {
  anime({
    targets: "#IntroBoardDiv",
    top: ["-100%", "0"],
    duration: 700,
    easing: "easeInOutQuad",
  });
}

function HistroyMinus() {
  // window.parent.postMessage("closewindow", "*");
  window.parent.document.location.reload();
}

function openFullscreen() {
  // console.log($("#maxmin img").attr("src"));
  $("#maxmin img").attr("src", minimg);
  window.parent.postMessage("FullscreenOn", "*");
}

function closeFullscreen() {
  // console.log($("#maxmin img").attr("src"));
  $("#maxmin img").attr("src", maximg);
  window.parent.postMessage("FullscreenOff", "*");
}

function openFullscreen() {
  if (!isFullScreen()) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
    $("#maxmin img").attr("src", minimg);
  }
}

function closeFullscreen() {
  if (isFullScreen()) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
    $("#maxmin img").attr("src", maximg);
  }
}
