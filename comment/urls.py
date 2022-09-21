from django.urls import path
from . import views

urlpatterns = [
    path('auth/me/', views.LoginView.as_view(), name='loginchik'),
    path('comment/create', views.CommentCreate.as_view(), name='comment-create'),
    path('comments/retrieve/<int:pk>', views.CommentRetrieve.as_view(), name='comment-retrieve'),
    path('comments/update/<int:pk>', views.CommentUpdate.as_view(), name='comment-update'),
    path('comments/delete/<int:pk>', views.CommentDelete.as_view(), name='comment-delete'),
    path('tasks/', views.TaskList.as_view(), name='tasks-list'),
    path('task/create/', views.TaskCreate.as_view(), name='task-create'),
    path('task/update/<int:pk>', views.TaskUpdate.as_view(), name='task-update'),
    path('task/delete/<int:pk>', views.TaskDelete.as_view(), name='task-delete'),
    path('task/retrieve/<int:pk>', views.TaskRetrieve.as_view(), name='task-delete'),
    path('report/', views.ReportList.as_view(), name='report-list'),
    path('report/create/', views.ReportCreate.as_view(), name='report-create'),
    path('report/update/<int:pk>', views.ReportUpdate.as_view(), name='report-update'),
    path('report/delete/<int:pk>', views.ReportDelete.as_view(), name='report-delete'),
    path('profile/', views.ProfileList.as_view(), name='profile-list'),
    path('profile/retrieve/<int:pk>', views.ProfileRetrieve.as_view(), name='profile-retrieve'),
    path('profile/update/<int:pk>', views.ProfileUpdate.as_view(), name='profile-update'),
    path('profile/delete/<int:pk>', views.ProfileDelete.as_view(), name='profile-delete'),
]
