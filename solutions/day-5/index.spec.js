const { describe, it } = require("mocha");
const { expect } = require("chai");

const { createPassword } = require("./");

describe("Day 4:", () => {

    describe("Part 1:", () => {

        it("returns '18f47a30', given a door ID of 'abc'", () => {
            expect(createPassword("abc", 8)).to.eq("18f47a30");
        });

    });

    describe("Part 2:", () => {

    });

});
