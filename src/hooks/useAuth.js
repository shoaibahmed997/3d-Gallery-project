import { useSelector } from "react-redux"


const useAuth = ()=>{
    const userstate= useSelector(state=>state.userState.user)
    return userstate
}

export default useAuth