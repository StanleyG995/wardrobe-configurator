'use client';
import { useState, useMemo } from "react"
import { WardrobeData, SegmentData, WardrobeDimensions } from '../types/WardrobeProps'

export const useWardrobe = () => {
    // 1. W stanie trzymamy czyste wymiary szafy
    const [wardrobe, setWardrobe] = useState<WardrobeDimensions>({
        width: 1000,
        height: 2000,
        depth: 600,
        boardThickness: 18,
        backBoardThickness: 5,
    })

    // 2. Trzymamy też mapę/słownik konfiguracji wnęk (indeks -> wyposażenie).
    // Dzięki temu, jeśli szafa się skurczy, a potem znowu rozszerzy, 
    // użytkownik nie straci tego, co wcześniej ustawił w drugiej wnęce!
    const [compartmentsConfig, setCompartmentsConfig] = useState<Record<number, Omit<SegmentData, 'id'>>>({
        0: { type: 'shelves', shelves: [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()] },
        1: { type: 'hanger', shelves: [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()] },
        2: { type: 'empty', shelves: [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()] },
    })

    const handleUpdate = (name: string, value: number) => {
        setWardrobe(prev => ({ ...prev, [name]: value }))
    }

    // 3. Obliczamy liczbę wnęk czysto matematycznie w locie
    const targetSegmentCount = wardrobe.width < 1200 ? 1 : (wardrobe.width < 1800 ? 2 : 3);

    // 4. HIT: Zamiast useEffect, budujemy tablicę segmentów w useMemo!
    // React uwielbia to podejście, bo nie wywołuje ono "cascading renders"
    const segments = useMemo<SegmentData[]>(() => {
        return Array.from({ length: targetSegmentCount }).map((_, index) => {
            const config = compartmentsConfig[index] || { type: 'shelves', shelves: [] };
            return {
                id: `segment-${index}`, // Stałe, przewidywalne ID oparte na indeksie
                ...config
            };
        });
    }, [targetSegmentCount, compartmentsConfig]);

    // 5. Zarządzanie wyposażeniem (aktualizujemy compartmentsConfig)
    const addShelfToSegment = (segmentIndex: number) => {
        const currentSegment = compartmentsConfig[segmentIndex];
        if (!currentSegment || currentSegment.type !== 'shelves') return;

        const minShelfGap = 450;
        const usableHeight =
            wardrobe.height -
            2 * wardrobe.boardThickness -
            currentSegment.shelves.length * wardrobe.boardThickness;
        const potentialGap =
            (usableHeight - wardrobe.boardThickness) / (currentSegment.shelves.length + 1);

        if (potentialGap > minShelfGap) {
            setCompartmentsConfig(prev => ({
                ...prev,
                [segmentIndex]: {
                    ...prev[segmentIndex],
                    shelves: [...prev[segmentIndex].shelves, crypto.randomUUID()]
                }
            }));
        }
    };

    const removeShelfFromSegment = (segmentIndex: number) => {
        setCompartmentsConfig(prev => {
            const current = prev[segmentIndex];
            if (!current) return prev;
            return {
                ...prev,
                [segmentIndex]: {
                    ...current,
                    shelves: current.shelves.slice(0, -1)
                }
            };
        });
    };

    const changeSegmentType = (segmentIndex: number, newType: 'shelves' | 'hanger' | 'empty') => {
        setCompartmentsConfig(prev => ({
            ...prev,
            [segmentIndex]: {
                type: newType,
                shelves: [] // reset przy zmianie typu
            }
        }));
    };

    // Scalamy dane w jeden obiekt pasujący do Twojego typu WardrobeData przed zwróceniem
    const fullWardrobeData: WardrobeData = {
        ...wardrobe,
        segments
    };

    return { 
        wardrobe: fullWardrobeData, 
        handleUpdate, 
        addShelfToSegment, 
        removeShelfFromSegment, 
        changeSegmentType 
    }
}