// Type definitions for csv-generate 1.0.0
// Project: https://github.com/wdavidw/node-csv-generate
// Definitions by: delphinus <https://github.com/delphinus35/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

///<reference path="../node/node.d.ts" />

declare namespace CsvGenerate {

    interface Options {

        /**
         * Period to run in milliseconds, default to 4 minutes.
         */
        duration?: number;

        /**
         * Define the number of generated fields and the generation method. If
         * columns is an integer, it corresponds to the number of fields. If it
         * is an array, each element correspond to a field. If the element is a
         * function, the function will generate the field value, if it is a
         * string, it call the registered function of the same name.
         */
        columns?: number | string[];

        /**
         * Maximum number of characters per word.
         */
        max_word_length?: number;

        /**
         * Generate idempotent random characters if a number provided
         */
        seed?: number;

        /**
         * Number of lines to read.
         */
        length?: number;

        /**
         * Whether this stream should behave as a stream of objects. Meaning
         * that stream.read(n) returns a single value instead of a Buffer of
         * size n. Default=false
         */
        objectMode?: boolean;

        /**
         * The maximum number of bytes to store in the internal buffer before
         * ceasing to read from the underlying resource. Default=16kb
         */
        highWaterMark?: number;
    }

    type Callback = (err: Error, data: string[] | string) => void;

    /**
     * Callback approach, for ease of use:
     *
     * generate([options])
     *
     * Stream API, for maximum of power:
     *
     * generate([options], callback)
     */
    interface Static {

        (options: Options, callback: Callback): Generator;
        (optiosn: Options): Generator;
        (callback: Callback): Generator;
        (): Generator;
        Generator: GeneratorStatic;
    }

    interface Generator extends NodeJS.ReadableStream {

        /**
         * Generate a random number between 0 and 1 with 2 decimals. The function is
         * idempotent if it detect the "seed" option.
         */
        random(): number;

        /**
         * Stop the generation.
         */
        end(): number;

        /**
         * Put new data into the read queue.
         */
        _read(size: number): void;

        // copy from stream.Readable
        push(chunk: any, encoding?: string): boolean;
    }

    interface GeneratorStatic{

        new(options: Options): Generator;

        /**
         * Generate an ASCII value.
         */
        ascii(gen: Generator): string;

        /**
         * Generate an integer value.
         */
        int(gen: Generator): number;

        /**
         * Generate an boolean value.
         */
        bool(gen: Generator): number;
    }
}

declare module "csv-generate" {

    var generate: CsvGenerate.Static;
    export = generate;
}
