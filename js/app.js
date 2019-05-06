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


/*
”Register for Activities” section
Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.

As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
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



/*
"Payment Info" section
Display payment sections based on the payment option chosen in the select menu.

The "Credit Card" payment option should be selected by default. Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.

When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden.

When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.

NOTE: The user should not be able to select the "Select Payment Method" option from the payment select menu, because the user should not be able to submit the form without a chosen payment option.
*/

//Grab hold of credit card option (and bitcoin and paypal) in payment select. 
const $creditCardOption = $('#payment option:eq(1)');
const $paypalOption = $('#payment option:eq(2)');
const $bitcoinOption = $('#payment option:eq(3)');

//: Grab hold of Cardnumber, Zip Code, CVV, Exp date, Exp year. Hide all of this info when paypal or bitcoin is selected. All of these elements are wrapped in a div:
const creditCardDiv = $("#credit-card");

//Hide the option "Select Payment Method"
$('#payment option:eq(0)').hide();

//Make credit card selected by default.
$creditCardOption.prop('selected', true);

//Grab hold of the "PayPal" and "Bitcoin" information. Hide them.
const paypalDiv = $("p:eq(0)");
paypalDiv.hide();
const bitcoinDiv = $("p:eq(1)");
bitcoinDiv.hide();

//We select an option in select id payment, the option is Paypal:
$('#payment').change(function(){
    if($(this).val() ==="paypal"){
        paypalDiv.show();
        bitcoinDiv.hide();
        creditCardDiv.hide();
    }
    
});

//We select an option in select id payment, the option is bitcoin:

$('#payment').change(function(){
    if($(this).val() ==="bitcoin"){
        bitcoinDiv.show();
        paypalDiv.hide();
        creditCardDiv.hide();
    }
    
});

$('#payment').change(function(){
    if($(this).val() ==="credit card"){
        creditCardDiv.show();
        bitcoinDiv.show();
        paypalDiv.hide();
    }
    
});

/* TODO
Form validation

If any of the following validation errors exist, prevent the user from submitting the form:
-Name field can't be blank.

-Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.

-User must select at least one checkbox under the "Register for Activities" section of the form.

-If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
    -Credit Card field should only accept a number between 13 and 16 digits.
    -The Zip Code field should accept a 5-digit number.
    -The CVV should only accept a number that is exactly 3 digits long.
    
NOTE: Don't rely on the built in HTML5 validation by adding the required attribute to your DOM elements. You need to actually create your own custom validation checks and error messages.

NOTE: Avoid using snippets or plugins for this project. To get the most out of the experience, you should be writing all of your own code for your own custom validation.

NOTE: Make sure your validation is only validating Credit Card info if Credit Card is the selected payment method.

*/

//Select register button
const $registerButton = $('button');
//select name field
const $nameField = $('#name');

const emailValidationReg = /\w*\@\w*\.([a-z]{2,3})/;

//name validation: first name followed by space followed by surname. {1,50} makes sure the name isn't too long.
const nameValidationReg = /^[A-Z][a-z]{1,40}\s[A-Z][a-z]{1,40}$/; 

//Select label name -> Name:
const nameLabel = $nameField.prev();

const $incorrectNameMessage = $('<div id="incorrectNameMessage">Please note: No numbers. Only a-z characters. Begin first name and surname with capital letters </div>'); 

nameLabel.append($incorrectNameMessage);
$incorrectNameMessage.hide();


//http://jsfiddle.net/UKhAn/
//Exceeds req: Program your form so that it provides a real-time validation error message for at least one text input field. Looks DONE.
$($nameField).blur(function() {
    var VAL = $(this).val();
    
    if(nameValidationReg.test(VAL)){

        console.log('ok') 
        $nameField.css({"border-color": '#c1deeb' });
        $incorrectNameMessage.hide();
        
    }
    else {
        $nameField.css({"border-color": "red" });
        $incorrectNameMessage.show(); 
    }
});

