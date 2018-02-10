---
title: Property-Based Testing
author: Oliver
description: Property-based testing generates input values to test your functions with. The Hypothesis package implements property-based testing for Python. Fuzz testing and property-based testing are closely related.
date: 2018-02-10 12:30:00
thumbnail: ./img/property-based-testing.png
---

If you’re set with unit tests, I strongly encourage you to look at **property-based testing**. The [Hypothesis library](https://hypothesis.readthedocs.io/en/latest/index.html) is easy to use with Python, and includes an excellent explanation of property-based testing.

Property-based testing (aka [“quickcheck-style testing”](https://en.wikipedia.org/wiki/Model-based_testing)), is available for a number of languages[^1].    [JSVerify](https://jsverify.github.io/) implements property-based testing for JavaScript.

Our example projects aren’t doing the kind of algorithmic work that this kind of testing most applies to[^2], so, unlike some other course topics, I’m not going to use these projects to demonstrate this kind of testing. Instead, there’s plenty of great examples in the [Hypothesis docs](https://hypothesis.readthedocs.io/en/latest/index.html).

[^1]: So far as I know, it originated with Haskell's [Quickcheck](https://www.schoolofhaskell.com/user/pbv/an-introduction-to-quickcheck-testing) (although it's also a special case of [“model-based testing”](https://en.wikipedia.org/wiki/Model-based_testing)), and was further popularized by [Scala](https://www.scalacheck.org/).
[^2]: Here’s how to tell that the example projects aren't very algorithm-y: There aren’t many loops or conditionals in the code.

## Yet Another Overview

\[I recommend the links above over the text in this section — so you might want to skip down to the final section, on Fuzz testing, if the linked reading material worked for you. I started writing this before I read them, and haven't decided what's worth keeping…\]

In conventional testing, your test specifies the *input* and the *expected output*, and the test framework compares them.

This approach works well when you can think of all the inputs that might cause a problem. [Path coverage](https://en.wikipedia.org/wiki/Code_coverage#Basic_coverage_criteria), mentioned yesterday, is a good way to think of this.

Property testing is an alternative to explicit enumeration of the inputs. A property tester passes random inputs to a function, to see if it breaks.

What does “break” mean? At its simplest, it means crash or raise a exception. If a function is defined to return a value for any input in a range, we can simply throw lots of values at it and verify that it always returns.

You may know more about the relationship between the input and the output, that you can make use of in an assert statement. For example, if you're testing a `string_reverse` function, you can spot-check a few strings. But you can also list some properties that relate the function's input to its output:

1. `string_reverse` of a one-letter string is itself
2. `string_reverse` of a string has the same characters as the original
3. Moreover, each character occurs the same number of times
4. `string_reverse` applied twice produces the original input
5. For a non-empty string, the *first* letter of the input is the *last* character of the output.
6. And vice versa.

With Pytest, we can spot-check some of these properties against individual strings.

With property-based testing, we can write code that tests whether the property is true of an $(\textrm{input}, \textrm{output})$ pair, and use Hypothesis to generate a wide range of inputs.

## Fuzz Testing

Closely related to property testing is *fuzzing*, or [*fuzz testing*](https://en.wikipedia.org/wiki/Fuzzing). Here's a couple of good readings about the difference between property testing and fuzz testing:

* [What is Property Based Testing?](http://hypothesis.works/articles/what-is-property-based-testing/), David R. MacIver (the author of the Hypothesis library).
* [Property-Based Testing Is Fuzzing](https://blog.nelhage.com/post/property-testing-is-fuzzing/), Nelson Elhage
