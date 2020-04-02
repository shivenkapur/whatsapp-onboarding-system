export default async function getCaregiversAfterDate(caregivers, date){
    let return_caregivers = {}
    
    for(let caregiverIndex in caregivers)
    {
        let caregiver = caregivers[caregiverIndex]
        let createdAt = new Date(caregiver['CG 2.0 Create Time'])
        
        if(createdAt > date)
        {
            return_caregivers[caregiver['Old #']] = caregiver;
        }
    }
    return return_caregivers
}