var http = require('http')
var https = require('https')
var formidable = require('formidable')
var fs = require('fs')
var path = require('path')
var url = require('url')

const execSync = require('child_process').execSync

var variables = require('./vars.js')
let newpath = ''
let modelSize = 'medium.en'
const { exec } = require('node:child_process')
const validModels = [
  'medium.en',
  'tiny',
  'tiny.en',
  'base',
  'base.en',
  'small',
  'small.en',
  'medium',
  'medium.en',
  'large-v1',
  'large-v2'
]

var options = {
  key: fs.readFileSync(variables.key),
  cert: fs.readFileSync(variables.cert)
}

https
  .createServer(options, function (req, res) {
    let pathname = url.parse(req.url).pathname
    if (req.method === 'GET' && pathname === '/favicon.ico') {
      res.setHeader('Content-Type', 'image/x-icon')
      fs.createReadStream('./favicon.ico').pipe(res)
      return
    }
    if (req.method === 'GET' && pathname === '/logo.png') {
      res.setHeader('Content-Type', 'image/png')
      fs.createReadStream('./logo.png').pipe(res)
      return
    }
    if (req.method === 'GET' && pathname === '/style.css') {
      res.setHeader('Content-Type', 'text/css')
      fs.createReadStream('./style.css').pipe(res)
      return
    }
    if (req.method === 'GET' && pathname === '/script.js') {
      res.setHeader('Content-Type', 'application/javascript')
      fs.createReadStream('./script.js').pipe(res)
      return
    }
    fs.readFile('./index.html', function (err, html) {
      if (err) throw err
      if (req.url == '/fileupload') {
        res.write(html)
        res.write(`<div class="loading results"></div>`)
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, files) {
          console.log('Fields ' + fields.modeltouse)
          console.log('File ' + files.filetoupload)
          var oldpath = files.filetoupload.filepath
          newpath = './uploads/' + files.filetoupload.originalFilename
          modelSize = validModels.includes(fields.modeltouse)
            ? fields.modeltouse
            : 'medium.en'
          console.log('modelSize::' + modelSize)
          fs.rename(oldpath, newpath, function (err) {
            if (err) {
              console.log('No file selected!')
              res.write(`<div class="results">No file selected</div>`)
            } else {
              console.log(newpath)
              if (fields.timestamps) {
                var output = execSync(
                  `./whisper.sh "${newpath}" ${modelSize} true`,
                  { encoding: 'utf-8' }
                )
              } else {
                var output = execSync(
                  `./whisper.sh "${newpath}" ${modelSize} false`,
                  { encoding: 'utf-8' }
                )
              }

              res.write(
                `<script>document.querySelector('.loading').classList.add('hidden')</script>`
              )
              res.write(
                `<div class="results"><h2>Results:</h2> <p>${output}</p></div>`
              )
              res.end()
            }
          })
        })
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(html)
        return res.end()
      }
    })
  })
  .listen(443)
