var http = require("http")
var fs = require("fs")
var url = require("url")
var qiniu = require("qiniu")
var port = process.argv[2]

if (!port) {
    console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？")
    process.exit(1)
}

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true)
    var path = request.url
    var query = ""
    if (path.indexOf("?") >= 0) {
        query = path.substring(path.indexOf("?"))
    }
    var pathNoQuery = parsedUrl.pathname
    var queryObject = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log("HTTP 路径为\n" + path)
    if (path === "/uptoken") {
        response.statusCode = 200
        response.setHeader("Content-Type", "text/json;charset=utf-8")
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.removeHeader("Date")

        var config = fs.readFileSync("./qiniu-key.json")
        config = JSON.parse(config)

        let { accessKey, secretKey } = config
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        var options = {
            scope: "163music-2018-08-22"
        }
        var putPolicy = new qiniu.rs.PutPolicy(options)
        var uploadToken = putPolicy.uploadToken(mac)
        response.write(`
        {
        "uptoken": "${uploadToken}"
        }
        `)
        response.end()
    } else {
        response.statusCode = 404
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log("监听 " + port + " 成功\n请打开 http://localhost:" + port)
