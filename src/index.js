require('./styles.scss');
skrollr = require('skrollr')

skrollr.init({
  smoothScrolling: false
})

var d = document
var links = d.querySelectorAll('h2 a')
Array.prototype.slice.call(links).forEach(function(link) {
  link.addEventListener('click', function(event) {
    // event.preventDefault()
    activeSection = d.querySelector('section.active')

    var href = event.target.attributes['href'].value
    var id = href.replace('#', '')
    var section = d.getElementById(id)
    section.classList.toggle('active')

    if (activeSection !== null && activeSection.id !== id) {
      activeSection.classList.remove('active')
    }

  })
})
