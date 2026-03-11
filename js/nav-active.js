function activateCurrentNav() {

  const links = document.querySelectorAll(".header-navigation a");

  if (!links.length) return;

  // Get current page filename
  let current = window.location.pathname.split("/").pop();
  
  // If pathname is empty or just "/", default to index.html
  if (!current || current === "") {
    current = "index.html";
  }

  console.log("Current page:", current);

  links.forEach(link => {

    const href = link.getAttribute("href");
    if (!href) return;

    const file = href.split("/").pop();

    console.log("Comparing:", file, "with", current);

    if (file === current) {
      link.classList.add("active");
      console.log("Active class added to:", file);
    }

  });

}