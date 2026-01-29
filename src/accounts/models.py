from datetime import timezone

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models


from cora_core.models import Classe


class UserManager(BaseUserManager):
    def create_user(self, telephone, password=None, **extra_fields):
        if not telephone:
            raise ValueError('Le telephone est obligatoire')
        user = self.model(telephone=telephone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, telephone, password, **extra_fields):
        """Créer et sauvegarder un superutilisateur"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('est_actif', True)
        extra_fields.setdefault('role', 'admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser doit avoir is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser doit avoir is_superuser=True.')

        return self.create_user(telephone, password, **extra_fields)



class User(AbstractBaseUser):
    ROLE_CHOICES = [
        ('admin', 'Administrateur'),
        ('enseignant', 'Enseignant'),
        ('eleve', 'Élève'),
    ]
    nom = models.CharField(max_length=100, verbose_name="Nom")
    prenom = models.CharField(max_length=100, verbose_name="Prénom")
    telephone = models.CharField(
        unique=True,
        max_length=20,
        validators=[
            RegexValidator(
                regex=r'^\+?[0-9]{8,15}$',
                message="Numéro de téléphone invalide (format: +225XXXXXXXX)"
            )
        ],
        verbose_name="Téléphone"
    )
    photo_profil = models.ImageField(
        upload_to='photos_profils/',
        blank=True,
        null=True,
        verbose_name="Photo de profil"
    )

    # Rôle et statuts
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='eleve',
        verbose_name="Rôle"
    )
    est_actif = models.BooleanField(default=True, verbose_name="Est actif")

    derniere_connexion = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Dernière connexion"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de modification")

    # Champs requis par Django pour l'authentification
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Configuration
    objects = UserManager()
    USERNAME_FIELD = 'telephone'
    REQUIRED_FIELDS = ['nom', 'prenom']

    class Meta:
        db_table = 'user'
        verbose_name = "user"
        verbose_name_plural = "user"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['telephone']),
            models.Index(fields=['role']),
            models.Index(fields=['est_actif']),
        ]

    def __str__(self):
        return f"{self.nom} {self.prenom} ({self.get_role_display()})"

    @property
    def nom_complet(self):
        """Retourne le nom complet de l'utilisateur"""
        return f"{self.prenom} {self.nom}"

    def est_admin(self):
        """Vérifie si l'utilisateur est admin"""
        return self.role == 'admin'

    def est_enseignant(self):
        """Vérifie si l'utilisateur est enseignant"""
        return self.role == 'enseignant'

    def est_eleve(self):
        """Vérifie si l'utilisateur est élève"""
        return self.role == 'eleve'

    def mettre_a_jour_derniere_connexion(self):
        """Met à jour la date de dernière connexion"""
        self.derniere_connexion = timezone.now()
        self.save(update_fields=['derniere_connexion'])


"""
ADMIN 
"""


class Admin(models.Model):
    utilisateur = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profil_admin',
        verbose_name="user"
    )
    droits_speciaux = models.JSONField(
        default=list,
        blank=True,
        verbose_name="Droits spéciaux",
        help_text="Liste des permissions spéciales de l'admin"
    )

    class Meta:
        db_table = 'admin'
        verbose_name = "Administrateur"
        verbose_name_plural = "Administrateurs"

    def __str__(self):
        return f"Admin: {self.utilisateur.nom_complet}"

    def save(self, *args, **kwargs):
        """Override save pour s'assurer que le rôle est bien 'admin'"""
        if self.utilisateur.role != 'admin':
            self.utilisateur.role = 'admin'
            self.utilisateur.save()
        super().save(*args, **kwargs)


