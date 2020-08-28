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
    {'dateRegistered': 'August 1, 2020', 'firstName': 'Jessica', 'lastName': 'ReZero', 'birthDate': 'August 2, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 2, 2019', 'firstName': 'James', 'lastName': 'Loren', 'birthDate': 'August 3, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 3, 2018', 'firstName': 'Jake', 'lastName': 'Ipsum', 'birthDate': 'August 4, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 4, 2017', 'firstName': 'Mike', 'lastName': 'Dolo', 'birthDate': 'August 5, 1990', 'city': 'ABC City'},
    {'dateRegistered': 'August 5, 2016', 'firstName': 'May', 'lastName': 'Rete', 'birthDate': 'August 6, 1990', 'city': 'ABC City'}
].sort( (firstElement,secondElement) => firstElement['dateRegistered'] > secondElement['dateRegistered']? 1 : -1);
const buttonElement = `<td class="text-center">
                        <div class="button-container">
                            <button type="button" class="btn btn-primary btn-sm mr-2 mb-2 w-auto">
                                <i class="far fa-eye"></i>
                            </button>
                            <button type="button" class="btn btn-success btn-sm mr-2 mb-2 w-auto">
                                <i class="far fa-trash-alt"></i>
                            </button>
                            <button type="button" class="btn btn-danger btn-sm mr-2  mb-2 w-auto">
                                <i class="fas fa-sync-alt"></i>
                            </button>
                        </div>
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
//To be called in HTML file after the page has loaded -C.LEGASPI
function renderTable(){
    buildCustomerTable();
    buildDvdTable();
    console.log("Called rendertable()");
}