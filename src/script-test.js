"use strict";

const _rgx = new RegExp('\\d+');

const _regex = /[0-9]+/;

function validateOneWay(value) {
  var result = _regex.exec(value);

  return (validateTheOtherWay = function validateTheOtherWay() {
    var input = _rgx.test(result.input);

    return input;
  })();
}

validateOneWay(123456789);
