type Post = {
	title: string;
	excerpt: string;
	slug: string;
	date: Date;
	featuredImage: {
		sourceUrl: string;
	};
	postSettings: {
		isclass: boolean;
		module: boolean;
		modules: any;
		previewImage: {
			sourceUrl: string;
		};
	};
	author: object;
};

export type { Post };
