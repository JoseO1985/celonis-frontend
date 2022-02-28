import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartColumn } from '../../../features/heroes/models/chart-data';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  @Input() data: ChartColumn[] = [];
  @Input() margin = 50;
  @Input() width = 250;
  @Input() height = 250;
  @Input() domId!: string;

  svg!: any;
  radius = Math.min(this.width, this.height) / 2 - this.margin;
  colors!: any;
  pie!: d3.Pie<any, any>;
  labelLocations!: d3.Arc<any, d3.DefaultArcObject>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3.select(`figure#${this.domId}`)
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
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.count.toString()))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  private drawChart(): void {
    this.pie = this.computeGroupPositions();

    this.buildPieChart();

    this.labelLocations = this.addLabels();

    this.createAndFillPie();
  }

  computeGroupPositions() {
    return d3.pie<any>().value((d: any) => Number(d.count));
  }

  buildPieChart() {
    this.svg
    .selectAll('pieces')
    .data(this.pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");
  }

  addLabels() {
    return d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);
  }

  createAndFillPie() {
    this.svg
    .selectAll('pieces')
    .data(this.pie(this.data))
    .enter()
    .append('text')
    .text((d: any) => d.data.value)
    .attr("transform", (d: any) => "translate(" + this.labelLocations.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }
}
