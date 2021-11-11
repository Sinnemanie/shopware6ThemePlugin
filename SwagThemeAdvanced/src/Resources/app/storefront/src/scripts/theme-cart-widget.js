import CartWidgetPlugin from 'src/plugin/header/cart-widget.plugin';

export default class ThemeCartWidgetPlugin extends CartWidgetPlugin {
    init() {
        this.afterFetch = this.afterFetch.bind(this);

        if (this.$emitter) {
            this.$emitter.subscribe('fetch', this.afterFetch);
        }

        super.init();
    }

    afterFetch(event) {
        if (!event || !event.detail || !event.detail.response) {
            return;
        }

        [...document.querySelectorAll('[data-cart-widget="true"]')].forEach((element) => {
            element.innerHTML = event.detail.response;
        });
    }

    fetch() {
        if (this.el.getAttribute('data-cart-widget') !== 'load') {
            return;
        }

        super.fetch();
    }
}
