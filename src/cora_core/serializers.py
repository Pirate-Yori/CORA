from rest_framework import serializers
from django.contrib.auth import get_user_model

from cora_core.models import (
    Classe,
    Matiere,
    Cours,
    Chapitre,
    Ressource,
    Quiz,
    TentativeQuiz,
)

User = get_user_model()


# --- Serializers de base (sans imbrication) ---
class ClasseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classe
        fields = '__all__'

# --- Ressource (chapitre en objet complet) ---
class RessourceSerializer(serializers.ModelSerializer):
    # chapitre = ChapitreMinimalSerializer(read_only=True)

    class Meta:
        model = Ressource
        # fields = '__all__'
        fields = ['id',
            'type_ressource',
            'url_video',
            'fichier',
            'duree',
            'created_at',
            'updated_at',
            'chapitre' ]


# --- Chapitre complet (cours + ressources en objets) ---
class ChapitreSerializer(serializers.ModelSerializer):
    # cours = CoursMinimalSerializer(read_only=True)
    ressources = RessourceSerializer(many=True, read_only=True)
    nb_ressources = serializers.SerializerMethodField()

    class Meta:
        model = Chapitre
        # fields = '__all__'
        fields = ['id',
            'titre',
            'description',
            'numero',
            'date_creation',
            'date_modification',
            'cours',  # Juste l'ID
            'ressources',
            'nb_ressources']
    def get_nb_ressources(self, obj):
        return obj.ressources.count()


# --- Cours complet (matiere, classe, chapitres en objets) ---
class CoursSerializer(serializers.ModelSerializer):
    # matiere = MatiereSerializer(read_only=True)
    # classe = ClasseSerializer(read_only=True)
    chapitres = ChapitreSerializer(many=True, read_only=True)
    nb_chapitres = serializers.SerializerMethodField()
    duree_totale_calculee = serializers.SerializerMethodField()

    class Meta:
        model = Cours
        # fields = '__all__'
        fields = ['id',
            'numero',
            'titre',
            'description',
            'objectif_pedagogique',
            'duree_totale',
            'est_verrouille',
            'est_publie',
            'date_creation',
            'date_modification',
            'matiere',  # Juste l'ID
            'chapitres',
            'nb_chapitres',
            'duree_totale_calculee']
    def get_nb_chapitres(self, obj):
        return obj.chapitres.count()

    def get_duree_totale_calculee(self, obj):
        """Calcule la durée totale basée sur les ressources"""
        total = 0
        for chapitre in obj.chapitres.all():
            for ressource in chapitre.ressources.all():
                if ressource.duree:
                    total += ressource.duree
        return total

class MatiereSerializer(serializers.ModelSerializer):
    # Liste des classes liées en objet complet
    # classes_matieres = ClasseSerializer(many=True, read_only=True)
    cours = CoursSerializer(many=True, read_only=True)
    classes_matieres = ClasseSerializer(many=True, read_only=True)
    nb_cours = serializers.SerializerMethodField()

    class Meta:
        model = Matiere
        # fields = '__all__'
        fields = [
            'id',
            'nom_matiere',
            'icon',
            'image',
            'statusColor',
            'status',
            'colorBg',
            'progression',
            'progressColor',
            'prochainCours',
            'classes_matieres',
            'cours',
            'nb_cours'
        ]
    def get_nb_cours(self, obj):
        return obj.cours.count()


# --- Cours minimal (pour imbrication dans chapitre, évite boucle infinie) ---
class CoursMinimalSerializer(serializers.ModelSerializer):
    matiere = MatiereSerializer(read_only=True)
    classe = ClasseSerializer(read_only=True)

    class Meta:
        model = Cours
        fields = '__all__'


# --- Chapitre minimal (pour imbrication dans ressource / quiz) ---
class ChapitreMinimalSerializer(serializers.ModelSerializer):
    cours = CoursMinimalSerializer(read_only=True)

    class Meta:
        model = Chapitre
        fields = '__all__'






class QuizSerializer(serializers.ModelSerializer):
    cours = CoursMinimalSerializer(read_only=True)
    chapitre = ChapitreMinimalSerializer(read_only=True)

    class Meta:
        model = Quiz
        fields = "__all__"


class TentativeQuizSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer(read_only=True)
    # L'élève connecté est défini côté backend (pas dans le body)
    eleve = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TentativeQuiz
        fields = "__all__"

# --- Serializers alternatifs (versions light) ---

class MatiereListSerializer(serializers.ModelSerializer):
    """Version légère pour les listes - sans cours imbriqués"""
    classes_matieres = ClasseSerializer(many=True, read_only=True)
    nb_cours = serializers.SerializerMethodField()

    class Meta:
        model = Matiere
        fields = [
            'id',
            'nom_matiere',
            'icon',
            'image',
            'statusColor',
            'status',
            'colorBg',
            'progression',
            'progressColor',
            'prochainCours',
            'classes_matieres',
            'nb_cours'
        ]

    def get_nb_cours(self, obj):
        return obj.cours.count()


class CoursListSerializer(serializers.ModelSerializer):
    """Version légère pour les listes - sans chapitres imbriqués"""
    matiere_nom = serializers.CharField(source='matiere.nom_matiere', read_only=True)
    nb_chapitres = serializers.SerializerMethodField()

    class Meta:
        model = Cours
        fields = [
            'id',
            'numero',
            'titre',
            'description',
            'duree_totale',
            'est_verrouille',
            'est_publie',
            'matiere',
            'matiere_nom',
            'nb_chapitres'
        ]

    def get_nb_chapitres(self, obj):
        return obj.chapitres.count()


class ChapitreListSerializer(serializers.ModelSerializer):
    """Version légère pour les listes - sans ressources imbriquées"""
    cours_titre = serializers.CharField(source='cours.titre', read_only=True)
    nb_ressources = serializers.SerializerMethodField()

    class Meta:
        model = Chapitre
        fields = [
            'id',
            'titre',
            'description',
            'numero',
            'cours',
            'cours_titre',
            'nb_ressources'
        ]

    def get_nb_ressources(self, obj):
        return obj.ressources.count()


# --- Quiz serializers ---

class QuizSerializer(serializers.ModelSerializer):
    """Serializer pour Quiz - références simples"""
    cours_titre = serializers.CharField(source='cours.titre', read_only=True)
    chapitre_titre = serializers.CharField(source='chapitre.titre', read_only=True)

    class Meta:
        model = Quiz
        fields = [
            'id',
            'titre',
            'description',
            'points_max',
            'created_at',
            'duree_estimee',
            'fichier',
            'cours',
            'cours_titre',
            'chapitre',
            'chapitre_titre'
        ]


class TentativeQuizSerializer(serializers.ModelSerializer):
    """Serializer pour TentativeQuiz"""
    quiz_titre = serializers.CharField(source='quiz.titre', read_only=True)
    eleve = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TentativeQuiz
        fields = [
            'id',
            'date_tentative',
            'note',
            'reponses',
            'est_termine',
            'temps_total_passe',
            'commentaire',
            'quiz',
            'quiz_titre',
            'eleve'
        ]


