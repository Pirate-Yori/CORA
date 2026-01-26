# Prochaine Étape - CORA Backend

## 📋 État Actuel du Projet

### ✅ Ce qui est déjà implémenté

**Backend (Django):**
- ✅ Authentification complète (register, login, logout, profile, change password, upload photo)
- ✅ Modèles de base : `User`, `Eleve`, `Enseignant`, `Admin`, `Classe`, `Matiere`
- ✅ API CRUD pour `Classe` et `Matiere`
- ✅ JWT authentication configuré
- ✅ Système de gamification préparé (points XP, streak, statut premium/gratuit)
- ✅ Lors de l'inscription, l'élève choisit sa classe et se connecte directement
- ✅ Relation ManyToMany entre `Matiere` et `Classe` (classes_matieres)

**Frontend (Vue.js):**
- ✅ Authentification (login, register)
- ✅ Dashboard avec données mockées :
  - Liste des matières par série
  - Statistiques (cours suivis, moyenne, heures, progression)
  - Prochains cours
  - Quiz/Évaluations
- ✅ Page matière avec données mockées :
  - Chapitres avec progression
  - Vidéos de cours
  - Quiz/Évaluations
  - Performance
  - Forum

---

## 🎯 Prochaine Étape : Modélisation du Contenu Pédagogique

### Objectif
Créer les modèles backend et les APIs nécessaires pour remplacer les données mockées du frontend par de vraies données provenant de la base de données.

**Points importants :**
- ✅ Les cours doivent être filtrés par la classe de l'élève connecté
- ✅ Seul l'admin peut créer/modifier/supprimer du contenu (pas de droits enseignants pour le moment)
- ✅ Utiliser des Quiz au lieu de Devoirs

---

### 📦 Modèles à Créer

#### 1. **Cours** (`Cours`)
Un cours est un ensemble structuré de connaissances sur un sujet précis, donné pour apprendre quelque chose du début à la fin.

**Exemple :** "Introduction aux fonctions", "Les limites et continuité", "Dérivabilité"

**Champs:**
- `matiere` (ForeignKey → Matiere)
- `classe` (ForeignKey → Classe) - **IMPORTANT** : Le cours est lié à une classe spécifique
- `titre` (CharField) - Titre du cours (ex: "Introduction aux fonctions")
- `description` (TextField) - Description complète du cours, objectif pédagogique
- `objectif_pedagogique` (TextField, optionnel) - Objectif d'apprentissage du cours
- `ordre` (IntegerField) - Ordre d'affichage dans la matière
- `est_verrouille` (BooleanField, default=False) - Si le cours est verrouillé
- `est_publie` (BooleanField, default=True)
- `duree_totale` (IntegerField, nullable=True) - Durée totale estimée en minutes (calculée automatiquement)
- `date_creation` (DateTimeField, auto_now_add=True)
- `date_modification` (DateTimeField, auto_now=True)

**Relations:**
- Un cours appartient à une matière ET une classe
- Un cours peut avoir plusieurs chapitres (parties du cours)
- Un cours peut avoir plusieurs quiz

**Contraintes:**
- Un cours doit être unique par matière + classe + titre (ou ordre)

---

#### 2. **Chapitre** (`Chapitre`)
Un chapitre est une partie d'un cours. Un cours est divisé en plusieurs chapitres pour structurer l'apprentissage.

**Exemple :** Dans le cours "Introduction aux fonctions", on peut avoir :
- Chapitre 1: "Définition d'une fonction"
- Chapitre 2: "Types de fonctions"
- Chapitre 3: "Représentation graphique"

**Champs:**
- `cours` (ForeignKey → Cours) - Le cours auquel appartient ce chapitre
- `numero` (IntegerField) - Numéro d'ordre du chapitre dans le cours
- `titre` (CharField) - Titre du chapitre
- `description` (TextField, optionnel) - Description du chapitre
- `ordre` (IntegerField) - Ordre d'affichage dans le cours
- `est_verrouille` (BooleanField, default=False) - Si le chapitre est verrouillé
- `date_creation` (DateTimeField, auto_now_add=True)
- `date_modification` (DateTimeField, auto_now=True)

**Relations:**
- Un chapitre appartient à un cours (qui lui-même appartient à une matière et une classe)
- Un chapitre peut avoir plusieurs ressources (vidéos, documents, exercices)

