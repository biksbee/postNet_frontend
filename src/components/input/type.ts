export type InputType = 'name' | 'nick' | 'email' | 'password' | 'title' | 'content' | 'tags' | 'default';

export const inputStyle: Record<InputType, string> = {
    name: "",
    nick: "",
    email: "",
    password: "",
    title: "",
    content: "",
    tags: "",
    default: "w-full "
}

export const inputMask = {

}

export const inputValidation = {
    name: /^[a-zа-я]{2,20}$/i,
    nick: /^[a-z0-9_.]{3,30}$/i,
    email: /^[a-z0-9_.]{3,}@[a-z0-9]{3,9}\.[a-z]{2,50}$/i,
    password: /^[a-z0-9_.#!&?*()\s/"'~-]{5,80}$/i,
    title: /^[a-z0-9\s_]{2,20}$/,
    content: /^.{2,250}$/,
    tags: /^[a-z0-9\s_#@!()]{2,20}$/,
    default: /^.{1,200}$/,
}