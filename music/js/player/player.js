// 返回 start 到 end 之间的整数, 是双闭区间
const randomBetween = function (start, end, index) {
    let n = Math.random() * (end - start + 1)
    let new_index = Math.floor(n + start)
    if (new_index != index) {
        return new_index
    } else {
        randomBetween(start, end, index)
    }
}

class Player {
    constructor(songs) {
        this.setup(songs)
        this.init()
    }
    setup(songs) {
        this.player = e('#id-audio-player')
        this.songs = songs
        this.currentIndex = 0
        this.mode = 'list'
        this.playing = false
        this.song = this.findSong(this.currentIndex)
        this.src = this.song.src
        this.title = this.song.title
        this.singer = this.song.singer
    }
    static new(songs) {
        return new this(songs)
    }
    findSong(id) {
        for (let s of this.songs) {
            if (s.id == id) {
                return s
            }
        }
    }
    initHtml() {
        let self = this
        // title
        mySetHtml(e('.expand-detail > .title'), self.title)
        mySetHtml(e('.detail > .title'), self.title)
        // singer
        mySetHtml(e('.expand-detail > .singer'), self.title)
        let s = `歌手: ${self.singer}`
        mySetHtml(e('.detail > .singer'), s)
        // duration
        let duration = self.formattedDuration()
        mySetHtml(e('#id-div-duration'), duration)
    }
    initMode() {
        let self = this
        let audio = e('#id-audio-player')
        bindEvent(audio, 'ended',   () => {
            if (self.mode == 'list') {
                self.next()
            } else if (self.mode == 'single') {
                self.single()
            } else if (self.mode == 'random') {
                self.random()
            }
        })
    }
    play() {
        this.playing = true
        this.player.play()
        // 旋转
        Detail.playAnimation()
        // PlayList.updateHistory()
    }
    pause() {
        this.playing = false
        this.player.pause()
        // 暂停
        Detail.pauseAnimation()
    }
    updateSong() {
        this.song = this.findSong(this.currentIndex)
        this.src = this.song.src
        this.title = this.song.title
        this.singer = this.song.singer
        this.player.src = this.src
    }
    previous() {
        let len = this.songs.length
        this.currentIndex = (this.currentIndex - 1 + len) % len
        this.updateSong()
        if (this.playing) {
            this.play()
            // ProgressBar.lastX = 0
        }
    }
    next() {
        let len = this.songs.length
        this.currentIndex = (this.currentIndex + 1) % len
        this.updateSong()
        if (this.playing) {
            this.play()
            // ProgressBar.lastX = 0
        }
    }
    init() {
        let self = this
        self.initHtml()
        self.initMode()
    }
    // mode
    single() {
        if (this.playing) {
            this.play()
            // ProgressBar.lastX = 0
        }
    }
    random() {
        let len = this.song.length
        let new_index = randomBetween(0, len, this.currentIndex)
        this.currentIndex = new_index
        this.updateSong()
        if (this.playing) {
            this.play()
            // ProgressBar.lastX = 0
        }
    }
    formattedDuration() {
        let current = Math.floor(this.player.currentTime)
        let min = zfill(String(Math.floor(current / 60)))
        let second = zfill(String(current % 60))
        return `${min}:${second}`
    }
    updateCurrentTime(duration) {
        this.player.currentTime = duration
    }
    duration() {
        return this.player.duration
    }
    formatDuration() {
        let duration = Math.floor(this.player.duration)
        let min = zfill(String(Math.floor(duration / 60)))
        let second = zfill(String(duration % 60))
        return `${min}:${second}`
    }
    currentPercent() {
        return `${this.player.currentTime / this.player.duration * 100}%`
    }
    adjustVolume(volume) {
        this.player.volume = volume
    }
}
let songs = [
    {
        id: 0,
        src: 'sample_music/周杰伦 - .爱的飞行日记.mp3',
        title: '爱的飞行日记',
        singer: '周杰伦',
        liked: false,
    },
    {
        id: 1,
        src: 'sample_music/周杰伦 - .简单爱.mp3',
        title: '简单爱',
        singer: '周杰伦',
        liked: false,
    },
    {
        id: 2,
        src: 'sample_music/周杰伦 - .龙卷风 (Live).mp3',
        title: '龙卷风 (Live)',
        singer: '周杰伦',
        liked: false,
    },
    {
        id: 3,
        src: 'sample_music/周杰伦 - .听妈妈的话.mp3',
        title: '听妈妈的话',
        singer: '周杰伦',
        liked: false,
    },
    {
        id: 4,
        src: 'sample_music/周杰伦 - .我要夏天.mp3',
        title: '我要夏天',
        singer: '周杰伦',
        liked: false,
    },
]

Music.player = Player.new(songs)