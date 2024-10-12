import { View, Text, ScrollView ,Image, Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

import {images} from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {

  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (form.userName === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.userName);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[90vh] px-4 my-6">
          <Image source = {images.logo} resizeMode='contain' className='w-[115px] h-[35px]'/>
          <Text className='text-2xl text-white  text-semibold mt-10 font-psemibold'>Sign  up Aora</Text>
          <FormField 
          title = 'Username'
          value = {form.userName}
          handleChangeText = {(e) => setForm({...form, userName: e})}
          otherStyles= 'mt-10'
          />
          <FormField 
          title = 'Email'
          value = {form.email}
          handleChangeText = {(e) => setForm({...form, email: e})}
          otherStyles= 'mt-7'
          keyboardType = 'email-address'
          />
           <FormField 
          title = 'Password'
          value = {form.password}
          handleChangeText = {(e) => setForm({...form, password: e})}
          otherStyles= 'mt-7'
          />

        <CustomButton title='Sign Up' handlePress={submit} containerStyles='mt-7' isLoading={isSubmitting}/>
        <View className='justify-center pt-5 flex-row gap-2'>
          <Text className='text-lg text-gray-100 font-pregular'>Have an account already?</Text>
          <Link href='/sign-in' className='text-lg font-psemibold text-secondary'>Sign In</Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp