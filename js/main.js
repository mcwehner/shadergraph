require.config({
    paths : {
        "assets"    : "../assets",
        "shaders"   : "../assets/shaders",
        "templates" : "../templates",
        "vendor"    : "../vendor"
    }
});

define([
    "vendor/less-1.3.3.min",
    "vendor/ejs_production.js",
    "vendor/jquery-1.9.1.min",
    "vendor/three.min"
],
function () {
    require([
        "panel-group",
        "preview"
    ],
    function (PanelGroup, PreviewPanel) {
        var panelGroup = new PanelGroup([
            new PreviewPanel()
        ]);
        
        panelGroup.render( $("body") );
    });
});
