import { db } from '../firebase-config'
import { doc, addDoc, arrayUnion, collection, getDoc, getDocs, query, where, limit, updateDoc } from 'firebase/firestore'

const partiesRef = collection(db, 'parties')
const guestsRef = collection(db, 'guests')

// Classes and converters
export class Guest {
    constructor (
        party, 
        first, 
        last, 
        email, 
        fridayEvent, 
        ceremony, 
        sundayEvent, 
        entre, 
        notes
    ) {
        this.party = party
        this.first = first
        this.last = last
        this.email = email
        this.fridayEvent = fridayEvent
        this.ceremony = ceremony
        this.sundayEvent = sundayEvent
        this.entre = entre
        this.notes = notes
    }
}

export const guestConverter = {
    toFirestore: (guest) => {
        return {
            party: guest.party,
            name: guest.name,
            first: guest.state,
            last: guest.last,
            email: guest.email,
            fridayEvent: guest.fridayEvent,
            ceremony: guest.ceremony,
            sundayEvent: guest.sundayEvent,
            entre: guest.entre,
            notes: guest.notes
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Guest(
            data.party, 
            data.first, 
            data.last, 
            data.email, 
            data.fridayEvent, 
            data.ceremony, 
            data.sundayEvent, 
            data.entre, 
            data.notes
        )
    }
}

export class Party {
    constructor (
        guests,
        partyName
    ) {
        this.guets = guests
        this.partyName = partyName
    }
}

export const partyConverter = {
    toFirestore: (party) => {
        return {
            guests: party.guests,
            partyName: party.partyName
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Party(
            data.guests,
            data.partyName
        )
    }
}

// Add functions
export const addParty = async (newParty) => {
    await addDoc(partiesRef, {
        guests: [],
        partyName: newParty
    })
}

export const addGuest = async (newGuest) => {
    const guest = await addDoc(guestsRef, newGuest)
    console.log(guest.id)
    
    const partyRef = doc(db, 'parties', newGuest.party)
    updateDoc(partyRef, {guests: arrayUnion(guest.id)})
}


// Search functions
export const searchForGuest = async (email) =>  {
    console.log(email)
    const q = query(guestsRef, where("email", "==", email), limit(1));
    
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
        console.log("EMPTY TEMPTY")
    }

    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data())
        return doc.id
    })
}

export const searchForParty = async (partyName) => {
    console.log(partyName)
    const q = query(partiesRef, where("partyName", "==", partyName), limit(1));
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
        console.log("Empty Party search!!")
    }

    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data())
        return (doc.id, doc)
    })
}


//
export const getGuest = async (guestId) => {
    const guestRef = doc(db, 'guests/' + guestId).withConverter(guestConverter)
    const guestSnap = await getDoc(guestRef)
    if (guestSnap.exists()) {
        const guest = guestSnap.data()
        console.log("Document data:", guestSnap.data())
        console.log(guestRef.id)
        return { guest: guest, guestId: guestRef.id }
    } else { 
        console.log("No document!")
        return
    }
}

export const getParty = async (partyId) => {
    const partyRef = doc(db, 'parties/' + partyId).withConverter(partyConverter)
    const partySnap = await getDoc(partyRef)
    if (partySnap.exists()) {
        const party = partySnap.data()
        console.log("Document data:", party)
        console.log(partyRef.id)
        return {party: party, partyId: partyRef.id }
    } else {
        console.log("No document!")
        return
    }
}

export const getParties = async () => {
    const data = await getDocs(partiesRef)
    return data.docs.map((doc) => ({...doc.data(), id: doc.id}))
}

export const getGuests = async () => {
    const data = await getDocs(guestsRef)
    return data.docs.map((doc) => ({...doc.data(), id: doc.id}))
}