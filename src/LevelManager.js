var LevelManager = {
	levels: [
		'{"number":1, "w":3, "h":3, "tiles": [{"x":0,"y":0,"color":"none","mutable":true},{"x":0,"y":1,"color":"red","mutable":true},{"x":0,"y":2,"color":"red","mutable":true},{"x":1,"y":0,"color":"red","mutable":true},{"x":1,"y":1,"color":"blue","mutable":false},{"x":1,"y":2,"color":"red","mutable":true},{"x":2,"y":0,"color":"red","mutable":true},{"x":2,"y":1,"color":"red","mutable":true},{"x":2,"y":2,"color":"red","mutable":true}], "legend": [{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"blue"},{"x":0,"y":2,"color":"blue"},{"x":1,"y":0,"color":"blue"},{"x":1,"y":1,"color":"blue"},{"x":1,"y":2,"color":"blue"},{"x":2,"y":0,"color":"blue"},{"x":2,"y":1,"color":"blue"},{"x":2,"y":2,"color":"blue"}]}',
		'{"number":2, "w":3, "h":3, "tiles": [{"x":0,"y":0,"color":"red","mutable":true},{"x":0,"y":1,"color":"red","mutable":true},{"x":0,"y":2,"color":"red","mutable":true},{"x":1,"y":0,"color":"red","mutable":true},{"x":1,"y":1,"color":"blue","mutable":false},{"x":1,"y":2,"color":"red","mutable":true},{"x":2,"y":0,"color":"red","mutable":true},{"x":2,"y":1,"color":"red","mutable":true},{"x":2,"y":2,"color":"red","mutable":true}], "legend": [{"x":0,"y":0,"color":"yellow"},{"x":0,"y":1,"color":"yellow"},{"x":0,"y":2,"color":"yellow"},{"x":1,"y":0,"color":"yellow"},{"x":1,"y":1,"color":"yellow"},{"x":1,"y":2,"color":"yellow"},{"x":2,"y":0,"color":"yellow"},{"x":2,"y":1,"color":"yellow"},{"x":2,"y":2,"color":"yellow"}]}',
		'{"number":3, "w":3, "h":3, "tiles": [{"x":0,"y":0,"color":"red","mutable":true},{"x":0,"y":1,"color":"red","mutable":true},{"x":0,"y":2,"color":"red","mutable":true},{"x":1,"y":0,"color":"red","mutable":true},{"x":1,"y":1,"color":"blue","mutable":false},{"x":1,"y":2,"color":"red","mutable":true},{"x":2,"y":0,"color":"red","mutable":true},{"x":2,"y":1,"color":"red","mutable":true},{"x":2,"y":2,"color":"red","mutable":true}], "legend": [{"x":0,"y":0,"color":"blue"},{"x":0,"y":1,"color":"blue"},{"x":0,"y":2,"color":"blue"},{"x":1,"y":0,"color":"blue"},{"x":1,"y":1,"color":"blue"},{"x":1,"y":2,"color":"blue"},{"x":2,"y":0,"color":"blue"},{"x":2,"y":1,"color":"blue"},{"x":2,"y":2,"color":"blue"}]}',
		'{"number":4, "w":3, "h":3, "tiles": [{"x":0,"y":0,"color":"red","mutable":true},{"x":0,"y":1,"color":"red","mutable":true},{"x":0,"y":2,"color":"red","mutable":true},{"x":1,"y":0,"color":"red","mutable":true},{"x":1,"y":1,"color":"blue","mutable":false},{"x":1,"y":2,"color":"red","mutable":true},{"x":2,"y":0,"color":"red","mutable":true},{"x":2,"y":1,"color":"red","mutable":true},{"x":2,"y":2,"color":"red","mutable":true}], "legend": [{"x":0,"y":0,"color":"blue"},{"x":0,"y":1,"color":"blue"},{"x":0,"y":2,"color":"blue"},{"x":1,"y":0,"color":"blue"},{"x":1,"y":1,"color":"blue"},{"x":1,"y":2,"color":"blue"},{"x":2,"y":0,"color":"blue"},{"x":2,"y":1,"color":"blue"},{"x":2,"y":2,"color":"blue"}]}',
		'{"number":5, "w":3, "h":3, "tiles": [{"x":0,"y":0,"color":"red","mutable":true},{"x":0,"y":1,"color":"red","mutable":true},{"x":0,"y":2,"color":"red","mutable":true},{"x":1,"y":0,"color":"red","mutable":true},{"x":1,"y":1,"color":"blue","mutable":false},{"x":1,"y":2,"color":"red","mutable":true},{"x":2,"y":0,"color":"red","mutable":true},{"x":2,"y":1,"color":"red","mutable":true},{"x":2,"y":2,"color":"red","mutable":true}], "legend": [{"x":0,"y":0,"color":"blue"},{"x":0,"y":1,"color":"blue"},{"x":0,"y":2,"color":"blue"},{"x":1,"y":0,"color":"blue"},{"x":1,"y":1,"color":"blue"},{"x":1,"y":2,"color":"blue"},{"x":2,"y":0,"color":"blue"},{"x":2,"y":1,"color":"blue"},{"x":2,"y":2,"color":"blue"}]}'

	],

	getLevel: function(number) {
		number--;
		console.log("level number " + number);
		return this.levels[number];
	}
};