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

// Takes a direction and ensures it falls within 0 to 359.
const wrapDirection = (direction) => {
    return (direction + (Math.abs(Math.floor(-450 / 360)) * 360)) % 360;
};

// Given a list of parsed instructions, returns the resulting location.
const getFinalLocation = (instructions) => {
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

// Given a list of parsed instructions, returns the first location visited twice.
const getFirstLocationVisitedTwice = (instructions) => {
    return _.reduce(instructions, (result, instruction) => {
        if (result.history[result.x + "," + result.y])
            return result;

        result.direction = wrapDirection(result.direction + instruction.direction);

        // Record each step in history so we know if we've already visited it.
        _.times(instruction.steps, () => {
            if (result.history[result.x + "," + result.y])
                return;

            result.history[result.x + "," + result.y] = true;

            switch (result.direction) {
                case 0: result.y -= 1; break;
                case 90: result.x += 1; break;
                case 180: result.y += 1; break;
                case 270: result.x -= 1; break;
            }
        });

        return result;
    }, {direction: 0, x: 0, y: 0, history: {}});
}

// Calculates the Manhattan distance.
const getBlocksAway = (location) => {
    return Math.abs(location.x) + Math.abs(location.y)
};

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const instructions = parseInput(input);

    console.log("Part 1:", getBlocksAway(getFinalLocation(instructions))); // 146
    console.log("Part 2", getBlocksAway(getFirstLocationVisitedTwice(instructions))); // 131
};

module.exports = {
    parseInput,
    getFinalLocation,
    getFirstLocationVisitedTwice,
    getBlocksAway,
    run
};
