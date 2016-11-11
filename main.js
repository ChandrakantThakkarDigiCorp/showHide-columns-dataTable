//CBT:Employee Database in JSON format
var employeeData=[{"id":1,"name":"Chandrakant","city":"Ahmedabad","contact":"9427536259","salary":10000},
{"id":2,"name":"Chintu","city":"Ahmedabad","contact":"9427536259","salary":11000},
{"id":3,"name":"Hetal","city":"Ahmedabad","contact":"9427536259","salary":12000},
{"id":4,"name":"Harsh","city":"Ahmedabad","contact":"9427536259","salary":13000},
{"id":5,"name":"Radha","city":"Ahmedabad","contact":"9427536259","salary":14000},
{"id":6,"name":"Vikash","city":"Ahmedabad","contact":"9427536259","salary":15000},
{"id":7,"name":"Ashish","city":"Ahmedabad","contact":"9427536259","salary":16000},
{"id":8,"name":"Ashraf","city":"Ahmedabad","contact":"9427536259","salary":17000},
{"id":9,"name":"Nishant","city":"Ahmedabad","contact":"9427536259","salary":18000},
{"id":10,"name":"Nikunj","city":"Ahmedabad","contact":"9427536259","salary":19000},
{"id":11,"name":"Urvish","city":"Ahmedabad","contact":"9427536259","salary":20000}];

//CBT:created Columns of dataTable
var tblColumns = [];
tblColumns.push({
    "data": "id",
    "title": "Employee ID",
});
tblColumns.push({
    "data": "name",
    "title": "Employee Name",
});
tblColumns.push({
    "data": "city",
    "title": "City",
});
tblColumns.push({
    "data": "contact",
    "title": "Contact",
});
tblColumns.push({
    "data": "salary",
    "title": "Salary",
});
var expanded = false;
//CBT:function for hide/show columns dropdown
function showCheckboxes() {
    if ($("#checkboxes").is(":visible") == true) {
        $("#checkboxes").css("display", "none");
    } else {
        $("#checkboxes").css("display", "block");
    }
}
var table = "";
$(document).ready(function(data) {
 //CBT:if data table is not available create data table
    if ($.fn.dataTable.isDataTable('#employeetbl') == false) {
        table = $('#employeetbl').DataTable({
            "data": employeeData,
            "columns": tblColumns,
            "info": false,
            responsive: {
                details: {
                    type: 'column',
                    target: 'tr'
                }
            },
            columnDefs: [{
                className: 'control',
                orderable: true,
                targets: 1
            }],
            order: [0, 'asc'],
            "bFilter": false,
            bLengthChange: false,
            // pagingType: "simple",
            "scrollY": "500",
            // "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            "searching": true,
            "drawCallback": function(table) {},
            dom: 'Bfrtip',
            buttons: [{
                extend: 'csv',
                title: "Detail List",
                text: 'Export CSV',
                exportOptions: {
                    columns: ':visible'
                }
            }, {
                extend: 'pdf',
                title: "Detail List",
                text: 'Export PDF',
                exportOptions: {
                    columns: ':visible'
                }
            }],
        });
        //CBT:create columns dropdown
        createColumnsDropdown();
    }


});

function createColumnsDropdown() {
    var tableColumnOptions = "<div id='tableColumns' class='multiselect'>\
     <div class='selectBox' onclick='showCheckboxes()'>\
         <select>\
             <option>Select Columns To Hide</option>\
         </select>\
         <div class='overSelect'></div>\
     </div>\
     <div id='checkboxes' style='margin-top: 15px; width: 138px; display: block;'>";
    tblColumns.forEach(function(d, i) {
        tableColumnOptions = tableColumnOptions + "<label for='one' class='labelChk'><input type='checkbox' id='" + d.title + "' data-column='" + i + "' value='{\"data\":\"" + d.data + "\",\"title\":\"" + d.title + "\"}' onchange='updateColumnDataTable()' checked/>" + d.title + "</label>";
    });
    tableColumnOptions = tableColumnOptions + "</div></div>";
    $(".dt-buttons").append(tableColumnOptions);
    //CBT:hide dropdown at initial level
    showCheckboxes();
}
//CBT:function to update data table columns based on user selection
function updateColumnDataTable() {
    var selectedColumnsIndex = [];
    if ($("#checkboxes input:checkbox:checked").length < 1) {
        //CBT:if no checkBox Selected then show all
        $("#checkboxes input:checkbox").each(function(d, i) {
            var column = table.column(d);
            column.visible(true);
            $(i).prop('checked', true);
        });
    } else {
        //CBT:make cheked chekbox to visible
        $("#checkboxes input:checkbox:checked").each(function(d) {
            selectedColumnsIndex.push($(this).attr("data-column"));
        });
        selectedColumnsIndex.forEach(function(columnIndex) {
            var column = table.column(columnIndex);
            column.visible(true);
        });
        //CBT:make uncheked chekbox to hide
        selectedColumnsIndex = [];
        $("#checkboxes input:checkbox:not(:checked)").each(function(d) {
            selectedColumnsIndex.push($(this).attr("data-column"));
        });
        selectedColumnsIndex.forEach(function(columnIndex) {
            var column = table.column(columnIndex);
            column.visible(false);
        });
    }
}
