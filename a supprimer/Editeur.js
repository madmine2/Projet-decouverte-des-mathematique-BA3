// global variable
var width_page = document.documentElement.clientWidth;
var height_page = document.documentElement.clientHeight;
var heighRatio = 0.9
var widthRatio = 0.9
var width = widthRatio*width_page;
var height = heighRatio*height_page;
var textColor = "black"
var textSize
var textSizeRatio = 1
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
var all_phrases = [];
var x_propo;
var y_propo;

function click_react(ev){
    var canv = document.getElementById("div_canvas_exemple1");
    var offsetX = canv.offsetLeft
    var offsetY = canv.offsetTop;
    x = parseInt(ev.pageX - offsetX);
    y = parseInt(ev.pageY - offsetY);
    x_propo = x/(width)
    y_propo = y/(height)
    //console.log("x : "+x_propo*100+" %")
    //console.log("y : "+y_propo*100+" %")
    all_phrases.push(["",x_propo,y_propo,textSizeRatio]);
    window.addEventListener("keydown", getPhrase);
    window.removeEventListener("keydown",delete_last_phrase);
}

function getPhrase(e){
    //detecte enter et affiche la phrase + l'enregistre
    if(e.key === "Enter"){
        window.removeEventListener("keydown", getPhrase);
        window.addEventListener("keydown",delete_last_phrase);
    }
    // detecte supprimer 
    else if (e.key === "Backspace") {
        all_phrases[all_phrases.length-1][0] = all_phrases[all_phrases.length-1][0].slice(0,all_phrases[all_phrases.length-1][0].length-1)
    } 
    else if (e.key ==="ArrowUp"){
        textSizeRatio = textSizeRatio + 0.1;
        all_phrases[all_phrases.length-1][3] = textSizeRatio;
    }
    else if (e.key ==="ArrowDown"){
        textSizeRatio = textSizeRatio - 0.1;
        all_phrases[all_phrases.length-1][3] = textSizeRatio;
    }
    //Detecte shift pressé pour les majuscules
    else if(e.shiftKey ){        
        if(e.key != "Shift"){
            all_phrases[all_phrases.length-1][0] +=(e.key.toUpperCase())
        }
       
    }
    // ajoute la lettre pressé au mot
    else{
        all_phrases[all_phrases.length-1][0] += e.key
    }
    draw_all_phrases();
}

function delete_last_phrase(e){

    if(e.key ==="Delete"){
        all_phrases.pop();
       
    }
    else if (e.key ==="ArrowUp"){
        textSizeRatio = textSizeRatio + 0.1
    }
    else if (e.key ==="ArrowDown"){
        textSizeRatio = textSizeRatio - 0.1
    }
    draw_all_phrases();

}
function draw_all_phrases(){
    ctx.clearRect(0,0,width,height);
    ctx.strokeRect(0,0,width,height);
    for(var i =0; i < all_phrases.length;i++){
        writeSomething(all_phrases[i][0],all_phrases[i][1]*width,all_phrases[i][2]*height,all_phrases[i][3]*textSize)
    }
    writeSomething("Exemple",0.7*width,0.95*height,textSizeRatio*textSize);
}
function writeSomething(text, x , y, textSize){
    console.log(text)
    ctx.fillStyle = textColor;
    ctx.font = textSize + "px dejavu sans mono";
    ctx.fillText(text, x, y);
}

function writeFile(){
    var allcommand = ""
    for(var i =0; i < all_phrases.length;i++){
        var command = "writeSomething(";
        command = command + "'"+all_phrases[i][0]+"'"+","+all_phrases[i][1]+"*width"+","+all_phrases[i][2]+"*height"+","+all_phrases[i][3]+"*textSize"+");";
       
        allcommand = allcommand +" " + command
    }
    console.log(allcommand)
}
function main(){
    window.addEventListener("click",click_react );
    draw_all_phrases()
}
//main
setup()
main()