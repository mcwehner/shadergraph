define([
    "text!templates/panel-group.ejs"
],
function (template) {
    function PanelGroup (panels) {
        this.domElement = null;
        this.panels     = panels || [];
    }
    
    PanelGroup.prototype.render = function (parentElement) {
        var element = $( new EJS({ text: template }).render({
            panels : this.panels
        }) );
        
        if (!this.domElement) {
            parentElement.append(element);
        }
        else {
            this.domElement.replaceWith(element);
        }
        
        this.domElement = element;
        
        $.each(this.panels, function (i, panel) {
            panel.render( $(".panel-group .panel[data-name='" + panel.name + "']") );
        });
    };
    
    return PanelGroup;
});
