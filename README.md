# shopware6ThemePlugin

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




