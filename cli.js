#!/usr/bin/env node

var path = require('path');
var cwd = process.cwd();

try {
    var pkg = require(path.join(cwd, 'package.json'));
    if(!pkg.devDependencies || !pkg.devDependencies['doudou']) {
        console.warn('Please run `npm install --save-dev doudou`');
        process.exit(1);
    }
}
catch(e) {
    console.warn('Your project need a package.json to use doudou');
    process.exit(1);
}

try {
    require(path.join(cwd, 'DoudouFile.js'));
}
catch(e) {
    console.warn('Please run `npm install --save-dev doudou`');
    console.log(e);
    process.exit(1);
}

var doudou = require.cache['doudou'].exports;
var yargs = require('yargs');

yargs = yargs.usage('Usage: $0 [options] <commands...>')
    .demand(1)
    .options('w', {
        alias: 'watch',
        default: false,
        desc: "Watch files for modifications"
    }).boolean('w')
    .options('s', {
        alias: 'serve',
        default: 8080,
        desc: "Serve $builddir over http port"
    });

doudou.listCommands().forEach(function(cmd) {
    yargs = yargs.example('`$0 '+cmd.name+'`', cmd.desc || ("run command "+cmd.name));
});

yargs.check(function(argv) {
    var unknown = [];
    argv._.forEach(function(cmd) {
        if(!doudou.commandExists(cmd))
            unknown.push(cmd);
    });
    if(unknown.length == 1)
        throw "Unknown command: "+ unknown[0];
    if(unknown.length > 1)
        throw "Unknown commands: "+ unknown.join(', ');
    return true;
});


console.log(yargs.argv);
