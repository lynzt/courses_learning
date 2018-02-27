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
