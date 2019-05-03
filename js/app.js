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
//heartJS.hide(); //works

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



/*
Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.

When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
*/


//the user hasn't selected a design yet.
let designChosen = false;

//if user interacts with Design drop down menu -> trigger elements on Color drop down menu. 
$('#design').change(function() {
    if($(this).val() ==="js puns"){

        $('#color option:eq(1)').prop('selected', true); 
        
        //user has selected a design
        designChosen = true;
        
        cornFlowerBlue.show();
        darkSlateGrey.show();
        gold.show();
        
        tomato.hide();
        steelBlue.hide();
        dimGrey.hide();
        
        $option.hide();
        
    }
    else if($(this).val() ==="heart js"){
        
        //“Color” field should be updated
        $('#color option:eq(4)').prop('selected', true);
        
        //user has selected a design
        designChosen = true;
        
        tomato.show();
        steelBlue.show();
        dimGrey.show();
        
        cornFlowerBlue.hide();
        darkSlateGrey.hide();
        gold.hide();
        
        $option.hide();
    }
    
    //the user selects "select theme" -> hide everything and display on Color menu "Please select a T-shirt theme"
    else {
        
        designChosen = false;
        
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
if(!designChosen){
        tomato.hide();
        steelBlue.hide();
        dimGrey.hide();

        cornFlowerBlue.hide();
        darkSlateGrey.hide();
        gold.hide();
    
        $option.show();
}
