// console.log("HELLO ES6")

// console.log(`Hello, ${process.argv[2]}!
// Your name lowercased is "${process.argv[2].toLowerCase()}".`);

// var inputs = process.argv.slice(2);
// var result = inputs.map(x => x[0])
//                    .reduce((y,x) => y + x, '');
// console.log(`[${inputs}] becomes "${result}"`);

// var numbers = process.argv.slice(2);
// var min = Math.min(...numbers);
// console.log(`The minimum of [${numbers}] is ${min}`);

module.exports = function average(...args) {
	return args.reduce((sum, x) => sum + x, 0) / args.length;
};

module.exports = function midpoint(lower=0, upper=1) {
    return (lower + upper) / 2;
};

module.exports = (str, num = str.length) => `${str}${'!'.repeat(num)}`;

console.log(html`<b>${process.argv[2]} says</b>: "${process.argv[3]}"`);

function html(tpls, ...args) {
    var str = tpls[0];
    for (var i = 0; i < args.length; i++) {
        str = str + escape(args[i]) + tpls[i + 1];
    };
    return str;
}

function escape(raw) {
    return raw.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/'/g, "&#39;")
			.replace(/"/g, "&quot;");
};