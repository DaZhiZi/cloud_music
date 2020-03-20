// 此组件可以生成 762x214 大小的轮播图
// 要求所给图片大小为 540x200
/*
## about insertHtml insertCss

- 找到相应的 container
- 初始化 container : 设置相应的 css (width, height ...)

- 得到所有图片的 url

- 解决一个图片的模版  templateHtml
- 数量：图片的个数
- 插入到 container 中

- 解决一个小圆圈的模版  templateHtml
- 数量： 图片的个数
- 插入到 container 中

- 解决一个按钮的模版  templateHtml
- 数量： 两个btn
- 插入到 container 中

## events

- event
    - hover
        - mouseenter
            - css
                - opacity
            - new_index
            - showAll(new_index)
                - 小圆圈
                - 相应图片

        - mouseleave
            - css
                - opacity

    - click btn
        - offset
            - new_index
            - showAll(new_index)
                - 小圆圈
                - 相应图片
 */
class SlideImage {
    constructor(container, imgs) {
        this.setup(container, imgs)
    }
    setup(container, imgs) {
        this.container = container
        this.imgs = imgs
        this.num = imgs.length
        this.init()
        this.bindEvents()
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    init() {
        this.initCss()
        this.initHtml()
    }
    initImgs() {
        let len = this.num
        let t = '<div class="ka-imgs">'
        for (let i = 0; i < this.num; i++) {
            let src = this.imgs[i]
            let active = 'ka-hide'
            if (i == len-1) { // left
                active = 'ka-left'
            } else if (i == 1) {
                active = 'ka-right'
            } else if (i == 0) {
                active = 'ka-active'
            }
            t += `<img src=${src} class="ka-slide-img ${active}"  data-id="${i}">`
        }
        t += '</div>'
        this.container.innerHTML = t
    }
    initIndicator() {
        let indicators = `<div class="ka-indicator">`
        let active = ''
        for (let i = 0; i < this.num; i++) {
            if (i == 0) {
                active = 'active'
            } else {
                active = ''
            }
            indicators += `<div class="ka-indi ${active}"></div>`
        }
        indicators += `</div>`
        appendHtml(this.container, indicators)
    }
    initButtons() {
        let t = `
            <div id="id-div-previous" data-offset="-1">
                <img src="slideImg/previous.png">
            </div>
            <div id="id-div-next" data-offset="+1">
                <img src="slideImg/next.png">
            </div>
        `
        let img = e('.ka-imgs')
        appendHtml(img, t)
    }
    initHtml() {
        this.initImgs()
        this.initIndicator()
        this.initButtons()
    }
    mySetCssContainer(cssObj) {
        let self = this
        let o = cssObj
        for (let k in cssObj) {
            let v = cssObj[k]
            mySetCss(self.container, k, v)
        }
     }
    initCssContainer() {
        let o = {
            'width': '762px',
            'height': '214px',
            'position': 'relative',
            'margin': '20px auto 13px',
        }
        this.mySetCssContainer(o)
    }
    initCss() {
        this.initCssContainer()
    }
    clearActive() {
        e('.ka-left') && e('.ka-left').classList.remove('ka-left')
        e('.ka-right') && e('.ka-right').classList.remove('ka-right')
        e('.ka-active') && e('.ka-active').classList.remove('ka-active')
        e('.ka-indi.active') && e('.ka-indi.active').classList.remove('active')
    }
    hoverSwitchImg(indis, i) {
        let self = this
        let len = this.nums
        let imgs = es('.ka-slide-img')
        bindEvent(indis[i], 'mouseenter', function() {
            self.clearActive()
            let activeId = parseInt(imgs[i].dataset.id)
            let previousId = (activeId - 1 + len) % len
            let nextId = (activeId + 1) % len
            e(`[data-id="${activeId}"]`).classList.add('ka-active')
            e(`[data-id="${previousId}"]`).classList.add('ka-left')
            e(`[data-id="${nextId}"]`).classList.add('ka-right')
            indis[i].classList.add('active')
        })
    }
    bindIndicHover() {
        let indis = es('.ka-indi')
        for (let i = 0; i < indis.length; i++) {
            // 代码更加抽象, 同时解决了只能取到最后一个 i 的问题
            this.hoverSwitchImg(indis, i)
        }
        bindEvent(e('.ka-imgs'), 'mouseenter', function() {
            e('#id-div-previous').style.opacity = '0.5'
            e('#id-div-next').style.opacity = '0.5'
        })
        bindEvent(e('.ka-imgs'), 'mouseleave', function() {
            e('#id-div-previous').style.opacity = '0'
            e('#id-div-next').style.opacity = '0'
        })
    }
    bindHover() {
        this.bindIndicHover()
    }
    switchPage(direction) {
        let activeId
        let len = this.num
        let oldActiveId = parseInt(e('.ka-active').dataset.id)
        if (direction == 'previous') {
            activeId = (oldActiveId - 1 + len) % len
        } else if (direction == 'next') {
            activeId = (oldActiveId + 1 + len) % len
        }
        this.clearActive()
        let previousId = (activeId - 1 + len) % len
        let nextId = (activeId + 1) % len
        log('nextId', nextId)
        if (nextId >= len) {
            nextId = len -1
        }
        e(`[data-id="${activeId}"]`).classList.add('ka-active')
        // let pre = e(`[data-id="${previousId}"]`)
        // log('pre', pre)
        e(`[data-id="${previousId}"]`).classList.add('ka-left')
        e(`[data-id="${nextId}"]`).classList.add('ka-right')
        es('.ka-indi')[activeId].classList.add('active')
        // clear interval
        clearInterval(this.intervalId)
        this.autoSwitch()
    }
    autoSwitch() {
        let self = this
        self.intervalId = setInterval(function() {
            self.switchPage('next')
        }, 5000)
    }
    bindImgClick() {
        let self = this
        let previous = e('#id-div-previous')
        let next = e('#id-div-next')
        bindEvent(previous, 'click', function() {
            self.switchPage('previous')
        })
        bindEvent(next, 'click', function() {
            self.switchPage('next')
        })
    }
    bindClick() {
        this.bindImgClick()
    }
    bindEvents() {
        this.bindHover()
        this.bindClick()
        this.autoSwitch()
    }
}
