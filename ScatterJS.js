//focuses in on grade
var getGrade = function(penguinGrade)
{
    return penguinGrade.grade
}
var clearTable = function()
{
    d3.selectAll("#scatterPlot circle")
        .remove();
}

//basic graph with final and mean hw
var putScatter = function(penguins,graphBox,xscale,yscale)
{
    d3.select("#scatterplot")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
         {
        return xscale(penguin.final.map(getGrade))
    })
    .attr("cy",function(penguin)
         {
        return xscale(d3.mean(penguin.homework.map(getGrade)))
    })
    .attr("r",2)
    
    .on("mouseover",function(county)
       {
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        .append("img")
        .attr("src","imgs/" + county.picture)
})
    .on("mouseout",function(county)
       {
        d3.select("#tooltip")
        .selectAll("img")
        .classed("hidden",true)
        .remove("img")
})
}
//creates the second scatter plot
var putSecondScatter = function(penguins,graphBox,xscale,yscale)
{
    d3.select("#scatterplot")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
         {
        return xscale(d3.mean(penguin.homework.map(getGrade)))
    })
    .attr("cy",function(penguin)
         {
        return xscale(d3.mean(penguin.quizes.map(getGrade)))
    })
    .attr("r",2)
    
    .on("mouseover",function(county)
       {
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        .append("img")
        .attr("src","imgs/" + county.picture)
})
    .on("mouseout",function(county)
       {
        d3.select("#tooltip")
        .selectAll("img")
        .classed("hidden",true)
        .remove("img")
})
}


//creates the graph
var initiateFinalGraph = function(penguins)
{
    var graphBox = {width:800,height:800}
    d3.select("#scatterplot")
    .attr("width",graphBox.width)
    .attr("height",graphBox.height)
    
    var xscale = d3.scaleLinear()
    .domain([0,100])
    .range([0,graphBox.width])
    
    var yscale = d3.scaleLinear()
    .domain([0,100])
    .range([graphBox.height,0])
    
    d3.select("#he1")
    .on("click",function()
       {
        console.log("clicked");
        clearTable();
        putScatter(penguins,graphBox,xscale,yscale);
    })
    d3.select("#he2")
    .on("click",function()
       {
        console.log("clicked");
       clearTable(); putSecondScatter(penguins,graphBox,xscale,yscale);
    })
   //clicks

}
//essential code
var successFCN = function(penguins)
{
    console.log("classData",penguins);
    initiateFinalGraph(penguins)
}
var failFCN = function(error)
{
    console.log("error",error);
}

var classpromise = d3.json("classData.json");
classpromise.then(successFCN,failFCN);
