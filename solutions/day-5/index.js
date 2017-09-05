const FS = require("fs");
const Path = require("path");
const Crypto = require("crypto");

const _ = require("lodash");

const md5 = (value) => {
    return Crypto
        .createHash("md5")
        .update(value)
        .digest("hex");
}

function* generateHash(doorID, predicate) {
    let index = 0;

    while (true) {
        const hash = md5(doorID + index);

        if (predicate(hash))
            yield hash;

        index += 1;
    }

}

const createSimplePassword = (doorID, characterCount) => {
    const generator = generateHash(doorID, (hash) => {
        return _.startsWith(hash, "00000")
    });
    let password = "";

    _.times(characterCount, () => {
        const hash = generator.next().value;

        password += hash[5];
    });

    return password;
}

const createComplexPassword = (doorID, characterCount) => {
    let password = _.repeat("_", characterCount);
    const generator = generateHash(doorID, (hash) => {
        if (!_.startsWith(hash, "00000"))
            return false;

        const position = parseInt(hash[5])

        // Ensure the position is a valid index.
        if (!(position >= 0 && position <= (characterCount - 1)))
            return false;

        return password[position] == "_";
    });

    _.times(characterCount, () => {
        const hash = generator.next().value;
        const position = parseInt(hash[5]);
        const value = hash[6];

        password = password.substr(0, position) + value + password.substr(position + 1);
    });

    return password;
}

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const doorID = input.trim();

    console.log("Part 1:", createSimplePassword(doorID, 8)); // d4cd2ee1
    console.log("Part 2:", createComplexPassword(doorID, 8)); // f2c730e5
};

module.exports = {
    createSimplePassword,
    createComplexPassword,
    run
};
