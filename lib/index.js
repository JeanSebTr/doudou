
function doudou(task, file) {
    //
}
module.exports = doudou;
require.cache['doudou'] = module;

doudou.listTasks = function(file) {
    var taks = require(file);
    
};

doudou.task = function(name, fn, def) {
    //
};

var _cmds = {};
doudou.cmd = function(name, desc, fn) {
    _cmds[name] = {
        name: name,
        desc: typeof desc == "function" ? "" : desc,
        fn: typeof desc == "function" ? desc : fn
    };
};

function retCommand(cmd) {
    return _cmds[cmd];
}

doudou.listCommands = function() {
    var commands = Object.keys(_cmds);
    return commands.map(retCommand);
};

doudou.commandExists = function(name) {
    return typeof _cmds[name] != "undefined";
};
