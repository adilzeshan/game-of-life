import model from "./model";

// GAMES

const games = {
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
      if (neighbourCount === 3 || neighbourCount === 4 || neighbourCount > 5) {
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
};

export default games;
