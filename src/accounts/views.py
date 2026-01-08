import token

from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from . import serializers
from .serializers import UserRegisterSerializer, ChangePasswordSerializer


# Create your views here.


class RegisterUserAPIView(GenericAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token
        data= serializer.data
        data["tokens"] = {"refresh": str(refresh), "access": str(access)}
        return Response(data, status=status.HTTP_201_CREATED)


class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.UserLoginSerializer


    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        # Génération des tokens
        token = RefreshToken.for_user(user)

        data = serializers.UserSerializer(user).data
        data["tokens"] = {
            "refresh": str(token),
            "access": str(token.access_token),
        }
        return Response(data, status=status.HTTP_200_OK)


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
        return Response(serializer.data)


#GET and PUT
class ProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user
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