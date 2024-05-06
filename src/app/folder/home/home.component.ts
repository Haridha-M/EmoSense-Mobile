import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  private svg: any;
  private margin = 50;
  private width = 300;
  private height = 300;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors:any;
  error: any;
  cities: any;
  countries: any;
  count: any;
  Happy: any=[];
  Sad: any=[];
  Angry: any=[];
  Excited: any=[];
  Bored: any=[];
  Confused: any=[];
  Calm: any=[];
  Tired: any=[];
  Disappointed: any=[];
private data = [
  {id:1,"Stars":this.Happy,color:"#57A241" },
  {id:2,"Stars":this.Sad,color:"#99C530"},
  {id:3,"Stars":this.Angry,color:"#EEBC0F"},
  {id:4,"Stars":this.Excited,color:"#EE9143"},
  {id:5,"Stars":this.Bored ,color:"#E75563"},
  {id:6,"Stars":this.Confused,color:"#E7679E"},
  {id:7,"Stars":this.Calm,color:"#CA7FC2"},
  {id:8,"Stars":this.Tired,color:"#6271C2"},
  {id:9,"Stars":this.Disappointed,color:"#6DD6CB"},
];
  userId:any  ;

  constructor(private router:Router,private apiService:ServiceService) { }

  ngOnInit() {
    this.createSvg();
    this.createColors();
    this.drawChart();
    this.getAllMoodStatus()
    
    // this.createProgressBarCharts();
  }
  routeToPage(){
    this.router.navigate(['/folder/moodChoose'])
  }
  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }
  private createColors(): void {
    // Define your custom color order
    const sortOrder = ["#57A241", "#99C530", "#EEBC0F", "#EE9143", "#E75563", "#E7679E", "#CA7FC2", "#6271C2", "#6DD6CB"];
  
    // Sort the data based on custom order
    const sortedData = this.data.sort((a, b) => sortOrder.indexOf(a.color) - sortOrder.indexOf(b.color));
  
    // Create a color scale based on the sorted data
    this.colors = d3.scaleOrdinal()
      .domain(sortedData.map(d => d.id.toString())) // Use id as the domain
      .range(sortOrder); // Use the predefined custom order as the range
  }
  // ...
  
  private drawChart(): void {
    const sumOfValues = Object.values(this.data).reduce((acc, curr) => acc + Number(curr.Stars), 0);
    if (sumOfValues === 0) {
      this.svg.selectAll("*").remove();
      this.svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .attr('fill', '#67686b')
      .text('No data found')
  return;
        
    }else{

      
          // Compute the position of each group on the pie:
        
          // Build the pie chart with a ring structure
          const pie = d3.pie<any>().value((d: any) => Number(d.Stars));
        
          // Build the pie chart with a ring structure
          const arcGenerator = d3.arc<any, d3.DefaultArcObject>()
            .innerRadius(this.radius - 25) // Inner radius (create a ring by setting a value greater than 0)
            .outerRadius(this.radius);
        
          this.svg
            .selectAll('pieces')
            .data(pie(this.data))
            .enter()
            .append('path')
            .attr('d', (d: any) => arcGenerator(d))
            .attr('fill', (d: any, i: any) => this.colors(d.data.id.toString()))
            .style("stroke-width", "1px")
            .transition() // Add transition for animation
            .duration(1000) // Set duration for the animation in milliseconds
            .attrTween('d', function(d: any) {
              const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
              return function(t: any) {
                return arcGenerator(interpolate(t));
              };
            });
        
          // Display count at the center of the pie chart
          this.svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('font-size', '50px')
            .style('font-weight', 'bold')
            .text(this.count);
        
          // Add labels
          const labelLocation = d3.arc()
            .innerRadius(this.radius - 40) // Adjust the inner radius for label placement
            .outerRadius(this.radius);
        
          this.svg
            .selectAll('pieces')
            .data(pie(this.data))
            .enter()
            .append('text')
            .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
            .style("text-anchor", "middle")
            .style("font-size", 15)
            .text((d: any) => d.data.label)
            .transition() // Add transition for animation
            .delay(1000) // Delay the label animation to start after the path animation
            .styleTween('opacity', function() { return d3.interpolate(0, 1); }); // Tween the opacity from 0 to 1
    }


}

  
  
  getAllMoodStatus(){

    this.userId=localStorage.getItem('userId');
    this.apiService.getAllMoodStatus(this.userId).subscribe({
      next: (res:any) => {
        console.log(res,'kkkkk');

         this.Happy=res.data.Happy 
         this.Sad=res.data.Sad
         this.Angry=res.data.Angry
         this.Excited=res.data.Excited
         this.Bored=res.data.Bored 
         this.Confused=res.data.Confused
         this.Calm=res.data.Calm
         this.Tired=res.data.Tired
         this.Disappointed=res.data.Disappointed
console.log( this.Happy);
this.data[0].Stars = this.Happy;
this.data[1].Stars = this.Sad;
this.data[2].Stars = this.Angry;
this.data[3].Stars = this.Excited;
this.data[4].Stars = this.Bored;
this.data[5].Stars = this.Confused;
this.data[6].Stars = this.Calm;
this.data[7].Stars = this.Tired;
this.data[8].Stars = this.Disappointed;
this.count=this.Happy+this.Sad+this.Angry+this.Excited+this.Bored+this.Confused+this.Calm+this.Tired+this.Disappointed
        // this.router.navigate(['/home']);
        //stroe token in local storage
        this.svg.selectAll("*").remove();
        this.drawChart();
        this.createProgressBarCharts()
      },
      error: (err) => {
        console.log('error',err.error);
        this.error = err.error.err;
      }
    });
  }
  private createProgressBarCharts(): void {
    const data = [
      { label: 'Happy', value: Math.min(this.Happy, 30), color: "#57A241" },
      { label: 'Sad', value: Math.min(this.Sad, 30), color: "#99C530" },
      { label: 'Angry', value: Math.min(this.Angry, 30), color: "#EEBC0F" },
      { label: 'Excited', value: Math.min(this.Excited, 30), color: "#EE9143" },
      { label: 'Bored', value: Math.min(this.Bored, 30), color: "#E75563" },
      { label: 'Confused', value: Math.min(this.Confused, 30), color: "#E7679E" },
      { label: 'Calm', value: Math.min(this.Calm, 30), color: "#CA7FC2" },
      { label: 'Tired', value: Math.min(this.Tired, 30), color: "#6271C2" },
      { label: 'Disappointed', value: Math.min(this.Disappointed, 30), color: "#6DD6CB" }
    ];
    const hasData = data.some(item => item.value > 0);

    if (!hasData) {
      // If there is no data, exit the function
      return;
    }
  
    const containerIdPrefix = 'progress-bar'; // Prefix for container IDs
    const numCharts = 9; // Number of progress bar charts
    const width = 330;
    const height = 25; // Increased height to accommodate labels and percentages
    const strokeWidth = 2; // Adjust as needed
    const borderRadius = 10; // Border radius for outline
    const textOffset = 5; // Offset for text elements
    
    for (let i = 0; i < numCharts; i++) {
      const containerId = `${containerIdPrefix}-${i + 1}`;
      
      // Calculate percentage, treating values above 30 as 100%
      const percentage = data[i].value <= 30 ? (data[i].value / 30) * 100 : 100;
      
      // Create SVG element
      const svg = d3.select(`#process`)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
      // Create a linear scale for the progress
      const xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([strokeWidth, width - strokeWidth]);
    
      // Create group for the progress bar
      const barGroup = svg.append('g');
    
      // Append background rectangle for the progress bar with border radius
      barGroup.append('rect')
        .attr('x', strokeWidth)
        .attr('y', strokeWidth)
        .attr('width', width - 2 * strokeWidth)
        .attr('height', height - 2 * strokeWidth)
        .attr('rx', borderRadius) // Border radius for x-axis
        .attr('ry', borderRadius) // Border radius for y-axis
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', strokeWidth);
    
      // Append rectangle for the filled part of the progress bar with specified color and border radius
      barGroup.append('rect')
        .attr('x', strokeWidth)
        .attr('y', strokeWidth)
        .attr('height', height - 2 * strokeWidth)
        .attr('fill', data[i].color)
        .attr('rx', borderRadius) // Border radius for x-axis
        .attr('ry', borderRadius) // Border radius for y-axis
        .attr('width', 0)
        .transition()
        .duration(1000) // Adjust animation duration as needed
        .attr('width', xScale(percentage) - strokeWidth);
    
      // Append text for label
      svg.append('text')
        .attr('x', 0) // Position next to the progress bar with an offset
        .attr('y', height / 2)
        .attr('dx', '0.5em')
        .attr('dy', '0.35em')
        .attr('text-anchor', 'start') // Align to the start of the text
        .text(data[i].label)
        .style('fill', 'black')
        .style('font-size', '14px');
    
      // Append text for percentage
      svg.append('text')
        .attr('x', width) // Position next to the progress bar with an offset
        .attr('y', height / 2)
        .attr('dx', '-0.5em')
        .attr('dy', '0.35em')
        .attr('text-anchor', 'end') // Align to the end of the text
        .text(`${percentage.toFixed(2).replace('.00', '')}%`)
        .style('fill', 'black')
        .style('font-size', '14px');
    }
  }
  
  
  
  
  
  
  
  

}
