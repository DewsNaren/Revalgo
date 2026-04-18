const header=document.querySelector("header");
const dashBoardWrapper=document.querySelector(".dashboard-wrapper");
console.log(dashBoardWrapper)

function setDashWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height
  console.log( `calc(100vh-${headerHeight}px)`)
  dashBoardWrapper.style.height=`calc(100vh - ${headerHeight}px)`
}

setDashWrapperHeight();

window.addEventListener('resize',setDashWrapperHeight)

//charts
let trendChart;


function renderTrendChart(){
  trendChart=Highcharts.chart('trend-chart', {
    chart: {
      type: 'area',
      animation: true
    },
    xAxis: {
      // lineWidth: 0,
      lineColor:'#e6e6e6',
      categories: [
          'Jan', 'Feb', 'Mar', 'Apr',
          'May', 'Jun', 'Jul', 'Aug'
      ],
      title: {
          text: ''
      },
      labels: { 
        useHTML: true ,
        format: '<div class="trend-x-label">{value}</div>', 
          
      },

    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: { 
          useHTML: true ,
         format: '<div class="trend-y-label">{value}</div>', 
          
      },
    },
    tooltip:{
      outside:true,
    },
    legend:{
      enabled:false
    },
    plotOptions: {
        series: {
        animation: {
          duration: 500
        }
      },
        area: {
          fillOpacity: 0.5,
    
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Total',
        color:'#ff09b5',
        fillColor: 'transparent',
        data: [11, 11, 8, 13, 12, 14, 4, 12],
        marker: {
          enabled: false,
          states: {
              hover: { enabled: false, lineWidth: 0,borderWidth: 0 },
              inactive: { opacity: 1 }
            },
      } 
    }, {
        name: 'Approved',
        color:'#49b4ff',
        fillColor:'#49b4ff',
        // fillOpacity: 0.3,
        data: [10, 10, 8, 12, 8, 6, 4, 8],
          marker: {
            symbol: 'circle', 
            fillColor: '#ffffff',  
            lineColor: '#49b4ff',  
            lineWidth: 1,
            radius:3,
            states: {
              hover: { enabled: false, lineWidth: 0,borderWidth: 0 },
              inactive: { opacity: 1 }
            },

          }
    }]
});
}

renderTrendChart();
enableTrendLegend();




function enableTrendLegend(){
  if(trendChart){
    const legends = document.querySelectorAll('.legend');

    legends.forEach((legend, index) => {
      legend.addEventListener('click', () => {
          legend.classList.toggle('inactive');
          const series=trendChart.series[index] ;
          series.setVisible(!series.visible,false);
          trendChart.redraw();
      });
    });
  }
}


//gauge chart
let sizes = getAccurSizes();

function getAccurSizes() {
  const w = window.innerWidth;

    let baseWidth = 10;  
    if (w <= 1200) baseWidth = 6;
    else if (w <= 1400) baseWidth = 7;
    else if (w <= 1600) baseWidth = 8;

    return {
        baseWidth: baseWidth,
        pivotRadius: w <= 1600 ? 3 : 4
    };
}

  const accurChart=Highcharts.chart('accuracy-chart', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: '80%',
        spacingBottom: 20,

    events: {
    load: function () {
        const chart = this;

        const centerX = chart.plotLeft + chart.plotWidth * 0.5;
        const centerY = chart.plotTop + chart.plotHeight * 0.75;

        const startAngle = -Math.PI ;
      const endAngle = 0;

        const steps = 12;

        const colors = [
            '#ef1c23','#ed531d','#ff7b19','#fec900',
            '#fee600','#d7df23','#b9c036','#8dc63f',
            '#51b64c','#52b44d','#33ac45','#2daa70'
        ];

        const baseOuter = chart.plotWidth / 2 - 20;

        for (let i = 0; i < steps; i++) {

            const gap = 0.02; 

            const angleStart = startAngle + (i * (endAngle - startAngle) / steps) + gap;
            const angleEnd = startAngle + ((i + 1) * (endAngle - startAngle) / steps) - gap;

            const thickness = 10 + i * 2;

            chart.renderer.arc(
                centerX,
                centerY,
                baseOuter,
                baseOuter,
                angleStart,
                angleEnd
            )
            .attr({
                stroke: colors[i],
                'stroke-width': thickness,
                fill: 'none',
                'stroke-linecap': 'round'
            })
            .add();
        }
        const labelRadius = baseOuter + 25; // little below arc

// 👉 0 position (start)
const x0 = centerX + labelRadius * Math.cos(startAngle);
const y0 = centerY + labelRadius * Math.sin(startAngle);

// 👉 100 position (end)
const x100 = centerX + labelRadius * Math.cos(endAngle);
const y100 = centerY + labelRadius * Math.sin(endAngle);

// draw text
chart.renderer.text('0', x0 + 20, y0 + 15)
    .css({
        fontSize: '14px',
        color: '#333'
    })
    .add();

chart.renderer.text('100', x100 - 35, y100 + 15)
    .css({
        fontSize: '14px',
        color: '#333'
    })
    .add();
    }
}
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -90,
        endAngle: 89.9,
        background: null,
        center: ['50%', '75%'],
        size: '110%'
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,

        tickLength: 0,         
        minorTickLength: 0,     
        tickWidth: 0,
        minorTickWidth: 0,

        labels: {
            distance: 50,
            style: {
                fontSize: '14px'
            }
        },
        lineWidth: 0,


      },


    series: [{
        name: 'Accuracy',
        data: [96.6],
        dataLabels: {
            format: '{y}',
            borderWidth: 0,
            y:25,
            x:-20,
               verticalAlign: 'bottom',
            useHTML: true,
            format: '<div class="accur-label">{y}</div>',
         
        },
        dial: {
            radius: '80%',
            backgroundColor: 'gray',
            baseWidth: 12,
            baseLength: '0%',
            rearLength: '0%'
        },
        pivot: {
            backgroundColor: 'gray',
            radius: 6
        },
dial: {
            radius: '80%', 
            backgroundColor: '#000000',
            borderColor: 'white',
            borderWidth: 0, 
            // topWidth: 3, 
            baseWidth: 10, 
            baseLength: '2%',
            rearLength: '0%'
        },
        pivot: {
            backgroundColor: 'white', 
            borderColor: '#000000', 
            borderWidth: 2, 
            radius: 4 
        }
    }],

    credits:{
      enabled:false
    }
  

});


function renderAccurChart(Data){
  accurChart.update({
    series:[{
      data: [riskData],
    }]
  })
}


let lastSmall = window.innerWidth < 1600;

window.addEventListener("resize", () => {
  const nowSmall = window.innerWidth < 1600;
  if (nowSmall !== lastSmall) {
    lastSmall = nowSmall;
    const s = getAccurSizes();
    accurChart.update({
    series: [{
      dial: {
        baseWidth: s.baseWidth,
      },
      pivot: {
        radius: s.pivotRadius
      }
    }]
   }, true, true);
  }

  accurChart.redraw();
    accurChart.reflow();
    if(trendChart){
      trendChart.reflow();
    }
});