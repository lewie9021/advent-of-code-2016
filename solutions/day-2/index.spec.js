const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, getCode } = require("./");

describe("Day 1:", () => {

    describe("Part 1:", () => {

        it("returns 1985, given the example instructions starting at 5", () => {
            const input = ["ULL", "RRDDD", "LURDL", "UUUUD"].join("\n");
            const instructions = parseInput(input);

            expect(getCode("5", instructions)).to.eq("1985");
        });

    });

    describe("Part 2:", () => {

    });

});
