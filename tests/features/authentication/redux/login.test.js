import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  AUTHENTICATION_LOGIN_BEGIN,
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_LOGIN_FAILURE,
  AUTHENTICATION_LOGIN_DISMISS_ERROR,
} from 'src/features/authentication/redux/constants';

import {
  login,
  dismissLoginError,
  reducer,
} from 'src/features/authentication/redux/login';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authentication/redux/login', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when login succeeds', () => {
    const store = mockStore({});

    return store.dispatch(login())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', AUTHENTICATION_LOGIN_BEGIN);
        expect(actions[1]).to.have.property('type', AUTHENTICATION_LOGIN_SUCCESS);
      });
  });

  it('dispatches failure action when login fails', () => {
    const store = mockStore({});

    return store.dispatch(login({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', AUTHENTICATION_LOGIN_BEGIN);
        expect(actions[1]).to.have.property('type', AUTHENTICATION_LOGIN_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissLoginError', () => {
    const expectedAction = {
      type: AUTHENTICATION_LOGIN_DISMISS_ERROR,
    };
    expect(dismissLoginError()).to.deep.equal(expectedAction);
  });

  it('handles action type LOGIN_LOGIN_BEGIN correctly', () => {
    const prevState = { loginPending: false };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_LOGIN_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loginPending).to.be.true;
  });

  it('handles action type LOGIN_LOGIN_SUCCESS correctly', () => {
    const prevState = { loginPending: true };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_LOGIN_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loginPending).to.be.false;
  });

  it('handles action type LOGIN_LOGIN_FAILURE correctly', () => {
    const prevState = { loginPending: true };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_LOGIN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loginPending).to.be.false;
    expect(state.loginError).to.exist;
  });

  it('handles action type LOGIN_LOGIN_DISMISS_ERROR correctly', () => {
    const prevState = { loginError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_LOGIN_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loginError).to.be.null;
  });
});
