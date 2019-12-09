export class IntCoder{

    isLogging: boolean
    constructor(logging: boolean){
        this.isLogging = logging
    }

    runProgram(codes: number[], inputStream: number[]): number[] {
        let outputStream = []
        let currentIndex = 0;
        while (currentIndex < codes.length) {
            let code = codes[currentIndex];
            let opCode = new OpCode(code);
            if (this.isLogging) { console.log('coding ' + opCode.code) }
            switch (opCode.code) {
                case 99: {
                    currentIndex = codes.length; //stop op
                    break;
                }
                case 1: {
                    let param1 = codes[currentIndex + 1]
                    let param2 = codes[currentIndex + 2]
                    let param3 = codes[currentIndex + 3]
                    let val1 = opCode.p1Pos ? codes[param1] : param1
                    let val2 = opCode.p2Pos ? codes[param2] : param2
                    let val3 =  param3 //Write param
                    let sum = val1 + val2;
                    let pos = val3;
                    codes[pos] = sum;
                    currentIndex += 4;
                    break;
                }
                case 2: {
                    let param1 = codes[currentIndex + 1]
                    let param2 = codes[currentIndex + 2]
                    let param3 = codes[currentIndex + 3]
                    let val1 = opCode.p1Pos ? codes[param1] : param1
                    let val2 = opCode.p2Pos ? codes[param2] : param2
                    let val3 = param3 //Write param
    
                    let multi = val1 * val2;
                    let pos = val3;
                    codes[pos] = multi;
                    currentIndex += 4;
                    break;
                }
                case 3: {
                    let input = inputStream.pop()
                    let param1 = codes[currentIndex + 1] //Write param
                    codes[param1] = input
                    currentIndex += 2
                    break;
                }
                case 4: {
                    let param1 = codes[currentIndex + 1] //Write param - hurr durr opgave
                    let val1 = opCode.p1Pos ? codes[param1] : param1
    
                    outputStream.push(val1)
                    if (this.isLogging) { console.log('outputting ' + val1) }
                    currentIndex += 2
                    break;
                }
                case 5: {
                    let param1 = codes[currentIndex + 1]
                    let param2 = codes[currentIndex + 2]
                    let val1 = opCode.p1Pos ? codes[param1] : param1
                    let val2 = opCode.p2Pos ? codes[param2] : param2
    
                    if (val1 != 0) {
                        currentIndex = val2
                    } else {
                        currentIndex += 3
                    }
                    break
                }
                case 6: {
                    let param1 = codes[currentIndex + 1]
                    let param2 = codes[currentIndex + 2]
                    let val1 = opCode.p1Pos ? codes[param1] : param1
                    let val2 = opCode.p2Pos ? codes[param2] : param2
    
                    if (val1 == 0) {
                        currentIndex = val2
                    } else {
                        currentIndex += 3
                    }
                    break
                }
                case 7: {
                    let param1 = codes[currentIndex + 1]
                    let param2 = codes[currentIndex + 2]
                    let param3 = codes[currentIndex + 3]
                    let val1 = opCode.p1Pos ? codes[param1] : param1
                    let val2 = opCode.p2Pos ? codes[param2] : param2
                    let pos = param3 //Write param
    
                    if (val1 < val2) {
                        codes[pos] = 1
                    } else {
                        codes[pos] = 0
                    }
                    currentIndex += 4;
                    break
                }
                case 8: {
                    let param1 = codes[currentIndex + 1]
                    let param2 = codes[currentIndex + 2]
                    let param3 = codes[currentIndex + 3]
                    let val1 = opCode.p1Pos ? codes[param1] : param1
                    let val2 = opCode.p2Pos ? codes[param2] : param2
                    let pos = param3 //Write param
    
                    if (val1 == val2) {
                        codes[pos] = 1
                    } else {
                        codes[pos] = 0
                    }
                    currentIndex += 4;
                    break
                }
            
                default:
                    console.log('Unknown opcode ' + opCode.code);
                    currentIndex += 1;
                    break;
            }
            //console.log(codes)
        }
        return outputStream;
    }
}

class OpCode {
    code: number
    p1Pos: boolean
    p2Pos: boolean
    p3Pos: boolean

    constructor(opcode: number) {
        let opCodeString = opcode.toString().padStart(5, '0')
        let opcodeArray = Array.from(opCodeString).map(Number);
        this.code = Number(opcodeArray.slice(3, 5).join(''))
        this.p1Pos = opcodeArray[2] == 0 
        this.p2Pos = opcodeArray[1] == 0
        this.p3Pos = opcodeArray[0] == 0
    }
}

