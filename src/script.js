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

// MODEL

const model = {
  initialiseGamePlayStatus() {
    let isGameInPlay = false;

    function getGamePlayStatus() {
      return isGameInPlay;
    }

    function suspendGamePlayStatus() {
      isGameInPlay = false;
    }

    function resumeGamePlayStatus() {
      isGameInPlay = true;
    }

    const publicAPI = {
      get: getGamePlayStatus,
      suspend: suspendGamePlayStatus,
      resume: resumeGamePlayStatus
    };

    return publicAPI;
  },

  initialiseGrid(rows = 50, cols = 100) {
    function createOldGrid() {
      const privateOldGrid = [];

      function addNewRow(row) {
        privateOldGrid[row] = [];
      }

      function killCell(row, col) {
        privateOldGrid[row][col] = 0;
      }

      function makeCellLive(row, col) {
        privateOldGrid[row][col] = 1;
      }

      function isCellLive(row, col) {
        return privateOldGrid[row][col] === 1;
      }

      function overWriteWith(whichGrid) {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            privateOldGrid[i][j] = whichGrid[i][j];
          }
        }
      }

      function resetGrid() {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            killCell(i, j);
          }
        }
      }

      const publicAPI = {
        rows,
        cols,
        addNewRow,
        killCell,
        makeCellLive,
        isCellLive,
        overWriteWith,
        resetGrid
      };

      return publicAPI;
    }

    function createNewGrid() {
      const privateNewGrid = [];

      function addNewRow(row) {
        privateNewGrid[row] = [];
      }

      function killCell(row, col) {
        privateNewGrid[row][col] = 0;
      }

      function makeCellLive(row, col) {
        privateNewGrid[row][col] = 1;
      }

      function getContent() {
        return privateNewGrid;
      }

      const publicAPI = {
        addNewRow,
        killCell,
        makeCellLive,
        getContent
      };

      return publicAPI;
    }

    this.oldGrid = createOldGrid();
    this.newGrid = createNewGrid();

    for (let i = 0; i < rows; i++) {
      this.oldGrid.addNewRow(i);
      this.newGrid.addNewRow(i);
      for (let j = 0; j < cols; j++) {
        this.oldGrid.killCell(i, j);
        this.newGrid.killCell(i, j);
      }
    }

    const publicAPI = {
      rows,
      cols,
      reset: model.oldGrid.resetGrid,
      killCell: model.oldGrid.killCell,
      makeCellLive: model.oldGrid.makeCellLive,
      isCellLive: model.oldGrid.isCellLive
    };

    return publicAPI;
  },

  initialiseGenerationNo() {
    let generationNo = 0;

    function getGenerationNo() {
      return generationNo;
    }

    function incrementGenerationNo() {
      generationNo++;
    }

    function resetGenerationNo() {
      generationNo = 0;
    }

    const publicAPI = {
      get: getGenerationNo,
      increment: incrementGenerationNo,
      reset: resetGenerationNo
    };

    return publicAPI;
  },

  initialiseGameEngine() {
    function applyRulesOfGame(row, col) {
      function countLiveNeighbours() {
        function isNeighbourLive(row, col) {
          if (
            row >= 0 &&
            row < model.oldGrid.rows &&
            col >= 0 &&
            col < model.oldGrid.cols
          ) {
            return model.oldGrid.isCellLive(row, col);
          }
        }

        function addUpLiveNeighbours(row, col) {
          let liveCount = 0;

          if (isNeighbourLive(row - 1, col - 1)) {
            // upper left to current cell
            liveCount++;
          }

          if (isNeighbourLive(row - 1, col)) {
            // above current cell
            liveCount++;
          }

          if (isNeighbourLive(row - 1, col + 1)) {
            // upper right to current cell
            liveCount++;
          }

          if (isNeighbourLive(row, col - 1)) {
            // left of current cell
            liveCount++;
          }

          if (isNeighbourLive(row, col + 1)) {
            // right of current cell
            liveCount++;
          }

          if (isNeighbourLive(row + 1, col - 1)) {
            // below left to current cell
            liveCount++;
          }

          if (isNeighbourLive(row + 1, col)) {
            // below current cell
            liveCount++;
          }

          if (isNeighbourLive(row + 1, col + 1)) {
            // below right to current cell
            liveCount++;
          }

          return liveCount;
        }

        return addUpLiveNeighbours;
      }

      const liveNeighbours = countLiveNeighbours()(row, col);
      model.games.gameOfLife(row, col, liveNeighbours);
    }

    function computeNewGeneration() {
      for (let i = 0; i < model.oldGrid.rows; i++) {
        for (let j = 0; j < model.oldGrid.cols; j++) {
          applyRulesOfGame(i, j);
        }
      }

      model.oldGrid.overWriteWith(model.newGrid.getContent());
    }

    const publicAPI = {
      computeNewGeneration
    };

    return publicAPI;
  },

  // An assortment of games
  games: {
    gameOfLife(row, col, neighbourCount) {
      model.newGrid.killCell(row, col);

      if (model.oldGrid.isCellLive(row, col)) {
        if (neighbourCount === 2 || neighbourCount === 3) {
          model.newGrid.makeCellLive(row, col);
        } else {
          model.newGrid.killCell(row, col);
        }
      } else {
        if (neighbourCount === 3) {
          model.newGrid.makeCellLive(row, col);
        }
      }
    },

    // Other games

    maze(row, col, neighbourCount) {
      model.newGrid.killCell(row, col);

      if (model.oldGrid.isCellLive(row, col)) {
        if (neighbourCount > 0 && neighbourCount < 6) {
          model.newGrid.makeCellLive(row, col);
        } else {
          model.newGrid.killCell(row, col);
        }
      } else {
        if (neighbourCount === 3) {
          model.newGrid.makeCellLive(row, col);
        }
      }
    },

    clouds(row, col, neighbourCount) {
      model.newGrid.killCell(row, col);

      if (model.oldGrid.isCellLive(row, col)) {
        if (
          neighbourCount === 3 ||
          neighbourCount === 4 ||
          neighbourCount > 5
        ) {
          model.newGrid.makeCellLive(row, col);
        } else {
          model.newGrid.killCell(row, col);
        }
      } else {
        if (neighbourCount === 3 || neighbourCount > 5) {
          model.newGrid.makeCellLive(row, col);
        }
      }
    },

    walledCity(row, col, neighbourCount) {
      model.newGrid.killCell(row, col);

      if (model.oldGrid.isCellLive(row, col)) {
        if (neighbourCount > 3 && neighbourCount < 9) {
          model.newGrid.makeCellLive(row, col);
        } else {
          model.newGrid.killCell(row, col);
        }
      } else {
        if (neighbourCount > 1 && neighbourCount < 6) {
          model.newGrid.makeCellLive(row, col);
        }
      }
    },

    reverseGameOfLife(row, col, neighbourCount) {
      model.newGrid.killCell(row, col);

      if (model.oldGrid.isCellLive(row, col)) {
        if (neighbourCount === 3) {
          model.newGrid.makeCellLive(row, col);
        } else {
          model.newGrid.killCell(row, col);
        }
      } else {
        if (neighbourCount === 2 || neighbourCount === 3) {
          model.newGrid.makeCellLive(row, col);
        }
      }
    },

    nightClub(row, col, neighbourCount) {
      model.newGrid.killCell(row, col);

      if (model.oldGrid.isCellLive(row, col)) {
        if (neighbourCount < 3 || neighbourCount === 4) {
          model.newGrid.makeCellLive(row, col);
        } else {
          model.newGrid.killCell(row, col);
        }
      } else {
        if (neighbourCount < 4 || neighbourCount === 5) {
          model.newGrid.makeCellLive(row, col);
        }
      }
    }
  }
};

// Start everything.

document.addEventListener(
  "DOMContentLoaded",
  controller.initialiseApp.bind(controller)
);
