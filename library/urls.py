"""library URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app_new.views import UserModelViewSet, ProjectModelViewSet, ToDoModelViewSet
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import path
from graphene_django.views import GraphQLView

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)

filter_router = DefaultRouter()
filter_router.register('project_name', ProjectModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('filters/', include(filter_router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    re_path(r'^api/(?P<version>\d\.\d)/users/$', UserListAPIView.as_view()),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path("graphql/", GraphQLView.as_view(graphiql=True)),
]

schema_view = get_schema_view(
    openapi.Info(
        title="ToDo",
        default_version='1.2',
        description="Documentation of the project",
        contact=openapi.Contact(email="zainullovfr@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)