function checkNested(obj, args) {
  for (var i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}
function waitForGlobal(obj, keyPath, callback) {
  var args = keyPath.split('.');
  if (checkNested(obj, args)) {
    callback();
  } else {
    setTimeout(function() {
      waitForGlobal(keyPath, callback);
    }, 100);
  }
}
