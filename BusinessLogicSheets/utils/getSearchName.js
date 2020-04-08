export default function getSearchName(caregiver){
    let searchName = caregiver['Old #'] + ' , ' + caregiver['Chi Name'] + ' ' + caregiver['Eng Name']
    if(caregiver['EC Rank'] == caregiver['Actual Rank'])
        searchName += ' ' + '(' + caregiver['EC Rank'] + ')';
    else{
        searchName +=' ' + caregiver['EC Rank'] + '(' + caregiver['Actual Rank'] + ')';
    }

    return searchName
}