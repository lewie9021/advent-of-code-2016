const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

// Parses the input so it can be processed easier.
const parseInputHorizontally = (input) => {
    return input
        .split("\n")
        .map((sides) => {
            return sides
                .trim()
                .split(/\s+/)
                .map((side) => parseInt(side));
        });
};

// Parses the input so it can be processed easier.
const parseInputVertically = (input) => {
    return _.chain(parseInputHorizontally(input))
        .chunk(3)
        .map((chunk) => {
            return _.zipWith(...chunk, (a, b, c) => {
                return [a, b, c];
            });
        })
        .flatten()
        .value();
}

const getValidTriangles = (triangles) => {
    return triangles
        .filter((triangle) => {
            const [one, two, three] = _.sortBy(triangle);

            return (one + two) > three;
        });
};

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const horizontalTriangles = parseInputHorizontally(input.trim());
    const verticalTriangles = parseInputVertically(input.trim());

    console.log("Part 1:", getValidTriangles(horizontalTriangles).length); // 1050
    console.log("Part 2:", getValidTriangles(verticalTriangles).length); //
};

run();

module.exports = {
    parseInputHorizontally,
    parseInputVertically,
    getValidTriangles,
    run
};
