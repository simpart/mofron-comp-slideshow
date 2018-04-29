/**
 * @file   mofron-comp-slideshow/index.js
 * @author simpart
 */
let mf = require('mofron');
/**
 * @class mofron.comp.SlideShow
 * @brief slide show component for mofron
 */
mf.comp.SlideShow = class extends mf.Component {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('SlideShow');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @param prm : 
     */
    initDomConts (prm) {
        try {
            super.initDomConts();
            this.slide(this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, idx) {
        try {
            if (0 !== this.child().length) {
                chd.visible(false);
            }
            super.addChild(chd, idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    slide (sld) {
        try {
            let chd = sld.child();
            let cur_sidx = (undefined === sld.slideIndex()) ? 0 : sld.slideIndex();
            let new_sidx = (undefined === chd[cur_sidx+1]) ? 0 : cur_sidx+1;
            let intval   = sld.interval();
            
            if (0 < chd.length) {
                sld.slideIndex(new_sidx);
                let eff = chd[cur_sidx].effect();
                if (0 !== eff.length) {
                    intval += eff[0].speed()*1000;
                }
            }
            
            setTimeout(sld.slide,intval, sld);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    slideIndex (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.m_sldidx;
            }
            /* setter */
            if (('number' !== typeof prm) || (undefined === this.child()[prm])) {
                throw new Error('invalid parameter');
            }
            
            if (undefined !== this.m_sldidx) {
                /* disable current component */
                
                //this.child()[this.m_sldidx].visible(false);
                let eff   = this.child()[this.m_sldidx].effect();
                let en_sp = (0 === eff.length) ? 0 : eff[0].speed()*1000
                if (0 !== eff.length) {
                    for (let eidx in eff) {
                        eff[eidx].execute(false);
                    }
                }
                
                let en_off = (0 === eff.length) ? 0 : eff[0].speed();
                setTimeout(
                    (sld, old_sidx, new_sidx) => {
                        try {
                            sld.child()[old_sidx].visible(false);
                            sld.child()[new_sidx].visible(true);
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    },
                    en_sp,
                    this,
                    this.m_sldidx,
                    prm
                );
            }
            this.m_sldidx = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    interval (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_intv) ? 10000 : this.m_intv;
            }
            /* setter */
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_intv = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    fullscreen (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.m_fullscn;
            }
            /* setter */
            if ('boolean' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_fullscn = prm;
            if (true === prm) {
                document.body.onclick = () => {
                    try {
                        if (document.body.webkitRequestFullScreen) {
                            document.body.webkitRequestFullScreen();
                        } else if (document.body.mozRequestFullScreen) {
                            document.body.mozRequestFullScreen();
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
               };
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.SlideShow;
/* end of file */
