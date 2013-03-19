define([
    "./panel",                                  // Panel
    
    "text!templates/panels/preview-panel.ejs",  // template
    
    "text!shaders/three-test/test.vert",        // testVertexShader
    "text!shaders/three-test/test.frag"         // testFragmentShaders
],
function (Panel, template, testVertexShader, testFragmentShader) {
    function PreviewPanel (options) {
        Panel.call(this, "Preview");
        
        this.options = $.extend({
            width  : 400,
            height : 300,
            fov    : 45,
            near   : 0.1,
            far    : 10000
        }, options);
        
        this.renderer = new THREE.WebGLRenderer();
        this.scene    = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(
            this.options.fov,
            this.options.width / this.options.height,
            this.options.near,
            this.options.far
        );

        this.camera.position.z = 300;
        this.renderer.setSize(this.options.width, this.options.height);
        
        this.animationEnabled = true;
        this.tumbleEnabled    = true;
        
        this.tumbleX = 0.01;
        this.tumbleY = 0.01;
        
        this.setMaterial();
        this.setPrimitive();
        this.setLighting();
    }
    
    PreviewPanel.prototype = new Panel;
    PreviewPanel.prototype.constructor = PreviewPanel;
    

    PreviewPanel.prototype.setMaterial = function () {
        var sphereMaterial = new THREE.MeshLambertMaterial({
            color: 0xCC0000
        });
        
        var shaderMaterial = new THREE.ShaderMaterial({
            vertexShader   : testVertexShader,
            fragmentShader : testFragmentShader
        });
        
        this.material = sphereMaterial;
    };
    
    PreviewPanel.prototype.setPrimitive = function (primitive) {
        primitive = primitive || "cube";
        
        if ("cube" == primitive) {
            this.geometry = new THREE.CubeGeometry(100, 100, 100);
        }
        else if ("sphere" == primitive) {
            this.geometry = new THREE.SphereGeometry(
                50,     // radius
                16,     // segments
                16      // rings
            );
        }
        
        this.primitive = new THREE.Mesh(this.geometry, this.material);
        
        this.scene.add(this.primitive);
    };
    
    PreviewPanel.prototype.setLighting = function () {
        var pointLight = new THREE.PointLight(0xFFFFFF);

        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        this.scene.add(pointLight);
    }
    
    PreviewPanel.prototype.render = function (parentElement) {
        var self = this;
        
        parentElement.append( $(this.renderer.domElement) );
        parentElement.append( new EJS({ text: template }).render({}) );
        
        // Primitive translation
        $("canvas", parentElement).on("mousedown", function (mousedownEvent) {
            var rotateX = self.primitive.rotation.x;
            var rotateY = self.primitive.rotation.y;
            
            var deltaX = mousedownEvent.clientX;
            var deltaY = mousedownEvent.clientY;
            
            var tumbleEnabled  = self.tumbleEnabled;
            self.tumbleEnabled = false;
            
            $(document).on("mousemove", function (mousemoveEvent) {
                deltaX = rotateX + (mousemoveEvent.clientY - mousedownEvent.clientY) * 0.01;
                deltaY = rotateY + (mousemoveEvent.clientX - mousedownEvent.clientX) * 0.01;
                
                self.primitive.rotation.x = deltaX;
                self.primitive.rotation.y = deltaY;
            });
            
            $(document).one("mouseup", function () {
                $(this).off("mousemove");
                
                self.tumbleEnabled = tumbleEnabled;
            });
            
            return false;
        });
        
        // Tumble animation on/off
        $(".control-group input[name=tumble]", parentElement).click(function () {
            self.tumbleEnabled = $(this).prop("checked");
        });
        
        this.toggleAnimation(true);
    };
    
    PreviewPanel.prototype.toggleAnimation = function (enabled) {
        var self = this;
        
        this.animationEnabled
            = "undefined" == (typeof enabled)
            ? !this.animationEnabled
            : !!enabled
            ;
        
        (function () {
            if (self.animationEnabled) {
                window.requestAnimationFrame(arguments.callee);
            }
            
            self.draw();
        })();
    };
    
    PreviewPanel.prototype.draw = function () {
        if (this.tumbleEnabled) {
            this.primitive.rotation.x += this.tumbleX;
            this.primitive.rotation.y += this.tumbleY;
        }
        
        this.renderer.render(this.scene, this.camera);
    };
    
    return PreviewPanel;
});
