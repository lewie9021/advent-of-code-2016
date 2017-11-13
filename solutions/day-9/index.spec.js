const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, explodeInput } = require("./");

describe("Day 7:", function() {

    describe("Part 1:", function() {

        it("returns 'ADVENT' for 'ADVENT'", function() {
            expect(explodeInput("ADVENT")).to.eq("ADVENT");
        });

        it("returns 'ABBBBBC' for 'A(1x5)BC'", function() {
            expect(explodeInput("A(1x5)BC")).to.eq("ABBBBBC");
        });

        it("returns 'XYZXYZXYZ' for '(3x3)XYZ'", function() {
            expect(explodeInput("(3x3)XYZ")).to.eq("XYZXYZXYZ");
        });

        it("returns 'ABCBCDEFEFG' for 'A(2x2)BCD(2x2)EFG'", function() {
            expect(explodeInput("A(2x2)BCD(2x2)EFG")).to.eq("ABCBCDEFEFG");
        });

        it("returns '(1x3)A' for '(6x1)(1x3)A'", function() {
            expect(explodeInput("(6x1)(1x3)A")).to.eq("(1x3)A");
        });

        it("returns 'X(3x3)ABC(3x3)ABCY' for 'X(8x2)(3x3)ABCY'", function() {
            expect(explodeInput("X(8x2)(3x3)ABCY")).to.eq("X(3x3)ABC(3x3)ABCY");
        });

    });

});
