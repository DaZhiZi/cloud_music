const Sidebar = {}
/*
   - recommend           container
       - discover-music  item
       - private-fm      item
       - video           item
       - friend          item
 */
// 鼠标划过 改变图片 url
const sidebarMouseenter = () => {
    let items = es('.sidebar .cell')
    bindAll(items, 'mouseenter', event => {
        // log('mouseenter')
        let self = event.target
        // log('self', self)
        let img = find(self, 'img')
        let src = hoverSrc(`${myGetAttr(img, 'src')}`)
        // log('src', src)
        mySetAttr(img, 'src', src)
    })
}
// 鼠标离开 改变图片 url
const sidebarMouseleave = () => {
    let items = es('.sidebar .cell')
    bindAll(items, 'mouseleave', event => {
        // log('mouseleave')
        let self = event.target
        // log('self', self)
        if (hasClass(self, 'sidebar-active')) {
            return
        }
        let img = find(self, 'img')
        let src = leaveSrc(`${myGetAttr(img, 'src')}`)
        mySetAttr(img, 'src', src)
        removeClass(self, 'sidebar-active')
    })
}
// 鼠标点击 改变图片 url
const sidebarClick = () => {
    let items = es('.sidebar .cell')
    bindAll(items, 'click', event => {
        // log('click')
        let self = event.target
        // 点击图标的样式
        let imgs = es('.sidebar .cell img')
        // log('imgs', imgs)
        for (let i of imgs) {
            let src = myGetAttr(i, 'src')
            let new_src = leaveSrc(src)
            // log('new_src', new_src)
            mySetAttr(i, 'src', new_src)
        }
        // self
        let clickImg = find(self, 'img')
        // log('clickImg', clickImg)
        let src = myGetAttr(clickImg, 'src')
        // log('src', src)
        let new_src = hoverSrc(`${src}`)
        mySetAttr(clickImg, 'src', new_src)
        // 先清除 所有的样式 （all）
        removeClassAll('sidebar-active')
        // 再添加
        addClass(self, 'sidebar-active')
     })
}

const detailMouseenter = () => {
    let container = e('.expand-detail')
    bindEvent(container, 'mouseenter', event => {
        let item = e('.expand-detail > .hover-icon')
        mySetCss(item, 'display', 'inline-block')
    })
}
const detailMouseleave = () => {
    let container = e('.expand-detail')
    bindEvent(container, 'mouseleave', event => {
        let item = e('.expand-detail > .hover-icon')
        mySetCss(item, 'display', 'none')
    })
}
const detailClick = () => {
    let item = e('.expand-detail > .hover-icon')
    log('item', item)
    bindEvent(item, 'click', event => {
        log('click detail')
        // 展开详情  show
        let className = 'show'
        addClass(e('.detail'), className)
        log('detail', e('.detail'))
        addClassAll(es('.detail  div'), className)
     })
}
Sidebar.bindEvents = () => {
    sidebarMouseenter()
    sidebarMouseleave()
    sidebarClick()
    detailMouseenter()
    detailMouseleave()
    detailClick()
}

Content.sidebar = () => {
    Sidebar.bindEvents()
}
