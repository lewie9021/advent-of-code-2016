const FS = require("fs");
const Path = require("path");
const Crypto = require("crypto")

const _ = require("lodash");

const md5 = (value) => {
    return Crypto
        .createHash("md5")
        .update(value)
        .digest("hex");
}

const createPassword = (doorID, characterCount) => {
    let password = "";
    let index = -1;

    _.times(characterCount, () => {
        while (true) {
            index += 1;
            const hash = md5(doorID + index);

            if (!_.startsWith(hash, "00000"))
                continue;

            password += hash[5];
            break;
        }

    });

    return password;
}

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const doorID = input.trim();

    console.log("Part 1:", createPassword(doorID, 8)); // d4cd2ee1
    console.log("Part 2:"); //
};

run();

module.exports = {
    createPassword,
    run
};
