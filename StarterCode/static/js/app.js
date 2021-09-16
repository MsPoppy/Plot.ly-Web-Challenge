d3.json("samples.json").then(data => {
    console.log(data);
    let ids = data.names;
    console.log("ids:", ids)
    let dropdown = d3.select("#selDataset");
    ids.forEach(id => {
        dropdown.append("option").text(id)
    })



    let selectedId = 940;
    //using filter
    let metadata = data.metadata.filter(subject => subject.id == selectedId)[0];
    console.log("The metadata for 940 is:", metadata);


    //Demographic Info
    //

    metaDiv = d3.select("#sample-metadata")
    //metaDiv.append("p").text("Does this work")//we need to append a p tag to every piece of info for the metadata.
    //object.entries-->similar to mydict.items()


    Object.entries(metadata).forEach(([key, value]) => {
        metaDiv.append("p").html(`<strong>${key}: </strong>${value}`)

    });



    //Horizontal Bar Chart
    samples = data.samples.filter(subject => subject.id == selectedId);
    console.log(samples)

    bar_init(samples)
    bubble_plot_init(samples)

});
function optionChanged(selectedId) {
    // let selectedId = d3.select("#selDataset").text();
    d3.json("samples.json").then(data => {

        //using filter
        let metadata = data.metadata.filter(subject => subject.id == selectedId)[0];
        console.log("The metadata is:", metadata);


        //Demographic Info
        //

        metaDiv = d3.select("#sample-metadata")
        //metaDiv.append("p").text("Does this work")//we need to append a p tag to every piece of info for the metadata.
        //object.entries-->similar to mydict.items()

        metaDiv.html("")
        Object.entries(metadata).forEach(([key, value]) => {
            metaDiv.append("p").html(`<strong>${key}: </strong>${value}`)

        });



        //Horizontal Bar Chart
        samples = data.samples.filter(subject => subject.id == selectedId);
        console.log(samples)

        bar_init(samples)
        bubble_plot_init(samples)

    });

};



function refreshCharts() {
    let selectedId = d3.select("#selDataset").text();
}

function bar_init(samples) {
    console.log(samples[0].sample_values)
    // let x = samples.sample_values,
    // let y = samples.otu_ids,
    //we need to map to turn the array into values
    let trace = {
        x: samples[0].sample_values.slice(0, 10).reverse(),
        y: samples[0].otu_ids.map(id => `OTU ${id}`).slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
    };
    traceData = [trace]
    Plotly.newPlot("bar", traceData)
};

function bubble_plot_init(samples) {
    // let trace = {
    //     x: samples.otu_ids,
    //     y: samples.sample_values,
    //     size: sample.sample_values,


    // };


    let trace = {
        x: samples[0].otu_ids,
        y: samples[0].sample_values,
        text: samples[0].otu_labels,
        mode: 'markers',
        marker: {
            size: samples[0].sample_values,
            color: samples[0].otu_ids,
            colorscale: 'Rainbow'
        }

    };
    let traceData = [trace]
    Plotly.newPlot("bubble", traceData)
};