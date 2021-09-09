function rec2pol(x,y) {
    var theta = Math.atan2(y, x); //Quadrant by signs
    if (theta > 0) {
        theta = (theta / Math.PI) * 180;
    } else {
        theta = 360 - (Math.abs(theta) / Math.PI) * 180;
    }
    var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    return pol = [d, theta];
}

function pol2rec(d, theta) {
    var x = Math.cos((theta * Math.PI / 180.0)) * d;
    var y = Math.sin((theta * Math.PI / 180.0)) * d;
    return rec = [x,y];
}