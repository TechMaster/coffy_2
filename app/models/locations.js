const { db, } = require('../../pgp');
const elas = require('../../elastic/index');

class Locations {
    constructor(){
    }

    getAll() {
        //get in postgres
        // return db.any("SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location ORDER BY random() LIMIT 30");
        //get in elastic
        return elas.searchAll ( "coffy", "location" );
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

    search (term) {
        return elas.search ("coffy", "location", term);
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
    }

    mergeData (item , cb) {
        elas.search ("coffy", "image", item.id_location)
        .then ( resp => {
            let imgPath = '/public/coffy_img/' + resp[0]['name'];
            item.image = imgPath;
            elas.search ("coffy", "district", item.id_district)
            .then ( resp => {
                item.district = resp [0] ['name'];
                elas.search ("coffy", "type", item.id_type)
                .then ( resp => {
                    item.type = resp [0][ 'name'];
                    cb (null, item);
                }) 
            });
        });
    };

    restDist(type, district){
        return db.any("SELECT id_location, name, address, octime, rate, lat, long, id_type, id_district FROM coffy.location " +
                "WHERE id_type = ${Type} AND id_district = ${District};",
                {
                    Type: type,
                    District: district
                });
    }
    merge2(item, cb) {
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

}

module.exports = new Locations();