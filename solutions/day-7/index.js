const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

const parseInput = (input) => {
    const lines = input
        .split("\n")

    return lines;
}

const findAutonomousBridgeBypassAnnotation = (part) => {
    if (part.length < 4)
        return false;

    for (let i = 0; i <= part.length - 4; i += 1) {
        const [a, b, c, d] = part.substr(i, 4);

        if (a == d && b == c && a != b && c != d)
            return true;
    }

    return false;
}

const getTransportLayerSnoopingSupport = (ipAddress) => {
    const rawParts = ipAddress.match(/\[?([a-z]+)\]?/g);
    const result = _.groupBy(rawParts, (rawPart) => {
        const isHypernetSequence = rawPart.startsWith("[") && rawPart.endsWith("]");
        const part = isHypernetSequence ? rawPart.substr(1, rawPart.length - 2) : rawPart;
        const hasABBA = findAutonomousBridgeBypassAnnotation(part);

        if (!hasABBA)
            return "notFound";

        if (isHypernetSequence)
            return "invalid";

        return "valid";
    });

    return _.isEmpty(result.invalid) && !_.isEmpty(result.valid);
};

const getNumberOfTLSIPAddresses = (ipAddresses) => {
    return _.reduce(ipAddresses, (result, ipAddress) => {
        const isTLS = getTransportLayerSnoopingSupport(ipAddress);

        return result + (isTLS ? 1 : 0);
    }, 0);
}

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const ipAddresses = parseInput(input.trim());

    console.log("Part 1:", getNumberOfTLSIPAddresses(ipAddresses)); // 110.
};

run();

module.exports = {
    parseInput,
    getTransportLayerSnoopingSupport,
    run
};
