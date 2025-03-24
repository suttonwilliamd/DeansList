document.addEventListener("DOMContentLoaded", function () {
  let allChannels = [];

  // Fetch channels data from channels.json
  fetch("channels.json")
    .then((response) => response.json())
    .then((data) => {
      allChannels = data;
      displayChannels(allChannels);
    })
    .catch((error) =>
      console.error("Error loading channels data:", error)
    );

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

  // Tag filtering logic (using AND logic)
  const tagButtons = document.querySelectorAll(".tag-btn");
  tagButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle active state for the clicked tag button
      button.classList.toggle("active");
      if (button.classList.contains("active")) {
        button.classList.remove("bg-blue-500");
        button.classList.add("bg-blue-700");
      } else {
        button.classList.remove("bg-blue-700");
        button.classList.add("bg-blue-500");
      }

      // Get an array of selected tags (normalized to lowercase)
      const selectedTags = Array.from(tagButtons)
        .filter((btn) => btn.classList.contains("active"))
        .map((btn) =>
          btn.getAttribute("data-tag").toLowerCase().trim()
        );

      // If no tags are selected, show all channels.
      if (selectedTags.length === 0) {
        displayChannels(allChannels);
      } else {
        // AND filter: Include a channel only if it has every selected tag.
        const filtered = allChannels.filter((channel) => {
          const channelTags = channel.tags.map((tag) =>
            tag.toLowerCase().trim()
          );
          return selectedTags.every((selected) =>
            channelTags.includes(selected)
          );
        });
        displayChannels(filtered);
      }
    });
  });

  // Reset filters button functionality
  const resetButton = document.getElementById("reset-filters");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      // Remove active state from all tag buttons and restore default styling
      tagButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.classList.remove("bg-blue-700");
        btn.classList.add("bg-blue-500");
      });
      // Display all channels
      displayChannels(allChannels);
    });
  }
});
