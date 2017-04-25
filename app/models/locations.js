const { db, } = require('../../pgp');
class Locations {
    constructor(){
    }

    getAll() {
        return db.any("SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location ORDER BY random() LIMIT 30");
    }

    getDetail(id) {
        return db.oneOrNone("SELECT * FROM coffy.location WHERE id_location = $1", id);
    }

    getNear(lat, long, type, r) {
        return db.any(
                "SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
                "CROSS JOIN (SELECT ST_Point(${Long}, ${Lat})::geography AS ref_geog) As r WHERE ST_DWithin(geog, ref_geog, ${R}) " +
                "AND id_type = ${Type} ORDER BY ST_Distance(geog, ref_geog);",
                {
                    Long: long,
                    Lat: lat,
                    R: r,
                    Type: type
                });
    }

    getDist(type, district) {
        return db.any("SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
                "WHERE id_type = ${Type} AND id_district = ${District};",
                {
                    Type: type,
                    District: district
                });
    }

    restLoc(lat, long, type, r){
        return db.any(
                "SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
                "CROSS JOIN (SELECT ST_Point(${Long}, ${Lat})::geography AS ref_geog) As r WHERE ST_DWithin(geog, ref_geog, ${R}) " +
                "AND id_type = ${Type} ORDER BY ST_Distance(geog, ref_geog);",
                {
                    Long: long,
                    Lat: lat,
                    R: r,
                    Type: type
                });
        /*
        return new Promise(function (resolve, reject) {
            db.any(
                "SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
                "CROSS JOIN (SELECT ST_Point(${Long}, ${Lat})::geography AS ref_geog) As r WHERE ST_DWithin(geog, ref_geog, ${R}) " +
                "AND id_type = ${Type} ORDER BY ST_Distance(geog, ref_geog);",
                {
                    Long: long,
                    Lat: lat,
                    R: r,
                    Type: type
                })
                .then(data => {
                    async.mapSeries(data, merge2, (err, result) => {
                        let dt = {
                            'datas': result
                        };
                        resolve(dt)
                    });
                })
                .catch(error => {
                    reject(error);
                });
        })
        */
    }

    restDist(type, district){
        return db.any("SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
                "WHERE id_type = ${Type} AND id_district = ${District};",
                {
                    Type: type,
                    District: district
                });
        /*
        return new Promise(function (resolve, reject) {
            db.any("SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
                "WHERE id_type = ${Type} AND id_district = ${District};",
                {
                    Type: type,
                    District: district
                })
                .then(data => {
                    async.mapSeries(data, merge2, (err, result) => {
                        let dt = {
                            'datas': result
                        };
                        resolve(dt)
                    })
                })
                .catch(error => {
                    reject(error);
                });
        })
        */
    }

}

module.exports = Locations;