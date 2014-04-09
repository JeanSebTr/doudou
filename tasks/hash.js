
var doudou = require('doudou');

var fs = require('fs');
var crypto = require('crypto');

var tmp = require('tmp');


doudou.task('hash', function(doudou, hashType) {
    if(typeof hashType == "undefined") {
        hashType = 'md5';
        console.warn("Undefined hash type @" + doudou._stackTrace + ". Will use 'md5' as default.");
    }
    if(crypto.getHashes().indexOf(hashType) == -1)
        return doudou._error(new Error('Unkown hash algorithm "'+hashType+'"'));
    tmp.file(tmpFileCreated.bind(doudou, hashType));

    // wait for this doudou to complete
    return doudou;
}, {
    output: ['tmp']
});

function tmpFileCreated(hashType, err, path, fd) {
    if(err)
        return this._error(err);

    var input = this._getReadStream();

    var tempFile = fs.createWriteStream(path, {fd: fd});

    var hash = crypto.createHash(hashType);

    input.pipe(hash);
    input.pipe(tempFile);

    var doudou = this;
    hash.on('readable', function() {
        var digest = hash.read();
        doudou._set(hashType, digest.toString('hex'));
        doudou._ready(path);
    });
}
