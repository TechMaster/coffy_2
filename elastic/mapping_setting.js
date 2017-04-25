// This config mapping for COFFY TUNG7

function config () {
    return {
			"location" : {
				"include_in_all" : false,
				"properties" : {
					"name" : {
						"type" 			 : "text",
						"include_in_all" : true,
						"analyzer" 		 : "analyzer_for_index",
						"search_analyzer": "analyzer_for_searching"
					},
					"address" : {
						"type" 			 : "text",
						"include_in_all" : true,
						"analyzer" 		 : "analyzer_for_index",
						"search_analyzer": "analyzer_for_searching"
					}
				}
			},
			"image" : {
				"include_in_all" : false,
				"properties" : {
					"id_location" : {
						"type"  		 : "text",
						"include_in_all" : true,
						"index" 		 : "not_analyzed",
						"analyzer" 		 : "whitespace"
					}
				}
			},
			"district" : {
				"include_in_all" : false,
				"properties" : { 
					"id_district" : {
						"type"  		 : "text",
						"include_in_all" : true,
						"index" 		 : "not_analyzed",
						"analyzer" 		 : "whitespace"
					}
				}
			},
			"type" : {
				"include_in_all" : false,
				"properties" : { 
					"id_type" : {
						"type"  		 : "text",
						"include_in_all" : true,
						"index" 		 : "not_analyzed",
						"analyzer" 		 : "whitespace"
					}
				}
			},
		}
}

module.exports = config;