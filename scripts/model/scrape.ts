module namacha.model.scrape {
	export function getContentForRoute(route: string): Qpromise/*<string>*/ {
		var url: string = namacha.config.get("baseUrl") + "#!" + route;

		var deferred: Qdeferred = Q.defer();

		phantom.create((ph) => {
			return ph.createPage((page) => {
				return page.open(url, (status) => {
					// TODO check status, fail nicely
					page.get("content", (content: string): void => {
						deferred.resolve(content);
					});
				});
			});
		});

		return deferred.promise;
	}
}
