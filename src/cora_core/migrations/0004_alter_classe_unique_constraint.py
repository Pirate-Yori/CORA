# Generated manually to fix unique constraint

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cora_core', '0003_rename_aaclasse_niveau_3d04ab_idx_classe_niveau_673396_idx_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='classe',
            unique_together=set(),
        ),
        migrations.AddConstraint(
            model_name='classe',
            constraint=models.UniqueConstraint(fields=['niveau', 'serie', 'annee_scolaire'], name='unique_classe_niveau_serie_annee'),
        ),
    ]

