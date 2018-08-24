{
    let view = {
        el: '.page>main',
        template: `
<form class="form">
    <h1>歌曲信息</h1>
    <div class="row">
        <label>歌名</label>
        <input type="text" value="__key__">

    </div>
    <div class="row">
        <label>歌手</label>
        <input type="text" value="">

    </div>
    <div class="row">
        <label>外链</label>
        <input type="text" value="__link__">

    </div>
    <div class="row actions">
        <input type="submit" value="保存">
    </div>
</form>`,
        render(data = {}) {
            let placeholders = ['key', 'link']
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
        }
    }

    let model = {}

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on('upload', (data) => {
                console.log('song form模块得到了 data')
                console.log(data)
                this.view.render(data)
            })
        },
    }

    controller.init(view, model)

    // window.app.songForm = controller
}