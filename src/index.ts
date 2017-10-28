class extractMe {
   private program;
   private unzip;
   private _;
   private fs;

   constructor() {
      this.initParsers();
      this.catchCommands();
   }


   private initParsers(): void {
      this.program = require("commander")
      this.unzip = require('unzip')
      this._ = require("lodash")
      this.fs = require('fs')


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
         file = file.substr(1)
      return file
   }

   private parseFileType(file: string): void {
      if (this._.includes(file, ".zip"))
         this.catchZip(file);

   }


   private catchZip(file: string): void {
      this.fs.createReadStream(process.cwd() + "/" + file)
         .pipe(this.unzip.Extract({
            path: './'
         }))



   }

}

new extractMe()