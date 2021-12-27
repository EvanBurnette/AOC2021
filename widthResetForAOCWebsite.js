// ==UserScript==
// @name         Remove Advent of Code hardcoded width
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  remove hardcoded width on advent of code
// @author       Evan Burnette
// @match        https://adventofcode.com/2021/day/*
// @icon         https://www.google.com/s2/favicons?domain=adventofcode.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const style = document.createElement("style");
  const payload = document.createTextNode("* {max-width: 95vw !important;}");
  style.appendChild(payload);
  document.body.appendChild(style);
})();