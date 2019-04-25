import model from "./model";
import view from "./view";

// CONTROLLER

const controller = {
  initialiseApp: function() {
    this.grid = model.initialiseGrid(50, 100);
    this.initialiseEngine();
    view.setUpEventListeners();
    view.createGrid();
    view.randomiseGrid();
  },

  initialiseEngine: function() {
    this.gamePlayStatus = model.initialiseGamePlayStatus();
    this.generationNo = model.initialiseGenerationNo();
    this.game = model.initialiseGameEngine();
  },

  playGame: function() {
    this.game.computeNewGeneration();
    this.generationNo.increment();
    view.showGenerationNo();
    view.updateGrid();

    if (controller.gamePlayStatus.get()) {
      this.timer = requestAnimationFrame(() => this.playGame());
    }
  },

  resetGame: function() {
    view.showStartButton();
    view.clearGenerationNo();
    view.clearGrid();
    cancelAnimationFrame(this.timer);
    this.gamePlayStatus.suspend();
    this.generationNo.reset();
    this.grid.reset();
  }
};

// Start everything.

document.addEventListener(
  "DOMContentLoaded",
  controller.initialiseApp.bind(controller)
);

export default controller;
