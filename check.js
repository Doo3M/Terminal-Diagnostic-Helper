document.getElementById("buttonGet").onclick = function () {

    const data = document.getElementById("textcopied");
    console.table(data.value);

    const serialsList = data.value.split("\n")
    console.log(serialsList);

    serialsList.forEach(element => {
        if (element) {
            // console.log(element);
            check(element)
        }
    });


};

$('#buttonRest').on('click', () => {
    document.getElementById("textcopied").focus();
    $("#textcopied").select();

    // $('#titleInput2').val('Cleaned!')
    $('#tablePlace').text('')

});


function check(serial) {
    if (serial == "") {
        // alert("Ensure you input a value in both fields!");
    } else {
        axios.get('http://192.168.1.68:1150/search?text=' + serial)
            .then(response => {
                // console.log(response.data);
                const data = response.data
                appendata(data); // The response body
            })
            .catch(error => {
                console.error(error);
            });

    } //end if else
}


const list = document.getElementById("json-data");

function appendata(data) {
    console.log(data);

    // $('#tablePlace').append(buildHtmlTable([JSON.stringify(data)]))
    $('#tablePlace').append(buildHtmlTable([data]))
    
}


var _table_ = document.createElement('table'),
            _tr_ = document.createElement('tr'),
            _th_ = document.createElement('th'),
            _td_ = document.createElement('td');

        // Builds the HTML Table out of myList json data from Ivy restful service.
        function buildHtmlTable(arr) {
            var table = _table_.cloneNode(false),
                columns = addAllColumnHeaders(arr, table);
            for (var i = 0, maxi = arr.length; i < maxi; ++i) {
                var tr = _tr_.cloneNode(false);
                for (var j = 0, maxj = columns.length; j < maxj; ++j) {
                    var td = _td_.cloneNode(false);
                    var cellValue = arr[i][columns[j]];
                    td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            return table;
        }

        // Adds a header row to the table and returns the set of columns.
        // Need to do union of keys from all records as some records may not contain
        // all records
        function addAllColumnHeaders(arr, table) {
            var columnSet = [],
                tr = _tr_.cloneNode(false);
            for (var i = 0, l = arr.length; i < l; i++) {
                for (var key in arr[i]) {
                    if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
                        columnSet.push(key);
                        var th = _th_.cloneNode(false);
                        th.appendChild(document.createTextNode(key));
                        tr.appendChild(th);
                    }
                }
            }
            table.appendChild(tr);
            return columnSet;
        }



