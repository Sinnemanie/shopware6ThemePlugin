import Rumble from './scripts/rumble';
import MyCookiePermission from './scripts/my-cookie-permission.plugin';
import QuantityField from './scripts/quantity-field.plugin';
import ThemeAddToCartPlugin from "./scripts/theme-add-to-cart";
import ThemeCartWidgetPlugin from "./scripts/theme-cart-widget";


window.PluginManager.override('AddToCart', ThemeAddToCartPlugin, '[data-add-to-cart]');
window.PluginManager.override('CartWidget', ThemeCartWidgetPlugin, '[data-cart-widget]');
window.PluginManager.override('AddToCart', Rumble, '[data-add-to-cart]')
window.PluginManager.override('CookiePermission', MyCookiePermission, '[data-cookie-permission]');

// https://academy.shopware.com/courses/take/shopware-6-advanced-template-training-english/lessons/9747216-javascript-plugin-quantity-field
window.PluginManager.register('QuantityField', QuantityField, '[data-quantity-field]');

// Necessary for the webpack hot module reloading server
/*
if (module.hot) {
    module.hot.accept();
}
*/