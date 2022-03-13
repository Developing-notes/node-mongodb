// referencepage:
// http://mongodb.github.io/node-mongodb-native/3.1/quick-start/quick-start/
----------------------------------------------------------------------------
const first = require('mongodb').MongoClient
// assert meaning = Checks if a value is true. Same as assert.ok()
const second = require('assert')
// Connection URL
const thrid = 'mongodb://localhost:27017'
// Database Name
const fourth = 'mytask'
// Create a new MongoClient
const fifth = new first(thrid, {useNewUrlParser: true})
// Use connect method to connect to the Server
fifth.connect(function (err) {
    second.equal(null, err)
    console.log("Connect success")
    const db = fifth.db(fourth)
    insertvalue(db, function () {
        findDocuments(db, function () {
            updateDocument(db, function () {
                removeDocument(db, function () {
                    fifth.close();
                });
            });

        });

    });
})

// insertmethod//
const insertvalue = function (db, callback) { // Get the documents collection
    const collection = db.collection('maincollection')
    // Insert some documents
    collection.insertMany([
        {
            name: 'vickram',
            age: 22,
            position: 'developer'
        }, {
            name: 'john',
            age: 25,
            position: 'developer'
        }, {
            name: 'david',
            age: 27,
            position: 'developer'
        }
    ], function (err, result) {
        second.equal(err, null)
        second.equal(3, result.insertedCount)
        console.log("Inserted 3 documents into the collection");
        callback(result)
    })
}
// findmethod//
const findDocuments = function (db, callback) { // Get the documents collection
    const collection = db.collection('maincollection');
    // Find some documents
    collection.find({}).toArray(function (err, maincollection) {
        second.equal(err, null);
        console.log("Found the following records");
        console.log(maincollection);
        callback(maincollection);
    });
}

// updatemethod//
const updateDocument = function (db, callback) { // Get the documents collection
    const collection = db.collection('maincollection');
    // Update document where a is 2, set b equal to 1
    collection.updateMany({
        age: 22
    }, {
        $set: {
            name: 'akilsdfasfan'
        }

    }, function (err, maincollection) {
        second.equal(err, null);
        console.log("Updated the document with the field a equal to 2");
        callback(maincollection);
    });
}


// deletemethod//
const removeDocument = function (db, callback) { // Get the documents collection
    const collection = db.collection('maincollection');
    // Delete document where a is 3
    collection.deleteOne({
        age: 27
    }, function (err, maincollection) {
        second.equal(err, null);
        console.log("Removed the document with the field a equal to 3");
        callback(maincollection);
    });
}
