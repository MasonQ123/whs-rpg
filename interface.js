/* UI Controls */
const controls = document.getElementById("controls");
const button1 = document.querySelector("#controls :nth-child(1)");
const container = document.querySelector('.container:nth-child(2)');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const myObjects = document.querySelector("#stats li:nth-child(4)"); 
const myWeapons = document.querySelector("#stats li:nth-child(5)");
const stats = document.querySelector("#stats li:nth-child(5)");
const infoBox = document.getElementById('infoBox');

setUp();

function setUp() {
	createNavCross();
}

function createNavCross() {
	getNavLocations();
	let board = document.getElementById("gameBoard");
	const firstChild = board.firstElementChild;
	let navCross = document.createElement("div");
	navCross.id = "navCross";
	board.insertBefore(navCross, firstChild.nextElementSibling);
	document.getElementById("navCross")
	let navBox;	
	buttonLabels = ["Navigation", "forward", "right", "left", "back"];
	for(let i = 0; i < 5; i++){
		navBox = document.createElement("div");
		navBox.id = "nav" + i;
		navBox.innerHTML = buttonLabels[i];
		navCross.appendChild(navBox);
	}


	navButtons = [];
	console.log(WHS.getName(0))
	console.log(player.getCurrentLocation());
	console.log(player.getCurrentCoords());
}

function getNavLocations() {
	let locationNow = player.currentLocation;
	let coordsNow = WHS.locations[locationNow].coords;
	console.log("coords are " + coordsNow);
	let move = locations[0].coords[1] += 1
	console.log(WHS.locations[move]);
	let proximals = [[0,1], [1,0], [0,-1], [-1,0]];
	let testX;
	let testY;
	let possibles = [];
	for(let i =0; i < 4; i++){
		testX = coordsNow[0] + proximals[i][0];
		testY = coordsNow[1] + proximals[i][1];
		possibles.push(testLocation(testX, testY));
	}
	console.log("1,-1,-1,-1?" + possibles);
}

function testLocation(x,y){
	for(let i = 0; i < WHS.locations.length; i++){
		if(WHS.locations[i].coords == [x,y]){
			return i;
		}
	}
	return -1;
}

function showObjects() {
	showInventory(myObjects, objects, "objects");
}

function showName(){
	document.getElementById("playerName").innerHTML=player.charName;
	document.getElementById("picture").innerHTML="<img src=\""+ player.image+"\">";
}

function showWeapons(){
	console.log(currentWeapon)
	showInventory(myWeapons, buildWeapons(), "weapons")

}
function showInventory(container, items, listName){
	// Toggle the inventory list: if it already exists, remove it; otherwise create it
	const existing = container.querySelector(`#${listName}`);
	if (existing) {
		existing.remove();
		return;
	}
	let inventoryList = document.createElement("ul");
	inventoryList.id = listName;
	for (let i = 0; i < items.length; i++){
		let newItem = document.createElement("li");
		newItem.textContent = items[i];
		inventoryList.appendChild(newItem);
	}
	container.appendChild(inventoryList);
}

function buildWeapons(){
	let w = [];
	for(let weapon = 0; weapon<player.weapons.length;weapon++){
		w.push(allWeapons[weapon].name)
	}
	return w;
}

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];
	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
    text.innerText = location.text;   
	player.setLocation(locations.indexOf(location)); 
}
