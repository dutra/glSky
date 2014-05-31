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

function isValidDate(d) {
    if ( Object.prototype.toString.call(d) !== "[object Date]" )
        return false;
    return !isNaN(d.getTime());
}

Date.prototype.getJulian = function() {
    return Math.floor((this / 86400000) -
                      (this.getTimezoneOffset()/1440) + 2440587.5);
}

// Add method to Date which returns the Local Side Real Time in Longitude given longitude
Date.prototype.getLocalSideRealInLng = function(longitude) {
    var s = this.getJulian() - 2451545;
    var t = s/36525;
    var t0 = 6.697374558 + (2400.051336 * t) + (0.000025862 * t * t);
    t0 = Math.abs(t0%24);

    var ut = this.getUTCHours() + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600;
    ut *= 1.002737909;
    var sidereal = ut+t0;
    sidereal = Math.abs(sidereal%24);

    var hourOffset = longitude / 360 * 24;
    sidereal += hourOffset;

    realHours = sidereal - sidereal%1;

    realMinutes = (sidereal%1)*60;
    return realHours/24*360+realMinutes/60;
}

Date.prototype.getLocalSideReal = function(longitude) {
    var s = this.getJulian() - 2451545;
    var t = s/36525;
    var t0 = 6.697374558 + (2400.051336 * t) + (0.000025862 * t * t);
    t0 = Math.abs(t0%24);
    var ut = this.getUTCHours() + this.getUTCMinutes()/60;
    ut *= 1.002737909;
    sidereal = ut+t0;
    sidereal = Math.abs(sidereal%24);
    var hourOffset = longitude / 360 * 24;
    sidereal += hourOffset;

    realHours = sidereal - sidereal%1;

    realMinutes = (sidereal%1)*60;
    return ""+realHours+"h "+realMinutes.toFixed(0)+"m";
}
