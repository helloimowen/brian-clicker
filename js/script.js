var papersToGrade = 0; 
var papersGraded = 0;
var frameCount = 0; // globals are good. 

var element = document.getElementById("papersGraded");
var salaryDom = document.getElementById("money");
var element2 = document.getElementById("papersToGrade");
var element3 = document.getElementById("story");
var seasonDom = document.getElementById("season");

var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


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

var	isThursday = false;
var money = 0;  
var currentDayOfTheWeek = "";
var salary = 49000; // The very low end of a computer engineering salary. 

    
class seasons
{
    constructor(){
        days = 365;
        currentSeason = seasonsENUM.fall;
    }



    static checkSeason(frame){

        frame = frame % days; 

        

        if (frame <= 100) // increment a day every three seconds. 
        {       // This changes the season around... every five minutes. 
            currentSeason = "Fall";
        }
        else if  (frame > 100 && frame <= 165)
        {
            currentSeason = "Winter";
        }
        else if (frame > 165 && frame <= 265)
        {
            currentSeason = "Spring";
        }
        else
        {
            currentSeason = "Summer";
        }

        return currentSeason;
    } 

    static checkDay(frame)
    {
        
        currentDayOfTheWeek = daysOfTheWeek[frame];
		return currentDayOfTheWeek;
    }
}


function grade()
{



    if (papersGraded == 0 && papersToGrade > 0)
    {
        papersGraded++; 
        setDOM(element, "Brian has graded " + papersGraded + " assignment.");
        papersToGrade--; 
    }
    else if (papersToGrade > 0)
    {
        papersGraded++; 
        setDOM(element, "Brian has graded " + papersGraded + " assignments.");
        papersToGrade--; 
    }

    story();

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

        if (frameCount % 90 == 0)
            setDOM( seasonDom, "It is currently the " + seasons.checkSeason(frameCount / 90) + ". " + seasons.checkDay((frameCount / 90) % 7) + " - day " + Math.floor(frameCount / 90) );
 
        if ( currentDayOfTheWeek == "Thursday" && !isThursday)
            {
                money += Math.floor(salary / 52);
				setDOM(salaryDom,("Brian has $" + money + "."));
				isThursday = true;
				
            }
		if (currentDayOfTheWeek != "Thursday")
			{
				isThursday = false;
			}

    }, (1000 / 30));
}

function calculatePapers()
{

     if (papersToGrade == 1)
        {
            //element2.innerHTML = "Brian has " +  papersToGrade + " assignmet to grade.";
            setDOM(element2, ("Brian has " +  papersToGrade + " assignments to grade."));
        }
    else
        { 
            //element2.innerHTML = "Brian has " +  papersToGrade + " assignmets to grade.";
            setDOM(element2, "Brian has " +  papersToGrade + " assignments to grade.");
        }

}

function story()
{

    if (papersGraded < 20)
        setDOM(element3, "You are Brian R Hall, a new professor at Champlain College. It is your job to grade everyone's assignments.")

    else if (papersGraded > 20 && papersGraded < 40)
        setDOM(element3, "Brian doesn't want to grade anymore Assignments.")

    else if(papersGraded > 100)
        setDOM(element3, "Brian begins to look for help.")
	
	
    
}


function setDOM(element, string) // pass an item in the DOM some text. 
{
    element.innerHTML = string; 
}

