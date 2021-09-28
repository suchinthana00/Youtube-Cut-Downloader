const puppeteer = require('puppeteer-core');
const devices = puppeteer.devices;
const iPad = devices['iPad Pro'];

let link = null;

async function videoLink(url){
  var ts = Date(); 
  console.log(ts,'\nGot your request');

  const browser = await puppeteer.launch({
    headless:false,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  });
  console.log('Starting to search your video');
    try {
        const page = await browser.newPage();
        await page.emulate(iPad);
        await page.setDefaultNavigationTimeout(40000);     
        await page.setRequestInterception(true);

        page.on('request', (request) => {
          //console.log(request.url())
            if(request.url().includes('/videoplayback')){
                ts = Date();
                console.log(ts,'\nWe found the link');
                link=request.url();
                return link;
            }
            else{
              request.continue();
            }
          })

        await page.goto(url);
        await page.keyboard.press('k');
    }
    catch(e) {
        console.log(e);
        
    }
    finally {
        console.log('Link search ended')
        await browser.close()
        return link;
    }
}

module.exports = videoLink;