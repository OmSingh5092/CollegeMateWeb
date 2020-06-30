
export const createCalendarEvent = (event,callback)=>{

  return window.gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  }).execute(callback)
}


export const getUpcomingEvents = ()=>{
  return window.gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  })
}