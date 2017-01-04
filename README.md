## showHide-columns-dataTable
#### Author: Chandrakant Thakkar
##### Created on: 11th Nov 2016

---
###### This is a jQuery dataTable provides functionality of show/hide columns at runtime.This table also provides functionality of export data in CSV or PDF format.
---

#### How to Use ? Let's start

* _import required css and js files for jQuery DataTable :_

```javascript
<link href="css/select.dataTables.min.css" rel="stylesheet">
<link href="css/jquery.dataTables.min.css" rel="stylesheet">
<link href="css/buttons.dataTables.min.css" rel="stylesheet">
<link href="css/dataTables.bootstrap.min.css" rel="stylesheet">
<link href="css/ddata-table.css" rel="stylesheet">

<script src="js/jquery-1.7.2.min.js " type="text/javascript "></script>
<script src="js/jquery.dataTables.min.js " type="text/javascript "></script>
<script src="js/dataTables.buttons.min.js " type="text/javascript "></script>
<script src="js/custom-select.js " type="text/javascript "></script>

<script src="js/buttons.flash.min.js " type="text/javascript "></script>
<script src="js/jszip.min.js " type="text/javascript "></script>
<script src="js/pdfmake.min.js " type="text/javascript "></script>
<script src="js/vfs_fonts.js " type="text/javascript "></script>
<script src="js/buttons.html5.min.js " type="text/javascript "></script>
<script src="main.js " type="text/javascript "></script>
<style>
	#tableColumns {
		float: right;
		margin-left: "11px";
	}

	#checkboxes {
		position: absolute;
		display: block;
		z-index: 999;
		background-color: white;
		width: inherit;
	}

	#checkboxes .labelChk {
		margin-left: "10px";
	}

	#checkboxes .columnsBtn {
		margin-left: "50px";
		margin-bottom: "10px";
	}
</style>
```
---
* _create HTML table:_

```javascript
// CBT:HTML table
<table id="employeetbl" class="table table-hover table-striped display responsive nowrap " width="100%"></table>

```
---
* _Create static data and table columns for DataTable:_

```javascript
//CBT:Employee data in JSON format
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

//CBT:created Columns for dataTable
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
```
---
* _Convert HTMl table into jQuery dataTable using static data and columns:_

```javascript
var table = $('#employeetbl').DataTable({
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
    "scrollY": "500",
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

```
---
* _Create columns dropdown that shows all columns with leading checkbox:_

```javascript
//CBT:call createColumnsDropdown() function to create columns dropdown
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
//CBT:function for hide/show columns dropdown
function showCheckboxes() {
   if ($("#checkboxes").is(":visible") == true) {
       $("#checkboxes").css("display", "none");
   } else {
       $("#checkboxes").css("display", "block");
   }
}
```
---
* _Code to update(hide/show) datatable columns based on user selection of checkboxes at runtime:_

```javascript
//CBT:this function will be called when user checked/uncheked checkboxes at runtime
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
```

### <a href='https://rawgit.com/ChandrakantThakkarDigiCorp/showHide-columns-dataTable/master/index.html' target='_blank'>Click Here To See Output</a>
