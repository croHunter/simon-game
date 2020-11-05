boxColor = ["green", "red", "yellow", "blue"];
var gamePaternColor = [];
var userPaternColor = [];
var start = false;
var level = 0;
var userName=prompt("Enter Your Name: ");
$(document).on("keydown", function () {
    if (!start) {

        nextRound();
        start = true;
    }
});
$(".start-btn").on("click", function () {
    if (!start) {
        nextRound();
        start = true;
    }
});
var levelBar;
function nextRound() {
    userPaternColor = [];
    level++;
    // $(".heading").text("level " + level);    
    $('.heading').css("display","none");
    levelBar=$(".level-mbl").css("display","block");
   levelBar.text("level " + level);

    var RandomNumber = generateRandom();
    var activeColorBox = boxColor[RandomNumber];
    gamePaternColor.push(activeColorBox);
    for (let i = 0; i < gamePaternColor.length; i++) {
        setTimeout(function () {
            boxAnimation(gamePaternColor[i]);
            playSound(gamePaternColor[i]);
        }, i * 500);
    }

}
console.log(gamePaternColor.length);

    $(".box").on("click", function () {
        var clickedBoxColor = $(this).attr("id");
        userPaternColor.push(clickedBoxColor);
        boxFocus(clickedBoxColor);
        playSound(clickedBoxColor);
        checkAnswer(userPaternColor.length - 1);
        console.log(gamePaternColor);
        console.log(userPaternColor);
    });

function checkAnswer(currentLevel) {
    if (gamePaternColor[currentLevel] === userPaternColor[currentLevel]) {
        if (gamePaternColor.length === userPaternColor.length) {
            console.log("Compare matched");
            setTimeout(function () {
                nextRound();
            }, 1000);
        }
    }
    else {
       
        playSound("wrong");
        // $(".heading").text("Game Over, Press any key to Restart")
        levelBar.text("Game Over, Press Start or any key to Restart");
        var output="Max Level of "+userName+" is "+level;
       setTimeout(() => {
        alert(output);
        startOver();
       }, 100);
        console.log("level :"+level);
       
        

    }
}
function startOver() {
    level=0;
    gamePaternColor = [];
    start = false;
}
function generateRandom() {
    var rand = Math.random();
    rand = rand * 4;//0-3
    rand = Math.floor(rand);//0-3
    return rand;
}
function boxAnimation(activeColorBox) {
    $("#" + activeColorBox).fadeOut().fadeIn();
}
function playSound(activeColorBox) {
    var sound = new Audio("sounds/" + activeColorBox + ".mp3");
    sound.play();
}

function boxFocus(clickedBoxColor) {
    $("#" + clickedBoxColor).addClass("focus");
    setTimeout(function () {
        $("#" + clickedBoxColor).removeClass("focus");
    }, 100);
}