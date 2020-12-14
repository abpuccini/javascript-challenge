# UFO Sightings

## Background

ALIENS-R-REAL has collected all the eye-witness reports of the UFO seen. However, the information is yet on the online webpage for people to see. The task will be writing the script to enable people to access to the information. Also, they will be able to serch by date, city, state, country and shape.

Dataset: [UFO Sightings Data](UFO-level-1/js/data.js) 

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

- **To align text in each cell for each column; `center`, `right`**

    ```javascript
        cell.style("text-align", "center");
    ```

### Automatic Table and Date Search

Rendering table to html and enable date search.

Script: [UFO-Level-1](UFO-level-1/js/app.js)

### Multiple Search Categories

Using multiple inputs; date, city, state, country and shape, to filter the table.

Script: [UFO-Level-2](UFO-level-2/js/app.js)

### Webpage

Please visit UFO Sighting Page > [Click Here!](https://abpuccini.github.io/javascript-challenge/)

---
© [Atcharaporn B Puccini](https://www.linkedin.com/in/abpuccini/)






