import createSidebarTemplate from './sidebar.js';
import createGraphTemplate from './graph.js';

const createTestTemplate = (data) => /*html*/`
<!DOCTYPE html>
  <html>
    <head>
      <title>My Reading List</title>
      <script src="https://unpkg.com/htmx.org@1.9.12"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
      <script>console.log("Node.js + SQLite")</script>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body id="main">
      ${createSidebarTemplate()}
      <header>
        <h1>My Reading List</h1>
      </header>

     <h1>This is a test navigation</h1>
     <div class="book-graph">
    ${createGraphTemplate(data)}
</div>
    </body>
  </html>

`;

export default createTestTemplate;