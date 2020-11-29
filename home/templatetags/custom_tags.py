from django import template
from home.models import Picture
register = template.Library()


@register.simple_tag
def get_pic(map_id):
    pic = Picture.objects.all().filter(map_id=map_id).first().image.url
    return pic
