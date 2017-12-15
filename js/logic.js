
var placeSearch, autocomplete;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('place1')),
            {types: ['geocode']});
    autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('place2')),
            {types: ['geocode']});
}

var p1v=" ";
var latf,lngf;
var totaldist=0;
var ij=0;//for incrementing radius and checking if it is incremented 3 times or not
var rad=0;

function calculateLocation(text)
{
	var n=0;
	var td=" ";
	var tdf, sd, sdf, tsd ,sb, sdfinmt;
	var p1=document.getElementById("place1").value;
     	var p2=document.getElementById("place2").value;
       	document.getElementById("p1").innerHTML="&nbsp;&nbsp;Your place: "+p1;
        document.getElementById("p2").innerHTML="&nbsp;&nbsp;Your friend's place: "+p2;
	for(n=0;text.getElementsByTagName("step")[n];n++)
	{
	}

	var k=2*n+1;

	td=text.getElementsByTagName("text")[k].childNodes[0].nodeValue;//getting total distance
	tdf=parseFloat(td);//total distance in float
	tdf=tdf*1000;
	totaldist=tdf;
	rad=totaldist/10;
	tdf=tdf/2;
		//document.getElementById("p4").innerHTML=totaldist;
		//document.getElementById("p5").innerHTML=tdf;
		//document.getElementById("p8").innerHTML=n;
	tsd=0;//total of sum distances
	sd=0;
	sdf=0;
	sdfinmt=0;
	var i,msdf=0,oldtsd=0;

	for(i=0;i<n;i++)
	{
		k=2*i+1;
		sd=text.getElementsByTagName("text")[k].childNodes[0].nodeValue;//step distance
			//sdf=parseFloat(sd);//in float
			//document.getElementById("p3").innerHTML=sdf+" "+tsd;
		if(sd.includes("km"))
		{
			sdf=parseFloat(sd);
			msdf=sdf*1000;//conversion to metres
			//document.getElementById("p4").innerHTML=tsd+"  <br>    ";
		}
		else
		{
			sdf=parseFloat(sd);
			msdf=sdf;//conversion to metres
			//document.getElementById("p4").innerHTML=tsd+"  <br>   "+sdf+" "+"  "+n;
		}
		tsd=tsd+msdf;//summing the step distances step by step
		if(tsd>=tdf)
		{
			break;
		}
		oldtsd=tsd;
	}

	var m=((tdf-oldtsd)/(tsd-oldtsd));
	if(!isNaN(m))
	{
		var xy=2*i;
		var xz=2*i+1;
		//document.getElementById("p9").innerHTML=m;
		latf1=text.getElementsByTagName("lat")[xy].childNodes[0].nodeValue;
		lngf1=text.getElementsByTagName("lng")[xy].childNodes[0].nodeValue;
		latf2=text.getElementsByTagName("lat")[xz].childNodes[0].nodeValue;
		lngf2=text.getElementsByTagName("lng")[xz].childNodes[0].nodeValue;
		latf= parseFloat(parseFloat(latf1)+parseFloat((latf2-latf1)*m));
		lngf= parseFloat(parseFloat(lngf1)+parseFloat((lngf2-lngf1)*m));
	}
	else
	{
		var xy=2*i;
		//document.getElementById("p9").innerHTML=m;
		latf=text.getElementsByTagName("lat")[xy].childNodes[0].nodeValue;
		lngf=text.getElementsByTagName("lng")[xy].childNodes[0].nodeValue;
	}
	placeSearch();
}


function CORSCreation(method, url) {
  var xyz = new XMLHttpRequest();
  if ("withCredentials" in xyz) {
    xyz.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xyz = new XDomainRequest();
    xyz.open(method, url);
  } else {
    xyz = null;
  }
  return xyz;
}