class Eleve(models.Model):
    """
    Profil élève avec progression et gamification
    """
    STATUT_CHOICES = [
        ('gratuit', 'Gratuit'),
        ('premium', 'Premium'),
    ]


    utilisateur = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profil_eleve',
        verbose_name="Utilisateur"
    )
    classe = models.ForeignKey(
        Classe,
        on_delete=models.PROTECT,
        related_name='eleves',
        verbose_name="Classe"
    )
    statut = models.CharField(
        max_length=20,
        choices=STATUT_CHOICES,
        default='gratuit',
        verbose_name="Statut d'abonnement"
    )
    points_xp = models.PositiveIntegerField(
        default=0,
        verbose_name="Points XP",
        help_text="Points d'expérience pour la gamification"
    )

    date_inscription = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date d'inscription"
    )
    date_derniere_activite = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Dernière activité"
    )
    streak_jours = models.PositiveIntegerField(
        default=0,
        verbose_name="Série de jours consécutifs",
        help_text="Nombre de jours consécutifs de connexion"
    )

    class Meta:
        db_table = 'eleve'
        verbose_name = "Élève"
        verbose_name_plural = "Élèves"
        ordering = ['-points_xp']
        indexes = [
            models.Index(fields=['statut']),
            models.Index(fields=['classe']),

            
            models.Index(fields=['-points_xp']),
        ]

    def __str__(self):
        return f"Élève: {self.utilisateur.nom_complet} - {self.classe.niveau}"

    def save(self, *args, **kwargs):
        """Override save pour s'assurer que le rôle est bien 'eleve'"""
        if self.utilisateur.role != 'eleve':
            self.utilisateur.role = 'eleve'
            self.utilisateur.save()

        # Incrémenter/décrémenter le nb_eleves de la classe
        if self.pk is None:  # Nouveau élève
            self.classe.incrementer_nb_eleves()

        super().save(*args, **kwargs)

    def est_premium(self):
        """Vérifie si l'élève a un abonnement premium"""
        return self.statut == 'premium'

    def ajouter_xp(self, points):
        """Ajoute des points XP et vérifie le passage de niveau"""
        self.points_xp += points

        # Calcul du niveau (exemple: 100 XP par niveau)
        nouveau_niveau = (self.points_xp // 100) + 1

        if nouveau_niveau > self.niveau:
            self.niveau = nouveau_niveau
            # TODO: Déclencher événement de passage de niveau (badge, notification)

        self.save(update_fields=['points_xp', 'niveau'])
        return self.niveau

    def mettre_a_jour_activite(self):
        """Met à jour la date de dernière activité"""
        self.date_derniere_activite = timezone.now()
        self.save(update_fields=['date_derniere_activite'])

    def incrementer_streak(self):
        """Incrémente le streak de jours consécutifs"""
        self.streak_jours += 1
        self.save(update_fields=['streak_jours'])

    def reinitialiser_streak(self):
        """Réinitialise le streak à 0"""
        self.streak_jours = 0
        self.save(update_fields=['streak_jours'])


class Enseignant(models.Model):
    """
    Profil enseignant avec spécialités et statistiques
    """
    utilisateur = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profil_enseignant',
        verbose_name="Utilisateur"
    )

    biographie = models.TextField(
        blank=True,
        verbose_name="Biographie",
        help_text="Présentation de l'enseignant"
    )
    etablissement = models.CharField(
        max_length=200,
        blank=True,
        verbose_name="Établissement",
        help_text="Établissement de rattachement"
    )
    nb_cours_publies = models.PositiveIntegerField(
        default=0,
        verbose_name="Nombre de cours publiés"
    )
    note_moyenne = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0.00,
        verbose_name="Note moyenne",
        help_text="Note moyenne des cours (sur 5)"
    )

    class Meta:
        db_table = 'enseignant'
        verbose_name = "Enseignant"
        verbose_name_plural = "Enseignants"
        ordering = ['-note_moyenne', '-nb_cours_publies']



    def save(self, *args, **kwargs):
        """Override save pour s'assurer que le rôle est bien 'enseignant'"""
        if self.utilisateur.role != 'enseignant':
            self.utilisateur.role = 'enseignant'
            self.utilisateur.save()
        super().save(*args, **kwargs)

    def incrementer_nb_cours(self):
        """Incrémente le nombre de cours publiés"""
        self.nb_cours_publies += 1
        self.save(update_fields=['nb_cours_publies'])


