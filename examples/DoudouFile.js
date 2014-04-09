
var doudou = require('doudou');
var path = require('path');

var jsxFiles = [/* a list of files to transform */];

doudou.task('views', function(doudou) {
    return doudou.all(jsxFiles).parse();
});

doudou.task('style', function(doudou, opts) {
    return doudou.parse(path.join(__dirname, 'assets', 'style.styl'), opts);
});

doudou.task('save', function(doudou, name) {
    return doudou.hash('md5').write('$builddir/'+(name || '$basename')+'-$md5.$(type.extension)');
});

doudou.cmd('release', function(doudou) {
    doudou.views.concat.minify.uglify.save('views');
    doudou.style.save('style');
});

doudou.cmd('debug', function(doudou) {
    doudou.views.save();
    doudou.style.save('style');
});

