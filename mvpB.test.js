import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {

  test('sum throws an error when called without arguments', () => {
    expect(() => sum()).toThrow('pass valid numbers')
  })

  test('sum throws an error when one argument is not a valid number', () => {
    expect(() => sum(2, 'seven')).toThrow('pass valid numbers')
  })

  test('sum returns correct result when called with two valid numbers', () => {
    expect(sum(1, 3)).toBe(4)
  })

  test('sum returns correct result when one argument is a string that can be converted to a number', () => {
    expect(sum('1', 2)).toBe(3)
  })

  test('sum returns correct result when both arguments are strings that can be converted to numbers', () => {
    expect(sum('10', '3')).toBe(13)
  })
  /*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.

    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */

    test('renders a link that reads "Home"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('Home')).toBeInTheDocument()
    })
  
    test('renders a link that reads "About"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('About')).toBeInTheDocument()
    })
  
    test('renders a link that reads "Blog"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('Blog')).toBeInTheDocument()
    })
  
    test('renders a text that reads "The Truth"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('The Truth')).toBeInTheDocument()
    })
  
    test('renders a text that reads "JavaScript is pretty awesome"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('JavaScript is pretty awesome')).toBeInTheDocument()
    })
  
    test('renders a text that includes "javaScript is pretty" with exact set to false', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('javascript is pretty', { exact: false })).toBeInTheDocument()
    })
  })
  /*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
  */
//   test('you can comment out this test', () => {
//     expect(true).toBe(true)
//   })
// })

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}
