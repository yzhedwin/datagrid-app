function selectPage() {
    document.getElementById("menulist").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.menubtn')) {
      var items = document.getElementsByClassName("menu-content");
      var i;
      for (i = 0; i < items.length; i++) {
        var openDropdown = items[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  