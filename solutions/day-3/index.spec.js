const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, getValidTriangles } = require("./");

describe("Day 2:", () => {

    describe("Part 1:", () => {

        it("returns an array of triangle side lengths", () => {
            const input = ["  5  10  25", "  40  20  35"].join("\n");
            const triangles = parseInput(input);
            const expected = [[5, 10, 25], [40, 20, 35]];

            expect(triangles).to.eql(expected);
        });

        it("returns 0, given 2 invalid triangles", () => {
            const triangles = [[5, 10, 25], [3, 2, 1]];

            expect(getValidTriangles(triangles).length).to.eq(0);
        });

        it("returns 3, given 3 valid triangles", () => {
            const triangles = [[40, 20, 35], [10, 10, 10], [32, 42, 64]];

            expect(getValidTriangles(triangles).length).to.eq(3);
        });

        it("returns 1, given 2 triangles with one invalid", () => {
            const triangles = [[5, 10, 25], [40, 20, 35]];

            expect(getValidTriangles(triangles).length).to.eq(1);
        });


    });

    describe("Part 2:", () => {

    });

});
