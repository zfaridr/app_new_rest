# Generated by Django 3.2.12 on 2022-12-28 06:58

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('app_new', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=64)),
                ('last_name', models.CharField(max_length=64)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('birthday_year', models.PositiveIntegerField()),
            ],
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
