import {createContext} from 'react'

export const PlannerContext= createContext()
export const LoginStatus = createContext()

//this count context is solely for useEffect dependancy use, to avoid infinite loop
export const countStatus=createContext()
//https://stackoverflow.com/questions/72097709/react-useeffect-keeps-fetching-even-after-stating-my-dependency
//https://dmitripavlutin.com/react-useeffect-infinite-loop/#:~:text=The%20infinite%20loop%20is%20fixed,callback%2C%20dependencies)%20dependencies%20argument.&text=Adding%20%5Bvalue%5D%20as%20a%20dependency,so%20solves%20the%20infinite%20loop.


// export default function newPlannerDataUpdated(props){
//     const [plannerData,setNewPlannerData]=useState()

//     return(
//         <PlannerDataUpdated.Provider value={[PlannerData,setNewPlannerData]}>
//             {props.children}
//         </PlannerDataUpdated.Provider>
//     )
// }

// props.children allows us to compose components
// https://www.youtube.com/watch?v=Sq0FoUPxj_c
//https://stackoverflow.com/questions/69419839/how-to-pass-state-in-context-react