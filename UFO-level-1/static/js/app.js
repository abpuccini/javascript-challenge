// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// var textCenter = "duration"
// var textCap = ["state", "country"]
// var textUpper = ["city", "shape"]

// Make the first letter to uppercase
// Source: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Use d3 to update each cell's text with
// UFO report values (date/time, city, state, country, shape, duration, and comment)
function populateData(data) {
    data.forEach((ufoReport) => {
        var row = tbody.append("tr");
        Object.entries(ufoReport).forEach(([key, value]) => {
            if (key === 'state' || key === 'country') {
                var upperCase = value.toUpperCase();
                var cell = row.append("td");
                cell.text(upperCase);
                cell.style("text-align", "center");
            } else if (key === 'city' || key === 'shape') {
                var capText = capitalizeFirstLetter(value)
                var cell = row.append("td");
                cell.text(capText);
                cell.style("text-align", "center");
            } else if (key === 'durationMinutes') {
                var cell = row.append("td");
                cell.text(value);
                cell.style("text-align", "right");
            } else {
                var cell = row.append("td");
                cell.text(value);
            }
        });
    });
};

populateData(tableData);

// Select the button
var filterButton = d3.select("#filter-btn");
var resetButton = d3.select("#reset-btn")

// Select the form
var form = d3.select("form");

// Create event handlers 
filterButton.on("click", runEnter);
form.on("submit", runEnter);
resetButton.on("click", runDefault);

// Complete the event handler function for the form
function runDefault() {
    var dataTabledefault = d3.selectAll("tbody>tr")
    dataTabledefault.html("")
    populateData(tableData);
};

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    // Filter 
    var filteredData = tableData.filter(event => event.datetime === inputValue);

    var dataTable = d3.selectAll("tbody>tr")

    dataTable.html("")

    // Condition if user inputs date that doesn't exist
    if (filteredData.length === 0) {
        if (inputValue = " ") {
            populateData(tableData);
        } else {
            var row = tbody.append("tr");
            row.text(`NO MATCHING DATE: ${inputValue}`);
        }
    } else {
        populateData(filteredData)
    }
};