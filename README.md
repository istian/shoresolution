# Technical Exam

This exam was written using **NodeJs** platform. In order to let it work you'll have to

	npm install

and

	npm start

if you want to launch test and assuming mochajs is installed globally, the command is:

	npm test

This test was made in order to fulfill:

## Requirements

In the programming language of your choice, write a program to parse the given CSV data
file and return the Mean, Medium, Mode and Standard Deviation of the specified column.

Example usage:

    $ ./stats.py <csv data file name> <column name>

In the event the column does not exist, or contains non-numeric values your script
should exit with an error. You can assume the provided file will always be CSV.

The output of the program should be:

    Mean: <mean>
    Medium: <medium>
    Mode: <mode>
    Standard Deviation: <standard deviation>