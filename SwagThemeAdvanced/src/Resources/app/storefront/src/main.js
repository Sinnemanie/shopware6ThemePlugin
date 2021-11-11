import Rumble from './scripts/rumble';
import MyCookiePermission from './scripts/my-cookie-permission.plugin';
import QuantityFieldPlugin from './scripts/quantity-field.plugin';
import StickyHeader from "./scripts/quantity-field.plugin";

window.PluginManager.override('AddToCart', Rumble, '[data-add-to-cart]')
window.PluginManager.override('CookiePermission', MyCookiePermission, '[data-cookie-permission]')
window.PluginManager.register('StickyHeader', StickyHeader, '[data-sticky-header]')

// https://academy.shopware.com/courses/take/shopware-6-advanced-template-training-english/lessons/9747216-javascript-plugin-quantity-field
window.PluginManager.register('QuantityField', QuantityFieldPlugin, '[data-quantity-field]')

// Necessary for the webpack hot module reloading server
/*
if (module.hot) {
    module.hot.accept();
}
*/