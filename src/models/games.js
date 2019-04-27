import model from './model';

// GAMES

function gameOfLife(row, col, neighbourCount) {
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
}

// Other games

function maze(row, col, neighbourCount) {
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
}

function nightOrDay(row, col, neighbourCount) {
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
}

function walledCity(row, col, neighbourCount) {
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
}

function reverseGameOfLife(row, col, neighbourCount) {
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
}

function offAndOn(row, col, neighbourCount) {
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

export default {
  gameOfLife,
  maze,
  nightOrDay,
  walledCity,
  reverseGameOfLife,
  offAndOn
};
