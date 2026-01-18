
export interface User{
    id:number;
    nom:string;
    prenom:string;
    full_name:string;
    email:string;
    classe:string;
    telephone:string
    dateNaissance?:string
    etablissement?:string
    role: 'eleve' | 'teacher' | 'admin'
    bio?:string
    derniere_connexion?:string
    photo_profil?:string
    est_actif?:boolean
    created_at:string
    updated_at:string
}
export interface Classe {
    id:number
    niveau:string
    serie:string
    annee_scolaire:string
    nb_eleve?:number
}
export interface UserFormData {
    email:string
    password:string
    password_confirmation:string
    nom:string
    prenom:string
}

export interface CreateUserRequest {
    email:string
    password:string
    password_confirmation:string
    nom:string
    prenom:string
}
export interface UpdateUserRequest {
    email?:string
    nom?:string
    prenom?:string
    telephone?:string
    classe?:string
    bio?:string
    est_actif?:boolean
    dateNaissance?:string
    photo_profil?:string
}

export interface ChangePasswordRequest {
    old_password:string
    new_password:string
    confirmPassword:string
}