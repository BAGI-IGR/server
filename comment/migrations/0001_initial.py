# Generated by Django 4.1.4 on 2023-01-24 12:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import mptt.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fio', models.CharField(blank=True, max_length=100, null=True)),
                ('position', models.CharField(blank=True, max_length=100, null=True)),
                ('work_phone_num', models.CharField(blank=True, max_length=20, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='./frontend/src/files/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('deadline', models.DateField()),
                ('progress', models.CharField(blank=True, default='0', max_length=3, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('status', models.CharField(choices=[('Открыта', 'Открыта'), ('В работе', 'В работе'), ('Закрыта', 'Закрыта')], default='Открыта', max_length=100)),
                ('priority', models.CharField(choices=[('Низкий', 'Низкий'), ('Средний', 'Средний'), ('Высокий', 'Высокий')], default='low', max_length=100)),
                ('file', models.FileField(null=True, upload_to='', verbose_name='files/')),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('assignee', models.ManyToManyField(to='comment.profile')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='comment.profile')),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='comment.task')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('file', models.FileField(null=True, upload_to='', verbose_name='files/')),
                ('assignee', models.ManyToManyField(to='comment.profile')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author', to='comment.profile')),
                ('task', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='report', to='comment.task')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='comment.profile')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='comment.task')),
            ],
        ),
    ]
