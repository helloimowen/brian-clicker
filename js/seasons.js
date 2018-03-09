const days = 365; 
var seasonsENUM = {"fall":1, "winter":2, "spring":3, "summer":4};
var currentSeason; 
//fall semester = first 100 days. 
//winter break = 65 days. 
	//sort of like stardew valley. You can't do much. 
//spring semester = 100 days. 
	// new students. More 
//summer break = 105 days. 
	//brian begins making BBQ sauce. grading is replaced with barbeque sauce making. 
	//Students work on making barbeque sauce. Students fall in vats of barbeque sauce. 
class seasons()
{
	constructor(){
		days = 365;
		currentSeason = seasonsENUM.fall;
	}

	checkSeason(frame){

		frame = frame % days; 

		frame /= 90; 

		if (frame <= 100) // increment a day every three seconds. 
		{		// This changes the season around... every five minutes. 
			currentSeason = seasonsENUM.fall;
		}
		else if  (frame > 100 && frame <= 165)
		{
			currentSeason = seasonsENUM.winter;
		}
		else if (frame > 165 && frame <= 265)
		{
			currentSeason = seasonsENUM.spring;
		}
		else
		{
			currentSeason = seasonsENUM.summer;
		}

		return 
	} 
}