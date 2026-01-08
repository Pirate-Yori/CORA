from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Classe,Matiere
from . import serializers

# Create your views here.


class ClasseViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Classe.objects.all()
    serializer_class = serializers.ClasseSerializer

class MatiereViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny, )
    queryset = Matiere.objects.all()
    serializer_class = serializers.MatiereSerializer