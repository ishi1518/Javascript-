
let BgMusic = new Audio(audioFiles['Background']);
let Instruction = new Audio(audioFiles['Instruction']);
let Right = new Audio(audioFiles['Right']);
let Wrong = new Audio(audioFiles['Wrong']);

let RWVO = {}
let AllVoArr = [BgMusic,Instruction,Wrong,Right]

let dotimg = `${images["dot"]}`;
let homeimg = `${images["Home"]}`;
let introimg = `${images["Ibtn"]}`;
let unmuteimg = `${images["Unmute"]}`;
let minimg = `${images["Min"]}`;
let muteimg = `${images["Mute"]}`;
let maximg = `${images["Max"]}`;
let okbtn = `${images["okbtn"]}`;
let Bgimg = `${images["Background"]}`; $('#bgimg').attr('href', Bgimg);

const data = [ 
    { sentences: ["downward"], word: ["upward"] }, 
    { sentences: ["slowly"],  word: ["fast"] }, 
    { sentences: ["little"], word: ["big"] }, 
    { sentences: ["slender"], word: ["fat"] }, 
    { sentences: ["mighty"], word: ["weak"]}, 
    { sentences: ["day"], word: ["night"]}, 
];