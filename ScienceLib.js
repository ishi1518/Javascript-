var lg= (a) => console.log(a); // lg("sfgdfg")
var GetEl = (e) => {return document.querySelector(e)}; // GetEl("#master span")
var GetEls=  (e) => {return document.querySelectorAll(e)};
var EvtsBind = (e,n,t) =>{let c=GetEls(e);c.forEach(e=>{e.addEventListener(n,t)})}
var EvtsRemove = (e,n,t) =>{let c=GetEls(e);c.forEach(e=>{e.removeEventListener(n,t)})}
var elmsClsRemv = (e,l) =>{GetEls(e).forEach(e=>{e.classList.remove(l)})}
var elmsClsAdd = (e,l) =>{GetEls(e).forEach(e=>{e.classList.add(l)})}
let shuffleArr = (r) =>{for(var f,n,o=r.length;0!==o;)n=Math.floor(Math.random()*o),f=r[--o],r[o]=r[n],r[n]=f;return r};

function findParentBySelector(e,r){  //Independent//e=target elm,r= selector
  var n=e.outerHTML.search(r);for(var o=GetEls(r),t=e.parentNode;t&&!function(e,r){for(var n=0,o=e.length;n<o;n++)if(e[n]==r)return 1}(o,t);)t=t.parentNode;return t||(-1<n?e:t)
}

function random_item(items) {
	var rendom = items[Math.floor(Math.random() * items.length)];
	items.splice(items.indexOf(rendom), 1);
	return rendom;
}


function randomNumberNorepeat(len)   //random number without repeat digit
{ 
   if(len>10)
   {
     return;
   }
let arr=[];        
let random1="";
for(let i=0;i<len;i++){
let x = Math.floor(Math.random() * 10);
while((x==0 && i==0) )
 {
 x = Math.floor(Math.random() * 10);
} 

while(arr.indexOf(x)>-1){
   x = Math.floor(Math.random() * 10);
}
arr.push(x)

random1 += x.toString();

}
return parseInt(random1);
}



function randomNumber(len){         //random number 
    let random1="";
    for(let i=0;i<len;i++){
    let x = Math.floor(Math.random() * 10);
    while(x==0 && i==0){
     x = Math.floor(Math.random() * 10);
    }
    random1 += x.toString();
    }
    return parseInt(random1);
}


function rendomNumsGenrtor(len,num)     //find number with limit and digits
{
  let arr =[];
for(let i=0;i<num;i++){
let num = randomNumber(len);
while(arr.indexOf(num)>-1){
  num = randomNumber(len);
}
 arr.push(num);

}
return arr;
}

let RR = (max,min) => Math.floor(Math.random()*(max-min))+min;


// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
let dist=(x1,y1,x2,y2) =>{ 
  return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) )
};

function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

// Check if none of the lines are of length 0
if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
return false
}

denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

// Lines are parallel
if (denominator === 0) {
return false
}

let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

// is the intersection along the segments
// if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
// return false
// }

// Return a object with the x and y coordinates of the intersection
let x = x1 + ua * (x2 - x1)
let y = y1 + ua * (y2 - y1)
// console.log(ua,ub)
// if (ua < 0 || ua > 1) {
// return [x3,y3];
// }else if(ub < 0 || ub > 1){
//   return [x1,y1];
// }
return [x, y];
}

function NumAtr(sel,atr){
 return parseFloat(GetEl(sel).getAttribute(atr));
}
function setAtr(sel,atr,val){
GetEl(sel).setAttribute(atr,val);
}
let GroupMaker=(x,y,scale,rotate,inner)=>{return `<g style="transform-box: fill-box;transform-origin: center;transform: rotate(${rotate}deg) translate(${x}px, ${y}px) scale(${scale});">${inner}</g>`}

let text=(x,y,Txt,id)=>{return `<text id="${id}" x="${x}" y="${y}" style="font-size:24px;font-weight:bold;fill:white">${Txt} </text>`;}

function ImagetagMAker(x, y, wid, img) {
  return `<image class="IImg" x="${x}" y="${y}"  width="${wid}" href="${img}" />`;
}