const express = require('express');
const expressVue = require('express-vue');
const app = express();
const bodyParser = require("body-parser");
const promise = require('./pgp');
const path = require('path');
const async = require('async');
const db = promise.db;
const elas = require("./elastic/index");


const Locations = require('./app/models/locations');
const location = new Locations();

app.use('/public', express.static('public'))


app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
	componentsDir: path.join(__dirname,'views','components'),
	defaultLayout : 'layout'
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}))

// parse application/json
app.use(bodyParser.json())

app.get('/find/near', (req, res) => {
    let uLong = parseFloat(req.query.long),
        uLat = parseFloat(req.query.lat),
        uType = parseFloat(req.query.type),
        uR = parseFloat(req.query.r);
    //console.log(uR, uType, uLong, uLat);
    location.getNear(uLat, uLong, uType, uR)
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                res.json(result);
            });
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/search', (req, res) => {
    let search_term = req.query ['term'];
    elas.search ("coffy", "location", search_term, (err , resp) => {
        async.map(resp, searchField, (err , locs) => {
            res.json(locs);
        });
    });
});

//GET home page
app.get('/', (req, res) => {
    //let db = promise.db;
    location.getAll()
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                res.render('index', {
					data : {
						locations : result
					},
					vue : {
						head : {
							title : 'Home',
							meta : [
								{ script: '/public/js/script.js' },
								{ style : '/public/css/style.css', rel : 'stylesheet' }
							]
						},
						components : ['myheader','login','myfooter']
					}
				});
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
				res.render('detail', {
					data : {
						location : result[0]
					},
					vue : {
						head : {
							title : result[0]['name'],
							meta : [
								{ script : 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAsB1OF-sOPmmMd9bwLpJfJfrdumJ_A6dI&callback=initMap'},
								{ script: '/public/js/wow.min.js' },
								{ script: '/public/js/script.js' },
								{ style : '/public/css/animate.css', rel : 'stylesheet' },
								{ style : '/public/css/detail_style.css', rel : 'stylesheet' },
							]
						},
						components : ['myheader', 'login', 'myfooter']
					}
				});
            });
        })
        .catch(error => {
            console.log(error);
        });

});

app.post('/find/loc', (req, res) => {
    let uLong = parseFloat(req.body['inLong']),
        uLat = parseFloat(req.body['inLat']),
        uType = parseFloat(req.body['inType']),
        uR = parseFloat(req.body['inR']);
    location.getNear(uLat, uLong, uType, uR)
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
				res.json(result);
            });
        })
        .catch(error => {
            console.log(error);
        });
});

app.post('/find/dist', (req, res) => {
    let type = parseFloat(req.body['inType']),
        district = parseFloat(req.body['inDist']);
    //let db = promise.db;
    location.getDist(type,district)
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
				res.json(result);
            })
        })
        .catch(error => {
            console.log(error);
        });
});


//REST for Mobile
app.post('/find/location', (req, res) => {
    let uLong = parseFloat(req.body['inLong']),
        uLat = parseFloat(req.body['inLat']),
        uType = parseFloat(req.body['inType']),
        uR = parseFloat(req.body['inR']);
    console.log(uR, uType, uLong, uLat);

    location.getNear(uLat, uLong, uType, uR)
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                res.json(result)
            });
        })
        .catch(error => {
            console.log(error);
        });
});

app.post('/find/district', (req, res) => {
    let type = parseFloat(req.body['inType2']),
        district = parseFloat(req.body['inDist']);
    location.getDist(type,district)
        .then(data => {
            async.mapSeries(data, merge2, (err, result) => {
                res.json(result)
            })
        })
        .catch(error => {
            console.log(error);
        });
});

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

function searchField (item , cb){
    elas.search("coffy", "image", item.id_location, (err, resp) => {
        let imgPath = '/public/coffy_img/' + resp[0]['name'];
        item.image = imgPath;
        elas.search("coffy", "district", item.id_district, (err, resp) => {
            item.district = resp[0]['name'];
            elas.search("coffy", "type", item.id_type, (err, resp) => {
                item.type = resp[0]['name'];
                cb(null,item);
            });
        });
    });
}

app.listen(3000, () => {
	console.log('Express server listening on port 3000');
});