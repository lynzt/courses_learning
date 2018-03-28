
# coding: utf-8

# In[3]:


get_ipython().run_line_magic('matplotlib', 'inline')
import numpy as np
import matplotlib.pyplot as plt
plt.style.use('ggplot')


# In[4]:


# load 100 imgs from celebfaces ds
from libs import utils
files = utils.get_celeb_files()


# In[5]:


# get 50th img
img = plt.imread(files[50])
print(img)


# In[6]:


# draw img
plt.imshow(img)


# In[7]:


# 218 rows, 178 cols, 3 color channels (rgb)
img.shape


# In[8]:


plt.imshow(img[:,:,0], cmap='gray') # only red


# In[9]:


plt.imshow(img[:,:,1], cmap='gray') # only green


# In[10]:


plt.imshow(img[:,:,2], cmap='gray') # only blue


# In[11]:


# load first 100 imgs
imgs = utils.get_celeb_imgs()


# In[12]:


# display img
plt.imshow(imgs[0])


# In[13]:


imgs[0].shape


# In[14]:


# batch dimension - (imgs, height, width, nbr channels)
# combine all imgs to have 4 dimensions in an array 
# all imgs must be same size to use...
data = np.array(imgs)
data.shape


# In[15]:


# mean of batch channel - 
# reduce data down to single representation of what the dataset looks like
mean_img = np.mean(data, axis=0)
plt.imshow(mean_img.astype(np.uint8))


# In[16]:


# show where changes are likely to be in data
# where and how much variance from mean
std_img = np.std(data, axis=0)
plt.imshow(std_img.astype(np.uint8))


# In[17]:


# avg variance over all channels (mean)
# on average, how color will vary
# more red - mean image not best representation - more blue - mean image closer...
plt.imshow(np.mean(std_img, axis=2).astype(np.uint8))


# In[19]:


# preprocessing (remove mean and sd)
# normalize => subtract mean and divide by sd 

# convert data into 1D array
flattened = data.ravel()
print(data[:1])
print(flattened[:10])


# In[20]:


# visualize distribution (range) and frequency
# histogram of ever value in vector, use 255 bins 
# bin groups range of data and bars describe frequency of range.
plt.hist(flattened.ravel(), 255)


# In[21]:


# subtract mean img (data) from image - 
# left with part of img that is unique to image
# orig img centered around value 100... now centered around 0
# seeing distribution of vals that were above and below mean image intensity
bins = 20
fig, axs = plt.subplots(1, 3, figsize=(12, 6), sharey=True, sharex=True)
axs[0].hist((data[0]).ravel(), bins)
axs[0].set_title('img distribution')
axs[1].hist((mean_img).ravel(), bins)
axs[1].set_title('mean distribution')
axs[2].hist((data[0] - mean_img).ravel(), bins)
axs[2].set_title('(img - mean) distribution')


# In[22]:


# divide by sd
fig, axs = plt.subplots(1, 3, figsize=(12, 6), sharey=True, sharex=True)
axs[0].hist((data[0] - mean_img).ravel(), bins)
axs[0].set_title('(img - mean) distribution')
axs[1].hist((std_img).ravel(), bins)
axs[1].set_title('std deviation distribution')
axs[2].hist(((data[0] - mean_img) / std_img).ravel(), bins)
axs[2].set_title('((img - mean) / std_dev) distribution')


# In[23]:


# scale range -3 to 3
axs[2].set_xlim([-150, 150])
axs[2].set_xlim([-100, 100])
axs[2].set_xlim([-50, 50])
axs[2].set_xlim([-10, 10])
axs[2].set_xlim([-5, 5])

