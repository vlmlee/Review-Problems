/*

Problem:
Implement Dijkstra's shortest path algorithm. 

Solution:
Implementing it from scratch would've been a bit troublesome,
so I found a very nice implementation of graph algorithms 
from devenbhooshan @ https://github.com/devenbhooshan/graph.js/, 
but it was a bit outdated.

I reimplemented the module with es6 syntax, renamed and cleaned 
a lot of it up, added slight documentation, scoped variables 
that were missing scope, refactored the code to use functional 
programming, fixed some missing functionality, and made sure it 
passed some simple unit tests.

*/

const assert = require('assert');

/**
*
* @class BinaryHeap - This class is used to implement the priority queue that we
* need for graph traversal, dijkstra, and bellman-ford.
*/
class BinaryHeap {
    
    /**
    * @constructor - Creates our heap abstraction where 2*i+2 are right children of i 
    * and 2*i+1 are left children of i.
    */
	constructor() {
		this.nodes = [];
	}

    /**
    * Returns the number of nodes in the binary heap.
    *
    * @returns {number}
    */
	getSize() {
		return this.nodes.length;
	}

    /**
    * Compares two nodes in the heap to determine where it should be in the heap. The priority
    * comparison function.
    *
    * @returns {number} - Either positive or negative number.
    */
	compare(node1, node2) {
		return node1.priority - node2.priority;
	}

    /**
    * Adds an node to bottom of the binary heap.
    */
	push(element) {
		this.nodes.push(element);
		this.bubbleUp(this.nodes.length - 1);
	}

    /**
    * Returns and removes the node at the root of the heap.
    *
    * @returns {*} result - The node stored at the root of the heap.
    */
	pop() {
		let result = this.nodes[0],
			last_element = this.nodes.pop();

		if (this.nodes.length > 0) {
			this.nodes[0] = last_element;
			this.sinkDown(0);
		}
		return result;
	}
    
    /**
    * Deletes a node from the binary heap and redraws the heap (rearranges the array).
    *
    * @param {node} node - The node to remove.
    * @returns {Boolean}
    */
	delete(node) {
		let length = this.nodes.length,
			isPresent = false;

		for (let i= 0; i < length; i++) {
			if (this.nodes[i].content !== node) {
				continue;
			}

			let end = this.nodes.pop();

			if (i === length - 1) { 
				break;
			}

			this.nodes[i] = end;
			this.bubbleUp(i);
			this.sinkDown(i);
			isPresent = true;
			break;
		}
		return isPresent;
	}

    /**
    * Returns the root of the heap without removing it.
    *
    * @returns {*} - A value stored in the heap.
    */
	top() {
		return this.nodes[0];
	}

    /**
    * Performs a swapping algorithm to 'heapify' the array from i to the end of the array.
    *
    * @param {number} i - The index to begin the swapping operation.
    */
	sinkDown(i) {
		let length = this.nodes.length;

		while (true && i < length) {
			let flag = 0;

			if ((2 * i + 1) < length && this.compare(this.nodes[i], this.nodes[(2 * i + 1)]) > 0) {
				if ((2 * i + 2) < length && this.compare(this.nodes[(2 * i + 1)], this.nodes[(2 * i + 2)]) > 0) {
					flag = 2;
				} else {
					flag = 1;
				}
			} else if ((2 * i + 2) < length && this.compare(this.nodes[i], this.nodes[(2 * i + 2)]) > 0) {
				flag = 2;
			} else {
				break;
			}

			[this.nodes[(2 * i + flag)], this.nodes[i]] = [this.nodes[i], this.nodes[(2 * i + flag)]];
			i = (2 * i + flag);
		}
	}

    /**
    * Performs a swapping algorithm to heapify the array from i to the beginning of the array.
    *
    * @param {number} i - The index to begin the swapping operation.
    */
	bubbleUp(i) {
		let length = this.nodes.length;

		while (i > 0) {
			let index = Math.floor((i+1)/2) - 1;

			if (this.compare(this.nodes[i], this.nodes[index]) < 0) {
				[this.nodes[index], this.nodes[i]] = [this.nodes[i], this.nodes[index]];
				i = index;
			} else {
				break;
			}
		}
	}
}

/**
*
* @class MinPQNode - Class representing a Minimum Priority Queue node.
*/
class MinPQNode {
    
    /**
    * Creates a minPQ node with data and priority values.
    *
    * @param {*} content - Data to be stored in the node.
    * @param {*} priority - Data to be used to compare with other PQ nodes.
    */
	constructor(content, priority) {
		this.content = content;
		this.priority = priority;
	}
}

/**
* 
* @class MinPriorityQueue - Class representing a Minimum Priority Queue, i.e. lower priority nodes are
* moved to the top of the queue.
*/
class MinPriorityQueue {
    
    /**
    * Creates a minPQ from the BinaryHeap class.
    */
	constructor() {
		let bh = new BinaryHeap();
		this.heap = bh;
	}

