// ==UserScript==
// @name         Bigger font on AOC
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Increase font weight on Advent of Code
// @author       You
// @match        https://adventofcode.com/2021/day/*
// @icon         https://www.google.com/s2/favicons?domain=adventofcode.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const linkTags = document.getElementsByTagName("link")
  for (const css of Array.from(linkTags)){
      css.href = css.href.replace("Source+Code+Pro:300", "Source+Code+Pro:400")
  }
})();