const flattenNode = (nodeObj, keysToFlatten: Array<any>) => {
	console.log('hi', keysToFlatten);

	const output = { ...nodeObj };
	for (let i = 0; i < keysToFlatten.length; i++) {
		const k = keysToFlatten[i];

		output[k] = output[k].node;
		console.log(output[k]);
	}
	return output;
};

/**
 * Flattens 'edges' and 'node' options in a graphQL response
 *
 * @param {*} graphQLEdges
 * @return {nodeList}
 */
export const flattenGraphQLResponse = graphQLEdges => {
	let nodeList = [];

	for (let i = 0; i < graphQLEdges.length; i++) {
		let { node } = graphQLEdges[i];

		try {
			// node = cleanGraphQLResponse(node);
			const childToExpand = Object.keys(node).find(k => typeof node[k] === 'object' && Object.keys(node[k])[0] === 'edges');

			const keysToFlatten = Object.keys(node).filter(
				k => typeof node[k] === 'object' && Object.keys(node[k])[0] === 'node'
			);

			if (childToExpand) {
				node = flattenGraphQLResponse(node[childToExpand].edges);
			} else if (keysToFlatten) {
				node = flattenNode(node, keysToFlatten);
			}
		} catch (error) {}

		nodeList.push(node);
	}

	return nodeList;
};

/**
 * Remove edges, node and __typename from graphql response
 *
 * @param {Object} input - The graphql response
 * @returns {Object} Clean graphql response
 */
const cleanGraphQLResponse = function (input) {
	if (!input) return null;
	const output = {};
	const isObject = obj => {
		return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
	};

	Object.keys(input).forEach(key => {
		if (input[key] && input[key].edges) {
			output[key] = input[key].edges.map(edge => cleanGraphQLResponse(edge.node));
		} else if (isObject(input[key])) {
			output[key] = cleanGraphQLResponse(input[key]);
		} else if (key !== '__typename') {
			output[key] = input[key];
		}
	});

	return output;
};
