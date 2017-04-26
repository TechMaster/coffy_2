const shortid = require('shortid');
const Nightmare = require('nightmare');		
const async = require('async');
let nightmare = Nightmare({ show: true });
const downloader = require('image-downloader');
const shell = require('shelljs');
const fs = require('fs');

let realdata = [];

function getOption(url,name,id){
    let destPath = '../public/test/' + id + '_' + '1.jpg';
    options = {
        url: url,
        destPath : destPath,
        done: function(err, filename, image) {
            if (err) {
                throw err
            }
            console.log('File saved to', filename)
        }
    }
    return options;
}

function crawl(arr,cb){
  function test(item,cb){
        let night = new Nightmare({ show: true });
        night.goto(item)
             .wait(1000)
             .evaluate(function(){

                function getLongLat(data) { 
                    let metas = document.getElementsByTagName('meta'); 
                    let n = metas.length;
                    for (let i=0; i < n; i++) { 
                        if (metas[i].getAttribute("property") == data) { 
                          return metas[i].getAttribute("content"); 
                        } 
                    } 
                      return "";
                  } 
                try{
                    let obj = {};
                    let name = document.querySelector('.main-info-title > h1').innerText;
                    let type = document.querySelector('.category .category-items > a').innerText;
                    let address = document.querySelectorAll('.res-common-add span')[1].querySelector('a > span').innerText;
                    let district = document.querySelectorAll('.res-common-add span')[3].querySelector('a > span').innerText;
                    let octime = document.querySelectorAll('.micro-timesopen span')[1].getAttribute('title').replace('|','');
                    let rate = document.querySelectorAll('.microsite-top-points-block span')[0].innerText; 
                    let lat = getLongLat('place:location:latitude');
                    let long = getLongLat('place:location:longitude');

                    //download image
                    let image = document.querySelector('.main-image .img a > img').getAttribute('src'); 

                    obj['name'] = name;
                    obj['type'] = type;
                    obj['address'] = address;
                    obj['district'] = district;
                    obj['octime'] = octime;
                    obj['rate'] = parseFloat(rate);
                    obj['lat'] = parseFloat(lat);
                    obj['long'] = parseFloat(long);
                    obj['image'] = image;
                    return obj;
                }catch(err){
                    console.log('Searching not found');
                    return {};
                }
             })
             .end()
             .then(function(res){
               if(!res){
                  cb(null,{}); 
               }
               try{
                  let id = shortid.generate();
                  res['id'] = id;
                  let opt = getOption(res['image'],res['name'],id);
                  shell.mkdir('-p',opt['destPath']);
                  downloader(opt);
                  //update data every crawl time
                  realdata.push(res);
                  console.log(res);
                  exportJson(realdata);
                  cb(null,res);
               }catch(err){
                  console.log('Error File not found');
                  cb(null,{});
               }
             });
    }
    // so luong web truy cap 1 luc
    async.mapLimit(arr,2,test,function(err,res){
        cb(null,res);
    });
}

nightmare
    .goto('https://www.foody.vn/ha-noi#/places')
    .click('.signin')
    .wait(1000)
    .insert('#Email','systemec2017@gmail.com')
    .type('#Password','rootvn')
    .click('#signin_submit')
    .wait(2000)
    .type('#pkeywords', 'cafe hoan kiem')
    .click('.ico-search')
    .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
  .click('#scrollLoadingPage')
  .wait(1000)
    .evaluate(function () {
        let res = document.querySelectorAll('.filter-result-item .result-image');
        let arr = [];
        for(let i = 0; i < res.length;i++){
            let tm = res[i].querySelector('a').href;
            arr.push(tm);
        }
        // let newarr = arr.slice(9);
        return arr;
    })
    .end()
    .then(function (result){
        crawl(result,function(err,res){
          console.log('done!');
        //   exportJson(res);
        });  
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });

    function exportJson(arr){
        let json = {};
        let n = arr.length;
        for(let i = 0; i < n; i++){
            json[i] = arr[i];
        }
        let jsonString = JSON.stringify(json); 
        fs.writeFile('data.json', jsonString, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }