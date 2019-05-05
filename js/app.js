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








/*
to remove 'disabled', use  removeProp()
$('#someid').removeProp('disabled');
*/



const $checkboxAll = $('input[name=all]');
const $AllLabel = $('input[name=all]').parent(); //this gets both label AND checkbox
//$($checkboxAll).prop('disabled', true); //works

const $checkboxJsFrameworks = $('input[name=js-frameworks]');
//$($checkboxJsFrameworks).prop('disabled', true); //works
const $jsFrameworksLabel = $AllLabel.next(); //we can use .text() to get text of label
//console.log($jsFrameworksLabel.text());

const $checkboxJsLibraries = $('input[name=js-libs]');
const $jsLibrariesLabel = $jsFrameworksLabel.next();

const $checkboxExpress = $('input[name=express]');
const $expressLabel = $jsLibrariesLabel.next();

const $checkboxNodeJs = $('input[name=node]');
const $nodeJsLabel = $expressLabel.next();

const $checkboxBuildTools = $('input[name=build-tools]');
const $buildToolsLabel = $nodeJsLabel.next();

const $checkboxNpm = $('input[name=npm]');
const $npmLabel = $buildToolsLabel.next();



//Visually indicate that the workshop in the competing time slot isn't available -> lets create an element 'flashMessage' for this

//Keeps track on Tuesday 9am-12pm
const $flashMessageTimeSlot = $('<div id="flashMessage">On Tuesday morning, this workshop is no longer possible to choose: </div>'); 


//Keeps track on Tuesday 1pm-4pm
const $flashMessageTimeSlot2 = $('<div id="flashMessage">On Tuesday afternoon, this workshop is no longer possible to choose: </div>'); 

//Keep track on cost
let totalCost = 0
//insert div at the end
const $yourTotalCost =  $('<div id="yourCostDiv">Your cost is($): </div>'); 
$('.activities').append($yourTotalCost);
$yourTotalCost.hide();

const $totalCost =
$('<div id="yourTotalCost">Cost: </div>');
$('.activities').append($totalCost);
$totalCost.hide();

$('.activities').prepend($flashMessageTimeSlot);
$('.activities').prepend($flashMessageTimeSlot2);

//Fix the style of the flashMessages
$flashMessageTimeSlot.css({color: 'white',backgroundColor: 'red',fontSize: 20,"border-radius":"7px","border-style": "ridge","font-family":"Verdana, Geneva, sans-serif"});
$flashMessageTimeSlot.hide();

$flashMessageTimeSlot2.css({color: 'white',backgroundColor: 'green',fontSize: 20, "border-radius":"7px","border-style": "ridge","font-family":"Verdana, Geneva, sans-serif"});
$flashMessageTimeSlot2.hide();





//If the user selects a workshop
//if users selects JavaScript Frameworks Workshop — Tuesday 9am-12pm

//https://www.techcoil.com/blog/how-to-use-jquery-to-detect-user-checking-and-unchecking-a-checkbox/


//TODO: 3 more checkboxes to add .change to.


$($checkboxJsFrameworks).change(function() {
//    if($($checkboxJsFrameworks).attr('checked', false)){
//        $($checkboxExpress).attr('disabled', true); 
//        }
    if(($checkboxJsFrameworks).is(':checked')){
        $checkboxExpress.attr('disabled', true);
        
        $flashMessageTimeSlot.append($expressLabel.text());
        $flashMessageTimeSlot.slideDown(2000);
        $flashMessageTimeSlot.delay(3000)
        $flashMessageTimeSlot.slideUp(1000);
        
        totalCost +=100;
        $yourTotalCost.show();
        $totalCost.text(totalCost);
        $totalCost.show();
        
        
        

    }
    else{
        $checkboxExpress.attr('disabled', false);
        
        $flashMessageTimeSlot.text('On Tuesday morning, this workshop is no longer possible to choose: '); 
        
        totalCost -=100;
        $totalCost.text(totalCost);
        
        //$yourTotalCost.replaceWith(totalCost);
    }

});


$($checkboxExpress).change(function() {
//    if($($checkboxJsFrameworks).attr('checked', false)){
//        $($checkboxExpress).attr('disabled', true); 
//        }
    if(($checkboxExpress).is(':checked')){
        $checkboxJsFrameworks.attr('disabled', true);
        //alert($flashMessageTimeSlot.text()+$jsFrameworksLabel.text());
        
        $flashMessageTimeSlot.append($jsFrameworksLabel.text());
        $flashMessageTimeSlot.slideDown(2000);
        $flashMessageTimeSlot.delay(3000)
        $flashMessageTimeSlot.slideUp(1000);
        
        totalCost +=100;
        
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
    }
    else{
        $checkboxJsFrameworks.attr('disabled', false);
        
        $flashMessageTimeSlot.text('On Tuesday morning, this workshop is no longer possible to choose: ');
        totalCost -=100;
        $totalCost.text(totalCost);
        
    }

    
});



$($checkboxJsLibraries).change(function() {

    if(($checkboxJsLibraries).is(':checked')){
        $checkboxNodeJs.attr('disabled', true);
        
        //alert($flashMessageTimeSlot.text()+$nodeJsLabel.text()); 
        
        $flashMessageTimeSlot2.append($nodeJsLabel.text());
        $flashMessageTimeSlot2.slideDown(2000);
        $flashMessageTimeSlot2.delay(3000)
        $flashMessageTimeSlot2.slideUp(1000);
        
        totalCost +=100;
        
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
    }
    else{
        $checkboxNodeJs.attr('disabled', false);
        
        $flashMessageTimeSlot2.text('On Tuesday afternoon, this workshop is no longer possible to choose: ');
        totalCost -=100;
        $totalCost.text(totalCost);
    }
    
});


$($checkboxNodeJs).change(function() {

    if(($checkboxNodeJs).is(':checked')){
        $checkboxJsLibraries.attr('disabled', true);
        //alert($flashMessageTimeSlot.text()+$jsLibrariesLabel.text());
        
        $flashMessageTimeSlot2.append($jsLibrariesLabel.text());
        $flashMessageTimeSlot2.slideDown(2000);
        $flashMessageTimeSlot2.delay(3000)
        $flashMessageTimeSlot2.slideUp(1000);
        
        totalCost +=100;
        
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
    }
    else{
        $checkboxJsLibraries.attr('disabled', false);
        
        $flashMessageTimeSlot2.text('On Tuesday afternoon, this workshop is no longer possible to choose: ');
        totalCost -=100;
        $totalCost.text(totalCost);
    }
 
});

$($checkboxAll).change(function(){
   if(($checkboxAll).is(':checked')){
       
       totalCost += 200;
       
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
   }
    else{
        totalCost -=200;
        $totalCost.text(totalCost);
    }
    
});


$($checkboxBuildTools).change(function(){
   if(($checkboxBuildTools).is(':checked')){
       totalCost += 100;
       
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
   } 
    else{
        totalCost -= 100;
        $totalCost.text(totalCost);
    }
    
});

$($checkboxNpm).change(function(){
    if(($checkboxNpm).is(':checked')){
        totalCost += 100;
        
        $totalCost.text(totalCost);
        $yourTotalCost.show();
        $totalCost.show();
    }
    else{
        totalCost -= 100;
        $totalCost.text(totalCost);
    }
});


//TODO: As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.

//add a variable to keep track of total cost. If that variable is > 0 then show ...some sort of element. 
//TODO: Add change functions for all boxes. Don't need flashmessages for these, but calculating cost is required.



