/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
   _config: {
    },

    create: function(req, res) {
	var mongodb = require('mongodb');
	var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10, safe:false });
	var db = new mongodb.Db('sh0rtdb', mongodbServer);

	db.open(function() {

	    /* Select 'user' collection */
            db.collection('user', function(err, collection) {

                /* Insert a data */
                collection.insert({
                    name: 'Fred Chien',
                    email: 'cfsghost@gmail.com'
	        }, function(err, data) {
            	    if (data) {
                        console.log('Successfully Insert');
            	    } else {
                	console.log('Failed to Insert');
            	    }
        	});
	    });
        });
    },

    show: function(req, res) {
	var mongodb = require('mongodb');
        var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
        var db = new mongodb.Db('sh0rtdb', mongodbServer);

        db.open(function() {
            /* Select 'user' collection */
            db.collection('user', function(err, collection) {
	   	 /* Querying */
	        collection.find({ name: 'Fred Chien' }, function(err, data) {
	            /* Found this People */
        	    if (data) {
	        	data.toArray(function(err, result) { 
		    	    if(err) {
			        console.log("ToArray Error"); 
			    } else { 
				console.log(result);
			        console.log('Name: ' + result[0].name + ', email: ' + result[0].email);
			    }
			});
	            } else {
        	        console.log('Cannot found');
                    }
		});
	    });
        });
    }

};
