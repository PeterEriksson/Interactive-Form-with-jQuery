//Set focus on the first text field
//When the page first loads, the first text field should be in focus by default.
$('#name').focus();


/*
”Job Role” section
Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".

Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work when JS is disabled, which is a requirement below.
*/

//Grab textfield 'other'
const textFieldOther = $('#other-title');

//Hide the textfield "other" when page is loaded
$(textFieldOther).hide();

//Grab the option "other"
//const optionOther = $('#title option[value=other]'); Not using. Maybe take away.

//if 'other' is chosen from the select menu then textFieldOther should show. Else hide textFieldOther.
$('#title').change(function() {
   if($(this).val()==="other") {
       $(textFieldOther).show(1000);

   }
    
    else {
        $(textFieldOther).hide(500); //works.
    }
    
});

/*
”T-Shirt Info” section
-For the T-Shirt "Color" menu, only display the color options that match the design selected in the "Design" menu.

-If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."

-If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."

-When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
*/

//Lets grab the different options:
const jsPuns = $('#design option:eq(1)'); //grabs js puns
//jsPuns.hide(); //works //but dont need them now.

//heart js
const heartJS = $('#design option:eq(2)');
//heartJS.hide(); //works //but dont need them now.

//Grab all different colors:
const cornFlowerBlue = $('#color option:eq(0)');
const darkSlateGrey = cornFlowerBlue.next();
const gold = darkSlateGrey.next();
const tomato = gold.next();
const steelBlue = tomato.next();
const dimGrey = steelBlue.next();



//option is created
// Note selected is declared. Therefore it will be displayed first in the drop-down list.
//https://stackoverflow.com/questions/3518002/how-can-i-set-the-default-value-for-an-html-select-element
const $option= $('<option value="selectColor" selected>Please select a T-shirt theme</option>'); 

//prepend $option
$('#color').prepend($option);
//New place for this element is :eq(0). CornFlowerBlue moves up to eq(1)



/*
Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.

When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
*/




//exceeds expectations:
//“Color” drop down menu is hidden until a T-Shirt design is selected.
 $('#color').hide();

//if user interacts with Design drop down menu -> trigger elements on Color drop down menu. 
$('#design').change(function() {
    if($(this).val() ==="js puns"){

        $('#color option:eq(1)').prop('selected', true); 
        
        
        cornFlowerBlue.show();
        darkSlateGrey.show();
        gold.show();
        
        tomato.hide();
        steelBlue.hide();
        dimGrey.hide();
        
        $option.hide();
        
        
        //exceeds expectations:
        //“Color” drop down menu is hidden until a T-Shirt design is selected.
        $('#color').show(300);
        
        
    }
    else if($(this).val() ==="heart js"){
        
        //“Color” field should be updated
        $('#color option:eq(4)').prop('selected', true);
        
        
        tomato.show();
        steelBlue.show();
        dimGrey.show();
        
        cornFlowerBlue.hide();
        darkSlateGrey.hide();
        gold.hide();
        
        $option.hide();
        
        //exceeds expectations:
        //“Color” drop down menu is hidden until a T-Shirt design is selected.
        $('#color').show(300);
    }
    
    //the user selects "select theme" -> hide everything and display on Color menu "Please select a T-shirt theme"
    else {
                
        tomato.hide();
        steelBlue.hide();
        dimGrey.hide();

        cornFlowerBlue.hide();
        darkSlateGrey.hide();
        gold.hide();
        
        
        //display on Color menu "Please select a T-shirt theme"
        //$('#color option:eq(0)').prop('selected', true);
        //lets use our variable instead:
        $option.show();
        $($option).prop('selected', true);
    }
    
});

//if design drop down menu is on "Select Theme" -> just show “Please select a T-shirt theme” on Color drop down menu.
//if(!designChosen){
//        tomato.hide();
//        steelBlue.hide();
//        dimGrey.hide();
//
//        cornFlowerBlue.hide();
//        darkSlateGrey.hide();
//        gold.hide();
//    
//        $option.show();
//    
//       
//}
//TODO: this has no use. Delete.

/*
”Register for Activities” section
Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.

As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
*/

//visually indicate that the workshop in the competing time slot isn't available -> lets create an element 'flashMessage' for this

const $flashMessageTimeSlot = $('<div id="flashMessage">The workshop in the competing time slot is not available </div>'); 
$('.container').prepend($flashMessageTimeSlot);

$flashMessageTimeSlot.css({color: 'white',backgroundColor: 'red'});
//$flashMessageTimeSlot.css({backgroundColor: 'red'});
$flashMessageTimeSlot.css({fontSize: 40});


$flashMessageTimeSlot.hide();
//$flashMessageTimeSlot.show(3000);
//$flashMessageTimeSlot.slideDown(2000);
//ok


//<input type="checkbox" id="sName" name= "Male" style="width: 25px" value="male" disabled="disabled"/>Male

//Now on the click of a button, toggle between disabled and enabled checkbox:

//$("#button1").click(function() {
  // $("#sName").attr('disabled', !$("#sName").attr('disabled'));
//}); 


/*
to remove 'disabled', use  removeProp()
$('#someid').removeProp('disabled');
*/


//Select all the checkboxes and test. //Works.
//const $checkboxAll = $('input[name=all]').parent(); //this gets both label AND checkbox
const $checkboxAll = $('input[name=all]');
//$($checkboxAll).prop('disabled', true); //works

const $checkboxJsFrameworks = $('input[name=js-frameworks]');
//$($checkboxJsFrameworks).prop('disabled', true); //works

const $checkboxJsLibraries = $('input[name=js-libs]');

const $checkboxExpress = $('input[name=express]');

const $checkboxNodeJs = $('input[name=node]');

const $checkboxBuildTools = $('input[name=build-tools]');

const $checkboxNpm = $('input[name=npm]');

//If the user selects a workshop....
//if users selects JavaScript Frameworks Workshop — Tuesday 9am-12pm, $100

//https://www.techcoil.com/blog/how-to-use-jquery-to-detect-user-checking-and-unchecking-a-checkbox/
$($checkboxJsFrameworks).change(function() {
//    if($($checkboxJsFrameworks).attr('checked', false)){
//        $($checkboxExpress).attr('disabled', true); 
//        }
    if(($checkboxJsFrameworks).is(':checked')){
        $checkboxExpress.attr('disabled', true);
    }
    else{
        $checkboxExpress.attr('disabled', false);
    }

    
});
//Works.

$($checkboxExpress).change(function() {
//    if($($checkboxJsFrameworks).attr('checked', false)){
//        $($checkboxExpress).attr('disabled', true); 
//        }
    if(($checkboxExpress).is(':checked')){
        $checkboxJsFrameworks.attr('disabled', true);
    }
    else{
        $checkboxJsFrameworks.attr('disabled', false);
    }

    
});
//Works.

//TODO: now fix flashMessage.

