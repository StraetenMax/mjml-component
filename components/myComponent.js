const { BodyComponent } = require('mjml-core');

class myComponent extends BodyComponent {
  static allowedAttributes = {
    'background-color': 'color',
    'font-size': 'unit(px)',
    padding: 'unit(px)'
  };

  static defaultAttributes = {
    'background-color': '#ffffff',
    'font-size': '16px',
    padding: '10px'
  };

  static allowedParentTags = ['mj-body', 'mj-section', 'mj-column'];

  render() {
    return `
      <div style="background-color: ${this.getAttribute('background-color')}; font-size: ${this.getAttribute('font-size')}; padding: ${this.getAttribute('padding')};">
        ${this.getContent()}
      </div>
    `;
  }
}

module.exports = myComponent;