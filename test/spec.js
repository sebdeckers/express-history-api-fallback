/* global describe it beforeEach expect sinon */

import fallback from '../lib'

const args = ['index.html', { root: __dirname }]

describe('constructor', () => {
  it('returns something that looks like a middleware', () => {
    const middleware = fallback(...args)
    expect(middleware.length).to.equal(3)
  })
})

describe('middleware', () => {
  const next = sinon.stub()
  let middleware
  beforeEach(() => {
    middleware = fallback(...args)
  })
  it('accepts HTML requests', () => {
    const req = { accepts: sinon.stub().returns('html') }
    const res = { sendFile: sinon.stub() }
    expect(middleware(req, res, next)).to.be.undefined
    expect(req.accepts).always.have.been.calledWithMatch('html')
    expect(res.sendFile).always.have.been.calledWithMatch(...args)
    expect(next).not.to.have.been.called
  })
  it('ignores non-HTML requests', () => {
    const req = { accepts: sinon.stub().returns('') }
    const res = { sendFile: sinon.stub() }
    expect(middleware(req, res, next)).to.be.undefined
    expect(req.accepts).always.have.been.calledWithMatch('html')
    expect(res.sendFile).not.to.have.been.called
    expect(next).to.have.been.called
  })
  it('passes on errors if the default file can not be served', () => {
    const req = { accepts: sinon.stub().returns('html') }
    const res = { sendFile: sinon.spy((path, options, callback) => callback(Error)) }
    expect(middleware(req, res, next)).to.be.undefined
    expect(req.accepts).always.have.been.calledWithMatch('html')
    expect(res.sendFile).to.have.been.called
    expect(next).to.have.been.called
  })
})
