function findColor (index) {
    var colors = ["red", "yellow", "green", "blue", "cyan", "white"];
    return colors[index % colors.length];
}

exports.findColor = findColor;
