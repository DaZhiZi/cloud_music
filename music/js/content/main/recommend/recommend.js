const Recommend = {}
const getWeekAndDate = () => {
    let weeks = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
    ]
    let d = new Date()
    let week = weeks[d.getDay()]
    let date = d.getDate()
    log('d', d, 'week', week, 'date', date)
    return [week, date]
}

Recommend.showDate = () => {
    let [week, date] = getWeekAndDate()
    mySetHtml(e('.recommend-cell > .week'), week)
    mySetHtml(e('.recommend-cell > .date'), date)
}

Main.recommend = () => {
    Recommend.showDate()
}