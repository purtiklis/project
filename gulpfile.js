const gulp = require('gulp'),
      debug = require('gulp-debug'),
      header_comment = require('gulp-header-comment'),
      connect = require('gulp-connect'),
      del = require('del'),
      rename = require('gulp-rename'),
      plumber = require('gulp-plumber'),
      argv = require('yargs').argv,
      bump = require('gulp-bump'),
      merge = require('merge-stream'),
      fs = require('fs'),
      run_sequence = require('run-sequence'),
      git = require('gulp-git'),

      html_partial = require('gulp-html-partial'),
      htmlbeautify = require('gulp-html-beautify'),

      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      csso = require('gulp-csso'),
      sourcemaps = require('gulp-sourcemaps'),

      uglify = require('gulp-uglify'),
      
      moment = require('moment'),
      pkg = function () {
          return JSON.parse(fs.readFileSync('package.json', 'utf8'));
      },
      concat = require('gulp-concat')
;

const meta = ['<%= pkg.name %> (<%= pkg.homepage %>)',
              'Version: <%= pkg.version %>',
              'Generated on: <%= moment().format(\'YYYY-MM-DD HH:mm:ss\') %>',
              'Author: <%= pkg.author %>'
             ].join('\n');


gulp.task('html', function() {
    return gulp.src(['src/html/**/[!_]*.html'])
        .pipe(plumber())
        .pipe(html_partial({ 
            basePath: 'src/html/' 
        }))
        .pipe(htmlbeautify({ 
            indent_char: ' ', 
            indent_size: 2 
        }))
        .pipe(header_comment(meta))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
}); 

gulp.task('styles', function(){
    return gulp.src(['src/scss/**/[!_]*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(header_comment(meta))
        .pipe(sass({ outputStyle: 'expanded', precision: 4 }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            flexbox: 'no-2009'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
});

gulp.task('styles-minify', function(){
    return gulp.src(['src/scss/**/[!_]*.scss'])
        .pipe(sourcemaps.init())
        .pipe(header_comment(meta))
        .pipe(sass({ outputStyle: 'expanded', precision: 4 }))
        .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        flexbox: 'no-2009'
    }))
        .pipe(csso({
        sourceMap: true
    }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
    return gulp.src(['src/**/*.js'])
        .pipe(plumber())
//        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js')) 
        .pipe(header_comment(meta))
//        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
}); 

gulp.task('scripts-minify', function(){
    return gulp.src(['src/**/*.js'])
    //        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js')) 
        .pipe(uglify())
        .pipe(header_comment(meta))
        .pipe(rename({ extname: '.min.js' }))
    //        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('del', function(){
    return del(['dist/**/*']);
}); 

gulp.task('connect', function() {
    return connect.server({ 
        root: '.',
        port: 8081,
        livereload: true
    });
});

gulp.task('default', ['del'], function() {
    gulp.start(['connect', 'html', 'styles', 'scripts']);

    gulp.watch(['src/**/*.html'], ['html']);
    gulp.watch(['src/**/*.scss'], ['styles']);
    gulp.watch(['src/**/*.js'], ['scripts']);
});


// gulp build (default: prerelease)
// gulp build --t=patch
// gulp build --t=minor
// gulp build --t=major

gulp.task('build', function(){
    run_sequence(
        'del',
        'bump', 
        'html', 
        'styles', 
        'scripts',
        'styles-minify',
        'scripts-minify',
        'changelog',
        'commit-changes',
        'push-changes',
//        'create-new-tag',
//        'github-release',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log(pkg().version + ' BUILD FINISHED SUCCESSFULLY');
            }
        });
});

gulp.task('bump', function(){
    return gulp.src(['package.json'])
        .pipe(bump({ type: argv.t || 'prerelease' }))
        .pipe(gulp.dest('.'));
});

var conventionalChangelog = require('gulp-conventional-changelog');
var conventionalGithubReleaser = require('conventional-github-releaser');

gulp.task('changelog', function () {
    return gulp.src('CHANGELOG.md', {
        buffer: false
    })
    .pipe(conventionalChangelog({
        preset: 'test'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', function () {
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit('version: ' + pkg().version));
});

gulp.task('push-changes', function (cb) {
    git.push('origin', 'master', cb);
});

//gulp.task('create-new-tag', function (cb) {
//    let version = pkg().version;
//    git.tag(version, 'Created Tag for version: ' + version, function (error) {
//        if (error) {
//            return cb(error);
//        }
//        git.push('origin', 'master', {args: '--tags'}, cb);
//    });
//});

/*gulp.task('github-release', function(done) {
    conventionalGithubReleaser({
        type: "oauth",
        token: 'xxx' // change this to your own GitHub token or use an environment variable
    }, {
        preset: 'test' // Or to any other commit message convention you use.
    }, done);
});*/