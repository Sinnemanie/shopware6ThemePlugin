import Plugin from "src/plugin-system/plugin.class";
import DomAccess from "src/helper/dom-access.helper";

export default class QuantityField extends Plugin {
    init() {
        this.minus = DomAccess.querySelector(this.el, '.decrease')
        this.plus = DomAccess.querySelector(this.el, '.increase')
        this.field = DomAccess.querySelector(this.el, 'input[type="number"]')

        this.registerEvents()

        console.log('test quantity')
    }

    registerEvents() {
        this.minus.addEventListener('click', this.decreaseQuantity.bind(this))
        this.plus.addEventListener('click', this.increaseQuantity.bind(this))
    }

    decreaseQuantity() {
        console.log('- ..');
        this.field.value = parseInt(this.field.value) - 1
    }
    increaseQuantity() {
        console.log('+');
        this.field.value = parseInt(this.field.value) + 1

    }
}
