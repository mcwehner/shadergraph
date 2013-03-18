define([
    "text!shaders/three-test/test.vert",
    "text!shaders/three-test/test.frag"
],
function (testVertexShader, testFragmentShader) {
    console.log("Started.");
    
    // set the scene size
    var WIDTH  = 400;
    var HEIGHT = 300;

    // set some camera attributes
    var VIEW_ANGLE = 45;
    var ASPECT     = WIDTH / HEIGHT;
    var NEAR       = 0.1;
    var FAR        = 10000;

    // get the DOM element to attach to
    // - assume we've got jQuery to hand
    var container = $('#container');

    // create a WebGL renderer, camera
    // and a scene
    var renderer = new THREE.WebGLRenderer();
    var camera   = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    var scene    = new THREE.Scene();

    // the camera starts at 0,0,0 so pull it back
    camera.position.z = 300;

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    container.append(renderer.domElement);
    
    
    // create the sphere's material
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xCC0000
    });
    
    
    var shaderMaterial = new THREE.ShaderMaterial({
        vertexShader   : testVertexShader,
        fragmentShader : testFragmentShader
    });
    
    
    // set up the sphere vars
    var radius   = 50;
    var segments = 16;
    var rings    = 16;

    // create a new mesh with sphere geometry -
    // we will cover the sphereMaterial next!
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, rings), shaderMaterial
    );

    // add the sphere to the scene
    scene.add(sphere);
    
    
    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // add to the scene
    scene.add(pointLight);
    
    
    renderer.render(scene, camera);
});
