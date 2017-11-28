const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

const parseInput = (input) => {
    return input
        .split("\n")
        .map((command) => {
            let matches;

            if (matches = command.match(/value (\d+) goes to bot (\d+)/)) {
                return {
                    type: "initialise",
                    value: parseInt(matches[1]),
                    botID: matches[2]
                };
            }

            if (matches = command.match(/bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)/)) {
                return {
                    type: "compare",
                    botID: matches[1],
                    low: {type: matches[2], id: matches[3]},
                    high: {type: matches[4], id: matches[5]}
                };
            }
        });
};

const createBot = (id) => {
    let state = {
        microchips: [],
        comparisons: []
    };

    return {
        id,
        assign: (value) => {
            state.microchips.push(value);
            state.microchips = _.sortBy(state.microchips);
        },
        compare: () => {
            const low = state.microchips.shift() || null;
            const high = state.microchips.pop() || null;

            state.comparisons.push([low, high]);

            return {low, high};
        },
        get microchips() { return state.microchips },
        get comparisons() { return state.comparisons }
    };
};

const createBotFactory = () => {
    let bots = {};

    return {
        get: (botID) => {
            if (!botID)
                return _.mapValues(bots, (bot) => ({
                    id: bot.id,
                    microchips: bot.microchips,
                    comparisons: bot.comparisons
                }));

            if (!bots[botID])
                bots[botID] = createBot(botID);

            return bots[botID];
        }
    };
};

const getValidInstructionIndex = (instructions, bots) => {
    return _.findIndex(instructions, (instruction) => {
        if (instruction.type === "initialise")
            return true;

        const bot = bots.get(instruction.botID);

        return bot.microchips.length >= 2;
    });
}

const executeInstructions = (instructions, bots = createBotFactory(), outputs = {}) => {
    if (_.isEmpty(instructions))
        return {
            bots: bots.get(),
            outputs
        };

    const validInstructionIndex = getValidInstructionIndex(instructions, bots);

    if (validInstructionIndex == -1)
        console.log("[WARNING]", "failed to find a valid instruction index!");

    const instruction = instructions[validInstructionIndex];
    const bot = bots.get(instruction.botID);

    // console.log("Current instruction:", instruction);

    if (instruction.type === "initialise") {
        bot.assign(instruction.value);
    } else if (instruction.type === "compare") {
        const {low, high} = bot.compare();

        switch (instruction.low.type) {
            case "bot":
                bots.get(instruction.low.id).assign(low);
                break;
            case "output":
                outputs[instruction.low.id] = low;
                break;
        }

        switch (instruction.high.type) {
            case "bot":
                bots.get(instruction.high.id).assign(high);
                break;
            case "output":
                outputs[instruction.high.id] = high;
                break;
        }
    }

    const rest = [...instructions.slice(0, validInstructionIndex), ...instructions.slice(validInstructionIndex + 1)];

    return executeInstructions(rest, bots, outputs);
};

const getBotWithComparison = (bots, search) => {
    return _.find(bots, (bot) => {
        return _.find(bot.comparisons, (comparison) => {
            return _.every(search, (value) => _.includes(comparison, value))
        });
    });
};

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const instructions = parseInput(input.trim());

    const {bots, outputs} = executeInstructions(instructions);
    const botComparingSeventeenAndSixtyOne = getBotWithComparison(bots, [17, 61])

    console.log("Part 1:", botComparingSeventeenAndSixtyOne.id); // 101.
    console.log("Part 2:", outputs[0] * outputs[1] * outputs[2]); // 37789.
};

module.exports = {
    parseInput,
    executeInstructions,
    getBotWithComparison,
    run
};