function showPlaces(text) {
	var x="<br>";
	var y="<br />";
	var row="";
	var tn=0;// total number of places
	var mn=0;// actual correct places
	var rowno=0;
	var Table = document.getElementById("tbody");
	Table.innerHTML = "";
	var td1 = document.getElementById("td1");
	td1.innerHTML = "";
	for(var i=0;text.getElementsByTagName("name")[i];i++)
	{
  		var c1=text.getElementsByTagName("name")[i].childNodes[0].nodeValue;
  		var c5=c1.toLowerCase();

		tn++;// counting total number of places
  	if(c5.includes("tiffin")||c5.includes("curry")||c5.includes("fast food")||c5.includes("mess")||c5.includes("dairy")||c5.includes("bakery")||c5.includes("bakers")||c5.includes("curries")||c5.includes("lunch")||c5.includes("catering")||c5.includes("chicken"))
	{
		continue;
	}
  	if(c5.includes("sweet")||c5.includes("sweets")||c5.includes("meals")||c5.includes("take away")||c5.includes("meal")||c5.includes("pan")||c5.includes("hot chips")||c5.includes("hot chip")||c5.includes("currey"))
	{
		continue;
	}
	mn++;//counting actual correct places
}

for(var i=0;i<tn;i++)
{
	if((mn<3)&&(ij!=3))
	{
		//document.getElementById("p5").innerHTML=document.getElementById("p5").value+" "+"entered if";
		rad=rad+(totaldist/20);
		ij++;
		placeSearch();
		break;
	}
  var tref=document.getElementById('list').getElementsByTagName('tbody')[0];
  var c1=text.getElementsByTagName("name")[i].childNodes[0].nodeValue;
  var c2=text.getElementsByTagName("vicinity")[i].childNodes[0].nodeValue;
  var c3=text.getElementsByTagName("lat")[i].childNodes[0].nodeValue;
  var c4=text.getElementsByTagName("lng")[i].childNodes[0].nodeValue;

  var c5=c1.toLowerCase();
  if(c5.includes("tiffin")||c5.includes("curry")||c5.includes("fast food")||c5.includes("mess")||c5.includes("dairy")||c5.includes("bakery")||c5.includes("bakers")||c5.includes("curries")||c5.includes("lunch")||c5.includes("catering")||c5.includes("chicken"))
	{
		continue;
	}
  if(c5.includes("sweet")||c5.includes("sweets")||c5.includes("meals")||c5.includes("take away")||c5.includes("meal")||c5.includes("pan")||c5.includes("hot chips")||c5.includes("hot chip")||c5.includes("currey"))
	{
		continue;
	}
 rowno++;
  var newRow=tref.insertRow(tref.rows.length);
	//var new_tbody = document.createElement('tbody');
	//populate_with_new_rows(new_tbody);
	//old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
   var column1=newRow.insertCell(0);
  var column2=newRow.insertCell(1);
  var column3=newRow.insertCell(2);
  //var url="https://www.google.co.in/maps/search/"+c1+"/@"+c3+","+c4;
  var url2="https://www.google.co.in/maps?z=12&q=loc:"+c1+" "+c2;
  col0=document.createTextNode(rowno);
  col1=document.createTextNode(c1);
  col2=document.createTextNode(c2);

  var a = document.createElement('a');
	a.appendChild(col1);
	a.title=c1;
	a.href=url2;
	a.target="blank";
	column1.appendChild(col0);
	column2.appendChild(a);
  	column3.appendChild(col2);
}

	if((!(text.getElementsByTagName("name")[0]))&&(ij!=3))
	{
		//document.getElementById("p6").innerHTML="entered if 2";
		rad=rad+(totaldist/20);
		ij++;
		placeSearch();
	}

	if((!(text.getElementsByTagName("name")[0]))&&(ij==3))
	{
		var option=type.options[type.selectedIndex].value;
		document.getElementById("td1").innerHTML="Sorry, No "+option+" available";
	}
  $(document).ready(function(){
          $(".results").show();
  });


}

function placeSearch() {

	var option=type.options[type.selectedIndex].id;
  var url2="<a href='https://www.google.co.in/maps?z=12&q=loc:"+latf+" "+lngf+"'>"+"open"+"</a>";
 //document.getElementById("p7").innerHTML=url2;
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/xml?location='+latf+','+lngf+'&radius='+rad+'&types='+option+'&key=AIzaSyBvQQv-YEYj_WSvmdYMMEUUOy4wt8ojSk4';
	 //document.getElementById("p8").innerHTML=url;
  var xyz = CORSCreation('GET', url);
  if (!xyz) {
    alert('CORS not supported');
    return;
  }

  xyz.onload = function() {
    var text = xyz.responseXML;
     showPlaces(text);
  };

  xyz.onerror = function() {
    alert('There was an error making the request.');
  };

  xyz.send();
}

function startSearch() {

	var p1=document.getElementById("place1").value;
        var p2=document.getElementById("place2").value;

 	var url3="https://maps.googleapis.com/maps/api/directions/xml?origin="+p1+"&destination="+p2+"&key=AIzaSyBvQQv-YEYj_WSvmdYMMEUUOy4wt8ojSk4";
	//document.getElementById("p8").innerHTML=url3;
 	var xyz2 = CORSCreation('GET', url3);
 	if (!xyz2) {
   		alert('CORS not supported');
  		 return;
  	}

	 xyz2.onload = function() {
   		var text1 = xyz2.responseXML;
		calculateLocation(text1);
 	};


	 xyz2.onerror = function() {
    		alert('Woops, there was an error making the request.');
  	};

	 xyz2.send();
}
