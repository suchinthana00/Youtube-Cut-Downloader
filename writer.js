const getDownLink = require('./pupout');
const http = require('http');
const fs = require('fs');
path = require('path');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

async function writes(add,sTime,dur,name,res,ou){
    out = await getDownLink(add);
    out?console.log("Out : ",out,"\nGoing to start the conversion"):console.log("Sorry \
    we were unable find your need");
    console.log("ready......")
    out?ffmpeg(out)
        .setStartTime(sTime)
        .setDuration(dur)
        .output(name + '.mp4')
        .on('start', function(commandLine){
            console.log('Conversion started');
        })
        .on('progress', function(progress){
            console.log('Processing: ' + progress.frames + ' frames done')
        })
        .on('end', function (err) {
            var ts = Date();
            if (!err) { console.log(ts, 'Conversion Completed, File ready');ou(name,res); }
        })
        .on('error', function (err) {
            console.log('error: ', err);
        }).run():0;
}

module.exports = writes;