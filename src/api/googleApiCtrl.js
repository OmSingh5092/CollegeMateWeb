
export const createCalendarEvent = (event,callback)=>{

  return window.gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  }).execute(callback)
}