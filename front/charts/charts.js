let arr = [['Dispositivo', 'Total']];

function getData() {
  fetch('http://127.0.0.1:5000/monitoramento/grafico1')
    .then((response) => response.json())
    .then((data) => {
      arr = [['Dispositivo', 'Total']]; // Reset arr to include header
      data.slice(0, 5).forEach((item) => {
        arr.push([item.dispositivo, item.TotalRegistros]);
      });
      drawCharts();
    })
    .catch((error) => console.error('Erro ao obter dados:', error));
}

function drawCharts() {
  loadGoogleCharts(() => {
    if (document.getElementById('pie_chart')) renderPieChart();
    if (document.getElementById('bar_chart')) renderBarChart();
    if (document.getElementById('line_chart')) renderLineChart();
  });
}

function loadGoogleCharts(callback) {
  google.charts.load('current', { packages: ['corechart', 'bar', 'gauge'] });
  google.charts.setOnLoadCallback(callback);
}

function renderPieChart() {
  const data = google.visualization.arrayToDataTable(arr);
  const options = {
    title: 'Total Dispositivos - Pizza',
    
  };
  const chart = new google.visualization.PieChart(
    document.getElementById('pie_chart')
  );
  chart.draw(data, options);
}

function renderBarChart() {
  const data = google.visualization.arrayToDataTable(arr);
  const options = {
    chart: {
      title: 'Total Dispositivos - Barras',
    },
    bars: 'horizontal',
    colors: ['#1b9e77', '#d95f02', '#7570b3'],
    hAxis: {
      title: 'Total',
      minValue: 0,
      textStyle: { color: '#333' },
      titleTextStyle: { color: '#1b9e77' },
    },
    vAxis: {
      title: 'Dispositivo',
      textStyle: { color: '#333' },
      titleTextStyle: { color: '#1b9e77' },
    },
    fontName: 'Arial',
    fontSize: 14,
  };
  const chart = new google.charts.Bar(document.getElementById('bar_chart'));
  chart.draw(data, google.charts.Bar.convertOptions(options));
}

function renderLineChart() {
  const data = google.visualization.arrayToDataTable(arr);
  const options = {
    title: 'Total Dispositivos - Linha',
    colors: ['#a52714', '#097138'],
    hAxis: {
      title: 'Dispositivo',
      titleTextStyle: { color: '#333' },
    },
    vAxis: {
      title: 'Total',
      minValue: 0,
      titleTextStyle: { color: '#333' },
    },
    fontName: 'Arial',
    fontSize: 14,
    areaOpacity: 0.2,
    legend: { position: 'top', textStyle: { color: '#333', fontSize: 16 } },
  };
  const chart = new google.visualization.LineChart(
    document.getElementById('line_chart')
  );
  chart.draw(data, options);
}

document.addEventListener('DOMContentLoaded', getData);
