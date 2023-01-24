from django.contrib.auth import get_user_model
from rest_framework import serializers
from comment.models import Comment, Task, Report, Profile
from rest_framework.authtoken.models import Token

user = get_user_model()


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('user',)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'fio', 'position', 'work_phone_num', 'email', 'avatar', 'id')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('task', 'author', 'text', 'created_at')


class ReportTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('author', 'assignee', 'content', 'task', 'created_at', 'file')


class TaskSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    report = ReportTaskSerializer(read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'author', 'assignee', 'title', 'description',
                  'parent', 'created_at', 'update_at', 'deadline', 'progress',
                  'is_active', 'status', 'priority', 'file', 'comments', 'report')
