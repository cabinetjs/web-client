import React from "react";
import _ from "lodash";
import { loadVideoTime, saveVideoTime } from "@utils/media";

export interface SubscribeVideoOptions {
    syncTime?: boolean;
}

export interface VideoContextValues {
    subscribeVideo(dom: HTMLVideoElement, options?: SubscribeVideoOptions): void;
    unsubscribeVideo(dom: HTMLVideoElement): void;
    addVolume(delta: number): void;
}

export const VideoReactContext = React.createContext<VideoContextValues | null>(null);

export function useVideo() {
    const context = React.useContext(VideoReactContext);
    if (!context) {
        throw new Error("useVideo must be used within a VideoContext");
    }

    return context;
}

const INITIAL_VOLUME = (() => {
    if (typeof window === "undefined") {
        return 1;
    }

    const value = localStorage.getItem("volume");
    if (value) {
        return parseFloat(value);
    }

    return 1;
})();

export function VideoContext({ children }: { children: React.ReactNode }) {
    const volume = React.useRef(INITIAL_VOLUME);
    const [volumeSubscribers, setVolumeSubscribers] = React.useState<HTMLVideoElement[]>([]);
    const saveVolume = React.useMemo(() => {
        return _.debounce((value: number) => {
            localStorage.setItem("volume", value.toString());
        }, 250);
    }, []);

    const handleTimeUpdate = React.useCallback((e: Event) => {
        const dom = e.target;
        if (!(dom instanceof HTMLVideoElement)) {
            return;
        }

        saveVideoTime(dom);
    }, []);

    const subscribeVideo = React.useCallback(
        (dom: HTMLVideoElement, options: SubscribeVideoOptions = {}) => {
            const { syncTime = false } = options;
            if (syncTime) {
                loadVideoTime(dom);
                dom.addEventListener("timeupdate", handleTimeUpdate);
            }

            dom.volume = volume.current;
            setVolumeSubscribers(prev => [...prev, dom]);
        },
        [handleTimeUpdate],
    );
    const unsubscribeVideo = React.useCallback(
        (dom: HTMLVideoElement) => {
            dom.removeEventListener("timeupdate", handleTimeUpdate);
            setVolumeSubscribers(prev => prev.filter(v => v !== dom));
        },
        [handleTimeUpdate],
    );

    const setVolume = React.useCallback(
        (value: number) => {
            volume.current = value;
            volumeSubscribers.forEach(v => (v.volume = value));
            saveVolume(value);
        },
        [volumeSubscribers, saveVolume],
    );
    const addVolume = React.useCallback(
        (delta: number) => {
            const value = Math.min(Math.max(volume.current + delta, 0), 1);
            setVolume(value);
        },
        [setVolume],
    );

    return (
        <VideoReactContext.Provider value={{ subscribeVideo, unsubscribeVideo, addVolume }}>
            {children}
        </VideoReactContext.Provider>
    );
}
