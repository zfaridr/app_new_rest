from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User, Project, ToDo
from rest_framework import serializers


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProjectModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ToDoModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'
