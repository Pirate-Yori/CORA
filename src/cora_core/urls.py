from rest_framework import routers
from .views import (
    ClasseViewSet,
    MatiereViewSet,
    CourseViewSet,
    ChapitreViewSet,
    RessourceViewSet,
    QuizViewSet,
    TentativeQuizViewSet,
)

router = routers.DefaultRouter()
router.register('classes', ClasseViewSet)
router.register('matieres', MatiereViewSet)
router.register('courses', CourseViewSet)
router.register('chapitres', ChapitreViewSet)
router.register('ressources', RessourceViewSet)
router.register('quiz', QuizViewSet)
router.register('tentatives-quiz', TentativeQuizViewSet)