import * as fs from 'fs';

export class FileReader {
    read(location:string) {
        fs.readFile(location, 'utf8', this.onRead)
    }

    onRead(err: NodeJS.ErrnoException, data: string){
        if (err){ 
            //do shit with errors
            console.error(err)
        }
        console.log(data)
    }
}