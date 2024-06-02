import { FIREBASE_AUTH } from "@/FirebaseConfig"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(undefined)

  useEffect(() => {
    const unsub = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("GOT USER: ", user)
      if (user) {
        setIsAuthenticated(true)
        setUser(user)
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    })
  }, [])

  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      return { success: true }
    } catch (e) {
      return { success: false, msg: e.message }
    }
  }

  const logout = async () => {
    try {
      await signOut(FIREBASE_AUTH)
      return { success: true }
    } catch (e) {
      return { success: false, msg: e.message }
    }
  }

  const register = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      console.log('REGISTER: ', res.user)

      // DB ACTIONS
      return { success: true, data: res.user }
    } catch (e) {
      return { success: false, msg: e.message }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const value = useContext(AuthContext)

  if (!value) {
    throw new Error('useAuth has to be inside AuthContextProvider')
  }

  return value
}