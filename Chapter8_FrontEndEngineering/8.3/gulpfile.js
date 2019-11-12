var gulp = require("gulp");
gulp.task("default", function(){
    console.log("this is a test.")
})

var babel = require("gulp-babel");
gulp.task("compile-js", function(){
    gulp.src("src/**/*.js").pipe(babel({ // 获取src下所有脚本
        presets: ['es2015']
    }))
    .pipe(gulp.dest("dist/js"));
})

var sass = require("gulp-sass");
gulp.task("compile-sass", function(){
    gulp.src("theme/**/*.scss")
    .pipe(scss().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
})

var spritesmith = require("gulp.spritesmith");
gulp.task("sprite", function(){
    gulp.src("theme/image/**.png")
    .pipe(spritesmith({
        imgName: "sprite.png",
        cssName: "sprite.css"
    }))
    .pipe(gulp.dest("dist"));
})