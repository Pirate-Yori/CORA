# Guide Postman - API CORA Backend

Ce guide explique comment utiliser l'API CORA avec Postman pour l'équipe frontend.

## 📋 Table des matières

1. [Configuration de base](#configuration-de-base)
2. [Authentification JWT](#authentification-jwt)
3. [Endpoints d'authentification](#endpoints-dauthentification)
4. [Endpoints de profil utilisateur](#endpoints-de-profil-utilisateur)
5. [Endpoints scolaires](#endpoints-scolaires)
6. [Gestion des erreurs](#gestion-des-erreurs)
7. [Variables d'environnement Postman](#variables-denvironnement-postman)

---

## 🔧 Configuration de base

### URL de base
```
http://localhost:8000
```

### Headers par défaut
Pour toutes les requêtes, ajoutez ces headers :
- **Content-Type**: `application/json` (pour les requêtes POST/PUT)
- **Accept**: `application/json`

### Authentification
Pour les endpoints protégés, ajoutez l'header :
- **Authorization**: `Bearer <access_token>`

---

## 🔐 Authentification JWT

L'API utilise JWT (JSON Web Tokens) pour l'authentification. Après la connexion ou l'inscription, vous recevrez deux tokens :
- **access_token** : Valide 15 minutes, utilisé pour les requêtes authentifiées
- **refresh_token** : Valide 14 jours, utilisé pour obtenir un nouveau access_token

### Workflow d'authentification

1. **Inscription/Connexion** → Récupérer les tokens
2. **Utiliser access_token** → Dans l'header `Authorization: Bearer <access_token>`
3. **Token expiré ?** → Utiliser `refresh_token` pour obtenir un nouveau `access_token`
4. **Déconnexion** → Blacklister le `refresh_token`

---

## 👤 Endpoints d'authentification

### 1. Inscription (Register)

**Endpoint**: `POST /api/auth/register/`

**Permissions**: Aucune (AllowAny)

**Body (JSON)**:
```json
{
  "nom": "Doe",
  "prenom": "John",
  "telephone": "+22512345678",
  "password": "motdepasse123",
  "classe": 1
}
```

**Champs requis**:
- `nom` : Nom de l'élève (string)
- `prenom` : Prénom de l'élève (string)
- `telephone` : Numéro de téléphone au format `+225XXXXXXXX` (string, unique)
- `password` : Mot de passe (string)
- `classe` : ID de la classe de l'élève (integer, obligatoire)

**Réponse réussie (201)**:
```json
{
  "message": "Inscription valide",
  "statut": true,
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Note importante** : 
- Le champ `classe` est **obligatoire** lors de l'inscription
- L'ID de la classe doit correspondre à une classe existante (voir section Classes)
- Un profil élève est automatiquement créé avec la classe spécifiée

**Exemple Postman**:
- Method: `POST`
- URL: `http://localhost:8000/api/auth/register/`
- Headers: `Content-Type: application/json`
- Body (raw JSON): Voir ci-dessus

---

### 2. Connexion (Login)

**Endpoint**: `POST /api/auth/login/`

**Permissions**: Aucune (AllowAny)

**Body (JSON)**:
```json
{
  "telephone": "+22512345678",
  "password": "motdepasse123"
}
```

**Réponse réussie (201) - Pour un élève**:
```json
{
  "message": "Connexion valide",
  "statut": true,
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "classe": {
    "id": 1,
    "niveau": "terminale",
    "serie": "C",
    "annee_scolaire": "2024-2025"
  }
}
```

**Réponse réussie (201) - Pour un admin ou enseignant**:
```json
{
  "message": "Connexion valide",
  "statut": true,
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Note importante** :
- Pour les utilisateurs avec le rôle `eleve`, la réponse inclut automatiquement les informations de leur classe (`id`, `niveau`, `serie`, `annee_scolaire`)
- Pour les autres rôles (admin, enseignant), le champ `classe` n'est pas présent dans la réponse

**Erreur (400)**:
```json
{
  "non_field_errors": ["telephone ou mot de passe incorrect."]
}
```

---

### 3. Rafraîchir le token (Refresh Token)

**Endpoint**: `POST /api/auth/refresh-token/`

**Permissions**: Aucune (mais nécessite un refresh_token valide)

**Body (JSON)**:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Réponse réussie (200)**:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Note**: Seul le nouveau `access_token` est retourné. Le `refresh_token` reste le même.

---

### 4. Déconnexion (Logout)

**Endpoint**: `POST /api/auth/logout/`

**Permissions**: Authentifié requis

**Headers**:
```
Authorization: Bearer <access_token>
```

**Body (JSON)**:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Réponse réussie (205)**:
```
(No content)
```

**Erreur (400)**:
```json
{
  "error": "Token is invalid or expired"
}
```

---

### 5. Obtenir les informations de l'utilisateur connecté

**Endpoint**: `GET /api/auth/me/`

**Permissions**: Authentifié requis

**Headers**:
```
Authorization: Bearer <access_token>
```

**Réponse réussie (200)**:
```json
{
  "id": 1,
  "nom": "Doe",
  "prenom": "John",
  "telephone": "+22512345678",
  "created_at": "2024-01-15T10:30:00Z",
  "role": "eleve",
  "photo_profil": "/media/photos_profils/user1.jpg",
  "est_actif": true,
  "derniere_connexion": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

## 👤 Endpoints de profil utilisateur

### 6. Obtenir/Mettre à jour le profil

**Endpoint**: `GET /api/auth/profile` ou `PUT /api/auth/profile`

**Permissions**: Authentifié requis

**Headers**:
```
Authorization: Bearer <access_token>
Content-Type: application/json (pour PUT)
```

**GET - Réponse réussie (200)**:
```json
{
  "id": 1,
  "nom": "Doe",
  "prenom": "John",
  "telephone": "+22512345678",
  "created_at": "2024-01-15T10:30:00Z",
  "role": "eleve",
  "photo_profil": "/media/photos_profils/user1.jpg",
  "est_actif": true,
  "derniere_connexion": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**PUT - Body (JSON)**:
```json
{
  "nom": "Doe",
  "prenom": "Jane",
  "telephone": "+22512345678"
}
```

**Note**: Les champs `id`, `created_at`, `role`, `updated_at`, `derniere_connexion` sont en lecture seule.

---

### 7. Changer le mot de passe

**Endpoint**: `PUT /api/auth/profile/password`

**Permissions**: Authentifié requis

**Headers**:
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body (JSON)**:
```json
{
  "old_password": "ancienmotdepasse",
  "new_password": "nouveaumotdepasse"
}
```

**Réponse réussie (200)**:
```json
{
  "detail": "Password updated successfully"
}
```

**Erreur (400)**:
```json
{
  "old_password": "Wrong password"
}
```

---

### 8. Upload photo de profil

**Endpoint**: `POST /api/auth/profile/photo`

**Permissions**: Authentifié requis

**Headers**:
```
Authorization: Bearer <access_token>
```

**Body (form-data)**:
- Key: `photo`
- Type: `File`
- Value: Sélectionner un fichier image

**Réponse réussie (200)**:
```json
{
  "detail": "Photo uploaded avec succes"
}
```

**Erreur (400)**:
```json
{
  "error": "Pas de Photo Uploadé"
}
```

**Note**: Utilisez `form-data` dans Postman, pas `raw JSON`.

---

## 🏫 Endpoints scolaires

### 9. Classes - Liste et création

**Endpoint**: `GET /school/classes/` ou `POST /school/classes/`

**Permissions**: Aucune (AllowAny)

#### GET - Liste des classes

**Headers**: Aucun requis

**Réponse réussie (200)**:
```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "niveau": "troisieme",
      "serie": "general",
      "nb_eleves": 25,
      "annee_scolaire": "2024-2025"
    },
    {
      "id": 2,
      "niveau": "terminale",
      "serie": "C",
      "nb_eleves": 30,
      "annee_scolaire": "2024-2025"
    }
  ]
}
```

**Pagination**: 20 résultats par page par défaut

#### POST - Créer une classe

**Headers**: 
```
Content-Type: application/json
```

**Body (JSON)**:
```json
{
  "niveau": "terminale",
  "serie": "C",
  "annee_scolaire": "2024-2025"
}
```

**Choix possibles pour `niveau`**:
- `"troisieme"` - 3ème (Brevet)
- `"terminale"` - Terminale (BAC)

**Choix possibles pour `serie`**:
- `"general"` - Général (pour 3ème)
- `"A"` - Série A (Littéraire)
- `"C"` - Série C (Scientifique)
- `"D"` - Série D (Scientifique)
- `"E"` - Série E (Économique)

**Réponse réussie (201)**:
```json
{
  "id": 3,
  "niveau": "terminale",
  "serie": "C",
  "nb_eleves": 0,
  "annee_scolaire": "2024-2025"
}
```

**Contrainte d'unicité** :
- La combinaison `niveau` + `serie` + `annee_scolaire` doit être unique
- Vous pouvez créer plusieurs classes avec le même niveau et la même année scolaire, à condition qu'elles aient des séries différentes
- Exemples valides :
  - Terminale C - 2024-2025 ✅
  - Terminale D - 2024-2025 ✅
  - Terminale A - 2024-2025 ✅
- Exemple invalide (duplication) :
  - Terminale C - 2024-2025 (déjà existante) ❌

**Erreur (400) - Classe déjà existante**:
```json
{
  "non_field_errors": [
    "Les champs niveau, serie, annee_scolaire doivent former un ensemble unique."
  ]
}
```

---

### 10. Classes - Détail, modification, suppression

**Endpoint**: 
- `GET /school/classes/{id}/` - Détail
- `PUT /school/classes/{id}/` - Modification complète
- `PATCH /school/classes/{id}/` - Modification partielle
- `DELETE /school/classes/{id}/` - Suppression

**Permissions**: Aucune (AllowAny)

**Exemple GET**:
```
GET http://localhost:8000/school/classes/1/
```

**Réponse (200)**:
```json
{
  "id": 1,
  "niveau": "troisieme",
  "serie": "general",
  "nb_eleves": 25,
  "annee_scolaire": "2024-2025"
}
```

---

### 11. Matières - Liste et création

**Endpoint**: `GET /school/matieres/` ou `POST /school/matieres/`

**Permissions**: Aucune (AllowAny)

#### GET - Liste des matières

**Réponse réussie (200)**:
```json
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "nom_matiere": "MATH",
      "classes_matieres": [1, 2]
    },
    {
      "id": 2,
      "nom_matiere": "PHYS",
      "classes_matieres": [2]
    },
    {
      "id": 3,
      "nom_matiere": "FR",
      "classes_matieres": [1, 2]
    }
  ]
}
```

#### POST - Créer une matière

**Headers**: 
```
Content-Type: application/json
```

**Body (JSON)**:
```json
{
  "nom_matiere": "MATH",
  "classes_matieres": [1, 2]
}
```

**Choix possibles pour `nom_matiere`**:
- `"MATH"` - Mathématiques
- `"PHYS"` - Physique
- `"FR"` - Français

**Réponse réussie (201)**:
```json
{
  "id": 4,
  "nom_matiere": "MATH",
  "classes_matieres": [1, 2]
}
```

---

### 12. Matières - Détail, modification, suppression

**Endpoint**: 
- `GET /school/matieres/{id}/` - Détail
- `PUT /school/matieres/{id}/` - Modification complète
- `PATCH /school/matieres/{id}/` - Modification partielle
- `DELETE /school/matieres/{id}/` - Suppression

**Permissions**: Aucune (AllowAny)

---

## ⚠️ Gestion des erreurs

### Codes de statut HTTP

- **200 OK** : Requête réussie
- **201 Created** : Ressource créée avec succès
- **205 Reset Content** : Requête réussie (logout)
- **400 Bad Request** : Erreur de validation ou données invalides
- **401 Unauthorized** : Token manquant, invalide ou expiré
- **403 Forbidden** : Permissions insuffisantes
- **404 Not Found** : Ressource introuvable
- **500 Internal Server Error** : Erreur serveur

### Format des erreurs

**Erreur de validation (400)**:
```json
{
  "field_name": ["Message d'erreur pour ce champ"],
  "other_field": ["Autre erreur"]
}
```

**Erreur d'authentification (401)**:
```json
{
  "detail": "Given token not valid for any token type",
  "code": "token_not_valid",
  "messages": [
    {
      "token_class": "AccessToken",
      "token_type": "access",
      "message": "Token is invalid or expired"
    }
  ]
}
```

**Erreur de permission (403)**:
```json
{
  "detail": "You do not have permission to perform this action."
}
```

**Ressource introuvable (404)**:
```json
{
  "detail": "Not found."
}
```

---

## 🔧 Variables d'environnement Postman

Pour faciliter les tests, créez un environnement Postman avec ces variables :

### Variables à créer

1. **base_url**: `http://localhost:8000`
2. **access_token**: (sera rempli automatiquement après login)
3. **refresh_token**: (sera rempli automatiquement après login)

### Utilisation dans les requêtes

- URL: `{{base_url}}/api/auth/login/`
- Header Authorization: `Bearer {{access_token}}`

### Script Postman pour sauvegarder automatiquement les tokens

Dans l'onglet **Tests** de la requête de login/register, ajoutez :

```javascript
if (pm.response.code === 201 || pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("access_token", jsonData.access);
    pm.environment.set("refresh_token", jsonData.refresh);
    
    // Optionnel : sauvegarder les infos de classe si présentes
    if (jsonData.classe) {
        pm.environment.set("classe_id", jsonData.classe.id);
        pm.environment.set("classe_niveau", jsonData.classe.niveau);
    }
}
```

---

## 📝 Notes importantes

1. **Format du téléphone** : Le numéro doit respecter le format `+225XXXXXXXX` (8-15 chiffres)

2. **Durée de vie des tokens** :
   - Access token : 15 minutes
   - Refresh token : 14 jours

3. **Inscription** :
   - Le champ `classe` est **obligatoire** lors de l'inscription
   - L'ID de la classe doit correspondre à une classe existante
   - Un profil élève est automatiquement créé avec la classe spécifiée

4. **Connexion** :
   - Pour les élèves, la réponse inclut automatiquement les informations de leur classe
   - Les informations de classe sont disponibles dans `response.classe` (id, niveau, serie, annee_scolaire)

5. **Classes** :
   - La contrainte d'unicité est sur la combinaison `niveau` + `serie` + `annee_scolaire`
   - Vous pouvez créer plusieurs classes avec le même niveau et année scolaire si les séries diffèrent
   - Pour les classes de 3ème, utilisez `"general"` comme série

6. **Pagination** : Les endpoints de liste retournent 20 résultats par page par défaut

7. **Médias** : Les photos de profil sont accessibles via `/media/photos_profils/{filename}`

8. **Rôles utilisateurs** :
   - `admin` - Administrateur
   - `enseignant` - Enseignant
   - `eleve` - Élève (par défaut)

9. **CORS** : L'API accepte les requêtes depuis `http://localhost:3000` et Postman

---

## 🚀 Exemple de workflow complet

1. **Lister les classes disponibles** → `GET /school/classes/`
   - Récupérer l'ID de la classe souhaitée

2. **Inscription** → `POST /api/auth/register/`
   - Inclure le champ `classe` avec l'ID de la classe
   - Sauvegarder `access_token` et `refresh_token`

3. **Connexion** → `POST /api/auth/login/`
   - Pour un élève, la réponse inclut les informations de classe
   - Sauvegarder `access_token` et `refresh_token`

4. **Obtenir mes infos** → `GET /api/auth/me/`
   - Header: `Authorization: Bearer {{access_token}}`

5. **Créer une classe** → `POST /school/classes/`
   - S'assurer que la combinaison niveau/série/année scolaire est unique

6. **Modifier mon profil** → `PUT /api/auth/profile`
   - Header: `Authorization: Bearer {{access_token}}`

7. **Upload photo** → `POST /api/auth/profile/photo`
   - Header: `Authorization: Bearer {{access_token}}`
   - Body: form-data avec fichier

8. **Token expiré ?** → `POST /api/auth/refresh-token/`
   - Body: `{"refresh": "{{refresh_token}}"}`

9. **Déconnexion** → `POST /api/auth/logout/`
   - Header: `Authorization: Bearer {{access_token}}`
   - Body: `{"refresh": "{{refresh_token}}"}`

---

## 📞 Support

Pour toute question ou problème, contactez l'équipe backend.

**Bon développement ! 🎉**

