//math
define(['js/num'], function (num) {
  return {
    getRadom: function () {
      return parseInt(Math.random() * num);
    }
  };
});