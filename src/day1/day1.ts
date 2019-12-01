import {
    FileReader
} from "../tools/filereader";
import {
    read
} from "fs";

let reader = new FileReader

reader.read("./assets/day1")
    .then(data => day1A(data))
    .catch(err => console.error(err))

reader.read("./assets/day1")
    .then(data => day1B(data))
    .catch(err => console.error(err))

function day1A(data: string) {
    let list = reader.asStringList(data)
    console.log(list)

    let totalFuel = list
        .map(element => Number(element))
        .map(element => calculateMass(element))
        .reduce((sum, current) => sum + current);
    console.log(totalFuel)
}

function day1B(data: string) {
    let list = reader.asStringList(data)
    console.log(list)

    let totalFuel = list
        .map(element => Number(element))
        .map(element => calculateRecurrent(element))
        .reduce((sum, current) => sum + current);
    console.log(totalFuel)
}

function calculateRecurrent(input: number): number {
    let fuel = Math.floor(input / 3) - 2
    if (fuel < 0) {
        return 0
    }
    return calculateRecurrent(fuel) + fuel
}

function calculateMass(input: number): number {
    let fuel = Math.floor(input / 3) - 2
    if (fuel < 0) {
        return 0
    }
    return fuel
}