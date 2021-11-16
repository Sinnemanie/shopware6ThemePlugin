# shopware6ThemePlugin

## Basic Knowledge
- create theme (theme = plugin)
- extend and override templates (twig)
- teig block system
- SASS (CSS)
- Shopware 6 PluginManager
- extend and override JS Plugins
- Responsive JS 
- Bootstrap 4 (CSS, JS)
- ES 6
- jquery (slim)
- Webpack


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

## Snippts (Translations)

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




