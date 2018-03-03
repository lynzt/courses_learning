
# coding: utf-8

# In[1]:


# orig source: https://github.com/llSourcell/recommender_live/blob/master/Song%20Recommender_Python.ipynb
# yt vid: https://youtu.be/18adykNGhHU
# links...
# cf: # https://cambridgespark.com/content/tutorials/implementing-your-own-recommender-systems-in-Python/index.html
# co-occurance (item based): https://blogs.msdn.microsoft.com/carlnol/2012/06/23/co-occurrence-approach-to-an-item-based-recommender/
# precision recall: http://aimotion.blogspot.com/2011/05/evaluating-recommender-systems.html

get_ipython().run_line_magic('matplotlib', 'inline')

import pandas
from sklearn.model_selection import train_test_split
import numpy as np
import time
from sklearn.externals import joblib
import Recommenders as Recommenders
import Evaluation as Evaluation



# In[2]:



#Read userid-songid-listen_count triplets
#This step might take time to download data from external sources
triplets_file = 'https://static.turi.com/datasets/millionsong/10000.txt'
songs_metadata_file = 'https://static.turi.com/datasets/millionsong/song_data.csv'

song_df_1 = pandas.read_table(triplets_file,header=None)
song_df_1.columns = ['user_id', 'song_id', 'listen_count']

#Read song  metadata
song_df_2 =  pandas.read_csv(songs_metadata_file)

#Merge the two dataframes above to create input dataframe for recommender systems
song_df = pandas.merge(song_df_1, song_df_2.drop_duplicates(['song_id']), on="song_id", how="left")


# In[3]:


# print data
song_df.head()


# In[4]:


# how big is dataset?
len(song_df)


# In[5]:


# create subset of data w/ only 10,000 rows to process...
song_df = song_df.head(10000)

#Merge song title and artist_name columns to make a merged column (we don't care about artist only songs)
song_df['song'] = song_df['title'].map(str) + " - " + song_df['artist_name']


# In[6]:


# group by listen_count (desc)
song_grouped = song_df.groupby(['song']).agg({'listen_count': 'count'}).reset_index()
# sum of listen_count
grouped_sum = song_grouped['listen_count'].sum()
# calc percentage... (listen_count / sum) * 100
song_grouped['percentage']  = song_grouped['listen_count'].div(grouped_sum)*100
#  display results sorted by listen_count, song...
song_grouped.sort_values(['listen_count', 'song'], ascending = [0,1])


# In[7]:


# get unique users
users = song_df['user_id'].unique()


# In[8]:


len(users)


# In[9]:


# unique songs
songs = song_df['song'].unique()
len(songs)


# In[10]:


# split data into training and test data... (80% training, 20% testing)
train_data, test_data = train_test_split(song_df, test_size = 0.20, random_state=0)
print(train_data.head(5))


# In[11]:


# Simple popularity-based recommender class (Can be used as a black box)
# create instance of popularity based recomender class
# count how many users "like" the song - that is score...
pm = Recommenders.popularity_recommender_py()
pm.create(train_data, 'user_id', 'song')


# In[14]:


# basic approach - not personalized (same for all users)
# top 10 recommended songs in general
user_id = users[5]
pm.recommend(user_id)


# In[15]:


# basic approach - not personalized (same for all users)
# top 10 recommended songs in general
user_id = users[8]
pm.recommend(user_id)


# In[16]:


# item based similarity based prs
is_model = Recommenders.item_similarity_recommender_py()
is_model.create(train_data, 'user_id', 'song')


# In[17]:


# Collaborative Filtering...
#Print the songs for the user in training data
user_id = users[5]
user_items = is_model.get_user_items(user_id)
#
print("------------------------------------------------------------------------------------")
print("Training data songs for the user userid: %s:" % user_id)
print("------------------------------------------------------------------------------------")

for user_item in user_items:
    print(user_item)

print("----------------------------------------------------------------------")
print("Recommendation process going on:")
print("----------------------------------------------------------------------")

#Recommend songs for the user using personalized model
is_model.recommend(user_id)


# In[18]:


# Collaborative Filtering...
#Print the songs for the user in training data
user_id = users[8]
user_items = is_model.get_user_items(user_id)
#
print("------------------------------------------------------------------------------------")
print("Training data songs for the user userid: %s:" % user_id)
print("------------------------------------------------------------------------------------")

for user_item in user_items:
    print(user_item)

print("----------------------------------------------------------------------")
print("Recommendation process going on:")
print("----------------------------------------------------------------------")

#Recommend songs for the user using personalized model
is_model.recommend(user_id)


# In[19]:


# apply model to find similar song to another song
is_model.get_similar_items(['U Smile - Justin Bieber'])


# In[20]:


