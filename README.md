# shopware6ThemePlugin

## Basic Knowledge
- create theme (theme = plugin)
- extend and override templates (twig)
- twig block system (Twig PHP Template Engine from Symfony) 
    - [twig.symfony.com | for Template Designer](https://twig.symfony.com/doc/3.x/templates.html) 
- SASS (SCSS -> CSS) (Syntactically Awesome Stylesheets is a CSS Preprozessor)
- Shopware 6 PluginManager (JS) 
    - extend and override JS Plugins
    - [developer.shopware.com/docs | add JS](https://developer.shopware.com/docs/guides/plugins/plugins/storefront/add-custom-javascript#registering-your-plugin)
- Responsive JS 
- Bootstrap 4 (CSS, JS) (UI Library with CSS and JS based on jquery slim)
    - [getbootstrap.com | 4.6](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
- ES 6
    - [developer.mozilla.org | Classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)
- jquery (slim)
- Webpack (modul bundler, also transform, preprocess CSS/SASS/SCSS etc., bundle JS, CSS, minify CSS and HTML and much more)
    - [web.org](https://webpack.js.org/)


## Shopware 6 Certified Template Designer
- Creating their own custom Shopware themes
- The inheritance and block system
- Using Twig and SASS in Shopware
- Handling CSS and HTML

## Shopware 6 Certified Advanced Template Designer
- Working with JavaScript in Shopware 6 storefront
- Using JavaScript Plugin Base and Plugin Manager
- Debugging JavaScript plugins
- Extending and overwriting of existing JavaScript plugins
- Responsive JavaScript, executing Code for different viewports

## Code based on this Training Videos 
- [Shopware 6 Academy EN: | Creating and activating a Theme](https://academy.shopware.com/courses/take/shopware-6-template-training-english/lessons/9181640-creating-and-activating-a-theme)
- [Shopware 6 Academy EN: JS Project javascript plugin quantity field](https://academy.shopware.com/courses/take/shopware-6-advanced-template-training-english/lessons/9747216-javascript-plugin-quantity-field)
## Shopware 6 Plugin Theme Training

- [Customize a Template](https://developer.shopware.com/docs/guides/plugins/plugins/storefront/customize-templates)
- [Shopware 6 Docs | Override existing JS](https://developer.shopware.com/docs/guides/plugins/plugins/storefront/override-existing-javascript)

## Important commands Training Video

on your local maschine (php, node, npm required)
```bash
./psh.phar                      // press Enter and you get a list of commands
./psh.phar docker:start
./psh.phar docker:ssh           // to connect with Docker VM
```

on virtual Maschine (Docker)
```bash
./psh.phar
./psh.phar storefront:dev
./psh.phar storefront:hot-proxy
```

```bash
./bin/console                           // press Enter and you get a list of commands
./bin/console cache:clear
```
# theme create, install, activate

```bash
./bin/console theme:create MyTheme      // Replace MyTheme with your custom ThemeName
// OR use the wizard
./bin/console theme:create              // press enter and follow instruction
./bin/console plugin:refresh
./bin/console plugin:list
./bin/console plugin:install MyTheme
./bin/console plugin:activate MyTheme
./bin/console theme:change              // just follow wizard
```

# Basic JS

## register JS

```js[main.js]
import StickyHeader from "./scripts/my-custom-script";

window.PluginManager.register('MyCustomScript', MyCustomScript, '[data-my-script]')
```
## override an existing JS Plugin

```js[main.js]
import MyCustomScript from "./scripts/my-custom-script";

window.PluginManager.override('AddToCart', MyCustomScript, '[data-add-to-cart]')
```

```js
import Plugin from 'src/plugin-system/plugin.class';

export default class MyCustomScript extends Plugin {
    init() {
        this.PluginManager = window.PluginManager

        super.init()

    }

}
```

# theme.json

- [developer.shopware.com | theme.json config](https://developer.shopware.com/docs/guides/plugins/themes/theme-configuration#structure-of-theme-configuration)


Important: plugin and SCSS order is important, so which is loaded first!

```json
{
  "name": "SwagThemeAdvanced",
  "author": "Shopware AG",
  "version": 1,
  "views": [
     "@Storefront",
     "@Plugins",
     "@SwagThemeAdvanced"
  ],
  "style": [
    "app/storefront/src/scss/overrides.scss",
    "@Storefront",
    "app/storefront/src/scss/base.scss"
  ],
  "script": [
    "@Storefront",
    "app/storefront/dist/storefront/js/swag-theme-advanced.js"
  ],
  "asset": [
    "@Storefront",
    "app/storefront/src/assets"
    ],
    "config": {
        "blocks": {
            "jsPlugins": {
                "label": {
                    "en-GB": "JS Plugin",
                    "de-DE": "JS Plugin"
                }
            },
            "settings": {
                "label": {
                    "en-GB": "Color Settings",
                    "de-DE": "Farb-Einstellungen"
                }
            }
        },
        "sections": {
            "overriddenVariables": {
                "label": {
                    "en-GB": "overridden Variables",
                    "de-DE": "überschriebende Variablen"
                }
            },
            "newVariables": {
                "label": {
                    "en-GB": "new Variables",
                    "de-DE": "Custom Variablen"
                }
            }
        },
        "fields": {
            "showOnScrollPosition": {
                "label": {
                    "en-GB": "Sticky Header Show Position",
                    "de-DE": "Sticky Header Show Position"
                },
                "type": "int",
                "block": "jsPlugins",
                "editable": true,
                "value": 500
            },
            "activateStickyHeader": {
                "label": {
                    "en-GB": "Activate Sticky Header",
                    "de-DE": "Stick Header aktivieren"
                },
                "type": "switch",
                "custom": {
                    "bordered": true
                },
                "value": false,
                "editable": true,
                "block": "jsPlugins"
            },
            "sw-color-brand-primary": {
                "label": {
                    "en-GB": "Primary Color",
                    "de-DE": "Hauptfarbe"
                },
                "type": "color",
                "block": "settings",
                "section": "overriddenVariables",
                "value": "#48AB18"
            },
            "cardColor":{
                "label": {
                    "en-GB": "Card Color",
                    "de-DE": "Kartenfarbe"
                },
                "type": "color",
                "block": "settings",
                "section": "newVariables",
                "value": "#EF83",
                "editable": true
            }
        }
    }
}

```

# Twig

## theme_config()

```twig
{% extends '@Storefront/storefront/layout/navigation/navigation.html.twig' %}

{% block layout_main_navigation %}
    {% if theme_config('activateStickyHeader') %}
        {#
            Does NOT work anymore:
            shopware.theme.showOnScrollPosition

            https://academy.shopware.com/courses/take/shopware-6-advanced-template-training-english/lessons/9747217-plugin-sticky-header
            46:12
        #}
        <div class="js-navigation-wrapper test"
             data-sticky-header="true"
             data-sticky-header-options='{
                "showOnScrollPosition": "{{ theme_config('showOnScrollPosition') }}"
             }'>
            {{ parent() }}
        </div>
    {%  else %}
        {{ parent() }}
    {%  endif %}
{% endblock %}
```


## dump, parent

```twig
{{ dump() }}
{% block layout_main_navigation %}
    {{ parent() }}
{% endblock %}
```

## Icon and Link Path

```twig
{% sw_extends '@Storefront/storefront/layout/header/header.html.twig' %}

{% block layout_header_actions_account %}
    <a href="{{ path('frontend.account.payment.page') }}" class="btn header-action-btn">
        {%  sw_icon 'money-card' %}
    </a>
{% endblock %}
```

## Snippts (Translations) with name

```twig
{{ "myTheme.mySnippetName" | trans( {"%name%": product.name} ) }}
```

- en-GB.json
- de-DE.json

```json
{
    "myTheme": {
        "mySnippetName" : "Show Details",
        "mySnippetName2" : "Show Details 2"
    }
}
```

## Java Script
### Writing a JavaScript plugin
- create example-plugin.plugin.js at *plugin-root/src/Resources/app/storefront/src/example-plugin*

example-plugin.plugin.js

- ExamplePlugin extends the Plugin Class from Shopware 6
- init() method. This method will be called when your plugin gets initialized and is the entrypoint to your custom logic.

```javascript
import Plugin from 'src/plugin-system/plugin.class';

export default class ExamplePlugin extends Plugin {
    init() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    onScroll() {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            alert('Seems like there\'s nothing more to see here.');
        }
    }
}
```
### Registering your plugin


```javascript
// Import all necessary Storefront plugins
import ExamplePlugin from './example-plugin/example-plugin.plugin';
// Register your plugin via the existing PluginManager
const PluginManager = window.PluginManager;
PluginManager.register('ExamplePlugin', ExamplePlugin);
```

```javascript
import { COOKIE_CONFIGURATION_UPDATE } from 'src/plugin/cookie/cookie-configuration.plugin';
document.$emitter.subscribe(COOKIE_CONFIGURATION_UPDATE, eventCallback);
function eventCallback(updatedCookies) {
    if (typeof updatedCookies.detail['cookie-key-1'] !== 'undefined') {
        // The cookie with the cookie attribute "cookie-key-1" either is set active or from active to inactive
        let cookieActive = updatedCookies.detail['cookie-key-1'];
    } else {
        // The cookie with the cookie attribute "cookie-key-1" was not updated
    }
}
```

Let's have a look at the code. There's one thing you have to understand first. When a plugin calls this.$emitter.publish, this event is fired on the plugin's own $emitter instance. This means: Every plugin has its own instance of the emitter. Therefore, you cannot just use this.$emitter.subscribe to listen to other plugin's events.

```javascript
import Plugin from 'src/plugin-system/plugin.class';
export default class EventsPlugin extends Plugin {
    init() {
        const plugin = window.PluginManager.getPluginInstanceFromElement(document.querySelector('[data-cookie-permission]'), 'CookiePermission');
        plugin.$emitter.subscribe('hideCookieBar', this.onHideCookieBar);
    }
    onHideCookieBar() {
        alert("The cookie bar has been hidden!");
    }
}
```

## basic structue 

```javascript
import Plugin from 'src/plugin-system/plugin.class';

export default class ExamplePlugin extends Plugin {
}
```

## bin on Scroll

```javascript
import Plugin from 'src/plugin-system/plugin.class';
export default class ExamplePlugin extends Plugin {
    init() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }
    onScroll() {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            alert('Seems like there\'s nothing more to see here.');
        }
    }
}
```
## init(), super.init(), super._XYMethode

```javascript
import CookiePermissionPlugin from 'src/plugin/cookie/cookie-permission.plugin';
import CookieStorage from 'src/helper/storage/cookie-storage.helper';
export default class MyCookiePermission extends CookiePermissionPlugin {
    init() {
        CookieStorage.setItem(this.options.cookieName, '');
        super.init();
    }
    _hideCookieBar() {
        if (confirm('Do you want to hide the cookie bar?')) {
            super._hideCookieBar();
        }
    }
}
```

## Replacing Options
https://developer.shopware.com/docs/guides/plugins/plugins/storefront/add-custom-javascript#modify-existing-options

```twig
{% set productSliderOptions = {
    productboxMinWidth: sliderConfig.elMinWidth.value ? sliderConfig.elMinWidth.value : '',
    slider: {
        gutter: 30,
        autoplayButtonOutput: false,
        nav: false,
        mouseDrag: false,
        controls: sliderConfig.navigation.value ? true : false,
        autoplay: sliderConfig.rotate.value ? true : false
    }
} %}
<div data-gb-custom-block data-tag="block">
    <div class="base-slider"
         data-product-slider="true"
         data-product-slider-options="{{ productSliderOptions|default({})|json_encode|escape('html_attr') }}">
    </div>
</div>

``` 

## finding events
Finding events
So before you can start reacting and listening to events, you need to find them first. Since not every plugin implements events, they can be hard to find by just looking through the code.
Instead, rather search for this.$emitter.publish in the directory platform/src/Storefront/Resources/app/storefront/src to find all occurrences of events being published. This way, you may or may not find an event useful for your needs, so you don't have to override other JavaScript plugins.


## Registering to events
https://developer.shopware.com/docs/guides/plugins/plugins/storefront/reacting-to-javascript-events#registering-to-events
```javascript
import Plugin from 'src/plugin-system/plugin.class';

export default class EventsPlugin extends Plugin {
    init() {
        const plugin = window.PluginManager.getPluginInstanceFromElement(document.querySelector('[data-cookie-permission]'), 'CookiePermission');
        
        plugin.$emitter.subscribe('hideCookieBar', this.onHideCookieBar);
    }

    onHideCookieBar() {
        alert("The cookie bar has been hidden!");
    }
}
```