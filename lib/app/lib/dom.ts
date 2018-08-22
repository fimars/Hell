export function $(elementId: string) {
    return document.getElementById(elementId);
}

export function $$(query: string) {
    return document.querySelectorAll(query);
}
