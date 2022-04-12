import * as Blockly from 'blockly';
import * as CustomBlocks from './customblocks';

const options = {
    toolbox: document.getElementById('toolbox'),
    media: 'media/',
};
CustomBlocks.defineBlocks(Blockly);
const workspace = Blockly.inject('blocklyDiv', options);

const button = document.getElementById('blocklyButton');
button.addEventListener('click', function () {
    alert("代码将在 Console 输出");
    const code = Blockly['JavaScript'].workspaceToCode(workspace);
    console.log(code);
    const xml = Blockly.Xml.workspaceToDom(workspace);
    console.log(xml);
})