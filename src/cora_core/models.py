from django.db import models
from urllib3.util import Url



from accounts.models import Eleve


# Create your models here.

class Classe(models.Model):
    """
    Représente une classe (Terminale, 3ème, etc.)
    """
    NIVEAU_CHOICES = [
        ('troisieme', '3ème (Brevet)'),
        ('terminale', 'Terminale (BAC)'),
    ]

    SERIE_CHOICES = [
        # Pour la 3ème
        ('general', 'Général'),
        # Pour Terminale
        ('A', 'Série A (Littéraire)'),
        ('C', 'Série C (Scientifique)'),
        ('D', 'Série D (Scientifique)'),
        ('E', 'Série E (Économique)'),
    ]


    niveau = models.CharField(
        max_length=20,
        choices=NIVEAU_CHOICES,
        verbose_name="Niveau"
    )
    serie = models.CharField(
        max_length=20,
        choices=SERIE_CHOICES,
        blank=True,
        verbose_name="Série"
    )
    nb_eleves = models.PositiveIntegerField(
        default=0,
        verbose_name="Nombre d'élèves"
    )
    annee_scolaire = models.CharField(
        max_length=20,
        verbose_name="Année scolaire",
        help_text="Ex: 2024-2025"
    )


    class Meta:
        db_table = 'classe'
        verbose_name = "Classe"
        verbose_name_plural = "Classes"
        ordering = ['niveau', 'serie']
        constraints = [
            models.UniqueConstraint(
                fields=['niveau', 'serie', 'annee_scolaire'],
                name='unique_classe_niveau_serie_annee'
            )
        ]
        indexes = [
            models.Index(fields=['niveau']),

        ]

    def __str__(self):
        return f"{self.niveau} - {self.serie}"

    def incrementer_nb_eleves(self):
        """Incrémente le nombre d'élèves"""
        self.nb_eleves += 1
        self.save(update_fields=['nb_eleves'])

    def decrementer_nb_eleves(self):
        """Décrémente le nombre d'élèves"""
        if self.nb_eleves > 0:
            self.nb_eleves -= 1
            self.save(update_fields=['nb_eleves'])



class Matiere(models.Model):
        """
        Représente une matière (Mathématiques, Physique, Français)
        """

        # Définition des choix possibles
        MATH = 'MATH'
        PHYS = 'PHYS'
        FR = 'FR'

        MATIERE_CHOICES = [
            (MATH, 'Mathématiques'),
            (PHYS, 'Physique'),
            (FR, 'Français'),
        ]

        nom_matiere = models.CharField(
            max_length=20,
            choices=MATIERE_CHOICES,
            verbose_name="Nom de la matière",
            default=MATH
        )

        classes_matieres = models.ManyToManyField(Classe, verbose_name="CLASSE_MATIERES")



        class Meta:
            db_table = 'matiere'
            verbose_name = "Matière"
            verbose_name_plural = "Matières"
            ordering = ['nom_matiere']

        def __str__(self):
            return f"{self.nom_matiere}"

class Cours(models.Model):
    numero = models.IntegerField()
    titre = models.CharField()
    description = models.TextField()
    dure_totale = models.IntegerField(null=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)

    #Pour les foreigns
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE)
    clsse = models.ForeignKey(Classe, on_delete=models.CASCADE)

    class Meta:
        db_table = 'cours'
        verbose_name = "cours"
        verbose_name_plural = "cours"
        ordering = ['numero']

    def __str__(self):
        return f"{self.titre} - {self.numero}"

class Chapitre(models.Model):
    titre = models.CharField()
    description = models.TextField()
    numero = models.IntegerField()
    date_creation = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)

    cours = models.ForeignKey(Cours, on_delete=models.CASCADE)

    class Meta:
        db_table = 'chapitre'
        verbose_name = "chapitre"
        verbose_name_plural = "chapitres"
        ordering = ['numero']
    def __str__(self):
        return f"{self.titre} - {self.numero}"

class Ressource(models.Model):
    TYPE_RESSOURCE =[
        ("video", "Video"),
        ("audio", "Audio"),
        ("document", "Document"),

    ]

    titre = models.CharField()
    type_ressource = models.Choices(TYPE_RESSOURCE)
    url_video = models.URLField(null=True)
    fichier =  models.FileField(null=True)
    duree = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    chapitre = models.ForeignKey(Chapitre, on_delete=models.CASCADE)

class ProgressionEleve(models.Model):
    pourcentage_progression = models.IntegerField(default=0)
    est_termine = models.BooleanField(default=False)
    date_debut = models.DateTimeField(auto_now_add=True)
    date_fin = models.DateTimeField(auto_now=True)
    derniere_activite = models.DateTimeField(auto_now=True)
    temps_totale_passe = models.IntegerField(default=0)

    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE)
    cours = models.ForeignKey(Cours, on_delete=models.CASCADE)

class Quiz(models.Model):
    titre = models.CharField()
    description = models.TextField()
    point_max = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    duree_estime = models.IntegerField(default=0)
    fichier = models.FileField(null=True)


    #Foreignkey
    chapitre = models.ForeignKey(Chapitre, on_delete=models.CASCADE)
    cours = models.ForeignKey(Cours, on_delete=models.CASCADE)





class TentativeQuiz(models.Model):
    date_tentative = models.DateTimeField(auto_now_add=True)
    note = models.DecimalField(max_digits=5, decimal_places=2)
    reponses = models.JSONField(null=True)
    estTermine = models.BooleanField(default=False)
    temps_totale_passe = models.IntegerField(default=0)
    commentaire = models.TextField(null=True)

    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE)




