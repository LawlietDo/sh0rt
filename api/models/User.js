/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    
    },

    findAll: function(callback) {
	var mongodb = require('mongodb');
        var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
        var db = new mongodb.Db('sh0rtdb', mongodbServer);

        db.open(function() {
            /* Select 'user' collection */
            db.collection('user', function(err, collection) {
                 /* Querying */
                collection.find(function(err, data) {
                    /* Found this People */
                    if (data) {
                        data.toArray(function(err, result) {
                            if(err) {
				callback('error', 'toArray error');
                            } else {
				callback(null, result);
                            }
                        });
                    } else {
			callback('error', 'Cannot found');
                    }
                });
            });
        });
    }

};
