import model from '../models/model';
import view from '../views/view';

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
      this.timer = requestAnimationFrame(function() {
        controller.playGame();
      });
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

export default controller;
