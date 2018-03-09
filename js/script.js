var papersToGrade = 0;
var papersGraded = 0;
var frameCount = 0; // globals are good.

var element = document.getElementById("papersGraded");
var salaryDom = document.getElementById("money");
var element2 = document.getElementById("papersToGrade");
var element3 = document.getElementById("story");
var element4 = document.getElementById("work");
var seasonDom = document.getElementById("season");
var classListDom = document.getElementById("classList");
var overloadWarning = document.getElementById("overload");
var employeeDom = document.getElementById("numEmployee");
var bookDom = document.getElementById("booksWritten");

var pricePA = document.getElementById("pa");
var priceRB = document.getElementById("rb");

var empList = document.getElementById("employeeList");

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
var isThursday = false;
var isMonday = false;
var money = 0;
var currentDayOfTheWeek = "";
var salary = 49000; // The very low end of a computer engineering salary.
var numEmployees = 0;
var numAssist = 0;
var numRobot = 0;
var meeting = false;
var summer = false;
var BBQ = 0;
var numTas = 0;
var books = 0;
var width = 0;
var stressWidth = 0;
var bookProgress = document.getElementById("myBar"); 
var stressLevel = document.getElementById("stressBar"); 


function checkSave() 
{
    if(localStorage.getItem("numClasses"))
    {

        numClasses = parseInt(localStorage.getItem("numClasses"));

        for (i = 0; i < numClasses; i++)
            {
                item = "listOfClasses" + i; 
                newClass = localStorage.getItem(item);
                listOfClasses.push(newClass);
            }



        numClasses = parseInt(localStorage.getItem("numClasses"));
        overloadMax = parseInt(localStorage.getItem("overloadMax"));
        classChange = (localStorage.getItem("classChange") == 'true'); // parse bool 
        isThursday = (localStorage.getItem("isThursday") == 'true');
        isMonday = (localStorage.getItem("isMonday") == 'true');
        summer = (localStorage.getItem("summer") == 'true');
        money = parseInt(localStorage.getItem("money"));
        currentDayOfTheWeek = localStorage.getItem("currentDayOfTheWeek");
        salary = parseInt(localStorage.getItem("salary"));
        numEmployees = parseInt(localStorage.getItem("numEmployees"));
        numAssist = parseInt(localStorage.getItem("numAssist"));
        numRobot = parseInt(localStorage.getItem("numRobot"));
        meeting = (localStorage.getItem("meeting") == 'true');
        BBQ = parseInt(localStorage.getItem("BBQ"));    
        numTas = parseInt(localStorage.getItem("numTas")); 
        papersToGrade = parseInt(localStorage.getItem("papersToGrade"));    
        papersGraded = parseInt(localStorage.getItem("papersGraded"));    
        frameCount = parseInt(localStorage.getItem("frameCount")); 
        books = parseInt(localStorage.getItem("books")); 
        width = parseInt(localStorage.getItem("width")); 
        stressWidth = parseInt(localStorage.getItem("stressWidth"));

        // set some dom elements:
        setDOM(element, "Brian has graded " + papersGraded + " assignment.");
        setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
        setDOM(salaryDom,("Brian has $" + money + "."));
        //setTitle("ta","Costs $" + 1000*numTas*1.753 + ". Allows you to teach one more class.");
        //setTitle("pa","Costs $" + 100000*numAssist*1.753 + ". Allows you to teach three more classes."); // not working ? 
        //setTitle("rb","Costs $" + 2000000*numRobot*1.753 + ". Allows you to teach three more classes.");
        setDOM( seasonDom, "It is currently the " + seasons.checkSeason(frameCount / 90) + ". " + seasons.checkDay((frameCount / 90) % 7) + " - day " + Math.floor(frameCount / 90) );
        bookProgress.style.width = width + '%';
        setDOM(bookDom, "Books Written: " + books);
        if (stressWidth > 100)
        {
            stressLevel.style.width = 100+ '%';
        }
        else
        {
            stressLevel.style.width = stressWidth + '%';
        }
        
        if(currentSeason == "Summer")
        {
            setDOM(element2, "Brian has made " + BBQ + " BBQ sauce");
        }
        
        classChange = false; 

        var names  = listOfClasses[0];

        for(var i = 1; i < listOfClasses.length; i++)
            
            names = names + " - " + listOfClasses[i]; 

        setDOM(classListDom, "Brian is taking on: " + names);
    }
}

