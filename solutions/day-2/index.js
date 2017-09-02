const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

const keypads = {
    v1: [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"]
    ],
    v2: [
      [null, null, "1", null, null],
      [null,  "2", "3", "4",  null],
      ["5",  "6",  "7",  "8",  "9"],
      [null,  "A", "B", "C",  null],
      [null, null, "D", null, null]
    ]
};

// Parses the input so it can be processed easier.
const parseInput = (input) => {
    return input
        .split("\n")
        .map((line) => line.split(""));
};

// Given an x and y location, returns the keypad value.
const getKeypadValue = (keypad, {x, y}) => {
    return _.get(keypad, [y, x], null);
};

// Given a keypad value, returns the x and y location.
const getKeypadLocation = (keypad, value) => {
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
const getDigit = (keypad, startValue, directions) => {
    const endLocation = _.reduce(directions, (result, direction) => {
        switch (direction) {
            case "U": 
                if (getKeypadValue(keypad, {x: result.x, y: result.y - 1}))
                    result.y -= 1;
            break;
            case "D":
                if (getKeypadValue(keypad, {x: result.x, y: result.y + 1}))
                    result.y += 1;
            break;
            case "L":
                if (getKeypadValue(keypad, {x: result.x - 1, y: result.y}))
                    result.x -= 1;
            break;
            case "R":
                if (getKeypadValue(keypad, {x: result.x + 1, y: result.y}))
                    result.x += 1;
            break;
        }

        return result;
    }, getKeypadLocation(keypad, startValue));

    return getKeypadValue(keypad, endLocation);
}

// Given a starting value and an array of instructions, returns the code.
const getCode = (keypad, startValue, instructions) => {
    const result = _.reduce(instructions, (result, directions) => {
        const digit = getDigit(keypad, result.currentValue, directions);

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

    console.log("Part 1:", getCode(keypads.v1, "5", instructions)); // 52981
    console.log("Part 2:", getCode(keypads.v2, "5", instructions)); // 74CD2
};

module.exports = {
    keypads,
    parseInput,
    getCode,
    run
};
