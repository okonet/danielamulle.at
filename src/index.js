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
    var sections = $$('section')
    var links = $$('h2 a')
    var navItems = $$('.nav__item')
    var scroller = skrollr.init({
        smoothScrolling: false,
        forceHeight: false,
        mobileCheck: function () {
            return false
        }
    });

    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault()
            var activeSection = $('section.active')
            var href = event.target.attributes['href'].value
            var id = href.replace('#', '')
            var section = d.getElementById(id)
            var offset = scroller.relativeToAbsolute(section, 'top', 'top')
            scroller.animateTo(offset, {
                duration: 250
            })

            section.classList.toggle('active')

            if (activeSection !== null && activeSection.id !== id) {
                activeSection.classList.remove('active')
            }

        });
    });

    var offsets = sections.map(function (section) {
        return scroller.relativeToAbsolute(section, 'top', 'top')
    });

    scroller.on('render', function (evt) {
        var activeSectionIdx = 0
        for (var idx = 0; idx < offsets.length; idx++) {
            if (evt.curTop >= offsets[idx] && (evt.curTop <= offsets[idx + 1] || idx === offsets.length - 1)) {
                activeSectionIdx = idx;
                break;
            }
        }

        sections.forEach(function (section) {
            section.classList.remove('active')
        });

        navItems.forEach(function (item) {
            item.classList.remove('active')
        });

        sections[activeSectionIdx].classList.add('active');
        navItems[activeSectionIdx].classList.add('active');
    });


}, false);
