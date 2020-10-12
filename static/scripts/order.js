/***
 * AUTHOR: Cary L.
 * CO-AUTHOR: Gwynn C.
 */

'use strict'
//**************************** HELPER FUNCTIONS ***********************************

function loadCustomers(id, customers) {
    for (var i = 0; i < customers.length; i++) {
        $('#' + id).append($("<option></option>")
            .attr("value", customers[i]['id'])
            .text(customers[i]['firstname'] + ' ' + customers[i]['lastname']));
    }
}

function loadDvds(id, dvds) {
    for (var i = 0; i < dvds.length; i++) {
        $('#' + id).append($("<option></option>")
            .attr("value", dvds[i]['sku'])
            .text(dvds[i]['title']));
    }
}

function serverLoadCustomers() {
    $.ajax({
        url: '',
        type: 'get',
        data: { 'action': 'get_customers' },
        success: function(response) {
            customers = response.data;
            loadCustomers('customer-select', customers);
            console.log("serverLoadCustomers success");
        },
        error: function(response) {
            console.log("Error in retrieving customer list")
        }
    });
}

function serverLoadDvds() {
    $.ajax({
        url: '',
        type: 'get',
        data: { 'action': 'get_dvds' },
        success: function(response) {
            dvds = response.data;
            loadDvds('dvd-select', dvds);
            console.log("serverLoadDvds success");
        },
        error: function(response) {
            console.log("Error in retrieving dvd list")
        }
    });
}

//****************************** ORDER *************************************
let order_table = null;
let data = null;
let deleteOrderID = 1;
let customers = null;
let dvds = null;
let selectedDvdPrice = 0;

function loadOrderTable() {
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
                        <button type="button" class="btn btn-sm mr-2 mb-2 w-auto vud vud-view" data-toggle="modal" data-target="#viewOrder" onclick="viewOrder(this)">
                            <i class="far fa-eye"></i>
                        </button>
                        <button type="button" class="btn btn-sm mr-2 mb-2 w-auto vud vud-delete" data-toggle="modal" data-target="#deleteOrder" onclick="deleteOrder(this)">
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
            { "data": 'date_rented' },
            { "data": 'dvd_title' },
            { "data": 'customer_name' },
            { "data": 'no_of_items' },
            { "data": 'total_price' },
        ],
        //Adds data-id attribute to each row
        createdRow: function(row, data, dataIndex) {
            $(row).attr('data-id', data.id);
        },
        //Adds filter function at footer after the datatable has been initialized
        initComplete: function() {
            //get data for view listener
            data = order_table.ajax.json().data;
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
    console.log('LOADED');
    let table = $('#orderTable').DataTable(initialTableSettings);
    //passing it to order_table, so that it can be used in loadInitializers function
    order_table = table;
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
            //console.log('THE DATA IS WITHIN RANGE');
            return true;
        }
        //adds the date range filter to the data table
        $.fn.dataTable.ext.search.push(dateRangeFunc);
        //redraws the table so that the filter will be in effect
        $('#min, #max').change(function() {
            table.draw();
        });
        //resets the date range and table
        $('#resetDateRange').click(function() {
            $("input[type=date][name$=min]").val(new Date(0).toISOString().slice(0, 10));
            $("input[type=date][name$=max]").val(new Date().toISOString().slice(0, 10));
            table.draw();
        });
    }
}

function reloadTable(data) {
    //order_table is global variable
    order_table.clear().draw();
    order_table.rows.add(data);
    order_table.columns.adjust().draw();
}
// Successfully adding a customer
let addSuccess = function(response, form) {
        //update data, a global variable, to get most recent entries
        data = response.data;
        reloadTable(data);
        //resets the input form
        form.reset();
        //----------------------------------------------------------------------------------------
        $('#addOrder').modal('toggle');
    }
    // Add invalid to input to show validation error
