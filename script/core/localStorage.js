const STORAGE_KEY = "ComparadorMercadoStorage";

const DEFAULT_DATA = {
    version: 1,
    theme: "light",
    markets: [],
    shoppingLists: []
};


export function loadAppData() {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
        return structuredClone(DEFAULT_DATA);
    }

    try {
        return JSON.parse(savedData);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);

        return structuredClone(DEFAULT_DATA);
    }
}


export function saveAppData(appData) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appData)
    );
}