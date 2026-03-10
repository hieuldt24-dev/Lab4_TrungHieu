import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
// load user list directly from a module inside src so CRA allows it
import { users as usersData } from "../data/users";

function LoginPage() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // validation now works on provided values so we can trim before calling
  const validateForm = (u = username, p = password) => {
    const newErrors = {}

    if (!u.trim()) {
      newErrors.username = "Username is required"
    }

    if (!p) {
      newErrors.password = "Password is required"
    } else if (p.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    return newErrors
  }

  const handleLogin = (e) => {
    e.preventDefault()

    // trim values to avoid leading/trailing spaces causing a mismatch
    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()

    const newErrors = validateForm(trimmedUsername, trimmedPassword)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    // perform authentication in-memory
    const matched = usersData.find(
      (u) => u.username === trimmedUsername && u.password === trimmedPassword
    )

    if (matched) {
      dispatch(loginSuccess(matched))
      navigate("/home")
    } else {
      setErrors({ form: "Invalid username or password" })
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Login</h2>

        {errors.form && (
          <div className="alert alert-danger" role="alert">
            {errors.form}
          </div>
        )}

        {(errors.username || errors.password) && !errors.form && (
          <div className="alert alert-danger" role="alert">
            Username and password are required
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small className="form-text text-muted">(at least 6 characters)</small>
            {errors.password && (
              <div className="invalid-feedback d-block">
                {errors.password}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage