var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require("del");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task("build", function () {
  return gulp.src("./src/**/*.js")
    .pipe(babel({
      modules: "amd"
    }))
    .pipe(gulp.dest("build"))
    .pipe(gulp.dest("../portal-js-test/js/portal"));
});

gulp.task("cleanup", function () {
  del([
    "build/*"
  ]);
});
