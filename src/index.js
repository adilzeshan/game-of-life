import controller from "./controllers/controller";

// Start everything.

document.addEventListener(
  "DOMContentLoaded",
  controller.initialiseApp.bind(controller)
);
