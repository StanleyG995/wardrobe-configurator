export interface DoorProps {
                    width: number;
                    depth: number;
                    height: number,
                    boardThickness: number;
                    isOpen: boolean;
                    hingeSide: 'left' | 'right';
                    handleSide: 'left' | 'right';
                    topOffset: number;
                }