**Contraintes:**
- Un chapitre doit être unique par cours + ordre

**Filtrage:**
- Les chapitres sont automatiquement filtrés par la classe de l'élève via le cours

---

#### 3. **Ressource** (`Ressource`)
Une ressource pédagogique dans un chapitre (vidéo, document, exercice, etc.).

**Champs:**
- `chapitre` (ForeignKey → Chapitre)
- `titre` (CharField)
- `description` (TextField, optionnel)
- `type_ressource` (CharField avec choix: 'video', 'document', 'live', 'exercice', 'annale', 'methode')
- `url_video` (URLField, nullable=True) - Lien vers la vidéo (YouTube, Vimeo, etc.)
- `fichier` (FileField, nullable=True) - Fichier PDF, DOCX, etc.
- `duree` (IntegerField, nullable=True) - Durée en minutes
- `ordre` (IntegerField) - Ordre d'affichage dans le chapitre
- `est_publie` (BooleanField, default=True)
- `date_publication` (DateTimeField, auto_now_add=True)
- `nombre_vues` (PositiveIntegerField, default=0)
- `created_at` (DateTimeField, auto_now_add=True)
- `updated_at` (DateTimeField, auto_now=True)

**Relations:**
- Une ressource appartient à un chapitre (qui appartient à un cours, qui appartient à une matière et une classe)
- Une ressource peut avoir plusieurs suivis d'élèves (RessourceSuivi)

**Filtrage:**
- Les ressources sont automatiquement filtrées par la classe de l'élève via chapitre → cours → classe

---

#### 4. **ProgressionEleve** (`ProgressionEleve`)
Suit la progression d'un élève dans un cours.

**Champs:**
- `eleve` (ForeignKey → Eleve)
- `cours` (ForeignKey → Cours)
- `pourcentage_progression` (IntegerField, 0-100, default=0)
- `est_termine` (BooleanField, default=False)
- `date_debut` (DateTimeField, auto_now_add=True)
- `date_fin` (DateTimeField, nullable=True)
- `derniere_activite` (DateTimeField, auto_now=True)
- `temps_total_passe` (IntegerField, default=0) - Temps total en minutes

**Relations:**
- Une progression appartient à un élève et un cours
- Permet de calculer les statistiques globales

**Contraintes:**
- Unique par élève + cours

---

#### 5. **Quiz** (`Quiz`)
Représente un quiz ou une évaluation.

**Champs:**
- `matiere` (ForeignKey → Matiere)
- `classe` (ForeignKey → Classe) - **IMPORTANT** : Le quiz est lié à une classe spécifique
- `cours` (ForeignKey → Cours, nullable=True) - Optionnel, peut être lié à un cours
- `chapitre` (ForeignKey → Chapitre, nullable=True) - Optionnel, peut être lié à un chapitre spécifique
- `titre` (CharField)
- `description` (TextField, optionnel)
- `type_quiz` (CharField avec choix: 'quiz', 'evaluation', 'tp', 'ds') - DS = Devoir Surveillé
- `fichier` (FileField, optionnel) - Fichier PDF du quiz
- `date_creation` (DateTimeField, auto_now_add=True)
- `date_limite` (DateTimeField, nullable=True) - Date limite pour passer le quiz
- `duree_estimee` (IntegerField, nullable=True) - Durée estimée en minutes
- `est_obligatoire` (BooleanField, default=False)
- `points_max` (IntegerField, default=20) - Points maximum
- `est_actif` (BooleanField, default=True)
- `created_at` (DateTimeField, auto_now_add=True)
- `updated_at` (DateTimeField, auto_now=True)

**Relations:**
- Un quiz appartient à une matière et une classe
- Un quiz peut être lié à un cours (optionnel)
- Un quiz peut être lié à un chapitre spécifique (optionnel)
- Un quiz peut avoir plusieurs tentatives d'élèves (TentativeQuiz)

**Filtrage:**
- Les quiz sont automatiquement filtrés par la classe de l'élève

---

#### 6. **TentativeQuiz** (`TentativeQuiz`)
Représente une tentative de quiz par un élève.

**Champs:**
- `quiz` (ForeignKey → Quiz)
- `eleve` (ForeignKey → Eleve)
- `date_tentative` (DateTimeField, auto_now_add=True)
- `note` (DecimalField, max_digits=5, decimal_places=2, nullable=True) - Note sur points_max
- `reponses` (JSONField, optionnel) - Stocke les réponses de l'élève
- `est_termine` (BooleanField, default=False)
- `temps_passe` (IntegerField, nullable=True) - Temps passé en minutes
- `est_corrige` (BooleanField, default=False)
- `commentaire` (TextField, nullable=True) - Commentaire de correction

**Relations:**
- Une tentative appartient à un quiz et un élève
- Un élève peut avoir plusieurs tentatives pour un même quiz (si autorisé)

**Contraintes:**
- Peut être unique par élève + quiz (une seule tentative autorisée) OU multiple selon les besoins

---

#### 7. **RessourceSuivi** (`RessourceSuivi`)
Suit quelles ressources un élève a consultées.

**Champs:**
- `eleve` (ForeignKey → Eleve)
- `ressource` (ForeignKey → Ressource)
- `date_visionnage` (DateTimeField, auto_now_add=True)
- `temps_visionne` (IntegerField, default=0) - Temps visionné en minutes
- `est_termine` (BooleanField, default=False) - Si l'élève a terminé de consulter la ressource
- `derniere_position` (IntegerField, nullable=True) - Position dans la vidéo en secondes (pour les vidéos)
- `derniere_activite` (DateTimeField, auto_now=True)

**Relations:**
- Un suivi appartient à un élève et une ressource
- Permet de calculer les statistiques (nombre de vues, temps total, etc.)

**Contraintes:**
- Unique par élève + ressource (une seule entrée de suivi par ressource)

---

### 🔌 APIs à Créer

#### 1. **API Cours**
- `GET /api/cours/` - Liste des cours de la classe de l'élève connecté (filtrés automatiquement)
  - Query params: `?matiere={id}` pour filtrer par matière
- `GET /api/cours/{id}/` - Détails d'un cours (avec ses chapitres)
- `POST /api/cours/` - Créer un cours (admin uniquement)
- `PUT /api/cours/{id}/` - Modifier un cours (admin uniquement)
- `DELETE /api/cours/{id}/` - Supprimer un cours (admin uniquement)

**Filtrage automatique :** Les élèves ne voient que les cours de leur classe.

---

#### 2. **API Chapitres**
- `GET /api/chapitres/` - Liste des chapitres de la classe de l'élève connecté (filtrés automatiquement)
  - Query params: `?cours={id}` pour filtrer par cours
- `GET /api/chapitres/{id}/` - Détails d'un chapitre (avec ses ressources)
- `POST /api/chapitres/` - Créer un chapitre (admin uniquement)
- `PUT /api/chapitres/{id}/` - Modifier un chapitre (admin uniquement)
- `DELETE /api/chapitres/{id}/` - Supprimer un chapitre (admin uniquement)

**Filtrage automatique :** Les élèves ne voient que les chapitres des cours de leur classe.

---

#### 3. **API Ressources**
- `GET /api/ressources/` - Liste des ressources de la classe de l'élève connecté (filtrés automatiquement)
  - Query params: `?chapitre={id}`, `?cours={id}`, `?type={type}`
- `GET /api/ressources/{id}/` - Détails d'une ressource
- `POST /api/ressources/` - Créer une ressource (admin uniquement)
- `PUT /api/ressources/{id}/` - Modifier une ressource (admin uniquement)
- `DELETE /api/ressources/{id}/` - Supprimer une ressource (admin uniquement)
- `POST /api/ressources/{id}/marquer-vu/` - Marquer une ressource comme vue (élève)
  - Body: `{"temps_visionne": 30, "est_termine": true, "derniere_position": 1200}`

**Filtrage automatique :** Les élèves ne voient que les ressources des chapitres des cours de leur classe.

---

#### 3. **API Progression**
- `GET /api/progression/` - Progression globale de l'élève connecté
- `GET /api/progression/matiere/{matiere_id}/` - Progression dans une matière
- `GET /api/progression/chapitre/{chapitre_id}/` - Progression dans un chapitre
- `POST /api/progression/chapitre/{chapitre_id}/mettre-a-jour/` - Mettre à jour la progression
  - Body: `{"pourcentage_progression": 75, "temps_passe": 45}`

