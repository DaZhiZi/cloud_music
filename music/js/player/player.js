class Player {
    constructor(songs) {
        this.setup(songs)
    }
    setup(songs) {
        this.player = e('#id-audio-player')
        this.songs = songs
        this.currentIndex = 0
        this.mode = 'list'
        this.playing = false
    }
    instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    findSong(id) {
        for (let s of this.songs) {
            if (s.id == id) {
                return s
            }
        }
    }
    songSrc() {
        let song = this.findSong(this.currentIndex)
        return song.src
    }
    init() {
        let self = this
        self.player.src = this.songSrc()

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