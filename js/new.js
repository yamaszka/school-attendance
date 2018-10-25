//MODEL//
var names = ['Slappy the Frog', 'Lilly the Lizard', 'Paulrus the Walrus', 'Gregory the Goat', 'Adam the Anaconda'];
var term = 12;
var attendance = {};
//MODEL//

//LARRY//
//ramdom true or false
function getRandom() {
    return (Math.random() >= 0.5);
}
//initialization of randam attendance
function init_data() {
    names.forEach(function(name){
        attendance[name] = [];
        for (var i=0; i<term; i++){
            attendance[name].push(getRandom());
        }//for
    });//for each
}
//taking data form model :-) MOV
function get_a(){
    return attendance;
}
//update the attendance after click
function update(name, int, state) {
    attendance[name][int]=state;
    // attendance[name][int]=state;
}

init_data();
init_view();
set_data();
click_checkbox();
//LARRY//


//VIEW//
function init_view() {
    var table = document.getElementsByTagName("tbody")[0];
    names.forEach(function(name){
          var newRow = table.insertRow(0);
          newRow.setAttribute('class', 'student');
          var newCell3 = newRow.insertCell(0);
          newCell3.setAttribute('class', 'missed-col');
          newCell3.textContent = '0';
            for (var i=term-1; i>=0; i--) {
                var newCell2 = newRow.insertCell(0);
                newCell2.setAttribute('class', 'attend-col');
                var input = document.createElement("INPUT");
                input.setAttribute("type", "checkbox");
                input.setAttribute('class', i);
                newCell2.appendChild(input);
            }//for
        var newCell1 = newRow.insertCell(0);
        newCell1.setAttribute('class', 'name-col');
        newCell1.textContent = name;
    })//forEach
}
//eventListener forthe check box
function click_checkbox(){
var boxes = document.getElementsByTagName("input");
 for (var i=0; i<boxes.length; i++){
     boxes[i].addEventListener('click', function(){
            var classname = $(this).attr('class');
            var checkbox_name = $(this).parent('td').parent('tr');
            var check_name = $(checkbox_name).children('.name-col').text();
            var state = $(this).prop('checked');
            update(check_name, classname, state);
            set_data();
             });
 }//for
}
// Check boxes, based on attendace records
function set_data() {
    $.each(get_a(), function(name, days) {
        var missing = 0;
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input'),
            missing_days = $(studentRow).children('.missed-col');
//counting missing
        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
                if (days[i]==false){
                    missing++;
                }//if
        });//each daycheck
//adding count missing days
        missing_days.text(missing);
    });//each get_a
}
//VIEW//
