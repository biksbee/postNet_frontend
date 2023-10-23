'use client'
import cn from 'classnames'
import {FC, useCallback, useEffect, useState} from "react"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import { Input } from '../input/Input'
import { Button} from "@/components/button/button/Button";
import {useAppDispatch, useAppSelector, useActions} from "@/app/store/hooks/useActions";

import {authByNickPas, createUser} from "@/app/store/features/auth/auth";

export const AuthPage: FC = () => {

    const router = useRouter()

    const [userEmail, setUserEmail] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [userNick, setUserNick] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')
    const [userPasswordCheck, setUserPasswordCheck] = useState<string>('')

    const [confirm, setConfirm] = useState<boolean>(false)
    const [variant, setVariant] = useState<string>('Login')
    const [disabled, setDisabled] = useState<boolean>(true)

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'Login' ? 'Sign in' : 'Login')
    }, [])

    const dispatch = useAppDispatch()


    useEffect(() => {
        if(
            variant === 'Login' && userNick !== '' && userPassword  !== '' ||
            variant === 'Sign in' && userName !== '' && userNick  !== '' && userEmail  !== '' && userPassword  !== '' && userPasswordCheck  !== '' &&
            userPassword === userPasswordCheck
        ){
            if(confirm){
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        } else setDisabled(true)
    }, [userNick, userName, userEmail, userPassword, userPasswordCheck]);

    const takeValue = async() => {
        if(variant === 'Login'){
            await dispatch(authByNickPas({
                nick: userNick,
                password: userPassword
            }))
            router.back()
        } else if(variant === 'Sign in'){
            await dispatch(createUser({
                name: userName,
                nick: userNick,
                email: userEmail,
                password: userPassword
            }))
            router.push('/profile')
        }
        setUserNick('send')
        setUserPassword('send')
    }

    return(
        <div className='w-full h-full'>
            <div className='flex justify-center'>
                <div className='bg-black bg-opacity-90 px-16 py-16 self-center lg:w-2/5 lg:h-max-w-md rounded-md w-full'>
                    <h2 className='text-white text-4xl mb-8 font-semibold'>
                        {variant === 'Login' ? 'Sign in' : 'Register'}
                    </h2>
                    <div className='flex flex-col gap-4'>
                        {variant === 'Sign in' && (
                            <Input
                                label="Name"
                                id='Name'
                                type='name'
                                value={userName}
                                setValue={setUserName}
                                setConfirm={setConfirm}
                            />
                        )}
                        <Input
                            label="Nick"
                            id='Nick'
                            type='nick'
                            value={userNick}
                            setValue={setUserNick}
                            setConfirm={setConfirm}
                        />
                        {variant === 'Sign in' && (
                            <Input
                                label="Email"
                                id="Email"
                                type='email'
                                value={userEmail}
                                setValue={setUserEmail}
                                setConfirm={setConfirm}
                            />
                        )}
                        <Input
                            label="Password"
                            id='Password'
                            type='password'
                            value={userPassword}
                            setValue={setUserPassword}
                            icon={"/view.svg"}
                            setConfirm={setConfirm}
                        />
                        {
                            variant === 'Sign in' && userPassword !== '' &&
                            <Input
                                label="confirm password"
                                id='confirm password'
                                type='password'
                                value={userPasswordCheck}
                                setValue={setUserPasswordCheck}
                                icon={"./view.svg"}
                                setConfirm={setConfirm}
                            />
                        }
                    </div>
                    <div className={'mt-10'}>
                        <Button
                            variant={variant}
                            takeValue={takeValue}
                            disabled={disabled}
                        />
                    </div>
                    <p className='text-neutral-500 mt-2'>
                        {variant === 'Login' ? 'First time?' : 'Already have an account?'}
                        <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                            {variant === 'Login' ? 'Create an account' : 'Login'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}