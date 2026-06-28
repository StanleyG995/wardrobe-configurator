'use client';
import { useState, useMemo } from "react"
import { WardrobeData, SegmentData, WardrobeDimensions } from '../types/WardrobeProps'
import { ViewportOptionsProps } from '@/types/RenderProps'
import { calculateWardrobePrice } from '@/helpers/price'


const DEFAULT_SEGMENT_CONFIG: Omit<SegmentData, 'id'> = {
    type: 'shelves',
    shelves: [],
    doorPosition: 'right'
};

export const useWardrobe = () => {
   
    const [activeSegmentIdx, setActiveSegmentIdx] = useState<number | null>(null)


   


 

    const targetSegmentCount = wardrobe.width < 700 ? 1 : (wardrobe.width < 1400 ? 2 : (wardrobe.width < 2100) ? 3 : (wardrobe.width < 2800) ? 4 : 5) ;

    const segments = useMemo<SegmentData[]>(() => {
        return Array.from({ length: targetSegmentCount }).map((_, index) => {
            const config = compartmentsConfig[index] || { ...DEFAULT_SEGMENT_CONFIG };
            return {
                id: `segment-${index}`,
                ...config
            };
        });
    }, [targetSegmentCount, compartmentsConfig]);


    const addShelfToSegment = (segmentIndex: number) => {
        const currentSegment = compartmentsConfig[segmentIndex] || { ...DEFAULT_SEGMENT_CONFIG };
        if (currentSegment.type !== 'shelves') return;

        const minShelfGap = 450;
        const usableHeight =
            wardrobe.height -
            2 * wardrobe.boardThickness -
            currentSegment.shelves.length * wardrobe.boardThickness;
        const potentialGap =
            (usableHeight - wardrobe.boardThickness) / (currentSegment.shelves.length + 1);

        if (potentialGap > minShelfGap) {
            setCompartmentsConfig(prev => {
                const current = prev[segmentIndex] || { ...DEFAULT_SEGMENT_CONFIG };
                return {
                    ...prev,
                    [segmentIndex]: {
                        ...current,
                        shelves: [...current.shelves, crypto.randomUUID()]
                    }
                };
            });
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
        setCompartmentsConfig(prev => {
            const current = prev[segmentIndex] || { ...DEFAULT_SEGMENT_CONFIG };
            return {
                ...prev,
                [segmentIndex]: {
                    ...current,
                    type: newType,       
                    shelves: [],
                }
            };
        });
    };

    const wardrobePrice = useMemo(() => {
        return calculateWardrobePrice(wardrobe.width, wardrobe.height, wardrobe.depth, segments);
      }, [wardrobe.width, wardrobe.height, wardrobe.depth, segments]);

    const fullWardrobeData: WardrobeData = {
        ...wardrobe,
        segments
    };

    return { 
        wardrobe: fullWardrobeData, 
        handleUpdate, 
        addShelfToSegment, 
        removeShelfFromSegment, 
        changeSegmentType,
        activeSegmentIdx,
        setActiveSegmentIdx,
        wardrobePrice,
        handleViewportToggle,
        handleViewportGenderToggle,
        ViewportOptions,
        handleDoorsToggle,
        handleDoorPositionChange, 
    }
}