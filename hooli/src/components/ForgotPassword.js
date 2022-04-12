import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

   async function handleSumbit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Sjekk mailen din for videre instruksjoner")
        } catch {
            setError("Error, resetting av passord feilet")
        }
        setLoading(false)
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Glemt Passord</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success"> {message} </Alert>}
                <Form onSubmit={handleSumbit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                   
                    <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <Link to="/login">Login</Link>
                </div>

            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign up</Link>
        </div>
    </>
  )
}
