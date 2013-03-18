require.config({
    paths : {
        "assets"  : "../assets",
        "shaders" : "../assets/shaders",
        "vendor"  : "../vendor"
    }
});

define([
    "vendor/less-1.3.3.min",
    "vendor/jquery-1.9.1.min",
    "vendor/three.min"
],
function () {
    require(["three-test/three-test"]);
});
