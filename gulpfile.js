/* required methods */

var gulp			= require('gulp');
var concat			= require('gulp-concat');
var rename			= require('gulp-rename');
var uglify			= require('gulp-uglify');
var runSequence		= require('run-sequence');
var watch			= require('gulp-watch');

/* tasks */
gulp.task('depsjs', function(){
	return gulp.src([
		'bower_components/angular/angular.min.js',
		'bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'bower_components/angular-route/angular-route.min.js',
		'bower_components/angular-animate/angular-animate.min.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
		'bower_components/angular-base64/angular-base64.min.js',
		'bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',		
		'bower_components/oclazyload/dist/ocLazyLoad.min.js',
		'bower_components/angular-ui-grid/ui-grid.min.js',	
		'bower_components/checklist-model/checklist-model.js'	,
		'bower_components/Chart.js/Chart.min.js',
		'bower_components/angular-chart.js/dist/angular-chart.min.js',
		'bower_components/tc-angular-chartjs/dist/tc-angular-chartjs.min.js',
		'js/deps/angular-notify.js'	
		
		])// eof gul src
	.pipe(concat('devdeps.js'))
	.pipe(gulp.dest('src/js'))
//	.pipe(uglify())
//	.pipe(gulp.dest('src/js'))

})// eof depsjs
gulp.task('appjs', function(){
	return gulp.src([
		'js/*.js',
		'js/directives/*.js',
		'js/controllers/*.js',
		'js/services/*.js',
		'js/routes.js'
		])// eof gul src
	.pipe(concat('app.js'))
	.pipe(gulp.dest('src/js'))
	//.pipe(uglify())
	//.pipe(gulp.dest('src/js'))

})// eof appjs

gulp.task('css', function(){
	return gulp.src([
		'css/default.css',
		'bower_components/bootstrap/dist/css/bootstrap.min.css',
		'css/angular-notify.css',
		'bower_components/angular-chart.js/dist/angular-chart.css',
		'bower_components/angular-ui-grid/ui-grid.min.css',
		'bower_components/angular-ui-notification/dist/angular-ui-notification.min.css'
		
		])// eof gul src
	.pipe(concat('smartafarm.css'))
	.pipe(gulp.dest('src/css'))
//	.pipe(uglify())
//	.pipe(gulp.dest('src/js'))

})// eof appjsgulp.task('admindepsjs', function(){

gulp.task('adminappjs', function(){
	return gulp.src([
		'js/admin/*.js',
		'js/admin/directives/*.js',
		'js/admin/controllers/*.js',
		'js/admin/services/*.js',
		'js/admin/routes.js'
		])// eof gul srcgulp wa
	.pipe(concat('app.js'))
	.pipe(gulp.dest('src/admin/js'))
	//.pipe(uglify())
	//.pipe(gulp.dest('src/js'))

})// eof appjs


gulp.task('watch', function(){
	gulp.watch(['js/*.js','js/controllers/*.js','js/directives/*.js','js/deps/*.js','js/services/*.js',
		'js/admin/*.js','js/admin/controllers/*.js','js/admin/directives/*.js','js/admin/deps/*.js','js/admin/services/*.js'
		,'gulpfile.js'], ['default']);	
})// eof appjs


gulp.task('default', function(callback){
	runSequence('appjs','depsjs','adminappjs',callback)
});// eof defaultgulp
