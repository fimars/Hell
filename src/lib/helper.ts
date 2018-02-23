import * as scrollIntoView from "scroll-into-view";
import { $ } from "./dom";

export async function fetchFile(url: string) {
    const resp = await fetch(url);
    if (resp.ok) {
        return resp.text();
    } else {
        throwError(resp.statusText);
    }
}

export function jumpTo(id: string): void {
    scrollIntoView($(id), { time: 800 });
}

export function throwError(message: string): Error {
    throw new Error(message);
}

export function sleep(time: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const isTest = process.env.NODE_ENV === "test";
