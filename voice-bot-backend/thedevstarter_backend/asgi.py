"""
ASGI config for thedevstarter_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

import django_async_stream
from django.core.asgi import get_asgi_application
from thedevstarter_backend import settings



application = get_asgi_application()


django_async_stream.patch_application(application)
