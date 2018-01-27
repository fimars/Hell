import * as scrollIntoView from "scroll-into-view";
import {$} from "./dom";

export async function fetchFile(url) {
    const resp = await fetch(url);
    if (resp.ok) {
        return await resp.text();
    } else {
        throwError(resp.statusText);
    }
}

export function jumpTo(id) {
    scrollIntoView($(id), {
        time: 800
    });
}

export function throwError(message) {
    throw new Error(message);
}

export function sleep(time = 1000) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const isTest = process.env.NODE_ENV === "test";
