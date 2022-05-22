import React from 'react'
import {useState, useEffect} from 'react'
import moment from 'moment';

const axios = require('axios').default


// Environment variables for authentication and target.
const serviceAccountKeyId  = "ca34rv45020000d9bh30"
const serviceAccountSecret = "8a8950b3b6ee4048a4c401c8d4536098"

// Shortform Disruptive REST API base url.
const baseUrl = 'https://api.d21s.com/v2'


async function paginatedGet(url, resultField, keyId, secret, parameters) {
    let results = []

    // Params, but overwritten to main function to be generic. 
    let params = parameters
    // Loop until all pages have been fetched.
    console.log('Paging...')
    while (true) {
        // Send GET request for projects.
        let page = await axios({
            method: 'GET',
            url: url,
            auth: {
                username: keyId,
                password: secret,
            },
            params: params,
        }).catch(function (error) {
            if (error.response) {
                throw new Error(
                    error.response.data.code + ' - '
                    + error.response.data.error
                )
            }
        })
        if (!(resultField in page.data)) {
            console.log("Error with results: here is output")
            throw new Error('Field "' + resultField + '" not in response.')
        }

        // Concatenate response contents to output list.
        results.push(...page.data[resultField])
        console.log(`- ${page.data[resultField].length} events in page.`)

        // Update parameters with next page token.
        if (page.data.nextPageToken.length > 0) {
            params.pageToken = page.data.nextPageToken
        } else {
            break
        }
    }

    return results
}




//main().catch((err) => {console.log(err)});


/* example output:

{ state: 'NOT_PRESENT', updateTime: '2022-05-19T15:21:01.487000Z' }
{ state: 'PRESENT', updateTime: '2022-05-19T15:15:01.141000Z' }
{ state: 'NOT_PRESENT', updateTime: '2022-05-19T13:28:42.744000Z' }
{ state: 'PRESENT', updateTime: '2022-05-19T13:25:14.432000Z' }
{ state: 'NOT_PRESENT', updateTime: '2022-05-19T12:23:16.734000Z' }
{ state: 'PRESENT', updateTime: '2022-05-19T12:19:08.812000Z' }

*/


async function GetBathRoomWithArg (sensorID) {
        // get sensor data from the last 24 hours.

        let parameters = { 
            'pageToken': '',
            'eventTypes': ["objectPresent"]
        }
        let results = []
        //projects/projectid/devices/deviceId/events. events nr 2 retrieves events response from dict. 
        results = await paginatedGet(
            baseUrl + '/projects/c9ju20a0gvhdcct6gmjg/devices/' + sensorID + '/events',
            'events',
            serviceAccountKeyId,
            serviceAccountSecret,
            parameters
            ,
        )
    ///test
        // Print all results
        let output = []
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].data.objectPresent)
            output.push(Object.entries(results[i].data.objectPresent)) //retrives event data from object
        }
        console.log("output", output)
        return output;

}

//getBathRoom1().catch((err) => {console.log(err)}).then(test => {console.log(test)})

//Se main for hvordan man bruker. Er bare aa sette inn, saa bruke liste[element][element]
export function GetBathroom2Hook(sensorID){
    const [bathRoom, setBathroom] = useState("none");
    const [lastDate, setLastDate] = useState("none");
    const [timeFromNow, setTimeFromNow] = useState("none");
    

    //componentdidload
    useEffect(() => {
        GetBathRoomWithArg(sensorID).catch((err) => {console.log(err)}).then(test => {
            setBathroom(test)
            setLastDate(test[0][1][1])
            setTimeFromNow(moment.utc(test[0][1][1]).local().startOf('seconds').fromNow())
        })
            
    }, [])

    return [bathRoom, lastDate, timeFromNow]

}

