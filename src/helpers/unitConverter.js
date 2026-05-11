const M_TO_MM = 1000
const MM_TO_M = 0.001

export const toMeters = (mm) => {
    return mm * MM_TO_M
}

export const toMilimeters = (m) => {
    return m * M_TO_MM
}