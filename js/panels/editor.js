define([
    "./panel",                                  // Panel
    
    "text!templates/panels/editor.ejs",         // template
    
    "text!assets/shaders/three-test/test.vert"  // vertexSource
],
function (Panel, template, vertexSource) {
    
    function EditorPanel () {
        Panel.call(this, "Source");
    }
    
    EditorPanel.prototype = new Panel;
    EditorPanel.prototype.constructor = EditorPanel;
    
    
    EditorPanel.prototype.render = function (parentElement) {
        parentElement.append( new EJS({ text: template }).render({
            source : vertexSource
        }) );
    };
    
    return EditorPanel;
});
