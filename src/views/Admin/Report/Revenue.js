import React from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Chart from "react-apexcharts";
import Button from "components/CustomButtons/Button.js";
import Datetime from "react-datetime";

//style
import "./style.css"
const series = [{
  name: 'Doanh số',
  data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 60, 72, 56]
}, {
  name: 'Lãi',
  data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 112, 33, 56]
}, {
  name: 'Công nợ',
  data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 55, 66, 44]
}]

const options = {
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  },
  yaxis: {
    title: {
      text: '$ (VNĐ)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + "tr VNĐ"
      }
    }
  }
}

export default function Revenue() {
  return (
    <div className="revenue-container">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="date-time-container">
            <span>Năm</span>
            <Datetime
              timeFormat={false}
              dateFormat="YYYY"
            />
            <Button color="primary" size="sm">Lọc</Button>
          </div>
          <Chart options={options} series={series} type="bar" height={350} />
        </GridItem>
      </GridContainer>
    </div>
  );
}
