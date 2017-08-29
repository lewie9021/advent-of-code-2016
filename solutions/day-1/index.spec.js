const { describe, it } = require("mocha");
const { expect } = require("chai");

const { getBlocksAway } = require("./");

describe("Day 1:", () => {

    describe("Part 1:", () => {

        it("returns 5, given 'R2, L3'", () => {
            expect(getBlocksAway("R2, L3")).to.eq(5);
        });

        it("returns 2, given 'R2, R2, R2'", () => {
            expect(getBlocksAway("R2, R2, R2")).to.eq(2);
        });


        it("returns 2, given 'R5, L5, R5, R3'", () => {
            expect(getBlocksAway("R5, L5, R5, R3")).to.eq(12);
        });

    });

});
