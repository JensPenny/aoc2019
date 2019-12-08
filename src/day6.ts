import {
    FileReader
} from "./tools/filereader";

class Orbit {
    name: string
    parent ? : Orbit | null

    constructor(name: string, parent ? : Orbit) {
        this.name = name
        this.parent = parent
    }
}


let reader = new FileReader
let testInput = 'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L'
let testInput2 = 'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN'
//day6A(testInput)
day6B(testInput2)

/*
reader.read("./assets/day6")
    .then(data => day6A(data))
    .catch(err => console.error(err))
    */
reader.read("./assets/day6")
   .then(data => day6B(data))
   .catch(err => console.error(err))


function day6A(input: string) {
    let nodes = createTree(input)
    //nodes.forEach(node => console.log(node.name + ' - ' + ((node.parent) ? node.parent.name : 'no parent'))) Print to check test
    console.log('Amount orbits: ' + countOrbits(nodes))
}

function day6B(input: string) {
    let nodes = createTree(input)
    let youNode = nodes.find(node => node.name == 'YOU')
    let santaNode = nodes.find(node => node.name == 'SAN')

    let youPath = createPath(youNode)
    let santaPath = createPath(santaNode)

    let common = youPath.find(youStr => -1 !== santaPath.indexOf(youStr))
    let commonCount = santaPath.indexOf(common) + youPath.indexOf(common)

    console.log('min transfers: ' + commonCount)
}

function createTree(input: string): Orbit[] {
    let nodes = reader.asStringList(input, '\n')

    let createdNodes: Orbit[] = []

    nodes.map(node => {
        let nodeInfo = node.split(')')
        let parent = nodeInfo[0]
        let child = nodeInfo[1]

        let parentNode = createdNodes.find(obj => obj.name == parent)
        let childNode = createdNodes.find(obj => obj.name == child)
        if (!parentNode) {
            parentNode = new Orbit(parent)
            createdNodes.push(parentNode)
        }
        if (!childNode) {
            childNode = new Orbit(child)
            createdNodes.push(childNode)
        }
        childNode.parent = parentNode
    })

    return createdNodes
}

function countOrbits(orbits: Orbit[]): number {
    let total = orbits.map(orbit => countSingleOrbit(orbit))
        .reduce((sum, current) => sum + current)
    return total
}

function countSingleOrbit(orbit: Orbit): number {
    if (orbit.parent) {
        return 1 + countSingleOrbit(orbit.parent)
    }
    return 0
}

function createPath(orbit: Orbit): string[] {
    let nodeNames = []
    if (orbit.parent) {
        let parentPaths = createPath(orbit.parent)
        nodeNames.push(orbit.parent.name)
        parentPaths.forEach(element => {
            nodeNames.push(element)
        });
    }
    return nodeNames
}