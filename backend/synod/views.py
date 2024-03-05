from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET', 'POST'])
def send_some_data(request):
    if(request.method == "POST"):
        return Response({"data": request.data})
    return Response({"msg": "Reponse for GET method"})