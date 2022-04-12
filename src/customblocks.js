export function defineBlocks(Blockly) {
  Blockly.Blocks['hello_world'] = {
    init: function () {
      this.appendDummyInput("DUMMY")
        .appendField("你好，世界！");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#681752");
      this.setTooltip("你好，世界！");
      this.setHelpUrl("www.pvpin.net");
    }
  };

  Blockly.Blocks['input_test'] = {
    init: function () {
      this.appendValueInput("VALUE")
        .setCheck("Number")
        .appendField("输入数字");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#681752");
      this.setTooltip("你好，世界！");
      this.setHelpUrl("www.pvpin.net");
    }
  };

  Blockly.Blocks['field_test'] = {
    init: function () {
      this.appendDummyInput("DUMMY")
        .appendField("输入字符串")
        .appendField(new Blockly.FieldTextInput("PVPIN"), "INPUT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#681752");
      this.setTooltip("你好，世界！");
      this.setHelpUrl("www.pvpin.net");
    }
  };

  Blockly.Blocks['field_validator'] = {
    init: function () {
      this.appendDummyInput("DUMMY")
        .appendField("输入字符串(PVPIN)")
        .appendField(new Blockly.FieldTextInput("PVPIN", function (txt) {
          if (txt != "PVPIN") {
            return;
          }
          this.sourceBlock_.setWarningText("PVPIN OK.");
        }), "INPUT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#681752");
      this.setTooltip("你好，世界！");
      this.setHelpUrl("www.pvpin.net");
    }
  };


  Blockly.Blocks["location_propmod"] = {
    init: function () {
      var modeMenu = new Blockly.FieldDropdown(
        [
          ["获取", "GETTER"],
          ["设置", "SETTER"],
        ],
        function (value) {
          this.getSourceBlock().updateInput_(value);
        }
      );
      this.appendDummyInput().appendField(modeMenu, "TYPE");
      this.appendValueInput("OBJ").setCheck(null)
        .appendField("对象");
      this.appendDummyInput("OPTION")
        .appendField("的")
        .appendField(
          new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"]]),
          "OPTION"
        );
      this.appendValueInput("INPUT").appendField("为");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#681752");
      this.setTooltip("获取设置坐标");
      this.setHelpUrl("www.pvpin.net");
    },
    mutationToDom: function () {
      var container = Blockly.utils.xml.createElement("mutation");
      var type = this.getFieldValue("TYPE");
      container.setAttribute("type", type);
      return container;
    },
    domToMutation: function (xmlElement) {
      var type = xmlElement.getAttribute("type");
      this.setFieldValue(type, "TYPE");
      this.updateInput_(type);
    },
    updateInput_: function (input) {
      if (!input) { return; }
      if (input == "GETTER") {
        if (this.getInput("INPUT")) {
          this.unplug(true, true);
          this.removeInput("INPUT");
        }
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, "Number");
      } else {
        if (!this.getInput("INPUT")) {
          this.unplug(true, true);
          this.appendValueInput("INPUT").appendField("为").setCheck("Number");
        }
        this.setOutput(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
      }
    }
  };

  Blockly.JavaScript["location_propmod"] = function (block) {
    var dropdown_type = block.getFieldValue("TYPE");
    var value_obj = Blockly.JavaScript.valueToCode(block, "OBJ", Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_option = block.getFieldValue("OPTION");
    if (dropdown_type == "GETTER") {
      return [`${value_obj}.get${dropdown_option}()`, Blockly.JavaScript.ORDER_NONE];
    } else {
      var value_input = Blockly.JavaScript.valueToCode(block, "INPUT", Blockly.JavaScript.ORDER_ATOMIC);
      return `${value_obj}.set${dropdown_option}(${value_input});`;
    }
  };
}