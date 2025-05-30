(function () {
  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/@pulpoar/plugin-sdk@latest/dist/index.iife.js";
  script.onload = function () {
    console.log("PulpoAR SDK yklendi");

    pulpoar.onReady(() => {
      console.log("PulpoAR hazr");

      const btn = document.createElement('button');
      btn.textContent = 'Try it now';
      btn.style = 'position:fixed; bottom:20px; right:20px; z-index:9999; padding:10px;';
      btn.onclick = () => pulpoar.doSomething();
      document.body.appendChild(btn);
    });

    pulpoar.onSomethingChange((payload) => {
      console.log("Payload deiti:", payload);
    });
  };
  document.head.appendChild(script);
})();
