const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, getTransportLayerSnoopingSupport, getSuperSecretListeningSupport } = require("./");

describe("Day 7:", function() {

    describe("Part 1:", function() {
        const examples = parseInput([
            "abba[mnop]qrst",
            "abcd[bddb]xyyx",
            "aaaa[qwer]tyui",
            "ioxxoj[asdfgh]zxcvbn",
            "ektijwczwnlancuqfv[luqhtfgwmlilhwnk]gxgivxlnerdhbhetfz[bzczfdorrsptzikjmct]mfrsvxgxijtusmvjd[sbpnwycbrykuhsinudc]bmpikuskzlxcoidp"
        ].join("\n"));

        it("returns true for the first example", function() {
            expect(getTransportLayerSnoopingSupport(examples[0])).to.eq(true);
        });

        it("returns false for the second example", function() {
            expect(getTransportLayerSnoopingSupport(examples[1])).to.eq(false);
        });

        it("returns false for the third example", function() {
            expect(getTransportLayerSnoopingSupport(examples[2])).to.eq(false);
        });

        it("returns true for the fourth example", function() {
            expect(getTransportLayerSnoopingSupport(examples[3])).to.eq(true);
        });

        it("returns false for the fith example", function() {
            expect(getTransportLayerSnoopingSupport(examples[4])).to.eq(false);
        });

    });

    describe("Part 2:", function() {
        const examples = parseInput([
            "aba[bab]xyz",
            "xyx[xyx]xyx",
            "aaa[kek]eke",
            "zazbz[bzb]cdb"
        ].join("\n"));

        it("returns true for the first example", function() {
            expect(getSuperSecretListeningSupport(examples[0])).to.eq(true);
        });

        it("returns false for the second example", function() {
            expect(getSuperSecretListeningSupport(examples[1])).to.eq(false);
        });

        it("returns true for the third example", function() {
            expect(getSuperSecretListeningSupport(examples[2])).to.eq(true);
        });

        it("returns true for the fourth example", function() {
            expect(getSuperSecretListeningSupport(examples[3])).to.eq(true);
        });

    });

});