# compare between popularity-based and cf (item - item) using precision & recall
start = time.time()

#Define what percentage of users to use for precision recall calculation
user_sample = 0.05

#Instantiate the precision_recall_calculator class
pr = Evaluation.precision_recall_calculator(test_data, train_data, pm, is_model)

#Call method to calculate precision and recall values
(pm_avg_precision_list, pm_avg_recall_list, ism_avg_precision_list, ism_avg_recall_list) = pr.calculate_measures(user_sample)

end = time.time()
print(end - start)


# In[21]:


# plot percision recall
import pylab as pl

#Method to generate precision and recall curve
def plot_precision_recall(m1_precision_list, m1_recall_list, m1_label, m2_precision_list, m2_recall_list, m2_label):
    pl.clf()    
    pl.plot(m1_recall_list, m1_precision_list, label=m1_label)
    pl.plot(m2_recall_list, m2_precision_list, label=m2_label)
    pl.xlabel('Recall')
    pl.ylabel('Precision')
    pl.ylim([0.0, 0.20])
    pl.xlim([0.0, 0.20])
    pl.title('Precision-Recall curve')
    #pl.legend(loc="upper right")
    pl.legend(loc=9, bbox_to_anchor=(0.5, -0.2))
    pl.show()
    

print("Plotting precision recall curves.")

plot_precision_recall(pm_avg_precision_list, pm_avg_recall_list, "popularity_model",
                      ism_avg_precision_list, ism_avg_recall_list, "item_similarity_model")


# In[23]:


# Matrix Factorization based Recommender System
# Singular Value Decomposition (svd)
# vectorize 

import math as mt
import csv
from sparsesvd import sparsesvd #used for matrix factorization
import numpy as np
from scipy.sparse import csc_matrix #used for sparse matrix
from scipy.sparse.linalg import * #used for matrix multiplication

#Note: You may need to install the library sparsesvd. Documentation for 
#sparsesvd method can be found here:
#https://pypi.python.org/pypi/sparsesvd/


# In[24]:


#constants defining the dimensions of our User Rating Matrix (URM)
MAX_PID = 4
MAX_UID = 5

#Compute SVD of the user ratings matrix
def computeSVD(urm, K):
    U, s, Vt = sparsesvd(urm, K)

    dim = (len(s), len(s))
    S = np.zeros(dim, dtype=np.float32)
    for i in range(0, len(s)):
        S[i,i] = mt.sqrt(s[i])

    U = csc_matrix(np.transpose(U), dtype=np.float32)
    S = csc_matrix(S, dtype=np.float32)
    Vt = csc_matrix(Vt, dtype=np.float32)
    
    return U, S, Vt

#Compute estimated rating for the test user
def computeEstimatedRatings(urm, U, S, Vt, uTest, K, test):
    rightTerm = S*Vt 

    estimatedRatings = np.zeros(shape=(MAX_UID, MAX_PID), dtype=np.float16)
    for userTest in uTest:
        prod = U[userTest, :]*rightTerm
        #we convert the vector to dense format in order to get the indices 
        #of the movies with the best estimated ratings 
        estimatedRatings[userTest, :] = prod.todense()
        recom = (-estimatedRatings[userTest, :]).argsort()[:250]
    return recom


# In[26]:


#Used in SVD calculation (number of latent factors)
K=2

#Initialize a sample user rating matrix
urm = np.array([[3, 1, 2, 3],[4, 3, 4, 3],[3, 2, 1, 5], [1, 6, 5, 2], [5, 0,0 , 0]])
urm = csc_matrix(urm, dtype=np.float32)

#Compute SVD of the input user ratings matrix
# U => user vector, S => item vector, Vt => (t means transpose)... combine points in 2D space
U, S, Vt = computeSVD(urm, K)

#Test user set as user_id 4 with ratings [0, 0, 5, 0]
uTest = [4]
print("User id for whom recommendations are needed: %d" % uTest[0])

#Get estimated rating for test user
print("Predictied ratings:")
uTest_recommended_items = computeEstimatedRatings(urm, U, S, Vt, uTest, K, True)
print(uTest_recommended_items)


# In[27]:


get_ipython().run_line_magic('matplotlib', 'inline')
from pylab import *

#Plot all the users
print("Matrix Dimensions for U")
print(U.shape)

for i in range(0, U.shape[0]):
    plot(U[i,0], U[i,1], marker = "*", label="user"+str(i))

for j in range(0, Vt.T.shape[0]):
    plot(Vt.T[j,0], Vt.T[j,1], marker = 'd', label="item"+str(j))    
    
legend(loc="upper right")
title('User vectors in the Latent semantic space')
ylim([-0.7, 0.7])
xlim([-0.7, 0])
show()

