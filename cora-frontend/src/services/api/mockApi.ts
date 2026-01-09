// import type { AuthResponse, LoginRequest, LogoutResponse, RegisterRequest, User } from "@/types";

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// // Mock database
// const mockUsers: User[] = [
//     {
//         id: 1,
//         nom: 'Traore',
//         prenom: 'Drissa',
//         full_name: "Traore Drissa",
//         email: "drissa@gmail.com",
//         created_at: "07/01/2026",
//         updated_at: "07/01/2026",
//     }
// ]
// const mockToken = "mock_jwt_token_1234"
// const mockRefreshToken = "mock_jwt_token_1234758"

// export class MockAPI {
//     static async login(credentials: LoginRequest): Promise<AuthResponse> {
//         await delay(1000)
//         const user = mockUsers.find(u => u.email === credentials.email)
//         if (!user) {
//             throw new Error('Email ou mot de passe incorrect')
//         }
//         if (credentials.password !== 'password' && credentials.password !== 'demo') {
//             throw new Error('Email ou mot de passe incorrect')
//         }
//         return { user, token: mockToken, message: "Connexion réussie" }
//     }

//     static async register(data:RegisterRequest):Promise<AuthResponse>{
//         await delay(1500)
//         if(mockUsers.find(u=>u.email===data.email)){
//             throw new Error("Cette addresse email est déjà utilisée")
//         }

//         const newUser:User={
//             id:mockUsers.length+1,
//             nom:data.nom,
//             prenom:data.prenom,
//             full_name:`${data.nom} ${data.prenom}`,
//             email:data.email,
//             created_at: new Date().toISOString(),
//             updated_at: new Date().toISOString(),
//         }
//         mockUsers.push(newUser)
//         return {user:newUser,token:mockToken,message:"Inscription réussie"
//         }
//     }
//     static async logout():Promise<LogoutResponse>{
//         await delay(500)
//         return {message:"Déconnexion réussie"}
//     }
// }
// export default MockAPI