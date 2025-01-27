const createGraphTemplate = (data) => {
    if (!data || !data.labels || !data.values) {
      throw new Error('Invalid data for graph');
    }
  
    return /*html*/`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Book Graph</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
        </head>
        <body>
          <h1>Book Graph</h1>
          <canvas id="bookChart" width="400" height="200"></canvas>
          <script>
          try {
            Chart.getChart('myCyhart').destroy()
          }
          catch {
          // doesn't exist yet
          
              const ctx = document.getElementById('bookChart').getContext('2d');
              new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: ${JSON.stringify(data.labels)},
                  datasets: [{
                    label: 'Book Prices',
                    data: ${JSON.stringify(data.values)},
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                  }]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
            };
          </script>
        </body>
      </html>
    `;
  };
  
  export default createGraphTemplate;