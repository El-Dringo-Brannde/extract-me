class extractMe {
   private program = require("commander");
   private unzip = require('unzip');
   private _ = require("lodash");
   private fs = require('fs');
   private sevenZ = require("node-7z");
   private _7z = new this.sevenZ();
   private decomp = require("decompress");
   private rar = require("node-unrar");

   constructor() {
      this.catchCommands();
   }
   private catchCommands(): void {
      this.program
         .arguments("<file>")
         .action(file => {
            this.parseFileType(this.cleanFile(file));
         }).parse(process.argv)
   }

   private cleanFile(file: string): string {
      if (file[0] + file[1] == "./")
         file = file.substr(2)
      return file
   }

   private parseFileType(file: string): void {
      if (this._.includes(file, ".zip"))
         this.catchZip(file);
      else if (this._.includes(file, ".7z"))
         this.catch7Zip(file)
      else if (this._.includes(file, ".tar"))
         this.catchTar(file)
      else if (this._.includes(file, ".rar"))
         this.catchRAR(file)
      else
         console.log("File type not supported (yet)!")
   }
   private catchRAR(file: string): void {
      let rar = new this.rar(process.cwd() + "/" + file)
      console.log(rar)
      rar.extract("./", null, err => {
         console.log("weee")
         throw err
      })

   }

   private catchTar(file: string): void {
      this.decomp(process.cwd() + "/" + file, "./")
   }

   private catch7Zip(file: string): void {
      this._7z.extract(process.cwd() + "/" + file, "./");
   }

   private catchZip(file: string): void {
      this.fs.createReadStream(process.cwd() + "/" + file)
         .pipe(this.unzip.Extract({
            path: './'
         }))
   }

}

new extractMe()