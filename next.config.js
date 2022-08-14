const path = require('path');

if (!process.env.WORDPRESS_API_URL) {
	throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

module.exports = {
	images: {
		domains: [
			process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
			'i0.wp.com',
			'0.gravatar.com',
			'1.gravatar.com',
			'2.gravatar.com',
			'secure.gravatar.com',
		],
	},
	sassOptions: {
		includePaths: [path.resolve(__dirname, 'styles')],
		prependData: `@import 'variables.scss';`,
	},
};
