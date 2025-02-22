const fs = require('fs');
const { registerComponent } = require('mjml-core');
const mjml2html = require('mjml');

// Modification de l'import pour gérer export ES6 ou CommonJS
const MyComponentModule = require('./components/MyComponent');
const MyComponent = MyComponentModule.default || MyComponentModule;

registerComponent(MyComponent);

// Lire le fichier MJML et compiler
const mjmlContent = fs.readFileSync('index.mjml', 'utf8');
const { html, errors } = mjml2html(mjmlContent, { validationLevel: 'strict' });

if (errors.length > 0) {
  console.error('Erreurs lors de la compilation MJML :', errors);
} else {
  fs.writeFileSync('index.html', html);
  console.log('Compilation réussie : index.html généré.');
}