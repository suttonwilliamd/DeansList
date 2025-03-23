document.addEventListener("DOMContentLoaded", function () {
  const categoryContainers = document.querySelectorAll(".category-container");
  let categoriesData = {};

  // Load the JSON file with category content
  fetch("categories.json")
    .then((response) => response.json())
    .then((data) => {
      categoriesData = data;
    })
    .catch((error) => {
      console.error("Error loading categories data:", error);
    });

  // For each category container, add a click event on its bubble
  categoryContainers.forEach((container) => {
    const bubble = container.querySelector(".interest-bubble");
    const inlineContent = container.querySelector(".category-inline-content");

    bubble.addEventListener("click", function (e) {
      e.preventDefault();
      const category = bubble.getAttribute("data-category");

      // If content is not loaded, load it from the JSON data
      if (inlineContent.innerHTML.trim() === "") {
        if (categoriesData[category]) {
          const { title, content } = categoriesData[category];
          inlineContent.innerHTML = `<h2 class="text-2xl font-semibold mb-4">${title}</h2>${content}`;
        } else {
          inlineContent.innerHTML = `<p class="text-center text-gray-500">Content for ${category} coming soon!</p>`;
        }
      }

      // Toggle the inline content's visibility
      inlineContent.classList.toggle("hidden");
    });
  });
});
