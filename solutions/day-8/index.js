const FS = require("fs");
const Path = require("path");

const _ = require("lodash");

const parseInput = (input) => {
    return input
        .split("\n")
        .map((line) => {
            const parts = line.split(" ");

            switch (parts[0]) {
                case "rect":
                    const dimensions = parts[1].split("x");

                    return {operation: "create-reactangle", width: parseInt(dimensions[0]), height: parseInt(dimensions[1])};
                case "rotate":
                    const index = parseInt(parts[2].split("=")[1]);
                    const offset = parseInt(parts[4]);

                    return {operation: "rotate-" + parts[1], index, offset}
            }
        });
};

const generateScreen = (width, height) => {
    let screen = [];

    _.times(width, (x) => {
        _.times(height, (y) => {
            _.set(screen, [y, x], 0);
        });
    });

    return {
        get: (x, y) => screen[y][x],
        set: (x, y, value) => screen[y][x] = value,
        draw: () => screen.map((row) => row.join("").replace(/1/g, "#").replace(/0/g, ".")).join("\n"),
        clone: () => {
            const newScreen = generateScreen(width, height);

            _.times(width, (x) => {
                _.times(height, (y) => {
                    newScreen.set(x, y, screen[y][x]);
                });
            });

            return newScreen;
        },
        width,
        height
    };
};

const createRectangle = (screen, width, height) => {
    _.times(width, (x) => {
        _.times(height, (y) => {
            screen.set(x, y, 1);
        });
    });

    return screen;
};

const rotateColumn = (screen, columnIndex, yOffset) => {
    const prevScreen = screen.clone();
    const rowIndexes = _.range(screen.height);

    _.forEach(rowIndexes, (rowIndex) => {
        const y = (rowIndex + yOffset) % screen.height;

        screen.set(columnIndex, y, prevScreen.get(columnIndex, rowIndex));
    });

    return screen;
};

const rotateRow = (screen, rowIndex, xOffset) => {
    const prevScreen = screen.clone();
    const columnIndexes = _.range(screen.width);

    _.forEach(columnIndexes, (columnIndex) => {
        const x = (columnIndex + xOffset) % screen.width;

        screen.set(x, rowIndex, prevScreen.get(columnIndex, rowIndex));
    });

    return screen;
};

const executeInstructions = (screen, instructions) => {
    // console.log("draw:", screen.draw());

    instructions.forEach((instruction) => {
        // console.log("Instruction:", instruction);

        switch (instruction.operation) {
            case "create-reactangle":
                createRectangle(screen, instruction.width, instruction.height);
                break;
            case "rotate-column":
                rotateColumn(screen, instruction.index, instruction.offset);
                break;
            case "rotate-row":
                rotateRow(screen, instruction.index, instruction.offset);
                break;
        }

        // console.log("draw:", screen.draw());
    });

    return screen;
};

const countPixelsLit = (screen) => {
    const output = screen.draw();

    return output.match(/#/g).length;
};

// Display the results for both parts of the day.
const run = () => {
    const input = FS.readFileSync(Path.join(__dirname, "input.txt"), "utf8");
    const instructions = parseInput(input.trim());
    let screen = generateScreen(50, 6);

    executeInstructions(screen, instructions);

    console.log("Part 1:", countPixelsLit(screen)); // 110.
    console.log("Part 2:\n", screen.draw()); // ZJHRKCPLYJ.
};

module.exports = {
    parseInput,
    executeInstructions,
    generateScreen,
    run
};
