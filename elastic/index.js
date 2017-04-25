const cn = require ('./connect');
const analyse_setting = require ("./analyse_setting");
const mapping_setting = require ("./mapping_setting")

class elastic {
	constructor () {
		this.elas = cn;
    }

	createIndex (index, cb) {
		let setting = analyse_setting();
		let mapping = mapping_setting(); 
		this.elas.indices.create ({
			index : index,
			body  : {
				"settings" : setting,
				"mappings" : mapping
			}
		}, (err, result, status) => {
			if (err) {
				cb (err.message);
			} else {
				cb (null, `Index ${result} was created`);
			}
		});
	}

	insertDocument (index, type, doc, cb) {
		this.elas.index ({
			index : index,
			type  : type,
			body : doc
		}, ( err, resp, status ) => {
			if (err) {
				cb (err.message);
			} else{
				cb (null, resp)
			}
		});
	}

	deleteIndex (index, cb) {
		this.elas.indices.delete ({
			index : index
		}, ( err, result, status) => {
			if ( err ) {
				cb (err.message);
			}
			else {
				cb (null, `deleted ${result}`);
			}
		})
	}

	searchAll ( index, type, cb ) {
		this.elas.search ({
			index : index,
			type : type,
			body : {
				"from"  : 0,
				"size"  : 50,
				"query" : {
					"match_all" : {}
				}	
			}
		} , ( err, res, stt) => {
			if (err) {
				cb (err.message);
			} else {
				let products = [];
				res.hits.hits.forEach ( (product) => {
					products.push ( product["_source"] );
				});
				cb(null, products);
			}
		});
	}

	search ( index, type, term, cb ) {
		let fields = this.setTypeFields (type);		
		this.elas.search ({
			index : index,
			type  : type,
			body  : {
				"from"  : 0,
				"size"  : 50,
				query   : {
					"multi_match" : {
						"query"  	 : term,
						"type" 	 	 : "best_fields",
						"fields" 	 : fields,
						"tie_breaker" : 0.3
					}
				}
			}
		}, (error, response, status) => {
			if (error) {
				cb ( error.message );
			} else {
				let products = [];
				response.hits.hits.forEach ( (product) => {
					products.push ( product["_source"] );
				});
				cb ( null, products );
			}
		});
	}

	setTypeFields (type){
		let fields = [];
		switch (type) {
			case "location" :
				return [ "name", "address" ];
			case "image"    : 
				return [ "id_location" ];
			case "district" :
				return [ "id_district" ];
			case "type" :
				return [ "id_type" ];
			default :
				return [];
		}
	}
}

module.exports = new elastic();