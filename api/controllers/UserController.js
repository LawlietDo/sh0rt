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

    index: function(req, res) {    
    },

    create: function(req, res) {
	var mongodb = require('mongodb');
	var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10, safe:false });
	var db = new mongodb.Db('sh0rtdb', mongodbServer);

	var account = req.param('account'),
	    password = req.param('password'),
	    captcha = req.param('captcha');

	if (captcha !== 'lawlietdo') {
	    res.redirect('./login');
	    return;
	}

	db.open(function() {
	    /* Select 'user' collection */
            db.collection('user', function(err, collection) {
                /* Insert a data */
                collection.insert({
                    account: account,
                    password: password 
	        }, function(err, data) {
            	    if (data) {
                        console.log('Successfully Insert');
            	    } else {
                	console.log('Failed to Insert');
            	    }
		    res.redirect('./login');
        	});
	    });
        });
    },

    show: function(req, res) {
    	User.findAll(function(err, result) {
	    if (err) {
		res.json({});
	    } else {
	    	res.json(result);
	    }
	});
    }

};
