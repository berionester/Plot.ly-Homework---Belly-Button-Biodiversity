let data= d3.json("samples.json");
console.log(data);


//function for the the graphs
function demographicInfo(sample)
{
    // console.log(sample);
    //use d3.json to get the data
    d3.json("samples.json").then((data) =>{
        //get all of the metadata
        let metadata = data.metadata;
        // console.log(metadata);

        //filter based on the values of the sample that should return 1 result)
        let result = metadata.filter(sampleResult => sampleResult.id ==sample);

        // console.log(result);

        //access index 
        let resultData = result[0];
        // console.log(resultData);

        //clear out the metadata
        d3.select("#sample-metadata").html("");

        //use object.entries to get the value key pairs
        Object.entries(resultData).forEach(([key,value]) => {
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);

        });
    });
}


//function for the barChart
function buildBarChart(sample)
{
    // console.log(sample);
    // let data = d3.json("samples.json")
    // console.log(data);

    d3.json("samples.json").then((data) =>{
        //get all of the samples
        let sampleData = data.samples;
        // console.log(sampleData);

        let result = sampleData.filter(sampleResult => sampleResult.id ==sample);
        // // console.log(result);

        // //access index
        let resultData = result[0];
        // console.log(resultData);

        //get the otu_ids
        let otu_ids = resultData.otu_ids;
        let otu_labels =resultData.otu_labels;
        let sample_values=resultData.sample_values;
        // console.log(otu_ids);
        // console.log(otu_labels);
        // console.log(sample_values);

        //build the barchart
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0,10);
        let textLabels = otu_labels.slice(0,10);
        // console.log(textLabels);


        let barChart = {
            y:yticks.reverse(),
            x:xValues.reverse(),
            text:textLabels.reverse(),
            type:"bar",
            orientation:"h"
        }

        let layout ={
        };

        Plotly.newPlot("bar", [barChart],layout);
        

    });
}

//function for the bubbleChart
function buildBubbleChart(sample)
{

        // console.log(sample);
    // let data = d3.json("samples.json")
    // console.log(data);

    d3.json("samples.json").then((data) =>{
        //get all of the samples
        let sampleData = data.samples;
        // console.log(sampleData);

        let result = sampleData.filter(sampleResult => sampleResult.id ==sample);
        // // console.log(result);

        // //access index
        let resultData = result[0];
        // console.log(resultData);

        //get the otu_ids
        let otu_ids = resultData.otu_ids;
        let otu_labels =resultData.otu_labels;
        let sample_values=resultData.sample_values;
        // console.log(otu_ids);
        // console.log(otu_labels);
        // console.log(sample_values);

        //build the buubleChart     
        let bubbleChart = {
            y: sample_values,
            x:otu_ids,
            text:otu_labels,
            mode:"markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        let layout ={
            hovermode: "closest",
            xaxis: {title: "OTU ID"}


        };

        Plotly.newPlot("bubble", [bubbleChart],layout);        

    });

}

//function that sets the dashboard
function initialize()
{

    // let data = d3.json("samples.json")
    // console.log(data);


    //the dropdown
    var select = d3.select("#selDataset");

    //use d3.json to get the data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;
        // console.log(sampleNames);

        //use for each as to create options for the samples
        sampleNames.forEach((sample) => {
           select.append("option")
                .text(sample)
                .property("value",sample);
        });

        let sample1 = sampleNames[0];
    
        //call the function to build the metadata
         demographicInfo(sample1);
         buildBarChart(sample1);
         buildBubbleChart(sample1);

    });
}

//function to update the dashboard
function optionChanged(item)
{
    demographicInfo(item);
    buildBarChart(item);
    buildBubbleChart(item);

}


// //bONUS
// let BbWashingFreq = resultData.wfred

//         // Create the trace
//         let gauge_data = [
//             {
//                 domain: { x: [0, 1], y: [0, 1] },
//                 value: BbWashingFreq,
//                 title: { text: "Washing Frequency (Times per Week)" },
//                 type: "indicator",
//                 mode: "gauge+number",
//                 gauge: {
//                     bar: {color: 'white'},
//                     axis: { range: [null, 9] },
//                     steps: [
//                         { range: [0, 3], color: 'rgb(253, 162, 73)' },
//                         { range: [3, 6], color: 'rgb(242, 113, 102)' },
//                         { range: [6, 9], color: 'rgb(166, 77, 104)' },
//                     ],
                  
//                 }
//             }
//         ];

//         // Define Plot layout
//         let gauge_layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };

//call the function
initialize();







