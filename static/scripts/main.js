/***
 * AUTHOR: Cary L.
 * CO-AUTHOR: Gwynn C.
 */

'use strict'

//******************************        CUSTOMER by Legaspi C        **************************
let customer_table = null;
//data variable to be used for view listener
let data = null;

function loadCustomerTable() {
    //to be passed to DataTable constructor
    let initialTableSettings = {
        //enables search bar
        searching: true,
        //enables export buttons
        buttons: [
            'print', 'copy', 'pdf', 'excel'
        ],
        //orders the first column as desc by default
        order: [
            [0, 'desc']
        ],
        pagingType: 'full_numbers',
        //the choices for numbers of entries to be shown
        lengthMenu: [
            [5, 10, 25, 50, -1],
            [5, 10, 25, 50, 'All']
        ],
        //positions the table, buttons etc. according to the html code
        dom: `<
                <"d-flex float-left mb-2"
                    <"mr-3 ml-1"f>
                    l
                    
                >
                <"d-flex float-right"B>
                <t>
                <"bottom"
                    <"d-inline"
                        <"float-left mt-0 ml-1 mb-3"i>
                        <"float-right mt-1"p>
                    >   
                >
            >`,
        columnDefs: [
            //removes the sort buttons in the buttons column
            { orderable: false, "targets": 5 },
            //Adds View Delete buttons to every row in the datatable
            {
                targets: 5,
                data: null,
                defaultContent: `<div class="button-container">
                        <button type="button" class="btn btn-sm mr-2 mb-2 w-auto vud vud-view" data-toggle="modal" data-target="#viewCustomer" onclick="viewCustomer(this)">
                            <i class="far fa-eye"></i>
                        </button>
                        <button type="button" class="btn btn-sm mr-2 mb-2 w-auto vud vud-delete" data-toggle="modal" data-target="#deleteCustomer" onclick="deleteCustomer(this)">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>`
            }
        ],
        //alternatively you can use the syntax-->>>  ajax: "{% url 'customer:customer_dashboard' %}",
        ajax: {
            //empty means this will just redirect to the current url of the page
            url: '',
            dataSrc: "data"
        },
        //matches the data to appropriate column
        columns: [
            { "data": 'date_registered' },
            { "data": 'firstname' },
            { "data": 'lastname' },
            { "data": 'birthdate', "defaultContent": "<i>Not Set</i>" },
            { "data": 'city', "defaultContent": "<i>Not Set</i>" },
        ],
        //Adds data-id attribute to each row
        createdRow: function(row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        //Adds filter function at footer after the datatable has been initialized
        initComplete: function() {
            //get data for view listener
            data = customer_table.ajax.json().data;
            this.api().columns().every(function() {
                var column = this;
                var select = $('<select class="form-control"><option value="">Filter None</option></select>')
                    .appendTo($(column.footer()).empty())
                    .on('change', function() {
                        let val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });
                column.data().unique().sort().each(function(d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>');
                });
            });
        },

    }
    let table = $('#customerTable').DataTable(initialTableSettings);
    //passing it to customer_table, so that it can be used in loadInitializers function
    customer_table = table;
    //sets the minimum default value for the date range
    $("input[type=date][name$=min]").val(new Date(0).toISOString().slice(0, 10));
    //sets the maximum default value for the date range
    $("input[type=date][name$=max]").val(new Date().toISOString().slice(0, 10));
    //function for filtering data according to date range
    
    let dateRangeFunc = function(settings, data, dataIndex) {
        let min = new Date($('#min').val()).getTime();
        let max = new Date($('#max').val()).getTime();
        let date = new Date(data[0]).getTime();
        //console.log('DATE IS FROM TIME is:' + date+'\nWhile min and max is:' +min+'<>'+max);
        if (min <= date && date <= max) {
            return true;
        }
    }
    //adds the date range filter to the data table
    $.fn.dataTable.ext.search.push(dateRangeFunc);
    //redraws the table so that the filter will be in effect
    $('#min, #max').change(function() {
        console.log("CHANGINIG");
        table.draw();
    });
    //resets the date range and table
    $('#resetDateRange').click(function() {
        $("input[type=date][name$=min]").val(new Date(0).toISOString().slice(0, 10));
        $("input[type=date][name$=max]").val(new Date().toISOString().slice(0, 10));
        table.draw();
    });
}
function reloadTable(data) {
    //customer_table is global variable
    customer_table.clear().draw();
    customer_table.rows.add(data);
    customer_table.columns.adjust().draw();
}
// Successfully adding a customer
let addSuccess = function (response,form) {
    //update data, a global variable, to get most recent entries
    data = response.data;
    reloadTable(data);
    //resets the input form
    document.getElementById('addThumbnail').setAttribute("src","/static/img/profile_default.png");
    form.reset();
    $('#addCustomer').modal('toggle');
}
// Add invalid to input to show validation error
let emailExists = function(response,email_input){
    if (response.responseJSON.email == 'unavailable') {
        email_input.classList.add('is-invalid');
    }
}
//adding customer
let addCustomerListener = function(csrf_token,form){
    return function () {
        let email = document.getElementById('addEmail');
        email.classList.remove('is-invalid');
        if(form.checkValidity()){
            let formData = new FormData(form);//.append('action','add');
            formData.append('operation','create');
            $.ajax({
                url: '',
                type: 'post',
                headers: {
                    //csrf token passed from the dashboard.html template under $(document).ready function
                    "X-CSRFToken": csrf_token
                },
                //data to be passed to django view
                data: formData,
                contentType: false,
                processData: false,
                //when successful, change the data in table with new data from server
                success: function(response){
                    addSuccess(response,form)
                },
                error: function(response){
                    emailExists(response,email);
                }
            });
        }
    }
}
//Update success
let updateSucess = function (response,form) {
    //update data, a global variable, to get most recent entries
    data = response.data;
    reloadTable(data);
    //resets the input form
    
    //should be replaced with button to remove picture -->> document.getElementById('addThumbnail').setAttribute("src","/static/img/profile_default.png");
    form.reset();
    $('#viewCustomer').modal('toggle');
}
//updating customer
let updateCustomerListener = function (csrf_token,form) {
    return function () {
        let email = document.getElementById('email');
        email.classList.remove('is-invalid');
        if(form.checkValidity()){
            let formData = new FormData(form);//.append('id',viewedCustomerID);//.append('action','add');
            formData.append('operation','update');
            formData.append('id',viewedCustomerID);
            formData.append('csrfmiddlewaretoken',csrf_token);
            $.ajax({
                url: '',
                type: 'post',
                //data to be passed to django view
                data: formData,
                contentType: false,
                processData: false,
                //when successful, change the data in table with new data from server
                success: function(response){
                    //console.log('SUBMIT OK');
                    updateSucess(response,form);
                },
                error: function(response){
                    //console.log('SUBMIT NOT OK');
                    emailExists(response,email);
                }
            });
        }
    }
}
//Update success
let deleteSuccess = function (response,form) {
    //update data, a global variable, to get most recent entries
    data = response.data;
    reloadTable(data);
    //resets the input form
    
    //should be replaced with button to remove picture -->> document.getElementById('addThumbnail').setAttribute("src","/static/img/profile_default.png");
    form.reset();
    $('#deleteCustomer').modal('toggle');
}
//updating customer
let deleteCustomerListener = function (csrf_token,form) {
    return function () {
        let formData = new FormData(form);//.append('id',viewedCustomerID);//.append('action','add');
        formData.append('operation','delete');
        formData.append('id',viewedCustomerID);
        formData.append('csrfmiddlewaretoken',csrf_token);
        $.ajax({
            url: '',
            type: 'post',
            //data to be passed to django view
            data: formData,
            contentType: false,
            processData: false,
            //when successful, change the data in table with new data from server
            success: function(response){
                deleteSuccess(response,form);
            },
            error: function(response){
                console.log('Delete failed');
            }
        });
    }
}
//Listeners unrelated to table are placed here
//Variables taken from Django follows python naming convention in this js file (e.g. csrf_token instead of csrfToken)
function initializeCustomerListeners(csrf_token) {
    //ajax form for add customer
    let form = document.getElementById('addCustomerForm');
    form.addEventListener('submit',function(e){e.preventDefault();});
    $('#addCustomerBtn').click(addCustomerListener(csrf_token,form));
    let updateForm = document.getElementById('viewCustomerForm');
    updateForm.addEventListener('submit',function(e){e.preventDefault();});
    $('#updateCustomerBtn').click(updateCustomerListener(csrf_token,updateForm));
    let deleteForm = document.getElementById('deleteCustomerForm');
    deleteForm.addEventListener('submit',function(e){e.preventDefault();});
    $('#deleteCustomerBtn').click(deleteCustomerListener(csrf_token,updateForm));
}
let viewedCustomerID = 1;
//for the view button
function viewCustomer(button){
    //get id
    viewedCustomerID = button.parentNode.parentNode.parentNode.getAttribute("data-id");
    console.log('ID is '+ viewedCustomerID);
    let customer = null;
    for(let i = 0; i < data.length; i++){
        //data here is the latest json from ajax call
        if(data[i].id == viewedCustomerID){
            customer = data[i];
            //console.log('found you! '+ JSON.stringify(customer));
            break;
        }
    }
    //get input elements
    let inputElements = document.getElementById('viewCustomerForm').querySelectorAll("input");
    //for looping and assigning values rather than manually assigning values to each input
    let inputName;
    for (let i = 0; i < inputElements.length; i++) {
        inputName = inputElements[i].getAttribute("name");
        //for radio buttons
        if (inputName == 'status' || inputName == 'gender') {
            if (inputElements[i].value == customer[inputName]) {
                //console.log('Checking '+ customer[inputName]);
                inputElements[i].checked = true;
            }
        }
        //for date types
        else if (inputName == 'birthdate' && customer[inputName] != null) {
            inputElements[i].value = new Date(customer[inputName]).toISOString().slice(0, 10);
        }
        //for picture
        else if (inputName == 'profile_picture') {
            //console.log('profile picture is:'+ customer[inputName])
            document.getElementById('thumbnail').setAttribute("src",customer[inputName]);
        } else {
            //console.log(inputName);
            inputElements[i].value = customer[inputName];
        }
    }
}
function deleteCustomer(button){
    //get id
    viewedCustomerID = button.parentNode.parentNode.parentNode.getAttribute("data-id");
    console.log('Delete ID is '+ viewedCustomerID);
}
//For view modal
function uploadImg(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#thumbnail').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
//For create modal
function addUploadImg(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#addThumbnail').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
// ******************************        CUSTOMER END       **************************