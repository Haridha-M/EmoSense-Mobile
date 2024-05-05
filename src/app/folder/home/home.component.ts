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
  private width = 400;
  private height = 300;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors:any;
  error: any;
cities: any;
countries: any;
  count: any=20;
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

  constructor(private router:Router,private apiService:ServiceService) { }

  ngOnInit() {
    this.createSvg();
    this.createColors();
    this.drawChart();
    this.getAllMoodStatus()
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
    // Compute the position of each group on the pie:
  
    // Build the pie chart with a ring structure
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));
  
    // Build the pie chart with a ring structure
    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(this.radius - 25) // Inner radius (create a ring by setting a value greater than 0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => this.colors(d.data.id.toString()))
      .style("stroke-width", "1px");
  
    // Display count at the center of the pie chart
    this.svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '50px')
      .style('font-weight', 'bold')
      // .text(this.count);
  
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
      .style("font-size", 15);
  }
  getAllMoodStatus(){
    this.apiService.getAllMoodStatus().subscribe({
      next: (res:any) => {
        console.log(res);

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

        // this.router.navigate(['/home']);
        //stroe token in local storage
        this.drawChart();
      },
      error: (err) => {
        console.log('error',err.error);
        this.error = err.error.err;
      }
    });
  }
  
}
