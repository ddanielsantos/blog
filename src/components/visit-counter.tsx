import { ASTRO_API_URL } from "astro:env/client"
import {useEffect, useState} from "react";
import type {IncrementVisitCounter} from "../pages/api/increment-visit-counter";

type Props = {
    page: string;
}

const incrementVisitCountForPage = async (page: string) => {
    const url = `${ASTRO_API_URL}/increment-visit-counter`;
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ page }),
        headers: {
            "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(5000)
    });

    return (await response.json()) as IncrementVisitCounter;
};

function getFromLocalStorage(page: string): number {
    return Number.parseInt(window.localStorage.getItem(`${page}-visit-count`) || "0", 10);
}

function setToLocalStorage(page: string, count: number) {
    window.localStorage.setItem(`${page}-visit-count`, count.toString());
    window.localStorage.setItem(`${page}-visit-count-timestamp`, new Date().toISOString());
}

function shouldIncrementVisitCount(props: Props) {
    const timestamp = window.localStorage.getItem(`${props.page}-visit-count-timestamp`);
    const sixtySeconds = 60000;

    return !timestamp || (Date.now() - new Date(timestamp).getTime() > sixtySeconds);
}

export const VisitCounter = (props : Props) => {
    const initialCount = getFromLocalStorage(props.page);
    const [count, setCount] = useState(initialCount);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleVisitCounting = async () => {
            if (shouldIncrementVisitCount(props)) {
                const newCount = await incrementVisitCountForPage(props.page);
                setCount(newCount.visitCount);
                setToLocalStorage(props.page, newCount.visitCount);
            }
        }

        handleVisitCounting()
            .catch(console.error)
            .finally(() => setLoading(false));
    },  [props])

    if (loading) {
        return <div>Loading...</div>;
    }

    return <div>
        {count}
    </div>;
};