from django.db.models import Model
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

from cora_core.models import Classe,Matiere

User = get_user_model()



class ClasseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classe
        fields = '__all__'

class MatiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matiere
        fields = '__all__'

