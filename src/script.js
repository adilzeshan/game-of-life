import model from "./model";

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

// VIEW

const view = {
  setUpEventListeners() {
    const canvas = document.getElementById("canvas-grid");
    const start = document.getElementById("start");
    const pause = document.getElementById("pause");
    const clear = document.getElementById("clear");
    const random = document.getElementById("random");

    canvas.addEventListener("click", this.selectCell.bind(this));
    start.addEventListener("click", this.startGame);
    pause.addEventListener("click", this.pauseGame);
    clear.addEventListener("click", this.resetGame);
    random.addEventListener("click", this.randomiseGrid.bind(this));
  },

  selectCell(event) {
    const context = this.grid.context;
    const cellSize = this.grid.cellSize;

    var x = event.offsetX;
    var y = event.offsetY;

    var i = x - (x % cellSize);
    var j = y - (y % cellSize);

    var col = Math.round(i / cellSize, 0);
    var row = Math.round(j / cellSize, 0);

    if (controller.grid.isCellLive(row, col)) {
      context.fillStyle = "#eee";
      controller.grid.killCell(row, col);
    } else {
      context.fillStyle = "#c6e48b";
      controller.grid.makeCellLive(row, col);
    }

    context.strokeStyle = "whitesmoke";
    context.strokeRect(i, j, cellSize - 1, cellSize - 1);

    context.fillRect(i, j, cellSize - 2, cellSize - 2);
  },

  startGame() {
    if (controller.gamePlayStatus.get()) {
      controller.resetGame();
    } else {
      controller.gamePlayStatus.resume();
      document.getElementById("start").style.display = "none";
      document.getElementById("pause").style.display = "inline";
      controller.playGame();
    }
  },

  pauseGame() {
    if (controller.gamePlayStatus.get()) {
      controller.gamePlayStatus.suspend();
      document.getElementById("pause").style.display = "none";
      document.getElementById("start").style.display = "inline";
      cancelAnimationFrame(controller.timer);
    }
  },

  resetGame() {
    document.getElementById("pause").style.display = "none";
    document.getElementById("start").style.display = "inline";
    controller.resetGame();
  },

  createGrid() {
    this.grid = {};
    this.grid.canvas = document.getElementById("canvas-grid");
    this.grid.context = this.grid.canvas.getContext("2d");
    this.grid.cellSize = 10;
    this.grid.canvas.width = controller.grid.cols * this.grid.cellSize;
    this.grid.canvas.height = controller.grid.rows * this.grid.cellSize;

    this.clearGrid();
  },

  updateGrid() {
    const canvas = this.grid.canvas;
    const context = this.grid.context;
    const cellSize = this.grid.cellSize;

    let row = 0;
    let col = 0;

    for (let i = 0; i < canvas.width; i += cellSize) {
      for (let j = 0; j < canvas.height; j += cellSize) {
        col = Math.round(i / cellSize, 0);
        row = Math.round(j / cellSize, 0);

        if (controller.grid.isCellLive(row, col)) {
          context.fillStyle = "#c6e48b";
        } else {
          context.fillStyle = "#eee";
        }

        context.strokeStyle = "whitesmoke";
        context.strokeRect(i, j, cellSize - 1, cellSize - 1);

        context.fillRect(i, j, cellSize - 2, cellSize - 2);
      }
    }
  },

  clearGrid() {
    const canvas = this.grid.canvas;
    const context = this.grid.context;
    const cellSize = this.grid.cellSize;

    context.strokeStyle = "whitesmoke";
    context.fillStyle = "#eee";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < canvas.width; i += cellSize) {
      for (let j = 0; j < canvas.height; j += cellSize) {
        context.strokeRect(i, j, cellSize - 1, cellSize - 1);
        context.fillRect(i, j, cellSize - 2, cellSize - 2);
      }
    }
  },

  randomiseGrid() {
    document.getElementById("pause").style.display = "none";
    document.getElementById("start").style.display = "inline";
    controller.resetGame();

    const canvas = this.grid.canvas;
    const context = this.grid.context;
    const cellSize = this.grid.cellSize;

    let row = 0;
    let col = 0;

    for (let i = 0; i < canvas.width; i += cellSize) {
      for (let j = 0; j < canvas.height; j += cellSize) {
        var isLive = Math.round(Math.random());
        if (isLive) {
          col = Math.round(i / cellSize, 0);
          row = Math.round(j / cellSize, 0);

          context.fillStyle = "#c6e48b";
          context.fillRect(i, j, cellSize - 2, cellSize - 2);
          controller.grid.makeCellLive(row, col);
        }
      }
    }
  },

  showStartButton() {
    document.getElementById("pause").style.display = "none";
    document.getElementById("start").style.display = "inline";
  },

  showGenerationNo() {
    document.getElementById(
      "generation"
    ).innerText = controller.generationNo.get();
  },

  clearGenerationNo() {
    document.getElementById("generation").innerText = "";
  }
};

// Start everything.

document.addEventListener(
  "DOMContentLoaded",
  controller.initialiseApp.bind(controller)
);
