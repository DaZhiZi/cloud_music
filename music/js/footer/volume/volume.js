class Volume {
    constructor() {
        this.setup()
        this.drag()
    }
    setup() {
        this.lastX = 1
        this.dragging = false
        this.offsetX = 0
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    bindHover() {
        let volume = e('#id-img-volume')
        // bindMouseenter
        bindEvent(volume, 'mouseenter', event => {
            let self = event.target
            let src = hoverSrc(`${myGetAttr(self, 'src')}`)
            mySetAttr(self, 'src', src)
        })
        // bindMouseleave
        bindEvent(volume, 'mouseleave', event => {
            let self = event.target
            let src = leaveSrc(`${myGetAttr(self, 'src')}`)
            mySetAttr(self, 'src', src)
        })
        // // mouseenter
        // bindEvent(volume, 'mouseenter', event => {
        //      let self = event.target
        //      let src = myGetAttr(self, 'src')
        //      let new_src = hoverSrc(src)
        //      mySetAttr(self, 'src', new_src)
        // })
        // // mouseleave
        // bindEvent(volume, 'mouseleave', event => {
        //     let self = event.target
        //     let src = myGetAttr(self, 'src')
        //     let new_src = leaveSrc(src)
        //     mySetAttr(self, 'src', new_src)
        // })
    }
    replaceVolumeImg(status) {
        let self = this
        let s = status
        let volume = e('#id-img-volume')
        if (s == 'silence') {
            let src = myGetAttr(volume, 'src')
            let new_src = src.replace('volume1', 'volume0')
            let o = {
                'src': new_src,
                'data-silent': 'true',
                'title': '恢复音量',
            }
            mySetAttrAll(volume, o)
        } else {
            let src = myGetAttr(volume, 'src')
            let new_src = src.replace('volume0', 'volume1')
            let o = {
                'src': new_src,
                'data-silent': 'false',
                'title': '静音',
            }
            mySetAttrAll(volume, o)
        }
    }
    adjustVolume(volume) {
        let self = this
        let v = volume
        // 0 <= v <= 100
        mySetAttr(e('#id-div-current-volume'), 'left', `${v}`)
        mySetAttr(e('#id-img-volume-button'), 'left', `${v}`)
        // player
        Music.player.adjustVolume(v / 100)
        self.lastX = v / 100
        if (v == 0) {
            self.replaceVolumeImg('silence')
        } else {
            mySetAttr(e('#id-img-volume'), 'data-volume', myStr(v))
            self.replaceVolumeImg('restore')
        }
    }
    silence() {
        let self = this
        let volume = e('#id-img-volume')
        bindEvent(volume, 'click', event => {
            let silent = event.target.dataset.silent
            let old_volume = myInt(event.target.dataset.volume)
            log('silent', silent)
            if (silent == 'false') {
                self.adjustVolume(0)
            }  else if (silent == 'true') {
                self.adjustVolume(old_volume)
            }
        })
    }
    bindMousedown() {
        let self = this
        let volume= e('#id-img-volume-button')
        bindEvent(volume, 'mousedown', event => {
            // log('mousedown volume')
            self.dragging = true
            self.startX = event.pageX
            event.preventDefault()
        })
    }
    bindMousemove() {
        let self = this
        bindEvent(document, 'mousemove', event => {
            if (self.dragging) {
                // 拖动效果
                let volume = e('#id-div-volume')
                let widthTotal = Number(window.getComputedStyle(volume).width.slice(0, -2))
                self.offsetX = self.lastX * widthTotal + event.pageX - self.startX
                self.startX = event.pageX
                self.percent = self.offsetX / widthTotal * 100
                self.percent = Math.min(Math.max(0, self.percent), 100)
                //log('this.percent', this.percent)
                let progress = e('#id-img-volume-button')
                mySetCss(progress, 'left', `${self.percent}%`)
                // log('self.percnet move', self.percent)
                self.adjustVolume(self.percent)
            }
        })
    }
    bindMouseup() {
        let self = this
        bindEvent(document, 'mouseup', event => {
            if (self.dragging) {
                self.lastX = self.percent / 100
                self.dragging = false
            }
        })
    }
    drag() {
        this.bindMousedown()
        this.bindMousemove()
        this.bindMouseup()
    }
}

Footer.volume = () => {
    Volume.instance()
}
