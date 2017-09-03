const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInputHorizontally, parseInputVertically, getValidTriangles } = require("./");

describe("Day 3:", () => {

    describe("Part 1:", () => {

        it("returns an array of triangle side lengths", () => {
            const input = ["  5  10  25", "  40  20  35"].join("\n");
            const triangles = parseInputHorizontally(input);
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

        it("reads the list in column groups of 3", () => {
            const input = [
                "101 301 501",
                "102 302 502",
                "103 303 503",
                "201 401 601",
                "202 402 602",
                "203 403 603"
            ].join("\n");
            const expected = [
                [101, 102, 103],
                [301, 302, 303],
                [501, 502, 503],
                [201, 202, 203],
                [401, 402, 403],
                [601, 602, 603]
            ];

            expect(parseInputVertically(input)).to.eql(expected);
        })

    });

});
