///<reference path="./csv-generate.d.ts" />

import * as generate from "csv-generate";

const options: CsvGenerate.Options = {
    duration:        240,
    columns:         33,
    max_word_length: 3,
    seed:            1,
    length:          100,
    objectMode:      false,
    highWaterMark:   65536,
};

options.columns = ["csv-generate"];

const callback: CsvGenerate.Callback = (err, data) => { };

let generator: CsvGenerate.Generator;

generator = generate(options, callback);
generator = generate(options);
generator = generate(callback);
generator = generate();

let n: number;

n = generator.random();
n = generator.end();
generator._read(30);

const str: string  = generate.Generator.ascii(generator);
const int: number  = generate.Generator.int(generator);
const bool: number = generate.Generator.bool(generator);
