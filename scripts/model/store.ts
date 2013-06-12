module namacha.model.store {
	class RouteToFileMapping {
		private map: { [route: string]: string; };

		constructor(private mapFilePath: string, private dataDir: string) {
			this.load();
		}

		private load(): void {
			try {
				this.map = require("../" + this.dataDir + this.mapFilePath);
			}
			catch(e) {
				this.map = {};
				this.save();
			}
		}

		private save(): void {
			console.log("Saving to " + this.mapFilePath);
			write(this.dataDir + this.mapFilePath, JSON.stringify(this.map));
		}

		public getFilePath(route: string): string {
			return this.map[route];
		}

		public newFilePath(route: string): string {
			var filePath: string = this.dataDir + RouteToFileMapping.hash(route) + ".html";
			this.map[route] = filePath;
			this.save(); // TODO throttle
			return filePath;
		}

		private static hash(route: string): string {
			var hashAlgo = require("crypto").createHash("sha1");
			hashAlgo.update(route);
			return hashAlgo.digest("hex");
		}
	}

	var routeToFileMapping: RouteToFileMapping = new RouteToFileMapping(
		namacha.config.get("mapFilePath"),
		namacha.config.get("dataDir")
	);

	export function getContentForRoute(route: string): Qpromise/*<string>*/ {
		var filePath: string = routeToFileMapping.getFilePath(route);

		if (filePath === undefined) {
			return Q.reject(/* FIXME update defs to take value "Route has never been scraped"*/);
		}

		return read(filePath);
	}

	export function setContentForRoute(route: string, content: string): void {
		var filePath: string = routeToFileMapping.newFilePath(route);
		write(filePath, content);
	}

	function read(filePath: string): Qpromise/*<string>*/ {
		var deferred: Qdeferred = Q.defer();

		fs.readFile(filePath, { encoding: "utf8" }, (err: any, data: string): void => {
			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve(data);
			}
		});

		return deferred.promise;
	}

	function write(filePath: string, content: string): Qpromise/*<void>*/ {
		var deferred: Qdeferred = Q.defer();

		fs.writeFile(filePath, content, (err: any): void => {
			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve(undefined);
			}
		});

		return deferred.promise;
	}
}
