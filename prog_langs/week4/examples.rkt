#lang racket

(provide (all-defined-out))

; sum numbers in list
(define (sum xs)
  (if (null? xs)
    0
    (+ (car xs) (sum (cdr xs)))))


(sum (list 3 4 5 6))

; append
(define (my-append xs ys)
  (if (null? xs)
    ys
    (cons (car xs) (my-append (cdr xs) ys))))

(my-append (list 1 2 3) (list 9 8 7))
(my-append (list "a" "b" "c") (list "1" "2" "3"))


(define (my-map f xs)
  (if (null? xs)
    null
    (cons (f (car xs)) (my-map  f (cdr xs)))))

(my-map (lambda (x) (+ x 1)) (list 3 4 5))
