type Post = {
	title: string;
	excerpt: string;
	slug: string;
	date: Date;
	featuredImage: {
		sourceUrl: string;
	};
	postSettings: {
		previewImage: {
			sourceUrl: string;
		};
	};
	author: object;
};

export type { Post };
