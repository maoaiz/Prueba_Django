# Create your views here.
from django.shortcuts import render_to_response
from django.template import RequestContext

def index(request):
    return render_to_response('website/index.html', None, context_instance = RequestContext(request))
