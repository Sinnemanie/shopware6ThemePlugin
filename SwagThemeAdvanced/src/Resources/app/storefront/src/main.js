// Import all necessary Storefront plugins
import Rumble from './scripts/rumble';
import MyCookiePermission from './scripts/my-cookie-permission.plugin';
import QuantityField from './scripts/quantity-field.plugin';
//import MyPlugin from './scripts/myplugin';

//import AddToCartPlugin from 'src/plugin/add-to-cart/add-to-cart.plugin.js';
//import CartWidgetPlugin from 'src/plugin/header/cart-widget.plugin';


import ThemeAddToCartPlugin from "./scripts/theme-add-to-cart";
import ThemeCartWidgetPlugin from "./scripts/theme-cart-widget";


window.PluginManager.override('AddToCart', ThemeAddToCartPlugin, '[data-add-to-cart]');
window.PluginManager.override('CartWidget', ThemeCartWidgetPlugin, '[data-cart-widget]');

console.log('test Neu7 Rumble');
window.PluginManager.override('AddToCart', Rumble, '[data-add-to-cart]')

//PluginManager.register('MyPlugin', MyPlugin, '.header-logo-main');


window.PluginManager.override('CookiePermission', MyCookiePermission, '[data-cookie-permission]');

// https://academy.shopware.com/courses/take/shopware-6-advanced-template-training-english/lessons/9747216-javascript-plugin-quantity-field
window.PluginManager.register('QuantityField', QuantityField, '[data-quantity-field]');

// Necessary for the webpack hot module reloading server
if (module.hot) {
    module.hot.accept();
}

