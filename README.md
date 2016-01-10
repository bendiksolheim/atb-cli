# atb-cli

Small CLI to ATBs bus API in Trondheim. Use it to retrieve real time
information about bus stops.

## Installation

Use from your command line: `npm install -g atb-cli`

Use from your own project: `npm install atb-cli`

## Usage (command line)

`atb [stop-id]` lists real-time data for this specific stop

`atb [stop-name]` lists matching stops with corresponding stop-id

## Usage (code)

Nothing really stops you from using this in your own application. If this is
interesting, look in the code for usage. [api.js](src/api.js) contains the API
it self, while [index.js](index.js) contains simple usage. Make an issue if
you have questions.

## Bugs, improvements, contribution, etc..

Open an issue. I accept pull requests fixing small issues, but please discuss
it first if it changes parts of the functionality.

## Credits

API originally by [ATB](https://www.atb.no/apne-data/category419.html). API wrapper by link [Tri Nguyen](https://github.com/tmn)