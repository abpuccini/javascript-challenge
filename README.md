# UFO Sightings

## Background

ALIENS-R-REAL has collected all the eye-witness reports of the UFO seen. However, the information is yet on the online webpage for people to see. The task will be writing the script to enable people to access to the information. Also, they will be able to serch by date, city, state, country and shape.

Dataset: [UFO Sightings Data](UFO-level-1/js/data.js) 

## Webpage

Please visit UFO Sighting Page > [Click Here!](https://abpuccini.github.io/javascript-challenge/)

## Scripts

### Data Management

- **To capitalize all the letters.**

    This will apply to state and country columns as the example presented below.

    ```javascript
        var upperCase = value.toUpperCase();
    ```

- **To capitalize only the first letter of each word.**

    This will apply to city column as the example presented below.

    ```javascript
        function ucFirstAllWords(str) {
        var word = str.split(" ");
        for (var i = 0; i < word.length; i++) {
            var j = word[i].charAt(0).toUpperCase();
            word[i] = j + word[i].substr(1);
        }
        return word.join(" ");
        };
    ```
- **To capitalize only the first letter.**

    This will apply to shape column.

    ```javascript
        function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
        };
    ```

- **To align text in each cell for each column;**

    ```javascript
        cell.style("text-align", "position");
    ```
    * `center` > will be applied to city, state and country columns
    * `right` > will be applied to shape column

---
### Webpage Operation

- **Function to populate the data on the webpage**

    ```javascript
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
    ```

- **Listener for the UFO sighting events.**

    ```javascript
    // Select the button
    var filterButton = d3.select("#filter-btn");
    var resetButton = d3.select("#reset-btn");

    // Select the form
    var form = d3.select("form");

    // Create event handlers 
    filterButton.on("click", runEnter);
    form.on("submit", runEnter);
    resetButton.on("click", runDefault);
    ```

- **Automatic Table and Date Search**

    Rendering table to html and enable date search.

    *Script:* [UFO-Level-1](UFO-level-1/js/app.js)

    ```java
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
    ```

- **Multiple Search Categories**

    Using multiple inputs; date, city, state, country and shape, to filter the table.

    *Script:* [UFO-Level-2](UFO-level-2/js/app.js)

    ```java
    // Complete the event handler function for the form
    function runDefault() {

        // Prevent the page from refreshing
        d3.event.preventDefault();

        // Get the value by ID of the input element and replace it with ""
        document.getElementById("datetime").value = "";
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
        document.getElementById("country").value = "";
        document.getElementById("shape").value = "";

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
        var inputDate = d3.select("#datetime");
        var inputCity = d3.select("#city");
        var inputState = d3.select("#state");
        var inputCountry = d3.select("#country");
        var inputShape = d3.select("#shape");

        // Get the value property of the input element (.toLowerCase() > to simplify input, .trim() > to cut any blank space)
        var inputValueDate = inputDate.property("value");
        var inputValueCity = inputCity.property("value").toLowerCase().trim();
        var inputValueState = inputState.property("value").toLowerCase().trim();
        var inputValueCountry = inputCountry.property("value").toLowerCase().trim();
        var inputValueShape = inputShape.property("value").toLowerCase().trim();

        // Filter data with input or inputs 
        // (src: https://github.com/Nova722/Javascript-Dom-Manipulation)
        var filteredData = tableData.filter(event =>
            (event.datetime === inputValueDate || !inputValueDate) &&
            (event.city === inputValueCity || !inputValueCity) &&
            (event.state === inputValueState || !inputValueState) &&
            (event.country === inputValueCountry || !inputValueCountry) &&
            (event.shape === inputValueShape || !inputValueShape)
        );

        // Select All table rows in table body
        var dataTable = d3.selectAll("tbody>tr");

        // Replace html element with ""
        dataTable.html("");

        // Condition if user inputs date that doesn't exist
        if (filteredData.length === 0) {
            var row = tbody.append("tr");
            row.text(`NO MATCHING DATA`);
        } else {
            populateData(filteredData)
        }
    };
    ```

---
© [Atcharaporn B Puccini](https://www.linkedin.com/in/abpuccini/)






