import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { CandleModel } from 'src/app/models/candle-model';
import { ChartModel } from 'src/app/models/chart-model';

@Component({
  selector: 'app-d3-line-chart',
  templateUrl: './d3-line-chart.component.html',
  styleUrls: ['./d3-line-chart.component.css']
})
export class D3LineChartComponent implements OnInit, AfterViewInit {

  @Input() data: Array<ChartModel>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (!this.data) { return; }

    this.createChart();
  }

  private createChart(): void {

    const data = this.data;
    const svg = d3.select('#chart');
    const element = svg.node() as SVGAElement;

    const width = element.getBoundingClientRect().width;
    const height = element.getBoundingClientRect().height;
    console.log(height);
    const padding = 20;

    const barPadding = width / (data.length * 2);
    const barWidth = barPadding;

    const yScale = d3.scaleLinear()
                      .domain(d3.extent(data, d => d.value))
                      .range([height - padding, padding]);

    const xScale = d3.scaleUtc()
                      .domain(d3.extent(data, d => d.date))
                      .range([padding, width - padding]);

    const line = d3.line<ChartModel>()
                    .x(d => xScale(d.date))
                    .y(d => yScale(d.value));

    svg
        .attr('width', width)
        .attr('height', height)
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line);

  }

}
