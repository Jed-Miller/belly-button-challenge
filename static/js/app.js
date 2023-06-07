const bacteriaData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


//Initialize the dropdown menu.

function initMenu() 
{
    //Fetch the dropdown menu.
    let dropDownMenu = d3.select("#selDataset");

    //Fetch JSON data and console log it.
    d3.json(bacteriaData).then((data) => 
    {
        console.log(data);

        //Set sample names variable.
        let bacteriaNames = data.names;

        //Iterate through the sample names onto the dropdown menu.
        bacteriaNames.forEach((bacteriaName) => 
        {
            dropDownMenu.append("option").text(bacteriaName).property("value", bacteriaName);
        });

        //Set the sample name variable.
        let sampleName = bacteriaNames[0];

        //Call the plot functions.
        createBarChart(sampleName);
        metatable(sampleName);
        createBubbleChart(sampleName);

    });
}


//Create a function to create the bar graph.
function createBarChart(selectedSample)
{
    //Fetch the data for the bar chart.
    d3.json(bacteriaData).then((data) => 
    {
        console.log(data);

        //Set variable for bacteria sample
        let bacteriaSamples = data.samples;


        //Filter the data for the selected sample.
        let samplesArray = bacteriaSamples.filter(bacteriaSample => bacteriaSample.id == selectedSample);

        
        //Set first result to variable
        let result = samplesArray[0];


        //Set variables for OTU Ids, labels, and sample values.

        let otuIds = result.otu_ids;
        let otuLabels = result.otu_labels;
        let bacteriaSampleValues = result.sample_values;


        //Define the x and y ticks for the bar
        let yTicks = otuIds.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        let xTicks = bacteriaSampleValues.slice(0, 10).reverse();
        let hoverLabels = otuLabels.slice(0, 10).reverse();


        //Create the trace for the bar chart.
        let trace = {
            x: xTicks,
            y: yTicks,
            text: hoverLabels,
            type: "bar",
            orientation: "h"
        };

        //Put trace into an array.
        let barData = [trace];

        //Set title for the bar chart.
        let title = "Top 10 Bacteria Found in Individual";

        //Create the layout for the bar chart.
        let barLayout = 
        {
            Title: title,
            t: 100,
            b: 100,
            l: 100,
            r: 100
        }

        //Plot the bar chart.
        Plotly.newPlot('bar', barData, barLayout);
    });
}


// Create the metadata table
function metatable(selectedSample)
{
    //Fetch the data for the bar chart.
    d3.json(bacteriaData).then((data) => 
    {
        console.log(data);

         //Set variable for metadata 
         let metaSamples = data.metadata;
 
         //Filter the metadata for the selected sample.
         let metaArray = metaSamples.filter(metaSample => metaSample.id == selectedSample);
 
         //Set first result to variable
         let result = metaArray[0];

         //Clear out metadata table to ensure it is empty.
         d3.select("#sample-metadata").html(" ");

         //Establish object.entries variable to iterate through the metadata.
         keyValues = Object.entries(result);

         //Add key values to the metadata table
         keyValues.forEach(([k, v]) =>
         {
            d3.select("#sample-metadata").append("h6").text(`${k}: ${v}`);
         });

         console.log(keyValues);

    });
};

//Create the bubble chart.
function createBubbleChart(selectedSample)
{
    //Fetch the data for the bubble chart.
    d3.json(bacteriaData).then((data) =>
    {
        console.log(data);

        //Set variable for bacteria sample
        let bacteriaSamples = data.samples;

        //Filter the data for the selected sample.
        let samplesArray = bacteriaSamples.filter(bacteriaSample => bacteriaSample.id == selectedSample);

        //Set first result to variable
        let result = samplesArray[0];

        //Set variables for OTU Ids, labels, and sample values.

        let otuIds = result.otu_ids;
        let otuLabels = result.otu_labels;
        let bacteriaSampleValues = result.sample_values;

        //Create the trace for the bubble chart.

        let trace = 
        {
            x: otuIds,
            y: bacteriaSampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: bacteriaSampleValues,
                color: otuIds,
                colorscale: 'Earth'
            }

        };

        let bubbleData = [trace];

        //Set title for the xaxis.
        let layout = 
        {
            title: "OTU ID"
        };

        //Plot the bubble chart.
        Plotly.newPlot("bubble", bubbleData, layout);
        
    })
}

function changeSample(newSample) {
    createBarChart(newSample);
    metatable(newSample);
    createBubbleChart(newSample);
};




initMenu();