import { CGFinterface, dat } from '../../lib/CGF.js';

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

    this.gui.add(this.scene, 'timeSeconds').name('Score (s)').listen();

    this.gui.add(this.scene, 'hayBalesAmount', 1, 30, 1).name('Hay Bale Amount').onChange((value)=>{
      this.scene.updateHayBales(value);
    }
    );

    //Checkbox element in GUI
    this.gui.add(this.scene, 'displayAxis').name('Display Axis');
    this.gui.add(this.scene, 'displaySky').name('Display Sky');
    this.gui.add(this.scene, 'displayGrass').name('Display Grass');
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
