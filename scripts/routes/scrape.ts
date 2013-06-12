///<reference path="../requires.ts"/>

module namacha.routes {
	export var scrape: Handler = (req: ExpressServerRequest, res: ExpressServerResponse): void => {
		var route:   string = req.param("route");

		namacha.model.scrape.getContentForRoute(route).then(
			(content: string): void => {
				namacha.model.store.setContentForRoute(route, content);
			},
			(reason: any): void => {
				console.log("Failed to scrape " + route + ", reason: " + reason);
			}
		);

		res.send("Queued");
	};
}
