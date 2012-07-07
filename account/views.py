from django.shortcuts import render_to_response
#from django.contrib.auth.models import User
from account.forms import RegisterForm
from django.http import HttpResponseRedirect
from django.template import RequestContext #para hacer funcionar {% csrf_token %}

#Django Auth
#from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required

# import code for encoding urls and generating md5 hashes --  GRAVATAR
import urllib, hashlib

def newUser(request):
    if request.method == "POST":
        formulario = RegisterForm(request.POST)
        if formulario.is_valid():
            formulario.save()
            return HttpResponseRedirect('/')
    else:
        formulario = RegisterForm()
    return render_to_response('account/newUser.html',{'formNewUser': formulario}, context_instance=RequestContext(request))
#    return render_to_response('account/newUser.html',{}, context_instance = RequestContext(request))                
   
def log_in(request):
    if not request.user.is_anonymous():
        return HttpResponseRedirect('/account/')
    if request.method == 'POST':
        formulario = AuthenticationForm(request.POST)     
        if formulario.is_valid:
            usuario = request.POST['username']
            clave = request.POST['password']
            acceso = authenticate(username=usuario, password=clave)  
            if acceso is not None:
                if acceso.is_active:
                    login(request, acceso)
                    return HttpResponseRedirect('/account/')
                else:
                    return render_to_response('account/status.html', context_instance = RequestContext(request))
            else:
                return render_to_response('account/newUser.html', context_instance = RequestContext(request))
    else:
        formulario = AuthenticationForm()   
    return render_to_response('account/login.html',{'formulario':formulario}, context_instance = RequestContext(request))
                
                
@login_required(login_url='/account/login')
def myAccount(request):
    usuario = request.user
    #GRAVATAR
    # Set your variables here
    if request.user.is_authenticated():
        email = request.user.email
        default = "http://cms.myspacecdn.com/cms/Music%20Vertical/Common/Images/default_small.jpg"
        size = 100
        
        # construct the url
        gravatar_url = "http://www.gravatar.com/avatar/" + hashlib.md5(email.lower()).hexdigest() + "?"
        gravatar_url += urllib.urlencode({'d':default, 's':str(size)})
    else:
        gravatar_url = "/static/website/img/default.png"
   
    return render_to_response('account/index.html',{'user':usuario, 'gravatar_url': gravatar_url}, context_instance = RequestContext(request))
    #return render_to_response('account/index.html',{"user":"MAuricio"}, context_instance = RequestContext(request))                
                
@login_required(login_url='/account/login')
def log_out(request):
    logout(request)
    return HttpResponseRedirect('/')
