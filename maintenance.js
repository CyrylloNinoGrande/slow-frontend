// ==========================================
// ZAŚLEPKA SERWISOWA SLoW (Tryb Przerwy Technicznej)
// ==========================================

(function() {
    // 🎛️ MASTER SWITCH: Zmień na true na czas wdrożenia i testów, a potem z powrotem na false!
    const MAINTENANCE_MODE = false; 
    const BYPASS_SECRET_KEY = 'slow2026-sec';

    // 1. Sprawdzenie parametru bypass w URL i zapamiętanie w localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const bypassParam = urlParams.get('bypass');
    if (bypassParam === BYPASS_SECRET_KEY) {
        localStorage.setItem('slow_bypass', 'active');
        console.log("🌿 [SLoW Maintenance] Aktywowano sekretny bypass dla administratora.");
    }

    // 2. Sprawdzenie, czy tryb serwisowy jest aktywny oraz czy użytkownik NIE ma aktywnego bypassu
    const hasBypass = localStorage.getItem('slow_bypass') === 'active';

    if (MAINTENANCE_MODE && !hasBypass) {
        console.log("🌿 [SLoW Maintenance] Aplikacja w trybie przerwy technicznej.");

        function injectMaintenanceOverlay() {
            if (document.getElementById('slow-maintenance-overlay')) return;

            const overlay = document.createElement('div');
            overlay.id = 'slow-maintenance-overlay';
            overlay.className = 'fixed inset-0 bg-[#121212] z-[99999] flex flex-col items-center justify-center p-6 text-center';
            overlay.innerHTML = `
                <div class="max-w-md w-full bg-[#FAF8F5] border border-[#E2DCD0] rounded-3xl p-8 shadow-2xl space-y-5">
                    <div class="w-24 mx-auto flex items-center justify-center">
                        <img src="logo-slow.png" alt="Strefa SLoW" class="w-full h-auto object-contain">
                    </div>
                    <div class="space-y-2">
                        <span class="text-[10px] font-bold uppercase tracking-wider bg-[#FDEBD0] text-[#935116] px-2.5 py-1 rounded-full">Przerwa Techniczna 🌿</span>
                        <h2 class="text-xl font-bold text-[#1C2E24]">Odświeżamy Strefę SLoW</h2>
                        <p class="text-xs text-[#7C8780] leading-relaxed">
                            Trwają planowane prace usprawniające aplikację, aby zapewnić Ci jeszcze lepsze doświadczenia. Wracamy za chwilę!
                        </p>
                    </div>
                    <div class="bg-[#FDF6E2] border border-[#EADCA8] rounded-2xl p-3 text-[11px] text-[#935116] font-medium">
                        🧘‍♀️ Dziękujemy za cierpliwość i wyrozumiałość.
                    </div>
                    <div class="pt-2 text-[10px] text-[#A5B3C2]">
                        Fundacja SLoW • ul. Młyńska 34a, Kórnik
                    </div>
                </div>
            `;
            
            if (document.body) {
                document.body.innerHTML = ''; // Bezpieczne wyczyszczenie widoku aplikacji
                document.body.appendChild(overlay);
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    document.body.innerHTML = '';
                    document.body.appendChild(overlay);
                });
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectMaintenanceOverlay);
        } else {
            injectMaintenanceOverlay();
        }
    }
})();