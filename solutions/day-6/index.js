const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

const parseInput = (input) => {
    const lines = input
        .split("\n")
        .map((line) => line.split(""));

    return _.zipWith(...lines, (...characters) => characters);
}

const getMostCommonCharacter = (column) => {
    return _.chain(column)
        .reduce((result, character) => {
            result[character] = _.get(result, character, 0) + 1;

            return result;
        }, {})
        .map((count, character) => ({
            character,
            count
        }))
        .sortBy("count")
        .last()
        .get("character")
        .value();
}

const getErrorCorrectedMessage = (columns) => {
    return columns
        .map((column) => getMostCommonCharacter(column))
        .join("");
};

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const columns = parseInput(input.trim());

    console.log("Part 1:", getErrorCorrectedMessage(columns)); // qoclwvah
    console.log("Part 2:"); //
};

module.exports = {
    parseInput,
    getErrorCorrectedMessage,
    run
};
