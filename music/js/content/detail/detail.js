const Detail = {}

//折叠描述
Detail.collapseDetail = () => {
    let collapse = e('.collapse-detail')
    bindEvent(collapse, 'click', event => {
        log('click collapse 折叠')
        let clsName = 'show'
        removeClass(e('.detail'), clsName)
        deleteClassAll(es('.detail div'), clsName)
    })
}

// 播放和暂停动画由 player.js 中的 play() 和 pause() 调用
Detail.playAnimation = () => {
    let clsName = 'play'
    addClass(e('.detail > .record'), clsName)
    addClass(e('.detail > .tone-arm'), clsName)
}

Detail.pauseAnimation = () => {
    let clsName = 'play'
    removeClass(e('.detail > .record'), clsName)
    removeClass(e('.detail > .tone-arm'), clsName)
}

Content.detail = () => {
    Detail.collapseDetail()
}