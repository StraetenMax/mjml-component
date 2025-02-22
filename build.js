const fs = require('fs');
const { registerComponent } = require('mjml-core');
const mjml2html = require('mjml');

// Import direct depuis "components"
const MyComponentModule = require('./components/myComponent');
const myComponent = MyComponentModule.default || MyComponentModule;

console.log("Enregistrement du composant :", myComponent);
registerComponent(myComponent);

const mjmlContent = fs.readFileSync('index.mjml', 'utf8');
const { html, errors } = mjml2html(mjmlContent, { validationLevel: 'strict' });

if (errors.length > 0) {
  console.error('Erreurs lors de la compilation MJML :', errors);
} else {
  fs.writeFileSync('index.html', html);
  console.log('Compilation réussie : index.html généré.');
}
