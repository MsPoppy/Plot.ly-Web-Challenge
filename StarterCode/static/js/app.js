console.log("hello")
//we are pulling in our json data, a promise
d3.json("samples.json").then(function (data) {
    console.log(data[0]);
    console.log(data.names);
    names = data.names;
    console.log(names);

    testbox = document.getElementById("selDataset");
    console.log(testbox)
    // the last four line are because of the create element loop
    for (let i = 0; i < names.length; i++) {
        let subjectId = names[i];
        let el = document.createElement("option");
        el.textContent = subjectId;
        el.value = subjectId;
        testbox.appendChild(el);




    }
});

function optionChanged(id) {
    console.log(id)


    //trace boxes by x and y with id codes
    
    let trace1 = {
        x: otu_ids,
        y: sample_values,
        type: 'bar'
        orientation: 'h'
      };
      
      let data = [trace1];
      
      let layout = {
        title: "Belly Button"
      };
      
      Plotly.newPlot("plot", data, layout);


      //Bubble Chart (plotly.graphing library)
      let trace2 = {
        x: [1, 2, 3, 4],//otu_ids
        y: [10, 11, 12, 13],//sample_values
        mode: 'markers',
        marker: {
          color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
          opacity: [1, 0.8, 0.6, 0.4],
          size: [40, 60, 80, 100] //sample_values
        }
      };
      
      let data = [trace1];
      
     let layout = {
        title: 'Marker Size and Color',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('myDiv', data, layout);