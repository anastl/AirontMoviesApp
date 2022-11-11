function displayLogin() {
    return `
    <div class="login--container"">
        <h1 class="title blue">
        <span class="text--boldest text--uppercased">Movie</span><span class="text--italic">finder</span>
        </h1>
        <main>
            <div class="container">
                <div class="login-screen">
                    <div class="welcome-prompt">
                        <p class="text--bold">Welcome! Log in or Register</p>
                        <p>Log in to find the movies you're looking for!</p>
                    </div>
                    <form>
                        <input class="input--full-width" type="email" placeholder="Email" />
                        <div class="password--container">
                            <input class="input--full-width" type="password" placeholder="Password" />
                            <img class="password-eye" src="./img/vectors/eye.svg" alt="select to show password" />
                        </div>
                        <div class="user-extras">
                            <label for="remember-user">
                                <input class="input-checkbox" type="checkbox" id="remember-user" name="remember-user" />
                                Remember me
                            </label>
                            <a class="link" href="#">Forgot Password?</a>
                        </div>
                        <button class="text--bold">Log in</button>
                    </form>
                    <p class="register-prompt">Not registered yet? <a class="link" href="#">Register now</a></p>
                    <div class="separation">
                        <hr><p>or</p><hr>
                    </div>
                    <div class="social-media-div button--full-width">
                        <div class="social-media-container">
                            <div class="icon">
                                <img class="icon" src="./img/vectors/facebook.png" alt="facebook logo" />                
                            </div>
                            <p class="option text--bold">Login with Facebook</p>
                        </div>
                    </div>
                    <div class="social-media-div button--full-width">
                        <div class="social-media-container">
                            <div class="icon">
                                <img class="icon" src="./img/vectors/twitter.png" alt="twitter logo" />                
                            </div>
                            <p class="option text--bold">Login with Twitter</p>
                        </div>
                    </div>
                    <div class="social-media-div button--full-width">
                        <div class="social-media-container">
                            <div class="icon">
                                <img class="icon" src="./img/vectors/google.png" alt="google logo" />                
                            </div>
                            <p class="option text--bold">Login with Google</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    `
}

function displayHeaderAndSearchBar() {
    return (`
    <header>
        <nav>
            <h1 class="title">
                <span class="text--boldest text--uppercased">Movie</span><span class="fw--400 text--italic">finder</span>
            </h1>
            <div class="search--container">
                <input id="search-movie" class="input--search" type="text" placeholder="Search movies" />
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
            </div>
            <div class="profile-container">
                <p class="text--tiny">Log out</p>
                <div class="profile-vector-container">
                    <img src="img/vector-profile.png" alt="profile picture" />
                </div>
            </div>
        </nav>
    </header>
    `)
}

export { displayLogin, displayHeaderAndSearchBar }