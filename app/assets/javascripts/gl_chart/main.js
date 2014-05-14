
var scene, camera, renderer, clock, controls, scale;

var geometry, material, cube;
var stars = [];

function init() {

    scene = new THREE.Scene();
    scale = window.innerWidth / window.innerWidth;
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    //    camera = new THREE.OrthographicCamera( 10/-2, 10/2, 10/2, 10/-2, 1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera.position.z = 5;

    controls = new THREE.TrackballControls(camera);
    controls.noPan = true;
    controls.noRoll = true;
    controls.zoomSpeed = -0.4;
    controls.dynamicDampingFactor = 0.6;

    clock = new THREE.Clock();

    generate_stars();

    for (var i = 0; i < stars.length; i++) {
        scene.add( stars[i] );
    }

    geometry = new THREE.CubeGeometry(1,1,1);
    material = new THREE.MeshBasicMaterial( { color: 0x002766 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );


}

function generate_stars() {
    var geom = new THREE.Geometry();

    for (var i = 0; i < 36; i++) {
        for (var j = 0; j < 18; j++) {
            var geometry = new THREE.SphereGeometry( 0.01, 8, 6 );
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
            var sphere = new THREE.Mesh( geometry, material );
            sphere.position = latLongToVector3(i*10.0, j*10.0, 10);

            //      console.log(sphere.position);
            stars.push(sphere);
        }
        console.log(i);
    }

}

function render() {
    requestAnimationFrame(render);

    // Fetch the delta from THREE.js' clock.
    var delta = clock.getDelta();
    // Pass it to the camera controller.
    controls.update(delta);


    renderer.render(scene, camera);
}


init();
render();
