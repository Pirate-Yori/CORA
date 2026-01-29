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



class ClasseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classe
        fields = '__all__'

class MatiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matiere
        fields = '__all__'

class RessourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ressource
        fields = '__all__'

class ChapitreSerializer(serializers.ModelSerializer):
    # Inclure les ressources du chapitre dans la réponse
    ressources = RessourceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Chapitre
        fields = '__all__'

class CoursSerializer(serializers.ModelSerializer):
    # Inclure les chapitres du cours dans la réponse
    chapitres = ChapitreSerializer(many=True, read_only=True)
    
    class Meta:
        model = Cours
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = "__all__"


class TentativeQuizSerializer(serializers.ModelSerializer):
    # L'élève connecté est défini côté backend (pas dans le body)
    eleve = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TentativeQuiz
        fields = "__all__"

