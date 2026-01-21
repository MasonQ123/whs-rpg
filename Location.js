class Location {
	static lastIndex = 0;
	constructor(index, name, coords, text, actions) {
		this.index = index;
		this.name = name;
		this.coords = coords;
		this.text = text;
		this.actions = actions;
		// this.npcs = npcs;
		// this.dialogue = dialogue
  	}
	getName(){
		return this.name;
  	}

	getIndex(){
		return this.index;
  	}

	getText(){
		return this.text;
  	}
  
	getCoords(){
    	return this.coords;
  	}
	
} // End Location Class

/* This is a collection of all the locations which can be referenced from other classes */

class Place {
    constructor(name) {
        this.name = name;
        this.locations = []; 
    }
	addLocation(place) {
        if (place instanceof Location) {
            this.locations.push(place);
            console.log(`Added "${place.name}" to Place.`);
        } else {
            console.error("Invalid object: only Location instances allowed.");
        }
    }

    listPlaces() {
        console.log(`\n--- Locations in ${this.name} ---`);
        this.locations.forEach(place => {
            // We can call methods directly on the stored instances
           place.displayInfo(); 
        });
    }

	getName(index){
		return this.locations[index].name;
  	}

} // End Place Class


const locations = [
	{
		index: -1,
	 	name: "Main Entrance",
		coords: [0,0],
		text: "You are standing outside, looking into the front office from the main entrance. 0,0",
		actions: [-1,-2]
	},
	{
		index: 1,
	 	name: "Lobby",
		coords: [0,1],
		text: "You enter the lobby as the doors lock behind you. There is a window but you can't see clearly into it, as well as four large locked doors. 0,1",
		actions: [0,1,2,3]
	},
	{
		index: 2,
	 	name: "Front Hallway",
		coords: [0,2],
		text: "You are now in a long hall way that seems to go on both left and right. 0,2",
		actions: []
	},
	{
		index: 3,
		name: "Stairwell Hall",
		coords: [1,2],
		text: "This hallway connects to two more hallways and a stairwell. 1,2",
		actions: []
	},
	{
		index: 4,
	 	name: "Auditorium Hall",
		coords: [-1,2],
		text: "This hallway just goes straight, though there seems to be a movie playing somewhere. -1,2",
		actions: []
	},
	{
		index: 5,
	 	name: "Stairwell",
		coords: [2,2],
		text: "You enter the stairwell and see two sets of stairs running straight to the second and third floors. 2,2",
		actions: []
	},
	{
		index: 6,
	 	name: "Auditorium Hall, cont.",
		coords: [-1,3],
		text: "The sounds of the movie near closer. -1,3",
		actions: []
	},
	{
		index: 7,
	 	name: "Auditorium",
		coords: [-1,4],
		text: "You enter the auditorium, it looks like they're showing Casablanca. -1,4",
		actions: []
	}
]


const WHS = new Place('WHS');
locations.forEach(data => {
    const newPlace = new Location(data.index, data.name, data.coords, data.text, data.actions);
    WHS.addLocation(newPlace);
});

console.log("WHS is created!");
console.log("First one: " + WHS.locations[0].text);


function goStore() {
    update(locations[1]);
}

function goTown() {
    update(locations[0]);
}

function goCave() {
    update(locations[2]);
}



