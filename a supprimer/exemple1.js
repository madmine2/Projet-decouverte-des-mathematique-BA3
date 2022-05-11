// global variable
var width_page = document.documentElement.clientWidth;
var height_page = document.documentElement.clientHeight;
var heighRatio = 0.9
var widthRatio = 0.9
var width = widthRatio*width_page;
var height = heighRatio*height_page;
var textColor = "black"
var textSize
function setup(){
     //canvas attributes
 var canv = document.createElement("canvas");
 canv.setAttribute("id","canvas_exemple1");
 var div = document.getElementById("div_canvas_exemple1");
 div.appendChild(canv);
 canv.style.position = "relative"

 //set up the context
ctx = canv.getContext("2d");
canvRect = canv.getBoundingClientRect();
    update_size()
}

//
function update_size(){
    var canv = document.getElementById("canvas_exemple1")
    var div_canv = document.getElementById("div_canvas_exemple1")
    div_canv.style.left = (1-widthRatio)/2*width_page+"px"
    div_canv.style.top = (1-widthRatio)/2*height_page+"px"
    canv.height =  height;
    canv.width = width;
    textSize = height/30 
    ctx.fillStyle = "black";
    ctx.lineWidth  = 10;
  ctx.strokeRect(0,0,width,height);
}

// fonction qui réagit aux changement de size de l'écran et qui adapte le canvas
window.addEventListener("resize",function(event){
    if (width != document.documentElement.clientWidth || height != document.documentElement.clientHeight){
        width_page = document.documentElement.clientWidth;
        height_page = document.documentElement.clientHeight;
        width = widthRatio*width_page;
        height = heighRatio*height_page;
        update_size();
        main()
    }
})
// !!!!!! à supprimer !!!!!!!!!
// outil de développement, à chaque clique donne les coordonées du curseur relatif au canvas 
window.addEventListener("click", function(ev){
    var canv = document.getElementById("div_canvas_exemple1");
    var offsetX = canv.offsetLeft
    var offsetY = canv.offsetTop;
    var x = parseInt(ev.pageX - offsetX);
    var y = parseInt(ev.pageY - offsetY);
    console.log("x : "+x/(width)*100+" %")
    console.log("y : "+y/(height)*100+" %")
})

function writeSomething(text, x , y, textSize){
    ctx.fillStyle = textColor;
    ctx.font = textSize + "px dejavu sans mono";
    ctx.fillText(text, x, y);
}

function main(){
    writeSomething('kdsml',0.3836805555555556*width,0.8540731674146606*height,1*textSize); writeSomething('knsmld',0.35185185185185186*width,0.6051951584387324*height,1*textSize); writeSomething('',1.0248842592592593*width,0.939752481980144*height,1*textSize);
}
//main
setup()
main()