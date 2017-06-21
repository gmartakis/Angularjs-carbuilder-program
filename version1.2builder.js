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
//http://www.nissan.gr/builder/'+theCar+'/format/xml
//var jsonstring = xml2json.fromFile('/xml/note.xml', 'string');

//Car Builder
var Builder1 = {
				 Model:{
				 	Name:'', 
				 	Grades:{
				 			Grade:
				 				 {
				 				 	Name:[], 
						 			Vehicles:
						 				{
						 					Vehicle:
						 						{
						 							Name:[], 
						 							Price:[],
						 							fuelType:[],
						 							Engine:[],
						 							Transmission:[],
						 							body:[]
						 						}
						 				}
				 				  }
				 			}
				 		}
				};


$(document).ready(function()
{
	
	//preloader
	
	setTimeout(function(){
		$('body').addClass('loaded');
		//$('h1').css('color','#222222');
	}, 3500);
	
	var thecounter = 0;
	var jsonstr; 
	$.ajax({
		  url: 'http://www.nissan.gr/builder/'+theCar+'/format/json',
		  async: false,
		  dataType: 'json',
		  success: function (jsonObj) {
		    jsonstr = jsonObj;
		  }
		});
	
	modelsname = jsonstr.config.model['@attributes'].name;
	
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
									vehicleBodyWork = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.bodywork['#text'];
									
									
									vehicle.fuelType.push(vehicleFuel);
									console.log(vehicle.fuelType);
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
				console.log(gradeName);
				grade1.gradename1.push(gradeName);
				
				for(var i = 0; i < jsonstr.config.model.grades.grade.vehicles.length; i++) 
					{
						getVehicleNum = i;
						vehicleFuel = jsonstr.config.model.grades.grade.vehicles[i].vehicle.fuel['#text'];
						vehiclePrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.price['#text'];
						vehicleName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.name['#text'];
						vehicleEngine = jsonstr.config.model.grades.grade.vehicles[i].vehicle.engine['#text'].toString();
						vehicleTrans = jsonstr.config.model.grades.grade.vehicles[i].vehicle.transmission['#text'];
						vehicleBodyWork = jsonstr.config.model.grades.grade.vehicles[i].vehicle.bodywork['#text'];
						
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
				 // This is the Feedback toggle functionality it slides the feedback form in and out
			    // of view when the user clicks the div with the class .feedback-toggle
			    $('.feedback-toggle').click( function(){
			        var 	left = parseFloat($('.feedback')[0].style.left.match(/[0-9]+/g)) || 8,
			                tgl	 = '+=491';
			        (left > 8)  ? tgl = '-=491' : tgl = '+=491';
			        $('.feedback').animate({ left: tgl}, 500);
			    });
			
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
	 			htmlbodyworks.push('<li><input id="body-'+i+'" class="body" name="body[]" type="checkbox" value="'+ storeuniqueBody[i] + '">' + storeuniqueBody[i] + '</input></li>');
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
					
					console.log("phre default times");
					
					currentMinValue = $("#slider-range").slider("values", 0);
					currentMaxValue = $("#slider-range").slider("values", 1);
					console.log("todo");
					
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
				console.log(arrayFuel);
				
				console.log(arrayEngineType);
				console.log(arrayTransmission);
				console.log(arrayBody);
				
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
				
				var result = new Array();	
				
				
				
				function gradeVehicle(grades, imageHolder, vehicleName, vehicleEngine)
				{
					
					this.GradeName = grades;
					this.ImageHolder = imageHolder;
					this.VehicleName = vehicleName;
					
					var myarray = [];
					
					for(var k = 0; k < this.GradeName.length; k++)
					{
						myarray[k] = this.GradeName[k];
						
					}
					
				}
				
				/*
				 * loop through JSON Object Array to retrieve Models, Grades, Vehicles
				 */
				var grades = [];
				
				
				if(jsonstr.config.model.grades instanceof Array)
				{
				for(var i = 0; i < jsonstr.config.model.grades.length; i++)
				{
					if(allCheckBox.length > 0)
					{
						if(jsonstr.config.model.grades instanceof Array)
						{	
							//loop through grades	
							gradesVehicles = jsonstr.config.model.grades[i].grade.gradename['#text'];
							imageUrlGrade = jsonstr.config.model.grades[i].grade['@attributes'].imageurl;
							console.log(imageUrlGrade); 
							imageHolderGrade = '<img alt="" src="'+imageUrlGradeA+'" />';	
							
							grades.push(gradesVehicles);
							
									if(jsonstr.config.model.grades[i].grade.vehicles instanceof Array)
									{
											for(var j = 0; j < jsonstr.config.model.grades[i].grade.vehicles.length; j++)
												{
														theVehicleFuelType = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.fuel['#text'];
														theVehiclePrice = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.price['#text'];
														theVehicleName = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.name['#text'];
														theVehicleEngine = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.engine['#text'].toString();
														theVehicleTransmission = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.transmission['#text'];
														theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.bodywork['#text'];
													
													if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																	
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	
																	//arrayList[gradesVehicles][theVehicleFuelType] = [];
																	
																	//console.log(arrayList);
																	
																	var GradeAndVehicles = new gradeVehicle(grades, imageHolderGrade, pushtheVehicleNameA, pushVehicleEngineA);
																	
																	
																	//console.log('grades' + GradeAndVehicles.myarray[i]);
																	
																	var JSONStringvehicleGrade = JSON.stringify(GradeAndVehicles);
																	
																	var JsonObject = JSON.parse(JSONStringvehicleGrade);
																	
																	console.log(JSONStringvehicleGrade);
																	
																	//console.log('GradeName: '+JsonObject.GradeName);	
																	/*
																	 * arrayList.push(GradeAndVehicles);
																	 * var theArrayList = JSON.stringify(arrayList);
																	 * console.log(theArrayList);
																	 * javascriptArrayObject = JSON.parse(thisArrayList); 
																	 */	
																	
																	counter+=1;
																	
													  	}
																
													}
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														//console.log("something is wrong");
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
															
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	//console.log(gradesVehicles);
																	//console.log(theVehicleName);
																	
																	var GradeAndVehicles = new gradeVehicle(gradesVehicles, imageHolderGrade, pushtheVehicleNameA);
																	
																	var JSONStringvehicleGrade = JSON.stringify(GradeAndVehicles);
																	
																	console.log(JSONStringvehicleGrade);
																	
																	var javascriptObject1 = JSON.parse(JSONStringvehicleGrade);
																	
																 	counter+=1;
														}
													}
													//Transmission
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														console.log('got in to Transmission');
														if((arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
															
															counter++;
														}
													}
													//body
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0)
													{
														if((arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
															
															counter++;
														}
													}
													//fuel and engine
													else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayEngineType.indexOf(theVehicleEngine) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
															
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
															counter++;
														}
													}
													//fuel and transmission
													else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
																counter++;
														}
													}
													//fuel and body
													else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
															    	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
															
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
																counter++;
														}
													}
													//engine and Transmission
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0 
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBodyA);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
																counter++;
														}
													}
													
													//engine and body
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0 
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
																counter++;
														}
													}
													
													//Transmission and body
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayTransmission.indexOf(theVehicleTransmission) >= 0 
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
														theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles.vehicle.bodywork['#text'];
													
													
													if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																counter+=1;
													  	}
																
													}
													//engine
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
															
															counter++;
														}
													}
													//Transmission
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
													{
														console.log('got in to Transmission');
														if((arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																	counter++;
														}
													}
													//body
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0)
													{
														if((arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue)){
															
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																	counter++;
														}
													}
													//fuel and engine
													else if(checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayEngineType.indexOf(theVehicleEngine) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
															
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																	counter++;
														}
													}
													//fuel and transmission
													else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
																counter++;
														}
													}
													//fuel and body
													else if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayFuel.indexOf(theVehicleFuelType) >= 0 && arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
															
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
																counter++;
														}
													}
													//engine and Transmission
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0){
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0 
														&& arrayTransmission.indexOf(theVehicleTransmission) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
																counter++;
														}
													}
													
													//engine and body
													else if(!checkBoxesFuel.length > 0 && checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayEngineType.indexOf(theVehicleEngine) >= 0 
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
																counter++;
														}
													}
													
													//Transmission and body
													else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && checkBoxesBodyWork.length > 0){
														if((arrayTransmission.indexOf(theVehicleTransmission) >= 0 
														&& arrayBody.indexOf(theVehicleBody) >= 0)
														&& (theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
														{
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
																
																	pushgradesVehiclesA.push(gradesVehicles);
																	pushtheVehicleNameA.push(theVehicleName);
																	pushVehiclePriceA.push(theVehiclePrice);
																	pushVehicleEngineA.push(theVehicleEngine);
																	pushVehicleFuelTypeA.push(theVehicleFuelType);
																	pushVehicleTransA.push(theVehicleTransmission);
																	pushVehicleBodyA.push(theVehicleBody);
																	console.log(gradesVehicles);
																	console.log(theVehicleName);
																
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
								
								pushtheVehicleNameA.splice(0, pushtheVehicleNameA.length);	
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
															theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles[j].vehicle.bodywork['#text'];
											
												if((theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
													{
														pushgradesVehiclesA.push(gradesVehicles);
														pushtheVehicleNameA.push(theVehicleName);
														pushVehiclePriceA.push(theVehiclePrice);
														pushVehicleEngineA.push(theVehicleEngine);
														pushVehicleFuelTypeA.push(theVehicleFuelType);
														pushVehicleTransA.push(theVehicleTransmission);
														pushVehicleBodyA.push(theVehicleBody);
														console.log(gradesVehicles);
														console.log(theVehicleName);
																	
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
												theVehicleBody = jsonstr.config.model.grades[i].grade.vehicles.vehicle.bodywork['#text'];
												
														
												if((theVehiclePrice >= currentMinValue && theVehiclePrice <= currentMaxValue))
													{
														
														pushgradesVehiclesA.push(gradesVehicles);
														pushtheVehicleNameA.push(theVehicleName);
														pushVehiclePriceA.push(theVehiclePrice);
														pushVehicleEngineA.push(theVehicleEngine);
														pushVehicleFuelTypeA.push(theVehicleFuelType);
														pushVehicleTransA.push(theVehicleTransmission);
														pushVehicleBodyA.push(theVehicleBody);
														console.log(gradesVehicles);
														console.log(theVehicleName);
																
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
									theVehicleBodyA = jsonstr.config.model.grades.grade.vehicles[i].vehicle.bodywork['#text'];
									
									pushVehiclePriceRangeA.push(theVehiclePriceA);
									
									if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
									{
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0)
											&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											//console.log('We are in Grade A when Fuel checkbox is checked');
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
											counter++;
														
										}
									}
									//Transmission
									else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
									{
										 console.log('got in to Transmission');
										 if((arrayTransmission.indexOf(theVehicleTransmissionA) >= 0)
										 && (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue)){
														
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
									theVehicleBodyA = jsonstr.config.model.grades.grade.vehicles.vehicle.bodywork['#text'];
									
									pushVehiclePriceRangeA.push(theVehiclePriceA);
									
									if(checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && !checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
									{
										if((arrayFuel.indexOf(theVehicleFuelTypeA) >= 0)
											&& (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue))
										{
											//console.log('We are in Grade A when Fuel checkbox is checked');
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
											counter++;
														
										}
									}
									//Transmission
									else if(!checkBoxesFuel.length > 0 && !checkBoxesEngine.length > 0 && checkBoxesTransmission.length > 0 && !checkBoxesBodyWork.length > 0)
									{
										 console.log('got in to Transmission');
										 if((arrayTransmission.indexOf(theVehicleTransmissionA) >= 0)
										 && (theVehiclePriceA >= currentMinValue && theVehiclePriceA <= currentMaxValue)){
														
											pushgradesVehiclesA.push(gradesVehiclesA);
											pushtheVehicleNameA.push(theVehicleNameA);
											pushVehiclePriceA.push(theVehiclePriceA);
											pushVehicleEngineA.push(theVehicleEngineA);
											pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
											pushVehicleTransA.push(theVehicleTransmissionA);
											pushVehicleBodyA.push(theVehicleBodyA);
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
											
											console.log(gradesVehiclesA);
											console.log(theVehicleNameA);
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
												console.log(gradesVehiclesA);
												console.log(theVehicleNameA);		
											
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
												console.log(gradesVehiclesA);
												console.log(theVehicleNameA);		
											
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
		
		if(counter == 0){
			$('#mainContentconf > div:nth-child(6) > a > span').off('click');
		}else {
			 $('#mainContentconf > div:nth-child(6) > a > span').on('click', function(e){
			 
			 if(modelsname == 'Qashqai')
				{
					$('#columns > div.stepClose').find('#mainContentscroll').css('width', '1700px');
				}
			
			 e.stopPropagation();		
		   	 $('#mainContentconf').hide("slide", { direction: "top" }, 300);	
		   	 $('#columns > div.stepClose').show("slide", { direction: "right" }, 1000)
				.find('#mainContentscroll');
				
				minRangeFirstGradePrice = Math.min.apply(Math, pushVehiclePriceRangeA);
				//minRangeSecondGradePrice = Math.min.apply(Math, pushVehiclePriceRangeB);
				//minRangeThirdGradePrice = Math.min.apply(Math, pushVehiclePriceRangeC);
				//minRangeFourthGradePrice = Math.min.apply(Math, pushVehiclePriceRangeD);	
				//minRangeFifthGradePrice = Math.min.apply(Math, pushVehiclePriceRangeE);
				//minRangeSixthGradePrice = Math.min.apply(Math, pushVehiclePriceRangeF);
				//minRangeSeventhGradePrice = Math.min.apply(Math, pushVehiclePriceRangeG);
				
				/*
				 * pushgradesVehiclesA.push(gradesVehiclesA);
				   pushtheVehicleNameA.push(theVehicleNameA);
				   pushVehiclePriceA.push(theVehiclePriceA);
				   pushVehicleEngineA.push(theVehicleEngineA);
				   pushVehicleFuelTypeA.push(theVehicleFuelTypeA);
				   pushVehicleTransA.push(theVehicleTransmissionA);
				   pushVehicleBodyA.push(theVehicleBodyA);
				 */
				
				
				DrawGrade(pushgradesVehiclesA, pushtheVehicleNameA, imageHolderGradeA, minRangeSecondGradePrice);
				//DrawGradeB(pushgradesVehiclesB, pushtheVehicleNameB, imageHolderGradeB, minRangeSecondGradePrice);
				//DrawGradeC(pushgradesVehiclesC, pushtheVehicleNameC, imageHolderGradeC, minRangeThirdGradePrice);
				//DrawGradeD(pushgradesVehiclesD, pushtheVehicleNameD, imageHolderGradeD, minRangeFourthGradePrice);
				//DrawGradeE(pushgradesVehiclesE, pushtheVehicleNameE, imageHolderGradeE, minRangeFifthGradePrice);
				//DrawGradeF(pushgradesVehiclesF, pushtheVehicleNameF, imageHolderGradeF, minRangeSixthGradePrice);
				//DrawGradeG(pushgradesVehiclesG, pushtheVehicleNameG, imageHolderGradeG, minRangeSeventhGradePrice);
				
				infoStdHelp();
				
			});
		}
		
		function DrawGrade(GradeArrayA, vehicleArrayA, imageGradeA, minimumRangePriceA)
		{
			var HTML = [];
				var count1 = 0;
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="http://skin.nissan.gr/default/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesA = GetUnique(GradeArrayA);
				//console.log(uniqueGradesA);
				//console.log(vehicleArrayA);
				//var minPriceA = formatNumber(minimumRangePriceA);
				
				/*	if(uniqueGradesA.length > 0)
					{	
						for(var i = 0; i < uniqueGradesA.length; i++)
							{
									
								HTML.push(
									'<ul>'+
									'<li class="FirstGrade">'+
									'<div class="priceofthepricecontainter">'+
									'<div class="pricecontainer">'+
									'<h1 class="titlerange">'+uniqueGradesA[i]+'</h1>'+
									'<hr style="border-bottom: 1px dotted #c71444;">'
									 +imageGradeA +
									'<hr style="border-bottom: 1px dotted #c71444;">'+
									'<h4 style="text-align:center;" class="titlerangeprice">Τιμή: &euro;'+minPriceA + stringInfo+'</h4>'+
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
										
										console.log(vehicleArrayA[j]);
										count1++;
										
									}
								}
								
							  $('#GradeA > ul > li > div > div > h3').append('Βρέθηκαν '+count1 + ' Αυτοκίνητα');
							  
						}else
							{
								$('#GradeA > ul > li').filter('.FirstGrade').remove();
								return false;
						    }*/
		}
		
		$('#columns > div.stepClose > a:nth-child(2)').on('click', function()
			{
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
			$('#columns > div.stepClose > a:nth-child(3) > span').on('click', function(e)
			{
				
				
				 if($('#firstgrade').is(':checked'))
				 {	
				 	
				 	//$('#firstgrade').addClass('bracket');
				 	var firstGradeValue = $('#firstgrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				 
				 	displaysGradeAname(pushgradesVehiclesA, minRangeFirstGradePrice);
				 	displaysGradefeedback(pushgradesVehiclesA, minRangeFirstGradePrice);
				 	displayGradeImageAndPriceFeedback(imageHolderGradeA, minRangeFirstGradePrice);
				 	
				 	infoStdHelp();
				 	
				 	displayEngineAndMotersGradeA(pushVehicleEngineA, pushtheVehicleNameA, pushVehicleFuelTypeA, pushVehiclePriceA, pushVehicleTransA, pushVehicleBodyA);
				 	
				 	$('#GradeA > ul > li > div > div').css('border', '1px solid #c71444');
				 	
				 }
				 
				 if($('#SecondGrade').is(':checked'))
				 {	
				 	
				 	//$('#SecondGrade').addClass('bracket');
				 	var SecondGradeValue = $('#SecondGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				 	
				 	displaysGradeBname(pushgradesVehiclesB, minRangeSecondGradePrice);
				 	
				 	displaysGradefeedback(pushgradesVehiclesB, minRangeSecondGradePrice);
				 	
				 	displayGradeImageAndPriceFeedback(imageHolderGradeB, minRangeSecondGradePrice);
				 	
				 	infoStdHelp();
				 	
				 	displayEngineAndMotersGradeB(pushVehicleEngineB, pushtheVehicleNameB, pushVehicleFuelTypeB, pushVehiclePriceB, pushVehicleTransB, pushVehicleBodyB);
				 	
				 	$('#GradeB > ul > li > div > div').css('border', '1px solid #c71444');
				 	
				 }
				 
				 if($('#ThirdGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var SecondGradeValue = $('#ThirdGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeCname(pushgradesVehiclesC, minRangeThirdGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesC, minRangeThirdGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeC, minRangeThirdGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeC(pushVehicleEngineC, pushtheVehicleNameC, pushVehicleFuelTypeC, pushVehiclePriceC, pushVehicleTransC, pushVehicleBodyC);
				 	
				 	$('#GradeC > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				if($('#FourthGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var FourthGradeValue = $('#FourthGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeDname(pushgradesVehiclesD, minRangeFourthGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesD, minRangeFourthGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeD, minRangeFourthGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeD(pushVehicleEngineD, pushtheVehicleNameD, pushVehicleFuelTypeD, pushVehiclePriceD, pushVehicleTransD, pushVehicleBodyD);
				 	
				 	$('#GradeD > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				 if($('#FifthGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var FifthGradeValue = $('#FifthGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeEname(pushgradesVehiclesE, minRangeFifthGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesE, minRangeFifthGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeE, minRangeFifthGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeE(pushVehicleEngineE, pushtheVehicleNameE, pushVehicleFuelTypeE, pushVehiclePriceE, pushVehicleTransE, pushVehicleBodyE);
				 	
				 	$('#GradeE > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				 
				 if($('#SixthGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var SixthGradeValue = $('#SixthGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeFname(pushgradesVehiclesF, minRangeSixthGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesF, minRangeSixthGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeF, minRangeSixthGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeF(pushVehicleEngineF, pushtheVehicleNameF, pushVehicleFuelTypeF, pushVehiclePriceF, pushVehicleTransF, pushVehicleBodyF);
				 	
				 	$('#GradeF > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				 
				 if($('#SeventhGrade').is(':checked'))
				 {	
				 	//$('#ThirdGrade').addClass('bracket');
				 	var SeventhGradeValue = $('#SeventhGrade').val();
				 	
				 	$('#columns > div.stepClose').hide("slide", { direction: "right" }, 300);
				
					displaysGradeGname(pushgradesVehiclesG, minRangeSeventhGradePrice);
					
					displaysGradefeedback(pushgradesVehiclesG, minRangeSeventhGradePrice);
					
					displayGradeImageAndPriceFeedback(imageHolderGradeG, minRangeSeventhGradePrice);
					
					infoStdHelp();
				
				 	displayEngineAndMotersGradeG(pushVehicleEngineG, pushtheVehicleNameG, pushVehicleFuelTypeG, pushVehiclePriceG, pushVehicleTransG, pushVehicleBodyG);
				 	
				 	$('#GradeG > ul > li > div > div').css('border', '1px solid #c71444');
					
				 }
				
			});
			
			
			//Third Step Backwards
			$('#columns > div.stepOneClose > a:nth-child(2) > span').on('click', function()
			{
				
				$('#columns > div.stepClose').show("slide", { direction: "right" }, 1000);
				$('#columns > div.stepOneClose').hide("slide", { direction: "right" }, 300);
				
				 
			});	
			$('#columns > div.stepTwoClose > a:nth-child(2) > span').on('click', function()
					{
						
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
				
			$('#columns > div.stepThirdClose > a:nth-child(3) > span').on('click', function()
			 {
			 	
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
				
			
	function displayEngineAndMotersGradeA(engineArrayHolder, vehicleNameHolderA, vehicleHolderFuelTypeA, vehiclePriceHolderA, vehicleTransHolderA, vehicleBodyHolderA)
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
                        '<img src="http://skin.nissan.gr/default/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
	
			for(var i = 0; i < engineArrayHolder.length; i++)
			{
				var current = parseFloat(vehiclePriceHolderA[i]);
				//var theCurrent = current.toFixed(2);
				var theCurrent = formatNumber(current);
				//var theCurrent = formatNumber(current);
				HTML.push('<div style="background-color:white !important; box-shadow:none !important;" class="CSSTable" ><table style="width:100%; background-color:white !important; margin-bottom:15px !important; font-weight:normal !important; border:none;"><tr style="background:none !important;" class="gradeA">'
				+' <td style="width:20%; font-weight:normal !important; font-style:italics;"><input type="radio"  name="vehicleA[]" value="' +engineArrayHolder[i]+ ','+vehicleHolderFuelTypeA[i]+ ',' + vehicleNameHolderA[i] + ',' +vehiclePriceHolderA[i]+ ',' +vehicleTransHolderA[i]+ ','+vehicleBodyHolderA[i]+ '">'+ engineArrayHolder[i] + '</input></td>'
				+ '<td style="width:70%; padding-left:10px; font-weight:normal !important; font-style:italics;" valign="middle"><ul><li>'+vehicleHolderFuelTypeA[i]+ '</li><li>'+vehicleBodyHolderA[i]+ '</li><li>' +vehicleTransHolderA[i]+ '</li></ul></td>'
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
					console.log('do something');
					var radioButtonVehicleB = $('#displayMoters > div > table > tbody > tr > td > input[name="vehicleA[]"]');
					
					radioButtonVehicleB.on('click', function()
					{
					
						var radiobuttonChecked = $('#displayMoters > div > table > tbody > tr > td > input:radio[name="vehicleA[]"]:checked').val();
						
						if(radiobuttonChecked){
							string1 = radiobuttonChecked;
							console.log(string1);
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
					 
					$('#columns > div.stepOneClose > a:nth-child(3) > span').on('click', function()
					{
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
						GradeB =  jsonstr.config.model.grades[i].grade.gradename['#text'];
							if(jsonstr.config.model.grades[i].grade.vehicles instanceof Array)
							{	
								for(var i = 0; i < jsonstr.config.model.grades[i].grade.vehicles.length; i++) 
									{
										
										getVehicleNum = i;
										theVehicleFuelTypeB = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.fuel['#text'];
										theVehiclePriceB = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.price['#text'];
										theVehicleNameB = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.name['#text'];
										theVehicleEngineB = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.engine['#text'].toString();
										theVehicleTransmissionB = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.transmission['#text'];
										theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.bodywork['#text'];
										
										if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
											&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
										{
											
											stadarPriceVehicle = theVehiclePriceB;
											stadarVehicleName = theVehicleNameB;
											stadarVehicleEngine  = theVehicleEngineB;
											stadarFuelType = theVehicleFuelTypeB;
											stadarVehicleTrans = theVehicleTransmissionB;
											stadarVehicleBody = theVehicleBodyB;
											
											
												if(jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors.length; j++)
														{
																
																getNumColorVehicle = j;
																imageHolder = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors[j].color['@attributes'].imageurl;
																vehicleColorName = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors[j].color.colorname['#text'];	
																rgbColor = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors[j].color.rgbcolor['#text'];
																colorPrice = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors[j].color.colorprice['#text'];
																colorType = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors[j].color.type['#text'];
																
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
																console.log("Something is Wrong");
														
																getNumColorVehicle = j;
																imageHolder = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
																vehicleColorName = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
																rgbColor = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
																colorPrice = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
																colorType = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.colors.color.type['#text'];
																
																console.log("VehicleColorName" +vehicleColorName);
																
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
												
													if(jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryImage; 
																accessoryName = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryImage;
																accessoryName = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
												
												
												    
												if(jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															console.log(categoryRig);
															/*	HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table'+j+'" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
																'<!--end h3-->');
															
															if(jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category[j].rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category[j].rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category[j].rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category[j].rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category[j].rigging[k].riggingprice['#text'];
																	
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
																	
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																	
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
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
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															console.log(categoryRig);
															
															/*HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table0" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
																'<!--end h3-->');
															
															if(jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category.rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category.rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category.rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category.rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category.rigging[k].riggingprice['#text'];
																	
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
																	
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[i].grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																	
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
															           '</div>');*/
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
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
											     	console.log('#columnH is open');
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
												
												console.log("TotalPricewithColor"+totalColorPrice);
												
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
										theVehicleFuelTypeB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.fuel['#text'];
										theVehiclePriceB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.price['#text'];
										theVehicleNameB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.name['#text'];
										theVehicleEngineB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.engine['#text'].toString();
										theVehicleTransmissionB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.transmission['#text'];
										theVehicleBodyB = jsonstr.config.model.grades[i].grade.vehicles.vehicle.bodywork['#text'];
										
										if(theVehicleEngineB == engineVeh && theVehicleFuelTypeB == fuelVeh &&  theVehiclePriceB == priceVeh 
											&& theVehicleTransmissionB == transVeh && theVehicleBodyB == bodyVeh)
										{
											
											stadarPriceVehicle = theVehiclePriceB;
											stadarVehicleName = theVehicleNameB;
											stadarVehicleEngine  = theVehicleEngineB;
											stadarFuelType = theVehicleFuelTypeB;
											stadarVehicleTrans = theVehicleTransmissionB;
											stadarVehicleBody = theVehicleBodyB;
											
											
												if(jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors.length; j++)
														{
																
																getNumColorVehicle = j;
																imageHolder = jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors[j].color['@attributes'].imageurl;
																vehicleColorName = jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors[j].color.colorname['#text'];	
																rgbColor = jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors[j].color.rgbcolor['#text'];
																colorPrice = jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors[j].color.colorprice['#text'];
																colorType = jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors[j].color.type['#text'];
																
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
																console.log("Something is Wrong");
														
																getNumColorVehicle = j;
																imageHolder = jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
																vehicleColorName = jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors.color.colorname['#text'];	
																rgbColor = jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
																colorPrice = jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors.color.colorprice['#text'];
																colorType = jsonstr.config.model.grades[i].grade.vehicles.vehicle.colors.color.type['#text'];
																
																console.log("VehicleColorName" +vehicleColorName);
																
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
													
													
													if(jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories instanceof Array)
													{
														for(var j = 0; j < jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories.length; j++)
														{
																
																accessoryImage = jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryImage; 
																accessoryName = jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories[j].accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories[j].accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories[j].accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories[j].accessory.accessoryprice['#text'];
																
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
		
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
																												
														}
													}else
													{
																accessoryImage = jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryImage;
																accessoryName = jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories.accessory.accessoryname['#text'];
																accessorySKU = jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories.accessory.sku['#text'];
																accessoryDesc = jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories.accessory.accessorydesc['#cdata-section'];
																accessoryPrice = jsonstr.config.model.grades[i].grade.vehicles.vehicle.accessories.accessory.accessoryprice['#text'];
																
																ArrayHolderVehicle.splice(0, ArrayHolderVehicle.length);
																
																accessoryImageHolder.push(accessoryImage);
																accessoryNameHolder.push(accessoryName);
																accessorySKUHolder.push(accessorySKU);
																accessoryDescHolder.push(accessoryDesc);
																accessoryPriceHolder.push(accessoryPrice);
														
													}
													
											if(jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings instanceof Array)
												{
														for(var j = 0; j < jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.length; j++)
														{
															categoryRig = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings[j].category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															
															riggingArr = GetUnique(categoryRig);
															
															/*console.log(categoryRig);
																HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table'+j+'" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+riggingArr+'</span></h3>'+
																'<!--end h3-->');
															
															if(jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category[j].rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category[j].rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingprice['#text'];
																	
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
																	
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																	
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
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
															           '</div>');*/
																	
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															console.log(categoryRig);
															
															/*HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table0" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
																'<!--end h3-->');
															
															if(jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category.rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category.rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category.rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category.rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category.rigging[k].riggingprice['#text'];
																	
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
																	
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades[i].grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];
																	
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
															           '</div>');*/
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
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
												
												console.log("TotalPricewithColor"+totalColorPrice);
												
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
					 			console.log('we are inside Else');
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
											theVehicleBodyB = jsonstr.config.model.grades.grade.vehicles[i].vehicle.bodywork['#text'];
											
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
																console.log("Something is Wrong");
														
																getNumColorVehicle = j;
																imageHolder = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color['@attributes'].imageurl;
																vehicleColorName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colorname['#text'];	
																rgbColor = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.rgbcolor['#text'];
																colorPrice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.colorprice['#text'];
																colorType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.colors.color.type['#text'];
																
																console.log("VehicleColorName" +vehicleColorName);
																
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
																
																accessoryImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories[j].accessory['@attributes'].accessoryImage; 
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
																accessoryImage = jsonstr.config.model.grades.grade.vehicles[i].vehicle.accessories.accessory['@attributes'].accessoryImage;
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
															
															console.log(categoryRig);
																/*HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table'+j+'" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
																'<!--end h3-->');
															
															/*if(jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category[j].rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category[j].rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category[j].rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category[j].rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category[j].rigging[k].riggingprice['#text'];
																	
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
																	
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																	
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
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
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															console.log(categoryRig);
															
															/*HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table0" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
																'<!--end h3-->');
															
															if(jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category.rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category.rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category.rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category.rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category.rigging[k].riggingprice['#text'];
																	
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
																	
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades.grade.vehicles[i].vehicle.riggings.category.rigging.riggingprice['#text'];
																	
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
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
															
															
													
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
												
													console.log("TotalPricewithColor"+totalColorPrice);
													
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
										theVehicleBodyB = jsonstr.config.model.grades.grade.vehicles.vehicle.bodywork['#text'];
										
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
															console.log("Something is Wrong");
													
															getNumColorVehicle = j;
															imageHolder = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color['@attributes'].imageurl;
															vehicleColorName = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colorname['#text'];	
															rgbColor = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.rgbcolor['#text'];
															colorPrice = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.colorprice['#text'];
															colorType = jsonstr.config.model.grades.grade.vehicles.vehicle.colors.color.type['#text'];
															
															console.log("VehicleColorName" +vehicleColorName);
															
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
																
																accessoryImage = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories[j].accessory['@attributes'].accessoryImage; 
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
																accessoryImage = jsonstr.config.model.grades.grade.vehicles.vehicle.accessories.accessory['@attributes'].accessoryImage;
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
															
															/*console.log(categoryRig);
																HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table'+j+'" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
																'<!--end h3-->');
															
															/*if(jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category[j].rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category[j].rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category[j].rigging[k].riggingprice['#text'];
																	
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
																	
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																	
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings[j].category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings[j].category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings[j].category.rigging.riggingprice['#text'];
																	
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
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
															//}
														}
		
												}else
												{
															categoryRig = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category['@attributes'].name;
															categoryRigHolder.push(categoryRig);
															console.log(categoryRig);
															
															/*HTML1.push('<!--h3-->'+
													            '<h3 class="table-caption" data-toggle-trigger="table0" style="width:100% !important;"><span style="width:99% !important; font-size:14px !important;">'+categoryRig+'</span></h3>'+
																'<!--end h3-->');
															
															/*if(jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category.rigging instanceof Array)
															{
																for(var k = 0; k < jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category.rigging.length; k++)
																{
																	riggingName = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category.rigging[k].riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category.rigging[k].riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category.rigging[k].riggingprice['#text'];
																	
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
																	
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
																	riggingNameHolder.push(riggingName);
																	riggingTypeHolder.push(riggingType);
																	riggingpriceHolder.push(riggingprice);
																}
															}else
															{*/
																	riggingName = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category.rigging.riggingname['#cdata-section'];
																	riggingType = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category.rigging.riggingtype['#text'];
																	riggingprice = jsonstr.config.model.grades.grade.vehicles.vehicle.riggings.category.rigging.riggingprice['#text'];
																	
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
															           '</div>');*/
																	console.log(riggingName);
																	console.log(riggingType);
																	console.log(riggingprice);
																	
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
												
												console.log("TotalPricewithColor"+totalColorPrice);
												
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
			
				
				$('#columns > div.stepTwoClose > a:nth-child(3) > span').on('click', function()
				{
						    	 
						  $('#navNumbers1').removeClass('active');
						  $('#navNumbers2').addClass('active');
						  
						  $('#navNumbers1 > img:nth-child(1)').show();
						  $('#navNumbers1 > img:nth-child(2)').hide();
						
						  $('#navNumbers2 > img:nth-child(1)').hide();
						  $('#navNumbers2 > img:nth-child(2)').show();
						 	
						  $('#columns > div.stepTwoClose').hide("slide", { direction: "right" }, 300);
						  $('#columns > div.stepNextThirdClose').show("slide", { direction: "right" }, 1000);
							
				});
				
				
			
			$('#columns > div.stepNextThirdClose > a:nth-child(2) > span').on('click', function()
				{
					//$('#columns > div.stepNextThirdClose').find('#mainContentconf').find('#tabs').find('#tabs-1').empty();
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
			  

			  $('#columns > div.stepNextThirdClose > a:nth-child(3) > span').on('click', function()
			 {
			 	$('#navNumbers2').filter('.step3').removeClass('active');
				$('#navNumbers3').filter('.step4').addClass('active');
				
				
				$('#navNumbers2 > img:nth-child(1)').show();
				$('#navNumbers2 > img:nth-child(2)').hide();
						
				$('#navNumbers3 > img:nth-child(1)').hide();
				$('#navNumbers3 > img:nth-child(2)').show();
				
			 	var show = true;
			 	$('#columns > div.stepNextThirdClose').hide("slide", { direction: "right" }, 300);
			 	$('#columns > div.stepThirdClose').show("slide", { direction: "right" }, 1000).find('#dividetwo > div:nth-child(7) > div > div > div > h3').on('click', function(e)
			 	{
			 		
			 		$('#columns > div.stepThirdClose').find('#dividetwo > div > div > div > div > div > div.infoModelAccesories').toggle();
			 		
			 		
			 	});
			 	
			 });  
			 
			 $('#columns > div.stepThirdClose > a:nth-child(2) > span').on('click', function()
			 {
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
		
		
	}
	
	function DrawGradeA(GradeArrayA, vehicleArrayA, imageGradeA, minimumRangePriceA)
		{
				
				var HTML = [];
				var count1 = 0;
				stringInfo = '<span class="std-help" data-tooltip="false" data-hasqtip="true" aria-describedby="qtip-0">'+
                        '<img src="http://skin.nissan.gr/default/images/common/info-icon-medium.png" alt="Help: ">'+
                        '<span class="after" style="display: none;">Σύμφωνα με την πολιτική της εταιρείας περί συνεχούς βελτίωσης των προϊόντων της, η NISSAN διατηρεί το δικαίωμα να αλλάξει τις προδιαγραφές και τις τιμές, για τα οχήματα που περιγράφονται και παρουσιάζονται στην ιστοσελίδα μας, οποιαδήποτε στιγμή.</span>'
                    +'</span>';
					
				uniqueGradesA = GetUnique(GradeArrayA);
				console.log(uniqueGradesA);
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
									'<hr style="border-bottom: 1px dotted #c71444;">'
									 +imageGradeA +
									'<hr style="border-bottom: 1px dotted #c71444;">'+
									'<h4 style="text-align:center;" class="titlerangeprice">Τιμή: &euro;'+minPriceA + stringInfo+'</h4>'+
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
										
										console.log(vehicleArrayA[j]);
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

function infoStdHelp()
	{
		
			$('#dividetwo > div:nth-child(1) > h4 > span > span').hide();
		
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
			
			$('#feedback-top > div:nth-child(1) > h4 > span > img').hover(function(e)
			{
				$('#feedback-top > div:nth-child(1) > h4 > span > span').toggle();	
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
		
			$('#tabs-1 > table > tbody > tr > td > span > img').each(function()
			{
				$(this).hover(function()
				{
					$(this).closest('span').find('span').toggle();	
				});
			});
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
				
			
	