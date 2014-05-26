// convert the positions from a lat, lon to a position on a sphere.
function latLongToVector3(lat, lon, radius, height) {
    height = height || 0;
    // x-axis goes through long,lat (0,0) so longitude 0 meets equator
    // y-axis goes through (0,90)
    // z-axis goes through poles

    // convert to radians
    var lat = (lat)*Math.PI/180.0;
    var lon = (lon)*Math.PI/180.0;

    var x = (radius+height) * Math.cos(lat) * Math.cos(lon);
    var y = (radius+height) * Math.cos(lat) * Math.sin(lon);
    var z = (radius+height) * Math.sin(lat);

    return new THREE.Vector3(x,y,z);
}


// convert a vector direction to lat, long

function vector3ToLatLong(direction) {
    var R = Math.sqrt(direction.x*direction.x + direction.y*direction.y + direction.z*direction.z)
    var lon = Math.atan2(direction.y, direction.x)
    var lat = Math.asin(direction.z / R)

    return [radiansToDegrees(lat), radiansToDegrees(lon)]
}

function radiansToDegrees(radians) {
    return radians*180 / Math.PI;
}
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}
    
