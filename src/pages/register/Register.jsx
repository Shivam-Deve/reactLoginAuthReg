import './register.scss';
import React, { useEffect, useRef, useState } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../utils/axios';
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        const match = pwd === matchPwd;
        setValidMatchPwd(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async e => {
        e.preventDefault();
        const validatedUser = USER_REGEX.test(user);
        const validatedPwd = PWD_REGEX.test(pwd);
        if (!validatedUser || !validatedPwd) {
            setErrMsg("Invalid Enrty");
            return;
        }
        // setSuccess(true)
        setErrMsg("Invalid Enrty");
        // api call
        // try {
        //     const res = await axios.post('/register',
        //         JSON.stringify({ username: user, password: pwd }),
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true
        //         }
        //     )

        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response')
        //     } else if (err.response.status === 409) {
        //         setErrMsg('Username Taken')
        //     } else {
        //         setErrMsg("Registration failed")
        //     }
        //     errRef.current.focus();
        // }
    }

    return (
        <>
            {
                success ?
                    <section>
                        <h1>Success</h1>
                        <p>
                            <a href="#">Sign In</a>
                        </p>
                    </section>
                    :
                    <section>

                        {/* error messages */}
                        <p
                            ref={errRef}
                            className={errMsg ? 'errmsg' : 'offscreen'}
                            aria-live='assertive'
                        >{errMsg}</p>

                        {/* from */}
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>

                            {/* username */}
                            <label htmlFor="username">
                                Username:
                                <span className={validName ? 'valid' : 'hide'}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validName || !user ? 'hide' : 'invalid'}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                id='username'
                                ref={userRef}
                                autoComplete='off'
                                onChange={e => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby='uidnote'
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            {/* password */}
                            <label htmlFor="password">
                                Password:
                                <span className={validPwd ? 'valid' : 'hide'}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                id='password'
                                onChange={e => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? 'false' : 'true'}
                                aria-describedby='pwdnote'
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must includes uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters:
                                <span aria-label='exclamation mark'>!</span>
                                <span aria-label='at symbol'>@</span>
                                <span aria-label='hashtag'>#</span>
                                <span aria-label='dollar sign'>$</span>
                                <span aria-label='percent'>%</span>
                            </p>

                            {/* match password */}
                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <span className={validMatchPwd && matchPwd ? 'valid' : 'hide'}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validMatchPwd || !matchPwd ? 'hide' : 'invalid'}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                id='confirm_pwd'
                                onChange={e => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatchPwd ? 'false' : 'true'}
                                aria-describedby='confirmnote'
                                onFocus={() => setMatchPwdFocus(true)}
                                onBlur={() => setMatchPwdFocus(false)}
                            />
                            <p id='confirmnote' className={matchPwd && !validMatchPwd ? 'instructions' : 'offscreen'}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>

                            {/* button */}
                            <button
                                disabled={!validName || !validPwd || !validMatchPwd ? true : false}
                            >Sign Up</button>
                        </form>
                        <p>
                            Already registered?<br />
                            <span className='line'>
                                <a href="#">Sign In</a>
                            </span>
                        </p>
                    </section>
            }
        </>
    )
}

export default Register