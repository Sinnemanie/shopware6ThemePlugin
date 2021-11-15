import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from "src/helper/dom-access.helper";
import ViewportDetection from "src/helper/viewport-detection.helper";

export default class StickyHeader extends Plugin {


    static options = {
        cloneElClass: 'js-header-main-sticky',
        showOnScrollPosition: 1000
    }

    init() {

        this.PluginManager = window.PluginManager

        //let mainNav = document.getElementById('mainNavigation')
        //console.info(this.PluginManager.getPluginInstancesFromElement(mainNav))

        //super.init()
        // this.createElement()
        // this.addEventListeners()
        // this.reinitializePlugin()
        this.subscribeViewportEvents()
        if (this.pluginShouldBeActive()) this.initializePlugin();
    }

    /**
     * detection if viewport has changed
     */
    subscribeViewportEvents() {
        document.$emitter.subscribe('Viewport/hasChanged', this.update, {scope: this})
    }

    /**
     * activate/deactivate Plugin if viewport has changed to mobile
     */
    update() {
        //console.log(this)
        if(this.pluginShouldBeActive()) {
            if(this.initialized) return

            this.initializePlugin()
        } else {
            if(!this.initialized) return

            this.destroy()
        }
    }

    initializePlugin() {
        this.createElement()
        this.addEventListeners()
        this.reinitializePlugin()

        console.info("INIT")

        this.initialized = true
    }

    destroy() {
        this._navClone.remove()
        this.removeEventListeners()

        console.info("DESTROY")
        this.initialized = false
    }

    pluginShouldBeActive() {
        console.info(ViewportDetection.getCurrentViewport())
        if ( ['XS', 'SM', 'MD'].includes( ViewportDetection.getCurrentViewport() ) ) {

            console.info('test')

            return false

        }

        return true
    }



    createElement()  {
        // duplicate Navbar
        this._navClone = this.el.cloneNode(true)
        //console.info(this._navClone)
        // add a css class for stick-header style
        this._navClone.classList.add(this.options.cloneElClass)
        // cause IDs have to be unique remove it here
        //this._navClone.removeAttribute('id')
        DomAccess.querySelector(this._navClone, '.main-navigation').removeAttribute('id')
        // append navbar clone to the body
        document.body.appendChild(this._navClone)
    }

    addEventListeners() {
        document.addEventListener('scroll', this.onScroll.bind(this))
    }

    removeEventListeners() {
        document.removeEventListener('scroll', this.onScroll.bind(this))
    }

    onScroll() {
        const scrollPosition = document.documentElement.scrollTop

        if(scrollPosition > this.options.showOnScrollPosition) {
            if(!this._navClone.classList.contains('is--active')) {
                this._navClone.classList.add('is--active')
            }
        } else {
            this._navClone.classList.remove('is--active')
        }
    }

    reinitializePlugin() {
        this.PluginManager.initializePlugin(
            'FlyoutMenu',
            '[data-flyout-menu="true"]',
            {}
        )
    }

}
