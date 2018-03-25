import './App.css'

import React, { Component } from 'react'

const detectCipher = `const isCipher = !!window.__CIPHER__`
const detectQRCodeScanAPI = `const canScanQRCode = !!(
  window.web3 &&
  window.web3.currentProvider &&
  window.web3.currentProvider.scanQRCode
)`
const functionSignature = `window.web3.currentProvider.scanQRCode(match?: RegExp): Promise<string>`
const example1 = `window.web3.currentProvider
  .scanQRCode()
  .then(data => {
    console.log('QR Scanned:', data)
  })
  .catch(err => {
    console.log('Error:', err)
  })`
const example2 = `window.web3.currentProvider
  .scanQRCode(/^mydapp:.+$/)
  .then(data => {
    console.log('QR Scanned:', data)
  })
  .catch(err => {
    console.log('Error:', err)
  })`

class App extends Component {
  state = {
    scan1Result: '',
    scan2Result: ''
  }

  get isCipher () {
    return !!window.__CIPHER__
  }

  get canScanQRCode () {
    return !!(
      window.web3 &&
      window.web3.currentProvider &&
      window.web3.currentProvider.scanQRCode
    )
  }

  render () {
    const { scan1Result, scan2Result } = this.state

    return (
      <div className='App'>
        <h1>Cipher QR Code Scanning API</h1>
        <p>
          Requires <a href='https://www.cipherbrowser.com/'>
            Cipher Browser
          </a>{' '}
          1.3.3 or later.
        </p>

        <h2>Feature Detection</h2>

        <h3>Detecting Cipher</h3>
        <code className='code-block'>
          <pre>{detectCipher}</pre>
        </code>
        <p>Cipher {this.isCipher ? '' : <strong>NOT </strong>}detected.</p>

        <h3>Detecting QR Code Scanning API</h3>
        <code className='code-block'>
          <pre>{detectQRCodeScanAPI}</pre>
        </code>
        <p>
          QR Code Scanning API {this.canScanQRCode ? (
            ''
          ) : (
            <strong>NOT </strong>
          )}detected.
        </p>

        <h2>API</h2>

        <code className='code-block'>
          <pre>{functionSignature}</pre>
        </code>
        <p>
          If the <code>match</code> argument is omitted, Cipher will look for
          Ethereum addresses.
        </p>

        <h3>Example 1 (Scan Ethereum Addresses):</h3>
        <code className='code-block'>
          <pre>{example1}</pre>
        </code>

        <button
          className='btn'
          onClick={this.runExample1}
          disabled={!this.canScanQRCode}
        >
          Run Example
        </button>
        <p>{scan1Result}</p>

        <div className='row'>
          <div className='qr-code'>
            <img
              src='/images/qrcode-eth-address.png'
              alt='A QR code containing an Ethereum address'
            />
            0xC553d18bb16Ba7b8Bfd0a985ae54DC1726FED332
          </div>
        </div>

        <h3>Example 2 (Scan custom text):</h3>
        <code className='code-block'>
          <pre>{example2}</pre>
        </code>

        <button
          className='btn'
          onClick={this.runExample2}
          disabled={!this.canScanQRCode}
        >
          Run Example
        </button>
        <p>{scan2Result}</p>

        <div className='row'>
          <div className='qr-code'>
            <img
              src='/images/qrcode-custom-text.png'
              alt='A QR code containing a custom text'
            />
            mydapp:hello_world
          </div>
        </div>
      </div>
    )
  }

  runExample1 = () => {
    try {
      window.web3.currentProvider
        .scanQRCode()
        .then(data => {
          this.setState({ scan1Result: `QR code scanned: ${data}` })
        })
        .catch(err => {
          this.setState({ scan1Result: `Scan failed: ${err}` })
        })
    } catch (err) {
      window.alert(err)
    }
  }

  runExample2 = () => {
    try {
      window.web3.currentProvider
        .scanQRCode(/^mydapp:.+$/)
        .then(data => {
          this.setState({ scan2Result: `QR code scanned: ${data}` })
        })
        .catch(err => {
          this.setState({ scan2Result: `Scan failed: ${err}` })
        })
    } catch (err) {
      window.alert(err)
    }
  }
}

export default App
