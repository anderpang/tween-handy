
var gulp=require("gulp");
var ts = require('gulp-typescript');
var through = require('through2');
var uglify = require('gulp-uglify');
var tsconfig=ts.createProject("./tsconfig.json");

var startString=`/*!
* TweenHandy.js 1.0.0
* https://github.com/anderpang/tween-handy
* <anderpang@foxmail.com>
*/
"use strict";
//////////////////////  playList ////////////////////////////////
(function (context,factory) {
   if (typeof module === "object" && typeof module.exports === "object") {
       Object.defineProperty(exports, "__esModule", { value: true });
       exports.default=factory();
   }
   else if (typeof define === "function" && define.amd) {
       define([], factory);
   }
   else{
       context.TweenHandy=factory();
   }
})(this,function () {`;



gulp.task('default', async function(){
  gulp.src(['src/**/*.ts'])
    .pipe(tsconfig())
    .pipe(mygulp(startString))
    .pipe(uglify({
        output:{
            comments:/^!/
        }
        // preserveComments:/^!/
    }))
    .pipe(gulp.dest('dist/'))
});


function mygulp(banner){
    if(!banner){
        banner = "";
    }

    var banner = Buffer.from(banner);

    var stream = through.obj(function(file, encoding, callback){
        // 如果file类型不是buffer,不处理
        if(!file.isBuffer()){
            return callback(null,file);
        }

        var contents=file.contents.toString(),
            startIndex=contents.indexOf("\/\/当前播放列表");

            contents=contents.substr(startIndex).replace("exports.default =","return");


        // 将字符串加到文件数据开头
        file.contents = Buffer.from(banner+contents);

        //告诉stream这一步已经完成了，应该轮到下一个插件处理了，同时把处理过的文件扔回去
        callback(null, file);
    });
    
    return stream;
};
