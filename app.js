/**
 * Created by msi on 08/04/2017.
 */
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const nunjucks = require('nunjucks');
const path = require('path');
const async = require('async');
const { db, } = require('./pgp');
const Promise = require('bluebird');

const location = require('./app/models/locations');

nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    express: app,
    watch: true
});

app.use("/public", express.static(__dirname + "/public"));
app.engine('html', nunjucks.render);
app.set("views", path.resolve(__dirname, "views"));
app.set("views engine", "html");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000, function () {
    console.log('Server listening on port 3000!')
});
let log = console.log;

function merge2(item, cb) {
    let id_location = item['id_location'];
    let id_type = item['id_type'];
    let id_district = item['id_district'];
    db.one("select name from coffy.district where id_district=${id_district}", {
        id_district: id_district
    })
        .then((result) => {
            item['district'] = result['name'];
            db.one("select name from coffy.type where id_type=${id_type}", {
                id_type: id_type
            })
                .then((result) => {
                    item['type'] = result['name'];
                    db.one("select name from coffy.image where id_location=${id_location}", {
                        id_location: id_location
                    })
                        .then((result) => {
                            let imgPath = '/public/coffy_img/' + result['name'];
                            item['image'] = imgPath;
                            cb(null, item);
                        });
                    // console.log(item);
                })
                .catch((err) => {
                    cb(err, null);
                });
        })
        .catch((err) => {
            cb(err, null);
        });
}

//GET home page
app.get('/', (req, res) => {

    location.getAll()
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                dt = {
                    'datas': result
                };
                res.render('index1.html', dt);
            });
        })
        .catch(error => {
            console.log(error);
        });
});

//GET detail page
app.get('/detail/:id', (req, res) => {
    let id = req.params.id;

    location.getDetail(id)
        .then(data => {
            let test = [data];
            async.map(test, merge2, (err, result) => {
                let dt = {
                    'data': result[0]
                };
                res.render('detail.html', dt)
            });
        })
        .catch(error => {
            console.log(error);
        });
});

//POST nearest location page
app.post('/find/loc', async(req, res) => {
    let uLong = parseFloat(req.body['inLong']),
        uLat = parseFloat(req.body['inLat']),
        uType = parseFloat(req.body['inType']),
        uR = parseFloat(req.body['inR']);

    location.getNear(uLat, uLong, uType, uR)
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                let dt = {
                    'datas': result
                };
                res.render('index1.html', dt)
            });
        })
        .catch(error => {
            console.log(error);
        });
});


//POST district location page
app.post('/find/dist', async(req, res) => {
    let type = parseFloat(req.body['inType2']),
        district = parseFloat(req.body['inDist']);

    location.getDist(type,district)
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                let dt = {
                    'datas': result
                };
                res.render('index1.html', dt)
            })
        })
        .catch(error => {
            console.log(error);
        });
});


//REST for Mobile
app.post('/find/location', async(req, res) => {
    let uLong = parseFloat(req.body['inLong']),
        uLat = parseFloat(req.body['inLat']),
        uType = parseFloat(req.body['inType']),
        uR = parseFloat(req.body['inR']);

    location.getNear(uLat, uLong, uType, uR)
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                let dt = {
                    'datas': result
                };
                res.json(dt)
            });
        })
        .catch(error => {
            console.log(error);
        });
});

app.post('/find/district', async(req, res) => {
    let type = parseFloat(req.body['inType2']),
        district = parseFloat(req.body['inDist']);

    location.getDist(type,district)
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                let dt = {
                    'datas': result
                };
                res.json(dt)
            })
        })
        .catch(error => {
            console.log(error);
        });
});
