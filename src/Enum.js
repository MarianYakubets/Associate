var Color = {
    RED: "red",
    YELLOW: "yellow",
    BLUE: "blue",
    GREEN: "green",
    GREY: "grey",
    ORANGE: "orange",
    NONE: "none"
};

var ColorToFrame = {
    "red": 0,
    "yellow": 4,
    "blue": 2,
    "orange": 8,
    "green": 6,
    "grey": 10
};


var ColorToTint = {
    "red": 0xFF0000,
    "yellow": 0xFFFF00,
    "blue": 0x0080FF,
    "orange": 0xFF8000,
    "green": 0x00FF00,
    "grey": 0x7F00FF
};

var Screen = {
    MAX_ROWS: 8,
    MAX_COLUMNS: 6,
    MAX_TILE_SIZE: 156,
    RATIO: .75,
    PADDING_HEIGHT: 200
};