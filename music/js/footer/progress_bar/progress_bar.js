class ProgressBar {
    constructor() {
        this.setup()
        this.update()
        this.drag()
    }

    static instance() {
        this.i = this.i || new this()
        return this.i
    }

    setup() {
        this.lastX = 0
        this.dragging = false
        this.offsetX = 0
    }

    update() {
        this.timer = setInterval(() => {
            let current_time = Music.player.formattedCurrentTime()
            // log('current_time', current_time)
            mySetHtml(e('#id-div-current'), current_time)
            let percent = Music.player.currentPercent()
            // log('percent', percent)
            mySetCss(e('#id-div-current-bar'), 'width', `${percent}`)
            mySetCss(e('#id-img-progress-button'), 'left', `${percent}`)
            // 设置 duration
            let duration = Music.player.formattedDuration()
            // log('update duration', duration)
            mySetHtml(e('#id-div-duration'), duration)
        }, 0)
    }

    bindMousedown() {
        let self = this
        let progress = e('#id-img-progress-button')
        bindEvent(progress, 'mousedown', event => {
            self.dragging = true
            self.startX = event.pageX
            event.preventDefault()
        })
    }

    bindMousemove() {
        let self = this
        bindEvent(document, 'mousemove', event => {
            if (self.dragging) {
                clearInterval(self.timer)
                // 拖动效果
                let progressBar = e('#id-div-progress-bar')
                let widthTotal = Number(window.getComputedStyle(progressBar).width.slice(0, -2))
                self.offsetX = self.lastX * widthTotal + event.pageX - self.startX
                self.percent = self.offsetX / widthTotal * 100
                self.percent = Math.min(Math.max(0, self.percent), 100)
                // log('this.percent', this.percent)
                let progress = e('#id-img-progress-button')
                mySetCss(progress, 'left', `${self.percent}%`)
                // 控制音乐进度
                let d = Music.player.duration()
                let duration = d * this.percent / 100
                // log('progress duration', duration)
                Music.player.updateCurrentTime(duration)
                self.update()
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

Footer.progressBar = () => {
     ProgressBar.instance()
}

