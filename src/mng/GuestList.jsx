import React, { useState, useEffect, Fragment } from 'react'
import { getGuests } from '../rsvp/FirebaseActions'
import { Link } from 'react-router-dom'
import { Table } from '@mui/joy'
import { CSVLink, CSVDownload } from 'react-csv'

function GuestList() {
    const [guests, setGuests] = useState([])
    const [attending, setAttending] = useState(0)

    const updateGuests = async () => {
        const data = await getGuests()
        setGuests(data)
        getAttendingCount(data)
    }

    const getAttendingCount = (data) => {
        var attendingCount = 0
        for (let index = 0; index < data.length; index++) {
            const guest = data[index];
            if (guest.ceremony === 'yes') {
                attendingCount ++
            }
        }
        setAttending(attendingCount)
    }

    useEffect(() => {
        updateGuests()
    }, [])

    function attendingString(response) {
        switch (response) {
            case 'yes':
                return '✓'
            case 'no':
                return 'x'
            default:
                return '-'
        }
    }


    function csvData() {
        const guestsData = guests.map((guest) => {
            return({
                lastname: guest.last,
                firstname: guest.first,
                email: guest.email, 
                group: guest.partyName, 
                ceremony: attendingString(guest.ceremony), 
                entre: guest.entre, 
                fridayEvent: attendingString(guest.fridayEvent), 
                sundayEvent: attendingString(guest.sundayEvent),
                notes: guest.notes
            })
        })
        console.log(guestsData)
        return guestsData;
      }

      const headers = [
        { label: "Last Name", key: "lastname" },
        { label: "First Name", key: "firstname" },
        { label: "Email", key: "email" },
        { label: "Group", key: "group"},
        { label: "Attending", key: "ceremony"},
        { label: "Entre", key: "entre"},
        { label: "Friday Event", key: "fridayEvent"},
        { label: "Sunday Event", key: "sundayEvent"},
        { label: "Notes", key: "notes"}
      ];

    return (
        <>
            <CSVLink data={csvData()} headers={headers}> Download CSV</CSVLink>
            <h3 style={{textAlign: 'center'}}>{"Attending: " + attending }</h3>
            <h5 style={{textAlign: 'center'}}>{"Invited: " + guests.length}</h5>
            <Table>
                <thead>
                    <tr>
                        <th>Guest</th>
                        <th>Party</th>
                        <th style={{width: '8%'}}>Ceremony</th>
                        <th style={{width: '15%'}}>Entre</th>
                        <th style={{width: '8%'}}>Friday</th>
                        <th style={{width: '8%'}}>Sunday</th>
                        <th style={{width: '15%'}}>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.map((guest, i) => {
                        return(
                            <tr key={i}>
                                <td>
                                    <Link to={"/rsvp/" + guest.id} key={guest.id}>
                                        {guest.first} {guest.last}<br />
                                        <div style={{fontSize: 'smaller'}}>{guest.email}</div>
                                    </Link>
                                </td>
                                <td style={{fontSize: 'smaller'}}>Party: {guest.party}<br />ID: {guest.id}</td>
                                <td>{attendingString(guest.ceremony)}</td>
                                <td>{guest.entre}</td>
                                <td>{attendingString(guest.fridayEvent)}</td>
                                <td>{attendingString(guest.sundayEvent)}</td>
                                <td>{guest.notes}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default GuestList