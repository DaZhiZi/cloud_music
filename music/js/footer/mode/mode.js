class Mode {
    constructor() {
        this.setup()
        this.bindEvents()
    }
    setup() {

    }
    static instance() {
        this.i = this.i || new this()
        return this.i
    }
    bindHover() {
        // bindMouseenter
        bindEvent(e('#id-img-cycle'), 'mouseenter', event => {
            let self = event.target
            let src = hoverSrc(`${myGetAttr(self, 'src')}`)
            mySetAttr(self, 'src', src)
        })
        // bindMouseleave
        bindEvent(e('#id-img-cycle'), 'mouseleave', event => {
            let self = event.target
            let src = leaveSrc(`${myGetAttr(self, 'src')}`)
            mySetAttr(self, 'src', src)
        })
    }
    setList() {
        let cycle = e('#id-img-cycle')
        let src = myGetAttr(cycle, 'src')
        let new_src = src.replace('list_cycle', 'single_cycle')
        let o = {
            'src': new_src,
            'data-cycle': 'single',
            'title': '单曲循环',
        }
        mySetAttrAll(cycle, o)
        Music.player.mode = 'single'
    }
    setSingle() {
        let cycle = e('#id-img-cycle')
        let src = myGetAttr(cycle, 'src')
        let new_src = src.replace('single_cycle', 'random_cycle')
        let o = {
            'src': new_src,
            'data-cycle': 'random',
            'title': '随机播放',
        }
        mySetAttrAll(cycle, o)
        Music.player.mode = 'random'
    }
    setRandom() {
        let cycle = e('#id-img-cycle')
        let src = myGetAttr(cycle, 'src')
        let new_src = src.replace('random_cycle', 'list_cycle')
        let o = {
            'src': new_src,
            'data-cycle': 'list',
            'title': '列表循环',
        }
        mySetAttrAll(cycle, o)
        Music.player.mode = 'list'
    }
    bindSwitch(status) {
        let s = status
        if (s == 'list') {
            this.setList()
        } else if (s == 'single') {
            this.setSingle()
        } else if (s == 'random') {
            this.setRandom()
        }
    }
    bindClick() {
        let self = this
        bindEvent(e('#id-img-cycle'), 'click', event => {
            let mode =  event.target.dataset.cycle
            log('mode', mode)
            self.bindSwitch(mode)
        })
    }
    bindEvents() {
        this.bindHover()
        this.bindClick()
    }
}
Footer.mode = () => {
    Mode.instance()
}
