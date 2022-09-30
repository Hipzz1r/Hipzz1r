const router = require('express').Router()
var multiparty = require('multiparty')
var fs = require('fs')
const url = require('url')
// var lame = require('lame')
// var Speaker = require('speaker')
// var player = require('play-sound')(opts = {})

router.get('/*',(req,res)=>{
    const {pathname} = url.parse(req.url, true)
    const filepath = `./resource${pathname}`
    
    const stat = fs.statSync(filepath)
    const fileSize = stat.size
    const header = {
        'Accept-Ranges': 'bytes',
        'Content-Type'  : 'audio/mpeg',
        'Content-Length': fileSize,
    }
    res.writeHead(200, header);
    
    const readStream = fs.createReadStream(filepath)
    // readStream.pipe(new lame.Decoder())
    // .on('format', function (format) {
    //   this.pipe(new Speaker(format));
    // })
    // player.play(filepath, function(err){
    //     if (err) throw err
    //   })
    readStream.pipe(res);
})
router.post('/', (req,res)=>{
    const form = new multiparty.Form()
    form.on('error', err => res.status(500).end())
    form.on('part', part => {
        // file이 아닌 경우 skip
        if(!part.filename)
            return part.resume()

        const filestream = fs.createWriteStream(`./resource/${part.filename}`)
        part.pipe(filestream)
    })
    form.on('close', ()=>res.end())
    form.parse(req)
})

module.exports = router