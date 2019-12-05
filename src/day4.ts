// input between 124075-580769

//let doubleRegex = /([0-9])\1/ig //For Post sake - DIE REGEX MATCHT OM DE 2 KEER
//https://stackoverflow.com/questions/18462784/why-is-javascript-regex-matching-every-second-time 
//https://stackoverflow.com/questions/1520800/why-does-a-regexp-with-global-flag-give-wrong-results
// '''''FUCK''''''' typescript\

let doubleRegex = /([0-9])\1/i

//console.log('Has double ', hasDouble(12334))
//console.log('Has double ', hasDouble(123))
console.log(isLegitP2(111112))
console.log(isLegit(223450))
console.log(isLegit(123789))
console.log(isLegit(124445))

console.log('test', day4A(110, 123))
console.log('4A', day4A(124075, 580769))
console.log('4B', day4B(124075, 580769))

function day4A(start: number, end: number) {
    //AKA function 'bruteforce'
    let legit = 0
    for (let count = 124075; count < end; count++) {
        if (isLegit(count)) {
            //console.log(count)
            legit++
        }
    }
    return legit
}

function day4B(start: number, end: number) {
    //AKA function 'bruteforce'
    let legit = 0
    for (let count = 124075; count < end; count++) {
        if (isLegitP2(count)) {
            //console.log(count)
            legit++
        }
    }
    return legit
}


function isLegit(input: number) {
    return hasDouble(input) && isRising(input);
}

function isLegitP2(input: number) {
    return hasDouble(input) && validRising(input);
}

function validRising(input: number): boolean {
    let currentFollowing = 0
    let exact2Following = 0

    let numberArray = Array.from(input.toString()).map(Number);

    for (let cnt = 0; cnt < numberArray.length; cnt++) {
        if (cnt != 0) {
            if (numberArray[cnt] < numberArray[cnt - 1]) {
                return false
            }
            if (numberArray[cnt] == numberArray[cnt - 1]) {
                currentFollowing++
            } else {
                currentFollowing = 0
            }
            if (currentFollowing == 1) {
                exact2Following++
            }
            if (currentFollowing == 2) {
                exact2Following--           //Forgive me, I blame javascript, and to a lesser extend typescript
            }
        }
    }
    return exact2Following != 0
}

function hasDouble(input: number): boolean {
    let asString = input.toString()
    return doubleRegex.test(asString)
}

function isRising(input: number) {
    let numberArray = Array.from(input.toString()).map(Number);

    for (let cnt = 0; cnt < numberArray.length; cnt++) {
        if (cnt != 0) {
            if (numberArray[cnt] < numberArray[cnt - 1]) {
                return false
            }
        }
    }
    return true
}