import {
    FileReader
} from "../tools/filereader";
import {
    read
} from "fs";

let reader = new FileReader

testProgram('1,0,0,0,99')
testProgram('2,3,0,3,99')
testProgram('2,4,4,5,99,0')
testProgram('1,1,1,4,99,5,6,0,99')


reader.read("./assets/day2")
    .then(data => day2A(data))
    .catch(err => console.error(err))

reader.read("./assets/day2")
    .then(data => day2B(data))
    .catch(err => console.error(err))

function day2A(data: string) {
    let codes = reader.asStringList(data, ',').map(s => Number(s));
    codes[1] = 12
    codes[2] = 2
    let result = runProgram(codes)
    console.log(result[0])
}

function day2B(data: string) {
    let codes = reader.asStringList(data, ',').map(s => Number(s));
    let search = 19690720

    let counter = Array.from(Array(99).keys())

    for (let verb of counter) {
        for (let noun of counter) {
            let codeCopy = codes.map(entry => entry)
            codeCopy[1] = noun
            codeCopy[2] = verb
            let result = runProgram(codeCopy)

            if (result[0] == search){
                console.log('day 2 result = ' + (100 * noun + verb))
                continue
            }
        }
    }
}

function testProgram(data: string): number[] {
    let codes = reader.asStringList(data, ',').map(s => Number(s));
    let testresult = runProgram(codes)
    console.log(testresult)
    return codes;
}

function runProgram(codes: number[]): number[] {
    let currentIndex = 0;
    while (currentIndex < codes.length) {
        let code = codes[currentIndex];
        switch (code) {
            case 99: {
                currentIndex = codes.length; //stop op
                break;
            }
            case 1: {
                let sum = codes[codes[currentIndex + 1]] + codes[codes[currentIndex + 2]];
                let pos = codes[currentIndex + 3];
                codes[pos] = sum;
                currentIndex += 4;
                break;
            }
            case 2: {
                let multi = codes[codes[currentIndex + 1]] * codes[codes[currentIndex + 2]];
                let pos = codes[currentIndex + 3];
                codes[pos] = multi;
                currentIndex += 4;
                break;
            }
            default:
                console.log('Unknown opcode ' + code);
                currentIndex += 1;
                break;
        }
    }
    return codes;
}