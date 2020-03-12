import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { TechnicalIndicatorsModel } from 'src/app/models/technical-indicators-model';

interface PieChartModel {
  name: string;
  value: number;
}

@Component({
  selector: 'app-d3-pie-chart',
  templateUrl: './d3-pie-chart.component.html',
  styleUrls: ['./d3-pie-chart.component.css']
})

export class D3PieChartComponent implements OnInit, AfterViewInit {

  @Input() data: TechnicalIndicatorsModel;

  pieData = [] as Array<PieChartModel>;
  totalCount: number;

  constructor() { }

  ngOnInit() {
    this.convertData();
    this.totalCount = this.data.technicalAnalysis.count.buy + this.data.technicalAnalysis.count.neutral
                      + this.data.technicalAnalysis.count.sell;
  }

  ngAfterViewInit(): void {
    if (!this.data) { return; }

    window.addEventListener('resize', () => {
      this.createChart();
    });

    this.createChart();
  }

  convertData(): void {
    this.pieData.push({
      name: 'Buy',
      value: this.data.technicalAnalysis.count.buy
    });
    this.pieData.push({
      name: 'Neutral',
      value: this.data.technicalAnalysis.count.neutral
    });
    this.pieData.push({
      name: 'Sell',
      value: this.data.technicalAnalysis.count.sell
    });
  }

  createChart(): void {
    const data = this.pieData;
    const svg = d3.select('#pieChart');
    const element = svg.node() as SVGAElement;

    const width = element.getBoundingClientRect().width;
    const height = width;

    const colourScale = d3.scaleOrdinal<string>()
                          .domain(data.map(d => d.name))
                          .range(['Green', 'Blue', 'Red']);

    // Clear SVG
    svg.selectAll('*')
        .remove();

    svg
        .attr('height', width)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .classed('pieChart', true);

    const arcs = d3.pie<PieChartModel>()
                    .value(d => d.value)
                    (data);

    const path = d3.arc<PieChartModel>()
                    .outerRadius(height / 2 - 10)
                    .innerRadius(height / 4);

    d3.select('.pieChart')
        .selectAll('.arc')
        .data(arcs)
        .enter()
        .append('path')
          .classed('arc', true)
          .attr('fill', d => colourScale(d.data.name))
          .attr('stroke', 'black')
          .attr('d', path as any);
  }
}