let no_stocks = function(response, stocks_input) {
    if (response.responseJSON.stocks_message == 'unavailable') {
        stocks_input.classList.add('is-invalid');
    }
}
let createOrderListener = function(csrf_token, form) {
    return function() {
        //----------------------------------------------------------------------------------------
        let number_of_items_input = document.getElementById('numberOfItems');
        number_of_items_input.classList.remove('is-invalid');
        if (form.checkValidity()) {
            let formData = new FormData(form); //.append('action','add');
            formData.append('operation', 'create');
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
                success: function(response) {
                    addSuccess(response, form)
                },
                error: function(response) {
                    no_stocks(response, number_of_items_input);
                }
            });
        }
    }
}
let deleteSuccess = function(response, form) {
    //update data, a global variable, to get most recent entries
    data = response.data;
    reloadTable(data);
    //resets the input form

    //should be replaced with button to remove picture -->> document.getElementById('addThumbnail').setAttribute("src","/static/img/profile_default.png");
    // form.reset();
    ///------------------------------------------------------
    $('#deleteOrder').modal('toggle');
}
let deleteDvdForm = document.getElementById('deleteOrderForm');
let deleteOrderListener = function(csrf_token) {
    return function() {
        console.log("Deleting..");
        let formData = new FormData(deleteDvdForm); //.append('id',viewedCustomerID);//.append('action','add');
        formData.append('operation', 'delete');
        formData.append('id', deleteOrderID);
        // formData.append('csrfmiddlewaretoken', csrf_token);
        formData.append('csrfmiddlewaretoken', $('meta[name="csrf-token"]').attr('content'))
        $.ajax({
            url: '',
            type: 'post',
            //data to be passed to django view
            data: formData,
            contentType: false,
            processData: false,
            //when successful, change the data in table with new data from server
            success: function(response) {
                ///------------------------------------------------------
                deleteSuccess(response);
                console.log("Delete Success");
            },
            error: function(response) {
                console.log('Delete failed');
            }
        });
    }
}

function deleteOrder(button) {
    //get id
    deleteOrderID = button.parentNode.parentNode.parentNode.getAttribute("data-id");
    console.log('Delete ID is ' + deleteOrderID);

    let deleteorder_id = document.getElementById('order_id');
    deleteorder_id.value = deleteOrderID;
}

function loadSelectTags() {
    console.log("load seelect tag")
    $('#numberOfItems').change(function() {
        $("#total-price").val(selectedDvdPrice * $('#numberOfItems').val());
    });
    
    $('#customer-select').change(function() {
        let selected = $("#customer-select option:selected").val();
        for (var i = 0; i < customers.length; i++) {
            if (selected == customers[i]['id']) {
                $("#customerID").val(customers[i]['id']);
                $("#firstname").val(customers[i]['firstname']);
                $("#lastname").val(customers[i]['lastname']);
                $("#email").val(customers[i]['email']);
                break;
            }
        }
    });
    $('#dvd-select').change(function() {
        let selected = $("#dvd-select option:selected").val();
        for (var i = 0; i < dvds.length; i++) {
            if (selected == dvds[i]['sku']) {
                $("#dvdID").val(dvds[i]['sku']);
                $("#title").val(dvds[i]['title']);
                $("#releaseDate").val(dvds[i]['release_date']);
                $("#stocks").val(dvds[i]['number_of_items']);
                $("#director").val(dvds[i]['director']);
                $("#price").val(dvds[i]['price']);
                selectedDvdPrice = dvds[i]['price'];
                $("#total-price").val(selectedDvdPrice * $('#numberOfItems').val());
                break;
            }
        }
    });
}

function initializeOrderListeners(csrf_token) {
    //ajax form for add customer
    let addOrderForm = document.getElementById('addOrderForm');
    let deleteForm = document.getElementById('deleteOrderForm');
    addOrderForm.addEventListener('submit', function(e) { e.preventDefault(); });
    deleteForm.addEventListener('submit', function(e) { e.preventDefault(); });
    //------------------------------------------------------------------------------
    $('#addOrderBtn').click(createOrderListener(csrf_token, addOrderForm));
    $('#deleteOrderBtn').click(deleteOrderListener(csrf_token));
    
    loadSelectTags();

    $('#addOrderModalBtn').click(function() {
        $('#customer-select').text('')
        $('#dvd-select').html('')
        addOrderForm.reset();
        $('#customer-select').append('<option selected="true" disabled="disabled">Choose Customer</option>');
        $('#dvd-select').append('<option selected="true" disabled="disabled">Choose Dvd</option>');
        serverLoadCustomers();
        serverLoadDvds();
    });

}

// ******************************        ORDER END       **************************