import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"


export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePasword, updateEmial } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSumbit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passordene er ikke like")
        }

        const promises = []
        setLoading(true)
        setError("")
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmial(emailRef.current.value))
        }

        if (passwordRef.current.value) {
            promises.push(updatePasword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate("/")
        }).catch(() => {
            setError("Oppdatering av konto feilet")
        }).finally(() => {
            setLoading(false)
        })
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Oppdater Profil</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSumbit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required 
                        placeholder="La fletet stå tomt for å beholde samme passord"/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required 
                        placeholder="La fletet stå tomt for å beholde samme passord"/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Oppdater Profil</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Ferdig endret? <Link to="/">Tilbake</Link>       
        </div>
    </>
  )
}
