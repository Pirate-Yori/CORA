
// ============================================
// RÉPONSES GÉNÉRIQUES
// ============================================

import type { User } from "../models/User"

export interface MessageResponse {
    message: string
}

export interface ApiResponse<T> {
    data?: T
    message?: string
    success?: boolean
}

//=========================================
// AUTHENTIFICATION
//===========================================
export interface AuthResponse {
    message:string
    user:User
    token:string
    refreshToken?:string
}
export interface LoginResponse extends AuthResponse {}
export interface RegisterRespone extends AuthResponse {}

export interface MeResponse{
    user:User
}
export interface LogoutResponse{
    message:string
}
