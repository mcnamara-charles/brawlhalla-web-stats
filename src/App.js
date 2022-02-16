import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';
import awsExports from "./aws-exports";
import Amplify from "aws-amplify";
import { motion } from 'framer-motion';
import ProjectsAPI from './components/ProjectsAPI.js';


Amplify.configure(awsExports);
const projectsAPI = new ProjectsAPI();





function App() {

  const [data, setData] = React.useState({})

  React.useEffect(() => {
    async function fetchData() {
      //Checks for Data in Local Storage
      const d = JSON.parse(window.localStorage.getItem("brawlhalla-site-data"));

      if(d) {
        const timePassed = ((new Date().getTime() - d.time)/1000/60)
        console.log("Minutes Passed = " + timePassed)
        if(((new Date().getTime() - new Date(d.time).getTime())/1000/60) > 10000) {
          let bdata = await projectsAPI.GetBrawlhallaData();
          console.log(typeof(bdata.time));
          window.localStorage.setItem("brawlhalla-site-data", JSON.stringify({
              "time": parseFloat(bdata.time),
              "data": JSON.parse(bdata.data)
            })
          )
        } else {

        }
      } else {
        let bdata = await projectsAPI.GetBrawlhallaData();
        window.localStorage.setItem("brawlhalla-site-data", JSON.stringify({
            "time": parseFloat(bdata.time),
            "data": JSON.parse(bdata.data)
          })
        )
      }
    }

    fetchData()
},[])

//const { height, width } = useWindowDimensions();

  return (
    <div
      data-theme="dark"
      className="App"
    >
      <Router>
          <AppWithRouterAccess />
      </Router>
    </div>
  );
}

export default App;
