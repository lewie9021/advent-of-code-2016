const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, isRealRoom, getSectorIDSumOfRealRooms, decryptName } = require("./");

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
        });

        it("returns the sectorID sum of 1514, given the example inputs", () => {
            const rooms = parseInput(input);

            expect(getSectorIDSumOfRealRooms(rooms)).to.eq(1514);
        });

    });

    describe("Part 2:", () => {

        it("decrypts 'qzmt-zixmtkozy-ivhz' with a sectorID of 343 as 'very encrypted name'", () => {
            expect(decryptName("qzmt-zixmtkozy-ivhz", 343)).to.eq("very encrypted name");
        });

    });

});
