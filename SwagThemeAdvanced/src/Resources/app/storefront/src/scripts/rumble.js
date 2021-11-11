import AddToCartPlugin from 'src/plugin/add-to-cart/add-to-cart.plugin.js';
import DomAccess from "src/helper/dom-access.helper";
import HttpClient from "src/service/http-client.service";

// https://github.com/shopware/platform/issues/567
export default class Rumble extends AddToCartPlugin {
    init() {
        this.PluginManager = window.PluginManager
        this._cartEL = DomAccess.querySelector(document, '.header-cart')
        this._client = new HttpClient(window.accessKey, window.contextToken)
        super.init()
    }

    _openOffCanvasCart(instance, requestUrl, formData) {
        this._client.post(requestUrl, formData, this._afterAddItemToCart.bind(this))
    }

    _afterAddItemToCart() {
        this._refreshCartValue()
        this._rumbleButton()
    }

_refreshCartValue() {
    const cartWidgetEL = DomAccess.querySelector(this._cartEL, '[data-cart-widget="true"]')
        /**
         * @tutorial
         * important: getPluginInstanceFromElement (Instance not Instances ;) )
         */
        const cartWidgetInstance = this.PluginManager.getPluginInstanceFromElement(cartWidgetEL, 'CartWidget')
        cartWidgetInstance.fetch()
    }

    _rumbleButton() {
        this._cartEL.classList.add('rumble')
        window.setTimeout(() => {
            this._cartEL.classList.remove('rumble')
        }, 3000)
    }

}
