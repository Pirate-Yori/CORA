import token

from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from . import serializers
from .serializers import UserRegisterSerializer, ChangePasswordSerializer, UserSerializer


# Create your views here.


class RegisterUserAPIView(GenericAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        user_serializer = UserSerializer(user)

        return Response({
            "message": "Inscription valide",
            "statut": True,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": user_serializer.data
        }, status=status.HTTP_201_CREATED)


class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.UserLoginSerializer


    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        classe_info = serializer.validated_data.get("classe")

        # Génération des tokens
        token = RefreshToken.for_user(user)
        user_serializer = UserSerializer(user)

        response_data = {
            "message": "Connexion valide",
            "statut": True,
            "refresh": str(token),
            "access": str(token.access_token),
            "user": user_serializer.data
        }

        
        # Ajouter les informations de classe si l'utilisateur est un élève
        if classe_info:
            response_data["classe"] = classe_info

        return Response(response_data, status=status.HTTP_201_CREATED)


#LOGOUT
class UserLogoutAPIView(GenericAPIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class UserMeAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UserSerializer
    def get(self, request, *args, **kwargs):

        serializer = self.get_serializer(request.user)

        return Response(
            {"user" : serializer.data}
        )


class ProfileAPIView(GenericAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = self.get_serializer(request.user)
        return Response({"user": serializer.data})

    def put(self, request):
        serializer = self.get_serializer(
            request.user,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"user": serializer.data})
#PUT password
class ChangePasswordAPIView(generics.GenericAPIView):
    serializer_class = serializers.ChangePasswordSerializer
    def put(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            user = request.user
            if serializer.is_valid():
                if not user.check_password(serializer.validated_data['old_password']):
                    return Response({"old_password": "Wrong password"}, status=status.HTTP_400_BAD_REQUEST)
                user.set_password(serializer.validated_data['new_password'])
                user.save()
                return Response({"detail": "Password updated successfully"})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# POST /api/profile/photo
class UploadPhotoAPIView(generics.GenericAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated,]

    def post(self, request, *args, **kwargs):
        if 'photo' not in request.FILES:
            return Response({"error": "Pas de Photo Uploadé"}, status=status.HTTP_400_BAD_REQUEST)
        user = request.user
        user.photo_profil = request.FILES['photo']
        user.save()
        return Response({"detail": "Photo uploaded avec succes"})