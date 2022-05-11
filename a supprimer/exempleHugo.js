var width
var height
function setup(){
    width = document.documentElement.clientWidth*0.9;
    height = document.documentElement.clientHeight*0.9;
    var canv = document.createElement("canvas");
    canv.setAttribute("id","canvasHugo");
    var div = document.getElementById("div_canvas");
    div.appendChild(canv)
    canv.width = width;
    canv.height = height;
}




function premier_dessin(x,y,taille){
ctx.lineWidth = 10
ctx.fillStyle = "black"
ctx.strokeRect(x,y,taille,taille)
}



function resizeFunction(){
    width = document.documentElement.clientWidth*0.9;
    height = document.documentElement.clientHeight*0.9;
    canv.width = width;
    canv.height = height;   
}

function ballAppear(event){
    if(event.key === " "){
        window.addEventListener("mousemove",sourisBall);
        window.removeEventListener("keydown",ballAppear)
        
    }

}

function sourisBall(event){
        var canv_id = document.getElementById("div_canvas");
        var offsetX = canv_id.offsetLeft;
      
        var offsetY = canv_id.offsetTop;
        console.log(event.pageX)
        x = parseInt(event.pageX - offsetX);
        y = parseInt(event.pageY - offsetY);
        var canv = document.getElementById("canvasHugo");
        canv.width = width+1;
        canv.width = width-1;
        drawSphere(x,y,0.05*width);
}
function drawSphere(x,y,size){

console.log(y)
ctx.fillStyle = "red";
ctx.strokeStyle ="red"
ctx.beginPath();
ctx.arc(x,y,size,0,2*Math.PI);
ctx.fill();
ctx.stroke();
console.log(ctx)
}

function main(){
setup();
window.addEventListener("resize",resizeFunction)
window.addEventListener("keydown",ballAppear)

}
main()
var canv = document.getElementById("canvasHugo");
var ctx = canv.getContext("2d");