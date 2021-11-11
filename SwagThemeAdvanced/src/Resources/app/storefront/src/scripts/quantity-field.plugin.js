import Plugin from "src/plugin-system/plugin.class";
import DomAccess from "src/helper/dom-access.helper";

export default class QuantityFieldPlugin extends Plugin {
    init() {
        this.minus = DomAccess.querySelector(this.el, '.decrease')
        this.plus = DomAccess.querySelector(this.el, '.increase')
        this.field = DomAccess.querySelector(this.el, 'input[type="number"]')

        console.log(this.options[0])

        this.registerEvents()
    }

    registerEvents() {
        this.minus.addEventListener('click', this.decreaseQuantity.bind(this))
        this.plus.addEventListener('click', this.increaseQuantity.bind(this))
    }

    /**
     * Reduce Quantity
     */
    decreaseQuantity() {
        const step = parseInt(this.options.purchaseSteps)
        const newQuant = parseInt(this.field.value) - step

        /**
         * (re)set Quantity to Min-Value
         */
        if(newQuant <= step) {
            this.field.value = step
            return
        }


        this.field.value = newQuant
    }

    /**
     * Add items
     */
    increaseQuantity() {
        const step = parseInt(this.options.purchaseSteps)
        const newQuant = parseInt(this.field.value) - step
        const maxQuantity = parseInt(this.options.maxQuantity)
        /**
         * (re)set Quantity to Max-Value
         */
        if(newQuant >= parseInt(maxQuantity)) {
            this.field.value = maxQuantity
            return
        }
        this.field.value = parseInt(this.field.value) + parseInt(step)

    }
}
