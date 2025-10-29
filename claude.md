The goal of this project is as follows:

To create a time series database for data gathered with [tibber-api](https://www.npmjs.com/package/tibber-api) and SQLite.

Specs:

* It should run in a docker container
* For a given Tibber API key (stored as an env variable) it should save all realtime data points from all homes in the database
* The entire thing should be node/typescript based
* It should mount a persistent volume for the data, and otherwise be stateless
* It should use minimal dependencies, but implement data validation with Zod
