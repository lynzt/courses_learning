# reate word vectors from game of thrones ds
# and see semantic similarity
# tensor = n dim arr of numbers (vector is type of tensor)

from __future__ import absolute_import, division, print_function

import codecs # word expanding
import glob #regex
import multiprocessing # concurrency
import os # deal w/ os (read file)
import pprint
import re
import nltk # natural language tool kit
import gensim.models.word2vec as w2v
import sklearn.manifold # dimensionality reduction (video - vis dataset easily)
import numpy as np
import matplotlib.pyplot as plt # plotting
import pandas as pdb
import seaborn as sns # visualization

# step1: process data
# clean data
nltk.download('punkt') # pretrained tokenizer
nltk.download('stopwords') # and, the, an, a, of - common words w/ no effect...


# get book names
book_filenames = sorted(glob.glob('work/intro_deep_learning/35_got/*.txt'))
print (book_filenames)

corpus_raw = u"" # unicode string
for book_filename in book_filenames:
    print("Reading '{0}'...".format(book_filename))
    with codecs.open(book_filename, 'r', 'utf-8') as book_file:
        corups_raw += book_file.read()
    print ('corpus is now {0} chars long'.format(len(corpus_raw)))
    print ()



# split into sentences
tokenizer = nltk.data.load('nltk_data/tokenizers/punkt/english.pickle')
# tokenize sentences
raw_sentences = tokenizer.tokenize(corpus_raw)

def sentence_to_wordlist(raw):
    clean = re.sub("[^a-zA-Z]", " ", raw)
    words = clean.split()
    return words

sentences = []
for raw_sentence in raw_sentences:
    if len(raw_sentence) > 0:
        sentences.append(sentence_to_wordlist(raw_sentence))

print(raw_sentences[5])
print(sentence_to_wordlist(raw_sentences[5]))

token_count = sum([len(sentence) for sentence in sentences])
print("The book corpus contains {0:,} tokens".format(token_count))


# train word2vec
# vectors help with: distance, similarity, ranking

#dimensionality of resulting word vectors
# more dimentions - more expensive to train, but more accurate
num_features = 300

#min word count threshold
min_word_count = 3

# nbr threads to run in parallel
num_workers = multiprocessing.cpu_count()

#context window len
context_size = 7

# downsample for frequent words
# any nbr b/w 0 - 1e-5
downsampling = 1e-3

# seed random...
seed = 1

thrones2vec = w2v.Word2Vec(
    sg = 1,
    seed = seed,
    workers=num_workers,
    size=num_features,
    min_count=min_word_count,
    window=context_size,
    sample=downsampling
)
thrones2vec.build_vocab(sentences)
# print ("words2Vec vocab length: ", len(thrones2vec.vocab))
print ("words2Vec vocab length: ", thrones2vec)


thrones2vec.train(sentences, total_examples=thrones2vec.corpus_count, epochs=1)
