const ControlButton = {}

ControlButton.bindHover = () => {
    // bindMouseenter
    bindEvent(e('.control'), 'mouseenter', event => {
        let self = event.target
        let src = hoverSrc(`${myGetAttr(self, 'src')}`)
        mySetAttr(self, 'src', src)
    })
    // bindMouseleave
    bindEvent(e('.control'), 'mouseleave', event => {
        let self = event.target
        let src = leaveSrc(`${myGetAttr(self, 'src')}`)
        mySetAttr(self, 'src', src)
    })
}
const playSong = () => {
    let play = e('#id-img-play')
    let new_src = myGetAttr(play, 'src').replace('pause', 'play')
    log('new_src', new_src)
    let attrs = {
        'src': new_src,
        'data-img': 'play',
        'title': '播放',
    }
    mySetAttrAll(play, attrs)
}
const pauseSong = () => {
    let play = e('#id-img-play')
    let new_src = myGetAttr(play, 'src').replace('play', 'pause')
    log('new_src', new_src)
    let attrs = {
        'src': new_src,
        'data-img': 'pause',
        'title': '暂停',
    }
    mySetAttrAll(play, attrs )
}
ControlButton.replacePlayImg = status => {
    let s = status
    let statusAll = {
        'pause': pauseSong,
        'play': playSong,
    }
    // 这里还可以 判断合法
    statusAll[s]()
}
const playing = () => {

}
ControlButton.play = () => {
    let self = this
    let play = e('#id-img-play')
    bindEvent(play, 'click', event => {
        let target = event.target
        let status = target.dataset.img
        log('status', status)
        if (status == 'play') {
            ControlButton.replacePlayImg('pause')
            Music.player.play()
        } else {
            ControlButton.replacePlayImg('play')
            Music.player.pause()
        }
    })
}

ControlButton.previous =   () => {
    let self = this
    let previous = e('#id-img-previous')
    bindEvent(previous, 'click', event => {
        let target = event.target
        let status = target.dataset.img
        log('status', status)
        if (status == 'play') {
            ControlButton.replacePlayImg('pause')
            Music.player.play()
        }
        Music.player.previous()
    })
}

ControlButton.next =   () => {
    let self = this
    let next = e('#id-img-next')
    bindEvent(next, 'click', event => {
        let target = event.target
        let status = target.dataset.img
        log('status', status)
        if (status == 'play') {
            ControlButton.replacePlayImg('pause')
            Music.player.play()
        }
        Music.player.next()
    })
}

Footer.controlButton = function () {
    ControlButton.bindHover()
    ControlButton.play()
    ControlButton.previous()
    ControlButton.next()
}