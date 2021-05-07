/**
 * @file   mofron-comp-slideshow/index.js
 * @brief  slideshow component for mofron
 * @license MIT
 */

module.exports = class extends mofron.class.Component {
    
    /**
     * initialize component
     * 
     * @param (mixed) component config
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname('SlideShow');

            this.confmng().add("index", { type: "number", init: 0 });
            this.confmng().add("interval", { type: "number", init: 5000 });
            
	    if (0 < arguments.length) {
                this.config(p1);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initial slide visible
     * 
     * @type private
     */
    beforeRender () {
        try {
            super.beforeRender();
	    let chd = this.child();
	    for (let cidx in chd) {
	        if (this.index() != cidx) {
                    chd[cidx].visible(false);
		}
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * start slideshow
     * 
     * @type function
     */
    start () {
        try {
            setTimeout(
	        (slide) => {
                    slide.next();
		    slide.start();
		},
		this.interval(),
		this
            )
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * switch next slide
     * 
     * @type function
     */
    next () {
        try {
            if (this.child().length-1 <= this.index()) {
                return;
	    }
            this.index(this.index()+1);
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }
    
    /**
     * switch prev slide
     * 
     * @type function
     */
    prev () {
        try {
            if (0 === this.index()) {
                return;
	    }
	    this.index(this.index()-1);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * slide index setter/getter
     * 
     * @param (number) slide index
     * @type parameter
     */
    index (prm) {
        try {
            if (undefined !== prm) {
	        let slide = this;
	        this.child()[this.index()].visible(false,() => {
                    try {
                        slide.child()[prm].visible(true);
		    } catch (e) {
                        console.error(e.stack);
                        throw e;
		    }
		});
	    }
            return this.confmng("index",prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * slide interval
     * 
     * @param (number) interval time (ms)
     * @type parameter
     */
    interval (prm) {
        try {
	    return this.confmng("interval",prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
