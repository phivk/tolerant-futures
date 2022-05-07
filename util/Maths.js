export const remapRange = (value, oldMin, oldMax, newMin, newMax) => { 
    return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}