const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, isRealRoom } = require("./");

describe("Day 4:", () => {

    describe("Part 1:", () => {
        const input = [
            "aaaaa-bbb-z-y-x-123[abxyz]",
            "a-b-c-d-e-f-g-h-987[abcde]",
            "not-a-real-room-404[oarel]",
            "totally-real-room-200[decoy]"
        ].join("\n");

        it("splits each room into encryptedName, sectorID, and checksum", () => {
            const expected = [
                {encryptedName: "aaaaa-bbb-z-y-x", sectorID: 123, checksum: "abxyz"},
                {encryptedName: "a-b-c-d-e-f-g-h", sectorID: 987, checksum: "abcde"},
                {encryptedName: "not-a-real-room", sectorID: 404, checksum: "oarel"},
                {encryptedName: "totally-real-room", sectorID: 200, checksum: "decoy"}
            ];

            expect(parseInput(input)).to.eql(expected);
        });

        it("returns true for rooms that are real", () => {
            const rooms = parseInput(input);
            const expected = [true, true, true, false];

            expect(rooms.map((room) => isRealRoom(room))).to.eql(expected);
        })


    });

    describe("Part 2:", () => {

    });

});
