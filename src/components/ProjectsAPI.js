import Amplify, { API } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);
API.configure(awsconfig);

function ProjectsAPI() {
    // Fetches Databrew Projects
    async function getInference(infdata, endpoint) {
        try {
            const apiName = "InferenceAPI";
            const path = "/GetInference/";

            const data = { 
                body: {
                    "DATA": infdata,
                    "ENDPOINT": endpoint
                } 
            };

            const iresponse = await API.post(apiName, path, data);

            return iresponse
        } catch(error) {
            console.log("Error getting Inference: ", error);
            return null;
        }
    }

    async function getFileInference(bucket, file, type, model) {
        try {
            const apiName = "InferenceAPI";
            const path = "/GetFileInference/";

            const data = { 
                body: {
                    "BUCKET": bucket,
                    "FILE": file,
                    "TYPE": type,
                    "MODEL": model
                } 
            };

            const iresponse = await API.post(apiName, path, data);

            return iresponse
        } catch(error) {
            console.log("Error getting Inference: ", error);
            return null;
        }
    }

    async function checkfileinference(key) {
        try {
            const apiName = "InferenceAPI";
            const path = "/checkfileinference/";

            const data = { 
                body: {
                    "KEY": key
                } 
            };

            const cresponse = await API.post(apiName, path, data);

            return cresponse
        } catch(error) {
            console.log("Error uploading file: ", error);
            return null;
        }
    }


    return {
        getInference: getInference,
        getFileInference: getFileInference,
        checkfileinference: checkfileinference
    }
}

export default ProjectsAPI;