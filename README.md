# ML_bne
Using machine learning methods to predict Brazil Nut Effect output.

## Simulation
The data input of the model are obtained from simulation of Brazil Nut Effect simulation based on molecular dynamic method.<br>
The demo can be accessed here: https://raw.githack.com/miqbalrp/ML_bne/main/simulation/src/bne_single.html <br>

## Previous Studies
Some of related research:
* `Kesuma et al 2016`: "As the system vibrated at &Gamma; = 5, the intruder rise time observed as a function of contactopy from the initial configurations. It shows that the rise time in average tends to decrease as the number of contactopy increases."
https://iopscience.iop.org/article/10.1088/1755-1315/31/1/012001 
![image](https://user-images.githubusercontent.com/38918617/120106543-8f120280-c187-11eb-93d7-2ad1154db56a.png)
* `Ain et al 2016`: If the top of the bed is already HCP, BNE can be blocked (the intruder can no longer rise). 
https://iopscience.io.org/article/10.1088/1742-6596/739/1/012135
* `Putra et al 2019`: The network of the bed changes as the intruder rises.
https://iopscience.iop.org/article/10.1088/1757-899X/546/5/052057</br>![image](https://user-images.githubusercontent.com/38918617/120106642-1eb7b100-c188-11eb-9966-4d9c413be6f5.png)
* `Clamarra et al 2006`: Relation between density, diameter, and &Gamma; to BNE/RBNE. </br> ![image](https://user-images.githubusercontent.com/38918617/120123868-9531ce80-c1db-11eb-95e5-3147445f9d73.png)


## Work Report
`2021/05/30` 
* Simulation modification to perform determined (non-random) variations in vibration frequency, bed density and intruder density with fix initial position of system. 
* Simulation: https://raw.githack.com/miqbalrp/ML_bne/main/simulation/src/bne_single_rho.html
* Initial position: </br>![image](https://user-images.githubusercontent.com/38918617/120110331-3ba7b080-c197-11eb-878d-b0953fdad09b.png)
* Densities are varied from 700, 720, 740, ... 880
* Frequencies are varied from 5, 10, 15, ...
* Relation of intruder and bed density with normalized acceleration can be shown below (for f=5,10,15): </br> ![newplots](https://user-images.githubusercontent.com/38918617/120123636-2607aa80-c1da-11eb-98fd-d360348c8f50.png)


