import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartColumn } from '../../models/chart-data';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input() data: ChartColumn[] = [];
  @Input() domId!: string;

  private svg!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  private margin = 50;
  private width = 250 - (this.margin * 2);
  private height = 250 - (this.margin * 2);

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = d3.select(`figure#${this.domId}`)
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    const maxValue = this.getMaxValue();
    // Create the X-axis band scale
    const x:any = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.value))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat((d) => '').tickSize(0))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    const x1 = d3.scaleOrdinal();

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, maxValue])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.value))
    .attr("y", d => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", (d) => this.height - y(d.count))
    .attr("fill", "#d04a35");
  }

  getMaxValue() {
    return Math.max.apply(Math, this.data.map(elem => elem.count));
  }

}
