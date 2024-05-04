import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  values: any =[];
  values1: any=[];
  values2: any=[];
  values3: any=[];
private data = [
  {id:1,"Stars":10,color:"#57A241" },
  {id:2,"Stars":10,color:"#99C530"},
  {id:3,"Stars":10,color:"#EEBC0F"},
  {id:4,"Stars":10,color:"#EE9143"},
  {id:5,"Stars":10 ,color:"#E75563"},
  {id:6,"Stars":10,color:"#E7679E"},
  {id:7,"Stars":10,color:"#CA7FC2"},
  {id:8,"Stars":10,color:"#6271C2"},
  {id:9,"Stars":10,color:"#6DD6CB"},
];
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
  constructor(private router:Router) { }

  ngOnInit() {
    this.createSvg();
    this.createColors();
    this.drawChart();
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
    // Create a color scale based on the predefined color property in each data object
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.id.toString())) // Use id as the domain
      .range(this.data.map(d => d.color)); // Use the predefined color property as the range
  }
  // ...
  
  private drawChart(): void {
    // Compute the position of each group on the pie:
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
      .attr('fill', (d: any, i: any) => (this.colors(i)))
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
  
}
