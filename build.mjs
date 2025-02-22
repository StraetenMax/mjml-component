import fs from 'fs';
import mjml2html from 'mjml';
import { registerComponent } from 'mjml-core';
import MjMonComposant from './MjMonComposant.mjs';

// Enregistrer le composant personnalisé
registerComponent(MjMonComposant);

// Lire le fichier MJML
const index = fs.readFileSync('index.mjml', 'utf8');

// Compiler le MJML en HTML
const { html, errors } = mjml2html(index);

if (errors && errors.length > 0) {
  console.error('Erreurs lors de la compilation MJML:', errors);
}

console.log(html);