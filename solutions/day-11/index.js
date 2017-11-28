const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

const parseInput = (input) => {
    const floorIndexes = {
        "first": 1,
        "second": 2,
        "third": 3,
        "fourth": 4
    };

    return input
        .split("\n")
        .reduce((result, line) => {
            const matches = line.replace(/,? and/, ",").match(/The (\w+) floor contains (.+)/);
            const floor = floorIndexes[matches[1]];
            const items = matches[2];

            items
                .split(",")
                .forEach((item) => {
                    const matches = item.match(/a (\w+).* (\w+)/);

                    if (!matches)
                        return;

                    result.push({
                        element: matches[1],
                        type: matches[2],
                        floor
                    });
                });

            return result;
        }, []);
};

const getItemsCacheKey = (items) => {
    const elements = _.uniq(items.map((item) => item.element)).sort();

    const floors = _.map(_.range(1, 5), (floor) => {
        const groups = _.reduce(elements, (result, element) => {
            const generators = _.filter(items, {floor, element, type: "generator"});
            const microchips = _.filter(items, {floor, element, type: "microchip"});

            if (generators.length)
                result.push(`${generators.length} ${element} generators`);

            if (microchips.length)
                result.push(`${microchips.length} ${element} microchips`);

            return result;
        }, []);

        return `Floor ${floor}: ${groups.join(",")}`;
    });

    return floors.join(" | ");
};

const getCombinations = (size, array = _.range(size)) => {
    let results = [];

    for (let i = 0; i < Math.pow(2, array.length); i += 1) {
        let combination = [];
        let count = array.length - 1;

        do {
            if ((i & (1 << count)) !== 0)
                combination.push(array[count]);
        } while(count--);

        if (combination.length == size)
            results.push(combination);
    }

    return results;
}

const calculateMoves = (elevator, items, history, numOfMoves = 1) => {
    // console.log("Calculating moves...");

    const currentFloorItems = _.filter(items, {floor: elevator.floor});
    const otherFloorItems = _.filter(items, ({floor}) => floor != elevator.floor);
    const belowFloorItems = _.filter(items, (item) => item.floor < elevator.floor);

    if (!currentFloorItems.length) {
        throw new Error("Floor has no items at all!!");

        return [];
    }

    const combinations = [
        ...getCombinations(1, _.range(currentFloorItems.length)),
        ...getCombinations(2, _.range(currentFloorItems.length))
    ];

    const moves = _.reduce(combinations, (results, combination) => {
        const {elevatorItems, floorItems} = _.reduce(currentFloorItems, (results, item, index) => {
            const group = _.includes(combination, index) ? "elevatorItems" : "floorItems";

            results[group].push(item);

            return results;
        }, {elevatorItems: [], floorItems: []});

        if (!elevatorItems.length) {
            console.log(combination);
            console.log("elevatorItems:", elevatorItems.length);
            console.log("floorItems:", floorItems.length);

            throw new Error("No elevatorItems");
        }

        if (elevator.floor > 1 && belowFloorItems.length && elevatorItems.length === 1)
            results.push({
                elevator: {floor: elevator.floor - 1},
                items: [
                    ...otherFloorItems,
                    ...floorItems,
                    ..._.map(elevatorItems, (item) => ({...item, floor: elevator.floor - 1}))
                ],
                numOfMoves
            });

        if (elevator.floor < 4 && elevatorItems.length === 2)
            results.push({
                elevator: {floor: elevator.floor + 1},
                items: [
                    ...otherFloorItems,
                    ...floorItems,
                    ..._.map(elevatorItems, (item) => ({...item, floor: elevator.floor + 1}))
                ],
                numOfMoves
            });

        return results;
    }, []);
    const movesWithoutFriedMicrochips = _.filter(moves, (move) => !friedMicrochip(move.elevator, move.items));

    return _.map(movesWithoutFriedMicrochips, (move) => {
        return {
            ...move,
            score: _.filter(move.items, {floor: 4}).length,
            cacheKey: getItemsCacheKey(move.items)
        };
    });
};

const friedMicrochip = (elevator, items) => {
    const currentFloorItems = _.filter(items, {floor: elevator.floor});
    const elements = _.uniq(_.map(currentFloorItems, "element"));
    const pairs = _.reduce(currentFloorItems, (results, item) => {
        const match = _.find(results, (result) => {
            return (result.element == item.element) && _.isUndefined(result[item.type]);
        });

        if (match) {
            match[item.type] = item;
        } else {
            results.push({
                element: item.element,
                [item.type]: item
            });
        }

        return results;
    }, []);

    // if microchips on their own and generators are on their own.
    const singleMicrochips = _.filter(pairs, (pair) => _.isUndefined(pair.generator));
    const singleGenerators = _.filter(pairs, (pair) => _.isUndefined(pair.microchip));

    // console.log("fried?", !!singleGenerators.length && !!singleMicrochips.length)

    return !!singleGenerators.length && !!singleMicrochips.length;
};

const fullyAssembled = (elevator, items) => {
    if (!_.every(items, {floor: 4}))
        return false;

    if (elevator.floor != 4)
        return false;

    return true;
}

const popBestScoreMove = (moves) => {
    let bestMoveIndex = 0;

    _.forEach(moves, (move, index) => {
        const bestMove = moves[bestMoveIndex];

        if (move.score > bestMove.score)
            bestMoveIndex = index;
    });

    const move = moves[bestMoveIndex];

    moves.splice(bestMoveIndex, 1);

    return move;
}

const assembleMachine = (items, elevator = {floor: 1}) => {
    console.log("Assembling machine...");

    if (friedMicrochip(elevator, items))
        return null;

    if (fullyAssembled(elevator, items))
        return {items, elevator, numOfMoves: 0};

    let history = {};
    let moves = calculateMoves(elevator, items, history);
    let result = null;
    let numOfPops = 0;

    while (!result) {
        const move = popBestScoreMove(moves);

        numOfPops += 1;

        if (numOfPops % 100 == 0) {
            console.log("popping moves", _.keys(history).length, moves.length, result && result.numOfMoves, move.numOfMoves, numOfPops);
            // console.log(JSON.stringify(move.items, null, 2))
        }

        if (result && result.numOfMoves <= move.numOfMoves)
            continue;

        if (history[move.cacheKey])
            continue;
        else
            history[move.cacheKey] = true;

        if (fullyAssembled(move.elevator, move.items)) {
            console.log("fully assembled");

            if (!result || move.numOfMoves < result.numOfMoves)
                result = move;

            continue;
        }

        moves.push(...calculateMoves(move.elevator, move.items, history, move.numOfMoves + 1));
    }

    return result;
};

const applyAdditionalItems = (items) => {
    return items.concat([
        {
            floor: 1,
            element: "elerium",
            type: "generator"
        },
        {
            floor: 1,
            element: "elerium",
            type: "microchip"
        },
        {
            floor: 1,
            element: "dilithium",
            type: "generator"
        },
        {
            floor: 1,
            element: "dilithium",
            type: "microchip"
        }
    ]);
}

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const items = parseInput(input.trim());

    console.time("Time Taken");
    const partOneResult = assembleMachine(items);
    console.log("Part 1:", partOneResult.numOfMoves); // 31
    console.timeEnd("Time Taken");

    console.time("Time Taken");
    const partTwoResult = assembleMachine(applyAdditionalItems(items));
    console.log("Part 2:", partTwoResult.numOfMoves); // 55
    console.timeEnd("Time Taken");
};

run();

module.exports = {
    parseInput,
    assembleMachine,
    run
};
