# Generated by Django 3.2.7 on 2021-10-01 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audit',
            name='delete_date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='audit',
            name='modification_date',
            field=models.DateTimeField(),
        ),
    ]