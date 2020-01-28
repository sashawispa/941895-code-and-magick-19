
'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMaxElement(arr) {
  return Math.floor(Math.max.apply(null, arr));
}

function generateColor(item, i, ctx) {
  if (item === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    var saturation = 100 - 30 * i;
    ctx.fillStyle = 'hsla(211, ' + saturation + '%, 50%)';
  }
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var NEW_BAR_HEIGHT = (BAR_HEIGHT * times[i]) / maxTime;
    var BAR_X = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var BAR_Y = CLOUD_Y + CLOUD_HEIGHT - Math.floor(NEW_BAR_HEIGHT);

    ctx.fillText(players[i], BAR_X, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.floor(times[i]), BAR_X, BAR_Y - FONT_GAP * 2.5);

    generateColor(players[i], i, ctx);

    ctx.fillRect(BAR_X, BAR_Y - FONT_GAP * 1.5, BAR_WIDTH, NEW_BAR_HEIGHT);
    ctx.fillStyle = '#000000';
  }
};
