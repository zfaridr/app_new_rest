from rest_framework.viewsets import ModelViewSet
from .models import User, Project, ToDo
from .serializers import UserModelSerializer, ProjectModelSerializer, ToDoModelSerializer
from rest_framework.pagination import LimitOffsetPagination

class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
      

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    
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
    

    


