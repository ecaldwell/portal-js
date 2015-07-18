var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require("del");

gulp.task("build", function () {
  return gulp.src("./src/**/*.js")
    .pipe(babel({
      modules: "amd"
    }))
    .pipe(gulp.dest("build/portal-js"))
});

gulp.task("cleanup", function () {
  del([
    "build/*"
  ]);
});
