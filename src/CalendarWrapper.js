import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Firebase Imports (v10+)
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';

// Import Custom CSS Rules
import './CalendarStyles.css';

// 1. FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyCUye5v1njZsot5vYJHkuhdiK78rxpIAFI",
  authDomain: "beachmoutain-21b24.firebaseapp.com",
  projectId: "beachmoutain-21b24",
  storageBucket: "beachmoutain-21b24.firebasestorage.app",
  messagingSenderId: "409559234130",
  appId: "1:409559234130:web:6b792e9301ff5a6f5fd18b",
  measurementId: "G-4NCCKN4YKZ"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const eventsCollection = collection(db, 'calendar_events');

export default function CalendarWrapper() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. REAL-TIME DATABASE SYNCHRONISATION (onSnapshot)
  useEffect(() => {
    const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
      const fetchedEvents = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id, // Explicitly capture document reference string
          title: data.title,
          start: data.start,
          end: data.end,
          allDay: data.allDay,
        };
      });
      setEvents(fetchedEvents);
      setLoading(false);
    }, (error) => {
      console.error("Firestore listening error: ", error);
      setLoading(false);
    });

    // Clean up websocket connections when unmounting
    return () => unsubscribe();
  }, []);

  // 3. CREATE EVENT IN FIRESTORE
  const handleDateSelect = async (selectInfo) => {
    const title = prompt('Enter event title:');
    selectInfo.view.calendar.unselect();

    if (title) {
      try {
        await addDoc(eventsCollection, {
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        });
      } catch (err) {
        console.error('Error adding document: ', err);
      }
    }
  };

  // 4. UPDATE EVENT (DRAG / RESIZE)
  const handleEventChange = async (changeInfo) => {
    const eventId = changeInfo.event.id;
    const docRef = doc(db, 'calendar_events', eventId);

    try {
      await updateDoc(docRef, {
        start: changeInfo.event.startStr,
        end: changeInfo.event.endStr,
        allDay: changeInfo.event.allDay
      });
    } catch (err) {
      console.error('Error updating document: ', err);
      changeInfo.revert(); // Snap layout element back if cloud save fails
    }
  };

  // 5. DELETE EVENT FROM FIRESTORE
  const handleEventClick = async (clickInfo) => {
    if (window.confirm(`Delete event '${clickInfo.event.title}'?`)) {
      const eventId = clickInfo.event.id;
      const docRef = doc(db, 'calendar_events', eventId);

      try {
        await deleteDoc(docRef);
      } catch (err) {
        console.error('Error deleting document: ', err);
      }
    }
  };

  if (loading) {
    return <div className="calendar-container">Syncing with Firestore Database...</div>;
  }

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        
        events={events}
        
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventChange}
        eventResize={handleEventChange}
      />
    </div>
  );
}
