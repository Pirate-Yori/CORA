from django.db import models

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
        unique_together = [['niveau', 'annee_scolaire']]
        indexes = [
            models.Index(fields=['niveau']),

        ]

    def __str__(self):
        return f"{self.niveau} - {self.annee_scolaire}"

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
