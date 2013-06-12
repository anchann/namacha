module namacha.config {
	var DEFAULTS: any = {
		basePath:    "/",
		baseUrl:     "http://localhost/",
		dataDir:     "data/",
		mapFilePath: "map.json",
	};

	var values = {};
	try {
		values = require("../config.json");
	}
	catch(e) {
		console.log("WARNING: config file not found or has a syntax error:");
		console.log(e);
	}

	export function get(key: string): any {
		return values[key] || DEFAULTS[key];
	}
}
