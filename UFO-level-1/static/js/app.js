// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Source: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
// Make all letters to uppercase
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Make the first letter to uppercase
function ucFirstAllWords(str) {
    var word = str.split(" ");
    for (var i = 0; i < word.length; i++) {
        var j = word[i].charAt(0).toUpperCase();
        word[i] = j + word[i].substr(1);
    }
    return word.join(" ");
};

// Create function and use d3 to update each cell's text with
// UFO report values (date/time, city, state, country, shape, duration, and comment)
function populateData(data) {

    //`forEach` automatically iterates (loops) through each item and calls the supplied function for that item.
    data.forEach((ufoReport) => {

        // Use D3 to select the table body
        var row = tbody.append("tr");

        // Use `Object.entries` to get each UFO report value
        Object.entries(ufoReport).forEach(([key, value]) => {

            // Apply if condition to capture data
            if (key === 'state' || key === 'country') {

                // Make value in cell to uppercase
                var upperCase = value.toUpperCase();

                // Append one cell for each value for each key
                var cell = row.append("td");

                // Modify the text of an HTML element
                cell.text(upperCase);

                // Apply the style: text-align (center)
                cell.style("text-align", "center");

                // Apply if condition to capture data    
            } else if (key === 'city') {

                // Make value in cell to upper case for first letter each word
                var capEachword = ucFirstAllWords(value);

                // Append valued in each column with style
                var cell = row.append("td");
                cell.text(capEachword);
                cell.style("text-align", "center");

                // Apply if condition to capture data
            } else if (key === 'shape') {

                // Make value in cell to capitalized letter
                var capText = capitalizeFirstLetter(value);

                // Append valued in each column with style
                var cell = row.append("td");
                cell.text(capText);
                cell.style("text-align", "center");

                // Apply if condition to capture data
            } else if (key === 'durationMinutes') {

                // Append valued in each column with style
                var cell = row.append("td");
                cell.text(value);
                cell.style("text-align", "right");

                // Apply if condition to capture data
            } else {

                // Append valued in each column
                var cell = row.append("td");
                cell.text(value);
            }
        });
    });
};

// Show all data
populateData(tableData);

// Select the button
var filterButton = d3.select("#filter-btn");
var resetButton = d3.select("#reset-btn");

// Select the form
var form = d3.select("form");

// Create event handlers 
filterButton.on("click", runEnter);
form.on("submit", runEnter);
resetButton.on("click", runDefault);

// Complete the event handler function for the form
function runDefault() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value by ID of the input element and replace it with ""
    document.getElementById("datetime").value = "";

    // Modify the text of an HTML element
    var dataTabledefault = d3.selectAll("tbody>tr");
    dataTabledefault.html("");

    // Call the data
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

    // Filter data when user put date and populate all data if user leaves the input blank
    var filteredData = tableData.filter(event => event.datetime === inputValue || !inputValue);

    // Select All table rows in table body
    var dataTable = d3.selectAll("tbody>tr");

    // Replace html element with ""
    dataTable.html("");

    // Condition if user inputs date that doesn't exist
    if (filteredData.length === 0) {
        var row = tbody.append("tr");
        row.text(`NO MATCHING DATE: ${inputValue}`);
    } else {
        populateData(filteredData);
    }
};