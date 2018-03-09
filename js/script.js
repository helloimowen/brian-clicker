class assistant
{
	/*
var incrementFactor = 0;
var numUpgrades = 0; //number of upgrades bought
var numChars = 0; //number of ta's bought
var baseCost = 0;
var currentCost = 0;
var nextCost = 0;
var baseNumAssignmentsThatCanBeDone = 0; //base amount that can be done by character
var currentNumAssignmentsThatCanBeDone = 0;
var baseUpgradeCost = 0;
var currentUpgradeCost = 0;
var nextUpgradeCost = 0;
var overload = 0;*/


constructor(baseNumAss,baseUpgradeCost, baseCost, overload)
{
	//num of upgrades and quantity
	this.numUpgrades = 0;
	this.numChars = 0;
	this.overload = overload;
	this.incrementFactor = 1.173;
	//assign how many base assignments that can be done
	this.baseNumAssignmentsThatCanBeDone = baseNumAss;
	this.currentNumAssignmentsThatCanBeDone = baseNumAss;
	//setting base cost and current cost of a single character
	this.baseCost = baseCost;
	this.currentCost = baseCost;
	
	//setting base upgrade cost and current upgrade cost of a single upgrade
	this.baseUpgradeCost = baseUpgradeCost;
	this.currentUpgradeCost = baseUpgradeCost;
	
	//setting the next price
	this.nextUpgradeCost = this.baseUpgradeCost*10*(this.numUpgrades+1)*this.incrementFactor;
	this.nextCost = (this.baseCost*10)*this.incrementFactor;
	
}

//proccesses the upgrade of a character and updates the number of assignments 
//that can be done with current information
 addUpgrade()
{
	this.numUpgrades++;	
	this.calculateNumAssignmentsThatCanBeGraded();
}


//proccesses the purchase of a character and updates the number of assignments 
//that can be done with current information
 addChars()
{
	this.numChars++;	
	this.calculateNumAssignmentsThatCanBeGraded();
		
}

//calculates how many assignments can be done
 calculateNumAssignmentsThatCanBeGraded()
{
	this.currentNumAssignmentsThatCanBeDone = (this.numChars*this.baseNumAssignmentsThatCanBeDone)*(this.numUpgrades*1.5)
}

//returns how many assignments can currently be done
 calculateGrade()
{
	return this.currentNumAssignmentsThatCanBeDone;
}

//sets after purchase
 updatePrice()
{
	this.currentCost = this.nextCost;
	this.nextCost = this.nextCost*this.incrementFactor
}

//sets after upgrade
 updateUpgradePrice()
{
		this.currentUpgradeCost = this.nextUpgradeCost;
		this.nextUpgradeCost = this.nextUpgradeCost*this.incrementFactor*10;
}

//return price of upgrade to remove from money
 upgrade()
{
	this.addUpgrade();
	var priceReturn = this.currentUpgradeCost;
	this.updateUpgradePrice();
	return priceReturn;
}

//return price of purchase to remove from Money
 purchase()
{
	this.addChars();
	var priceReturn = this.currentCost;
	this.updatePrice();
	return priceReturn;
}

//checks if you have enough money to upgrade
 canUpgrade(currentMoney)
{
	return currentMoney >= this.currentUpgradeCost;
}

//checks if you have enough money to purchase
 canPurchase(currentMoney)
{
	return currentMoney >= this.currentCost;
}

}



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

var pricePA = document.getElementById("pa");
var priceRB = document.getElementById("rb");

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

var masterScale = 0.1;

var bhUpgradeCost = 1000;

let bh = new assistant(1,10000,0,0);
let ta = new assistant(1,1500,1000,1);
let pa = new assistant(5,150000,100000,3);
let rg = new assistant(10,3000000, 900000,5);





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

// Upgrades

