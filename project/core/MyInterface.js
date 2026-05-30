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
    this.gui = new dat.GUI({width: 300});

    // Health
    const healthBar = this.gui.add(this.scene.player, 'HP', 0, 100, 1)
        .name('Health')
        .listen();
    healthBar.domElement.style.pointerEvents = 'none'; 
    
    // Collision damage
    this.gui.add(this.scene, 'collisionDamage').name('Collision Damage').listen();
    
    // Hay bale heal
    this.gui.add(this.scene, 'hayBaleHeal').name('Hay Bale Heal').listen();
    
    // Hay bales dropped
    this.gui.add(this.scene, 'hayBalesDropped').name('Hay Bales Dropped').listen();
    
    // Score
    this.gui.add(this.scene, 'timeSeconds').name('Score (sec)').listen();
    
    this.gui.add(this.scene, 'hayBalesAmount', 1, 30, 1).name('Hay Bales Available').onChange((value)=>{
      this.scene.updateHayBales(value);
    }
    );
    this.gui.add(this.scene.player, 'hayBalesHeld').name('Hay Bales Held').listen();
    
    // Configuration folder
    const configFolder = this.gui.addFolder('Configuration');
    configFolder.add(this.scene, 'displayAxis').name('Display Axis');
    configFolder.add(this.scene, 'displaySky').name('Display Sky');
    configFolder.add(this.scene, 'displayGrass').name('Display Grass');


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
