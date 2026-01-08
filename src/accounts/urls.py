from .views import RegisterUserAPIView,UserLoginAPIView,UserLogoutAPIView,UserMeAPIView,ProfileAPIView,ChangePasswordAPIView,UploadPhotoAPIView
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
app_name = "accounts"
urlpatterns = [
    path('auth/register/', RegisterUserAPIView.as_view()),
    path('auth/login/', UserLoginAPIView.as_view()),
    path('auth/logout/', UserLogoutAPIView.as_view()),
    path('auth/refresh-token/', TokenRefreshView.as_view(),name='token_refresh'),
    path('auth/me/', UserMeAPIView.as_view()),
    path('auth/profile', ProfileAPIView.as_view(), name='profile'),
    path('auth/profile/password', ChangePasswordAPIView.as_view(), name='change_password'),
    path('auth/profile/photo', UploadPhotoAPIView.as_view(), name='upload_photo'),
]