class extractMe {
   private program;
   private unzip;
   private _;
   private fs;
   private sevenZ;
   private _7z;
   private decomp;

   constructor() {
      this.initParsers();
      this.catchCommands();
   }


   private initParsers(): void {
      this.program = require("commander")
      this.unzip = require('unzip')
      this._ = require("lodash")
      this.fs = require('fs')
      this.sevenZ = require("node-7z")
      this._7z = new this.sevenZ();
      this.decomp = require("decompress");


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