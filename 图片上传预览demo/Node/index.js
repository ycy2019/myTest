const http = require(("http"))
const sever = http.createServer()
const fs = require("fs")
sever.listen(3001, () => {
    console.log("http://localhost:3000/")
})

sever.on("request", (req, res) => {
    if(req.url=="/favicon.ico"){
        return
    }
   var data = []
    res.setHeader("Access-Control-Allow-Origin", "*"); // 设置可访问的源
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, accept, origin, content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
    req.on("data", function (chunk) {
        data.push(chunk)
    });
    req.on("end", function () {
        let bufferData=Buffer.concat(data)//文件较大时，buffer会分段上传，这里将所有的buffer合并
        write(bufferData).then(function (val) {
            res.end(val.toString())
        }).catch(function (reason) {
            reason = reason.toString()
            res.end(reason)
        })
    })
})

function write(_data) {
    let fun = new Promise(function (resolve, reject) {
        let writableStream = fs.createWriteStream("aa.png")//创建写入流
        writableStream.write(_data, "binary")
        writableStream.end()
        writableStream.on("finish", () => {
            console.log("写入成功")
            resolve(1)
        })
        writableStream.on("error", () => {
            reject(0)
        })
    })
    return fun
}
