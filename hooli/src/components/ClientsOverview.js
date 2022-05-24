import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert, Row, Col, Container, Image } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import app from "../firebase"
import { FiPhone, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"
import {GetBathroom2Hook} from './DisruptiveAPIAccess.js'


export default function ClientOverview() {
  const [patients, setPatients] = useState()
  const [loading, setLoading] = useState(true)

  const ref = app.firestore().collection("Instutisjon").doc("Jessheim Hjemmetjeneste").collection("Pasienter")


  //sorry for rot haha
  //sensor-api-hooks

  const BATHROOM_SENSORID2 = 'bj9tmr3fvtng00a964j0'
  const BATHROOM_ONE_SENSORID= 'bj9tpt41bddg00fbmi6g'
  const BEDROOM_ONE_SENSORID = 'bj9sf6v7cdlg00b9vf50'
  const [bathRoom1, lastDate1, fromNow1] = GetBathroom2Hook(BATHROOM_ONE_SENSORID);
  const [bathRoom2, lastDate2, fromNow2] = GetBathroom2Hook(BATHROOM_SENSORID2);
  const [bathRoom3, lastDate3, fromNow3] = GetBathroom2Hook(BEDROOM_ONE_SENSORID);


  //
  useEffect(() => {
    let unsubscribe = ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data())
      setPatients(items)
      console.log(items);
      setLoading(false)
    })
    return () => unsubscribe
},[])



  return (
    <>
      {!loading && patients.map((patient) => (
        <Card style={{marginTop:"30px"}}>
          <Card.Body style={{backgroundColor:"cornsilk"}}>
            <h2 className="text-center mb-4">
            {patient.Navn}</h2>
            <Container>
              <Row>
                <Col>
                  <h6>
                    <FiPhone style={{color:"blue"}}/>  {patient.Telefonnummer}
                    <br/>
                    <FiHome style={{color:"green"}}/> {patient.Adresse}
                    <br/>
                    <br/>
                    <br/>
                    Sist aktiv dørsensor:
                  </h6>
                    {(patient.Navn=="Kristian Henriksen") ? fromNow1 : null}
                    {(patient.Navn=="Kristine Nygaard") ? fromNow2 : null}
                    {(patient.Navn=="Per Andersen") ? fromNow3 : null}


                    <br/>
                    <br/>
                    <h6>
                      Medisin:
                    </h6>
                    {patient.Medisin}
                </Col>
                <Col>
                  <Image src={patient.Bilde} fluid style={{marginRight:"20px", maxHeight:"150px"}}/>
                </Col>
              </Row>  
              <h6 className="text-center mt-4">
                Merknad
              </h6>
              <Card>
                <Card.Body>
                  {patient.Merknad}
                </Card.Body>
              </Card>
            </Container>  
          </Card.Body>
        </Card>
        ))}
        <br/>
    </>
  )
}
