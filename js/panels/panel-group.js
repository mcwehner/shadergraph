define([
    "text!templates/panels/panel-group.ejs"
],
function (template) {
    function PanelGroup (panels) {
        this.domElement = null;
        this.panels     = panels || [];
    }
    
    PanelGroup.counter = 0;
    
    PanelGroup.prototype.render = function (parentElement) {
        var self = this;
        
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
        this.domElement.css("z-index", ++PanelGroup.counter);
        
        $.each(this.panels, function (i, panel) {
            panel.render( $(".panel-group .panel[data-name='" + panel.name + "']") );
        });
        
        // Moving panel groups
        $("header", this.domElement).on("mousedown", function (mousedownEvent) {
            var offset    = $(this).offset();
            var snapWidth = 30;
            
            $(document).on("mousemove", function (mousemoveEvent) {
                var mouseX = mousemoveEvent.clientX;
                var mouseY = mousemoveEvent.clientY;
                
                if (mouseX <= snapWidth) {
                    self.dock("left");
                }
                else if (mouseX >= window.innerWidth - snapWidth) {
                    self.dock("right");
                }
                else if (mouseY <= snapWidth) {
                    self.dock("top");
                }
                else if (mouseY >= window.innerHeight - snapWidth) {
                    self.dock("bottom");
                }
                else {
                    self.float(
                        offset.left + (mouseX - mousedownEvent.clientX),
                        offset.top + (mouseY - mousedownEvent.clientY)
                    );
                }
            });
            
            $(document).one("mouseup", function () {
                $(this).off("mousemove");
            })
            
            return false;
        });

        // Panel group focus
        $(this.domElement).on("mouseup", function () {
            self.domElement.css("z-index", ++PanelGroup.counter);
        });
    };
    
    PanelGroup.prototype.float = function (x, y) {
        this.domElement.removeClass("docked");
        this.domElement.addClass("floating left right top bottom");
        this.domElement.css({ left: x + "px", top: y + "px" });
    };
    
    PanelGroup.prototype.dock = function (position) {
        this.domElement.css({ "left": "", "top": "" });
        this.domElement.removeClass("floating left right top bottom");
        this.domElement.addClass("docked " + position);
    };
    
    return PanelGroup;
});
