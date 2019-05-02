//Set focus on the first text field
//When the page first loads, the first text field should be in focus by default.
$('#name').focus();

/*
”Job Role” section
Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".

Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work when JS is disabled, which is a requirement below.
*/

$('#other-title').hide();

const optionOther = $('#title option[value=other]');


$('#title').change(function() {
   if($(this).val()==="other") {
       console.log('works'); //works.
       $('#other-title').show(1000);
       
   }
    else {
        $('#other-title').hide(); //works.
    }
    
});

