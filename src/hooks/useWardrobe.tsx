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
    const [wardrobe, setWardrobe] = useState<WardrobeDimensions>({
        width: 1000,
        height: 2000,
        depth: 600,
        boardThickness: 18,
        backBoardThickness: 5,
    })

    const [compartmentsConfig, setCompartmentsConfig] = useState<Record<number, Omit<SegmentData, 'id'>>>({
        0: { type: 'shelves', shelves: [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()], doorPosition: 'left' },
        1: { type: 'hanger', shelves: [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()], doorPosition: 'right' },
    })

    const [ViewportOptions, setViewportOptions] = useState<ViewportOptionsProps>({
        dimensions: false,
        humanScale: false,
        doorsOpen: false,
        doorRotation: [0,0,0],
        floor: true,
        gender: 'female'
    })

    const [activeSegmentIdx, setActiveSegmentIdx] = useState<number | null>(null)


    const handleDoorPositionChange = (segmentIndex: number) => {
        setCompartmentsConfig(prev => {
            const currentSegment = prev[segmentIndex] || { ...DEFAULT_SEGMENT_CONFIG };
            const nextPosition = currentSegment.doorPosition === 'left' ? 'right' : 'left';

            return {
                ...prev,
                [segmentIndex]: {
                    ...currentSegment,
                    doorPosition: nextPosition
                }
            };
        });
    };

    const handleUpdate = (name: string, value: number) => {
        setWardrobe(prev => ({ ...prev, [name]: value }))
    }

    const handleViewportToggle = (name: keyof ViewportOptionsProps) => {
        setViewportOptions(prev => ({
            ...prev,
            [name]: !prev[name]
        }))
    }

    const handleViewportGenderToggle = () => {
        if (ViewportOptions.gender === 'male') {
            setViewportOptions(prev => ({
                ...prev,
                ['gender']: 'female'
            }))
        }
        else {
            setViewportOptions(prev => ({
                ...prev,
                gender: 'male'
            }))
        }
    }

    const handleDoorsToggle = () => {
        if (ViewportOptions.doorsOpen) {
          setViewportOptions(prev => ({
            ...prev, 
            doorRotation: [0, 0, 0],
            doorsOpen: false
          }));
        } else {
          setViewportOptions(prev => ({
            ...prev, 
            doorRotation: [0, -Math.PI / 1.5, 0], 
            doorsOpen: true
          }));
        }
      };

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