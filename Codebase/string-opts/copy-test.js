var str = Buffer.alloc(3 * 1024, 65).toString('ascii');
var copy = str.slice();
%DebugPrint(str);
%DebugPrint(copy);
