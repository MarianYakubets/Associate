var LevelManager = {
    levels: [{"number":0,"w":7,"h":8,"tiles":[{"x":0,"y":0,"color":"grey","mutable":true},{"x":1,"y":0,"color":"grey","mutable":true},{"x":2,"y":0,"color":"grey","mutable":true},{"x":0,"y":1,"color":"grey","mutable":true},{"x":1,"y":1,"color":"grey","mutable":true},{"x":2,"y":1,"color":"grey","mutable":true},{"x":0,"y":2,"color":"grey","mutable":true},{"x":1,"y":2,"color":"grey","mutable":true},{"x":2,"y":2,"color":"grey","mutable":true},{"x":0,"y":3,"color":"grey","mutable":true},{"x":1,"y":3,"color":"grey","mutable":true},{"x":2,"y":3,"color":"grey","mutable":true},{"x":3,"y":0,"color":"grey","mutable":true},{"x":3,"y":1,"color":"grey","mutable":true},{"x":3,"y":2,"color":"grey","mutable":true},{"x":3,"y":3,"color":"grey","mutable":true},{"x":4,"y":0,"color":"grey","mutable":true},{"x":4,"y":1,"color":"grey","mutable":true},{"x":4,"y":2,"color":"grey","mutable":true},{"x":4,"y":3,"color":"grey","mutable":true},{"x":5,"y":0,"color":"grey","mutable":true},{"x":5,"y":1,"color":"grey","mutable":true},{"x":5,"y":2,"color":"grey","mutable":true},{"x":5,"y":3,"color":"grey","mutable":true},{"x":6,"y":0,"color":"grey","mutable":true},{"x":6,"y":1,"color":"grey","mutable":true},{"x":6,"y":2,"color":"grey","mutable":true},{"x":6,"y":3,"color":"grey","mutable":true},{"x":0,"y":4,"color":"grey","mutable":true},{"x":1,"y":4,"color":"grey","mutable":true},{"x":2,"y":4,"color":"grey","mutable":true},{"x":3,"y":4,"color":"grey","mutable":true},{"x":4,"y":4,"color":"grey","mutable":true},{"x":5,"y":4,"color":"grey","mutable":true},{"x":6,"y":4,"color":"grey","mutable":true},{"x":0,"y":5,"color":"grey","mutable":true},{"x":1,"y":5,"color":"grey","mutable":true},{"x":2,"y":5,"color":"grey","mutable":true},{"x":3,"y":5,"color":"grey","mutable":true},{"x":4,"y":5,"color":"grey","mutable":true},{"x":5,"y":5,"color":"grey","mutable":true},{"x":6,"y":5,"color":"grey","mutable":true},{"x":0,"y":6,"color":"grey","mutable":true},{"x":1,"y":6,"color":"grey","mutable":true},{"x":2,"y":6,"color":"grey","mutable":true},{"x":3,"y":6,"color":"grey","mutable":true},{"x":4,"y":6,"color":"grey","mutable":true},{"x":5,"y":6,"color":"grey","mutable":true},{"x":6,"y":6,"color":"grey","mutable":true},{"x":0,"y":7,"color":"grey","mutable":true},{"x":1,"y":7,"color":"grey","mutable":true},{"x":2,"y":7,"color":"grey","mutable":true},{"x":3,"y":7,"color":"grey","mutable":true},{"x":4,"y":7,"color":"grey","mutable":true},{"x":5,"y":7,"color":"grey","mutable":true},{"x":6,"y":7,"color":"grey","mutable":true}],"legend":[{"x":0,"y":0,"color":"grey"},{"x":1,"y":0,"color":"grey","mutable":true},{"x":2,"y":0,"color":"grey","mutable":true},{"x":0,"y":1,"color":"grey","mutable":true},{"x":1,"y":1,"color":"grey","mutable":true},{"x":2,"y":1,"color":"grey","mutable":true},{"x":0,"y":2,"color":"grey","mutable":true},{"x":1,"y":2,"color":"grey","mutable":true},{"x":2,"y":2,"color":"grey","mutable":true},{"x":0,"y":3,"color":"grey","mutable":true},{"x":1,"y":3,"color":"grey","mutable":true},{"x":2,"y":3,"color":"grey","mutable":true},{"x":3,"y":0,"color":"grey","mutable":true},{"x":3,"y":1,"color":"grey","mutable":true},{"x":3,"y":2,"color":"grey","mutable":true},{"x":3,"y":3,"color":"grey","mutable":true},{"x":4,"y":0,"color":"grey","mutable":true},{"x":4,"y":1,"color":"grey","mutable":true},{"x":4,"y":2,"color":"grey","mutable":true},{"x":4,"y":3,"color":"grey","mutable":true},{"x":5,"y":0,"color":"grey","mutable":true},{"x":5,"y":1,"color":"grey","mutable":true},{"x":5,"y":2,"color":"grey","mutable":true},{"x":5,"y":3,"color":"grey","mutable":true},{"x":6,"y":0,"color":"grey","mutable":true},{"x":6,"y":1,"color":"grey","mutable":true},{"x":6,"y":2,"color":"grey","mutable":true},{"x":6,"y":3,"color":"grey","mutable":true},{"x":0,"y":4,"color":"grey","mutable":true},{"x":1,"y":4,"color":"grey","mutable":true},{"x":2,"y":4,"color":"grey","mutable":true},{"x":3,"y":4,"color":"grey","mutable":true},{"x":4,"y":4,"color":"grey","mutable":true},{"x":5,"y":4,"color":"grey","mutable":true},{"x":6,"y":4,"color":"grey","mutable":true},{"x":0,"y":5,"color":"grey","mutable":true},{"x":1,"y":5,"color":"grey","mutable":true},{"x":2,"y":5,"color":"grey","mutable":true},{"x":3,"y":5,"color":"grey","mutable":true},{"x":4,"y":5,"color":"grey","mutable":true},{"x":5,"y":5,"color":"grey","mutable":true},{"x":6,"y":5,"color":"grey","mutable":true},{"x":0,"y":6,"color":"grey","mutable":true},{"x":1,"y":6,"color":"grey","mutable":true},{"x":2,"y":6,"color":"grey","mutable":true},{"x":3,"y":6,"color":"grey","mutable":true},{"x":4,"y":6,"color":"grey","mutable":true},{"x":5,"y":6,"color":"grey","mutable":true},{"x":6,"y":6,"color":"grey","mutable":true},{"x":0,"y":7,"color":"grey","mutable":true},{"x":1,"y":7,"color":"grey","mutable":true},{"x":2,"y":7,"color":"grey","mutable":true},{"x":3,"y":7,"color":"grey","mutable":true},{"x":4,"y":7,"color":"grey","mutable":true},{"x":5,"y":7,"color":"grey","mutable":true},{"x":6,"y":7,"color":"grey","mutable":true}]},{"number":1,"w":4,"h":5,"tiles":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"none","grass":false},{"x":1,"y":2,"color":"blue","grass":true},{"x":1,"y":3,"color":"none"},{"x":1,"y":4,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"none"},{"x":2,"y":2,"color":"yellow"},{"x":2,"y":3,"color":"none"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"none"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"legend":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"none","grass":false},{"x":1,"y":2,"color":"none","grass":true},{"x":1,"y":3,"color":"none"},{"x":1,"y":4,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"none"},{"x":2,"y":2,"color":"blue"},{"x":2,"y":3,"color":"none"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"none"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"star":{"three":4,"two":6,"one":8}},{"number":2,"w":4,"h":5,"tiles":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"none","grass":true},{"x":1,"y":2,"color":"green"},{"x":1,"y":3,"color":"none"},{"x":1,"y":4,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"yellow"},{"x":2,"y":2,"color":"blue","egg":true},{"x":2,"y":3,"color":"none"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"none"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"legend":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"none"},{"x":1,"y":2,"color":"blue"},{"x":1,"y":3,"color":"none"},{"x":1,"y":4,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"blue"},{"x":2,"y":2,"color":"blue"},{"x":2,"y":3,"color":"none"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"none"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"star":{"three":4,"two":6,"one":8}},{"number":3,"w":4,"h":5,"tiles":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"blue"},{"x":1,"y":2,"color":"none"},{"x":1,"y":3,"color":"none"},{"x":1,"y":4,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"yellow"},{"x":2,"y":2,"color":"yellow"},{"x":2,"y":3,"color":"yellow"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"none"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"legend":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"blue"},{"x":1,"y":2,"color":"none"},{"x":1,"y":3,"color":"none"},{"x":1,"y":4,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"blue"},{"x":2,"y":2,"color":"blue"},{"x":2,"y":3,"color":"blue"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"none"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"star":{"three":4,"two":6,"one":8}},{"number":4,"w":4,"h":5,"tiles":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"yellow"},{"x":1,"y":2,"color":"none"},{"x":1,"y":3,"color":"blue"},{"x":1,"y":4,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"yellow"},{"x":2,"y":2,"color":"yellow"},{"x":2,"y":3,"color":"yellow"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"none"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"legend":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"blue"},{"x":1,"y":2,"color":"none"},{"x":1,"y":3,"color":"blue"},{"x":1,"y":4,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"blue"},{"x":2,"y":2,"color":"blue"},{"x":2,"y":3,"color":"blue"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"none"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"star":{"three":6,"two":8,"one":20}},{"number":5,"w":4,"h":5,"tiles":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"none"},{"x":1,"y":2,"color":"yellow"},{"x":1,"y":3,"color":"blue"},{"x":1,"y":4,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"yellow"},{"x":2,"y":2,"color":"yellow"},{"x":2,"y":3,"color":"none"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"none"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"legend":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"none"},{"x":1,"y":2,"color":"blue"},{"x":1,"y":3,"color":"none"},{"x":1,"y":4,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"blue"},{"x":2,"y":2,"color":"blue"},{"x":2,"y":3,"color":"none"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"none"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"star":{"three":4,"two":6,"one":8}},{"number":6,"w":4,"h":5,"tiles":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"red"},{"x":0,"y":4,"color":"green"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"green"},{"x":1,"y":2,"color":"blue","lock":true},{"x":1,"y":3,"color":"red"},{"x":1,"y":4,"color":"green"},{"x":2,"y":0,"color":"yellow"},{"x":2,"y":1,"color":"yellow"},{"x":2,"y":2,"color":"none"},{"x":2,"y":3,"color":"none"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"red"},{"x":3,"y":1,"color":"grey"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"legend":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"blue"},{"x":0,"y":4,"color":"blue"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"blue"},{"x":1,"y":2,"color":"blue"},{"x":1,"y":3,"color":"blue"},{"x":1,"y":4,"color":"blue"},{"x":2,"y":0,"color":"blue"},{"x":2,"y":1,"color":"blue"},{"x":2,"y":2,"color":"none"},{"x":2,"y":3,"color":"none"},{"x":2,"y":4,"color":"none"},{"x":3,"y":0,"color":"blue"},{"x":3,"y":1,"color":"blue"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"star":{"three":7,"two":9,"one":15}},{"number":7,"w":4,"h":5,"tiles":[{"x":0,"y":0,"color":"red"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"yellow"},{"x":0,"y":4,"color":"yellow"},{"x":1,"y":0,"color":"red"},{"x":1,"y":1,"color":"none"},{"x":1,"y":2,"color":"none"},{"x":1,"y":3,"color":"blue","lock":true},{"x":1,"y":4,"color":"blue","lock":true},{"x":2,"y":0,"color":"blue"},{"x":2,"y":1,"color":"grey"},{"x":2,"y":2,"color":"orange"},{"x":2,"y":3,"color":"blue","lock":true},{"x":2,"y":4,"color":"blue","lock":true},{"x":3,"y":0,"color":"green"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"yellow","egg":true},{"x":3,"y":4,"color":"yellow","grass":true}],"legend":[{"x":0,"y":0,"color":"yellow"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"blue"},{"x":0,"y":4,"color":"blue"},{"x":1,"y":0,"color":"yellow"},{"x":1,"y":1,"color":"none"},{"x":1,"y":2,"color":"none"},{"x":1,"y":3,"color":"blue"},{"x":1,"y":4,"color":"blue"},{"x":2,"y":0,"color":"blue"},{"x":2,"y":1,"color":"blue"},{"x":2,"y":2,"color":"blue"},{"x":2,"y":3,"color":"blue"},{"x":2,"y":4,"color":"blue"},{"x":3,"y":0,"color":"yellow"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"yellow"},{"x":3,"y":4,"color":"none"}],"star":{"three":12,"two":18,"one":22}},{"number":8,"w":4,"h":4,"tiles":[{"x":0,"y":0,"color":"grey"},{"x":1,"y":0,"color":"grey"},{"x":2,"y":0,"color":"green"},{"x":0,"y":1,"color":"grey"},{"x":1,"y":1,"color":"grey"},{"x":2,"y":1,"color":"green"},{"x":0,"y":2,"color":"grey"},{"x":1,"y":2,"color":"grey"},{"x":2,"y":2,"color":"grey"},{"x":0,"y":3,"color":"yellow"},{"x":1,"y":3,"color":"grey"},{"x":2,"y":3,"color":"grey"},{"x":3,"y":0,"color":"green"},{"x":3,"y":1,"color":"green"},{"x":3,"y":2,"color":"grey"},{"x":3,"y":3,"color":"grey"}],"legend":[{"x":0,"y":0,"color":"yellow"},{"x":1,"y":0,"color":"yellow"},{"x":2,"y":0,"color":"yellow"},{"x":0,"y":1,"color":"yellow"},{"x":1,"y":1,"color":"yellow"},{"x":2,"y":1,"color":"yellow"},{"x":0,"y":2,"color":"yellow"},{"x":1,"y":2,"color":"yellow"},{"x":2,"y":2,"color":"yellow"},{"x":0,"y":3,"color":"yellow"},{"x":1,"y":3,"color":"yellow"},{"x":2,"y":3,"color":"yellow"},{"x":3,"y":0,"color":"yellow"},{"x":3,"y":1,"color":"yellow"},{"x":3,"y":2,"color":"yellow"},{"x":3,"y":3,"color":"yellow"}],"star":{"three":4,"two":6,"one":8}},{"number":9,"w":8,"h":10,"tiles":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":0,"y":5,"color":"none"},{"x":0,"y":6,"color":"none"},{"x":0,"y":7,"color":"none"},{"x":0,"y":8,"color":"none"},{"x":0,"y":9,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"none"},{"x":1,"y":2,"color":"none"},{"x":1,"y":3,"color":"none"},{"x":1,"y":4,"color":"none"},{"x":1,"y":5,"color":"none"},{"x":1,"y":6,"color":"none"},{"x":1,"y":7,"color":"none"},{"x":1,"y":8,"color":"none"},{"x":1,"y":9,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"none"},{"x":2,"y":2,"color":"none"},{"x":2,"y":3,"color":"none"},{"x":2,"y":4,"color":"blue"},{"x":2,"y":5,"color":"none"},{"x":2,"y":6,"color":"none"},{"x":2,"y":7,"color":"none"},{"x":2,"y":8,"color":"none"},{"x":2,"y":9,"color":"none"},{"x":3,"y":0,"color":"yellow","lock":true},{"x":3,"y":1,"color":"green"},{"x":3,"y":2,"color":"green"},{"x":3,"y":3,"color":"yellow"},{"x":3,"y":4,"color":"green"},{"x":3,"y":5,"color":"green"},{"x":3,"y":6,"color":"grey"},{"x":3,"y":7,"color":"yellow"},{"x":3,"y":8,"color":"yellow"},{"x":3,"y":9,"color":"red","lock":true},{"x":4,"y":0,"color":"yellow"},{"x":4,"y":1,"color":"green"},{"x":4,"y":2,"color":"yellow"},{"x":4,"y":3,"color":"green"},{"x":4,"y":4,"color":"green"},{"x":4,"y":5,"color":"green"},{"x":4,"y":6,"color":"yellow"},{"x":4,"y":7,"color":"red"},{"x":4,"y":8,"color":"yellow"},{"x":4,"y":9,"color":"yellow"},{"x":5,"y":0,"color":"green","lock":true},{"x":5,"y":1,"color":"yellow"},{"x":5,"y":2,"color":"green"},{"x":5,"y":3,"color":"green"},{"x":5,"y":4,"color":"yellow"},{"x":5,"y":5,"color":"green"},{"x":5,"y":6,"color":"grey"},{"x":5,"y":7,"color":"grey","lock":true},{"x":5,"y":8,"color":"grey"},{"x":5,"y":9,"color":"red"},{"x":6,"y":0,"color":"none"},{"x":6,"y":1,"color":"none"},{"x":6,"y":2,"color":"none"},{"x":6,"y":3,"color":"none"},{"x":6,"y":4,"color":"none"},{"x":6,"y":5,"color":"none"},{"x":6,"y":6,"color":"none"},{"x":6,"y":7,"color":"none"},{"x":6,"y":8,"color":"none"},{"x":6,"y":9,"color":"none"},{"x":7,"y":0,"color":"none"},{"x":7,"y":1,"color":"none"},{"x":7,"y":2,"color":"none"},{"x":7,"y":3,"color":"none"},{"x":7,"y":4,"color":"none"},{"x":7,"y":5,"color":"none"},{"x":7,"y":6,"color":"none"},{"x":7,"y":7,"color":"none"},{"x":7,"y":8,"color":"none"},{"x":7,"y":9,"color":"none"}],"legend":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"none"},{"x":0,"y":5,"color":"none"},{"x":0,"y":6,"color":"none"},{"x":0,"y":7,"color":"none"},{"x":0,"y":8,"color":"none"},{"x":0,"y":9,"color":"none"},{"x":1,"y":0,"color":"none"},{"x":1,"y":1,"color":"none"},{"x":1,"y":2,"color":"none"},{"x":1,"y":3,"color":"none"},{"x":1,"y":4,"color":"none"},{"x":1,"y":5,"color":"none"},{"x":1,"y":6,"color":"none"},{"x":1,"y":7,"color":"none"},{"x":1,"y":8,"color":"none"},{"x":1,"y":9,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"none"},{"x":2,"y":2,"color":"none"},{"x":2,"y":3,"color":"none"},{"x":2,"y":4,"color":"blue"},{"x":2,"y":5,"color":"none"},{"x":2,"y":6,"color":"none"},{"x":2,"y":7,"color":"none"},{"x":2,"y":8,"color":"none"},{"x":2,"y":9,"color":"none"},{"x":3,"y":0,"color":"blue"},{"x":3,"y":1,"color":"blue"},{"x":3,"y":2,"color":"blue"},{"x":3,"y":3,"color":"blue"},{"x":3,"y":4,"color":"blue"},{"x":3,"y":5,"color":"blue"},{"x":3,"y":6,"color":"blue"},{"x":3,"y":7,"color":"blue"},{"x":3,"y":8,"color":"blue"},{"x":3,"y":9,"color":"blue"},{"x":4,"y":0,"color":"blue"},{"x":4,"y":1,"color":"blue"},{"x":4,"y":2,"color":"blue"},{"x":4,"y":3,"color":"blue"},{"x":4,"y":4,"color":"blue"},{"x":4,"y":5,"color":"blue"},{"x":4,"y":6,"color":"blue"},{"x":4,"y":7,"color":"blue"},{"x":4,"y":8,"color":"blue"},{"x":4,"y":9,"color":"blue"},{"x":5,"y":0,"color":"blue"},{"x":5,"y":1,"color":"blue"},{"x":5,"y":2,"color":"blue"},{"x":5,"y":3,"color":"blue"},{"x":5,"y":4,"color":"blue"},{"x":5,"y":5,"color":"blue"},{"x":5,"y":6,"color":"blue"},{"x":5,"y":7,"color":"blue"},{"x":5,"y":8,"color":"blue"},{"x":5,"y":9,"color":"blue"},{"x":6,"y":0,"color":"none"},{"x":6,"y":1,"color":"none"},{"x":6,"y":2,"color":"none"},{"x":6,"y":3,"color":"none"},{"x":6,"y":4,"color":"none"},{"x":6,"y":5,"color":"none"},{"x":6,"y":6,"color":"none"},{"x":6,"y":7,"color":"none"},{"x":6,"y":8,"color":"none"},{"x":6,"y":9,"color":"none"},{"x":7,"y":0,"color":"none"},{"x":7,"y":1,"color":"none"},{"x":7,"y":2,"color":"none"},{"x":7,"y":3,"color":"none"},{"x":7,"y":4,"color":"none"},{"x":7,"y":5,"color":"none"},{"x":7,"y":6,"color":"none"},{"x":7,"y":7,"color":"none"},{"x":7,"y":8,"color":"none"},{"x":7,"y":9,"color":"none"}],"star":{"three":4,"two":6,"one":8}},{"number":10,"w":4,"h":4,"tiles":[{"x":0,"y":0,"color":"grey"},{"x":1,"y":0,"color":"grey"},{"x":2,"y":0,"color":"green"},{"x":0,"y":1,"color":"grey"},{"x":1,"y":1,"color":"grey"},{"x":2,"y":1,"color":"green"},{"x":0,"y":2,"color":"grey"},{"x":1,"y":2,"color":"grey"},{"x":2,"y":2,"color":"grey"},{"x":0,"y":3,"color":"yellow"},{"x":1,"y":3,"color":"grey"},{"x":2,"y":3,"color":"grey"},{"x":3,"y":0,"color":"green"},{"x":3,"y":1,"color":"green"},{"x":3,"y":2,"color":"grey"},{"x":3,"y":3,"color":"grey"}],"legend":[{"x":0,"y":0,"color":"yellow"},{"x":1,"y":0,"color":"yellow"},{"x":2,"y":0,"color":"yellow"},{"x":0,"y":1,"color":"yellow"},{"x":1,"y":1,"color":"yellow"},{"x":2,"y":1,"color":"yellow"},{"x":0,"y":2,"color":"yellow"},{"x":1,"y":2,"color":"yellow"},{"x":2,"y":2,"color":"yellow"},{"x":0,"y":3,"color":"yellow"},{"x":1,"y":3,"color":"yellow"},{"x":2,"y":3,"color":"yellow"},{"x":3,"y":0,"color":"yellow"},{"x":3,"y":1,"color":"yellow"},{"x":3,"y":2,"color":"yellow"},{"x":3,"y":3,"color":"yellow"}],"star":{"three":4,"two":6,"one":8}},{"number":11,"w":4,"h":4,"tiles":[{"x":0,"y":0,"color":"grey"},{"x":1,"y":0,"color":"grey"},{"x":2,"y":0,"color":"green"},{"x":0,"y":1,"color":"grey"},{"x":1,"y":1,"color":"grey"},{"x":2,"y":1,"color":"green"},{"x":0,"y":2,"color":"grey"},{"x":1,"y":2,"color":"grey"},{"x":2,"y":2,"color":"grey"},{"x":0,"y":3,"color":"yellow","egg":true},{"x":1,"y":3,"color":"grey"},{"x":2,"y":3,"color":"grey"},{"x":3,"y":0,"color":"green"},{"x":3,"y":1,"color":"green"},{"x":3,"y":2,"color":"grey"},{"x":3,"y":3,"color":"grey"}],"legend":[{"x":0,"y":0,"color":"yellow"},{"x":1,"y":0,"color":"yellow"},{"x":2,"y":0,"color":"yellow"},{"x":0,"y":1,"color":"yellow"},{"x":1,"y":1,"color":"yellow"},{"x":2,"y":1,"color":"yellow"},{"x":0,"y":2,"color":"yellow"},{"x":1,"y":2,"color":"yellow"},{"x":2,"y":2,"color":"yellow"},{"x":0,"y":3,"color":"none"},{"x":1,"y":3,"color":"yellow"},{"x":2,"y":3,"color":"yellow"},{"x":3,"y":0,"color":"yellow"},{"x":3,"y":1,"color":"yellow"},{"x":3,"y":2,"color":"yellow"},{"x":3,"y":3,"color":"yellow"}],"star":{"three":6,"two":8,"one":10}},{"number":12,"w":4,"h":5,"tiles":[{"x":0,"y":0,"color":"none","egg":false},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"red","egg":false},{"x":1,"y":0,"color":"green"},{"x":1,"y":1,"color":"yellow"},{"x":1,"y":2,"color":"red"},{"x":1,"y":3,"color":"red"},{"x":1,"y":4,"color":"green","egg":false},{"x":2,"y":0,"color":"blue"},{"x":2,"y":1,"color":"blue"},{"x":2,"y":2,"color":"blue"},{"x":2,"y":3,"color":"green"},{"x":2,"y":4,"color":"grey"},{"x":3,"y":0,"color":"red"},{"x":3,"y":1,"color":"red"},{"x":3,"y":2,"color":"yellow"},{"x":3,"y":3,"color":"orange"},{"x":3,"y":4,"color":"green"}],"legend":[{"x":0,"y":0,"color":"none"},{"x":0,"y":1,"color":"none"},{"x":0,"y":2,"color":"none"},{"x":0,"y":3,"color":"none"},{"x":0,"y":4,"color":"blue"},{"x":1,"y":0,"color":"grey"},{"x":1,"y":1,"color":"none"},{"x":1,"y":2,"color":"none"},{"x":1,"y":3,"color":"none"},{"x":1,"y":4,"color":"none"},{"x":2,"y":0,"color":"none"},{"x":2,"y":1,"color":"none"},{"x":2,"y":2,"color":"none"},{"x":2,"y":3,"color":"none"},{"x":2,"y":4,"color":"orange"},{"x":3,"y":0,"color":"red"},{"x":3,"y":1,"color":"none"},{"x":3,"y":2,"color":"none"},{"x":3,"y":3,"color":"none"},{"x":3,"y":4,"color":"none"}],"star":{"three":14,"two":12,"one":11}},null,null,null,null,{"number":"17","w":6,"h":5,"tiles":[{"x":0,"y":0,"color":"grey"},{"x":1,"y":0,"color":"grey"},{"x":2,"y":0,"color":"grey"},{"x":0,"y":1,"color":"blue"},{"x":1,"y":1,"color":"blue"},{"x":2,"y":1,"color":"grey"},{"x":0,"y":2,"color":"grey"},{"x":1,"y":2,"color":"grey"},{"x":2,"y":2,"color":"grey"},{"x":0,"y":3,"color":"grey"},{"x":1,"y":3,"color":"red"},{"x":2,"y":3,"color":"grey"},{"x":3,"y":0,"color":"grey"},{"x":3,"y":1,"color":"grey"},{"x":3,"y":2,"color":"grey"},{"x":3,"y":3,"color":"grey"},{"x":4,"y":0,"color":"yellow"},{"x":4,"y":1,"color":"yellow"},{"x":4,"y":2,"color":"grey"},{"x":4,"y":3,"color":"grey"},{"x":5,"y":0,"color":"grey"},{"x":5,"y":1,"color":"grey"},{"x":5,"y":2,"color":"green"},{"x":5,"y":3,"color":"green"},{"x":0,"y":4,"color":"grey"},{"x":1,"y":4,"color":"red"},{"x":2,"y":4,"color":"grey"},{"x":3,"y":4,"color":"grey"},{"x":4,"y":4,"color":"grey"},{"x":5,"y":4,"color":"grey"}],"legend":[{"x":0,"y":0,"color":"green"},{"x":1,"y":0,"color":"green"},{"x":2,"y":0,"color":"green"},{"x":0,"y":1,"color":"blue"},{"x":1,"y":1,"color":"blue"},{"x":2,"y":1,"color":"blue"},{"x":0,"y":2,"color":"red"},{"x":1,"y":2,"color":"red"},{"x":2,"y":2,"color":"red"},{"x":0,"y":3,"color":"yellow"},{"x":1,"y":3,"color":"yellow"},{"x":2,"y":3,"color":"yellow"},{"x":3,"y":0,"color":"green"},{"x":3,"y":1,"color":"blue"},{"x":3,"y":2,"color":"red"},{"x":3,"y":3,"color":"yellow"},{"x":4,"y":0,"color":"green"},{"x":4,"y":1,"color":"blue"},{"x":4,"y":2,"color":"red"},{"x":4,"y":3,"color":"yellow"},{"x":5,"y":0,"color":"green"},{"x":5,"y":1,"color":"blue"},{"x":5,"y":2,"color":"red"},{"x":5,"y":3,"color":"yellow"},{"x":0,"y":4,"color":"grey"},{"x":1,"y":4,"color":"grey"},{"x":2,"y":4,"color":"grey"},{"x":3,"y":4,"color":"grey"},{"x":4,"y":4,"color":"grey"},{"x":5,"y":4,"color":"grey"}]},null,{"number":19,"w":6,"h":5,"tiles":[{"x":0,"y":0,"color":"grey"},{"x":1,"y":0,"color":"grey"},{"x":2,"y":0,"color":"grey"},{"x":0,"y":1,"color":"blue"},{"x":1,"y":1,"color":"blue"},{"x":2,"y":1,"color":"grey"},{"x":0,"y":2,"color":"grey"},{"x":1,"y":2,"color":"grey"},{"x":2,"y":2,"color":"grey"},{"x":0,"y":3,"color":"grey"},{"x":1,"y":3,"color":"red"},{"x":2,"y":3,"color":"grey"},{"x":3,"y":0,"color":"grey"},{"x":3,"y":1,"color":"grey"},{"x":3,"y":2,"color":"grey"},{"x":3,"y":3,"color":"grey"},{"x":4,"y":0,"color":"yellow"},{"x":4,"y":1,"color":"yellow"},{"x":4,"y":2,"color":"grey"},{"x":4,"y":3,"color":"grey"},{"x":5,"y":0,"color":"grey"},{"x":5,"y":1,"color":"grey"},{"x":5,"y":2,"color":"green"},{"x":5,"y":3,"color":"green"},{"x":0,"y":4,"color":"grey"},{"x":1,"y":4,"color":"red"},{"x":2,"y":4,"color":"grey"},{"x":3,"y":4,"color":"grey"},{"x":4,"y":4,"color":"grey"},{"x":5,"y":4,"color":"grey"}],"legend":[{"x":0,"y":0,"color":"green"},{"x":1,"y":0,"color":"green"},{"x":2,"y":0,"color":"green"},{"x":0,"y":1,"color":"blue"},{"x":1,"y":1,"color":"blue"},{"x":2,"y":1,"color":"blue"},{"x":0,"y":2,"color":"red"},{"x":1,"y":2,"color":"red"},{"x":2,"y":2,"color":"red"},{"x":0,"y":3,"color":"yellow"},{"x":1,"y":3,"color":"yellow"},{"x":2,"y":3,"color":"yellow"},{"x":3,"y":0,"color":"green"},{"x":3,"y":1,"color":"blue"},{"x":3,"y":2,"color":"red"},{"x":3,"y":3,"color":"yellow"},{"x":4,"y":0,"color":"green"},{"x":4,"y":1,"color":"blue"},{"x":4,"y":2,"color":"red"},{"x":4,"y":3,"color":"yellow"},{"x":5,"y":0,"color":"green"},{"x":5,"y":1,"color":"blue"},{"x":5,"y":2,"color":"red"},{"x":5,"y":3,"color":"yellow"},{"x":0,"y":4,"color":"grey"},{"x":1,"y":4,"color":"grey"},{"x":2,"y":4,"color":"grey"},{"x":3,"y":4,"color":"grey"},{"x":4,"y":4,"color":"grey"},{"x":5,"y":4,"color":"grey"}]}],

    syncLevels: function () {
        //LevelManager.levels.splice(0, 0, JSON.parse(this.zeroLevel));
        firebase.database().ref('levels').once('value').then(function (snapshot) {
            Object.keys(snapshot.val()).forEach(function (key) {
                var level = JSON.parse(snapshot.val()[key]);
                LevelManager.levels[level.number] = level;
            }, this);
            //console.log(JSON.stringify(LevelManager.levels));
        });
    },

    getLevel: function (number) {
        var level;
        if (this.levels[number] == null) {
            level = this.levels[0];
        } else {
            level = this.levels[number];
        }
        level.number = number;
        return level;
    }
};