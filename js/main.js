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
        "panels/panel-group",   // PanelGroup
        "panels/preview",       // PreviewPanel
        "panels/editor"         // EditorPanel
    ],
    function (PanelGroup, PreviewPanel, EditorPanel) {
        // Prevent text selection
        document.onselectstart = function() {
          return false;
        };
        
        var propertiesPanelGroup = new PanelGroup([
            new PreviewPanel()
        ]);
        
        var shaderPanelGroup = new PanelGroup([
            new EditorPanel()
        ]);
        
        propertiesPanelGroup.render( $("body") );
        shaderPanelGroup.render( $("body") );
    });
});
