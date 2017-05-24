    window.TableShape = draw2d.shape.layout.VerticalLayout.extend({
      NAME: "TableShape",
      init: function(attr) {
        attr = attr || {};
        // if((attr.caption == undefined) || (attr.caption == "undefined")) attr.caption = ".";
        // attr.caption = '1'
        this._super($.extend({
          stroke: 1,
          radius: 3
        }, attr));
        this.classLabel = new draw2d.shape.basic.Label({
          text: "ClassName",
          stroke: 1,
          fontColor: "#000",
          bgColor: attr.bgColor,
          radius: this.getRadius(),
          padding: 10,
          resizeable: true
        });
        this.setName(attr.name + ':\r\n' + attr.caption);
        this.add(this.classLabel);
        var input = this.createPort("input");
        var output = this.createPort("output");
        if(attr.p1 === undefined) input.setName("input_" + this.id);
        else {
          input.setName(attr.p1.name);
          input.setId(attr.p1.id);
        };
        if(attr.p2 === undefined) output.setName("output_" + this.id);
        else {
          output.setName(attr.p2.name);
          output.setId(attr.p2.id);
        };
        var MyInputPortLocator = draw2d.layout.locator.PortLocator.extend({
          init: function() {
            this._super();
          },
          relocate: function(index, figure) {
            this.applyConsiderRotation(figure, figure.getParent().getWidth() / 2, 0);
          }
        });
        var MyOutputPortLocator = draw2d.layout.locator.PortLocator.extend({
          init: function() {
            this._super();
          },
          relocate: function(index, figure) {
            var p = figure.getParent();
            this.applyConsiderRotation(figure, p.getWidth() / 2, p.getHeight());
          }
        });
        var MyInput = this.createPort("hybrid", new MyInputPortLocator());
        if(attr.p3 !== undefined) {
          MyInput.setName(attr.p3.name);
          MyInput.setId(attr.p3.id);
        };
        var MyOutput = this.createPort("hybrid", new MyOutputPortLocator());
        if(attr.p4 !== undefined) {
          MyOutput.setName(attr.p4.name);
          MyOutput.setId(attr.p4.id);
        };
      },
      /**
       * @method
       * Add an entity to the db shape
       *var jsonDocument = [{
  "id": "987a890e-778c-4689-8fbd-e50a1977e240",
  "jsonDocument": [{
    "type": "TableShape",
    "id": "3d1a2122-7350-69b7-0338-0e14222abb31",
    "x": 128.703125,
    "y": 834,
    "width": 167.328125,
    "height": 52.40625,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "TableShape",
    "ports": [{
      "type": "draw2d.InputPort",
      "id": "e8163add-dd6c-60c4-caaf-fbc893330aea",
      "width": 10,
      "height": 10,
      "alpha": 1,
      "angle": 0,
      "userData": {},
      "cssClass": "draw2d_InputPort",
      "bgColor": "#4F6870",
      "color": "#1B1B1B",
      "stroke": 1,
      "dasharray": null,
      "maxFanOut": 9007199254740991,
      "name": "input_3d1a2122-7350-69b7-0338-0e14222abb31",
      "port": "draw2d.InputPort",
      "locator": "draw2d.layout.locator.InputPortLocator"
    }, {
      "type": "draw2d.OutputPort",
      "id": "4375baf3-e884-9581-e54c-08168551f8dd",
      "width": 10,
      "height": 10,
      "alpha": 1,
      "angle": 0,
      "userData": {},
      "cssClass": "draw2d_OutputPort",
      "bgColor": "#4F6870",
      "color": "#1B1B1B",
      "stroke": 1,
      "dasharray": null,
      "maxFanOut": 9007199254740991,
      "name": "output_3d1a2122-7350-69b7-0338-0e14222abb31",
      "port": "draw2d.OutputPort",
      "locator": "draw2d.layout.locator.OutputPortLocator"
    }, {
      "type": "draw2d.HybridPort",
      "id": "20d27b5c-598d-9553-e7e8-7508e9a1200d",
      "width": 10,
      "height": 10,
      "alpha": 1,
      "angle": 0,
      "userData": {},
      "cssClass": "draw2d_HybridPort",
      "bgColor": "#4F6870",
      "color": "#1B1B1B",
      "stroke": 1,
      "dasharray": null,
      "maxFanOut": 9007199254740991,
      "name": "hybrid0",
      "port": "draw2d.HybridPort",
      "locator": "draw2d.layout.locator.PortLocator"
    }, {
      "type": "draw2d.HybridPort",
      "id": "52ef4a4a-8244-240f-7b7b-50666517ec0c",
      "width": 10,
      "height": 10,
      "alpha": 1,
      "angle": 0,
      "userData": {},
      "cssClass": "draw2d_HybridPort",
      "bgColor": "#4F6870",
      "color": "#1B1B1B",
      "stroke": 1,
      "dasharray": null,
      "maxFanOut": 9007199254740991,
      "name": "hybrid1",
      "port": "draw2d.HybridPort",
      "locator": "draw2d.layout.locator.PortLocator"
    }],
    "bgColor": "#304FFE",
    "color": "#5856D6",
    "stroke": 1,
    "radius": 3,
    "dasharray": null,
    "gap": 0,
    "name": "Тест 12 января",
    "entities": []
  }]
}]

       * @param {String} txt the label to show
       * @param {Number} [optionalIndex] index where to insert the entity
       */
      addEntity: function(txt, cpt, optionalIndex) {
        var label = new draw2d.shape.basic.Label({
          text: txt,
          caption: cpt,
          stroke: 0,
          radius: 0,
          bgColor: null,
          padding: {
            left: 10,
            top: 3,
            right: 10,
            bottom: 5
          },
          fontColor: "#4a4a4a",
          resizeable: true
        });
        label.setParent(this);
        //label.installEditor(new draw2d.ui.LabelEditor());
        /*var _table=this;
        label.on("contextmenu", function(emitter, event){
            $.contextMenu({
                selector: 'body',
                events:
                {
                    hide:function(){ $.contextMenu( 'destroy' ); }
                },
                callback: $.proxy(function(key, options)
                {
                   switch(key){
                   case "rename":
                       setTimeout(function(){
                           emitter.onDoubleClick();
                       },10);
                       break;
                   case "new":
                       setTimeout(function(){
                           _table.addEntity("_new_").onDoubleClick();
                       },10);
                       break;
                   case "delete":
                       // with undo/redo support
                       var cmd = new draw2d.command.CommandDelete(emitter);
                       emitter.getCanvas().getCommandStack().execute(cmd);
                   default:
                       break;
                   }

                },this),
                x:event.x,
                y:event.y,
                items:
                {
                    "rename": {name: "Переименовать"},
                    "new":    {name: "Новое свойство"},
                    "sep1":   "---------",
                    "delete": {name: "Удалить"}
                }
            });
        });*/
        if($.isNumeric(optionalIndex)) {
          this.add(label, null, optionalIndex + 1);
        } else {
          this.add(label);
        }
        return label;
      },
      /**
       * @method
       * Remove the entity with the given index from the DB table shape.<br>
       * This method removes the entity without care of existing connections. Use
       * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
       *
       * @param {Number} index the index of the entity to remove
       */
      removeEntity: function(index) {
        this.remove(this.children.get(index + 1).figure);
      },
      /**
       * @method
       * Returns the entity figure with the given index
       *
       * @param {Number} index the index of the entity to return
       */
      getEntity: function(index) {
        return this.children.get(index + 1).figure;
      },
      /**
       * @method
       * Set the name of the DB table. Visually it is the header of the shape
       *
       * @param name
       */
      setName: function(name) {
        this.classLabel.setText(name);
        return this;
      },
      /**
       * @method
       * Return an objects with all important attributes for XML or JSON serialization
       *
       * @returns {Object}
       */
      getPersistentAttributes: function() {
        var memento = this._super();
        memento.name = this.classLabel.getText();
        memento.entities = [];
        this.children.each(function(i, e) {
          if(i > 0) { // skip the header of the figure
            memento.entities.push({
              text: e.figure.getText(),
              id: e.figure.id
            });
          }
        });
        return memento;
      },
      /**
       * @method
       * Read all attributes from the serialized properties and transfer them into the shape.
       *
       * @param {Object} memento
       * @return
       */
      setPersistentAttributes: function(memento) {
        this._super(memento);
        this.setName(memento.name);
        if(typeof memento.entities !== "undefined") {
          $.each(memento.entities, $.proxy(function(i, e) {
            var entity = this.addEntity(e.text);
            entity.id = e.id;
          }, this));
        }
        return this;
      }
    });
    window.HoverConnection = draw2d.Connection.extend({
      init: function(sourcePort, targetPort) {
        var self = this;
        this._super({
          router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
          radius: 5,
          source: sourcePort,
          target: targetPort,
          stroke: 1.35
        });
        // this.on("dragEnter", function(emitter, event) {
        //     //console.log('drag enter');
        //     self.attr({
        //         outlineColor: "#303030",
        //         outlineStroke: 2,
        //         color: "#00a8f0"
        //     });
        // });
        // this.on("dragLeave", function(emitter, event) {
        //     //console.log('drag leave');
        //     self.attr({
        //         outlineColor: "#303030",
        //         outlineStroke: 0,
        //         color: "#000000"
        //     });
        // });
        this.sourceDecorator = new draw2d.decoration.connection.DiamondDecorator();
      },
      // onDragEnter: function(draggedFigure) {
      //     return this;
      // }
    });
