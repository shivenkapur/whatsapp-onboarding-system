//converts a 2D array into an array of dicts
export default async function convertSheetDatatoDict(data, columns, identifier = ""){

    for(let index = 0; index <= data[0].length;index++){
      let columnName = data[0][index]

      if(columns[columnName] == -1)
        columns[columnName] = index;
    }

    let return_list = []

    for(let rowIndex in data){
      let row = data[rowIndex];

      let dict = {}
      Object.entries(columns).forEach(([key, value]) => {
        dict[key] = `${row[value]}`
      });
      if(identifier == "")
        return_list.push(dict);
      else
        return_list(dict[identifier]) = dict;
    }
    return return_list;
}