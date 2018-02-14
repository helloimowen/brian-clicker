var papersToGrade = 0; 
var papersGraded = 0;
var frameCount = 0; // globals are good. 

var element = document.getElementById("papersGraded");
var element2 = document.getElementById("papersToGrade");
var element3 = document.getElementById("dying");

function grade()
{



    if (papersGraded == 0 && papersToGrade > 0)
    {
        papersGraded++; 
        element.innerHTML = "Brian has graded " + papersGraded + " assignmet.";
        papersToGrade--; 
    }
    else if (papersToGrade > 0)
    {
        papersGraded++; 
        element.innerHTML = "Brian has graded " + papersGraded + " assignmets.";
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


    }, (1000 / 30));
}

function calculatePapers()
{

     if (papersToGrade == 1)
        {
            element2.innerHTML = "Brian has " +  papersToGrade + " assignmet to grade.";
        }
        else
        { 
            element2.innerHTML = "Brian has " +  papersToGrade + " assignmets to grade.";
        }

}

function dying()
{
    if (papersGraded > 20)
    {
        element3.innerHTML = "Bryan doesn't want to grade anymore papers. But he can't hire anyone because this game is not finished.";
    }
}