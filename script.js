document.addEventListener('DOMContentLoaded', function() {
  const interestBubbles = document.querySelectorAll('.interest-bubble');
  const contentArea = document.getElementById('content-area');

  interestBubbles.forEach(bubble => {
    bubble.addEventListener('click', function(e) {
      e.preventDefault();
      const category = this.getAttribute('data-category');
      loadCategoryContent(category);
    });
  });

  function loadCategoryContent(category) {
    let content = '';
    switch (category) {
      case 'Opinion Pieces':
        content = `<h2 class="text-2xl font-semibold mb-4">Opinion Pieces</h2>
                   <ul class="list-disc pl-5 space-y-2">
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/c/Hbomberguy" target="_blank">Hbomberguy</a> - In-depth video essays critiquing media and culture.</li>
                   </ul>`;
        break;
      case 'Software':
        content = `<h2 class="text-2xl font-semibold mb-4">Software</h2>
                   <ul class="list-disc pl-5 space-y-2">
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/c/t3dotgg" target="_blank">t3dotgg Theo</a> - Insights on web development and the T3 stack.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/c/ThePrimeagen" target="_blank">ThePrimeagen</a> - Programming tutorials focusing on Vim and TypeScript.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/c/FunFunFunction" target="_blank">Funfunfunction MPJ</a> - Engaging JavaScript and functional programming content.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/c/Methmethmethod" target="_blank">Methmethmethod</a> - JavaScript and web development tutorials.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/c/TheCodingTrain" target="_blank">TheCodingTrain Daniel Shiffman</a> - Creative coding tutorials with p5.js.</li>
                   </ul>`;
        break;
      case "Dr. Petter's Software":
        content = `<h2 class="text-2xl font-semibold mb-4">Dr. Petter's Software</h2>
                   <p class="mb-4">Dr. Petter is known for creating tools that enhance game development and sound design. Here are some of his notable contributions:</p>
                   <ul class="list-disc pl-5 space-y-2">
                     <li><a class="text-blue-500 hover:underline" href="https://drpetter.se/project/musagi/" target="_blank">Musagi</a> - Music composition tool for chiptune music.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://drpetter.se/project/sfxr/" target="_blank">SFXR</a> - Retro-style sound effects generator.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://drpetter.se/project/sfxtreme/" target="_blank">SFXTreme</a> - Advanced version with more features.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://drpetter.se/project/sculptris/" target="_blank">Sculptris</a> - Digital sculpting tool for 3D models.</li>
                   </ul>`;
        break;
      case 'Crypto':
        content = `<h2 class="text-2xl font-semibold mb-4">Crypto</h2>
                   <ul class="list-disc pl-5 space-y-2">
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/results?search_query=What+is+Bitcoin" target="_blank">What is Bitcoin?</a> - Overview of Bitcoin.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/results?search_query=What+is+Ethereum" target="_blank">What is Ethereum?</a> - Intro to Ethereum and smart contracts.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/results?search_query=SHIB" target="_blank">SHIB</a> - Info about the Shiba Inu cryptocurrency.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/results?search_query=Vitalik+Buterin" target="_blank">Vitalik Buterin</a> - Insights from the co-founder of Ethereum.</li>
                   </ul>`;
        break;
      case 'Programming':
        content = `<h2 class="text-2xl font-semibold mb-4">Programming</h2>
                   <ul class="list-disc pl-5 space-y-2">
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/c/ChiliTomatoNoodle" target="_blank">ChiliTomatoNoodle</a> - Programming tutorials and insights.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/c/ThinMatrix" target="_blank">ThinMatrix</a> - Game development tutorials using Java.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/c/DerekBanas" target="_blank">DerekBanas</a> - Comprehensive programming tutorials.</li>
                   </ul>`;
        break;
      case 'Game Dev':
        content = `<h2 class="text-2xl font-semibold mb-4">Game Dev</h2>
                   <ul class="list-disc pl-5 space-y-2">
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/results?search_query=Foundation+Game+Design+with+HTML5+and+JavaScript+Rex+van_der_Spuy" target="_blank">Foundation Game Design with HTML5 and JavaScript</a> - Course by Rex van der Spuy.</li>
                   </ul>`;
        break;
      case 'Topics':
        content = `<h2 class="text-2xl font-semibold mb-4">Topics</h2>
                   <ul class="list-disc pl-5 space-y-2">
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/results?search_query=Creepypasta" target="_blank">Creepypasta</a> - Explore creepypasta stories.</li>
                     <li><a class="text-blue-500 hover:underline" href="https://www.youtube.com/results?search_query=True+Crime" target="_blank">True Crime</a> - Delve into true crime documentaries.</li>
                   </ul>`;
        break;
      default:
        content = `<p>Content for ${category} coming soon!</p>`;
    }
    contentArea.innerHTML = content;
  }
});
