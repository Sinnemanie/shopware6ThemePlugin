import CartWidgetPlugin from 'src/plugin/header/cart-widget.plugin';

export default class ThemeCartWidgetPlugin extends CartWidgetPlugin {
    init() {
        this.afterFetch = this.afterFetch.bind(this);

        if (this.$emitter) {
            this.$emitter.subscribe('fetch', this.afterFetch);
        }

        super.init();
        console.log('super init 2')
    }

    afterFetch(event) {
        if (!event || !event.detail || !event.detail.response) {
            return;
        }

        [...document.querySelectorAll('[data-cart-widget="true"]')].forEach((element) => {
            element.innerHTML = event.detail.response;
        console.log('afterFetch foreach')
        });
        console.log('afterFetch')
    }

    fetch() {
        if (this.el.getAttribute('data-cart-widget') !== 'load') {
            return;

            console.log('No Load.')
        }

        super.fetch();
            console.log('Load. after fetch()')
    }
}
