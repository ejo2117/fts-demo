type Post = {
	title: string;
	excerpt: string;
	slug: string;
	date: Date;
	featuredImage: {
		sourceUrl: string;
	};
	author: object;
};

export type { Post };
