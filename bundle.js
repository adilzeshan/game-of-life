!function(e){var t={};function i(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,i),l.l=!0,l.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)i.d(n,l,function(t){return e[t]}.bind(null,l));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=5)}([function(e,t){function i(){return"serviceWorker"in navigator&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}t.install=function(e){e||(e={}),i()&&navigator.serviceWorker.register("sw.js",{})},t.applyUpdate=function(e,t){},t.update=function(){i()&&navigator.serviceWorker.getRegistration().then(function(e){if(e)return e.update()})}},function(e,t){e.exports="fonts/Cinzel-Regular.ttf"},function(e,t){e.exports="fonts/Lato-Regular.ttf"},function(e,t,i){},function(e,t){e.exports='<!doctype html> <html lang=en> <head> <meta charset=UTF-8 /> <meta name=viewport content="width=device-width,initial-scale=1"/> <meta http-equiv=X-UA-Compatible content="ie=edge"/> <link rel=stylesheet href=https://use.fontawesome.com/releases/v5.6.3/css/all.css integrity=sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/ crossorigin=anonymous /> <link rel=stylesheet href=/src/index.css /> <title>Game of Life</title> </head> <body> <main id=wrapper> <header class=masthead> <h1><a href=#>Conway\'s Game of Life</a></h1> </header> <section id=controls> <button id=start><i class="fas fa-play-circle fa-4x"></i></button> <button id=pause><i class="fas fa-pause-circle fa-4x"></i></button> <button id=clear><i class="fas fa-minus-circle fa-4x"></i></button> <button id=random><i class="fas fa-random fa-4x"></i></button> <label id=generation></label> </section> <canvas id=canvas-grid></canvas> <footer> <p> Built by <a href=https://adil.js.org target=_blank>Adil Zeshan</a> </p> <p> Source code: <br/> <a href=https://github.com/adilzeshan/game-of-life target=_blank> <i class="fab fa-github fa-2x"></i> </a> </p> </footer> </main> </body> </html> '},function(e,t,i){"use strict";i.r(t);i(1),i(2),i(3),i(4);var n={gameOfLife:function(e,t,i){r.newGrid.killCell(e,t),r.oldGrid.isCellLive(e,t)?2===i||3===i?r.newGrid.makeCellLive(e,t):r.newGrid.killCell(e,t):3===i&&r.newGrid.makeCellLive(e,t)},maze:function(e,t,i){r.newGrid.killCell(e,t),r.oldGrid.isCellLive(e,t)?i>0&&i<6?r.newGrid.makeCellLive(e,t):r.newGrid.killCell(e,t):3===i&&r.newGrid.makeCellLive(e,t)},nightOrDay:function(e,t,i){r.newGrid.killCell(e,t),r.oldGrid.isCellLive(e,t)?3===i||4===i||i>5?r.newGrid.makeCellLive(e,t):r.newGrid.killCell(e,t):(3===i||i>5)&&r.newGrid.makeCellLive(e,t)},walledCity:function(e,t,i){r.newGrid.killCell(e,t),r.oldGrid.isCellLive(e,t)?i>3&&i<9?r.newGrid.makeCellLive(e,t):r.newGrid.killCell(e,t):i>1&&i<6&&r.newGrid.makeCellLive(e,t)},reverseGameOfLife:function(e,t,i){r.newGrid.killCell(e,t),r.oldGrid.isCellLive(e,t)?3===i?r.newGrid.makeCellLive(e,t):r.newGrid.killCell(e,t):2!==i&&3!==i||r.newGrid.makeCellLive(e,t)},offAndOn:function(e,t,i){r.newGrid.killCell(e,t),r.oldGrid.isCellLive(e,t)?i<3||4===i?r.newGrid.makeCellLive(e,t):r.newGrid.killCell(e,t):(i<4||5===i)&&r.newGrid.makeCellLive(e,t)}},l={initialiseGamePlayStatus:function(){var e=!1;return{get:function(){return e},suspend:function(){e=!1},resume:function(){e=!0}}},initialiseGrid:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:50,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;this.oldGrid=function(){var e=[];function n(t,i){e[t][i]=0}return{rows:t,cols:i,addNewRow:function(t){e[t]=[]},killCell:n,makeCellLive:function(t,i){e[t][i]=1},isCellLive:function(t,i){return 1===e[t][i]},overWriteWith:function(n){for(var l=0;l<t;l++)for(var r=0;r<i;r++)e[l][r]=n[l][r]},resetGrid:function(){for(var e=0;e<t;e++)for(var l=0;l<i;l++)n(e,l)}}}(),this.newGrid=(e=[],{addNewRow:function(t){e[t]=[]},killCell:function(t,i){e[t][i]=0},makeCellLive:function(t,i){e[t][i]=1},getContent:function(){return e}});for(var n=0;n<t;n++){this.oldGrid.addNewRow(n),this.newGrid.addNewRow(n);for(var r=0;r<i;r++)this.oldGrid.killCell(n,r),this.newGrid.killCell(n,r)}return{rows:t,cols:i,reset:l.oldGrid.resetGrid,killCell:l.oldGrid.killCell,makeCellLive:l.oldGrid.makeCellLive,isCellLive:l.oldGrid.isCellLive}},initialiseGenerationNo:function(){var e=0;return{get:function(){return e},increment:function(){e++},reset:function(){e=0}}},initialiseGameEngine:function(){function e(e,t){var i=function(){function e(e,t){if(e>=0&&e<l.oldGrid.rows&&t>=0&&t<l.oldGrid.cols)return l.oldGrid.isCellLive(e,t)}return function(t,i){var n=0;return e(t-1,i-1)&&n++,e(t-1,i)&&n++,e(t-1,i+1)&&n++,e(t,i-1)&&n++,e(t,i+1)&&n++,e(t+1,i-1)&&n++,e(t+1,i)&&n++,e(t+1,i+1)&&n++,n}}()(e,t);n.gameOfLife(e,t,i)}return{computeNewGeneration:function(){for(var t=0;t<l.oldGrid.rows;t++)for(var i=0;i<l.oldGrid.cols;i++)e(t,i);l.oldGrid.overWriteWith(l.newGrid.getContent())}}}},r=l;var a={setUpEventListeners:function(){var e=document.getElementById("canvas-grid"),t=document.getElementById("start"),i=document.getElementById("pause"),n=document.getElementById("clear"),l=document.getElementById("random");e.addEventListener("click",this.selectCell.bind(this)),t.addEventListener("click",this.startGame),i.addEventListener("click",this.pauseGame),n.addEventListener("click",this.resetGame),l.addEventListener("click",this.randomiseGrid.bind(this))},selectCell:function(e){var t=this.grid.context,i=this.grid.cellSize,n=e.offsetX,l=e.offsetY,r=n-n%i,a=l-l%i,o=Math.round(r/i,0),d=Math.round(a/i,0);s.grid.isCellLive(d,o)?(t.fillStyle="#eee",s.grid.killCell(d,o)):(t.fillStyle="#c6e48b",s.grid.makeCellLive(d,o)),t.strokeStyle="whitesmoke",t.strokeRect(r,a,i-1,i-1),t.fillRect(r,a,i-2,i-2)},startGame:function(){s.gamePlayStatus.get()?s.resetGame():(s.gamePlayStatus.resume(),document.getElementById("start").style.display="none",document.getElementById("pause").style.display="inline",s.playGame())},pauseGame:function(){s.gamePlayStatus.get()&&(s.gamePlayStatus.suspend(),document.getElementById("pause").style.display="none",document.getElementById("start").style.display="inline",cancelAnimationFrame(s.timer))},resetGame:function(){document.getElementById("pause").style.display="none",document.getElementById("start").style.display="inline",s.resetGame()},createGrid:function(){this.grid={},this.grid.canvas=document.getElementById("canvas-grid"),this.grid.context=this.grid.canvas.getContext("2d"),this.grid.cellSize=10,this.grid.canvas.width=s.grid.cols*this.grid.cellSize,this.grid.canvas.height=s.grid.rows*this.grid.cellSize,this.clearGrid()},updateGrid:function(){for(var e=this.grid.canvas,t=this.grid.context,i=this.grid.cellSize,n=0,l=0,r=0;r<e.width;r+=i)for(var a=0;a<e.height;a+=i)l=Math.round(r/i,0),n=Math.round(a/i,0),s.grid.isCellLive(n,l)?t.fillStyle="#c6e48b":t.fillStyle="#eee",t.strokeStyle="whitesmoke",t.strokeRect(r,a,i-1,i-1),t.fillRect(r,a,i-2,i-2)},clearGrid:function(){var e=this.grid.canvas,t=this.grid.context,i=this.grid.cellSize;t.strokeStyle="whitesmoke",t.fillStyle="#eee",t.fillRect(0,0,e.width,e.height);for(var n=0;n<e.width;n+=i)for(var l=0;l<e.height;l+=i)t.strokeRect(n,l,i-1,i-1),t.fillRect(n,l,i-2,i-2)},randomiseGrid:function(){document.getElementById("pause").style.display="none",document.getElementById("start").style.display="inline",s.resetGame();for(var e=this.grid.canvas,t=this.grid.context,i=this.grid.cellSize,n=0,l=0,r=0;r<e.width;r+=i)for(var a=0;a<e.height;a+=i)Math.round(Math.random())&&(l=Math.round(r/i,0),n=Math.round(a/i,0),t.fillStyle="#c6e48b",t.fillRect(r,a,i-2,i-2),s.grid.makeCellLive(n,l))},showStartButton:function(){document.getElementById("pause").style.display="none",document.getElementById("start").style.display="inline"},showGenerationNo:function(){document.getElementById("generation").innerText=s.generationNo.get()},clearGenerationNo:function(){document.getElementById("generation").innerText=""}},o={initialiseApp:function(){this.grid=r.initialiseGrid(50,100),this.initialiseEngine(),a.setUpEventListeners(),a.createGrid(),a.randomiseGrid()},initialiseEngine:function(){this.gamePlayStatus=r.initialiseGamePlayStatus(),this.generationNo=r.initialiseGenerationNo(),this.game=r.initialiseGameEngine()},playGame:function(){this.game.computeNewGeneration(),this.generationNo.increment(),a.showGenerationNo(),a.updateGrid(),o.gamePlayStatus.get()&&(this.timer=requestAnimationFrame(function(){o.playGame()}))},resetGame:function(){a.showStartButton(),a.clearGenerationNo(),a.clearGrid(),cancelAnimationFrame(this.timer),this.gamePlayStatus.suspend(),this.generationNo.reset(),this.grid.reset()}},s=o;i(0).install(),document.addEventListener("DOMContentLoaded",s.initialiseApp.bind(s))}]);
//# sourceMappingURL=bundle.js.map