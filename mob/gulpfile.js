var gulp = require('gulp');
var rename = require('gulp-rename');
var compressor = require('gulp-compressor');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var base64 = require('gulp-base64');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var jade = require('gulp-jade');
var tinypng = require('gulp-tinypng');
var css_minify = require('gulp-minify-css');
var browserify = require('gulp-browserify');
var spritesmith = require('gulp-spritesmith');
var cssmin = require('gulp-cssmin');
var cssmin = require('gulp-util');
gulp.task('lint',function(){
    gulp.src('./static/public/js-modify/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('tinypng',function(){
	return gulp.src('static/public/image/*.png')
		.pipe(changed('static/public/image1'))
		.pipe(tinypng('9kl3nT2f8qC-AaApBVXDeQt-37ArLMNs'))
		.on('error', console.error)
		.pipe(gulp.dest('static/public/image1'));
});
gulp.task('sass-tip', function() {
    gulp.src('./static/public/css-modify/tip.sass')
    .pipe(sass({
		errLogToConsole: true
	}))
    .pipe(css_minify())
    .pipe(gulp.dest('./static/public/css'));
});
gulp.task('sass-footer',function(){
    gulp.src('./static/public/css-modify/footer.sass')
        .pipe(sass())
        .pipe(css_minify())
		.pipe(base64())
        .pipe(gulp.dest('./static/public/css'));
});
gulp.task('sass',function(){
    gulp.src('./static/public/css-modify/*.sass')
        .pipe(sass({
			errLogToConsole: true
		}))
        .pipe(css_minify())
		.pipe(base64())
        .pipe(gulp.dest('./static/public/css'));
});

var js_files = ['app','service','index','taskInfo','communCenter','personCenter', 'userList', 'completePersonInfo', 'authenticate', 'communAppeal', 'communField', 'createCommun', 'joinCommun', 'phoneNumber','qrcode','freshGuide'];
var js_files_only = ['phoneNumber'];
gulp.task('js-only',function(){
    for (i in js_files_only) {
        gulp.src('./static/public/js-modify/'+js_files_only[i]+'.js')
			.pipe(browserify())
			.pipe(concat('.js'))
            .pipe(gulp.dest('./static/public/js'))
            .pipe(rename(js_files_only[i]+'.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./static/public/js'));
    }
});
gulp.task('js-observe',function(){
    for (i in js_files) {
        gulp.src('./static/public/js-modify/'+js_files[i]+'.js')
			.pipe(browserify())
			.pipe(concat('.js'))
            .pipe(gulp.dest('./static/public/js'))
            .pipe(rename(js_files[i]+'.min.js'))
            .pipe(gulp.dest('./static/public/js'));
	}
});
gulp.task('js',function(){
    for (i in js_files) {
        gulp.src('./static/public/js-modify/'+js_files[i]+'.js')
			.pipe(browserify())
			.pipe(concat('.js'))
            .pipe(gulp.dest('./static/public/js'))
            .pipe(rename(js_files[i]+'.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./static/public/js'));
    }
});

gulp.task('jade-tpl',function(){
    var jade_files = {};
    gulp.src('./static/public/tpl/jade/*.jade')
        .pipe(jade({
            locals:jade_files
        }))
        .pipe(gulp.dest('./static/public/tpl'))
});
gulp.task('jade',function(){
    var jade_files = {};
    gulp.src('./template/jade/*.jade')
        .pipe(jade({
            locals:jade_files
        }))
        .pipe(gulp.dest('./template'))
});
