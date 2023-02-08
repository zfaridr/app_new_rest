from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, viewsets
from .models import User, Project, ToDo
from .serializers import UserModelSerializer, ProjectModelSerializer, ToDoModelSerializer, UserSerializerWithAddInfo
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import generics


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    
    def get_serializer_class(self):
        if self.request.version == '1.2':
            return UserSerializerWithAddInfo
            return UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [permissions.IsAuthenticated]
      

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        
    
    def get_queryset(self):
        name = self.request.query_params.get('project_name')
        projects = Project.objects.all()
        if name:
            project = Project.filter(name__contains=name)
        return projects

class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    permission_classes = [permissions.IsAuthenticated]
    

    


