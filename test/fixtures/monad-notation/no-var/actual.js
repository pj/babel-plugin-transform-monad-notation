function Option(value) {
    this.value = value;
}

Option.prototype.then = function (func) {
    return func();
};

function qwer() {
    return new Option("world");
}

var x = do {
    qwer();
    new Option("hello");
};
