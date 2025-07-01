export default async function convertSheetDatatoDict(data, columns) {
  for (let index = 0; index <= data[0].length; index++) {
    let columnName = data[0][index];

    if (columns[columnName] == -1) columns[columnName] = index;
  }

  let return_list = [];

  for (let rowIndex in data) {
    let row = data[rowIndex];

    let dict = {};
    Object.entries(columns).forEach(([key, value]) => {
      dict[key] = `${row[value]}`;
    });
    return_list.push(dict);
  }
  return return_list;
}
