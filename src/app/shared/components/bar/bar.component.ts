import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartColumn } from '../../../features/heroes/models/chart-data';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input() data: ChartColumn[] = [];
  @Input() domId!: string;
  @Input() margin = 50;
  @Input() width = 250 - (this.margin * 2);
  @Input() height = 250 - (this.margin * 2);

  svg!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  x!: any;
  y!: d3.ScaleLinear<number, number, never>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createSvg();
    this.drawBars();
  }

  private createSvg(): void {
    this.svg = d3.select(`figure#${this.domId}`)
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(): void {
    const maxValue = this.getMaxValue();

    this.x = this.createXAxisBandScale();

    this.drawXAxis();

    this.y = this.createYAxisBandScale(maxValue);

    this.drawYAxis();

    this.createAndFillBars();
  }

  getMaxValue() {
    return Math.max.apply(Math, this.data.map(elem => elem.count));
  }

  drawXAxis() {
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(this.x).tickFormat((d) => '').tickSize(0))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
  }

  createXAxisBandScale() {
    return d3.scaleBand()
    .range([0, this.width])
    .domain(this.data.map(d => d.value))
    .padding(0.2);
  }

  createYAxisBandScale(maxValue: number) {
    return d3.scaleLinear()
    .domain([0, maxValue])
    .range([this.height, 0]);
  }

  drawYAxis() {
    this.svg.append("g")
    .call(d3.axisLeft(this.y));
  }

  createAndFillBars() {
    this.svg.selectAll("bars")
    .data(this.data)
    .enter()
    .append("rect")
    .attr("x", d => this.x(d.value))
    .attr("y", d => this.y(d.count))
    .attr("width", this.x.bandwidth())
    .attr("height", (d) => this.height - this.y(d.count))
    .attr("fill", "#d04a35");
  }

}
