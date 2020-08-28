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
];

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
let dvdArr = [
    {'dateRegistered': 'August 12, 2020', 'genre': 'Romance', 'title': 'Kaguya-sama Love is War?', 'releaseDate': 'August 21, 2021', 'price': 1100,'numOfItems':12},
    {'dateRegistered': 'August 13, 2020', 'genre': 'Comedy', 'title': 'Gintama', 'releaseDate': 'August 4, 2021', 'price': 441,'numOfItems':22},
    {'dateRegistered': 'August 16, 2020', 'genre': 'Action', 'title': 'Shingeki no Kyojin', 'releaseDate': 'August 14, 2021', 'price': 771,'numOfItems':17},
    {'dateRegistered': 'August 6, 2020', 'genre': 'Fantasy', 'title': 'Re: Zero', 'releaseDate': 'August 3, 2021', 'price': 512,'numOfItems':52},
];
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
//Customizes the table and inputs the data -C.LEGASPI
function renderTable(){
    buildCustomerTable();
    buildDvdTable();
    //Customizes table
    console.log("Called rendertable()");
    $('.customDataTable').DataTable({
        order: [[0,'asc']],
        pagingType: 'full_numbers',
        lengthMenu: [[5,10,25,50,-1],[5,10,25,50,'All']],
        //repositions feature elements and adds necessary margins
        dom:`<
            <"d-flex float-left mb-2"
                <"mr-3 ml-1"f>
                l
            >
            <t>
            <"bottom"
                <"d-inline"
                    <"float-left mt-0 ml-1 mb-3"i>
                    <"float-right mt-1"p>
                >   
            >
        >`,
        //Adds filter feature
        initComplete: function(){
            this.api().columns().every( function() {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                .appendTo( $(column.footer()).empty() )
                .on( 'change', function () {
                    let val = $.fn.dataTable.util.escapeRegex(
                    $(this).val()
                    );
                    column
                    .search( val ? '^'+val+'$' : '', true, false )
                    .draw();
                });
                column.data().unique().sort().each( function ( d, j ) {
                select.append( '<option value="'+d+'">'+d+'</option>' );
                });
            });
        }
    });
}