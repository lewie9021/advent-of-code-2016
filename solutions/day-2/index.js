const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

const keypad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"]
];

// Parses the input so it can be processed easier.
const parseInput = (input) => {
    return input
        .split("\n")
        .map((line) => line.split(""));
};

// Given an x and y location, returns the keypad value.
const getKeypadValue = ({x, y}) => {
    return _.get(keypad, [y, x], null);
};

// Given a keypad value, returns the x and y location.
const getKeypadLocation = (value) => {
    for (let y = 0; y < keypad.length; y += 1) {
        const row = keypad[y];

        for (let x = 0; x < row.length; x += 1) {
            const cellValue = row[x];

            if (cellValue == value)
                return {x, y};
        }
    }

    return null;
}

// Given a starting value and an array of directions, returns a new keypad value.
const getDigit = (startValue, directions) => {
    const endLocation = _.reduce(directions, (result, direction) => {
        switch (direction) {
            case "U": result.y = Math.max(0, result.y - 1); break;
            case "D": result.y = Math.min(2, result.y + 1); break;
            case "L": result.x = Math.max(0, result.x - 1); break;
            case "R": result.x = Math.min(2, result.x + 1); break;
        }

        return result;
    }, getKeypadLocation(startValue));

    return getKeypadValue(endLocation);
}

// Given a starting value and an array of instructions, returns the code.
const getCode = (startValue, instructions) => {
    const result = _.reduce(instructions, (result, directions) => {
        const digit = getDigit(result.currentValue, directions);

        result.code += digit;
        result.currentValue = digit

        return result;
    }, {currentValue: startValue, code: ""});

    return result.code;
};

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const instructions = parseInput(input.trim());

    console.log("Part 1:", getCode("5", instructions));
    console.log("Part 2:");
};

run();

module.exports = {
    parseInput,
    getCode,
    run
};
