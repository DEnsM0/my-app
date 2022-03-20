export interface User {
  email: string
  password?: string
  returnSecureToken?: boolean
  name?: string
  age?: number
  id?: string
}

export interface AuthResponse {
  idToken: string
  expiresIn: string
}

export interface Friend {
  name:string
  id?: string
}

export interface Product {
  title:string
  id?: string
  price: number
  text: string
}

export interface CreateResponse {
  name: string
}
  