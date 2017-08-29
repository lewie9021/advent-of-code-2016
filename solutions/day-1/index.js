const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

// Parses the input so it can be processed easier.
const parseInput = (input) => {
    return input
        .split(", ")
        .map((instruction) => {
            const matches = instruction.match(/([A-Z])|(\d+)/g)
            const direction = matches[0];

            return {
                direction: direction == "R" ? 90 : -90,
                steps: parseInt(matches[1])
            };
        });
};

// Takes a direction and ensures it falls within 0-359.
const wrapDirection = (direction) => {
    return (direction + (Math.abs(Math.floor(-450 / 360)) * 360)) % 360;
};

// Given a list of parsed instructions, returns the resulting direction, x, and y.
const simulateInstrutions = (instructions) => {
    return _.reduce(instructions, (result, instruction) => {
        result.direction = wrapDirection(result.direction + instruction.direction);

        switch (result.direction) {
            case 0: result.y -= instruction.steps; break;
            case 90: result.x += instruction.steps; break;
            case 180: result.y += instruction.steps; break;
            case 270: result.x -= instruction.steps; break;
        }

        return result;
    }, {direction: 0, x: 0, y: 0});
}

// Calculates the Manhattan distance.
const getBlocksAway = (input) => {
    const instructions = parseInput(input);
    const result = simulateInstrutions(instructions)

    return Math.abs(result.x) + Math.abs(result.y);
};

const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");

    console.log("Part 1:", getBlocksAway(input));
}

module.exports = {
    getBlocksAway,
    run
};