**Filtrage automatique :** L'élève ne voit que sa propre progression.

---

#### 4. **API Quiz**
- `GET /api/quiz/` - Liste des quiz de la classe de l'élève connecté (filtrés automatiquement)
  - Query params: `?matiere={id}`, `?chapitre={id}`, `?type={type}`
- `GET /api/quiz/{id}/` - Détails d'un quiz
- `POST /api/quiz/` - Créer un quiz (admin uniquement)
- `PUT /api/quiz/{id}/` - Modifier un quiz (admin uniquement)
- `DELETE /api/quiz/{id}/` - Supprimer un quiz (admin uniquement)

**Filtrage automatique :** Les élèves ne voient que les quiz de leur classe.

---

#### 5. **API Tentatives Quiz**
- `GET /api/tentatives/` - Liste des tentatives de l'élève connecté
  - Query params: `?quiz={id}` pour filtrer par quiz
- `GET /api/tentatives/{id}/` - Détails d'une tentative
- `POST /api/tentatives/` - Créer une tentative (passer un quiz) (élève)
  - Body: `{"quiz": 1, "reponses": {...}, "temps_passe": 30}`
- `PUT /api/tentatives/{id}/terminer/` - Terminer une tentative (élève)
- `PUT /api/tentatives/{id}/corriger/` - Corriger une tentative (admin)
  - Body: `{"note": 15.5, "commentaire": "Bien joué !"}`
- `GET /api/tentatives/quiz/{quiz_id}/` - Liste des tentatives d'un quiz (admin)

**Filtrage automatique :** Les élèves ne voient que leurs propres tentatives.

---

#### 7. **API Statistiques**
- `GET /api/stats/dashboard/` - Données pour le dashboard (élève connecté)
  - Retourne: cours suivis, moyenne générale, heures totales, progression globale
- `GET /api/stats/matiere/{matiere_id}/` - Statistiques dans une matière (élève connecté)
  - Retourne: progression, nombre de cours suivis, moyenne des quiz, temps passé

**Filtrage automatique :** L'élève ne voit que ses propres statistiques.

---

### 📝 Ordre d'Implémentation Recommandé

1. **Phase 1 : Modèles de base**
   - Créer les modèles `Cours`, `Chapitre`, `Ressource`, `ProgressionEleve`
   - Ajouter le champ `classe` dans `Cours` pour le filtrage
   - Créer les migrations
   - Créer les serializers de base

2. **Phase 2 : APIs Cours, Chapitres et Ressources avec filtrage par classe**
   - Implémenter les ViewSets pour Cours, Chapitres et Ressources
   - Ajouter le filtrage automatique par classe de l'élève connecté
   - Permissions : admin uniquement pour créer/modifier
   - Tester avec Postman

3. **Phase 3 : Progression**
   - Implémenter le modèle `ProgressionEleve` (lié au cours, pas au chapitre)
   - Créer les APIs de progression
   - Mettre à jour automatiquement la progression lors de la consultation de ressources

4. **Phase 4 : Quiz**
   - Créer les modèles `Quiz` et `TentativeQuiz`
   - Implémenter les APIs de quiz et tentatives
   - Ajouter le filtrage par classe
   - Gérer l'upload de fichiers pour les quiz

5. **Phase 5 : Statistiques**
   - Créer l'API de statistiques pour le dashboard
   - Calculer les moyennes, temps total, progression globale
   - Filtrer par classe de l'élève

6. **Phase 6 : Intégration Frontend**
   - Connecter le frontend aux nouvelles APIs
   - Remplacer les données mockées par les appels API réels
   - Adapter les composants pour utiliser les vraies données

---

### 🔒 Permissions à Implémenter

- **Élève** : 
  - Peut lire les cours, chapitres, ressources, quiz de sa classe uniquement
  - Peut passer des quiz (créer des tentatives)
  - Peut voir sa progression et ses statistiques
  - Peut marquer des ressources comme vues

- **Admin** : 
  - Accès complet (CRUD sur tout)
  - Peut créer/modifier/supprimer cours, chapitres, ressources, quiz
  - Peut corriger les tentatives de quiz
  - Peut voir toutes les statistiques

**Note :** Pas de droits enseignants pour le moment. Seul l'admin gère le contenu.

