import { useContext } from 'react'
import { createContext } from 'react'
const defaultContext = { token: null, setToken: function (arg) { this.token = arg } }
export const TokenContext = createContext(defaultContext);
export const useTokenContext = () => {
  return useContext(TokenContext);
};