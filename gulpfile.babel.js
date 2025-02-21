import fs from 'fs'
import mjml2html from 'mjml'
import { registerComponent } from 'mjml-core'
import MyComponent from './components/MyComponent';

registerComponent(MyComponent);
const mjmlContent = fs.readFileSync('index.mjml', 'utf8');
const { html, errors } = mjml2html(mjmlContent, {validationLevel: 'strict'});

if (errors.length > 0) {
  console.error('Erreurs lors de la compilation MJML :', errors);
}

fs.writeFileSync('index.html', html);
console.log('Compilation réussie : index.html généré.');

