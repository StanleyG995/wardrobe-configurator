🛠️ CHECKLISTA: REFAKTOR SZAFY (ZUSTAND + NOWE FUNKCJE)
📁 ETAP 1: Przygotowanie i Globalny Stan
[ ] 1.1. Bezpieczna gałąź: Stwórz nowy branch w Git: git checkout -b feature/wardrobe-upgrade.

[ ] 1.2. Instalacja paczek: Uruchom w terminalu: npm install zustand zundo.

[ ] 1.3. Plik typów: Stwórz/wydziel plik types.ts z czystym interfejsem konfiguracji szafy (width, height, depth, material, handleType).

[ ] 1.4. Definicja Store: Stwórz plik useWardrobeStore.ts z bazowymi wartościami i uniwersalną akcją setConfig. Owiń sklep w middleware temporal.

[ ]  Verification: Projekt kompiluje się bez błędów (npm run build).

[ ] 💾 GIT COMMIT: feat: setup zustand store with zundo middleware

🎛️ ETAP 2: Odcinanie starego stanu (Refaktoryzacja)
[ ] 2.1. Panel Sterowania: Przepnij suwaki w panelu bocznym tak, aby wywoływały akcję setConfig ze sklepu Zustand zamiast lokalnych funkcji Reacta.

[ ] 2.2. Komponenty 3D (Gabaryty): Wejdź do głównych komponentów ścian/korpusu. Usuń z nich stare propsy wymiarów, a wartości width, height, depth wyciągnij bezpośrednio ze sklepu Zustand.

[ ] 2.3. Komponenty Wnętrza (Półki/Wnęki): Usuń prop drilling z elementów wewnętrznych szafy. Niech obliczają swoje pozycje na bazie wymiarów branych prosto z Zustand.

[ ] 2.4. Sprzątanie Góry: Usuń stary, główny useState oraz zbędne funkcje przekazujące stan z najwyższego komponentu (np. App.tsx lub page.tsx).

[ ]  Verification: Szafa reaguje na suwaki dokładnie tak samo jak przed refaktorem, w konsoli czysto, brak błędów TS.

[ ] 💾 GIT COMMIT: refactor: eliminate prop drilling and migrate 3d scene to zustand

⏪ ETAP 3: Wdrożenie Funkcji Undo / Redo
[ ] 3.1. Przyciski w UI: Dodaj do panelu bocznego dwa estetyczne przyciski (Cofnij / Ponów) używając komponentów z Twojej biblioteki UI (np. shadcn).

[ ] 3.2. Podpięcie Logiki: Wyciągnij ze sklepu metody .undo() oraz .redo() z paczki zundo i przypisz je do zdarzeń onClick przycisków.

[ ] 3.3. Blokada przycisków (Disabled): Wykorzystaj tablice stanu przeszłości (pastStates) i przyszłości (futureStates) z zundo, aby przycisk "Cofnij" był zablokowany, gdy nie ma już czego cofać.

[ ]  Verification: Przesuń suwak, kliknij "Cofnij" – szafa płynnie wraca do poprzedniego wymiaru.

[ ] 💾 GIT COMMIT: feat: add complete undo and redo functionality using zundo

🎨 ETAP 4: Nowe Funkcje (Materiały i Uchwyty)
[ ] 4.1. Preload Tekstur: W komponencie odpowiedzialnym za tekstury płyt użyj useTexture.preload ze @react-three/drei, aby załadować 3 alternatywne dekory (np. dąb, biel, antracyt) podczas ładowania aplikacji.

[ ] 4.2. Selektor Materiału: Dodaj do panelu bocznego przełącznik materiałów (np. Tabs lub Select) zmieniający stan material w Zustand. Aktualizuj komponenty płyt, by dynamicznie podmieniały mapę tekstury.

[ ] 4.3. Komponent Uchwytu: Stwórz elastyczny komponent <Handle/>, który przyjmuje typ uchwytu i renderuje odpowiednią geometrię (gałka, podłużny lub brak).

[ ] 4.4. Pozycjonowanie Uchwytów: Podepnij komponenty uchwytów do drzwi szafy, dbając o to, by automatycznie obliczały swoją pozycję X, Y, Z względem zmieniających się wymiarów skrzydeł drzwiowych.

[ ]  Verification: Zmiana materiału działa natychmiastowo na całej szafie. Zmiana uchwytu podmienia model 3D na drzwiach. Undo/Redo obsługuje również te zmiany.

[ ] 💾 GIT COMMIT: feat: add material texture swapping and dynamic handle customizer

🏁 ETAP 5: Zamknięcie Projektu (Portfolio Ready)
[ ] 5.1. Produkcyjny Build: Uruchom lokalnie npm run build, aby upewnić się, że linter i TS nie wywalają żadnych ostrzeżeń przed wdrożeniem na produkcję.

[ ] 5.2. Merge do Main: Zмерguj gałąź do głównego brancha: git checkout main -> git merge feature/wardrobe-upgrade. Pchnij zmiany na GitHub, aby Vercel odpalił automatyczny deployment.

[ ] 5.3. Aktualizacja README: Dopisz do pliku README.md sekcję opisującą architekturę zarządzania stanem (Zustand + Zundo) oraz optymalizację pamięci GPU (preload tekstur).

[ ]  Verification: Sprawdź link z Vercela na telefonie i komputerze. Działa? Działa.

Kopiuj, wklejaj do projektu i widzimy się przy omawianiu kodu do Kroku 1.3 i 1.4!