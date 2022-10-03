from django.db import models
from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save

User = get_user_model()


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fio = models.CharField(max_length=100, null=True, blank=True)
    position = models.CharField(max_length=100, null=True, blank=True)
    work_phone_num = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    avatar = models.ImageField(upload_to='./static/', null=True, blank=True)


@receiver(post_save, sender=User)
def create_profile_and_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        Profile.objects.create(user=instance)


class Task(MPTTModel):
    TASK_PRIORITY_CHOICE = (
        ('Низкий', 'Низкий'),
        ('Средний', 'Средний'),
        ('Высокий', 'Высокий'),
    )

    TASK_STATUS_CHOICE = (
        ('Открыта', 'Открыта'),
        ('В работе', 'В работе'),
        ('Закрыта', 'Закрыта'),
    )

    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='tasks')
    assignee = models.ManyToManyField(Profile)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    created_at = models.DateField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    deadline = models.DateField()
    is_active = models.BooleanField(default=True)
    status = models.CharField(max_length=100, choices=TASK_STATUS_CHOICE, default='Открыта')
    priority = models.CharField(max_length=100, choices=TASK_PRIORITY_CHOICE, default='low')
    file = models.FileField(verbose_name='static', null=True)

    def __str__(self):
        return self.title

    class MPTTMeta:
        order_insertion_by = ['title']


class Comment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text


class Report(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='author')
    assignee = models.ManyToManyField(Profile)
    content = models.TextField(blank=True)
    task = models.OneToOneField(Task, on_delete=models.CASCADE, null=True, blank=True, related_name='report')
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(verbose_name='static/', null=True)

    def __str__(self):
        return self.content
