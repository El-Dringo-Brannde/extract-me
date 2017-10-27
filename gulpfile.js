var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var server = require("gulp-develop-server")

gulp.task("build", function () {
   return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest("dist"))

});

gulp.task('watch', function () {
   gulp.watch("src/**/*.ts", ['default'])
});

gulp.task("server:start", function () {
   server.listen({ path: "./dist/index.js" })
})
gulp.task("server:restart", function () {
   gulp.watch(["src/**/*.ts"], server.restart)
})

gulp.task('default', ['build', 'watch', 'server:start', "server:restart"])