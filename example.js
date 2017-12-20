(function () {
    /*
    * Interfaces
    */
    /*
    * Classes
    */
    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    var Traveler = /** @class */ (function () {
        function Traveler(food, name, isHealthy) {
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }
        Traveler.prototype.getFood = function () {
            return this.food;
        };
        Traveler.prototype.setFood = function (food) {
            this.food = food;
        };
        Traveler.prototype.hunt = function () {
            if (Math.random() > .5) {
                this.food = this.food + 100;
            }
            return this.food;
        };
        Traveler.prototype.eat = function () {
            if (this.food >= 20) {
                this.food = this.food - 20;
            }
            else if (this.food < 20) {
                this.isHealthy = false;
            }
            return this.isHealthy;
        };
        return Traveler;
    }());
    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    var Wagon = /** @class */ (function () {
        function Wagon(capacity, passengerArray) {
            this.capacity = capacity;
            this.passengerArray = passengerArray;
        }
        Wagon.prototype.addPassenger = function (traveler) {
            if (this.passengerArray.length < this.capacity) {
                this.passengerArray.push(traveler);
                return "added";
            }
            return "sorry";
        };
        Wagon.prototype.isQuarantined = function () {
            return this.passengerArray.some(function (traveler) { return !traveler.isHealthy; });
            // for (let traveler of this.passengerArray) {
            //     if (!traveler.isHealthy) {
            //         return true;
            //     }
            // }
            // return false;
        };
        Wagon.prototype.getFood = function () {
            var sum = 0;
            for (var _i = 0, _a = this.passengerArray; _i < _a.length; _i++) {
                var traveler = _a[_i];
                sum += traveler.getFood();
            }
            return sum;
        };
        return Wagon;
    }());
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
    var traveler1 = new Traveler(28, "Morgan", true);
    console.log(traveler1.eat());
    var traveler2 = new Traveler(26, "Eliot", true);
    console.log(traveler2.hunt());
    var traveler3 = new Traveler(18, "Devon", true);
    console.log(traveler3.eat());
    var traveler4 = new Traveler(16, "Morgan", true);
    console.log(traveler4.hunt());
    var traveler5 = new Traveler(13, "Brooklyn", true);
    console.log(traveler5.eat());
    var wagon = new Wagon(4, []);
    var travelers = [traveler1, traveler2, traveler3, traveler4, traveler5];
    for (var _i = 0, travelers_1 = travelers; _i < travelers_1.length; _i++) {
        var traveler = travelers_1[_i];
        if (Math.random() > 0.5) {
            console.log("Add passenger (" + traveler.name + "): " + wagon.addPassenger(traveler));
        }
    }
    console.log("Wagon is quaratined? " + wagon.isQuarantined());
    console.log("Wagon total food " + wagon.getFood());
})();
