
import './LoginPage.css';


export default function Login() {
  return (
 
    <>
        <div className="Login" >
            <div>
                <div className = "login-info">
                <h1 className = 'montserratStroke' >Organization Login</h1>
                <p>
                Start advertising your events on SocialCalendar@Penn!                
                </p>

               
                <form action="/login_authentication" method="POST">
                    <div className="form-group">
                        <input type="text" id="username" name="username" required placeholder=" " />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" required placeholder=" " />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className = "montserratStroke">Club Login</button>
                </form>

                 </div>

                 <div className="login-artist"></div>
                 <div className="login-exclamation"></div>
                 <div className="login-loop"></div>

            </div>
    </div>
    </>
);

}
