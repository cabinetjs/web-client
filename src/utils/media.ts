export function preloadImage(src: string) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img);
        };
        img.onerror = reject;
        img.src = src;
    });
}
export async function preloadVideo(src: string) {
    const res = await fetch(src);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
}

let videoTimeCache: [string, number] | null = null;
export function saveVideoTime(dom: HTMLVideoElement) {
    const { currentTime, currentSrc } = dom;
    if (!currentSrc) {
        return;
    }

    videoTimeCache = [`video:${currentSrc}`, currentTime];
}
export function loadVideoTime(dom: HTMLVideoElement) {
    let src = dom.currentSrc;
    if (!src) {
        const source = dom.querySelector("source");
        if (!source?.src) {
            throw new Error("video source not found");
        }

        src = source.src;
    }

    if (!videoTimeCache || videoTimeCache[0] !== `video:${src}`) {
        return;
    }

    dom.currentTime = videoTimeCache[1];
}
