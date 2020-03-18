const Navigator = {}

const navClick = () => {
    let items = es('.nav-item')
    bindAll(items, 'click', event => {
        let self = event.target
        let clsName = 'nav-active'
        // 想找到
        let active_item = find(e('.navigator'), '.nav-active')
        removeClass(active_item, clsName)
        // self  添加
        addClass(self, clsName)
    })
}

Navigator.bindEvents = () => {
    navClick()
}

Main.navigator = function() {
    Navigator.bindEvents()
}