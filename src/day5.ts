import {
    FileReader
} from "./tools/filereader";
import {
    IntCoder
} from "./tools/IntCoder";

let reader = new FileReader

//testProgram('1101,100,-1,4,0', [])
//testProgram('3,0,4,0,99', [110])
//testProgram('1002,4,3,4,33', [])
//testProgram('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',[9])

reader.read("./assets/day5")
    .then(data => day5A(data))
    .catch(err => console.error(err))

reader.read("./assets/day5")
    .then(data => day5B(data))
    .catch(err => console.error(err))

function day5A(data: string) {
    let codes = reader.asStringList(data, ',').map(s => Number(s));
    let computer = new IntCoder(false)
    let result = computer.runProgram(codes, [1])
    console.log(result)
}

function day5B(data: string) {
    let codes = reader.asStringList(data, ',').map(s => Number(s));
    let computer = new IntCoder(false)
    let result = computer.runProgram(codes, [5])
    console.log(result)
}

function testProgram(data: string, input: number[]): number[] {
    let codes = reader.asStringList(data, ',').map(s => Number(s));
    let computer = new IntCoder(true)
    let result = computer.runProgram(codes, input)
    console.log(result)
    return codes;
}