const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

// Parses the input so it can be processed easier.
const parseInput = (input) => {
    return input
        .split("\n")
        .map((sides) => {
            return sides
                .trim()
                .split(/\s+/)
                .map((side) => parseInt(side));
        });
};

const isValid = (triangle) => {
    const [one, two, three] = _.sortBy(triangle);

    return (one + two) > three;
};

const getValidTriangles = (triangles) => {
    return triangles
        .filter((triangle) => isValid(triangle));
};

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const triangles = parseInput(input.trim());

    console.log("Part 1:", getValidTriangles(triangles).length); // 1050
    console.log("Part 2:"); //
};

run();

module.exports = {
    parseInput,
    getValidTriangles,
    run
};
