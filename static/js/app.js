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

        //Iterate through the sample names onto the dropdown menu, appending each key value to the dropdown as a new option.
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
        createGaugeChart(sampleName);

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
            xaxis: {title: "OTU ID"}
        };

        //Plot the bubble chart.
        Plotly.newPlot("bubble", bubbleData, layout);
        
    })
};

function createGaugeChart(selectedSample)
{
    //Fetch the data for the bar chart.
    d3.json(bacteriaData).then((data) => 
    {
        console.log(data);

         //Set variable for metadata 
         let metaSamples = data.metadata;

         console.log(metaSamples);
 
         //Filter the metadata for the selected sample.
         let metaArray = metaSamples.filter(metaSample => metaSample.id == selectedSample);

         console.log(metaArray);
 
         //Set first result to variable
         let result = metaArray[0];

         console.log(result);

        //  $(() => {
        //     $('#gauge').dxCircularGauge({
        //       scale: {
        //         startValue: 0,
        //         endValue: 9,
        //         tickInterval: 1,
        //         label: {
        //           useRangeColors: true,
        //         },
        //       },
        //       rangeContainer: {
        //         palette: 'pastel',
        //         ranges: [
        //           { startValue: 0, endValue: 1 },
        //           { startValue: 1, endValue: 2 },
        //           { startValue: 2, endValue: 3 },
        //           { startValue: 3, endValue: 4 },
        //           { startValue: 4, endValue: 5 },
        //           { startValue: 5, endValue: 6 },
        //           { startValue: 6, endValue: 7 },
        //           { startValue: 7, endValue: 8 },
        //           { startValue: 8, endValue: 9 }
                  
        //         ],
        //       },
        //       title: {
        //         text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
        //         font: { size: 28 },
        //       },
        //       export: {
        //         enabled: true,
        //       },
        //       value: 105,
        //     });
        //   });
         
         
         //Create the trace elements for the gauge chart.
         let trace = 
         [{
            domain: {x: [0, 1], y: [0, 1]},
            value: result.wfreq,
            title: {text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week", font: {size: 20}},
            type: "indicator",
            mode: "gauge+number",
            gauge: 
            {
                axis: {range: [null, 9], nticks: 10},
                steps: [
                    {range: [0,1], color: "rgb(247,241,233)"},
                    {range: [1,2], color: "rgb(243,239,225)"},
                    {range: [2,3], color: "rgb(230,227,195)"},
                    {range: [3,4], color: "rgb(225,228,170)"},
                    {range: [4,5], color: "rgb(207,225,146)"},
                    {range: [5,6], color: "rgb(174,198,135)"},
                    {range: [6,7], color: "rgb(127,184,125)"},
                    {range: [7,8], color: "rgb(125,179,132)"},
                    {range: [8,9], color: "rgb(120,172,127)"}
                ],
            }
         }];
         let layout =
         {
            width: 500, height: 400, margin: {t: 10, b: 0, l: 0, r: 0}
         };

         //Generate gauge chart using plotly.
         Plotly.newPlot("gauge", trace, layout);
    });
}


function changeSample(newSample) 
{
    createBarChart(newSample);
    metatable(newSample);
    createBubbleChart(newSample);
    createGaugeChart(newSample);
}



initMenu();