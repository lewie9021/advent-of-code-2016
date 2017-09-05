const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, getErrorCorrectedMessage, getMostCommonCharacter, getLeastCommonCharacter } = require("./");

describe("Day 6:", function() {
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

    describe("Part 1:", function() {

        it("returns 6 columns for the example input", function() {
            expect(parseInput(input).length).to.eq(6);
        });

        it("returns 'easter' for the example message", function() {
            const columns = parseInput(input)

            expect(getErrorCorrectedMessage(columns, getMostCommonCharacter)).to.eq("easter");
        });

    });

    describe("Part 2:", function() {

        it("returns 'advent' for the example message", function() {
            const columns = parseInput(input)

            expect(getErrorCorrectedMessage(columns, getLeastCommonCharacter)).to.eq("advent");
        });

    });

});
