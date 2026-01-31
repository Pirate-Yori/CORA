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


class MatiereSerializer(serializers.ModelSerializer):
    # Liste des classes liées en objet complet
    classes_matieres = ClasseSerializer(many=True, read_only=True)

    class Meta:
        model = Matiere
        fields = '__all__'


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


# --- Ressource (chapitre en objet complet) ---
class RessourceSerializer(serializers.ModelSerializer):
    chapitre = ChapitreMinimalSerializer(read_only=True)

    class Meta:
        model = Ressource
        fields = '__all__'


# --- Chapitre complet (cours + ressources en objets) ---
class ChapitreSerializer(serializers.ModelSerializer):
    cours = CoursMinimalSerializer(read_only=True)
    ressources = RessourceSerializer(many=True, read_only=True)

    class Meta:
        model = Chapitre
        fields = '__all__'


# --- Cours complet (matiere, classe, chapitres en objets) ---
class CoursSerializer(serializers.ModelSerializer):
    matiere = MatiereSerializer(read_only=True)
    classe = ClasseSerializer(read_only=True)
    chapitres = ChapitreSerializer(many=True, read_only=True)

    class Meta:
        model = Cours
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

