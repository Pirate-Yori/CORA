from wsgiref import validate

from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from cora_core.models import Classe
from .models import Eleve
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
    classe = serializers.PrimaryKeyRelatedField(
        queryset=Classe.objects.all(),
        required=True,
        write_only=True,
        help_text="ID de la classe de l'élève"
    )

    class Meta:
        model = User
        fields = ["nom","prenom",'telephone',"password", "classe"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        classe = validated_data.pop("classe")
        user = User.objects.create_user(
            nom=validated_data["nom"],
            prenom=validated_data["prenom"],
            telephone=validated_data["telephone"],
            password=validated_data["password"]
        )
        # Créer le profil élève avec la classe
        Eleve.objects.create(
            utilisateur=user,
            classe=classe
        )
        return user

#CONNEXION
class UserLoginSerializer(serializers.Serializer):
    telephone = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(telephone=data["telephone"], password=data["password"])

        if user is None:
            raise serializers.ValidationError("telephone ou mot de passe incorrect.")

        # Vérifier si l'utilisateur est un élève et récupérer sa classe
        classe_info = None
        if user.role == 'eleve':
            try:
                eleve = user.profil_eleve
                classe_info = {
                    "id": eleve.classe.id,
                    "niveau": eleve.classe.niveau,
                    "serie": eleve.classe.serie,
                    "annee_scolaire": eleve.classe.annee_scolaire
                }
            except (Eleve.DoesNotExist, AttributeError):
                pass

        data["user"] = user
        data["classe"] = classe_info
        return data


#ChangepasswordSerializer

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)




