/***
 * AUTHOR: Cary L.
 * CO-AUTHOR: Gwynn C.
 */
'use strict'
//To be replaced by fetching data from the server and parsing it as an array of JSON object -C.LEGASPI
let customerArr = [
    {'dateRegistered': 'August 1, 2020', 'firstName': 'Echidna', 'lastName': 'ReZero', 'birthDate': 'August 2, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 2, 2019', 'firstName': 'Feorko', 'lastName': 'Loren', 'birthDate': 'August 3, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 3, 2018', 'firstName': 'Clooo', 'lastName': 'Ipsum', 'birthDate': 'August 4, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 4, 2017', 'firstName': 'Beze', 'lastName': 'Dolo', 'birthDate': 'August 5, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 5, 2016', 'firstName': 'Artei', 'lastName': 'Rete', 'birthDate': 'August 6, 1990', 'city': 'ABC City'}
];

//Renders the customer table -C.LEGASPI
function buildCustomerTable(){
    'use strict'
    //Buttons VIEW UPDATE DELETE -C.LEGASPI
    //TODO: Implement listeners -C.LEGASPI
    let buttonElement = `<td class="text-center">
                            <button type="button" class="btn btn-primary btn-sm mr-2 mb-2 w-auto">View</button>
                            <button type="button" class="btn btn-success btn-sm mr-2 mb-2 w-auto">Update</button>
                            <button type="button" class="btn btn-danger btn-sm mr-2  mb-2 w-auto">Delete</button>
                        </td>`;
    let tableBody = document.getElementById('customerTable');
    tableBody.innerHTML = '';
    for(let i = 0; i < customerArr.length; i++){
        let row = `<tr>
                        <td>${customerArr[i].dateRegistered}</td>
                        <td>${customerArr[i].firstName}</td>
                        <td>${customerArr[i].lastName}</td>
                        <td>${customerArr[i].birthDate}</td>
                        <td>${customerArr[i].city}</td>
                        ${buttonElement}
                    </tr>`;
        tableBody.innerHTML += row;
    }
}

//function that allows the feature of filtering by columns in ascending or descending order -C.LEGASPI
var filterBy = function(header,arr) {
    let order = header.getAttribute('data-order');
    let column = header.getAttribute('data-column');
    if(order == "desc"){
        header.setAttribute("data-order","asc");
        arr = arr.sort( (firstElement,secondElement) => firstElement[column] > secondElement[column]? 1 : -1);

    }else{
        header.setAttribute("data-order","desc");
        arr = arr.sort( (firstElement,secondElement) => firstElement[column] < secondElement[column]? 1 : -1);
    }
    buildCustomerTable();
}
//initializes the listeners for the columns -C.LEGASPI
//TODO: Add listeners for the DVD table -C.LEGASPI
function initializeListeners(){
    let customerColumns = ["dateRegistered","firstName","lastName","birthDate","city"];
    for(let i = 0; i < customerColumns.length; i++){
        let column = document.getElementById(customerColumns[i]);
        column.addEventListener("click", function(){
            filterBy(this,customerArr);
        });
    }
}
//To be called in HTML file after the page has loaded -C.LEGASPI
function renderTable(){
    initializeListeners();
    buildCustomerTable();
    console.log("Called rendertable()");
}