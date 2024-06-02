import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import Loading from "@/components/Loading"
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ThemedView'

const SignIn = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (password === '' || email === '') {
      Alert.alert('Sign In', 'You need to provide email and password!')
      return
    }

    setLoading(true)
    const res = await login(email, password)
    setLoading(false)
    if (!res.success) {
      Alert.alert('Sign In', res.msg)
    }
  }

  return (
    <ThemedView lightColor='#cff' darkColor='#333' style={[styles.container, { paddingTop: insets.top }]}>
      <TextInput
        value={email}
        style={styles.input}
        placeholder='Email'
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)} />
      <TextInput
        value={password}
        style={styles.input}
        secureTextEntry={true}
        placeholder='Password'
        autoCapitalize='none'
        onChangeText={(text) => setPassword(text)} />

      <View>
        {
          loading ? (
            <View style={{ alignItems: 'center' }}>
              <Loading size={110} />
            </View>
          ) : (
            <TouchableOpacity onPress={handleLogin} style={styles.btn}>
              <Text style={{ fontSize: 28 }}>Sign In!</Text>
            </TouchableOpacity>
          )
        }
      </View>

      <TouchableOpacity onPress={() => router.push('signUp')} style={[styles.btn, { marginTop: 16, width: 200, marginHorizontal: 'auto' }]}>
        <Text style={{ fontSize: 20 }}>Sign up</Text>
      </TouchableOpacity>

    </ThemedView >
  )
}

export default SignIn

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    backgroundColor: '#f66',
    padding: 8,
    alignItems: 'center',
    marginTop: 10
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  }
})