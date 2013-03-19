define([
    "./panel",                          // Panel
    
    "text!templates/panels/editor.ejs"  // template
],
function (Panel, template) {
    
    function EditorPanel () {
        Panel.call(this, "Source");
    }
    
    EditorPanel.prototype = new Panel;
    EditorPanel.prototype.constructor = EditorPanel;
    
    
    EditorPanel.prototype.render = function (parentElement) {
        parentElement.append( new EJS({ text: template }).render({}) );
    };
    
    return EditorPanel;
});
