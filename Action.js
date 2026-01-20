let newText = "";
let minutes = 0;

class Action {
    static instanceCount = -3;
    constructor(locId, name, method) {
        Action.instanceCount++;
        this.actId = Action.instanceCount;
        this.locId = locId;
        this.name = name;
        this.execute = this[method];
    }

    getactId(){
        return this.actId;
    }

    getlocId(){
        return this.locId;
    }

    getName(){
        return this.actionName;
    }

    getlocID(){
        return this.locID;
    }

    /* General purpose method for attacks, whether physical or magical */
    attack() {
        let playerAttack = Math.floor(Math.random()*20);
        let savingThrow = Math.floor(Math.random()*12);
        let result = playerAttack>savingThrow;
        return [playerAttack, savingThrow, result];
    }
 
    /* Location-Based Methods */

    /* Methods for Location 0 and 1 */

    waitOutside(){
        newText =  "You sit on the bench outside, waiting for others to enter. ";
        setTimeout(showText, 2000);
        waitForOthers.execute();
    }

    waitForOthers(){
        newText += "You wait for a crowd to enter so you can join them and slip inside.";
        minutes = Math.floor(Math.random()*60)+1;
        newText += "You wait for " + minutes + " minutes.";
        if (minutes %2 == 0) {
            newText += "Nobody comes. Now what do you do?";
            showText();
        }
        else {
            showText();
            joinWithOthers.execute();
        }
    }

    /* Method for Location 0, Action 0 and Location 1, Action 0 */

    hideInside(){
        newText =  "You hang out in the far right corner where the receptionist cannot see you, waiting for others to enter. ";
        setTimeout(showText, 5000);
        waitForOthers.execute();
    }

    joinWithOthers(){
        newText += "A crowd of NHS students returns from a field trip. ";
        newText += "You cast a deception spell to enter them without being noticed. "
        let result = this.attack();
        newText += "Your spell attack roll is: " + result[0];
        newText += "The crowd\'s saving throw is: " + result[1];
        if (result[3]) {
            newText += "You deceive them and enter into the front hall, slipping away soon after.";
        }
        else {
            newText+= "They notice you in the lobby and say, \"Hey you! Get your own damn pass!\"";
            newText+= "The receptionist calls for security. You run outside.";
            update(WHS.Locations[0].index);
        }
        showText();
    }
    /* Method for Location 1, Action 0 */
    attackHer() {
        newText =  "You grab her arm and attempt to pull her through the window and attack her. ";
        let result = this.attack();
        newText += "Your attack roll is: " + result[0];
        newText += "The receptionist\'s saving throw is: " + result[1];
        if (result[3]) {
            newText += "She lies in a crumpled heap beneath the window. \nYou reach in and press the button to unlock the door.";
        }
        else {
            newText+= "She pulls her arm away and presses the panic button for security. You run outside.";
            update(WHS.Locations[0].index);
        }
        showText();
    }
     /* Method for Location 1, Action 1 */
    deceiveHer(){
        newText = "You ring the bell for the receptionist. \n She asks whom you are here to see. ";
        newText += "You say you are a new student and was told to go to Guidance. ",
        newText +=  "Will she believe you? You cast the Deception spell.";
        let result = this.attack();
        newText += "Your spell attack roll is: " + result[0];
        newText += "The receptionist\'s saving throw is: " + result[1];
        if (result[3]) {
            newText += "You deceive her and enter the building.";
        }
        else {
            newText+= "She calls for security. You run outside.";
            update(WHS.Locations[0].index);
        }
        showText();
    }
    
 } // End Action Class

 class Choices {
    constructor(name) {
        this.name = name;
        this.actions = []; 
    }
	addAction(choices) {
        if (choices instanceof Action) {
            this.actions.push(choices);
            console.log("Added " + choices.name + " to choices.");
        } else {
            console.error("Invalid object: only Action instances allowed.");
        }
    }

    listChoices() {
        console.log("\n--- Choices in " + this.name + "---");
        this.actions.forEach(choices => {
            // We can call methods directly on the stored instances
           choices.displayInfo(); 
        });
    }

	getName(){
		return this.name;
  	}

} // End Choices Class

/* This is a collection of all the actions which can be referenced from other classes */
const actions = [
    {
	 	actID: -2,
        locId: -1,
        actionName: "Wait for empty lobby",
        methodName: "waitOutside"	
    },
    {
	 	actID: -1,
        locId: -1,
        actionName: "Enter with others",
        methodName: "joinWithOthers"	
    },
	{
	 	actID: 0,
        locId: 1,
        actionName: "Lie to Get Pass",
	    methodName: "deceiveHer"
    },
    {
	 	actID: 1,
        locId: 1,
        actionName: "Attack the Receptionist",
	    methodName: "attackHer"
    },
    {
	 	actID: 2,
        locId: 1,
        actionName: "Hide Inside",
	    methodName: "hideInside"
	},
	{
	 	actID: 3,
        locId: 1,
        actionName: "Go Back Outside",
        methodName: "waitOutside"	
    }
    
]

const WHSActions = new Choices('WHSActions');
actions.forEach(data => {
    const newAction = new Action(data.locId, data.actionName, data.methodName);
    WHSActions.addAction(newAction);
});

console.log("WHSActions is created!");
console.log("First one: " + WHSActions.actions[0].actionName);


 function showText(){
    text.innerText = newText;
    console.log("New text: "+ newText);
 }

/* Testing */
// Create a receptionist attack action
// const attackReceptionist = new Action(0, "Attack Her", "attackHer");
// Create a receptionist deceive action
// const deceiveReceptionist = new Action(0, "Deceive Her", "deceiveHer");

// Run the action
// attackReceptionist.execute(); // Output: "You attack the receptionist."
// deceiveReceptionist.execute(); // Output: "You attack the receptionist."

