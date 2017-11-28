const { describe, it } = require("mocha");
const { expect } = require("chai");

const { parseInput, assembleMachine } = require("./");

describe.only("Day 11:", function() {
    const example = [
        "The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.",
        "The second floor contains a hydrogen generator.",
        "The third floor contains a lithium generator.",
        "The fourth floor contains nothing relevant."
    ].join("\n");

    describe("Part 1:", function() {

        it("correctly parses the example into a list of items", function() {
            expect(parseInput(example)).to.eql([
                {
                    element: "hydrogen",
                    type: "microchip",
                    floor: 1
                },
                {
                    element: "lithium",
                    type: "microchip",
                    floor: 1
                },
                {
                    element: "hydrogen",
                    type: "generator",
                    floor: 2
                },
                {
                    element: "lithium",
                    type: "generator",
                    floor: 3
                }
            ]);
        });

        it("returns 11 steps, given the example situation", function() {
            const items = parseInput(example);
            const result = assembleMachine(items);

            console.log("Result:", result);

            expect(result.numOfMoves).eq(11);
        });

    });

    /*
    RTGs = Generators - Paried with microchips.
An unconnected microchip will fry with a RTG of a different kind (even if it's already powering another microchip).
Lift can carry up to two microchips/RTGs in any combination and has to have a least one thing in it to work.
While the lift recharges on every floor, the items in the lift act like they're on that floor.
*/

    describe("Part 2:", function() {

    });

});
