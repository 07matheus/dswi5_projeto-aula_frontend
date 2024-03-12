import { useContext } from "react"
import { LoginContexto } from "../context/LoginProvider"

const useLogin = () => {
  const context = useContext(LoginContexto);
  return context;
}

export default useLogin;