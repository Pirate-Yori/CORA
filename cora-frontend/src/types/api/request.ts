//=========================================
// AUTHENTIFICATION
//===========================================
export interface RegisterRequest {
    telephone: string
    password: string
    password_confirmation: string
    nom: string
    prenom: string
    classe:number
}
export interface LoginRequest {
    telephone: string
    password: string
}