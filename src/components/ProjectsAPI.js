import { API } from 'aws-amplify';

function ProjectsAPI() {
    async function getBrawlhallaData() {
        console.log("getBrawlhallaData API call:"); 
        try {
            const apiName = "WorkflowsAPI";
            const path = "/data/";

            const data = await API.get(apiName, path);
            return data;
        } catch(error) {
            console.log("Error getting Data: ", error);
            return null;
        }
    }

    return {
        GetBrawlhallaData: getBrawlhallaData
    }
}

export default ProjectsAPI;