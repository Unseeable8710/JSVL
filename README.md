# JSVL
JSVL, which stands for JavaScript Variable Locator, is a simple tool that allows you to execute code when a global variable is located.

## Usage
The main function in JSVL is called as follows:
```javascript
waitForGlobal(obj, keyPath, callback);
```
- `obj` is the object the key is located in. This is usually `window`, but a userscript might use `unsafeWindow` (or some abbreviation) when trying to access the contents of the site it's running in.
- `keyPath` is a string that represents the path to the key. If you're looking for `window.foo`, `keyPath` would be `"foo"`. If you're looking for `window.foo.bar`, `keyPath` would be `"foo.bar"`.
- `callback` is the function that's called when the variable you're looking for is found.

### Example
This is an example from my [Noteflight Tuplet Improver](https://github.com/Unseeable8710/Noteflight-Tuplet-Improver) userscript:
```javascript
var nfeditor;
waitForGlobal(uwin, "nfeditor", () => {
  nfeditor = uwin.nfeditor;
  nfeditor.palette().currentPalette().applyTuplet = (e) => {
    if (e == "septuplet") {
      var l = uwin.prompt("Enter number of notes in tuplet:");
      nfeditor.documentController.controller.createTuplet(parseInt(l));
    } else {
      nfeditor.palette().currentPalette().applyAction("tuplet", {
        duplet: 2,
        triplet: 3,
        quadruplet: 4,
        quintuplet: 5,
        sextuplet: 6
      }[e]);
    }
  };
});
```
In this example, I created an empty variable called `nfeditor`, which is the name of the object Noteflight uses to store editor information and functions, like `palette().currentPalette().applyTuplet`, which inserts a [tuplet](https://en.wikipedia.com/wiki/Tuplet) of an integer length greater than 2 on the selected note or rest (I'm not sure how accurate that was, I'm not a Noteflight developer, after all). I then called `waitForGlobal();`, where `uwin` was my variable that represent the Tampermonkey object `unsafeWindow`, `"nfeditor"` was the name of the object I was trying to retrieve, and the callback was a function that set my `nfeditor` variable equal to `uwin.nfeditor` and started waiting for the user to click the septuplet option in the opened the prompt to enter the number of notes in the tuplet. The callback only gets called when `nfeditor` exists.
