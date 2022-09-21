from rest_framework import generics, permissions
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from comment.models import Comment, Task, Report, Profile
from comment.serializer import CommentSerializer, TaskSerializer, ReportTaskSerializer, AuthUserSerializer, \
    ProfileSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


class LoginView(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        print(request.auth)
        user = get_object_or_404(Token, key=request.auth)
        serializer = AuthUserSerializer(user)
        return Response(serializer.data)


class CommentCreate(ListCreateAPIView):
    model = Comment
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class CommentRetrieve(RetrieveAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]


class CommentUpdate(UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]


class CommentDelete(DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]


class TaskList(ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]


class TaskRetrieve(RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]


class TaskCreate(ListCreateAPIView):
    model = Task
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]


class TaskUpdate(UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]


class TaskDelete(DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReportList(ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportTaskSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReportCreate(ListCreateAPIView):
    model = Report
    queryset = Report.objects.all()
    serializer_class = ReportTaskSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReportUpdate(UpdateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportTaskSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReportDelete(DestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportTaskSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProfileList(ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProfileUpdate(UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileRetrieve(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProfileDelete(DestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
