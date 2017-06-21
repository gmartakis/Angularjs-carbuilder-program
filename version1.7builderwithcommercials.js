var defaultSliderMinValue, defaultSliderMaxValue = 0; //Apply Filter
var selectedSliderMinValue, selectedSliderMaxValue = 0; //Apply Filter

var targetId;
var targetValue;
var targetFuel;

var i = 0;


var trim = {name:'Black-01'};
		
var color = {name:'Red-dark'};

//gradeVehicles 1		
var vehicle = {name:[], price:[], engine:[], fuelType:[], trans:[], body:[], colors:{name:["#dfsdfds"]}, trims:[]};

var Allvehicles = [];
		
var grade = {gradename:[], vehicle1:{name1:[], price1:[], engine1:[], fuelType1:[], trans1:[], body1:[], colors1:{name1:["#dfsdfds"]}, trims1:[]}};

var grade1 = {gradename1:[], vehicle2:{name2:[], price2:[], engine2:[], fuelType2:[], trans2:[], body2:[], colors2:{name1:["#dfsdfds"]}, trims2:[]}};

		
var CarModel = {Name:'', grades:[]};

//store all tree
var Alltree = [];

//temp matrixs
var tempGradeName = [];
var tempVehicles = [];
var tempVehicles1 = [];

var vehicleName;
var vehicleFuel;
var vehicleEngine;
var vehicleTrans;
var vehicleBodyWork;

/*
 * Min max price All vehicles
 */

var minRangePrice = 0;
var maxRangePrice = 0;
var rangePrice = [];

var countVehicleName = 0;

/*
 * Min max price All vehicles
 */
var countVehicle = 0;
var sliderRangeMin = 0;
var sliderRangeMax = 0;

/*
 * storeUnique Array
 */

var storeuniqueFuelType = [];
var storeuniqueEngine = [];
var storeuniqueTrans = [];
var storeuniqueBody = [];

var TestYiannisXML;
/*
 * end storeUnique arrays
 */
//Xml data node structure
var data;
var model;
var grades;
var findGrade;
var $vehicles;
var $vehicle;
//end data node structure


//JSON Array Object from XML
//https://www.experience-nissan.gr/builder/'+theCar+'/format/xml
//var jsonstring = xml2json.fromFile('/xml/note.xml', 'string');

$(document).ready(function()
{
	
	//preloader
	setTimeout(function(){
		$('body').addClass('loaded');
		//$('h1').css('color','#222222');
	}, 3500);
	
	var thecounter = 0;
	var jsonstr;
	
	var getUrl = window.location;
	var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1]+'/'+theCar+'/format/json';
	
	console.log(baseUrl);
	 
	$.ajax({
		  url: baseUrl,
		  async: false,
		  dataType: 'json',
		  success: function (jsonObj) {
		    jsonstr = jsonObj;
		  }
		});
	
	$('.feedback-toggle').hide();
	
	modelsname = jsonstr.config.model['@attributes'].name;
	categoryVehicle = jsonstr.category;
	
	if(jsonstr.config.model['@attributes'].name != "")
	{		 	
		 	if(jsonstr.config.model.grades instanceof Array)
			{
				for(var i = 0; i < jsonstr.config.model.grades.length; i++) 
					{
					
					var gradeName = jsonstr.config.model.grades[i].grade.gradename['#text'];
					
					grade1.gradename1.push(gradeName);
						
						if(jsonstr.config.model.grades[i].grade.vehicles instanceof Array)
						{	
							for(var j = 0; j < jsonstr.config.model.grades[i].grade.vehicles.length; j++) 
							{
									
									vehicleFuel = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
									vehiclePrice = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
									vehicleName = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
									vehicleEngine = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
									vehicleTrans = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
									//categoryVehicle = jsonstr.category;
									if(categoryVehicle == 'lcvs')
									{
										vehicleBodyWork = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
									}else
									{
										vehicleBodyWork = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
									}
									
									vehicle.fuelType.push(vehicleFuel);
			                    	vehicle.price.push(vehiclePrice);
									vehicle.name.push(vehicleName);
									vehicle.engine.push(vehicleEngine);
									vehicle.trans.push(vehicleTrans);
									vehicle.body.push(vehicleBodyWork);
									
									thecounter+=1;
							}
						}
					}	
			}else
			{
				gradeName = jsonstr.config.model.grades.grade.gradename['#text'];
				grade1.gradename1.push(gradeName);
				
				for(var i = 0; i < jsonstr.config.model.grades.grade.vehicles.length; i++) 
					{
						getVehicleNum = i;
						vehicleFuel = jsonstr.config.model.grades.grade.vehicles[i].vehicle.fuel['#text'];
						vehiclePrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.price['#text'];
						vehicleName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.name['#text'];
						vehicleEngine = jsonstr.config.model.grades.grade.vehicles[i].vehicle.engine['#text'].toString();
						vehicleTrans = jsonstr.config.model.grades.grade.vehicles[i].vehicle.transmission['#text'];
						if(categoryVehicle == 'lcvs')
						{
							vehicleBodyWork = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
						}else
						{
							vehicleBodyWork = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
						}
						
						vehicle.name.push(vehicleName);
                    	vehicle.price.push(vehiclePrice);
						vehicle.fuelType.push(vehicleFuel);
						vehicle.engine.push(vehicleEngine);
						vehicle.trans.push(vehicleTrans);
						vehicle.body.push(vehicleBodyWork);
						rangePrice.push(vehiclePrice);
						
						thecounter+=1;
					}
			}
			
	
			storeuniqueFuelType = GetUnique(vehicle.fuelType);
			storeuniqueEngine = GetUnique(vehicle.engine);
			storeuniqueTrans = GetUnique(vehicle.trans);
			storeuniqueBody = GetUnique(vehicle.body);
			/*
			 * end Store Unique values Fuel, engine, transmission, Body
			 */
		
            //$('#mainContentconf > div.displaySliderwithCVT').text( countVehicleName +' '+ CarModel.Name ).show();	
       	
			
			//============================================================================================
			
			minRangePrice = Math.min.apply(Math, vehicle.price);
			maxRangePrice = Math.max.apply(Math, vehicle.price);
			
			sliderRangeMin = minRangePrice;
			sliderRangeMax = maxRangePrice;
			
			/*
			 * Load slider Price range
			 */
				displaySliderRangePrice(jsonstr, minRangePrice, maxRangePrice, sliderRangeMin, sliderRangeMax, grade.gradename, vehicle.fuelType, vehicle.engine, 
					vehicle.trans, vehicle.price, vehicle.name, vehicle.body, storeuniqueFuelType);
				//countVehicles(event, array, array);
				
			/*
			 * end Load slider Price range
			 */
			//============================================================================================
			/*
			 * 
			 */
			
			   drawCheckboxes(storeuniqueFuelType, storeuniqueEngine, storeuniqueTrans, storeuniqueBody);
			    //checkboxes fuel type enable bind event
			    for(var i = 0; i < storeuniqueFuelType.length; i++){
			    	selector = "#fuel-type-"+i;
			    	
			    	$(selector).on('click', function(event)
			    	{
			    		//$('#mainContentconf').append('<p> Model----Name: ' + jsonstr.config.model['@attributes'].name + '</p>');
			    		ApplyFilters(event, jsonstr, grade.gradename, vehicle.fuelType, vehicle.engine, vehicle.trans, vehicle.name, vehicle.price, vehicle.body, storeuniqueFuelType);
			    	});			    	
			    }
			    //Engine
			    for(var i = 0; i < storeuniqueEngine.length; i++){
			    	selector = "#engine-"+i;
			    	$(selector).on('click', function(event)
			    	{
			    		ApplyFilters(event, jsonstr, grade.gradename, vehicle.fuelType, vehicle.engine, vehicle.trans, vehicle.name, vehicle.price, vehicle.body, storeuniqueFuelType);
			    	});			    	
			    }
			    //Transmission
			    for(var i = 0; i < storeuniqueTrans.length; i++){
			    	selector = "#transmission-"+i;
			    	$(selector).on('click', function(event)
			    	{
			    		ApplyFilters(event, jsonstr, grade.gradename, vehicle.fuelType, vehicle.engine, vehicle.trans, vehicle.name, vehicle.price, vehicle.body, storeuniqueFuelType);
			    	});			    	
			    }
			    //BodyWork
			    for(var i = 0; i < storeuniqueBody.length; i++){
			    	selector = "#body-"+i;
			    	$(selector).on('click', function(event)
			    	{
			    		ApplyFilters(event, jsonstr, grade.gradename, vehicle.fuelType, vehicle.engine, vehicle.trans, vehicle.name, vehicle.price, vehicle.body, storeuniqueFuelType);
			    	});			    	
			    }
			
			   $('#mainContentconf > div.displaySliderwithCVT').text( thecounter +' '+ modelsname ).show();
			   
			   
		}else
		{
			$('#mainContentconf').html('<div style="margin-top:10px;"><h1 class="grade"> Παρουσιάστηκε ένα σφάλμα! </h1></div>');
		}
	
});	

	
function toArray(Object){
       var MyArray = new Array();
       for(var name in Object){
               Array[name] = Object[name];
       }
       return Array;
}

	
function displayVehiclesNo(total, car)
{
	$('#mainContentconf > div.displaySliderwithCVT').text( total +' '+ car ).show();
}

function displaySliderRangePrice(jsonstr, minRangePrice, maxRangePrice, sliderRangeMin, sliderRangeMax, gradeName, arrayFueltype, arrayengine, arraytransmission, arrayprice, arrayname, arraybody, storeuniqueFuel)
{
	
	 $( "#slider-range" ).slider({
	 	range: true,
	 	min: minRangePrice,
	 	max: maxRangePrice,
	 	values: [sliderRangeMin, sliderRangeMax],
	 	slide: function( event, ui ) {
	 		
	 	},
	 	change: function(event, ui) {
	 		setMinValue(ui.values[0]);
	 		setMaxValue(ui.values[1]);
	 		ApplyFilters(event, jsonstr, gradeName, arrayFueltype, arrayengine, arraytransmission, arrayprice, arrayname, arraybody, storeuniqueFuel);
	 		//countVehicles(event, ui, array, array);
	 	},
	 	start: function(event, ui)
	 	{
	  	}
	 }).slider("pips", {rest: "label", prefix: "€",}).slider("float",{prefix: "€",});
}

function GetUnique(inputArray)
	{
		var outputArray = [];
					
		for (var i = 0; i < inputArray.length; i++)
			{
				if ((jQuery.inArray(inputArray[i], outputArray)) == -1)
				{
					outputArray.push(inputArray[i]);
				}
			}
			return outputArray;
	}

function drawCheckboxes(storeuniqueFuelType, storeuniqueEngine, storeuniqueTrans, storeuniqueBody)
{
			var html= [];
			var htmlengines = [];
			var htmltransmissions = [];
			var htmlbodyworks = [];
			var counter = 0;
			for(var i = 0; i < storeuniqueFuelType.length; i++){
				html.push('<li><input id="fuel-type-'+i+'" class="fuel" name="fuel[]" type="checkbox" value="'+ storeuniqueFuelType[i] + '">' + storeuniqueFuelType[i] + '</input></li>');
	 		}
	 		
	 		$('#mainContentconf > form > ul > li:nth-child(1) > div > div > div:nth-child(3) > ul').append(html);
			for(var i = 0; i < storeuniqueEngine.length; i++){
				htmlengines.push('<li><input id="engine-'+i+'" class="engine" name="engine[]" type="checkbox" value="'+ storeuniqueEngine[i] + '">' + storeuniqueEngine[i] + '</input></li>');
			}
	 		$('#mainContentconf > form > ul > li:nth-child(2) > div > div > div:nth-child(3) > ul').append(htmlengines);
	 		
	 		for(var i = 0; i < storeuniqueTrans.length; i++){
				htmltransmissions.push('<li><input id="transmission-'+i+'" class="transmission" name="transmission[]"  type="checkbox" value="'+ storeuniqueTrans[i] + '">' + storeuniqueTrans[i] + '</input></li>');
	 		}
	 		$('#mainContentconf > form > ul > li:nth-child(3) > div > div > div:nth-child(3) > ul').append(htmltransmissions);
	 	
	 		for(var i = 0; i < storeuniqueBody.length; i++){
	 			
	 			if(storeuniqueBody.length > 1){
	 				htmlbodyworks.push('<li><input id="body-'+i+'" class="body" name="body[]" type="checkbox" value="'+ storeuniqueBody[i] + '">' + storeuniqueBody[i] + '</input></li>');
	 			}else{
	 				htmlbodyworks.push('<li><input id="body-'+i+'" class="body" name="body[]" type="checkbox" value="'+ storeuniqueBody[i] + '" checked>' + storeuniqueBody[i] + '</input></li>');
	 			}
	 			console.log(storeuniqueBody.length);
	 			counter+=1;
	 		}
	 		$('#mainContentconf > form > ul > li:nth-child(4) > div > div > div:nth-child(3) > ul').append(htmlbodyworks);
	 		
}



//trigger min value on change
function setMinValue(myCurrentMinValue)
{
		$("input[name='minvalue']").val(myCurrentMinValue)
                 								         .trigger('change');
}
//trigger max value on change					
function setMaxValue(myCurrentMaxValue)
{
		$("input[name='maxvalue']").val(myCurrentMaxValue)
                 								         .trigger('change');
}


function ApplyFilters(event, jsonstr, gradeName, arrayFuelType, arrayengine, arraytransmission, arrayprice, arrayname, arraybody, storeuniqueFuel) {
				
				defaultSliderMinValue = minRangePrice; 
				defaultSliderMaxValue = maxRangePrice;
				
				var targetGass;
				var targetPetrol;
				var targetFuel;
				var targetEngine;
				var j = 0;
				
				var arrayFuel = [];
				var uniqueArrayFuel = [];
				var arrayEngineType = [];
				var uniqueArrayEngine = [];
				var arrayTransmission = [];
				var uniqueArrayTransmission = [];
				var arrayBody = [];
				var uniqueArrayBody = [];
				
				var checkBoxesFuel = $("input[name='fuel[]']:checked");
				var checkBoxesEngine = $('input[name="engine[]"]:checked');
				var checkBoxesTransmission = $('input[name="transmission[]"]:checked');
				var checkBoxesBodyWork = $('input[name="body[]"]:checked');
				var allCheckBox = $('input[type="checkbox"]:checked');
				
				
				if(event.type === "slidechange"){
					
					currentMinValue = $("#slider-range").slider("values", 0);
					currentMaxValue = $("#slider-range").slider("values", 1);
				}
				
				if(event.type === "click"){
					
					
					currentMinValue = $("#slider-range").slider("values", 0);
					currentMaxValue = $("#slider-range").slider("values", 1);
					
					/*
					 * meta to click event duo pragmata ti tupou einai fuel engine ktl kai ean einai ckecked i unckecked. 
					 */
					if($('#'+event.target.id).is(':checked'))
					{
						
						targetId = event.target.id;
						targetValue = $('#'+event.target.id).val();
						
						if($('#targetvalue').length > 0)
						{
							$('#targetvalue').val(targetValue);
							
						}else{		
							$('#mainContentconf').append('<input type="hidden" id="targetvalue" name="targetvalue" value='+targetValue+' />');
							$('#targetvalue').val(targetValue);
						}
						
					}
					
				}
				
				checkBoxesFuel.each(function() {
				    arrayFuel.push(this.value);
				});
				
				checkBoxesEngine.each(function() {
				    arrayEngineType .push(this.value);
				});
				checkBoxesTransmission.each(function() {
				    arrayTransmission.push(this.value);
				});
				
				checkBoxesBodyWork.each(function() {
				    arrayBody.push(this.value);
				});
				
				//arrayEngineType .toString;
				
				arrayEngineType.map(String);
				
				//counter
				var countTheVehicles = 0;
				
				//Determine vehicles minimum price
				
				var vehiclePriceRangeGrade1 = [];
				var vehiclePriceRangeGrade2 = [];
				var vehiclePriceRangeGrade3 = [];
				
				var containingGradeArray = [];
				var containingVehicleArray = [];
			
				var counter = 0;
				
				var modelsname = jsonstr.config.model['@attributes'].name;
				
				var gradesVehicles;
				
				var pushgradesVehiclesAll = [];
				var pushtheVehicleNameAll = [];
				
				var theVehicleName;
				var theVehicleFuelType;
				var theVehiclePrice;
				var theVehicleEngine;
				var theVehicleTransmission;
				var theVehicleBody;
				
				
				//Grade A Vehicles
				var imageUrlGradeA;
				var imageHolderGradeA;
				var gradesVehiclesA;
				//push Grade
				var pushgradesVehiclesA = [];
				//pushVehicle Name
				var pushtheVehicleNameA = [];
				//Price Range Price
				var pushVehiclePriceRangeA = [];
				//Push All data
				var pushVehiclePriceA = [];
				var pushVehicleEngineA = [];
				var pushVehicleFuelTypeA = [];
				var pushVehicleTransA = [];
				var pushVehicleBodyA = [];
				
				var theVehicleNameA;
				var theVehicleFuelTypeA;
				var theVehiclePriceA;
				var theVehicleEngineA;
				var theVehicleTransmissionA;
				var theVehicleBodyA;
				
				//Grade B Vehicles
				var imageUrlGradeB;
				var imageHolderGradeB;
				var gradesVehiclesB;
				//push Grade
				var pushgradesVehiclesB = [];
				//pushVehicle Name
				var pushtheVehicleNameB = [];
				//Price Range Price
				var pushVehiclePriceRangeB = [];
				//Push All data
				var pushVehiclePriceB = [];
				var pushVehicleEngineB = [];
				var pushVehicleFuelTypeB = [];
				var pushVehicleTransB = [];
				var pushVehicleBodyB = [];
				
				var theVehicleNameB;
				var theVehicleFuelTypeB;
				var theVehiclePriceB;
				var theVehicleEngineB;
				var theVehicleTransmissionB;
				var theVehicleBodyB;
				
				//Grade C Vehicles
				var imageUrlGradeC;
				var imageHolderGradeC;
				var gradesVehiclesC;
				//push Grade
				var pushgradesVehiclesC = [];
				//pushVehicle Name
				var pushtheVehicleNameC = [];
				//Price Range Price
				var pushVehiclePriceRangeC = [];
				//Push All data
				var pushVehiclePriceC = [];
				var pushVehicleEngineC = [];
				var pushVehicleFuelTypeC = [];
				var pushVehicleTransC = [];
				var pushVehicleBodyC = [];
				
				var theVehicleNameC;
				var theVehicleFuelTypeC;
				var theVehiclePriceC;
				var theVehicleEngineC;
				var theVehicleTransmissionC;
				var theVehicleBodyC;
				
				//Grade D Vehicles
				var imageUrlGradeD;
				var imageHolderGradeD;
				var gradesVehiclesD;
				//push Grade
				var pushgradesVehiclesD = [];
				//pushVehicle Name
				var pushtheVehicleNameD = [];
				//Price Range Price
				var pushVehiclePriceRangeD = [];
				//Push All data
				var pushVehiclePriceD = [];
				var pushVehicleEngineD = [];
				var pushVehicleFuelTypeD = [];
				var pushVehicleTransD = [];
				var pushVehicleBodyD = [];
				
				var theVehicleNameD;
				var theVehicleFuelTypeD;
				var theVehiclePriceD;
				var theVehicleEngineD;
				var theVehicleTransmissionD;
				var theVehicleBodyD;
				
				//Grade E Vehicles
				var imageUrlGradeE;
				var imageHolderGradeE;
				var gradesVehiclesE;
				//push Grade
				var pushgradesVehiclesE = [];
				//pushVehicle Name
				var pushtheVehicleNameE = [];
				//Price Range Price
				var pushVehiclePriceRangeE = [];
				//Push All data
				var pushVehiclePriceE = [];
				var pushVehicleEngineE = [];
				var pushVehicleFuelTypeE = [];
				var pushVehicleTransE = [];
				var pushVehicleBodyE = [];
				
				var theVehicleNameE;
				var theVehicleFuelTypeE;
				var theVehiclePriceE;
				var theVehicleEngineE;
				var theVehicleTransmissionE;
				var theVehicleBodyE;
				
				//Grade F Vehicles
				var imageUrlGradeF;
				var imageHolderGradeF;
				var gradesVehiclesF;
				//push Grade
				var pushgradesVehiclesF = [];
				//pushVehicle Name
				var pushtheVehicleNameF = [];
				//Price Range Price
				var pushVehiclePriceRangeF = [];
				//Push All data
				var pushVehiclePriceF = [];
				var pushVehicleEngineF = [];
				var pushVehicleFuelTypeF = [];
				var pushVehicleTransF = [];
				var pushVehicleBodyF = [];
				
				var theVehicleNameF;
				var theVehicleFuelTypeF;
				var theVehiclePriceF;
				var theVehicleEngineF;
				var theVehicleTransmissionF;
				var theVehicleBodyF;
				
				//Grade G Vehicles
				var imageUrlGradeG;
				var imageHolderGradeG;
				var gradesVehiclesG;
				//push Grade
				var pushgradesVehiclesG = [];
				//pushVehicle Name
				var pushtheVehicleNameG = [];
				//Price Range Price
				var pushVehiclePriceRangeG = [];
				//Push All data
				var pushVehiclePriceG = [];
				var pushVehicleEngineG = [];
				var pushVehicleFuelTypeG = [];
				var pushVehicleTransG = [];
				var pushVehicleBodyG = [];
				
				var theVehicleNameG;
				var theVehicleFuelTypeG;
				var theVehiclePriceG;
				var theVehicleEngineG;
				var theVehicleTransmissionG;
				var theVehicleBodyG;
				
				//Grade H Vehicles
				var imageUrlGradeH;
				var imageHolderGradeH;
				var gradesVehiclesH;
				//push Grade
				var pushgradesVehiclesH = [];
				//pushVehicle Name
				var pushtheVehicleNameH = [];
				//Price Range Price
				var pushVehiclePriceRangeH = [];
				//Push All data
				var pushVehiclePriceH = [];
				var pushVehicleEngineH = [];
				var pushVehicleFuelTypeH = [];
				var pushVehicleTransH = [];
				var pushVehicleBodyH = [];
				
				var theVehicleNameH;
				var theVehicleFuelTypeH;
				var theVehiclePriceH;
				var theVehicleEngineH;
				var theVehicleTransmissionH;
				var theVehicleBodyH;
				
				//Grade I Vehicles
				var imageUrlGradeI;
				var imageHolderGradeI;
				var gradesVehiclesI;
				//push Grade
				var pushgradesVehiclesI = [];
				//pushVehicle Name
				var pushtheVehicleNameI = [];
				//Price Range Price
				var pushVehiclePriceRangeI = [];
				//Push All data
				var pushVehiclePriceI = [];
				var pushVehicleEngineI = [];
				var pushVehicleFuelTypeI = [];
				var pushVehicleTransI = [];
				var pushVehicleBodyI = [];
				
				var theVehicleNameI;
				var theVehicleFuelTypeI;
				var theVehiclePriceI;
				var theVehicleEngineI;
				var theVehicleTransmissionI;
				var theVehicleBodyI;
				
				//Grade J Vehicles
				var imageUrlGradeJ;
				var imageHolderGradeJ;
				var gradesVehiclesJ;
				//push Grade
				var pushgradesVehiclesJ = [];
				//pushVehicle Name
				var pushtheVehicleNameJ = [];
				//Price Range Price
				var pushVehiclePriceRangeJ = [];
				//Push All data
				var pushVehiclePriceJ = [];
				var pushVehicleEngineJ = [];
				var pushVehicleFuelTypeJ = [];
				var pushVehicleTransJ = [];
				var pushVehicleBodyJ = [];
				
				var theVehicleNameJ;
				var theVehicleFuelTypeJ;
				var theVehiclePriceJ;
				var theVehicleEngineJ;
				var theVehicleTransmissionJ;
				var theVehicleBodyJ;
				
				
				categoryVehicle = jsonstr.category;	
				/*
				 * loop through JSON Object Array to retrieve Models, Grades, Vehicles
				 */
				
				if(jsonstr.config.model.grades instanceof Array)
				{
				for(var i = 0; i < jsonstr.config.model.grades.length; i++)
				{
					if(allCheckBox.length > 0)
					{
						if(jsonstr.config.model.grades instanceof Array)
						{	
							if(i == 0) 
							{
								gradesVehiclesA = jsonstr.config.model.grades[i].grade.gradename['#text'];
								imageUrlGradeA = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
								imageHolderGradeA = '<img alt="" src="'+imageUrlGradeA+'" />';
							}
							if(i == 1)
							{
								gradesVehiclesB = jsonstr.config.model.grades[i].grade.gradename['#text'];
								imageUrlGradeB = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
								imageHolderGradeB = '<img alt="" src="'+imageUrlGradeB+'" />';
							}
							if(i == 2)
							{
								gradesVehiclesC = jsonstr.config.model.grades[i].grade.gradename['#text'];
								imageUrlGradeC = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
								imageHolderGradeC = '<img alt="" src="'+imageUrlGradeC+'" />';
							}
							if(i == 3)
							{
								gradesVehiclesD = jsonstr.config.model.grades[i].grade.gradename['#text'];
								imageUrlGradeD = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
								imageHolderGradeD = '<img alt="" src="'+imageUrlGradeD+'" />';
								
							}
							if(i == 4)
							{
								gradesVehiclesE = jsonstr.config.model.grades[i].grade.gradename['#text'];
								imageUrlGradeE = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
								imageHolderGradeE = '<img alt="" src="'+imageUrlGradeE+'" />';
							}
							if(i == 5)
							{
								gradesVehiclesF = jsonstr.config.model.grades[i].grade.gradename['#text'];
								imageUrlGradeF = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
								imageHolderGradeF = '<img alt="" src="'+imageUrlGradeF+'" />';
							}
							if(i == 6)
							{
								gradesVehiclesG = jsonstr.config.model.grades[i].grade.gradename['#text'];
								imageUrlGradeG = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
								imageHolderGradeG = '<img alt="" src="'+imageUrlGradeG+'" />';
								//$('#mainContentconf').append(imageHolderGradeG);
							}
							if(i == 7)
							{
								gradesVehiclesH = jsonstr.config.model.grades[i].grade.gradename['#text'];
								imageUrlGradeH = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
								imageHolderGradeH = '<img alt="" src="'+imageUrlGradeH+'" />';
								//$('#mainContentconf').append(imageHolderGradeG);
							}
							if(i == 8)
							{
								gradesVehiclesI = jsonstr.config.model.grades[i].grade.gradename['#text'];
								imageUrlGradeI = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
								imageHolderGradeI = '<img alt="" src="'+imageUrlGradeI+'" />';
								//$('#mainContentconf').append(imageHolderGradeG);
							}
							if(i == 9)
							{
								gradesVehiclesJ = jsonstr.config.model.grades[i].grade.gradename['#text'];
								imageUrlGradeJ = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
								imageHolderGradeJ = '<img alt="" src="'+imageUrlGradeJ+'" />';
								//$('#mainContentconf').append(imageHolderGradeG);
							}
							
							//loop through grades	
							gradesVehicles = jsonstr.config.model.grades[i].grade.gradename['#text'];	
									if(jsonstr.config.model.grades[i].grade.vehicles instanceof Array)
									{
											for(var j = 0; j < jsonstr.config.model.grades[i].grade.vehicles.length; j++)
												{
														theVehicleFuelType = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePrice = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleName = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngine = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmission = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
														}else
														{
															theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														}
														//theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
													
													if(i == 0){
														theVehicleFuelTypeA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePriceA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleNameA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngineA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmissionA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
														}else
														{
															theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														}
														//theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														
														pushVehiclePriceRangeA.push(theVehiclePriceA);
													}
													if(i == 1){
														theVehicleFuelTypeB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePriceB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleNameB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngineB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmissionB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
														}else
														{
															theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														}
														//theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														
														pushVehiclePriceRangeB.push(theVehiclePriceB);
													}
													if(i == 2){
														theVehicleFuelTypeC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePriceC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleNameC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngineC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmissionC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
														}else
														{
															theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														}
														//theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														
														pushVehiclePriceRangeC.push(theVehiclePriceC);											
													}
													if(i == 3){
														theVehicleFuelTypeD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePriceD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleNameD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngineD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmissionD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
														}else
														{
															theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														}
														//theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														pushVehiclePriceRangeD.push(theVehiclePriceD);											
													}
													if(i == 4){
														theVehicleFuelTypeE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePriceE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleNameE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngineE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmissionE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
														}else
														{
															theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														}
														//theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														pushVehiclePriceRangeE.push(theVehiclePriceE);											
													}
													if(i == 5){
														theVehicleFuelTypeF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePriceF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleNameF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngineF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmissionF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
														}else
														{
															theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														}
														//theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														pushVehiclePriceRangeF.push(theVehiclePriceF);											
													}
													if(i == 6){
														theVehicleFuelTypeG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePriceG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleNameG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngineG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmissionG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
														}else
														{
															theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														}
														//theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														pushVehiclePriceRangeG.push(theVehiclePriceG);											
													}
													if(i == 7){
														theVehicleFuelTypeH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePriceH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleNameH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngineH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmissionH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
														}else
														{
															theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														}
														//theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														pushVehiclePriceRangeH.push(theVehiclePriceH);											
													}
													if(i == 8){
														theVehicleFuelTypeI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePriceI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleNameI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngineI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmissionI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
														}else
														{
															theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														}
														//theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														pushVehiclePriceRangeI.push(theVehiclePriceI);											
													}
													if(i == 9){
														theVehicleFuelTypeJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePriceJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleNameJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngineJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmissionJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
														}else
														{
															theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														}
														//theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														pushVehiclePriceRangeJ.push(theVehiclePriceJ);											
													}
													if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);

																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter+=1;
													  	}
																
													}
													//engine
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
															
															
															counter+=1;
														}
													}
													//Transmission
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														if((arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
															counter++;
														}
													}
													//body
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0)
													{
														if((arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
															
															counter++;
														}
													}
													//fuel and engine
													else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayEngineType.indexOf(theVehicleEngine) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
															if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
															counter++;
														}
													}
													//fuel and transmission
													else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													//fuel and body
													else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													//fuel and engine and transmission
													else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 
														&& arrayEngineType.indexOf(theVehicleEngine) >= 0
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													
													//fuel transmission and body
													else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
															
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													
													//fuel and engine and body
													else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 
														&& arrayEngineType.indexOf(theVehicleEngine) >= 0
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													
													//fuel and engine and transmission and body
													else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 
														&& arrayEngineType.indexOf(theVehicleEngine) >= 0
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													//engine and Transmission
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0 
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													
													//engine and body
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0 
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													
													//Transmission and body
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayTransmission.indexOf(theVehicleTransmission) >= 0 
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													//engine, Transmission and body
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0 
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
											
												}
										 }else //is vehicle is not array
										 {
										 	/*
										 	 * Test
										 	 */
										 				theVehicleFuelType = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
														theVehiclePrice = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
														theVehicleName = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
														theVehicleEngine = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
														theVehicleTransmission = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
														}else
														{
															theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														}
														//theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														
													
													if(i == 0){
														theVehicleFuelTypeA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
														theVehiclePriceA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
														theVehicleNameA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
														theVehicleEngineA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
														theVehicleTransmissionA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
														}else
														{
															theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														}
														//theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														
														pushVehiclePriceRangeA.push(theVehiclePriceA);
													}
													if(i == 1){
														theVehicleFuelTypeB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
														theVehiclePriceB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
														theVehicleNameB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
														theVehicleEngineB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
														theVehicleTransmissionB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
														}else
														{
															theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														}
														//theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														
														pushVehiclePriceRangeB.push(theVehiclePriceB);
													}
													if(i == 2){
														theVehicleFuelTypeC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
														theVehiclePriceC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
														theVehicleNameC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
														theVehicleEngineC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
														theVehicleTransmissionC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
														}else
														{
															theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														}
														//theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														pushVehiclePriceRangeC.push(theVehiclePriceC);											
													}
													if(i == 3){
														theVehicleFuelTypeD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
														theVehiclePriceD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
														theVehicleNameD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
														theVehicleEngineD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
														theVehicleTransmissionD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
														}else
														{
															theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														}
														//theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														
														pushVehiclePriceRangeD.push(theVehiclePriceD);											
													}
													if(i == 4){
														theVehicleFuelTypeE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
														theVehiclePriceE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
														theVehicleNameE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
														theVehicleEngineE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
														theVehicleTransmissionE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
														}else
														{
															theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														}
														//theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														pushVehiclePriceRangeE.push(theVehiclePriceE);											
													}
													if(i == 5){
														theVehicleFuelTypeF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
														theVehiclePriceF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
														theVehicleNameF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
														theVehicleEngineF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
														theVehicleTransmissionF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
														}else
														{
															theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														}
														//theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														pushVehiclePriceRangeF.push(theVehiclePriceF);											
													}
													if(i == 6){
														theVehicleFuelTypeG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
														theVehiclePriceG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
														theVehicleNameG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
														theVehicleEngineG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
														theVehicleTransmissionG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
														}else
														{
															theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														}
														//theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														pushVehiclePriceRangeG.push(theVehiclePriceG);											
													}
													if(i == 7){
														theVehicleFuelTypeH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
														theVehiclePriceH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
														theVehicleNameH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
														theVehicleEngineH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
														theVehicleTransmissionH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
														}else
														{
															theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														}
														//theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														pushVehiclePriceRangeH.push(theVehiclePriceH);											
													}
													if(i == 8){
														theVehicleFuelTypeI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
														theVehiclePriceI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
														theVehicleNameI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
														theVehicleEngineI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
														theVehicleTransmissionI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
														}else
														{
															theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														}
														//theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														pushVehiclePriceRangeI.push(theVehiclePriceI);											
													}
													if(i == 9){
														theVehicleFuelTypeJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
														theVehiclePriceJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
														theVehicleNameJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
														theVehicleEngineJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
														theVehicleTransmissionJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
														if(categoryVehicle == 'lcvs')
														{
															theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
														}else
														{
															theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														}
														//theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
														pushVehiclePriceRangeJ.push(theVehiclePriceJ);											
													}
													
													if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																	
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter+=1;
													  	}
																
													}
													//engine
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
															
															counter++;
														}
													}
													//Transmission
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														if((arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
															
															counter++;
														}
													}
													//body
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0)
													{
														if((arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
															
															counter++;
														}
													}
													//fuel and engine
													else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayEngineType.indexOf(theVehicleEngine) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
															if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
															counter++;
														}
													}
													//fuel and transmission
													else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													//fuel and body
													else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													//fuel and engine and transmission
													else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 
														&& arrayEngineType.indexOf(theVehicleEngine) >= 0
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													
													//fuel transmission and body
													else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
															
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													
													//fuel and engine and body
													else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 
														&& arrayEngineType.indexOf(theVehicleEngine) >= 0
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													
													//fuel and engine and transmission and body
													else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 
														&& arrayEngineType.indexOf(theVehicleEngine) >= 0
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													//engine and Transmission
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0 
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													
													//engine and body
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0 
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													
													//Transmission and body
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayTransmission.indexOf(theVehicleTransmission) >= 0 
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
													//engine, Transmission and body
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0 
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																if(i == 0)
																{
																	pushgradesVehiclesA.push(gradesVehiclesA);
																	pushtheVehicleNameA.push(theVehicleNameA);
																	pushVehiclePriceA.push(theVehiclePriceA);
																	pushVehicleEngineA.push(theVehicleEngineA);
																	pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																	pushVehicleTransA.push(theVehicleTransmissionA);
																	pushVehicleBodyA.push(theVehicleBodyA);
																}
																if(i == 1)
																{
																	pushgradesVehiclesB.push(gradesVehiclesB);
																	pushtheVehicleNameB.push(theVehicleNameB);
																	pushVehiclePriceB.push(theVehiclePriceB);
																	pushVehicleEngineB.push(theVehicleEngineB);
																	pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																	pushVehicleTransB.push(theVehicleTransmissionB);
																	pushVehicleBodyB.push(theVehicleBodyB);
																}
																if(i == 2){
																	pushgradesVehiclesC.push(gradesVehiclesC);
																	pushtheVehicleNameC.push(theVehicleNameC);
																	pushVehiclePriceC.push(theVehiclePriceC);
																	pushVehicleEngineC.push(theVehicleEngineC);
																	pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																	pushVehicleTransC.push(theVehicleTransmissionC);
																	pushVehicleBodyC.push(theVehicleBodyC);
																}
																if(i == 3){
																	pushgradesVehiclesD.push(gradesVehiclesD);
																	pushtheVehicleNameD.push(theVehicleNameD);
																	pushVehiclePriceD.push(theVehiclePriceD);
																	pushVehicleEngineD.push(theVehicleEngineD);
																	pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																	pushVehicleTransD.push(theVehicleTransmissionD);
																	pushVehicleBodyD.push(theVehicleBodyD);
																}
																if(i == 4){
																	pushgradesVehiclesE.push(gradesVehiclesE);
																	pushtheVehicleNameE.push(theVehicleNameE);
																	pushVehiclePriceE.push(theVehiclePriceE);
																	pushVehicleEngineE.push(theVehicleEngineE);
																	pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																	pushVehicleTransE.push(theVehicleTransmissionE);
																	pushVehicleBodyE.push(theVehicleBodyE);
																}
																if(i == 5){
																	pushgradesVehiclesF.push(gradesVehiclesF);
																	pushtheVehicleNameF.push(theVehicleNameF);
																	pushVehiclePriceF.push(theVehiclePriceF);
																	pushVehicleEngineF.push(theVehicleEngineF);
																	pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																	pushVehicleTransF.push(theVehicleTransmissionF);
																	pushVehicleBodyF.push(theVehicleBodyF);
																}
																if(i == 6){
																	pushgradesVehiclesG.push(gradesVehiclesG);
																	pushtheVehicleNameG.push(theVehicleNameG);
																	pushVehiclePriceG.push(theVehiclePriceG);
																	pushVehicleEngineG.push(theVehicleEngineG);
																	pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																	pushVehicleTransG.push(theVehicleTransmissionG);
																	pushVehicleBodyG.push(theVehicleBodyG);
																}
																if(i == 7){
																	pushgradesVehiclesH.push(gradesVehiclesH);
																	pushtheVehicleNameH.push(theVehicleNameH);
																	pushVehiclePriceH.push(theVehiclePriceH);
																	pushVehicleEngineH.push(theVehicleEngineH);
																	pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																	pushVehicleTransH.push(theVehicleTransmissionH);
																	pushVehicleBodyH.push(theVehicleBodyH);
																}
																if(i == 8){
																	pushgradesVehiclesI.push(gradesVehiclesI);
																	pushtheVehicleNameI.push(theVehicleNameI);
																	pushVehiclePriceI.push(theVehiclePriceI);
																	pushVehicleEngineI.push(theVehicleEngineI);
																	pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																	pushVehicleTransI.push(theVehicleTransmissionI);
																	pushVehicleBodyI.push(theVehicleBodyI);
																}
																if(i == 9){
																	pushgradesVehiclesJ.push(gradesVehiclesJ);
																	pushtheVehicleNameJ.push(theVehicleNameJ);
																	pushVehiclePriceJ.push(theVehiclePriceJ);
																	pushVehicleEngineJ.push(theVehicleEngineJ);
																	pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																	pushVehicleTransJ.push(theVehicleTransmissionJ);
																	pushVehicleBodyJ.push(theVehicleBodyJ);
																}
																counter++;
														}
													}
										 	
										 	/*
										 	 *end Test 
										 	 */
										 }		
								}else
								{
									$('#mainContentconf').html('Δεν Βρέθηκαν Grades για το συγκεκριμένο αυτοκίνητο');
								}
						}else
						{
							if(allCheckBox.length == 0)
							{
								if(jsonstr.config.model.grades instanceof Array)
								{	
									if(i == 0) 
									{
										gradesVehiclesA = jsonstr.config.model.grades[i].grade.gradename['#text'];
										imageUrlGradeA = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
										imageHolderGradeA = '<img alt="" src="'+imageUrlGradeA+'" />';
									}
									if(i == 1)
									{
										gradesVehiclesB = jsonstr.config.model.grades[i].grade.gradename['#text'];
										imageUrlGradeB = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
										imageHolderGradeB = '<img alt="" src="'+imageUrlGradeB+'" />';
									}
									if(i == 2)
									{
										gradesVehiclesC = jsonstr.config.model.grades[i].grade.gradename['#text'];
										imageUrlGradeC = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
										imageHolderGradeC = '<img alt="" src="'+imageUrlGradeC+'" />';
									}
									if(i == 3)
									{
										gradesVehiclesD = jsonstr.config.model.grades[i].grade.gradename['#text'];
										imageUrlGradeD = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
										imageHolderGradeD = '<img alt="" src="'+imageUrlGradeD+'" />';
									}
									if(i == 4)
									{
										gradesVehiclesE = jsonstr.config.model.grades[i].grade.gradename['#text'];
										imageUrlGradeE = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
										imageHolderGradeE = '<img alt="" src="'+imageUrlGradeE+'" />';
									}
									if(i == 5)
									{
										gradesVehiclesF = jsonstr.config.model.grades[i].grade.gradename['#text'];
										imageUrlGradeF = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
										imageHolderGradeF = '<img alt="" src="'+imageUrlGradeF+'" />';
									}
									if(i == 6)
									{
										gradesVehiclesG = jsonstr.config.model.grades[i].grade.gradename['#text'];
										imageUrlGradeG = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
										imageHolderGradeG = '<img alt="" src="'+imageUrlGradeG+'" />';
									}
									if(i == 7)
									{
										gradesVehiclesH = jsonstr.config.model.grades[i].grade.gradename['#text'];
										imageUrlGradeH = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
										imageHolderGradeH = '<img alt="" src="'+imageUrlGradeH+'" />';
									}
									if(i == 8)
									{
										gradesVehiclesI = jsonstr.config.model.grades[i].grade.gradename['#text'];
										imageUrlGradeI = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
										imageHolderGradeI = '<img alt="" src="'+imageUrlGradeI+'" />';
									}
									if(i == 9)
									{
										gradesVehiclesJ = jsonstr.config.model.grades[i].grade.gradename['#text'];
										imageUrlGradeJ = jsonstr.config.model.grades[i].grade['@attributes'].imageurl; 
										imageHolderGradeJ = '<img alt="" src="'+imageUrlGradeJ+'" />';
									}
											  	//loop through grades	
										gradesVehicles = jsonstr.config.model.grades[i].grade.gradename['#text'];
										if(jsonstr.config.model.grades[i].grade.vehicles instanceof Array)
										{
											for(var j = 0; j < jsonstr.config.model.grades[i].grade.vehicles.length; j++)
											{
															theVehicleFuelType = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
															theVehiclePrice = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
															theVehicleName = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
															theVehicleEngine = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
															theVehicleTransmission = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
															}else
															{
																theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															}
															//theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
														if(i == 0){
															theVehicleFuelTypeA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
															theVehiclePriceA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
															theVehicleNameA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
															theVehicleEngineA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
															theVehicleTransmissionA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
															}else
															{
																theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															}
															//theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															
															pushVehiclePriceRangeA.push(theVehiclePriceA);
														}
														if(i == 1){
															theVehicleFuelTypeB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
															theVehiclePriceB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
															theVehicleNameB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
															theVehicleEngineB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
															theVehicleTransmissionB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
															}else
															{
																theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															}
															//theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															
															pushVehiclePriceRangeB.push(theVehiclePriceB);
														}
														if(i == 2){
															theVehicleFuelTypeC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
															theVehiclePriceC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
															theVehicleNameC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
															theVehicleEngineC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
															theVehicleTransmissionC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
															}else
															{
																theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															}
															//theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeC.push(theVehiclePriceC);											
														}
														if(i == 3){
															theVehicleFuelTypeD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
															theVehiclePriceD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
															theVehicleNameD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
															theVehicleEngineD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
															theVehicleTransmissionD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
															}else
															{
																theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															}
															//theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeD.push(theVehiclePriceD);											
														}
														if(i == 4){
															theVehicleFuelTypeE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
															theVehiclePriceE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
															theVehicleNameE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
															theVehicleEngineE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
															theVehicleTransmissionE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
															}else
															{
																theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															}
															//theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeE.push(theVehiclePriceE);											
														}
														if(i == 5){
															theVehicleFuelTypeF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
															theVehiclePriceF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
															theVehicleNameF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
															theVehicleEngineF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
															theVehicleTransmissionF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
															}else
															{
																theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															}
															//theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeF.push(theVehiclePriceF);											
														}
														if(i == 6){
															theVehicleFuelTypeG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
															theVehiclePriceG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
															theVehicleNameG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
															theVehicleEngineG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
															theVehicleTransmissionG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
															}else
															{
																theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															}
															//theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeG.push(theVehiclePriceG);											
														}
														if(i == 7){
															theVehicleFuelTypeH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
															theVehiclePriceH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
															theVehicleNameH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
															theVehicleEngineH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
															theVehicleTransmissionH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
															}else
															{
																theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															}
															//theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeH.push(theVehiclePriceH);											
														}
														if(i == 8){
															theVehicleFuelTypeI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
															theVehiclePriceI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
															theVehicleNameI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
															theVehicleEngineI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
															theVehicleTransmissionI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
															}else
															{
																theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															}
															//theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeI.push(theVehiclePriceI);											
														}
														if(i == 9){
															theVehicleFuelTypeJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
															theVehiclePriceJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
															theVehicleNameJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
															theVehicleEngineJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
															theVehicleTransmissionJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.body['#text'];	
															}else
															{
																theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															}
															//theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeJ.push(theVehiclePriceJ);											
														}
												
														
												if((theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
													{
																	if(i == 0)
																	{
																		pushgradesVehiclesA.push(gradesVehiclesA);
																		pushtheVehicleNameA.push(theVehicleNameA);
																		pushVehiclePriceA.push(theVehiclePriceA);
																		pushVehicleEngineA.push(theVehicleEngineA);
																		pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																		pushVehicleTransA.push(theVehicleTransmissionA);
																		pushVehicleBodyA.push(theVehicleBodyA);
																	}
																	if(i == 1)
																	{
																		pushgradesVehiclesB.push(gradesVehiclesB);
																		pushtheVehicleNameB.push(theVehicleNameB);
																		pushVehiclePriceB.push(theVehiclePriceB);
																		pushVehicleEngineB.push(theVehicleEngineB);
																		pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																		pushVehicleTransB.push(theVehicleTransmissionB);
																		pushVehicleBodyB.push(theVehicleBodyB);
																	}
																	if(i == 2){
																		pushgradesVehiclesC.push(gradesVehiclesC);
																		pushtheVehicleNameC.push(theVehicleNameC);
																		pushVehiclePriceC.push(theVehiclePriceC);
																		pushVehicleEngineC.push(theVehicleEngineC);
																		pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																		pushVehicleTransC.push(theVehicleTransmissionC);
																		pushVehicleBodyC.push(theVehicleBodyC);
																	}
																	if(i == 3){
																		pushgradesVehiclesD.push(gradesVehiclesD);
																		pushtheVehicleNameD.push(theVehicleNameD);
																		pushVehiclePriceD.push(theVehiclePriceD);
																		pushVehicleEngineD.push(theVehicleEngineD);
																		pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																		pushVehicleTransD.push(theVehicleTransmissionD);
																		pushVehicleBodyD.push(theVehicleBodyD);
																	}
																	if(i == 4){
																		pushgradesVehiclesE.push(gradesVehiclesE);
																		pushtheVehicleNameE.push(theVehicleNameE);
																		pushVehiclePriceE.push(theVehiclePriceE);
																		pushVehicleEngineE.push(theVehicleEngineE);
																		pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																		pushVehicleTransE.push(theVehicleTransmissionE);
																		pushVehicleBodyE.push(theVehicleBodyE);
																	}
																	if(i == 5){
																		pushgradesVehiclesF.push(gradesVehiclesF);
																		pushtheVehicleNameF.push(theVehicleNameF);
																		pushVehiclePriceF.push(theVehiclePriceF);
																		pushVehicleEngineF.push(theVehicleEngineF);
																		pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																		pushVehicleTransF.push(theVehicleTransmissionF);
																		pushVehicleBodyF.push(theVehicleBodyF);
																	}
																	if(i == 6){
																		pushgradesVehiclesG.push(gradesVehiclesG);
																		pushtheVehicleNameG.push(theVehicleNameG);
																		pushVehiclePriceG.push(theVehiclePriceG);
																		pushVehicleEngineG.push(theVehicleEngineG);
																		pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																		pushVehicleTransG.push(theVehicleTransmissionG);
																		pushVehicleBodyG.push(theVehicleBodyG);
																	}
																	if(i == 7){
																		pushgradesVehiclesH.push(gradesVehiclesH);
																		pushtheVehicleNameH.push(theVehicleNameH);
																		pushVehiclePriceH.push(theVehiclePriceH);
																		pushVehicleEngineH.push(theVehicleEngineH);
																		pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																		pushVehicleTransH.push(theVehicleTransmissionH);
																		pushVehicleBodyH.push(theVehicleBodyH);
																	}
																	if(i == 8){
																		pushgradesVehiclesI.push(gradesVehiclesI);
																		pushtheVehicleNameI.push(theVehicleNameI);
																		pushVehiclePriceI.push(theVehiclePriceI);
																		pushVehicleEngineI.push(theVehicleEngineI);
																		pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																		pushVehicleTransI.push(theVehicleTransmissionI);
																		pushVehicleBodyI.push(theVehicleBodyI);
																	}
																	if(i == 9){
																		pushgradesVehiclesJ.push(gradesVehiclesJ);
																		pushtheVehicleNameJ.push(theVehicleNameJ);
																		pushVehiclePriceJ.push(theVehiclePriceJ);
																		pushVehicleEngineJ.push(theVehicleEngineJ);
																		pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																		pushVehicleTransJ.push(theVehicleTransmissionJ);
																		pushVehicleBodyJ.push(theVehicleBodyJ);
																	}
															counter+=1;
															}
												 }
											}else
											{
															theVehicleFuelType = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
															theVehiclePrice = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
															theVehicleName = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
															theVehicleEngine = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
															theVehicleTransmission = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
															}else
															{
																theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															}
															//theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
												
													if(i == 0){
															theVehicleFuelTypeA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
															theVehiclePriceA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
															theVehicleNameA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
															theVehicleEngineA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
															theVehicleTransmissionA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
															}else
															{
																theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															}
															//theVehicleBodyA = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															
															pushVehiclePriceRangeA.push(theVehiclePriceA);
														}
														if(i == 1){
															theVehicleFuelTypeB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
															theVehiclePriceB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
															theVehicleNameB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
															theVehicleEngineB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
															theVehicleTransmissionB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
															}else
															{
																theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															}
															//theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															
															pushVehiclePriceRangeB.push(theVehiclePriceB);
														}
														if(i == 2){
															theVehicleFuelTypeC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
															theVehiclePriceC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
															theVehicleNameC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
															theVehicleEngineC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
															theVehicleTransmissionC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
															}else
															{
																theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															}
															//theVehicleBodyC = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															pushVehiclePriceRangeC.push(theVehiclePriceC);											
														}
														if(i == 3){
															theVehicleFuelTypeD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
															theVehiclePriceD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
															theVehicleNameD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
															theVehicleEngineD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
															theVehicleTransmissionD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
															}else
															{
																theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															}
															//theVehicleBodyD = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeD.push(theVehiclePriceD);											
														}
														if(i == 4){
															theVehicleFuelTypeE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
															theVehiclePriceE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
															theVehicleNameE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
															theVehicleEngineE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
															theVehicleTransmissionE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
															}else
															{
																theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															}
															//theVehicleBodyE = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeE.push(theVehiclePriceE);											
														}
														if(i == 5){
															theVehicleFuelTypeF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
															theVehiclePriceF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
															theVehicleNameF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
															theVehicleEngineF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
															theVehicleTransmissionF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
															}else
															{
																theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															}
															//theVehicleBodyF = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeF.push(theVehiclePriceF);											
														}
														if(i == 6){
															theVehicleFuelTypeG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
															theVehiclePriceG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
															theVehicleNameG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
															theVehicleEngineG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
															theVehicleTransmissionG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
															}else
															{
																theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															}
															//theVehicleBodyG = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeG.push(theVehiclePriceG);											
														}
														if(i == 7){
															theVehicleFuelTypeH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
															theVehiclePriceH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
															theVehicleNameH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
															theVehicleEngineH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
															theVehicleTransmissionH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
															}else
															{
																theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															}
															//theVehicleBodyH = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeH.push(theVehiclePriceH);											
														}
														if(i == 8){
															theVehicleFuelTypeI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
															theVehiclePriceI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
															theVehicleNameI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
															theVehicleEngineI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
															theVehicleTransmissionI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
															}else
															{
																theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															}
															//theVehicleBodyI = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeI.push(theVehiclePriceI);											
														}
														if(i == 9){
															theVehicleFuelTypeJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
															theVehiclePriceJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
															theVehicleNameJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
															theVehicleEngineJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
															theVehicleTransmissionJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
															if(categoryVehicle == 'lcvs')
															{
																theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.body['#text'];	
															}else
															{
																theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles.vehicle.doors['#text'];
															}
															//theVehicleBodyJ = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.doors['#text'];
															pushVehiclePriceRangeJ.push(theVehiclePriceJ);											
														}
												
														
												if((theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
													{
														if(i == 0)
																	{
																		pushgradesVehiclesA.push(gradesVehiclesA);
																		pushtheVehicleNameA.push(theVehicleNameA);
																		pushVehiclePriceA.push(theVehiclePriceA);
																		pushVehicleEngineA.push(theVehicleEngineA);
																		pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
																		pushVehicleTransA.push(theVehicleTransmissionA);
																		pushVehicleBodyA.push(theVehicleBodyA);
																	}
																	if(i == 1)
																	{
																		pushgradesVehiclesB.push(gradesVehiclesB);
																		pushtheVehicleNameB.push(theVehicleNameB);
																		pushVehiclePriceB.push(theVehiclePriceB);
																		pushVehicleEngineB.push(theVehicleEngineB);
																		pushVehicleFuelTypeB.push(theVehicleFuelTypeB);
																		pushVehicleTransB.push(theVehicleTransmissionB);
																		pushVehicleBodyB.push(theVehicleBodyB);
																	}
																	if(i == 2){
																		pushgradesVehiclesC.push(gradesVehiclesC);
																		pushtheVehicleNameC.push(theVehicleNameC);
																		pushVehiclePriceC.push(theVehiclePriceC);
																		pushVehicleEngineC.push(theVehicleEngineC);
																		pushVehicleFuelTypeC.push(theVehicleFuelTypeC);
																		pushVehicleTransC.push(theVehicleTransmissionC);
																		pushVehicleBodyC.push(theVehicleBodyC);
																	}
																	if(i == 3){
																		pushgradesVehiclesD.push(gradesVehiclesD);
																		pushtheVehicleNameD.push(theVehicleNameD);
																		pushVehiclePriceD.push(theVehiclePriceD);
																		pushVehicleEngineD.push(theVehicleEngineD);
																		pushVehicleFuelTypeD.push(theVehicleFuelTypeD);
																		pushVehicleTransD.push(theVehicleTransmissionD);
																		pushVehicleBodyD.push(theVehicleBodyD);
																	}
																	if(i == 4){
																		pushgradesVehiclesE.push(gradesVehiclesE);
																		pushtheVehicleNameE.push(theVehicleNameE);
																		pushVehiclePriceE.push(theVehiclePriceE);
																		pushVehicleEngineE.push(theVehicleEngineE);
																		pushVehicleFuelTypeE.push(theVehicleFuelTypeE);
																		pushVehicleTransE.push(theVehicleTransmissionE);
																		pushVehicleBodyE.push(theVehicleBodyE);
																	}
																	if(i == 5){
																		pushgradesVehiclesF.push(gradesVehiclesF);
																		pushtheVehicleNameF.push(theVehicleNameF);
																		pushVehiclePriceF.push(theVehiclePriceF);
																		pushVehicleEngineF.push(theVehicleEngineF);
																		pushVehicleFuelTypeF.push(theVehicleFuelTypeF);
																		pushVehicleTransF.push(theVehicleTransmissionF);
																		pushVehicleBodyF.push(theVehicleBodyF);
																	}
																	if(i == 6){
																		pushgradesVehiclesG.push(gradesVehiclesG);
																		pushtheVehicleNameG.push(theVehicleNameG);
																		pushVehiclePriceG.push(theVehiclePriceG);
																		pushVehicleEngineG.push(theVehicleEngineG);
																		pushVehicleFuelTypeG.push(theVehicleFuelTypeG);
																		pushVehicleTransG.push(theVehicleTransmissionG);
																		pushVehicleBodyG.push(theVehicleBodyG);
																	}
																	if(i == 7){
																		pushgradesVehiclesH.push(gradesVehiclesH);
																		pushtheVehicleNameH.push(theVehicleNameH);
																		pushVehiclePriceH.push(theVehiclePriceH);
																		pushVehicleEngineH.push(theVehicleEngineH);
																		pushVehicleFuelTypeH.push(theVehicleFuelTypeH);
																		pushVehicleTransH.push(theVehicleTransmissionH);
																		pushVehicleBodyH.push(theVehicleBodyH);
																	}
																	if(i == 8){
																		pushgradesVehiclesI.push(gradesVehiclesI);
																		pushtheVehicleNameI.push(theVehicleNameI);
																		pushVehiclePriceI.push(theVehiclePriceI);
																		pushVehicleEngineI.push(theVehicleEngineI);
																		pushVehicleFuelTypeI.push(theVehicleFuelTypeI);
																		pushVehicleTransI.push(theVehicleTransmissionI);
																		pushVehicleBodyI.push(theVehicleBodyI);
																	}
																	if(i == 9){
																		pushgradesVehiclesJ.push(gradesVehiclesJ);
																		pushtheVehicleNameJ.push(theVehicleNameJ);
																		pushVehiclePriceJ.push(theVehiclePriceJ);
																		pushVehicleEngineJ.push(theVehicleEngineJ);
																		pushVehicleFuelTypeJ.push(theVehicleFuelTypeJ);
																		pushVehicleTransJ.push(theVehicleTransmissionJ);
																		pushVehicleBodyJ.push(theVehicleBodyJ);
																	}
														counter+=1;
															}
											}	 		
										}else
										{
											$('#mainContentconf').html('Δεν Βρέθηκαν Grades για το συγκεκριμένο αυτοκίνητο');
										}
								}
						}
						
				}
				}else
				{
					
					gradesVehiclesA = jsonstr.config.model.grades.grade.gradename['#text'];
					imageUrlGradeA = jsonstr.config.model.grades.grade['@attributes'].imageurl; 
					imageHolderGradeA = '<img alt="" src="'+imageUrlGradeA+'" />';
					
					if(allCheckBox.length > 0)
						{	
								
							if(jsonstr.config.model.grades.grade.vehicles instanceof Array)
							{	
								for(var i = 0; i < jsonstr.config.model.grades.grade.vehicles.length; i++) 
								{
									theVehicleFuelTypeA = jsonstr.config.model.grades.grade.vehicles[i].vehicle.fuel['#text'];
									theVehiclePriceA = jsonstr.config.model.grades.grade.vehicles[i].vehicle.price['#text'];
									theVehicleNameA = jsonstr.config.model.grades.grade.vehicles[i].vehicle.name['#text'];
									theVehicleEngineA = jsonstr.config.model.grades.grade.vehicles[i].vehicle.engine['#text'].toString();
									theVehicleTransmissionA = jsonstr.config.model.grades.grade.vehicles[i].vehicle.transmission['#text'];
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyA = jsonstr.config.model.grades.grade.vehicles[i].vehicle.body['#text'];	
									}else
									{
										theVehicleBodyA = jsonstr.config.model.grades.grade.vehicles[i].vehicle.doors['#text'];
									}
									//theVehicleBodyA = jsonstr.config.model.grades.grade.vehicles[i].vehicle.doors['#text'];
									
									pushVehiclePriceRangeA.push(theVehiclePriceA);
									
									if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
									{
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0)
											&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											counter++;
											
										}
																	
									}
									//engine
									else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
									{
										if((arrayEngineType.indexOf(theVehicleEngineA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue)){
														
											
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											counter++;
														
										}
									}
									//Transmission
									else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
									{
										 if((arrayTransmission.indexOf(theVehicleTransmissionA) >= 0)
										 && (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue)){
														
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
											
											}
									 }
									//body
									else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0)
									{
										if((arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue)){
															
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and engine
									else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 && arrayEngineType.indexOf(theVehicleEngineA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and transmission
									else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 && arrayTransmission.indexOf(theVehicleTransmissionA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and body
									else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
									   if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 && arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and engine and transmission
									else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 
										&& arrayEngineType.indexOf(theVehicleEngineA) >= 0
										&& arrayTransmission.indexOf(theVehicleTransmissionA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel transmission and body
									else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
									if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 
										&& arrayTransmission.indexOf(theVehicleTransmissionA) >= 0
										&& arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and engine and body
									else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 
										&& arrayEngineType.indexOf(theVehicleEngineA) >= 0
										&& arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and engine and transmission and body
									else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 
										&& arrayEngineType.indexOf(theVehicleEngineA) >= 0
										&& arrayTransmission.indexOf(theVehicleTransmissionA) >= 0
										&& arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//engine and Transmission
									else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
										if((arrayEngineType.indexOf(theVehicleEngineA) >= 0 
										&& arrayTransmission.indexOf(theVehicleTransmissionA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//engine and body
									else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
									if((arrayEngineType.indexOf(theVehicleEngineA) >= 0 
									&& arrayBody.indexOf(theVehicleBodyA) >= 0)
									&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//Transmission and body
									else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
										if((arrayTransmission.indexOf(theVehicleTransmissionA) >= 0 
										&& arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//engine, Transmission and body
									else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
										if((arrayEngineType.indexOf(theVehicleEngineA) >= 0
										&& arrayTransmission.indexOf(theVehicleTransmissionA) >= 0 
										&& arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									
								}
							}else
							{
									theVehicleFuelTypeA = jsonstr.config.model.grades.grade.vehicles.vehicle.fuel['#text'];
									theVehiclePriceA = jsonstr.config.model.grades.grade.vehicles.vehicle.price['#text'];
									theVehicleNameA = jsonstr.config.model.grades.grade.vehicles.vehicle.name['#text'];
									theVehicleEngineA = jsonstr.config.model.grades.grade.vehicles.vehicle.engine['#text'].toString();
									theVehicleTransmissionA = jsonstr.config.model.grades.grade.vehicles.vehicle.transmission['#text'];
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyA = jsonstr.config.model.grades.grade.vehicles.vehicle.body['#text'];	
									}else
									{
										theVehicleBodyA = jsonstr.config.model.grades.grade.vehicles.vehicle.doors['#text'];
									}
									//theVehicleBodyA = jsonstr.config.model.grades.grade.vehicles.vehicle.doors['#text'];
									
									pushVehiclePriceRangeA.push(theVehiclePriceA);
									
									if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
									{
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0)
											&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											counter++;
											
										}
																	
									}
									//engine
									else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
									{
										if((arrayEngineType.indexOf(theVehicleEngineA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue)){
														
											
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
														
										}
									}
									//Transmission
									else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
									{
										 if((arrayTransmission.indexOf(theVehicleTransmissionA) >= 0)
										 && (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue)){
														
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
											
											}
									 }
									//body
									else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0)
									{
										if((arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue)){
															
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and engine
									else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 && arrayEngineType.indexOf(theVehicleEngineA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and transmission
									else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 && arrayTransmission.indexOf(theVehicleTransmissionA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and body
									else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
									   if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 && arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and engine and transmission
									else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 
										&& arrayEngineType.indexOf(theVehicleEngineA) >= 0
										&& arrayTransmission.indexOf(theVehicleTransmissionA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel transmission and body
									else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
									if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 
										&& arrayTransmission.indexOf(theVehicleTransmissionA) >= 0
										&& arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and engine and body
									else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 
										&& arrayEngineType.indexOf(theVehicleEngineA) >= 0
										&& arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//fuel and engine and transmission and body
									else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0 
										&& arrayEngineType.indexOf(theVehicleEngineA) >= 0
										&& arrayTransmission.indexOf(theVehicleTransmissionA) >= 0
										&& arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//engine and Transmission
									else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
										if((arrayEngineType.indexOf(theVehicleEngineA) >= 0 
										&& arrayTransmission.indexOf(theVehicleTransmissionA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//engine and body
									else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
									if((arrayEngineType.indexOf(theVehicleEngineA) >= 0 
									&& arrayBody.indexOf(theVehicleBodyA) >= 0)
									&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//Transmission and body
									else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
										if((arrayTransmission.indexOf(theVehicleTransmissionA) >= 0 
										&& arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
									//engine, Transmission and body
									else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
										if((arrayEngineType.indexOf(theVehicleEngineA) >= 0
										&& arrayTransmission.indexOf(theVehicleTransmissionA) >= 0 
										&& arrayBody.indexOf(theVehicleBodyA) >= 0)
										&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											counter++;
										}
									}
							}	
						}
						else
						{
							if(jsonstr.config.model.grades.grade.vehicles instanceof Array)
							{	
								for(var j = 0; j < jsonstr.config.model.grades.grade.vehicles.length; j++)
								{
									//var vehicleFuelType = jsonObject.config.model.grades[i].grade.vehicles[j].vehicle.fuel-type['#text'];
									theVehiclePriceA = jsonstr.config.model.grades.grade.vehicles[j].vehicle.price['#text'];
									theVehicleNameA = jsonstr.config.model.grades.grade.vehicles[j].vehicle.name['#text'];
									pushVehiclePriceRangeA.push(theVehiclePriceA);
									
											
									if((theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
												pushgradesVehiclesA.push(gradesVehiclesA);
												pushtheVehicleNameA.push(theVehicleNameA);
												pushVehiclePriceA.push(theVehiclePriceA);
												pushVehicleEngineA.push(theVehicleEngineA);
												pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
												pushVehicleTransA.push(theVehicleTransmissionA);
												pushVehicleBodyA.push(theVehicleBodyA);
											
												counter++;	
										}
								}
							}else
							{
									theVehiclePriceA = jsonstr.config.model.grades.grade.vehicles.vehicle.price['#text'];
									theVehicleNameA = jsonstr.config.model.grades.grade.vehicles.vehicle.name['#text'];
									pushVehiclePriceRangeA.push(theVehiclePriceA);
											
									if((theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
												pushgradesVehiclesA.push(gradesVehiclesA);
												pushtheVehicleNameA.push(theVehicleNameA);
												pushVehiclePriceA.push(theVehiclePriceA);
												pushVehicleEngineA.push(theVehicleEngineA);
												pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
												pushVehicleTransA.push(theVehicleTransmissionA);
												pushVehicleBodyA.push(theVehicleBodyA);
											
												counter++;	
										}
							}	
						}
				}
				
				
				displayVehiclesNo(counter, modelsname);	
				
	
	var minRangeFirstGradePrice;
	var minRangeSecondGradePrice;
	var minRangeThirdGradePrice;
	var minRangeFourthGradePrice;
	var minRangeFifthGradePrice;
	var minRangeSixthGradePrice;
	var minRangeSeventhGradePrice;
	var minRangeEightGradePrice;
	var minRangeNinthGradePrice;
	var minRangeTenthGradePrice;
	
	if(counter == 0){
		 $('#mainContentconf > div:nth-child(6) > a').off('click');
	}else {
		 $('#mainContentconf > div:nth-child(6) > a').on('click', function(e){
		
		e.preventDefault(); 
	    var counterDiv = 0;
		
		if(modelsname == 'Qashqai')
		{
			$('#columns > div.stepClose').find('#mainContentscroll').css('width', '1700px');
		}
		if(modelsname == 'NP300 Navara')
		{
			$('#columns > div.stepClose').find('#mainContentscroll').css('width', '2200px');
		}
		 e.stopPropagation();		
	   	 $('#mainContentconf').hide("slide", { direction: "top" }, 300);	
	   	 $('#columns > div.stepClose').show("slide", { direction: "right" }, 1000)
			.find('#mainContentscroll');
			
		
		minRangeFirstGradePrice = Math.min.apply(Math, pushVehiclePriceRangeA);
		minRangeSecondGradePrice = Math.min.apply(Math, pushVehiclePriceRangeB);
		minRangeThirdGradePrice = Math.min.apply(Math, pushVehiclePriceRangeC);
		minRangeFourthGradePrice = Math.min.apply(Math, pushVehiclePriceRangeD);	
		minRangeFifthGradePrice = Math.min.apply(Math, pushVehiclePriceRangeE);
		minRangeSixthGradePrice = Math.min.apply(Math, pushVehiclePriceRangeF);
		minRangeSeventhGradePrice = Math.min.apply(Math, pushVehiclePriceRangeG);
		minRangeEightGradePrice = Math.min.apply(Math, pushVehiclePriceRangeH);
		minRangeNinthGradePrice = Math.min.apply(Math, pushVehiclePriceRangeI);
		minRangeTenthGradePrice = Math.min.apply(Math, pushVehiclePriceRangeJ);
			
		DrawGradeA(pushgradesVehiclesA, pushtheVehicleNameA, imageHolderGradeA, minRangeFirstGradePrice);
		DrawGradeB(pushgradesVehiclesB, pushtheVehicleNameB, imageHolderGradeB, minRangeSecondGradePrice);
		DrawGradeC(pushgradesVehiclesC, pushtheVehicleNameC, imageHolderGradeC, minRangeThirdGradePrice);
		DrawGradeD(pushgradesVehiclesD, pushtheVehicleNameD, imageHolderGradeD, minRangeFourthGradePrice);
		DrawGradeE(pushgradesVehiclesE, pushtheVehicleNameE, imageHolderGradeE, minRangeFifthGradePrice);
		DrawGradeF(pushgradesVehiclesF, pushtheVehicleNameF, imageHolderGradeF, minRangeSixthGradePrice);
		DrawGradeG(pushgradesVehiclesG, pushtheVehicleNameG, imageHolderGradeG, minRangeSeventhGradePrice);
		DrawGradeH(pushgradesVehiclesH, pushtheVehicleNameH, imageHolderGradeH, minRangeEightGradePrice);
		DrawGradeI(pushgradesVehiclesI, pushtheVehicleNameI, imageHolderGradeI, minRangeNinthGradePrice);
		DrawGradeJ(pushgradesVehiclesJ, pushtheVehicleNameJ, imageHolderGradeJ, minRangeTenthGradePrice);
			
		infoStdHelp();
			
		});
		$('#columns > div.stepClose > a:nth-child(2)').on('click', function(e)
			{
				e.preventDefault();
				$('#mainContentscroll > ul > li').filter('.FirstGrade').remove();
				$('#mainContentscroll > ul > li').filter('.SecondGrade').remove();
				
				$('#mainContentscroll > ul > li > div > div > div').filter('.priceLiContent').remove();
				$('#mainContentscroll > ul > li.SecondGrade > div > div > div').remove();
				
				$('#columns > div').filter('.stepClose').hide("slide", { direction: "top" }, 300);
				$('#mainContentconf').filter('.show').show("slide", { direction: "right" }, 1000);
				
				
				$('#GradeA > ul > li > div > div > div').filter('.priceLiContent').empty();
				$('#GradeB > ul > li > div > div > div').filter('.priceLiContent1').empty();
				$('#GradeC > ul > li > div > div > div').filter('.priceLiContent2').empty();
				
			});
	
			$('#firstgrade').on('click', function()
			{
				$('#GradeA > ul > li > div > div').css('border', '1px solid #c71444');
			});
			
			//Second Step Forward
			$('#columns > div.stepClose > a:nth-child(3)').on('click', function(e)
			{
				
				e.preventDefault();
				$('.feedback-toggle').show();
				
				$('.feedback').show();
				
				var next_move = "expand";
				
				$(".feedback-toggle").click(function(e)
				{
				    e.stopPropagation();
				    var css = {};
				    var Logo = {};
				    if (next_move == "expand"){
				        css = {
				            left: '0px'
				        };
				        logo = 
				        {
				       		left: '510px' 	
				        };
				        next_move = "shrink";
				    } else {
				        css = {
				            left: '-540px'
				        };     
				        logo = 
				        {
				       		left: '0px' 	
				        };
				        next_move = "expand";
				    }
				    
				    
				    
				    $('.feedback').stop().animate(css, 200);
				    $('.feedback-toggle').stop().animate(logo, 200);
				});
				
				 if($('#firstgrade').is(':checked'))
				 {	
				 	
				 	//$('#firstgrade').addClass('bracket');
				 	var firstGradeValue = $('#firstgrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				 
				 	displaysGradeAname(pushgradesVehiclesA, minRangeFirstGradePrice);
				 	displayGradeImageAndPriceA(imageHolderGradeA, minRangeFirstGradePrice);
				 	displaysGradefeedback(pushgradesVehiclesA, minRangeFirstGradePrice);
				 	displayGradeImageAndPriceFeedback(imageHolderGradeA, minRangeFirstGradePrice);
				 	
				 	infoStdHelp();
				 	
				 	displayEngineAndMotersGradeA(pushVehicleEngineA, pushtheVehicleNameA, pushVehicleFuelTypeA, pushVehiclePriceA, pushVehicleTransA, pushVehicleBodyA, categoryVehicle);
				 	
				 	$('#GradeA > ul > li > div > div').css('border', '1px solid #c71444');
				 	
				 }
				 
				 if($('#SecondGrade').is(':checked'))
				 {	
				 	
				 	//$('#SecondGrade').addClass('bracket');
				 	var SecondGradeValue = $('#SecondGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				 	
				 	displaysGradeAname(pushgradesVehiclesB, minRangeSecondGradePrice);
				 	displayGradeImageAndPriceA(imageHolderGradeB, minRangeSecondGradePrice);
				 	displaysGradefeedback(pushgradesVehiclesB, minRangeSecondGradePrice);
				 	displayGradeImageAndPriceFeedback(imageHolderGradeB, minRangeSecondGradePrice);
				 	
				 	infoStdHelp();
				 	
				 	displayEngineAndMotersGradeB(pushVehicleEngineB, pushtheVehicleNameB, pushVehicleFuelTypeB, pushVehiclePriceB, pushVehicleTransB, pushVehicleBodyB, categoryVehicle);
				 	
				 	$('#GradeB > ul > li > div > div').css('border', '1px solid #c71444');
				 	
				 }
				 
				 if($('#ThirdGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var SecondGradeValue = $('#ThirdGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeAname(pushgradesVehiclesC, minRangeThirdGradePrice);
					
					displayGradeImageAndPriceA(imageHolderGradeC, minRangeThirdGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesC, minRangeThirdGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeC, minRangeThirdGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeC(pushVehicleEngineC, pushtheVehicleNameC, pushVehicleFuelTypeC, pushVehiclePriceC, pushVehicleTransC, pushVehicleBodyC, categoryVehicle);
				 	
				 	$('#GradeC > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				if($('#FourthGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var FourthGradeValue = $('#FourthGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeAname(pushgradesVehiclesD, minRangeFourthGradePrice);
					
					displayGradeImageAndPriceA(imageHolderGradeD, minRangeFourthGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesD, minRangeFourthGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeD, minRangeFourthGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeD(pushVehicleEngineD, pushtheVehicleNameD, pushVehicleFuelTypeD, pushVehiclePriceD, pushVehicleTransD, pushVehicleBodyD, categoryVehicle);
				 	
				 	$('#GradeD > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				 if($('#FifthGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var FifthGradeValue = $('#FifthGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeAname(pushgradesVehiclesE, minRangeFifthGradePrice);
					
					displayGradeImageAndPriceA(imageHolderGradeE, minRangeFifthGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesE, minRangeFifthGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeE, minRangeFifthGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeE(pushVehicleEngineE, pushtheVehicleNameE, pushVehicleFuelTypeE, pushVehiclePriceE, pushVehicleTransE, pushVehicleBodyE, categoryVehicle);
				 	
				 	$('#GradeE > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				 
				 if($('#SixthGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var SixthGradeValue = $('#SixthGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeAname(pushgradesVehiclesF, minRangeSixthGradePrice);
					
					displayGradeImageAndPriceA(imageHolderGradeF, minRangeSixthGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesF, minRangeSixthGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeF, minRangeSixthGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeF(pushVehicleEngineF, pushtheVehicleNameF, pushVehicleFuelTypeF, pushVehiclePriceF, pushVehicleTransF, pushVehicleBodyF, categoryVehicle);
				 	
				 	$('#GradeF > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				 if($('#SeventhGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var SeventhGradeValue = $('#SeventhGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeAname(pushgradesVehiclesG, minRangeSeventhGradePrice);
					
					displayGradeImageAndPriceA(imageHolderGradeG, minRangeSeventhGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesG, minRangeSeventhGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeG, minRangeSeventhGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeG(pushVehicleEngineG, pushtheVehicleNameG, pushVehicleFuelTypeG, pushVehiclePriceG, pushVehicleTransG, pushVehicleBodyG, categoryVehicle);
				 	
				 	$('#GradeG > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				 /*
				  * #eighthGrade, minRangeEightGradePrice, GradeH
				  * #ninthGrade, minRangeNinthGradePrice, GradeI
				  * #tenthGrade, minRangeTenthGradePrice, GradeJ
				  * 
				  */
				 if($('#eighthGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var eighthGradeValue = $('#eighthGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeAname(pushgradesVehiclesH, minRangeEightGradePrice);
					
					displayGradeImageAndPriceA(imageHolderGradeH, minRangeEightGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesH, minRangeEightGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeH, minRangeEightGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeH(pushVehicleEngineH, pushtheVehicleNameH, pushVehicleFuelTypeH, pushVehiclePriceH, pushVehicleTransH, pushVehicleBodyH, categoryVehicle);
				 	
				 	$('#GradeH > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				 if($('#ninthGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var ninthGradeValue = $('#ninthGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeAname(pushgradesVehiclesI, minRangeNinthGradePrice);
					
					displayGradeImageAndPriceA(imageHolderGradeH, minRangeNinthGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesI, minRangeNinthGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeI, minRangeNinthGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeI(pushVehicleEngineI, pushtheVehicleNameI, pushVehicleFuelTypeI, pushVehiclePriceI, pushVehicleTransI, pushVehicleBodyI, categoryVehicle);
				 	
				 	$('#GradeI > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				 if($('#tenthGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var tenthGradeValue = $('#tenthGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeAname(pushgradesVehiclesJ, minRangeTenthGradePrice);
					
					displayGradeImageAndPriceA(imageHolderGradeH, minRangeTenthGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesJ, minRangeTenthGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeJ, minRangeTenthGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeJ(pushVehicleEngineJ, pushtheVehicleNameJ, pushVehicleFuelTypeJ, pushVehiclePriceJ, pushVehicleTransJ, pushVehicleBodyJ, categoryVehicle);
				 	
				 	$('#GradeJ > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				 
			});
			
			
			//Third Step Backwards
			$('#columns > div.stepOneClose > a:nth-child(2)').on('click', function(e)
			{
				e.preventDefault();
				$('#columns > div.stepClose').show("slide", { direction: "right" }, 1000);
				$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
				
				$('.feedback-toogle').hide();
				 $('.feedback').hide();
			});	
			$('#columns > div.stepTwoClose > a:nth-child(2)').on('click', function(e)
					{
						
						e.preventDefault();
						$('#navNumbers1').removeClass('active');
						$('#navNumbers').addClass('active');
						
						$('#navNumbers > img:nth-child(1)').hide();
						$('#navNumbers > img:nth-child(2)').show();
						
						$('#navNumbers1 > img:nth-child(1)').show();
						$('#navNumbers1 > img:nth-child(2)').hide();
						
						$('#columns > div.stepTwoClose').find('#displayColors').find('#bigImg').empty();
						$('#rgbcolor > div').filter('.checkRgb').empty();
						$('#dividetwo > div.infoModeldetails').empty();
						$('#displayColors > div.infoModelColor').empty();
						$('#columns > div.stepTwoClose').find('#dividetwo').find('#bigImgTrim').empty();
						//$('#smImgTrim').empty();
						$('#smImgTrim > div').filter('.checkTrim').empty();
						$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table > tbody').empty();
						$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo > div > div > div > div > div > div.infoModelAccesories').empty();
						$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').empty();
						$('#navcontainer > div.right > div.rightEnd').empty();
						$('#navcontainer > div.right > div.leftEnd').empty();
						
						$('#navcontainer > div.right > div.infoModelColorNameNav').empty();
						$('#navcontainer > div.right > div.infoModelColorNav').empty();
						$('#columns > div.stepNextThirdClose').find('#mainContentconf').find('#tabs').find('#tabs-1').empty();
						
						
						$('#columns > div.stepTwoClose').hide("slide", { direction: "right" }, 300);
						$('#columns > div.stepOneClose').show("slide", { direction: "right" }, 1000);
						//$('#displayMoters > table > tbody > tr > td > input[name="vehicleB[]"]').attr('checked',false);
										
					});
				
			$('#columns > div.stepThirdClose > a:nth-child(3)').on('click', function(e)
			 {
			 	e.preventDefault();
			 	$('#columns > div.stepThirdClose').find('#mainContentconf').find('#columnA').show();
			 	
			 	$('#columns > div.stepThirdClose').find('#mainContentconf').find('#columnB').show();
			 	
			 	$('#columns > div.stepThirdClose').find('#mainContentconf').find('#columnH').show();
			 	
			 	$('#columns > div.stepThirdClose').find('#mainContentconf').find('#columnD').show();
			 	
			 	$('#dividetwo > div > div > div > div > div').show();
			 	
			 	$('#columns > div.stepThirdClose').find('#mainContentconf').find('#columnA').clone().appendTo($('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(7) > td'));
			 	
			 	$('#columns > div.stepThirdClose').find('#mainContentconf').find('#columnB').clone().appendTo($('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(13) > td'));
			 	
			 	$('#columns > div.stepThirdClose').find('#mainContentconf').find('#columnH').clone().appendTo($('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(10) > td'));

			 	$('#columns > div.stepThirdClose').find('#mainContentconf').find('#columnD').clone().appendTo($('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(16) > td'));
			 	
			 	$('#columns > div.stepThirdClose').hide("slide", { direction: "right" }, 300);
			 	
			 	//PLACE A BUTTON TO THE ;
			 	
			 	$('#columns > div.lastStepSummary').show("slide", { direction: "right" }, 1000).find('#print').on('click', function()
			 	{
			 		var divContents = $(this).closest('#columns > div.lastStepSummary').html();
			 		var printWindow = window.open('', '_blank', 'height=900,width=800');
			 		printWindow.document.write('<html><head><title>Nissan - Νικ. Ι. θεοχαράκης</title><link rel="stylesheet" type="text/css" href="//skin.nissan.gr/default/css/print.css"></head><body onload="window.focus(); window.print(); window.close();">'+divContents+'</body></html>');
			 		printWindow.document.close();
			 		//return true;
			 		//printWindow.focus();
			 		//printWindow.print();
			 		//printWindow.close();
			 		
			 		if(navigator.userAgent.indexOf("Chrome") != -1 )
				    {
				        //printWindow.document.close();
			 			return true;
				    }
			 		else if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
				    {
				        printWindow.print();
				 		if (window.stop) {
					        location.reload(); //triggering unload (e.g. reloading the page) makes the print dialog appear
					        window.stop(); //immediately stop reloading
					        printWindow.print();
					        
					    }
					    return false;
				    }
				    else if(navigator.userAgent.indexOf("Safari") != -1)
				    {
				        printWindow.print();
				 		if (window.stop) {
					        location.reload(); //triggering unload (e.g. reloading the page) makes the print dialog appear
					        window.stop(); //immediately stop reloading
					        printWindow.print();
					        
					    }
					    return false;
				    }
				    else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
				    {
				         printWindow.print();
				 		if (window.stop) {
					        location.reload(); //triggering unload (e.g. reloading the page) makes the print dialog appear
					        window.stop(); //immediately stop reloading
					        printWindow.print();
					        
					    }
					    return false;
				    }
				    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
				    {
				      printWindow.print();
				 		if (window.stop) {
					        location.reload(); //triggering unload (e.g. reloading the page) makes the print dialog appear
					        window.stop(); //immediately stop reloading
					        printWindow.print();
					        
					    }
					    return false; 
				    }
			 		/*printWindow.print();
			 		if (window.stop) {
				        location.reload(); //triggering unload (e.g. reloading the page) makes the print dialog appear
				        window.stop(); //immediately stop reloading
				        printWindow.print();
				        
				    }
				    return false;
				    */
			 	});
			 });
				
					
			
		}
	
	function infoStdHelp()
	{
		
			//$('#dividetwo > div:nth-child(1) > h4 > span').hide();
			
		
			$('#GradeA > ul > li > div > div > h4 > span > img').hover(function(e)
			{
				$('#GradeA > ul > li > div > div > h4 > span > span').toggle();
			
			});
			
			$('#dividetwo > div:nth-child(1) > h4 > span > img').hover(function(e)
			{
				$('#dividetwo > div:nth-child(1) > h4 > span > span').toggle();	
			});
			
			$('#GradeB > ul > li > div > div > h4 > span > img').hover(function(e)
			{
				$('#GradeB > ul > li > div > div > h4 > span > span').toggle();
			
			});
			
			$('#GradeC > ul > li > div > div > h4 > span > img').hover(function(e)
			{
				$('#GradeC > ul > li > div > div > h4 > span > span').toggle();
			
			});
			
			$('#feedback-top > div:nth-child(2) > h4 > span > img').hover(function(e)
			{
				$('#feedback-top > div:nth-child(2) > h4 > span > span').toggle();	
			});
			
			$('#dividetwo > div > h4 > span > img').each(function(e)
			{
				$(this).hover(function()
				{
					$(this).closest('span').find('span').toggle();	
				});
			});
			
			
			$('#dividetwo > div.infoModelColorTrim > p > span > img').hover(function()
			{
				$('#dividetwo > div.infoModelColorTrim > p > span > span').toggle();
			});
			
			$('#columnD > div.calculate > div > table > tbody > tr > td > span > img').each(function()
			{
				$(this).hover(function()
				{
					$(this).closest('span').find('span').toggle();	
				});
			});
			
			$('#displayMoters > div > table > tbody > tr > td:nth-child(3) > span > img').each(function()
			{
				$(this).hover(function()
				{
					$(this).closest('span').find('span').toggle();	
				});
			});
			
			$('#columnD > div.calculateWithAccessories > div > table > tbody > tr > td > span > img').each(function()
			{
				$(this).hover(function()
				{
					$(this).closest('span').find('span').toggle();	
				});
			});
			
			$('#displayColors > div.infoModelColor > p > span > img').hover(function()
			{
				$('#displayColors > div.infoModelColor > p > span > span').toggle();
			});
		
			/*$('#tabs-1 > table > tbody > tr > td > span > img').each(function()
			{
				$(this).hover(function()
				{
					$(this).closest('span').find('span').toggle();	
				});
			});
			*/
	}
	
	function displayEngineAndMotersGradeA(engineArrayHolder, vehicleNameHolderA, vehicleHolderFuelTypeA, vehiclePriceHolderA, vehicleTransHolderA, vehicleBodyHolderA, categoryVehicle)
	{
		var HTML = [];
		var result;
		var ArrayHolderVehicle = new Array(8);
		
		var imageHolder;
		var vehicleColorName;	
		var rgbColor;
		var colorPrice;
		var colorType;
		
		var stadarPriceVehicle;
		var stadarFuelType;
		var stadarVehicleTrans;
		var stadarVehicleBody;
		
		var GradeB;
		
		var vehicleColorNameHolder = [];
		var vehicleImageHolder = [];
		var vehicleRgbcolor = [];
		var vehicleColorPrice = [];
		var vehicleColorType = [];
		var string1;
		
		var imageBigHolderTrim;
		var imageSmallHolderTrim;
												
		var vehicleTrimName;	
		var vehcileTrimPrice;
		
		var vehicleImageBigTrimHolder = [];
		var vehicleImageSmallTrimHolder = [];
		var vehicleTrimNameHolder = [];
		var vehcileTrimPriceHolder= []; 
		
		var colorBigTrimImage;
		var colorSmallTrimImage;
		var vehicleColorTrimName;	
		var vehicleColorTrimPrice;
		
		var imageBigColorTrimHolder = [];
		var imageSmallColorTrimHolder = [];
		var vehicleColorTrimNameHolder = [];
		var vehcileColorTrimPriceHolder = [];
		
		
		var engineVeh;
		var fuelVeh;
		var nameVeh;
		var priceVeh;
		var transVeh;
		var bodyVeh;
		
		var colorname;
		var rgbcol;
		var colorPric;
		var colortype;
		
		var getVehicleNum = 0;
		
		var getNumColorVehicle = 0;
		
		//accessories
		
		var accessoryImage;
		var accessoryName;
		var accessoryDesc;
		var accessorySKU;
		var accessoryPrice;
		
		var accessoryImageHolder = [];
		var accessoryNameHolder = [];
		var accessoryDescHolder = [];
		var accessorySKUHolder = [];
		var accessoryPriceHolder = [];
		
		//ringgings
		
		var categoryRig;
		var riggingName;
		var riggingType;
		var riggingprice;
		
		var categoryRigHolder = [];
		var riggingNameHolder = [];
		var riggingTypeHolder = [];
		var riggingpriceHolder = [];
		
		var HTML1 = [];
		var HTML2 = [];
		
		var uniqueCategory = [];
		var unique;
		
		var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
	
			for(var i = 0; i < engineArrayHolder.length; i++)
			{
				var current = parseFloat(vehiclePriceHolderA[i]);
				//var theCurrent = current.toFixed(2);
				var theCurrent = formatNumber(current);
				//var theCurrent = formatNumber(current);
				HTML.push('<div style="background-color:white !important; box-shadow:none !important;" class="CSSTable" ><table style="width:100%; background-color:white !important; margin-bottom:15px !important; font-weight:normal !important; border:none;"><tr style="background:none !important;" class="gradeA">'
				+' <td style="width:20%; font-weight:normal !important; font-style:italics;"><input type="radio"  name="vehicleA[]" value="' +engineArrayHolder[i]+ ','+vehicleHolderFuelTypeA[i]+ ',' + vehicleNameHolderA[i] + ',' +vehiclePriceHolderA[i]+ ',' +vehicleTransHolderA[i]+ ','+vehicleBodyHolderA[i]+ '">'+ engineArrayHolder[i] + '</input></td>'
				+ '<td style="width:70%; padding-left:10px; font-weight:normal !important; font-style:italics;" valign="middle"><ul><li>'+vehicleNameHolderA[i]+'</li><li>'+vehicleHolderFuelTypeA[i]+ '</li><li>'+vehicleBodyHolderA[i]+ '</li><li>' +vehicleTransHolderA[i]+ '</li></ul></td>'
				+ '<td style="width:20%; font-weight:normal !important; font-style:italic;" valign="middle" align="right">&euro;'+theCurrent+stringInfo+'</td>'+
				'</tr></table></div>');
			}
			
			$('#displayMoters').html(HTML);
			
			infoStdHelp();
			
			$('#main .std-help img').hover(function()
			{
				$('after').toggle();
			});
			
			if($('#displayMoters').length > 0)
				{
					var radioButtonVehicleB = $('#displayMoters > div > table > tbody > tr > td > input[name="vehicleA[]"]');
					
					radioButtonVehicleB.on('click', function()
					{
					
						var radiobuttonChecked = $('#displayMoters > div > table > tbody > tr > td > input:radio[name="vehicleA[]"]:checked').val();
						
						if(radiobuttonChecked){
							string1 = radiobuttonChecked;
						}
					
					 var pushArrayHolderVehicle = [];	
					 ArrayHolderVehicle = string1.split(',');
					 
					 pushArrayHolderVehicle.push(ArrayHolderVehicle);
					 
					 engineVeh = ArrayHolderVehicle[0];
					 fuelVeh = ArrayHolderVehicle[1];
					 nameVeh = ArrayHolderVehicle[2];
					 priceVeh = ArrayHolderVehicle[3];
					 transVeh = ArrayHolderVehicle[4];
					 bodyVeh = ArrayHolderVehicle[5];
					 
					$('#columns > div.stepOneClose > a:nth-child(3)').on('click', function(e)
					{
						e.preventDefault();
						$('#navNumbers').removeClass('active');
						
						$('#navNumbers1').filter('.step2').addClass('active');
						
						$('#navNumbers > img:nth-child(1)').show();
						$('#navNumbers > img:nth-child(2)').hide();
						
						$('#navNumbers1 > img:nth-child(1)').hide();
						$('#navNumbers1 > img:nth-child(2)').show();
						
						$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
						$('#columns > div.stepTwoClose').show("slide", { direction: "right" }, 1000);
					
					$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableA]').unbind('click');
			 		$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableB]').unbind('click');
			 		$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableC]').unbind('click');
			 		$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableD]').unbind('click');	
						
					  if(jsonstr.config.model.grades instanceof Array)
					  {
						GradeB =  jsonstr.config.model.grades[0].grade.gradename['#text'];
							if(jsonstr.config.model.grades[0].grade.vehicles instanceof Array)
							{	
								for(var i = 0; i < jsonstr.config.model.grades[0].grade.vehicles.length; i++) 
									{
										
										getVehicleNum = i;
										theVehicleFuelTypeB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.fuel['#text'];
										theVehiclePriceB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.price['#text'];
										theVehicleNameB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.name['#text'];
										theVehicleEngineB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.engine['#text'].toString();
										theVehicleTransmissionB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.transmission['#text'];
										if(categoryVehicle == 'lcvs'){
											theVehicleBodyB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.body['#text'];
										}else{
											theVehicleBodyB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.doors['#text'];
										}
										
										if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
											&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
										{
											
											stadarPriceVehicle = theVehiclePriceB;
											stadarVehicleName = theVehicleNameB;
											stadarVehicleEngine  = theVehicleEngineB;
											stadarFuelType = theVehicleFuelTypeB;
											stadarVehicleTrans = theVehicleTransmissionB;
											stadarVehicleBody = theVehicleBodyB;
											
											
												if(jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.length; j++)
														{
																
																getNumColorVehicle = j;
																imageHolder = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
																vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
																rgbColor = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
																colorPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
																colorType = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																/*
																 *Test Here.... 
																 */
																
																colorname = vehicleColorName;
																rgbcol = rgbColor;
																colorPric = colorPrice;
																colortype = colorType;
																
																
																//empty String array before looping again.
																
																vehicleImageHolder.push(imageHolder);
																vehicleColorNameHolder.push(vehicleColorName);
																vehicleRgbcolor.push(rgbColor);
																vehicleColorPrice.push(colorPrice);
																vehicleColorType.push(colorType);
																/*
																 * End Test.....
																 */
																												
														}
													}else
													{
														
																getNumColorVehicle = j;
																imageHolder = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
																vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
																rgbColor = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
																colorPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
																colorType = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.type['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																/*
																 *Test Here.... 
																 */
																
																colorname = vehicleColorName;
																rgbcol = rgbColor;
																colorPric = colorPrice;
																colortype = colorType;
																
																
																//empty String array before looping again.
																
																vehicleImageHolder.push(imageHolder);
																vehicleColorNameHolder.push(vehicleColorName);
																vehicleRgbcolor.push(rgbColor);
																vehicleColorPrice.push(colorPrice);
																vehicleColorType.push(colorType);
																/*
																 * End Test.....
																 */
														
													}
												
													if(jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
												
												
												    
												if(jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															
															riggingName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
															
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
												}
													
												
											    //$('#columns > div.stepThirdClose').find('#columnC').html(HTML1);
											    
											    
											    //show hide
												showHideEquipment();
												
												 if($('#columns > div.stepThirdClose').find('#columnH').length > 0)
											     {
											     	$('#columns > div.stepThirdClose').find('#columnH').clone().appendTo($('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(14) > td').find('#columnH > div > div'));
											     }
												
												displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
												
												//display color images
												displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												
												displayGradeVehicleDetailsA(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												displayGradeVehicleDetailsNavA(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												
												displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												
												drawRgbColorsA(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
													engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
												
												var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
												
												
												drawTableAccessoryA(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
												
												
												//drawEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
												
												
												HTML1.splice(0, HTML1.length);
												vehicleImageHolder.splice(0, vehicleImageHolder.length);
												vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
												vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
												vehicleColorPrice.splice(0, vehicleColorPrice.length);
												vehicleColorType.splice(0, vehicleColorType.length);
												
												accessoryImageHolder.splice(0, accessoryImageHolder.length);
												accessoryNameHolder.splice(0, accessoryNameHolder.length);
												accessoryDescHolder.splice(0, accessoryDescHolder.length);
												accessorySKUHolder.splice(0, accessorySKUHolder.length);
												accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
												
												categoryRigHolder.splice(0, categoryRigHolder.length);
												riggingNameHolder.splice(0, riggingNameHolder.length);
												riggingTypeHolder.splice(0, riggingTypeHolder.length);
												riggingpriceHolder.splice(0, riggingpriceHolder.length);
												
												
										}
										
									}
							}else
							{
										theVehicleFuelTypeB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.fuel['#text'];
										theVehiclePriceB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.price['#text'];
										theVehicleNameB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.name['#text'];
										theVehicleEngineB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.engine['#text'].toString();
										theVehicleTransmissionB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.transmission['#text'];
										if(categoryVehicle == 'lcvs'){
											theVehicleBodyB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.body['#text'];
										}else{
											theVehicleBodyB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.doors['#text'];
										}
										//theVehicleBodyB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.doors['#text'];
										
										if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
											&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
										{
											
											stadarPriceVehicle = theVehiclePriceB;
											stadarVehicleName = theVehicleNameB;
											stadarVehicleEngine  = theVehicleEngineB;
											stadarFuelType = theVehicleFuelTypeB;
											stadarVehicleTrans = theVehicleTransmissionB;
											stadarVehicleBody = theVehicleBodyB;
											
											
												if(jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.length; j++)
														{
																
																getNumColorVehicle = j;
																imageHolder = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
																vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
																rgbColor = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
																colorPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
																colorType = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.type['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																/*
																 *Test Here.... 
																 */
																
																colorname = vehicleColorName;
																rgbcol = rgbColor;
																colorPric = colorPrice;
																colortype = colorType;
																
																
																//empty String array before looping again.
																
																vehicleImageHolder.push(imageHolder);
																vehicleColorNameHolder.push(vehicleColorName);
																vehicleRgbcolor.push(rgbColor);
																vehicleColorPrice.push(colorPrice);
																vehicleColorType.push(colorType);
																/*
																 * End Test.....
																 */
																												
														}
													}else
													{
														
																getNumColorVehicle = j;
																imageHolder = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
																vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colorname['#text'];	
																rgbColor = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
																colorPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colorprice['#text'];
																colorType = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.type['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																/*
																 *Test Here.... 
																 */
																
																colorname = vehicleColorName;
																rgbcol = rgbColor;
																colorPric = colorPrice;
																colortype = colorType;
																
																
																//empty String array before looping again.
																
																vehicleImageHolder.push(imageHolder);
																vehicleColorNameHolder.push(vehicleColorName);
																vehicleRgbcolor.push(rgbColor);
																vehicleColorPrice.push(colorPrice);
																vehicleColorType.push(colorType);
																/*
																 * End Test.....
																 */
														
													}
													
													
													if(jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
											if(jsonstr.config.model.grades[0].grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[0].grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[0].grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingArr = GetUnique(categoryRig);
															
															riggingName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[0].grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
															//$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingName+'</p>');
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[0].grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															
																	riggingName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[0].grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];
																	
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
															
															
													
												}
												
												
											     //$('#columns > div.stepThirdClose').find('#columnC').html(HTML1);
											     
											    
											    //show hide
												showHideEquipment();
												
												if($('#columns > div.stepThirdClose').find('#columnH').length > 0)
											     {
											     	$('#columns > div.stepThirdClose').find('#columnH').clone().appendTo($('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(14) > td'));
											     }
												
												displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
												//display color images
												displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												displayGradeVehicleDetailsA(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												displayGradeVehicleDetailsNavA(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												
												displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												
												drawRgbColorsA(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
													engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
												
												var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
												
												drawTableAccessoryA(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
												
												infoStdHelp();
												//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
												
												//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
													
												HTML1.splice(0, HTML1.length);
												vehicleImageHolder.splice(0, vehicleImageHolder.length);
												vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
												vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
												vehicleColorPrice.splice(0, vehicleColorPrice.length);
												vehicleColorType.splice(0, vehicleColorType.length);
												
												accessoryImageHolder.splice(0, accessoryImageHolder.length);
												accessoryNameHolder.splice(0, accessoryNameHolder.length);
												accessoryDescHolder.splice(0, accessoryDescHolder.length);
												accessorySKUHolder.splice(0, accessorySKUHolder.length);
												accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
												
												categoryRigHolder.splice(0, categoryRigHolder.length);
												riggingNameHolder.splice(0, riggingNameHolder.length);
												riggingTypeHolder.splice(0, riggingTypeHolder.length);
												riggingpriceHolder.splice(0, riggingpriceHolder.length);
												
										}
							}		
										
					 }else 
					 {
					 			GradeB =  jsonstr.config.model.grades.grade.gradename['#text'];
								getVehicleNum = i;
								if(jsonstr.config.model.grades.grade.vehicles instanceof Array)
								{	
										for(var i = 0; i < jsonstr.config.model.grades.grade.vehicles.length; i++) 
										{
											theVehicleFuelTypeB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.fuel['#text'];
											theVehiclePriceB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.price['#text'];
											theVehicleNameB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.name['#text'];
											theVehicleEngineB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.engine['#text'].toString();
											theVehicleTransmissionB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.transmission['#text'];
											if(categoryVehicle == 'lcvs'){
												theVehicleBodyB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.body['#text'];
											}else{
												theVehicleBodyB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.doors['#text'];
											}
											
											if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
												&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
											{
												
												stadarPriceVehicle = theVehiclePriceB;
												stadarVehicleName = theVehicleNameB;
												stadarVehicleEngine  = theVehicleEngineB;
												stadarFuelType = theVehicleFuelTypeB;
												stadarVehicleTrans = theVehicleTransmissionB;
												stadarVehicleBody = theVehicleBodyB;
												
													if(jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.length; j++)
														{
																
																getNumColorVehicle = j;
																imageHolder = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
																vehicleColorName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
																rgbColor = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
																colorPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
																colorType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.type['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																/*
																 *Test Here.... 
																 */
																
																colorname = vehicleColorName;
																rgbcol = rgbColor;
																colorPric = colorPrice;
																colortype = colorType;
																
																
																//empty String array before looping again.
																
																vehicleImageHolder.push(imageHolder);
																vehicleColorNameHolder.push(vehicleColorName);
																vehicleRgbcolor.push(rgbColor);
																vehicleColorPrice.push(colorPrice);
																vehicleColorType.push(colorType);
																/*
																 * End Test.....
																 */
																												
														}
													}else
													{
																getNumColorVehicle = j;
																imageHolder = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
																vehicleColorName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
																rgbColor = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
																colorPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
																colorType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.type['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																/*
																 *Test Here.... 
																 */
																
																colorname = vehicleColorName;
																rgbcol = rgbColor;
																colorPric = colorPrice;
																colortype = colorType;
																
																
																//empty String array before looping again.
																
																vehicleImageHolder.push(imageHolder);
																vehicleColorNameHolder.push(vehicleColorName);
																vehicleRgbcolor.push(rgbColor);
																vehicleColorPrice.push(colorPrice);
																vehicleColorType.push(colorType);
																/*
																 * End Test.....
																 */
														
													}
													
													
													if(jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
													
												if(jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
														}
		
												}else
												{
													categoryRig = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
													categoryRigHolder.push(categoryRig);
															
													riggingName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
													riggingType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
													riggingprice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																	
													riggingNameHolder.push(riggingName);
													riggingTypeHolder.push(riggingType);
													riggingpriceHolder.push(riggingprice);
															
												}
												$('#columns > div.stepThirdClose').find('#columnC').html(HTML1);
											    
											    //show hide
												showHideEquipment();
												
												if($('#columns > div.stepThirdClose').find('#columnH').length > 0)
											     {
											     	
											     	$('#columns > div.stepThirdClose').find('#columnH').clone().appendTo($('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(14) > td'));
											     }
											     
											     displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
												
												//display color images
													displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
													displayGradeVehicleDetailsA(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
													displayGradeVehicleDetailsNavA(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
													
													displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
													
													drawRgbColorsA(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
														engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
													
													var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
												
													drawTableAccessoryA(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
													
													infoStdHelp();
													//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
													
													//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
														
													HTML1.splice(0, HTML1.length);
													vehicleImageHolder.splice(0, vehicleImageHolder.length);
													vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
													vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
													vehicleColorPrice.splice(0, vehicleColorPrice.length);
													vehicleColorType.splice(0, vehicleColorType.length);
													
													
													accessoryImageHolder.splice(0, accessoryImageHolder.length);
													accessoryNameHolder.splice(0, accessoryNameHolder.length);
													accessoryDescHolder.splice(0, accessoryDescHolder.length);
													accessorySKUHolder.splice(0, accessorySKUHolder.length);
													accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
													
													
													categoryRigHolder.splice(0, categoryRigHolder.length);
													riggingNameHolder.splice(0, riggingNameHolder.length);
													riggingTypeHolder.splice(0, riggingTypeHolder.length);
													riggingpriceHolder.splice(0, riggingpriceHolder.length);
											}
										}
										
								}else
								{
										theVehicleFuelTypeB = jsonstr.config.model.grades.grade.vehicles.vehicle.fuel['#text'];
										theVehiclePriceB = jsonstr.config.model.grades.grade.vehicles.vehicle.price['#text'];
										theVehicleNameB = jsonstr.config.model.grades.grade.vehicles.vehicle.name['#text'];
										theVehicleEngineB = jsonstr.config.model.grades.grade.vehicles.vehicle.engine['#text'].toString();
										theVehicleTransmissionB = jsonstr.config.model.grades.grade.vehicles.vehicle.transmission['#text'];
										if(categoryVehicle == 'lcvs'){
											theVehicleBodyB = jsonstr.config.model.grades.grade.vehicles.vehicle.body['#text'];
										}else{
											theVehicleBodyB = jsonstr.config.model.grades.grade.vehicles.vehicle.doors['#text'];
										}
										//theVehicleBodyB = jsonstr.config.model.grades.grade.vehicles.vehicle.doors['#text'];
										
										if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
											&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
										{
											
											stadarPriceVehicle = theVehiclePriceB;
											stadarVehicleName = theVehicleNameB;
											stadarVehicleEngine  = theVehicleEngineB;
											stadarFuelType = theVehicleFuelTypeB;
											stadarVehicleTrans = theVehicleTransmissionB;
											stadarVehicleBody = theVehicleBodyB;
											
												if(jsonstr.config.model.grades.grade.vehicles.vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades.grade.vehicles.vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
												
												if(jsonstr.config.model.grades.grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades.grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
													
												if(jsonstr.config.model.grades.grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
																	riggingName = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
																	riggingName = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
															
															
													
												}
													
												
											    // $('#columns > div.stepThirdClose').find('#columnC').html(HTML1);
											    
											    //show hide
												showHideEquipment();
												
												displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
												//display color images
												displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												displayGradeVehicleDetailsA(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												displayGradeVehicleDetailsNavA(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												
												displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
												
												drawRgbColorsA(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
													engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
												
												var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
												
												drawTableAccessoryA(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
												//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
												infoStdHelp();
												
												//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
													
												HTML1.splice(0, HTML1.length);
												vehicleImageHolder.splice(0, vehicleImageHolder.length);
												vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
												vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
												vehicleColorPrice.splice(0, vehicleColorPrice.length);
												vehicleColorType.splice(0, vehicleColorType.length);
												
												accessoryImageHolder.splice(0, accessoryImageHolder.length);
												accessoryNameHolder.splice(0, accessoryNameHolder.length);
												accessoryDescHolder.splice(0, accessoryDescHolder.length);
												accessorySKUHolder.splice(0, accessorySKUHolder.length);
												accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
												
												//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
													
												categoryRigHolder.splice(0, categoryRigHolder.length);
												riggingNameHolder.splice(0, riggingNameHolder.length);
												riggingTypeHolder.splice(0, riggingTypeHolder.length);
												riggingpriceHolder.splice(0, riggingpriceHolder.length);
										}
								}	
					 }	  
					
					$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getmodelname').html(modelsname);
					$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getgradename').html(GradeB);
					
					});
						
				});
				
					
					
			}
			
			//color forward button;
			stepTwoForwardColors();
			
			//Accessories backwards Button
			stepThreeBackwardsButtonAccessories();
			
			// Accessories Forward Button Step 3
			stepThreeForwardButtonAccessories();
			 
			//step 4 backwards button summary
			stepFourthBackwardsSummary();
	}
	
	//Step 2 colors forward button
	function stepTwoForwardColors()
	{
		$('#columns > div.stepTwoClose > a:nth-child(3)').on('click', function(e)
			{
						    	 
				e.preventDefault();
				$('#navNumbers1').removeClass('active');
				$('#navNumbers2').addClass('active');
						  
				$('#navNumbers1 > img:nth-child(1)').show();
				$('#navNumbers1 > img:nth-child(2)').hide();
						
				$('#navNumbers2 > img:nth-child(1)').hide();
				$('#navNumbers2 > img:nth-child(2)').show();
						 	
				$('#columns > div.stepTwoClose').hide("slide", { direction: "right" }, 300);
				$('#columns > div.stepNextThirdClose').show("slide", { direction: "right" }, 1000);
			});
	}
	
	function stepThreeBackwardsButtonAccessories()
	{
		$('#columns > div.stepNextThirdClose > a:nth-child(2)').on('click', function(e)
				{
					e.preventDefault();
					$('#navNumbers2').removeClass('active');
			    	$('#navNumbers1').addClass('active');
			    	 
			    	$('#navNumbers1 > img:nth-child(1)').hide();
					$('#navNumbers1 > img:nth-child(2)').show();
						
					$('#navNumbers2 > img:nth-child(1)').show();
					$('#navNumbers2 > img:nth-child(2)').hide();
			    	 
					$('#navcontainer > div.right > div.infoModelColorNav').empty();
			    	 $('#columns > div.stepNextThirdClose').hide("slide", { direction: "right" }, 300);
			    	 $('#columns > div.stepTwoClose').show("slide", { direction: "right" }, 1000);
										
			   });
	}
	
	function stepThreeForwardButtonAccessories()
	{
		$('#columns > div.stepNextThirdClose > a:nth-child(3)').on('click', function(e)
		{
				e.preventDefault();
				$('#navNumbers2').filter('.step3').removeClass('active');
				$('#navNumbers3').filter('.step4').addClass('active');
					
				$('#navNumbers2 > img:nth-child(1)').show();
				$('#navNumbers2 > img:nth-child(2)').hide();
							
				$('#navNumbers3 > img:nth-child(1)').hide();
				$('#navNumbers3 > img:nth-child(2)').show();
					
				$('#columns > div.stepNextThirdClose').hide("slide", { direction: "right" }, 300);
				$('#columns > div.stepThirdClose').show("slide", { direction: "right" }, 1000).find('#dividetwo > div:nth-child(7) > div > div > div > h3').on('click', function(e)
				{
				 	$('#columns > div.stepThirdClose').find('#dividetwo > div:nth-child(7) > div > div > div > div > div.infoModelAccesories').toggle('slow');
				});
			 	
		}); 
	}
	
	function stepFourthBackwardsSummary()
	{
		$('#columns > div.stepThirdClose > a:nth-child(2)').on('click', function(e)
		{
			e.preventDefault();
			$('#navNumbers3').filter('.step4').removeClass('active');
			$('#navNumbers2').filter('.step3').addClass('active');
				
			$('#navNumbers2 > img:nth-child(1)').hide();
			$('#navNumbers2 > img:nth-child(2)').show();
						
			$('#navNumbers3 > img:nth-child(1)').show();
			$('#navNumbers3 > img:nth-child(2)').hide();
				
			$('#columns > div.stepThirdClose').find('#dividetwo > div:nth-child(7) > div > div > div > h3').unbind('click');
			$('#columns > div.stepThirdClose').hide("slide", { direction: "right" }, 300);
			$('#columns > div.stepNextThirdClose').show("slide", { direction: "right" }, 1000);
		}); 
	}
	
	function displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder)
	{
		
		var HTML1 = [];
		var prev;
		
		for(var i = 0; i < riggingNameHolder.length; i++)
		{
			if(categoryRigHolder[i] != prev)
			{
			HTML1.push('<!--h3-->'+
				   '<h3 class="table-caption" data-toggle-trigger="table'+i+'" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRigHolder[i]+'</span></h3>'+
				   '<!--end h3-->');
			}
			prev = categoryRigHolder[i];
			HTML1.push('<!--edw tha mpoune ta p-->'+	
					'<div class="expanded" data-toggle-target="table'+i+'" style="width:100% !important; clear: none;">'+
					'<!--<div class="infoStadarequipment" style="height: auto !important; float:left !important;"></div>-->'+
					'<table cellpadding="0" cellspacing="0" class="table-expanded"'+
					'style="width:100% !important;">'+
					'<tbody>'+
					'<tr class="even">'+
						riggingNameHolder[i] +
					'</tr>'+
					'</tbody>'+
					'</table>'+
					'</div>');
		}
		$('#columns > div.stepThirdClose').find('#columnC').html(HTML1);
	}
		
	function showHideEquipment()
	{
			
			$('#dividetwo > header[data-toggle-trigger=tableA]').on('click', function(event)
			{
				event.stopPropagation();
				$('#dividetwo > div.summaryDetails').toggle('slow');
			});
			$('#dividetwo > header[data-toggle-trigger=tableB]').on('click', function(event)
			{
				event.stopPropagation();
				$('#columnB').toggle('slow');
			});
			
			$('#columnH').filter('.module').hide();
			
			$('#dividetwo > header[data-toggle-trigger=tableC]').on('click', function(event)
			{
				event.stopPropagation();
				$('#columnH').toggle('slow');
			});
			
			$('#dividetwo > header[data-toggle-trigger=tableD]').on('click', function(event)
			{
				event.stopPropagation();
				$('#columnD').toggle('slow');
			});
			
			//$('#dividetwo > div > div > div > div > div').hide();
			$('#dividetwo > div > div > div > div > h3').each(function(index)
			{
				$(this).on('click', function(event)
				{
					event.preventDefault();	
					$(this).next('div').toggle('slow');
				});
			});
			
	}
	
	function drawEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder)
	{
		var HTML = [];
		for(var i = 0; i < categoryRigHolder.length; i++)
		{
			$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<h2>'+categoryRigHolder[i]+'</h2>');
			for(var j = 0; j < riggingNameHolder.length; j++)
			{
				$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingNameHolder[j]+'</p>');
			}
		}
		
	}
	
	function getAccessoriesDisplaySummary(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder)
	{
		
		var ArrayHolderImage = [];
		var ArrayHolderSKU = [];
		var ArrayHolderName = [];
		var ArrayHolderDesc = [];
		var ArrayHolderPrice = [];
		var ArrayHolderValue = [];
	
		$('#columns > div.stepNextThirdClose').find('#mainContentconf').find('#tabs-1 > table > tbody > tr > td > input[type="checkbox"]:checked').each(function()
			{
				
				ArrayHolderValue.push($(this).val());
				
				ArrayHolderImage.push($(this).attr('data-image'));
				
				ArrayHolderPrice.push($(this).attr('data-price'));
				
				ArrayHolderSKU.push($(this).attr('data-sku'));
				
				ArrayHolderName.push($(this).attr('data-name'));
				
				ArrayHolderDesc.push($(this).attr('data-desc'));
				
				//console.log('Values: '+$(this).val());
				displayAccessoriesSummaries(ArrayHolderValue, stadarPriceVehicle, ArrayHolderImage, ArrayHolderName, ArrayHolderSKU, ArrayHolderDesc);
				
				infoStdHelp();
			});
	
		$('#tabs-1 > table > tbody > tr > td > input[type="checkbox"]').on('click', function()
		{
			
			$('#tabs-1 > table > tbody > tr > td > input[type="checkbox"]:checked').each(function()
			{
				
				
				ArrayHolderValue.push($(this).val());
				
				ArrayHolderImage.push($(this).attr('data-image'));
				
				ArrayHolderPrice.push($(this).attr('data-price'));
				
				ArrayHolderSKU.push($(this).attr('data-sku'));
				
				ArrayHolderName.push($(this).attr('data-name'));
				
				ArrayHolderDesc.push($(this).attr('data-desc'));
				
				//console.log('Values: '+$(this).val());
				
				
			});
			
			displayAccessoriesSummaries(ArrayHolderValue, stadarPriceVehicle, ArrayHolderImage, ArrayHolderName, ArrayHolderSKU, ArrayHolderDesc);
			infoStdHelp();
			
			ArrayHolderValue.splice(0, ArrayHolderValue.length);
			ArrayHolderImage.splice(0, ArrayHolderImage.length);
			ArrayHolderName.splice(0, ArrayHolderName.length);
			ArrayHolderSKU.splice(0, ArrayHolderSKU.length);
			ArrayHolderName.splice(0, ArrayHolderName.length);
			ArrayHolderDesc.splice(0, ArrayHolderDesc.length);
			
		});
		
		infoStdHelp();
		
	}
	
	function displayAccessoriesSummaries(ArrayHolderValue, stadarPriceVehicle, ArrayHolderImage, ArrayHolderName, ArrayHolderSKU, ArrayHolderDesc)
	{
		var HTML = [];
		var HTML2 = [];
		var HTML3 =[];
		
		if(ArrayHolderName.length > 0)
		{
			for(var i = 0; i < ArrayHolderName.length; i++)
			{
				HTML2.push();
				
				var current = parseFloat(ArrayHolderValue[i]*1.24);
				var theCurrent = formatNumber(current);
				
				var countSpecific = 0;
		
				var substringset = 'Ζάντες αλουμινίου';
					
				if (!ArrayHolderName[i].indexOf(substringset) || !ArrayHolderName[i].indexOf('Ζάντα αλουμινίου')) 
				{
					HTML.push('<table style="width:100%;"><tr class="gradeA">'
					+ '<td style="width:15%; padding-left:10px;" valign="middle">SKU: '+ArrayHolderSKU[i]+ '</td>'
					+ '<td style="width:20%; padding-left:10px;" valign="middle">'
					+'<a href="'+ArrayHolderImage[i]+'" title="'+ArrayHolderName[i]+'">'
					+'<img style="width:150px !important" alt="'+ArrayHolderName[i]+'" src="'+ArrayHolderImage[i]+ '"/><span class="Enlargement">&nbsp;</span></a></td>'
					+ '<td style="width:50%; padding-left:10px;" valign="middle">'+ArrayHolderDesc[i]+ '</td>'
					+ '<td style="width:20%;" valign="middle" align="right">&euro;'+(theCurrent*4)+ ' σετ: <b style="color:#c71444;">&euro;(' +theCurrent+ ' x 4)</td>'+
					'</tr></table>');
					
				}else
				{
					HTML.push('<table style="width:100%;"><tr class="gradeA">'
					+ '<td style="width:15%; padding-left:10px;" valign="middle">SKU: '+ArrayHolderSKU[i]+ '</td>'
					+ '<td style="width:20%; padding-left:10px;" valign="middle">'
					+'<a href="'+ArrayHolderImage[i]+'" title="'+ArrayHolderName[i]+'">'
					+'<img style="width:150px !important" alt="'+ArrayHolderName[i]+'" src="'+ArrayHolderImage[i]+ '"/><span class="Enlargement">&nbsp;</span></a></td>'
					+ '<td style="width:64%; padding-left:10px;" valign="middle">'+ArrayHolderDesc[i]+ '</td>'
					+ '<td style="width:6%;" valign="middle" align="right">&euro;'+theCurrent+ '</td>'+
					'</tr></table>');
				}
			}
			
			
			
			$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo > div > div > div > div > div > div.infoModelAccesories').html(HTML);
			$('#columnB > div > div > div > div > div > table > tbody > tr > td > a').lightBox();
			
		}else
		{
			$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo > div > div > div > div > div > div.infoModelAccesories').html('<table><tr><tdpadding-left:10px; border-right:1px solid #ca1544;>Δεν επιλέχθηκαν Αξεσουάρ</td></tr></table>');
		}
		
		
		
		if($('#columns > div.stepThirdClose').find('#mainContentconf').find('#columnD > div.calculateWithAccessories > div > table > tbody > tr:nth-child(2) > td:nth-child(2)').find('#totalPriceForSum').length > 0)
		{
		
		var colorI;
		var colorN;
		var colorR;
		var colorT;
		var colorP = 0;
		var TOTAL = 0;
		
		var check = $('#columns > div.stepTwoClose').find('#mainContentconf').find('#displayColors').find('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
		var checkedValue = $('#columns > div.stepTwoClose').find('#mainContentconf').find('#displayColors').find('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
		
		colorR = check.attr('data-rgbs');
		colorN = check.attr('data-name');
		colorT = check.attr('data-type');
		colorP = check.attr('data-price');
		
		TOTAL = parseFloat(colorP) + parseFloat(stadarPriceVehicle);
		
		var theTOTAL = formatNumber(TOTAL);	
			
			//var takeTotalPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#columnD > div.calculateWithAccessories > div > table > tbody > tr:nth-child(2) > td:nth-child(2)').find('#totalPriceForSum').val();
			
			if(ArrayHolderValue.length > 0)
			{
				var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>'; 
				
				var TotaldataSum = 0;
				var TotaldataSumWithAccessory = 0;
			
				HTML2.push('<tr><td>ΕΠΙΛΟΓΕΣ ΧΡΗΣΤΗ ΑΞΕΣΟΥΑΡ</td><td>ΤΙΜΕΣ</td></tr><tr><td><h2 style="font-size:15px;">Τιμή με Χρώμα: </td><td style="font-size:15px; font-family:Conv_Nissan Brand Regular, Sans-Serif; font-weight:bold; color:#c71444;">&euro;'+theTOTAL+stringInfo+'</h2></td></tr>');	
				for(var i  = 0; i < ArrayHolderValue.length; i++){
					
						
						var current = parseFloat(ArrayHolderValue[i]*1.24);
						
						var substringset = 'Ζάντες αλουμινίου';
						
						if (!ArrayHolderName[i].indexOf(substringset) || !ArrayHolderName[i].indexOf('Ζάντα αλουμινίου')) 
						{
							var setCurrentWithSet = current * 4;
							
							var theCurrentSet = formatNumber(setCurrentWithSet);
							
							TotaldataSumWithAccessory += setCurrentWithSet;
								 
						}else
						{
							
							TotaldataSum += current; 
						
							var theCurrent = formatNumber(current);	
						}
						
						var PriceWithoutSet = formatNumber(current);
						
						var countSpecific = 0;
		
						var substringset = 'Ζάντες αλουμινίου';
							
						if (!ArrayHolderName[i].indexOf(substringset) || !ArrayHolderName[i].indexOf('Ζάντα αλουμινίου')) 
						{
							HTML2.push(
							'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444 !important;">&euro;'+theCurrentSet+ ' σετ: <b>&euro;(' +PriceWithoutSet+ ' x 4)'+stringInfo+'</h2></td></tr>'
							);
						}else
						{
							HTML2.push(
							'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444 !important;">&euro;'+theCurrent+stringInfo+'</h2></td></tr>'
							);
						}	
						
						/*HTML2.push(
						'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrent+'</h2></td></tr>'
						);*/
					}
				
				
				
				var colorVehiclePrice = parseFloat(TOTAL);
				
				//total of accessories set
				var TheTotaldataSumWithAccessory = formatNumber(TotaldataSumWithAccessory);
				
				var theTotaldataSum = formatNumber(TotaldataSum);
				
				//total of all accessories with sets
				var totalOfAccesoriesAndSet = TotaldataSumWithAccessory + TotaldataSum;
				
				console.log('total of accessories that are not set '+ TotaldataSum + ' and total of accessory sets' +TotaldataSumWithAccessory);
				
				console.log('total of accessories set' + totalOfAccesoriesAndSet);
				
				//formated total of all accessories with sets
				var formatTotalOfAccesoriesAndSet = formatNumber(totalOfAccesoriesAndSet);
				
				console.log('total of accessories set and regular accessories formated ' + formatTotalOfAccesoriesAndSet);
				
				//colorVehicles with regular accessories and set of accessories.
				var Totalsum  = colorVehiclePrice + totalOfAccesoriesAndSet;
				
				var theTotalsum = formatNumber(Totalsum);
					
				HTML2.push('<tr><td><h2 style="font-size:15px;">Τιμή τών αξεσουάρ: </td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;">&euro;'+formatTotalOfAccesoriesAndSet+stringInfo+'</h2></td></tr>');	
				HTML2.push('<tr><td><h2 style="font-size:15px;">Τελική τιμή: </td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;">&euro;'+theTotalsum+stringInfo+'</h2></td></tr>');
				
				$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').html(HTML2);
				
			}else
			{
				$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').html("<h2 style='font-family:Conv_Nissan Brand Regular, Sans-Serif; padding:20px; font-size:16px; text-align:center;'>Δεν Επιλέχθηκαν Αξεσουαρ</h2>");
			}
		
		}
		else{
		var colorI;
		var colorN;
		var colorR;
		var colorT;
		var colorP = 0;
		var TOTAL = 0;
		var AccessoriesPrices = [];
		
		var check = $('#columns > div.stepTwoClose').find('#mainContentconf').find('#displayColors').find('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
		var checkedValue = $('#columns > div.stepTwoClose').find('#mainContentconf').find('#displayColors').find('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
		
	
		colorR = check.attr('data-rgbs');
		colorN = check.attr('data-name');
		colorT = check.attr('data-type');
		colorP = check.attr('data-price');
		
		TOTAL = parseFloat(colorP) + parseFloat(stadarPriceVehicle);
		var theTOTAL = formatNumber(TOTAL);	
			
			if(ArrayHolderValue.length > 0)
			{
			
				var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>'; 
                    
				var TotaldataSum = 0;
				var TotaldataSumWithAccessory = 0;
				
				HTML2.push('<tr><td>ΕΠΙΛΟΓΕΣ ΧΡΗΣΤΗ ΑΞΕΣΟΥΑΡ</td><td>ΤΙΜΕΣ</td></tr><tr><td><h2 style="font-size:15px;">Τιμή με Χρώμα: </td><td style="font-size:15px; font-family:Conv_Nissan Brand Regular, Sans-Serif; font-weight:bold; color:#c71444;">&euro;'+theTOTAL+stringInfo+'</h2></td></tr>');	
				for(var i  = 0; i < ArrayHolderValue.length; i++){
					
						
						var current = parseFloat(ArrayHolderValue[i]*1.24);
						
						var substringset = 'Ζάντες αλουμινίου';
						
						if (!ArrayHolderName[i].indexOf(substringset) || !ArrayHolderName[i].indexOf('Ζάντα αλουμινίου')) 
						{
							var setCurrentWithSet = current * 4;
							
							var theCurrentSet = formatNumber(setCurrentWithSet);
							
							TotaldataSumWithAccessory += setCurrentWithSet;
								 
						}else
						{
							
							TotaldataSum += current; 
						
							var theCurrent = formatNumber(current);	
						}
						
						var PriceWithoutSet = formatNumber(current);
						
						var countSpecific = 0;
		
						var substringset = 'Ζάντες αλουμινίου';
							
						if (!ArrayHolderName[i].indexOf(substringset) || !ArrayHolderName[i].indexOf('Ζάντα αλουμινίου')) 
						{
							HTML2.push(
							'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrentSet+ ' σετ: <b>&euro;(' +PriceWithoutSet+ ' x 4)'+stringInfo+'</h2></td></tr>'
							);
						}else
						{
							HTML2.push(
							'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrent+stringInfo+'</h2></td></tr>'
							);
						}	
						
						/*HTML2.push(
						'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrent+'</h2></td></tr>'
						);*/
					}
				
				
				
				var colorVehiclePrice = parseFloat(TOTAL);
				
				//total of accessories set
				var TheTotaldataSumWithAccessory = formatNumber(TotaldataSumWithAccessory);
				
				var theTotaldataSum = formatNumber(TotaldataSum);
				
				//total of all accessories with sets
				var totalOfAccesoriesAndSet = TotaldataSumWithAccessory + TotaldataSum;
				
				console.log('total of accessories that are not set '+ TotaldataSum + ' and total of accessory sets' +TotaldataSumWithAccessory);
				
				console.log('total of accessories set' + totalOfAccesoriesAndSet);
				
				//formated total of all accessories with sets
				var formatTotalOfAccesoriesAndSet = formatNumber(totalOfAccesoriesAndSet);
				
				console.log('total of accessories set and regular accessories formated ' + formatTotalOfAccesoriesAndSet);
				
				//colorVehicles with regular accessories and set of accessories.
				var Totalsum  = colorVehiclePrice + totalOfAccesoriesAndSet;
				
				var theTotalsum = formatNumber(Totalsum);
					
				HTML2.push('<tr><td><h2 style="font-size:15px;">Τιμή τών αξεσουάρ: </td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;">&euro;'+formatTotalOfAccesoriesAndSet+stringInfo+'</h2></td></tr>');	
				HTML2.push('<tr><td><h2 style="font-size:15px;">Τελική τιμή: </td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;">&euro;'+theTotalsum+stringInfo+'</h2></td></tr>');	
				
				$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').html(HTML2);
				
				
			}else
			{
				$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').html("<h2 style='font-family:Conv_Nissan Brand Regular, Sans-Serif; padding:20px; font-size:16px; text-align:center;'>Δεν Επιλέχθηκαν Αξεσουαρ</h2>");
			}
		
		}
		
	}
	
	
	//draw table 
	function drawTableAccessoryA(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder)
	{
		var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
		
		var HTML = [];
		var HTML2 = [];
		
		var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
		
		
		for(var i = 0; i < accessoryNameHolder.length; i++)
		{
						
			
			var current = parseFloat(accessoryPriceHolder[i]*1.24);
			var theCurrent = formatNumber(current);
			
			var countSpecific = 0;
		
			var substringset = 'Ζάντες αλουμινίου';
					
			if (!accessoryNameHolder[i].indexOf(substringset) || !accessoryNameHolder[i].indexOf('Ζάντα αλουμινίου')) {
		  		
		  		HTML.push('<table style="width:100%;"><tr class="gradeA">'
				+'<td style="width:20%;"><input type="checkbox" data-image="'+accessoryImageHolder[i]+'" data-sku="'+accessorySKUHolder[i]+'" data-name="'+accessoryNameHolder[i]+'" data-desc="'+accessoryDescHolder[i]+'" data-price="'+accessoryPriceHolder[i]+'" name="acccessoryA[]" value="' +accessoryPriceHolder[i]+ '">'+ accessoryNameHolder[i] + '</input></td>'
				+ '<td style="width:10%; padding-left:10px;" valign="middle">'
				+'<a class="example-image-link" href="'+accessoryImageHolder[i]+'" title="'+accessoryNameHolder[i]+'">'
				+'<img style="width:59px !important" alt="'+accessoryNameHolder[i]+'" src="'+accessoryImageHolder[i]+ '"/><span class="addEnlargement">&nbsp;</span></a></td>'
				+ '<td style="width:70%; padding-left:10px;" valign="middle">'+accessoryDescHolder[i]+", &euro;"+(theCurrent*4)+ ' σετ: <b style="color:#c71444;">&euro;(' +theCurrent+ ' x 4)'+stringInfo+'</b></td>'
				+'</tr></table>');
			  	console.log('Title: '+accessoryNameHolder[i]+ ' Price: '+theCurrent * 4);
			    countSpecific += 1;
		  	}
		  	else
		  	{
		  		HTML.push('<table style="width:100%;"><tr class="gradeA">'
				+'<td style="width:20%;"><input type="checkbox" data-image="'+accessoryImageHolder[i]+'" data-sku="'+accessorySKUHolder[i]+'" data-name="'+accessoryNameHolder[i]+'" data-desc="'+accessoryDescHolder[i]+'" data-price="'+accessoryPriceHolder[i]+'" name="acccessoryA[]" value="' +accessoryPriceHolder[i]+ '">'+ accessoryNameHolder[i] + '</input></td>'
				+ '<td style="width:10%; padding-left:10px;" valign="middle">'
				+'<a class="example-image-link" href="'+accessoryImageHolder[i]+'" title="'+accessoryNameHolder[i]+'">'
				+'<img style="width:59px !important" alt="'+accessoryNameHolder[i]+'" src="'+accessoryImageHolder[i]+ '"/><span class="addEnlargement">&nbsp;</span></a></td>'
				+ '<td style="width:70%; padding-left:10px;" valign="middle">'+accessoryDescHolder[i]+", &euro;"+theCurrent+stringInfo+ '</td>'
				+'</tr></table>');
		  	}
			
			
		}
		console.log('specific products: '+countSpecific);
		
		$('#columns > div.stepNextThirdClose').find('#mainContentconf').find('#tabs').find('#tabs-1').html(HTML);
		
		$('#tabs-1 > table > tbody > tr > td > a').lightBox();
		
		$('#tabs-1 > table > tbody > tr > td > span > img').each(function()
			{
				$(this).hover(function()
				{
					$(this).closest('span').find('span').toggle();	
				});
			});
		
		
		getAccessoriesDisplaySummary(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
		
		
	}
	
	
	//draw table 
	function drawTableAccessoryB(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder)
	{
		var HTML = [];
		
		var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
		for(var i = 0; i < accessoryNameHolder.length; i++)
		{
			var current = parseFloat(accessoryPriceHolder[i]*1.24);
			var theCurrent = formatNumber(current);
			
			var countSpecific = 0;
		
			var substringset = 'Ζάντες αλουμινίου';
					
			if (!accessoryNameHolder[i].indexOf(substringset) || !accessoryNameHolder[i].indexOf('Ζάντα αλουμινίου')) {
				HTML.push('<table style="width:100%;"><tr class="gradeA">'
				+'<td style="width:20%;"><input type="checkbox" data-image="'+accessoryImageHolder[i]+'" data-sku="'+accessorySKUHolder[i]+'" data-name="'+accessoryNameHolder[i]+'" data-desc="'+accessoryDescHolder[i]+'" data-price="'+accessoryPriceHolder[i]+'" name="acccessoryA[]" value="' +accessoryPriceHolder[i]+ '">'+ accessoryNameHolder[i] + '</input></td>'
				+ '<td style="width:10%; padding-left:10px;" valign="middle">'
				+'<a class="example-image-link" href="'+accessoryImageHolder[i]+'" title="'+accessoryNameHolder[i]+'">'
				+'<img style="width:59px !important" alt="'+accessoryNameHolder[i]+'" src="'+accessoryImageHolder[i]+ '"/><span class="addEnlargement">&nbsp;</span></a></td>'
				+ '<td style="width:70%; padding-left:10px;" valign="middle">'+accessoryDescHolder[i]+", &euro;"+(theCurrent*4)+ ' σετ: <b style="color:#c71444;">&euro;(' +theCurrent+ ' x 4)'+stringInfo+'</b></td>'
				+'</tr></table>');
			  	console.log('Title: '+accessoryNameHolder[i]+ ' Price: '+theCurrent * 4);
			    countSpecific += 1;	
			}else
			{
				HTML.push('<table style="width:100%;"><tr class="gradeA">'
				+'<td style="width:20%;"><input type="checkbox" data-image="'+accessoryImageHolder[i]+'" data-sku="'+accessorySKUHolder[i]+'" data-name="'+accessoryNameHolder[i]+'" data-desc="'+accessoryDescHolder[i]+'" data-price="'+accessoryPriceHolder[i]+'"  name="acccessoryB[]" value="' +accessoryPriceHolder[i]+ '">'+ accessoryNameHolder[i] + '</input></td>'
				+ '<td style="width:10%; padding-left:10px;" valign="middle">'
				+'<a href="'+accessoryImageHolder[i]+'" title="'+accessoryNameHolder[i]+'">'
				+'<img style="width:59px !important" alt="'+accessoryNameHolder[i]+'" src="'+accessoryImageHolder[i]+ '"/><span class="addEnlargement">&nbsp;</span></a></td>'
				+ '<td style="width:70%; padding-left:10px;" valign="middle">'+accessoryDescHolder[i]+", &euro;"+theCurrent+stringInfo+ '</td>'
				+'</tr></table>');
			}
		}
		$('#columns > div.stepNextThirdClose').find('#mainContentconf').find('#tabs').find('#tabs-1').html(HTML);
		
		$('#tabs-1 > table > tbody > tr > td > a').lightBox();
		
		$('#tabs-1 > table > tbody > tr > td > span > img').each(function()
			{
				$(this).hover(function()
				{
					$(this).closest('span').find('span').toggle();	
				});
			});
		getAccessoriesDisplaySummary(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
		
	}
	
	function drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder)
	{
		var HTML = [];
		var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
		for(var i = 0; i < accessoryNameHolder.length; i++)
		{
			var current = parseFloat(accessoryPriceHolder[i]*1.24);
			var theCurrent = formatNumber(current);
			var countSpecific = 0;
			var substringset = 'Ζάντες αλουμινίου';
					
			if (!accessoryNameHolder[i].indexOf(substringset) || !accessoryNameHolder[i].indexOf('Ζάντα αλουμινίου')) {
				HTML.push('<table style="width:100%;"><tr class="gradeA">'
				+'<td style="width:20%;"><input type="checkbox" data-image="'+accessoryImageHolder[i]+'" data-sku="'+accessorySKUHolder[i]+'" data-name="'+accessoryNameHolder[i]+'" data-desc="'+accessoryDescHolder[i]+'" data-price="'+accessoryPriceHolder[i]+'" name="acccessoryA[]" value="' +accessoryPriceHolder[i]+ '">'+ accessoryNameHolder[i] + '</input></td>'
				+ '<td style="width:10%; padding-left:10px;" valign="middle">'
				+'<a class="example-image-link" href="'+accessoryImageHolder[i]+'" title="'+accessoryNameHolder[i]+'">'
				+'<img style="width:59px !important" alt="'+accessoryNameHolder[i]+'" src="'+accessoryImageHolder[i]+ '"/><span class="addEnlargement">&nbsp;</span></a></td>'
				+ '<td style="width:70%; padding-left:10px;" valign="middle">'+accessoryDescHolder[i]+", &euro;"+(theCurrent*4)+ ' σετ: <b style="color:#c71444;">&euro;(' +theCurrent+ ' x 4)'+stringInfo+'</b></td>'
				+'</tr></table>');
			  	console.log('Title: '+accessoryNameHolder[i]+ ' Price: '+theCurrent * 4);
			    countSpecific += 1;	
			}else
			{
				HTML.push('<table style="width:100%;"><tr class="gradeA">'
				+'<td style="width:20%;"><input type="checkbox" data-image="'+accessoryImageHolder[i]+'" data-sku="'+accessorySKUHolder[i]+'" data-name="'+accessoryNameHolder[i]+'" data-desc="'+accessoryDescHolder[i]+'" data-price="'+accessoryPriceHolder[i]+'"  name="acccessoryB[]" value="' +accessoryPriceHolder[i]+ '">'+ accessoryNameHolder[i] + '</input></td>'
				+ '<td style="width:10%; padding-left:10px;" valign="middle">'
				+'<a href="'+accessoryImageHolder[i]+'" title="'+accessoryNameHolder[i]+'">'
				+'<img style="width:59px !important" alt="'+accessoryNameHolder[i]+'" src="'+accessoryImageHolder[i]+ '"/><span class="addEnlargement">&nbsp;</span></a></td>'
				+ '<td style="width:70%; padding-left:10px;" valign="middle">'+accessoryDescHolder[i]+", &euro;"+theCurrent+stringInfo+ '</td>'
				+'</tr></table>');
			}
		}
		$('#columns > div.stepNextThirdClose').find('#mainContentconf').find('#tabs').find('#tabs-1').html(HTML);
		
		$('#tabs-1 > table > tbody > tr > td > a').lightBox();
		
		$('#tabs-1 > table > tbody > tr > td > span > img').each(function()
			{
				$(this).hover(function()
				{
					$(this).closest('span').find('span').toggle();	
				});
			});
		getAccessoriesDisplaySummary(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
		
	}
	
	function displayEngineAndMotersGradeB(engineArrayHolder, vehicleNameHolderB, vehicleHolderFuelTypeB, vehiclePriceHolderB, vehicleTransHolderB, vehicleBodyHolderB, categoryVehicle)
	{
		var HTML = [];
		var result;
		var ArrayHolderVehicle = new Array(8);
		
		var imageHolder;
		var vehicleColorName;	
		var rgbColor;
		var colorPrice;
		var colorType;
		
		var stadarPriceVehicle;
		var stadarFuelType;
		var stadarVehicleTrans;
		var stadarVehicleBody;
		
		var GradeB;
		
		var vehicleColorNameHolder = [];
		var vehicleImageHolder = [];
		var vehicleRgbcolor = [];
		var vehicleColorPrice = [];
		var vehicleColorType = [];
		var string1;
		
		var imageBigHolderTrim;
		var imageSmallHolderTrim;
												
		var vehicleTrimName;	
		var vehcileTrimPrice;
		
		var vehicleImageBigTrimHolder = [];
		var vehicleImageSmallTrimHolder = [];
		var vehicleTrimNameHolder = [];
		var vehcileTrimPriceHolder= []; 
		
		var colorBigTrimImage;
		var colorSmallTrimImage;
		var vehicleColorTrimName;	
		var vehicleColorTrimPrice;
		
		var imageBigColorTrimHolder = [];
		var imageSmallColorTrimHolder = [];
		var vehicleColorTrimNameHolder = [];
		var vehcileColorTrimPriceHolder = [];
		
		
		var engineVeh;
		var fuelVeh;
		var nameVeh;
		var priceVeh;
		var transVeh;
		var bodyVeh;
		
		var colorname;
		var rgbcol;
		var colorPric;
		var colortype;
		
		
		var getVehicleNum = 0;
		
		var getNumColorVehicle = 0;
		
		//accessories
		
		var accessoryImage;
		var accessoryName;
		var accessoryDesc;
		var accessorySKU;
		var accessoryPrice;
		
		var accessoryImageHolder = [];
		var accessoryNameHolder = [];
		var accessoryDescHolder = [];
		var accessorySKUHolder = [];
		var accessoryPriceHolder = [];
		
		//ringgings
		
		var categoryRig;
		var riggingName;
		var riggingType;
		var riggingprice;
		
		var categoryRigHolder = [];
		var riggingNameHolder = [];
		var riggingTypeHolder = [];
		var riggingpriceHolder = [];
		
		var HTML1 = [];
		
		var modelsname = jsonstr.config.model['@attributes'].name;
		
			var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
	
			for(var i = 0; i < engineArrayHolder.length; i++)
			{
				var current = parseFloat(vehiclePriceHolderB[i]);
				var theCurrent = formatNumber(current);
				//var theCurrent = current.toFixed(2);
				HTML.push('<div style="background-color:white !important; box-shadow:none !important;" class="CSSTable" ><table style="width:100%; background-color:white !important; margin-bottom:15px !important; font-weight:normal !important; border:none;"><tr class="gradeA">'
				+' <td style="width:20%; font-weight:normal !important; font-style:italics;"><input type="radio"  name="vehicleB[]" value="' +engineArrayHolder[i]+ ','+vehicleHolderFuelTypeB[i]+ ',' + vehicleNameHolderB[i] + ',' +vehiclePriceHolderB[i]+ ',' +vehicleTransHolderB[i]+ ','+vehicleBodyHolderB[i]+ '">'+ engineArrayHolder[i] + '</input></td>'
				+ '<td style="width:70%; padding-left:10px; font-weight:normal !important; font-style:italics;" valign="middle"><ul><li>'+vehicleNameHolderB[i]+'</li><li>'+vehicleHolderFuelTypeB[i]+ '</li><li>'+vehicleBodyHolderB[i]+ '</li><li>' +vehicleTransHolderB[i]+ '</li></ul></td>'
				+ '<td style="width:20%; font-weight:normal !important; font-style:italic;" valign="middle" align="right">&euro;'+theCurrent+stringInfo+'</td>'+
				'</tr></table></div>');
			}
			$('#displayMoters').html(HTML);
			
			
			
			if($('#displayMoters').length > 0)
				{
				infoStdHelp();
					var radioButtonVehicleB = $('#displayMoters > div > table > tbody > tr > td > input[name="vehicleB[]"]');
					
					radioButtonVehicleB.on('click', function()
					{
					
					$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo > div > div > div > div > div > div.infoModelAccesories').empty();
						var radiobuttonChecked = $('#displayMoters > div > table > tbody > tr > td > input:radio[name="vehicleB[]"]:checked').val();
						
						if(radiobuttonChecked){
							string1 = radiobuttonChecked;
						}
					
					 var pushArrayHolderVehicle = [];	
					 ArrayHolderVehicle = string1.split(',');
					 
					 pushArrayHolderVehicle.push(ArrayHolderVehicle);
					 
					 engineVeh = ArrayHolderVehicle[0];
					 fuelVeh = ArrayHolderVehicle[1];
					 nameVeh = ArrayHolderVehicle[2];
					 priceVeh = ArrayHolderVehicle[3];
					 transVeh = ArrayHolderVehicle[4];
					 bodyVeh = ArrayHolderVehicle[5];
					 
					$('#columns > div.stepOneClose > a:nth-child(3)').on('click', function(e)
					{
						e.preventDefault();
						$('#navNumbers').removeClass('active');
						$('#navNumbers1').filter('.step2').addClass('active');
						
						$('#navNumbers > img:nth-child(1)').show();
						$('#navNumbers > img:nth-child(2)').hide();
						
						$('#navNumbers1 > img:nth-child(1)').hide();
						$('#navNumbers1 > img:nth-child(2)').show();
						
						$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
						$('#columns > div.stepTwoClose').show("slide", { direction: "right" }, 1000);
						
					$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableA]').unbind('click');
			 		$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableB]').unbind('click');
			 		$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableC]').unbind('click');
			 		$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableD]').unbind('click');	
						
					  if(jsonstr.config.model.grades instanceof Array)
					  {
						GradeB =  jsonstr.config.model.grades[1].grade.gradename['#text'];
							if(jsonstr.config.model.grades[1].grade.vehicles instanceof Array)
							{
								for(var i = 0; i < jsonstr.config.model.grades[1].grade.vehicles.length; i++) 
								{
									
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.transmission['#text'];
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
												
												if(jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												if(jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
																	riggingName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
																	riggingName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																		
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
														
													
												}
													
											    //show hide
												showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetails(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNav(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColors(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											
											drawTableAccessoryB(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
											
											//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
											infoStdHelp();
												
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
													
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
									
								}
								
						   }else
						   {
						   			getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.transmission['#text'];
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.doors['#text'];	
									}
									//theVehicleBodyB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.type['#text'];
															
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
											
											if(jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}	
											
											
											if(jsonstr.config.model.grades[1].grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[1].grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[1].grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
																	riggingName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[1].grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																		
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[1].grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
																		riggingName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[1].grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);

												}
													
												
											    
											    //show hide
												showHideEquipment();
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetails(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNav(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColors(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											
											drawTableAccessoryB(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
													
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
						   }	
										
					 }else 
					 {
					 			
					 }	  
					
					//modelsname
					$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getmodelname').html(modelsname);
					$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getgradename').html(GradeB);
											
					});
					

						
				});
				
					
					
			}
			
			//color forward button step 2;
			stepTwoForwardColors();
			
			//Accessories backwards Button step 3
			stepThreeBackwardsButtonAccessories(); 
			
			//Accessories Forward Button Step 3
			stepThreeForwardButtonAccessories();
			
			//step 4 backwards button summary
			stepFourthBackwardsSummary();
				
	}
	
	function displayEngineAndMotersGradeC(engineArrayHolder, vehicleNameHolderC, vehicleHolderFuelTypeC, vehiclePriceHolderC, vehicleTransHolderC, vehicleBodyHolderC, categoryVehicle)
	{
		var HTML = [];
		var result;
		var ArrayHolderVehicle = new Array(8);
		
		var imageHolder;
		var vehicleColorName;	
		var rgbColor;
		var colorPrice;
		var colorType;
		
		var stadarPriceVehicle;
		var stadarFuelType;
		var stadarVehicleTrans;
		var stadarVehicleBody;
		
		var GradeB;
		
		var vehicleColorNameHolder = [];
		var vehicleImageHolder = [];
		var vehicleRgbcolor = [];
		var vehicleColorPrice = [];
		var vehicleColorType = [];
		var string1;
		
		var imageBigHolderTrim;
		var imageSmallHolderTrim;
												
		var vehicleTrimName;	
		var vehcileTrimPrice;
		
		var vehicleImageBigTrimHolder = [];
		var vehicleImageSmallTrimHolder = [];
		var vehicleTrimNameHolder = [];
		var vehcileTrimPriceHolder= []; 
		
		var colorBigTrimImage;
		var colorSmallTrimImage;
		var vehicleColorTrimName;	
		var vehicleColorTrimPrice;
		
		var imageBigColorTrimHolder = [];
		var imageSmallColorTrimHolder = [];
		var vehicleColorTrimNameHolder = [];
		var vehcileColorTrimPriceHolder = [];
		
		
		var engineVeh;
		var fuelVeh;
		var nameVeh;
		var priceVeh;
		var transVeh;
		var bodyVeh;
		
		var colorname;
		var rgbcol;
		var colorPric;
		var colortype;
		
		
		var getVehicleNum = 0;
		
		var getNumColorVehicle = 0;
		
		//accessories
		
		var accessoryImage;
		var accessoryName;
		var accessoryDesc;
		var accessorySKU;
		var accessoryPrice;
		
		var accessoryImageHolder = [];
		var accessoryNameHolder = [];
		var accessoryDescHolder = [];
		var accessorySKUHolder = [];
		var accessoryPriceHolder = [];
		
		//ringgings
		
		var categoryRig;
		var riggingName;
		var riggingType;
		var riggingprice;
		
		var categoryRigHolder = [];
		var riggingNameHolder = [];
		var riggingTypeHolder = [];
		var riggingpriceHolder = [];
		
		var HTML1 = [];
		
			var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
	
			for(var i = 0; i < engineArrayHolder.length; i++)
			{
				var current = parseFloat(vehiclePriceHolderC[i]);
				var theCurrent = formatNumber(current);
				//var theCurrent = current.toFixed(2);
				HTML.push('<div style="background-color:white !important; box-shadow:none !important;" class="CSSTable" ><table style="width:100%; background-color:white !important; margin-bottom:15px !important; font-weight:normal !important; border:none;"><tr class="gradeA">'
				+' <td style="width:20%; font-weight:normal !important; font-style:italics;"><input type="radio"  name="vehicleC[]" value="' +engineArrayHolder[i]+ ','+vehicleHolderFuelTypeC[i]+ ',' + vehicleNameHolderC[i] + ',' +vehiclePriceHolderC[i]+ ',' +vehicleTransHolderC[i]+ ','+vehicleBodyHolderC[i]+ '">'+ engineArrayHolder[i] + '</input></td>'
				+ '<td style="width:70%; padding-left:10px; font-weight:normal !important; font-style:italics;" valign="middle"><ul><li>'+vehicleNameHolderC[i]+'</li><li>'+vehicleHolderFuelTypeC[i]+ '</li><li>'+vehicleBodyHolderC[i]+ '</li><li>' +vehicleTransHolderC[i]+ '</li></ul></td>'
				+ '<td style="width:20%; font-weight:normal !important; font-style:italic;" valign="middle" align="right">&euro;'+theCurrent+stringInfo+'</td>'+
				'</tr></table></div>');
			}
			
			$('#displayMoters').html(HTML);
			
			if($('#displayMoters').length > 0)
				{
					infoStdHelp();
					var radioButtonVehicleB = $('#displayMoters > div > table > tbody > tr > td > input[name="vehicleC[]"]');
					
					radioButtonVehicleB.on('click', function()
					{
					
						var radiobuttonChecked = $('#displayMoters > div > table > tbody > tr > td > input:radio[name="vehicleC[]"]:checked').val();
						
						if(radiobuttonChecked){
							string1 = radiobuttonChecked;
						}
					
					 var pushArrayHolderVehicle = [];	
					 ArrayHolderVehicle = string1.split(',');
					 
					 pushArrayHolderVehicle.push(ArrayHolderVehicle);
					 
					 engineVeh = ArrayHolderVehicle[0];
					 fuelVeh = ArrayHolderVehicle[1];
					 nameVeh = ArrayHolderVehicle[2];
					 priceVeh = ArrayHolderVehicle[3];
					 transVeh = ArrayHolderVehicle[4];
					 bodyVeh = ArrayHolderVehicle[5];
					 
					$('#columns > div.stepOneClose > a:nth-child(3)').on('click', function(e)
					{
						e.preventDefault();
						$('#navNumbers').removeClass('active');
						$('#navNumbers1').filter('.step2').addClass('active');
						
						$('#navNumbers > img:nth-child(1)').show();
						$('#navNumbers > img:nth-child(2)').hide();
						
						$('#navNumbers1 > img:nth-child(1)').hide();
						$('#navNumbers1 > img:nth-child(2)').show();
						
						$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
						$('#columns > div.stepTwoClose').show("slide", { direction: "right" }, 1000);
						
						$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableA]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableB]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableC]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableD]').unbind('click');	
						
					  if(jsonstr.config.model.grades instanceof Array)
					  {
						GradeB =  jsonstr.config.model.grades[2].grade.gradename['#text'];
						
							 if(jsonstr.config.model.grades[2].grade.vehicles instanceof Array)
							 {
							    for(var i = 0; i < jsonstr.config.model.grades[2].grade.vehicles.length; i++) 
								{
									
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.transmission['#text'];
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.type['#text'];
															
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
												
												if(jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												
												if(jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
																	riggingName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
														
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
																	riggingName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
															
															
													
												}
													
												
											    // $('#columns > div.stepThirdClose').find('#columnC').html(HTML1);
											     
											    
											    //show hide
												showHideEquipment();
												displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
											
											//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
												
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
													
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
									
								}
					
							}else
							{
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.transmission['#text'];
									//theVehicleBodyB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.doors['#text'];
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
											
												if(jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												
												if(jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
																/*HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table'+j+'" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
																'<!--end h3-->');
															
															if(jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings.category[j].rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings.category[j].rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingprice['#text'];
																	
																	//$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingName+'</p>');
																	
																	HTML1.push('<!--edw tha mpoune ta p-->'+	
															            '<div class="expanded" data-toggle-target="table'+j+'" style="width:100% !important; clear: none;">'+
															                '<!--<div class="infoStadarequipment" style="height: auto !important; float:left !important;"></div>-->'+
																			'<table cellpadding="0" cellspacing="0" class="table-expanded"'+
															                'style="width:100% !important;">'+
															                    '<tbody>'+
															                        '<tr class="even">'+
															                       		 riggingName +
															                           
															                        '</tr>'+
															                    '</tbody>'+
															                '</table>'+
															           '</div>');
															           
																	
																	//HTML1.push('<div style="border 1px solid gray; padding:10px;"><p style="color:black">'+riggingName+'</p></div>');
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																	
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	//$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingName+'</p>');
																	
																/*HTML1.push('<!--edw tha mpoune ta p-->'+	
															            '<div class="expanded" data-toggle-target="table'+j+'" style="width:100% !important; clear: none;">'+
															                '<!--<div class="infoStadarequipment" style="height: auto !important; float:left !important;"></div>-->'+
																			'<table cellpadding="0" cellspacing="0" class="table-expanded"'+
															                'style="width:100% !important;">'+
															                    '<tbody>'+
															                        '<tr class="even">'+
															                       		 riggingName +
															                           
															                        '</tr>'+
															                    '</tbody>'+
															                '</table>'+
															           '</div>');
																	*/
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
	
																	riggingName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
													
												}
													
												
											//$('#columns > div.stepThirdClose').find('#columnC').html(HTML1);
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
							}
					 }else 
					 {
					 	
					 }	  
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getmodelname').html(modelsname);
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getgradename').html(GradeB);				
					});
						
				});
				
					
					
			}
			//color forward button;
			stepTwoForwardColors();
			
			//Accessories backwards Button Step3
			stepThreeBackwardsButtonAccessories();
			
			// Accessories Forward Button Step 3
			stepThreeForwardButtonAccessories();
			
			//step 4 backwards button summary
			stepFourthBackwardsSummary();
	}
	

function displayEngineAndMotersGradeD(engineArrayHolder, vehicleNameHolderD, vehicleHolderFuelTypeD, vehiclePriceHolderD, vehicleTransHolderD, vehicleBodyHolderD, categoryVehicle)
	{
		var HTML = [];
		var result;
		var ArrayHolderVehicle = new Array(8);
		
		var imageHolder;
		var vehicleColorName;	
		var rgbColor;
		var colorPrice;
		var colorType;
		
		var stadarPriceVehicle;
		var stadarFuelType;
		var stadarVehicleTrans;
		var stadarVehicleBody;
		
		var GradeB;
		
		var vehicleColorNameHolder = [];
		var vehicleImageHolder = [];
		var vehicleRgbcolor = [];
		var vehicleColorPrice = [];
		var vehicleColorType = [];
		var string1;
		
		var imageBigHolderTrim;
		var imageSmallHolderTrim;
												
		var vehicleTrimName;	
		var vehcileTrimPrice;
		
		var vehicleImageBigTrimHolder = [];
		var vehicleImageSmallTrimHolder = [];
		var vehicleTrimNameHolder = [];
		var vehcileTrimPriceHolder= []; 
		
		var colorBigTrimImage;
		var colorSmallTrimImage;
		var vehicleColorTrimName;	
		var vehicleColorTrimPrice;
		
		var imageBigColorTrimHolder = [];
		var imageSmallColorTrimHolder = [];
		var vehicleColorTrimNameHolder = [];
		var vehcileColorTrimPriceHolder = [];
		
		
		var engineVeh;
		var fuelVeh;
		var nameVeh;
		var priceVeh;
		var transVeh;
		var bodyVeh;
		
		var colorname;
		var rgbcol;
		var colorPric;
		var colortype;
		
		
		var getVehicleNum = 0;
		
		var getNumColorVehicle = 0;
		
		//accessories
		
		var accessoryImage;
		var accessoryName;
		var accessoryDesc;
		var accessorySKU;
		var accessoryPrice;
		
		var accessoryImageHolder = [];
		var accessoryNameHolder = [];
		var accessoryDescHolder = [];
		var accessorySKUHolder = [];
		var accessoryPriceHolder = [];
		
		//ringgings
		
		var categoryRig;
		var riggingName;
		var riggingType;
		var riggingprice;
		
		var categoryRigHolder = [];
		var riggingNameHolder = [];
		var riggingTypeHolder = [];
		var riggingpriceHolder = [];
		
		var HTML1 = [];
		
			var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
	
			for(var i = 0; i < engineArrayHolder.length; i++)
			{
				var current = parseFloat(vehiclePriceHolderD[i]);
				var theCurrent = formatNumber(current);
				//var theCurrent = current.toFixed(2);
				HTML.push('<div style="background-color:white !important; box-shadow:none !important;" class="CSSTable" ><table style="width:100%; background-color:white !important; margin-bottom:15px !important; font-weight:normal !important; border:none;"><tr class="gradeA">'
				+' <td style="width:20%; font-weight:normal !important; font-style:italics;"><input type="radio"  name="vehicleD[]" value="' +engineArrayHolder[i]+ ','+vehicleHolderFuelTypeD[i]+ ',' + vehicleNameHolderD[i] + ',' +vehiclePriceHolderD[i]+ ',' +vehicleTransHolderD[i]+ ','+vehicleBodyHolderD[i]+ '">'+ engineArrayHolder[i] + '</input></td>'
				+ '<td style="width:70%; padding-left:10px; font-weight:normal !important; font-style:italics;" valign="middle"><ul><li>'+vehicleNameHolderD[i]+'</li><li>'+vehicleHolderFuelTypeD[i]+ '</li><li>'+vehicleBodyHolderD[i]+ '</li><li>' +vehicleTransHolderD[i]+ '</li></ul></td>'
				+ '<td style="width:20%; font-weight:normal !important; font-style:italic;" valign="middle" align="right">&euro;'+theCurrent+stringInfo+'</td>'+
				'</tr></table></div>');
			}
			
			$('#displayMoters').html(HTML);
			
			if($('#displayMoters').length > 0)
				{
					infoStdHelp();
					var radioButtonVehicleD = $('#displayMoters > div > table > tbody > tr > td > input[name="vehicleD[]"]');
					
					radioButtonVehicleD.on('click', function()
					{
					
						var radiobuttonChecked = $('#displayMoters > div > table > tbody > tr > td > input:radio[name="vehicleD[]"]:checked').val();
						
						if(radiobuttonChecked){
							string1 = radiobuttonChecked;
						}
					
					 var pushArrayHolderVehicle = [];	
					 ArrayHolderVehicle = string1.split(',');
					 
					 pushArrayHolderVehicle.push(ArrayHolderVehicle);
					 
					 engineVeh = ArrayHolderVehicle[0];
					 fuelVeh = ArrayHolderVehicle[1];
					 nameVeh = ArrayHolderVehicle[2];
					 priceVeh = ArrayHolderVehicle[3];
					 transVeh = ArrayHolderVehicle[4];
					 bodyVeh = ArrayHolderVehicle[5];
					 
					$('#columns > div.stepOneClose > a:nth-child(3)').on('click', function(e)
					{
						e.preventDefault();
						$('#navNumbers').removeClass('active');
						$('#navNumbers1').filter('.step2').addClass('active');
						
						$('#navNumbers > img:nth-child(1)').show();
						$('#navNumbers > img:nth-child(2)').hide();
						
						$('#navNumbers1 > img:nth-child(1)').hide();
						$('#navNumbers1 > img:nth-child(2)').show();
						
						$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
						$('#columns > div.stepTwoClose').show("slide", { direction: "right" }, 1000);
						
						$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableA]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableB]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableC]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableD]').unbind('click');	
						
					  if(jsonstr.config.model.grades instanceof Array)
					  {
						GradeB =  jsonstr.config.model.grades[3].grade.gradename['#text'];
						
							 if(jsonstr.config.model.grades[3].grade.vehicles instanceof Array)
							 {
							    for(var i = 0; i < jsonstr.config.model.grades[3].grade.vehicles.length; i++) 
								{
									
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.transmission['#text'];
									
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
												
												if(jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												
												if(jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															/*HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table'+j+'" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
																'<!--end h3-->');
															
															if(jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category[j].rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category[j].rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category[j].rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category[j].rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category[j].rigging[k].riggingprice['#text'];
																	
																	//$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingName+'</p>');
																	
																	HTML1.push('<!--edw tha mpoune ta p-->'+	
															            '<div class="expanded" data-toggle-target="table'+j+'" style="width:100% !important; clear: none;">'+
															                '<!--<div class="infoStadarequipment" style="height: auto !important; float:left !important;"></div>-->'+
																			'<table cellpadding="0" cellspacing="0" class="table-expanded"'+
															                'style="width:100% !important;">'+
															                    '<tbody>'+
															                        '<tr class="even">'+
															                       		 riggingName +
															                           
															                        '</tr>'+
															                    '</tbody>'+
															                '</table>'+
															           '</div>');
															           
																	
																	//HTML1.push('<div style="border 1px solid gray; padding:10px;"><p style="color:black">'+riggingName+'</p></div>');
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																	
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	//$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingName+'</p>');
																	
																	/*HTML1.push('<!--edw tha mpoune ta p-->'+	
															            '<div class="expanded" data-toggle-target="table'+j+'" style="width:100% !important; clear: none;">'+
															                '<!--<div class="infoStadarequipment" style="height: auto !important; float:left !important;"></div>-->'+
																			'<table cellpadding="0" cellspacing="0" class="table-expanded"'+
															                'style="width:100% !important;">'+
															                    '<tbody>'+
															                        '<tr class="even">'+
															                       		 riggingName +
															                           
															                        '</tr>'+
															                    '</tbody>'+
															                '</table>'+
															           '</div>');
																	*/
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															/*HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table0" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
																'<!--end h3-->');
															
															if(jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category.rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category.rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category.rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category.rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category.rigging[k].riggingprice['#text'];
																	
																	//$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingName+'</p>');
																	
																	HTML1.push('<!--edw tha mpoune ta p-->'+	
															            '<div class="expanded" data-toggle-target="table0" style="width:100% !important; clear: none;">'+
															                '<!--<div class="infoStadarequipment" style="height: auto !important; float:left !important;"></div>-->'+
																			'<table cellpadding="0" cellspacing="0" class="table-expanded"'+
															                'style="width:100% !important;">'+
															                    '<tbody>'+
															                        '<tr class="even">'+
															                       		 riggingName +
															                           
															                        '</tr>'+
															                    '</tbody>'+
															                '</table>'+
															           '</div>');
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[3].grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																	
																	/*HTML1.push('<!--edw tha mpoune ta p-->'+	
															            '<div class="expanded" data-toggle-target="table0" style="width:100% !important; clear: none;">'+
															                '<!--<div class="infoStadarequipment" style="height: auto !important; float:left !important;"></div>-->'+
																			'<table cellpadding="0" cellspacing="0" class="table-expanded"'+
															                'style="width:100% !important;">'+
															                    '<tbody>'+
															                        '<tr class="even">'+
															                       		 riggingName +
															                           
															                        '</tr>'+
															                    '</tbody>'+
															                '</table>'+
															           '</div>');
															           */
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
												}
													
												
											     //$('#columns > div.stepThirdClose').find('#columnC').html(HTML1);
											     
											    
											    //show hide
												showHideEquipment();
												
												displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
											
											//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
									
								}
					
							}else
							{
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[3].grade.vehicles.vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[3].grade.vehicles.vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[3].grade.vehicles.vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[3].grade.vehicles.vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[3].grade.vehicles.vehicle.transmission['#text'];
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[3].grade.vehicles.vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[3].grade.vehicles.vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[3].grade.vehicles.vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
											
												if(jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[3].grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												
												if(jsonstr.config.model.grades[3].grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[3].grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[3].grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
																	riggingName = jsonstr.config.model.grades[3].grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[3].grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[3].grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	//$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingName+'</p>');
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[3].grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
																	riggingName = jsonstr.config.model.grades[3].grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[3].grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[3].grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
															
															
													
												}
													
												
											//$('#columns > div.stepThirdClose').find('#columnC').html(HTML1);
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
							}
					 }else 
					 {
					 	
					 }	  
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getmodelname').html(modelsname);
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getgradename').html(GradeB);				
					});
						
				});
				
					
					
			}
			//color forward button;
			stepTwoForwardColors();
			
			//Accessories backwards Button
			stepThreeBackwardsButtonAccessories();
			
			// Accessories Forward Button Step 3
			stepThreeForwardButtonAccessories();
			
			//step 4 backwards button summary
			stepFourthBackwardsSummary();	
	}


function displayEngineAndMotersGradeE(engineArrayHolder, vehicleNameHolderE, vehicleHolderFuelTypeE, vehiclePriceHolderE, vehicleTransHolderE, vehicleBodyHolderE, categoryVehicle)
	{
		var HTML = [];
		var result;
		var ArrayHolderVehicle = new Array(8);
		
		var imageHolder;
		var vehicleColorName;	
		var rgbColor;
		var colorPrice;
		var colorType;
		
		var stadarPriceVehicle;
		var stadarFuelType;
		var stadarVehicleTrans;
		var stadarVehicleBody;
		
		var GradeB;
		
		var vehicleColorNameHolder = [];
		var vehicleImageHolder = [];
		var vehicleRgbcolor = [];
		var vehicleColorPrice = [];
		var vehicleColorType = [];
		var string1;
		
		var imageBigHolderTrim;
		var imageSmallHolderTrim;
												
		var vehicleTrimName;	
		var vehcileTrimPrice;
		
		var vehicleImageBigTrimHolder = [];
		var vehicleImageSmallTrimHolder = [];
		var vehicleTrimNameHolder = [];
		var vehcileTrimPriceHolder= []; 
		
		var colorBigTrimImage;
		var colorSmallTrimImage;
		var vehicleColorTrimName;	
		var vehicleColorTrimPrice;
		
		var imageBigColorTrimHolder = [];
		var imageSmallColorTrimHolder = [];
		var vehicleColorTrimNameHolder = [];
		var vehcileColorTrimPriceHolder = [];
		
		
		var engineVeh;
		var fuelVeh;
		var nameVeh;
		var priceVeh;
		var transVeh;
		var bodyVeh;
		
		var colorname;
		var rgbcol;
		var colorPric;
		var colortype;
		
		
		var getVehicleNum = 0;
		
		var getNumColorVehicle = 0;
		
		//accessories
		
		var accessoryImage;
		var accessoryName;
		var accessoryDesc;
		var accessorySKU;
		var accessoryPrice;
		
		var accessoryImageHolder = [];
		var accessoryNameHolder = [];
		var accessoryDescHolder = [];
		var accessorySKUHolder = [];
		var accessoryPriceHolder = [];
		
		//ringgings
		
		var categoryRig;
		var riggingName;
		var riggingType;
		var riggingprice;
		
		var categoryRigHolder = [];
		var riggingNameHolder = [];
		var riggingTypeHolder = [];
		var riggingpriceHolder = [];
		
		var HTML1 = [];
		
			var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
	
			for(var i = 0; i < engineArrayHolder.length; i++)
			{
				var current = parseFloat(vehiclePriceHolderE[i]);
				var theCurrent = formatNumber(current);
				//var theCurrent = current.toFixed(2);
				HTML.push('<div style="background-color:white !important; box-shadow:none !important;" class="CSSTable" ><table style="width:100%; background-color:white !important; margin-bottom:15px !important; font-weight:normal !important; border:none;"><tr class="gradeA">'
				+' <td style="width:20%; font-weight:normal !important; font-style:italics;"><input type="radio"  name="vehicleE[]" value="' +engineArrayHolder[i]+ ','+vehicleHolderFuelTypeE[i]+ ',' + vehicleNameHolderE[i] + ',' +vehiclePriceHolderE[i]+ ',' +vehicleTransHolderE[i]+ ','+vehicleBodyHolderE[i]+ '">'+ engineArrayHolder[i] + '</input></td>'
				+ '<td style="width:70%; padding-left:10px; font-weight:normal !important; font-style:italics;" valign="middle"><ul><li>'+vehicleNameHolderE[i]+'</li><li>'+vehicleHolderFuelTypeE[i]+ '</li><li>'+vehicleBodyHolderE[i]+ '</li><li>' +vehicleTransHolderE[i]+ '</li></ul></td>'
				+ '<td style="width:20%; font-weight:normal !important; font-style:italic;" valign="middle" align="right">&euro;'+theCurrent+stringInfo+'</td>'+
				'</tr></table></div>');
			}
			
			$('#displayMoters').html(HTML);
			
			if($('#displayMoters').length > 0)
				{
					infoStdHelp();
					var radioButtonVehicleE = $('#displayMoters > div > table > tbody > tr > td > input[name="vehicleE[]"]');
					
					radioButtonVehicleE.on('click', function()
					{
					
						var radiobuttonChecked = $('#displayMoters > div > table > tbody > tr > td > input:radio[name="vehicleE[]"]:checked').val();
						
						if(radiobuttonChecked){
							string1 = radiobuttonChecked;
						}
					
					 var pushArrayHolderVehicle = [];	
					 ArrayHolderVehicle = string1.split(',');
					 
					 pushArrayHolderVehicle.push(ArrayHolderVehicle);
					 
					 engineVeh = ArrayHolderVehicle[0];
					 fuelVeh = ArrayHolderVehicle[1];
					 nameVeh = ArrayHolderVehicle[2];
					 priceVeh = ArrayHolderVehicle[3];
					 transVeh = ArrayHolderVehicle[4];
					 bodyVeh = ArrayHolderVehicle[5];
					 
					$('#columns > div.stepOneClose > a:nth-child(3)').on('click', function(e)
					{
						e.preventDefault();
						$('#navNumbers').removeClass('active');
						$('#navNumbers1').filter('.step2').addClass('active');
						
						$('#navNumbers > img:nth-child(1)').show();
						$('#navNumbers > img:nth-child(2)').hide();
						
						$('#navNumbers1 > img:nth-child(1)').hide();
						$('#navNumbers1 > img:nth-child(2)').show();
						
						$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
						$('#columns > div.stepTwoClose').show("slide", { direction: "right" }, 1000);
						
						$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableA]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableB]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableC]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableD]').unbind('click');	
						
					  if(jsonstr.config.model.grades instanceof Array)
					  {
						GradeB =  jsonstr.config.model.grades[4].grade.gradename['#text'];
						
							 if(jsonstr.config.model.grades[4].grade.vehicles instanceof Array)
							 {
							    for(var i = 0; i < jsonstr.config.model.grades[4].grade.vehicles.length; i++) 
								{
									
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.transmission['#text'];
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
												
												if(jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												if(jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															

																	riggingName = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	//$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingName+'</p>');
																		
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
																	riggingName = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[4].grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																	
															
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															
															
													
												}
													
												
											    //show hide
												showHideEquipment();
												
												displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
											
											//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
												
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
									
								}
					
							}else
							{
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[4].grade.vehicles.vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[4].grade.vehicles.vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[4].grade.vehicles.vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[4].grade.vehicles.vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[4].grade.vehicles.vehicle.transmission['#text'];
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[4].grade.vehicles.vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[4].grade.vehicles.vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[4].grade.vehicles.vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
											
												if(jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[4].grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												
												if(jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															/*HTML1.push('<!--h3-->'+
													        '<h3 class="table-caption" data-toggle-trigger="table'+j+'" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
															'<!--end h3-->');
															
															if(jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category[j].rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category[j].rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingprice['#text'];
																	
																	//$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingName+'</p>');
																	
																	HTML1.push('<!--edw tha mpoune ta p-->'+	
															            '<div class="expanded" data-toggle-target="table'+j+'" style="width:100% !important; clear: none;">'+
															                '<!--<div class="infoStadarequipment" style="height: auto !important; float:left !important;"></div>-->'+
																			'<table cellpadding="0" cellspacing="0" class="table-expanded"'+
															                'style="width:100% !important;">'+
															                    '<tbody>'+
															                        '<tr class="even">'+
															                       		 riggingName +
															                           
															                        '</tr>'+
															                    '</tbody>'+
															                '</table>'+
															           '</div>');
															           
																	
																	//HTML1.push('<div style="border 1px solid gray; padding:10px;"><p style="color:black">'+riggingName+'</p></div>');
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																	
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	//$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingName+'</p>');
																	
																	/*HTML1.push('<!--edw tha mpoune ta p-->'+	
															            '<div class="expanded" data-toggle-target="table'+j+'" style="width:100% !important; clear: none;">'+
															                '<!--<div class="infoStadarequipment" style="height: auto !important; float:left !important;"></div>-->'+
																			'<table cellpadding="0" cellspacing="0" class="table-expanded"'+
															                'style="width:100% !important;">'+
															                    '<tbody>'+
															                        '<tr class="even">'+
															                       		 riggingName +
															                           
															                        '</tr>'+
															                    '</tbody>'+
															                '</table>'+
															           '</div>');
																	*/
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															/*HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table0" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
																'<!--end h3-->');
															
															if(jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category.rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category.rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category.rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category.rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category.rigging[k].riggingprice['#text'];
																	
																	//$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoStadarequipment').append('<p style="color:black">'+riggingName+'</p>');
																	
																	HTML1.push('<!--edw tha mpoune ta p-->'+	
															            '<div class="expanded" data-toggle-target="table0" style="width:100% !important; clear: none;">'+
															                '<!--<div class="infoStadarequipment" style="height: auto !important; float:left !important;"></div>-->'+
																			'<table cellpadding="0" cellspacing="0" class="table-expanded"'+
															                'style="width:100% !important;">'+
															                    '<tbody>'+
															                        '<tr class="even">'+
															                       		 riggingName +
															                           
															                        '</tr>'+
															                    '</tbody>'+
															                '</table>'+
															           '</div>');
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[4].grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];
																	
																	/*HTML1.push('<!--edw tha mpoune ta p-->'+	
															            '<div class="expanded" data-toggle-target="table0" style="width:100% !important; clear: none;">'+
															                '<!--<div class="infoStadarequipment" style="height: auto !important; float:left !important;"></div>-->'+
																			'<table cellpadding="0" cellspacing="0" class="table-expanded"'+
															                'style="width:100% !important;">'+
															                    '<tbody>'+
															                        '<tr class="even">'+
															                       		 riggingName +
															                           
															                        '</tr>'+
															                    '</tbody>'+
															                '</table>'+
															           '</div>');
															           */
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
													
												}
													
												
											//$('#columns > div.stepThirdClose').find('#columnC').html(HTML1);
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
							}
					 }else 
					 {
					 	
					 }	  
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getmodelname').html(modelsname);
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getgradename').html(GradeB);				
					});
						
				});
				
					
					
			}
			//color forward button;
			stepTwoForwardColors();
			
			//Accessories backwards Button
			stepThreeBackwardsButtonAccessories(); 
			
			// Accessories Forward Button Step 3
			stepThreeForwardButtonAccessories(); 
			 
			//step 4 backwards button summary
			stepFourthBackwardsSummary();
	}


function displayEngineAndMotersGradeF(engineArrayHolder, vehicleNameHolderF, vehicleHolderFuelTypeF, vehiclePriceHolderF, vehicleTransHolderF, vehicleBodyHolderF, categoryVehicle)
	{
		var HTML = [];
		var result;
		var ArrayHolderVehicle = new Array(8);
		
		var imageHolder;
		var vehicleColorName;	
		var rgbColor;
		var colorPrice;
		var colorType;
		
		var stadarPriceVehicle;
		var stadarFuelType;
		var stadarVehicleTrans;
		var stadarVehicleBody;
		
		var GradeB;
		
		var vehicleColorNameHolder = [];
		var vehicleImageHolder = [];
		var vehicleRgbcolor = [];
		var vehicleColorPrice = [];
		var vehicleColorType = [];
		var string1;
		
		var imageBigHolderTrim;
		var imageSmallHolderTrim;
												
		var vehicleTrimName;	
		var vehcileTrimPrice;
		
		var vehicleImageBigTrimHolder = [];
		var vehicleImageSmallTrimHolder = [];
		var vehicleTrimNameHolder = [];
		var vehcileTrimPriceHolder= []; 
		
		var colorBigTrimImage;
		var colorSmallTrimImage;
		var vehicleColorTrimName;	
		var vehicleColorTrimPrice;
		
		var imageBigColorTrimHolder = [];
		var imageSmallColorTrimHolder = [];
		var vehicleColorTrimNameHolder = [];
		var vehcileColorTrimPriceHolder = [];
		
		
		var engineVeh;
		var fuelVeh;
		var nameVeh;
		var priceVeh;
		var transVeh;
		var bodyVeh;
		
		var colorname;
		var rgbcol;
		var colorPric;
		var colortype;
		
		
		var getVehicleNum = 0;
		
		var getNumColorVehicle = 0;
		
		//accessories
		
		var accessoryImage;
		var accessoryName;
		var accessoryDesc;
		var accessorySKU;
		var accessoryPrice;
		
		var accessoryImageHolder = [];
		var accessoryNameHolder = [];
		var accessoryDescHolder = [];
		var accessorySKUHolder = [];
		var accessoryPriceHolder = [];
		
		//ringgings
		
		var categoryRig;
		var riggingName;
		var riggingType;
		var riggingprice;
		
		var categoryRigHolder = [];
		var riggingNameHolder = [];
		var riggingTypeHolder = [];
		var riggingpriceHolder = [];
		
		var HTML1 = [];
		
			var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
	
			for(var i = 0; i < engineArrayHolder.length; i++)
			{
				var current = parseFloat(vehiclePriceHolderF[i]);
				var theCurrent = formatNumber(current);
				//var theCurrent = current.toFixed(2);
				HTML.push('<div style="background-color:white !important; box-shadow:none !important;" class="CSSTable" ><table style="width:100%; background-color:white !important; margin-bottom:15px !important; font-weight:normal !important; border:none;"><tr class="gradeA">'
				+' <td style="width:20%; font-weight:normal !important; font-style:italics;"><input type="radio"  name="vehicleF[]" value="' +engineArrayHolder[i]+ ','+vehicleHolderFuelTypeF[i]+ ',' + vehicleNameHolderF[i] + ',' +vehiclePriceHolderF[i]+ ',' +vehicleTransHolderF[i]+ ','+vehicleBodyHolderF[i]+ '">'+ engineArrayHolder[i] + '</input></td>'
				+ '<td style="width:70%; padding-left:10px; font-weight:normal !important; font-style:italics;" valign="middle"><ul><li>'+vehicleNameHolderF[i]+'</li><li>'+vehicleHolderFuelTypeF[i]+ '</li><li>'+vehicleBodyHolderF[i]+ '</li><li>' +vehicleTransHolderF[i]+ '</li></ul></td>'
				+ '<td style="width:20%; font-weight:normal !important; font-style:italic;" valign="middle" align="right">&euro;'+theCurrent+stringInfo+'</td>'+
				'</tr></table></div>');
			}
			
			$('#displayMoters').html(HTML);
			
			if($('#displayMoters').length > 0)
				{
					infoStdHelp();
					var radioButtonVehicleF = $('#displayMoters > div > table > tbody > tr > td > input[name="vehicleF[]"]');
					
					radioButtonVehicleF.on('click', function()
					{
					
						var radiobuttonChecked = $('#displayMoters > div > table > tbody > tr > td > input:radio[name="vehicleF[]"]:checked').val();
						
						if(radiobuttonChecked){
							string1 = radiobuttonChecked;
						}
					
					 var pushArrayHolderVehicle = [];	
					 ArrayHolderVehicle = string1.split(',');
					 
					 pushArrayHolderVehicle.push(ArrayHolderVehicle);
					 
					 engineVeh = ArrayHolderVehicle[0];
					 fuelVeh = ArrayHolderVehicle[1];
					 nameVeh = ArrayHolderVehicle[2];
					 priceVeh = ArrayHolderVehicle[3];
					 transVeh = ArrayHolderVehicle[4];
					 bodyVeh = ArrayHolderVehicle[5];
					 
					$('#columns > div.stepOneClose > a:nth-child(3)').on('click', function(e)
					{
						e.preventDefault();
						$('#navNumbers').removeClass('active');
						$('#navNumbers1').filter('.step2').addClass('active');
						
						$('#navNumbers > img:nth-child(1)').show();
						$('#navNumbers > img:nth-child(2)').hide();
						
						$('#navNumbers1 > img:nth-child(1)').hide();
						$('#navNumbers1 > img:nth-child(2)').show();
						
						$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
						$('#columns > div.stepTwoClose').show("slide", { direction: "right" }, 1000);
						
						$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableA]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableB]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableC]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableD]').unbind('click');	
						
					  if(jsonstr.config.model.grades instanceof Array)
					  {
						GradeB =  jsonstr.config.model.grades[5].grade.gradename['#text'];
						
							 if(jsonstr.config.model.grades[5].grade.vehicles instanceof Array)
							 {
							    for(var i = 0; i < jsonstr.config.model.grades[5].grade.vehicles.length; i++) 
								{
									
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.transmission['#text'];
									
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
												
												if(jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												if(jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[5].grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
												}
													
											    
											//show hide
											showHideEquipment();
											//display equipment
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
											
											//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
												
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
									
								}
					
							}else
							{
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[5].grade.vehicles.vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[5].grade.vehicles.vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[5].grade.vehicles.vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[5].grade.vehicles.vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[5].grade.vehicles.vehicle.transmission['#text'];
									theVehicleBodyB = jsonstr.config.model.grades[5].grade.vehicles.vehicle.doors['#text'];
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[5].grade.vehicles.vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[5].grade.vehicles.vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[5].grade.vehicles.vehicle.colors.color.type['#text'];
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
											
												if(jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[5].grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												
												if(jsonstr.config.model.grades[5].grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[5].grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[5].grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[5].grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[5].grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[5].grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[5].grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[5].grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[5].grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[5].grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
												}
													
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
							}
					 }else 
					 {
					 	
					 }	  
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getmodelname').html(modelsname);
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getgradename').html(GradeB);				
					});
						
				});
				
					
					
			}
			//color forward button;
			stepTwoForwardColors();
			
			//Accessories backwards Button
			stepThreeBackwardsButtonAccessories();
			
			// Accessories Forward Button Step 3
			stepThreeForwardButtonAccessories();  
			 
			//step 4 backwards button summary
			stepFourthBackwardsSummary();
	}

function displayEngineAndMotersGradeG(engineArrayHolder, vehicleNameHolderG, vehicleHolderFuelTypeG, vehiclePriceHolderG, vehicleTransHolderG, vehicleBodyHolderG, categoryVehicle)
	{
		var HTML = [];
		var result;
		var ArrayHolderVehicle = new Array(8);
		
		var imageHolder;
		var vehicleColorName;	
		var rgbColor;
		var colorPrice;
		var colorType;
		
		var stadarPriceVehicle;
		var stadarFuelType;
		var stadarVehicleTrans;
		var stadarVehicleBody;
		
		var GradeB;
		
		var vehicleColorNameHolder = [];
		var vehicleImageHolder = [];
		var vehicleRgbcolor = [];
		var vehicleColorPrice = [];
		var vehicleColorType = [];
		var string1;
		
		var imageBigHolderTrim;
		var imageSmallHolderTrim;
												
		var vehicleTrimName;	
		var vehcileTrimPrice;
		
		var vehicleImageBigTrimHolder = [];
		var vehicleImageSmallTrimHolder = [];
		var vehicleTrimNameHolder = [];
		var vehcileTrimPriceHolder= []; 
		
		var colorBigTrimImage;
		var colorSmallTrimImage;
		var vehicleColorTrimName;	
		var vehicleColorTrimPrice;
		
		var imageBigColorTrimHolder = [];
		var imageSmallColorTrimHolder = [];
		var vehicleColorTrimNameHolder = [];
		var vehcileColorTrimPriceHolder = [];
		
		
		var engineVeh;
		var fuelVeh;
		var nameVeh;
		var priceVeh;
		var transVeh;
		var bodyVeh;
		
		var colorname;
		var rgbcol;
		var colorPric;
		var colortype;
		
		
		var getVehicleNum = 0;
		
		var getNumColorVehicle = 0;
		
		//accessories
		
		var accessoryImage;
		var accessoryName;
		var accessoryDesc;
		var accessorySKU;
		var accessoryPrice;
		
		var accessoryImageHolder = [];
		var accessoryNameHolder = [];
		var accessoryDescHolder = [];
		var accessorySKUHolder = [];
		var accessoryPriceHolder = [];
		
		//ringgings
		
		var categoryRig;
		var riggingName;
		var riggingType;
		var riggingprice;
		
		var categoryRigHolder = [];
		var riggingNameHolder = [];
		var riggingTypeHolder = [];
		var riggingpriceHolder = [];
		
		var HTML1 = [];
		
			var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
	
			for(var i = 0; i < engineArrayHolder.length; i++)
			{
				var current = parseFloat(vehiclePriceHolderG[i]);
				var theCurrent = formatNumber(current);
				//var theCurrent = current.toFixed(2);
				HTML.push('<div style="background-color:white !important; box-shadow:none !important;" class="CSSTable" ><table style="width:100%; background-color:white !important; margin-bottom:15px !important; font-weight:normal !important; border:none;"><tr class="gradeA">'
				+' <td style="width:20%; font-weight:normal !important; font-style:italics;"><input type="radio"  name="vehicleG[]" value="' +engineArrayHolder[i]+ ','+vehicleHolderFuelTypeG[i]+ ',' + vehicleNameHolderG[i] + ',' +vehiclePriceHolderG[i]+ ',' +vehicleTransHolderG[i]+ ','+vehicleBodyHolderG[i]+ '">'+ engineArrayHolder[i] + '</input></td>'
				+ '<td style="width:70%; padding-left:10px; font-weight:normal !important; font-style:italics;" valign="middle"><ul><li>'+vehicleNameHolderG[i]+'</li><li>'+vehicleHolderFuelTypeG[i]+ '</li><li>'+vehicleBodyHolderG[i]+ '</li><li>' +vehicleTransHolderG[i]+ '</li></ul></td>'
				+ '<td style="width:20%; font-weight:normal !important; font-style:italic;" valign="middle" align="right">&euro;'+theCurrent+stringInfo+'</td>'+
				'</tr></table></div>');
			}
			
			$('#displayMoters').html(HTML);
			
			if($('#displayMoters').length > 0)
				{
					infoStdHelp();
					var radioButtonVehicleG = $('#displayMoters > div > table > tbody > tr > td > input[name="vehicleG[]"]');
					
					radioButtonVehicleG.on('click', function()
					{
					
						var radiobuttonChecked = $('#displayMoters > div > table > tbody > tr > td > input:radio[name="vehicleG[]"]:checked').val();
						
						if(radiobuttonChecked){
							string1 = radiobuttonChecked;
						}
					
					 var pushArrayHolderVehicle = [];	
					 ArrayHolderVehicle = string1.split(',');
					 
					 pushArrayHolderVehicle.push(ArrayHolderVehicle);
					 
					 engineVeh = ArrayHolderVehicle[0];
					 fuelVeh = ArrayHolderVehicle[1];
					 nameVeh = ArrayHolderVehicle[2];
					 priceVeh = ArrayHolderVehicle[3];
					 transVeh = ArrayHolderVehicle[4];
					 bodyVeh = ArrayHolderVehicle[5];
					 
					$('#columns > div.stepOneClose > a:nth-child(3)').on('click', function(e)
					{
						e.preventDefault();
						$('#navNumbers').removeClass('active');
						$('#navNumbers1').filter('.step2').addClass('active');
						
						$('#navNumbers > img:nth-child(1)').show();
						$('#navNumbers > img:nth-child(2)').hide();
						
						$('#navNumbers1 > img:nth-child(1)').hide();
						$('#navNumbers1 > img:nth-child(2)').show();
						
						$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
						$('#columns > div.stepTwoClose').show("slide", { direction: "right" }, 1000);
						
						$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableA]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableB]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableC]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableD]').unbind('click');	
						
					  if(jsonstr.config.model.grades instanceof Array)
					  {
						GradeB =  jsonstr.config.model.grades[6].grade.gradename['#text'];
						
							 if(jsonstr.config.model.grades[6].grade.vehicles instanceof Array)
							 {
							    for(var i = 0; i < jsonstr.config.model.grades[6].grade.vehicles.length; i++) 
								{
									
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.transmission['#text'];
									
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
												
												if(jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												
												if(jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															
																	riggingName = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
														
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[6].grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
														
													
												}
													
											   
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
											
											//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
									
								}
					
							}else
							{
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[6].grade.vehicles.vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[6].grade.vehicles.vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[6].grade.vehicles.vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[6].grade.vehicles.vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[6].grade.vehicles.vehicle.transmission['#text'];
									//theVehicleBodyB = jsonstr.config.model.grades[6].grade.vehicles.vehicle.doors['#text'];
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[6].grade.vehicles.vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[6].grade.vehicles.vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[6].grade.vehicles.vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
											
												if(jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[6].grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
												
												if(jsonstr.config.model.grades[6].grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[6].grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[6].grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[6].grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[6].grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[6].grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[6].grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[6].grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[6].grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[6].grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];

															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
													
												}
													
												
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
							}
					 }else 
					 {
					 	
					 }	  
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getmodelname').html(modelsname);
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getgradename').html(GradeB);				
					});
						
				});
				
					
					
			}
			//color forward button;
			stepTwoForwardColors();
			
			//Accessories backwards Button
			stepThreeBackwardsButtonAccessories();
			
			// Accessories Forward Button Step 3
			stepThreeForwardButtonAccessories(); 
			 
			//step 4 backwards button summary
			stepFourthBackwardsSummary();
	}

function displayEngineAndMotersGradeH(engineArrayHolder, vehicleNameHolderH, vehicleHolderFuelTypeH, vehiclePriceHolderH, vehicleTransHolderH, vehicleBodyHolderH, categoryVehicle)
	{
		var HTML = [];
		var result;
		var ArrayHolderVehicle = new Array(8);
		
		var imageHolder;
		var vehicleColorName;	
		var rgbColor;
		var colorPrice;
		var colorType;
		
		var stadarPriceVehicle;
		var stadarFuelType;
		var stadarVehicleTrans;
		var stadarVehicleBody;
		
		var GradeB;
		
		var vehicleColorNameHolder = [];
		var vehicleImageHolder = [];
		var vehicleRgbcolor = [];
		var vehicleColorPrice = [];
		var vehicleColorType = [];
		var string1;
		
		var imageBigHolderTrim;
		var imageSmallHolderTrim;
												
		var vehicleTrimName;	
		var vehcileTrimPrice;
		
		var vehicleImageBigTrimHolder = [];
		var vehicleImageSmallTrimHolder = [];
		var vehicleTrimNameHolder = [];
		var vehcileTrimPriceHolder= []; 
		
		var colorBigTrimImage;
		var colorSmallTrimImage;
		var vehicleColorTrimName;	
		var vehicleColorTrimPrice;
		
		var imageBigColorTrimHolder = [];
		var imageSmallColorTrimHolder = [];
		var vehicleColorTrimNameHolder = [];
		var vehcileColorTrimPriceHolder = [];
		
		
		var engineVeh;
		var fuelVeh;
		var nameVeh;
		var priceVeh;
		var transVeh;
		var bodyVeh;
		
		var colorname;
		var rgbcol;
		var colorPric;
		var colortype;
		
		
		var getVehicleNum = 0;
		
		var getNumColorVehicle = 0;
		
		//accessories
		
		var accessoryImage;
		var accessoryName;
		var accessoryDesc;
		var accessorySKU;
		var accessoryPrice;
		
		var accessoryImageHolder = [];
		var accessoryNameHolder = [];
		var accessoryDescHolder = [];
		var accessorySKUHolder = [];
		var accessoryPriceHolder = [];
		
		//ringgings
		
		var categoryRig;
		var riggingName;
		var riggingType;
		var riggingprice;
		
		var categoryRigHolder = [];
		var riggingNameHolder = [];
		var riggingTypeHolder = [];
		var riggingpriceHolder = [];
		
		var HTML1 = [];
		
			var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
	
			for(var i = 0; i < engineArrayHolder.length; i++)
			{
				var current = parseFloat(vehiclePriceHolderH[i]);
				var theCurrent = formatNumber(current);
				//var theCurrent = current.toFixed(2);
				HTML.push('<div style="background-color:white !important; box-shadow:none !important;" class="CSSTable" ><table style="width:100%; background-color:white !important; margin-bottom:15px !important; font-weight:normal !important; border:none;"><tr class="gradeA">'
				+' <td style="width:20%; font-weight:normal !important; font-style:italics;"><input type="radio"  name="vehicleH[]" value="' +engineArrayHolder[i]+ ','+vehicleHolderFuelTypeH[i]+ ',' + vehicleNameHolderH[i] + ',' +vehiclePriceHolderH[i]+ ',' +vehicleTransHolderH[i]+ ','+vehicleBodyHolderH[i]+ '">'+ engineArrayHolder[i] + '</input></td>'
				+ '<td style="width:70%; padding-left:10px; font-weight:normal !important; font-style:italics;" valign="middle"><ul><li>'+vehicleNameHolderH[i]+'</li><li>'+vehicleHolderFuelTypeH[i]+ '</li><li>'+vehicleBodyHolderH[i]+ '</li><li>' +vehicleTransHolderH[i]+ '</li></ul></td>'
				+ '<td style="width:20%; font-weight:normal !important; font-style:italic;" valign="middle" align="right">&euro;'+theCurrent+stringInfo+'</td>'+
				'</tr></table></div>');
			}
			
			$('#displayMoters').html(HTML);
			
			if($('#displayMoters').length > 0)
				{
					infoStdHelp();
					var radioButtonVehicleG = $('#displayMoters > div > table > tbody > tr > td > input[name="vehicleH[]"]');
					
					radioButtonVehicleG.on('click', function()
					{
					
						var radiobuttonChecked = $('#displayMoters > div > table > tbody > tr > td > input:radio[name="vehicleH[]"]:checked').val();
						
						if(radiobuttonChecked){
							string1 = radiobuttonChecked;
						}
					
					 var pushArrayHolderVehicle = [];	
					 ArrayHolderVehicle = string1.split(',');
					 
					 pushArrayHolderVehicle.push(ArrayHolderVehicle);
					 
					 engineVeh = ArrayHolderVehicle[0];
					 fuelVeh = ArrayHolderVehicle[1];
					 nameVeh = ArrayHolderVehicle[2];
					 priceVeh = ArrayHolderVehicle[3];
					 transVeh = ArrayHolderVehicle[4];
					 bodyVeh = ArrayHolderVehicle[5];
					 
					$('#columns > div.stepOneClose > a:nth-child(3)').on('click', function(e)
					{
						e.preventDefault();
						$('#navNumbers').removeClass('active');
						$('#navNumbers1').filter('.step2').addClass('active');
						
						$('#navNumbers > img:nth-child(1)').show();
						$('#navNumbers > img:nth-child(2)').hide();
						
						$('#navNumbers1 > img:nth-child(1)').hide();
						$('#navNumbers1 > img:nth-child(2)').show();
						
						$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
						$('#columns > div.stepTwoClose').show("slide", { direction: "right" }, 1000);
						
						$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableA]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableB]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableC]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableD]').unbind('click');	
						
					  if(jsonstr.config.model.grades instanceof Array)
					  {
						GradeB =  jsonstr.config.model.grades[7].grade.gradename['#text'];
						
							 if(jsonstr.config.model.grades[7].grade.vehicles instanceof Array)
							 {
							    for(var i = 0; i < jsonstr.config.model.grades[7].grade.vehicles.length; i++) 
								{
									
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.transmission['#text'];
									
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
												
												if(jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												
												if(jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															
																	riggingName = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
														
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[7].grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
														
													
												}
													
											   
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
											
											//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
									
								}
					
							}else
							{
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[7].grade.vehicles.vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[7].grade.vehicles.vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[7].grade.vehicles.vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[7].grade.vehicles.vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[7].grade.vehicles.vehicle.transmission['#text'];
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[7].grade.vehicles.vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[7].grade.vehicles.vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[7].grade.vehicles.vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
											
												if(jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[7].grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
												
												if(jsonstr.config.model.grades[7].grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[7].grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[7].grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[7].grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[7].grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[7].grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[7].grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[7].grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[7].grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[7].grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];

															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
													
												}
													
												
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
							}
					 }else 
					 {
					 	
					 }	  
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getmodelname').html(modelsname);
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getgradename').html(GradeB);				
					});
						
				});
				
					
					
			}
			//color forward button;
			stepTwoForwardColors();
			
			//Accessories backwards Button
			stepThreeBackwardsButtonAccessories();
			
			// Accessories Forward Button Step 3
			stepThreeForwardButtonAccessories();
			 
			//step 4 backwards button summary
			stepFourthBackwardsSummary();	
	}

function displayEngineAndMotersGradeI(engineArrayHolder, vehicleNameHolderG, vehicleHolderFuelTypeG, vehiclePriceHolderG, vehicleTransHolderG, vehicleBodyHolderG, categoryVehicle)
	{
		var HTML = [];
		var result;
		var ArrayHolderVehicle = new Array(8);
		
		var imageHolder;
		var vehicleColorName;	
		var rgbColor;
		var colorPrice;
		var colorType;
		
		var stadarPriceVehicle;
		var stadarFuelType;
		var stadarVehicleTrans;
		var stadarVehicleBody;
		
		var GradeB;
		
		var vehicleColorNameHolder = [];
		var vehicleImageHolder = [];
		var vehicleRgbcolor = [];
		var vehicleColorPrice = [];
		var vehicleColorType = [];
		var string1;
		
		var imageBigHolderTrim;
		var imageSmallHolderTrim;
												
		var vehicleTrimName;	
		var vehcileTrimPrice;
		
		var vehicleImageBigTrimHolder = [];
		var vehicleImageSmallTrimHolder = [];
		var vehicleTrimNameHolder = [];
		var vehcileTrimPriceHolder= []; 
		
		var colorBigTrimImage;
		var colorSmallTrimImage;
		var vehicleColorTrimName;	
		var vehicleColorTrimPrice;
		
		var imageBigColorTrimHolder = [];
		var imageSmallColorTrimHolder = [];
		var vehicleColorTrimNameHolder = [];
		var vehcileColorTrimPriceHolder = [];
		
		
		var engineVeh;
		var fuelVeh;
		var nameVeh;
		var priceVeh;
		var transVeh;
		var bodyVeh;
		
		var colorname;
		var rgbcol;
		var colorPric;
		var colortype;
		
		
		var getVehicleNum = 0;
		
		var getNumColorVehicle = 0;
		
		//accessories
		
		var accessoryImage;
		var accessoryName;
		var accessoryDesc;
		var accessorySKU;
		var accessoryPrice;
		
		var accessoryImageHolder = [];
		var accessoryNameHolder = [];
		var accessoryDescHolder = [];
		var accessorySKUHolder = [];
		var accessoryPriceHolder = [];
		
		//ringgings
		
		var categoryRig;
		var riggingName;
		var riggingType;
		var riggingprice;
		
		var categoryRigHolder = [];
		var riggingNameHolder = [];
		var riggingTypeHolder = [];
		var riggingpriceHolder = [];
		
		var HTML1 = [];
		
			var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
	
			for(var i = 0; i < engineArrayHolder.length; i++)
			{
				var current = parseFloat(vehiclePriceHolderG[i]);
				var theCurrent = formatNumber(current);
				//var theCurrent = current.toFixed(2);
				HTML.push('<div style="background-color:white !important; box-shadow:none !important;" class="CSSTable" ><table style="width:100%; background-color:white !important; margin-bottom:15px !important; font-weight:normal !important; border:none;"><tr class="gradeA">'
				+' <td style="width:20%; font-weight:normal !important; font-style:italics;"><input type="radio"  name="vehicleI[]" value="' +engineArrayHolder[i]+ ','+vehicleHolderFuelTypeG[i]+ ',' + vehicleNameHolderG[i] + ',' +vehiclePriceHolderG[i]+ ',' +vehicleTransHolderG[i]+ ','+vehicleBodyHolderG[i]+ '">'+ engineArrayHolder[i] + '</input></td>'
				+ '<td style="width:70%; padding-left:10px; font-weight:normal !important; font-style:italics;" valign="middle"><ul><li>'+vehicleNameHolderG[i]+'</li><li>'+vehicleHolderFuelTypeG[i]+ '</li><li>'+vehicleBodyHolderG[i]+ '</li><li>' +vehicleTransHolderG[i]+ '</li></ul></td>'
				+ '<td style="width:20%; font-weight:normal !important; font-style:italic;" valign="middle" align="right">&euro;'+theCurrent+stringInfo+'</td>'+
				'</tr></table></div>');
			}
			
			$('#displayMoters').html(HTML);
			
			if($('#displayMoters').length > 0)
				{
					infoStdHelp();
					var radioButtonVehicleG = $('#displayMoters > div > table > tbody > tr > td > input[name="vehicleI[]"]');
					
					radioButtonVehicleG.on('click', function()
					{
					
						var radiobuttonChecked = $('#displayMoters > div > table > tbody > tr > td > input:radio[name="vehicleI[]"]:checked').val();
						
						if(radiobuttonChecked){
							string1 = radiobuttonChecked;
						}
					
					 var pushArrayHolderVehicle = [];	
					 ArrayHolderVehicle = string1.split(',');
					 
					 pushArrayHolderVehicle.push(ArrayHolderVehicle);
					 
					 engineVeh = ArrayHolderVehicle[0];
					 fuelVeh = ArrayHolderVehicle[1];
					 nameVeh = ArrayHolderVehicle[2];
					 priceVeh = ArrayHolderVehicle[3];
					 transVeh = ArrayHolderVehicle[4];
					 bodyVeh = ArrayHolderVehicle[5];
					 
					$('#columns > div.stepOneClose > a:nth-child(3)').on('click', function(e)
					{
						e.preventDefault();
						$('#navNumbers').removeClass('active');
						$('#navNumbers1').filter('.step2').addClass('active');
						
						$('#navNumbers > img:nth-child(1)').show();
						$('#navNumbers > img:nth-child(2)').hide();
						
						$('#navNumbers1 > img:nth-child(1)').hide();
						$('#navNumbers1 > img:nth-child(2)').show();
						
						$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
						$('#columns > div.stepTwoClose').show("slide", { direction: "right" }, 1000);
						
						$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableA]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableB]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableC]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableD]').unbind('click');	
						
					  if(jsonstr.config.model.grades instanceof Array)
					  {
						GradeB =  jsonstr.config.model.grades[8].grade.gradename['#text'];
						
							 if(jsonstr.config.model.grades[8].grade.vehicles instanceof Array)
							 {
							    for(var i = 0; i < jsonstr.config.model.grades[8].grade.vehicles.length; i++) 
								{
									
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.transmission['#text'];
									
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.doors['#text'];	
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
												
												if(jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												
												if(jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															
																	riggingName = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
														
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[8].grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
														
													
												}
													
											   
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
											
											//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
									
								}
					
							}else
							{
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[8].grade.vehicles.vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[8].grade.vehicles.vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[8].grade.vehicles.vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[8].grade.vehicles.vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[8].grade.vehicles.vehicle.transmission['#text'];
									
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[8].grade.vehicles.vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[8].grade.vehicles.vehicle.doors['#text'];
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[8].grade.vehicles.vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
											
												if(jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[8].grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
												
												if(jsonstr.config.model.grades[8].grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[8].grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[8].grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[8].grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[8].grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[8].grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[8].grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[8].grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[8].grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[8].grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];

															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
													
												}
													
												
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
							}
					 }else 
					 {
					 	
					 }	  
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getmodelname').html(modelsname);
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getgradename').html(GradeB);				
					});
						
				});
				
					
					
			}
			//color forward button;
			stepTwoForwardColors();
			
			//Accessories backwards Button
			stepThreeBackwardsButtonAccessories();
			
			// Accessories Forward Button Step 3
			stepThreeForwardButtonAccessories();
			 
			//step 4 backwards button summary
			stepFourthBackwardsSummary();	
	}		

function displayEngineAndMotersGradeJ(engineArrayHolder, vehicleNameHolderG, vehicleHolderFuelTypeG, vehiclePriceHolderG, vehicleTransHolderG, vehicleBodyHolderG, categoryVehicle)
	{
		var HTML = [];
		var result;
		var ArrayHolderVehicle = new Array(8);
		
		var imageHolder;
		var vehicleColorName;	
		var rgbColor;
		var colorPrice;
		var colorType;
		
		var stadarPriceVehicle;
		var stadarFuelType;
		var stadarVehicleTrans;
		var stadarVehicleBody;
		
		var GradeB;
		
		var vehicleColorNameHolder = [];
		var vehicleImageHolder = [];
		var vehicleRgbcolor = [];
		var vehicleColorPrice = [];
		var vehicleColorType = [];
		var string1;
		
		var imageBigHolderTrim;
		var imageSmallHolderTrim;
												
		var vehicleTrimName;	
		var vehcileTrimPrice;
		
		var vehicleImageBigTrimHolder = [];
		var vehicleImageSmallTrimHolder = [];
		var vehicleTrimNameHolder = [];
		var vehcileTrimPriceHolder= []; 
		
		var colorBigTrimImage;
		var colorSmallTrimImage;
		var vehicleColorTrimName;	
		var vehicleColorTrimPrice;
		
		var imageBigColorTrimHolder = [];
		var imageSmallColorTrimHolder = [];
		var vehicleColorTrimNameHolder = [];
		var vehcileColorTrimPriceHolder = [];
		
		
		var engineVeh;
		var fuelVeh;
		var nameVeh;
		var priceVeh;
		var transVeh;
		var bodyVeh;
		
		var colorname;
		var rgbcol;
		var colorPric;
		var colortype;
		
		
		var getVehicleNum = 0;
		
		var getNumColorVehicle = 0;
		
		//accessories
		
		var accessoryImage;
		var accessoryName;
		var accessoryDesc;
		var accessorySKU;
		var accessoryPrice;
		
		var accessoryImageHolder = [];
		var accessoryNameHolder = [];
		var accessoryDescHolder = [];
		var accessorySKUHolder = [];
		var accessoryPriceHolder = [];
		
		//ringgings
		
		var categoryRig;
		var riggingName;
		var riggingType;
		var riggingprice;
		
		var categoryRigHolder = [];
		var riggingNameHolder = [];
		var riggingTypeHolder = [];
		var riggingpriceHolder = [];
		
		var HTML1 = [];
		
			var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
	
			for(var i = 0; i < engineArrayHolder.length; i++)
			{
				var current = parseFloat(vehiclePriceHolderG[i]);
				var theCurrent = formatNumber(current);
				//var theCurrent = current.toFixed(2);
				HTML.push('<div style="background-color:white !important; box-shadow:none !important;" class="CSSTable" ><table style="width:100%; background-color:white !important; margin-bottom:15px !important; font-weight:normal !important; border:none;"><tr class="gradeA">'
				+' <td style="width:20%; font-weight:normal !important; font-style:italics;"><input type="radio"  name="vehicleJ[]" value="' +engineArrayHolder[i]+ ','+vehicleHolderFuelTypeG[i]+ ',' + vehicleNameHolderG[i] + ',' +vehiclePriceHolderG[i]+ ',' +vehicleTransHolderG[i]+ ','+vehicleBodyHolderG[i]+ '">'+ engineArrayHolder[i] + '</input></td>'
				+ '<td style="width:70%; padding-left:10px; font-weight:normal !important; font-style:italics;" valign="middle"><ul><li>'+vehicleNameHolderG[i]+'</li><li>'+vehicleHolderFuelTypeG[i]+ '</li><li>'+vehicleBodyHolderG[i]+ '</li><li>' +vehicleTransHolderG[i]+ '</li></ul></td>'
				+ '<td style="width:20%; font-weight:normal !important; font-style:italic;" valign="middle" align="right">&euro;'+theCurrent+stringInfo+'</td>'+
				'</tr></table></div>');
			}
			
			$('#displayMoters').html(HTML);
			
			if($('#displayMoters').length > 0)
				{
					infoStdHelp();
					var radioButtonVehicleG = $('#displayMoters > div > table > tbody > tr > td > input[name="vehicleJ[]"]');
					
					radioButtonVehicleG.on('click', function()
					{
					
						var radiobuttonChecked = $('#displayMoters > div > table > tbody > tr > td > input:radio[name="vehicleJ[]"]:checked').val();
						
						if(radiobuttonChecked){
							string1 = radiobuttonChecked;
						}
					
					 var pushArrayHolderVehicle = [];	
					 ArrayHolderVehicle = string1.split(',');
					 
					 pushArrayHolderVehicle.push(ArrayHolderVehicle);
					 
					 engineVeh = ArrayHolderVehicle[0];
					 fuelVeh = ArrayHolderVehicle[1];
					 nameVeh = ArrayHolderVehicle[2];
					 priceVeh = ArrayHolderVehicle[3];
					 transVeh = ArrayHolderVehicle[4];
					 bodyVeh = ArrayHolderVehicle[5];
					 
					$('#columns > div.stepOneClose > a:nth-child(3)').on('click', function(e)
					{
						e.preventDefault();
						$('#navNumbers').removeClass('active');
						$('#navNumbers1').filter('.step2').addClass('active');
						
						$('#navNumbers > img:nth-child(1)').show();
						$('#navNumbers > img:nth-child(2)').hide();
						
						$('#navNumbers1 > img:nth-child(1)').hide();
						$('#navNumbers1 > img:nth-child(2)').show();
						
						$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
						$('#columns > div.stepTwoClose').show("slide", { direction: "right" }, 1000);
						
						$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableA]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableB]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableC]').unbind('click');
			 			$('#columns > div.stepThirdClose').find('#dividetwo > header[data-toggle-trigger=tableD]').unbind('click');	
						
					  if(jsonstr.config.model.grades instanceof Array)
					  {
						GradeB =  jsonstr.config.model.grades[9].grade.gradename['#text'];
						
							 if(jsonstr.config.model.grades[9].grade.vehicles instanceof Array)
							 {
							    for(var i = 0; i < jsonstr.config.model.grades[9].grade.vehicles.length; i++) 
								{
									
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.transmission['#text'];
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.doors['#text'];
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
												
												if(jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
												
												if(jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															
																	riggingName = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
														
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[9].grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
														
													
												}
													
											   
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											//getTestColorTrimValues(jsonstr, colorname, rgbcol, colorPric, colortype);
											
											//getColorTrimValues(jsonstr, getVehicleNum, getNumColorVehicle, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);					
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
									
								}
					
							}else
							{
									getVehicleNum = i;
									theVehicleFuelTypeB = jsonstr.config.model.grades[9].grade.vehicles.vehicle.fuel['#text'];
									theVehiclePriceB = jsonstr.config.model.grades[9].grade.vehicles.vehicle.price['#text'];
									theVehicleNameB = jsonstr.config.model.grades[9].grade.vehicles.vehicle.name['#text'];
									theVehicleEngineB = jsonstr.config.model.grades[9].grade.vehicles.vehicle.engine['#text'].toString();
									theVehicleTransmissionB = jsonstr.config.model.grades[9].grade.vehicles.vehicle.transmission['#text'];
									
									
									if(categoryVehicle == 'lcvs')
									{
										theVehicleBodyB = jsonstr.config.model.grades[9].grade.vehicles.vehicle.body['#text'];
									}
									else{
										theVehicleBodyB = jsonstr.config.model.grades[9].grade.vehicles.vehicle.doors['#text'];
									}
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{
										
										stadarPriceVehicle = theVehiclePriceB;
										stadarVehicleName = theVehicleNameB;
										stadarVehicleEngine  = theVehicleEngineB;
										stadarFuelType = theVehicleFuelTypeB;
										stadarVehicleTrans = theVehicleTransmissionB;
										stadarVehicleBody = theVehicleBodyB;
										
										
										if(jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors instanceof Array)
												{
													for(var j = 0; j < jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors.length; j++)
													{
															
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors[j].color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
																											
													}
												}else
												{
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades[9].grade.vehicles.vehicle.colors.color.type['#text'];
															
															ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
															
															/*
															 *Test Here.... 
															 */
															
															colorname = vehicleColorName;
															rgbcol = rgbColor;
															colorPric = colorPrice;
															colortype = colorType;
															
															
															//empty String array before looping again.
															
															vehicleImageHolder.push(imageHolder);
															vehicleColorNameHolder.push(vehicleColorName);
															vehicleRgbcolor.push(rgbColor);
															vehicleColorPrice.push(colorPrice);
															vehicleColorType.push(colorType);
															/*
															 * End Test.....
															 */
													
												}
											
												if(jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryimagefull; 
																accessoryName = jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryimagefull;
																accessoryName = jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[9].grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
												
												if(jsonstr.config.model.grades[9].grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[9].grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[9].grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[9].grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[9].grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[9].grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[9].grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingName = jsonstr.config.model.grades[9].grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
															riggingType = jsonstr.config.model.grades[9].grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
															riggingprice = jsonstr.config.model.grades[9].grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];

															riggingNameHolder.push(riggingName);
															riggingTypeHolder.push(riggingType);
															riggingpriceHolder.push(riggingprice);
															
													
												}
													
												
											//show hide
											showHideEquipment();
											
											displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											//display color images
											displayGradeVehicleDetailsSummary(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											displayGradeVehicleDetailsNavC(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											displayGradeVehicleDetailsFeedback(GradeB, stadarVehicleName, stadarVehicleEngine, stadarFuelType, stadarVehicleTrans, stadarVehicleBody);
											
											drawRgbColorsC(stadarPriceVehicle, jsonstr, getVehicleNum, getNumColorVehicle, vehicleImageHolder, vehicleColorNameHolder, vehicleRgbcolor, vehicleColorPrice, vehicleColorType,
												engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
											
											var totalColorPrice = $('#columns > div.stepThirdClose').find('#mainContentconf').find('#totalPrice').val();
											
											drawTableAccessoryC(accessoryImageHolder, stadarPriceVehicle, accessorySKUHolder, accessoryNameHolder, accessoryDescHolder, accessoryPriceHolder);
											
											infoStdHelp();
											
											HTML1.splice(0, HTML1.length);
											vehicleImageHolder.splice(0, vehicleImageHolder.length);
											vehicleColorNameHolder.splice(0, vehicleColorNameHolder.length);
											vehicleRgbcolor.splice(0, vehicleRgbcolor.length);
											vehicleColorPrice.splice(0, vehicleColorPrice.length);
											vehicleColorType.splice(0, vehicleColorType.length);
											
											accessoryImageHolder.splice(0, accessoryImageHolder.length);
											accessoryNameHolder.splice(0, accessoryNameHolder.length);
											accessoryDescHolder.splice(0, accessoryDescHolder.length);
											accessorySKUHolder.splice(0, accessorySKUHolder.length);
											accessoryPriceHolder.splice(0, accessoryPriceHolder.length);
											
											//displayEquipment(categoryRigHolder, riggingNameHolder, riggingTypeHolder, riggingpriceHolder);
											
											categoryRigHolder.splice(0, categoryRigHolder.length);
											riggingNameHolder.splice(0, riggingNameHolder.length);
											riggingTypeHolder.splice(0, riggingTypeHolder.length);
											riggingpriceHolder.splice(0, riggingpriceHolder.length);
											
									}
							}
					 }else 
					 {
					 	
					 }	  
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getmodelname').html(modelsname);
							$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(3) > td > span.getgradename').html(GradeB);				
					});
						
				});
				
					
					
			}
			//color forward button;
			stepTwoForwardColors();
			
			//Accessories backwards Button
			stepThreeBackwardsButtonAccessories();
			
			// Accessories Forward Button Step 3
			stepThreeForwardButtonAccessories();
			 
			//step 4 backwards button summary
			stepFourthBackwardsSummary();
	}	
	
/*
 * Start Function for Grade A
 */	

function drawTrimVehiclesA(vehicleImageBigTrimHolder, TotalVehicleColorSum, vehicleImageSmallTrimHolder, vehicleTrimNameHolder, vehcileTrimPriceHolder)
	{
		
		var HTML = [];
		var HTML1 = [];
		for(var i = 0; i < vehicleTrimNameHolder.length; i++)
		{
			//data-price="'+vehicleColorPriceB[i]+'"
				
				HTML.push('<img data-num="'+i+'" data-name="'+vehicleTrimNameHolder[i]+'" data-price="'+vehcileTrimPriceHolder[i]+'" style="width:300px; height:350px;" alt="'+vehicleTrimNameHolder[i]+'" src="'+ vehicleImageBigTrimHolder[i] +'" />');
				HTML1.push('<div class="checkTrim"><img data-num="'+i+'" data-price="'+vehcileTrimPriceHolder[i]+'" style="width:21px; height:21px !important;" alt="'+vehicleTrimNameHolder[i]+'" src="'+ vehicleImageSmallTrimHolder[i] +'" />'
				+'<br><input class="trim" name="trim[]" type="radio" value="'+ vehicleTrimNameHolder[i] + '" /></div>');
		}
		
		$('#bigImgTrim').html(HTML);
		$('#smImgTrim').html(HTML1);
		
		displayTrimA(vehicleTrimNameHolder, TotalVehicleColorSum, vehcileTrimPriceHolder);
		//displaySummaryA(PriceVehicle);
		
	}
	
	function displayTrimA(vehicleTrimNameHolder, TotalVehicleColorSum, vehcileTrimPriceHolder)
	{
		
		$('#bigImgTrim > img').hide();
		//$('#bigImgTrim > img:nth-child(1)').show();
		$('#smImgTrim > div > input:radio[name="trim[]"]').prop('checked', true);
		
		var trimI;
		var trimN;
		var trimP = 0;
		
		var check = $('#smImgTrim > div > input:radio[name="trim[]"]:checked');
		var checkedValue = $('#smImgTrim > div > input:radio[name="trim[]"]:checked').val();
		
		trimN = check.attr('data-name');
		trimP = check.attr('data-price');
		
		$('#bigImgTrim > img').each(function()
			{
				var bigImage = $(this).attr('data-name');
				
						if(checkedValue == bigImage)
						{
							$(this).show();
							
							trimN = $(this).attr('data-name');
							trimP = $(this).attr('data-price');
							
						}else
						{
							$(this).hide();
						}
					
			});
		
		var TotalS = calculateColorAndTrim(TotalVehicleColorSum, trimP);
		displayTrimNameA(trimN, trimP);
			
		displayTotal(TotalS, trimN);
			
		displaySummaryTrimNameTotalSum(trimN, TotalVehicleColorSum, trimP);
		
		
		var trimName;
		var trimPrice = 0;
		
		$('#smImgTrim > div > input:radio[name="trim[]"]').on('click', function()
		{
			var radioValueTrim = $(this).val();
			$('#bigImgTrim > img').each(function()
			{
				var bigImage = $(this).attr('data-name');
				
						if(radioValueTrim == bigImage)
						{
							$(this).show();
							trimName = $(this).attr('data-name');
							trimPrice = $(this).attr('data-price');
							
						}else
						{
							$(this).hide();
						}
					
			});
			
			//calcPricewithColor(PriceVehicle, colorPrice);
			var TotalSum = calculateColorAndTrim(TotalVehicleColorSum, trimPrice);
			displayTrimNameA(trimName, trimPrice);
			
			displayTotal(TotalSum, trimName);
			
			displaySummaryTrimNameTotalSum(trimName, TotalVehicleColorSum, trimPrice);
			
		});
	}
	
	function displayTotal(TotalSum, trimName)
	{
		$('#navcontainer > div.right > div.infoModelColorNav').html('<h2>Ταπετσαρία: '+trimName+'</h2><!--<p style=" display:none; margin-top:10px;">ΣΥΝΟΛΙΚΗ ΤΙΜΗ : &euro;'+ TotalSum + '</p>-->');
	}
	
	function displayTrimNameA(vehicleTrimNameHolder, vehcileTrimPriceHolder)
	{
		
		$('#dividetwo > div.infoModeldetails').html('<p>ΤΑΠΕΤΣΑΡΙΑ: '+vehicleTrimNameHolder+'</p>');
	}
	
	function calculateColorAndTrimA(TotalVehicleColorSum, trimPrice)
	{
		var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
		var HTML2 = [];
		var sum = parseInt(TotalVehicleColorSum) + parseInt(trimPrice);
		
		var theCurrent = formatNumber(sum);
		$('#dividetwo > div.infoModelColorTrim').html('<p>ΣΥΝΟΛΙΚΗ ΤΙΜΗ ΧΡΩΜΑΤΟΣ ΚΑΙ ΤΑΠΕΤΣΑΡΙΑΣ: &euro;'+TotalVehicleColorSum+' + &euro;'+trimPrice+' = &euro;'+ theCurrent + stringInfo+'</p>');
		
		infoStdHelp();
		return sum;
	}
	
	function displaySummaryTrimNameTotalSum(vehicleTrimNameHolder, TotalVehicleColorSum, trimPrice)
	{
		var sum = parseInt(TotalVehicleColorSum) + parseInt(trimPrice);
		$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo > div.summaryDetails > div.infoModelColorTrim').html('<h2 style="font-size:16px;">ΤΑΠΕΤΣΑΡΙΑ: '+vehicleTrimNameHolder+'</h2><!--<p>ΣΥΝΟΛΙΚΗ ΤΙΜΗ: &euro;'+ sum + '</p>-->');
	}
	
	//Display Colors
	//Display Colors
	function drawRgbColorsA(PriceVehicle, jsonstr, getVehicleNumber, getNumColorVehicle, vehicleImageHolderB, vehicleColorNameHolderB, vehicleRgbcolorB, vehicleColorPriceB, vehicleColorTypeB,
		engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh)
	{
		var HTML = [];
		var HTML1 = [];
		var HTML2 = [];
		var HTML4 = [];
		var HTML5 = [];
		var HTML6 = [];
		
		/*
		 * 
		 * var HTML6 = [];
		 * HTML6.push('<img data-num="'+i+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:213px; heigth:160px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
		 * $('#bigImgFeed').html(HTML6);
		 * displayRgbColorFeedback(); 
		 * 
		 */
		 
		for(var i = 0; i < vehicleColorNameHolderB.length; i++)
		{
			//data-price="'+vehicleColorPriceB[i]+'"
			HTML.push('<img data-num="'+i+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:92px; heigth:69px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML1.push('<img data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:451px; heigth:338px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML2.push('<div class="checkRgb"><div data-rgb="'+vehicleRgbcolorB[i]+'" data-name="'+vehicleColorNameHolderB[i]+'" class="rgbstyling" style="background-color:'+vehicleRgbcolorB[i]+'"></div>'
			+'<br><input data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgbs="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'"   class="rgb" name="rgb[]" type="radio" value="'+ vehicleRgbcolorB[i] + '" /></div>');	
			
			HTML4.push('<img data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:850px; margin-bottom:10px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML5.push('<img style="width:300px; height:225px;" data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML6.push('<img data-num="'+i+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:213px; heigth:160px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
		}
		
		$('#navcontainer > div.right > div.leftEnd').html(HTML);
		$('#bigImg').html(HTML1);
		$('#rgbcolor').html(HTML2);
		
		$('#columns > div.stepThirdClose').find('#dividetwo').find('#bigImg').html(HTML4);
		
		//HTML5.push('<img style="width:300px; height:225px;" data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
		//$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(2) > td.getmodelname').html(HTML5);
		//displayRgbColorInsummary(jsonstr);
		
		
		$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(2) > td.getmodelname').html(HTML5);
		
		$('#bigImgFeed').html(HTML6);
		displayRgbColorNavA();
		
		displayRgbColorFeedback();
		
		displayRgbColorInsummary(jsonstr);
		
		//displaySummaryA(PriceVehicle);
		displayRgbColorA(PriceVehicle, jsonstr, getVehicleNumber, getNumColorVehicle, vehicleImageHolderB, vehicleColorNameHolderB, vehicleRgbcolorB, vehicleColorPriceB, vehicleColorTypeB,
			engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);	
		
	}
	
	
	function displayRgbColorA(PriceVehicle, jsonstr, getVehicleNumber, getNumColorVehicle, vehicleImageHolderB, 
		vehicleColorNameHolderB, vehicleRgbcolorB, vehicleColorPriceB, vehicleColorTypeB, 
		engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh)
	{
		$('#bigImg > img').hide();
		//$('#bigImg > img:nth-child(1)').show();
		$('#rgbcolor > div > input:radio[name="rgb[]"]').prop('checked', true);
		
		var colorI;
		var colorN;
		var colorR;
		var colorT;
		var colorP = 0;
		var TOTAL = 0;
		
		var check = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
		var checkedValue = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
		var checkedTypeValue = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
		
		colorR = check.attr('data-rgbs');
		colorN = check.attr('data-name');
		colorT = check.attr('data-type');
		colorP = check.attr('data-price');
		
		$('#bigImg > img').each(function()
			{
			    	var bigImage = $(this).attr('data-rgb');
			    	var dataType = $(this).attr('data-type');
					
					if(checkedValue == bigImage && checkedTypeValue == dataType)
					{
						colorI = $(this);
						colorI.show();			
					}else
					{
						$(this).hide();
					}
			});
		
		TOTAL  = calcPricewithColorA(PriceVehicle, colorP);
			
		//getColorTrimValuesA(jsonstr, TOTAL, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
			
		displayColorName(colorN, colorT, TOTAL);	
			
		displaySummarycolorNameTotalSum(colorN, colorT, TOTAL);
		
		getColorPriceAndTotalAppendTolastStep(colorP, PriceVehicle, TOTAL);
		
		infoStdHelp();
		
		var colorImage;
		var colorName;
		var colortype;
		var colorRgb;
		var colorPrice = 0;
		var totalSumForSummary = 0;
				
		$('#rgbcolor > div > input:radio[name="rgb[]"]').on('click', function()
		{
			
				var radioValueRgb = $(this).val();
				var radioDataType = $(this).attr('data-type');
				
				$('#bigImg > img').each(function()
				{
					var bigImage = $(this).attr('data-rgb');
					var dataPrice = $(this).attr('data-price');
					var dataType = $(this).attr('data-type');
					
						   if(radioValueRgb == bigImage && radioDataType == dataType)
						   {	
								colorImage = $(this);
								
								colorImage.show();
								colorRgb = $(this).attr('data-rgb');
								colorName = $(this).attr('data-name');
								colortype = $(this).attr('data-type');
								colorPrice = $(this).attr('data-price');
								colorVehicleNumber = $(this).attr('data-num');
								
								totalSumForSummary = calcPricewithColorA(PriceVehicle, colorPrice);
								
							if($('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').length > 0)
								{		
									//$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table > tbody > tr:nth-child(2)')
									//.html('<td>Τελική τιμή με χρώμα</td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;"><input type="hidden" id="totalPriceForSum" value="'+totalSumForSummary+'">&euro;'+ totalSumForSummary +'</td>');
									
									var ArrayHolderImage = [];
									var ArrayHolderSKU = [];
									var ArrayHolderName = [];
									var ArrayHolderDesc = [];
									var ArrayHolderPrice = [];
									var ArrayHolderValue = [];
								
									$('#columns > div.stepNextThirdClose').find('#mainContentconf').find('#tabs-1 > table > tbody > tr > td > input[type="checkbox"]:checked').each(function()
										{
											
											
											ArrayHolderValue.push($(this).val());
											
											ArrayHolderImage.push($(this).attr('data-image'));
											
											ArrayHolderPrice.push($(this).attr('data-price'));
											
											ArrayHolderSKU.push($(this).attr('data-sku'));
											
											ArrayHolderName.push($(this).attr('data-name'));
											
											ArrayHolderDesc.push($(this).attr('data-desc'));
											
											var HTML2 = [];
											
											var check = $('#columns > div.stepTwoClose').find('#mainContentconf').find('#displayColors').find('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
											var checkedValue = $('#columns > div.stepTwoClose').find('#mainContentconf').find('#displayColors').find('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
											
											TOTAL = parseFloat(colorPrice) + parseFloat(PriceVehicle);
											
											var theTOTAL = formatNumber(TOTAL);
												
												if(ArrayHolderValue.length > 0)
												{
												
													var TotaldataSum = 0;
													var TotaldataSumWithAccessory = 0;
													
													HTML2.push('<tr><td>ΕΠΙΛΟΓΕΣ ΧΡΗΣΤΗ ΑΞΕΣΟΥΑΡ</td><td>ΤΙΜΕΣ</td></tr><tr><td><h2 style="font-size:15px;">Τιμή με Χρώμα: </td><td style="font-size:15px; font-family:Conv_Nissan Brand Regular, Sans-Serif; font-weight:bold; color:#c71444;">&euro;'+theTOTAL+'</h2></td></tr>');	
													for(var i  = 0; i < ArrayHolderValue.length; i++){
														
															
														var current = parseFloat(ArrayHolderValue[i]*1.24);
						
														var substringset = 'Ζάντες αλουμινίου';
														
														if (!ArrayHolderName[i].indexOf(substringset) || !ArrayHolderName[i].indexOf('Ζάντα αλουμινίου')) 
														{
															var setCurrentWithSet = current * 4;
															
															var theCurrentSet = formatNumber(setCurrentWithSet);
															
															TotaldataSumWithAccessory += setCurrentWithSet;
																 
														}else
														{
															
															TotaldataSum += current; 
															var theCurrent = formatNumber(current);
																
														}
														
													    var PriceWithoutSet = formatNumber(current);
														var countSpecific = 0;
										
														var substringset = 'Ζάντες αλουμινίου';
															
														if (!ArrayHolderName[i].indexOf(substringset) || !ArrayHolderName[i].indexOf('Ζάντα αλουμινίου')) 
														{
															HTML2.push(
															'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrentSet+ ' σετ: <b>&euro;(' +PriceWithoutSet+ ' x 4)'+stringInfo+'</h2></td></tr>'
															);
														}else
														{
															HTML2.push(
															'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrent+stringInfo+'</h2></td></tr>'
															);
														}	
														
														/*HTML2.push(
														'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrent+'</h2></td></tr>'
														);*/
														}
													
														var colorVehiclePrice = parseFloat(TOTAL);
				
														//total of accessories set
														var TheTotaldataSumWithAccessory = formatNumber(TotaldataSumWithAccessory);
														
														var theTotaldataSum = formatNumber(TotaldataSum);
														
														//total of all accessories with sets
														var totalOfAccesoriesAndSet = TotaldataSumWithAccessory + TotaldataSum;
														
														console.log('total of accessories that are not set '+ TotaldataSum + ' and total of accessory sets' +TotaldataSumWithAccessory);
														
														console.log('total of accessories set' + totalOfAccesoriesAndSet);
														
														//formated total of all accessories with sets
														var formatTotalOfAccesoriesAndSet = formatNumber(totalOfAccesoriesAndSet);
														
														console.log('total of accessories set and regular accessories formated ' + formatTotalOfAccesoriesAndSet);
														
														//colorVehicles with regular accessories and set of accessories.
														var Totalsum  = colorVehiclePrice + totalOfAccesoriesAndSet;
														
														var theTotalsum = formatNumber(Totalsum);
												
												HTML2.push('<tr><td><h2 style="font-size:15px;">Τιμή τών αξεσουάρ: </td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;">&euro;'+formatTotalOfAccesoriesAndSet+stringInfo+'</h2></td></tr>');	
												HTML2.push('<tr><td><h2 style="font-size:15px;">Τελική τιμή: </td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;">&euro;'+theTotalsum+stringInfo+'</h2></td></tr>');
																									
												$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').html(HTML2);
													
												}else
												{
													$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').html("<h2 style='font-family:Conv_Nissan Brand Regular, Sans-Serif; padding:20px; font-size:16px; text-align:center;'>Δεν Επιλέχθηκαν Αξεσουαρ</h2>");
												}
											
											//displayAccessoriesSummaries(ArrayHolderValue, stadarPriceVehicle, ArrayHolderImage, ArrayHolderName, ArrayHolderSKU, ArrayHolderDesc);
																						
										});
										
									
								}							
							}
							else
							{
								$(this).hide();
								
							}
				});
			
			TotalVehicleColorSum  = calcPricewithColorA(PriceVehicle, colorPrice);
			
			//getColorTrimValuesA(jsonstr, TotalVehicleColorSum, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
			
			displayColorName(colorName, colortype, TotalVehicleColorSum);	
			
			displaySummarycolorNameTotalSum(colorName, colortype, TotalVehicleColorSum);
			
			getColorPriceAndTotalAppendTolastStep(colorPrice, PriceVehicle, TotalVehicleColorSum);
			
			infoStdHelp();
				
		});
		
		infoStdHelp();	
	}
	
	
	function displaySummarycolorNameTotalSum(colorName, colortype, TotalVehicleColorSum)
	{
		
		$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo > div.summaryDetails > div.infoModelColor').html('<h2 style="font-size:16px; margin:0 !important">Χρώμα: '+colorName+'</h2><h2 style="font-size:16px; color:#9b9b9b;">Τύπος χρώματος: '+colortype+ '</h2>' + '<!---<p>Τιμή με χρώμα: &euro;'+ TotalVehicleColorSum + '</p>-->');
	}
	
	function displaySummarycolorNameTotalSum(colorName, colortype, TotalVehicleColorSum)
	{
		
		$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo > div.summaryDetails > div.infoModelColor').html('<h2 style="font-size:16px; margin:0 !important">Χρώμα: '+colorName+'</h2><h2 style="font-size:16px; color:#9b9b9b;">Τύπος χρώματος: '+colortype+ '</h2>' + '<!---<p>Τιμή με χρώμα: &euro;'+ TotalVehicleColorSum + '</p>-->');
	}
	
	function displayColorName(colorName, colortype, TotalVehicleColorSum)
	{
		$('#navcontainer > div.right > div.infoModelColorNameNav').html('<h2>Xρώμα: '+ colorName + '</h2><p>Τύπος Χρώματος: '+colortype+'</p><p style="color:black;" class="pricewithcolor">'+ TotalVehicleColorSum + '</p>');
	}
	
	function displayRgbColorInsummary(jsonstr)
	{
		var modelsname = jsonstr.config.model['@attributes'].name;
		$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(2) > td.getmodelname > img').hide();
		$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(2) > td.getmodelname > img:nth-child(1)').show();
		
		$('#rgbcolor > div > input:radio[name="rgb[]"]').prop('checked', true);
		
		var colorI;
		var colorN;
		var colorR;
		var colorT;
		var colorP = 0;
		var TOTAL = 0;
		
		var check = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
		var checkedValue = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
		var checkedDataType = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
		
		colorR = check.attr('data-rgbs');
		colorN = check.attr('data-name');
		colorT = check.attr('data-type');
		colorP = check.attr('data-price');
		
		$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(2) > td.getmodelname > img').each(function()
		{
			var bigImage = $(this).attr('data-rgb');
			var dataType = $(this).attr('data-type');
				
			if(checkedValue == bigImage && checkedDataType == dataType)
			{
				$(this).show();
							
			}else
			{
				$(this).hide();
			}
					
		});
		
		$('#rgbcolor > div > input:radio[name="rgb[]"]').on('click', function()
		{
			var radioValueRgb = $(this).val();
			var checkedDataType = $(this).attr('data-type');
			$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(2) > td.getmodelname > img').each(function()
			{
					var bigImage = $(this).attr('data-rgb');
					var dataType = $(this).attr('data-type');
					
						if(radioValueRgb == bigImage && checkedDataType == dataType)
						{
							$(this).show();
							
							colorPrice = $(this).attr('data-price');
							
						}else
						{
							$(this).hide();
						}
					
			});
			
		});
	}
	
	function displayRgbColorFeedback()
	{
		$('#bigImgFeed > img').hide();
		$('#bigImgFeed > img:nth-child(1)').show();
		
		$('#rgbcolor > div > input:radio[name="rgb[]"]').prop('checked', true);
		
		var colorI;
		var colorN;
		var colorR;
		var colorT;
		var colorP = 0;
		var TOTAL = 0;
		
		var check = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
		var checkedValue = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
		var checkedDataType = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
		
		colorR = check.attr('data-rgbs');
		colorN = check.attr('data-name');
		colorT = check.attr('data-type');
		colorP = check.attr('data-price');
		
		$('#bigImgFeed > img').each(function()
		{
			var bigImage = $(this).attr('data-rgb');
			var dataType = $(this).attr('data-type');
				
			if(checkedValue == bigImage && checkedDataType == dataType)
			{
				$(this).show();
							
			}else
			{
				$(this).hide();
			}
					
		});
		
		$('#rgbcolor > div > input:radio[name="rgb[]"]').on('click', function()
		{
			var radioValueRgb = $(this).val();
			var checkedDataType = $(this).attr('data-type');
			$('#bigImgFeed > img').each(function()
			{
					var bigImage = $(this).attr('data-rgb');
					var dataType = $(this).attr('data-type');
				
						if(radioValueRgb == bigImage && checkedDataType == dataType)
						{
							$(this).show();
							
							colorPrice = $(this).attr('data-price');
							
						}else
						{
							$(this).hide();
						}
					
			});
			
		});
	}
	
	function displayRgbColorNavA()
	{
		$('#navcontainer > div.right > div.leftEnd > img').hide();
		$('#navcontainer > div.right > div.leftEnd > img:nth-child(1)').show();
		
		$('#rgbcolor > div > input:radio[name="rgb[]"]').prop('checked', true);
		
		var colorI;
		var colorN;
		var colorR;
		var colorT;
		var colorP = 0;
		var TOTAL = 0;
		
		var check = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
		var checkedValue = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
		var checkedDataType = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
		
		colorR = check.attr('data-rgbs');
		colorN = check.attr('data-name');
		colorT = check.attr('data-type');
		colorP = check.attr('data-price');
		
		$('#navcontainer > div.right > div.leftEnd > img').each(function()
		{
			var bigImage = $(this).attr('data-rgb');
			var dataType = $(this).attr('data-type');
				
			if(checkedValue == bigImage && checkedDataType == dataType)
			{
				$(this).show();
							
			}else
			{
				$(this).hide();
			}
					
		});
		
		$('#rgbcolor > div > input:radio[name="rgb[]"]').on('click', function()
		{
			var radioValueRgb = $(this).val();
			var checkedDataType = $(this).attr('data-type');
			$('#navcontainer > div.right > div.leftEnd > img').each(function()
			{
					var bigImage = $(this).attr('data-rgb');
					var dataType = $(this).attr('data-type');
				
						if(radioValueRgb == bigImage && checkedDataType == dataType)
						{
							$(this).show();
							
							colorPrice = $(this).attr('data-price');
							
						}else
						{
							$(this).hide();
						}
					
			});
			
		});
	}
	
	function displayGradeVehicleDetailsNavA(grade, vehicleName, VehicleEngine, FuelType, VehicleTrans, VehicleBody)
	{
		$('#navcontainer > div.right > div.rightEnd').html('<h3 style="color:#c71444;">'+grade +" | " +vehicleName+'</h3><p style="color:white;">Κινητήρας: '+VehicleEngine+'</p><p style="color:white;">Τύπος Καυσίμου: '+FuelType+'</p><p style="color:white;">Κιβώτιο ταχυτήτων: '+VehicleTrans+'</p><p style="color:white;">Αμάξωμα: '+VehicleBody+'</p>');		
	}
	
	function displayGradeVehicleDetailsFeedback(grade, vehicleName, VehicleEngine, FuelType, VehicleTrans, VehicleBody)
	{
		$('#bigImgFeedDetails').html('<h3 style="color:#c71444;">'+grade +" | " +vehicleName+'</h3><p style="color:black;">Κινητήρας: '+VehicleEngine+'</p><p style="color:black;">Τύπος Καυσίμου: '+FuelType+'</p><p style="color:black;">Κιβώτιο ταχυτήτων: '+VehicleTrans+'</p><p style="color:black;">Αμάξωμα: '+VehicleBody+'</p>');		
	}
	
	function displayGradeVehicleDetailsA(grade, vehicleName, VehicleEngine, FuelType, VehicleTrans, VehicleBody)
	{
		var HTML = [];
		//$('#rgbcolor > h1').html(grade +" | " +vehicleName);
		$('#displayColors > div.infoModeldetails').html('<h3>Έκδοση: '+grade +'</h3><p>Κινητήρας: '+VehicleEngine+'</p><p>Τύπος Καυσίμου: '+FuelType+'</p><p>Κιβώτιο ταχυτήτων: '+VehicleTrans+'</p><p>Αμάξωμα: '+VehicleBody+'</p>');		
	}
	
	function displayGradeVehicleDetailsSummary(grade, vehicleName, VehicleEngine, FuelType, VehicleTrans, VehicleBody)
	{
		var HTML = [];
		//$('#rgbcolor > h1').html(grade +" | " +vehicleName);
		$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo > div.summaryDetails > div.infoModeldetails').html('<h3>Έκδοση: '+grade +'</h3><p>Κινητήρας: '+VehicleEngine+'</p><p>Τύπος Καυσίμου: '+FuelType+'</p><p>Κιβώτιο ταχυτήτων: '+VehicleTrans+'</p><p>Αμάξωμα: '+VehicleBody+'</p>');
				
	}
	
	function calcPricewithColorA(modelPrice, colorPrice)
	{
		var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
		var HTML2 = [];
		var sum = parseInt(modelPrice) + parseInt(colorPrice);
		
		var theCurrent = formatNumber(sum);
		$('#displayColors > div.infoModelColor').html('<p style="margin-top:10px;">ΣΥΝΟΛΙΚΗ ΤΙΜΗ ΜΕ ΤΟ ΧΡΩΜΑ: &euro;'+modelPrice+' + &euro;'+colorPrice+' = &euro;'+ theCurrent +stringInfo+ '</p>');
		
		$('#displayColors > div.infoModelColor > p > span > img').hover(function()
		{
			$('#displayColors > div.infoModelColor > p > span > span').show();
		},function()
		{
			$('#displayColors > div.infoModelColor > p > span > span').hide();
		});
		
		
		infoStdHelp();
		return sum;
	}
	
	function getColorTrimValuesA(jsonstr, TotalVehicleColorSum, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh)
	{
		
		//$('#rgbcolor > div > input:radio[name="rgb[]"]').on('click', function()
		//{
			if($('#bigImgTrim').length > 0 && $('#smImgTrim > div').length > 0 && $('#dividetwo > div.infoModeldetails').length > 0 && $('#dividetwo > div.infoModelColorTrim').length > 0)
			{
				$('#bigImgTrim').empty();
				$('#smImgTrim > div').empty();
				$('#dividetwo > div.infoModeldetails').empty();
				$('#dividetwo > div.infoModelColorTrim').empty();
					
				var holdValues = [];
				
				var checkedValues = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
				var name = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-name');
				var rgbcolors = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-rgbs');
				var prices = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-price');
				var types = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
				
				var colorImageBigHolder = [];
				var colorImageSmallHolder = [];
				var colorVehicleNameHolder = [];
				var colorVehiclePriceHolder = []; 
				
				var imageHolder;
				var vehicleColorName;	
				var rgbColor;
				var colorPrice;
				var theColorType;
								
				if(jsonstr.config.model.grades instanceof Array)
					{
					GradeB =  jsonstr.config.model.grades[0].grade.gradename['#text'];
						if(jsonstr.config.model.grades[0].grade.vehicles instanceof Array)
						{				
							for(var i = 0; i < jsonstr.config.model.grades[0].grade.vehicles.length; i++) 
								{
								var theVehicleFuelTypeB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.fuel['#text'];
								var theVehiclePriceB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.price['#text'];
								var theVehicleNameB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.name['#text'];
								var theVehicleEngineB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.engine['#text'].toString();
								var theVehicleTransmissionB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.transmission['#text'];
								var theVehicleBodyB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
										 if(jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors instanceof Array)
										 {	
											for(var j = 0; j < jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.length; j++)
											{
												imageHolder = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}	
											  	}
											 }else
											 {
											 	imageHolder = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}
											 } 	
										}			
									}
							  }else
							  {
							  		var theVehicleFuelTypeB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.fuel['#text'];
									var theVehiclePriceB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.price['#text'];
									var theVehicleNameB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.name['#text'];
									var theVehicleEngineB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.engine['#text'].toString();
									var theVehicleTransmissionB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.transmission['#text'];
									var theVehicleBodyB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
										 if(jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors instanceof Array)
										 {	
											for(var j = 0; j < jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.length; j++)
											{
												imageHolder = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}	
											  	}
											 }else
											 {
											 	imageHolder = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}
											 } 	
										}
							  } 
						}else 
						{
							GradeB =  jsonstr.config.model.grades.grade.gradename['#text'];
								if(jsonstr.config.model.grades.grade.vehicles instanceof Array)
								{  	
									for(var i = 0; i < jsonstr.config.model.grades.grade.vehicles.length; i++) 
									{
									var theVehicleFuelTypeB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.fuel['#text'];
									var theVehiclePriceB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.price['#text'];
									var theVehicleNameB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.name['#text'];
									var theVehicleEngineB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.engine['#text'].toString();
									var theVehicleTransmissionB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.transmission['#text'];
									var theVehicleBodyB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.doors['#text'];
										
										if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
											&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
											&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
										{			
											if(jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors instanceof Array){	
												for(var j = 0; j < jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.length; j++)
													{
														imageHolder = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
														vehicleColorName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
														rgbColor = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
														colorPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
														theColorType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.type['#text'];
															
																if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
																{
																if(jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
																{
																	for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.length; k++)
																	{
																		var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																																
																	 }
																}else
																{
																	    var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																		
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																}	
																	drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																	
																	colorImageBigHolder.splice(0, colorImageBigHolder.length);
																	colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																	colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																	colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
																
																}	
													  	}
													 
													 }else
													 {
													 		imageHolder = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
															theColorType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.type['#text'];
															
																if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
																{
																if(jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim instanceof Array)	
																{
																	for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.length; k++)
																	{
																		var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																																
																	 }
																}else
																{
																	    var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																		
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																}	
																	drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																	
																	colorImageBigHolder.splice(0, colorImageBigHolder.length);
																	colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																	colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																	colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
																
																}
													 } 	
											}			
									}
							 }else
							 {
							 		var theVehicleFuelTypeB = jsonstr.config.model.grades.grade.vehicles.vehicle.fuel['#text'];
									var theVehiclePriceB = jsonstr.config.model.grades.grade.vehicles.vehicle.price['#text'];
									var theVehicleNameB = jsonstr.config.model.grades.grade.vehicles.vehicle.name['#text'];
									var theVehicleEngineB = jsonstr.config.model.grades.grade.vehicles.vehicle.engine['#text'].toString();
									var theVehicleTransmissionB = jsonstr.config.model.grades.grade.vehicles.vehicle.transmission['#text'];
									var theVehicleBodyB = jsonstr.config.model.grades.grade.vehicles.vehicle.doors['#text'];
										
										if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
											&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
											&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
										{			
											if(jsonstr.config.model.grades.grade.vehicles.vehicle.colors instanceof Array){	
												for(var j = 0; j < jsonstr.config.model.grades.grade.vehicles.vehicle.colors.length; j++)
													{
														imageHolder = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
														vehicleColorName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
														rgbColor = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
														colorPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
														theColorType = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.type['#text'];
															
																if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
																{
																if(jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
																{
																	for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.length; k++)
																	{
																		var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																																
																	 }
																}else
																{
																	    var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																		
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																}	
																	drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																	
																	colorImageBigHolder.splice(0, colorImageBigHolder.length);
																	colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																	colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																	colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
																
																}	
													  	}
													 
													 }else
													 {
													 		imageHolder = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colorprice['#text'];
															theColorType = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.type['#text'];
															
																if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
																{
																if(jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim instanceof Array)	
																{
																	for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim.length; k++)
																	{
																		var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																																
																	 }
																}else
																{
																	    var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																		
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																}	
																	drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																	
																	colorImageBigHolder.splice(0, colorImageBigHolder.length);
																	colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																	colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																	colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
																
																}
													 } 	
											}
							 }			
						}
				
			}
			else
			{
				var holdValues = [];
				
				var checkedValues = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
				var name = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-name');
				var rgbcolors = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-rgbs');
				var prices = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-price');
				var types = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
				
				var colorImageBigHolder = [];
				var colorImageSmallHolder = [];
				var colorVehicleNameHolder = [];
				var colorVehiclePriceHolder = []; 
				
				var imageHolder;
				var vehicleColorName;	
				var rgbColor;
				var colorPrice;
				var theColorType;
								
				if(jsonstr.config.model.grades instanceof Array)
					{
					GradeB =  jsonstr.config.model.grades[0].grade.gradename['#text'];
						if(jsonstr.config.model.grades[0].grade.vehicles instanceof Array)
						{				
							for(var i = 0; i < jsonstr.config.model.grades[0].grade.vehicles.length; i++) 
								{
								var theVehicleFuelTypeB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.fuel['#text'];
								var theVehiclePriceB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.price['#text'];
								var theVehicleNameB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.name['#text'];
								var theVehicleEngineB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.engine['#text'].toString();
								var theVehicleTransmissionB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.transmission['#text'];
								var theVehicleBodyB = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
										 if(jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors instanceof Array)
										 {	
											for(var j = 0; j < jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.length; j++)
											{
												imageHolder = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}	
											  	}
											 }else
											 {
											 	imageHolder = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}
											 } 	
										}			
									}
							  }else
							  {
							  		var theVehicleFuelTypeB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.fuel['#text'];
									var theVehiclePriceB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.price['#text'];
									var theVehicleNameB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.name['#text'];
									var theVehicleEngineB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.engine['#text'].toString();
									var theVehicleTransmissionB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.transmission['#text'];
									var theVehicleBodyB = jsonstr.config.model.grades[0].grade.vehicles.vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
										 if(jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors instanceof Array)
										 {	
											for(var j = 0; j < jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.length; j++)
											{
												imageHolder = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}	
											  	}
											 }else
											 {
											 	imageHolder = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[0].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}
											 } 	
										}
							  } 
						}else 
						{
							GradeB =  jsonstr.config.model.grades.grade.gradename['#text'];
								if(jsonstr.config.model.grades.grade.vehicles instanceof Array)
								{  	
									for(var i = 0; i < jsonstr.config.model.grades.grade.vehicles.length; i++) 
									{
									var theVehicleFuelTypeB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.fuel['#text'];
									var theVehiclePriceB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.price['#text'];
									var theVehicleNameB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.name['#text'];
									var theVehicleEngineB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.engine['#text'].toString();
									var theVehicleTransmissionB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.transmission['#text'];
									var theVehicleBodyB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.doors['#text'];
										
										if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
											&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
											&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
										{			
											if(jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors instanceof Array){	
												for(var j = 0; j < jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.length; j++)
													{
														imageHolder = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
														vehicleColorName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
														rgbColor = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
														colorPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
														theColorType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.type['#text'];
															
																if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
																{
																if(jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
																{
																	for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.length; k++)
																	{
																		var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																																
																	 }
																}else
																{
																	    var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																		
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																}	
																	drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																	
																	colorImageBigHolder.splice(0, colorImageBigHolder.length);
																	colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																	colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																	colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
																
																}	
													  	}
													 
													 }else
													 {
													 		imageHolder = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
															theColorType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.type['#text'];
															
																if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
																{
																if(jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim instanceof Array)	
																{
																	for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.length; k++)
																	{
																		var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																																
																	 }
																}else
																{
																	    var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																		
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																}	
																	drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																	
																	colorImageBigHolder.splice(0, colorImageBigHolder.length);
																	colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																	colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																	colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
																
																}
													 } 	
											}			
									}
							 }else
							 {
							 		var theVehicleFuelTypeB = jsonstr.config.model.grades.grade.vehicles.vehicle.fuel['#text'];
									var theVehiclePriceB = jsonstr.config.model.grades.grade.vehicles.vehicle.price['#text'];
									var theVehicleNameB = jsonstr.config.model.grades.grade.vehicles.vehicle.name['#text'];
									var theVehicleEngineB = jsonstr.config.model.grades.grade.vehicles.vehicle.engine['#text'].toString();
									var theVehicleTransmissionB = jsonstr.config.model.grades.grade.vehicles.vehicle.transmission['#text'];
									var theVehicleBodyB = jsonstr.config.model.grades.grade.vehicles.vehicle.doors['#text'];
										
										if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
											&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
											&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
										{			
											if(jsonstr.config.model.grades.grade.vehicles.vehicle.colors instanceof Array){	
												for(var j = 0; j < jsonstr.config.model.grades.grade.vehicles.vehicle.colors.length; j++)
													{
														imageHolder = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
														vehicleColorName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
														rgbColor = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
														colorPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
														theColorType = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.type['#text'];
															
																if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
																{
																if(jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
																{
																	for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.length; k++)
																	{
																		var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																																
																	 }
																}else
																{
																	    var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																		
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																}	
																	drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																	
																	colorImageBigHolder.splice(0, colorImageBigHolder.length);
																	colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																	colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																	colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
																
																}	
													  	}
													 
													 }else
													 {
													 		imageHolder = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colorprice['#text'];
															theColorType = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.type['#text'];
															
																if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
																{
																if(jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim instanceof Array)	
																{
																	for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim.length; k++)
																	{
																		var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																																
																	 }
																}else
																{
																	    var colorBigTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																		var colorSmallTrimImage = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																		var vehicleColorTrimName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																		var vehicleColorTrimPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																		
																		colorImageBigHolder.push(colorBigTrimImage);
																		colorImageSmallHolder.push(colorSmallTrimImage);
																		colorVehicleNameHolder.push(vehicleColorTrimName);
																		colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																}	
																	drawTrimVehiclesA(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																	
																	colorImageBigHolder.splice(0, colorImageBigHolder.length);
																	colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																	colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																	colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
																
																}
													 } 	
											}
							 }			
						}	
				
			}	
		
		//});
	  
	}
	
		
	
/*
 * End function for Grade A
 */	
 
 /*
  * Start functions For Grade B
  */
 
	function drawTrimVehicles(vehicleImageBigTrimHolder, TotalVehicleColorSum, vehicleImageSmallTrimHolder, vehicleTrimNameHolder, vehcileTrimPriceHolder)
	{
		
		var HTML = [];
		var HTML1 = [];
		for(var i = 0; i < vehicleTrimNameHolder.length; i++)
		{
			//data-price="'+vehicleColorPriceB[i]+'"
				
				HTML.push('<img data-num="'+i+'" data-name="'+vehicleTrimNameHolder[i]+'" data-price="'+vehcileTrimPriceHolder[i]+'" style="width:300px; height:350px;" alt="'+vehicleTrimNameHolder[i]+'" src="'+ vehicleImageBigTrimHolder[i] +'" />');
				HTML1.push('<div class="checkTrim"><img data-num="'+i+'" data-price="'+vehcileTrimPriceHolder[i]+'" style="width:21px; height:21px !important;" alt="'+vehicleTrimNameHolder[i]+'" src="'+ vehicleImageSmallTrimHolder[i] +'" />'
				+'<br><input class="trim" name="trim[]" type="radio" value="'+ vehicleTrimNameHolder[i] + '" /></div>');
		}
		
		$('#bigImgTrim').html(HTML);
		$('#smImgTrim').html(HTML1);
		
		displayTrim(vehicleTrimNameHolder, TotalVehicleColorSum, vehcileTrimPriceHolder);
	}
	
	function displayTrim(vehicleTrimNameHolder, TotalVehicleColorSum, vehcileTrimPriceHolder)
	{
		
		$('#bigImgTrim > img').hide();
		//$('#bigImgTrim > img:nth-child(1)').show();
		$('#smImgTrim > div > input:radio[name="trim[]"]').prop('checked', true);
		
		var trimI;
		var trimN;
		var trimP = 0;
		
		var check = $('#smImgTrim > div > input:radio[name="trim[]"]:checked');
		var checkedValue = $('#smImgTrim > div > input:radio[name="trim[]"]:checked').val();
		
		trimN = check.attr('data-name');
		trimP = check.attr('data-price');
		
		$('#bigImgTrim > img').each(function()
			{
				var bigImage = $(this).attr('data-name');
				
						if(checkedValue == bigImage)
						{
							$(this).show();
							
							trimN = $(this).attr('data-name');
							trimP = $(this).attr('data-price');
							
						}else
						{
							$(this).hide();
						}
					
			});
		
		var TotalS = calculateColorAndTrim(TotalVehicleColorSum, trimP);
		displayTrimName(trimN, trimP);
			
		displayTotal(TotalS, trimN);
			
		displaySummaryTrimNameTotalSum(trimN, TotalVehicleColorSum, trimP);
		
		
		var trimName;
		var trimPrice = 0;
		
		$('#smImgTrim > div > input:radio[name="trim[]"]').on('click', function()
		{
			var radioValueTrim = $(this).val();
			$('#bigImgTrim > img').each(function()
			{
				var bigImage = $(this).attr('data-name');
				
						if(radioValueTrim == bigImage)
						{
							$(this).show();
							trimName = $(this).attr('data-name');
							trimPrice = $(this).attr('data-price');
							
						}else
						{
							$(this).hide();
						}
					
			});
			
			//calcPricewithColor(PriceVehicle, colorPrice);
			var TotalSum = calculateColorAndTrim(TotalVehicleColorSum, trimPrice);
			displayTrimName(trimName, trimPrice);
			
			displayTotal(TotalSum, trimName);
			
			displaySummaryTrimNameTotalSum(trimName, TotalVehicleColorSum, trimPrice);
			
		});
	}
	
	function calculateColorAndTrim(TotalVehicleColorSum, trimPrice)
	{
		var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
		var HTML2 = [];
		var sum = parseInt(TotalVehicleColorSum) + parseInt(trimPrice);
		var theCurrent = formatNumber(sum);
		$('#dividetwo > div.infoModelColorTrim').html('<p>ΣΥΝΟΛΙΚΗ ΤΙΜΗ ΧΡΩΜΑΤΟΣ ΚΑΙ ΤΑΠΕΤΣΑΡΙΑΣ: &euro;'+TotalVehicleColorSum+' + &euro;'+trimPrice+' = &euro;'+ theCurrent + stringInfo+'</p>');
		
		infoStdHelp();
		return sum;
	}
	
	function displayTrimName(vehicleTrimNameHolder, vehcileTrimPriceHolder)
	{
		$('#dividetwo > div.infoModeldetails').html('<p>ΤΑΠΕΤΣΑΡΙΑ: '+vehicleTrimNameHolder+'</p>');
	}
	
	
	//Display Colors
	function drawRgbColors(PriceVehicle, jsonstr, getVehicleNumber, getNumColorVehicle, vehicleImageHolderB, vehicleColorNameHolderB, vehicleRgbcolorB, vehicleColorPriceB, vehicleColorTypeB,
		engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh)
	{
		var HTML = [];
		var HTML1 = [];
		var HTML2 = [];
		var HTML4 = [];
		var HTML5 = [];
		var HTML6 = [];

        /*
		 * 
		 * var HTML6 = [];
		 * HTML6.push('<img data-num="'+i+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:213px; heigth:160px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
		 * $('#bigImgFeed').html(HTML6);
		 * displayRgbColorFeedback(); 
		 * 
		 */
		for(var i = 0; i < vehicleColorNameHolderB.length; i++)
		{
			//data-price="'+vehicleColorPriceB[i]+'"
			HTML.push('<img data-num="'+i+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:92px; heigth:69px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML1.push('<img data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:451px; heigth:338px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML2.push('<div class="checkRgb"><div data-rgb="'+vehicleRgbcolorB[i]+'" data-name="'+vehicleColorNameHolderB[i]+'" class="rgbstyling" style="background-color:'+vehicleRgbcolorB[i]+'"></div>'
			+'<br><input data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgbs="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'"   class="rgb" name="rgb[]" type="radio" value="'+ vehicleRgbcolorB[i] + '" /></div>');	
			HTML4.push('<img data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:850px; margin-bottom:10px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML5.push('<img style="width:300px; height:225px;" data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML6.push('<img data-num="'+i+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:213px; heigth:160px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
		}
		
		$('#navcontainer > div.right > div.leftEnd').html(HTML);
		$('#bigImg').html(HTML1);
		$('#rgbcolor').html(HTML2);
		
		//HTML5.push('<img style="width:300px; height:225px;" data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
		//$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(2) > td.getmodelname').html(HTML5);
		//displayRgbColorInsummary(jsonstr);
		$('#columns > div.stepThirdClose').find('#dividetwo').find('#bigImg').html(HTML4);
		
		$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(2) > td.getmodelname').html(HTML5);
		
		$('#bigImgFeed').html(HTML6);
		
		displayRgbColorNav();
		
		displayRgbColorFeedback(); 
		
		displayRgbColorInsummary(jsonstr);
		displayRgbColor(PriceVehicle, jsonstr, getVehicleNumber, getNumColorVehicle, vehicleImageHolderB, vehicleColorNameHolderB, vehicleRgbcolorB, vehicleColorPriceB, vehicleColorTypeB,
			engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);	
		
	}
	
	function displayRgbColor(PriceVehicle, jsonstr, getVehicleNumber, getNumColorVehicle, vehicleImageHolderB, 
		vehicleColorNameHolderB, vehicleRgbcolorB, vehicleColorPriceB, vehicleColorTypeB, 
		engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh)
	{
		
		$('#bigImg > img').hide();
		$('#rgbcolor > div > input:radio[name="rgb[]"]').prop('checked', true);
		
		var colorI;
		var colorN;
		var colorR;
		var colorT;
		var colorP = 0;
		var TOTAL = 0;
		
		var check = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
		var checkedValue = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
		var checkedDataType = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
		
		colorR = check.attr('data-rgbs');
		colorN = check.attr('data-name');
		colorT = check.attr('data-type');
		colorP = check.attr('data-price');
		
		$('#bigImg > img').each(function()
			{
				var bigImage = $(this).attr('data-rgb');
				var dataType = $(this).attr('data-type');
					
					if(checkedValue == bigImage && checkedDataType == dataType)
					{
								
					colorI = $(this);
					
					colorI.show();			
														
					}else
					{
						$(this).hide();
								
					}
			});
		
		TOTAL  = calcPricewithColorA(PriceVehicle, colorP);
			
		//getColorTrimValues(jsonstr, TOTAL, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
			
		displayColorName(colorN, colorT, TOTAL);	
			
		displaySummarycolorNameTotalSum(colorN, colorT, TOTAL);
		
		getColorPriceAndTotalAppendTolastStep(colorP, PriceVehicle, TOTAL);
		
		infoStdHelp();
		
		var colorImage;
		var colorName;
		var colortype;
		var colorRgb;
		var colorPrice = 0;
		var totalSumForSummary = 0;
				
		$('#rgbcolor > div > input:radio[name="rgb[]"]').on('click', function()
		{
			
				var radioValueRgb = $(this).val();
				var radioDataType = $(this).attr('data-type');
				
				$('#bigImg > img').each(function()
				{
					var bigImage = $(this).attr('data-rgb');
					var dataType = $(this).attr('data-type');
					
						   if(radioValueRgb == bigImage && radioDataType == dataType)
						   {
								
								colorImage = $(this);
								
								colorImage.show();
								colorRgb = $(this).attr('data-rgb');
								colorName = $(this).attr('data-name');
								colortype = $(this).attr('data-type');
								colorPrice = $(this).attr('data-price');
								
								colorVehicleNumber = $(this).attr('data-num');
								totalSumForSummary = calcPricewithColorA(PriceVehicle, colorPrice);
								
								
								if($('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').length > 0)
								{		
									//$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table > tbody > tr:nth-child(2)')
									//.html('<td>Τελική τιμή με χρώμα</td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;"><input type="hidden" id="totalPriceForSum" value="'+totalSumForSummary+'">&euro;'+ totalSumForSummary +'</td>');
									infoStdHelp();
									var ArrayHolderImage = [];
									var ArrayHolderSKU = [];
									var ArrayHolderName = [];
									var ArrayHolderDesc = [];
									var ArrayHolderPrice = [];
									var ArrayHolderValue = [];
								
									$('#columns > div.stepNextThirdClose').find('#mainContentconf').find('#tabs-1 > table > tbody > tr > td > input[type="checkbox"]:checked').each(function()
										{
											
											var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
						                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
						                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
						                    +'</span>'; 
											
											ArrayHolderValue.push($(this).val());
											
											ArrayHolderImage.push($(this).attr('data-image'));
											
											ArrayHolderPrice.push($(this).attr('data-price'));
											
											ArrayHolderSKU.push($(this).attr('data-sku'));
											
											ArrayHolderName.push($(this).attr('data-name'));
											
											ArrayHolderDesc.push($(this).attr('data-desc'));
											
											var HTML2 = [];
											
											var check = $('#columns > div.stepTwoClose').find('#mainContentconf').find('#displayColors').find('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
											var checkedValue = $('#columns > div.stepTwoClose').find('#mainContentconf').find('#displayColors').find('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
											
											TOTAL = parseFloat(colorPrice) + parseFloat(PriceVehicle);
											
											var theTOTAL = formatNumber(TOTAL);
												
												if(ArrayHolderValue.length > 0)
												{
													var TotaldataSum = 0;
													var TotaldataSumWithAccessory = 0;
													
													HTML2.push('<tr><td>ΕΠΙΛΟΓΕΣ ΧΡΗΣΤΗ ΑΞΕΣΟΥΑΡ</td><td>ΤΙΜΕΣ</td></tr><tr><td><h2 style="font-size:15px;">Τιμή με Χρώμα: </td><td style="font-size:15px; font-family:Conv_Nissan Brand Regular, Sans-Serif; font-weight:bold; color:#c71444;">&euro;'+theTOTAL+'</h2></td></tr>');	
													for(var i  = 0; i < ArrayHolderValue.length; i++){
															
														var current = parseFloat(ArrayHolderValue[i]*1.24);
						
														var substringset = 'Ζάντες αλουμινίου';
														
														if (!ArrayHolderName[i].indexOf(substringset) || !ArrayHolderName[i].indexOf('Ζάντα αλουμινίου')) 
														{
															var setCurrentWithSet = current * 4;
															
															var theCurrentSet = formatNumber(setCurrentWithSet);
															
															TotaldataSumWithAccessory += setCurrentWithSet;
																 
														}else
														{
															
															TotaldataSum += current; 
															var theCurrent = formatNumber(current);
														}
														
														var PriceWithoutSet = formatNumber(current);
														
														var countSpecific = 0;
										
														var substringset = 'Ζάντες αλουμινίου';
															
														if (!ArrayHolderName[i].indexOf(substringset) || !ArrayHolderName[i].indexOf('Ζάντα αλουμινίου')) 
														{
															HTML2.push(
															'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrentSet+ ' σετ: <b>&euro;(' +PriceWithoutSet+ ' x 4)'+stringInfo+'</h2></td></tr>'
															);
														}else
														{
															HTML2.push(
															'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrent+stringInfo+'</h2></td></tr>'
															);
														}	
														
														/*HTML2.push(
														'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrent+'</h2></td></tr>'
														);*/
														}
													
													var colorVehiclePrice = parseFloat(TOTAL);
				
													//total of accessories set
													var TheTotaldataSumWithAccessory = formatNumber(TotaldataSumWithAccessory);
														
													var theTotaldataSum = formatNumber(TotaldataSum);
														
													//total of all accessories with sets
													var totalOfAccesoriesAndSet = TotaldataSumWithAccessory + TotaldataSum;
														
													console.log('total of accessories that are not set '+ TotaldataSum + ' and total of accessory sets' +TotaldataSumWithAccessory);
														
													console.log('total of accessories set' + totalOfAccesoriesAndSet);
														
													//formated total of all accessories with sets
													var formatTotalOfAccesoriesAndSet = formatNumber(totalOfAccesoriesAndSet);
														
													console.log('total of accessories set and regular accessories formated ' + formatTotalOfAccesoriesAndSet);
														
													//colorVehicles with regular accessories and set of accessories.
													var Totalsum  = colorVehiclePrice + totalOfAccesoriesAndSet;
														
													var theTotalsum = formatNumber(Totalsum);
												
													HTML2.push('<tr><td><h2 style="font-size:15px;">Τιμή τών αξεσουάρ: </td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;">&euro;'+formatTotalOfAccesoriesAndSet+stringInfo+'</h2></td></tr>');	
													HTML2.push('<tr><td><h2 style="font-size:15px;">Τελική τιμή: </td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;">&euro;'+theTotalsum+stringInfo+'</h2></td></tr>');
													
													$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').html(HTML2);
													
												}else
												{
													$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').html("<h2 style='font-family:Conv_Nissan Brand Regular, Sans-Serif; padding:20px; font-size:16px; text-align:center;'>Δεν Επιλέχθηκαν Αξεσουαρ</h2>");
												}
											
																								
										});
										
									
								}
								
														
							}else
							{
								$(this).hide();
								
							}
				});
			
			TotalVehicleColorSum  = calcPricewithColorA(PriceVehicle, colorPrice);
			
			//getColorTrimValues(jsonstr, TotalVehicleColorSum, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
			
			displayColorName(colorName, colortype, TotalVehicleColorSum);	
			
			displaySummarycolorNameTotalSum(colorName, colortype, TotalVehicleColorSum);
			
			getColorPriceAndTotalAppendTolastStep(colorPrice, PriceVehicle, TotalVehicleColorSum);
			
			infoStdHelp();
				
		});
		
		
	}
	
	function getColorPriceAndTotalAppendTolastStep(colorPrice, PriceVehicle, TotalVehicleColorSum)
	{
		var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>'; 
		var HTML=[];
		var colorP =  parseFloat(colorPrice);
		var TotalVehicleColorSum =  parseFloat(TotalVehicleColorSum);
		var VehiclePrice = parseFloat(PriceVehicle);
		
		var thecolorP = formatNumber(colorP);
		var theTotalVehicleColorSum = formatNumber(TotalVehicleColorSum);
		var theVehiclePrice = formatNumber(VehiclePrice);
		
		HTML.push('<tr><td>ΕΠΙΛΟΓΕΣ ΧΡΗΣΤΗ</td><td>ΤΙΜΕΣ</td></tr><tr><td><h2 style="font-size:15px;">Τιμή Από: </td><td style="font-size:15px; color:#c71444;"><input type="hidden" id="vehiclePrice" name="vehiclePrice" value="'+VehiclePrice+'">&euro;'+theVehiclePrice+stringInfo+'</h2></td></tr>'+
		'<tr><td><h2 style="font-size:15px;">Τιμή χρώματος: </td><td style="font-size:15px; color:#c71444;"><input type="hidden" id="colorPrice" name="colorPrice" value="'+colorP+'">&euro;'+thecolorP+stringInfo+'</h2></td></tr>'+
		'<tr><td><h2 style="font-size:15px;">Τελική Τιμή:</td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;"><input type="hidden" id="totalPrice" name="totalPrice" value="'+TotalVehicleColorSum+'">&euro;'+theTotalVehicleColorSum+stringInfo+'</h2></td></tr>'
		);
		
		$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculate > div > table > tbody').html(HTML);
		
		//$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').append('<tr><td><h2 style="font-size:15px;">Τιμή με Χρώμα:</td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;"><input type="hidden" id="totalPrice" name="totalPrice" value="'+ TotalVehicleColorSum +'">&euro;'+TotalVehicleColorSum+'</h2></td></tr>');
		
		//.find('#columnD').html(HTML);
		
	}
	
	function getColorTrimValues(jsonstr, TotalVehicleColorSum, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh)
	{
		
		//$('#rgbcolor > div > input:radio[name="rgb[]"]').on('click', function()
		//{
			if($('#bigImgTrim').length > 0 && $('#smImgTrim > div').length > 0 && $('#dividetwo > div.infoModeldetails').length > 0 && $('#dividetwo > div.infoModelColorTrim').length > 0)
			{
				$('#bigImgTrim').empty();
				$('#smImgTrim > div').empty();
				$('#dividetwo > div.infoModeldetails').empty();
				$('#dividetwo > div.infoModelColorTrim').empty();
					
				var holdValues = [];
				
				var checkedValues = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
				var name = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-name');
				var rgbcolors = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-rgbs');
				var prices = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-price');
				var types = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
				
				var colorImageBigHolder = [];
				var colorImageSmallHolder = [];
				var colorVehicleNameHolder = [];
				var colorVehiclePriceHolder = []; 
				
				var imageHolder;
				var vehicleColorName;	
				var rgbColor;
				var colorPrice;
				var theColorType;
								
				if(jsonstr.config.model.grades instanceof Array)
					{
					GradeB =  jsonstr.config.model.grades[1].grade.gradename['#text'];
							if(jsonstr.config.model.grades[1].grade.vehicles instanceof Array)
							{ 			
							    for(var i = 0; i < jsonstr.config.model.grades[1].grade.vehicles.length; i++) 
								{
								var theVehicleFuelTypeB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.fuel['#text'];
								var theVehiclePriceB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.price['#text'];
								var theVehicleNameB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.name['#text'];
								var theVehicleEngineB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.engine['#text'].toString();
								var theVehicleTransmissionB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.transmission['#text'];
								var theVehicleBodyB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
											if(jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors instanceof Array)
											{	
												for(var j = 0; j < jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.length; j++)
													{
													imageHolder = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
													vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
													rgbColor = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
													colorPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
													theColorType = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
														
															if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
															{
															if(jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
															{
																for(var k = 0; k < jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.length; k++)
																{
																	var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																															
																 }
															}else
															{
																    var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																	
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
															}	
																drawTrimVehicles(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																
																colorImageBigHolder.splice(0, colorImageBigHolder.length);
																colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
															
															}	
													  	}
												}else
												{
													imageHolder = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
													vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
													rgbColor = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
													colorPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
													theColorType = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.type['#text'];
														
															if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
															{
															if(jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim instanceof Array)	
															{
																for(var k = 0; k < jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.length; k++)
																{
																	var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																															
																 }
															}else
															{
																    var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																	
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
															}	
																drawTrimVehicles(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																
																colorImageBigHolder.splice(0, colorImageBigHolder.length);
																colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
															
															}
												}	  	
										}			
									}
								}else
								{
									var theVehicleFuelTypeB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.fuel['#text'];
									var theVehiclePriceB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.price['#text'];
									var theVehicleNameB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.name['#text'];
									var theVehicleEngineB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.engine['#text'].toString();
									var theVehicleTransmissionB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.transmission['#text'];
									var theVehicleBodyB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
											if(jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors instanceof Array)
											{	
												for(var j = 0; j < jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.length; j++)
													{
													imageHolder = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
													vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
													rgbColor = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
													colorPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
													theColorType = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.type['#text'];
														
															if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
															{
															if(jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
															{
																for(var k = 0; k < jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.length; k++)
																{
																	var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																															
																 }
															}else
															{
																    var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																	
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
															}	
																drawTrimVehicles(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																
																colorImageBigHolder.splice(0, colorImageBigHolder.length);
																colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
															
															}	
													  	}
												}else
												{
													imageHolder = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
													vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colorname['#text'];	
													rgbColor = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
													colorPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colorprice['#text'];
													theColorType = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.type['#text'];
														
															if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
															{
															if(jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim instanceof Array)	
															{
																for(var k = 0; k < jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim.length; k++)
																{
																	var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																															
																 }
															}else
															{
																    var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																	
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
															}	
																drawTrimVehicles(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																
																colorImageBigHolder.splice(0, colorImageBigHolder.length);
																colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
															
															}
												}	  	
										}
								}	
												
						}else 
						{
										
						}
				
			}
			else
			{
				var holdValues = [];
				
				var checkedValues = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
				var name = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-name');
				var rgbcolors = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-rgbs');
				var prices = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-price');
				var types = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
				
				var colorImageBigHolder = [];
				var colorImageSmallHolder = [];
				var colorVehicleNameHolder = [];
				var colorVehiclePriceHolder = []; 
				
				var imageHolder;
				var vehicleColorName;	
				var rgbColor;
				var colorPrice;
				var theColorType;
								
				if(jsonstr.config.model.grades instanceof Array)
					{
					GradeB =  jsonstr.config.model.grades[1].grade.gradename['#text'];
							if(jsonstr.config.model.grades[1].grade.vehicles instanceof Array)
							{ 			
							    for(var i = 0; i < jsonstr.config.model.grades[1].grade.vehicles.length; i++) 
								{
								var theVehicleFuelTypeB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.fuel['#text'];
								var theVehiclePriceB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.price['#text'];
								var theVehicleNameB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.name['#text'];
								var theVehicleEngineB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.engine['#text'].toString();
								var theVehicleTransmissionB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.transmission['#text'];
								var theVehicleBodyB = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
											if(jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors instanceof Array)
											{	
												for(var j = 0; j < jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.length; j++)
													{
													imageHolder = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
													vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
													rgbColor = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
													colorPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
													theColorType = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
														
															if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
															{
															if(jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
															{
																for(var k = 0; k < jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.length; k++)
																{
																	var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																															
																 }
															}else
															{
																    var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																	
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
															}	
																drawTrimVehicles(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																
																colorImageBigHolder.splice(0, colorImageBigHolder.length);
																colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
															
															}	
													  	}
												}else
												{
													imageHolder = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
													vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
													rgbColor = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
													colorPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
													theColorType = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.type['#text'];
														
															if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
															{
															if(jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim instanceof Array)	
															{
																for(var k = 0; k < jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.length; k++)
																{
																	var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																															
																 }
															}else
															{
																    var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																	
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
															}	
																drawTrimVehicles(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																
																colorImageBigHolder.splice(0, colorImageBigHolder.length);
																colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
															
															}
												}	  	
										}			
									}
								}else
								{
									var theVehicleFuelTypeB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.fuel['#text'];
									var theVehiclePriceB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.price['#text'];
									var theVehicleNameB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.name['#text'];
									var theVehicleEngineB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.engine['#text'].toString();
									var theVehicleTransmissionB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.transmission['#text'];
									var theVehicleBodyB = jsonstr.config.model.grades[1].grade.vehicles.vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
											if(jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors instanceof Array)
											{	
												for(var j = 0; j < jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.length; j++)
													{
													imageHolder = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
													vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
													rgbColor = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
													colorPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
													theColorType = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.type['#text'];
														
															if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
															{
															if(jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
															{
																for(var k = 0; k < jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.length; k++)
																{
																	var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																															
																 }
															}else
															{
																    var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																	
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
															}	
																drawTrimVehicles(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																
																colorImageBigHolder.splice(0, colorImageBigHolder.length);
																colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
															
															}	
													  	}
												}else
												{
													imageHolder = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
													vehicleColorName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colorname['#text'];	
													rgbColor = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
													colorPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colorprice['#text'];
													theColorType = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.type['#text'];
														
															if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
															{
															if(jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim instanceof Array)	
															{
																for(var k = 0; k < jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim.length; k++)
																{
																	var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																															
																 }
															}else
															{
																    var colorBigTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																	var colorSmallTrimImage = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																	var vehicleColorTrimName = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																	var vehicleColorTrimPrice = jsonstr.config.model.grades[1].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																	
																	colorImageBigHolder.push(colorBigTrimImage);
																	colorImageSmallHolder.push(colorSmallTrimImage);
																	colorVehicleNameHolder.push(vehicleColorTrimName);
																	colorVehiclePriceHolder.push(vehicleColorTrimPrice);
															}	
																drawTrimVehicles(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
																
																colorImageBigHolder.splice(0, colorImageBigHolder.length);
																colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
																colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
																colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
															
															}
												}	  	
										}
								}	
												
						}else 
						{
										
						}
				}	
		
		//});
	  
	}
	
	function displayRgbColorNav()
	{
		$('#navcontainer > div.right > div.leftEnd > img').hide();
		//$('#navcontainer > div.right > div.leftEnd > img:nth-child(1)').show();
		
		$('#rgbcolor > div > input:radio[name="rgb[]"]').prop('checked', true);
		
		var colorI;
		var colorN;
		var colorR;
		var colorT;
		var colorP = 0;
		var TOTAL = 0;
		
		var check = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
		var checkedValue = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
		var checkedDataType = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
		
		colorR = check.attr('data-rgbs');
		colorN = check.attr('data-name');
		colorT = check.attr('data-type');
		colorP = check.attr('data-price');
		
		$('#navcontainer > div.right > div.leftEnd > img').each(function()
		{
			var bigImage = $(this).attr('data-rgb');
			var dataType = $(this).attr('data-type');
				
			if(checkedValue == bigImage && checkedDataType == dataType)
			{
				$(this).show();
							
			}else
			{
				$(this).hide();
			}
					
		});
		
		$('#rgbcolor > div > input:radio[name="rgb[]"]').on('click', function()
		{
			var radioValueRgb = $(this).val();
			var radioDataType = $(this).attr('data-type');
			$('#navcontainer > div.right > div.leftEnd > img').each(function()
			{
					var bigImage = $(this).attr('data-rgb');
					var dataType = $(this).attr('data-type');
				
						if(radioValueRgb == bigImage && radioDataType == dataType)
						{
							$(this).show();
							
							colorPrice = $(this).attr('data-price');
							
						}else
						{
							$(this).hide();
						}
					
			});
			
		});
	}
	
	function displayGradeVehicleDetailsNav(grade, vehicleName, VehicleEngine, FuelType, VehicleTrans, VehicleBody)
	{
		$('#navcontainer > div.right > div.rightEnd').html('<h3 style="color:#c71444;">'+grade +" | " +vehicleName+'</h3><p style="color:white;">Κινητήρας: '+VehicleEngine+'</p><p style="color:white;">Τύπος Καυσίμου: '+FuelType+'</p><p style="color:white;">Κιβώτιο ταχυτήτων: '+VehicleTrans+'</p><p style="color:white;">Αμάξωμα: '+VehicleBody+'</p>');		
	}
	
	function displayGradeVehicleDetails(grade, vehicleName, VehicleEngine, FuelType, VehicleTrans, VehicleBody)
	{
		var HTML = [];
		//$('#rgbcolor > h1').html(grade +" | " +vehicleName);
		$('#displayColors > div.infoModeldetails').html('<p>Κινητήρας: '+VehicleEngine+'</p><p>Τύπος Καυσίμου: '+FuelType+'</p><p>Κιβώτιο ταχυτήτων: '+VehicleTrans+'</p><p>Αμάξωμα: '+VehicleBody+'</p>');		
	}
	
	function calcPricewithColor(modelPrice, colorPrice)
	{
		var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
		var HTML2 = [];
		var sum = parseInt(modelPrice) + parseInt(colorPrice);
		
		var theCurrent = formatNumber(sum);
		$('#displayColors > div.infoModelColor').html('<p>ΣΥΝΟΛΙΚΗ ΤΙΜΗ ΜΕ ΤΟ ΧΡΩΜΑ: &euro;'+modelPrice+' + &euro;'+colorPrice+' = &euro;'+ theCurrent +stringInfo+ '</p>');
		
		$('#displayColors > div.infoModelColor > p > span > img').hover(function()
		{
			$('#displayColors > div.infoModelColor > p > span > span').show();
		},function()
		{
			$('#displayColors > div.infoModelColor > p > span > span').hide();
		});
		
		infoStdHelp();
		return sum;
	}

/*
 * End Functions for Grade B
 */	

/*
 * Start Function for Grade C
 */	

function drawTrimVehiclesC(vehicleImageBigTrimHolder, TotalVehicleColorSum, vehicleImageSmallTrimHolder, vehicleTrimNameHolder, vehcileTrimPriceHolder)
	{
		
		var HTML = [];
		var HTML1 = [];
		for(var i = 0; i < vehicleTrimNameHolder.length; i++)
		{
			//data-price="'+vehicleColorPriceB[i]+'"
				
				HTML.push('<img data-num="'+i+'" data-name="'+vehicleTrimNameHolder[i]+'" data-price="'+vehcileTrimPriceHolder[i]+'" style="width:300px; height:350px;" alt="'+vehicleTrimNameHolder[i]+'" src="'+ vehicleImageBigTrimHolder[i] +'" />');
				HTML1.push('<div class="checkTrim"><img data-num="'+i+'" data-price="'+vehcileTrimPriceHolder[i]+'" style="width:21px; height:21px !important;" alt="'+vehicleTrimNameHolder[i]+'" src="'+ vehicleImageSmallTrimHolder[i] +'" />'
				+'<br><input class="trim" name="trim[]" type="radio" value="'+ vehicleTrimNameHolder[i] + '" /></div>');
		}
		
		$('#bigImgTrim').html(HTML);
		$('#smImgTrim').html(HTML1);
		
		displayTrimC(vehicleTrimNameHolder, TotalVehicleColorSum, vehcileTrimPriceHolder);
	}
	
	function displayTrimC(vehicleTrimNameHolder, TotalVehicleColorSum, vehcileTrimPriceHolder)
	{
		
		$('#bigImgTrim > img').hide();
		//$('#bigImgTrim > img:nth-child(1)').show();
		$('#smImgTrim > div > input:radio[name="trim[]"]').prop('checked', true);
		
		var trimI;
		var trimN;
		var trimP = 0;
		
		var check = $('#smImgTrim > div > input:radio[name="trim[]"]:checked');
		var checkedValue = $('#smImgTrim > div > input:radio[name="trim[]"]:checked').val();
		//console.log("value chekced" + checkedValue);	
		
		trimN = check.attr('data-name');
		trimP = check.attr('data-price');
		
		$('#bigImgTrim > img').each(function()
			{
				var bigImage = $(this).attr('data-name');
				
						if(checkedValue == bigImage)
						{
							$(this).show();
							
							trimN = $(this).attr('data-name');
							trimP = $(this).attr('data-price');
							
						}else
						{
							$(this).hide();
						}
					
			});
		
		var TotalS = calculateColorAndTrim(TotalVehicleColorSum, trimP);
		
		displayTrimNameC(trimN, trimP);
		
			
		displayTotal(TotalS, trimN);
			
		displaySummaryTrimNameTotalSum(trimN, TotalVehicleColorSum, trimP);
		
		
		var trimName;
		var trimPrice = 0;
		
		$('#smImgTrim > div > input:radio[name="trim[]"]').on('click', function()
		{
			var radioValueTrim = $(this).val();
			$('#bigImgTrim > img').each(function()
			{
				var bigImage = $(this).attr('data-name');
				
						if(radioValueTrim == bigImage)
						{
							$(this).show();
							trimName = $(this).attr('data-name');
							trimPrice = $(this).attr('data-price');
							
						}else
						{
							$(this).hide();
						}
					
			});
			
			//calcPricewithColor(PriceVehicle, colorPrice);
			var TotalSum = calculateColorAndTrim(TotalVehicleColorSum, trimPrice);
			displayTrimNameC(trimName, trimPrice);
			
			displayTotal(TotalSum, trimName);
			
			displaySummaryTrimNameTotalSum(trimName, TotalVehicleColorSum, trimPrice);
			
		});
	}
	
	function calculateColorAndTrimC(TotalVehicleColorSum, trimPrice)
	{
		var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
		var HTML2 = [];
		var sum = parseInt(TotalVehicleColorSum) + parseInt(trimPrice);
		var theCurrent = formatNumber(sum);
		$('#dividetwo > div.infoModelColorTrim').html('<p>ΣΥΝΟΛΙΚΗ ΤΙΜΗ ΧΡΩΜΑΤΟΣ ΚΑΙ ΤΑΠΕΤΣΑΡΙΑΣ: &euro;'+TotalVehicleColorSum+' + &euro;'+trimPrice+' = &euro;'+ theCurrent + stringInfo+ '</p>');
		infoStdHelp();
		return sum;
	}
	
	function displayTrimNameC(vehicleTrimNameHolder, vehcileTrimPriceHolder)
	{
		$('#dividetwo > div.infoModeldetails').html('<p>Ταπετσαρία: '+vehicleTrimNameHolder+'</p><p>Τιμή: '+vehcileTrimPriceHolder+'</p>');
	}
	
	
	//Display Colors
	function drawRgbColorsC(PriceVehicle, jsonstr, getVehicleNumber, getNumColorVehicle, vehicleImageHolderB, vehicleColorNameHolderB, vehicleRgbcolorB, vehicleColorPriceB, vehicleColorTypeB,
		engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh)
	{
		var HTML = [];
		var HTML1 = [];
		var HTML2 = [];
		var HTML4 = [];
		var HTML5 = [];
		var HTML6 = [];
		
		
		/*
		 * 
		 * var HTML6 = [];
		 * HTML6.push('<img data-num="'+i+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:213px; heigth:160px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
		 * $('#bigImgFeed').html(HTML6);
		 * displayRgbColorFeedback(); 
		 * 
		 */
		
		for(var i = 0; i < vehicleColorNameHolderB.length; i++)
		{
			//data-price="'+vehicleColorPriceB[i]+'"
			HTML.push('<img data-num="'+i+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:92px; heigth:69px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML1.push('<img data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:451px; heigth:338px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML2.push('<div class="checkRgb"><div data-rgb="'+vehicleRgbcolorB[i]+'" data-name="'+vehicleColorNameHolderB[i]+'" class="rgbstyling" style="background-color:'+vehicleRgbcolorB[i]+'"></div>'
			+'<br><input data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgbs="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'"   class="rgb" name="rgb[]" type="radio" value="'+ vehicleRgbcolorB[i] + '" /></div>');	
			HTML4.push('<img data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:850px; margin-bottom:10px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML5.push('<img style="width:300px; height:225px;" data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
			HTML6.push('<img data-num="'+i+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" style="width:213px; heigth:160px;" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
		}
		
		$('#navcontainer > div.right > div.leftEnd').html(HTML);
		$('#bigImg').html(HTML1);
		$('#rgbcolor').html(HTML2);
		
		//$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(2) > td.getmodelname').html(HTML5);
		//displayRgbColorInsummary(jsonstr);
		//HTML5.push('<img style="width:300px; height:225px;" data-num="'+i+'" data-num="'+i+'" data-name="'+vehicleColorNameHolderB[i]+'" data-price="'+vehicleColorPriceB[i]+'" data-rgb="'+vehicleRgbcolorB[i]+'" data-type="'+vehicleColorTypeB[i]+'" alt="'+vehicleColorNameHolderB[i]+'" src="'+ vehicleImageHolderB[i] +'" />');
		
		$('#columns > div.stepThirdClose').find('#dividetwo').find('#bigImg').html(HTML4);
		
		$('#columns > div.lastStepSummary').find('#mainContentconf > table > tbody > tr:nth-child(2) > td.getmodelname').html(HTML5);
		$('#bigImgFeed').html(HTML6);
		
		displayRgbColorNavC();
		
		displayRgbColorFeedback();
		displayRgbColorInsummary(jsonstr);
		displayRgbColorC(PriceVehicle, jsonstr, getVehicleNumber, getNumColorVehicle, vehicleImageHolderB, vehicleColorNameHolderB, vehicleRgbcolorB, vehicleColorPriceB, vehicleColorTypeB,
			engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);	
		
	}
	
	function displayRgbColorC(PriceVehicle, jsonstr, getVehicleNumber, getNumColorVehicle, vehicleImageHolderB, 
		vehicleColorNameHolderB, vehicleRgbcolorB, vehicleColorPriceB, vehicleColorTypeB, 
		engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh)
	{
		$('#bigImg > img').hide();
		//$('#bigImg > img:nth-child(1)').show();
		$('#rgbcolor > div > input:radio[name="rgb[]"]').prop('checked', true);
		
		var colorI;
		var colorN;
		var colorR;
		var colorT;
		var colorP = 0;
		var TOTAL = 0;
		
		var check = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
		var checkedValue = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
		var checkedDataType = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
		
		colorR = check.attr('data-rgbs');
		colorN = check.attr('data-name');
		colorT = check.attr('data-type');
		colorP = check.attr('data-price');
		
		$('#bigImg > img').each(function()
			{
				var bigImage = $(this).attr('data-rgb');
				var dataType = $(this).attr('data-type');
					
					if(checkedValue == bigImage && checkedDataType == dataType)
					{
					
						colorI = $(this);
					
						colorI.show();			
					}else
					{
						$(this).hide();
								
					}
			});
		
		TOTAL  = calcPricewithColorA(PriceVehicle, colorP);
			
		//getColorTrimValuesC(jsonstr, TOTAL, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
			
		displayColorName(colorN, colorT, TOTAL);	
			
		displaySummarycolorNameTotalSum(colorN, colorT, TOTAL);
		
		getColorPriceAndTotalAppendTolastStep(colorP, PriceVehicle, TOTAL);
		
		infoStdHelp();
		
		var colorImage;
		var colorName;
		var colortype;
		var colorRgb;
		var colorPrice = 0;
		var totalSumForSummary = 0;
				
		$('#rgbcolor > div > input:radio[name="rgb[]"]').on('click', function()
		{
			
				var radioValueRgb = $(this).val();
				var radioDataType = $(this).attr('data-type');
				
				$('#bigImg > img').each(function()
				{
					var bigImage = $(this).attr('data-rgb');
					var dataType = $(this).attr('data-type');
					
						   if(radioValueRgb == bigImage && radioDataType == dataType)
						   {
								
								colorImage = $(this);
								
								colorImage.show();
								colorRgb = $(this).attr('data-rgb');
								colorName = $(this).attr('data-name');
								colortype = $(this).attr('data-type');
								colorPrice = $(this).attr('data-price');
								
								colorVehicleNumber = $(this).attr('data-num');
								
								totalSumForSummary = calcPricewithColorA(PriceVehicle, colorPrice);
								
								if($('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').length > 0)
								{		
									//$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table > tbody > tr:nth-child(2)')
									//.html('<td>Τελική τιμή με χρώμα</td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;"><input type="hidden" id="totalPriceForSum" value="'+totalSumForSummary+'">&euro;'+ totalSumForSummary +'</td>');
									
									var ArrayHolderImage = [];
									var ArrayHolderSKU = [];
									var ArrayHolderName = [];
									var ArrayHolderDesc = [];
									var ArrayHolderPrice = [];
									var ArrayHolderValue = [];
								
									$('#columns > div.stepNextThirdClose').find('#mainContentconf').find('#tabs-1 > table > tbody > tr > td > input[type="checkbox"]:checked').each(function()
										{
											
											
											var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
							                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
							                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
							                    +'</span>'; 
											ArrayHolderValue.push($(this).val());
											
											ArrayHolderImage.push($(this).attr('data-image'));
											
											ArrayHolderPrice.push($(this).attr('data-price'));
											
											ArrayHolderSKU.push($(this).attr('data-sku'));
											
											ArrayHolderName.push($(this).attr('data-name'));
											
											ArrayHolderDesc.push($(this).attr('data-desc'));
											
											var HTML2 = [];
											
											var check = $('#columns > div.stepTwoClose').find('#mainContentconf').find('#displayColors').find('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
											var checkedValue = $('#columns > div.stepTwoClose').find('#mainContentconf').find('#displayColors').find('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
											
											TOTAL = parseFloat(colorPrice) + parseFloat(PriceVehicle);
											
											var theTOTAL = formatNumber(TOTAL);
												
												if(ArrayHolderValue.length > 0)
												{
												
													var TotaldataSum = 0;
													var TotaldataSumWithAccessory = 0;
													
													HTML2.push('<tr><td>ΕΠΙΛΟΓΕΣ ΧΡΗΣΤΗ ΑΞΕΣΟΥΑΡ</td><td>ΤΙΜΕΣ</td></tr><tr><td><h2 style="font-size:15px;">Τιμή με Χρώμα: </td><td style="font-size:15px; font-family:Conv_Nissan Brand Regular, Sans-Serif; font-weight:bold; color:#c71444;">&euro;'+theTOTAL+'</h2></td></tr>');	
													for(var i  = 0; i < ArrayHolderValue.length; i++){
														
															
														var current = parseFloat(ArrayHolderValue[i]*1.24);
						
														var substringset = 'Ζάντες αλουμινίου';
														
														if (!ArrayHolderName[i].indexOf(substringset) || !ArrayHolderName[i].indexOf('Ζάντα αλουμινίου')) 
														{
															var setCurrentWithSet = current * 4;
															
															var theCurrentSet = formatNumber(setCurrentWithSet);
															
															TotaldataSumWithAccessory += setCurrentWithSet;
																 
														}else
														{
															
															TotaldataSum += current; 
														
															var theCurrent = formatNumber(current);	
														}
														
														
														var PriceWithoutSet = formatNumber(current);
														
														var countSpecific = 0;
										
														var substringset = 'Ζάντες αλουμινίου';
															
														if (!ArrayHolderName[i].indexOf(substringset) || !ArrayHolderName[i].indexOf('Ζάντα αλουμινίου')) 
														{
															HTML2.push(
															'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrentSet+ ' σετ: <b>&euro;(' +PriceWithoutSet+ ' x 4)'+stringInfo+'</h2></td></tr>'
															);
														}else
														{
															HTML2.push(
															'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrent+stringInfo+'</h2></td></tr>'
															);
														}	
														
														/*HTML2.push(
														'<tr><td><h2 style="font-size:15px;">'+ ArrayHolderName[i] +'</td><td style="font-size:15px; color:#c71444;">&euro;'+theCurrent+'</h2></td></tr>'
														);*/
													}
													
													var colorVehiclePrice = parseFloat(TOTAL);
				
													//total of accessories set
													var TheTotaldataSumWithAccessory = formatNumber(TotaldataSumWithAccessory);
														
													var theTotaldataSum = formatNumber(TotaldataSum);
														
													//total of all accessories with sets
													var totalOfAccesoriesAndSet = TotaldataSumWithAccessory + TotaldataSum;
														
													console.log('total of accessories that are not set '+ TotaldataSum + ' and total of accessory sets' +TotaldataSumWithAccessory);
														
													console.log('total of accessories set' + totalOfAccesoriesAndSet);
														
													//formated total of all accessories with sets
													var formatTotalOfAccesoriesAndSet = formatNumber(totalOfAccesoriesAndSet);
														
													console.log('total of accessories set and regular accessories formated ' + formatTotalOfAccesoriesAndSet);
														
													//colorVehicles with regular accessories and set of accessories.
													var Totalsum  = colorVehiclePrice + totalOfAccesoriesAndSet;
														
													var theTotalsum = formatNumber(Totalsum);
												
													HTML2.push('<tr><td><h2 style="font-size:15px;">Τιμή τών αξεσουάρ: </td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;">&euro;'+formatTotalOfAccesoriesAndSet+stringInfo+'</h2></td></tr>');	
													HTML2.push('<tr><td><h2 style="font-size:15px;">Τελική τιμή: </td><td style="font-size:15px; color:#c71444; font-weight:bold; font-family:Conv_Nissan Brand Regular, Sans-Serif;">&euro;'+theTotalsum+stringInfo+'</h2></td></tr>');
																									
													
													$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').html(HTML2);
													
													
												}else
												{
													$('#columns > div.stepThirdClose').find('#mainContentconf').find('#dividetwo').find('#columnD > div.calculateWithAccessories > div > table').html("<h2 style='font-family:Conv_Nissan Brand Regular, Sans-Serif; padding:20px; font-size:16px; text-align:center;'>Δεν Επιλέχθηκαν Αξεσουαρ</h2>");
												}
																								
										});
									
								}
														
							}else
							{
								$(this).hide();
								
							}
				});
			
			TotalVehicleColorSum  = calcPricewithColorA(PriceVehicle, colorPrice);
			
			//getColorTrimValuesC(jsonstr, TotalVehicleColorSum, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh);
			
			displayColorName(colorName, colortype, TotalVehicleColorSum);	
			
			displaySummarycolorNameTotalSum(colorName, colortype, TotalVehicleColorSum);
			
			getColorPriceAndTotalAppendTolastStep(colorPrice, PriceVehicle, TotalVehicleColorSum);
			
			infoStdHelp();
			
				
		});
		
		
	}
	
	
	function getColorTrimValuesC(jsonstr, TotalVehicleColorSum, engineVeh, fuelVeh, nameVeh, priceVeh, transVeh, bodyVeh)
	{
		
			if($('#bigImgTrim').length > 0 && $('#smImgTrim > div').length > 0 && $('#dividetwo > div.infoModeldetails').length > 0 && $('#dividetwo > div.infoModelColorTrim').length > 0)
			{
				$('#bigImgTrim').empty();
				$('#smImgTrim > div').empty();
				$('#dividetwo > div.infoModeldetails').empty();
				$('#dividetwo > div.infoModelColorTrim').empty();
					
				var holdValues = [];
				
				var checkedValues = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
				var name = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-name');
				var rgbcolors = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-rgbs');
				var prices = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-price');
				var types = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
				
				var colorImageBigHolder = [];
				var colorImageSmallHolder = [];
				var colorVehicleNameHolder = [];
				var colorVehiclePriceHolder = []; 
				
				var imageHolder;
				var vehicleColorName;	
				var rgbColor;
				var colorPrice;
				var theColorType;
								
				if(jsonstr.config.model.grades instanceof Array)
					{
					GradeB =  jsonstr.config.model.grades[2].grade.gradename['#text'];
							
							if(jsonstr.config.model.grades[2].grade.vehicles instanceof Array)
							{			
								for(var i = 0; i < jsonstr.config.model.grades[2].grade.vehicles.length; i++) 
								{
								var theVehicleFuelTypeB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.fuel['#text'];
								var theVehiclePriceB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.price['#text'];
								var theVehicleNameB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.name['#text'];
								var theVehicleEngineB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.engine['#text'].toString();
								var theVehicleTransmissionB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.transmission['#text'];
								var theVehicleBodyB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
										if(jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors instanceof Array)
										{	
												for(var j = 0; j < jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.length; j++)
												{
												imageHolder = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesC(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}	
												  	}
												}else
												{
												imageHolder = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesC(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}
												}  	
										}			
									}
								
								}else
								{
									var theVehicleFuelTypeB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.fuel['#text'];
									var theVehiclePriceB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.price['#text'];
									var theVehicleNameB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.name['#text'];
									var theVehicleEngineB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.engine['#text'].toString();
									var theVehicleTransmissionB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.transmission['#text'];
									var theVehicleBodyB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
										if(jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors instanceof Array)
										{	
												for(var j = 0; j < jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.length; j++)
												{
												imageHolder = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesC(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}	
												  	}
												}else
												{
												imageHolder = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesC(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}
												}  	
										}
								}	
												
						}else 
						{
									 	
						}
				
			}
			else
			{
				var holdValues = [];
				
				var checkedValues = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
				var name = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-name');
				var rgbcolors = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-rgbs');
				var prices = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-price');
				var types = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
				
				var colorImageBigHolder = [];
				var colorImageSmallHolder = [];
				var colorVehicleNameHolder = [];
				var colorVehiclePriceHolder = []; 
				
				var imageHolder;
				var vehicleColorName;	
				var rgbColor;
				var colorPrice;
				var theColorType;
								
				if(jsonstr.config.model.grades instanceof Array)
					{
					GradeB =  jsonstr.config.model.grades[2].grade.gradename['#text'];
							
							if(jsonstr.config.model.grades[2].grade.vehicles instanceof Array)
							{			
								for(var i = 0; i < jsonstr.config.model.grades[2].grade.vehicles.length; i++) 
								{
								var theVehicleFuelTypeB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.fuel['#text'];
								var theVehiclePriceB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.price['#text'];
								var theVehicleNameB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.name['#text'];
								var theVehicleEngineB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.engine['#text'].toString();
								var theVehicleTransmissionB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.transmission['#text'];
								var theVehicleBodyB = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
										if(jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors instanceof Array)
										{	
												for(var j = 0; j < jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.length; j++)
												{
												imageHolder = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesC(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}	
												  	}
												}else
												{
												imageHolder = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles[i].vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesC(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}
												}  	
										}			
									}
								
								}else
								{
									var theVehicleFuelTypeB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.fuel['#text'];
									var theVehiclePriceB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.price['#text'];
									var theVehicleNameB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.name['#text'];
									var theVehicleEngineB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.engine['#text'].toString();
									var theVehicleTransmissionB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.transmission['#text'];
									var theVehicleBodyB = jsonstr.config.model.grades[2].grade.vehicles.vehicle.doors['#text'];
									
									if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh 
										&& theVehicleNameB == nameVeh && theVehiclePriceB == priceVeh 
										&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
									{			
										if(jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors instanceof Array)
										{	
												for(var j = 0; j < jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.length; j++)
												{
												imageHolder = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors[j].color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesC(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}	
												  	}
												}else
												{
												imageHolder = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
												vehicleColorName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colorname['#text'];	
												rgbColor = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
												colorPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colorprice['#text'];
												theColorType = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.type['#text'];
													
														if(vehicleColorName == name && rgbColor == rgbcolors && colorPrice == prices && theColorType == types)
														{
														if(jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim instanceof Array)	
														{
															for(var k = 0; k < jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim.length; k++)
															{
																var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k]['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim[k].colortrimprice['#text'];
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
																														
															 }
														}else
														{
															    var colorBigTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimimageUrl;
																var colorSmallTrimImage = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim['@attributes'].trimsmallimageUrl;
																var vehicleColorTrimName = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimname['#text'];	
																var vehicleColorTrimPrice = jsonstr.config.model.grades[2].grade.vehicles.vehicle.colors.color.colortrims.colortrim.colortrimprice['#text'];
																
																colorImageBigHolder.push(colorBigTrimImage);
																colorImageSmallHolder.push(colorSmallTrimImage);
																colorVehicleNameHolder.push(vehicleColorTrimName);
																colorVehiclePriceHolder.push(vehicleColorTrimPrice);
														}	
															drawTrimVehiclesC(colorImageBigHolder, TotalVehicleColorSum, colorImageSmallHolder, colorVehicleNameHolder, colorVehiclePriceHolder);
															
															colorImageBigHolder.splice(0, colorImageBigHolder.length);
															colorImageSmallHolder.splice(0, colorImageSmallHolder.length);
															colorVehicleNameHolder.splice(0, colorVehicleNameHolder.length);
															colorVehiclePriceHolder.splice(0, colorVehiclePriceHolder.length);	
														
														}
												}  	
										}
								}	
												
						}else 
						{
									 	
						}
				}	
		
	  
	}
	
	function displayRgbColorNavC()
	{
		$('#navcontainer > div.right > div.leftEnd > img').hide();
		//$('#navcontainer > div.right > div.leftEnd > img:nth-child(1)').show();
		
		$('#rgbcolor > div > input:radio[name="rgb[]"]').prop('checked', true);
		
		var colorI;
		var colorN;
		var colorR;
		var colorT;
		var colorP = 0;
		var TOTAL = 0;
		
		var check = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked');
		var checkedValue = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').val();
		var checkedDataType = $('#rgbcolor > div > input:radio[name="rgb[]"]:checked').attr('data-type');
		
		colorR = check.attr('data-rgbs');
		colorN = check.attr('data-name');
		colorT = check.attr('data-type');
		colorP = check.attr('data-price');
		
		$('#navcontainer > div.right > div.leftEnd > img').each(function()
		{
			var bigImage = $(this).attr('data-rgb');
			var dataType = $(this).attr('data-type');
				
			if(checkedValue == bigImage && checkedDataType == dataType)
			{
				$(this).show();
							
			}else
			{
				$(this).hide();
			}
					
		});
		
		$('#rgbcolor > div > input:radio[name="rgb[]"]').on('click', function()
		{
			var radioValueRgb = $(this).val();
			var radioDataType = $(this).attr('data-type');
			$('#navcontainer > div.right > div.leftEnd > img').each(function()
			{
					var bigImage = $(this).attr('data-rgb');
					var dataType = $(this).attr('data-type');
				
						if(radioValueRgb == bigImage && radioDataType == dataType)
						{
							$(this).show();
							
							colorPrice = $(this).attr('data-price');
							
						}else
						{
							$(this).hide();
						}
					
			});
			
		});
	}
	
	function insertDecimal(num) {
	   return (num / 100).toFixed(2);
	}
	
	function displayGradeVehicleDetailsNavC(grade, vehicleName, VehicleEngine, FuelType, VehicleTrans, VehicleBody)
	{
		$('#navcontainer > div.right > div.rightEnd').html('<h3 style="color:#c71444;">'+grade +" | " +vehicleName+'</h3><p style="color:white;">Κινητήρας: '+VehicleEngine+'</p><p style="color:white;">Τύπος Καυσίμου: '+FuelType+'</p><p style="color:white;">Κιβώτιο ταχυτήτων: '+VehicleTrans+'</p><p style="color:white;">Αμάξωμα: '+VehicleBody+'</p>');		
	}
	
	function displayGradeVehicleDetailsC(grade, vehicleName, VehicleEngine, FuelType, VehicleTrans, VehicleBody)
	{
		var HTML = [];
		//$('#rgbcolor > h1').html(grade +" | " +vehicleName);
		$('#displayColors > div.infoModeldetails').html('<p>Κινητήρας: '+VehicleEngine+'</p><p>Τύπος Καυσίμου: '+FuelType+'</p><p>Κιβώτιο ταχυτήτων: '+VehicleTrans+'</p><p>Αμάξωμα: '+VehicleBody+'</p>');		
	}
	
	function calcPricewithColorC(modelPrice, colorPrice)
	{
		var stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
		var HTML2 = [];
		var sum = parseInt(modelPrice) + parseInt(colorPrice);
		
		var theCurrent = formatNumber(sum);
		$('#displayColors > div.infoModelColor').html('<p>ΣΥΝΟΛΙΚΗ ΤΙΜΗ ΜΕ ΤΟ ΧΡΩΜΑ: &euro;'+modelPrice+' + &euro;'+colorPrice+' = &euro;'+ theCurrent + stringInfo+'</p>');
		
		$('#displayColors > div.infoModelColor > p > span > img').hover(function()
		{
			$('#displayColors > div.infoModelColor > p > span > span').show();
		},function()
		{
			$('#displayColors > div.infoModelColor > p > span > span').hide();
		});
		
		infoStdHelp();
		return sum;
	}	
	
/*
 * End function for Grade C
 */
	
	function displaysGradefeedback(gradeNameArray, minRangeFirstGradePrice)
	{
		uniqueGradesA = GetUnique(gradeNameArray);
		$('#columns').find('#feedback-top > div:nth-child(2) > h1').html("ΕΚΔΟΣΗ "+uniqueGradesA);
		
		//displayGradeImageAndPriceFeedback(imageHolderGradeA, minRangeFirstGradePrice);
		//$('#columns > div.stepOneClose').find('#dividetwo > div:nth-child(1) > h4').filter('titlerangeprice').html("Τιμή από: "+minimumPrice);
		
	}
	
	function displayGradeImageAndPriceFeedback(imagerGradeA, minRangeFirstGradePrice)
	{
		var minPriceA = addCommas(minRangeFirstGradePrice);
		stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
		//var minPriceA = formatNumber(minRangeFirstGradePrice);
		//var minPriceA = formatNumber(minRangeFirstGradePrice);
		$('#feedback-top > div:nth-child(2) > h4').html("Τιμή: &euro;"+minPriceA + stringInfo);
		
		infoStdHelp();
		
		$('#feedback-top > div:nth-child(3) > span').html(imagerGradeA);
		
	}
	
	function displaysGradeAname(gradeNameArray, minRangeFirstGradePrice)
	{
		uniqueGradesA = GetUnique(gradeNameArray);
		$('#columns > div.stepOneClose').show("slide", { direction: "right" }, 1000)
											.find('#dividetwo > div:nth-child(1) > h1').html("ΕΚΔΟΣΗ "+uniqueGradesA);
		
		//displayGradeImageAndPriceA(imageHolderGradeA, minRangeFirstGradePrice);
		//$('#columns > div.stepOneClose').find('#dividetwo > div:nth-child(1) > h4').filter('titlerangeprice').html("Τιμή από: "+minimumPrice);
		
	}
	
	function displayGradeImageAndPriceA(imagerGradeA, minRangeFirstGradePrice)
	{
		var minPriceA = addCommas(minRangeFirstGradePrice);
		
		stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
		//var minPriceA = formatNumber(minRangeFirstGradePrice);
		//var minPriceA = formatNumber(minRangeFirstGradePrice);
		$('#dividetwo > div:nth-child(1) > h4').filter('.titlerangeprice').html("Τιμή: &euro;"+minPriceA + stringInfo);
		
		$('#dividetwo > div > h4 > span > img').hover(function()
		{
			$('#dividetwo > div > h4 > span > span').show();	
		},function()
		{
			$('#dividetwo > div > h4 > span > span').hide();
		});
		
		infoStdHelp();
		
		$('#dividetwo > div:nth-child(2) > span').filter('.imageClass').html(imagerGradeA);
		
		
		
	}
	
			
	function DrawGradeA(GradeArrayA, vehicleArrayA, imageGradeA, minimumRangePriceA)
		{
				
				var HTML = [];
				var count1 = 0;
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesA = GetUnique(GradeArrayA);
				var minPriceA = formatNumber(minimumRangePriceA);
				
					if(uniqueGradesA.length > 0)
					{	
						for(var i = 0; i < uniqueGradesA.length; i++)
							{
									
								HTML.push(
									'<ul>'+
									'<li class="FirstGrade">'+
									'<div class="priceofthepricecontainter">'+
									'<div class="pricecontainer">'+
									'<h1 class="titlerange">'+uniqueGradesA[i]+'</h1>'+
									'<hr style="border-bottom: 1px dotted #c71444;">'+
									imageGradeA +
									'<hr style="border-bottom: 1px dotted #c71444;">'+
									'<!--<h4 style="text-align:center;" class="titlerangeprice">Τιμή: &euro;'+minPriceA + stringInfo+'</h4>-->'+
									'<div style="margin-top:15px; padding:5px; border:1px solid #c71444; overflow-y:auto; height:120px;" class="priceLiContent"></div>'+
									'<h3 style="color:#c71444; font-size:15px; text-align:center;"></h3>'+
									'</div>'+
									'<ul>'+
									'<li style="text-align:center !important; border:none !important;">'+
									'<input style="margin-top:-20px;" id="firstgrade" name="grade" type="radio" value="'+uniqueGradesA[i]+'"></li>'+
									'</ul>'+
									'</div>'+    
									'</li>'+
									'</ul>'
								   );
									
								}
								
								$('#GradeA').html(HTML).show("slide", { direction: "right" }, 2000);
								
								if(vehicleArrayA.length > 0)
								{
									for(var j = 0; j < vehicleArrayA.length; j++)
									{
										var count = i + 1;
										$('#GradeA > ul > li > div > div > div').filter('.priceLiContent').append('<div style="width:155px; height:21px; padding:5px; font-weight:bold; margin-bottom:3px; background-color:#999; color:white;">'+vehicleArrayA[j]+"</div>");
										
										count1++;
										
									}
								}
								
							  $('#GradeA > ul > li > div > div > h3').append('Βρέθηκαν '+count1 + ' Αυτοκίνητα');
							  
						}else
							{
								$('#GradeA > ul > li').filter('.FirstGrade').remove();
								return false;
						    }
						}
						
				
			}
	
function DrawGradeB(GradeArrayB, vehicleArrayB, imageGradeB, minimumRangePriceB)
		{
				var HTML1 = [];
				var count2 = 0;
				
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesB = GetUnique(GradeArrayB);
				var minPriceB =  formatNumber(minimumRangePriceB);
				
					if(uniqueGradesB.length > 0)
					{	
						for(var i = 0; i < uniqueGradesB.length; i++)
							{
									
								HTML1.push(
									'<ul>'+
									'<li class="SecondGrade">'+
									'<div class="priceofthepricecontainter1">'+
									'<div class="pricecontainer1">'+
									'<h1 class="titlerange1">'+uniqueGradesB[i]+'</h1>'+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									imageGradeB +
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									'<!--<h4 style="text-align:center;" class="titlerangeprice1">Τιμή: &euro;'+minPriceB + stringInfo+'</h4>-->'+
									'<div style="margin-top:15px; padding:5px; border:1px solid #c71444; overflow-y:auto; height:120px;" class="priceLiContent1"></div>'+
									'<h3 style="color:#c71444; font-size:15px; text-align:center;"></h3>'+
									'</div>'+
									'<ul>'+
									'<li style="text-align:center !important; border:none !important;">'+
									'<input style="margin-top:-20px;" id="SecondGrade" name="grade" type="radio" value="'+uniqueGradesB[i]+'"></li>'+
									'</ul>'+
									'</div>'+    
									'</li>' +
									'</ul>'
								   );
									
								}
								
								$('#GradeB').html(HTML1).show("slide", { direction: "right" }, 3000);	
								
								if(vehicleArrayB.length > 0)
								{
									for(var j = 0; j < vehicleArrayB.length; j++)
									{
										var count = i + 1;
										$('#GradeB > ul > li > div > div > div').filter('.priceLiContent1').append('<div style="width:155px; height:21px; padding:5px; font-weight:bold; margin-bottom:3px; background-color:#999; color:white;">'+vehicleArrayB[j]+"</div>");
										count2++;
										
									}
								}
								
								$('#GradeB > ul > li > div > div > h3').append('Βρέθηκαν '+count2 + ' Αυτοκίνητα');
							  
						}else
							{
								$('#GradeB > ul > li').filter('.SecondGrade').remove();
								return false;
						    }
			}
	
function DrawGradeC(GradeArrayC, vehicleArrayC, imageGradeC, minimumRangePriceC)
			{
				var HTML2 = [];
				var count3 = 0;
				
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesC = GetUnique(GradeArrayC);
				var minPriceC = formatNumber(minimumRangePriceC);
				
				
				
					if(uniqueGradesC.length > 0)
					{	
						for(var i = 0; i < uniqueGradesC.length; i++)
							{
									
								HTML2.push(
									'<ul>'+
									'<li class="ThirdGrade">'+
									'<div class="priceofthepricecontainter2">'+
									'<div class="pricecontainer2">'+
									'<h1 class="titlerange2">'+uniqueGradesC[i]+'</h1>'+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									 imageGradeC+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									'<!--<h4 style="text-align:center;" class="titlerangeprice2">Τιμή: &euro;'+minPriceC + stringInfo+'</h4>-->'+
									'<div style="margin-top:15px; padding:5px; border:1px solid #c71444; overflow-y:auto; height:120px;" class="priceLiContent2"></div>'+
									'<h3 style="color:#c71444; font-size:15px; text-align:center;"></h3>'+
									'</div>'+
									'<ul>'+
									'<li style="text-align:center !important; border:none !important;">'+
									'<input style="margin-top:-20px;" id="ThirdGrade" name="grade" type="radio" value="'+uniqueGradesC[i]+'"></li>'+
									'</ul>'+
									'</div>'+    
									'</li>' +
									'</ul>'
								   );
									
								}
								
								$('#GradeC').html(HTML2).show("slide", { direction: "right" }, 1000);
								
								if(vehicleArrayC.length > 0)
								{
									for(var j = 0; j < vehicleArrayC.length; j++)
									{
										var count = i + 1;
										$('#GradeC > ul > li > div > div > div').filter('.priceLiContent2').append('<div style="width:155px; height:21px; padding:5px; font-weight:bold; margin-bottom:3px; background-color:#999; color:white;">'+vehicleArrayC[j]+"</div>");
										count3++;
										
									}
								}
								
								$('#GradeC > ul > li > div > div > h3').append('Βρέθηκαν '+count3 + ' Αυτοκίνητα');
							  
						}else
							{
								$('#GradeC > ul > li').filter('.ThirdGrade').remove();
								return false;
						    }
			}		
			
function DrawGradeD(GradeArrayD, vehicleArrayD, imageGradeD, minimumRangePriceD)
			{
				var HTML2 = [];
				var count3 = 0;
				
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesD = GetUnique(GradeArrayD);
				var minPriceD = formatNumber(minimumRangePriceD);
				
				
				
					if(uniqueGradesD.length > 0)
					{	
						for(var i = 0; i < uniqueGradesD.length; i++)
							{
									
								HTML2.push(
									'<ul>'+
									'<li class="FourthGrade">'+
									'<div class="priceofthepricecontainter2">'+
									'<div class="pricecontainer2">'+
									'<h1 class="titlerange2">'+uniqueGradesD[i]+'</h1>'+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									 imageGradeD+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									'<!--<h4 style="text-align:center;" class="titlerangeprice2">Τιμή: &euro;'+minPriceD + stringInfo+'</h4>-->'+
									'<div style="margin-top:15px; padding:5px; border:1px solid #c71444; overflow-y:auto; height:120px;" class="priceLiContent2"></div>'+
									'<h3 style="color:#c71444; font-size:15px; text-align:center;"></h3>'+
									'</div>'+
									'<ul>'+
									'<li style="text-align:center !important; border:none !important;">'+
									'<input style="margin-top:-20px;" id="FourthGrade" name="grade" type="radio" value="'+uniqueGradesD[i]+'"></li>'+
									'</ul>'+
									'</div>'+    
									'</li>' +
									'</ul>'
								   );
									
								}
								
								$('#GradeD').html(HTML2).show("slide", { direction: "right" }, 1000);
								
								if(vehicleArrayD.length > 0)
								{
									for(var j = 0; j < vehicleArrayD.length; j++)
									{
										var count = i + 1;
										$('#GradeD > ul > li > div > div > div').filter('.priceLiContent2').append('<div style="width:155px; height:21px; padding:5px; font-weight:bold; margin-bottom:3px; background-color:#999; color:white;">'+vehicleArrayD[j]+"</div>");
										count3++;
										
									}
								}
								
								$('#GradeD > ul > li > div > div > h3').append('Βρέθηκαν '+count3 + ' Αυτοκίνητα');
							  
						}else
							{
								$('#GradeD > ul > li').filter('.FourthGrade').remove();
								return false;
						    }
			}
			
function DrawGradeE(GradeArrayE, vehicleArrayE, imageGradeE, minimumRangePriceE)
			{
				var HTML2 = [];
				var count3 = 0;
				
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesE = GetUnique(GradeArrayE);
				var minPriceE = formatNumber(minimumRangePriceE);
				
					if(uniqueGradesE.length > 0)
					{	
						for(var i = 0; i < uniqueGradesE.length; i++)
							{
									
								HTML2.push(
									'<ul>'+
									'<li class="FifthGrade">'+
									'<div class="priceofthepricecontainter2">'+
									'<div class="pricecontainer2">'+
									'<h1 class="titlerange2">'+uniqueGradesE[i]+'</h1>'+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									 imageGradeE+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									'<!--<h4 style="text-align:center;" class="titlerangeprice2">Τιμή: &euro;'+minPriceE + stringInfo+'</h4>-->'+
									'<div style="margin-top:15px; padding:5px; border:1px solid #c71444; overflow-y:auto; height:120px;" class="priceLiContent2"></div>'+
									'<h3 style="color:#c71444; font-size:15px; text-align:center;"></h3>'+
									'</div>'+
									'<ul>'+
									'<li style="text-align:center !important; border:none !important;">'+
									'<input style="margin-top:-20px;" id="FifthGrade" name="grade" type="radio" value="'+uniqueGradesE[i]+'"></li>'+
									'</ul>'+
									'</div>'+    
									'</li>' +
									'</ul>'
								   );
									
								}
								
								$('#GradeE').html(HTML2).show("slide", { direction: "right" }, 1000);
								
								if(vehicleArrayE.length > 0)
								{
									for(var j = 0; j < vehicleArrayE.length; j++)
									{
										var count = i + 1;
										$('#GradeE > ul > li > div > div > div').filter('.priceLiContent2').append('<div style="width:155px; height:21px; padding:5px; font-weight:bold; margin-bottom:3px; background-color:#999; color:white;">'+vehicleArrayE[j]+"</div>");
										count3++;
										
									}
								}
								
								$('#GradeE > ul > li > div > div > h3').append('Βρέθηκαν '+count3 + ' Αυτοκίνητα');
							  
						}else
							{
								$('#GradeE > ul > li').filter('.FifthGrade').remove();
								return false;
						    }
			}
			
function DrawGradeF(GradeArrayF, vehicleArrayF, imageGradeF, minimumRangePriceF)
			{
				var HTML2 = [];
				var count3 = 0;
				
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesF = GetUnique(GradeArrayF);
				var minPriceF = formatNumber(minimumRangePriceF);
				
					if(uniqueGradesF.length > 0)
					{	
						for(var i = 0; i < uniqueGradesF.length; i++)
							{
									
								HTML2.push(
									'<ul>'+
									'<li class="SixthGrade">'+
									'<div class="priceofthepricecontainter2">'+
									'<div class="pricecontainer2">'+
									'<h1 class="titlerange2">'+uniqueGradesF[i]+'</h1>'+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									 imageGradeF+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									'<!--<h4 style="text-align:center;" class="titlerangeprice2">Τιμή: &euro;'+minPriceF + stringInfo+'</h4>-->'+
									'<div style="margin-top:15px; padding:5px; border:1px solid #c71444; overflow-y:auto; height:120px;" class="priceLiContent2"></div>'+
									'<h3 style="color:#c71444; font-size:15px; text-align:center;"></h3>'+
									'</div>'+
									'<ul>'+
									'<li style="text-align:center !important; border:none !important;">'+
									'<input style="margin-top:-20px;" id="SixthGrade" name="grade" type="radio" value="'+uniqueGradesF[i]+'"></li>'+
									'</ul>'+
									'</div>'+    
									'</li>' +
									'</ul>'
								   );
									
								}
								
								$('#GradeF').html(HTML2).show("slide", { direction: "right" }, 1000);
								
								if(vehicleArrayF.length > 0)
								{
									for(var j = 0; j < vehicleArrayF.length; j++)
									{
										var count = i + 1;
										$('#GradeF > ul > li > div > div > div').filter('.priceLiContent2').append('<div style="width:155px; height:21px; padding:5px; font-weight:bold; margin-bottom:3px; background-color:#999; color:white;">'+vehicleArrayF[j]+"</div>");
										count3++;
										
									}
								}
								
								$('#GradeF > ul > li > div > div > h3').append('Βρέθηκαν '+count3 + ' Αυτοκίνητα');
							  
						}else
							{
								$('#GradeF > ul > li').filter('.SixthGrade').remove();
								return false;
						    }
			}
			
function DrawGradeG(GradeArrayG, vehicleArrayG, imageGradeG, minimumRangePriceG)
			{
				var HTML2 = [];
				var count3 = 0;
				
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesG = GetUnique(GradeArrayG);
				var minPriceG = formatNumber(minimumRangePriceG);
				
				
				
					if(uniqueGradesG.length > 0)
					{	
						for(var i = 0; i < uniqueGradesG.length; i++)
							{
									
								HTML2.push(
									'<ul>'+
									'<li class="SeventhGrade">'+
									'<div class="priceofthepricecontainter2">'+
									'<div class="pricecontainer2">'+
									'<h1 class="titlerange2">'+uniqueGradesG[i]+'</h1>'+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									 imageGradeG+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									'<!--<h4 style="text-align:center;" class="titlerangeprice2">Τιμή: &euro;'+minPriceG + stringInfo+'</h4>-->'+
									'<div style="margin-top:15px; padding:5px; border:1px solid #c71444; overflow-y:auto; height:120px;" class="priceLiContent2"></div>'+
									'<h3 style="color:#c71444; font-size:15px; text-align:center;"></h3>'+
									'</div>'+
									'<ul>'+
									'<li style="text-align:center !important; border:none !important;">'+
									'<input style="margin-top:-20px;" id="SeventhGrade" name="grade" type="radio" value="'+uniqueGradesG[i]+'"></li>'+
									'</ul>'+
									'</div>'+    
									'</li>' +
									'</ul>'
								   );
									
								}
								
								$('#GradeG').html(HTML2).show("slide", { direction: "right" }, 1000);
								
								if(vehicleArrayG.length > 0)
								{
									for(var j = 0; j < vehicleArrayG.length; j++)
									{
										var count = i + 1;
										$('#GradeG > ul > li > div > div > div').filter('.priceLiContent2').append('<div style="width:155px; height:21px; padding:5px; font-weight:bold; margin-bottom:3px; background-color:#999; color:white;">'+vehicleArrayG[j]+"</div>");
										count3++;
										
									}
								}
								
								$('#GradeG > ul > li > div > div > h3').append('Βρέθηκαν '+count3 + ' Αυτοκίνητα');
							  
						}else
							{
								$('#GradeG > ul > li').filter('.SeventhGrade').remove();
								return false;
						    }
			}

function DrawGradeH(GradeArrayH, vehicleArrayH, imageGradeH, minimumRangePriceH)
			{
				var HTML2 = [];
				var count3 = 0;
				
				console.log("DrawGradeH");
				
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesH = GetUnique(GradeArrayH);
				var minPriceH = formatNumber(minimumRangePriceH);
					if(uniqueGradesH.length > 0)
					{	
						for(var i = 0; i < uniqueGradesH.length; i++)
							{
								HTML2.push(
									'<ul>'+
									'<li class="eighthGrade">'+
									'<div class="priceofthepricecontainter2">'+
									'<div class="pricecontainer2">'+
									'<h1 class="titlerange2">'+uniqueGradesH[i]+'</h1>'+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									 imageGradeH+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									'<!--<h4 style="text-align:center;" class="titlerangeprice2">Τιμή: &euro;'+minPriceH + stringInfo+'</h4>-->'+
									'<div style="margin-top:15px; padding:5px; border:1px solid #c71444; overflow-y:auto; height:120px;" class="priceLiContent2"></div>'+
									'<h3 style="color:#c71444; font-size:15px; text-align:center;"></h3>'+
									'</div>'+
									'<ul>'+
									'<li style="text-align:center !important; border:none !important;">'+
									'<input style="margin-top:-20px;" id="eighthGrade" name="grade" type="radio" value="'+uniqueGradesH[i]+'"></li>'+
									'</ul>'+
									'</div>'+    
									'</li>' +
									'</ul>'
								   );
									
								}
								
								$('#GradeH').html(HTML2).show("slide", { direction: "right" }, 1000);
								
								if(vehicleArrayH.length > 0)
								{
									for(var j = 0; j < vehicleArrayH.length; j++)
									{
										var count = i + 1;
										$('#GradeH > ul > li > div > div > div').filter('.priceLiContent2').append('<div style="width:155px; height:21px; padding:5px; font-weight:bold; margin-bottom:3px; background-color:#999; color:white;">'+vehicleArrayH[j]+"</div>");
										console.log("vehicleNames"+ vehicleArrayH[j]);
										count3++;
										
									}
								}
								
								$('#GradeH > ul > li > div > div > h3').append('Βρέθηκαν '+count3 + ' Αυτοκίνητα');
							  
						}else
							{
								$('#GradeH > ul > li').filter('.eighthGrade').remove();
								return false;
						    }
			}

/*
* #eighthGrade, minRangeEightGradePrice, GradeH
* #ninthGrade, minRangeNinthGradePrice, GradeI
* #tenthGrade, minRangeTenthGradePrice, GradeJ
* 
*/	

function DrawGradeI(GradeArrayI, vehicleArrayI, imageGradeI, minimumRangePriceI)
			{
				var HTML2 = [];
				var count3 = 0;
				
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesI = GetUnique(GradeArrayI);
				var minPriceI = formatNumber(minimumRangePriceI);
				
				//console.log('unique' + uniqueGradesI);
				//console.log('minPriceG' + minPriceI);
				
					if(uniqueGradesI.length > 0)
					{	
						for(var i = 0; i < uniqueGradesI.length; i++)
							{
									
								HTML2.push(
									'<ul>'+
									'<li class="ninthGrade">'+
									'<div class="priceofthepricecontainter2">'+
									'<div class="pricecontainer2">'+
									'<h1 class="titlerange2">'+uniqueGradesI[i]+'</h1>'+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									 imageGradeI+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									'<!--<h4 style="text-align:center;" class="titlerangeprice2">Τιμή: &euro;'+minPriceI + stringInfo+'</h4>-->'+
									'<div style="margin-top:15px; padding:5px; border:1px solid #c71444; overflow-y:auto; height:120px;" class="priceLiContent2"></div>'+
									'<h3 style="color:#c71444; font-size:15px; text-align:center;"></h3>'+
									'</div>'+
									'<ul>'+
									'<li style="text-align:center !important; border:none !important;">'+
									'<input style="margin-top:-20px;" id="ninthGrade" name="grade" type="radio" value="'+uniqueGradesI[i]+'"></li>'+
									'</ul>'+
									'</div>'+    
									'</li>' +
									'</ul>'
								   );
									
								}
								
								$('#GradeI').html(HTML2).show("slide", { direction: "right" }, 1000);
								
								if(vehicleArrayI.length > 0)
								{
									for(var j = 0; j < vehicleArrayI.length; j++)
									{
										var count = i + 1;
										$('#GradeI > ul > li > div > div > div').filter('.priceLiContent2').append('<div style="width:155px; height:21px; padding:5px; font-weight:bold; margin-bottom:3px; background-color:#999; color:white;">'+vehicleArrayI[j]+"</div>");
										count3++;
										
									}
								}
								
								$('#GradeI > ul > li > div > div > h3').append('Βρέθηκαν '+count3 + ' Αυτοκίνητα');
							  
						}else
							{
								$('#GradeI > ul > li').filter('.ninthGrade').remove();
								return false;
						    }
			}

/*
* #eighthGrade, minRangeEightGradePrice, GradeH
* #ninthGrade, minRangeNinthGradePrice, GradeI
* #tenthGrade, minRangeTenthGradePrice, GradeJ
* 
*/	

function DrawGradeJ(GradeArrayJ, vehicleArrayJ, imageGradeJ, minimumRangePriceJ)
			{
				var HTML2 = [];
				var count3 = 0;
				
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="https://experience-nissan.gr/skin/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα και τα αξεσουάρ που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesJ = GetUnique(GradeArrayJ);
				var minPriceJ = formatNumber(minimumRangePriceJ);
				
				console.log('unique' + uniqueGradesJ);
				console.log('minPriceG' + minPriceJ);
				
					if(uniqueGradesJ.length > 0)
					{	
						for(var i = 0; i < uniqueGradesJ.length; i++)
							{
								//console.log('inside Loop');	
								HTML2.push(
									'<ul>'+
									'<li class="tenthGrade">'+
									'<div class="priceofthepricecontainter2">'+
									'<div class="pricecontainer2">'+
									'<h1 class="titlerange2">'+uniqueGradesJ[i]+'</h1>'+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									 imageGradeJ+
									'<hr style="border-bottom: 1px dotted #c71444;">' +
									'<!--<h4 style="text-align:center;" class="titlerangeprice2">Τιμή: &euro;'+minPriceJ + stringInfo+'</h4>-->'+
									'<div style="margin-top:15px; padding:5px; border:1px solid #c71444; overflow-y:auto; height:120px;" class="priceLiContent2"></div>'+
									'<h3 style="color:#c71444; font-size:15px; text-align:center;"></h3>'+
									'</div>'+
									'<ul>'+
									'<li style="text-align:center !important; border:none !important;">'+
									'<input style="margin-top:-20px;" id="tenthGrade" name="grade" type="radio" value="'+uniqueGradesJ[i]+'"></li>'+
									'</ul>'+
									'</div>'+    
									'</li>' +
									'</ul>'
								   );
									
								}
								
								$('#GradeJ').html(HTML2).show("slide", { direction: "right" }, 1000);
								
								if(vehicleArrayJ.length > 0)
								{
									for(var j = 0; j < vehicleArrayJ.length; j++)
									{
										var count = i + 1;
										$('#GradeI > ul > li > div > div > div').filter('.priceLiContent2').append('<div style="width:155px; height:21px; padding:5px; font-weight:bold; margin-bottom:3px; background-color:#999; color:white;">'+vehicleArrayJ[j]+"</div>");
										count3++;
										
									}
								}
								
								$('#GradeJ > ul > li > div > div > h3').append('Βρέθηκαν '+count3 + ' Αυτοκίνητα');
							  
						}else
							{
								$('#GradeJ > ul > li').filter('.tenthGrade').remove();
								return false;
						    }
			}			
				
function mergeArrays(GradeArray, vehicleArray)
	{
		if(GradeArray.length > 0)
		{
			
		}else 
		{
			return false;
		}
	}				
				
function addCommas(nStr){
 nStr += '';
 var x = nStr.split('.');
 var x1 = x[0];
 var x2 = x.length > 1 ? '.' + x[1] : '';
 var rgx = /(\d+)(\d{3})/;
 while (rgx.test(x1)) {
  x1 = x1.replace(rgx, '$1' + ',' + '$2');
 }
 return x1 + x2;
}

function formatNumber(number)
{
    number = number.toFixed(2) + '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
						
			
function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

function containsAll(getarray, getarray1, counter){ 
  for(var i = 0, len = getarray.length; i < len; i++)
  {
     if($.inArray(getarray[i], getarray1) == -1)
     {
     	counter+=1;
     	
     }else
     {
     	counter+=1;
     } 
  }
}
			
function getIntersect(arr1, arr2) {
    var temp = [];
    for(var i = 0; i < arr1.length; i++){
        for(var k = 0; k < arr2.length; k++){
            if(arr1[i] == arr2[k]){
                temp.push( arr1[i]);
                break;
            }
        }
    }
    return temp;
}			

		
