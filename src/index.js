require('offline-plugin/runtime').install();

import './fonts/Cinzel-Regular.ttf';
import './fonts/Lato-Regular.ttf';

import './index.css';
import './index.html';

import controller from './controllers/controller';

// Start everything.

document.addEventListener(
  'DOMContentLoaded',
  controller.initialiseApp.bind(controller)
);
