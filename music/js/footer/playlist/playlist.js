class PlayList {
    constructor() {
        this.setup()
        this.init()
        this.bindEvents()
    }
    setup() {
        this.songTitles = []
        this.history = []
    }
    static instance() {
        this.i = this.i || new this()
        return this.i
    }
    templateSong(songTitles) {
        let list = songTitles
        let t = ''
        for (let i = 0; i < list.length; i++) {
            t += `<div class="song-cell">${list[i]}</div>`
        }
        return t
    }
    init() {
        let count = Music.player.songLen()
        mySetHtml(e('#id-div-playlist-count'), count)
        mySetHtml(e('.playlist > .count'), `总${count}首`)
        let songs = Music.player.songs
        for (let s of songs) {
            let title = s.title
            this.songTitles.push(title)
        }
        let html = this.templateSong(this.songTitles)
        // appendHtml 这个不行
        mySetHtml(e('.playlist > .container'), html)
    }
    bindHover() {
        // bindMouseenter
        bindEvent(e('#id-div-playlist'), 'mouseenter', event => {
            let self = event.target
            let src = hoverSrc(`${myGetAttr(self, 'src')}`)
            mySetAttr(self, 'src', src)
        })
        // bindMouseleave
        bindEvent(e('#id-div-playlist'), 'mouseleave', event => {
            let self = event.target
            let src = leaveSrc(`${myGetAttr(self, 'src')}`)
            mySetAttr(self, 'src', src)
        })
        // let playlist = e('#id-div-playlist')
        // // mouseenter
        // bindEvent(playlist, 'mouseenter', event => {
        //     let self = event.target
        //     let src = myGetAttr(self, 'src')
        //     log('src', src)
        //     let new_src = hoverSrc(src)
        //     log('new_src', new_src)
        //     mySetAttr(self, 'src', new_src)
        // })
        // // mouseleave
        // bindEvent(playlist, 'mouseleave', event => {
        //     let self = event.target
        //     let src = myGetAttr(self, 'src')
        //     log('src leave', src)
        //     let new_src = leaveSrc(src)
        //     log('new_src leaveSrc', new_src)
        //     mySetAttr(self, 'src', new_src)
        // })
    }
    bindList() {
        let clsName = 'show'
        let play = e('#id-div-playlist')
        toggleClass(play, clsName)
        let close = e('#id-img-close-list')
        toggleClass(close, clsName)
    }
    showList() {
        let list = e('.playlist > .title > .tabs > .list')
        addClass(list, 'active')
        let history = e('.playlist > .title > .tabs > .history')
        removeClass(history, 'active')
        mySetCss(e('.playlist > .container'), 'display', 'block')
        mySetCss(e('.playlist > .history'), 'display', 'none')
        let count = Music.player.songlen()
        mySetHtml(e('.playlist > .count'), `总${count}首`)
    }
    hideList() {
        let list = e('.playlist > .title > .tabs > .list')
        removeClass(list, 'active')
        let history = e('.playlist > .title > .tabs > .history')
        addClass(history, 'active')
        mySetCss(e('.playlist > .container'), 'display', 'none')
        mySetCss(e('.playlist > .history'), 'display', 'block')
        let count = Music.player.songlen()
        mySetHtml(e('.playlist > .count'), `总${count}首`)
    }
    bindSwitchTab() {
        let self = this
        let tab = e('.content > .playlist > .title > .tabs')
        bindEvent(tab, 'click', event => {
            let target = event.target
            if (target.classList.contains('list')) {
                this.showList()
            } else {
                this.hideList()
            }
        })
    }
    bindDblclick() {
        let self = this
        let container = e('.playlist .container')
        bindEvent(container, 'dblclick', event => {
            let songTitle = event.target.innerHTML
            Music.player.currentIndex = self.songTitles.indexOf(songTitle)
            Music.player.player.src = Music.player.src()
            Music.player.play()
            let img = e('#id-img-play').dataset.img
            if (img == 'play') {
                ControlButton.replacePlayImg('pause')
            }
            ProgressBar.lastX = 0
        })
    }
    // update history music
    updateHistory() {
        let self = this
        let title = Music.player.title
        if (self.history.includes(title)) {
            let index = self.history.indexOf(title)
            // 最近播放的在最上面
            let latest = self.history[index]
            self.history[index] = self.history[0]
            self.history[0] = latest
        } else {
            self.history.splice(0, 0, title)
        }
        var t = this.templateSong(this.history)
        // appendHtml 这个不行
        mySetHtml(e('.playlist > .history'), html)
    }
    bindEvents() {
        this.bindHover()
        this.bindList()
        this.bindSwitchTab()
        this.bindDblclick()
    }
}


Footer.playList =  () => {
     PlayList.instance()
}