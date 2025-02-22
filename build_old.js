const mjml2html = require('mjml');
const { registerComponent } = require('mjml-core');
const myComponent = require('./components/myComponent'); // Importez le composant

// Enregistrez le composant personnalisé
registerComponent(myComponent);

// Exemple de template MJML utilisant le composant personnalisé
const mjmlTemplate = `
<mjml>
  <mj-body>
    <mycomponent background-color="#f0f0f0" font-size="18px" padding="20px">
      Hello, World!
    </mycomponent>
  </mj-body>
</mjml>
`;

// Convertissez le MJML en HTML
const { html, errors } = mjml2html(mjmlTemplate);

if (errors) {
  console.error(errors);
} else {
  console.log(html);
}