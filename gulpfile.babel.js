import gulp from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'
import log from 'fancy-log'
import path from 'path'
import fs from 'fs'
import mjml2html from 'mjml'
import { registerComponent } from 'mjml-core'
import MyComponent from './components/MyComponent';

//const { registerComponent } = require('mjml-core');
//const MyComponent = require('./components/MyComponent');

registerComponent(MyComponent);
const mjmlContent = fs.readFileSync('index.mjml', 'utf8');
const { html, errors } = mjml2html(mjmlContent, {validationLevel: 'strict'});

if (errors.length > 0) {
  console.error('Erreurs lors de la compilation MJML :', errors);
}

fs.writeFileSync('index.html', html);
console.log('Compilation réussie : index.html généré.');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file))
  })
  return filelist
}

const watchedComponents = walkSync('./components')

const compile = () => {
  return gulp
    .src(path.normalize('components/**/*.js'))
    .pipe(babel({
      presets: ['@babel/preset-env'],
    }))
    .on('error', log)
    .pipe(gulp.dest('lib'))
    .on('end', () => {
      watchedComponents.forEach(compPath => {
        const fullPath = path.join(process.cwd(), compPath.replace(/^components/, 'lib'))
        delete require.cache[fullPath]
        const comp = require(fullPath);
        registerComponent(comp.default || comp);
      })
    
      fs.readFile(path.normalize('./index.mjml'), 'utf8', (err, data) => {
        if (err) throw err
        const result = mjml2html(data)
        fs.writeFileSync(path.normalize('./index.html'), result.html)
      })
    })
    /*.on('end', () => {
      watchedComponents.forEach(compPath => {
        const fullPath = path.join(process.cwd(), compPath.replace(/^components/, 'lib'))
        delete require.cache[fullPath]
        registerComponent(require(fullPath).default)
      })

      fs.readFile(path.normalize('./index.mjml'), 'utf8', (err, data) => {
        if (err) throw err
        const result = mjml2html(data)
        fs.writeFileSync(path.normalize('./index.html'), result.html)
      })
    })*/
}



gulp.task('build', compile)

gulp.task('watch', () => {
  compile()
  return watch([path.normalize('components/**/*.js'), path.normalize('index.mjml')], compile)
})


