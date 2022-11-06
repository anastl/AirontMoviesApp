function showLoginScreen() {
    return (`
        <div class='login-screen'>
            <div class='welcome-text'>
                <p class='text text--bold'>Welcome! Log in or Register</p>
                <p class='text'>Log in to find the movies you're looking for!<p>
            </div>
            <form>
                <input required class='login--text-input' type='email' placeholder='Email' />
                <div class='password-field'>
                    <input required class='login--text-input' type='password' placeholder='Password' />
                    <i class="far fa-eye" id="togglePassword"></i>
                </div>
                <div class='extra-options'>
                <label for='remember'>
                    <input class='login--checkbox-input' type="checkbox" id='remember'/>
                        Remember me?
                    </label>
                    <a href='#'>Forgot Password?</a>
                </div>
                <button id='btn--log-in' class='log-in'>Log in</button>
            </form>
            <p class='text'>Not registered yet? <a href='#'>Register now</a> </p>
            <span class='hr-container'>
                <hr class='hr-45' />
                <p class='text'>or</p>
                <hr class='hr-45' />
            </span>
        </div>
    `)
}


export { showLoginScreen }