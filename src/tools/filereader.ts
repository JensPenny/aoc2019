import * as fs from 'fs';

export class FileReader {
    read(location: string): Promise < any > {
        return new Promise((resolve, reject) => {
            fs.readFile(location, 'utf8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            });
        });
    }

    asStringList(data: string, separator: string): Array < String > {
        return data.split(separator)
    }

}