---

### 🔍 Filtrage par Classe - Logique d'Implémentation

**Principe :** 
- Lors de l'inscription, l'élève choisit sa classe
- La classe est stockée dans `Eleve.classe`
- Tous les contenus (chapitres, cours, quiz) doivent être filtrés par cette classe

**Implémentation dans les ViewSets :**

```python
# Exemple pour CoursViewSet
def get_queryset(self):
    queryset = Cours.objects.all()
    
    # Si l'utilisateur est un élève, filtrer par sa classe
    if self.request.user.role == 'eleve':
        eleve = self.request.user.profil_eleve
        queryset = queryset.filter(classe=eleve.classe)
    
    # Filtrage par matière si paramètre présent
    matiere_id = self.request.query_params.get('matiere')
    if matiere_id:
        queryset = queryset.filter(matiere_id=matiere_id)
    
    return queryset
```

**Même logique pour :**
- `ChapitreViewSet` : Filtrer via `chapitre.cours.classe`
- `RessourceViewSet` : Filtrer via `ressource.chapitre.cours.classe`
- `QuizViewSet` : Filtrer directement via `quiz.classe`
- `ProgressionViewSet` : Filtrer via `progression.eleve.classe`

---

### 📊 Exemple de Structure de Données

```
Classe: Terminale C - 2024-2025
  └── Matiere: Mathématiques
      └── Chapitre 1: Fonctions numériques (classe=Terminale C)
          ├── Cours 1: Introduction aux fonctions (vidéo, 30min)
          ├── Cours 2: Exercices corrigés (document, 20min)
          └── Quiz 1: Évaluation fonctions (20 points)
      └── Chapitre 2: Limites et continuité (classe=Terminale C)
          ├── Cours 1: Notion de limite (vidéo, 45min)
          └── Quiz 2: Quiz limites (15 points)
```

**Important :** Chaque chapitre et quiz est lié à une classe spécifique, permettant un filtrage automatique.

---

### 🎯 Résultat Attendu

Après cette étape, vous aurez :
- ✅ Un système complet de gestion de contenu pédagogique filtré par classe
- ✅ Un suivi de progression pour chaque élève dans sa classe
- ✅ Un système de quiz et évaluations fonctionnel
- ✅ Des statistiques calculées automatiquement par classe
- ✅ Le frontend connecté à de vraies données
- ✅ Filtrage automatique : chaque élève ne voit que le contenu de sa classe

---

### 📌 Notes Importantes

1. **Gamification** : Bien que mentionnée dans les modèles (points XP), on laisse la gamification de côté pour l'instant comme demandé.

2. **⚠️ Bug à corriger** : Dans `accounts/models.py`, la méthode `ajouter_xp()` du modèle `Eleve` fait référence à `self.niveau` (lignes 246-247), mais le champ `niveau` n'existe pas dans le modèle. Il faudra soit ajouter ce champ, soit retirer cette logique pour l'instant.

3. **Filtrage par classe** : C'est le point central de cette étape. Tous les contenus doivent être liés à une classe et filtrés automatiquement selon la classe de l'élève connecté.

4. **Permissions simplifiées** : Pas de droits enseignants pour le moment. Seul l'admin peut créer/modifier le contenu.

5. **Quiz au lieu de devoirs** : Utiliser le système de Quiz avec TentativeQuiz pour gérer les évaluations.

6. **Fichiers Média** : Prévoir l'upload de fichiers (vidéos, PDFs) avec gestion de stockage (local pour dev, S3/Cloudinary pour prod).

7. **Performance** : Pour les statistiques, considérer l'utilisation de `annotate()` et `aggregate()` pour optimiser les requêtes.

8. **Pagination** : Toutes les listes doivent être paginées (déjà configuré dans settings.py).

9. **Filtres** : Utiliser `django-filter` pour filtrer par matière, chapitre, type, etc. (déjà configuré dans settings.py).

---

## 🚀 Commencez par...

**Étape immédiate** : 
1. Créer les modèles `Cours` (avec champ `classe`), `Chapitre`, `Ressource`, `ProgressionEleve` dans `cora_core/models.py`
2. Créer les migrations
3. Implémenter le filtrage par classe dans les ViewSets

Souhaitez-vous que je commence l'implémentation de ces modèles maintenant ?
