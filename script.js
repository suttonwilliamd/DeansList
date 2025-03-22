document.addEventListener("DOMContentLoaded", function () {
  const interestBubbles = document.querySelectorAll(".interest-bubble");
  const contentArea = document.getElementById("content-area");
  let categoriesData = {};

  // Fetch the JSON file with the category content
  fetch("categories.json")
    .then((response) => response.json())
    .then((data) => {
      categoriesData = data;
    })
    .catch((error) => {
      console.error("Error loading categories data:", error);
    });

  interestBubbles.forEach((bubble) => {
    bubble.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.getAttribute("data-category");
      loadCategoryContent(category);
    });
  });

  function loadCategoryContent(category) {
    // Check if we have content for the category in our JSON data
    if (categoriesData[category]) {
      const { title, content } = categoriesData[category];
      contentArea.innerHTML = `<h2 class="text-2xl font-semibold mb-4">${title}</h2>${content}`;
    } else {
      contentArea.innerHTML = `<p class="text-center text-gray-500">Content for ${category} coming soon!</p>`;
    }
  }
});
