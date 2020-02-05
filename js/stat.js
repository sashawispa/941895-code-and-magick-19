
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
var FONT = '16px PT Mono';
var FILL_STULE = '#000000';

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMaxElement(arr) {
  return Math.floor(Math.max.apply(null, arr));
}

function saturation(min, max) {
  return min + Math.random() * (max - min);
}

function generateColor(item, i, ctx) {
  if (item === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'hsla(211, ' + saturation(1, 100) + '%, 50%)';
  }
}

function generate(ctx, names, times) {
  for (var i = 0; i < names.length; i++) {
    var maxTime = getMaxElement(times);
    var NewBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var BarX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var BarY = CLOUD_Y + CLOUD_HEIGHT - Math.floor(NewBarHeight);

    ctx.fillText(names[i], BarX, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.floor(times[i]), BarX, BarY - FONT_GAP * 2.5);

    generateColor(names[i], i, ctx);

    ctx.fillRect(BarX, BarY - FONT_GAP * 1.5, BAR_WIDTH, NewBarHeight);
    ctx.fillStyle = FILL_STULE;
  }
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  ctx.font = FONT;
  ctx.fillStyle = FILL_STULE;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

  generate(ctx, names, times);
};
