// ==========================================
// GLOBALNY LOADER DANYCH SLoW (Zimny start Rendera)
// ==========================================

(function() {
    console.log("🌿 [SLoW Loader] Skrypt ładujący został pomyślnie załadowany.");

    // 1. Bezpieczne wstrzyknięcie HTML loadera do DOM
    function injectLoaderDOM() {
        if (document.getElementById('slow-global-loader')) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'slow-global-loader';
        wrapper.className = 'fixed inset-0 bg-black/50 backdrop-blur-xs z-[9999] flex flex-col items-center justify-center p-6 hidden';
        wrapper.innerHTML = `
            <div class="bg-[#FAF8F5] border border-[#E2DCD0] rounded-3xl p-6 shadow-2xl flex flex-col items-center space-y-4 max-w-xs w-full text-center">
                <div class="flex space-x-2 items-center justify-center py-2">
                    <div class="w-3 h-3 bg-[#E59866] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div class="w-3 h-3 bg-[#1C2833] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div class="w-3 h-3 bg-[#3A539B] rounded-full animate-bounce"></div>
                </div>
                <div class="space-y-1">
                    <p id="slow-loader-title" class="text-xs font-bold text-[#1C2E24]">Budzimy serwery SLoW...</p>
                    <p id="slow-loader-subtitle" class="text-[11px] text-[#7C8780]">Zbieramy dla Ciebie dane z bazy.</p>
                </div>
            </div>
        `;

        if (document.body) {
            document.body.appendChild(wrapper);
            console.log("🌿 [SLoW Loader] Wstrzyknięto HTML loadera do DOM (body gotowe).");
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                if (!document.getElementById('slow-global-loader') && document.body) {
                    document.body.appendChild(wrapper);
                    console.log("🌿 [SLoW Loader] Wstrzyknięto HTML loadera do DOM po DOMContentLoaded.");
                }
            });
        }
    }

    injectLoaderDOM();

    // 2. Komunikaty rotacyjne
    const slowLoaderMessages = [
        "Budzimy serwery SLoW, chwila cierpliwości...",
        "Zwalniamy tempo, pobieramy Twoje dane...",
        "Porządkujemy harmonogram i sprawdzamy dostępność...",
        "Już prawie na miejscu, dziękujemy za wyrozumiałość 🌿"
    ];

    let slowLoaderTimer = null;
    let slowMessageInterval = null;

    function showSlowLoader() {
        let loader = document.getElementById('slow-global-loader');
        if (!loader) {
            injectLoaderDOM();
            loader = document.getElementById('slow-global-loader');
        }
        if (!loader) return;
        
        console.log("🌿 [SLoW Loader] Wyświetlam loader na ekranie.");
        loader.classList.remove('hidden');

        let msgIndex = 0;
        const subtitleEl = document.getElementById('slow-loader-subtitle');
        if (subtitleEl) subtitleEl.innerText = slowLoaderMessages[0];

        clearInterval(slowMessageInterval);
        slowMessageInterval = setInterval(() => {
            msgIndex = (msgIndex + 1) % slowLoaderMessages.length;
            if (subtitleEl) subtitleEl.innerText = slowLoaderMessages[msgIndex];
        }, 2500);
    }

    function hideSlowLoader() {
        console.log("🌿 [SLoW Loader] Ukrywam loader.");
        clearInterval(slowMessageInterval);
        const loader = document.getElementById('slow-global-loader');
        if (loader) loader.classList.add('hidden');
    }

    // 3. Inteligentne spięcie z globalnym fetch
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
        let urlString = '';
        if (typeof args[0] === 'string') {
            urlString = args[0];
        } else if (args[0] && typeof args[0] === 'object' && typeof args[0].url === 'string') {
            urlString = args[0].url;
        }

        const isBackendApiCall = urlString.includes('/api/') || urlString.includes('onrender.com');

        if (isBackendApiCall) {
            console.log("🌿 [SLoW Loader] Wykryto żądanie API:", urlString);
            clearTimeout(slowLoaderTimer);
            slowLoaderTimer = setTimeout(() => {
                showSlowLoader();
            }, 300);
        }

        try {
            const response = await originalFetch.apply(this, args);
            return response;
        } finally {
            if (isBackendApiCall) {
                clearTimeout(slowLoaderTimer);
                hideSlowLoader();
            }
        }
    };

    // Globalna funkcja do testowania ręcznego w konsoli przeglądarki
    window.testSlowLoader = function() {
        console.log("🌿 [SLoW Loader] Test ręczny wywołany.");
        showSlowLoader();
        setTimeout(hideSlowLoader, 4000);
    };
})();