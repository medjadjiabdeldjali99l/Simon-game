
var buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern=[];


function nextSequence(){
    i++;
    var  nmbr =Math.floor(Math.random() * 3) + 1;
    randomChosenColour = buttonColours[nmbr];
    animatePress(randomChosenColour);
    gamePattern.push(randomChosenColour);
    //pour le flashh when you appliy
    
    return nmbr ;
}

randomChosenColour=buttonColours[nextSequence];
var button = $("#"+randomChosenColour);
function flashButton() {
    button.animate({ opacity: 0 }, 100, "linear", function() {
    button.animate({ opacity: 1 }, 100);
});
}
button.on("click", flashButton);

//pour le son des buttons 
var buttonn=$(".btn"); 
buttonn.on("click",cc);
function cc(){
    var value = $(this).attr('id');
    userClickedPattern.push(value); 
    pozz(value,userClickedPattern.length);
}

function pozz(value,kk){
    console.log(kk)
    if (value===gamePattern[kk-1]){
        var audio = new Audio('./sounds/'+gamePattern[kk-1]+'.mp3');
        audio.play();
        animatePress(value);
    }
    else{
        animatePress(value);
        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        animateback();
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
           location.reload();
        }, 2000);
        i=0;

    }

    
}
//animation when press 
function animatePress(currentColour){
    $('#'+currentColour).addClass("pressed");
    setTimeout(function() {
        $('#'+currentColour).removeClass("pressed");
      }, 100);
}


var i=0;
$(document).keydown(function(event) {
    
    gamePattern =[];
    userClickedPattern=[];

    game();


  });

count=5000;
function game (){
     
    console.log("debut");
    userClickedPattern=[];
    nextSequence();
    $("h1").text("level "+i);

    setTimeout(function () {
        console.log("jsp");
        console.log(gamePattern , userClickedPattern);
        var value = $(this).attr('id');


        if (arraysAreEqual(gamePattern , userClickedPattern)){
            console.log("goooooooooooooood");
        }
        else {
            animatePress(value);
            var audio = new Audio('./sounds/wrong.mp3');
            audio.play();
        }

        game();
    }, count);

    
       
}

function animateback(){
    $("body").addClass("pressed_back");
    setTimeout(function() {
        $("body").removeClass("pressed_back");
      }, 200);
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}


