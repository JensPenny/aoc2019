import {
    IntCoder
} from "./tools/IntCoder";
import {
    FileReader
} from "./tools/filereader";
import * as _ from 'lodash'

class Acs {
    multiplier: number;
    program: IntCoder;

    constructor(multi: number) {
        this.multiplier = multi;
        this.program = new IntCoder(true);
    }

    run(codes: number[], input: number[]): number[] {
        return this.program.runProgram(codes, [this.multiplier, ...input])
    }
}

var permutation = require('array-permutation'); //whatever dude
//var iter = perm([1, 2, 3, 4]);

day7A('3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0', [
    [4, 3, 2, 1, 0]
])
day7A('3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0', [
    [1, 0, 4, 3, 2]
])

let reader = new FileReader
reader.read("./assets/day7")
    .then(data => day7A(data, permutation([0, 1, 2, 3, 4])))
    .catch(err => console.error(err))

function runAcs(codes: number[], input: number[], program: Acs): Promise < number[] > {
    return new Promise((resolve, reject) => {
        let output = program.run(codes, input)
        resolve(output)
    })
}

function day7A(input: string, permutations: any) {
    let codes = input.split(',').map(s => Number(s))

    let program = new IntCoder(true)
    let results = []
    for (let [a, b, c, d, e] of permutations) {
        let aout = program.runProgram(codes, [a, 0])
        let bout = program.runProgram(codes, [b, ...aout])
        let cout = program.runProgram(codes, [c, ...bout])
        let dout = program.runProgram(codes, [d, ...cout])
        let eout = program.runProgram(codes, [e, ...dout])
        console.log(eout)
        results.push(eout)
        /*runAcs(_.clone(codes), [0], new Acs(a))
            .then(data => runAcs(_.clone(codes), data, new Acs(b)))
            .then(data => runAcs(_.clone(codes), data, new Acs(c)))
            .then(data => runAcs(_.clone(codes), data, new Acs(d)))
            .then(data => runAcs(_.clone(codes), data, new Acs(e)))
            .then(data => console.log(data))
            */
    }

    let max = results
        .map(res => res[0])
        .reduce((max, current) => {
            if (current > max) {
                return current
            }
            return max
        })
    console.log('max = ' + max)
}