function save()
{
    localStorage.setItem("numClasses", numClasses);
    for (i = 0; i < numClasses; i++)
    {
        item = "listOfClasses" + i; 
        localStorage.setItem(item, listOfClasses[i]);
    }

    localStorage.setItem("listOfClasses", listOfClasses);

    localStorage.setItem("overloadMax", overloadMax);
    localStorage.setItem("classChange", classChange);
    localStorage.setItem("isThursday", isThursday);
    summer = !summer; //reverses summer to help with logic
    localStorage.setItem("summer", summer);
    localStorage.setItem("isMonday", isMonday);
    localStorage.setItem("money", money);
    localStorage.setItem("currentDayOfTheWeek", currentDayOfTheWeek);
    localStorage.setItem("salary", salary);
    localStorage.setItem("numEmployees", numEmployees);
    localStorage.setItem("numAssist", numAssist);
    localStorage.setItem("numRobot", numRobot);  
    localStorage.setItem("meeting", meeting);
    localStorage.setItem("BBQ", BBQ);
    localStorage.setItem("numTas", numTas);
    localStorage.setItem("papersToGrade", papersToGrade);
    localStorage.setItem("papersGraded", papersGraded);
    localStorage.setItem("frameCount", frameCount);
    localStorage.setItem("books", books);
    localStorage.setItem("width", width);
    localStorage.setItem("stressWidth", stressWidth);
}


function reveal()
{

    //employee
    //classInc
    //stressText
    //booksWriten 

    if (papersGraded >= 10)
    {
        document.getElementById("papersGraded").style.visibility = "visible";
        document.getElementById("papersGraded").style.animation = "fadein 10s";
    }

    if (money > 20)
    {
        document.getElementById("money").style.visibility = "visible";
        document.getElementById("money").style.animation = "fadein 10s";
    }
    if (money > 1000)
    {
        document.getElementById("ta").style.visibility = "visible";
        document.getElementById("ta").style.animation = "fadein 10s";
        document.getElementById("pa").style.visibility = "visible";
        document.getElementById("pa").style.animation = "fadein 10s";
        document.getElementById("rb").style.visibility = "visible";
        document.getElementById("rb").style.animation = "fadein 10s";
    }
    if (numEmployees >= 1)
    {
        document.getElementById("numEmployee").style.visibility = "visible";
        document.getElementById("numEmployee").style.animation = "fadein 10s";
    }

    if(stressWidth >= 50)
    {
        document.getElementById("stressBar").style.visibility = "visible";
        document.getElementById("stressBar").style.animation = "fadein 10s";
        document.getElementById("stressProgress").style.visibility = "visible";
        document.getElementById("stressProgress").style.animation = "fadein 10s";
        document.getElementById("stressText").style.visibility = "visible";
        document.getElementById("stressText").style.animation = "fadein 10s";                
    }

    if(frameCount >= 4000)
    {
        document.getElementById("myProgress").style.visibility = "visible";
        document.getElementById("myProgress").style.animation = "fadein 10s";
        document.getElementById("booksWritten").style.visibility = "visible";
        document.getElementById("booksWritten").style.animation = "fadein 10s";
        document.getElementById("myBar").style.visibility = "visible";
        document.getElementById("myBar").style.animation = "fadein 10s"; 
        document.getElementById("book").style.visibility = "visible";
        document.getElementById("book").style.animation = "fadein 10s"; 
    }

    if(numEmployees >= 1)
    {
        document.getElementById("more").style.visibility = "visible";
        document.getElementById("more").style.animation = "fadein 10s";
        document.getElementById("less").style.visibility = "visible";
        document.getElementById("less").style.animation = "fadein 10s";
    }

    if(numClasses > 1)
    {
        document.getElementById("classList").style.visibility = "visible";
        document.getElementById("classList").style.animation = "fadein 10s";
    }
}

var taUpgradeCost = 1500;
var paUpgradeCost = 200000;
var grUpgradeCost = 3000000;
var bhUpgradeCost = 1000;

var employees = {
	name: ['Brian Hall'],
	level: [1],
	upCost: [1000]
};

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
    }
}

// END

// Upgrades

function upgrade(x)
{

}

function generateEmployee()
{
	employees.name.push(chance.name());
	employees.level.push(1);
	employees.upCost.push(1000);

	var name = employees.name[numEmployees];
	var level = employees.level[numEmployees];

	var junkNode = document.createElement("LI");
	junkNode.innerHTML = '<div class="employeeInside"><p>' + name + '</br>Lv. ' + level +
	'</br><button class="upgrade" onclick="upgrade(0)">Upgrade</button></p></div>';

	empList.appendChild(junkNode);
}

// END

function grade()
{
    if (papersGraded == 0 && papersToGrade > 0)
    {
        papersGraded++;
        papersGraded += numTas;
        papersGraded += numAssist*5;
        papersGraded += numRobot*100;
        setDOM(element, "Brian has graded " + papersGraded + " assignment.");
        papersToGrade--;
        money++;
        papersToGrade -= numEmployees;
        money+=1;
        setDOM(salaryDom,("Brian has $" + money + "."));
    }
    else if (papersToGrade > 0)
    {
        papersGraded++;
        setDOM(element, "Brian has graded " + papersGraded + " assignments.");
        papersToGrade--;
		money+=1;
		setDOM(salaryDom,("Brian has $" + money + "."));

    }

    calculatePapers();
}

