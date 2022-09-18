
var buttonColours=["red","blue","green","yellow"];
var userPattern=[];
var gamePattern=[];
var started=false;
var level=0;
$("H1").click(function(event){
    if(!started){
        nextSequence();
        started=true;
    }
});
function nextSequence() {
    userPattern=[];
    level++;
    $("h1").text("level "+level);
    var number = Math.random();
    number = number * 4;
    number = Math.floor(number);
    var randomColor=buttonColours[number];
    gamePattern.push(randomColor);
    
    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}
$(".btn").click(function(){
    var userChoosenColour=$(this).attr("id");
    userPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAns(userPattern.length-1);
})
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
function checkAns(currentIndex){
    if(gamePattern[currentIndex]===userPattern[currentIndex]){

        if(gamePattern.length===userPattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("game over press any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        playAgain();
    }
}
function playAgain(){
    gamePattern=[];
    level=0;
    started=false;
}