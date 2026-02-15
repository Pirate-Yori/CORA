from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .models import Classe, Matiere, Cours, Chapitre, Ressource, Quiz, TentativeQuiz
from . import serializers

# Create your views here.


class ClasseViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Classe.objects.all()
    serializer_class = serializers.ClasseSerializer

class MatiereViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour les Matières
    - Liste: version light sans cours imbriqués
    - Détail: version complète avec cours
    """
    permission_classes = (permissions.AllowAny,)
    # queryset = Matiere.objects.all()
    queryset = Matiere.objects.prefetch_related(
        "classes_matieres",
        "cours__chapitres__ressources"
    )
    # serializer_class = serializers.MatiereSerializer
    def get_serializer_class(self):
        """Utilise un serializer différent selon l'action"""
        if self.action == 'list':
            return serializers.MatiereListSerializer
        return serializers.MatiereSerializer
    def get_queryset(self):
        """Filtre par classe de l'élève connecté"""
        qs = self.queryset
        # qs = Matiere.objects.prefetch_related("classes_matieres")
        
        if self.request.user.is_authenticated and getattr(self.request.user, "role", None) == "eleve":
            try:
                classe = self.request.user.profil_eleve.classe
                return qs.filter(classes_matieres=classe)
            except Exception:
                return qs.none()
        return qs
    @action(detail=True, methods=['get'])
    def cours(self, request, pk=None):
        """Endpoint pour récupérer uniquement les cours d'une matière"""
        matiere = self.get_object()
        cours = matiere.cours.all()
        serializer = serializers.CoursSerializer(cours, many=True)
        return Response(serializer.data)


class CourseViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour les Cours
    - Liste: version light
    - Détail: version complète avec chapitres
    """
    permission_classes = (permissions.AllowAny, )
    # queryset = Cours.objects.prefetch_related('chapitres__ressources').all()
    # serializer_class = serializers.CoursSerializer
    queryset = Cours.objects.select_related('matiere').prefetch_related(
        'chapitres__ressources'
    )
    def get_serializer_class(self):
        """Utilise un serializer différent selon l'action"""
        if self.action == 'list':
            return serializers.CoursListSerializer
        return serializers.CoursSerializer

    def get_queryset(self):
        """Permet de filtrer par matière"""
        qs = self.queryset
        matiere_id = self.request.query_params.get('matiere')
        
        if matiere_id:
            qs = qs.filter(matiere_id=matiere_id)
        
        return qs

    @action(detail=True, methods=['get'])
    def chapitres(self, request, pk=None):
        """Endpoint pour récupérer uniquement les chapitres d'un cours"""
        cours = self.get_object()
        chapitres = cours.chapitres.all()
        serializer = serializers.ChapitreSerializer(chapitres, many=True)
        return Response(serializer.data)

class ChapitreViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour les Chapitres
    - Liste: version light
    - Détail: version complète avec ressources
    """
    permission_classes = (permissions.AllowAny, )
    # queryset = Chapitre.objects.prefetch_related('ressources').all()
    # serializer_class = serializers.ChapitreSerializer
    queryset = Chapitre.objects.select_related('cours').prefetch_related('ressources')

    def get_serializer_class(self):
        """Utilise un serializer différent selon l'action"""
        if self.action == 'list':
            return serializers.ChapitreListSerializer
        return serializers.ChapitreSerializer

    def get_queryset(self):
        """Permet de filtrer par cours"""
        qs = self.queryset
        cours_id = self.request.query_params.get('cours')
        
        if cours_id:
            qs = qs.filter(cours_id=cours_id)
        
        return qs

    @action(detail=True, methods=['get'])
    def ressources(self, request, pk=None):
        """Endpoint pour récupérer uniquement les ressources d'un chapitre"""
        chapitre = self.get_object()
        ressources = chapitre.ressources.all()
        serializer = serializers.RessourceSerializer(ressources, many=True)
        return Response(serializer.data)

class RessourceViewSet(viewsets.ModelViewSet):
    """ViewSet pour les Ressources"""
    permission_classes = (permissions.AllowAny, )
    # queryset = Ressource.objects.all()
    queryset = Ressource.objects.select_related('chapitre')
    serializer_class = serializers.RessourceSerializer

    def get_queryset(self):
        """Permet de filtrer par chapitre"""
        qs = self.queryset
        chapitre_id = self.request.query_params.get('chapitre')
        
        if chapitre_id:
            qs = qs.filter(chapitre_id=chapitre_id)
        
        return qs


class QuizViewSet(viewsets.ModelViewSet):
    """
    Quiz:
    - Lecture: utilisateur authentifié
    - Écriture (POST/PUT/PATCH/DELETE): admin uniquement
    Filtres: ?cours=<id> & ?chapitre=<id>
    """

    serializer_class = serializers.QuizSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Quiz.objects.all()

    def get_queryset(self):
        qs = Quiz.objects.select_related("cours", "chapitre")
        cours_id = self.request.query_params.get("cours")
        chapitre_id = self.request.query_params.get("chapitre")

        if cours_id:
            qs = qs.filter(cours_id=cours_id)
        if chapitre_id:
            qs = qs.filter(chapitre_id=chapitre_id)

        return qs

    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("Admin only.")
        serializer.save()

    def perform_update(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("Admin only.")
        serializer.save()

    def perform_destroy(self, instance):
        if not self.request.user.is_staff:
            raise PermissionDenied("Admin only.")
        instance.delete()


class TentativeQuizViewSet(viewsets.ModelViewSet):
    """
    Tentatives Quiz:
    - Eleve: peut créer/lire ses tentatives
    - Admin: peut lire toutes les tentatives et corriger (PATCH note/commentaire)
    Filtres: ?quiz=<id>
    """

    serializer_class = serializers.TentativeQuizSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = TentativeQuiz.objects.all()

    def get_queryset(self):
        qs = TentativeQuiz.objects.select_related("quiz", "eleve", "quiz__cours", "quiz__cours__classe")
        quiz_id = self.request.query_params.get("quiz")
        if quiz_id:
            qs = qs.filter(quiz_id=quiz_id)

        # Admin voit tout, élève voit seulement ses tentatives
        if self.request.user.is_staff:
            return qs

        if getattr(self.request.user, "role", None) == "eleve":
            return qs.filter(eleve__utilisateur=self.request.user)

        # Autres rôles: rien
        return qs.none()

    def perform_create(self, serializer):
        # Seul un élève peut créer une tentative
        if getattr(self.request.user, "role", None) != "eleve":
            raise PermissionDenied("Seul un élève peut passer un quiz.")

        eleve = self.request.user.profil_eleve
        quiz: Quiz = serializer.validated_data["quiz"]

        # Sécurité: un élève ne peut passer qu'un quiz de sa classe
        if quiz.cours.classe_id != eleve.classe_id:
            raise PermissionDenied("Ce quiz n'appartient pas à votre classe.")

        serializer.save(eleve=eleve)

    def perform_update(self, serializer):
        # Admin peut corriger; élève peut modifier uniquement ses champs (reponses/temps/est_termine)
        if self.request.user.is_staff:
            serializer.save()
            return

        if getattr(self.request.user, "role", None) != "eleve":
            raise PermissionDenied("Action non autorisée.")

        # Empêcher un élève de modifier la note/commentaire d'une tentative
        for forbidden in ("note", "commentaire"):
            if forbidden in serializer.validated_data:
                raise PermissionDenied("Vous ne pouvez pas modifier la correction.")

        serializer.save()
