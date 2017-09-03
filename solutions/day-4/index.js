const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

// Parses the input so it can be processed easier.
const parseInput = (input) => {
    return input
        .split("\n")
        .map((room) => ({
            encryptedName: room.match(/^(-?[a-z])+/)[0],
            sectorID: parseInt(room.match(/\d+/)[0]),
            checksum: room.match(/\[([a-z]+)\]/)[1]
        }));
};

const isRealRoom = (room) => {
    const checksum = _.chain(room.encryptedName)
        .reduce((result, letter) => {
            if (letter == "-")
                return result;

            const match = _.find(result, {letter});

            if (match)
                match.count += 1;
            else
                result.push({
                    letter,
                    count: 1
                });

            return result;
        }, [])
        .sort((x, y) => {
            if (x.count < y.count)
                return 1;

            if (x.count > y.count)
                return -1

            if (x.letter < y.letter)
                return -1;

            if (x.letter > y.letter)
                return 1;

            return 0
        })
        .slice(0, 5)
        .map("letter")
        .join("")
        .value();

    return room.checksum == checksum;
};

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const rooms = parseInput(input.trim());

    console.log("Part 1:"); //
    console.log("Part 2:"); //
};

run();

module.exports = {
    parseInput,
    isRealRoom,
    run
};
