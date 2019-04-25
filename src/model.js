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

export default model;
