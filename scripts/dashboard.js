/***
 * AUTHOR: Cary L.
 * CO-AUTHOR: Gwynn C.
 */

'use strict'

/***
* To be replaced by fetching data from the server and parsing it as an array of JSON object 
* Also sorts it by date registered in descending order -C.LEGASPI
*/
let customerArr = [
    {'dateRegistered': 'August 1, 2020', 'firstName': '1', 'lastName': 'ReZero', 'birthDate': 'August 2, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 2, 2019', 'firstName': '2', 'lastName': 'Loren', 'birthDate': 'August 3, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 3, 2018', 'firstName': '3', 'lastName': 'Ipsum', 'birthDate': 'August 4, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 4, 2017', 'firstName': '4', 'lastName': 'Dolo', 'birthDate': 'August 5, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 5, 2016', 'firstName': '5', 'lastName': 'Rete', 'birthDate': 'August 6, 1990', 'city': 'ABC City'}
].sort( (firstElement,secondElement) => firstElement['dateRegistered'] > secondElement['dateRegistered']? 1 : -1);
const buttonElement = `<td class="text-center">
                        <button type="button" class="btn btn-primary btn-sm mr-2 mb-2 w-auto">View</button>
                        <button type="button" class="btn btn-success btn-sm mr-2 mb-2 w-auto">Update</button>
                        <button type="button" class="btn btn-danger btn-sm mr-2  mb-2 w-auto">Delete</button>
                    </td>`;
//Renders the customer table -C.LEGASPI
function buildCustomerTable(){
    'use strict'
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

//The same thing with customer array, then sort it by date registered in descending order
let dvdArr = [
    {'dateRegistered': 'August 12, 2020', 'genre': 'Romance', 'title': 'Kaguya-sama Love is War?', 'releaseDate': 'August 21, 2021', 'price': 1100,'numOfItems':12},
    {'dateRegistered': 'August 13, 2020', 'genre': 'Comedy', 'title': 'Gintama', 'releaseDate': 'August 4, 2021', 'price': 441,'numOfItems':22},
    {'dateRegistered': 'August 16, 2020', 'genre': 'Action', 'title': 'Shingeki no Kyojin', 'releaseDate': 'August 14, 2021', 'price': 771,'numOfItems':17},
    {'dateRegistered': 'August 6, 2020', 'genre': 'Fantasy', 'title': 'Re: Zero', 'releaseDate': 'August 3, 2021', 'price': 512,'numOfItems':52},
].sort( (firstElement,secondElement) => firstElement['dateRegistered'] > secondElement['dateRegistered']? 1 : -1);
//TODO: Refactor below code so that there will be only 1 build table function
function buildDvdTable(){
    'use strict'
    let tableBody = document.getElementById('dvdTable');
    tableBody.innerHTML = '';
    for(let i = 0; i < dvdArr.length; i++){
        let row = `<tr>
                        <td>${dvdArr[i].dateRegistered}</td>
                        <td>${dvdArr[i].genre}</td>
                        <td>${dvdArr[i].title}</td>
                        <td>${dvdArr[i].releaseDate}</td>
                        <td>${dvdArr[i].price}</td>
                        <td>${dvdArr[i].numOfItems}</td>
                        ${buttonElement}
                    </tr>`;
        tableBody.innerHTML += row;
    }
}

//function that allows the feature of filtering by columns in ascending or descending order -C.LEGASPI
//TODO: Implement it in way that only the clicked column will have an order indicator
var filterBy = function(header,arr) {
    let order = header.getAttribute('data-order');
    let column = header.getAttribute('data-column');
    let text = header.innerHTML;
    text = text.substring(0, text.length - 1);
    
    if(order == "desc"){
        console.log(order);
        header.setAttribute("data-order","asc");
        arr = arr.sort( (firstElement,secondElement) => firstElement[column] > secondElement[column]? 1 : -1);
        text += `&#9650`;
    }else{
        console.log(order);
        header.setAttribute("data-order","desc");
        arr = arr.sort( (firstElement,secondElement) => firstElement[column] < secondElement[column]? 1 : -1);
        text += `&#9660`;
    }
    header.innerHTML = text;
}
//initializes the listeners for the columns -C.LEGASPI
//TODO: Add listeners for the DVD table -C.LEGASPI
function initializeListeners(){
    let customerColumns = ["dateRegistered","firstName","lastName","birthDate","city"];
    for(let i = 0; i < customerColumns.length; i++){
        let column = document.getElementById(customerColumns[i]);
        column.addEventListener("click", function(){
            filterBy(this,customerArr);
            buildCustomerTable();
        });
    }
    let dvdColumns = ["DVDdateRegistered","genre","title","releaseDate","price","numOfItems"];
    for(let i = 0; i < dvdColumns.length; i++){
        let column = document.getElementById(dvdColumns[i]);
        column.addEventListener("click", function(){
            filterBy(this,dvdArr);
            buildDvdTable();
        });
    }
}
//To be called in HTML file after the page has loaded -C.LEGASPI
function renderTable(){
    initializeListeners();
    buildCustomerTable();
    buildDvdTable();
    console.log("Called rendertable()");
}