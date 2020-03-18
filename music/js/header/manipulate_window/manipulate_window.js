const ManipulateWindow = {}

// 鼠标划过 minimize 改变 样式（图片 url）
// 点击 缩小屏幕
ManipulateWindow.minimize = () => {
    let self = this
    // 'mouseenter'
    bindEvent(e('#id-img-minimize'), 'mouseenter', event => {
        let target = event.target
        let url = 'img/theme/black/header/minimize_hover.png'
        mySetAttr(target, 'src', url)
        })
    // mouseleave
    bindEvent(e('#id-img-minimize'), 'mouseleave', event => {
        let target = event.target
        let url = 'img/theme/black/header/minimize.png'
        mySetAttr(target, 'src', url)
    })
}
// 鼠标划过 maximize 改变 样式（图片 url）
// 点击 放大屏幕
ManipulateWindow.maximize = () => {
    let self = this
    // 'mouseenter'
    bindEvent(e('#id-img-maximize'), 'mouseenter', event => {
        let target = event.target
        let url = 'img/theme/black/header/maximize_hover.png'
        mySetAttr(target, 'src', url)
    })
    // mouseleave
    bindEvent(e('#id-img-maximize'), 'mouseleave', event => {
        let target = event.target
        let url = 'img/theme/black/header/maximize.png'
        mySetAttr(target, 'src', url)
    })
}
// 标划过 close 改变 样式（图片 url）
// 点击 消失屏幕
ManipulateWindow.close = () => {
    let self = this
    // 'mouseenter'
    bindEvent(e('#id-img-close'), 'mouseenter', event => {
        let target = event.target
        let url = 'img/theme/black/header/close_hover.png'
        mySetAttr(target, 'src', url)
    })
    // mouseleave
    bindEvent(e('#id-img-close'), 'mouseleave', event => {
        let target = event.target
        let url = 'img/theme/black/header/close.png'
        mySetAttr(target, 'src', url)
    })
}
Header.manipulateWindow = () => {
    ManipulateWindow.minimize()
    ManipulateWindow.maximize()
    ManipulateWindow.close()
}
