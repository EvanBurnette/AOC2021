// ==UserScript==
// @name         Remove Advent of Code hardcoded width
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  remove hardcoded width on advent of code
// @author       You
// @match        https://adventofcode.com/2021/day/*
// @icon         https://www.google.com/s2/favicons?domain=adventofcode.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const articles = document.getElementsByClassName("day-desc");
  Array.from(articles).forEach(article => {
      article.style.width = "35rem";
  });
})();