    /**
    * Creates a minPQ node at the end of the queue.
    *
    * @param {*} node - Data to be stored in the node.
    * @param {*} priority - Data to be used to compare with other PQ nodes.
    */
	push(node, priority) {
		let minPQNode = new MinPQNode(node, priority);
		this.heap.push(minPQNode);
	}

    /**
    * Returns and removes the value of the node at the root of minPQ.
    *
    * @returns {MinPQNode.content} content - The content stored in the MinPQNode.
    */
	pop() {
		return this.heap.pop().content;
	}

    /**
    * Finds and removes the node from the minPQ.
    *
    * @param {MinPQNode} node - The MinPQNode to be remove from the minPQ.
    */
	remove(node) {
		return this.heap.delete(node);
	}

    /**
    * Returns the value of the node at the root of the minPQ without removing it.
    * 
    * @returns {MinPQNode.content} content - The content stored in the MinPQNode.
    */
	top() {
		return this.heap.top().content;
	}

    /**
    * Returns the size of the minPQ.
    *
    * @returns {number}
    */
	getSize() {
		return this.heap.getSize();
	}
}

/**
*
* @class GraphNode - Class representing a graph node for our Graph class.
*/
class GraphNode {
    
    /**
    * Creates a graph node (vertex) associated with a name.
    *
    * @param {*} name - The name used to refer to the node. Can be an object.
    */
	constructor(name) {
		this.name = name;
		this.adjList = [];
		this.weight = [];
	}

    /**
    * Returns the adjacency list of the graph node (vertex), i.e. it's neighbors and their edge weights.
    *
    * @returns {Array<GraphNode>} - Returns an array of graph nodes. 
    */
	getAdjList() {
		return this.adjList;
	}

    /**
    * Adds an edge to the graph node (vertex) with a weight. The edge will be directed from __this__
    * to the neighbor (outdegree).
    *
    * @param {GraphNode} neighbor - The graph node (vertex) to have indegree with __this__.
    * @param {number} weight - The weight of the edge connecting the graph nodes.
    */
	addEdge(neighbor, weight) {
		this.adjList.push(neighbor);
		this.weight.push(weight);
	}

    /**
    * The priority comparison function.
    *
    * @returns {number}
    */
	compare(node) {
		return this.weight - node.weight;
	}
}

/**
* 
* @class Graph - Class representing a Graph. 
*/
class Graph {
    
    /**
    * Creates a graph with a flag stating that it is currently unweighted.
    */
	constructor() {
		this.isWeighted = false;
		this.nodes = [];
	}

    /**
    * Adds a graph node (vertex) to the graph.
    *
    * @param {*} name - The name to refer the node as.
    * @returns {GraphNode} 
    */
	addNode(name) {
		let node = new GraphNode(name);
		this.nodes.push(node);
		return node;
	}

    /**
    * Removes a graph node (vertex) from the graph.
    *
    * @param {GraphNode.name} name - The name the node is referred as.
    */
	removeNode(name) {
		let index = this.nodes.indexOf(name);

		if (index > -1) {
			this.nodes.splice(index, 1);

			this.nodes.map(node => {
				if (node.adjList.indexOf(name) > -1) {
					node.adjList.filter(el => el.name !== name);
					node.weight.filter(el => el.name !== name);
				}
			});
		}
	}

    /**
    * Checks if a graph node (vertex) name exists in the graph.
    * 
    * @param {GraphNode.name} name - The name the node is referred as.
    * @returns {Boolean}
    */
	nodeExists(name) {
		let index = this.nodes.indexOf(name);
		if (index > -1) {
			return true;
		}
		return false;
	}

    /**
    * Returns all the graph nodes (vertices) in the graph.
    *
    * @returns {Array<GraphNode>}
    */
	getAllNodes() {
		return this.nodes;
	}

    /**
    * Breadth first search of the graph.
    *
    * @returns {Array<GraphNode>}
    */
	bfs() {
		let result = [],
			traversedNodes = [],
			markedVertices = {},
			allNodes = this.getAllNodes();

		traversedNodes.push(this.nodes[0]);

		while (traversedNodes.length !== 0) {
			let vertex_V = traversedNodes.shift();

			markedVertices[vertex_V.name] = true;
			result.push(vertex_V);

			vertex_V.adjList.map(vertex_U => {
				if (markedVertices[vertex_U.name] !== true) {
					traversedNodes.push(vertex_U);
					markedVertices[vertex_U.name] = true;
				};
			});
		}
		return result;
	}

    /**
    * Depth first search of the graph.
    *
    * @returns {Array<GraphNode>}
    */
	dfs() {
		let result = [],
			traversedNodes = [],
			markedVertices = {},
			allNodes = this.getAllNodes();

		traversedNodes.push(this.nodes[0]);

		while (traversedNodes.length !== 0) {
			let vertex_V = traversedNodes.pop();

			markedVertices[vertex_V.name] = true;
			result.push(vertex_V);

			vertex_V.adjList.map(vertex_U => {
				if (markedVertices[vertex_U.name] !== true) {
					traversedNodes.push(vertex_U);
					markedVertices[vertex_U.name] = true;
				}
			});
		}
		return result;
	}

