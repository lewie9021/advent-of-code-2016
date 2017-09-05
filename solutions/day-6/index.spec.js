const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, getErrorCorrectedMessage } = require("./");

describe("Day 6:", function() {

    describe("Part 1:", function() {
        const input = [
            "eedadn",
            "drvtee",
            "eandsr",
            "raavrd",
            "atevrs",
            "tsrnev",
            "sdttsa",
            "rasrtv",
            "nssdts",
            "ntnada",
            "svetve",
            "tesnvt",
            "vntsnd",
            "vrdear",
            "dvrsen",
            "enarar"
        ].join("\n");

        it("returns 6 columns for the example input", function() {
            expect(parseInput(input).length).to.eq(6);
        })


        it("returns 'easter' for the example message", function() {
            const columns = parseInput(input)

            expect(getErrorCorrectedMessage(columns)).to.eq("easter");
        })

    });

    describe("Part 2:", function() {

    });

});
