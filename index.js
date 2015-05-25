// Client-side render
if (typeof document !== 'undefined') {
    require('./src/index.js');
}
// Exported static site renderer:
module.exports = function render(locals, callback) {
    //console.log();
    callback(null, locals.html);
};
