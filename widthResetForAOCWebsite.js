// ==UserScript==
// @name         Remove Advent of Code hardcoded width
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  remove hardcoded width on advent of code
// @author       You
// @match        https://adventofcode.com/2021/day/*
// @icon         https://www.google.com/s2/favicons?domain=adventofcode.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const style = document.createElement("style");
  const payload = document.createTextNode("article{max-width: 95vw;}");
  style.appendChild(payload);
  document.body.appendChild(style);
})();