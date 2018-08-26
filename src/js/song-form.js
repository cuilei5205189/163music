{
    let view = {
        el: '.page>main',
        init() {
            this.$el = $(this.el)
        },
        template: `
<form class="form">
    <h1>歌曲信息</h1>
    <div class="row">
        <label>歌名</label>
        <input name="name" type="text" value="__name__">
    </div>
    <div class="row">
        <label>歌手</label>
        <input name="singer" type="text" value="__singer__">
    </div>
    <div class="row">
        <label>外链</label>
        <input name="url" type="text" value="__url__">
    </div>
    <div class="row actions">
        <input type="submit" value="保存">
    </div>
</form>`,
        render(data = {}) {
            let placeholders = ['name', 'url', 'singer', 'id']
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
        }
    }

    let model = {
        data: {
            name: '',
            singer: '',
            url: '',
            id: ''
        },
        create(data) {
            // 声明类型
            var Song = AV.Object.extend('Song')
            // 新建对象
            var song = new Song()
            // 设置名称
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
            // 设置优先级
            return song.save().then((newSong) => {
                console.log('this', this)
                let {
                    id,
                    attributes
                } = newSong
                console.log('there')

                console.log('data', this.data)
                Object.assign(this.data, {
                    id,
                    ...attributes
                })

            }, function (error) {
                console.error(error)
            })
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHub.on('upload', (data) => {
                console.log('song form模块得到了 data')
                console.log(data)
                this.view.render(data)
            })
        },
        bindEvents() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault()
                let needs = 'name singer url'.split(" ")
                let data = {}
                needs.map((string) => {
                    data[string] = this.view.$el.find(`[name="${string}"]`).val()
                })
                console.log(1)

                this.model.create(data)
                    .then(() => {
                        this.view.render(this.model.data)
                        console.log(this.model.data)
                        console.log(10);

                    })
                console.log(this.model.create(data))
            })
        }
    }

    controller.init(view, model)

    // window.app.songForm = controller
}