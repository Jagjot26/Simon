var colors=[
  'green', 'red', 'yellow', 'blue'
];

var gamePattern=[];
var userClickedPattern=[];
var userChosenColor;
var counter=0;
var levelCounter=1;
var aBoolValue=false;
keyBoolValue=false;

function changeHeading(){
  $("#level-title").hide();
  $("#level-title").text("Level " + levelCounter);
  $("#level-title").fadeIn();
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $('#'+currentColor).addClass("pressed");
  setTimeout(function(){$('#'+currentColor).removeClass("pressed");}, 100);
}

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = colors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}


function goAhead(){
  if(gamePattern[counter-1] !== userClickedPattern[counter-1])//when game over happens, stuff to do
   {
     keyBoolValue=false;
     $("body").addClass("game-over");
     setTimeout(function(){$("body").removeClass("game-over");}, 230);
     $("#level-title").text("Game Over, n00b. Press any key to restart!");

     var audi=new Audio('sounds/wrong.mp3');
     audi.play();
     $(document).on("keydown",function(){
       if(keyBoolValue==false){
       keyBoolValue=true;
       levelCounter=1;
       counter=0;
       gamePattern=[];
       userClickedPattern=[];
       changeHeading();
        nextSequence();
      }
     });

   }
   if(gamePattern.length!==0 && counter===gamePattern.length && gamePattern[counter-1] === userClickedPattern[counter-1])//after each level
   {
     levelCounter++;
     changeHeading();
  userClickedPattern=[];
   counter=0;
   setTimeout(nextSequence,700);
   }
}


// ON FUNCTION, EVENTLISTENER FOR JQUERY
$(document).on("keydown",function(){
 if(event.key==='a' && aBoolValue===false)
 {
   nextSequence();
   changeHeading();
   aBoolValue=true;
 }
});


//  OR, USE THIS:  $(this).attr("id");

$('.btn').on("click",function(event){
userChosenColor=this.id;
animatePress(userChosenColor);

playSound(userChosenColor);
userClickedPattern.push(userChosenColor);
counter++;
if(counter<=gamePattern.length){
  goAhead();
}
});
