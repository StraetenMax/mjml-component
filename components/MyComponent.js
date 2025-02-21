const { BodyComponent } = require('mjml-core');
class MyComponent extends BodyComponent{
    static allowedAttributes={
        'background-color': 'color',
        'font-size': 'unit(px)',
        'padding': 'unit(px)'
    };
    static defaultAttributes = {
        'background-color' : '#ffffff',
        'font-size': '16px',
        'padding': '10px'
    };

    render() {
        return this.renderMJML(`
            <mj-section background-color="${this.getAttribute('background-color')}">
                <mj-column>
                    <mj-text font-size="${this.getAttribute('font-size')}" padding="${this.getAttribute('padding')}">
                        ${this.getContent()}
                    </mj-text>
                </mj-column>
            </mj-section>
        `);
    }
}
module.exports = MyComponent