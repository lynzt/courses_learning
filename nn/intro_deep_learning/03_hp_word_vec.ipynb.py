
# coding: utf-8

# In[1]:


import codecs
import glob
import multiprocessing
import os
import re

import nltk
from nltk.corpus import stopwords
import gensim.models.word2vec as w2v
import sklearn.manifold
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns


# In[2]:


# ability to split sentences (sentence boundary detection)...
nltk.download("punkt")
# common words to ignore
nltk.download("stopwords")


# In[3]:


# get book filenames
book_filenames = sorted(glob.glob('work/intro_deep_learning/35_hp/*.txt'))

print("Found books:")
book_filenames


# In[4]:


# corpus => collection of written texts (entire work of author or subject)
corpus_raw = u""
for book_filename in book_filenames:
    print("Reading '{0}'...".format(book_filename))
    with codecs.open(book_filename, "r", "utf-8") as book_file:
        corpus_raw += book_file.read()
    print("Corpus is now {0} characters long".format(len(corpus_raw)))
    print()


# In[5]:


# pickle - python specific way to serializes the data structure (binary)
# http://www.diveintopython3.net/serializing.html
tokenizer = nltk.data.load('tokenizers/punkt/english.pickle') 
raw_sentences = tokenizer.tokenize(corpus_raw)


# In[10]:


#convert into a list of words and clean...
stops = set(stopwords.words("english"))

def sentence_to_wordlist(raw):
    clean = re.sub("[^a-zA-Z]"," ", raw)
    words = clean.split()

    valid_words = [word.lower() for word in words if word.lower() not in stops]
    
    return valid_words


# In[11]:


# sentence where each word is tokenized
sentences = []
for raw_sentence in raw_sentences:
    if len(raw_sentence) > 0:
        sentences.append(sentence_to_wordlist(raw_sentence))


# In[12]:


print(raw_sentences[5])
print(sentence_to_wordlist(raw_sentences[5]))


# In[13]:


# how many words
token_count = sum([len(sentence) for sentence in sentences])
print("The book corpus contains {0:,} tokens".format(token_count))


# In[14]:


# build model - 
#DISTANCE, SIMILARITY, RANKING

# Dimensionality of the resulting word vectors.
# more dimensions, more computationally expensive to train but also more accurate
num_features = 300
# Minimum word count threshold.
min_word_count = 3

# Number of threads to run in parallel.
num_workers = multiprocessing.cpu_count()

# Context window length.
context_size = 7

# Downsample setting for frequent words.
#0 - 1e-5 is good for this
downsampling = 1e-3

# Seed for the RNG, to make the results reproducible.
seed = 1

# gensim word2vec... gensim => generate similar
# discover semantic structure of documents
hp2vec = w2v.Word2Vec(
    sg=1,
    seed=seed,
    workers=num_workers,
    size=num_features,
    min_count=min_word_count,
    window=context_size,
    sample=downsampling
)


# In[15]:


# collect word and frequencies in internal tree struct
hp2vec.build_vocab(sentences)
print (hp2vec)


# In[16]:


# https://rare-technologies.com/word2vec-tutorial/#training
hp2vec.train(sentences, total_examples=hp2vec.corpus_count, epochs=hp2vec.epochs) # add total_examples, epocs


# In[17]:


if not os.path.exists("trained"):
    os.makedirs("trained")https://twitter.com/search?q=eoly23&src=typd

hp2vec.save(os.path.join("trained", "hp2vec.w2v"))


# In[18]:


hp2vec = w2v.Word2Vec.load(os.path.join("trained", "hp2vec.w2v"))


# In[19]:


#my video - how to visualize a dataset easily
# tsne => t-distributed Stochastic Neibor Embedding
# used for visualize high-dimensional data
# n_components => dimension of embeded space
# http://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html
tsne = sklearn.manifold.TSNE(n_components=2, random_state=0)


# In[20]:


all_word_vectors_matrix = hp2vec.wv.vectors # different


# In[21]:


# Fit matrix into an embedded space and return that transformed output.
all_word_vectors_matrix_2d = tsne.fit_transform(all_word_vectors_matrix)


# In[22]:


# https://pandas.pydata.org/pandas-docs/stable/dsintro.html#dataframe
# 2-d labled data struct (like sql table)
points = pd.DataFrame(
    [
        (word, coords[0], coords[1])
        for word, coords in [
            (word, all_word_vectors_matrix_2d[hp2vec.wv.vocab[word].index])
            for word in hp2vec.wv.vocab
        ]
    ],
    columns=["word", "x", "y"]
)


# In[23]:


# first N rows
points.head(10)


# In[24]:


# seaborn: statistical data visualization (https://seaborn.pydata.org/index.html)
# https://seaborn.pydata.org/generated/seaborn.set_context.html?highlight=set_context
# set_context: (paper, notebook, talk, poster)
sns.set_context('poster')


# In[25]:


points.plot.scatter("x", "y", s=10, figsize=(20, 12))


# In[26]:


def plot_region(x_bounds, y_bounds):
    slice = points[
        (x_bounds[0] <= points.x) &
        (points.x <= x_bounds[1]) & 
        (y_bounds[0] <= points.y) &
        (points.y <= y_bounds[1])
    ]
    
    
    ax = slice.plot.scatter("x", "y", s=35, figsize=(10, 8))
    for i, point in slice.iterrows():
        ax.text(point.x + 0.005, point.y + 0.005, point.word, fontsize=11)


# In[27]:


# plot_region(x_bounds=(4.0, 4.2), y_bounds=(-0.5, -0.1))
plot_region(x_bounds=(0, 3), y_bounds=(10, 15))


# In[30]:


hp2vec.wv.most_similar("muggle")


# In[34]:


hp2vec.wv.most_similar("bellatrix")


# In[35]:


def nearest_similarity_cosmul(start1, end1, end2):
    similarities = hp2vec.wv.most_similar_cosmul(
        positive=[end2, start1],
        negative=[end1]
    )
    start2 = similarities[0][0]
    print("{start1} is related to {end1}, as {start2} is related to {end2}".format(**locals()))
    return start2


# In[38]:



nearest_similarity_cosmul("harry", "ron", "draco")
# nearest_similarity_cosmul("Jaime", "sword", "wine")
# nearest_similarity_cosmul("Arya", "Nymeria", "dragons")