    /**
    * Dijkstra's algorithm to find shortest path between two nodes. It is
    * an algorithm that uses a priority queue to quickly evaluate the 
    * shortest distance of a graph node amongst its neighbors and visits 
    * every graph node to then produce a shortest path.
    *
    * @param {GraphNode} source - From which node to find a shortest path.
    * @param {GraphNode} destination - The end node of the algorithm. 
    * @returns {number} - Returns a distance that is the shortest path from the source
    * to the destination.
    */
	dijkstra(source, destination) {
		let previousNode = {},
			distance = {},
			pq = new MinPriorityQueue(),
			nodes = this.getAllNodes();

		distance[source.name] = 0;

		nodes.map(node => {
			if (node !== source) {
				distance[node.name] = Number.POSITIVE_INFINITY;
			}
			pq.push(node, distance[node.name]);
		});

		while (pq.getSize() !== 0) {
			let vertex_U = pq.pop();

			vertex_U.adjList.map((vertex_V, index) => {
				if (distance[vertex_U.name] !== Number.POSITIVE_INFINITY) {
					let alt = distance[vertex_U.name] + vertex_U.weight[index];
                    
					if (alt < distance[vertex_V.name]) {
						distance[vertex_V.name] = alt;
						previousNode[vertex_V] = vertex_U.name;
						pq.remove(vertex_V);
						pq.push(vertex_V, distance[vertex_V.name]);
					}
				}
			});
		}

		if (typeof destination === 'undefined') {
			return null;
		}

		return distance[destination.name];
	}

    /**
    * Bellman-Ford's algorithm to find the shortest path between two nodes that
    * handle cases where there are negative weight cycles. 
    *
    * @param {GraphNode} source - From which node to find a shortest path.
    * @param {GraphNode} destination - The end node of the algorithm.
    * @returns {number} - Returns a distance that is the shortest path from the source
    * to the destination OR
    * @returns {null} - Returns null if there exists a negative weight cycle.
    */ 
	bellmanFord(source, destination) {
		let previousNode = {},
			distance = {},
			nodes = this.getAllNodes(),
			length = nodes.length,
			alt,
			nWeightCycle = false;

		distance[source.name] = 0;

		nodes.map(node => {
			if (node !== source) {
				distance[node.name] = Number.POSITIVE_INFINITY;
			}
		});

		for (let k = 0; k < length; k++) {
			for (let j = 0; j < length; j++) {
				let vertex_U = nodes[j];
				vertex_U.adjList.map((vertex_V, index) => {
					if (distance[vertex_U.name] !== Number.POSITIVE_INFINITY) {
						alt = distance[vertex_U.name] + vertex_U.weight[index];
						if (alt < distance[vertex_V.name]) {
							previousNode[vertex_V.name] = vertex_U.name;
							distance[vertex_V.name] = alt;
						}
					}
				});
			}
		}

		nodes.map(vertex_U => {
			vertex_U.adjList.map((vertex_V, index) => {
				if (distance[vertex_U.name] !== Number.POSITIVE_INFINITY) {
					alt = distance[vertex_U.name] + vertex_U.weight[index];
					if (alt < distance[vertex_V.name]) {
						nWeightCycle = true;
					}
				}
			});
		});

		if (nWeightCycle) {
			return null;
		}

		return distance[destination.name];
	}
}

let graph = new Graph(),
	node1 = graph.addNode('la'),
	node2 = graph.addNode('chicago'),
	node3 = graph.addNode('new york'),
	node4 = graph.addNode('seattle'),
	node5 = graph.addNode('miami'),
	node6 = graph.addNode('juneau');

let bellman = new Graph(),
	a = bellman.addNode('a'),
	b = bellman.addNode('b'),
	c = bellman.addNode('c'),
	d = bellman.addNode('d'),
	e = bellman.addNode('e');

node1.addEdge(node2, 2);
node2.addEdge(node3, 1);
node2.addEdge(node4, 2);
node3.addEdge(node5, 3);
node4.addEdge(node6, 4);
node4.addEdge(node3, 1);

a.addEdge(b, 1);
b.addEdge(c, -1);
c.addEdge(d, -1);
c.addEdge(e, 1);
d.addEdge(b, -1);

assert.equal(graph.nodes.length, 6);
assert.equal(graph.dijkstra(node1, node3), 3);
assert.equal(graph.dijkstra(node1, node5), 6);
assert.equal(graph.bellmanFord(node1, node5), 6);
assert.equal(bellman.bellmanFord(a, e), null);
assert.equal(node1.adjList[0].name, 'chicago');

assert.deepEqual(
	node2.adjList.map(node => node.name), 
	['new york', 'seattle']
);

assert.deepEqual(
	graph.bfs().map(node => node.name), 
	['la', 'chicago', 'new york', 'seattle', 'miami', 'juneau']
);

assert.deepEqual(
	graph.dfs().map(node => node.name), 
	['la', 'chicago', 'seattle', 'juneau', 'new york', 'miami']
);

graph.removeNode(node1);
assert.equal(graph.nodes.length, 5);
