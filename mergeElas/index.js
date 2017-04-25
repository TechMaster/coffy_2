const elas = require("../elastic/index");
const db = require("./getLocation");
const async = require("async");
elas.createIndex("coffy", (err, stt) => {
    if (err) console.log(err);
    console.log(stt);
    db.query("select * from coffy.location")
    .then(result => {
        async.mapSeries(result, merge, (err , res) => {
            console.log(res.length);
            db.query("select * from coffy.image")
            .then(result => {
                async.mapSeries(result, merge1, (err , res) => {
                    console.log(res.length);
                    db.query("select * from coffy.district")
                    .then(result => {
                        async.mapSeries(result, merge2, (err , res) => {
                            console.log(res.length);
                            db.query("select * from coffy.type")
                            .then(result => {
                                async.mapSeries(result, merge3, (err , res) => {
                                    console.log(res.length);
                                    console.log("Completed");
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

// elas.deleteIndex("coffy",()=>{

// });

// elas.searchAll("coffy","district", (err,res)=>{
//     console.log(res);
// });

function merge(item, cb) {
    elas.insertDocument ("coffy", "location", item, (err,stt) => {
            console.log("Import succeed");
            cb(null,"success");
        });
}
function merge1(item, cb) {
    elas.insertDocument ("coffy", "image", item, (err,stt) => {
            console.log("Import succeed");
            cb(null,"success");
        });
}
function merge2(item, cb) {
    elas.insertDocument ("coffy", "district", item, (err,stt) => {
            console.log("Import succeed");
            cb(null,"success");
        });
}
function merge3(item, cb) {
    elas.insertDocument ("coffy", "type", item, (err,stt) => {
            console.log("Import succeed");
            cb(null,"success");
        });
}

// elas.deleteIndex("coffy",() => {

// });