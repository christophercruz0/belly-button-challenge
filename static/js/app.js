
const sample_json = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


function init(){


const dataPromise = d3.json(sample_json);
//console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(sample_json).then(function(data) {
  //console.log(data.names);
  //console.log(data.metadata);
  //console.log(data.samples)

//Assigning variables to the different elements for use later
s_names = data.names;
m_data = data.metadata;
s_amples = data.samples;


//Building Initial Views
buildinitialView(s_names[0])
buildMeta(s_names[0])


//Filling in the drop down 
d3.select("#selDataset")
.selectAll('selDataset')
.data(s_names  )
.enter()
.append('option')
.text(function (d) { return d; }) // text showed in the menu
.attr("value", function (d) { return d; }); // corresponding value returned by the button

});

}

//Dashbaord is getting started!
init();

//Selecting the dropdown launching you to a function call udpated everything
d3.selectAll("#selDataset").on("change", updateEverything);


//update everything - grabs the value and clears the HTML because the append continues to append if 
//do not do this..... send the id onto the other functions
function updateEverything() {

  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let selectedId = dropdownMenu.property("value");
  d3.select(".panel-body").html("");
  buildinitialView(selectedId);
  buildMeta(selectedId);


}


//function expecting a variable.... which is the id..... 
function buildMeta(firstid){

    //grabbing the data yet again.... it seems this could have been a global variable... 
    d3.json(sample_json).then(function(data) {
        //went back out and grabbed data again....? it seems like this step could have been avoided...      
        let metaverse = data.metadata;
        //Created function to filter dtata on variable passed to id.....
        function first_id(val) {
            return val.id == firstid;
          }
          
          // Call the custom function with filter() and wrote it to the conole to check..... and it worked :)
          let metaverse_first_id = metaverse.filter(first_id);
          console.log(metaverse_first_id)
          //googled this one for each.... a bunch of different ways to achieve howeve this was the easiest...
          Object.entries(metaverse_first_id[0]).forEach(([key, value]) => {
          console.log(key + ": " + value);
          d3.select(".panel-body").append("div").text(key + ": " + value);
          
    });


});
}

//labeled this one incorrectly... this should say the charter builderness of awesomeness

function buildinitialView(firstid){
    //grabbed the data yet again......
    d3.json(sample_json).then(function(data) {
        //went back out and grabbed data again....? it seems like this step could have been avoided...      
        let sam = data.samples;
        //Created function to filter dtata on variable passed to id.....
        function first_id(val) {
            return val.id == firstid;
          }
          
          // Call the custom function with filter() and wrote it to the conole to check..... and it worked :)
          let samples_in_first_id = sam.filter(first_id);
          //console.log(samples_in_first_id);
          
          // Sort the data by Greek search results descending
          //did a lot of nonsense on my way to achieve the goal of create this dashboard... 
         let samples_sort = samples_in_first_id.sort((a, b) => b.sample_values - a.sample_values);
        let sample_values_only =  samples_in_first_id[0].sample_values;
        let otu_ids_only = samples_in_first_id[0].otu_ids;
        let otu_labels_only = samples_in_first_id[0].otu_labels;
        console.log(samples_in_first_id);
        console.log(sample_values_only);    
        let slicedData_sample = sample_values_only.slice(0,10);
        // this was cool.... adding OTU to the ID's which cleaned up the view.....
        let otu_ids_sample = otu_ids_only.slice(0,10).map(id=>"OTU "+id+" ");
        console.log(otu_ids_sample);
        let otu_labels_sample = otu_labels_only.slice(0,10); 
        // printed out the labels to check the newly added OTU 
        console.log(otu_labels_sample);
       
// Reverse the array to accommodate Plotly's defaults
       let reversedDataSamplesValues = slicedData_sample.reverse();
       let reversedotu_ids_sample = otu_ids_sample.reverse();
       let revereedotu_labels_sample = otu_labels_sample.reverse();
// added all the data.......
let trace1 = {
  x: reversedDataSamplesValues,
  y: reversedotu_ids_sample,
  text: revereedotu_labels_sample,
  name: "Samples",
  type: "bar",
  orientation: "h"
};

// Data array
// `data` has already been defined, so we must choose a new name here:
let traceData = [trace1];

// Apply a title to the layout
let layout = {
  title: "Top 10 Samples with Bacteriam",
};



Plotly.newPlot("bar", traceData, layout);

//created the scatter chart and placed the sample values in the size creating a bubble chart :)
let bubbleChart = [{
    x: otu_ids_only,
    y: sample_values_only,
    text: otu_labels_only,
    type: "scatter",
    mode: "markers",
    marker: {
      size: sample_values_only,
      color: otu_ids_only,
      colorscale: "Portland"
    }
  }];

  // bubble layout
  let bubble_lay = {
    title: "Bubbling Bactiam",
    xaxis: {title: "ID's"},
    margins: {
      l: 0,
      r: 0,
      b: 0,
      t: 0     
    }
  };

  //adding the bubble to the webpage
  Plotly.newPlot("bubble", bubbleChart, bubble_lay);


    });





}





