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
