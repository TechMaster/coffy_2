const express = require ('express');
const expressVue = require ('express-vue');
const app = express();
const bodyParser = require ("body-parser");
const promise = require ('../pgp');
const path = require ('path');
const async = require ('async');
const db = promise.db;
const elas = require ("../elastic/index");

const location = require ('../app/models/locations');

app.use ('/public', express.static ('../public'))


app.engine ('vue', expressVue);
app.set ('view engine', 'vue');
app.set ('views', path.join (__dirname, '/views'));
app.set ('vue', {
	componentsDir: path.join (__dirname, 'views', 'components'),
	defaultLayout : 'layout'
});

// parse application/x-www-form-urlencoded
app.use (bodyParser.urlencoded ({
	extended: true
}));

// parse application/json
app.use (bodyParser.json());

app.get ('/find/near', (req, res) => {
    let uLong = parseFloat (req.query.long),
        uLat = parseFloat (req.query.lat),
        uType = parseFloat (req.query.type),
        uR = parseFloat (req.query.r);
    location.getNear (uLat, uLong, uType, uR)
        .then (data => {
            async.mapSeries (data, location.merge2, (err, result) => {
                res.json (result);
            });
        })
        .catch (error => {
            console.log (error);
        });
});

app.get ('/search', (req, res) => {
    let search_term = req.query ['term'];
    location.search (search_term)
    .then (data => {
        async.map (data, location.mergeData, (err, locs) => {
            res.json (locs);
        });
    });
});

//GET home page
app.get ('/', (req, res) => {
    location.getAll ()
        .then (data => {
            async.mapSeries (data, location.mergeData, (err, result) => {
                res.render('index.vue', {
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

});

//GET detail page
app.get('/detail/:id', (req, res) => {
    let id = req.params.id;
    location.getDetail(id)
        .then(data => {
            let test = [data];
            async.map(test, location.merge2, (err, result) => {
				res.render('detail', {
					data : {
						location : result[0]
					},
					vue : {
						head : {
							title : result[0]['name'],
							meta : [
								{ script: '/public/js/wow.min.js' },
								{ script: '/public/js/script.js' },
								{ style : '/public/css/animate.css', rel : 'stylesheet' },
								{ style : '/public/css/detail_style.css', rel : 'stylesheet' },
								{ style : '/public/css/style.css', rel : 'stylesheet' }
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
            async.mapSeries(data, location.merge2, (err, result) => {
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
            async.mapSeries(data, location.merge2, (err, result) => {
				res.json(result);
            })
        })
        .catch(error => {
            console.log(error);
        });
});


//REST for Mobile
app.post('/find/location', (req, res) => {
    let uLong = parseFloat (req.body [ 'inLong' ] ),
        uLat = parseFloat (req.body [ 'inLat' ] ),
        uType = parseFloat (req.body [ 'inType' ] ),
        uR = parseFloat (req.body [ 'inR' ] );
    location.getNear ( uLat, uLong, uType, uR )
        .then ( data => {
            async.mapSeries (data, location.merge2, (err, result) => {
                res.json (result)
            });
        })
        .catch (error => {
            console.log (error);
        });
});

app.post ('/find/district', (req, res) => {
    let type = parseFloat ( req.body ['inType2'] ),
        district = parseFloat ( req.body ['inDist'] );
    location.getDist (type, district)
        .then (data => {
            async.mapSeries (data, location.merge2, (err, result) => {
                res.json (result)
            })
        })
        .catch (error => {
            console.log (error);
        });
});


app.listen(3000, () => {
	console.log('Express server listening on port 3000');
});
