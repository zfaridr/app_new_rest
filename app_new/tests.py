import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserModelViewSet, ToDoModelViewSet, ProjectModelViewSet
from .models import User, ToDo, Project

class TestUserViewSet(TestCase):
    

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'id': 23, 'first_name': 'vvvv',
        'last_name': 'fffff', 'email': 'rrt@newmail.ru', 'birthday_year': 1999}, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail(self):
        user = User.objects.create(first_name = 'vvvv',
        last_name = 'fffff', email = 'rrt@newmail.ru', birthday_year = 1999)
        client = APIClient()
        response = client.get(f'/api/Users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    
class TestMath(APISimpleTestCase):
    def test_sqrt(self):
        import math
        self.assertEqual(math.sqrt(4), 2)

