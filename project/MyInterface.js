import { CGFinterface, dat } from "../lib/CGF.js";

/**
 * MyInterface
 * @constructor
 */
export class MyInterface extends CGFinterface {
  constructor() {
    super();
  }

  init(application) {
    // call CGFinterface init
    super.init(application);

    // init GUI. For more information on the methods, check:
    // https://github.com/dataarts/dat.gui/blob/master/API.md
    this.gui = new dat.GUI();

    //Checkbox element in GUI
    this.gui.add(this.scene, "displayAxis").name("Display Axis");
    this.processKeyboard = function () {};
    this.activeKeys = {};
    this.scene.gui = this;
    return true;
  }
  processKeyDown(event) {
    this.activeKeys[event.code] = true;
  }
  processKeyUp(event) {
    this.activeKeys[event.code] = false;
  }
}
