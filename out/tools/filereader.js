"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class FileReader {
    read(location) {
        return new Promise((resolve, reject) => {
            fs.readFile(location, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    asStringList(data) {
        return data.split('\n');
    }
}
exports.FileReader = FileReader;
//let file = new FileReader()
//file.read("./assets/test.txt")
//# sourceMappingURL=filereader.js.map