import { Slot, useRouter, useSegments } from "expo-router"
import { AuthContextProvider, useAuth } from "../context/authContext"
import { useEffect } from "react"
import { useFonts } from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (typeof isAuthenticated == 'undefined') return
    const inApp = segments[0] == '(app)'
    if (isAuthenticated && !inApp) {
      router.replace('(app)')
    } else if (isAuthenticated == false) {
      router.replace('signIn')
    }
  }, [isAuthenticated])

  return <Slot />
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <MainLayout />
      </SafeAreaProvider>
    </AuthContextProvider>
  )
}