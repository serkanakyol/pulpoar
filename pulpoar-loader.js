(function () {
  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/@pulpoar/plugin-sdk@latest/dist/index.iife.js";
  script.onload = function () {
    console.log("PulpoAR SDK yüklendi");

    document.addEventListener('DOMContentLoaded', () => {
      pulpoar.onReady(() => {
        console.log("PulpoAR hazır");

        const container = document.createElement('div');
        container.style = "width: 480px; height: 640px; margin: 30px auto; position: relative; border: 1px solid #ccc; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);";

        const iframe = document.createElement('iframe');
        iframe.src = "https://plugin.pulpoar.com/vto/trendyol-makeup-vto-demo?custom=true";
        iframe.allow = "camera *";
        iframe.style = "width:100%; height:100%; border:none;";
        container.appendChild(iframe);

        const button = document.createElement('button');
        button.textContent = 'Kamerayı Aç';
        button.style = "position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;";
        button.onclick = () => pulpoar.initCamera({ facingMode: 'user' });
        container.appendChild(button);

        document.body.appendChild(container);
      });
    });
  };
  document.head.appendChild(script);
})();
