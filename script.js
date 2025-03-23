document.addEventListener("DOMContentLoaded", function () {
  const categoryContainers = document.querySelectorAll(".category-container");
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

  // Add click event to each category bubble
  categoryContainers.forEach((container) => {
    const bubble = container.querySelector(".interest-bubble");
    const inlineContent = container.querySelector(".category-inline-content");

    bubble.addEventListener("click", function (e) {
      e.preventDefault();
      const category = bubble.getAttribute("data-category");

      // If content is not loaded, load it from the JSON data
      if (inlineContent.innerHTML.trim() === "") {
        if (categoriesData[category]) {
          const { description, links } = categoriesData[category];
          const linksHTML = links
            .map(
              (link) =>
                `<li><a class="text-blue-500 hover:underline" href="${link.url}" target="_blank">${link.name}</a></li>`
            )
            .join("");
          inlineContent.innerHTML = `<p class="mb-4">${description}</p><ul class="list-disc pl-5 space-y-2">${linksHTML}</ul>`;
        } else {
          inlineContent.innerHTML = `<p class="text-center text-gray-500">Content for ${category} coming soon!</p>`;
        }
      }

      // Toggle the inline content's visibility
      inlineContent.classList.toggle("hidden");
    });
  });
});