function upgrade(option)
{
	if(option == 0)
	{
		
		if(bh.canUpgrade(money))
		{
			money-=bh.upgrade();
			setTitle("bhU","Costs $" + bh.nextUpgradeCost + ". Allows you grade assignments quicker.");
		}
		/*if(bhUpgrade == 0)
		{
			if (money >= 1000)
			{
				bhUpgrade++;
				money -= 1000;
				setDOM(employeeDom, "Brian has " + numEmployees + " employees with " + bhUpgrade + " upgrades.");
				setDOM(salaryDom,("Brian has $" + money + "."));
				setTitle("bhU","Costs $" + 1000*(bhUpgrade+1)*1.173 + ". Allows you grade assignments quicker.");
			}
		}
		else
		{
			if (money >= 1000*(bhUpgrade+1)*1.173)
			{
				bhUpgrade++;
				money -= 1000*bhUpgrade*0.173;
				setDOM(employeeDom, "Brian has " + numEmployees + " employees with " + bhUpgrade + " upgrades.");
				setDOM(salaryDom,("Brian has $" + money + "."));
				setTitle("bhU","Costs $" + 1000*bhUpgrade*1.173 + ". Allows you grade assignments quicker.");
			}
		}*/
	}
	if(option == 1)
	{
		
		if(ta.canUpgrade(money))
		{
			money-=ta.upgrade();
			setTitle("taU","Costs $" + ta.nextUpgradeCost + ". Allows you grade assignments quicker.");

		}
		/*if(taUpgrade == 0)
		{
			if (money >= 1500)
			{
				taUpgrade++;
				money -= 1500;
				setDOM(employeeDom, "Brian has " + numEmployees + " employees with " + taUpgrade + " upgrades.");
				setDOM(salaryDom,("Brian has $" + money + "."));
				setTitle("taU","Costs $" + 1500*taUpgrade*1.173 + ". Allows you grade assignments quicker.");
			}
		}
		else
		{
			if (money >= 1500*(taUpgrade+1)*1.173)
			{
				taUpgrade++;
				money -= 1500*taUpgrade*1.173;
				setDOM(employeeDom, "Brian has " + numEmployees + " employees with " + taUpgrade + " upgrades.");
				setDOM(salaryDom,("Brian has $" + money + "."));
				setTitle("taU","Costs $" + 1500*taUpgrade*1.173 + ". Allows you grade assignments quicker.");
			}
		}*/
	}
	if(option == 2)
	{
		if(pa.canUpgrade(money))
		{
			money-=pa.upgrade();
			setTitle("paU","Costs $" + pa.nextUpgradeCost + ". Allows you grade assignments quicker.");

		}
		/*if(paUpgrade == 0)
		{
			if (money >= 150000)
			{
				paUpgrade++;
				money -= 150000;
				setDOM(employeeDom, "Brian has " + numEmployees + " employees with " + paUpgrade + " upgrades.");
				setDOM(salaryDom,("Brian has $" + money + "."));
				setTitle("paU","Costs $" + 150000*paUpgrade*1.173 + ". Allows you grade assignments quicker.");
			}
		}
		else
		{
			if (money >= 150000*(paUpgrade+1)*1.173)
			{
				paUpgrade++;
				money -= 150000*paUpgrade*1.173;
				setDOM(employeeDom, "Brian has " + numEmployees + " employees with " + paUpgrade + " upgrades.");
				setDOM(salaryDom,("Brian has $" + money + "."));
				setTitle("paU","Costs $" + 150000*paUpgrade*1.173 + ". Allows you grade assignments quicker.");
			}
		}*/
	}
	if(option == 3)
	{
		if(rg.canUpgrade(money))
		{
			money-=rg.upgrade();
			setTitle("grU","Costs $" + rg.nextUpgradeCost + ". Allows you grade assignments quicker.");

		}
		/*grUpgrade++;
		if(grUpgrade == 0)
		{
			if (money >= 3000000)
			{
				grUpgrade++;
				money -= 3000000;
				setDOM(employeeDom, "Brian has " + numEmployees + " employees with " + grUpgrade + " upgrades.");
				setDOM(salaryDom,("Brian has $" + money + "."));
				setTitle("grU","Costs $" + 3000000 + ". Allows you grade assignments quicker.");
			}
		}
		else
		{
			if (money >= 3000000*(grUpgrade+1)*1.173)
			{
				grUpgrade++;
				money -= 3000000*grUpgrade*1.173;
				setDOM(employeeDom, "Brian has " + numEmployees + " employees with " + grUpgrade + " upgrades.");
				setDOM(salaryDom,("Brian has $" + money + "."));
				setTitle("grU","Costs $" + 3000000*grUpgrade*1.173 + ". Allows you grade assignments quicker.");
			}
		}*/
	}
}

// END

