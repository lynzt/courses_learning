# vectorization
# u = Av
# A is matrix
# v is vector
u = np.dot(A,v)


# apply opperation to ever element of matrix/vector
np.exp(v)
np.log(v)
np.abs(v)
np.max(v, 0)
v**2 # element wise square
1/v # element wise inverse





# more vectorization examples - converting for loops to vector math
J = 0
dw1 = 0
dw2 = 0
db = 0

for i = 1 to m:
    z[i] = wT x[i] + b
    a[i] = sigmoid(z[i])
    J += -[y[i] log y^[i] + (1-y[i]) log(1-y^[i])]
    dz[i] = a[i] * (1-a[i])
    db += dz[i]
    for j = 1 to N:
        dw[j] += x[j][i] * dz[i]
        dw[j] += x[j][i] * dz[i]



# 2nd for loop becomes... make dw a vector
dw = np.zeros((N-x, 1))
dw += x[i] * dz[i]









# vectorizing logistic regression
z[0] = wT * x[0] + b
z[1] = wT * x[1] + b
z[2] = wT * x[2] + b
# (etc...)

 Z = np.dot(wT, X) + b

dZ = A - Y # for all m
 # broadcasting - taking number (b) and expanding to 1 x m vector

db = 1/m * np.sum(dZ)




### broadcasting
import numpy as np

A = np.array([[56.0, 0.0, 4.4, 68.0],
             [1.2, 104.0, 52.0, 8.0],
             [1.8, 135.0, 99.0, 0.9] ])
print (A)

cal = A.sum(axis=0)
print (cal)

percentage = 100 * A/cal.reshape(1,4)
print (percentage)
