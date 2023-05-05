const defaultData = {
    "version": .01, // not using, but we can see it in localStorage
    "favoriteIds" : ["p79"]
  },
  storeName = "jlw4958-hw4-data";
  
  const readLocalStorage = () => {
    let allValues = null;
    try{
      allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
    }catch(err){
      console.log(`Problem with JSON.parse() and ${storeName} !`);
      throw err;
    }
    return allValues;
  };
  
  const writeLocalStorage = (allValues) => {
    localStorage.setItem(storeName, JSON.stringify(allValues));
  };
  
  //  PUBLIC
  export const clearLocalStorage = () => writeLocalStorage(defaultData);
  
  export const getFeaturesId = () => readLocalStorage().favoriteIds;
  
  export const setFeaturesId = (favoritesArray) => {
    const allValues = readLocalStorage();
    allValues.favoriteIds = favoritesArray;
    writeLocalStorage(allValues);
  };
  
  export const clearFeaturesId = () => {
    const allValues = readLocalStorage();
    allValues.favoriteIds = [];
    writeLocalStorage(allValues);
  };
  