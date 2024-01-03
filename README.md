First you need to start minikube

$ minikube start

After that, you can enable ingress if you want to use ingress for your application
$ minikube addons enable ingress

Now, create persistent volume and persistent volume claim
$ kubectl apply -f pv.yml

Deploy mysql database on minikube locally
$ kubectl apply -f mysql-db.yml

To see the deployment
$ kubectl get pods

After successful deployment, 

$kubectl exec -it <mysql pod name> -- /bin/bash

you will enter the pod, run the b
#mysql -h mysql -u root -p
