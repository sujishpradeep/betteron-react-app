/*If input id is present in the Array -> remove it from the Array
  If input trail is NOT present in Array -> Add it to the Array*/
export function addOrRemoveFromArray(arrayIn, inputId) {
  if (arrayIn.includes(inputId)) {
    arrayIn.splice(arrayIn.indexOf(inputId), 1);
  } else {
    arrayIn.push(inputId);
  }
  return arrayIn;
}
