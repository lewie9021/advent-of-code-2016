const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

const getMarker = (match) => {
    if (!match.startsWith("(") || !match.endsWith(")"))
        return null;

    const parts = match.match(/\d+/g);

    return {
        range: parseInt(parts[0]),
        repeat: parseInt(parts[1])
    };
};

const explodeInput = (input) => {
    const pattern = /([A-Z]+)|(\(\d+x\d+\)?)/gi;
    let result = "";
    let matches;

    while ((matches = pattern.exec(input)) !== null) {
        const match = matches[0];
        const marker = getMarker(match);

        if (!marker) {
            result += match;

            continue;
        }

        const chunk = input.substr(pattern.lastIndex, marker.range);

        result += _.repeat(chunk, marker.repeat);

        pattern.lastIndex += marker.range;
    }

    return result;
};

const explodeInputLength = (input) => {
    const pattern = /([A-Z]+)|(\(\d+x\d+\)?)/gi;
    let result = 0;
    let matches;

    while ((matches = pattern.exec(input)) !== null) {
        const match = matches[0];
        const marker = getMarker(match);

        if (!marker) {
            result += match.length;

            continue;
        }

        const chunkLength = explodeInputLength(input.substr(pattern.lastIndex, marker.range));

        result += chunkLength * marker.repeat;

        pattern.lastIndex += marker.range;
    }

    return result;
};

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const text = input.trim();

    console.log("Part 1:", explodeInput(text).length); // 112830.
    console.log("Part 2:", explodeInputLength(text)); // 10931789799.
};

module.exports = {
    explodeInput,
    explodeInputLength,
    run
};
