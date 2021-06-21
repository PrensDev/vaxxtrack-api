const db = require("../../models");
const { errResponse } = require("../../helpers/controller.helper");


// Get Cases
exports.getCasesStatus = (req, res) => {

    // Get frequency of current_health_status values 
    db.Case_Information
        .count({
            col: 'current_health_status',
            group: ['current_health_status']
        })
        .then((result) => {

            // Case Status Data Object
            caseStatusData = {
                all: 0,
                active: {
                    all: 0,
                    asymptomatic: 0,
                    mild: 0,
                    severe: 0,
                    critical: 0
                },
                recovered: 0,
                died: 0
            }

            // Get each element in result
            result.forEach(el => {

                // Get total cases count
                caseStatusData.all += el.count;
                
                // Get asymptomatic cases count
                if(el.current_health_status === 'Asymptomatic') {
                    caseStatusData.active.all += el.count;
                    caseStatusData.active.asymptomatic = el.count;
                }
                
                // Get mild cases count
                if(el.current_health_status === 'Mild') {
                    caseStatusData.active.all += el.count;
                    caseStatusData.active.mild = el.count;
                }
                
                // Get severe cases count
                if(el.current_health_status === 'Severe') {
                    caseStatusData.active.all += el.count;
                    caseStatusData.active.severe = el.count;
                }

                // Get critical cases count
                if(el.current_health_status === 'Critical') {
                    caseStatusData.active.all += el.count;
                    caseStatusData.active.critical = el.count;
                }

                // Get recovered cases count
                if(el.current_health_status === 'Recovered') {
                    caseStatusData.recovered = el.count;
                }

                // Get died cases count
                if(el.current_health_status === 'Died') {
                    caseStatusData.died = el.count;
                }
            });
            
            // Respond caseStatusData object
            res.send({ cases_status_data: caseStatusData });
        })
        .catch((err) => errResponse(res, err))
}