var papersToGrade = 0; 
var papersGraded = 0;
var frameCount = 0; // globals are good. 

var element = document.getElementById("papersGraded");
var element2 = document.getElementById("papersToGrade");
var element3 = document.getElementById("dying");
var seasonDom = document.getElementById("season");

//import seasons from 'seasons.js'; // or './module'
//let seasons = seasons(); // val is "Hello";
var currentSeason;
const days = 365; 
//fall semester = first 100 days. 
//winter break = 65 days. 
    //sort of like stardew valley. You can't do much. 
//spring semester = 100 days. 
    // new students. More 
//summer break = 105 days. 
    //brian begins making BBQ sauce. grading is replaced with barbeque sauce making. 
    //Students work on making barbeque sauce. Students fall in vats of barbeque sauce. 

    
class seasons
{
    constructor(){
        days = 365;
        currentSeason = seasonsENUM.fall;
    }



    static checkSeason(frame){

        frame = frame % days; 

        frame /= 90; 

        if (frame <= 100) // increment a day every three seconds. 
        {       // This changes the season around... every five minutes. 
            currentSeason = "fall";
        }
        else if  (frame > 100 && frame <= 165)
        {
            currentSeason = "winter";
        }
        else if (frame > 165 && frame <= 265)
        {
            currentSeason = "spring";
        }
        else
        {
            currentSeason = "summer";
        }

        return currentSeason;
    } 
}


function grade()
{



    if (papersGraded == 0 && papersToGrade > 0)
    {
        papersGraded++; 
        setDOM(element, "Brian has graded " + papersGraded + " assignmet.");
        papersToGrade--; 
    }
    else if (papersToGrade > 0)
    {
        papersGraded++; 
        setDOM(element, "Brian has graded " + papersGraded + " assignmets.");
        papersToGrade--; 
    }

    dying();

    calculatePapers();
} 


function loop()
{   


    setInterval(function(){ // 30 ticks / second game loop. 
        frameCount++; 


        if (frameCount % 30 == 0)
        {
            papersToGrade++; 


            calculatePapers();
        }

        setDOM( seasonDom, "It is currently the " + seasons.checkSeason(frameCount) + ". Day " + Math.floor(frameCount / 90) );
 



    }, (1000 / 30));
}

function calculatePapers()
{

     if (papersToGrade == 1)
        {
            //element2.innerHTML = "Brian has " +  papersToGrade + " assignmet to grade.";
            setDOM(element2, ("Brian has " +  papersToGrade + " assignmet to grade."));
        }
    else
        { 
            //element2.innerHTML = "Brian has " +  papersToGrade + " assignmets to grade.";
            setDOM(element2, "Brian has " +  papersToGrade + " assignmets to grade.");
        }

}

function dying()
{
    if (papersGraded > 20)
    {
        setDOM(element3, "Bryan doesn't want to grade anymore papers. But he can't hire anyone because this game is not finished.")
    }
}


function setDOM(element, string) // pass an item in the DOM some text. 
{
    element.innerHTML = string; 
}

