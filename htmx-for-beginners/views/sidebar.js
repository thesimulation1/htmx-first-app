const createSidebarTemplate = () => /*html*/`

<link rel="stylesheet" href="/sidebar.css">
    <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a hx-get="/" 
        hx-push-url="true" 
        hx-target="#main"  
        hx-on::before-request="closeNav()"
        >About</a>
        <a hx-get="/test" 
        hx-push-url="true" 
        hx-target="#main" 
        hx-on::before-request="closeNav()"
        >Test</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>

  <script>
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }
  </script>

<div>
  <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; open</span>
</div>
`;

export default createSidebarTemplate;
