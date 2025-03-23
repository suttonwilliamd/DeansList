document.addEventListener("DOMContentLoaded", function () {
  const interestBubbles = document.querySelectorAll(".interest-bubble");
  let categoriesData = {};

  // Fetch the JSON file with category content
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
      const wrapper = this.parentElement;

      // If content is already inserted, remove it (collapse)
      if (wrapper.querySelector(".category-content-inline")) {
        wrapper.querySelector(".category-content-inline").remove();
      } else {
        // Create a new content container
        let contentDiv = document.createElement("div");
        contentDiv.className =
          "category-content-inline mt-4 p-4 bg-white rounded shadow border-t border-gray-200";

        // Load category content from JSON data
        if (categoriesData[category]) {
          const { title, content } = categoriesData[category];
          contentDiv.innerHTML = `<h2 class="text-2xl font-semibold mb-4">${title}</h2>${content}`;
        } else {
          contentDiv.innerHTML =
            `<p class="text-center text-gray-500">Content for ${category} coming soon!</p>`;
        }
        // Insert the content div after the bubble
        wrapper.appendChild(contentDiv);
      }
    });
  });
});
