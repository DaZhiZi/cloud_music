// 此组件可以生成 762x214 大小的轮播图
// 要求所给图片大小为 540x200
var KaSlideImage = function(containerSelector, paths) {
    // utils
    var log = console.log
    var e = sel => document.querySelector(sel)
    var es = sel => document.querySelectorAll(sel)
    var bindEvent = (ele, eventName, callback) => ele.addEventListener(eventName, callback)
    //
    var container = e(containerSelector)
    var len = paths.length
    var intervalId
    //
    var initContainer = function() {
        container.style.width = '762px'
        container.style.height = '214px'
        container.style.position = 'relative'
        container.style.margin = '20px auto 13px'
    }

    var createImgs = function() {
        var t = '<div class="ka-imgs">'
        for (var i = 0; i < len; i++) {
            var src = paths[i]
            var active = 'ka-hide'
            if (i == len-1) {
                active = 'ka-left'
            } else if (i == 1) {
                active = 'ka-right'
            } else if (i == 0) {
                active = 'ka-active'
            }
            t += `<img src=${src} class="ka-slide-img ${active}"  data-id="${i}">`
        }
        t += '</div>'
        container.innerHTML = t
    }

    var createIndicator = function() {
        var indicators = `<div class="ka-indicator">`
        var active = ''
        for (var i = 0; i < len; i++) {
            if (i == 0) {
                active = 'active'
            } else {
                active = ''
            }
            indicators += `<div class="ka-indi ${active}"></div>`
        }
        indicators += `</div>`
        container.insertAdjacentHTML('beforeend', indicators)
    }

    var createSwitchButton = function() {
        var t = `
            <div id="id-div-previous">
                <img src="plugin/ka.slideimage/previous.png">
            </div>
            <div id="id-div-next">
                <img src="plugin/ka.slideimage/next.png">
            </div>
        `
        e('.ka-imgs').insertAdjacentHTML('beforeend', t)
    }

    var createHtml = function() {
        initContainer()
        createImgs()
        createIndicator()
        createSwitchButton()
    }

    var clearActive = function() {
        e('.ka-left') && e('.ka-left').classList.remove('ka-left')
        e('.ka-right') && e('.ka-right').classList.remove('ka-right')
        e('.ka-active') && e('.ka-active').classList.remove('ka-active')
        e('.ka-indi.active') && e('.ka-indi.active').classList.remove('active')
    }

    var hoverSwitchImg = function(indis, i) {
        var imgs = es('.ka-slide-img')
        bindEvent(indis[i], 'mouseenter', function() {
            clearActive()
            var activeId = parseInt(imgs[i].dataset.id)
            var previousId = (activeId - 1 + len) % len
            var nextId = (activeId + 1) % len
            e(`[data-id="${activeId}"]`).classList.add('ka-active')
            e(`[data-id="${previousId}"]`).classList.add('ka-left')
            e(`[data-id="${nextId}"]`).classList.add('ka-right')
            indis[i].classList.add('active')
        })
    }

    var bindHover = function() {
        var indis = es('.ka-indi')
        for (var i = 0; i < indis.length; i++) {
            // 代码更加抽象, 同时解决了只能取到最后一个 i 的问题
            hoverSwitchImg(indis, i)
        }
        //
        bindEvent(e('.ka-imgs'), 'mouseenter', function() {
            e('#id-div-previous').style.opacity = '0.5'
            e('#id-div-next').style.opacity = '0.5'
        })
        bindEvent(e('.ka-imgs'), 'mouseleave', function() {
            e('#id-div-previous').style.opacity = '0'
            e('#id-div-next').style.opacity = '0'
        })
    }

    var switchPage = function(direction) {
        var activeId
        var oldActiveId = parseInt(e('.ka-active').dataset.id)
        if (direction == 'previous') {
            activeId = (oldActiveId - 1 + len) % len
        } else if (direction == 'next') {
            activeId = (oldActiveId + 1 + len) % len
        }
        clearActive()
        var previousId = (activeId - 1 + len) % len
        var nextId = (activeId + 1) % len
        e(`[data-id="${activeId}"]`).classList.add('ka-active')
        e(`[data-id="${previousId}"]`).classList.add('ka-left')
        e(`[data-id="${nextId}"]`).classList.add('ka-right')
        es('.ka-indi')[activeId].classList.add('active')
        //
        clearInterval(intervalId)
        autoSwitch()
    }

    var bindClick = function() {
        var previous = e('#id-div-previous')
        var next = e('#id-div-next')
        bindEvent(previous, 'click', function() {
            switchPage('previous')
        })
        bindEvent(next, 'click', function() {
            switchPage('next')
        })
    }

    var autoSwitch = function() {
        intervalId = setInterval(function() {
            switchPage('next')
        }, 5000)
    }

    var bindEvents = function() {
        bindHover()
        bindClick()
        autoSwitch()
    }

    var __main = function() {
        createHtml()
        bindEvents()
    }

    __main()
}
