import { userConstants } from '../constants/AllConstants';
import { requestFactory } from '../api/RequestFactory';
import { history } from '../api/history';

export {
    login,
    logout,
    register
};

function login(username, password) {
    requestFactory.login(username, password)
        .then(
            user => {
                history.push('/');
                return { type: userConstants.LOGIN_REQUEST, user }
            },
            error => {
                return { type: userConstants.LOGIN_FAILURE, error }
                // dispatch(alertActions.error(error));
            }
        );
}

function logout() {
    requestFactory.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        requestFactory.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
