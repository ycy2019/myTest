const http = require(("http"))
const sever = http.createServer()
const fs = require("fs")
sever.listen(3001, () => {
    console.log("http://localhost:3000/")
})

sever.on("request", (req, res) => {
    console.log(req.url)
    if(req.url=="/favicon.ico"){
        return
    }
   var data = ""
    res.setHeader("Access-Control-Allow-Origin", "*"); // 设置可访问的源
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, accept, origin, content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
    req.on("data", function (chunk) {
        console.log(chunk)
        // console.log("data")
        data += chunk
    });
    req.on("end", function () {
        console.log(data)
        write(data).then(function (val) {
            // console.log(typeof val)
            console.log(val)
            res.end(val.toString())
        }).catch(function (reason) {
            reason = reason.toString()
            // console.log(reason)
            // console.log(typeof reason)
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
