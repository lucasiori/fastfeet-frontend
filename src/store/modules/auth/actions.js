export function signInRequest(user, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    provider: { user, password },
  };
}
