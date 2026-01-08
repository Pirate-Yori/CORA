from wsgiref import validate

from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()
#UserSerializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "nom",
            "prenom",
            "telephone",
            "created_at",
            "role",
            "photo_profil",
            "est_actif",
            "derniere_connexion",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at","role", "updated_at","derniere_connexion"]


#INSCRIPTION
class UserRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["nom","prenom",'telephone',"password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(
            nom=validated_data["nom"],
            prenom=validated_data["prenom"],
            telephone=validated_data["telephone"],
            password=validated_data["password"]
        )

#CONNEXION
class UserLoginSerializer(serializers.Serializer):
    telephone = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(telephone=data["telephone"], password=data["password"])

        if user is None:
            raise serializers.ValidationError("telephone ou mot de passe incorrect.")

        data["user"] = user
        return data


#ChangepasswordSerializer

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)




