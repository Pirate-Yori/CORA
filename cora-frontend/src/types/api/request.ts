//=========================================
// AUTHENTIFICATION
//===========================================
export interface RegisterRequest {
    email: string
    password: string
    password_confirmation: string
    nom: string
    prenom: string
}
export interface LoginRequest {
    email: string
    password: string
}