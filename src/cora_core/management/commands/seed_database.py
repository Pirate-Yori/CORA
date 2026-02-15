"""
Commande Django pour seeder la base de données

Usage:
    python manage.py seed_database
    python manage.py seed_database --clear  # Supprime d'abord les données
"""

from django.core.management.base import BaseCommand
from django.db import transaction
from cora_core.models import Classe, Matiere, Cours, Chapitre, Ressource


class Command(BaseCommand):
    help = 'Seed la base de données avec des données réelles du programme ivoirien'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Supprimer toutes les données avant le seeding',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write(self.style.WARNING('🗑️  Suppression des données existantes...'))
            Ressource.objects.all().delete()
            Chapitre.objects.all().delete()
            Cours.objects.all().delete()
            Matiere.objects.all().delete()
            Classe.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('✅ Données supprimées\n'))

        self.stdout.write('\n' + '='*60)
        self.stdout.write(self.style.SUCCESS('🌱 SEEDING DE LA BASE DE DONNÉES'))
        self.stdout.write('   Programme éducatif ivoirien - 3ème et Terminale')
        self.stdout.write('='*60 + '\n')

        with transaction.atomic():
            classes = self.create_classes()
            matieres = self.create_matieres(classes)
            self.create_math_courses(matieres['MATH'])
            self.create_physics_courses(matieres['PHYS'])
            self.create_french_courses(matieres['FR'])

        self.print_statistics()

    def create_classes(self):
        self.stdout.write('📚 Création des classes...')
        
        classes_data = [
            {'niveau': 'troisieme', 'serie': 'general', 'annee_scolaire': '2024-2025'},
            {'niveau': 'terminale', 'serie': 'A', 'annee_scolaire': '2024-2025'},
            {'niveau': 'terminale', 'serie': 'C', 'annee_scolaire': '2024-2025'},
            {'niveau': 'terminale', 'serie': 'D', 'annee_scolaire': '2024-2025'},
        ]
        
        classes = []
        for data in classes_data:
            classe, created = Classe.objects.get_or_create(**data)
            classes.append(classe)
            self.stdout.write(f"  ✓ {classe.niveau} - {classe.serie}")
        
        self.stdout.write(self.style.SUCCESS(f'✅ {len(classes)} classes créées\n'))
        return classes

    def create_matieres(self, classes):
        self.stdout.write('📖 Création des matières...')
        
        troisieme = Classe.objects.get(niveau='troisieme', serie='general')
        terminale_a = Classe.objects.get(niveau='terminale', serie='A')
        terminale_c = Classe.objects.get(niveau='terminale', serie='C')
        terminale_d = Classe.objects.get(niveau='terminale', serie='D')
        
        matieres_data = [
            {
                'nom_matiere': 'MATH',
                'statusColor': 'blue',
                'status': 'active',
                'colorBg': 'bg-blue-500',
                'progressColor': 'blue',
                'progression': 0.0,
                'prochainCours': 'Nombres et Calculs',
                'classes': [troisieme, terminale_a, terminale_c, terminale_d],
            },
            {
                'nom_matiere': 'PHYS',
                'statusColor': 'purple',
                'status': 'active',
                'colorBg': 'bg-purple-500',
                'progressColor': 'purple',
                'progression': 0.0,
                'prochainCours': 'Électricité',
                'classes': [troisieme, terminale_c, terminale_d],
            },
            {
                'nom_matiere': 'FR',
                'statusColor': 'green',
                'status': 'active',
                'colorBg': 'bg-green-500',
                'progressColor': 'green',
                'progression': 0.0,
                'prochainCours': 'Grammaire',
                'classes': [troisieme, terminale_a, terminale_c, terminale_d],
            },
        ]
        
        matieres = {}
        for data in matieres_data:
            classes_list = data.pop('classes')
            matiere, created = Matiere.objects.get_or_create(
                nom_matiere=data['nom_matiere'],
                defaults=data
            )
            matiere.classes_matieres.set(classes_list)
            matieres[matiere.nom_matiere] = matiere
            self.stdout.write(f"  ✓ {matiere.nom_matiere} - {len(classes_list)} classes")
        
        self.stdout.write(self.style.SUCCESS(f'✅ {len(matieres)} matières créées\n'))
        return matieres

    def create_math_courses(self, matiere):
        self.stdout.write('➕ Création des cours de Mathématiques...')
        
        cours_data = [
            {
                'numero': 1,
                'titre': 'Nombres et Calculs',
                'description': 'Étude des nombres rationnels, des puissances et des racines carrées',
                'objectif_pedagogique': 'Maîtriser les opérations sur les nombres et le calcul littéral',
                'duree_totale': 180,
                'chapitres': [
                    {
                        'numero': 1,
                        'titre': 'Nombres rationnels',
                        'description': 'Opérations sur les fractions et les nombres décimaux',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 25},
                            {'type': 'document', 'duree': 15},
                        ]
                    },
                    {
                        'numero': 2,
                        'titre': 'Puissances',
                        'description': 'Puissances de 10, notation scientifique',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 30},
                        ]
                    },
                    {
                        'numero': 3,
                        'titre': 'Racines carrées',
                        'description': 'Calcul et simplification de racines carrées',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 35},
                            {'type': 'audio', 'duree': 20},
                        ]
                    },
                ]
            },
            {
                'numero': 2,
                'titre': 'Calcul littéral',
                'description': 'Développement, factorisation et équations',
                'objectif_pedagogique': 'Maîtriser les techniques de calcul algébrique',
                'duree_totale': 200,
                'chapitres': [
                    {
                        'numero': 1,
                        'titre': 'Développement et réduction',
                        'description': 'Identités remarquables et développement',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 40},
                        ]
                    },
                    {
                        'numero': 2,
                        'titre': 'Factorisation',
                        'description': 'Techniques de factorisation',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 35},
                            {'type': 'document', 'duree': 20},
                        ]
                    },
                ]
            },
            {
                'numero': 3,
                'titre': 'Géométrie plane',
                'description': 'Théorème de Pythagore et de Thalès',
                'objectif_pedagogique': 'Maîtriser les théorèmes fondamentaux de géométrie',
                'duree_totale': 160,
                'chapitres': [
                    {
                        'numero': 1,
                        'titre': 'Théorème de Pythagore',
                        'description': 'Application du théorème dans le triangle rectangle',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 35},
                        ]
                    },
                    {
                        'numero': 2,
                        'titre': 'Théorème de Thalès',
                        'description': 'Proportionnalité et agrandissement',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 40},
                        ]
                    },
                ]
            },
        ]
        
        self.create_courses_with_chapters(matiere, cours_data)
        self.stdout.write(self.style.SUCCESS('✅ Cours de Mathématiques créés\n'))

    def create_physics_courses(self, matiere):
        self.stdout.write('⚗️  Création des cours de Physique-Chimie...')
        
        cours_data = [
            {
                'numero': 1,
                'titre': 'Électricité',
                'description': 'Circuits électriques et lois fondamentales',
                'objectif_pedagogique': 'Comprendre les circuits électriques et leurs lois',
                'duree_totale': 140,
                'chapitres': [
                    {
                        'numero': 1,
                        'titre': 'Circuit électrique simple',
                        'description': 'Dipôles, générateurs, récepteurs',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 25},
                        ]
                    },
                    {
                        'numero': 2,
                        'titre': 'Loi d\'Ohm',
                        'description': 'Tension, intensité, résistance',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 30},
                        ]
                    },
                ]
            },
            {
                'numero': 2,
                'titre': 'Mécanique',
                'description': 'Forces et mouvements',
                'objectif_pedagogique': 'Comprendre les principes de la mécanique',
                'duree_totale': 150,
                'chapitres': [
                    {
                        'numero': 1,
                        'titre': 'Forces et interactions',
                        'description': 'Notion de force, poids, masse',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 30},
                        ]
                    },
                ]
            },
        ]
        
        self.create_courses_with_chapters(matiere, cours_data)
        self.stdout.write(self.style.SUCCESS('✅ Cours de Physique-Chimie créés\n'))

    def create_french_courses(self, matiere):
        self.stdout.write('📝 Création des cours de Français...')
        
        cours_data = [
            {
                'numero': 1,
                'titre': 'Grammaire',
                'description': 'Étude de la langue française',
                'objectif_pedagogique': 'Maîtriser les règles grammaticales',
                'duree_totale': 160,
                'chapitres': [
                    {
                        'numero': 1,
                        'titre': 'Les classes grammaticales',
                        'description': 'Noms, verbes, adjectifs, adverbes',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 30},
                        ]
                    },
                    {
                        'numero': 2,
                        'titre': 'Les fonctions grammaticales',
                        'description': 'Sujet, COD, COI, compléments',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 35},
                        ]
                    },
                ]
            },
            {
                'numero': 2,
                'titre': 'Littérature africaine',
                'description': 'Œuvres et auteurs africains',
                'objectif_pedagogique': 'Découvrir la littérature africaine francophone',
                'duree_totale': 150,
                'chapitres': [
                    {
                        'numero': 1,
                        'titre': 'Auteurs ivoiriens',
                        'description': 'Ahmadou Kourouma, Bernard Dadié',
                        'ressources': [
                            {'type': 'video', 'url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'duree': 35},
                        ]
                    },
                ]
            },
        ]
        
        self.create_courses_with_chapters(matiere, cours_data)
        self.stdout.write(self.style.SUCCESS('✅ Cours de Français créés\n'))

    def create_courses_with_chapters(self, matiere, cours_data):
        for cours_info in cours_data:
            chapitres_data = cours_info.pop('chapitres')
            
            cours = Cours.objects.create(matiere=matiere, **cours_info)
            self.stdout.write(f"  ✓ Cours {cours.numero}: {cours.titre}")
            
            for chapitre_info in chapitres_data:
                ressources_data = chapitre_info.pop('ressources')
                
                chapitre = Chapitre.objects.create(cours=cours, **chapitre_info)
                self.stdout.write(f"    → Chapitre {chapitre.numero}: {chapitre.titre}")
                
                for ressource_info in ressources_data:
                    ressource = Ressource.objects.create(
                        chapitre=chapitre,
                        type_ressource=ressource_info['type'],
                        url_video=ressource_info.get('url'),
                        duree=ressource_info.get('duree'),
                    )
                    self.stdout.write(f"      • {ressource.type_ressource} ({ressource.duree} min)")

    def print_statistics(self):
        self.stdout.write('\n' + '='*60)
        self.stdout.write(self.style.SUCCESS('📊 STATISTIQUES FINALES'))
        self.stdout.write('='*60)
        self.stdout.write(f"Classes créées:     {Classe.objects.count()}")
        self.stdout.write(f"Matières créées:    {Matiere.objects.count()}")
        self.stdout.write(f"Cours créés:        {Cours.objects.count()}")
        self.stdout.write(f"Chapitres créés:    {Chapitre.objects.count()}")
        self.stdout.write(f"Ressources créées:  {Ressource.objects.count()}")
        self.stdout.write('='*60)
        self.stdout.write(self.style.SUCCESS('✅ SEEDING TERMINÉ AVEC SUCCÈS!\n'))
