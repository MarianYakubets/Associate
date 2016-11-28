var TileAttribute = {
    COLOR: "color",
    FIXED: "fixed",
    TRIANGLED: "has 2 colors as triangles bottom right and top left"
};

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

var Screen = {
    MAX_ROWS: 10,
    MAX_COLUMNS: 8,
    MAX_TILE_SIZE: 156,
    RATIO: .75,
    PADDING_HEIGHT: 200
};