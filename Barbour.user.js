// ==UserScript==
// @name         Better Arbor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A script to make Arbor look better!
// @author       bizbazboz, OomsOoms
// @match        https://bishop-ramsey-cofe.uk.arbor.sc/?/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=arbor-education.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Create a new head element
    const newHead = document.createElement('head');

    // Replaces the old head element with the new one
    document.documentElement.replaceChild(newHead, document.head);

    // Add this maybe when testing "const currentUrl = window.location.href;" to ensure page gets right code
    // Replaces the stylesheet with the one from the GitHub repo
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'https://bizbazboz.github.io/barbor/css/styles.css');
    document.head.appendChild(link);

    // Function to remove src attributes with non-empty URLs, alt text and style
    // Removes the src, alt, and style attributes from all elements that have them, as well as removing the noscript and iframe tags from the document.
    function removeAttributes() {
        const elementsWithSrc = document.querySelectorAll('[src]');
        const elementsWithAlt = document.querySelectorAll('[alt]');
        const elementsWithStyle = document.querySelectorAll('[style]');

        for (const element of elementsWithSrc) {
            element.removeAttribute('src');
        }
        for (const element of elementsWithAlt) {
            element.removeAttribute('alt');
        }

        for (const element of elementsWithStyle) {
            element.removeAttribute('style');
        }

        const noScriptTag = document.querySelector('noscript');
        noScriptTag.remove();
        const iframeTag = document.querySelector('iframe');
        iframeTag.remove();
    }

    // Wait for the page to load and then remove src attributes with URLs, alt text and style
    function waitForPageLoad() {
        const loadingSpinner = document.querySelector('.loading-spinner');
        if (loadingSpinner && loadingSpinner.classList.contains('loading-spinner--hide')) {
            const loadingSpinnerTxt = document.querySelector('.loading-spinner__text');
            loadingSpinnerTxt.remove();
            removeAttributes();
        } else {
            // If the loading spinner is still there, wait 100ms and try again
            setTimeout(waitForPageLoad, 100);
        }
    }

    // Function to block all <script> tags
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        script.remove();
    });

    // Function to block all <link> tags with rel="stylesheet" (CSS)
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    cssLinks.forEach(link => {
        if (link.href !== "https://bizbazboz.github.io/barbor/css/styles.css") {
            link.remove();
        }
    });

    // Runs the functions after the loading spinner has been hidden
    waitForPageLoad();
})();