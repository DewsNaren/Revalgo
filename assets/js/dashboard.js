const header=document.querySelector("header");
const dashBoardWrapper=document.querySelector(".dashboard-wrapper");
const dashBoardBodyWrapper=document.querySelector(".dashboard-body-wrapper");
const expandOverlay=document.querySelector(".expand-overlay");

function setDashWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height;
  dashBoardWrapper.style.height=`calc(100vh - ${headerHeight}px)`
  expandOverlay.style.height=`calc(100vh - ${headerHeight}px)`;
}

setDashWrapperHeight();

window.addEventListener('resize',setDashWrapperHeight)

//charts
let trendChart;
const trendChartContainer=document.getElementById("trend-chart")

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
    accessibility:{
      enabled:false
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
    const legends = trendChartContainer.querySelectorAll('.legend');

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

function enableModalTrendLegend(){
  if(trendChart){
    const legends = trendChartContainer.querySelectorAll('.legend');

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

const accurChart=Highcharts.chart('accuracy-chart', {

  chart: {
    type: 'gauge',
    plotBackgroundColor: null,
    plotBackgroundImage: null,
    plotBorderWidth: 0,
    plotShadow: false,
    height: '80%',
    spacingBottom: 20,
    // useHTML:true,
      styledMode:true,
      reflow: true ,
   

    events: {
      load: function () {
        drawCustomArc(this);
      },
       redraw: function () {
    drawCustomArc(this);
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
   
    tickWidth: 0,
    minorTickWidth: 0,
    lineWidth: 0,
    labels: {
      enabled:false,
    },
    

  },


  series: [{
    name: 'Accuracy',
    data: [96.6],
    dataLabels: {
      useHTML: true,
      format: '<div class="accur-label">{y}</div>',
      borderWidth: 0,
      y:25,
      x:-20,
      verticalAlign: 'bottom',
      
      
         
    },
    dial: {
      radius: '110%', 
      backgroundColor: '#000000',
      borderColor: 'white',
      borderWidth: 0, 
      // topWidth: 3, 
      baseWidth: sizes.baseWidth, 
      baseLength: '2%',
      rearLength: '0%'
    },
    pivot: {
      backgroundColor: 'white', 
      borderColor: '#000000', 
      borderWidth: 2, 
      radius:sizes.pivotRadius,
    }
  }],

  credits:{
    enabled:false
  },
  accessibility:{
    enabled:false
  }
});



function drawCustomArc(chart) {

  if (chart.customGaugeGroup) {
    chart.customGaugeGroup.destroy();
    chart.customGaugeGroup = null;
  }


  if (chart.customLabels) {
    chart.customLabels.forEach(label => label.destroy());
  }
  chart.customLabels = [];

  // create new group
  const group = chart.renderer.g('custom-gauge').add();
  chart.customGaugeGroup = group;

  const centerX = chart.plotLeft + chart.plotWidth * 0.5;
  const centerY = chart.plotTop + chart.plotHeight * 0.75;

  const startAngle = -Math.PI;
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
    .add(group);
  }

  const labelRadius = baseOuter + 25;

  const x0 = centerX + labelRadius * Math.cos(startAngle);
  const y0 = centerY + labelRadius * Math.sin(startAngle);

  const x100 = centerX + labelRadius * Math.cos(endAngle);
  const y100 = centerY + labelRadius * Math.sin(endAngle);


  const label0 = chart.renderer.text(
    '<span class="gauge-label">0</span>',
    x0 + 20,
    y0 + 15,
    true
  ).add();

  const label100 = chart.renderer.text(
    '<span class="gauge-label">100</span>',
    x100 - 35,
    y100 + 15,
    true
  ).add();

  chart.customLabels.push(label0, label100);
}



function renderAccurChart(Data){
  accurChart.update({
    series:[{
      data: [Data],
    }]
  })
}


let lastSmall = window.innerWidth < 1600;

//modal chart

let modalTrendChart;
const modalTrendChartContainer=document.getElementById("trend-modal-chart");
console.log(modalTrendChartContainer)
function renderModalTrendChart(){
  modalTrendChart=Highcharts.chart('trend-modal-chart', {
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
    accessibility:{
      enabled:false
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

renderModalTrendChart();

enableModalTrendLegend();


//modal gauge chart

let modalSizes = getmodalAccurSizes();

function getmodalAccurSizes() {
  const w = window.innerWidth;

  let baseWidth = 15;  
  if (w <= 1200) baseWidth = 10;
    else if (w <= 1400) baseWidth = 11;
    else if (w <= 1600) baseWidth =  12;

  return {
    baseWidth: baseWidth,
    pivotRadius: w <= 1600 ? 6 : 7
  };
}

const modalAccurChart=Highcharts.chart('accuracy-modal-chart', {

  chart: {
    type: 'gauge',
    plotBackgroundColor: null,
    plotBackgroundImage: null,
    plotBorderWidth: 0,
    plotShadow: false,
    height: '68%',
    spacingBottom: 20,
    // useHTML:true,
      styledMode:true,
      reflow: true ,
   

    events: {
      load: function () {
        drawModalCustomArc(this);
      },
       redraw: function () {
    drawModalCustomArc(this);
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
    size: '100%'
  },

  // the value axis
  yAxis: {
    min: 0,
    max: 100,
   
    tickWidth: 0,
    minorTickWidth: 0,
    lineWidth: 0,
    labels: {
      enabled:false,
    },
    

  },


  series: [{
    name: 'Accuracy',
    data: [96.6],
    dataLabels: {
      useHTML: true,
      format: '<div class="accur-label">{y}</div>',
      borderWidth: 0,
      y:55,
      // x:-25,
      verticalAlign: 'bottom',
         
    },
    dial: {
      radius: '140%', 
      backgroundColor: '#000000',
      borderColor: 'white',
      borderWidth: 0, 
      // topWidth: 3, 
      baseWidth: modalSizes.baseWidth, 
      baseLength: '7%',
      rearLength: '0%'
    },
    pivot: {
      backgroundColor: 'white', 
      borderColor: '#000000', 
      borderWidth: 2, 
      radius:modalSizes.pivotRadius,
    }
  }],

  credits:{
    enabled:false
  },
  accessibility:{
    enabled:false
  }
});

function drawModalCustomArc(chart) {

  if (chart.customGaugeGroup) {
    chart.customGaugeGroup.destroy();
    chart.customGaugeGroup = null;
  }


  if (chart.customLabels) {
    chart.customLabels.forEach(label => label.destroy());
  }
  chart.customLabels = [];

  // create new group
  const group = chart.renderer.g('custom-gauge').add();
  chart.customGaugeGroup = group;

  const centerX = chart.plotLeft + chart.plotWidth * 0.5;
  const centerY = chart.plotTop + chart.plotHeight * 0.75;

  const startAngle = -Math.PI;
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

    const thickness = 23 + i * 2;

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
    .add(group);
  }

  const labelRadius = baseOuter + 25;

  const x0 = centerX + labelRadius * Math.cos(startAngle);
  const y0 = centerY + labelRadius * Math.sin(startAngle);

  const x100 = centerX + labelRadius * Math.cos(endAngle);
  const y100 = centerY + labelRadius * Math.sin(endAngle);


  const label0 = chart.renderer.text(
    '<span class="gauge-label">0</span>',
    x0 + 20,
    y0 + 15,
    true
  ).add();

  const label100 = chart.renderer.text(
    '<span class="gauge-label">100</span>',
    x100 - 35,
    y100 + 15,
    true
  ).add();

  chart.customLabels.push(label0, label100);
}

function renderModalAccurChart(Data){
  modalAccurChart.update({
    series:[{
      data: [Data],
    }]
  })
}


//resize listener
window.addEventListener("resize", () => {
  const nowSmall = window.innerWidth < 1600;
  if (nowSmall !== lastSmall) {
    lastSmall = nowSmall;

    const s = getAccurSizes();

    accurChart.update({
      series: [{
        dial: { baseWidth: s.baseWidth },
        pivot: { radius: s.pivotRadius }
      }]
    }, true); 
    const ms = getmodalAccurSizes();
    modalAccurChart.update({
      series: [{
        dial: { baseWidth: ms.baseWidth },
        pivot: { radius: ms.pivotRadius }
      }]
    }, true); 

  } else {
    accurChart.reflow(); 
    modalAccurChart.reflow();
  }


  if (trendChart){
    trendChart.reflow();
  }
  if(modalTrendChart){
    modalTrendChart.reflow();
  }

});


//expand function 
const overlay = document.querySelector(".expand-overlay");
const modalBox = document.querySelector(".expand-modal");
const modalContent = document.querySelector(".expand-modal-content");
const modalTrendChartWrapper=modalContent.querySelector(".trend-chart-wrapper");
const modalaccurChartWrapper=modalContent.querySelector(".accuracy-chart-wrapper");

const expandBtns=document.querySelectorAll(".expand-btn");
const closeBtn = document.querySelector(".close-modal-btn");
expandBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    const target = btn.dataset.target;

    const source = document.querySelector(target);
    if (!source) return;

    modalBox.className = "expand-modal " + type;

    if (type === "table") {
      const modalTransactionWrapper=modalContent.querySelector(".transaction-wrapper");
      const modalQuoteContainer=modalContent.querySelector(".quotes-container");
      modalQuoteContainer?.classList.remove("active");
      modalTransactionWrapper?.classList.remove("active");
      const clone = source.cloneNode(true);      
      
      if(target ==".quotes-container"){
        modalContent.appendChild(source);
        const modQuoteContainer=modalContent.querySelector(".quotes-container");
        modQuoteContainer.classList.add("active");
        dashBoardBodyWrapper.insertBefore(clone, dashBoardBodyWrapper.firstChild);
      }
      else if(target==".transaction-wrapper"){
        const modalTransactionWrapper=modalContent.querySelector(".transaction-wrapper");
        if(!modalTransactionWrapper){
          modalContent.appendChild(clone);
        }
        const modTransactionWrapper=modalContent.querySelector(".transaction-wrapper");
        modTransactionWrapper?.classList.add("active");
      }

    }

    if (type === "chart") {
      const modalTransactionWrapper=modalContent.querySelector(".transaction-wrapper");
      modalTrendChartWrapper?.classList.remove("active");
      modalaccurChartWrapper?.classList.remove("active");
      modalTransactionWrapper?.classList.remove("active");
      if (target ==".trend-chart-wrapper") {
        modalTrendChartWrapper.classList.add("active");
      } else if (target === ".accuracy-chart-wrapper" ) {
        modalAccurChart.reflow();
        modalaccurChartWrapper.classList.add("active");
        
      }
    }
    overlay.classList.add("active");
  });
});

// close button
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  const quoteContainer=document.querySelector(".quotes-container");
  const originalSource=modalContent.querySelector(".quotes-container")
  if(originalSource){
    quoteContainer.remove();
    dashBoardBodyWrapper.insertBefore(originalSource, dashBoardBodyWrapper.firstChild);
  }
  
});

// close on overlay click
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
});