function grade()
{
    if (papersGraded == 0 && papersToGrade > 0)
    {
        
		papersGraded+=bhUpgrade+1
		
        papersToGrade-=bhUpgrade+1;
		var temp = papersToGrade;
		if((temp-(bhUpgrade+1)>=0))
			{
				papersToGrade-=(bhUpgrade+1);
				papersGraded+=(bhUpgrade+1);
				money+=(bhUpgrade+1);
				
			}
			else{
				papersGraded+=papersToGrade;
				money+=papersToGrade;
				papersToGrade = 0;	
			}


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

    story();

    calculatePapers();
}

function hire(x)
{

    if (x == 0)
    {
		if(ta.canPurchase(money))
		{
			money -= ta.purchase();
		}
		
		/*if(numTas==0)
		{
			if (money >= 1000)
			{
				numEmployees++;
				numTas++;
				money -= 1000;
				
				setTitle("ta","Costs $" + 10000*numTas*1.753 + ". Allows you to teach one more class.");
				overloadMax += 1;
			}
		}
		else
		{
			if (money >= 10000*(numTas+1)*1.753)
			{
				numEmployees++;
				numTas++;
				money -= 10000*numEmployees*1.753;
				setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
				setDOM(salaryDom,("Brian has $" + money + "."));
				setTitle("ta","Costs $" + 10000*numTas*1.753 + ". Allows you to teach one more class.");
				overloadMax += 1;
			}
		}*/

    }
    else if (x == 1)
    {
		if(pa.canPurchase(money))
		{
		 money-=pa.purchase();	
		}

		/*if(numAssist==0)
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
		{	if (money >= 100000*(numAssist+1)*1.753)
			{
				numEmployees++;
				numAssist++;
				money -= 100000*numAssist*1.753;

				setDOM(employeeDom, "Brian has " + numEmployees + " employees.");
				setDOM(salaryDom,("Brian has $" + money + "."));
				setTitle("pa","Costs $" + 100000*numAssist*1.753 + ". Allows you to teach three more classes.");
				overloadMax += 3;
			}
		}*/
    }
    else if (x == 2)
    {
		if(rg.canPurchase(money))
		{
		 money-=rg.purchase();	
		}
        /*if(numRobot==0)
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
			if (money >= 2000000*(numRobot+1)*1.753)
			{
				numEmployees++;
				numRobot++;
				money -= 2000000*numRobot*1.753;

				setTitle("rb","Costs $" + 2000000*numRobot*1.753 + ". Allows you to teach three more classes.");
				overloadMax += 5;
			}
		}*/
    }
	calculateOverload();
	setDOM(employeeDom, "Brian has " + getNumEmployees() + " employees.");
	setDOM(salaryDom,("Brian has $" + money + "."));
}

function getNumEmployees()
{
return bh.numChars + ta.numChars + pa.numChars + rg.numChars;	
}

function calculateOverload()
{
	var total = 3 + (ta.numChars*ta.overload) + (pa.numChars*ta.overload) + (rg.numChars*rg.overload);
	this.overloadMax = total;
}

function calculateGradedPapers()
{
	var total = ta.currentNumAssignmentsThatCanBeDone + pa.currentNumAssignmentsThatCanBeDone + rg.currentNumAssignmentsThatCanBeDone;
	return total;
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
			var temp = papersToGrade;
			if((temp-calculateGradedPapers())>=0)
			{
				papersToGrade-=calculateGradedPapers();
				papersGraded+=calculateGradedPapers();
				money+=calculateGradedPapers();
				
			}
			else{
				papersGraded+=papersToGrade;
				money+=papersToGrade;
				papersToGrade = 0;	
			}
			if(papersGraded>1)
			{
				setDOM(element, "Brian has graded " + papersGraded + " assignments.");
			}
			else if(papersGraded==1)
			{
				setDOM(element, "Brian has graded " + papersGraded + " assignment.");

			}
			

			setDOM(salaryDom,("Brian has $" + money + "."));
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
		calculatePapers();

    }, (1000 / 30));
}

function calculatePapers()
{

     if (papersToGrade == 1)
        {
            setDOM(element2, "Brian has " +  papersToGrade + " assignment to grade.");
        }
    else
        {
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

function setTitle(type,string)
{
	document.getElementById(type).title = string;
}



