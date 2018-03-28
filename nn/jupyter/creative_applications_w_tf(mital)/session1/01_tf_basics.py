
# coding: utf-8

# In[22]:


import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt


# In[5]:


# create range of 100 nbrs from -3 to 3
# linspace => create row vector w/ n linearly spaced elements between min/max
x = np.linspace(-3.0, 3.0, 100)
# immediately have result
print(x)
print (x.shape)
print (x.dtype)


# In[12]:


# tf tensor
x = tf.linspace(-3.0, 3.0, 100)
print (x)


# In[7]:


# graphs
g = tf.get_default_graph()


# In[8]:


[op.name for op in g.get_operations()]


# In[10]:


# ask for tf.tensor that comes from LinSpace
g.get_tensor_by_name('LinSpace:0')


# In[14]:


# sessions
# create session
sess = tf.Session()

# compute anything created in tf graph
computed_x = sess.run(x)
print (computed_x)

# evaluate itself using this session
computed_x = x.eval(session=sess)
print (computed_x)

sess.close()


# In[15]:


# default grabs default graph but could create new graph
g2 = tf.Graph()


# In[16]:


sess = tf.InteractiveSession()
x.eval()


# In[17]:


# tensor shapes
print (x.get_shape())

# pretty...
print (x.get_shape().as_list())


# In[20]:


# add operations to graph...
# gaussian (bell curve)
mean = 0.0
sigma = 1.0

z = (tf.exp(tf.negative(tf.pow(x - mean, 2.0) /
                   (2.0 * tf.pow(sigma, 2.0)))) *
     (1.0 / (sigma * tf.sqrt(2.0 * 3.1415))))


# In[23]:


res = z.eval()
plt.plot(res)


# # convolution
# 2D gaussian kernel

# In[24]:


# number of values in gaussian curve 
ksize = z.get_shape().as_list()[0]

# multiply 2 to get 2d gaussian (mult by transpose)
z_2d = tf.matmul(tf.reshape(z, [ksize, 1]), tf.reshape(z, [1, ksize]))

plt.imshow(z_2d.eval())


# In[27]:


# load grayscale img
from skimage import data
img = data.camera().astype(np.float32)
plt.imshow(img, cmap='gray')
print(img.shape)


# In[28]:


# reshape image to be 4D - nbr_images, height, width, channels
# np reshape
# img_4d = img.reshape([1, img.shape[0], img.shape[1], 1])

# tf reshape
img_4d = tf.reshape(img, [1, img.shape[0], img.shape[1], 1])
print (img_4d)


# In[31]:


# get shape params...
print (img_4d.get_shape())
print (img_4d.get_shape().as_list())


# In[32]:


# kernel size
# reshape 2d kernel to tf...
z_4d = tf.reshape(z_2d, [ksize, ksize, 1, 1])
print (z_4d.get_shape().as_list())


# In[33]:


# convolve using gaussian kernel
# strides => how to move kernal across img
# padding = 'SAME' => want same dimensions in as out
convolved = tf.nn.conv2d(img_4d, z_4d, strides=[1, 1, 1, 1], padding='SAME')
res = convolved.eval()
print (res.shape)


# In[35]:


# plot image but first convert from 4d to 2d
plt.imshow(np.squeeze(res), cmap='gray')

# exact dimensions
plt.imshow(res[0, :, :, 0], cmap='gray')


# In[37]:


# modulate gaussian w/ sine wave to create gabor kernel
# set of vals the same range as gaussian
xs = tf.linspace(-3.0, 3.0, ksize)


# In[40]:


# calc sine of these values
ys = tf.sin(xs)
plt.figure()
plt.plot(ys.eval())


# In[43]:


# resize vector to Nx1 matrix
ys = tf.reshape(ys, [ksize, 1])


# In[44]:


# convert 1D vecotr to matrix (Nx1)
ones = tf.ones((1, ksize))
wave = tf.matmul(ys, ones)
plt.imshow(wave.eval(), cmap='gray')


# In[45]:


gabor = tf.multiply(wave, z_2d)
plt.imshow(gabor.eval(), cmap='gray')


# In[47]:


# manipulate img w/ gabor
img = tf.placeholder(tf.float32, shape=[None, None], name='img')

# reshape 2d img to 3d tensor
img_3d = tf.expand_dims(img, 2)
dims = img_3d.get_shape()
print (dims)

img_4d = tf.expand_dims(img_3d, 0)
print (img_4d.get_shape().as_list())


# In[50]:


# more placeholders for gabor's params
mean = tf.placeholder(tf.float32, name='mean')
sigma = tf.placeholder(tf.float32, name='sigma')
ksize = tf.placeholder(tf.int32, name='ksize')

# convolve image
x = tf.linspace(-3.0, 3.0, ksize)
z = (tf.exp(tf.negative(tf.pow(x - mean, 2.0) /
                   (2.0 * tf.pow(sigma, 2.0)))) *
      (1.0 / (sigma * tf.sqrt(2.0 * 3.1415))))

z_2d = tf.matmul(
  tf.reshape(z, tf.stack([ksize, 1])),
  tf.reshape(z, tf.stack([1, ksize])))
ys = tf.sin(x)
ys = tf.reshape(ys, tf.stack([ksize, 1]))
ones = tf.ones(tf.stack([1, ksize]))
wave = tf.matmul(ys, ones)
gabor = tf.multiply(wave, z_2d)
gabor_4d = tf.reshape(gabor, tf.stack([ksize, ksize, 1, 1]))

# And finally, convolve the two:
convolved = tf.nn.conv2d(img_4d, gabor_4d, strides=[1, 1, 1, 1], padding='SAME', name='convolved')
convolved_img = convolved[0, :, :, 0]


# In[52]:


convolved_img.eval()


# In[53]:


res = convolved_img.eval(feed_dict={
    img: data.camera(), mean:0.0, sigma:1.0, ksize:100})
plt.imshow(res, cmap='gray')


# In[54]:


# specify different placeholders...
res = convolved_img.eval(feed_dict={
    img: data.camera(),
    mean: 0.0,
    sigma: 0.5,
    ksize: 32
  })
plt.imshow(res, cmap='gray')

