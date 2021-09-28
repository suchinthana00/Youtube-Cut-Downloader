http = require("http");
const writer = require('./writer');
const fs = require('fs');
path = require('path');
const difference = require('./timediff');

var filename = '';
const port = process.env.PORT || 3000;

const server = http.createServer(async function (req, res) {
  var body = [];
  req.on("data", (bodyData) => {
    body.push(bodyData);
  });
  req.on("end", () => {
    body = Buffer.concat(body).toString();
    let reqObj = JSON.parse(body);
    console.log(reqObj.url," ",reqObj.start," ",reqObj.end);
    console.log(difference(reqObj.start,reqObj.end));
    const url = reqObj.url;
    if (url.includes('youtube')){
    filename = url.substring(32);
    writer(url,reqObj.start,difference(reqObj.start,reqObj.end),filename,res,download);
  }
  });
});

server.listen(port, function () {
  console.log('Web server is running on port 3000');
});

async function download(filename,res){
    console.log("Trying to start downloading of your video at ",(process.env.PORT)?process.env.PORT:3000);
    var filePath = path.join(__dirname, filename+'.mp4');
    var stat = fs.statSync(filePath);
  
    res.writeHead(200, {
        "Content-Disposition": "attachment;filename="+filename,
        'Content-Type': 'video/mp4',
        'Content-Length': stat.size
    });
  
    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    return filename;
}