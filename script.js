document.addEventListener("DOMContentLoaded", function () {
  let allChannels = [];

  // Fetch channels data from channels.json
  fetch("channels.json")
    .then((response) => response.json())
    .then((data) => {
      allChannels = data;
      displayChannels(allChannels);
    })
    .catch((error) => console.error("Error loading channels data:", error));

  // Render the list of channels in the #channels element
  function displayChannels(channels) {
    const container = document.getElementById("channels");
    if (channels.length === 0) {
      container.innerHTML = `<p class="text-center text-gray-500">No channels match the selected tags.</p>`;
      return;
    }
    container.innerHTML = channels
      .map(
        (channel) => `
      <div class="border p-4 rounded shadow bg-white">
        <h3 class="text-lg font-bold mb-2">${channel.name}</h3>
        <p class="mb-2">${channel.description}</p>
        <a class="text-blue-600 hover:underline" href="${channel.url}" target="_blank">
          Visit Channel
        </a>
        <div class="mt-2">
          ${channel.tags
            .map(
              (tag) =>
                `<span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 mr-1 rounded">
                  ${tag}
                </span>`
            )
            .join("")}
        </div>
      </div>
    `
      )
      .join("");
  }

  // Tag filtering logic
  const tagButtons = document.querySelectorAll(".tag-btn");
  tagButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle active state for the tag button
      button.classList.toggle("active");
      if (button.classList.contains("active")) {
        button.classList.remove("bg-blue-500");
        button.classList.add("bg-blue-700");
      } else {
        button.classList.remove("bg-blue-700");
        button.classList.add("bg-blue-500");
      }

      // Get an array of selected tags (trimmed and lower-cased for robust matching)
      const selectedTags = Array.from(tagButtons)
        .filter((btn) => btn.classList.contains("active"))
        .map((btn) => btn.getAttribute("data-tag").toLowerCase().trim());

      console.log("Selected Tags:", selectedTags);

      // If no tags are selected, display all channels.
      if (selectedTags.length === 0) {
        displayChannels(allChannels);
      } else {
        // For an "OR" filter: show channels that include at least one of the selected tags.
        const filtered = allChannels.filter((channel) =>
          channel.tags.some(
            (tag) => selectedTags.indexOf(tag.toLowerCase().trim()) !== -1
          )
        );
        console.log("Filtered Channels:", filtered);
        displayChannels(filtered);
      }
    });
  });
});
