let arr = [['Dispositivo', 'Total']];

function getData() {
  fetch('http://127.0.0.1:5000/monitoramento/grafico1')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.slice(0, 5).forEach((item) => {
        arr.push([item.dispositivo, item.TotalRegistros]);
      });
      drawCharts();
    })
    .catch((error) => console.error('Erro ao obter dados:', error));
}

function drawCharts() {
  loadGoogleCharts(() => {
    renderPieChart();
    renderBarChart();
    renderAreaChart();
  });
}

function loadGoogleCharts(callback) {
  google.charts.load('current', { packages: ['corechart', 'bar'] });
  google.charts.setOnLoadCallback(callback);
}

function renderPieChart() {
  const data = google.visualization.arrayToDataTable(arr);
  const options = {
    title: 'Totalização de Registro por Dispositivo',
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
      title: 'Totalização de Registro por Dispositivo',
    },
    bars: 'horizontal',
  };
  const chart = new google.charts.Bar(
    document.getElementById('barchart_material')
  );
  chart.draw(data, google.charts.Bar.convertOptions(options));
}

function renderAreaChart() {
  const data = google.visualization.arrayToDataTable(arr);
  const options = {
    title: 'Totalização de Registro por Dispositivo',
  };
  const chart = new google.visualization.AreaChart(
    document.getElementById('chart_div')
  );
  chart.draw(data, options);
}

getData();
