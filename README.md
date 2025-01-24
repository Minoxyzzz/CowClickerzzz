# Cow Milkerzzz

**Cow Milkerzzz** je jednoduchá klikací hra, kde hráč kliká na krávu, aby sbíral mléko a postupně si zlepšoval svou efektivitu nakupováním upgradů.

## Funkčnosti aplikace

- **Klikání na krávu:** Hlavní mechanika hry, kde hráč získává mléko.
- **Nakupování upgradů:** Zvyšte efektivitu sběru mléka pomocí upgradu jako:
  - **Násobíčka:** Zvětšuje hodnotu kliku.
  - **Auto dojička:** Automaticky generuje kliky.
  - **Další kráva:** Zvyšuje hodnotu kliku přidáním kráv.
- **Ukládání a obnovování hry:** Stav hry se ukládá do localStorage, což umožňuje pokračování ve hře po jejím restartu.

## Použité technologie

- **HTML:** Struktura hry (hlavní boxy, tlačítka a klikací kráva).
- **CSS:** Stylizace rozhraní, animace pozadí a efekty klikání.
- **JavaScript:** Logika hry, správa dat a uživatelská interakce.

## Specifikace

### Datový model uložený v localStorage

- `playerName`: Jméno hráče.
- `milk`: Celkové množství mléka (number).
- `clickValue`: Hodnota jednoho kliku (number).
- `multiplierLevel`: Počet zakoupených násobíček (number).
- `autoClickerLevel`: Počet zakoupených auto dojiček (number).
- `newCowLevel`: Počet zakoupených kráv (number).
- `startTime`: Čas, kdy hráč začal hrát (timestamp).

### Klíčové třídy a metody

#### Třída `ClickerGame`

- **Proměnné:**
  - `playerName`, `milk`, `clickValue`, `multiplierLevel`, `autoClickerLevel`, `newCowLevel`, `startTime`.
- **Metody:**
  - `init()`: Inicializace hry (event listenery, časovače).
  - `clickCow()`: Zvýší počet mléka o hodnotu `clickValue`.
  - `buyMultiplier()`: Koupí násobíčku, zvýší cenu a hodnotu kliku.
  - `buyAutoClicker()`: Koupí auto dojičku, která generuje kliky automaticky.
  - `buyNewCow()`: Koupí novou krávu, která zvyšuje hodnotu kliku.
  - `saveGame()`: Uloží stav hry do localStorage.
  - `loadGame()`: Načte stav hry z localStorage.
  - `updateMilkCounter()`: Aktualizuje hodnotu mléka na obrazovce.
  - `updateTimeElapsed()`: Počítá čas od začátku hry.

## Jak hrát

1. Po spuštění aplikace zadejte svůj nickname.
2. Klikáním na krávu sbírejte mléko.
3. Nakupujte upgrady pro zvyšování efektivity.
4. Hru lze opustit a po opětovném spuštění pokračovat od posledního stavu.

## Use Case diagram

1. Hráč se přihlásí zadáním nickname.
2. Hráč kliká na krávu, aby sbíral mléko.
3. Hráč nakupuje upgrady (Násobíčka, Auto dojička, Další kráva).
4. Hra ukládá a obnovuje stav ze storage.

## Příspěvky

Budeme rádi za jakékoli příspěvky! Pokud najdete chybu nebo máte návrh na zlepšení, neváhejte vytvořit issue nebo poslat pull request.

## Zdroje

- [Muted icon](https://www.flaticon.com/free-icon/muted_1082319)
- [PNG Images](https://pngimg.com/)
- [Sound icon](https://www.flaticon.com/free-icon/sound_2794682)
- [Suno Create](https://suno.com/create?wid=default)

---

© 2025 Jakub Ondruška


