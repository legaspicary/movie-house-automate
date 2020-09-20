/***
 * AUTHOR: Cary L.
 * CO-AUTHOR: Gwynn C.
 */

'use strict'

//Customizes the table and inputs the data -C.LEGASPI
let customer_table = null;
function loadCustomerTable() {
    let initialTableSettings = {
        searching: true,
        buttons: [
            'print', 'copy', 'pdf', 'excel'
        ],
        order: [[0, 'asc']],
        pagingType: 'full_numbers',
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
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
            { "orderable": false, "targets": -1 },
            {
                "targets": -1,
                "data": null,
                "defaultContent": `<div class="button-container">
                        <button type="button" class="btn btn-sm mr-2 mb-2 w-auto vud vud-view" data-toggle="modal" data-target="#viewCustomer">
                            <i class="far fa-eye"></i>
                        </button>
                        <button type="button" class="btn btn-sm mr-2 mb-2 w-auto vud vud-delete" data-toggle="modal" data-target="#deleteRow">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>`
            }
        ],
        //ajax: "{% url 'customer:customer_dashboard' %}",
        ajax: {
            //empty means this will just redirect to the current url of the page
            url: '',
            dataSrc: "data"
        },
        "columns": [
            { "data": 'date_registered' },
            { "data": 'firstname' },
            { "data": 'lastname' },
            { "data": 'birthdate' },
            { "data": 'city' }
        ],
        initComplete: function () {
            this.api().columns().every(function () {
                var column = this;
                var select = $('<select class="form-control"><option value="">Filter None</option></select>')
                    .appendTo($(column.footer()).empty())
                    .on('change', function () {
                        let val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });
                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>');
                });
            });
        },

    }
    let table = $('#customerTable').DataTable(initialTableSettings);
    //passing it to customer_table to use in loadInitializers function
    customer_table = table;
    $("input[type=date][name$=min]").val(new Date(0).toISOString().slice(0, 10));
    $("input[type=date][name$=max]").val(new Date().toISOString().slice(0, 10));
    let dateRangeFunc = function (settings, data, dataIndex) {
        let min = new Date($('#min').val()).getTime();
        let max = new Date($('#max').val()).getTime();
        let date = new Date(data[0]).getTime();
        //console.log('DATE IS FROM TIME is:' + date+'\nWhile min and max is:' +min+'<>'+max);
        if (min <= date && date <= max) {
            console.log('THE DATA IS WITHIN RANGE');
            return true;
        }
        return false;
    }
    $.fn.dataTable.ext.search.push(dateRangeFunc);

    $('#min, #max').change(function () {
        table.draw();
    });

    $('#resetDateRange').click(function () {
        $("input[type=date][name$=min]").val(new Date(0).toISOString().slice(0, 10));
        $("input[type=date][name$=max]").val(new Date().toISOString().slice(0, 10));
        table.draw();
    });
}
//Listeners unrelated to table are placed here
function initializeCustomerListeners(csrf_token) {
    //ajax form for add customer
    let form = document.getElementById('addCustomerForm');
    $('#addCustomerBtn').click(function () {
        let formData = new FormData(form);
        $.ajax({
            url: '',
            type: 'post',
            headers: {
                "X-CSRFToken": csrf_token
            },
            //data to be passed to django view
            data: formData,
            contentType: false,
            processData: false,
            //when successful, the customer is in json response
            success: function (response) {
                console.log(response.status);
                customer_table.clear().draw();
                customer_table.rows.add(response.data);
                customer_table.columns.adjust().draw();
                $(':input', '#addCustomerForm')
                    .not(':button, :submit, :reset, :hidden')
                    .val('')
                    .prop('checked', false)
                    .prop('selected', false);
            }
        });
        //closes the modal
        $('#addCustomer').modal('toggle');
    });
}