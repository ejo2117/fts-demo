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

type Category = {
	node: {
		name: string;
		posts: {
			edges: {
				node: Post;
			}[];
		};
	};
};

export type { Post, Category };
