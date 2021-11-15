import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from "src/helper/dom-access.helper";

export default class StickyHeader extends Plugin {


    static options = {
        cloneElClass: 'js-header-main-sticky',
        showOnScrollPosition: 1000
    }

    init() {

        this.PluginManager = window.PluginManager

        let mainNav = document.getElementById('mainNavigation')

        console.info(this.PluginManager.getPluginInstancesFromElement(mainNav))
        //super.init()
        this.createElement()
        this.addEventListeners()
        this.reinitializePlugin()
    }

    createElement()  {
        // duplicate Navbar
        this._navClone = this.el.cloneNode(true)
        //console.info(this._navClone)
        // add a css class for stick-header style
        this._navClone.classList.add(this.options.cloneElClass)
        // cause IDs have to be unique ermove it here
        //this._navClone.removeAttribute('id')
        DomAccess.querySelector(this._navClone, '.main-navigation').removeAttribute('id')
        // append navbar clone to the body
        document.body.appendChild(this._navClone)
    }

    addEventListeners() {
        document.removeEventListener('scroll', this.onScroll.bind(this))
        document.addEventListener('scroll', this.onScroll.bind(this))
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
