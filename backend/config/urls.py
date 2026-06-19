from django.contrib import admin
from django.urls import path, include

# ✅ ADD THESE
from django.conf import settings
from django.conf.urls.static import static


# refreshtoken
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),

    #  api routes
    path('', include('api.urls')),
    # JWT Refresh Endpoint
    path(
        'auth/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),
]

# ✅ IMPORTANT: serve uploaded files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)