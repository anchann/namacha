///<reference path="../requires.ts"/>

module namacha.routes {
	export var serve: Handler = (req: ExpressServerRequest, res: ExpressServerResponse): void => {
		var route: string = req.param("_escaped_fragment_");

		if (!route) {
			res.send(400, "No route specified using the _escaped_fragment_ param");
			return;
		}

		namacha.model.store.getContentForRoute(route).then(
			(content: string): void => {
				res.send(content);
			},
			(reason: any): void => {
				res.send(404, "Not scraped");
			}
		);
	};
}
