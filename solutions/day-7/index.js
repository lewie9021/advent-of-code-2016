const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

const parseInput = (input) => {
    return input
        .split("\n");
};

const getIsHypernetSequence = (rawPart) => {
    return rawPart.startsWith("[") && rawPart.endsWith("]");
};

const getRawParts = (ipAddress) => {
    return ipAddress.match(/\[?([a-z]+)\]?/g);;
};

const getMatchingChunks = (part, chunkSize, predicate) => {
    if (part.length < chunkSize)
        return [];

    let result = [];

    for (let i = 0; i <= part.length - chunkSize; i += 1) {
        const chunk = part.substr(i, chunkSize);

        if (predicate(chunk, i)) {
            result.push(chunk);

            continue;
        }
    }

    return result;
};

const getAutonomousBridgeBypassAnnotations = (part) => {
    return getMatchingChunks(part, 4, (chunk) => {
        const [a, b, c, d] = chunk;

        if (a == d && b == c && a != b && c != d)
            return true;

        return false;
    });
};

const getAreaBroadcastAccessors = (part) => {
    return getMatchingChunks(part, 3, (chunk) => {
        const [a, b, c] = chunk;

        if (a == c && b != a && b != c)
            return true;

        return false;
    });
};

const getTransportLayerSnoopingSupport = (ipAddress) => {
    const rawParts = getRawParts(ipAddress);

    const {hypernet, supernet} = _.reduce(rawParts, (result, rawPart) => {
        const isHypernetSequence = getIsHypernetSequence(rawPart);
        const part = isHypernetSequence ? rawPart.substr(1, rawPart.length - 2) : rawPart;
        const abbas = getAutonomousBridgeBypassAnnotations(part);

        abbas.forEach((abba) => {
            const sequence = isHypernetSequence ? "hypernet" : "supernet";

            if (!result[sequence])
                result[sequence] = [];

            result[sequence].push(abba);
        });

        return result;
    }, {});

    return _.isEmpty(hypernet) && !_.isEmpty(supernet);
};

const getSuperSecretListeningSupport = (ipAddress) => {
    const rawParts = getRawParts(ipAddress);

    const {hypernet, supernet} = _.reduce(rawParts, (result, rawPart) => {
        const isHypernetSequence = getIsHypernetSequence(rawPart);
        const part = isHypernetSequence ? rawPart.substr(1, rawPart.length - 2) : rawPart;
        const abas = getAreaBroadcastAccessors(part);

        abas.forEach((aba) => {
            const sequence = isHypernetSequence ? "hypernet" : "supernet";

            if (!result[sequence])
                result[sequence] = [];

            result[sequence].push(aba);
        });

        return result;
    }, {});

    if (_.isEmpty(hypernet) || _.isEmpty(supernet))
        return false;

    const match = _.find(hypernet, (hypernetABA) => {
        const [a, b, c] = hypernetABA.split("");
        const hypernetBAB = [b, a, b].join("");

        return _.includes(supernet, hypernetBAB);
    });

    return match ? true : false;
};

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const ipAddresses = parseInput(input.trim());

    console.log("Part 1:", _.filter(ipAddresses, getTransportLayerSnoopingSupport).length); // 110.
    console.log("Part 2:", _.filter(ipAddresses, getSuperSecretListeningSupport).length); // 242.
};

module.exports = {
    parseInput,
    getTransportLayerSnoopingSupport,
    getSuperSecretListeningSupport,
    run
};
