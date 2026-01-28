from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from accounts.views import RegisterUserAPIView
from backend import settings
from rest_framework import routers
from cora_core.urls import router as cora_core_router


router = routers.DefaultRouter()
router.registry.extend(cora_core_router.registry)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include("accounts.urls")),
    path('api/', include(router.urls)),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
