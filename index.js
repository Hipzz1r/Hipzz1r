const mediaRouter = require('./mediaRouter.js')
const express = require('express')
const app = express()

const PORT = 3000
app.use('/media',mediaRouter)
app.get('/upload',function(req, res){
    const body = `
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>
      <form action="/media" enctype="multipart/form-data" method="post">
          <input type="file" name="file1" multiple="multiple">
          <input type="submit" value="Upload file" />
      </form>
  </body>
</html>
`
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(body);
	res.end();
})

app.listen(PORT, function(){
	console.log(`running media server on ${PORT}`)
})
