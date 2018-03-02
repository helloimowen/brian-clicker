var papersToGrade = 0; 
var papersGraded = 0;
var frameCount = 0; // globals are good. 

var element = document.getElementById("papersGraded");
var salaryDom = document.getElementById("money");
var element2 = document.getElementById("papersToGrade");
var element3 = document.getElementById("story");
var seasonDom = document.getElementById("season");
var classListDom = document.getElementById("classList"); 
var overloadWarning = document.getElementById("overload"); 
var employeeDom = document.getElementById("numEmployee");

var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


//import seasons from 'seasons.js'; // or './module'
//let seasons = seasons(); // val is "Hello";
var currentSeason;
const days = 365; 

var numClasses = 1; 

var listOfClasses = ["CSI-330"]

var overloadMax = 3; 
//fall semester = first 100 days. 
//winter break = 65 days. 
    //sort of like stardew valley. You can't do much. 
//spring semester = 100 days. 
    // new students. More 
//summer break = 105 days. 
    //brian begins making BBQ sauce. grading is replaced with barbeque sauce making. 
    //Students work on making barbeque sauce. Students fall in vats of barbeque sauce.
var classChange = true; 
var	isThursday = false;
var money = 0;  
var currentDayOfTheWeek = "";
var salary = 49000; // The very low end of a computer engineering salary. 
var numEmployees = 0;
var numAssist = 0;
var numRobot = 0;

    




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


// TAKING ON MORE CLASSES: 

function moreClasses()
{
    if (numClasses < overloadMax)
    {
        setDOM(overloadWarning, "")
        numClasses++; 

        //PREFIX-SUFFIX

        var prefixes = ["CSI", "EGP", "COR", "CIS", "CIT", "CMIT", "DFS", "EGP", "ART", "LUL"];

        var PREFIX = prefixes[Math.floor(Math.random() * prefixes.length)];

        var SUFFIX = Math.floor(Math.random() * 499);  

        var newClass = String(PREFIX) + String(SUFFIX); 

        listOfClasses.push(newClass);

        classChange = true; 
		
		salary = salary*1.75
    }
    else 
    {
        setDOM(overloadWarning, "BRIAN IS OVERLOADED AND CAN NO LONGER TAKE ON CLASSES.")
    }

}

function lessClasses()
{
    if (numClasses > 0 )
    {
        setDOM(overloadWarning, "")
        numClasses--;

        listOfClasses.pop();  

        classChange = true; 
		salary = salary/1.75
    }
}

// END 










function grade()
{
    if (papersGraded == 0 && papersToGrade > 0)
    {
        papersGraded++; 
        papersGraded += numEmployees;
        setDOM(element, "Brian has graded " + papersGraded + " assignment.");
        papersToGrade--; 
        papersToGrade -= numEmployees;
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

function hire(x)
{

    if (x == 0)
    {
        overloadMax += 1; 
        if (money >= 100)
        {
            numEmployees++;
            money -= 100;
            setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
            setDOM(salaryDom,("Brian has $" + money + "."));
        }
    }
    else if (x == 1)
    {
        overloadMax += 3; 
        if (money >= 1000)
        {
            numAssist++;
            money -= 1000;
            setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
            setDOM(salaryDom,("Brian has $" + money + "."));
        }
    }
    else if (x == 2)
    {
        overloadMax += 5; 
        if (money >= 2000)
        {
            numRobot++;
            money -= 2000;
            setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
            setDOM(salaryDom,("Brian has $" + money + "."));
        }
    }
}


function loop()
{   


    setInterval(function(){ // 30 ticks / second game loop. 
        frameCount++; 

        if(classChange)
        {
            classChange = false; 

            var names  = listOfClasses[0]

            for(var i = 1; i < listOfClasses.length; i++)
                
                names = names + " - " + listOfClasses[i]; 

            setDOM(classListDom, "Brian is taking on: " + names);

            console.log("Brian is taking on: " + names)
        }



        if (frameCount % 30 == 0)
        {
            papersToGrade += numClasses; 

            
            if(numEmployees > papersToGrade)
            {
                papersGraded += papersToGrade;
                setDOM(element, "Brian has graded " + papersGraded + " assignment.");
                papersToGrade = 0;
            }
            else
            {
                papersGraded += numEmployees;
                setDOM(element, "Brian has graded " + papersGraded + " assignment.");
                papersToGrade -= numEmployees;
            }
            //Assistants
            if((numAssist*5) > papersToGrade)
            {
                papersGraded += papersToGrade;
                setDOM(element, "Brian has graded " + papersGraded + " assignment.");
                papersToGrade = 0;
            }
            else
            {
                papersGraded += (numAssist*5);
                setDOM(element, "Brian has graded " + papersGraded + " assignment.");
                papersToGrade -= (numAssist*5);
            }
            //Robots
            if((numRobot*10) > papersToGrade)
            {
                papersGraded += papersToGrade;
                setDOM(element, "Brian has graded " + papersGraded + " assignment.");
                papersToGrade = 0;
            }
            else
            {
                papersGraded += (numRobot*10);
                setDOM(element, "Brian has graded " + papersGraded + " assignment.");
                papersToGrade -= (numRobot*10);
            }

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

