// ==UserScript==
// @name         Better Arbor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A script to make arbor look better!
// @author       bizbazboz, OomsOoms
// @match        https://bishop-ramsey-cofe.uk.arbor.sc/?/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=arbor-education.com
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    // Function to remove src attributes with non-empty URLs, alt text and style
    function removeAttributes() {
        const elementsWithSrc = document.querySelectorAll('[src]');
        const elementsWithAlt = document.querySelectorAll('[alt]');
        const elementsWithStyle = document.querySelectorAll('[style]');

        for (const element of elementsWithSrc){
              element.removeAttribute('src');
              console.log('Removed src attribute:', element);
        }
        for (const element of elementsWithAlt){
              element.removeAttribute('alt');
              console.log('Removed alt attribute:', element);
        }

        for (const element of elementsWithStyle){
              element.removeAttribute('style');
              console.log('Removed style attribute:', element);
        }
    }

    // Wait for the page to load and then remove src attributes with URLs, alt text and style
    function waitForPageLoad() {
        const loadingSpinner = document.querySelector('.loading-spinner');
        if (loadingSpinner && loadingSpinner.classList.contains('loading-spinner--hide')) {
            removeAttributes();
        } else {
            setTimeout(waitForPageLoad, 100);
        }
    }

    // Function to block all <script> tags
    function blockScripts() {
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            script.remove();
        });
    }

    // Function to block all <link> tags with rel="stylesheet" (CSS)
    function blockCSS() {
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        cssLinks.forEach(link => {
            link.remove();
        });
    }

    blockScripts();
    blockCSS();
    waitForPageLoad();
})();
