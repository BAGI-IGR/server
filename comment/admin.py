from django.contrib import admin
from comment.models import *


class CommentAdmin(admin.TabularInline):
    model = Comment


admin.site.register(Comment)
admin.site.register(Task)
admin.site.register(Profile)
