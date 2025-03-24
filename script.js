document.addEventListener("DOMContentLoaded", function () {
  let categoriesData = {};

  // Fetch the JSON file first
  fetch("categories.json")
    .then((response) => response.json())
    .then((data) => {
      categoriesData = data;
      setupCategoryHandlers();
    })
    .catch((error) => {
      console.error("Error loading categories data:", error);
    });

  function setupCategoryHandlers() {
    const categoryContainers = document.querySelectorAll(".category-container");

    categoryContainers.forEach((container) => {
      const bubble = container.querySelector(".interest-bubble");
      const inlineContent = container.querySelector(".category-inline-content");

      bubble.addEventListener("click", function (e) {
        e.preventDefault();
        const category = bubble.getAttribute("data-category");

        const isHidden = inlineContent.classList.contains("hidden");

        // Load content if needed
        if (inlineContent.innerHTML.trim() === "") {
          if (categoriesData[category]) {
            const { description, links } = categoriesData[category];
            const linksHTML = links
              .map(
                (link) =>
                  `<li class="mb-2"><a class="text-blue-600 hover:text-blue-800 transition-colors flex items-center" href="${link.url}" target="_blank"><i class="fas fa-external-link-alt mr-1 text-sm"></i>${link.name}</a></li>`
              )
              .join("");
            inlineContent.innerHTML = `
              <h3 class="font-semibold mb-2">${category}</h3>
              <p class="mb-4 text-gray-700">${description}</p>
              <ul class="space-y-2">${linksHTML}</ul>
            `;
          } else {
            inlineContent.innerHTML = `<p class="text-gray-500">Content for ${category} coming soon!</p>`;
          }
        }

        // Toggle visibility
        if (isHidden) {
          inlineContent.classList.remove("hidden");
          setTimeout(() => {
            inlineContent.classList.add("active"); // Trigger the fade-in
          }, 10);
        } else {
          inlineContent.classList.remove("active");
          setTimeout(() => {
            inlineContent.classList.add("hidden");
          }, 300);
        }
      });
    });
  }
});
