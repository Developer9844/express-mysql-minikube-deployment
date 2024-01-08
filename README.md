First you need to start minikube

$ minikube start

After that, you can enable ingress if you want to use ingress for your application
$ minikube addons enable ingress

########################### SEALED SECRETS #######################################################

$ kubectl apply -f controller.yaml

*Install kubeseal* 

*Important*

$ echo -n <password in plaintext> | kubectl create secret generic mysecret --dry-run=client --from-file=<key>=/dev/stdin -o yaml > <filename-secret>.yaml

$ kubeseal --format=yaml < secret.yaml > filename-sealed.yaml

$ kubectl apply -f <filename-sealed>.yaml

$ kubectl get secrets <secret-name> -oyaml


################ ARGO CD ######################################

kubectl create namespace argocd

ubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo









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
