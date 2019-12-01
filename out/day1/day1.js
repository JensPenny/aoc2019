"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filereader_1 = require("../tools/filereader");
let reader = new filereader_1.FileReader;
reader.read("./assets/day1")
    .then(data => { day1A(data); })
    .catch(err => { console.error(err); });
reader.read("./assets/day1")
    .then(data => { day1B(data); })
    .catch(err => { console.error(err); });
function day1A(data) {
    let list = reader.asStringList(data);
    console.log(list);
    let totalFuel = list
        .map(element => Number(element))
        .map(element => calculateMass(element))
        .reduce((sum, current) => sum + current);
    console.log(totalFuel);
}
function day1B(data) {
    let list = reader.asStringList(data);
    console.log(list);
    let totalFuel = list
        .map(element => Number(element))
        .map(element => calculateRecurrent(element))
        .reduce((sum, current) => sum + current);
    console.log(totalFuel);
}
function calculateRecurrent(input) {
    let fuel = Math.floor(input / 3) - 2;
    if (fuel < 0) {
        return 0;
    }
    return calculateRecurrent(fuel) + fuel;
}
function calculateMass(input) {
    let fuel = Math.floor(input / 3) - 2;
    if (fuel < 0) {
        return 0;
    }
    return fuel;
}
//# sourceMappingURL=day1.js.map