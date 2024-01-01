//Part 1;
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "cat",
        companion: {
            name: "Frank",
            type: "flea",
            inventory: ["small hat", "sunglasses"]
        }
    },
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}`)
    }

}



function logAllInventory(adventurer) {
    for (let i = 0; i < adventurer.inventory.length; i++) {
        console.log(adventurer.inventory[i])
    }
}

logAllInventory(adventurer);
//adventurer.roll();


//Part 2

class Character {
    static MAX_HEALTH = 100;

    constructor(name) {
        this.name = name;
        this.health = 100;
        this.inventory = [];
    }
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}`)
        return result;
    }
}

// const robin = new Character("Robin");
// robin.inventory = ["sword", "potion", "artifact"];
// robin.companion = new Character("Leo");
// robin.companion.type = "Cat";
// robin.companion.companion = new Character("Frank");
// robin.companion.companion.type = "Flea";
// robin.companion.companion.inventory = ["small hat", "sunglasses"];

//Part 3
class Adventurer extends Character {
    static ROLES = ["Fighter", "Healer", "Wizard"];

    constructor(name, role) {
        super(name);
        this.role = role;
        // Adventurers have specialized roles.
        if (Adventurer.ROLES.indexOf(role) > -1) {
            this.role = role;
        } else {
            console.log("Role not found. Assigning to Fighter");
            this.role = "Fighter";
        }
        // Every adventurer starts with a bed and 50 gold coins.
        this.inventory.push("bedroll", "50 gold coins");
        this.companions = [];
    }
    // Adventurers have the ability to scout ahead of them.
    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll();
    }
    pickUp(item) {
        console.log(`${this.name} picks up a ${item}`);
        this.inventory.push(item)
    }
    makeCompanion(companion) {
        this.companions.push(companion);
    }
    duel(adventurer){
        let p1;
        let p2;
        
        while(this.health > 50 && adventurer.health > 50){
            p1 = super.roll();
            p2 = adventurer.roll();
            
            console.log(`${this.name} rolled a ${p1}, ${adventurer.name} rolled a ${p2}`)
            if(p1 < p2){
                this.health -= 1;
                console.log(`${this.name} took damage. They have ${this.health} health left`);
            }else{
                adventurer.health -=1;
                console.log(`${adventurer.name} took damage. They have ${adventurer.health} health left`);
            }
        }
        if(this.health <= 50){
            console.log(`${adventurer.name} won the duel`);
        }
        if(adventurer.health <= 50){
            console.log(`${this.name} won the duel`)
        }





    }

}

class Companion extends Character {
    constructor(name, role) {
        super(name);
        this.role = role;
        this.companions = [];
    }

    support() {
        console.log("You can do it!")
    }
    makeCompanion(companion) {
        this.companions.push(companion);
    }
}

//Chaning robin and companion declarations
const robin = new Adventurer("Robin", "Fighter");
const chris = new Adventurer("Chris", "Fighter");
const leo = new Companion("Leo", "Cat");
const frank = new Companion("Frank", "Flea");

robin.makeCompanion(leo);
leo.makeCompanion(frank);


robin.duel(chris);


//Part 5

class AdventurerFactory {
    constructor(role) {
        this.role = role;
        this.adventurers = [];
    }
    generate(name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
    }
    findByIndex(index) {
        return this.adventurers[index];
    }
    findByName(name) {
        return this.adventurers.find((a) => a.name === name);
    }
}

const healers = new AdventurerFactory("Healer");
//const robin = healers.generate("Robin");
