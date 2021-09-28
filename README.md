# Youtube - Cut - Downloader
A Node.js API to download only a selected part of a youtube video.

## Steps to Setup

1. Install dependencies

```bash
npm install
```
2. Configure local executable path of Chrome or Edge at pupout.js

```bash
executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
```

3. Run Server

```bash
node index.js
```

You can browse the api at **<http://localhost:3000>** or at **process.env.PORT** if assigned.

4. API requests

API responds to **GET** requests to above address request body follows below JSON:

```bash
{
    "url":"https://www.youtube.com/watch?v=YE7VzlLtp-4",
    "start":"00:01:01",
    "end":"00:02:02"
}
```
5. Customizing page timeout time.

You can customize page time out time at pupout.js to change time allocated for searching the download link.  
(in miliseconds - lesser time suited for higher bandwidths)

```bash
await page.setDefaultNavigationTimeout(40000); 
```
6. Example

Below example shows cutting a part from "00:01:01" to "00:02:02" of [Big Buck Bunny](https://www.youtube.com/watch?v=YE7VzlLtp-4)

![Cutting Example Video](Screenshots/Example.jpg?raw=true "Cutting a part of Big Buck Bunny using Postman")

## NPM packages used
Puppeteer - Core [Pupperteer at NPM](https://www.npmjs.com/package/puppeteer)  
FFMPEG [FFmpeg at NPM](https://www.npmjs.com/package/ffmpeg)  
Fluent ffmpeg [Fluent ffmpeg at NPM](https://www.npmjs.com/package/fluent-ffmpeg/v/1.7.0)

## File description
index.js - Handle Http requests and file download  
timediff.js - Gives duration of video in seconds  
writer.js - Convert and write the result video file using FFmpeg  
pupout.js - Gets the video download link from youtube
