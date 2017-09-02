const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, getCode, keypads } = require("./");

describe("Day 2:", () => {

    describe("Part 1:", () => {

        it("returns 1985, given the example instructions starting at 5", () => {
            const input = ["ULL", "RRDDD", "LURDL", "UUUUD"].join("\n");
            const instructions = parseInput(input);

            expect(getCode(keypads.v1, "5", instructions)).to.eq("1985");
        });

    });

    describe("Part 2:", () => {

      it("returns 5DB3, given the example instructions starting at 5", () => {
          const input = ["ULL", "RRDDD", "LURDL", "UUUUD"].join("\n");
          const instructions = parseInput(input);

          expect(getCode(keypads.v2, "5", instructions)).to.eq("5DB3");
      });

    });

});
