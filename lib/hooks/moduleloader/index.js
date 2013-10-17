module.exports = function(sails) {


	/**
	 * Module dependencies
	 */

	var util =	require('../../util'),
		buildDictionary = require('./buildDictionary');



	/**
	 * Module loader
	 *
	 * Load a module into memory
	 */
	return {

		identity: 'moduleloader',


		// Default configuration
		defaults: function (config) {
			return {

				appPath: config.appPath || process.cwd(),

				// Paths for application modules and key files
				// If `paths.app` not specified, use process.cwd()
				// (the directory where this Sails process is being initiated from)
				paths: {
					
					// todo: userconfig hook
					config: config.appPath + '/config',

					// todo: controllers hook
					controllers: config.appPath + '/api/controllers',
					
					// todo policies hook
					policies: config.appPath + '/api/policies',

					// todo orm hook
					adapters: config.appPath + '/api/adapters',
					models: config.appPath + '/api/models',

					// todo: move back to global config
					dependencies: config.appPath + '/dependencies',
					tmp: config.appPath + '/.tmp',

					// todo: assets hook
					'public': config.appPath + '/.tmp/public'
				}
			};
		},


		
		initialize: function(cb) {
			return cb();
		},


		/**
		 * Build a dictionary of named modules
		 * (responds with an error if the container cannot be loaded)
		 *
		 * @param {Object} options
		 * @param {Function} cb
		 */

		required: function(options, cb) {
			return buildDictionary(options, cb);
		},


		/**
		 * Build a dictionary of named modules
		 * (fails silently-- returns {} if the container cannot be loaded)
		 *
		 * @param {Object} options
		 * @param {Function} cb
		 */

		optional: function(options, cb) {
			options.optional = true;
			return buildDictionary(options, cb);
		},


		/**
		 * Build a dictionary indicating whether the matched modules exist
		 * (fails silently-- returns {} if the container cannot be loaded)
		 *
		 * @param {Object} options
		 * @param {Function} cb
		 */

		exists: function(options, cb) {
			options.optional = true;
			options.dontLoad = false;
			return buildDictionary(options, cb);
		},


		/**
		 * Build a single module object by extending {} with the contents of each module
		 * (fail silently-- returns {} if the container cannot be loaded)
		 *
		 * @param {Object} options
		 * @param {Function} cb
		 */

		aggregate: function(options, cb) {
			options.aggregate = true;
			options.optional = true;
			return buildDictionary(options, cb);
		}
	};

};