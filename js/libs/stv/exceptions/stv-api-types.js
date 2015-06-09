export default  {
    _errorMessage (value, type) {
        var e = new TypeError(value + " is not a " + type + " [type is: " + typeof value + "]. Please check the argument you are passing.");
        throw e;
        console.log("Line Number (Chrome only): " + e.lineNumber);
        console.log("Filename (Chrome only): " +e.fileName);
    },
    isNumber (value) {
        if (typeof value === "number") {
            return true;
        } else {
            this._errorMessage(value, "Number");

        }
    },
    isString (value) {
        if (typeof value === "string") {
            return true;
        } else {
            this._errorMessage(value, "String");
        }
    },
    isBoolean (value) {
        // handle if "true" or true, "false" or false
        if (typeof !!value === "boolean") {
            return true
        } else {
            this._errorMessage(value, "Boolean");

        }
    }
}
