const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, executeInstructions, getBotWithComparison } = require("./");

describe("Day 10:", function() {
    const example = [
        "value 5 goes to bot 2",
        "bot 2 gives low to bot 1 and high to bot 0",
        "value 3 goes to bot 1",
        "bot 1 gives low to output 1 and high to bot 0",
        "bot 0 gives low to output 2 and high to output 0",
        "value 2 goes to bot 2"
    ].join("\n");

    describe("Part 1:", function() {

        it("correctly parses the example into a list of instructions", function() {
            expect(parseInput(example)).to.eql([
                {
                    type: "initialise",
                    value: 5,
                    botID: "2"
                },
                {
                    type: "compare",
                    botID: "2",
                    low: {type: "bot", id: "1"},
                    high: {type: "bot", id: "0"}
                },
                {
                    type: "initialise",
                    value: 3,
                    botID: "1"
                },
                {
                    type: "compare",
                    botID: "1",
                    low: {type: "output", id: "1"},
                    high: {type: "bot", id: "0"}
                },
                {
                    type: "compare",
                    botID: "0",
                    low: {type: "output", id: "2"},
                    high: {type: "output", id: "0"}
                },
                {
                    type: "initialise",
                    value: 2,
                    botID: "2"
                }
            ]);
        });

        it("returns the state of the bots and ouputs correctly after running the instructions", function() {
            const instructions = parseInput(example);

            expect(executeInstructions(instructions)).to.eql({
                bots: {
                    0: {
                        id: "0",
                        microchips: [],
                        comparisons: [[3, 5]]
                    },
                    1: {
                        id: "1",
                        microchips: [],
                        comparisons: [[2, 3]]
                    },
                    2: {
                        id: "2",
                        microchips: [],
                        comparisons: [[2, 5]]
                    }
                },
                outputs: {
                    0: 5,
                    1: 2,
                    2: 3
                }
            });
        });

        it("returns bot 2, given the example instruction set", function() {
            const instructions = parseInput(example);
            const state = executeInstructions(instructions);

            expect(getBotWithComparison(state.bots, [2, 5]).id).to.eq("2");
        });

    });



    describe("Part 2:", function() {

    });

});
