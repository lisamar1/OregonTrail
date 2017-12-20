(function () {

    /*
    * Interfaces
    */

    //interface describing what attributes and methods a traveler should have
    interface ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value
        hunt(): number;

        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat(): boolean;

    }

    //interface describing attributes and methods a wagon should have
    interface IWagon {
        capacity: number;
        passengerArray: Traveler[];

        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler): string;

        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined(): boolean;

        //Return the total amount of food among all passengers of the wagon.
        getFood(): number;

    }

    /*
    * Classes
    */

    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    class Traveler implements ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        constructor(food: number, name: string, isHealthy: boolean) {
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }

        getFood(): number {
            return this.food;
        }

        setFood(food: number): void {
            if (Number.isInteger(food)) {
                this.food = food;
            }
        }

        hunt(): number {
            if (Math.random() > .5) {
                this.food = this.food + 100;
            }
            return this.food;
        }


        eat(): boolean {
            if (this.food >= 20) {
                this.food = this.food - 20;
            } else if (this.food < 20) {
                this.isHealthy = false;
            }
            return this.isHealthy;
        }

    }


    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    class Wagon implements IWagon {

        capacity: number;
        passengerArray: Traveler[];

        constructor(capacity: number, passengerArray: Traveler[]) {
            this.capacity = capacity
            this.passengerArray = passengerArray;

        }

        addPassenger(traveler: Traveler): string {
            if (this.passengerArray.length < this.capacity) {
                this.passengerArray.push(traveler)
                return "added"
            }
            return "sorry";
        }


        isQuarantined(): boolean {
            return this.passengerArray.some(traveler => !traveler.isHealthy);
            // for (let traveler of this.passengerArray) {
            //     if (!traveler.isHealthy) {
            //         return true;
            //     }
            // }
            // return false;
        }

        getFood(): number {
            let sum = 0;
            for (let traveler of this.passengerArray) {
                sum += traveler.getFood();
            }
            return sum;
        }
    }


    /*
    * Play the game
    *
    * Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    *
    * Create wagon with an empty passenger list and a capacity of 4.
    *
    * Make 3 of 5 the travelers eat by calling their eat methods
    *
    * Make the remaining 2 travelers hunt
    *
    * Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    * of attempting to be being added to the wagon using the wagons addPassenger method.
    *
    * Run the isQuarantined method for the wagon
    *
    * Run the getFood method for the wagon
    *
    * the return values of all the methods should be displayed in the console using console.log()
    * the console.log statements should not live inside any methods on the objects 
    *
    */
    function rand() {
        return Math.round(Math.random() * 100)
    }
   
    let traveler1 = new Traveler(rand(), "Morgan", true);
    console.log(traveler1.eat());
    let traveler2 = new Traveler(rand(), "Eliot", true);
    console.log(traveler2.hunt());
    let traveler3 = new Traveler(rand(), "Devon", true);
    console.log(traveler3.eat());
    let traveler4 = new Traveler(rand(), "Amber", true);
    console.log(traveler4.hunt());
    let traveler5 = new Traveler(rand(), "Brooklyn", true);
    console.log(traveler5.eat());
    
    let wagon = new Wagon(4, []);
    let travelers = [traveler1, traveler2, traveler3, traveler4, traveler5];
    for (let traveler of travelers) {
        if (Math.random() > 0.5) {
            console.log(`Add passenger (${traveler.name}): ${wagon.addPassenger(traveler)}`);
        }
    }
    console.log(`Wagon is quaratined? ${wagon.isQuarantined()}`);
    console.log(`Wagon total food: ${wagon.getFood()}`);

})();

