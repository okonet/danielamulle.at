require('./styles.scss');
skrollr = require('skrollr');

// Utils
var d = document;

function $(selector) {
    return document.querySelector(selector)
}
function $$(selector) {
    var nodeList = document.querySelectorAll(selector)
    return Array.prototype.slice.call(nodeList)
}


document.addEventListener('DOMContentLoaded', function () {
    var logoEl = $('.logo')
    var sections = $$('.section')
    var links = $$('.logo__link, .nav__link')
    var menuEl = $('.nav')
    var navPages = $$('.nav__page')
    var navToggleEl = $('.nav__hamburger')
    var activeSectionIdx = 0
    var previousOffset = 0
    var scroller = skrollr.init({
        smoothScrolling: false,
        forceHeight: false,
        mobileCheck: function () {
            return false
        }
    });

    navToggleEl.addEventListener('click', function (event) {
        menuEl.classList.toggle('nav_open')
    }, false)

    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            var activeSection = $('section.active')
            var href = link.attributes['href'].value
            var id = href.replace('#', '')
            var section = d.getElementById(id)
            var offset = id === 'home' ? 0 : scroller.relativeToAbsolute(section, 'top', 'top')
            var duration = Math.round(Math.abs(previousOffset - offset)/3)
            var currentScrollOffset = scroller.getScrollTop()
            previousOffset = offset

            // Close menu
            menuEl.classList.remove('nav_open')

            window.setTimeout(function () {
                scroller.setScrollTop(currentScrollOffset)
            }, 0)

            window.setTimeout(function () {
                scroller.animateTo(offset, {
                    duration: duration,
                    easing: 'outCubic'
                })
                section.classList.toggle('active')
            }, 500)

            if (activeSection !== null && activeSection.id !== id) {
                activeSection.classList.remove('active')
            }

        });
    });

    var offsets = sections.map(function (section) {
        return scroller.relativeToAbsolute(section, 'top', 'top')
    });

    scroller.on('render', function (evt) {
        var newActiveSectionIdx = 0
        for (var idx = 0; idx < offsets.length; idx++) {
            if (evt.curTop >= offsets[idx] - 150 && (evt.curTop <= offsets[idx + 1] - 150 || idx === offsets.length - 1)) {
                newActiveSectionIdx = idx;
                break;
            }
        }

        if (newActiveSectionIdx !== activeSectionIdx) {
            var activeSectionName = sections[activeSectionIdx].id;
            var newActiveSectionName = sections[newActiveSectionIdx].id;

            logoEl.classList.remove('logo_' + activeSectionName);
            logoEl.classList.add('logo_' + newActiveSectionName);

            sections[activeSectionIdx].classList.remove('active');
            navPages[activeSectionIdx].classList.remove('active');

            sections[newActiveSectionIdx].classList.add('active');
            navPages[newActiveSectionIdx].classList.add('active');

            activeSectionIdx = newActiveSectionIdx;
        }
    });


}, false);
