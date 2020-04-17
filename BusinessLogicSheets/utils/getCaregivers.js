export default {
    getCaregiversAfterDate: async function getCaregiversAfterDate(caregivers, date){
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
    },

    getCaregiversBetweenID: function getCaregiversBetweenID(caregivers, id1, id2){
        let return_caregivers = {}
        
        for(let caregiverIndex in caregivers)
        {
            let caregiver = caregivers[caregiverIndex]
            let id = parseInt(caregiver['Old #'])
            
            if(id >= id1 && id <= id2)
            {
                return_caregivers[caregiver['Old #']] = caregiver;
            }
        }
        return return_caregivers

    },

    getCaregiversDict: function getCaregiversDict(caregivers){
        let return_caregivers = {}
        
        for(let caregiverIndex in caregivers)
        {
            let caregiver = caregivers[caregiverIndex]
            return_caregivers[caregiver['Old #']] = caregiver;
        }
        return return_caregivers

    }

    
}

/* 
function getElementByXpath(document, path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

getElementByXpath(window.frames[0].document,'/html/body/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]')
*/