function hire(x)
{

    if (x == 0)
    {

        if(numTas==0)
        {
            if (money >= 1000)
            {
                numEmployees++;
                numTas++;
                money -= 1000;
                setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
                setDOM(salaryDom,("Brian has $" + money + "."));
                setTitle("ta","Costs $" + 1000*numTas*1.753 + ". Allows you to teach one more class.");
                overloadMax += 1;
								generateEmployee();
            }
        }
        else
        {
            if (money >= 1000*(numTas)*1.753)
            {
                money -= 1000*numTas*1.753;
                numEmployees++;
                numTas++;
                setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
                setDOM(salaryDom,("Brian has $" + money + "."));
                setTitle("ta","Costs $" + 1000*numTas*1.753 + ". Allows you to teach one more class.");
                overloadMax += 1;
								generateEmployee();
            }
        }

    }
    else if (x == 1)
    {

        if(numAssist==0)
        {
             if (money >= 100000)
            {
                numEmployees++;
                numAssist++;
                money -= 100000;

                setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
                setDOM(salaryDom,("Brian has $" + money + "."));
                setTitle("pa","Costs $" + 100000*numAssist*1.753 + ". Allows you to teach three more classes.");
                overloadMax += 3;
            }
        }

        else
        {   if (money >= 100000*(numAssist)*1.753)
            {
                money -= 100000*numAssist*1.753;
                numEmployees++;
                numAssist++;
                setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
                setDOM(salaryDom,("Brian has $" + money + "."));
                setTitle("pa","Costs $" + 100000*numAssist*1.753 + ". Allows you to teach three more classes.");
                overloadMax += 3;
            }
        }
    }
    else if (x == 2)
    {
        if(numRobot==0)

        {
            if (money >= 2000000)
            {
                numEmployees++;
                numRobot++;
                money -= 2000000;

                setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
                setDOM(salaryDom,("Brian has $" + money + "."));
                setTitle("rb","Costs $" + 2000000*numRobot*1.753 + ". Allows you to teach three more classes.");
                overloadMax += 5;
            }
        }
        else
        {
            if (money >= 2000000*(numRobot)*1.753)
            {
                money -= 2000000*numRobot*1.753;
                numEmployees++;
                numRobot++;


                setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
                setDOM(salaryDom,("Brian has $" + money + "."));
                setTitle("rb","Costs $" + 2000000*numRobot*1.753 + ". Allows you to teach three more classes.");
                overloadMax += 5;
            }
        }

    }
}




