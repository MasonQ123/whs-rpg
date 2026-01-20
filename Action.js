class Action {
    constructor(locID, actionName, methodName) {
        this.locID = locID;
        this.name = actionName;
        this.execute = this[methodName];
    }

    getName(){
        return this.actionName;
    }

    getlocID(){
        return this.locID;
    }

    attack() {
        let playerAttack = Math.floor(Math.random()*20);
        let savingThrow = Math.floor(Math.random()*12);
        let result = playerAttack>savingThrow;
        return [playerAttack, savingThrow, result];
    }

    attackHer() {
        text =  "You grab her arm and attempt to pull her through the window and attack her.\n";
        let result = attack();
        text += "Your attack roll is: " + result[0];
        text += "The receptionist\'s saving throw is: " + result[1];
        if (result[3]) {
            text += "She lies in a crumpled heap beneath the window. \nYou reach in and press the button to unlock the door.";
        }
        else {
            text+= "She pulls her arm away and presses the panic button for security. \nYou run outside.";
            update(WHS.Locations[0]);
        }
    }

    deceiveHer(){
        text = "You ring the bell for the receptionist. \n She asks whom you are here to see.\n";
        text += "You say you are a new student and was told to go to Guidance.\n",
        text +=  "Will she believe you? You cast the Deception spell.";
        let result = attack();
        text += "Your spell attack roll is: " + result[0];
        text += "The receptionist\'s saving throw is: " + result[1];
        if (result[3]) {
            text += "You deceive her and enter the building.";
        }
        else {
            text+= "She calls for security. You run outside.";
            update(WHS.Locations[0]);
        }
    }

    hideInside(){
        text =  "You hang out in the far right corner where the receptionist cannot see you.\n";
        text += "You wait for a large crowd to enter so you can join them and slip inside.";
        minutes = Math.floor(Math.random()*60)+1;
        text += "You wait for " + minutes + " minutes.";
        if (minutes %2 == 0) {
            text += "Nobody comes. Now what do you do?";
        }
        else {
            text += "A crowd of NHS students returns from a field trip.\n";
            text += "You cast a deception spell to enter them without being noticed.\n "
            let result = attack();
            text += "Your spell attack roll is: " + result[0];
            text += "The crowd\'s saving throw is: " + result[1];
            if (result[3]) {
                text += "You deceive them and enter the building, slipping away soon after.";
            }
            else {
                text+= "They notice you and say, \"Hey you! Get your own damn pass!\"\n";
                text+= "The receptionist calls for security. You run outside.";
                update(WHS.Locations[0]);
            }
        }
    }
 }// End Action Class

// Create a receptionist attack action
const attackReceptionist = new Action(0, "Attack Her", attackHer);
// Create a receptionist deceive action
const deceiveReceptionist = new Action(0, "Deceive Her", deceiveHer);

// Run the action
attackReceptionist.execute(); // Output: "You attack the receptionist."
deceiveReceptionist.execute(); // Output: "You attack the receptionist."

/* This is a collection of all the actions which can be referenced from other classes */

class Choices {
    constructor(name) {
        this.name = name;
        this.actions = []; 
    }
	addAction(choices) {
        if (choices instanceof vAction) {
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


const actions = [
	{
	 	locId: 1,
        name: "Lie to Get Pass",
	    methodName: deceiveHer
    },
    {
	 	locId: 1,
        name: "Attack the Receptionist",
	    methodName: attackHer
    },
    {
	 	locId: 1,
        name: "Hide Inside",
	    methodName: hideInside
	},
	{
	 	locId: 1,
        name: "Go Back Outside",
        methodName: waitOutside	
    }
]


const WHSchoices = new Choices('WHS');
this.actions.forEach(data => {
    const newChoices = new Action(data.locID, data.name, data.methodName);
    WHSchoices.addAction(newChoices);
});

console.log("WHSactions are created!");
console.log("First one: " + JSON.stringify(WHS.actions[0].name));

