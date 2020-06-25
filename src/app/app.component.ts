
import { Component, NgZone  ,ElementRef,ViewChild} from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { JsonService } from './json.service';
import { MouseCursorStyle } from '@amcharts/amcharts4/core';
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  private chart: am4charts.XYChart;
  @ViewChild('chartDiv1', { static: true }) chartDiv1: ElementRef;
  constructor(private zone: NgZone, private jsonService: JsonService) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      // Create chart instance
      let chart = am4core.create("chartdiv1", am4charts.XYChart);

      // Add data
      chart.data = [];

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
      categoryAxis.renderer.grid.template.location = 0;
      //categoryAxis.renderer.minGridDistance = 30;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      let scrollbarX = new am4charts.XYChartScrollbar();
      // Create series
      function createSeries(field, name) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = name;
        series.tooltipText = "{dateX}: [b]{valueY}[/]";
        series.strokeWidth = 2;

        scrollbarX.series.push(series);

      }

      createSeries("value", "Series #1");
      // createSeries("value2", "Series #2");
      // createSeries("value3", "Series #3");

      chart.scrollbarX = scrollbarX;

      this.chart = chart;
      // this.chart.cursor.behavior = "panX";
      let self = this;
      setTimeout(function () {
        self.jsonService.getData().subscribe((data: any): void => {
          self.chart.data = data;
        });
      }, 2000)

  // am4core.getInteraction().body.events.on("keydown", (ev) => {
  //             value.columns.template.cursorOverStyle = MouseCursorStyle.default;
  //             chart.cursorOverStyle = am4core.MouseCursorStyle.default;

  
  //             if (am4core.keyboard.isKey(ev.event, "ctrl")) {
  //                 chart.cursor.behavior = "selectXY";
  //               console.log("keyboard keydown");
         
                 
  //                 this.chartDiv1.nativeElement.style = `cursor: url("data:image/svg+xml,%3Csvg width='23px' height='23px' viewBox='0 0 23 23' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Eato/graph cursor - ctrl%3C/title%3E%3Cg id='ato/graph-cursor---ctrl' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cpath d='M12,-2.72848411e-12 L12.0003924,4.51760973 C15.4675652,4.76249954 18.2375005,7.53243478 18.4823903,10.9996076 L23,11 L23,12 L18.4824612,11.9993867 C18.2380361,15.4670295 15.4679005,18.2374768 12.0003924,18.4823903 L12,23 L11,23 L11.0006133,18.4824612 C7.5326352,18.2380125 4.76198751,15.4673648 4.51753877,11.9993867 L0,12 L0,11 L4.51760973,10.9996076 C4.76252322,7.53209953 7.53297047,4.76196388 11.0006133,4.51753877 L11,-2.72848411e-12 L12,-2.72848411e-12 Z M12.0009037,5.52061151 L12,8.5 L11,8.5 L11.0000973,5.52052886 C8.08545439,5.76093454 5.76149415,8.08458865 5.52061151,10.9990963 L8.5,10.999 L8.5,11.999 L5.52052886,11.9999027 C5.76096206,14.9148793 8.08512071,17.2390379 11.0000973,17.4794711 L11,14.5 L12,14.5 L12.0009037,17.4793885 C14.9154113,17.2385058 17.2390655,14.9145456 17.4794711,11.9999027 L14.5,11.999 L14.5,10.999 L17.4793885,10.9990963 C17.2385334,8.08492231 14.9150777,5.76146658 12.0009037,5.52061151 Z' id='Combined-Shape' fill='%23000000' fill-rule='nonzero'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") 12 12, pointer !important`;
                
  //                 // chart.cursor.behavior ="selectX";
  //                 return;
               
               
  //             }
  //             chart.cursor.behavior = "panX";
  //           });


  //           am4core.getInteraction().body.events.on("keyup", (ev) => {
  //             console.log("keyboard keyup key press");
  //             if (am4core.keyboard.isKey(ev.event, "ctrl")) {
  //               // consumptionSeries.columns.template.cursorOverStyle = MouseCursorStyle.pointer;
  //               this.chartDiv1.nativeElement.style.cursor = 'default';
  //               chart.cursor.behavior = "panX";
  //             }
  //             // chart.cursorOverStyle = am4core.MouseCursorStyle.default;
  //           });
  //            chart.data = data;
  // }


    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
