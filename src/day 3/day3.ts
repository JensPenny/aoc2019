import {
    FileReader
} from "../tools/filereader";

class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

let reader = new FileReader
day3A('R8,U5,L5,D3\nU7,R6,D4,L4')
day3A('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83')
day3A('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7')

reader.read("./assets/day3")
    .then(data => day3A(data))
    .catch(err => console.error(err))


function day3A(data: string) {
    let lines = reader.asStringList(data, '\n')
    let wires = lines.map(line => parseWire(line))

    let equalableWire1 = wires[0].map(point => JSON.stringify(point))
    let equalableWire2 = wires[1].map(point => JSON.stringify(point))
    let dupeDistances: number[] = []
    let duplicates = equalableWire1.filter(value => {
        let isDuplicate = -1 !== equalableWire2.indexOf(value)
        if (isDuplicate) {
            dupeDistances.push(equalableWire2.indexOf(value) + equalableWire1.indexOf(value) + 2) //offset 2 voor indices
        }
        return isDuplicate
    })

    /* foute initiele implementatie of shame
    let multiPoints: Point[] = []
    allPoints.forEach(point => {
        if (pointmap.has(JSON.stringify(point))) {
            pointmap.set(JSON.stringify(point), pointmap.get(point) + 1) //wait what the shit?
            multiPoints.push(point)
        } else {
            pointmap.set(JSON.stringify(point), 1)
        }
    })
    */

    let minimum = 1000
    duplicates
        .map(stringed => JSON.parse(stringed))
        .forEach(element => {
            let distance = calculateManhattan(element)
            if (distance < minimum) {
                minimum = distance
                console.log('new minimum {}', minimum)
            }
        });

    let minDist = dupeDistances.reduce((min, current) => {
        if (min < current) {
            return min
        }
        return current
    })
    console.log('Day 3 A - minimal manhattan = ' + minimum)
    console.log('Day 3 B - minimum steps = {}', minDist)
}

function calculateManhattan(point: Point): number {
    return Math.abs(point.x) + Math.abs(point.y)
}

function parseWire(line: string): Point[] {
    let moves = reader.asStringList(line, ',')
    let startPos = new Point(0, 0)

    let pointsList: Point[] = []
    moves.forEach(point => {
        let movePositions = parseMove(point, startPos)
        pointsList = pointsList.concat(movePositions)
        startPos = movePositions[movePositions.length - 1]
    })
    return pointsList
}

function parseMove(data: string, position: Point): Point[] {
    let points: Point[] = []
    let [first, ...rest] = data
    let amount = Number(rest.join(''))
    for (let current = 0; current < amount; current++) {
        switch (first) {
            case 'U': {
                position = new Point(position.x, position.y + 1)
                points.push(position)
                break
            }
            case 'D': {
                position = new Point(position.x, position.y - 1)
                points.push(position)
                break
            }
            case 'L': {
                position = new Point(position.x - 1, position.y)
                points.push(position)
                break
            }
            case 'R': {
                position = new Point(position.x + 1, position.y)
                points.push(position)
                break
            }
            default:
                break;
        }
    }
    return points
}