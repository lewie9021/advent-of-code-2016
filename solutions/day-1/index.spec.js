const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, getFinalLocation, getFirstLocationVisitedTwice, getBlocksAway } = require("./");

describe("Day 1:", () => {

    describe("Part 1:", () => {

        it("returns 5, given 'R2, L3'", () => {
            const instructions = parseInput("R2, L3");
            const location = getFinalLocation(instructions);

            expect(getBlocksAway(location)).to.eq(5);
        });

        it("returns 2, given 'R2, R2, R2'", () => {
            const instructions = parseInput("R2, R2, R2");
            const location = getFinalLocation(instructions);

            expect(getBlocksAway(location)).to.eq(2);
        });


        it("returns 12, given 'R5, L5, R5, R3'", () => {
            const instructions = parseInput("R5, L5, R5, R3");
            const location = getFinalLocation(instructions);

            expect(getBlocksAway(location)).to.eq(12);
        });

    });

    describe("Part 2:", () => {

        it("returns 4, given 'R8, R4, R4, R8'", () => {
            const instructions = parseInput("R8, R4, R4, R8");
            const location = getFirstLocationVisitedTwice(instructions);

            expect(getBlocksAway(location)).to.eq(4);
        });

    });

});
