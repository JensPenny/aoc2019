"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class FileReader {
    read(location) {
        fs.readFile(location, 'utf8', this.onRead);
    }
    onRead(err, data) {
        if (err) {
            //do shit with errors
            console.error(err);
        }
        console.log(data);
    }
}
exports.FileReader = FileReader;
var file;
file = new FileReader();
file.read("./assets/test.txt");
//# sourceMappingURL=filereader.js.map