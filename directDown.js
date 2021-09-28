const getDownLink = require('./pupout');
const http = require('http');
const fs = require('fs');
path = require('path');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

let startTime = '00:00:00';
let dura = 120;
let out = null;
var filename = '';
const port = 3000;
const host = 'localhost';


const server = http.createServer(async function (req, res) {
    const url = req.url;
    filename = url.substring(33);
  
    console.log (url.substring(1),`\nVideo: `,filename);

    out = await getDownLink(url.substring(1));
    out?console.log("Out : ",out,"\nGoing to start the conversion"):console.log("Sorry \
    we were unable find your need");
    console.log("ready......")

    res.writeHead(200, {
        "Content-Disposition": "attachment;filename="+filename,
        'Content-Type': 'video/mp4'
    });

    out?ffmpeg(out)
        .setStartTime(startTime)
        .setDuration(dura)
        .pipe(res,{ end:true })
        .on('start', function(commandLine){
            console.log('Spawned FFmpeg with command: ' + commandLine);
        })
        .on('progress', function(progress){
            console.log('Processing: ' + progress.frames + 'frames done')
        })
        .on('end', function (err) {
            var ts = Date();
            if (!err) { console.log(ts, 'Conversion Completed, File ready'); return; }
        })
        .on('error', function (err) {
            console.log('error: ', err);
        }):0;

  });
  
  server.listen(process.env.PORT || 3000, () => {
    if(process.env.PORT)
    console.log("service available on port ",  process.env.PORT)
  })
  .on('error',function(er){
    console.log('Error: ',er)
  });  