'use client';

import type { WardrobeProps } from "../types/WardrobeProps"

// Rozszerzamy tymczasowo interfejs propsów bezpośrednio w komponencie, 
// dopóki nie zaktualizujesz globalnego pliku types/WardrobeProps
interface UpdatedWardrobeProps extends Omit<WardrobeProps, 'onAddShelf' | 'onRemoveShelf'> {
    onAddShelf: (segmentIndex: number) => void;
    onRemoveShelf: (segmentIndex: number) => void;
    onChangeSegmentType: (segmentIndex: number, type: 'shelves' | 'hanger' | 'empty') => void;
}

const Sidebar = ({ 
    onUpdate, 
    onAddShelf, 
    onRemoveShelf, 
    onChangeSegmentType, 
    wardrobe 
}: UpdatedWardrobeProps) => {
    
    return (
        <div className="flex flex-col gap-4">
            {/* WYMIARY GŁÓWNE SZAFY */}
            <div className='pb-2 flex flex-row align-center justify-start gap-4'>
                <label htmlFor='width' className='w-full'>Width: <strong>{wardrobe.width} mm</strong></label>
                <input
                    name='width'
                    id='width'
                    type='range'
                    className="w-full rounded-lg cursor-pointer accent-blue-600"
                    max='1800'
                    min='500'
                    value={wardrobe.width}
                    onChange={e => onUpdate(e.target.name, parseFloat(e.target.value))}
                />
            </div>
            
            <div className='pb-2 flex flex-row align-center justify-start gap-4'>
                <label htmlFor='height' className='w-full'>Height: <strong>{wardrobe.height} mm</strong></label>
                <input
                    name='height'
                    id='height'
                    type='range'
                    className="w-full rounded-lg cursor-pointer accent-blue-600"
                    max='2700'
                    min='1800'
                    value={wardrobe.height}
                    onChange={e => onUpdate(e.target.name, parseFloat(e.target.value))}
                />
            </div>
            
            <div className='pb-3 flex flex-row align-center justify-start gap-4'>
                <label htmlFor='depth' className='w-full'>Depth: <strong>{wardrobe.depth} mm</strong></label>
                <input
                    name='depth'
                    id='depth'
                    type='range'
                    className="w-full rounded-lg cursor-pointer accent-blue-600"
                    max='700'
                    min='450'
                    value={wardrobe.depth}
                    onChange={e => onUpdate(e.target.name, parseFloat(e.target.value))}
                />
            </div>
            
            <div className='pb-6 flex flex-row align-center justify-start gap-4'>
                <label htmlFor='boardThickness'>Thickness:</label>
                <select
                    name='boardThickness'
                    value={wardrobe.boardThickness}
                    onChange={e => onUpdate(e.target.name, parseFloat(e.target.value))}
                    className='border border-gray-300 rounded p-1 w-full text-black bg-white'>
                    <option value={15}>15 mm</option>
                    <option value={18}>18 mm</option>
                    <option value={20}>20 mm</option>
                </select>
            </div>

            <hr className="border-gray-200 my-2" />

            {/* SEKCJA ZARZĄDZANIA SEGMENTAMI WNĘTRZA */}
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Internal Configuration</h3>
                
                {wardrobe.segments?.map((segment, idx) => (
                    <div key={segment.id} className="p-4 border border-gray-200 bg-gray-50 rounded-lg flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-blue-600">Bay {idx + 1}</span>
                            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                                {segment.type === 'shelves' ? `${segment.shelves.length} shelves` : segment.type}
                            </span>
                        </div>

                        {/* Wybór typu modułu dla konkretnego segmentu */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-600 font-medium">Layout Type:</label>
                            <select
                                value={segment.type}
                                onChange={e => onChangeSegmentType(idx, e.target.value as any)}
                                className="border border-gray-300 rounded p-1.5 w-full text-black bg-white text-sm"
                            >
                                <option value="shelves">Shelves</option>
                                <option value="hanger">Hanger Rod</option>
                                <option value="empty">Empty Space</option>
                            </select>
                        </div>

                        {/* Przyciski dodawania/usuwania półek aktywne TYLKO dla typu 'shelves' */}
                        {segment.type === 'shelves' && (
                            <div className='flex flex-row gap-2 mt-1'>
                                <button 
                                    onClick={() => onRemoveShelf(idx)} 
                                    className='w-full bg-[#E04646] hover:bg-red-600 text-white text-xs px-3 py-2 rounded-md cursor-pointer transition-colors'
                                >
                                    - Remove
                                </button>
                                <button 
                                    onClick={() => onAddShelf(idx)} 
                                    className='w-full bg-[#2b7fff] hover:bg-blue-600 text-white text-xs px-3 py-2 rounded-md cursor-pointer transition-colors'
                                >
                                    + Add Shelf
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;