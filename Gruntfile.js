module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		typescript: {
			base: {
				src: [
					'scripts/requires.ts',
					'scripts/config.ts',
					'scripts/model/**/*.ts',
					'scripts/routes/**/*.ts',
					'scripts/exports.ts',
				],
				dest: 'dist/lib.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-typescript');

	// Default task(s).
	grunt.registerTask('default', ['typescript']);
};
