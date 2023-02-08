from django.db import models
from uuid import uuid4

class User(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    user_id = str(id)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField(unique=True)
    birthday_year = models.DateField()
    is_superuser = models.CharField(max_length=64)
    is_staff = models.CharField(max_length=64)

    def __str__(self):
        return self.user_id


class Project(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    project_id = str(id)
    project_name = models.CharField(max_length=64)
    start_date = models.DateField
    finish_date = models.DateField
    participants = models.ManyToManyField(User)

    def __str__(self):
        return self.project_id

class ToDo(models.Model):
    text = models.TextField(max_length=64)
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    init_user = models.OneToOneField(User, on_delete=models.CASCADE)
    init_date = models.DateField
    changes_date = models.DateField





# Create your models here.
