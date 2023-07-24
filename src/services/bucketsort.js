/**
 * Groups all objects contained in the array by key and returns a 
 * map in the from of {[key]: [object,...],...}. The objects 
 * contained in the array must have the key as property specified.
 * @param {Object[]} array - An array of objects.
 * @param {string} key - The key to group the objects contained in the array.
 * @returns {Object} A map where the objects are grouped by key.
 */
export const bucketsort = (array, key) => {
    const bucket = {};
    
    for(let item of array) {
        if(!item[key]) {
            continue;
        }
    
        if(!bucket[item[key]]) {
            bucket[item[key]] = [];
        }
      
        bucket[item[key]].push(item);
    }

    return bucket;
};