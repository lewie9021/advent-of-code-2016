const { describe, it } = require("mocha");
const { expect } = require("chai");

const { createSimplePassword, createComplexPassword } = require("./");

describe("Day 5:", function() {

    describe("Part 1:", function() {

        it("returns '18f47a30', given a door ID of 'abc'", function() {
            this.timeout(0);
            expect(createSimplePassword("abc", 8)).to.eq("18f47a30");
        });

    });

    describe("Part 2:", function() {

        it("returns '05ace8e3', given a door ID of 'abc'", function() {
            this.timeout(0);
            expect(createComplexPassword("abc", 8)).to.eq("05ace8e3");
        });

    });

});
