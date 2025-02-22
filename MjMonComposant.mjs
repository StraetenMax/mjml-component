import mjmlCore from 'mjml-core';
const { BodyComponent } = mjmlCore;

export default class MjMonComposant extends BodyComponent {
  // IMPORTANT : ce nom doit correspondre exactement à la balise utilisée dans index.mjml
  static componentName = 'mj-mon-composant';
  static endingTag = true;

  // On déclare que le composant doit être utilisé dans <mj-attributes>
  static dependencies = {
    "mj-attributes": ["mj-mon-composant"]
  };

  static allowedAttributes = {
    "color": "string",
    "font-size": "unit(px)"
  };

  static defaultAttributes = {
    "color": "black",
    "font-size": "16px"
  };

  // Bien préciser que seul mj-attributes est autorisé
  static allowedParentTags = ['mj-attributes'];

  render() {
    const color = this.getAttribute('color');
    const fontSize = this.getAttribute('font-size');
    return `
      <div style="color: ${color}; font-size: ${fontSize};">
        Salut, je suis un composant MJML basique !
      </div>
    `;
  }
}