function loop()
{   
    console.log("If you type anything into the console I will stand outside of your house and I will scream and I will not stop screaming until you apologise.");

    checkSave(); 


    setInterval(function(){ // 30 ticks / second game loop.
        frameCount++;

        if (frameCount % 90 == 0)
            setDOM( seasonDom, "It is currently the " + seasons.checkSeason(frameCount / 90) + ". " + seasons.checkDay((frameCount / 90) % 7) + " - day " + Math.floor(frameCount / 90) );

        if(currentSeason == "Summer")
        {
            document.getElementById("grade").style.visibility = "hidden";
            document.getElementById("sauce").style.visibility = "visible";
            document.getElementById("buttonGroup").style.visibility = "hidden";
            document.getElementById("buttonGroup2").style.visibility = "hidden";
            document.getElementById("buttonGroup3").style.visibility = "hidden";
            document.getElementById("buttonGroup4").style.visibility = "hidden";

            summerStory();
        }
        else
        {
            if (summer == true)
            {
 
                document.getElementById("grade").style.visibility = "visible";
                document.getElementById("sauce").style.visibility = "hidden";
                document.getElementById("buttonGroup").style.visibility = "visible";
                document.getElementById("buttonGroup2").style.visibility = "visible";
                document.getElementById("buttonGroup3").style.visibility = "visible";
                document.getElementById("buttonGroup4").style.visibility = "visible";
                summer = false;
                
                money += (BBQ*5);
                setDOM(salaryDom,("Brian has $" + money + "."));
                BBQ = 0;
            }

            if(classChange)
            {
                classChange = false;

                var names  = listOfClasses[0];


                for(var i = 1; i < listOfClasses.length; i++)

                    names = names + " - " + listOfClasses[i];

                setDOM(classListDom, "Brian is taking on: " + names);


            }

            //call to story function
            story();
            stress();
            reveal();

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

function summerStory()
{
    if (BBQ == 0)
        setDOM(element3, "Brian is making BBQ sauce");
    else if (BBQ >= 5 && BBQ <= 9)
        setDOM(element3, "Brian is a fan of (INSERT REGIONAL STYLE)");
    else if (BBQ >= 10 && BBQ <= 19)
        setDOM(element3, "That's quite a bit of sauce.");
    else if (BBQ >= 20 && BBQ <= 49)
        setDOM(element3, "Sauce for days. Literally.");
    else if (BBQ >= 50 && BBQ <= 90)
        setDOM(element3, "The special ingredient... is love.");
    else if (BBQ >= 100 && BBQ <= 500)
        setDOM(element3, "Just how much is 100 sauce?");
    
    save();
}

function makeSauce()
{
    BBQ++;
    setDOM(element2, "Brian has made " + BBQ + " BBQ sauce");
}

function story()
{

    //general story stuff
    if (papersGraded < 20)
        setDOM(element3, "You are Brian R Hall, a new professor at Champlain College. It is your job to grade everyone's assignments.")

    else if (papersGraded > 20 && papersGraded < 40)
        setDOM(element3, "Brian doesn't want to grade anymore Assignments.")

    else if(papersGraded > 100 && papersGraded < 400)
        setDOM(element3, "Brian begins to look for help.")

    else if(papersGraded > 500 && papersGraded < 900)
        setDOM(element3, "Brian dreams of barbecue sauce.")

    else if(papersGraded > 1000 && papersGraded < 4000)
        setDOM(element3, "One Thousand assignments. A milestone in Brian's career.")

    else if(papersGraded > 5000 && papersGraded < 9000)
        setDOM(element3, "Grading five thousand assignments has really taken its toll on Brain.")

    else if(papersGraded > 10000 && papersGraded < 40000)
        setDOM(element3, "Brian has graded 10,000 assignments. If he isn't tenured yet, he should be.")


    //amount of work to do
    if(papersToGrade > 10000)
        setDOM(element4, "Wei would be very disappointed. Or not, I can't speak for Wei. I'm a line of Javascript, for goodness sake.")

    else if(papersToGrade > 5000)
        setDOM(element4, "I'm surprised he hasn't been fired yet.")

    else if(papersToGrade > 1000)
        setDOM(element4, "Brian is crying. How could you do this?")

    else if(papersToGrade > 500)
        setDOM(element4, "This is getting out of hand.")

    else if(papersToGrade > 100)
        setDOM(element4, "Brian needs to get to work. He's feeling stressed.")

    else if(papersToGrade > 50)
        setDOM(element4, "Brian's got some work to do.")

    else if(papersToGrade > 10)
        setDOM(element4, "Brian needs to get to work.")

    else if(papersToGrade <= 5)
        setDOM(element4, "Brian is feeling relaxed.")


    //Meetings: planned meetings, show countdown then reveal button. If not clicked, add assignments/penalize
    
    
    if (currentDayOfTheWeek == "Monday" && !isMonday && frameCount > 2000) //does not trigger for a few weeks. 
    {
        document.getElementById("meeting").style.visibility = "visible";
        isMonday = true;
        meeting = true;
    }

    if (currentDayOfTheWeek != "Monday")
    {   

        save(); 

        isMonday = false;
        if (meeting == true)
        {
            papersToGrade += 50;
            meeting = false;
            document.getElementById("meeting").style.visibility = "hidden";
        }
    }


}

function attendMeeting()
{
    meeting = false;
    document.getElementById("meeting").style.visibility = "hidden";
    money += 100;
    setDOM(salaryDom,("Brian has $" + money + "."));
}

function book()
{
    if (width >= 100) {
        width = 1;
        bookProgress.style.width = width + '%'; 
        books++;
        setDOM(bookDom, "Books Written: " + books);
        money += (books+1)*150;
        setDOM(salaryDom,("Brian has $" + money + "."));
    }
    else
    {
        width++; 
        bookProgress.style.width = width + '%';
    }
}

function stress()
{
    if (numEmployees < 1)
    {
        stressWidth = papersToGrade;
    }
    else 
    {
        stressWidth = (papersToGrade/numEmployees);
    }
    if (stressWidth >= 100) {
        if(currentDayOfTheWeek == "Monday")
        {
            stressLevel.style.width = 100 + '%';
            money -= 2; //spends lots of money really quickly due to loop, may be fine as it has nice visual effect
            setDOM(salaryDom,("Brian has $" + money + "."));
        }
    }
    else
    {
        stressLevel.style.width = stressWidth + '%';
    }
}

function setDOM(element, string) // pass an item in the DOM some text. 
{
    element.innerHTML = string;
}

function setTitle(type,string)
{
    document.getElementById(type).title = string;
}
