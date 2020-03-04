import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { LineChartModel } from 'src/app/models/line-chart-model';

@Component({
  selector: 'app-d3-line-chart',
  templateUrl: './d3-line-chart.component.html',
  styleUrls: ['./d3-line-chart.component.css']
})
export class D3LineChartComponent implements OnInit, AfterViewInit {

  @Input() data: Array<LineChartModel>;
  @Input() Title: string;
  @Input() xLabel: string;
  @Input() yLabel: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (!this.data) { return; }

    window.addEventListener('resize', () => {
      this.createChart();
    });

    this.createChart();
  }

  private createChart(): void {

    const data = this.data;
    const svg = d3.select('#lineChart');
    const element = svg.node() as SVGAElement;

    const width = element.getBoundingClientRect().width;
    const height = element.getBoundingClientRect().height;
    const margin = { top: 30, right: 30, bottom: 40, left: 30 };

    const yScale = d3.scaleLinear()
                      .domain(d3.extent(data, d => d.value))
                      .range([height - margin.bottom, margin.top]);

    const xScale = d3.scaleUtc()
                      .domain(d3.extent(data, d => d.date))
                      .range([margin.left, width - margin.right]);

    const xAxis = d3.axisBottom(xScale)
                    .tickSize(-height + margin.top + margin.bottom)
                    .tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale)
                    .tickSize(-width + margin.right + margin.left)
                    .tickSizeOuter(0);

    const line = d3.line<LineChartModel>()
                    .x(d => xScale(d.date))
                    .y(d => yScale(d.value));

    // Clear SVG
    svg.selectAll('*')
        .remove();
    // Add Axis
    svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'start')
        .attr('transform', 'rotate(45)');

    svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis);
    // Draw line
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

    // Styles
    svg.selectAll('.tick line')
        .style('stroke', '#DDD')
        .style('stroke-dasharray', '5, 2');

    // Ruler
    const dateLine = svg.append('line')
                        .attr('stroke', '#007bff')
                        .attr('stroke-width', 1)
                        .style('stroke-dasharray', '2, 1');

    const priceLine = svg.append('line')
                          .attr('stroke', '#007bff')
                          .attr('stroke-width', 1)
                          .style('stroke-dasharray', '2, 1');

    // Tooltip
    const toolTip = svg.append('g')
                        .style('background-color', '#007bff')
                        .attr('visibility', 'collapse');
    toolTip.append('rect')
            .attr('rx', 5)
            .attr('ry', 5);
    const text = toolTip.append('text')
                          .attr('fill', 'white');


    // Functions
    function moved(): void {
      const mousePos = d3.mouse(element);
      const date = xScale.invert(mousePos[0]);
      const price = yScale.invert(mousePos[1]);

      const i = data.findIndex(d => {
        const DATE = new Date(d.date);
        return DATE.getFullYear() === date.getFullYear() && DATE.getMonth() === date.getMonth() && DATE.getDate() === date.getDate();
      });

      if (i > 0 && i < data.length) {
        dateLine.attr('y1', yScale(data[i].value))
              .attr('y2', height - margin.bottom)
              .attr('x1', mousePos[0])
              .attr('x2', mousePos[0]);
        priceLine.attr('y1', yScale(data[i].value))
              .attr('y2', yScale(data[i].value))
              .attr('x1', margin.left)
              .attr('x2', xScale(data[i].date));

        const textBounds = text.node().getBBox();
        toolTip.attr('visibility', 'visible')
                .attr('transform', `translate(${xScale(data[i].date) - (textBounds.width / 2)},
                ${yScale(data[i].value) - textBounds.height / 2})`)
                .select('text')
                .text(data[i].value.toFixed(2));
        const rectPadding = 2;
        toolTip.select('rect')
                .attr('x', textBounds.x - rectPadding)
                .attr('y', textBounds.y - rectPadding)
                .attr('width', textBounds.width + rectPadding * 2)
                .attr('height', textBounds.height + rectPadding * 2)
                .attr('fill', '#007bff');
      }

      d3.event.preventDefault();
    }

    // Events
    svg.on('mousemove', null);
    svg.on('mousemove', moved);
    svg.on('mouseleave', null);
    svg.on('mouseleave', () => {
      dateLine.attr('y1', 0)
        .attr('y2', 0)
        .attr('x1', 0)
        .attr('x2', 0);
      priceLine.attr('y1', 0)
        .attr('y2', 0)
        .attr('x1', 0)
        .attr('x2', 0);
      toolTip.attr('visibility', 'collapse');
    });
  }

}
