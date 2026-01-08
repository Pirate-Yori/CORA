from rest_framework import routers
from .views import ClasseViewSet,MatiereViewSet

router = routers.DefaultRouter()
router.register('classes', ClasseViewSet)
router.register('matieres', MatiereViewSet)
