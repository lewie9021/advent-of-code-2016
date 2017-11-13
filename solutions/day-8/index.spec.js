const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, generateScreen, executeInstructions } = require("./");

describe("Day 7:", function() {

    describe("Part 1:", function() {
        const instructions = parseInput([
            "rect 3x2",
            "rotate column x=1 by 1",
            "rotate row y=0 by 4",
            "rotate column x=1 by 1"
        ].join("\n"));

        it("executes the first instruction correctly", function() {
            let screen = generateScreen(7, 3);

            expect(executeInstructions(screen, instructions.slice(0, 1))).to.eql([
                [1, 1, 1, 0, 0, 0, 0],
                [1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ]);
        });

        it("executes the first two instructions correctly", function() {
            let screen = generateScreen(7, 3);

            expect(executeInstructions(screen, instructions.slice(0, 2))).to.eql([
                [1, 0, 1, 0, 0, 0, 0],
                [1, 1, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0]
            ]);
        });

        it("executes the first three instructions correctly", function() {
            let screen = generateScreen(7, 3);

            expect(executeInstructions(screen, instructions.slice(0, 3))).to.eql([
                [0, 0, 0, 0, 1, 0, 1],
                [1, 1, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0]
            ]);
        });

        it("executes all four instructions correctly", function() {
            let screen = generateScreen(7, 3);

            expect(executeInstructions(screen, instructions)).to.eql([
                [0, 1, 0, 0, 1, 0, 1],
                [1, 0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0]
            ]);
        });

    });

    xdescribe("Part 2:", function() {

    });

});
